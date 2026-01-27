import { useEffect } from 'react'
import { useTheme } from '@/app/providers/useTheme'
import { GoMoon } from "react-icons/go"
import { IoSunnyOutline } from "react-icons/io5"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (!theme) {
      setTheme('dark')
    }
  }, [theme, setTheme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full
        bg-gray-100 dark:bg-gray-800
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-300 cursor-pointer"
      aria-label={theme === 'light'
        ? 'Переключить на тёмную тему'
        : 'Переключить на светлую тему'}
    >
      {theme === 'light'
        ? <GoMoon className="w-5 h-5" />
        : <IoSunnyOutline className="w-5 h-5" />
      }
    </button>
  )
}
