import SidebarOverlay from './sidebar-overlay'
import SidebarBrand from './sidebar-brand'
import SidebarProfile from './sidebar-profile'
import SidebarNavigation from './sidebar-navigation'
import SidebarActions from './sidebar-actions'

export interface SidebarProps {
  isOpen: boolean
  isCollapsed?: boolean
  isLoggedIn?: boolean
  isHeroVisible: boolean
  currentPage?: string

  onClose: () => void
  onToggleCollapse?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onNavigateItem?: (id: string) => void
  onBrandClick?: () => void
}

export default function Sidebar({
  isOpen,
  isCollapsed = false,
  isHeroVisible = true,
  onClose,
  onToggleCollapse,
  onProfileClick,
  onSettingsClick,
  isLoggedIn = true,
  currentPage = 'landing',
  onNavigateItem,
  onBrandClick,
}: SidebarProps) {
  const isExpanded = isOpen || !isCollapsed

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClose={onClose} />

      <aside className={`h-screen border-r border-sidebar-border lg:sticky lg:top-0 fixed left-0 top-0 shadow-[2px_0_12px_-4px_rgba(0,0,0,0.5)] flex flex-col p-4 z-50 transition-all duration-300 ease-in-out transform lg:translate-x-0 w-64 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'lg:w-20' : ''}
          ${isHeroVisible ? 'bg-transparent' : 'bg-sidebar'}`}
      >
        <SidebarBrand
          isExpanded={isExpanded}
          onToggleCollapse={onToggleCollapse}
          onClose={onClose}
          onBrandClick={onBrandClick}
        />

        {isLoggedIn && (
          <SidebarProfile isExpanded={isExpanded} onProfileClick={onProfileClick} />
        )}

        <SidebarNavigation
          isExpanded={isExpanded}
          isLoggedIn={isLoggedIn}
          currentPage={currentPage}
          onNavigateItem={onNavigateItem}
        />

        <SidebarActions
          isExpanded={isExpanded}
          isLoggedIn={isLoggedIn}
          onSettingsClick={onSettingsClick}
        />
      </aside>
    </>
  )
}
