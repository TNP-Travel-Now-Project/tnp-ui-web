import type React from 'react'
import { cn } from '@/shared/lib/utils/cn'

interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export default function Heading({ children, level = 1, className }: HeadingProps) {
  const baseClasses = 'font-semibold text-gray-900 dark:text-gray-100'

  const sizeClasses = {
    1: 'text-3xl md:text-4xl',
    2: 'text-2xl md:text-3xl',
    3: 'text-xl md:text-2xl',
    4: 'text-lg md:text-xl',
    5: 'text-base md:text-lg',
    6: 'text-sm md:text-base',
  }

  const classes = cn(baseClasses, sizeClasses[level], className)

  switch (level) {
    case 1:
      return <h1 className={classes}>{children}</h1>
    case 2:
      return <h2 className={classes}>{children}</h2>
    case 3:
      return <h3 className={classes}>{children}</h3>
    case 4:
      return <h4 className={classes}>{children}</h4>
    case 5:
      return <h5 className={classes}>{children}</h5>
    case 6:
      return <h6 className={classes}>{children}</h6>
    default:
      return <h1 className={classes}>{children}</h1>
  }
}
