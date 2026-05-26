'use client'

import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label as ShadcnLabel } from '@/shared/components/ui/form/label'

const labelVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sm font-medium text-foreground',
      muted: 'text-sm font-medium text-muted-foreground',
      danger: 'text-sm font-medium text-destructive',
      success: 'text-sm font-medium text-green-600',
      required: 'text-sm font-medium text-foreground',
    },

    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface LabelProps
  extends React.ComponentProps<typeof ShadcnLabel>,
    VariantProps<typeof labelVariants> {
  required?: boolean
  optional?: boolean
  helperText?: React.ReactNode
}

const Label = React.forwardRef<React.ElementRef<typeof ShadcnLabel>, LabelProps>(
  (
    {
      className,
      variant,
      size,
      required = false,
      optional = false,
      helperText,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div className='space-y-1'>
        <ShadcnLabel
          ref={ref}
          className={cn(
            labelVariants({
              variant: required && variant === 'default' ? 'required' : variant,
              size,
            }),
            className,
          )}
          {...props}
        >
          <span className='inline-flex items-center gap-1'>
            {children}

            {required && <span className='text-destructive'>*</span>}

            {optional && <span className='text-xs text-muted-foreground'>(Optional)</span>}
          </span>
        </ShadcnLabel>

        {helperText && <p className='text-xs text-muted-foreground'>{helperText}</p>}
      </div>
    )
  },
)

Label.displayName = 'Label'

export default Label
export { labelVariants }
