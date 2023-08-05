import {
  Button,
  Form,
  ImageUploadItem,
  ImageUploader,
  Input,
  NavBar,
  Radio,
  Space,
  Stepper,
  Toast,
} from 'antd-mobile'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { AddCircleOutline } from 'antd-mobile-icons'
import {
  addDocument,
  getColRef,
  getDocRef,
  getDocument,
  updateDocument,
} from '../../firebase/service'
import useAuth from '../../hooks/useAuth'
import { MASTER_MOCK_DATA } from '../../mocks'
import { uploadStorageBytesResumable } from '../../firebase/storage'
import { Loading } from '../../global'

const initialValues = MASTER_MOCK_DATA.NEW_DISH

const NewDish = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { categoryId, dishId } = useParams()
  const isEditMode = Boolean(dishId)
  const [form] = Form.useForm()
  const uploadMethod = Form.useWatch('uploadMethod', form)
  const [dishDocRefState, setDishDocRefState] = useState<DocumentReference<
    DocumentData,
    DocumentData
  > | null>(null)
  const onFinish = useCallback(
    async (values: typeof initialValues) => {
      if (user === null || categoryId === undefined) return
      try {
        Loading.get.show()
        const { dishName, price, dishFiles } = values
        const uid = user.uid
        const dishData = {
          dishFiles: dishFiles.map((dishFile: any) => dishFile.url),
          dishName,
          price,
        }

        if (isEditMode) {
          if (dishDocRefState === null) return
          await updateDocument(dishDocRefState, dishData)
        } else {
          const dishColRef = getColRef(
            'users',
            uid,
            'categories',
            categoryId,
            'dishes'
          )
          await addDocument(dishColRef, dishData)
        }
        navigate(-1)
        Toast.show({
          icon: 'success',
          content: isEditMode ? 'Dish is updated' : 'Dish is created',
        })

        return
      } catch (error: any) {
        Toast.show({
          icon: 'error',
          content: error.message,
        })
      } finally {
        Loading.get.hide()
      }
    },
    [user, isEditMode, dishDocRefState]
  )

  const fetchDishById = useCallback(
    async (dishId: string) => {
      if (user === null || categoryId === undefined) return
      const dishDocRef = getDocRef(
        'users',
        user?.uid,
        'categories',
        categoryId,
        'dishes',
        dishId
      )
      setDishDocRefState(dishDocRef)
      const dishDocData: any = await getDocument(dishDocRef)
      form.setFieldsValue({
        ...dishDocData,
        dishFiles: dishDocData.dishFiles.map((dishFile: string) => ({
          url: dishFile,
        })),
      })
    },
    [user, categoryId, form]
  )

  useEffect(() => {
    if (categoryId === undefined || dishId === undefined) return
    fetchDishById(dishId)
  }, [categoryId, dishId, fetchDishById])

  return (
    <Fragment>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        {isEditMode ? 'EDIT DISH' : 'NEW DISH'}
      </NavBar>
      <Form
        form={form}
        initialValues={initialValues}
        layout="horizontal"
        onFinish={onFinish}
        mode="card"
        // footer={
        //   <Button block type="submit" color="primary" size="large">
        //     {isEditMode ? "EDIT" : "CREATE"}
        //   </Button>
        // }
      >
        <Form.Header>{isEditMode ? 'Edit Dish' : 'New Dish'}</Form.Header>
        <Form.Item name="uploadMethod" label="Upload Method">
          <Radio.Group
            onChange={() => {
              form.setFieldsValue({ dishFiles: [] })
            }}
          >
            <Space>
              <Radio value="file">File</Radio>
              <Radio value="link">Link</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {uploadMethod === 'file' && (
          <Form.Item
            name="dishFiles"
            label="Dish Photos"
            rules={[{ required: true, message: 'Dish Files is required' }]}
          >
            <ImageUploader
              upload={function (file: File): Promise<ImageUploadItem> {
                const isJpgOrPng =
                  file.type === 'image/jpeg' || file.type === 'image/png'
                if (!isJpgOrPng) {
                  Toast.show({
                    icon: 'error',
                    content: 'You can only upload JPG/PNG file!',
                  })
                  return Promise.reject(
                    new Error('You can only upload JPG/PNG file!')
                  )
                }
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                  Toast.show({
                    icon: 'error',
                    content: 'Image must smaller than 2MB!',
                  })
                  return Promise.reject(
                    new Error('Image must smaller than 2MB!')
                  )
                }

                return new Promise((resolve, reject) => {
                  uploadStorageBytesResumable(
                    file,
                    undefined,
                    (error) => reject(error),
                    async ({ downloadURL }) =>
                      resolve({
                        url: downloadURL,
                      })
                  )
                })
              }}
              multiple
              maxCount={3}
            />
          </Form.Item>
        )}
        {uploadMethod === 'link' && (
          <Form.Array
            name="dishFiles"
            renderAdd={() => (
              <Button color="primary" fill="none">
                <AddCircleOutline /> Add
              </Button>
            )}
            renderHeader={({ index }, { remove }) => (
              <>
                <span>Link {index + 1}</span>
                <Button
                  onClick={() => remove(index)}
                  style={{ float: 'right' }}
                  color="primary"
                  fill="none"
                >
                  Delete
                </Button>
              </>
            )}
          >
            {(fields) =>
              fields.map(({ index }) => (
                <>
                  <Form.Item
                    name={[index, 'url']}
                    label="Link"
                    rules={[{ required: true, message: 'Link is required' }]}
                  >
                    <Input placeholder="https://example.com" />
                  </Form.Item>
                </>
              ))
            }
          </Form.Array>
        )}
        <Form.Item
          name="dishName"
          label="Dish Name"
          rules={[{ required: true, message: 'Dish Name is required' }]}
        >
          <Input placeholder="Phatty’S Nachos" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Price is required' },
            {
              type: 'number',
              min: 1,
              message: 'Invalid Price',
            },
          ]}
        >
          <Stepper
            style={{
              width: '100%',
              '--border': '1px solid #f5f5f5',
              '--border-inner': 'none',
              '--height': '36px',
              '--input-width': '70px',
              '--input-background-color': 'var(--adm-color-background)',
              '--active-border': '1px solid var(--adm-color-primary)',
            }}
            min={0}
            step={1000}
            // formatter={(value) => `VND ${value}`}
            // parser={(text) => parseFloat(text.replace("VND", ""))}
          />
        </Form.Item>
        <Form.Item shouldUpdate className="submit" noStyle>
          {() => (
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              shape="rounded"
              // disabled={
              //   !form.isFieldsTouched(true) ||
              //   form.getFieldsError().filter(({ errors }) => errors.length)
              //     .length > 0
              // }
            >
              {isEditMode ? 'EDIT' : 'CREATE'}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Fragment>
  )
}

