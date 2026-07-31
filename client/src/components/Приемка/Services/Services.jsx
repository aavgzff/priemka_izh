import withoutFinishing from '@/assets/images/без отделки.jpg'
import withFinishing from '@/assets/images/с отделкой.jpg'
import {
  ParallaxFrame,
  ScrollFadeInUp,
  ScrollSlideInLeft,
  ScrollSlideInRight,
} from '@/components/AnimatedElements'

const preFinishPrices = [
  { type: 'Студия', price: '2 500 ₽' },
  { type: '1 комнатная', price: '3 000 ₽' },
  { type: '1 комнатная+', price: '3 500 ₽' },
  { type: '2 комнатная', price: '4 000 ₽' },
  { type: '2 комнатная+', price: '4 500 ₽' },
  { type: '3 комнатная', price: '5 000 ₽' },
  { type: '3 комнатная+', price: '5 500 ₽' },
]

const finishPrices = [
  { type: 'Студия', price: '3 000 ₽' },
  { type: '1 комнатная', price: '3 500 ₽' },
  { type: '1 комнатная+', price: '4 000 ₽' },
  { type: '2 комнатная', price: '4 500 ₽' },
  { type: '2 комнатная+', price: '5 000 ₽' },
  { type: '3 комнатная', price: '5 500 ₽' },
  { type: '3 комнатная+', price: '6 000 ₽' },
]

function PriceList({ items }) {
  return (
    <div className="mt-6 space-y-0 border-t border-slate-200 dark:border-white/10">
      {items.map(({ type, price }) => (
        <div
          key={type}
          className="flex items-baseline justify-between gap-4 border-b border-slate-200 py-3 dark:border-white/10"
        >
          <span className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">{type}</span>
          <span className="shrink-0 text-sm font-semibold text-custom-blue sm:text-base">{price}</span>
        </div>
      ))}
    </div>
  )
}

export default function Services() {
  return (
    <section className="relative z-10 bg-[#f8fafc] py-12 transition-colors duration-300 dark:bg-custom-grey sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollFadeInUp>
          <h3 className="mb-8 text-center text-3xl font-light leading-tight text-custom-blue dark:text-white sm:mb-12 sm:text-4xl md:text-5xl lg:text-6xl">
            Наши услуги
          </h3>
        </ScrollFadeInUp>
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            <ScrollSlideInLeft className="order-1 mx-auto w-full max-w-[760px] lg:order-1">
              <ParallaxFrame
                speed={0.18}
                className="h-[320px] w-full rounded-2xl shadow-lg sm:h-[420px] md:h-[520px] lg:h-[620px]"
              >
                <img
                  src={withoutFinishing}
                  loading="lazy"
                  decoding="async"
                  width={760}
                  height={620}
                  alt="Без отделки"
                />
              </ParallaxFrame>
            </ScrollSlideInLeft>
            <ScrollSlideInRight className="order-2 flex flex-col justify-start space-y-4 lg:order-2">
              <h5 className="text-start text-2xl font-normal text-custom-blue dark:text-white sm:text-3xl md:text-4xl">
                Предчистовая отделка
              </h5>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                Эта услуга включает проверку качества строительства и соответствия квартиры заявленным характеристикам застройщика. Специалисты проверяют:
              </p>
              <ul className="list-inside list-disc space-y-2 text-start text-sm text-gray-700 dark:text-gray-300 sm:text-base">
                <li>Соответствие площади проектной документации.</li>
                <li>Качество стен, потолков и полов (вертикальность, горизонтальность, отсутствие трещин, отслоений).</li>
                <li>Исправность окон и дверей.</li>
                <li>Работу инженерных коммуникаций (водоснабжение, отопление, электрика, вентиляция).</li>
                <li>Отсутствие дефектов конструкции здания.</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                По результатам проверки составляется акт осмотра, фиксирующий выявленные недостатки. Это позволяет покупателю потребовать устранения недостатков застройщиком либо компенсировать расходы на устранение самостоятельно.
              </p>
              <p className="text-base font-semibold text-custom-blue sm:text-lg">
                Тепловизионный осмотр — дополнительно +2 500 ₽
              </p>
              <PriceList items={preFinishPrices} />
            </ScrollSlideInRight>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            <ScrollSlideInLeft className="order-2 flex flex-col justify-start space-y-4 lg:order-1">
              <h5 className="text-start text-2xl font-normal text-custom-blue dark:text-white sm:text-3xl md:text-4xl">
                Чистовая отделка
              </h5>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                При приеме квартиры с отделкой дополнительно проверяется качество выполненных отделочных работ. Здесь специалисты обращают внимание на:
              </p>
              <ul className="list-inside list-disc space-y-2 text-start text-sm text-gray-700 dark:text-gray-300 sm:text-base">
                <li>Качество материалов отделки (обои, плитка, напольные покрытия, стены).</li>
                <li>Правильность укладки плитки, настила пола, поклейки обоев.</li>
                <li>Работоспособность сантехники, осветительных приборов, розеток и выключателей.</li>
                <li>Функционирование встроенной мебели и оборудования (если предусмотрено проектом).</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                По результатам проверки составляется акт осмотра, фиксирующий выявленные недостатки. Это позволяет покупателю потребовать устранения недостатков застройщиком либо компенсировать расходы на устранение самостоятельно.
              </p>
              <p className="text-base font-semibold text-custom-blue sm:text-lg">
                Тепловизионный осмотр — дополнительно +2 500 ₽
              </p>
              <PriceList items={finishPrices} />
            </ScrollSlideInLeft>
            <ScrollSlideInRight className="order-1 mx-auto w-full max-w-[760px] lg:order-2">
              <ParallaxFrame
                speed={0.18}
                className="h-[320px] w-full rounded-2xl shadow-lg sm:h-[420px] md:h-[520px] lg:h-[620px]"
              >
                <img
                  src={withFinishing}
                  loading="lazy"
                  decoding="async"
                  width={760}
                  height={620}
                  alt="С отделкой"
                />
              </ParallaxFrame>
            </ScrollSlideInRight>
          </div>
        </div>
      </div>
    </section>
  )
}
