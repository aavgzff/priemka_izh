import introImage from '@/assets/images/интро.jpg'
import introLightImage from '@/assets/images/интро светлое.jpg'
import { Link } from 'react-router-dom'
import {
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaShieldAlt,
  FaUserTie,
} from 'react-icons/fa'
import { Parallax, ScrollFadeInUp, ScrollStagger } from '@/components/AnimatedElements'

const benefits = [
  {
    text: 'Гарантия до 3 лет',
    Icon: FaShieldAlt,
  },
  {
    text: 'Соблюдаем сроки',
    Icon: FaCalendarCheck,
  },
  {
    text: 'Прозрачная смета',
    Icon: FaFileInvoiceDollar,
  },
  {
    text: 'Персональный менеджер',
    Icon: FaUserTie,
  },
]

export default function FinishingHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
          <Parallax speed={0.2} className="absolute inset-x-0 -top-[12%] h-[124%] w-full">
            <img
              src={introLightImage}
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[8%_28%] dark:hidden sm:object-[18%_35%] lg:object-[42%_center]"
            />
            <img
              src={introImage}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="absolute inset-0 hidden h-full w-full object-cover object-[8%_28%] dark:block sm:object-[18%_35%] lg:object-[42%_center]"
            />
          </Parallax>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent lg:bg-gradient-to-l lg:from-black/55 lg:via-black/20 lg:to-transparent dark:from-black/90 dark:via-black/45 dark:to-transparent lg:dark:from-black/80 lg:dark:via-black/40 lg:dark:to-transparent" />

      <div className="relative z-10 container mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 pb-6 pt-24 sm:px-6 sm:pb-10 md:pt-28 lg:items-center lg:justify-end lg:px-8 lg:pb-16">
        <div className="flex w-full max-w-3xl flex-col items-start space-y-3 text-left sm:space-y-5 lg:items-end lg:text-right">
          <ScrollFadeInUp once start="top 95%">
            <h1 className="max-w-xl text-[1.65rem] font-bold uppercase leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Услуги по отделочным работам{' '}
              <span className="text-custom-blue">
                любой сложности
              </span>
            </h1>
          </ScrollFadeInUp>

          <ScrollFadeInUp once start="top 95%">
            <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-xl md:text-2xl lg:text-3xl lg:text-gray-500 lg:dark:text-gray-300">
              Реализуем любые идеи в срок с гарантией качества
            </p>
          </ScrollFadeInUp>

          <ScrollFadeInUp once start="top 95%" className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-lg bg-custom-blue px-5 py-3 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:text-custom-blue sm:px-8 sm:py-3.5 sm:text-xl md:text-2xl"
            >
              Оставить заявку
            </a>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-5 py-3 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-custom-blue sm:border-0 sm:bg-custom-blue sm:px-8 sm:py-3.5 sm:text-xl md:text-2xl"
            >
              Смотреть проекты
            </Link>
          </ScrollFadeInUp>

          <ScrollStagger
            once
            y={20}
            start="top 95%"
            className="mt-1 grid w-full grid-cols-2 gap-x-3 gap-y-3 sm:mt-4 sm:grid-cols-4 sm:gap-x-6 lg:mt-6 lg:gap-x-7"
          >
            {benefits.map(({ text, Icon }) => (
              <div
                key={text}
                className="flex min-h-10 items-center gap-2 text-left sm:min-h-14 sm:gap-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-custom-blue sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-7 sm:w-7" aria-hidden="true" />
                </span>
                <p className="text-[11px] font-semibold leading-snug text-white sm:text-sm lg:text-custom-blue lg:dark:text-gray-100">
                  {text}
                </p>
              </div>
            ))}
          </ScrollStagger>
        </div>
      </div>
    </section>
  )
}
