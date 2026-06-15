import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
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
        {/* <div className='flex justify-between items-center'>
        </div> */}
        <div className='tab-switcher-container'>
          <Button
            buttonType='none'
            onClick={() => setActiveTab('all')}
            className={cn(
              'tab-switcher-btn',
              activeTab === 'all'
                ? 'tab-switcher-btn-active'
                : 'tab-switcher-btn-inactive tab-switcher-btn-inactive-hover',
            )}
          >
            Chung
          </Button>

          <Button
            buttonType='none'
            onClick={() => setActiveTab('trip')}
            className={cn(
              'tab-switcher-btn',
              activeTab === 'trip'
                ? 'tab-switcher-btn-active'
                : 'tab-switcher-btn-inactive tab-switcher-btn-inactive-hover',
            )}
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
      <div className='p-4 pt-2 text-center bg-card border-t border-border/30'>
        <Button className='w-full sm:w-auto px-8 py-2.5 text-xs font-black text-neutral-0 bg-green-teal hover:bg-green-dark active:scale-98 rounded-xl transition-all uppercase tracking-wider shadow-sm shadow-green-teal/10'>
          Xem tất cả
        </Button>
      </div>
    </div>
  )
}
