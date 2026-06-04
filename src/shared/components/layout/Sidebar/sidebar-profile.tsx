import { motion } from 'framer-motion'
import { Button } from '@/shared/components/common/Button'

export interface SidebarProfileProps {
  isExpanded: boolean
  onProfileClick?: () => void
}

export default function SidebarProfile({ isExpanded, onProfileClick }: SidebarProfileProps) {
  return (
    <Button
      onClick={onProfileClick}
      className={`flex items-center gap-3 text-left group mb-8 px-2 ${isExpanded ? '' : 'justify-center'}`}
    >
      <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-primary/20 shrink-0'></div>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className='overflow-hidden flex flex-col'
        >
          <div className='text-sm font-bold text-sidebar-foreground whitespace-nowrap leading-none mb-1 group-hover:text-primary transition-colors'>
            Trần Duy Tuấn
          </div>
          <div className='text-[10px] font-medium text-muted-foreground whitespace-nowrap'>
            @tuan.thichtucon
          </div>
        </motion.div>
      )}
    </Button>
  )
}
