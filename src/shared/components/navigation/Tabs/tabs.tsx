'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type tabsListVariants,
} from '@/shared/components/ui/navigation/tabs'
import { cn } from '@/lib/utils'

export interface TabItem {
  /** Giá trị của tab */
  value: string
  /** Nội dung hiển thị trong tab trigger */
  label: string
  /** Icon hiển thị cạnh label */
  icon?: React.ReactNode
  /** Icon position (mặc định: left) */
  iconPosition?: 'left' | 'right'
  /** Ẩn tab */
  disabled?: boolean
  /** Nội dung của tab panel */
  content?: React.ReactNode
}

export interface TabsProps
  extends Omit<React.ComponentProps<typeof ShadcnTabs>, 'children' | 'onValueChange'>,
    VariantProps<typeof tabsListVariants> {
  /** Danh sách các tab items */
  items: TabItem[]
  /** Giá trị tab được chọn mặc định */
  defaultValue?: string
  /** Giá trị tab được chọn (controlled) */
  value?: string
  /** Callback khi thay đổi tab */
  onValueChange?: (value: string) => void
  /** Cho phép click lại vào tab đang active để reset */
  allowReset?: boolean
  /** Hiển thị icon inline với text */
  variant?: 'default' | 'line'
  /** Canh chỉnh tabs list */
  tabsAlign?: 'start' | 'center' | 'end'
  /** Full width tabs */
  fullWidth?: boolean
  /** Custom class cho tabs list */
  listClassName?: string
}

const tabsAlignVariants = cva('', {
  variants: {
    tabsAlign: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    tabsAlign: 'start',
  },
})

const Tabs = ({
  items,
  defaultValue,
  value,
  onValueChange,
  allowReset = false,
  variant = 'default',
  tabsAlign = 'start',
  fullWidth = false,
  listClassName,
  className,
  ...props
}: TabsProps) => {
  const handleValueChange = (newValue: string) => {
    // Allow reset if clicking on active tab
    if (allowReset && newValue === value) {
      return
    }
    onValueChange?.(newValue)
  }

  return (
    <ShadcnTabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
      className={cn(className)}
      {...props}
    >
      <TabsList
        variant={variant}
        className={cn(
          tabsAlignVariants({ tabsAlign }),
          fullWidth && 'w-full',
          fullWidth && '[&>[data-slot="tabs-trigger"]]:flex-1',
          listClassName,
        )}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            data-icon={item.icon ? item.iconPosition || 'left' : undefined}
          >
            {item.icon && item.iconPosition !== 'right' && (
              <span className='mr-1.5'>{item.icon}</span>
            )}
            {item.label}
            {item.icon && item.iconPosition === 'right' && (
              <span className='ml-1.5'>{item.icon}</span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </ShadcnTabs>
  )
}

Tabs.displayName = 'Tabs'

export default Tabs

/// code template
// const tabsItems = [
//   {
//     value: 'overview',
//     label: 'Tổng quan',
//     icon: <LayoutDashboard className="size-4" />,
//     content: <div>Nội dung tab Tổng quan</div>,
//   },
//   {
//     value: 'settings',
//     label: 'Cài đặt',
//     icon: <Settings className="size-4" />,
//     content: <div>Nội dung tab Cài đặt</div>,
//   },
// ]

// <Tabs
//   items={tabsItems}
//   defaultValue="overview"
//   variant="default"
//   tabsAlign="start"
// />
