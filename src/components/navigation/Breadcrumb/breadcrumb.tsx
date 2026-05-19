'use client'

import { ChevronRightIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import type * as React from 'react'
import { cn } from '@/lib/utils'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as ShadcnBreadcrumb,
} from '@/components/ui/navigation/breadcrumb'

export interface BreadcrumbItemProps {
  label: string
  href?: string
  isActive?: boolean
}

export interface BreadcrumbProps extends React.ComponentProps<typeof ShadcnBreadcrumb> {
  /** Danh sách các breadcrumb items */
  items: BreadcrumbItemProps[]
  /** Hiển thị icon home ở đầu */
  showHome?: boolean
  /** Label cho home (mặc định: "Trang chủ") */
  homeLabel?: string
  /** URL cho home (mặc định: "/") */
  homeHref?: string
  /** Icon cho home (mặc định: HomeIcon) */
  homeIcon?: React.ReactNode
  /** Custom separator (mặc định: ChevronRightIcon) */
  separator?: React.ReactNode
}

const Breadcrumb = ({
  items,
  showHome = false,
  homeLabel = 'Trang chủ',
  homeHref = '/',
  homeIcon,
  separator,
  className,
  ...props
}: BreadcrumbProps) => {
  const renderSeparator = separator ?? <ChevronRightIcon className='size-3.5' />
  const renderHomeIcon = homeIcon ?? <HomeIcon className='size-4' />

  // Flatten items with separators
  const renderItems = () => {
    const elements: React.ReactNode[] = []

    // Add home item
    if (showHome) {
      elements.push(
        <BreadcrumbItem key='home'>
          <BreadcrumbLink render={<Link href={homeHref} className='flex items-center gap-1.5' />}>
            {renderHomeIcon}
            <span className='hidden sm:inline'>{homeLabel}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>,
      )
      if (items.length > 0) {
        elements.push(<BreadcrumbSeparator key='home-sep'>{renderSeparator}</BreadcrumbSeparator>)
      }
    }

    // Add other items
    items.forEach((item, index) => {
      elements.push(
        <BreadcrumbItem key={`item-${item.href ?? item.label}`}>
          {item.isActive ? (
            <BreadcrumbPage>{item.label}</BreadcrumbPage>
          ) : item.href ? (
            <BreadcrumbLink render={<Link href={item.href}>{item.label}</Link>} />
          ) : (
            <BreadcrumbPage>{item.label}</BreadcrumbPage>
          )}
        </BreadcrumbItem>,
      )
      // Add separator between items (but not after last item)
      if (index < items.length - 1) {
        elements.push(
          <BreadcrumbSeparator key={`sep-${item.href ?? item.label}`}>
            {renderSeparator}
          </BreadcrumbSeparator>,
        )
      }
    })

    return elements
  }

  return (
    <ShadcnBreadcrumb className={cn(className)} {...props}>
      <BreadcrumbList>{renderItems()}</BreadcrumbList>
    </ShadcnBreadcrumb>
  )
}

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb

// code template
// const breadcrumbItems: BreadcrumbItemProps[] = [
//   { label: 'Dashboard', href: '/' },
//   { label: 'Products', href: '/products' },
//   { label: 'Chi tiết', isActive: true },
// ]

// <Breadcrumb
//   items={breadcrumbItems}
//   showHome
//   homeLabel="Trang chủ"
// />
