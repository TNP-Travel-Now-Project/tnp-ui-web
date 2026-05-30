import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/shared/components/common/Button'
import { notifications } from '@/shared/constants/header.constant'

export default function NotificationPanel() {
  const [activeTab, setActiveTab] = useState<'all' | 'trip'>('all')

  return (
    <div className='flex flex-col bg-neutral-0'>
      <div className='p-4 border-b border-border/10'>
        <h3 className='text-base sm:text-xl font-black text-foreground tracking-tight mb-2 sm:mb-4'>
          Thông báo
        </h3>
        <div className='flex p-0.5 sm:p-1 bg-muted rounded-lg sm:rounded-xl'>
          <Button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${activeTab === 'all' ? 'bg-neutral-0 text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Chung
          </Button>
          <Button
            onClick={() => setActiveTab('trip')}
            className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-all ${activeTab === 'trip' ? 'bg-neutral-0 text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
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
                  className='p-3 sm:p-4 rounded-2xl hover:bg-accent/50 transition-all group border border-transparent hover:border-border/20 cursor-pointer'
                >
                  <div className='flex gap-3 sm:gap-4'>
                    <div className={`p-2 sm:p-2.5 rounded-xl ${item.color} shrink-0 h-fit`}>
                      <Icon size={16} className='sm:size-4' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start mb-1'>
                        <h4 className='text-sm font-bold text-foreground truncate pr-2'>
                          {item.title}
                        </h4>
                        <span className='text-[10px] font-bold text-muted-foreground shrink-0'>
                          {item.time}
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground font-medium line-clamp-2 leading-relaxed'>
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
      <div className='p-4 bg-muted/30 border-t border-border/10 text-center'>
        <Button className='text-[10px] font-black text-primary uppercase tracking-widest hover:underline'>
          Đã đọc tất cả
        </Button>
      </div>
    </div>
  )
}
