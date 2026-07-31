import { Children, cloneElement, forwardRef, isValidElement, useLayoutEffect, useRef } from 'react'
import { gsap, registerGsap, ScrollTrigger } from '@/lib/gsap'
import { isMobileViewport, prefersReducedMotion } from '@/lib/scroll'
import { useSmoothScrollReady } from '@/components/SmoothScroll'

function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref) {
        ref.current = value
      }
    })
  }
}

function getRevealTriggerConfig({ once, start, end }) {
  // Только появление — reverse/затемнение при уходе даёт дёрганый эффект со smoother
  return {
    start,
    end,
    toggleActions: 'play none none none',
    once: true,
  }
}

function useScrollReveal(
  ref,
  {
    y = 0,
    x = 0,
    scale = 1,
    delay = 0,
    duration = 0.75,
    once = true,
    start = 'top 88%',
    end = 'bottom 12%',
  } = {}
) {
  const smoothReady = useSmoothScrollReady()

  useLayoutEffect(() => {
    registerGsap()
    const element = ref.current
    if (!element || !smoothReady) return undefined

    if (prefersReducedMotion()) {
      gsap.set(element, { clearProps: 'all', x: 0, y: 0, scale: 1, autoAlpha: 1 })
      return undefined
    }

    const motionScale = isMobileViewport() ? 0.65 : 1

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          x: x * motionScale,
          y: y * motionScale,
          scale,
          autoAlpha: 0,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration,
          delay,
          ease: 'power2.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: element,
            invalidateOnRefresh: true,
            ...getRevealTriggerConfig({ once, start, end }),
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [ref, smoothReady, x, y, scale, delay, duration, once, start, end])
}

const createReveal = (from, defaultDuration = 0.75) =>
  forwardRef(function ScrollReveal(
    {
      children,
      delay = 0,
      className = '',
      as: Component = 'div',
      once = true,
      start,
      end,
      ...props
    },
    forwardedRef
  ) {
    const localRef = useRef(null)
    useScrollReveal(localRef, {
      ...from,
      delay,
      duration: defaultDuration,
      once,
      start,
      end,
    })

    return (
      <Component ref={mergeRefs(localRef, forwardedRef)} className={className} {...props}>
        {children}
      </Component>
    )
  })

export const ScrollFadeInUp = createReveal({ y: 24 })
ScrollFadeInUp.displayName = 'ScrollFadeInUp'

export const ScrollFadeIn = createReveal({}, 0.7)
ScrollFadeIn.displayName = 'ScrollFadeIn'

export const ScrollFadeInDown = createReveal({ y: -16 })
ScrollFadeInDown.displayName = 'ScrollFadeInDown'

export const ScrollScaleIn = createReveal({ scale: 0.97, y: 16 })
ScrollScaleIn.displayName = 'ScrollScaleIn'

export const ScrollSlideInLeft = createReveal({ x: -28, y: 8 })
ScrollSlideInLeft.displayName = 'ScrollSlideInLeft'

export const ScrollSlideInRight = createReveal({ x: 28, y: 8 })
ScrollSlideInRight.displayName = 'ScrollSlideInRight'

/** Единое появление группы без каскадной «волны» (stagger давал дёрганый эффект) */
export const ScrollStagger = forwardRef(function ScrollStagger(
  {
    children,
    className = '',
    as: Component = 'div',
    stagger: _stagger = 0,
    y = 28,
    x = 0,
    scale = 1,
    delay = 0,
    duration = 0.7,
    once = true,
    start = 'top 88%',
    end = 'bottom 10%',
    ...props
  },
  forwardedRef
) {
  const localRef = useRef(null)
  useScrollReveal(localRef, {
    y,
    x,
    scale,
    delay,
    duration,
    once,
    start,
    end,
  })

  return (
    <Component ref={mergeRefs(localRef, forwardedRef)} className={className} {...props}>
      {children}
    </Component>
  )
})
ScrollStagger.displayName = 'ScrollStagger'

/**
 * Параллакс-слой: контент двигается медленнее скролла.
 * Desktop only — на mobile/touch и reduced-motion отключён (без багов со скроллом).
 * Родитель должен иметь overflow:hidden и запас по высоте (см. ParallaxFrame).
 */
export const Parallax = forwardRef(function Parallax(
  {
    children,
    className = '',
    as: Component = 'div',
    speed = 0.22,
    disabled = false,
    ...props
  },
  forwardedRef
) {
  const localRef = useRef(null)
  const smoothReady = useSmoothScrollReady()

  useLayoutEffect(() => {
    registerGsap()
    const element = localRef.current
    if (!element || !smoothReady || disabled) return undefined

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

      // Мягкий ход: достаточно для «глубины», без выхода за overflow-запас ~12%
      const amount = Math.max(-56, Math.min(56, speed * 90))
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
              scrub: true,
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
  }, [smoothReady, speed, disabled])

  return (
    <Component
      ref={mergeRefs(localRef, forwardedRef)}
      className={`gpu-layer will-change-transform ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
})
Parallax.displayName = 'Parallax'

/** Удобная обёртка: overflow-hidden контейнер + увеличенный parallax-фон */
export function ParallaxFrame({
  children,
  className = '',
  mediaClassName = '',
  speed = 0.22,
  as: Component = 'div',
}) {
  const child = Children.only(children)

  return (
    <Component className={`relative overflow-hidden ${className}`.trim()}>
      <Parallax
        speed={speed}
        className={`absolute inset-x-0 -top-[12%] h-[124%] w-full ${mediaClassName}`.trim()}
      >
        {isValidElement(child)
          ? cloneElement(child, {
              className: `${child.props.className || ''} h-full w-full object-cover`.trim(),
            })
          : child}
      </Parallax>
    </Component>
  )
}
