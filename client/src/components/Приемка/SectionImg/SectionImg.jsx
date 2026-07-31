import sectionImg from '@/assets/images/section-img.jpg'
import { ParallaxFrame } from '@/components/AnimatedElements'

/** Баннер-глубина: фото медленнее скролла внутри overflow-окна (без pin). */
export default function SectionImg() {
  return (
    <section className="relative w-full bg-[#1a1a1a]" aria-hidden="true">
      <ParallaxFrame
        speed={0.3}
        className="relative h-[280px] w-full sm:h-[380px] md:h-[480px] lg:h-[560px]"
      >
        <img
          src={sectionImg}
          alt=""
          loading="lazy"
          decoding="async"
          width={1920}
          height={800}
        />
      </ParallaxFrame>
    </section>
  )
}
