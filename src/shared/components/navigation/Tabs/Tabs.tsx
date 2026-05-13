'use client'

import { Tabs as AntTabs, type TabsProps as AntTabsProps } from 'antd'
import type React from 'react'
import { useState } from 'react'
import styles from './Tabs.module.scss'

export interface TabItem {
  key: string
  label: string
  children?: React.ReactNode
  content?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  closable?: boolean
}

export interface TabsProps extends Omit<AntTabsProps, 'items'> {
  items: TabItem[]
  variant?: 'default' | 'card' | 'line'
  size?: 'small' | 'middle' | 'large'
  centered?: boolean
  animated?: boolean
  onTabChange?: (activeKey: string) => void
  onTabEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void
  className?: string
  style?: React.CSSProperties
}

const Tabs: React.FC<TabsProps> = ({
  items,
  variant = 'default',
  size = 'middle',
  centered = false,
  animated = true,
  onTabChange,
  onTabEdit,
  className,
  style,
  ...restProps
}) => {
  const [activeKey, setActiveKey] = useState(items[0]?.key || '')

  const handleTabChange = (key: string) => {
    setActiveKey(key)
    onTabChange?.(key)
  }

  const getTabType = () => {
    switch (variant) {
      case 'card':
        return 'card'
      case 'line':
        return 'line'
      default:
        return undefined
    }
  }

  const getTabSize = () => {
    switch (size) {
      case 'small':
        return 'small'
      case 'large':
        return 'large'
      default:
        return 'middle'
    }
  }

  const tabItems = items.map((item) => ({
    key: item.key,
    label: (
      <span className={styles.tabLabel}>
        {item.icon && <span className={styles.tabIcon}>{item.icon}</span>}
        {item.label}
      </span>
    ),
    children: item.children || item.content,
    disabled: item.disabled,
    closable: item.closable,
  }))

  return (
    <div className={`${styles.tabsContainer} ${className || ''}`} style={style}>
      <AntTabs
        activeKey={activeKey}
        onChange={handleTabChange}
        onEdit={onTabEdit}
        type={getTabType()}
        size={getTabSize()}
        centered={centered}
        animated={animated}
        items={tabItems}
        className={styles.tabs}
        {...restProps}
      />
    </div>
  )
}

export default Tabs
