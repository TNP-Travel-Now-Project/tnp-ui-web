'use client'
import {
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  Progress as ShadcnProgress,
  ProgressValue as ShadcnProgressValue,
} from '@/shared/components/ui/feedback/progress'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.ComponentProps<typeof ShadcnProgress> {
  label?: string
  showValue?: boolean
  color?: 'default' | 'success' | 'destructive' | 'warning'
}

const Progress = ({
  label,
  showValue = true,
  color = 'default',
  className,
  value,
  children,
  ...props
}: ProgressProps) => {
  const safeValue = value ?? 0
  return (
    <ShadcnProgress value={value} className={className} {...props}>
      {/* Cho phép truyền children tùy chỉnh */}
      {children}

      {/* Label và Value */}
      {(label || showValue) && (
        <div className='flex items-center justify-between text-sm mb-1.5'>
          {label && <ProgressLabel>{label}</ProgressLabel>}

          {showValue && value !== undefined && (
            <ShadcnProgressValue>
              {/* Render prop đúng cách */}
              {(formattedValue) => <span>{formattedValue ?? `${Math.round(safeValue)}%`}</span>}
            </ShadcnProgressValue>
          )}
        </div>
      )}

      <ProgressTrack>
        <ProgressIndicator
          className={cn({
            'bg-emerald-500': color === 'success',
            'bg-destructive': color === 'destructive',
            'bg-amber-500': color === 'warning',
          })}
        />
      </ProgressTrack>
    </ShadcnProgress>
  )
}

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ShadcnProgressValue as ProgressValue,
}

/// code template
// <Progress value={75} label="Tiến độ" color="success" showValue />
// <Progress value={null} label="Đang tải..." />   ← an toàn
///
