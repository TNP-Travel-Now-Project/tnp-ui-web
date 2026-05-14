'use client'

import type { MenuProps } from 'antd'
import { Avatar, Button, Menu } from 'antd'
import {
  ChevronRight,
  ClipboardList,
  DatabaseIcon,
  Mail,
  Newspaper,
  UserCog,
  UserSearch,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { Chart, Fulfillment, Help, Logout, Order, Setting } from '@/components/Icons/index'
import styles from '@/features/admin/page.module.scss'
import { useGetAvatarQuery } from '@/store/features/userProfile/userProfileApi'

type MenuItem = Required<MenuProps>['items'][number]

export interface SidebarProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const USER = {
  name: 'Lan Anh Tran',
  role: 'Bác sĩ tâm lý',
} as const

const MAIN_ITEMS: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <Chart className={styles.icon} />,
    label: 'Dashboard',
  },
  {
    key: 'profile',
    icon: <Order className={styles.icon} />,
    label: 'Profile',
  },
  {
    key: 'role',
    icon: <UserCog className={styles.icon} />,
    label: 'Role Management',
  },
  {
    key: 'event',
    icon: <ClipboardList className={styles.icon} />,
    label: 'Event Management',
  },
  {
    key: 'email',
    icon: <Mail className={styles.icon} />,
    label: 'Email Management',
  },
  {
    key: 'post',
    icon: <Newspaper size={20} className={styles.icon} />,
    label: 'Post Management',
  },
  {
    key: 'wiki',
    icon: <DatabaseIcon size={20} className={styles.icon} />,
    label: 'Wiki Management',
  },
  {
    key: 'students',
    icon: <UserSearch size={20} className={styles.icon} />,
    label: 'Students Management',
  },
  {
    key: 'fulfillment',
    icon: <Fulfillment className={styles.icon} />,
    label: 'My Fulfillment',
    children: [
      { key: 'fulfillment-analytics', label: 'Phân tích chi tiết' },
      { key: 'fulfillment-reports', label: 'Báo cáo tháng' },
    ],
  },
  {
    key: 'settings',
    icon: <Setting className={styles.icon} />,
    label: 'Settings',
    children: [
      { key: 'settings-analytics', label: 'Phân tích chi tiết' },
      { key: 'settings-reports', label: 'Báo cáo tháng' },
    ],
  },
]

const BOTTOM_ITEMS: MenuItem[] = [
  { key: 'help', icon: <Help className={styles.icon} />, label: 'Help' },
  {
    key: 'logout',
    icon: <Logout className={styles.icon} />,
    label: 'Logout Account',
  },
]

const pathToKey: Record<string, string> = {
  '/profile': 'Profile',
  '/role-management': 'Role Management',
  '/event-management': 'Event Management',
  '/email-management': 'Email Management',
  '/dashboard': 'dashboard',
  '/dashboard/chart/analytics': 'fulfillment-analytics',
  '/dashboard/chart/reports': 'fulfillment-reports',
  '/dashboard/folder': 'my-orders',
  '/dashboard/calendar': 'schedules',
  '/dashboard/profile': 'fulfillment',
  '/dashboard/settings': 'settings',
  '/dashboard/help': 'help',
}

const keyToPath: Record<string, string> = {
  dashboard: '/dashboard',
  profile: '/profile',
  role: '/role-management',
  event: '/event-management',
  email: '/email-management',
  schedules: '/dashboard/calendar',
  'fulfillment-analytics': '/dashboard/chart/analytics',
  'fulfillment-reports': '/dashboard/chart/reports',
  fulfillment: '/dashboard/profile',
  post: '/post-management',
  wiki: '/wiki-management',
  students: '/students-management',
  settings: '/dashboard/settings',
  'settings-analytics': '/dashboard/chart/analytics',
  'settings-reports': '/dashboard/chart/reports',
  help: '/dashboard/help',
  logout: '/auth/sign-in',
}

const getSelectedKey = (pathname: string) => {
  for (const [prefix, key] of Object.entries(pathToKey)) {
    if (pathname.startsWith(prefix)) return key
  }
  return ''
}

const getParentKeys = (key: string): string[] => {
  if (key.includes('fulfillment')) return ['fulfillment']
  if (key.includes('settings')) return ['settings']
  return []
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: avatarUrl } = useGetAvatarQuery()

  const [avatar, setAvatar] = useState('')
  useEffect(() => {
    if (avatarUrl) setAvatar(avatarUrl)
  }, [avatarUrl])

  const selectedKey = useMemo(() => getSelectedKey(pathname), [pathname])

  const [openKeys, setOpenKeys] = useState<string[]>(() => getParentKeys(getSelectedKey(pathname)))

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latest = keys.find((k) => !openKeys.includes(k))
    setOpenKeys(latest ? [latest] : [])
  }

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const path = keyToPath[key]
    if (path) router.push(path)
  }

  const siderWidth = collapsed ? 92 : 240

  return (
    <div
      className={`${styles.sidebarContainer} ${collapsed ? styles.collapsed : ''}`}
      style={{ width: siderWidth }}
    >
      <div className={styles.topSection}>
        <div
          className={`${styles.avatarWrapper} ${collapsed ? styles.avatarCollapsed : styles.avatarExpanded}`}
        >
          <div
            className={`${styles.userInfo} ${collapsed ? styles.userInfoCollapsed : styles.userInfoExpended}`}
          >
            <Avatar size={44} src={avatar} />
            {!collapsed && (
              <div className={styles.userDetails}>
                <span className={styles.userName}>{USER.name}</span>
                <span className={styles.userRole}>{USER.role}</span>
              </div>
            )}
          </div>
          <Button
            className={styles.chevronButton}
            onClick={() => setCollapsed(!collapsed)}
            icon={
              <ChevronRight
                size={12}
                strokeWidth={3}
                style={{
                  transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            }
          />
        </div>
        <div
          className={`${styles.divider} ${collapsed ? styles.dividerCollapsed : styles.dividerExpanded}`}
        />
      </div>

      <div className={styles.menuWrapper}>
        <Menu
          mode='inline'
          theme='light'
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleClick}
          inlineIndent={16}
          inlineCollapsed={collapsed}
          items={MAIN_ITEMS}
          className={`${styles.antdMenuCustom} ${collapsed ? styles.menuCollapsed : styles.menuExpanded}`}
          style={{ borderRight: 'none', marginTop: 8 }}
        />
      </div>

      <div className={styles.bottomMenu}>
        <Menu
          mode='inline'
          theme='light'
          selectedKeys={[selectedKey]}
          inlineIndent={16}
          inlineCollapsed={collapsed}
          onClick={handleClick}
          items={BOTTOM_ITEMS}
          className={`${styles.antdMenuCustom} ${collapsed ? styles.menuCollapsed : styles.menuExpanded}`}
          style={{ borderRight: 'none' }}
        />
      </div>
    </div>
  )
}
