import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  Image,
  List,
  SwipeAction,
  SwipeActionRef,
  Tabs,
} from 'antd-mobile'
import { useThrottleFn } from 'ahooks'
import { EditSOutline, DeleteOutline } from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/swipe-action'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import HorizontalSection from "../HorizontalSection";
// import VerticalSection from "../VerticalSection";
import ListHeader from '../ListHeader'

const tabContainer = 38
const tabLine = 0
const navBarHeight = 45
const searchHeight = 32
const top = navBarHeight + searchHeight
export const tabHeight = tabContainer + tabLine + top

const SectionList = ({
  data: tabItems,
  onClickNewList,
  myKey = 'name',
  onDeleteConfirmList,
  onUpdateConfirmList,
  onDeleteConfirmListItem,
  onUpdateConfirmListItem,
  onClickListItem,
  loadingComponent,
  readOnly,
  emptyComponent,
  listItemComponent,
}: {
  data?: any[]
  onClickNewList?: (categoryId: string) => void
  myKey?: string
  onDeleteConfirmList?: (tabItem: any) => void
  onUpdateConfirmList?: (categoryId: string) => void
  onDeleteConfirmListItem?: (dataItem: any) => void
  onUpdateConfirmListItem?: (dataItem: any, categoryId: string) => void
  onClickListItem?: (dataItem: any) => void
  loadingComponent?: JSX.Element
  readOnly?: boolean
  emptyComponent?: JSX.Element
  listItemComponent?: (dataItem: any) => JSX.Element
}) => {
  const scrollRef = useRef<boolean>(true)
  const setTimerRef = useRef<number | null | undefined>(null)
  const [activeKey, setActiveKey] = useState(tabItems?.[0]?.[myKey])
  const { run: handleScroll } = useThrottleFn(
    () => {
      if (!scrollRef.current || tabItems === undefined) return
      let currentKey = tabItems?.[0]?.[myKey]
      for (const item of tabItems) {
        const element = document.getElementById(
          `anchor-category-${item[myKey]}`
        )
        if (!element) continue
        const rect = element.getBoundingClientRect()
        if (Math.floor(rect.top) <= tabHeight + 5) {
          currentKey = item[myKey]
        } else {
          break
        }
      }
      setActiveKey(currentKey)
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  )

  const swipeActionRef = useRef<SwipeActionRef>(null)

  const handleOnActionList = useCallback(
    async (action: Action, tabItem: any) => {
      switch (action.key) {
        case 'update':
          {
            typeof onUpdateConfirmList === 'function'
              ? onUpdateConfirmList(tabItem.id)
              : undefined
            swipeActionRef.current?.close()
          }
          return
        case 'delete':
          {
            await Dialog.confirm({
              content: 'Are you sure want to delete?',
              cancelText: 'Cancel',
              confirmText: 'Delete',
              onConfirm:
                typeof onDeleteConfirmList === 'function'
                  ? () => onDeleteConfirmList(tabItem)
                  : undefined,
            })
            swipeActionRef.current?.close()
          }
          return
        default:
          return
      }
    },
    [onUpdateConfirmList, onDeleteConfirmList]
  )

  const handleOnActionListItem = useCallback(
    async (action: Action, dataItem: any, categoryId: string) => {
      switch (action.key) {
        case 'update':
          {
            typeof onUpdateConfirmListItem === 'function'
              ? onUpdateConfirmListItem(dataItem, categoryId)
              : undefined
            swipeActionRef.current?.close()
          }
          return
        case 'delete':
          {
            await Dialog.confirm({
              content: 'Are you sure want to delete?',
              cancelText: 'Cancel',
              confirmText: 'Delete',
              onConfirm:
                typeof onDeleteConfirmListItem === 'function'
                  ? () => onDeleteConfirmListItem(dataItem)
                  : undefined,
            })
            swipeActionRef.current?.close()
          }
          return
        default:
          return
      }
    },
    [onUpdateConfirmListItem, onDeleteConfirmListItem]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    setActiveKey(tabItems?.[0]?.[myKey])
  }, [tabItems, myKey])

  const rightActions: Action[] = [
    {
      key: 'update',
      text: <EditSOutline />,
      color: 'warning',
    },
    {
      key: 'delete',
      text: <DeleteOutline />,
      color: 'danger',
    },
  ]

  if (tabItems === undefined) {
    if (loadingComponent) return loadingComponent
    return null
  }

  if (tabItems.length === 0) {
    if (emptyComponent) return emptyComponent
    return null
  }

  return (
    <div className="relative">
      <div
        className={`sticky z-[100] bg-white`}
        style={{
          top,
        }}
      >
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            scrollRef.current = false
            if (setTimerRef.current) {
              clearTimeout(setTimerRef.current)
              setTimerRef.current = null
            }

            const id = `anchor-category-${key}`
            const element = document.getElementById(id)
            if (element === null) return
            window.scrollTo({
              top:
                element.getBoundingClientRect().top +
                window.scrollY -
                tabHeight,
            })
            setActiveKey(key)

            setTimerRef.current = window.setTimeout(() => {
              scrollRef.current = true
              if (setTimerRef.current === null) return
              clearTimeout(setTimerRef.current)
              setTimerRef.current = null
            }, 1000)
          }}
        >
          {tabItems.map((item: any) => (
            <Tabs.Tab key={`${item?.[myKey]}`} title={item?.[myKey]} />
          ))}
        </Tabs>
      </div>
      <div>
        {tabItems.map((tabItem: any, ti: number) => {
          return (
            <div
              key={`${tabItem[myKey]}-${ti}`}
              id={`anchor-category-${tabItem[myKey]}`}
            >
              <List
                mode="card"
                // header={tabItem.title}
                className="bg-transparent"
                header={
                  <SwipeAction
                    style={{
                      '--background': 'transparent',
                    }}
                    ref={swipeActionRef}
                    rightActions={!readOnly ? rightActions : undefined}
                    onAction={(action) => handleOnActionList(action, tabItem)}
                  >
                    <ListHeader
                      {...{
                        title: tabItem?.[myKey],
                        onClickNewList:
                          typeof onClickNewList === 'function'
                            ? () => onClickNewList(tabItem.id)
                            : undefined,
                        readOnly,
                      }}
                    />
                  </SwipeAction>
                }
              >
                {tabItem?.data?.length > 0
                  ? tabItem.data.map((dataItem: any, dii: number) => {
                      // console.log("dataItem---", dataItem)
                      return (
                        <div
                          key={`data-item-${dii}`}
                          id={`anchor-dish-${dataItem?.name}`}
                        >
                          <SwipeAction
                            style={{
                              '--background': 'transparent',
                            }}
                            ref={swipeActionRef}
                            rightActions={!readOnly ? rightActions : undefined}
                            onAction={(action) =>
                              handleOnActionListItem(
                                action,
                                dataItem,
                                tabItem.id
                              )
                            }
                          >
                            <List.Item
                              className="bg-transparent"
                              style={{
                                '--active-background-color': 'none',
                              }}
                              // prefix={
                              //   <Image
                              //     className="rounded-3xl [&_img]:m-0"
                              //     src={dataItem.photo ?? ''}
                              //     fit="cover"
                              //     width={80}
                              //     height={80}
                              //   />
                              // }
                              // prefix={
                              //   <LazyLoadImage
                              //     className="rounded-3xl"
                              //     alt={`dish-${dii}`}
                              //     height={40}
                              //     src={dataItem.photo ?? ''}
                              //     width={40}
                              //   />
                              // }
                              onClick={
                                typeof onClickListItem === 'function'
                                  ? () => onClickListItem(dataItem)
                                  : undefined
                              }
                              arrow={false}
                            >
                              {typeof listItemComponent === 'function' ? (
                                listItemComponent(dataItem)
                              ) : (
                                <div className="flex items-center">
                                  <Image
                                    className="rounded-3xl [&_img]:m-0"
                                    src={dataItem.photo ?? ''}
                                    fit="cover"
                                    width={80}
                                    height={80}
                                  />
                                  <div className="flex flex-1 flex-row justify-between items-between">
                                    <div>{dataItem.name}</div>
                                    <div>{dataItem.price}</div>
                                  </div>
                                </div>
                              )}
                            </List.Item>
                          </SwipeAction>
                        </div>
                      )
                    })
                  : null}
              </List>
            </div>
          )
          // const lengthLessThan3 = tabItem.data.length <= 3;
          // return (
          //   <div id={`anchor-category-${tabItem[myKey]}`} key={tabItem[myKey]}>
          //     <div className="flex justify-between">
          //       <h2 className="py-1 px-4">{tabItem.title}</h2>
          //       <Button
          //         color="primary"
          //         fill="none"
          //         size="mini"
          //         onClick={onClickNewList}
          //       >
          //         NEW DISH
          //       </Button>
          //     </div>
          //     {lengthLessThan3 ? (
          //       <VerticalSection
          //         key={`section-item-${ti}`}
          //         {...tabItem}
          //       />
          //     ) : (
          //       <HorizontalSection
          //         key={`section-item-${ti}`}
          //         {...tabItem}
          //       />
          //     )}
          //   </div>
          // );
        })}
      </div>
    </div>
  )
}

export default SectionList
