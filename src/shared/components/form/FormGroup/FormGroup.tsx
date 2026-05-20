'use client'

import type * as React from 'react'
import { cn } from '@/lib/utils'

interface FormGroupProps extends React.ComponentProps<'fieldset'> {
  label?: React.ReactNode
  description?: React.ReactNode
}

export const FormGroup = ({
  label,
  description,
  className,
  children,
  ...props
}: FormGroupProps) => {
  return (
    <fieldset className={cn('space-y-4', className)} {...props}>
      {label && <legend className='text-sm font-medium'>{label}</legend>}
      {description && <p className='text-sm text-muted-foreground'>{description}</p>}
      {children}
    </fieldset>
  )
}

/* <FormGroup label='Địa chỉ' description='Thông tin nơi ở hiện tại'>
  <FormInput name='address' control={form.control} label='Địa chỉ' />
  <FormSelect name='city' control={form.control} label='Thành phố' options={[]} />
</FormGroup> */
