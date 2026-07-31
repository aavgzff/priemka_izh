import AppFooter from '@/components/Общие/AppFooter/AppFooter'
import FinishingProjects from '@/components/Отделка/FinishingProjects/FinishingProjects'
import { ParallaxFrame, ScrollFadeInUp } from '@/components/AnimatedElements'
import projectsIntro from '@/assets/images/projects-intro.jpg'

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f8fafc] transition-colors duration-300 dark:bg-custom-grey">
      <section className="relative overflow-hidden bg-[#1a1a1a] pt-16 sm:pt-20">
        <ParallaxFrame
          speed={0.22}
          className="relative h-[42vh] min-h-[240px] w-full sm:h-[48vh] md:h-[56vh] lg:h-[62vh]"
        >
          <img
            src={projectsIntro}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
          />
        </ParallaxFrame>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
            <ScrollFadeInUp once start="top 95%">
              <h1 className="max-w-2xl text-[1.7rem] font-bold uppercase leading-tight text-white sm:text-4xl md:text-5xl">
                Наши работы
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base md:text-lg">
                Реальные дизайн-проекты и реализованные интерьеры. От идеи до сдачи —
                с вниманием к деталям и срокам.
              </p>
            </ScrollFadeInUp>
          </div>
        </div>
      </section>

      <div className="flex-1">
        <FinishingProjects showAll hideHeading />
      </div>
      <AppFooter />
    </main>
  )
}
