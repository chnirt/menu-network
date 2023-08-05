import { ErrorBlock, NavBar } from 'antd-mobile'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes'
import { auth } from '../../firebase'

const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(routes.menu.replace(':menuId', auth.currentUser?.uid ?? ''))
  }, [])
  return (
    <div>
      <NavBar className="sticky top-0 z-[100] bg-white" back={null}>
        DASHBOARD
      </NavBar>
      {/* <img src={"https://wjhjnr.csb.app/water-melon.jpeg"} alt="Logo" /> */}
      <ErrorBlock
        className="flex flex-col justify-center items-center"
        fullPage
        title="Best Coming Soon"
        description="We're working on something amazing, and we can't wait to share it with
        you. Stay tuned!"
      />
    </div>
  )
}

export default Dashboard
