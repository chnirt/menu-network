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
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'react-use'
import { SystemQRcodeOutline } from 'antd-mobile-icons'
import {
  DocumentData,
  QueryDocumentSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { Wifi } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import SectionList, { tabHeight } from '../../components/SectionList'
import { routes } from '../../routes'
import { getDocRef, getDocument } from '../../firebase/service'
import useAuth from '../../hooks/useAuth'
import useMenu from '../../hooks/useMenu'

const Menu = () => {
  const { user } = useAuth()
  const { menuId } = useParams()
  const readOnly = user?.uid !== menuId
  const { categories, fetchCategory, refetchCategory } = useMenu()
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const [wifi, setWifi] = useState<string | null>(null)
  const [currency, setCurrency] = useState<string | null>(null)
  const formatCategories = categories?.map((category) => ({
    ...category,
    data: category.data.map((item: any) => ({
      ...item,
      price:
        currency === 'vnd'
          ? Number(item.price).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })
          : currency === 'usd'
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
    const foundDish = formatCategories
      .map((dishes) => dishes.data)
      .flat()
      .find((dish) =>
        String(dish.name)
          .toLowerCase()
          .includes(String(debouncedSearchText).toLowerCase())
      )
    if (foundDish) {
      const foundCategory = formatCategories.find(
        (category) => category.id === foundDish.parentId
      )
      const filter = [{ ...foundCategory, data: [foundDish] }]
      return filter
    } else {
      return []
    }
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
    const menuDocRef = getDocRef('users', menuId)
    const menuDocData: any = await getDocument(menuDocRef)
    setWifi(menuDocData.wifi)
    setCurrency(menuDocData.currency)
  }, [])

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
    if (menuId && typeof fetchCategory === 'function') {
      fetchCategory(menuId)
    }
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
      <Button
        color="primary"
        fill="none"
        size="mini"
        onClick={() => navigate(routes.newCategory)}
      >
        NEW CATEGORY
      </Button>
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
            navigate(routes.newDish.replace(':categoryId', categoryId))
          }
          onUpdateConfirmList={(categoryId: string) =>
            navigate(routes.updateCategory.replace(':categoryId', categoryId))
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
              description="No data"
            />
          }
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
          <SystemQRcodeOutline fontSize={16} />
        </FloatingBubble>
      )}

      {filterCategories !== undefined && wifi ? (
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
