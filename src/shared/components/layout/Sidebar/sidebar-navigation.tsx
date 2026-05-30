import { motion } from 'framer-motion'
import useSidebarNavigation from '@/shared/hook/useSidebarNavigation'

export interface SidebarNavigationProps {
  isExpanded: boolean
  isLoggedIn?: boolean
  currentPage?: string
  onNavigateItem?: (id: string) => void
}

export default function SidebarNavigation({
  isExpanded,
  isLoggedIn,
  currentPage = 'landing',
  onNavigateItem,
}: SidebarNavigationProps) {
  const { navItems } = useSidebarNavigation({ isLoggedIn, currentPage })

  return (
    <nav className='flex-1 space-y-4 overflow-y-auto overflow-x-hidden no-scrollbar'>
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => (isLoggedIn ? null : onNavigateItem?.(item.id))}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center rounded-xl transition-all duration-300 text-left ${
            isExpanded ? 'px-4 py-3 gap-4' : 'px-0 py-3 justify-center'
          } ${
            (isLoggedIn && (item as any).active) || (!isLoggedIn && currentPage === item.id)
              ? 'text-primary bg-leaf font-bold shadow-sm'
              : 'text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent'
          }`}
        >
          <item.icon
            size={22}
            className={`shrink-0 ${(isLoggedIn && (item as any).active) || (!isLoggedIn && currentPage === item.id) ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}
          />
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className='text-base font-bold whitespace-nowrap'
            >
              {item.label}
            </motion.span>
          )}
        </motion.button>
      ))}
    </nav>
  )
}
