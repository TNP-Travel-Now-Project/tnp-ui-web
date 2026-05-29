'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { ProfileModal } from '@/features/auth/components/ProfileModal'
import { Button } from '@/shared/components/common'
import { useMainLayoutController } from '@/shared/hook/useMainLayoutController'
import Header from './Header'
import Sidebar from './Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    isSidebarOpen,
    isSidebarCollapsed,
    isHiddenLogo,
    isProfileModalOpen,
    profileModalTab,
    hasNotification,
    tabsRef,
    isTripDetail,
    isDashboard,
    activeTab,
    tripDetailTabs,
    currentPage,
    setIsProfileModalOpen,
    handleTabClick,
    handleSidebarNavigate,
    closeSidebar,
    toggleSidebar,
    toggleSidebarCollapsed,
    openProfile,
    goHome,
    router,
  } = useMainLayoutController()

  return (
    <div className='flex min-h-screen w-full bg-background'>
      
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={closeSidebar}
        onToggleCollapse={toggleSidebarCollapsed}
        onProfileClick={() => openProfile('personal')}
        onSettingsClick={() => openProfile('settings')}
        currentPage={currentPage}
        onNavigateItem={handleSidebarNavigate}
        onBrandClick={goHome}
      />
      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300 `}
      >
        <Header
          isLoggedIn={isAuthenticated}
          showNotification={hasNotification}
          onNavigateLanding={goHome}
          onToggleSidebar={toggleSidebar}
          showNav={!isTripDetail}
          hiddenLogo={isHiddenLogo}
          onProfileClick={() => openProfile('personal')}
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
                      : 'text-muted-foreground/70 hover:text-foreground'
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
          <div className='lg:hidden bg-card border-b border-border/30 sticky top-16 z-30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]'>
            <div
              ref={tabsRef}
              className='flex gap-8 px-4 md:px-8 overflow-x-auto scrollbar-hide max-w-7xl mx-auto w-full'
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {tripDetailTabs.map((tab) => (
                <Button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative px-1 py-4 text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? 'text-primary scale-105'
                      : 'text-muted-foreground/70 hover:text-foreground'
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

        <main className='p-4 md:p-10 pb-24 lg:pb-16 max-w-7xl mx-auto w-full'>{children}</main>

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
