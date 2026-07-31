import {
  FaArrowRight,
  FaClipboardList,
  FaCut,
  FaFileContract,
  FaFileInvoice,
  FaRegCheckSquare,
  FaRulerCombined,
} from 'react-icons/fa'
import { ScrollFadeInUp, ScrollStagger } from '@/components/AnimatedElements'

const steps = [
  {
    number: '01',
    title: 'Заявка',
    text: 'Оставляете заявку на сайте или по телефону',
    Icon: FaClipboardList,
  },
  {
    number: '02',
    title: 'Выезд и замер',
    text: 'Бесплатно приезжаем, делаем замеры и консультации (при заключении договора)',
    Icon: FaRulerCombined,
  },
  {
    number: '03',
    title: 'Смета и договор',
    text: 'Составляем смету и подписываем договор',
    Icon: FaFileContract,
  },
  {
    number: '04',
    title: 'Выполнение работ',
    text: 'Выполняем работы с соблюдением сроков, стандартов и предоставлением фотоотчета',
    Icon: FaFileInvoice,
  },
  {
    number: '05',
    title: 'Приемка',
    text: 'Вы принимаете работу и проверяете качество',
    Icon: FaRegCheckSquare,
  },
  {
    number: '06',
    title: 'Гарантия и сервис',
    text: 'Предоставляем гарантию и остаемся на связи',
    Icon: FaCut,
  },
]

export default function FinishingWorkflow() {
  return (
    <section id="workflow" className="scroll-mt-24 bg-white py-8 transition-colors duration-300 dark:bg-custom-grey sm:py-10 lg:py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollFadeInUp className="mb-6 text-center sm:mb-8">
          <h2 className="text-2xl font-bold uppercase leading-tight text-custom-blue dark:text-white sm:text-3xl">
            Как мы работаем
          </h2>
          <span className="mx-auto mt-3 block h-0.5 w-12 rounded-full bg-custom-blue" />
        </ScrollFadeInUp>

        <ScrollStagger
          stagger={0.09}
          y={32}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0"
        >
          {steps.map(({ number, title, text, Icon }, index) => (
            <div
              key={number}
              className="relative rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-custom-blue/35 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/35 sm:min-h-44 lg:border-0 lg:bg-transparent lg:p-0 lg:pr-7 lg:shadow-none lg:hover:translate-y-0 lg:hover:border-transparent lg:hover:shadow-none lg:dark:bg-transparent"
            >
              <div className="flex items-start gap-4 lg:block">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#C7A48B] dark:text-blue-300 lg:mb-4">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="text-lg font-bold leading-none text-custom-blue">
                    {number}
                  </p>
                  <h3 className="mt-2 text-sm font-bold leading-snug text-custom-blue dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-40 text-xs font-medium leading-relaxed text-gray-600 dark:text-gray-300 sm:max-w-none lg:max-w-36">
                    {text}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <FaArrowRight
                  className="absolute right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-gray-300 dark:text-gray-600 lg:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  )
}
