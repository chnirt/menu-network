import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { IS_DEVELOP, eventNames } from '../../constants'
import { logAnalyticsEvent } from '../../firebase/analytics'

const Home = () => {
  const location = useLocation()
  const auth = useAuth()
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--vh',
      window.innerHeight * 0.01 + 'px'
    )
  }, [])
  useEffect(() => {
    if (IS_DEVELOP) return
    const page_path = location.pathname + location.search
    logAnalyticsEvent(eventNames.SCREEN_VIEW, {
      page_path,
    })
  }, [location])
  return <Outlet context={auth} />
}

export default Home
