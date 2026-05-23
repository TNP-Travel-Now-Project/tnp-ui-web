import type React from 'react'
import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
}

export default function PageShell({ children, className }: PageShellProps) {
  return <div className={cn('min-h-screen bg-white', className)}>{children}</div>
}