export default NewDish

// import {
//   Button,
//   Dialog,
//   Empty,
//   Image,
//   List,
//   NavBar,
//   SearchBar,
//   Space,
//   SwipeAction
// } from "antd-mobile";
// import { Action, SwipeActionRef } from "antd-mobile/es/components/swipe-action";
// import { useNavigate } from "react-router-dom";
// import { EditSOutline, DeleteOutline } from "antd-mobile-icons";
// import { useRef, useState } from "react";
// import { SAMPLE_DATA } from "../../mocks";
// import ListHeader from "../../components/ListHeader";
// import { useDebounce } from "react-use";
// import { routes } from "../../routes";

// const NewDish = () => {
//   const navigate = useNavigate();
//   const swipeActionRef = useRef<SwipeActionRef>(null);
//   const [searchText, setSearchText] = useState("");
//   const [debouncedSearchText, setDebouncedSearchText] = useState("");
//   useDebounce(
//     () => {
//       setDebouncedSearchText(searchText);
//     },
//     1000,
//     [searchText]
//   );
//   const data = SAMPLE_DATA.reply.menu_infos.map((menu_info) => ({
//     ...menu_info,
//     title: menu_info.dish_type_name,
//     data: menu_info.dishes.map((dish) => ({
//       ...dish,
//       price: dish.price.text,
//       photo: dish.photos[0].value,
//       categoryName: menu_info.dish_type_name
//     }))
//   }));
//   const rightActions: Action[] = [
//     {
//       key: "edit",
//       text: <EditSOutline />,
//       color: "warning",
//       onClick: async () => {
//         await Dialog.confirm({
//           content: "Edit?"
//         });
//         swipeActionRef.current?.close();
//       }
//     },
//     {
//       key: "delete",
//       text: <DeleteOutline />,
//       color: "danger",
//       onClick: async () => {
//         await Dialog.confirm({
//           content: "Delete?"
//         });
//         swipeActionRef.current?.close();
//       }
//     }
//   ];

//   return (
//     <div>
//       <NavBar
//         className="sticky top-0 z-[100] bg-white"
//         onBack={() => navigate(-1)}
//       >
//         NEW DISH
//       </NavBar>
//       <div className="sticky top-[45px] z-[100] bg-white">
//         <SearchBar
//           placeholder="Search"
//           showCancelButton
//           cancelText="Cancel"
//           value={searchText}
//           onChange={setSearchText}
//         />
//       </div>
//       <Space className="w-full" justify="end">
//         <Button onClick={() => navigate(routes.newCategory)}>
//           Add New Category
//         </Button>
//       </Space>

//       {data.length > 0 ? (
//         data.map((item, ii) => (
//           <div key={`category-${ii}`}>
//             {item.data.length > 0 && (
//               <List header={<ListHeader {...{ title: item.title }} />}>
//                 {item.data.map((dataItem: any, dii: number) => (
//                   <SwipeAction
//                     ref={swipeActionRef}
//                     key={`data-item-${dii}`}
//                     rightActions={rightActions}
//                   >
//                     <List.Item
//                       prefix={
//                         <Image
//                           src={dataItem.photo}
//                           style={{ borderRadius: 20 }}
//                           fit="cover"
//                           width={40}
//                           height={40}
//                         />
//                       }
//                     >
//                       {dataItem.name}
//                     </List.Item>
//                   </SwipeAction>
//                 ))}
//               </List>
//             )}
//           </div>
//         ))
//       ) : (
//         <Empty
//           style={{ padding: "64px 0" }}
//           imageStyle={{ width: 128 }}
//           description="No data"
//         />
//       )}
//     </div>
//   );
// };

// export default NewDish;
