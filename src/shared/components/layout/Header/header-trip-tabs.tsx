import { motion } from 'framer-motion'
import type { RefObject } from 'react'
import { Button } from '@/shared/components/common/Button'
import { tripDetailTabs } from '@/shared/constants/sidebar.constant'

export interface HeaderTripTabsProps {
  isMobile?: boolean
  activeTab?: string
  tabsRef?: RefObject<HTMLDivElement | null>
  handleTabClick?: (tab: string) => void
}

export default function HeaderTripTabs({
  isMobile,
  activeTab,
  tabsRef,
  handleTabClick,
}: HeaderTripTabsProps) {
  if (isMobile) {
    return (
      <div className='lg:hidden bg-card border-b border-border/30 sticky top-16 z-30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]'>
        <div
          ref={tabsRef}
          className='flex gap-8 px-4 md:px-8 overflow-x-auto hide-scrollbar max-w-7xl mx-auto w-full'
        >
          {tripDetailTabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => handleTabClick?.(tab)}
              className={`relative px-1 py-4 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab
                  ? 'text-primary scale-105'
                  : 'text-muted-foreground/70 hover:text-foreground'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId='activeTabIndicator'
                  className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_-2px_4px_rgba(201,153,107,0.3)]'
                />
              )}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 hidden lg:flex justify-start h-full items-center ml-8 gap-1 border-l border-neutral-0'>
      <div ref={tabsRef} className='flex gap-8 px-4 h-full items-center'>
        {tripDetailTabs.map((tab) => (
          <Button
            key={tab}
            variant={'ghost'}
            onClick={() => handleTabClick?.(tab)}
            className={`relative p-1 text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center hover:bg-transparent 
              ${
                activeTab === tab
                  ? 'text-primary'
                  : 'text-muted-foreground/70 hover:text-foreground'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId='activeTabIndicatorHeader'
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_-2px_4px_rgba(201,153,107,0.3)]'
              />
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
