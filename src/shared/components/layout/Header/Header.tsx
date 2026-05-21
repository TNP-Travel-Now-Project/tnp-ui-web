import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  HelpCircle,
  Info,
  LogOut,
  Menu,
  MessageSquare,
  Plane,
  Search,
  Settings,
  Shield,
  Star,
  User,
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { Button } from '@/shared/components/common/Button'
import { DropdownMenu } from '@/shared/components/navigation/DropdownMenu'
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/navigation/dropdown-menu'

export interface HeaderProps {
  onMenuClick: () => void
  onProfileClick: () => void
  onLoginClick?: () => void
  onRegisterClick?: () => void
  onNavigateHome?: () => void
  onNavigateAbout?: () => void
  onNavigateContact?: () => void
  isLoggedIn?: boolean
  showNotification?: boolean
  showNav?: boolean
  children?: React.ReactNode
}

export default function Header({
  onMenuClick,
  onProfileClick,
  onLoginClick,
  onRegisterClick,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
  isLoggedIn,
  showNotification,
  showNav = true,
  children,
}: HeaderProps) {
  return (
    <header className='h-16 w-full border-b border-[#d6d0cc]/50 sticky top-0 z-40 bg-white/80 backdrop-blur-md flex justify-between items-center px-4 lg:px-8 shadow-sm transition-all duration-300'>
      <div className={`flex items-center gap-3 ${showNav ? 'flex-1 lg:flex-none' : 'flex-none'}`}>
        <Button
          onClick={onMenuClick}
          className='lg:hidden p-2 text-outline-variant hover:text-on-surface'
        >
          <Menu size={20} />
        </Button>
        <Button
          onClick={onNavigateHome}
          className='hidden lg:flex items-center gap-2'
        >
          {showNav ? (
            <span className='text-2xl font-black text-primary tracking-tight'>chudu4be</span>
          ) : (
            <div className='flex items-center gap-2'>
              <div className='p-1 bg-primary rounded-[4px] text-white flex-shrink-0'>
                <Plane size={16} />
              </div>
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
          <Button
            onClick={onNavigateHome}
            className='text-sm font-bold text-slate-500 hover:text-primary transition-colors py-2 relative group'
          >
            Trang chủ
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full'></span>
          </Button>
          <Button
            onClick={onNavigateAbout}
            className='text-sm font-bold text-slate-500 hover:text-primary transition-colors py-2 relative group'
          >
            Chúng tôi
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full'></span>
          </Button>
          <Button
            onClick={onNavigateContact}
            className='text-sm font-bold text-slate-500 hover:text-primary transition-colors py-2 relative group'
          >
            Liên hệ
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full'></span>
          </Button>
        </nav>
      ) : (
        <div className='flex-1 hidden lg:flex justify-start h-full items-center ml-8 gap-1 pl-8 border-l border-slate-100'>
          {children}
        </div>
      )}

      <div className='flex items-center gap-2 md:gap-5 flex-1 lg:flex-none justify-end'>
        {!isLoggedIn ? (
          <div className='flex items-center gap-1 sm:gap-4'>
            <Button
              onClick={onLoginClick}
              className='px-4 py-2 text-xs sm:text-sm font-bold text-on-surface hover:text-[#FF6B00] transition-colors'
            >
              Đăng nhập
            </Button>
            <Button
              onClick={onRegisterClick}
              className='px-5 py-2 text-xs sm:text-sm font-bold bg-[#1D1D1F] text-white rounded-full shadow-lg shadow-black/10 hover:opacity-90 transition-all active:scale-95 whitespace-nowrap'
            >
              Đăng ký
            </Button>
          </div>
        ) : (
          <DropdownMenu trigger={<Button variant='outline'>Open menu</Button>}>
            <DropdownMenuTrigger asChild>
              <Button className='p-2 text-outline hover:text-primary transition-all rounded-[4px] hover:bg-surface-container relative outline-none ring-0'>
                <Bell size={20} />
                {showNotification && (
                  <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-white animate-pulse' />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-[calc(100vw-32px)] sm:w-[400px] p-0 rounded-3xl shadow-2xl border-outline-variant/30 overflow-hidden'
            >
              <NotificationPanel />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}

function NotificationPanel() {
  const [activeTab, setActiveTab] = useState<'all' | 'trip'>('all')

  const notifications = {
    all: [
      {
        id: 1,
        title: 'Ưu đãi đặt phòng',
        desc: 'Giảm 20% cho thành viên Vàng tại các khách sạn Phú Quốc.',
        time: '2 giờ trước',
        icon: Star,
        color: 'text-yellow-600 bg-yellow-100',
      },
      {
        id: 2,
        title: 'Cập nhật hệ thống',
        desc: 'Bản cập nhật v2.4 đã sẵn sàng với tính năng chia hóa đơn tự động.',
        time: '5 giờ trước',
        icon: Info,
        color: 'text-blue-600 bg-blue-100',
      },
    ],
    trip: [
      {
        id: 3,
        title: 'Ăn tối hải sản',
        desc: 'Hoạt động "Ăn tối hải sản" sẽ bắt đầu trong 15 phút nữa.',
        time: 'Ngay bây giờ',
        icon: Bell,
        color: 'text-secondary bg-secondary/10',
      },
      {
        id: 4,
        title: 'Chi phí mới',
        desc: 'Linh Nguyễn đã thêm chi phí mới: "Vé cáp treo Hòn Thơm".',
        time: '10 phút trước',
        icon: MessageSquare,
        color: 'text-primary bg-primary/10',
      },
    ],
  }

  return (
    <div className='flex flex-col bg-white'>
      <div className='p-4 border-b border-outline-variant/10'>
        <h3 className='text-base sm:text-xl font-black text-on-surface tracking-tight mb-2 sm:mb-4'>
          Thông báo
        </h3>
        <div className='flex p-0.5 sm:p-1 bg-surface-container rounded-lg sm:rounded-xl'>
          <Button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-on-surface'}`}
          >
            Chung
          </Button>
          <Button
            onClick={() => setActiveTab('trip')}
            className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${activeTab === 'trip' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-on-surface'}`}
          >
            Chuyến đi
          </Button>
        </div>
      </div>
      <div className='max-h-[300px] sm:max-h-[400px] overflow-y-auto no-scrollbar overscroll-contain'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='p-3 sm:p-4 space-y-1.5 sm:space-y-2'
          >
            {notifications[activeTab].map((notif) => {
              const Icon = notif.icon
              return (
                <div
                  key={notif.id}
                  className='p-3 sm:p-4 rounded-2xl hover:bg-surface-container/50 transition-all group border border-transparent hover:border-outline-variant/20 cursor-pointer'
                >
                  <div className='flex gap-3 sm:gap-4'>
                    <div className={`p-2 sm:p-2.5 rounded-xl ${notif.color} shrink-0 h-fit`}>
                      <Icon size={16} className='sm:size-[18px]' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start mb-1'>
                        <h4 className='text-sm font-bold text-on-surface truncate pr-2'>
                          {notif.title}
                        </h4>
                        <span className='text-[10px] font-bold text-outline shrink-0'>
                          {notif.time}
                        </span>
                      </div>
                      <p className='text-xs text-outline font-medium line-clamp-2 leading-relaxed'>
                        {notif.desc}
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
