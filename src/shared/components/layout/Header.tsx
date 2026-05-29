import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Menu, Plane } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/common/Button'
import { DropdownMenu } from '@/shared/components/navigation/DropdownMenu'
import NavItemCustom from '@/shared/components/navigation/NavItem/nav-item'
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/navigation/dropdown-menu'
import { navItems, notifications } from '@/shared/constants/header.constant'

export interface HeaderProps {
  isLoggedIn?: boolean
  showNotification?: boolean
  showNav?: boolean
  hiddenLogo?: boolean
  children?: React.ReactNode

  onNavigateLanding: () => void
  onNavigateLogin?: () => void
  onNavigateRegister?: () => void
  onToggleSidebar?: () => void
  onProfileClick?: () => void
}

export default function Header({
  isLoggedIn,
  showNotification,
  showNav,
  hiddenLogo,
  children,
  onNavigateLanding,
  onNavigateLogin,
  onNavigateRegister,
  onToggleSidebar,
  onProfileClick,
}: HeaderProps) {
  return (
    <header className='h-16 w-full border-b border-sand sticky top-0 z-40 bg-neutral-0 backdrop-blur-md flex justify-between items-center px-4 lg:px-8 shadow-sm transition-all duration-300'>
      <div className={`flex items-center gap-3 ${showNav ? 'flex-1 lg:flex-none' : 'flex-none'}`}>
        <Button
          variant='link'
          onClick={onToggleSidebar}
          className='lg:hidden p-2 text-outline-variant hover:text-on-surface'
        >
          <Menu size={20} />
        </Button>

        <Button
          variant='link'
          onClick={onNavigateLanding}
          className='hidden lg:flex items-center gap-2 overflow-hidden hover:no-underline'
        >
          {isLoggedIn ? (
            <div className='flex items-center gap-2'>
              <div className='p-1.5 bg-primary rounded-lg text-white'>
                <Plane size={16} className='transform -rotate-45' />
              </div>
              <span className='text-xl font-bold whitespace-nowrap'>
                <span className='text-tertiary'>chudu</span>
                <span className='text-primary font-extrabold uppercase tracking-tight'>4be</span>
              </span>
            </div>
          ) : (
            <div
              className={cn(
                'flex items-center gap-2 transition-all duration-300 ease-in-out',
                showNav && hiddenLogo
                  ? 'opacity-100 translate-x-0 max-w-45'
                  : 'opacity-0 -translate-x-2 max-w-0',
              )}
            >
              <span className='text-xl font-bold whitespace-nowrap'>
                <span className='text-tertiary'>chudu</span>
                <span className='text-primary font-extrabold uppercase tracking-tight'>4be</span>
              </span>
            </div>
          )}
        </Button>
      </div>

      {showNav ? (
        <nav className='hidden lg:flex items-center justify-center flex-1 gap-12'>
          {navItems.map((item) => {
            return (
              <NavItemCustom key={item.href} href={item.href}>
                {item.label}
              </NavItemCustom>
            )
          })}
        </nav>
      ) : (
        <div className='flex-1 hidden lg:flex justify-start h-full items-center ml-8 gap-1 pl-8 border-l border-neutral-0'>
          {children}
        </div>
      )}

      <div className='flex items-center gap-2 md:gap-5 flex-1 lg:flex-none justify-end'>
        {!isLoggedIn ? (
          <div className='flex items-center gap-1 sm:gap-4'>
            <Button
              onClick={onNavigateLogin}
              className='px-4 py-2 text-xs sm:text-sm border rounded-xl font-bold text-on-surface hover:bg-green-teal transition-colors'
            >
              Đăng nhập
            </Button>
            <Button
              onClick={onNavigateRegister}
              className='px-5 py-2 text-xs sm:text-sm font-bold bg-neutral-100 hover:bg-neutral-90 text-neutral-0 rounded-xl shadow-lg shadow-black/10 hover:opacity-90 transition-all active:scale-95 whitespace-nowrap'
            >
              Đăng ký
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-2 md:gap-5'>
            <DropdownMenu trigger={<Button variant='outline'>Open menu</Button>}>
              <DropdownMenuTrigger asChild>
                <Button className='p-2 text-outline hover:text-primary transition-all rounded-1 hover:bg-surface-container relative outline-none ring-0'>
                  <Bell size={20} />
                  {showNotification && (
                    <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-neutral-0 animate-pulse' />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-[calc(100vw-32px)] sm:w-100 p-0 rounded-3xl shadow-2xl border-outline-variant/30 overflow-hidden'
              >
                <NotificationPanel />
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={onProfileClick}
              className='w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20 shrink-0 hover:border-primary transition-all'
            >
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

function NotificationPanel() {
  const [activeTab, setActiveTab] = useState<'all' | 'trip'>('all')

  return (
    <div className='flex flex-col bg-neutral-0'>
      <div className='p-4 border-b border-outline-variant/10'>
        <h3 className='text-base sm:text-xl font-black text-on-surface tracking-tight mb-2 sm:mb-4'>
          Thông báo
        </h3>
        <div className='flex p-0.5 sm:p-1 bg-surface-container rounded-lg sm:rounded-xl'>
          <Button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${activeTab === 'all' ? 'bg-neutral-0 text-primary shadow-sm' : 'text-outline hover:text-on-surface'}`}
          >
            Chung
          </Button>
          <Button
            onClick={() => setActiveTab('trip')}
            className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${activeTab === 'trip' ? 'bg-neutral-0 text-primary shadow-sm' : 'text-outline hover:text-on-surface'}`}
          >
            Chuyến đi
          </Button>
        </div>
      </div>
      <div className='max-h-75 sm:max-h-100 overflow-y-auto no-scrollbar overscroll-contain'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='p-3 sm:p-4 space-y-1.5 sm:space-y-2'
          >
            {notifications[activeTab].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className='p-3 sm:p-4 rounded-2xl hover:bg-surface-container/50 transition-all group border border-transparent hover:border-outline-variant/20 cursor-pointer'
                >
                  <div className='flex gap-3 sm:gap-4'>
                    <div className={`p-2 sm:p-2.5 rounded-xl ${item.color} shrink-0 h-fit`}>
                      <Icon size={16} className='sm:size-4' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start mb-1'>
                        <h4 className='text-sm font-bold text-on-surface truncate pr-2'>
                          {item.title}
                        </h4>
                        <span className='text-[10px] font-bold text-outline shrink-0'>
                          {item.time}
                        </span>
                      </div>
                      <p className='text-xs text-outline font-medium line-clamp-2 leading-relaxed'>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className='p-4 bg-surface-container/30 border-t border-outline-variant/10 text-center'>
        <Button className='text-[10px] font-black text-primary uppercase tracking-widest hover:underline'>
          Đã đọc tất cả
        </Button>
      </div>
    </div>
  )
}
