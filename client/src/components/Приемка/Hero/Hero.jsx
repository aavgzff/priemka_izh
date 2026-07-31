import heroImage from '@/assets/images/intro image.jpg'
import { ScrollFadeInUp, ScrollSlideInRight } from '@/components/AnimatedElements'

export default function Hero() {
  return (
    <section className="bg-[#f8fafc] pb-8 pt-16 transition-colors duration-300 dark:bg-custom-grey sm:pb-12 sm:pt-20 md:pb-16 md:pt-24 lg:pt-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollFadeInUp once start="top 95%" className="order-2 flex flex-col items-start justify-center space-y-4 sm:space-y-6 lg:order-1">
            <h1 className="text-3xl font-bold leading-tight text-custom-blue dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Услуги по приемке
              <span className="text-custom-blue dark:text-blue-400"> квартир в новостройках</span>
            </h1>

            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl lg:text-3xl">
              Проверка квартиры перед подписанием акта приема-передачи
            </p>

            <a
              href="#lead-form"
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-custom-blue px-6 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-custom-blue/90 hover:shadow-xl sm:mt-6 sm:w-auto sm:px-8 sm:py-3.5 sm:text-2xl"
            >
              Оставить заявку
            </a>
          </ScrollFadeInUp>

          <ScrollSlideInRight once start="top 95%" className="order-1 flex items-center justify-center lg:order-2">
            <img
              src={heroImage}
              alt="Приёмка квартир"
              width={800}
              height={600}
              decoding="async"
              fetchPriority="high"
              className="h-auto w-full max-w-lg rounded-lg shadow-2xl lg:max-w-full"
            />
          </ScrollSlideInRight>
        </div>
      </div>
    </section>
  )
}
