import type React from 'react'
import { cn } from '@/lib/utils'

interface ScrollAreaProps {
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical' | 'both'
}

export default function ScrollArea({
  children,
  className,
  orientation = 'vertical',
}: ScrollAreaProps) {
  const scrollClasses = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
  }

  return (
    <div
      className={cn(
        'relative',
        scrollClasses[orientation],
        'scrollbar-thin scrollbar-track-gray-100 dark:scrollbar-track-gray-800 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
        className,
      )}
    >
      {children}
    </div>
  )
}
