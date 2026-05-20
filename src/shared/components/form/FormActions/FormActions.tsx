'use client'

import type * as React from 'react'
import { cn } from '@/lib/utils'

interface FormActionsProps extends React.ComponentProps<'div'> {
  align?: 'left' | 'center' | 'right'
}

export const FormActions = ({ align = 'left', className, ...props }: FormActionsProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right',
        },
        className,
      )}
      {...props}
    />
  )
}

/* <FormActions align='right'>
  <Button variant='outline'>Huỷ</Button>
  <Button type='submit'>Lưu</Button>
</FormActions> */
