import React, { useState, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'

export const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setTheme('light')
    } else if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark')
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)')) {
        setTheme('dark')
      }
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.any
}
