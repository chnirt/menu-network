import {
  Button,
  CheckList,
  Dialog,
  NavBar,
  Space,
  SwipeAction,
  SwipeActionRef,
  Tag,
} from 'antd-mobile'
import { useCallback, useMemo, useRef, useState } from 'react'
import useOrder from '../../hooks/useOrder'
import { AddOutline, DeleteOutline, EditSOutline } from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/swipe-action'
import { deleteDoc } from 'firebase/firestore'
import moment from 'moment'
import { generatePath, useNavigate } from 'react-router-dom'
import { routes } from '../../routes'
import useAuth from '../../hooks/useAuth'
import DatePicker from '../../components/DatePicker'
import dayjs from 'dayjs'
import {
  addDocument,
  getColRef,
  getDocRef,
  getDocument,
} from '../../firebase/service'

const Order = () => {
  const {
    fetchOrder,
    orders,
    bills,
    fetchBill,
    objects,
    setOrder,
    setObjectType,
    setOrderId,
    setOrderDocRefState
  } = useOrder()
  const navigate = useNavigate()
  const { user } = useAuth()
  const swipeActionRef = useRef<SwipeActionRef>(null)
  const [orderSelected, setOrderSelected] = useState<any>()
  const today = dayjs()
  const [val, setVal] = useState<[Date, Date] | null>(() => [
    today.toDate(),
    today.toDate(),
    // today.subtract(2, 'day').toDate(),
    // today.add(2, 'day').toDate(),
  ])

  const handleOnActionList = useCallback(
    async (action: Action, orderItem: any) => {
      switch (action.key) {
        case 'add':
          {
            const orderDocRef = getDocRef('orders', orderItem.id)
            setOrderDocRefState(orderDocRef)
            const orderDocData: any = await getDocument(orderDocRef)
            setOrder(orderDocData?.order)
            setObjectType(orderDocData?.objectType)
            setOrderId(orderItem.id)
            navigate(routes.dashboard)
          }
          return
        case 'update':
          {
            navigate(
              generatePath(routes.updateOrder, { orderId: orderItem.id })
            )
          }
          return
        case 'delete':
          {
            await Dialog.confirm({
              content: 'Are you sure want to delete?',
              cancelText: 'Cancel',
              confirmText: 'Delete',
              onConfirm: async () => {
                await deleteDoc(orderItem.ref)
                if (typeof fetchOrder === 'function') {
                  fetchOrder()
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
    [fetchOrder, navigate, setObjectType, setOrder, setOrderId, setOrderDocRefState]
  )

  const handlePay = useCallback(async () => {
    if (user === null) return
    const billData = {
      orders: orderSelected,
      uid: user.uid,
    }
    const billDocRef = getColRef('bills')
    await addDocument(billDocRef, billData)

    fetchBill()

    navigate(routes.bill)
  }, [orderSelected, user, navigate, fetchBill])

  const filterOrders = useMemo(() => {
    if (val === null) return []
    return orders
      .filter((order) => {
        return moment(order.createdAt.toDate()).isBetween(
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
      .map((order) => {
        return {
          ...order,
        }
      })
  }, [orders, val])

  const leftActions: Action[] = [
    {
      key: 'add',
      text: <AddOutline />,
      color: 'primary',
    },
  ]

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

  return (
    <div>
      <NavBar className="sticky top-0 z-[100] bg-white" back={null}>
        ORDER
      </NavBar>

      <div className="m-3">
        <DatePicker value={val} onChange={setVal} />
      </div>

      <CheckList
        mode="card"
        multiple
        value={orderSelected}
        defaultValue={orderSelected ?? []}
        onChange={setOrderSelected}
      >
        {user && filterOrders?.length > 0
          ? filterOrders.map((order, oi) => {
              const orderId = order?.id
              const createdAt = order?.createdAt
              const foundBill = bills
                .map((bill) => bill?.orders ?? [])
                .flat()
                .some((flatBillOrder) => flatBillOrder === order?.id)
              const status = foundBill ? 'complete' : order?.status
              const isCancel = status === 'cancel'
              const isComplete = status === 'complete'
              const disabled = isCancel || isComplete
              const foundObjectType = objects?.find(
                (object) => object.id === order?.objectType?.id
              )
              const objectType = foundObjectType?.objectType
              const objectName = foundObjectType?.objectName
              return (
                <SwipeAction
                  key={`order-${oi}`}
                  style={{
                    '--background': 'transparent',
                  }}
                  ref={swipeActionRef}
                  leftActions={disabled ? [] : leftActions}
                  rightActions={disabled ? [] : rightActions}
                  onAction={(action) => handleOnActionList(action, order)}
                >
                  <CheckList.Item value={order?.id} disabled={disabled}>
                    <div className="">
                      <div className="flex justify-between">
                        <div className="flex gap-3 items-center">
                          {status === 'new' ? (
                            <Tag className="rounded-full" color="default">
                              NEW
                            </Tag>
                          ) : status === 'cancel' ? (
                            <Tag className="rounded-full" color="danger">
                              CANCEL
                            </Tag>
                          ) : (
                            <Tag className="rounded-full" color="success">
                              COMPLETE
                            </Tag>
                          )}
                          <Tag
                            className="rounded-full uppercase"
                            color="primary"
                          >
                            {objectType}
                          </Tag>
                        </div>
                        <div>
                          <p className="m-0">
                            {moment(createdAt.toDate()).format(
                              'DD MMM YYYY HH:mm'
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h2 className="m-0">{objectName}</h2>
                        <p className="m-0 line-clamp-2 text-xs text-[#999999]">
                          {orderId}
                        </p>
                      </div>
                    </div>
                  </CheckList.Item>
                </SwipeAction>
              )
            })
          : null}
      </CheckList>

      {user && orderSelected?.length > 0 ? (
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
            onClick={handlePay}
          >
            <Space>PAY</Space>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default Order
