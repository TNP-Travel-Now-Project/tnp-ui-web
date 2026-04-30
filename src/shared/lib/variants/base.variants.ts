import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Button Variants
 */
export const buttonVariants = cva(
  // Base styles (always applied)
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
        outline:
          'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
      },
      size: {
        xs: 'px-2.5 py-1.5 text-xs h-8',
        sm: 'px-3 py-2 text-sm h-10',
        md: 'px-4 py-2.5 text-base h-11',
        lg: 'px-6 py-3 text-lg h-12',
        xl: 'px-8 py-3.5 text-lg h-14',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      isLoading: {
        true: 'opacity-70 cursor-wait',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      isLoading: false,
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

/**
 * Input Variants
 */
export const inputVariants = cva(
  // Base styles
  [
    'flex w-full rounded-md border-2 px-4 py-2.5',
    'bg-white text-gray-900 placeholder-gray-400',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
  ],
  {
    variants: {
      state: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
      },
      size: {
        sm: 'text-sm h-9 px-3',
        md: 'text-base h-11 px-4',
        lg: 'text-lg h-12 px-4',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  },
)

export type InputVariantProps = VariantProps<typeof inputVariants>

/**
 * Label Variants
 */
export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-red-500",
        false: '',
      },
    },
    defaultVariants: {
      required: false,
    },
  },
)

export type LabelVariantProps = VariantProps<typeof labelVariants>
