import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getColRef } from '../../firebase/service'
import { getDocs, query, where } from 'firebase/firestore'
import useAuth from '../../hooks/useAuth'

type Order = {
  dishId: string
  count: number
  note?: string
}

type OrderContextType = {
  addOrder: (order: Order) => void
  order: Order[]
  orderTotal: number
  clearCart: () => void
  removeDish: (dishId: string) => void
  fetchOrder: () => Promise<void>
  orders: any[]
  fetchObject: () => Promise<void>
  objects: any[]
  setOrder: Dispatch<SetStateAction<Order[]>>
  bills: any[]
  fetchBill: () => Promise<void>
  orderId?: string
  setOrderId: Dispatch<SetStateAction<string | undefined>>
  objectType?: string
  setObjectType: Dispatch<SetStateAction<string | undefined>>
}

export const OrderContext = createContext<OrderContextType>({
  addOrder: () => {},
  clearCart: () => {},
  removeDish: () => {},
  order: [],
  orderTotal: 0,
  fetchOrder: async () => {},
  orders: [],
  fetchObject: async () => {},
  objects: [],
  setOrder: () => {},
  bills: [],
  fetchBill: async () => {},
  setOrderId: () => {},
  setObjectType: () => {},
})

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth()
  const [orderId, setOrderId] = useState<string>()
  const [objectType, setObjectType] = useState<string>()
  const [order, setOrder] = useState<Order[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [objects, setObjects] = useState<any[]>([])
  const [bills, setBills] = useState<any[]>([])

  const orderTotal = useMemo(
    () => order?.map((dish) => dish.count)?.reduce((a, b) => a + b, 0) ?? 0,
    [order]
  )

  const addOrder = useCallback((order: Order) => {
    setOrder((prevState: any) => {
      const foundDish = prevState?.find(
        (dish: any) => dish?.dishId === order?.dishId
      )
      if (foundDish) {
        return prevState
          .map((dish: any) => ({
            ...dish,
            count: dish?.dishId === order?.dishId ? order?.count : dish?.count,
            note: dish?.dishId === order?.dishId ? order?.note : dish?.note,
          }))
          .filter((dish: any) => dish?.count > 0)
      }
      return [...prevState, order]?.filter((dish: any) => dish?.count > 0)
    })
  }, [])

  const clearCart = useCallback(() => {
    setOrder([])
    setOrderId(undefined)
    setObjectType(undefined)
  }, [])

  const removeDish = useCallback((dishId: string) => {
    setOrder(
      (prevState) => prevState?.filter((dish) => dish?.dishId !== dishId)
    )
  }, [])

  const fetchOrder = useCallback(async () => {
    if (user === null) return
    const orderColRef = getColRef('orders')
    const q = query(orderColRef, where('uid', '==', user.uid))
    const queryOrderSnapshot = await getDocs(q)
    const docs = queryOrderSnapshot.docs
    const data = docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        ref: docSnapshot.ref,
        ...docSnapshot.data(),
      }
    })
    setOrders(data)
  }, [user])

  const fetchObject = useCallback(async () => {
    if (user === null) return
    const orderColRef = getColRef('objects')
    const q = query(
      orderColRef,
      where('uid', '==', user.uid),
      where('deleted', '==', false)
    )
    const queryObjectSnapshot = await getDocs(q)
    const docs = queryObjectSnapshot.docs
    const data = docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        ref: docSnapshot.ref,
        ...docSnapshot.data(),
      }
    })
    setObjects(data)
  }, [user])

  const fetchBill = useCallback(async () => {
    if (user === null) return
    const billColRef = getColRef('bills')
    const q = query(billColRef, where('uid', '==', user.uid))
    const queryBillSnapshot = await getDocs(q)
    const docs = queryBillSnapshot.docs
    const data = docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        ref: docSnapshot.ref,
        ...docSnapshot.data(),
      }
    })
    setBills(data)
  }, [user])

  return (
    <OrderContext.Provider
      value={{
        addOrder,
        order,
        orderTotal,
        clearCart,
        removeDish,
        fetchOrder,
        orders,
        fetchObject,
        objects,
        setOrder,
        fetchBill,
        bills,
        orderId,
        setOrderId,
        objectType,
        setObjectType,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
