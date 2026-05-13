'use client'

import { Breadcrumb } from 'antd'
import type React from 'react'

export type BreadcrumbItem = {
  label: React.ReactNode
  href?: string
  onClick?: () => void
}

export interface PageHeaderProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  breadcrumb?: { items: BreadcrumbItem[] }
  backButton?: React.ReactNode
  className?: string
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  backButton,
  className,
}: PageHeaderProps) {
  const items = breadcrumb?.items ?? []
  const hasBreadcrumb = items.length > 0
  const hasTitle = title != null || subtitle != null

  if (!hasBreadcrumb && !hasTitle) {
    return null
  }

  return (
    <div className='!mb-2'>
      {hasBreadcrumb && (
        <Breadcrumb className='mb-2 text-sm'>
          {items.map((item, i) => (
            <Breadcrumb.Item key={i} onClick={item.onClick}>
              {item.href ? <a href={item.href}>{item.label}</a> : item.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <div className='flex items-center gap-4'>
        {backButton && <span>{backButton}</span>}
        {(title != null || subtitle != null) && (
          <div>
            {title != null && <div className='text-[22px] font-semibold'>{title}</div>}
            {subtitle != null && <div className='text-gray-500 text-sm'>{subtitle}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
