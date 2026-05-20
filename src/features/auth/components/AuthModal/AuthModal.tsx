import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/overlay'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/navigation'
import { Button, Input } from '@/shared/components/common'
import { Label } from '@/shared/components/ui/form/label'
import { X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialTab?: 'login' | 'register'
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'login',
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab)

  // Dialog from Radix UI handles scroll locking natively.
  // Custom hook usage might be causing conflicts when the modal transitions.
  // useModalScrollLock(isOpen);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Close modal first to allow scroll cleanup
    onClose()
    // Small delay to ensure state updates and cleanup run before login state changes
    setTimeout(() => {
      onSuccess()
    }, 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[calc(100%-32px)] sm:max-w-[440px] p-0 overflow-hidden rounded-3xl sm:rounded-[32px] border-none shadow-2xl [&>Button]:hidden bg-white max-h-[90vh] overflow-y-auto'>
        {/* Modal Header with Gradient */}
        <div className='bg-gradient-to-br from-[#FFF5EF] via-[#FFF9F6] to-white p-5 sm:p-8 pb-4 relative shrink-0'>
          <DialogHeader className='text-left space-y-0 text-[#1D1D1F]'>
            <DialogTitle className='text-2xl sm:text-[26px] font-black tracking-tight leading-tight pt-2 sm:pt-0'>
              {activeTab === 'login' ? 'Chào mừng bạn quay lại' : 'Tạo tài khoản mới'}
            </DialogTitle>
            <DialogDescription className='text-sm sm:text-[15px] font-medium text-[#6E6E73] mt-1 sm:mt-2 pr-10 sm:pr-12 leading-relaxed'>
              {activeTab === 'login'
                ? 'Đăng nhập để lưu địa điểm và đồng bộ hành trình.'
                : 'Đăng ký để lưu địa điểm yêu thích và viết đánh giá.'}
            </DialogDescription>
          </DialogHeader>

          {/* Circular Close Button */}
          <Button
            onClick={onClose}
            className='absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-sm sm:shadow-md border border-[#E5E5EA] text-[#86868B] hover:text-[#1D1D1F] transition-all hover:scale-105 active:scale-95 z-20'
          >
            <X className='w-4 h-4 sm:w-5 sm:h-5' strokeWidth={2.5} />
          </Button>
        </div>

        <div className='px-5 sm:px-8 pb-6 sm:pb-10'>
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as 'login' | 'register')}
            className='w-full flex flex-col'
          >
            {/* Custom Styled TabsList */}
            <TabsList className='grid w-full grid-cols-2 p-1.5 bg-[#F2F2F7] rounded-[20px] sm:rounded-[24px] h-12 sm:h-[64px] mb-5 sm:mb-6 border-none shrink-0'>
              <TabsTrigger
                value='login'
                className='rounded-[16px] sm:rounded-[18px] font-bold text-sm sm:text-[15px] h-full transition-all data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.05)] data-[state=active]:border-[1.5px] data-[state=active]:border-black data-[state=active]:text-black text-[#86868B]'
              >
                Đăng nhập
              </TabsTrigger>
              <TabsTrigger
                value='register'
                className='rounded-[16px] sm:rounded-[18px] font-bold text-sm sm:text-[15px] h-full transition-all data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.05)] data-[state=active]:border-[1.5px] data-[state=active]:border-black data-[state=active]:text-black text-[#86868B]'
              >
                Đăng ký
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value='login'
              className='space-y-5 sm:space-y-6 outline-none focus-visible:ring-0 w-full mt-0'
            >
              {/* Google Button */}
              <div className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border-outline-variant/30 font-bold text-sm sm:text-[15px] flex items-center justify-center gap-3 hover:bg-[#F2F2F7] transition-all shadow-sm border-[1.5px]'
                >
                  <img
                    src='https://www.google.com/favicon.ico'
                    className='w-4 h-4 sm:w-5 sm:h-5'
                    alt='Google'
                  />
                  Tiếp tục với Google
                </Button>
              </div>

              <div className='relative pt-1 sm:pt-2 pb-1'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t border-[#E5E5EA]' />
                </div>
                <div className='relative flex justify-center text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-[#AEAEB2]'>
                  <span className='bg-white px-4'>Hoặc</span>
                </div>
              </div>

              <form onSubmit={handleAuth} className='space-y-4 sm:space-y-6'>
                <div className='space-y-2'>
                  <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>Email</Label>
                  <Input
                    type='email'
                    placeholder='you@example.com'
                    className='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FBFBFD] border-[#E5E5EA] border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-white'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between px-1'>
                    <Label className='text-xs sm:text-sm font-bold text-on-surface'>Mật khẩu</Label>
                    <Button
                      type='button'
                      className='text-[10px] sm:text-[11px] font-bold text-[#FF6B00] hover:underline'
                    >
                      Quên mật khẩu?
                    </Button>
                  </div>
                  <Input
                    type='password'
                    placeholder='Nhập mật khẩu'
                    className='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FBFBFD] border-[#E5E5EA] border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-white'
                    required
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-on-surface text-white font-bold text-sm sm:text-base hover:opacity-90 transition-all shadow-xl shadow-on-surface/10 mt-2 sm:mt-4'
                >
                  Đăng nhập
                </Button>
              </form>
              <p className='text-center text-xs sm:text-sm font-bold text-outline'>
                Chưa có tài khoản?{' '}
                <Button
                  type='button'
                  onClick={() => setActiveTab('register')}
                  className='text-[#FF6B00] hover:underline font-black outline-none'
                >
                  Đăng ký ngay
                </Button>
              </p>
            </TabsContent>

            <TabsContent
              value='register'
              className='space-y-4 sm:space-y-5 outline-none focus-visible:ring-0 w-full mt-0'
            >
              <form onSubmit={handleAuth} className='space-y-3 sm:space-y-4'>
                <div className='space-y-1 sm:space-y-2'>
                  <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>
                    Họ và tên
                  </Label>
                  <Input
                    placeholder='Nhập họ và tên'
                    className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-[#FBFBFD] border-[#E5E5EA] border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-white'
                    required
                  />
                </div>
                <div className='space-y-1 sm:space-y-2'>
                  <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>Email</Label>
                  <Input
                    type='email'
                    placeholder='you@example.com'
                    className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-[#FBFBFD] border-[#E5E5EA] border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-white'
                    required
                  />
                </div>
                <div className='space-y-1 sm:space-y-2'>
                  <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>
                    Mật khẩu
                  </Label>
                  <Input
                    type='password'
                    placeholder='Tạo mật khẩu'
                    className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-[#FBFBFD] border-[#E5E5EA] border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-white'
                    required
                  />
                </div>
                <div className='space-y-1 sm:space-y-2'>
                  <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>
                    Xác nhận mật khẩu
                  </Label>
                  <Input
                    type='password'
                    placeholder='Nhập lại mật khẩu'
                    className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-[#FBFBFD] border-[#E5E5EA] border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-white'
                    required
                  />
                </div>
                <Button
                  type='submit'
                  className='w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-on-surface text-white font-bold text-sm sm:text-base hover:opacity-90 transition-all shadow-xl shadow-on-surface/10 mt-2 sm:mt-4'
                >
                  Tạo tài khoản
                </Button>
              </form>
              <p className='text-center text-xs sm:text-sm font-bold text-outline sm:mt-4'>
                Đã có tài khoản?{' '}
                <Button
                  type='button'
                  onClick={() => setActiveTab('login')}
                  className='text-[#FF6B00] hover:underline font-black outline-none'
                >
                  Đăng nhập
                </Button>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
