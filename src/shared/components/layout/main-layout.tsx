'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { ProfileModal } from '@/features/auth/components/ProfileModal'
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
    currentPageSidebar,
    currentPageHeader,
    setIsProfileModalOpen,
    handleTabClick,
    handleSidebarNavigate,
    closeSidebar,
    toggleSidebar,
    toggleSidebarCollapsed,
    openProfile,
    goHome,
    goToCreateTrip,
  } = useMainLayoutController()

  return (
    <div className='lg:flex min-h-screen w-full bg-background'>
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={closeSidebar}
        onToggleCollapse={toggleSidebarCollapsed}
        isLoggedIn={isAuthenticated}
        onProfileClick={() => openProfile('personal')}
        onSettingsClick={() => openProfile('settings')}
        currentPage={currentPageSidebar}
        onNavigateItem={handleSidebarNavigate}
        onBrandClick={goHome}
        isHeroVisible={false}
      />
      <div className='flex-1 min-w-0'>
        <Header
          isLoggedIn={isAuthenticated}
          isDashboard={isDashboard}
          showNotification={hasNotification}
          onNavigateLanding={goHome}
          currentPage={currentPageHeader}
          onToggleSidebar={toggleSidebar}
          showNav={!isTripDetail}
          showMobileTabs={isTripDetail}
          hiddenLogo={isHiddenLogo}
          activeTab={activeTab}
          tabsRef={tabsRef}
          handleTabClick={handleTabClick}
          onProfileClick={() => openProfile('personal')}
        />

        <main className='p-4 md:p-10 pb-24 lg:pb-16 max-w-7xl mx-auto w-full'>{children}</main>

        {isDashboard && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToCreateTrip}
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
