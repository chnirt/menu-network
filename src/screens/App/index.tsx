import { Outlet } from 'react-router-dom'
import BottomTabBar from '../../components/BottomTabBar'
import useAuth from '../../hooks/useAuth'
import { useEffectOnce } from 'react-use'
import useOrder from '../../hooks/useOrder'
import useMenu from '../../hooks/useMenu'

const App = () => {
  const { user } = useAuth()
  const { fetchCategories, fetchDishes } = useMenu()
  const { fetchOrder, fetchBill } = useOrder()
  useEffectOnce(() => {
    const fetchAll = async () => {
      await Promise.all([
        fetchCategories(),
        fetchDishes(),
        fetchOrder(),
        fetchBill(),
      ])
    }

    fetchAll()
  })
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <div className="sticky bottom-0">{user && <BottomTabBar />}</div>
    </div>
  )
}

export default App
