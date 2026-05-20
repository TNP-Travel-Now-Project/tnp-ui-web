'use client'
import { Loader2 } from 'lucide-react'
import { Input as ShadcnInput } from '@/shared/components/ui/form/input'
import { cn } from '@/lib/utils'

export interface InputProps extends React.ComponentProps<typeof ShadcnInput> {
  /** Icon bên trái input */
  leftIcon?: React.ReactNode
  /** Icon bên phải input */
  rightIcon?: React.ReactNode
  /** Hiển thị spinner loading (thay thế rightIcon khi active) */
  loading?: boolean
  /** Message lỗi hiển thị bên dưới input */
  errorMessage?: string
  /** Container wrapper className */
  containerClassName?: string
  /** Thêm class cho wrapper khi có error */
  error?: boolean
}

const Input = ({
  leftIcon,
  rightIcon,
  loading = false,
  errorMessage,
  error = false,
  containerClassName,
  className,
  disabled,
  ...props
}: InputProps) => {
  const hasRightContent = loading || rightIcon

  {
    /* <Input
        leftIcon={<Mail size={18} />}
        rightIcon={<Search size={18} />}
        loading={isLoading}
        errorMessage='Email không hợp lệ'
        placeholder='Nhập email...'
        error
      /> */
  }

  return (
    <div className={cn('relative', containerClassName)}>
      <div className='relative'>
        {leftIcon && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
            {leftIcon}
          </div>
        )}

        <ShadcnInput
          className={cn(
            leftIcon && 'pl-10',
            hasRightContent && 'pr-10',
            (error || errorMessage) && 'border-destructive focus-visible:ring-destructive',
            className,
          )}
          disabled={loading || disabled}
          {...props}
        />

        {hasRightContent && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
            {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : rightIcon}
          </div>
        )}
      </div>

      {errorMessage && <p className='mt-1.5 text-sm text-destructive'>{errorMessage}</p>}
    </div>
  )
}

Input.displayName = 'Input'

export default Input
