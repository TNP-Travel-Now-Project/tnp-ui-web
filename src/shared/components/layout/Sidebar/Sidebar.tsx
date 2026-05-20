import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Luggage,
  Menu,
  MessageSquare,
  Phone,
  Plane,
  Settings,
  Sparkles,
  Star,
  Wallet,
  X,
} from 'lucide-react'
import { Button } from '@/shared/components/common/Button'

const loggedInNavItems = [
  { id: 'trips', label: 'Chuyến đi của tôi', icon: Luggage, active: true },
  { id: 'explore', label: 'Khám phá', icon: Compass },
  { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
  { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'expenses', label: 'Chi tiêu', icon: Wallet },
]

const guestLandingNavItems = [
  { id: 'popular-places', label: 'Cảm hứng', icon: Sparkles },
  { id: 'how-it-works', label: 'Cách dùng', icon: Compass },
  { id: 'testimonials', label: 'Đánh giá', icon: Star },
  { id: 'faq', label: 'Câu hỏi thường gặp', icon: HelpCircle },
]

const guestGeneralNavItems = [
  { id: 'landing', label: 'Trang chủ', icon: Home },
  { id: 'about', label: 'Giới thiệu', icon: Info },
  { id: 'contact', label: 'Liên hệ', icon: Phone },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onToggle?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  isLoggedIn?: boolean
  currentPage?: 'landing' | 'about' | 'contact'
  onNavigateLanding?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: () => void
}

export default function Sidebar({
  isOpen,
  onClose,
  onToggle,
  onProfileClick,
  onSettingsClick,
  isLoggedIn = true,
  currentPage = 'landing',
  onNavigateLanding,
  onNavigateAbout,
  onNavigateContact,
}: SidebarProps) {
  const isExpanded = isLoggedIn ? isOpen : true

  const handleGuestLinkClick = (id: string) => {
    if (currentPage === 'landing') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      if (id === 'landing' && onNavigateLanding) onNavigateLanding()
      if (id === 'about' && onNavigateAbout) onNavigateAbout()
      if (id === 'contact' && onNavigateContact) onNavigateContact()
    }
    onClose()
  }

  const navItems = isLoggedIn
    ? loggedInNavItems
    : currentPage === 'landing'
      ? guestLandingNavItems
      : guestGeneralNavItems

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
        className={`h-screen border-r border-[#d6d0cc]/50 fixed left-0 top-0 bg-white shadow-[2px_0_12px_-4px_rgba(0,0,0,0.05)] flex flex-col p-4 z-50 transition-all duration-300 transform ${
          isLoggedIn
            ? `lg:translate-x-0 ${isOpen ? 'translate-x-0 w-72' : 'lg:w-20 w-72 -translate-x-full'}`
            : `${isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'}`
        }`}
      >
        <div
          className={`mb-10 mt-2 flex items-center gap-2 ${isExpanded ? 'justify-between px-2' : 'justify-center transition-all'}`}
        >
          {isLoggedIn ? (
            <Button onClick={onProfileClick} className='flex items-center gap-3 text-left group'>
              <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20 shrink-0'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                  alt='Avatar'
                  className='w-full h-full object-cover'
                />
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
          ) : (
            <Button onClick={onNavigateLanding} className='flex items-center gap-2 text-left'>
              <div className='p-1.5 bg-primary rounded-[4px] text-white flex-shrink-0'>
                <Plane size={24} className='transform -rotate-45' />
              </div>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className='overflow-hidden flex flex-col'
                >
                  <div className='text-xl font-bold whitespace-nowrap leading-none'>
                    <span className='text-tertiary'>chudu</span>
                    <span className='text-primary font-extrabold uppercase tracking-tight'>
                      4be
                    </span>
                  </div>
                  <div className='text-[10px] font-bold text-outline uppercase tracking-widest mt-0.5 whitespace-nowrap'>
                    Lập kế hoạch nhóm
                  </div>
                </motion.div>
              )}
            </Button>
          )}

          {isLoggedIn && (
            <Button
              onClick={onToggle || onClose}
              className='absolute -right-4 top-8 w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-primary hover:border-primary shadow-md flex items-center justify-center transition-all z-[60]'
            >
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </Button>
          )}

          {!isLoggedIn && isExpanded && (
            <Button
              onClick={onClose}
              className='lg:hidden text-outline-variant hover:text-on-surface p-1'
            >
              <X size={20} />
            </Button>
          )}
        </div>

        <nav className='flex-1 space-y-4 overflow-y-auto overflow-x-hidden no-scrollbar'>
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => (isLoggedIn ? null : handleGuestLinkClick(item.id))}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center rounded-xl transition-all duration-300 text-left ${
                isExpanded ? 'px-4 py-3 gap-4' : 'px-0 py-3 justify-center'
              } ${
                (isLoggedIn && (item as any).active) || (!isLoggedIn && currentPage === item.id)
                  ? 'text-primary bg-primary/5 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-primary hover:bg-slate-50'
              }`}
            >
              <item.icon
                size={22}
                className={`flex-shrink-0 ${(isLoggedIn && (item as any).active) || (!isLoggedIn && currentPage === item.id) ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`}
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
                <Settings size={20} className='flex-shrink-0' />
                {isExpanded && <span className='text-sm font-bold whitespace-nowrap'>Cài đặt</span>}
              </Button>
              <a
                href='#sidebar'
                className={`flex items-center rounded-xl transition-all text-rose-500 hover:bg-rose-50 ${isExpanded ? 'px-4 py-3 gap-4' : 'px-0 py-3 justify-center'}`}
              >
                <LogOut size={20} className='flex-shrink-0' />
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
