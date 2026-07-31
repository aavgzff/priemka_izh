import { useState } from 'react'
import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import { FaTelegramPlane, FaVk, FaWhatsapp, FaMapMarkerAlt, FaLock, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Button } from 'flowbite-react'
import formImage from '@/assets/images/form-img.jpg'
import { sendForm } from '@/api/sendForm'
import { Parallax, ScrollFadeInUp } from '@/components/AnimatedElements'


export default function SiteFooter() {
  
const [loading, setLoading] = useState(false)
const [status, setStatus] = useState('')

const [formData, setFormData] = useState({
  name: '',
  phone: '',
  finishType: '',
  rooms: '',
  thermalInspection: false,
})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }))
}

const handleCheckboxChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    thermalInspection: e.target.checked,
  }))
}

// ✅ УБРАН ЛИШНИЙ "\"
const isPhoneComplete =
  formData.phone.replace(/\D/g, '').length === 11

const handleSubmit = async (e) => {
  e.preventDefault()

  if (loading) return

  if (!isPhoneComplete) {
    setStatus('Введите корректный номер телефона')
    return
  }

  setLoading(true)
  setStatus('')

  try {
    const payload = {
      name: formData.name.trim(),
      phone: formData.phone,
      finishType: formData.finishType,
      rooms: formData.rooms,
      thermalInspection: formData.thermalInspection,
      source: 'Форма приёмки квартиры',
    }

    await sendForm(payload)

    setFormData({
      name: '',
      phone: '',
      finishType: '',
      rooms: '',
      thermalInspection: false,
    })
    setStatus('Заявка отправлена. Мы скоро свяжемся с вами.')
  } catch (error) {
    console.error('Ошибка отправки формы:', error)
    setStatus('Ошибка отправки заявки. Попробуйте позже.')
  } finally {
    setLoading(false)
  }
}

 
  return (
    <footer className="bg-[#121922] text-white scroll-mt-25 dark:bg-[#201f1f]" id="lead-form">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Форма подписки */}
        <ScrollFadeInUp className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-950/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr]">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[360px]">
              <Parallax speed={0.2} className="absolute inset-x-0 -top-[12%] h-[124%] w-full">
                <img
                  src={formImage}
                  alt="Форма приёмки"
                  className="h-full w-full object-cover"
                />
              </Parallax>
              <div className="absolute inset-0 bg-custom-blue/65 dark:bg-slate-950/55" />
              <div className="relative z-10 flex h-full flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
                <h2 className="max-w-md text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
                  Оставьте заявку и получите расчет стоимости
                </h2>
                <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                  Наш специалист свяжется с Вами в течение 15 минут и ответит на все вопросы.
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
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Ваше имя
                    </label>
                    <input
                      id="name"
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
                    <label htmlFor="phone" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Телефон
                    </label>
                    <IMaskInput
                      id="phone"
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
                    <label htmlFor="finishType" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Вид отделки
                    </label>
                    <select
                      id="finishType"
                      name="finishType"
                      value={formData.finishType}
                      onChange={handleChange}
                      className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm text-custom-blue outline-none transition-colors focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
                    >
                      <option value="">Выберите услугу</option>
                      <option value="Предчистовая отделка">Предчистовая отделка</option>
                      <option value="Чистовая отделка">Чистовая отделка</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="rooms" className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-300">
                      Количество комнат
                    </label>
                    <select
                      id="rooms"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm text-custom-blue outline-none transition-colors focus:border-custom-blue dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
                    >
                      <option value="" disabled>
                        Выберите вариант
                      </option>
                      <option value="студия">Студия</option>
                      <option value="1кк">Однокомнатная квартира (1кк)</option>
                      <option value="1.5кк">Полуторакомнатная квартира (1.5кк)</option>
                      <option value="2кк">Двухкомнатная квартира (2кк)</option>
                      <option value="2к+">Двухкомнатная+ квартира (2к+)</option>
                      <option value="3кк">Трехкомнатная квартира (3кк)</option>
                      <option value="3к+">Трехкомнатная+ квартира (3к+)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <input
                    id="thermalInspection"
                    name="thermalInspection"
                    type="checkbox"
                    checked={formData.thermalInspection}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 bg-white text-custom-blue focus:ring-custom-blue"
                  />
                  <label htmlFor="thermalInspection" className="text-sm text-gray-600 dark:text-gray-300">
                    Дополнительная услуга к приёмке — <span className="font-semibold text-gray-900 dark:text-white">тепловизионный осмотр (+2500 ₽)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-custom-blue px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-custom-blue/90 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-white dark:hover:text-slate-950"
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
    </footer>
  )
}
