'use client'
import { cn } from '@/lib/utils'
import {
  AlertAction,
  AlertDescription,
  AlertTitle,
  Alert as ShadcnAlert,
} from '@/shared/components/ui/feedback/alert'

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info'

export interface AlertProps extends Omit<React.ComponentProps<typeof ShadcnAlert>, 'variant'> {
  variant?: AlertVariant
}

const Alert = ({ variant = 'default', className, ...props }: AlertProps) => {
  const variantShadcn = variant === 'destructive' ? 'destructive' : 'default'

  return (
    <ShadcnAlert
      variant={variantShadcn}
      className={cn(
        {
          'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400':
            variant === 'success',
          'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400':
            variant === 'warning',
          'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400':
            variant === 'info',
        },
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertAction, AlertDescription, AlertTitle }

/// code template
// <Alert variant="success">
//   <AlertTitle>Thành công!</AlertTitle>
//   <AlertDescription>Đã cập nhật thông tin thành công.</AlertDescription>
// </Alert>
///
