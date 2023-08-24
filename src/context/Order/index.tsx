import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
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
}

export const OrderContext = createContext<OrderContextType>({
  addOrder: () => {},
  order: [],
  orderTotal: 0,
})

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [order, setOrder] = useState<Order[]>([])

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

  return (
    <OrderContext.Provider
      value={{
        addOrder,
        order,
        orderTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
