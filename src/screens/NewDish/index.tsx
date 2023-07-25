import { Button, Form, Input, NavBar, Stepper, Toast } from "antd-mobile";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { addDocument, getColRef } from "../../firebase/service";
import useAuth from "../../hooks/useAuth";
import { MASTER_MOCK_DATA } from "../../mocks";

const initialValues = MASTER_MOCK_DATA.NEW_DISH;

const NewDish = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  let { categoryId } = useParams();
  const onFinish = async (values: typeof initialValues) => {
    if (user === null || categoryId === undefined) return;
    try {
      const { dishName, price } = values;
      const uid = user.uid;
      const dishData = {
        dishName,
        price,
      };
      const categoryDocRef = getColRef(
        "users",
        uid,
        "categories",
        categoryId,
        "dishes"
      );
      await addDocument(categoryDocRef, dishData);

      navigate(routes.menu);
      Toast.show({
        icon: "success",
        content: "Dish is created",
      });

      return;
    } catch (error: any) {
      Toast.show({
        icon: "error",
        content: error.message,
      });
    } finally {
    }
  };

  return (
    <Fragment>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        NEW DISH
      </NavBar>
      <Form
        initialValues={initialValues}
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            CREATE
          </Button>
        }
      >
        <Form.Header>New Dish</Form.Header>
        <Form.Item
          name="dishName"
          label="Dish Name"
          rules={[{ required: true, message: "Dish Name is required" }]}
        >
          <Input placeholder="Phatty’S Nachos" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <Stepper
            style={{
              width: "100%",
              "--border": "1px solid #f5f5f5",
              "--border-inner": "none",
              "--height": "36px",
              "--input-width": "70px",
              "--input-background-color": "var(--adm-color-background)",
              "--active-border": "1px solid #1677ff",
            }}
            min={0}
            step={1000}
            formatter={(value) => `VND ${value}`}
            parser={(text) => parseFloat(text.replace("VND", ""))}
          />
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default NewDish;

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
