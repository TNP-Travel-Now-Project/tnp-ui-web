import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plane } from 'lucide-react'
import { Button } from '@/shared/components/common/Button'

export interface SidebarBrandProps {
  isExpanded: boolean
  onToggleCollapse?: () => void
  onClose: () => void
  onBrandClick?: () => void
  changeColorIsHeroVisible?: string
}

export default function SidebarBrand({
  isExpanded,
  onToggleCollapse,
  onClose,
  onBrandClick,
  changeColorIsHeroVisible
}: SidebarBrandProps) {
  
  return (
    <div className={`mb-8 mt-2 flex items-center gap-2 ${isExpanded ? 'px-2' : 'justify-center'}`}>
      <div className={`flex items-center gap-2 ${isExpanded ? 'flex-1' : ''}`}>
        <Button
          variant='link'
          // onClick={onBrandClick || onClose}
          className='p-0 hover:no-underline'
        >
          <div className='p-2 bg-primary rounded-xl text-white shrink-0'>
            <Plane size={20} className='transform -rotate-45' />
          </div>
        </Button>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className='overflow-hidden flex flex-col'
          >
            <div className='text-lg font-bold whitespace-nowrap leading-none'>
              <span className={`text-tertiary ${changeColorIsHeroVisible}`}>chudu</span>
              <span className={`text-tertiary font-extrabold uppercase tracking-tight ${changeColorIsHeroVisible}`}>4be</span>
            </div>
            <div className={`text-[8px] font-bold ${changeColorIsHeroVisible} uppercase tracking-widest whitespace-nowrap`}>
              Đâu đâu cũng là nhà
            </div>
          </motion.div>
        )}
      </div>

      <Button
        onClick={onToggleCollapse || onClose}
        className='absolute -right-4 top-6 w-8 h-8 rounded-lg  border border-sidebar-border text-sidebar-foreground hover:text-primary hover:border-primary shadow-md flex items-center justify-center transition-all z-60'
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </Button>
    </div>
  )
}
