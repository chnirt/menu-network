import {
  Button,
  Empty,
  FloatingBubble,
  NavBar,
  PullToRefresh,
  SearchBar,
  Skeleton,
  Toast,
} from 'antd-mobile'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'react-use'
import {
  DocumentData,
  QueryDocumentSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { QrCode, Wifi } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import SectionList, { tabHeight } from '../../components/SectionList'
import { routes } from '../../routes'
import { getDocRef, getDocument } from '../../firebase/service'
import useAuth from '../../hooks/useAuth'
import useMenu from '../../hooks/useMenu'
import { pick } from 'lodash'

type IMenu = {
  wifi?: string
  currency?: string
  logo?: string
}

const Menu = () => {
  const { user } = useAuth()
  const { menuId } = useParams()
  const readOnly = user?.uid !== menuId
  const { categories, fetchCategory, refetchCategory } = useMenu()
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const [menu, setMenu] = useState<IMenu | null>(null)
  const formatCategories = categories?.map((category) => ({
    ...category,
    data: category.data.map((item: any) => ({
      ...item,
      price:
        menu?.currency === 'vnd'
          ? Number(item.price).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })
          : menu?.currency === 'usd'
          ? Number(item.price).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
          : item.price,
    })),
  }))
  const filterCategories = useMemo(() => {
    if (formatCategories === undefined) return undefined
    if (debouncedSearchText.length === 0) return formatCategories
    return formatCategories
      .map((category) => ({
        ...category,
        data: category?.data.filter((dish: any) =>
          String(dish.name)
            .toLowerCase()
            .includes(String(debouncedSearchText).toLowerCase())
        ),
      }))
      .filter((category) => category?.data.length > 0)
  }, [formatCategories, debouncedSearchText])

  useDebounce(
    () => {
      setDebouncedSearchText(searchText)
    },
    500,
    [searchText]
  )

  const fetchMenu = useCallback(async (menuId: string) => {
    if (menuId === undefined) return
    try {
      const menuDocRef = getDocRef('users', menuId)
      const menuDocData: any = await getDocument(menuDocRef)
      setMenu(menuDocData)
      if (typeof fetchCategory === 'function') {
        fetchCategory(menuId)
      }
    } catch (error) {
      navigate(routes.error)
    }
  }, [])

  const handleShareQRCode = menuId
    ? () =>
        navigate(
          generatePath(routes.qrCode, {
            menuId,
          }),
          {
            state: {
              logo: menu?.logo,
            },
          }
        )
    : undefined
  const handleCopyWifi = useCallback(() => {
    Toast.show({
      icon: 'success',
      content: 'Copied',
    })
  }, [])

  useEffect(() => {
    if (menuId) {
      fetchMenu(menuId)
    }
  }, [menuId])

  const navigate = useNavigate()
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
          // showCancelButton
          // cancelText="Cancel"
          value={searchText}
          onChange={setSearchText}
        />
      </div>
      <PullToRefresh
        onRefresh={async () => {
          if (menuId && typeof refetchCategory === 'function') {
            refetchCategory(menuId)
          }
          if (menuId) {
            fetchMenu(menuId)
          }
        }}
      >
        <SectionList
          // data={data}
          data={filterCategories}
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
                          <div
                            key={`sk-tab-content-sub-${iii}`}
                            className="flex"
                          >
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
            navigate(generatePath(routes.newDish, { categoryId }))
          }
          onUpdateConfirmList={(categoryId: string) =>
            navigate(generatePath(routes.updateCategory, { categoryId }))
          }
          onDeleteConfirmList={async (
            tabItem: QueryDocumentSnapshot<DocumentData, DocumentData>
          ) => {
            await deleteDoc(tabItem.ref)
            if (menuId && typeof fetchCategory === 'function') {
              fetchCategory(menuId)
            }
          }}
          onDeleteConfirmListItem={async (
            dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>
          ) => {
            await deleteDoc(dataItem.ref)
            if (menuId && typeof fetchCategory === 'function') {
              fetchCategory(menuId)
            }
          }}
          onUpdateConfirmListItem={(
            dataItem: QueryDocumentSnapshot<DocumentData, DocumentData>,
            categoryId: string
          ) =>
            navigate(
              generatePath(routes.updateDish, {
                categoryId,
                dishId: dataItem.id,
              })
            )
          }
          onClickDish={(dataItem) => {
            // console.log(dataItem)
            navigate(generatePath(routes.dish, { dishId: dataItem?.id }), {
              state: {
                dish: pick(dataItem, ['id', 'dishFiles', 'dishName', 'price']),
              },
            })
          }}
          emptyComponent={
            <Empty
              style={{ padding: '64px 0' }}
              imageStyle={{ width: 128 }}
              description="No data"
            />
          }
          readOnly={readOnly}
        />
      </PullToRefresh>

      {filterCategories !== undefined && (
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
      ) : null}
    </div>
  )
}

export default Menu
