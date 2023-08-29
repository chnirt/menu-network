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
import { useCallback, useEffect, useRef, useState } from 'react'
import useOrder from '../../hooks/useOrder'
import { DeleteOutline, EditSOutline } from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/swipe-action'
import { deleteDoc } from 'firebase/firestore'
import moment from 'moment'
import { generatePath, useNavigate } from 'react-router-dom'
import { routes } from '../../routes'
import useAuth from '../../hooks/useAuth'

const Order = () => {
  const { fetchOrder, orders } = useOrder()
  const navigate = useNavigate()
  const { user } = useAuth()
  const swipeActionRef = useRef<SwipeActionRef>(null)
  const [orderSelected, setOrderSelected] = useState<any>()

  const handleOnActionList = useCallback(
    async (action: Action, orderItem: any) => {
      switch (action.key) {
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
    [fetchOrder, navigate]
  )

  const handlePay = useCallback(() => {}, [])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

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

      <CheckList
        mode="card"
        multiple
        value={orderSelected}
        defaultValue={orderSelected ?? []}
        onChange={setOrderSelected}
      >
        {user && orders?.length > 0
          ? orders.map((order, oi) => {
              return (
                <SwipeAction
                  key={`order-${oi}`}
                  style={{
                    '--background': 'transparent',
                  }}
                  ref={swipeActionRef}
                  rightActions={rightActions}
                  onAction={(action) => handleOnActionList(action, order)}
                >
                  <CheckList.Item value={order?.id}>
                    <div className="">
                      <div className="flex justify-between">
                        <div className="flex gap-3 items-center">
                          {order?.status === 'new' ? (
                            <Tag className="rounded-full" color="default">
                              NEW
                            </Tag>
                          ) : order?.status === 'cancel' ? (
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
                            {order?.objectType?.objectType}
                          </Tag>
                        </div>
                        <div>
                          <p className="m-0">
                            {moment(order?.createdAt.toDate()).format(
                              'DD MMM YYYY HH:mm'
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h2 className="m-0">{order?.objectType?.objectName}</h2>
                        <p className="m-0 line-clamp-2 text-xs text-[#999999]">
                          {order?.id}
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
