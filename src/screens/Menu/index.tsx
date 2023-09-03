import {
  Badge,
  Button,
  Empty,
  // FloatingBubble,
  NavBar,
  PullToRefresh,
  SearchBar,
  Space,
  // Toast,
} from 'antd-mobile'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'react-use'
import {
  DocumentData,
  QueryDocumentSnapshot,
  deleteDoc,
} from 'firebase/firestore'
// import { QrCode, Wifi } from 'lucide-react'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
import { pick } from 'lodash'
import SectionList, { tabHeight } from '../../components/SectionList'
import { routes } from '../../routes'
import useAuth from '../../hooks/useAuth'
import useMenu from '../../hooks/useMenu'
import MenuLoading from './components/MenuLoading'
// import ScrollToTop from '../../components/ScrollToTop '
import { ShoppingBag } from 'lucide-react'
import useOrder from '../../hooks/useOrder'
import DishItem from '../../components/DishItem'

const Menu = () => {
  const { user } = useAuth()
  const { menuId } = useParams()
  const isOwner = user?.uid === menuId
  const { categories, dishes, fetchCategories, fetchDishes } = useMenu()
  const { addOrder, orderTotal, order } = useOrder()
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const navigate = useNavigate()

  const formatCategories = useMemo(
    () =>
      categories?.map((category) => ({
        ...category,
        data:
          dishes !== undefined
            ? dishes?.filter((item: any) => item?.categoryId === category?.id)
            : [],
      })),
    [categories, dishes]
  )
  const filterCategories = useMemo(() => {
    if (formatCategories === undefined) return undefined
    if (debouncedSearchText.length === 0) return formatCategories
    return formatCategories
      .map((category) => ({
        ...category,
        data: category?.data?.filter((dish: any) =>
          String(dish?.name)
            .toLowerCase()
            .includes(String(debouncedSearchText).toLowerCase())
        ),
      }))
      .filter((category) => category?.data?.length > 0)
  }, [formatCategories, debouncedSearchText])

  useDebounce(
    () => {
      setDebouncedSearchText(searchText)
    },
    500,
    [searchText]
  )

  // const handleShareQRCode = menuId
  //   ? () =>
  //       navigate(
  //         generatePath(routes.qrCode, {
  //           menuId,
  //         }),
  //         {
  //           state: {
  //             logo: menu?.logo,
  //           },
  //         }
  //       )
  //   : undefined

  // const handleCopyWifi = useCallback(() => {
  //   Toast.show({
  //     icon: 'success',
  //     content: 'Copied',
  //   })
  // }, [])

  const onRefresh = useCallback(async () => {
    fetchCategories()
  }, [fetchCategories])

  const onClickNewList = useCallback(
    (categoryId: string) =>
      navigate(generatePath(routes.newDish, { categoryId })),
    [navigate]
  )

  const onUpdateConfirmList = useCallback(
    (categoryId: string) =>
      navigate(generatePath(routes.updateCategory, { categoryId })),
    [navigate]
  )

  const onDeleteConfirmList = useCallback(
    async (tabItem: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      await deleteDoc(tabItem.ref)
      fetchCategories()
    },
    [fetchCategories]
  )

  const onDeleteConfirmListItem = useCallback(
    async (dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      await deleteDoc(dataItem.ref)
      fetchDishes()
    },
    [fetchDishes]
  )

  const onUpdateConfirmListItem = useCallback(
    (
      dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>,
      categoryId: string
    ) =>
      navigate(
        generatePath(routes.updateDish, {
          categoryId,
          dishId: dataItem.id,
        })
      ),
    [navigate]
  )

  const onClickListItem = useCallback(
    (dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
      // console.log(dataItem)
      navigate(generatePath(routes.dish, { dishId: dataItem?.id }), {
        state: {
          dish: pick(dataItem, [
            'id',
            'dishFiles',
            'dishName',
            'dishDescription',
            'price',
          ]),
        },
      })
    },
    [navigate]
  )

  useEffect(() => {
    // if (menuId === undefined || typeof fetchMenu !== 'function') return
    // const handleFetchMenu = async () => {
    //   try {
    //     await fetchMenu(menuId)
    //     // do something
    //   } catch (e) {
    //     navigate(routes.error)
    //   }
    // }
    // handleFetchMenu()
    // }, [menuId, fetchMenu, navigate])
  }, [])

  useEffect(() => {
    if (debouncedSearchText.length > 0 && Array.isArray(categories)) {
      const isScroll = !true
      if (isScroll) {
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
    }
  }, [debouncedSearchText, categories])

  const right = useMemo(
    () => (
      <Link to={routes.newCategory}>
        <Button color="primary" fill="none" size="mini">
          NEW CATEGORY
        </Button>
      </Link>
    ),
    []
  )

  return (
    <div>
      <div
        style={{
          paddingBottom: 60 * 3 + 12,
        }}
      >
        <NavBar
          className="sticky top-0 z-[100] bg-white"
          back={null}
          right={isOwner ? right : null}
        >
          MENU
        </NavBar>
        <div className="sticky top-[45px] z-[100] bg-white">
          <SearchBar
            placeholder="Search"
            value={searchText}
            onChange={setSearchText}
          />
        </div>
        <PullToRefresh onRefresh={onRefresh}>
          <SectionList
            data={filterCategories}
            loadingComponent={<MenuLoading />}
            onClickNewList={onClickNewList}
            onUpdateConfirmList={onUpdateConfirmList}
            onDeleteConfirmList={onDeleteConfirmList}
            onDeleteConfirmListItem={onDeleteConfirmListItem}
            onUpdateConfirmListItem={onUpdateConfirmListItem}
            onClickListItem={onClickListItem}
            listItemComponent={
              isOwner
                ? (dataItem: any) => {
                    const foundOrder = order?.find(
                      (dish: any) => dish.dishId === dataItem.id
                    )
                    return (
                      <DishItem
                        item={dataItem}
                        count={foundOrder?.count}
                        note={foundOrder?.note}
                        onChangeValue={(value: any) => {
                          if (addOrder === undefined) return
                          addOrder({
                            dishId: dataItem.id,
                            ...value,
                          })
                        }}
                      />
                    )
                  }
                : undefined
            }
            emptyComponent={
              <Empty
                style={{ padding: '64px 0' }}
                imageStyle={{ width: 128 }}
                description="No data"
              />
            }
            readOnly={!isOwner}
          />
        </PullToRefresh>

        {/* {filterCategories !== undefined && (
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
            <QrCode fontSize={16} />
          </FloatingBubble>
        )}

        {filterCategories !== undefined && menu?.wifi ? (
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
            {menu?.wifi ? (
              <CopyToClipboard text={menu?.wifi} onCopy={handleCopyWifi}>
                <Wifi fontSize={16} />
              </CopyToClipboard>
            ) : (
              <Wifi fontSize={16} />
            )}
          </FloatingBubble>
        ) : null} */}

        {/* <ScrollToTop /> */}
      </div>

      {user && orderTotal > 0 ? (
        <div
          className="sticky m-3 pb-safe"
          style={{
            bottom: 76,
          }}
        >
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            shape="rounded"
            onClick={() => navigate(routes.cart)}
          >
            <Space>
              <Badge content={orderTotal}>
                <ShoppingBag />
              </Badge>
              MY CART
            </Space>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default Menu
