'use client'

import { XIcon } from 'lucide-react'
import type * as React from 'react'
import {
  Sheet as ShadcnSheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/overlay/sheet'
import { cn } from '@/lib/utils'

export interface SheetProps extends React.ComponentProps<typeof ShadcnSheet> {
  /** Modal mode */
  modal?: boolean
}

const Sheet = ({ children, ...props }: SheetProps) => {
  return <ShadcnSheet {...props}>{children}</ShadcnSheet>
}

export interface SheetContentProps extends React.ComponentProps<typeof SheetContent> {
  /** Size of sheet */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Show close button */
  showCloseButton?: boolean
}

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  full: 'sm:max-w-full',
}

const SheetContentCustom = ({
  children,
  className,
  size = 'md',
  showCloseButton = true,
  side = 'right',
  ...props
}: SheetContentProps) => {
  return (
    <SheetContent className={cn(sizeClasses[size], className)} side={side} {...props}>
      {showCloseButton && (
        <button
          type='button'
          className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'
        >
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </button>
      )}
      {children}
    </SheetContent>
  )
}

export interface SheetHeaderProps extends React.ComponentProps<typeof SheetHeader> {
  /** Show divider below header */
  showDivider?: boolean
}

const SheetHeaderCustom = ({ className, showDivider = false, ...props }: SheetHeaderProps) => {
  return (
    <SheetHeader
      className={cn('flex flex-col gap-1.5 text-left', showDivider && 'pb-4 border-b', className)}
      {...props}
    />
  )
}

const SheetTitleCustom = ({ className, ...props }: React.ComponentProps<typeof SheetTitle>) => {
  return <SheetTitle className={cn('text-lg font-semibold', className)} {...props} />
}

const SheetDescriptionCustom = ({
  className,
  ...props
}: React.ComponentProps<typeof SheetDescription>) => {
  return <SheetDescription className={cn('text-sm text-muted-foreground', className)} {...props} />
}

const SheetFooterCustom = ({ className, ...props }: React.ComponentProps<typeof SheetFooter>) => {
  return (
    <SheetFooter
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto pt-4 border-t',
        className,
      )}
      {...props}
    />
  )
}

const SheetTriggerCustom = SheetTrigger

export {
  Sheet,
  SheetContentCustom as SheetContent,
  SheetDescriptionCustom as SheetDescription,
  SheetFooterCustom as SheetFooter,
  SheetHeaderCustom as SheetHeader,
  SheetTitleCustom as SheetTitle,
  SheetTriggerCustom as SheetTrigger,
}

// code template
// const [sheetOpen, setSheetOpen] = useState(false)

// <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//   <SheetTrigger asChild>
//     <Button>Mở Sheet</Button>
//   </SheetTrigger>
//   <SheetContent size="md">
//     <SheetHeader showDivider>
//       <SheetTitle>Tiêu đề</SheetTitle>
//       <SheetDescription>Mô tả</SheetDescription>
//     </SheetHeader>
//     <div className="py-4">Nội dung</div>
//     <SheetFooter>
//       <Button variant="outline" onClick={() => setSheetOpen(false)}>Hủy</Button>
//       <Button>Lưu</Button>
//     </SheetFooter>
//   </SheetContent>
// </Sheet>
