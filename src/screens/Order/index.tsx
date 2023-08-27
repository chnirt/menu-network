import { Dialog, List, NavBar, SwipeAction, SwipeActionRef } from 'antd-mobile'
import { useCallback, useEffect, useRef } from 'react'
import useOrder from '../../hooks/useOrder'
import { DeleteOutline } from 'antd-mobile-icons'
import { Action } from 'antd-mobile/es/components/swipe-action'
import { deleteDoc } from 'firebase/firestore'

const Order = () => {
  const { fetchOrder, orders } = useOrder()
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
    []
  )

  useEffect(() => {
    fetchOrder()
  }, [])

  const rightActions: Action[] = [
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

      <List mode="card">
        {orders?.length > 0
          ? orders.map((order, oi) => (
              <SwipeAction
                key={`order-${oi}`}
                style={{
                  '--background': 'transparent',
                }}
                ref={swipeActionRef}
                rightActions={rightActions}
                onAction={(action) => handleOnActionList(action, order)}
              >
                <List.Item>{order.id}</List.Item>
              </SwipeAction>
            ))
          : null}
      </List>
    </div>
  )
}

export default Order
