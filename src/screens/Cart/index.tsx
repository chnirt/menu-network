import { Button, Dialog, List, NavBar, Toast } from 'antd-mobile'
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DeleteOutline } from 'antd-mobile-icons'
import SwipeAction, {
  Action,
  SwipeActionRef,
} from 'antd-mobile/es/components/swipe-action'
import useOrder from '../../hooks/useOrder'
import { routes } from '../../routes'
import DishItem from '../../components/DishItem'
import useMenu from '../../hooks/useMenu'
import {
  addDocument,
  getColRef,
  getDocRef,
  getDocument,
  updateDocument,
} from '../../firebase/service'
import useAuth from '../../hooks/useAuth'
import { Loading } from '../../global'
import AutoComplete from '../../components/AutoComplete'
import { DocumentData, DocumentReference } from 'firebase/firestore'

const Order = () => {
  const navigate = useNavigate()
  const {
    order,
    clearCart,
    addOrder,
    removeDish,
    fetchObject,
    objects,
    setOrder,
    fetchOrder,
  } = useOrder()
  const { orderId } = useParams()
  const isEditMode = Boolean(orderId)
  const { dishes } = useMenu()
  const { user } = useAuth()
  const swipeActionRef = useRef<SwipeActionRef>(null)
  const [objectType, setObjectType] = useState<any>()
  const [errors, setErrors] = useState<any>()
  const [orderDocRefState, setOrderDocRefState] = useState<DocumentReference<
    DocumentData,
    DocumentData
  > | null>(null)

  const tableObjects = useMemo(
    () => objects.filter((object) => object.objectType === 'table'),
    [objects]
  )
  const customerObjects = useMemo(
    () => objects.filter((object) => object.objectType === 'customer'),
    [objects]
  )

  const handleAddOrder = useCallback(async () => {
    if (user === null) return
    try {
      if (objectType === undefined)
        return setErrors({
          objectType: 'required',
        })
      setErrors(null)
      Loading.get.show()
      const uid = user.uid
      const orderData = {
        order,
        objectType,
        status: 'new',
        uid,
      }
      if (isEditMode) {
        if (orderDocRefState === null) return
        await updateDocument(orderDocRefState, orderData)
      } else {
        const orderDocRef = getColRef('orders')
        await addDocument(orderDocRef, orderData)
      }

      fetchOrder()

      navigate(routes.order)
      clearCart()
      Toast.show({
        icon: 'success',
        content: 'Order is created',
      })

      return
    } catch (error: any) {
      Toast.show({
        icon: 'error',
        content: error.message,
      })
    } finally {
      Loading.get.hide()
    }
  }, [
    order,
    user,
    objectType,
    isEditMode,
    clearCart,
    navigate,
    orderDocRefState,
    fetchOrder,
  ])

  const handleCancelOrder = useCallback(() => {
    navigate(-1)
    clearCart()

    return
  }, [clearCart, navigate])

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
    [removeDish]
  )

  const fetchOrderById = useCallback(
    async (orderId: string) => {
      if (user === null) return
      // setLoading(true)
      const orderDocRef = getDocRef('orders', orderId)
      setOrderDocRefState(orderDocRef)
      const orderDocData: any = await getDocument(orderDocRef)
      setOrder(orderDocData?.order)
      setObjectType(orderDocData?.objectType)
      // setLoading(false)
    },
    [user, setOrder]
  )

  useEffect(() => {
    if (orderId === undefined) return
    fetchOrderById(orderId)

    return () => {
      if (orderId === undefined) return
      clearCart()
    }
  }, [orderId, fetchOrderById, clearCart])

  const right = useMemo(
    () => (
      <Link to={routes.newObject}>
        <Button color="primary" fill="none" size="mini">
          NEW OBJECT
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
      <div>
        <NavBar
          className="sticky top-0 z-[100] bg-white"
          onBack={() => navigate(-1)}
          right={right}
        >
          {isEditMode ? orderId : 'CART'}
        </NavBar>

        <div className="m-3">
          <div className="flex gap-3">
            <AutoComplete
              items={tableObjects}
              buttonText="Table"
              searchPlaceholder="Search table"
              selected={objectType}
              onSelect={setObjectType}
              onUpdate={(object: any) =>
                navigate(
                  generatePath(routes.updateObject, { objectId: object.id })
                )
              }
              onDelete={async (object: any) => {
                const objectData = {
                  deleted: true,
                }
                await updateDocument(object.ref, objectData)
                if (typeof fetchObject === 'function') {
                  fetchObject()
                }
              }}
            />
            <AutoComplete
              items={customerObjects}
              buttonText="Customer"
              searchPlaceholder="Search customer"
              selected={objectType}
              onSelect={setObjectType}
              onUpdate={(object: any) =>
                navigate(
                  generatePath(routes.updateObject, { objectId: object.id })
                )
              }
              onDelete={async (object: any) => {
                const objectData = {
                  deleted: true,
                }
                await updateDocument(object.ref, objectData)
                if (typeof fetchObject === 'function') {
                  fetchObject()
                }
              }}
            />
          </div>
          {errors?.['objectType'] ? (
            <div className="adm-form-item-feedback-error">
              Object Type is required
            </div>
          ) : null}
        </div>

        <List mode="card">
          {order?.length > 0
            ? order?.map((dish, di: number) => {
                const dataItem = dishes?.find(
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
                        note={dish.note}
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

        <div
          className="flex flex-col m-3 gap-3 sticky pb-safe"
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
            onClick={handleAddOrder}
            disabled={order?.length === 0}
          >
            {isEditMode ? 'SAVE' : 'ORDER'}
          </Button>
          <Button
            block
            type="button"
            color="primary"
            size="large"
            shape="rounded"
            fill="none"
            onClick={handleCancelOrder}
            disabled={order?.length === 0}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Order
