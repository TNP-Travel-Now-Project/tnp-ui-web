'use client'

import { AuthModal } from '@/features/auth/components/AuthModal'
import Sidebar from '@/shared/components/layout/Sidebar'
import { useLandingLayoutController } from '@/shared/hook/useLandingLayoutController'
import Header from './Header'

export default function LandingLayout({ children }: { children?: React.ReactNode }) {
  const {
    isLoading,
    isAuthenticated,
    isSidebarOpen,
    isSidebarCollapsed,
    isShowNav,
    isHiddenLogo,
    isAuthModalOpen,
    authInitialTab,
    setIsAuthModalOpen,
    setAuthInitialTab,
    handleSidebarNavigate,
    closeSidebar,
    toggleSidebar,
    toggleSidebarCollapsed,
    navigate,
  } = useLandingLayoutController()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <div className='w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    )
  }

  if (isAuthenticated) return null

  return (
    <>
      <div className='lg:flex'>
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={closeSidebar}
          onToggleCollapse={toggleSidebarCollapsed}
          isLoggedIn={false}
          currentPage='landing'
          onNavigateItem={handleSidebarNavigate}
          onBrandClick={navigate.home}
        />
        <div className='flex-1 min-w-0'>
          <Header
            showNav={isShowNav}
            hiddenLogo={isHiddenLogo}
            onNavigateLanding={navigate.home}
            onNavigateLogin={navigate.login}
            onNavigateRegister={navigate.register}
            onToggleSidebar={toggleSidebar}
            isLoggedIn={false}
          />

          <main>{children}</main>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={navigate.refresh}
        initialTab={authInitialTab}
      />
    </>
  )
}
