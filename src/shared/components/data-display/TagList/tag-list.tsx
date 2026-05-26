'use client'

import { XIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

export interface TagItem {
  /** Unique key */
  key: string
  /** Label */
  label: string
  /** Color */
  color?: string
}

export interface TagListProps {
  /** List of tags */
  items: TagItem[]
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Show remove button */
  removable?: boolean
  /** On remove handler */
  onRemove?: (key: string) => void
  /** On tag click */
  onClick?: (key: string) => void
  /** Class name */
  className?: string
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3 py-1.5 gap-2',
}

const iconSizeClasses = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
}

const TagList = ({
  items,
  size = 'md',
  removable = false,
  onRemove,
  onClick,
  className,
}: TagListProps) => {
  const handleRemove = (e: React.MouseEvent, key: string) => {
    e.stopPropagation()
    onRemove?.(key)
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {items.map((item) => (
        <span
          key={item.key}
          className={cn(
            'inline-flex items-center rounded-full bg-muted font-medium',
            sizeClasses[size],
            onClick && 'cursor-pointer hover:bg-muted/80',
          )}
          onClick={() => onClick?.(item.key)}
          style={item.color ? { backgroundColor: `${item.color}20`, color: item.color } : undefined}
        >
          {item.label}
          {removable && (
            <button
              type='button'
              onClick={(e) => handleRemove(e, item.key)}
              className='ml-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10'
            >
              <XIcon className={iconSizeClasses[size]} />
              <span className='sr-only'>Remove</span>
            </button>
          )}
        </span>
      ))}
    </div>
  )
}

export default TagList

// code template
// const tags = [
//   { key: '1', label: 'React', color: '#61dafb' },
//   { key: '2', label: 'TypeScript', color: '#3178c6' },
//   { key: '3', label: 'Next.js', color: '#000000' },
// ]

// <TagList
//   items={tags}
//   size="md"
//   removable
//   onRemove={(key) => handleRemove(key)}
// />
