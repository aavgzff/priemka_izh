/** Базовый SEO-конфиг. Домен: VITE_SITE_URL в .env.production */
export const SITE_NAME = 'Метрум'

export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'https://metrum.ru'
}

export const DEFAULT_OG_IMAGE = '/og-image.jpg'

export const routeSeo = {
  '/': {
    title: 'Метрум — приёмка квартир в новостройках Ижевска',
    description:
      'Профессиональная приёмка квартир в новостройках Ижевска. Находим дефекты до подписания акта. Тепловизор, акт осмотра, работа по СНиП и ГОСТ.',
    path: '/',
  },
  '/finishing': {
    title: 'Отделка квартир в Ижевске — Метрум',
    description:
      'Отделочные работы любой сложности в Ижевске: ремонт под ключ, дизайн-проект, гарантия до 3 лет. Прозрачная смета и соблюдение сроков.',
    path: '/finishing',
  },
  '/projects': {
    title: 'Наши работы — портфолио Метрум',
    description:
      'Портфолио дизайн-проектов и реализованных интерьеров Метрум: санузлы, кухни, гостиные, спальни и прихожие.',
    path: '/projects',
  },
  '/privacy': {
    title: 'Политика конфиденциальности — Метрум',
    description: 'Политика конфиденциальности сайта Метрум: порядок обработки и защиты персональных данных.',
    path: '/privacy',
  },
  '/terms': {
    title: 'Условия пользования — Метрум',
    description: 'Пользовательское соглашение сайта Метрум: права и обязанности пользователей и администрации.',
    path: '/terms',
  },
  '/admin': {
    title: 'Админка — Метрум',
    description: 'Служебный раздел управления портфолио.',
    path: '/admin',
    noindex: true,
  },
}

export function getRouteSeo(pathname) {
  return routeSeo[pathname] || routeSeo['/']
}

export function buildJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: SITE_NAME,
    url: siteUrl,
    telephone: '+7-951-210-21-62',
    email: 'info@metrum.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Кирова, 46А',
      addressLocality: 'Ижевск',
      addressRegion: 'Удмуртская Республика',
      addressCountry: 'RU',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Ижевск',
    },
  }
}
