import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/src/shared/lib/utils/cn'
import { type InputVariantProps, inputVariants } from '@/src/shared/lib/variants/base.variants'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariantProps {
  // ← Variant props (state, size)
  errorMessage?: string // ← Message lỗi (tự show/hide)
}

/**
 * Input Component
 * Controlled input with variant system + built-in error display
 * Supports React Hook Form integration via forwardRef
 *
 * Features:
 * - Design system variants (state, size)
 * - Automatic error state handling
 * - Built-in error message display
 * - Fully ref-compatible for form libraries (RHF, Formik)
 *
 * @example
 * <Input
 *   id="email"
 *   placeholder="Enter email"
 *   errorMessage={errors.email?.message}
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state = 'default', size = 'md', errorMessage, ...props }, ref) => {
    // 🔹 Logic: Nếu có error → state = 'error'
    const inputState = errorMessage ? 'error' : state

    return (
      <div className='w-full'>
        {/* Input field */}
        <input
          ref={ref}
          className={cn(inputVariants({ state: inputState, size }), className)}
          {...props}
        />

        {/* Error message (tự ẩn/hiện) */}
        {errorMessage && <p className='mt-1.5 text-xs text-red-500'>{errorMessage}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
