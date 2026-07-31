import { Link } from 'react-router-dom'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaTelegramPlane, FaVk } from 'react-icons/fa'
import logo from '@/assets/images/лого 2.png'
import { scrollToTarget, scrollToTop } from '@/lib/scroll'
import { ScrollStagger } from '@/components/AnimatedElements'

const navigationLinks = [
  { to: '/', label: 'Приёмка квартир' },
  { to: '/finishing', label: 'Отделка квартир' },
  { to: '/projects', label: 'Наши работы' },
]

const clientLinks = [
  { to: '/#lead-form', label: 'Заявка на приёмку' },
  { to: '/finishing#lead-form', label: 'Заявка на отделку' },
  { to: '/privacy', label: 'Политика конфиденциальности' },
  { to: '/terms', label: 'Условия использования' },
]

const linkClassName = 'text-sm leading-6 text-slate-300 transition-colors hover:text-custom-blue'

export default function AppFooter() {
  const handleClientLinkClick = (event, to) => {
    const [path, hash] = to.split('#')

    if (!hash) {
      scrollToTop()
      return
    }

    if (window.location.pathname === path) {
      event.preventDefault()
      scrollToTarget(`#${hash}`)
    }
  }

  return (
    <footer id="footer" className="bg-[#121922] text-white dark:bg-[#201f1f]">
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ScrollStagger
          stagger={0.08}
          y={28}
          className="grid grid-cols-1 gap-9 border-b border-white/10 pb-9 sm:grid-cols-2 lg:grid-cols-[1.25fr_.8fr_1fr_1.15fr] lg:gap-10"
        >
          <div>
            <Link to="/" className="inline-flex" aria-label="На главную страницу">
              <img src={logo} alt="Метрум" className="h-auto w-24" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              Точный подход к Вашему пространству. Мы заботимся о качестве, сроках и комфорте.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://vk.ru/metroom_priemka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-slate-200 transition hover:border-custom-blue hover:text-custom-blue"
                aria-label="Мы во ВКонтакте"
              >
                <FaVk className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/Priem_novostroy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-slate-200 transition hover:border-custom-blue hover:text-custom-blue"
                aria-label="Мы в Telegram"
              >
                <FaTelegramPlane className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Разделы</h3>
            <nav className="mt-4 flex flex-col gap-2.5" aria-label="Навигация в подвале">
              {navigationLinks.map(({ to, label }) => (
                <Link key={`${to}-${label}`} to={to} onClick={scrollToTop} className={linkClassName}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Клиентам</h3>
            <nav className="mt-4 flex flex-col gap-2.5" aria-label="Полезные ссылки">
              {clientLinks.map(({ to, href, label }) =>
                to ? (
                  <Link key={label} to={to} onClick={(event) => handleClientLinkClick(event, to)} className={linkClassName}>
                    {label}
                  </Link>
                ) : (
                  <a key={label} href={href} className={linkClassName}>
                    {label}
                  </a>
                ),
              )}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Контакты</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm leading-6 text-slate-300">
              <a href="tel:+79512102162" className="flex items-center gap-3 transition-colors hover:text-custom-blue">
                <FaPhone className="h-4 w-4 shrink-0 text-custom-blue" />
                +7 (951) 210-21-62
              </a>
              <a href="mailto:info@metrum.ru" className="flex items-center gap-3 transition-colors hover:text-custom-blue">
                <FaEnvelope className="h-4 w-4 shrink-0 text-custom-blue" />
                info@metrum.ru
              </a>
              <p className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 h-4 w-4 shrink-0 text-custom-blue" />
                г. Ижевск, ул. Кирова, 46А
              </p>
              <p className="pl-7 text-slate-400">Пн–Пт: 9:00–20:00 · Сб–Вс: 10:00–18:00</p>
            </div>
          </div>
        </ScrollStagger>

        <div className="flex flex-col gap-2 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Метрум. Все права защищены.</p>
          <p>Информация на сайте не является публичной офертой.</p>
        </div>
      </div>
    </footer>
  )
}
