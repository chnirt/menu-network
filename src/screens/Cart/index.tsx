import { Button, Dialog, List, NavBar } from 'antd-mobile'
import useOrder from '../../hooks/useOrder'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useMemo, useRef } from 'react'
import { routes } from '../../routes'
import { DeleteOutline } from 'antd-mobile-icons'
import SwipeAction, {
  Action,
  SwipeActionRef,
} from 'antd-mobile/es/components/swipe-action'

const Order = () => {
  const navigate = useNavigate()
  const { order, clearCart, removeOrder } = useOrder()
  const swipeActionRef = useRef<SwipeActionRef>(null)

  const handleAddOrder = useCallback(() => {
    clearCart()
    navigate(routes.order)
  }, [])

  const handleOnActionList = useCallback(
    async (action: Action, dishItem: any) => {
      switch (action.key) {
        case 'delete':
          {
            await Dialog.confirm({
              content: 'Are you sure want to delete?',
              cancelText: 'Cancel',
              confirmText: 'Delete',
              onConfirm: () => {
                removeOrder(dishItem.dishId)
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

  const right = useMemo(
    () => (
      <Link to={routes.menu}>
        <Button color="primary" fill="none" size="mini">
          MENU
        </Button>
      </Link>
    ),
    []
  )

  const rightActions: Action[] = [
    {
      key: 'delete',
      text: <DeleteOutline />,
      color: 'danger',
    },
  ]

  return (
    <div>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
        right={right}
      >
        CART
      </NavBar>
      <List header="Order1" mode="card">
        {order?.length > 0
          ? order?.map((dish, di: number) => (
              <SwipeAction
                key={`dish-${di}`}
                style={{
                  '--background': 'transparent',
                }}
                ref={swipeActionRef}
                rightActions={rightActions}
                onAction={(action) => handleOnActionList(action, dish)}
              >
                <List.Item>{dish.dishId}</List.Item>
              </SwipeAction>
            ))
          : null}
      </List>

      <div className="mx-3">
        <Button
          block
          type="submit"
          color="primary"
          size="large"
          shape="rounded"
          onClick={handleAddOrder}
          disabled={order?.length === 0}
        >
          ORDER
        </Button>
      </div>
    </div>
  )
}

export default Order
