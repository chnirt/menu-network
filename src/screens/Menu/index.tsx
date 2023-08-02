import {
  Button,
  Empty,
  FloatingBubble,
  NavBar,
  SearchBar,
  Skeleton,
  Toast,
} from 'antd-mobile'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'react-use'
import { SystemQRcodeOutline } from 'antd-mobile-icons'
import {
  DocumentData,
  QueryDocumentSnapshot,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { Wifi } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import SectionList, { tabHeight } from '../../components/SectionList'
// import { SAMPLE_DATA } from "../../mocks";
import { routes } from '../../routes'
import {
  getColGroupRef,
  getColRef,
  getDocRef,
  getDocument,
} from '../../firebase/service'
import useAuth from '../../hooks/useAuth'
import { IS_SAMPLE_QUERY } from '../../constants'

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
  const { user } = useAuth()
  const { menuId } = useParams()
  const readOnly = user?.uid !== menuId
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const [categories, setCategories] = useState<any[] | undefined>()
  const [wifi, setWifi] = useState<string | null>(null)
  useDebounce(
    () => {
      setDebouncedSearchText(searchText)
    },
    1000,
    [searchText]
  )
  const fetchCategory = useCallback(async () => {
    let querySnapshot
    // NOTE: sample query
    if (IS_SAMPLE_QUERY) {
      if (user === null) return
      const categoryColRef = getColRef('users', user.uid, 'categories')
      const q = query(categoryColRef, orderBy('createdAt', 'desc'))
      querySnapshot = await getDocs(q)
    } else {
      const categoryColGroupRef = getColGroupRef('categories')
      const q = query(categoryColGroupRef, where('uid', '==', menuId))
      querySnapshot = await getDocs(q)
    }
    const docs = querySnapshot.docs
    const data = await Promise.all(
      docs.map(async (docSnapshot) => {
        const dishesDocs = await getDocs(
          getColRef(docSnapshot.ref.path, 'dishes')
        )
        return {
          // ...docSnapshot,
          id: docSnapshot.id,
          ...docSnapshot.data(),
          ref: docSnapshot.ref,
          title: docSnapshot.data().categoryName,
          data: dishesDocs.docs.map((dishDoc) => ({
            id: dishDoc.id,
            ...dishDoc.data(),
            ref: dishDoc.ref,
            name: dishDoc.data().dishName,
            photo: dishDoc.data().dishFiles?.[0],
            price: dishDoc.data().price,
          })),
        }
      })
    )
    // console.log(data)
    setCategories(data)
  }, [])
  const fetchMenu = useCallback(async () => {
    if (menuId === undefined) return
    const menuDocRef = getDocRef('users', menuId)
    const menuDocData: any = await getDocument(menuDocRef)
    setWifi(menuDocData.wifi)
  }, [menuId])

  const handleShareQRCode = menuId
    ? () => navigate(routes.qrCode.replace(':menuId', menuId))
    : undefined
  const handleCopyWifi = useCallback(() => {
    Toast.show({
      icon: 'success',
      content: 'Copied',
    })
  }, [])

  useEffect(() => {
    fetchCategory()
    fetchMenu()
  }, [])

  const navigate = useNavigate()
  useEffect(() => {
    if (debouncedSearchText.length > 0 && Array.isArray(categories)) {
      const dishName = categories
        .map((dishes) => dishes.data)
        .flat()
        .find((dish) => dish.name.includes(debouncedSearchText))?.name
      // console.log(dishName);
      if (dishName) {
        const id = `anchor-dish-${dishName}`
        const element = document.getElementById(id)
        if (element === null) return
        window.scrollTo({
          top:
            element.getBoundingClientRect().top +
            window.scrollY -
            tabHeight -
            16,
        })
      }
    }
  }, [debouncedSearchText, categories])

  const right = (
    <Button
      color="primary"
      fill="none"
      size="mini"
      onClick={() => navigate(routes.newCategory)}
    >
      NEW CATEGORY
    </Button>
  )

  return (
    <div className="pb-[132px]">
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        back={null}
        right={!readOnly ? right : null}
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
        loadingComponent={
          <div>
            <div className="flex">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <Skeleton.Title
                    key={`sk-menu-tab-${i}`}
                    className="mx-3 !w-1/3"
                    animated
                  />
                ))}
            </div>
            <div>
              {Array(2)
                .fill(null)
                .map((_, ii) => (
                  <div key={`sk-tab-content-${ii}`}>
                    <div className="flex justify-between">
                      <Skeleton.Title className="!w-1/4" animated />
                      <Skeleton.Title className="!w-1/4" animated />
                    </div>
                    {Array(3)
                      .fill(null)
                      .map((_, iii) => (
                        <div key={`sk-tab-content-sub-${iii}`} className="flex">
                          <div className="flex w-full">
                            <div className="pr-3">
                              <Skeleton.Title
                                className="!w-8 !h-8 !rounded-full"
                                animated
                              />
                            </div>
                            <Skeleton.Title className="!w-1/4" animated />
                          </div>
                          <Skeleton.Title className="!w-1/4" animated />
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        }
        onClickNewDish={(categoryId: string) =>
          navigate(routes.newDish.replace(':categoryId', categoryId))
        }
        onUpdateConfirmList={(categoryId: string) =>
          navigate(routes.updateCategory.replace(':categoryId', categoryId))
        }
        onDeleteConfirmList={async (
          tabItem: QueryDocumentSnapshot<DocumentData, DocumentData>
        ) => {
          await deleteDoc(tabItem.ref)
          await fetchCategory()
        }}
        onDeleteConfirmListItem={async (
          dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>
        ) => {
          await deleteDoc(dataItem.ref)
          await fetchCategory()
        }}
        onUpdateConfirmListItem={(
          dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>,
          categoryId: string
        ) =>
          navigate(
            routes.updateDish
              .replace(':categoryId', categoryId)
              .replace(':dishId', dataItem.id)
          )
        }
        readOnly={readOnly}
        emptyComponent={
          <Empty
            style={{ padding: '64px 0' }}
            imageStyle={{ width: 128 }}
            description="暂无数据"
          />
        }
      />
      <FloatingBubble
        axis="x"
        magnetic="x"
        style={{
          '--initial-position-bottom':
            'calc(60px + env(safe-area-inset-bottom))',
          '--initial-position-right': '12px',
          '--edge-distance': '12px',
        }}
        onClick={handleShareQRCode}
      >
        <SystemQRcodeOutline fontSize={16} />
      </FloatingBubble>

      {wifi ? (
        <FloatingBubble
          axis="x"
          magnetic="x"
          style={{
            '--initial-position-bottom':
              'calc(120px + env(safe-area-inset-bottom))',
            '--initial-position-right': '12px',
            '--edge-distance': '12px',
          }}
        >
          {wifi ? (
            <CopyToClipboard text={wifi} onCopy={handleCopyWifi}>
              <Wifi fontSize={16} />
            </CopyToClipboard>
          ) : (
            <Wifi fontSize={16} />
          )}
        </FloatingBubble>
      ) : null}
    </div>
  )
}

export default Menu
