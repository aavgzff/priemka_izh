import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import { ScrollFadeInUp } from '@/components/AnimatedElements'
import { pauseSmoothScroll } from '@/lib/scroll'

import k1 from '@/assets/images/services/k1.jpg'
import k2 from '@/assets/images/services/k2.jpg'
import k3 from '@/assets/images/services/k3.jpg'
import k4 from '@/assets/images/services/k4.jpg'
import k5 from '@/assets/images/services/k5.jpg'
import k6 from '@/assets/images/services/k6.jpg'
import k7 from '@/assets/images/services/k7.jpg'
import k8 from '@/assets/images/services/k8.jpg'
import k9 from '@/assets/images/services/k9.jpg'
import k10 from '@/assets/images/services/k10.jpg'
import k11 from '@/assets/images/services/k11.jpg'


const services = [
  {
    title: 'Грунтование и шпаклевание в 2 слоя',
    short: 'Подготавливаем стены и потолки к финишной отделке.',
    price: 'от 800 ₽/м²',
    image: k1,
    details:
      'Выполняем подготовку стен и потолков к финишной отделке. Поверхность тщательно грунтуется для улучшения адгезии, после чего наносится два слоя качественной шпаклевки с промежуточной сушкой и шлифовкой. В результате вы получаете ровное, прочное и гладкое основание, готовое к покраске, оклейке обоями или нанесению декоративных покрытий.',
  },
  {
    title: 'Поклейка обоев',
    short: 'Аккуратно клеим обои любого типа с точной стыковкой рисунка и ровными швами.',
    price: 'от 400 ₽/м²',
    image: k2,
    details:
      'Выполняем профессиональную оклейку стен всеми популярными видами обоев: флизелиновыми, виниловыми, бумажными и под покраску. Тщательно подготавливаем поверхность, соблюдаем рисунок и стыковку полотен, аккуратно оформляем углы, откосы и примыкания. В результате вы получаете ровное покрытие без пузырей, складок и заметных швов.',
  },
  {
    title: 'Декоративная штукатурка',
    short: 'Наносим декоративную штукатурку с различными фактурами и эффектами.',
    price: 'от 1000 ₽/м²',
    image: k3,
    details:
      'Создаем стильные и долговечные покрытия, которые придают интерьеру индивидуальность. Выполняем нанесение декоративной штукатурки различных фактур и эффектов: от минималистичных гладких поверхностей до выразительных текстур. Соблюдаем технологию нанесения, обеспечивая равномерное покрытие, высокую износостойкость и безупречный внешний вид.',
  },
  {
    title: 'Укладка керамогранита',
    short: 'Качественно укладываем керамогранит на пол и стены.',
    price: 'от 2500 ₽/м²',
    image: k4,
    details:
      'Выполняем профессиональный монтаж керамогранита на пол и стены с соблюдением всех технологий. Тщательно подготавливаем основание, выдерживаем ровные швы и точную геометрию укладки. Работаем с плиткой любых форматов, включая крупноформатный керамогранит, обеспечивая надежное, долговечное и эстетичное покрытие.',
  },
  {
    title: 'Установка сантехнического оборудования',
    short: 'Устанавливаем сантехническое оборудование с соблюдением всех технических требований.',
    price: 'от 4000 ₽',
    image: k5,
    details:
      'Выполняем профессиональный монтаж сантехники любой сложности. Устанавливаем унитазы, раковины, ванны, душевые кабины, смесители, инсталляции, полотенцесушители и другую сантехнику. Проверяем герметичность всех соединений, правильность подключения и работоспособность оборудования, гарантируя надежную и безопасную эксплуатацию.',
  },
  {
    title: 'Укладка ламината и кварцвинила',
    short: 'Укладываем ламинат и кварцвинил с идеальной стыковкой и ровной геометрией. ',
    price: 'от 400 ₽/м²',
    image: k6,
    details:
      'Выполняем профессиональный монтаж напольных покрытий с соблюдением технологии. Готовим основание, укладываем ламинат или кварцвиниловую плитку/доску с точной подгонкой стыков и аккуратной геометрией. Учитываем температурные зазоры, тип замкового соединения и особенности материала, обеспечивая ровное, прочное и долговечное покрытие.',
  },
  {
    title: 'Укладка инженерной доски и паркета',
    short: 'Укладываем инженерную доску и паркет с точной подгонкой и соблюдением технологии.',
    price: 'от 1600 ₽/м²',
    image: k7,
    details:
      'Выполняем профессиональный монтаж натуральных напольных покрытий с соблюдением всех технологических требований. Подготавливаем основание, подбираем оптимальный способ укладки (клеевой или плавающий), точно выставляем геометрию и зазоры. Обеспечиваем аккуратную подгонку планок, стабильность покрытия и долговечность пола даже при перепадах температуры и влажности.',
  },
  {
    title: 'Установка натяжного потолка',
    short: 'Устанавливаем натяжные потолки быстро и аккуратно.',
    price: 'от 900 ₽/м²',
    image: k8,
    details:
      'Выполняем профессиональный монтаж натяжных потолков любой сложности. Подбираем и устанавливаем ПВХ или тканевые полотна, учитываем особенности помещения, освещения и коммуникаций. Аккуратно выполняем монтаж профиля, натяжение полотна и установку светильников, обеспечивая идеально ровную поверхность без дефектов и провисаний.',
  },
  {
    title: 'Электрика - установка розеток, выключателей и светильников',
    short: 'Устанавливаем розетки, выключатели и светильники с соблюдением всех норм безопасности.',
    price: 'от 450 ₽',
    image: k9,
    details:
      'Выполняем профессиональный монтаж и подключение электрооборудования в квартире. Устанавливаем розетки, выключатели, люстры, точечные светильники и бра, соблюдая все нормы безопасности и схемы подключения. Проверяем работоспособность каждой точки, обеспечивая надежную и безопасную эксплуатацию электросети.',
  },
  {
    title: 'Штробление и монтаж кабеля',
    short: 'Выполняем штробление и прокладку кабеля по стенам и потолкам.',
    price: 'от 350 ₽/погонный метр',
    image: k10,
    details:
      'Выполняем прокладку электрических кабелей скрытым способом с предварительным штроблением стен и перегородок. Аккуратно формируем каналы под проводку, укладываем кабель согласно проекту и требованиям безопасности, фиксируем его и подготавливаем под дальнейшую отделку. Обеспечиваем точность трассировки, аккуратность работ и безопасную эксплуатацию электросети.',
  },
  {
    title: 'Дизайн-проект',
    short: 'Разрабатываем индивидуальный дизайн-проект для вашего помещения.',
    price: 'от 2000 ₽',
    image: k11,
    details:
      'Создаем уникальный дизайн-проект, учитывая ваши предпочтения и особенности помещения. Разрабатываем подробные чертежи, подбираем материалы и оборудование, обеспечиваем согласованность всех элементов интерьера.',
  },
]

