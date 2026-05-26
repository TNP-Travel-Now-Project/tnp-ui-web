import type React from 'react'
import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
}

export default function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn('relative min-h-screen overflow-hidden bg-transparent', className)}>
      {children}
    </div>
  )
}
