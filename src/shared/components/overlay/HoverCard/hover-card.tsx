'use client'

import type * as React from 'react'
import {
  HoverCardContent,
  HoverCardTrigger,
  HoverCard as ShadcnHoverCard,
} from '@/shared/components/ui/overlay/hover-card'
import { cn } from '@/lib/utils'

export interface HoverCardProps extends React.ComponentProps<typeof ShadcnHoverCard> {
  /** Delay duration in ms */
  openDelay?: number
  /** Close delay in ms */
  closeDelay?: number
}

const HoverCard = ({ children, ...props }: HoverCardProps) => {
  return <ShadcnHoverCard {...props}>{children}</ShadcnHoverCard>
}

export interface HoverCardContentProps extends React.ComponentProps<typeof HoverCardContent> {
  /** Align of content */
  align?: 'start' | 'center' | 'end'
  /** Side of the content */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Side offset */
  sideOffset?: number
}

const HoverCardContentCustom = ({
  className,
  align = 'center',
  side = 'top',
  sideOffset = 4,
  ...props
}: HoverCardContentProps) => {
  return (
    <HoverCardContent
      className={cn(
        'w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        className,
      )}
      align={align}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

const HoverCardTriggerCustom = HoverCardTrigger

export {
  HoverCard,
  HoverCardContentCustom as HoverCardContent,
  HoverCardTriggerCustom as HoverCardTrigger,
}

// code template
// <HoverCard openDelay={200} closeDelay={100}>
//   <HoverCardTrigger asChild>
//     <Button>Hover me</Button>
//   </HoverCardTrigger>
//   <HoverCardContent align="start" side="top">
//     <div className="space-y-2">
//       <h4 className="font-semibold">Title</h4>
//       <p className="text-sm text-muted-foreground">Description here</p>
//     </div>
//   </HoverCardContent>
// </HoverCard>
