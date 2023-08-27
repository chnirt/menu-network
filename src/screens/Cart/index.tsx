import { Button, Dialog, List, NavBar, Toast } from 'antd-mobile'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useMemo, useRef } from 'react'
import { DeleteOutline } from 'antd-mobile-icons'
import SwipeAction, {
  Action,
  SwipeActionRef,
} from 'antd-mobile/es/components/swipe-action'
import useOrder from '../../hooks/useOrder'
import { routes } from '../../routes'
import DishItem from '../../components/DishItem'
import useMenu from '../../hooks/useMenu'
import { addDocument, getColRef } from '../../firebase/service'
import useAuth from '../../hooks/useAuth'
import { Loading } from '../../global'

const Order = () => {
  const navigate = useNavigate()
  const { order, clearCart, addOrder, removeDish } = useOrder()
  const { categories } = useMenu()
  const { user } = useAuth()
  const swipeActionRef = useRef<SwipeActionRef>(null)

  const formatCategories = useMemo(
    () =>
      categories
        ?.map((category) =>
          category.data.map((item: any) => ({
            ...item,
          }))
        )
        ?.flat(),
    [categories]
  )

  const handleAddOrder = useCallback(async () => {
    if (user === null) return
    try {
      Loading.get.show()
      const uid = user.uid
      const orderObj = order.reduce((accumulator, value) => {
        return { ...accumulator, [value.dishId]: value.count }
      }, {})
      const orderData = {
        order: orderObj,
        uid,
      }
      const orderDocRef = getColRef('orders')
      await addDocument(orderDocRef, orderData)

      navigate(routes.order)
      Toast.show({
        icon: 'success',
        // content: isEditMode ? 'Category is updated' : 'Category is created',
        content: 'Order is created',
      })

      clearCart()
      return
    } catch (error: any) {
      Toast.show({
        icon: 'error',
        content: error.message,
      })
    } finally {
      Loading.get.hide()
    }
  }, [order, user])

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
                removeDish(dishItem.dishId)
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
      <List mode="card">
        {order?.length > 0
          ? order?.map((dish, di: number) => {
              const dataItem = formatCategories?.find(
                (category) => category.id === dish.dishId
              )
              return (
                <SwipeAction
                  key={`dish-${di}`}
                  style={{
                    '--background': 'transparent',
                  }}
                  ref={swipeActionRef}
                  rightActions={rightActions}
                  onAction={(action) => handleOnActionList(action, dish)}
                >
                  <List.Item>
                    <DishItem
                      item={dataItem}
                      count={dish.count}
                      onChangeValue={(value: any) => {
                        if (addOrder === undefined) return
                        addOrder({
                          dishId: dish.dishId,
                          count: value,
                        })
                      }}
                    />
                  </List.Item>
                </SwipeAction>
              )
            })
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
