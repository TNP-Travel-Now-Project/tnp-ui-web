'use client'

import type * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/overlay/tooltip'

export interface TooltipProps extends React.ComponentProps<typeof ShadcnTooltip> {
  /** Delay duration in ms */
  delayDuration?: number
}

const Tooltip = ({ children, ...props }: TooltipProps) => {
  return <ShadcnTooltip {...props}>{children}</ShadcnTooltip>
}

export interface TooltipContentProps extends React.ComponentProps<typeof TooltipContent> {
  /** Side of the tooltip */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Align of the tooltip */
  align?: 'start' | 'center' | 'end'
}

const TooltipContentCustom = ({
  className,
  side = 'top',
  align = 'center',
  ...props
}: TooltipContentProps) => {
  return (
    <TooltipContent
      className={cn('bg-primary text-primary-foreground px-3 py-1.5 text-xs rounded-md', className)}
      side={side}
      align={align}
      {...props}
    />
  )
}

const TooltipTriggerCustom = TooltipTrigger

// Tooltip Provider wrapper for consistent tooltip behavior
export interface TooltipProviderProps extends React.ComponentProps<typeof TooltipProvider> {
  children: React.ReactNode
  /** Delay duration in ms */
  delayDuration?: number
  /** Disable tooltips */
  disableHoverStationaryContent?: boolean
}

const TooltipProviderWrapper = ({
  children,
  delayDuration = 300,
  disableHoverStationaryContent = false,
  ...props
}: TooltipProviderProps) => {
  return (
    <TooltipProvider
      delayDuration={delayDuration}
      disableHoverStationaryContent={disableHoverStationaryContent}
      {...props}
    >
      {children}
    </TooltipProvider>
  )
}

export {
  Tooltip,
  TooltipContentCustom as TooltipContent,
  TooltipProviderWrapper as TooltipProvider,
  TooltipTriggerCustom as TooltipTrigger,
}

// code template
// <TooltipProvider>
//   <Tooltip>
//     <TooltipTrigger asChild>
//       <Button>Hover me</Button>
//     </TooltipTrigger>
//     <TooltipContent side="top" align="center">
//       Tooltip text here
//     </TooltipContent>
//   </Tooltip>
// </TooltipProvider>
