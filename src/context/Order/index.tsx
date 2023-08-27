import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getColRef } from '../../firebase/service'
import { getDocs, query, where } from 'firebase/firestore'
import useAuth from '../../hooks/useAuth'
// import { getDocs, query, where } from 'firebase/firestore'
// import {
//   getColGroupRef,
//   getColRef,
//   getDocRef,
//   getDocument,
// } from '../../firebase/service'

type Order = {
  dishId: string
  count: number
}

type OrderContextType = {
  addOrder: (order: Order) => void
  order: Order[]
  orderTotal: number
  clearCart: () => void
  removeDish: (dishId: string) => void
  fetchOrder: () => Promise<void>
  orders: any[]
}

export const OrderContext = createContext<OrderContextType>({
  addOrder: () => {},
  clearCart: () => {},
  removeDish: () => {},
  order: [],
  orderTotal: 0,
  fetchOrder: async () => {},
  orders: [],
})

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth()
  const [order, setOrder] = useState<Order[]>([])
  const [orders, setOrders] = useState<any[]>([])

  const orderTotal = useMemo(
    () => order?.map((dish) => dish.count)?.reduce((a, b) => a + b, 0) ?? 0,
    [order]
  )

  const addOrder = useCallback((order: Order) => {
    setOrder((prevState: any) => {
      const foundDish = prevState.find(
        (dish: any) => dish.dishId === order.dishId
      )
      if (foundDish) {
        return prevState
          .map((dish: any) => ({
            ...dish,
            count: dish.dishId === order.dishId ? order.count : dish.count,
          }))
          .filter((dish: any) => dish.count > 0)
      }
      return [...prevState, order].filter((dish: any) => dish.count > 0)
    })
  }, [])

  const clearCart = useCallback(() => setOrder([]), [])

  const removeDish = useCallback((dishId: string) => {
    setOrder((prevState) => prevState.filter((dish) => dish.dishId !== dishId))
  }, [])

  let querySnapshot

  const fetchOrder = useCallback(async () => {
    if (user === null) return
    const orderColRef = getColRef('orders')
    const q = query(orderColRef, where('uid', '==', user.uid))
    querySnapshot = await getDocs(q)
    const docs = querySnapshot.docs
    const data = docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        ref: docSnapshot.ref,
        ...docSnapshot.data(),
      }
    })
    setOrders(data)
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
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
