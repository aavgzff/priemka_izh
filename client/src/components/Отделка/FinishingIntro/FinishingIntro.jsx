const stats = [
  {
    value: '7+',
    label: 'лет опыта',
  },
  {
    value: '350+',
    label: 'выполненных проектов',
  },
  {
    value: '100%',
    label: 'довольных клиентов',
  },
  {
    value: 'до 3 лет',
    label: 'гарантия на работы',
  },
]

import { ScrollFadeInUp, ScrollStagger } from '@/components/AnimatedElements'

export default function FinishingIntro() {
  return (
    <section className="bg-white py-8 transition-colors duration-300 dark:bg-custom-grey sm:py-10 lg:py-12">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-14 lg:px-8">
        <ScrollFadeInUp className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-custom-blue sm:text-base">
            О нас
          </p>
          <h2 className="max-w-lg text-[1.7rem] font-bold leading-tight text-custom-blue dark:text-white sm:text-3xl md:text-[2.35rem]">
            Делаем ремонт,
            <br />
            которым вы будете
            <span className="text-custom-blue"> довольны</span>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
            Мы - команда профессионалов с опытом более 7 лет. Работаем честно,
            аккуратно и на результат. Используем качественные материалы и
            современные технологии, чтобы ваш дом был уютным и надежным.
          </p>
        </ScrollFadeInUp>

        <ScrollStagger
          stagger={0.1}
          y={28}
          className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6 lg:gap-x-8 lg:pt-5"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="min-w-0">
              <p className="text-[1.7rem] font-medium leading-none text-custom-blue sm:text-[2.05rem] md:text-[2.25rem] lg:text-[2.35rem]">
                {value}
              </p>
              <p className="mt-2 max-w-32 text-xs font-medium leading-snug text-custom-blue dark:text-gray-200 sm:mt-4 sm:text-[0.8rem] md:text-sm">
                {label}
              </p>
            </div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  )
}
