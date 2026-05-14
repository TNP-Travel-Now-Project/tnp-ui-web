import { cn } from '@/shared/lib/utils/cn'

/**
 * FormMessage Component
 * Displays form-level validation or error messages
 *
 * Features:
 * - Conditional rendering (null if empty)
 * - Error styling for form validation feedback
 * - Design-system consistent styling
 *
 * @example
 * <FormMessage>Email already exists</FormMessage>
 */

export interface FormMessageProps {
  children?: React.ReactNode
  className?: string
}

export function FormMessage({ children, className }: FormMessageProps) {
  if (!children) return null

  return (
    <div className={cn('rounded-md bg-red-50 p-3 text-sm text-red-700', className)}>{children}</div>
  )
}

FormMessage.displayName = 'FormMessage'
