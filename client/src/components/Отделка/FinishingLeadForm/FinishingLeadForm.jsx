import { useState } from 'react'
import { IMaskInput } from 'react-imask'
import { FaLock } from 'react-icons/fa'
import { sendForm } from '@/api/sendForm'
import formImage from '@/assets/images/форма.jpg'
import { Parallax, ScrollFadeInUp } from '@/components/AnimatedElements'

const initialFormData = {
  name: '',
  phone: '',
  finishType: '',
  area: '',
}

export default function FinishingLeadForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const isPhoneComplete = formData.phone.replace(/\D/g, '').length === 11

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) return

    if (!formData.name.trim() || !isPhoneComplete) {
      setStatus('Заполните имя и корректный номер телефона.')
      return
    }

    setLoading(true)
    setStatus('')

    try {
      await sendForm({
        name: formData.name.trim(),
        phone: formData.phone,
        finishType: formData.finishType,
        area: formData.area.trim(),
        rooms: '',
        thermalInspection: false,
        source: 'Форма расчета стоимости отделки',
      })

      setFormData(initialFormData)
      setStatus('Заявка отправлена. Мы скоро свяжемся с вами.')
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      setStatus('Не удалось отправить заявку. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lead-form" className="scroll-mt-24 bg-white py-8 transition-colors duration-300 dark:bg-custom-grey sm:py-10 lg:py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollFadeInUp className="overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-slate-900/90 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr]">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[360px]">
              <Parallax speed={0.18} className="absolute inset-x-0 -top-[12%] h-[124%] w-full">
                <img
                  src={formImage}
                  alt="Интерьер после отделки"
                  className="h-full w-full object-cover"
                />
              </Parallax>
              <div className="absolute inset-0 bg-slate-950/55" />
              <div className="relative z-10 flex h-full flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
                <h2 className="max-w-md text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
                  Оставьте заявку и получите расчет стоимости
                </h2>
                <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                  Наш специалист свяжется с вами в течение 15 минут и ответит на все вопросы
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-4 dark:bg-slate-950/70 sm:p-6 lg:p-8">
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-7"
                noValidate
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="lead-name" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Ваше имя
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван"
                      className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm text-custom-blue outline-none transition-colors placeholder:text-gray-400 focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Телефон
                    </label>
                    <IMaskInput
                      id="lead-phone"
                      mask="+{7} (000) 000-00-00"
                      value={formData.phone}
                      onAccept={(value) =>
                        setFormData((current) => ({ ...current, phone: value }))
                      }
                      placeholder="+7 (___) ___-__-__"
                      className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm text-custom-blue outline-none transition-colors placeholder:text-gray-400 focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-finish-type" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Тип ремонта
                    </label>
                    <select
                      id="lead-finish-type"
                      name="finishType"
                      value={formData.finishType}
                      onChange={handleChange}
                      className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm text-custom-blue outline-none transition-colors focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
                    >
                      <option value="">Выберите услугу</option>
                      <option value="Грунтование и шпаклевание в 2 слоя">Грунтование и шпаклевание в 2 слоя</option>
                      <option value="Поклейка обоев">Поклейка обоев</option>
                      <option value="Декоративная штукатурка">Декоративная штукатурка</option>
                      <option value="Укладка керамогранита">Укладка керамогранита</option>
                      <option value="Установка сантехнического оборудования">Установка сантехнического оборудования</option>
                      <option value="Укладка ламината и кварцвинила">Укладка ламината и кварцвинила</option>
                      <option value="Укладка инженерной доски и паркета">Укладка инженерной доски и паркета</option>
                      <option value="Установка натяжного потолка">Установка натяжного потолка</option>
                      <option value="Электрика - установка розеток, выключателей и светильников">Электрика - установка розеток, выключателей и светильников</option>
                      <option value="Штробление и монтаж кабеля">Штробление и монтаж кабеля</option>
                      <option value="Дизайн-проект">Дизайн-проект</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="lead-area" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Площадь, м²
                    </label>
                    <input
                      id="lead-area"
                      name="area"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="Например: 50"
                      className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm text-custom-blue outline-none transition-colors placeholder:text-gray-400 focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-custom-blue px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-custom-blue/90 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-white dark:hover:text-slate-950 cursor-pointer"
                >
                  {loading ? 'Отправка...' : 'Отправить заявку'}
                </button>

                <p className="mt-3 flex items-center justify-center gap-2 text-center text-[0.7rem] font-medium text-gray-400 dark:text-gray-500">
                  <FaLock className="h-3 w-3" aria-hidden="true" />
                  Мы не передаем ваши данные третьим лицам
                </p>

                {status && (
                  <p className="mt-3 text-center text-xs font-semibold text-custom-blue">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </ScrollFadeInUp>
      </div>
    </section>
  )
}
