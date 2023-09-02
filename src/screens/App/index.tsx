import { Outlet } from 'react-router-dom'
import BottomTabBar from '../../components/BottomTabBar'
import useAuth from '../../hooks/useAuth'
import { useEffectOnce } from 'react-use'
import useOrder from '../../hooks/useOrder'

const App = () => {
  const { user } = useAuth()
  const { fetchOrder, fetchBill } = useOrder()
  useEffectOnce(() => {
    const fetchAll = async () => {
      await Promise.all([fetchOrder(), fetchBill()])
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
