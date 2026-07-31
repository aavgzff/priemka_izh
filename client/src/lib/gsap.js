import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export function registerGsap() {
  return { gsap, ScrollTrigger, ScrollSmoother }
}

export { gsap, ScrollTrigger, ScrollSmoother }
