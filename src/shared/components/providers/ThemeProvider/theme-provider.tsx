'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'theme'
type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')
  const mediaQueryRef = useRef<MediaQueryList | null>(null)

  const applyTheme = useCallback((value: Theme): ResolvedTheme => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (value === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.add(isDark ? 'dark' : 'light')
      return isDark ? 'dark' : 'light'
    }

    root.classList.add(value)
    return value
  }, [])

  const resolveSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null
    const initial = stored ?? defaultTheme

    setThemeState(initial)

    if (initial === 'system') {
      setResolvedTheme(resolveSystemTheme())
    } else {
      setResolvedTheme(initial)
    }

    applyTheme(initial)

    mediaQueryRef.current = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemChange = () => {
      setThemeState((current) => {
        if (current === 'system') {
          const resolved = resolveSystemTheme()
          setResolvedTheme(resolved)
          applyTheme('system')
        }
        return current
      })
    }

    mediaQueryRef.current.addEventListener('change', handleSystemChange)
    return () => {
      mediaQueryRef.current?.removeEventListener('change', handleSystemChange)
    }
  }, [applyTheme, defaultTheme, resolveSystemTheme, storageKey])

  const setTheme = useCallback(
    (value: Theme) => {
      localStorage.setItem(storageKey, value)
      setThemeState(value)

      if (value === 'system') {
        setResolvedTheme(resolveSystemTheme())
      } else {
        setResolvedTheme(value)
      }

      applyTheme(value)
    },
    [applyTheme, resolveSystemTheme, storageKey],
  )

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
