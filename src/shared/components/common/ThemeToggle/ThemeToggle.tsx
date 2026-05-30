'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/shared/components/common'
import { useTheme } from '@/shared/components/providers'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button onClick={toggle} className={className} aria-label='Toggle theme'>
      {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
