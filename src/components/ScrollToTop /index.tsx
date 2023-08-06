import { FloatingBubble } from 'antd-mobile'
import classNames from 'classnames'
import { ArrowUpToLine } from 'lucide-react'
import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <FloatingBubble
      axis="x"
      magnetic="x"
      style={{
        '--initial-position-bottom':
          'calc(180px + env(safe-area-inset-bottom))',
        '--initial-position-right': '12px',
        '--edge-distance': '12px',
      }}
      className={classNames(isVisible ? 'opacity-100' : 'opacity-0')}
      onClick={scrollToTop}
    >
      <ArrowUpToLine fontSize={16} />
    </FloatingBubble>
  )
}

export default ScrollToTop
