import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { registerGsap, ScrollTrigger, ScrollSmoother } from '@/lib/gsap'
import { isMobileViewport, prefersReducedMotion, scrollToTarget } from '@/lib/scroll'

const SmoothScrollContext = createContext(true)

export function useSmoothScrollReady() {
  return useContext(SmoothScrollContext)
}

export default function SmoothScroll({ children }) {
  const location = useLocation()
  const [ready, setReady] = useState(() => prefersReducedMotion() || isMobileViewport())

  useLayoutEffect(() => {
    registerGsap()

    // ScrollSmoother ломает fixed-модалки и жесты на touch/mobile
    if (prefersReducedMotion() || isMobileViewport()) {
      const existing = ScrollSmoother.get()
      existing?.kill()
      setReady(true)
      return undefined
    }

    const existing = ScrollSmoother.get()
    if (existing) {
      existing.kill()
    }

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.05,
      effects: false,
      smoothTouch: false,
      ignoreMobileResize: true,
    })

    setReady(true)

    let refreshRaf = 0
    let refreshTimer = 0
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => {
        cancelAnimationFrame(refreshRaf)
        refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh())
      }, 150)
    }

    scheduleRefresh()
    window.addEventListener('load', scheduleRefresh)

    const content = document.querySelector('#smooth-content')
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && content
        ? new ResizeObserver(scheduleRefresh)
        : null

    if (content && resizeObserver) {
      resizeObserver.observe(content)
    }

    return () => {
      cancelAnimationFrame(refreshRaf)
      window.clearTimeout(refreshTimer)
      window.removeEventListener('load', scheduleRefresh)
      resizeObserver?.disconnect()
      setReady(false)
      smoother.kill()
    }
  }, [])

  useEffect(() => {
    if (!ready) return undefined

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, ready])

  useEffect(() => {
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (!target) return

      event.preventDefault()
      scrollToTarget(href)
      history.replaceState(null, '', href)
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  const value = useMemo(() => ready, [ready])

  return (
    <SmoothScrollContext.Provider value={value}>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </SmoothScrollContext.Provider>
  )
}
