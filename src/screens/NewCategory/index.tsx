import { Button, Form, Input, NavBar, Selector, Tabs } from "antd-mobile";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const NewCategory = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    navigate(routes.menu);
    return;
  };

  return (
    <Fragment>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        NEW CATEGORY
      </NavBar>
      <Tabs>
        <Tabs.Tab title="New" key="new">
          <Form
            initialValues={{
              categoryName: "Cocktail"
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
              name="categoryName"
              label="Category Name"
              rules={[{ required: true, message: "Category Name is required" }]}
            >
              <Input placeholder="chnirt" />
            </Form.Item>
          </Form>
        </Tabs.Tab>
        <Tabs.Tab title="Templates" key="templates">
          <Form
            initialValues={{
              template: ["coffee"]
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
                  { label: "Beer", value: "beer" }
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
