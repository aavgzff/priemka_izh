import { useState } from 'react'
import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'
import { FaTelegramPlane, FaVk, FaWhatsapp, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Button } from 'flowbite-react'
import maxIcon from '@/assets/images/max-icon.svg'
import { sendForm } from '@/api/sendForm'


export default function SiteFooter() {
const [loading, setLoading] = useState(false)

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
    alert('Введите корректный номер телефона')
    return
  }

  setLoading(true)

  try {
    const payload = {
      name: formData.name.trim(),
      phone: formData.phone,
      finishType: formData.finishType,
      rooms: formData.rooms,
      thermalInspection: formData.thermalInspection,
    }

    await sendForm(payload)

    setFormData({
      name: '',
      phone: '',
      finishType: '',
      rooms: '',
      thermalInspection: false,
    })
  } catch (error) {
    console.error('Ошибка отправки формы:', error)
    alert('Ошибка отправки заявки. Попробуйте позже.')
  } finally {
    setLoading(false)
  }
}

 
  return (
    <footer className="bg-gray-900 text-white scroll-mt-25" id="footer">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Форма подписки */}
        <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-12 border border-gray-700 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Форма */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Оставьте заявку</h3>
                <p className="text-gray-400 text-sm">
                  Заполните форму ниже, и мы свяжемся с Вами для обсуждения деталей приёмки вашей квартиры.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate> 
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Ваше имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Иван"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Номер телефона
                  </label>

                  <IMaskInput
                    mask="+{7} (000) 000-00-00"
                    value={formData.phone}
                    onAccept={(value) =>
                      setFormData((prev) => ({ ...prev, phone: value }))
                    }
                    placeholder="+7 (999) 000-00-00"
                    className="block w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Вид отделки */}
                <div>
                  <label
                    htmlFor="finishType"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Вид отделки
                  </label>
                  <select
                    id="finishType"
                    name="finishType"
                    value={formData.finishType}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="" disabled>
                      Выберите вариант
                    </option>
                    <option value="предчистовая">Предчистовая</option>
                    <option value="чистовая">Чистовая</option>
                  </select>
                </div>

                {/* Количество комнат */}
                <div>
                  <label
                    htmlFor="rooms"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Количество комнат
                  </label>
                  <select
                    id="rooms"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

                {/* Доп. услуга */}
                <div className="flex items-start gap-3">
                  <input
                    id="thermalInspection"
                    name="thermalInspection"
                    type="checkbox"
                    checked={formData.thermalInspection}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        thermalInspection: e.target.checked,
                      }))
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="thermalInspection"
                    className="text-sm text-gray-300 cursor-pointer"
                  >
                    Дополнительная услуга к приёмке — <br />
                    <span className="font-medium text-white">
                      тепловизионный осмотр (+2500 ₽)
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-custom-blue hover:bg-custom-blue/90 text-white font-medium py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" disabled={loading}>
                  {loading ? 'Отправка...' : 'Отправить заявку'} 
                </Button>
              </form>
            </div>

            {/* Информация */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6">
              Контакты
            </h3>
            <div className="space-y-4">
              <a 
                href="tel:89512102162"
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <FaPhone className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white transition-colors" />
                <span className="text-sm">+7 (951) 210-21-62</span>
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a 
                  href="https://t.me/Priem_novostroy?text=Здравствуйте!%20Меня%20интересует%20консультация" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-[#27a7e7] text-gray-400 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://vk.ru/priemkaizhevsk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-[#0077FF] text-gray-400 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                  aria-label="VKontakte"
                >
                  <FaVk className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://wa.me/79512102162?text=Здравствуйте!%20Меня%20интересует%20консультация" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-green-500 text-gray-400 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Адрес</p>
                      <p className="text-gray-400 text-sm">Россия, Ижевск</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaClock className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Режим работы</p>
                      <p className="text-gray-400 text-sm">Пн-Пт: 08:00 - 20:00</p>
                      <p className="text-gray-400 text-sm">Сб-Вс: По договоренности</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Нижняя строка */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} <span className="font-semibold text-white">ПРИЁМКА</span>. Все права защищены.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a 
                href="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Политика конфиденциальности
              </a>
              <a 
                href="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
