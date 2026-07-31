import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from '@/components/Общие/Header/Header'
import SmoothScroll from '@/components/SmoothScroll'
import Home from '@/pages/Home'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import TermsOfUse from '@/pages/TermsOfUse'
import Finishing from '@/pages/Finishing'
import Projects from '@/pages/Projects'
import Admin from '@/pages/Admin'
import { scrollToTarget, scrollToTop } from '@/lib/scroll'
import { ScrollTrigger } from '@/lib/gsap'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    let timeoutId = 0

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()

      if (hash) {
        timeoutId = window.setTimeout(() => {
          scrollToTarget(hash, { smooth: true })
          ScrollTrigger.refresh()
        }, 80)
        return
      }

      scrollToTop({ smooth: false })
    })

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timeoutId)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <SmoothScroll>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/finishing" element={<Finishing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
