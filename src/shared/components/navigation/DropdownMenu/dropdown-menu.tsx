'use client'

import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import type * as React from 'react'
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuItem as ShadcnDropdownMenuItem,
} from '@/shared/components/ui/navigation/dropdown-menu'
import { cn } from '@/lib/utils'

export interface DropdownMenuItemProps {
  /** Nội dung hiển thị */
  label: React.ReactNode

  /** Giá trị unique */
  key?: string

  /** Icon */
  icon?: React.ReactNode

  /** Keyboard shortcut */
  shortcut?: React.ReactNode

  /** Disable item */
  disabled?: boolean

  /** Style destructive */
  destructive?: boolean

  /** Inset */
  inset?: boolean

  /** Click event */
  onClick?: () => void

  /** Sub menu */
  children?: DropdownMenuItemProps[]

  /** Checkbox */
  checked?: boolean

  /** Radio value */
  value?: string

  /** Type item */
  type?: 'default' | 'separator' | 'label' | 'checkbox' | 'radio'
}

export interface DropdownMenuProps extends React.ComponentProps<typeof ShadcnDropdownMenu> {
  /** Trigger component */
  trigger: React.ReactNode

  /** Danh sách items */
  items?: DropdownMenuItemProps[]

  /** Custom render */
  children?: React.ReactNode

  /** Align content */
  align?: 'start' | 'center' | 'end'

  /** Side */
  side?: 'top' | 'right' | 'bottom' | 'left'

  /** Offset */
  sideOffset?: number

  /** Content class */
  contentClassName?: string
}

const DropdownMenu = ({
  trigger,
  items = [],
  children,
  align = 'start',
  side = 'bottom',
  sideOffset = 4,
  contentClassName,
  ...props
}: DropdownMenuProps) => {
  const renderItem = (item: DropdownMenuItemProps) => {
    // separator
    if (item.type === 'separator') {
      return <DropdownMenuSeparator key={item.key} />
    }

    // label
    if (item.type === 'label') {
      return <DropdownMenuLabel key={item.key}>{item.label}</DropdownMenuLabel>
    }

    // submenu
    if (item.children?.length) {
      return (
        <DropdownMenuSub key={item.key}>
          <DropdownMenuSubTrigger inset={item.inset}>
            {item.icon}
            {item.label}
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent>{item.children.map(renderItem)}</DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    }

    // checkbox
    if (item.type === 'checkbox') {
      return (
        <DropdownMenuCheckboxItem
          key={item.key}
          checked={item.checked}
          disabled={item.disabled}
          inset={item.inset}
          onClick={item.onClick}
        >
          {item.icon}
          {item.label}
        </DropdownMenuCheckboxItem>
      )
    }

    // radio
    if (item.type === 'radio') {
      return (
        <DropdownMenuRadioItem
          key={item.key}
          value={item.value ?? ''}
          disabled={item.disabled}
          inset={item.inset}
          onClick={item.onClick}
        >
          {item.icon}
          {item.label}
        </DropdownMenuRadioItem>
      )
    }

    // default
    return (
      <ShadcnDropdownMenuItem
        key={item.key}
        disabled={item.disabled}
        inset={item.inset}
        variant={item.destructive ? 'destructive' : 'default'}
        onClick={item.onClick}
      >
        {item.icon}

        <span className='flex-1'>{item.label}</span>

        {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
      </ShadcnDropdownMenuItem>
    )
  }

  return (
    <ShadcnDropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{trigger as React.ReactElement}</DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(contentClassName)}
      >
        {children ?? items.map(renderItem)}
      </DropdownMenuContent>
    </ShadcnDropdownMenu>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu

// ======================================
// Code template
// ======================================

// const navigationItems: DropdownMenuItemProps[] = [
//     {
//       key: 'profile',
//       label: 'Profile',
//       icon: <User className='size-4' />,
//     },
//     {
//       key: 'settings',
//       label: 'Settings',
//       icon: <Settings className='size-4' />,
//       shortcut: '⌘S',
//     },
//     {
//       type: 'separator',
//       key: 'separator-1',
//     },
//     {
//       key: 'danger',
//       label: 'Delete',
//       destructive: true,
//       icon: <Trash className='size-4' />,
//     },
//     {
//       key: 'submenu',
//       label: 'More',
//       children: [
//         {
//           key: 'child-1',
//           label: 'Sub item',
//         },
//       ],
//     },
//   ]

// <DropdownMenu
//   trigger={
//     <Button variant='outline'>
//       Open menu
//     </Button>
//   }
//   items={DropdownMenuItemProps}
// />
