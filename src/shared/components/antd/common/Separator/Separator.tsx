import { cn } from '@/shared/lib/utils/cn'

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export default function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
    />
  )
}
