import type React from 'react'
import { cn } from '@/lib/utils'

interface PageSectionProps {
  children: React.ReactNode
  className?: string
}

export default function PageSection({ children, className }: PageSectionProps) {
  return <section className={cn('py-16 md:py-24', className)}>{children}</section>
}
