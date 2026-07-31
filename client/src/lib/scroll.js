import { ScrollSmoother } from '@/lib/gsap'

const HEADER_OFFSET = 'top 96px'

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 1023px), (hover: none) and (pointer: coarse)').matches
}

export function getSmoother() {
  return ScrollSmoother.get()
}

export function scrollToTarget(target, { smooth = true, position = HEADER_OFFSET } = {}) {
  const smoother = getSmoother()

  if (smoother) {
    smoother.scrollTo(target, smooth, typeof target === 'number' ? undefined : position)
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' })
    return
  }

  const element =
    typeof target === 'string'
      ? document.querySelector(target)
      : target

  element?.scrollIntoView({
    block: 'start',
    behavior: smooth ? 'smooth' : 'auto',
  })
}

export function scrollToTop({ smooth = false } = {}) {
  scrollToTarget(0, { smooth })
}

export function pauseSmoothScroll(paused) {
  const smoother = getSmoother()

  if (smoother) {
    smoother.paused(paused)
    return
  }

  // Только overflow — без position:fixed и touch-action:none
  // (на mobile иначе ломается скролл внутри модалки и появляются лаги)
  const html = document.documentElement
  const body = document.body

  if (paused) {
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'none'
  } else {
    html.style.overflow = ''
    body.style.overflow = ''
    html.style.overscrollBehavior = ''
    body.style.touchAction = ''
  }
}
