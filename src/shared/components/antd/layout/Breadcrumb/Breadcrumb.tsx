import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb as AntBreadcrumb } from 'antd'
import Link from 'next/link'
import type React from 'react'
import styles from './Breadcrumb.module.scss'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: string | React.ReactNode
  showHomeIcon?: boolean
  homeLabel?: string
  homeHref?: string
  className?: string
  style?: React.CSSProperties
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  showHomeIcon = true,
  homeLabel = 'Home',
  homeHref = '/',
  className,
  style,
}) => {
  const breadcrumbItems = [
    ...(showHomeIcon
      ? [
          {
            label: homeLabel,
            href: homeHref,
            icon: <HomeOutlined />,
          },
        ]
      : []),
    ...items,
  ]

  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === breadcrumbItems.length - 1

    if (item.href && !isLast) {
      return (
        <Link href={item.href} className={styles.breadcrumbLink}>
          {item.icon && <span className={styles.breadcrumbIcon}>{item.icon}</span>}
          {item.label}
        </Link>
      )
    }

    if (item.onClick) {
      return (
        <button
          type='button'
          onClick={item.onClick}
          className={styles.breadcrumbButton}
          disabled={isLast}
        >
          {item.icon && <span className={styles.breadcrumbIcon}>{item.icon}</span>}
          {item.label}
        </button>
      )
    }

    return (
      <span className={styles.breadcrumbText}>
        {item.icon && <span className={styles.breadcrumbIcon}>{item.icon}</span>}
        {item.label}
      </span>
    )
  }

  return (
    <div className={`${styles.breadcrumbContainer} ${className || ''}`} style={style}>
      <AntBreadcrumb separator={separator} className={styles.breadcrumb}>
        {breadcrumbItems.map((item, index) => (
          <AntBreadcrumb.Item key={index}>{renderBreadcrumbItem(item, index)}</AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    </div>
  )
}

export default Breadcrumb
