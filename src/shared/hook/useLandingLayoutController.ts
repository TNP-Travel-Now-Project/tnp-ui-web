'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/shared/components/providers'
import { currentPageMap } from '@/shared//constants/sidebar.constant'

export function useLandingLayoutController() {
  const router = useRouter()
  const pathName = usePathname()

  const { isAuthenticated, isLoading } = useAuth()

  // Mobile drawer visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // Desktop compact mode
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  const [isShowNav, setIsShowNav] = useState(true)
  const [isHiddenLogo, setIsHiddenLogo] = useState(true)

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login')

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

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

  const currentPage = currentPageMap[pathName] || '/'

  const goHome = useCallback(() => router.push('/'), [router])
  const goAbout = useCallback(() => router.push('/about'), [router])
  const refresh = useCallback(() => router.refresh(), [router])

  const goLogin = useCallback(() => {
    setAuthInitialTab('login')
    setIsAuthModalOpen(true)
  }, [])
  const goRegister = useCallback(() => {
    setAuthInitialTab('register')
    setIsAuthModalOpen(true)
  }, [])

  return {
    isLoading,
    isAuthenticated,
    isSidebarOpen,
    isSidebarCollapsed,
    isShowNav,
    isHiddenLogo,
    isAuthModalOpen,
    authInitialTab,
    currentPage,  
    setIsAuthModalOpen,
    setAuthInitialTab,
    handleSidebarNavigate,
    closeSidebar,
    toggleSidebar,
    toggleSidebarCollapsed,
    navigate: {
      home: goHome,
      about: goAbout,
      login: goLogin,
      register: goRegister,
      refresh,
    },
  }
}
