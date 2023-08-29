import { useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { IS_DEVELOP, eventNames } from '../../constants'
import { logAnalyticsEvent } from '../../firebase/analytics'

const Home = () => {
  const location = useLocation()
  const auth = useAuth()
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
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
    scrollToTop()
  }, [location, scrollToTop])
  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      <Outlet context={auth} />
    </div>
  )
}

export default Home
