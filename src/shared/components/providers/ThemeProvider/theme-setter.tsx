'use client'

import { useEffect } from 'react'
import { useTheme } from './theme-provider'

export function ThemeSetter({ theme }: { theme: 'light' | 'dark' | 'system' }) {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])

  return null
}
