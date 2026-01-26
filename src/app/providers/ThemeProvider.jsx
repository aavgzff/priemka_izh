import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

// Функция для получения начальной темы
const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }
  
  // Проверяем системную тему
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  
  return 'light'
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getInitialTheme())

  // Применяем тему при монтировании и при изменении
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const root = document.documentElement
    
    // Удаляем класс dark
    root.classList.remove('dark')
    
    // Добавляем класс dark если тема темная
    if (theme === 'dark') {
      root.classList.add('dark')
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('theme', theme)
    
    // Принудительно обновляем color-scheme для скроллбара
    root.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
    
    // Принудительно триггерим перерисовку
    root.style.display = 'none'
    root.offsetHeight // триггер reflow
    root.style.display = ''
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
