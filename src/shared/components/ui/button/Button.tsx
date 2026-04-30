import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import {
  type ButtonVariantProps,
  buttonVariants,
} from '@/src/shared/components/ui/button/button.variants'
import { cn } from '@/src/shared/lib/utils/cn'

// 1️⃣ INTERFACES - Định nghĩa props
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, // ← Kế thừa props HTML (onClick, disabled...)
    ButtonVariantProps {
  // ← Kế thừa variant props (variant, size...)
  isLoading?: boolean // Đang loading?
  loadingText?: ReactNode // Text hiển thị khi loading
  children: ReactNode // Nội dung button
}

/**
 * Button Component
 * Design system button with variant + loading support
 * Fully accessible and ref-forward compatible
 *
 * Features:
 * - Variant system (variant, size, fullWidth)
 * - Loading state with disabled protection
 * - Supports loading text fallback
 * - Fully ref-compatible (forwardRef)
 *
 * @example
 * <Button variant="primary" isLoading>
 *   Submit
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    const content = isLoading ? (loadingText ?? children) : children

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, isLoading }), className)}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'
