'use client'

import { useState, useRef } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/shared/components/providers'
import Sidebar from '@/shared/components/layout/Sidebar/Sidebar'
import Header from '@/shared/components/layout/Header/Header'
import { ProfileModal } from '@/features/auth/components/ProfileModal'
import { Button } from '@/shared/components/common'

const tripDetailTabs = ['Tổng quan', 'Lịch trình', 'Chi phí', 'Trò chuyện', 'Thành viên']

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [profileModalTab, setProfileModalTab] = useState<
    'personal' | 'security' | 'finance' | 'notifications' | 'settings'
  >('personal')
  const [hasNotification, setHasNotification] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const isTripDetail = /^\/trips\/[a-zA-Z0-9_-]+\/?$/.test(pathname)
  const isDashboard = pathname === '/dashboard'
  const activeTab = searchParams.get('tab') || 'Tổng quan'

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

  const openProfile = (tab: typeof profileModalTab = 'personal') => {
    setProfileModalTab(tab)
    setIsProfileModalOpen(true)
  }

  return (
    <div className='flex min-h-screen bg-background'>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onProfileClick={() => openProfile('personal')}
        onSettingsClick={() => openProfile('settings')}
      />
      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}
      >
        <Header
          isLoggedIn={isAuthenticated}
          showNotification={hasNotification}
          onMenuClick={() => setIsSidebarOpen(true)}
          onProfileClick={() => openProfile('personal')}
          showNav={false}
        >
          {isTripDetail && (
            <div ref={tabsRef} className='flex gap-8 px-4 h-full items-center'>
              {tripDetailTabs.map((tab) => (
                <Button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative p-1 h-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center ${
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-outline/70 hover:text-on-surface'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId='activeTabIndicatorHeader'
                      className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_-2px_4px_rgba(201,153,107,0.3)]'
                    />
                  )}
                </Button>
              ))}
            </div>
          )}
        </Header>

        {isTripDetail && (
          <div className='lg:hidden bg-white border-b border-[#d6d0cc]/30 sticky top-16 z-30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]'>
            <div
              ref={tabsRef}
              className='flex gap-8 px-4 md:px-8 overflow-x-auto scrollbar-hide no-scrollbar max-w-7xl mx-auto w-full'
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {tripDetailTabs.map((tab) => (
                <Button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative px-1 py-4 text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? 'text-primary scale-105'
                      : 'text-outline/70 hover:text-on-surface'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId='activeTabIndicator'
                      className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_-2px_4px_rgba(201,153,107,0.3)]'
                    />
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}

        <main className='p-4 md:p-10 pb-24 lg:pb-16 max-w-7xl mx-auto w-full'>
          {children}
        </main>

        {isDashboard && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/trips/new')}
            className='md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-[4px] shadow-2xl flex items-center justify-center z-50'
          >
            <Plus size={24} />
          </motion.button>
        )}
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialTab={profileModalTab}
      />
    </div>
  )
}
