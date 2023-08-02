import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Home = () => {
  const auth = useAuth()
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--vh',
      window.innerHeight * 0.01 + 'px'
    )
  }, [])
  return <Outlet context={auth} />
}

export default Home
