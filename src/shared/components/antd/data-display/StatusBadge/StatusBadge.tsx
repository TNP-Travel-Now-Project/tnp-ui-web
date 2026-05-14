'use client'

import { cn } from '@/shared/lib/utils/cn'
import styles from './StatusBadge.module.scss'

export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

export interface StatusBadgeProps {
  label: string
  variant?: StatusVariant
  className?: string
}

export default function StatusBadge({ label, variant = 'neutral', className }: StatusBadgeProps) {
  return <span className={cn(styles.badge, styles[variant], className)}>{label}</span>
}
