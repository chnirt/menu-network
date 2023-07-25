import { Button, FloatingBubble, NavBar, SearchBar } from "antd-mobile";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "react-use";
import { SystemQRcodeOutline } from "antd-mobile-icons";
import {
  DocumentData,
  QueryDocumentSnapshot,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import SectionList, { tabHeight } from "../../components/SectionList";
// import { SAMPLE_DATA } from "../../mocks";
import { routes } from "../../routes";
import { getColRef } from "../../firebase/service";
import useAuth from "../../hooks/useAuth";

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
    const docs = querySnapshot.docs;
    const data = await Promise.all(
      docs.map(async (docSnapshot) => {
        const dishesDocs = await getDocs(
          getColRef(docSnapshot.ref.path, "dishes")
        );
        return {
          // ...docSnapshot,
          id: docSnapshot.id,
          ...docSnapshot.data(),
          title: docSnapshot.data().categoryName,
          data: dishesDocs.docs.map((dishDoc) => ({
            id: dishDoc.id,
            ...dishDoc.data(),
            ref: dishDoc.ref,
            name: dishDoc.data().dishName,
            photo: dishDoc.data().dishFiles?.[0],
            price: dishDoc.data().price,
          })),
        };
      })
    );
    console.log(data);
    setCategories(data);
  }, []);
  useEffect(() => {
    fetchCategory();
  }, []);

  const navigate = useNavigate();
  const handleFloatingBubble = useCallback(() => {
    if (menuId === undefined) return;
    navigate(routes.qrCode.replace(":menuId", menuId));
  }, [navigate, menuId]);
  useEffect(() => {
    if (debouncedSearchText.length > 0) {
      const dishName = categories
        .map((dishes) => dishes.data)
        .flat()
        .find((dish) => dish.name.includes(debouncedSearchText))?.name;
      // console.log(dishName);
      if (dishName) {
        const id = `anchor-dish-${dishName}`;
        const element = document.getElementById(id);
        if (element === null) return;
        window.scrollTo({
          top:
            element.getBoundingClientRect().top +
            window.scrollY -
            tabHeight -
            16,
        });
      }
    }
  }, [debouncedSearchText, categories]);

  const right = (
    <Button
      color="primary"
      fill="none"
      size="mini"
      onClick={() => navigate(routes.newCategory)}
    >
      NEW CATEGORY
    </Button>
  );

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
        // data={data}
        data={categories}
        myKey="title"
        onClickNewDish={(categoryId: string) =>
          navigate(routes.newDish.replace(":categoryId", categoryId))
        }
        onDeleteConfirm={async (
          dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>
        ) => {
          await deleteDoc(dataItem.ref);
          await fetchCategory();
        }}
        onUpdateConfirm={(
          dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>,
          categoryId: string
        ) =>
          navigate(
            routes.updateDish
              .replace(":categoryId", categoryId)
              .replace(":dishId", dataItem.id)
          )
        }
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
