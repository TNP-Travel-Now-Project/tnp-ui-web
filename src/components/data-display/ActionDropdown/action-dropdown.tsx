'use client'

import { MoreHorizontalIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/actions/button'

export interface ActionItem {
  /** Unique key */
  key: string
  /** Label */
  label: string
  /** Icon */
  icon?: React.ReactNode
  /** Variant */
  variant?: 'default' | 'destructive'
  /** Disabled */
  disabled?: boolean
  /** Danger */
  danger?: boolean
  /** Callback */
  onClick?: () => void
}

export interface ActionDropdownProps {
  /** List of actions */
  actions: ActionItem[]
  /** Trigger icon */
  trigger?: React.ReactNode
  /** Trigger size */
  size?: 'sm' | 'md' | 'lg'
  /** Placement */
  placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top'
  /** Class name */
  className?: string
  /** Disabled */
  disabled?: boolean
}

const ActionDropdown = ({
  actions,
  trigger,
  size = 'md',
  placement = 'bottom-end',
  className,
  disabled = false,
}: ActionDropdownProps) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    sm: 'size-7',
    md: 'size-8',
    lg: 'size-9',
  }

  const handleClick = (action: ActionItem) => {
    action.onClick?.()
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <Button
        variant='ghost'
        size='icon'
        className={cn(sizeClasses[size], 'h-auto w-auto')}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
      >
        {trigger || <MoreHorizontalIcon className='size-4' />}
      </Button>

      {open && (
        <div
          className={cn(
            'absolute z-50 mt-1 min-w-[160px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            placement === 'bottom-start' && 'left-0 origin-top-left',
            placement === 'bottom-end' && 'right-0 origin-top-right',
            placement === 'bottom' && 'left-1/2 -translate-x-1/2 origin-top',
            placement === 'top-start' && 'bottom-full left-0 origin-bottom-left',
            placement === 'top-end' && 'bottom-full right-0 origin-bottom-right',
            placement === 'top' && 'bottom-full left-1/2 -translate-x-1/2 origin-bottom',
          )}
        >
          {actions.map((action) => (
            <button
              key={action.key}
              type='button'
              onClick={() => handleClick(action)}
              disabled={action.disabled}
              className={cn(
                'relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-1.5 text-sm outline-none transition-colors',
                action.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-muted',
                action.variant === 'destructive' || action.danger
                  ? 'text-destructive hover:bg-destructive/10'
                  : '',
              )}
            >
              {action.icon && <span className='size-4'>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActionDropdown

// code template
// const actions = [
//   { key: 'view', label: 'Xem chi tiết', icon: <EyeIcon />, onClick: () => navigate('/detail') },
//   { key: 'edit', label: 'Chỉnh sửa', icon: <EditIcon />, onClick: () => navigate('/edit') },
//   { key: 'delete', label: 'Xóa', icon: <TrashIcon />, danger: true, onClick: () => handleDelete() },
// ]

// <ActionDropdown
//   actions={actions}
//   size="md"
//   placement="bottom-end"
// />
