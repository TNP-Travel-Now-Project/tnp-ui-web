import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, LogOut, Plane, Settings } from 'lucide-react'
import { Button } from '@/shared/components/common/Button'
import { guestGeneralNavItems, guestLandingNavItems, loggedInNavItems } from '@/shared/constants'

interface SidebarProps {
  isOpen: boolean
  isCollapsed?: boolean
  isLoggedIn?: boolean
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

  const navItems = isLoggedIn
    ? loggedInNavItems
    : currentPage === 'landing'
      ? guestLandingNavItems
      : currentPage === 'about' || currentPage === 'contact'
        ? guestGeneralNavItems
        : []

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm'
          />
        )}
      </AnimatePresence>

      <aside
        className={`h-screen border-r border-[#d6d0cc]/50 lg:sticky lg:top-0 fixed left-0 top-0 bg-white shadow-[2px_0_12px_-4px_rgba(0,0,0,0.05)] flex flex-col p-4 z-50 transition-all duration-300 transform lg:translate-x-0 w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'lg:w-20' : ''}`}
      >
        <div
          className={`mb-8 mt-2 flex items-center gap-2 ${isExpanded ? 'px-2' : 'justify-center'}`}
        >
          <div className={`flex items-center gap-2 ${isExpanded ? 'flex-1' : ''}`}>
            <div className='p-2 bg-primary rounded-xl text-white shrink-0'>
              <Plane size={20} className='transform -rotate-45' />
            </div>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='overflow-hidden flex flex-col'
              >
                <div className='text-lg font-bold whitespace-nowrap leading-none'>
                  <span className='text-tertiary text-primary'>chudu</span>
                  <span className='text-primary font-extrabold uppercase tracking-tight'>4be</span>
                </div>
                <div className='text-[8px] font-bold text-primary/60 uppercase tracking-widest whitespace-nowrap'>
                  Đâu đâu cũng là nhà
                </div>
              </motion.div>
            )}
          </div>

          <Button
            onClick={onToggleCollapse || onClose}
            className='absolute -right-4 top-6 w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-primary hover:border-primary shadow-md flex items-center justify-center transition-all z-[60]'
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        {isLoggedIn && (
          <Button
            onClick={onProfileClick}
            className={`flex items-center gap-3 text-left group mb-8 px-2 ${isExpanded ? '' : 'justify-center'}`}
          >
            <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20 shrink-0'>
            </div>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='overflow-hidden flex flex-col'
              >
                <div className='text-sm font-bold text-slate-800 whitespace-nowrap leading-none mb-1 group-hover:text-primary transition-colors'>
                  Trần Duy Tuấn
                </div>
                <div className='text-[10px] font-medium text-slate-400 whitespace-nowrap'>
                  @tuan.thichtucon
                </div>
              </motion.div>
            )}
          </Button>
        )}

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
                  : 'text-slate-600 hover:text-primary hover:bg-slate-50'
              }`}
            >
              <item.icon
                size={22}
                className={`shrink-0 ${(isLoggedIn && (item as any).active) || (!isLoggedIn && currentPage === item.id) ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}
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

        <div
          className={`mt-auto space-y-2 pt-6 border-t border-slate-100 ${isExpanded ? '' : 'flex flex-col items-center'}`}
        >
          {isLoggedIn && (
            <>
              <Button
                onClick={onSettingsClick}
                className={`w-full flex items-center rounded-xl transition-all text-slate-600 hover:text-primary hover:bg-slate-50 ${isExpanded ? 'px-4 py-3 gap-4' : 'px-0 py-3 justify-center'}`}
              >
                <Settings size={20} className='shrink-0' />
                {isExpanded && <span className='text-sm font-bold whitespace-nowrap'>Cài đặt</span>}
              </Button>
              <a
                href='#sidebar'
                className={`flex items-center rounded-xl transition-all text-rose-500 hover:bg-rose-50 ${isExpanded ? 'px-4 py-3 gap-4' : 'px-0 py-3 justify-center'}`}
              >
                <LogOut size={20} className='shrink-0' />
                {isExpanded && (
                  <span className='text-sm font-bold whitespace-nowrap'>Đăng xuất</span>
                )}
              </a>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
