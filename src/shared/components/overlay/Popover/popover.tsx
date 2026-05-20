'use client'
import { Slot } from '@radix-ui/react-slot'
import type * as React from 'react'
import {
  PopoverContent,
  PopoverTrigger,
  Popover as ShadcnPopover,
} from '@/shared/components/ui/overlay/popover'
import { cn } from '@/lib/utils'

export interface PopoverProps extends React.ComponentProps<typeof ShadcnPopover> {
  /** Align popover */
  align?: 'start' | 'center' | 'end'
  /** Offset from trigger */
  sideOffset?: number
}

const Popover = ({ children, ...props }: PopoverProps) => {
  return <ShadcnPopover {...props}>{children}</ShadcnPopover>
}

export interface PopoverContentProps extends React.ComponentProps<typeof PopoverContent> {
  /** Kích thước width */
  width?: 'auto' | 'sm' | 'md' | 'lg'
  /** Padding inside content */
  padding?: boolean
}

const PopoverContentCustom = ({
  children,
  className,
  width = 'auto',
  padding = true,
  ...props
}: PopoverContentProps) => {
  const widthClasses = {
    auto: 'auto',
    sm: 'sm:max-w-[200px]',
    md: 'sm:max-w-[300px]',
    lg: 'sm:max-w-[400px]',
  }

  return (
    <PopoverContent className={cn(widthClasses[width], !padding && 'p-0', className)} {...props}>
      {children}
    </PopoverContent>
  )
}

export interface PopoverTriggerProps extends React.ComponentProps<'button'> {
  /** Convert to asChild pattern */
  asChild?: boolean
}

const PopoverTriggerCustom = ({ asChild = false, children, ...props }: PopoverTriggerProps) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <PopoverTrigger asChild={asChild}>
      <Comp {...props}>{children}</Comp>
    </PopoverTrigger>
  )
}

export { Popover, PopoverContentCustom as PopoverContent, PopoverTriggerCustom as PopoverTrigger }

// code template
// <Popover>
//   <PopoverTrigger asChild>
//     <Button>Nhấn vào đây</Button>
//   </PopoverTrigger>
//   <PopoverContent width="md" align="start">
//     <div>Nội dung popover</div>
//   </PopoverContent>
// </Popover>
