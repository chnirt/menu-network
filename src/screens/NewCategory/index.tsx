import {
  Button,
  Form,
  Input,
  NavBar,
  Selector,
  Tabs,
  Toast,
} from "antd-mobile";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes";
import {
  addDocument,
  getColRef,
  getDocRef,
  getDocument,
  updateDocument,
} from "../../firebase/service";
import useAuth from "../../hooks/useAuth";
import { MASTER_MOCK_DATA } from "../../mocks";
import { DocumentData, DocumentReference } from "firebase/firestore";

const initialValues = MASTER_MOCK_DATA.NEW_CATEGORY;

const NewCategory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categoryId } = useParams();
  const isEditMode = Boolean(categoryId);
  const [form] = Form.useForm();
  const [categoryDocRefState, setCategoryDocRefState] =
    useState<DocumentReference<DocumentData, DocumentData> | null>(null);

  const onFinish = useCallback(
    async (values: typeof initialValues) => {
      if (user === null) return;
      try {
        const { categoryName } = values;
        const uid = user.uid;
        const categoryData = {
          categoryName,
        };

        if (isEditMode) {
          if (categoryDocRefState === null) return;
          await updateDocument(categoryDocRefState, categoryData);
        } else {
          const categoryDocRef = getColRef("users", uid, "categories");
          await addDocument(categoryDocRef, categoryData);
        }

        navigate(routes.menu);
        Toast.show({
          icon: "success",
          content: isEditMode ? "Category is updated" : "Category is created",
        });

        return;
      } catch (error: any) {
        Toast.show({
          icon: "error",
          content: error.message,
        });
      } finally {
      }
    },
    [user, isEditMode, categoryDocRefState]
  );

  const fetchCategoryById = useCallback(
    async (categoryId: string) => {
      if (user === null) return;
      const categoryDocRef = getDocRef(
        "users",
        user?.uid,
        "categories",
        categoryId
      );
      setCategoryDocRefState(categoryDocRef);
      const dishDocData: any = await getDocument(categoryDocRef);
      form.setFieldsValue(dishDocData);
    },
    [user, categoryId]
  );

  useEffect(() => {
    if (categoryId === undefined) return;
    fetchCategoryById(categoryId);
  }, [categoryId, fetchCategoryById]);

  return (
    <Fragment>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        {isEditMode ? "EDIT CATEGORY" : "NEW CATEGORY"}
      </NavBar>
      <Tabs>
        <Tabs.Tab title={isEditMode ? "Edit" : "New"} key="new">
          <Form
            form={form}
            initialValues={initialValues}
            layout="horizontal"
            onFinish={onFinish}
            footer={
              <Button block type="submit" color="primary" size="large">
                {isEditMode ? "EDIT" : "CREATE"}
              </Button>
            }
          >
            <Form.Header>
              {isEditMode ? "Edit Category" : "New Category"}
            </Form.Header>
            <Form.Item
              name="categoryName"
              label="Category Name"
              rules={[{ required: true, message: "Category Name is required" }]}
            >
              <Input autoComplete="none" placeholder="chnirt" />
            </Form.Item>
          </Form>
        </Tabs.Tab>
        <Tabs.Tab title="Templates" key="templates">
          <Form
            initialValues={{
              template: ["coffee"],
            }}
            layout="horizontal"
            onFinish={onFinish}
            footer={
              <Button block type="submit" color="primary" size="large">
                CREATE
              </Button>
            }
          >
            <Form.Header>New Category</Form.Header>
            <Form.Item
              name="template"
              label="Template"
              rules={[{ required: true, message: "Template is required" }]}
            >
              <Selector
                columns={3}
                multiple
                options={[
                  { label: "Coffee", value: "coffee" },
                  { label: "Tea", value: "tea" },
                  { label: "Juices", value: "juices" },
                  { label: "Beer", value: "beer" },
                ]}
              />
            </Form.Item>
          </Form>
        </Tabs.Tab>
      </Tabs>
    </Fragment>
  );
};

export default NewCategory;
