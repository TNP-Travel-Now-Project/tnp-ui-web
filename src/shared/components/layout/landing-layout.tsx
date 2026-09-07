'use client'

import { AuthModal } from '@/features/auth/components/AuthModal'
import Sidebar from '@/shared/components/layout/Sidebar'
import LandingContextProvider from '@/shared/contexts/landing-context'
import { useLandingLayoutController } from '@/shared/hooks/useLandingLayoutController'
import { Loading } from '@/shared/components/feedback'
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
    currentPage,
    isHeroVisible,
    setAuthInitialTab,
    setIsAuthModalOpen,
    handleSidebarNavigate,
    closeSidebar,
    toggleSidebar,
    toggleSidebarCollapsed,
    navigate,
  } = useLandingLayoutController()

  if (isLoading) {
    return <Loading fullScreen inline text='Đang xử lý ...' />
  }

  return (
    <LandingContextProvider
      value={{
        openLogin: navigate.login,
        openRegister: navigate.register,
        openHome: navigate.home,
        openAbout: navigate.about,
        openContact: navigate.contact,
      }}
    >
      <div className='lg:flex'>
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          isHeroVisible={isHeroVisible}
          onClose={closeSidebar}
          onToggleCollapse={toggleSidebarCollapsed}
          isLoggedIn={false}
          currentPage={currentPage}
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
        onSuccess={navigate.dashboard}
        activeTab={authInitialTab}
        onTabChange={setAuthInitialTab}
      />
    </LandingContextProvider>
  )
}
