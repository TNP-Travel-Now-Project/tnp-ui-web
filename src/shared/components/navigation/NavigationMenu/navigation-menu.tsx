'use client'

import Link from 'next/link'
import type * as React from 'react'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenu as ShadcnNavigationMenu,
} from '@/shared/components/ui/navigation/navigation-menu'
import { cn } from '@/lib/utils'

export interface NavigationMenuChildItemProps {
  /** Label hiển thị */
  label: React.ReactNode

  /** URL */
  href?: string

  /** Mô tả */
  description?: React.ReactNode

  /** Icon */
  icon?: React.ReactNode

  /** Disable */
  disabled?: boolean

  /** Active */
  active?: boolean
}

export interface NavigationMenuItemProps {
  /** Label menu */
  label: React.ReactNode

  /** URL */
  href?: string

  /** Active state */
  active?: boolean

  /** Disable */
  disabled?: boolean

  /** Child menu */
  children?: NavigationMenuChildItemProps[]
}

export interface NavigationMenuProps extends React.ComponentProps<typeof ShadcnNavigationMenu> {
  /** Danh sách menu */
  items: NavigationMenuItemProps[]

  /** Align dropdown */
  align?: 'start' | 'center' | 'end'

  /** ClassName */
  className?: string

  /** List className */
  listClassName?: string

  /** Content className */
  contentClassName?: string
}

const NavigationMenu = ({
  items,
  align = 'start',
  className,
  listClassName,
  contentClassName,
  ...props
}: NavigationMenuProps) => {
  const renderChildItem = (item: NavigationMenuChildItemProps, index: number) => {
    const content = (
      <>
        {item.icon}

        <div className='flex flex-col gap-1'>
          <span className='font-medium'>{item.label}</span>

          {item.description && (
            <span className='line-clamp-2 text-xs text-muted-foreground'>{item.description}</span>
          )}
        </div>
      </>
    )

    return (
      <li key={`${item.label}-${index}`}>
        <NavigationMenuLink
          active={item.active}
          render={item.href && !item.disabled ? <Link href={item.href} /> : undefined}
          className={cn(item.disabled && 'pointer-events-none opacity-50')}
        >
          {content}
        </NavigationMenuLink>
      </li>
    )
  }

  const renderItem = (item: NavigationMenuItemProps, index: number) => {
    // Dropdown menu
    if (item.children?.length) {
      return (
        <NavigationMenuItem key={`${item.label}-${index}`}>
          <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>

          <NavigationMenuContent className={cn(contentClassName)}>
            <ul className='grid min-w-[280px] gap-1'>{item.children.map(renderChildItem)}</ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    }

    // Single link
    return (
      <NavigationMenuItem key={`${item.label}-${index}`}>
        <NavigationMenuLink
          active={item.active}
          render={item.href && !item.disabled ? <Link href={item.href} /> : undefined}
          className={cn(item.disabled && 'pointer-events-none opacity-50')}
        >
          {item.label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <ShadcnNavigationMenu align={align} className={cn(className)} {...props}>
      <NavigationMenuList className={cn(listClassName)}>{items.map(renderItem)}</NavigationMenuList>
    </ShadcnNavigationMenu>
  )
}

NavigationMenu.displayName = 'NavigationMenu'

export default NavigationMenu

// ==========================================
// Code template
// ==========================================

// const navigationItems: NavigationMenuItemProps[] = [
//   {
//     label: 'Home',
//     href: '/',
//   },
//   {
//     label: 'Products',
//     children: [
//       {
//         label: 'Laptop',
//         description:
//           'Danh sách laptop',
//         href: '/products/laptop',
//       },
//       {
//         label: 'Phone',
//         description:
//           'Danh sách điện thoại',
//         href: '/products/phone',
//       },
//     ],
//   },
//   {
//     label: 'About',
//     href: '/about',
//   },
// ]

// <NavigationMenu
//   items={navigationItems}
// />
