import { X } from 'lucide-react'
import LoginForm from '@/features/auth/components/login/login-form'
import RegisterForm from '@/features/auth/components/register/register-form'
import { Button } from '@/shared/components/common'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/overlay'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  activeTab: 'login' | 'register'
  onTabChange: (tab: 'login' | 'register') => void
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  activeTab,
  onTabChange,
}: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[calc(100%-32px)] gap-0 sm:max-w-110 p-0 overflow-hidden rounded-3xl sm:rounded-8 border-none shadow-2xl [&>Button]:hidden bg-neutral-0 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]'>
        <div className='bg-linear-to-br from-peach-cream via-pale-light to-neutral-0 p-5 sm:p-8 pb-4 relative shrink-0'>
          <DialogHeader className='text-left space-y-0 text-neutral-90'>
            <DialogTitle className='text-2xl sm:text-[26px] font-black tracking-tight leading-tight pt-2 sm:pt-0'>
              {activeTab === 'login' ? 'Chào mừng bạn quay lại' : 'Tạo tài khoản mới'}
            </DialogTitle>
            <DialogDescription className='text-sm sm:text-[15px] font-medium text-neutral-80 mt-1 sm:mt-2 pr-10 sm:pr-12 leading-relaxed'>
              {activeTab === 'login'
                ? 'Đăng nhập để lưu địa điểm và đồng bộ hành trình.'
                : 'Đăng ký để lưu địa điểm yêu thích và viết đánh giá.'}
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={onClose}
            className='absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-neutral-0 shadow-sm sm:shadow-md border border-neutral-2 text-neutral-80 hover:text-neutral-90 transition-all hover:scale-105 active:scale-95 z-20'
          >
            <X className='w-4 h-4 sm:w-5 sm:h-5' strokeWidth={2.5} />
          </Button>

          <div className='absolute bottom-0 left-0 right-0 h-12 bg-linear-to-b from-transparent via-white/70 to-white pointer-events-none' />
        </div>

        <div className='px-5 sm:px-8 pb-6 sm:pb-10'>
          <Tabs
            value={activeTab}
            onValueChange={(v) => onTabChange(v as 'login' | 'register')}
            className='w-full flex flex-col'
          >
            <TabsList className='grid w-full grid-cols-2 p-1.5 bg-auth-layout rounded-[20px] sm:rounded-6 h-12 sm:h-16 mb-5 mt-5 sm:mb-6 border-none shrink-0'>
              <TabsTrigger
                value='login'
                className='rounded-[16px] sm:rounded-[18px] font-bold text-sm sm:text-[15px] h-full transition-all  data-[state=active]:bg-neutral-0 data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.05)] data-[state=active]:border-[1.5px] data-[state=active]:border-green-dark data-[state=active]:text-green-dark text-neutral-90 hover:text-neutral-100'
              >
                Đăng nhập
              </TabsTrigger>
              <TabsTrigger
                value='register'
                className='rounded-[16px] sm:rounded-[18px] font-bold text-sm sm:text-[15px] h-full transition-all data-[state=active]:bg-neutral-0 data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.05)] data-[state=active]:border-[1.5px] data-[state=active]:border-green-dark data-[state=active]:text-green-dark text-neutral-90 hover:text-neutral-100'
              >
                Đăng ký
              </TabsTrigger>
            </TabsList>

            <TabsContent value='login' className='outline-none focus-visible:ring-0 w-full mt-0'>
              <LoginForm onSuccess={onSuccess} />
            </TabsContent>

            <TabsContent value='register' className='outline-none focus-visible:ring-0 w-full mt-0'>
              <RegisterForm onSuccess={onSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
