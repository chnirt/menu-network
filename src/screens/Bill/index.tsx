import {
  Calendar,
  Collapse,
  Dialog,
  List,
  NavBar,
  SwipeAction,
  Tag,
} from 'antd-mobile'
import useOrder from '../../hooks/useOrder'
import moment from 'moment'
import dayjs from 'dayjs'
import { useCallback, useMemo, useRef, useState } from 'react'
import { DeleteOutline } from 'antd-mobile-icons'
import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action'
import { deleteDoc } from 'firebase/firestore'
import useMenu from '../../hooks/useMenu'
import DishItem from '../../components/DishItem'

const rightActions: Action[] = [
  {
    key: 'delete',
    text: <DeleteOutline />,
    color: 'danger',
  },
]

const Bill = () => {
  const { fetchBill, bills, orders } = useOrder()
  const { dishes } = useMenu()
  const today = dayjs()
  const [val, setVal] = useState<[Date, Date] | null>(() => [
    today.toDate(),
    today.toDate(),
    // today.subtract(2, 'day').toDate(),
    // today.add(2, 'day').toDate(),
  ])
  const swipeActionRef = useRef<SwipeActionRef>(null)

  const handleOnActionList = useCallback(
    async (action: Action, orderItem: any) => {
      switch (action.key) {
        case 'delete':
          {
            await Dialog.confirm({
              content: 'Are you sure want to delete?',
              cancelText: 'Cancel',
              confirmText: 'Delete',
              onConfirm: async () => {
                await deleteDoc(orderItem.ref)
                if (typeof fetchBill === 'function') {
                  fetchBill()
                }
              },
            })
            swipeActionRef.current?.close()
          }
          return
        default:
          return
      }
    },
    [fetchBill]
  )

  const filterBills = useMemo(() => {
    if (val === null) return []
    return bills
      .filter((bill) => {
        return moment(bill.createdAt.toDate()).isBetween(
          moment(val?.[0]).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          }),
          moment(val?.[1]).set({
            hour: 23,
            minute: 59,
            second: 59,
            millisecond: 999,
          })
        )
      })
      .map((bill) => {
        return {
          ...bill,
        }
      })
  }, [bills, val])

  return (
    <div>
      <NavBar className="sticky top-0 z-[100] bg-white" back={null}>
        BILL
      </NavBar>

      <div className="m-3">
        <Calendar
          selectionMode="range"
          value={val}
          onChange={setVal}
          max={new Date()}
        />
      </div>

      <div>
        {filterBills.length > 0 ? (
          <List mode="card">
            {filterBills.map((bill, bi) => {
              const total = orders
                ?.filter((order: any) => bill?.orders.includes(order?.id))
                ?.map((order: any) => order?.order)
                ?.flat()
                ?.map((orderDish) => {
                  const price =
                    dishes?.find((dish) => dish?.id === orderDish?.dishId)
                      ?.price ?? 0
                  const orderDishTotal = price * orderDish?.count
                  return orderDishTotal
                })
                .reduce((a, b) => a + b, 0)
              return (
                <SwipeAction
                  key={`bill-${bi}`}
                  style={{
                    '--background': 'transparent',
                  }}
                  ref={swipeActionRef}
                  rightActions={rightActions}
                  onAction={(action) => handleOnActionList(action, bill)}
                >
                  <List.Item key={`bill-${bi}`} className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p className="m-0">{bill.id}</p>
                      <p className="m-0 text-xs">
                        {moment(bill?.createdAt.toDate()).format(
                          'DD/MM/YYYY HH:mm'
                        )}
                      </p>
                    </div>
                    <div>
                      {bill?.orders?.length > 0 ? (
                        <div>
                          <Collapse>
                            {bill.orders.map((billOrder: any, oi: number) => {
                              const foundBillOrder = orders?.find(
                                (order) => order?.id === billOrder
                              )
                              const objectName =
                                foundBillOrder?.objectType?.objectName
                              const objectType =
                                foundBillOrder?.objectType?.objectType
                              const billOrderOrder = foundBillOrder?.order?.map(
                                (orderDish: any) => {
                                  const foundDish = dishes?.find(
                                    (dish) => dish?.id === orderDish?.dishId
                                  )
                                  return { ...orderDish, ...foundDish }
                                }
                              )
                              return (
                                <Collapse.Panel
                                  key={`order-${oi}`}
                                  title={
                                    <Tag color="primary" className="uppercase">
                                      {objectType}-{objectName}
                                    </Tag>
                                  }
                                >
                                  {billOrderOrder?.length > 0 ? (
                                    <List>
                                      {billOrderOrder.map(
                                        (
                                          billOrderOrderDish: any,
                                          boodi: number
                                        ) => (
                                          <List.Item
                                            key={`bill-order-order-dish-${boodi}`}
                                          >
                                            <DishItem
                                              item={billOrderOrderDish}
                                              count={
                                                billOrderOrderDish?.count ?? 0
                                              }
                                              disabled
                                            />
                                          </List.Item>
                                        )
                                      )}
                                    </List>
                                  ) : null}
                                  <List></List>
                                </Collapse.Panel>
                              )
                            })}
                          </Collapse>
                          <div className="flex justify-end">
                            <p className="m-0 text-base font-semibold">
                              {total}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </List.Item>
                </SwipeAction>
              )
            })}
          </List>
        ) : null}
      </div>
    </div>
  )
}

export default Bill
