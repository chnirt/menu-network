import { useContext } from 'react'
import { OrderContext } from '../context/Order'

const useOrder = () => useContext(OrderContext)

export default useOrder
