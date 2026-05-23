import type React from 'react'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('container max-w-6xl mx-auto px-5 pt-12 pb-20', className)}>{children}</div>
  )
}
