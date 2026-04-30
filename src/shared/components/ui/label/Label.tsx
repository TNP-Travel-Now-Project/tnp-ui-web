import { forwardRef, type LabelHTMLAttributes } from 'react'
import { cn } from '@/src/shared/lib/utils/cn'
import { type LabelVariantProps, labelVariants } from '@/src/shared/lib/variants/base.variants'

interface LabelProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>,
    LabelVariantProps {
  required?: boolean
  htmlFor: string
}

/**
 * Label Component
 * Accessible form label with required indicator support
 * Automatically binds to input via htmlFor
 *
 * Features:
 * - Accessibility-first (htmlFor binding)
 * - Required indicator (*)
 * - Variant styling support
 * - Fully ref-compatible (forwardRef)
 *
 * @example
 * <Label htmlFor="email" required>
 *   Email Address
 * </Label>
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required = false, htmlFor, children, ...props }, ref) => (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(labelVariants({ required }), className)}
      {...props}
    >
      <span>{children}</span>

      {required && (
        <span className='ml-1 text-red-500' aria-hidden='true'>
          *
        </span>
      )}
    </label>
  ),
)

Label.displayName = 'Label'
