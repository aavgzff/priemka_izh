import { useLayoutEffect, useRef } from 'react'
import { gsap, registerGsap, ScrollTrigger } from '@/lib/gsap'
import { useSmoothScrollReady } from '@/components/SmoothScroll'

/** GSAP scrub-parallax. Desktop only. Возвращает ref для элемента. */
export function useParallax(speed = 0.22) {
  const ref = useRef(null)
  const smoothReady = useSmoothScrollReady()

  useLayoutEffect(() => {
    registerGsap()
    const element = ref.current
    if (!element || !smoothReady) return undefined

    const mqMobile = window.matchMedia('(max-width: 1023px), (hover: none) and (pointer: coarse)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let ctx

    const clear = () => {
      ctx?.revert()
      ctx = undefined
      gsap.set(element, { clearProps: 'transform' })
    }

    const setup = () => {
      clear()
      if (mqReduce.matches || mqMobile.matches) return

      const amount = Math.max(-72, Math.min(72, speed * 100))
      const trigger = element.parentElement || element

      ctx = gsap.context(() => {
        gsap.fromTo(
          element,
          { y: -amount },
          {
            y: amount,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          }
        )
      }, element)
    }

    setup()

    const onChange = () => {
      setup()
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    mqMobile.addEventListener('change', onChange)
    mqReduce.addEventListener('change', onChange)

    return () => {
      mqMobile.removeEventListener('change', onChange)
      mqReduce.removeEventListener('change', onChange)
      clear()
    }
  }, [smoothReady, speed])

  return { ref }
}
