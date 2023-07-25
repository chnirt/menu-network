import { useCallback, useEffect, useRef, useState } from "react";
import {
  // Button,
  Dialog,
  Image,
  List,
  SwipeAction,
  SwipeActionRef,
  Tabs,
} from "antd-mobile";
import { useThrottleFn } from "ahooks";
import { EditSOutline, DeleteOutline } from "antd-mobile-icons";
import { Action } from "antd-mobile/es/components/swipe-action";
// import HorizontalSection from "../HorizontalSection";
// import VerticalSection from "../VerticalSection";
import ListHeader from "../ListHeader";

const tabContainer = 42;
const tabLine = 2;
const navBarHeight = 45;
const searchHeight = 32;
const top = navBarHeight + searchHeight;
export const tabHeight = tabContainer + tabLine + top;

const SectionList = ({
  data: tabItems,
  onClickNewDish,
  myKey,
  onDeleteConfirm,
  onUpdateConfirm,
}: {
  data: any[];
  onClickNewDish?: (categoryId: string) => void;
  myKey: string;
  onDeleteConfirm?: (dataItem: any) => void;
  onUpdateConfirm?: (dataItem: any, categoryId: string) => void;
}) => {
  const scrollRef = useRef<boolean>(true);
  const setTimerRef = useRef<number | null | undefined>(null);
  const [activeKey, setActiveKey] = useState(tabItems?.[0]?.[myKey]);
  const { run: handleScroll } = useThrottleFn(
    () => {
      if (!scrollRef.current) return;
      let currentKey = tabItems?.[0]?.[myKey];
      for (const item of tabItems) {
        const element = document.getElementById(
          `anchor-category-${item[myKey]}`
        );
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (Math.floor(rect.top) <= tabHeight + 5) {
          currentKey = item[myKey];
        } else {
          break;
        }
      }
      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  );

  const swipeActionRef = useRef<SwipeActionRef>(null);
  const handleOnAction = useCallback(
    async (action: Action, dataItem: any, categoryId: string) => {
      switch (action.key) {
        case "update":
          {
            typeof onUpdateConfirm === "function"
              ? onUpdateConfirm(dataItem, categoryId)
              : undefined;
            swipeActionRef.current?.close();
          }
          return;
        case "delete":
          {
            await Dialog.confirm({
              content: "Delete?",
              cancelText: "Cancel",
              confirmText: "Delete",
              onConfirm:
                typeof onDeleteConfirm === "function"
                  ? () => onDeleteConfirm(dataItem)
                  : undefined,
            });
            swipeActionRef.current?.close();
          }
          return;
        default:
          return;
      }
    },
    [onDeleteConfirm]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setActiveKey(tabItems?.[0]?.[myKey]);
  }, [tabItems]);

  const rightActions: Action[] = [
    {
      key: "update",
      text: <EditSOutline />,
      color: "warning",
    },
    {
      key: "delete",
      text: <DeleteOutline />,
      color: "danger",
    },
  ];

  return (
    <div className="relative">
      <div className={`sticky top-[${top}px] z-[100] bg-white`}>
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            scrollRef.current = false;
            if (setTimerRef.current) {
              clearTimeout(setTimerRef.current);
              setTimerRef.current = null;
            }

            const id = `anchor-category-${key}`;
            const element = document.getElementById(id);
            if (element === null) return;
            window.scrollTo({
              top:
                element.getBoundingClientRect().top +
                window.scrollY -
                tabHeight,
            });
            setActiveKey(key);

            setTimerRef.current = window.setTimeout(() => {
              scrollRef.current = true;
              if (setTimerRef.current === null) return;
              clearTimeout(setTimerRef.current);
              setTimerRef.current = null;
            }, 1000);
          }}
        >
          {tabItems.map((item: any) => (
            <Tabs.Tab key={`${item[myKey]}`} title={item.title} />
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
                header={
                  <SwipeAction
                    ref={swipeActionRef}
                    rightActions={rightActions}
                    // onAction={(action) => handleOnAction(action, dataItem)}
                  >
                    <ListHeader
                      {...{
                        title: tabItem.title,
                        onClickNewDish:
                          typeof onClickNewDish === "function"
                            ? () => onClickNewDish(tabItem.id)
                            : undefined,
                      }}
                    />
                  </SwipeAction>
                }
              >
                {tabItem?.data?.length > 0
                  ? tabItem.data.map((dataItem: any, dii: number) => (
                      <div
                        key={`data-item-${dii}`}
                        id={`anchor-dish-${dataItem?.name}`}
                      >
                        <SwipeAction
                          ref={swipeActionRef}
                          rightActions={rightActions}
                          onAction={(action) =>
                            handleOnAction(action, dataItem, tabItem.id)
                          }
                        >
                          <List.Item
                            prefix={
                              <Image
                                className="rounded-3xl"
                                src={dataItem.photo ?? ""}
                                fit="cover"
                                width={40}
                                height={40}
                              />
                            }
                          >
                            <div className="flex flex-row justify-between items-between">
                              <div>{dataItem.name}</div>
                              <div>{dataItem.price}</div>
                            </div>
                          </List.Item>
                        </SwipeAction>
                      </div>
                    ))
                  : null}
              </List>
            </div>
          );
          // const lengthLessThan3 = tabItem.data.length <= 3;
          // return (
          //   <div id={`anchor-category-${tabItem[myKey]}`} key={tabItem[myKey]}>
          //     <div className="flex justify-between">
          //       <h2 className="py-1 px-4">{tabItem.title}</h2>
          //       <Button
          //         color="primary"
          //         fill="none"
          //         size="mini"
          //         onClick={onClickNewDish}
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
  );
};

export default SectionList;
