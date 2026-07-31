import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { Link, useLocation } from 'react-router-dom'
import logo from '@/assets/images/лого 2.png'
import lightLogo from '@/assets/images/logo light.png'
import { IoClose, IoMenu } from 'react-icons/io5'
import { useTheme } from '@/app/providers/useTheme'
import { scrollToTarget, scrollToTop } from '@/lib/scroll'

const navLinks = [
  {
    to: '/',
    label: 'ПРИЕМКА',
  },
  {
    to: '/finishing',
    label: 'ОТДЕЛКА',
  },
  {
    to: '/projects',
    label: 'НАШИ РАБОТЫ',
  },
  {
    to: '#footer',
    label: 'КОНТАКТЫ',
  },
]

const navLinkClassName = `
  relative
  font-worksans
  text-gray-700
  dark:text-gray-300
  font-medium
  transition-colors
  duration-300
  hover:text-custom-blue

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-0.5
  after:w-0
  after:bg-custom-blue
  after:transition-all
  after:duration-300

  hover:after:w-full
`

function getLeadFormHref(pathname) {
  if (pathname === '/' || pathname === '') {
    return '/#lead-form'
  }

  // Отделка и страница работ → форма отделки
  return '/finishing#lead-form'
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useTheme()
  const { pathname } = useLocation()
  const leadFormHref = getLeadFormHref(pathname)

  const handleLeadClick = (event) => {
    setIsMenuOpen(false)

    const [path, hash] = leadFormHref.split('#')
    if (!hash) return

    const isSamePage =
      pathname === path || (path === '/' && (pathname === '/' || pathname === ''))

    if (isSamePage) {
      event.preventDefault()
      scrollToTarget(`#${hash}`)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
  <header className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white/55 shadow-none backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-black/35">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Логотип + Навигация */}
          <div className="flex items-center gap-8 lg:gap-12">

            <Link to="/" onClick={() => scrollToTop()} className="flex items-center">
              <div className="h-10">
                <img
                  src={theme === 'light' ? lightLogo : logo}
                  alt="Логотип"
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map(({ to, label }) =>
                to.startsWith('#') ? (
                  <a
                    key={label}
                    href={to}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToTarget(to)
                    }}
                    className={navLinkClassName}
                  >
                    {label}
                  </a>
                ) : (
                  <Link key={label} to={to} onClick={() => scrollToTop()} className={navLinkClassName}>
                    {label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            <Link
              to={leadFormHref}
              onClick={handleLeadClick}
              className="hidden items-center justify-center rounded-lg bg-custom-blue hover:bg-custom-blue/90 px-4 sm:px-6 py-2 sm:py-2.5 text-white text-xs sm:text-sm font-worksans font-medium transition-all duration-300 shadow-md hover:shadow-lg sm:inline-flex"
            >
              Оставить заявку
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-custom-blue transition-all duration-300 hover:bg-gray-200 dark:bg-custom-blue/10 dark:hover:bg-gray-700 lg:hidden"
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen
                ? <IoClose className="h-6 w-6" />
                : <IoMenu className="h-6 w-6" />
              }
            </button>
          </div>

        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-gray-200 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/95 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map(({ to, label }) =>
            to.startsWith('#') ? (
              <a
                key={label}
                href={to}
                onClick={(event) => {
                  event.preventDefault()
                  setIsMenuOpen(false)
                  scrollToTarget(to)
                }}
                className="rounded-lg px-3 py-3 font-worksans text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-custom-blue dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                onClick={() => {
                  scrollToTop()
                  setIsMenuOpen(false)
                }}
                className="rounded-lg px-3 py-3 font-worksans text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-custom-blue dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              >
                {label}
              </Link>
            )
          )}

          <Link
            to={leadFormHref}
            onClick={handleLeadClick}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-custom-blue px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-custom-blue/90 hover:shadow-lg sm:hidden"
          >
            Оставить заявку
          </Link>
        </nav>
      </div>
    </header>
  )
}
