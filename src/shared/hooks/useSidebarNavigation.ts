import {
  guestGeneralNavItems,
  guestLandingNavItems,
  loggedInNavItems,
} from '@/shared/constants/sidebar.constant'

export interface SidebarNavigationProps {
  isLoggedIn?: boolean
  currentPage?: string
}

export default function useSidebarNavigation({ isLoggedIn, currentPage }: SidebarNavigationProps) {
  const navItems = isLoggedIn
    ? loggedInNavItems
    : currentPage === 'landing'
      ? guestLandingNavItems
      : currentPage === 'about' || currentPage === 'contact'
        ? guestGeneralNavItems
        : []

  return { navItems }
}
