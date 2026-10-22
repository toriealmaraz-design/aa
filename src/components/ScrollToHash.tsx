import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route change: scroll to the #hash target if present, otherwise to top.
 * Lets /#features-style links work when navigating in from another route.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // wait a tick for the target section to mount
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, left: 0 })
    }
  }, [pathname, hash])

  return null
}
