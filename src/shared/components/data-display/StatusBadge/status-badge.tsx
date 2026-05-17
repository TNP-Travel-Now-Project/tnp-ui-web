'use client'

import type * as React from 'react'
import { cn } from '@/lib/utils'

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default' | 'pending'

export interface StatusBadgeProps extends React.ComponentProps<'span'> {
  /** Status type */
  status: StatusType
  /** Label text */
  label?: string
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Show dot indicator */
  showDot?: boolean
  /** Custom dot color */
  dotColor?: string
}

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string; label: string }> = {
  success: {
    bg: 'bg-green-500/10',
    text: 'text-green-700 dark:text-green-400',
    dot: 'bg-green-500',
    label: 'Thành công',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-700 dark:text-yellow-400',
    dot: 'bg-yellow-500',
    label: 'Cảnh báo',
  },
  error: {
    bg: 'bg-red-500/10',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
    label: 'Lỗi',
  },
  info: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
    label: 'Thông tin',
  },
  pending: {
    bg: 'bg-gray-500/10',
    text: 'text-gray-700 dark:text-gray-400',
    dot: 'bg-gray-500',
    label: 'Đang chờ',
  },
  default: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    dot: 'bg-gray-500',
    label: 'Mặc định',
  },
}

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-0.5',
  lg: 'text-base px-2.5 py-1',
}

const dotSizeClasses = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2.5',
}

const StatusBadge = ({
  status,
  label,
  size = 'md',
  showDot = true,
  dotColor,
  className,
  ...props
}: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.default
  const displayLabel = label || config.label

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bg,
        config.text,
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {showDot && (
        <span className={cn('rounded-full', dotSizeClasses[size], dotColor || config.dot)} />
      )}
      {displayLabel}
    </span>
  )
}

export default StatusBadge

// code template
// <StatusBadge status="success" label="Hoạt động" />
// <StatusBadge status="warning" />
// <StatusBadge status="error" size="sm" showDot={false} />
