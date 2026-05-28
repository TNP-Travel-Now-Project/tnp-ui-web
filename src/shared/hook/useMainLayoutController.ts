'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { useAuth } from '@/shared/components/providers'

export type ProfileTab = 'personal' | 'security' | 'finance' | 'notifications' | 'settings'

export function useMainLayoutController() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuth()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [profileModalTab, setProfileModalTab] = useState<ProfileTab>('personal')
  const [hasNotification] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const isTripDetail = /^\/trips\/[a-zA-Z0-9_-]+\/?$/.test(pathname)
  const isDashboard = pathname === '/dashboard'
  const activeTab = searchParams.get('tab') || 'Tổng quan'

  const tripDetailTabs = ['Tổng quan', 'Lịch trình', 'Chi phí', 'Trò chuyện', 'Thành viên']

  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', tab)
    router.replace(`${pathname}?${params.toString()}`)
    if (tabsRef.current) {
      const index = tripDetailTabs.indexOf(tab)
      if (tabsRef.current.children[index]) {
        ;(tabsRef.current.children[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }

  const openProfile = (tab: ProfileTab = 'personal') => {
    setProfileModalTab(tab)
    setIsProfileModalOpen(true)
  }

  return {
    isAuthenticated,
    isSidebarOpen,
    isProfileModalOpen,
    profileModalTab,
    hasNotification,
    tabsRef,
    isTripDetail,
    isDashboard,
    activeTab,
    tripDetailTabs,
    setIsSidebarOpen,
    setIsProfileModalOpen,
    handleTabClick,
    openProfile,
    router,
  }
}
