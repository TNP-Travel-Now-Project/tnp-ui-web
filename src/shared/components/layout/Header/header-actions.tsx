import { Bell } from 'lucide-react'
import { Button } from '@/shared/components/common/Button'
import { DropdownMenu } from '@/shared/components/navigation/DropdownMenu'
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/navigation/dropdown-menu'
import NotificationPanel from './notification-panel'

export interface HeaderActionsProps {
  isLoggedIn?: boolean
  showNotification?: boolean
  onNavigateLogin?: () => void
  onNavigateRegister?: () => void
  onProfileClick?: () => void
}

export default function HeaderActions({
  isLoggedIn,
  showNotification,
  onNavigateLogin,
  onNavigateRegister,
  onProfileClick,
}: HeaderActionsProps) {
  if (!isLoggedIn) {
    return (
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
    )
  }

  return (
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
      />
    </div>
  )
}
