// src/shared/components/ui/button.tsx

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/shared/lib/cn'

const buttonVariants = cva(
  [
    // layout
    'inline-flex items-center justify-center gap-2',

    // typography
    'text-sm font-medium',

    // interaction
    'transition-colors duration-200',

    // accessibility
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',

    // disabled
    'disabled:pointer-events-none',
    'disabled:opacity-50',

    // shape
    'rounded-md',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-primary', 'text-primary-foreground', 'hover:bg-primary/90'],

        secondary: ['bg-secondary', 'text-secondary-foreground', 'hover:bg-secondary/80'],

        outline: [
          'border',
          'border-border',
          'bg-background',
          'hover:bg-accent',
          'hover:text-accent-foreground',
        ],

        destructive: ['bg-destructive', 'text-white', 'hover:bg-destructive/90'],

        ghost: ['hover:bg-accent', 'hover:text-accent-foreground'],

        link: ['underline-offset-4', 'hover:underline', 'text-primary'],
      },

      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },

      fullWidth: {
        true: 'w-full',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className
      )
}
{
  ...props
}
;/>
)
}
