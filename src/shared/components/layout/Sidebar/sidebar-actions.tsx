import { LogOut, Settings } from 'lucide-react'
import { Button } from '@/shared/components/common/Button'

export interface SidebarActionsProps {
  isExpanded: boolean
  isLoggedIn?: boolean
  onSettingsClick?: () => void
  onLogoutClick?: () => void
}

export default function SidebarActions({
  isExpanded,
  isLoggedIn,
  onSettingsClick,
  onLogoutClick,
}: SidebarActionsProps) {
  if (!isLoggedIn) return null

  return (
    <div
      className={`mt-auto space-y-2 pt-6 border-t border-sidebar-border ${isExpanded ? '' : 'flex flex-col items-center'}`}
    >
      <Button
        onClick={onSettingsClick}
        className={`w-full flex items-center rounded-xl transition-all text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent ${isExpanded ? 'px-4 py-3 gap-4' : 'px-0 py-3 justify-center'}`}
      >
        <Settings size={20} className='shrink-0' />
        {isExpanded && <span className='text-sm font-bold whitespace-nowrap'>Cài đặt</span>}
      </Button>
      <Button
        onClick={onLogoutClick}
        className={`flex items-center rounded-xl transition-all text-error hover:bg-error-soft ${isExpanded ? 'px-4 py-3 gap-4' : 'px-0 py-3 justify-center'}`}
      >
        <LogOut size={20} className='shrink-0' />
        {isExpanded && <span className='text-sm font-bold whitespace-nowrap'>Đăng xuất</span>}
      </Button>
    </div>
  )
}