export default function FinishingServices() {
  const [selectedService, setSelectedService] = useState(null)
  const carouselRef = useRef(null)

  const scrollServices = (direction) => {
    const carousel = carouselRef.current

    if (!carousel) return

    const cards = Array.from(carousel.querySelectorAll('article'))

    if (!cards.length) return

    const currentScroll = carousel.scrollLeft
    const cardPositions = cards.map((card) => card.offsetLeft)

    const currentIndex = cardPositions.reduce(
      (closest, position, index) => {
        const distance = Math.abs(position - currentScroll)
        return distance < closest.distance
          ? { index, distance }
          : closest
      },
      { index: 0, distance: Infinity }
    ).index

    let targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

    if (targetIndex < 0) {
      targetIndex = cards.length - 1
    } else if (targetIndex >= cards.length) {
      targetIndex = 0
    }

    const left = Math.max(0, cards[targetIndex].offsetLeft - 16)
    carousel.scrollTo({
      left,
      behavior: 'smooth',
    })
  }

  const closeSelectedService = () => {
    setSelectedService(null)
  }

  const openSelectedService = (service) => {
    setSelectedService(service)
  }

  useEffect(() => {
    if (!selectedService) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSelectedService()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    pauseSmoothScroll(true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      pauseSmoothScroll(false)
    }
  }, [selectedService])

  return (
    <section id="services" className="scroll-mt-24 bg-white py-8 transition-colors duration-300 dark:bg-custom-grey sm:py-10 lg:py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollFadeInUp className="mb-6 text-center sm:mb-7">
          <h2 className="text-2xl font-bold uppercase leading-tight text-custom-blue dark:text-white sm:text-3xl">
            Наши услуги
          </h2>
          <span className="mx-auto mt-3 block h-0.5 w-12 rounded-full bg-custom-blue" />
        </ScrollFadeInUp>

        <ScrollFadeInUp className="grid grid-cols-1 items-center gap-4 md:grid-cols-[72px_1fr_72px]">
          <button
            type="button"
            onClick={() => scrollServices('prev')}
            className="mx-auto hidden h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-custom-blue shadow-lg transition-all hover:scale-105 hover:border-custom-blue dark:border-gray-700 dark:bg-gray-800 dark:text-white md:mx-0 md:flex"
            aria-label="Предыдущие услуги"
          >
            <FaChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <div
            ref={carouselRef}
            className="finishing-services-carousel snap-x snap-mandatory overflow-x-auto overscroll-x-contain p-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max gap-6 px-4 md:px-0">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group w-[min(85vw,22rem)] shrink-0 snap-start overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 hover:border-custom-blue hover:shadow-md sm:w-[22rem] dark:bg-custom-grey lg:w-[24rem]"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    width={384}
                    height={208}
                    sizes="(max-width: 640px) 85vw, 384px"
                    draggable={false}
                    className="pointer-events-none h-52 w-full object-cover select-none"
                  />
                  <div className="flex min-h-44 flex-col px-4 py-4">
                    <h3 className="text-base font-bold text-custom-blue dark:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {service.short}
                    </p>
                    {service.price && (
                      <p className="mt-3 text-sm font-semibold text-custom-blue">
                        {service.price}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => openSelectedService(service)}
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-custom-blue transition-colors hover:text-custom-blue/80"
                    >
                      Подробнее
                      <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollServices('next')}
            className="mx-auto hidden h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-custom-blue shadow-lg transition-all hover:scale-105 hover:border-custom-blue dark:border-gray-700 dark:bg-gray-800 dark:text-white md:mx-0 md:flex"
            aria-label="Следующие услуги"
          >
            <FaChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </ScrollFadeInUp>
      </div>

      {selectedService &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-gray-950/60"
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 min-h-full w-full cursor-pointer"
              onClick={closeSelectedService}
              aria-label="Закрыть всплывающее окно"
            />
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                id="service-modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="service-dialog-title"
                onClick={(event) => event.stopPropagation()}
                className="relative z-10 max-h-[85dvh] w-full max-w-2xl overflow-y-auto overscroll-contain touch-pan-y rounded-xl bg-white shadow-2xl dark:bg-custom-grey"
              >
                <div className="relative">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    decoding="async"
                    className="h-48 w-full object-cover sm:h-64"
                  />
                  <button
                    type="button"
                    onClick={closeSelectedService}
                    className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-custom-blue shadow-md dark:bg-gray-800 dark:text-white"
                    aria-label="Закрыть"
                  >
                    <FaTimes className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="p-5 sm:p-7">
                  <h3
                    id="service-dialog-title"
                    className="pr-2 text-xl font-bold text-custom-blue dark:text-white sm:text-3xl"
                  >
                    {selectedService.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                    {selectedService.details}
                  </p>
                  {selectedService.price && (
                    <p className="mt-4 text-base font-semibold text-custom-blue">
                      {selectedService.price}
                    </p>
                  )}
                  <a
                    href="#lead-form"
                    onClick={closeSelectedService}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-custom-blue px-6 py-3 text-base font-medium text-white shadow-lg sm:w-auto dark:hover:bg-white dark:hover:text-custom-blue"
                  >
                    Обсудить услугу
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
