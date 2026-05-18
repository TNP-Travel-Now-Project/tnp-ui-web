'use client'

import type * as React from 'react'
import { cn } from '@/lib/utils'

interface FormMessageLegacyProps extends React.ComponentProps<'p'> {
  message?: string
}

export const FormMessage = ({ message, className, children, ...props }: FormMessageLegacyProps) => {
  if (!message && !children) return null

  return (
    <p className={cn('text-sm text-destructive', className)} {...props}>
      {message || children}
    </p>
  )
}

/* <FormMessageLegacy message='Vui lòng kiểm tra lại thông tin' /> */
