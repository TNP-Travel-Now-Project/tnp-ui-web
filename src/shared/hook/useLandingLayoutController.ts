'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/shared/components/providers'
<<<<<<< HEAD
import { currentPageMap } from '@/shared/constants/sidebar.constant'
import type { AuthModalContextType } from '@/shared/types/landing.types'
=======
import { currentPageMap } from '@/shared//constants/sidebar.constant'
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)

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

<<<<<<< HEAD
  const [isHeroVisible, setIsHeroVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-section')

    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(!entry.isIntersecting)
      },
      {
        threshold: 0.7,
      },
    )

    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

=======
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)
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
<<<<<<< HEAD
  const goContact = useCallback(() => router.push('/contact'), [router])
=======
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)
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
<<<<<<< HEAD
    currentPage,
    isHeroVisible,
=======
    currentPage,  
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)
    setIsAuthModalOpen,
    setAuthInitialTab,
    handleSidebarNavigate,
    closeSidebar,
    toggleSidebar,
    toggleSidebarCollapsed,
    navigate: {
      home: goHome,
      about: goAbout,
      contact: goContact,
      login: goLogin,
      register: goRegister,
      refresh,
    },
  }
}
