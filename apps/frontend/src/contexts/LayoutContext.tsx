import React, { createContext, useContext, useState, useEffect } from 'react'

type LayoutTheme = 'blue' | 'red'

interface LayoutContextType {
  theme: LayoutTheme
  setTheme: (theme: LayoutTheme) => void
  toggleTheme: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

interface LayoutProviderProps {
  children: React.ReactNode
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<LayoutTheme>(() => {
    // Load from localStorage if available, default to red (new theme)
    const saved = localStorage.getItem('lms-layout-theme')
    return (saved as LayoutTheme) || 'red'
  })

  useEffect(() => {
    // Save to localStorage whenever theme changes
    localStorage.setItem('lms-layout-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'blue' ? 'red' : 'blue')
  }

  const value = {
    theme,
    setTheme,
    toggleTheme
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
} 