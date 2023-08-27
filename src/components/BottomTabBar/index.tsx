import { FC, useCallback, useMemo } from 'react'
import { generatePath, useLocation, useNavigate } from 'react-router-dom'
import { MenuSquare, User2, ShoppingBag } from 'lucide-react'
import // CompassOutline,
'antd-mobile-icons'
import { TabBar } from 'antd-mobile'
import { routes } from '../../routes'
import { auth } from '../../firebase'

const BottomTabBar: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = useCallback((value: string) => {
    navigate(value)
  }, [])
  const tabs = useMemo(
    () => [
      // {
      //   key: routes.dashboard,
      //   // title: "Dashboard",
      //   icon: <CompassOutline />,
      // },
      {
        key: generatePath(routes.menu, { menuId: auth.currentUser?.uid }),
        title: 'Menu',
        icon: <MenuSquare />,
      },
      {
        key: routes.order,
        title: 'Order',
        icon: <ShoppingBag />,
      },
      {
        key: routes.me,
        title: 'Profile',
        icon: <User2 />,
      },
    ],
    []
  )
  return (
    <TabBar
      className="bg-white pb-safe"
      activeKey={pathname}
      onChange={(value) => {
        setRouteActive(value)
      }}
    >
      {tabs.map((item) => (
        <TabBar.Item
          className="py-3"
          key={item.key}
          icon={item.icon}
          title={item.title}
        />
      ))}
    </TabBar>
  )
}

export default BottomTabBar
