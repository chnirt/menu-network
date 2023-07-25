import { Button, FloatingBubble, NavBar, SearchBar } from "antd-mobile";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "react-use";
import { SystemQRcodeOutline } from "antd-mobile-icons";
import SectionList, { tabHeight } from "../../components/SectionList";
// import { SAMPLE_DATA } from "../../mocks";
import { routes } from "../../routes";
import { getColRef } from "../../firebase/service";
import useAuth from "../../hooks/useAuth";
import { getDocs } from "firebase/firestore";

const Menu = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  useDebounce(
    () => {
      setDebouncedSearchText(searchText);
    },
    1000,
    [searchText]
  );
  let { menuId } = useParams();
  const fetchCategory = useCallback(async () => {
    if (user === null) return;
    const categoryColRef = getColRef("users", user.uid, "categories");
    const querySnapshot = await getDocs(categoryColRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const docs = querySnapshot.docs;
      const data = docs.map((docSnapshot) => {
        // console.log(docSnapshot)
        return {
          // ...docSnapshot,
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
      });
      setCategories(data);
    });
  }, []);
  useEffect(() => {
    fetchCategory();
  }, []);
  console.log(
    categories?.map((category) => ({
      ...category,
      dish_type_id: category.id,
      dish_type_name: category.categoryName,
      data: [],
    }))
  );
  const data = categories?.map((category) => ({
    ...category,
    id: category.id,
    title: category.categoryName,
  }));
  // const data = SAMPLE_DATA.reply.menu_infos.map((menu_info) => ({
  //   ...menu_info,
  //   title: menu_info.dish_type_name,
  //   data: menu_info.dishes.map((dish) => ({
  //     ...dish,
  //     price: dish.price.text,
  //     photo: dish.photos[0].value,
  //     categoryName: menu_info.dish_type_name,
  //   })),
  // }));
  const navigate = useNavigate();
  const handleFloatingBubble = useCallback(() => {
    if (menuId === undefined) return;
    navigate(routes.qrCode.replace(":menuId", menuId));
  }, [navigate, menuId]);
  // useEffect(() => {
  //   if (debouncedSearchText.length > 0) {
  //     const dishName = data
  //       .map((dishes) => dishes.data)
  //       .flat()
  //       .find((dish) => dish.name.includes(debouncedSearchText))?.name;
  //     // console.log(dishName);
  //     if (dishName) {
  //       const id = `anchor-dish-${dishName}`;
  //       const element = document.getElementById(id);
  //       if (element === null) return;
  //       window.scrollTo({
  //         top:
  //           element.getBoundingClientRect().top +
  //           window.scrollY -
  //           tabHeight -
  //           16,
  //       });
  //     }
  //   }
  // }, [debouncedSearchText, data]);

  const right = (
    <Button
      color="primary"
      fill="none"
      size="mini"
      onClick={() => navigate(routes.newCategory)}
    >
      NEW CATEGORY
    </Button>
  ); // Danh mujc

  return (
    <div>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        back={null}
        right={right}
      >
        MENU
      </NavBar>
      <div className="sticky top-[45px] z-[100] bg-white">
        <SearchBar
          placeholder="Search"
          showCancelButton
          cancelText="Cancel"
          value={searchText}
          onChange={setSearchText}
        />
      </div>
      <SectionList
        data={data}
        searchText={debouncedSearchText}
        onClickNewDish={() => navigate(routes.newDish)}
      />
      <FloatingBubble
        style={{
          "--initial-position-bottom": "60px",
          "--initial-position-right": "12px",
          "--edge-distance": "12px",
        }}
        onClick={handleFloatingBubble}
      >
        <SystemQRcodeOutline fontSize={16} />
      </FloatingBubble>
    </div>
  );
};

export default Menu;
