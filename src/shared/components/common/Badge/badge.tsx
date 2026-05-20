'use client'
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '@/shared/components/ui/layout/badge'
import { cn } from '@/lib/utils'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  badgeType?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
  icon?: React.ReactNode
}

const Badge = ({ badgeType = 'default', icon, className, children, ...props }: BadgeProps) => {
  const variantMap: Record<
    NonNullable<BadgeProps['badgeType']>,
    VariantProps<typeof badgeVariants>['variant']
  > = {
    default: 'default',
    secondary: 'secondary',
    destructive: 'destructive',
    outline: 'outline',
    success: 'default',
    warning: 'default',
    info: 'default',
  }

  return (
    <div
      className={cn(
        badgeVariants({ variant: variantMap[badgeType] }),
        {
          'bg-emerald-500 text-white hover:bg-emerald-500': badgeType === 'success',
          'bg-amber-500 text-white hover:bg-amber-500': badgeType === 'warning',
          'bg-blue-500 text-white hover:bg-blue-500': badgeType === 'info',
        },
        className,
      )}
      {...props}
    >
      {icon && <span className='mr-1'>{icon}</span>}
      {children}
    </div>
  )
}

export default Badge

/// code template
// <Badge badgeType="success" icon={<Check size={14} />}>
//   Đã xác nhận
// </Badge>
///
