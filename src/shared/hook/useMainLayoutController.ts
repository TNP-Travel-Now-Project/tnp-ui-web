'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { useAuth } from '@/shared/components/providers'
import {
  currentPageMap as currentPageSidebarMap,
  type profileTab as ProfileTab,
  tripDetailTabs,
} from '@/shared/constants/sidebar.constant'
import { currentPageMap as currentPageHeaderMap } from '@/shared/constants/header.constant'

export function useMainLayoutController() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuth()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  const [isShowNav, setIsShowNav] = useState(true)
  const [isHiddenLogo, setIsHiddenLogo] = useState(true)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [profileModalTab, setProfileModalTab] = useState<ProfileTab>('personal')
  const [hasNotification] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const isTripDetail = /^\/trips\/[a-zA-Z0-9_-]+\/?$/.test(pathname)
  const isDashboard = pathname === '/dashboard'
  const activeTab = searchParams.get('tab') || 'Tổng quan'
  const currentPageSidebar = currentPageSidebarMap[pathname] || '/'
  const currentPageHeader = currentPageHeaderMap[pathname] || '/'

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

  const handleSidebarNavigate = useCallback(
    (itemId: string) => {
      const section = document.getElementById(itemId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      } else if (itemId === 'about') {
        router.push('/about')
      } else if (itemId === 'contact') {
        router.push('/contact')
      } else if (itemId === 'landing') {
        router.push('/')
      }
      setIsSidebarOpen(false)
    },
    [router],
  )

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), [])

  const toggleSidebarCollapsed = useCallback(() => {
    setIsSidebarOpen(false)
    setIsSidebarCollapsed((prev) => !prev)
    // setIsShowNav((prev) => !prev)
    setIsHiddenLogo((prev) => !prev)
  }, [])

  const goHome = useCallback(() => router.push('/'), [router])

  const goToCreateTrip = useCallback(() => router.push('/trips/new'), [router])

  const openProfile = (tab: ProfileTab = 'personal') => {
    setProfileModalTab(tab)
    setIsProfileModalOpen(true)
  }

  return {
    router,
    isAuthenticated,
    isSidebarOpen,
    isSidebarCollapsed,
    isShowNav,
    isHiddenLogo,
    isProfileModalOpen,
    profileModalTab,
    hasNotification,
    tabsRef,
    isTripDetail,
    isDashboard,
    activeTab,
    tripDetailTabs,
    currentPageSidebar,
    currentPageHeader,
    setIsSidebarOpen,
    setIsProfileModalOpen,
    handleTabClick,
    handleSidebarNavigate,
    closeSidebar,
    toggleSidebar,
    toggleSidebarCollapsed,
    openProfile,
    goHome,
    goToCreateTrip,
  }
}
