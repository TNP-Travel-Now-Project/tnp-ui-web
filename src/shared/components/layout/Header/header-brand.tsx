import { Menu, Plane } from 'lucide-react'
import { Button } from '@/shared/components/common/Button'
import { cn } from '@/lib/utils'

export interface HeaderBrandProps {
  isLoggedIn?: boolean
  showNav?: boolean
  hiddenLogo?: boolean
  onToggleSidebar?: () => void
  onNavigateLanding: () => void
}

export default function HeaderBrand({
  isLoggedIn,
  showNav,
  hiddenLogo,
  onToggleSidebar,
  onNavigateLanding,
}: HeaderBrandProps) {
  return (
    <div className={`flex items-center gap-3 ${showNav ? 'flex-1 lg:flex-none' : 'flex-none'}`}>
      <Button
        variant='link'
        onClick={onToggleSidebar}
        className='lg:hidden p-2 text-neutral-100 hover:text-on-surface'
      >
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
  )
}
