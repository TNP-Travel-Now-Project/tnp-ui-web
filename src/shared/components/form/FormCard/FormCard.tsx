'use client'

import type * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/layout/card'
import { cn } from '@/lib/utils'

interface FormCardProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  size?: 'default' | 'sm'
}

export const FormCard = ({ title, description, className, children, ...props }: FormCardProps) => {
  return (
    <Card className={cn('w-full', className)} {...props}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

/* <FormCard title='Thông tin cá nhân' description='Nhập thông tin cơ bản của bạn'>
  <FormInput name='email' control={form.control} label='Email' />
  <FormInput name='phone' control={form.control} label='Số điện thoại' />
</FormCard> */
