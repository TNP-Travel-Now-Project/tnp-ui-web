'use client'

import type * as React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/feedback/skeleton'

interface FormSkeletonProps extends React.ComponentProps<'div'> {
  fields?: number
  labelWidth?: string
}

export const FormSkeleton = ({
  fields = 3,
  labelWidth = 'w-24',
  className,
  ...props
}: FormSkeletonProps) => {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className='space-y-2'>
          <Skeleton className={cn('h-4', labelWidth)} />
          <Skeleton className='h-9 w-full' />
        </div>
      ))}
    </div>
  )
}

/* <FormSkeleton fields={4} labelWidth='w-32' /> */
