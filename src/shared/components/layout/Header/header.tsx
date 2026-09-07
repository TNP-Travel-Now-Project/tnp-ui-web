import type { RefObject } from 'react'
import HeaderActions from './header-actions'
import HeaderBrand from './header-brand'
import HeaderNavigation from './header-navigation'
import HeaderTripTabs from './header-trip-tabs'

export interface HeaderProps {
  isLoggedIn?: boolean
  isDashboard?: boolean
  showNotification?: boolean
  showNav?: boolean
  showMobileTabs?: boolean
  hiddenLogo?: boolean
  activeTab?: string
  currentPage?: string
  tabsRef?: RefObject<HTMLDivElement | null>
  handleTabClick?: (tab: string) => void

  onNavigateLanding: () => void
  onNavigateLogin?: () => void
  onNavigateRegister?: () => void
  onToggleSidebar?: () => void
  onProfileClick?: () => void
}

export default function Header({
  isLoggedIn,
  isDashboard,
  showNotification,
  showNav,
  showMobileTabs,
  hiddenLogo,
  activeTab,
  tabsRef,
  onNavigateLanding,
  onNavigateLogin,
  onNavigateRegister,
  onToggleSidebar,
  onProfileClick,
  handleTabClick,
}: HeaderProps) {
  return (
    <>
      <header className='h-16 w-full border-b border-sand sticky top-0 z-40 bg-neutral-0 backdrop-blur-md flex justify-between items-center px-4 lg:px-8 shadow-sm transition-all duration-300'>
        <HeaderBrand
          isLoggedIn={isLoggedIn}
          showNav={showNav}
          hiddenLogo={hiddenLogo}
          onToggleSidebar={onToggleSidebar}
          onNavigateLanding={onNavigateLanding}
        />

        {showNav && !isDashboard ? (
          <HeaderNavigation />
        ) : (
          !showNav && (
            <HeaderTripTabs
              activeTab={activeTab}
              tabsRef={tabsRef}
              handleTabClick={handleTabClick}
            />
          )
        )}

        <div className='flex items-center gap-2 md:gap-5 flex-1 lg:flex-none justify-end'>
          <HeaderActions
            isLoggedIn={isLoggedIn}
            showNotification={showNotification}
            onNavigateLogin={onNavigateLogin}
            onNavigateRegister={onNavigateRegister}
            onProfileClick={onProfileClick}
          />
        </div>
      </header>
      
      {showMobileTabs && (
        <HeaderTripTabs
          isMobile
          activeTab={activeTab}
          tabsRef={tabsRef}
          handleTabClick={handleTabClick}
        />
      )}
    </>
  )
}
