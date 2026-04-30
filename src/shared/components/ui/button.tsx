import { cn } from '@/lib/cn'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const variantClass = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 hover:bg-gray-100',
}

const sizeClass = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {children}
    </button>
  )
}
