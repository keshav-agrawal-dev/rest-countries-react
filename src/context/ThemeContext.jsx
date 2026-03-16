import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'true') {
      setDark(true)
      document.body.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setDark((prev) => {
      const newTheme = !prev

      if (newTheme) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }

      localStorage.setItem('theme', newTheme)

      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
