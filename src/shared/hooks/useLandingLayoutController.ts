'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { currentPageMap } from '@/shared//constants/sidebar.constant'
import { useAuth } from '@/shared/components/providers'

export function useLandingLayoutController() {
  const router = useRouter()
  const pathName = usePathname()

  const { isAuthenticated, isLoading } = useAuth()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  const [isShowNav, setIsShowNav] = useState(true)
  const [isHiddenLogo, setIsHiddenLogo] = useState(true)

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login')

  const [isHeroVisible, setIsHeroVisible] = useState(false)
  const [changeColorIsHeroVisible, setChangeColorIsHeroVisible] = useState('text-primary')

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    const setupObserver = () => {
      const hero = document.getElementById('hero-section')
      if (!hero) {
        requestAnimationFrame(setupObserver)
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsHeroVisible(!entry.isIntersecting)
          setChangeColorIsHeroVisible(
            entry.isIntersecting ? 'text-primary' : 'text-green-bright/90',
          )
        },
        {
          threshold: 0.7,
        },
      )

      observer.observe(hero)
    }

    setupObserver()

    return () => observer?.disconnect()
  }, [])

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

  const goContact = useCallback(() => router.push('/contact'), [router])

  const goDashboard = useCallback(() => router.replace('/dashboard'), [router])

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
    isHeroVisible,
    changeColorIsHeroVisible,

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
      dashboard: goDashboard,
      refresh,
    },
  }
}
