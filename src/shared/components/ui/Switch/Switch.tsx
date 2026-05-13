'use client'

import { Switch as AntSwitch } from 'antd'
import { cn } from '@/shared/lib/utils/cn'
import styles from './Switch.module.scss'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: 'small' | 'medium' | 'large'
  label?: string
  color?: 'teal' | 'green' | 'blue' | 'red'
  disabled?: boolean
  className?: string
}

export default function Switch({
  checked,
  onChange,
  size = 'medium',
  label,
  color = 'teal',
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <div
      className={cn(
        styles.switchWrapper,
        styles[size],
        styles[color],
        disabled && styles.disabled,
        className,
      )}
    >
      <AntSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.switch}
      />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
