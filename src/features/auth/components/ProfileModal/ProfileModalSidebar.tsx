'use client'

import { motion } from 'framer-motion'
import { TABS } from './profile-modal.constants'
import type { TabType } from './profile-modal.types'

interface ProfileModalSidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export default function ProfileModalSidebar({ activeTab, onTabChange }: ProfileModalSidebarProps) {
  return (
    <div className='w-14 sm:w-16 md:w-20 bg-surface-container flex flex-col items-center py-8 border-r border-outline-variant/30 flex-shrink-0'>
      <div className='flex-1 flex flex-col gap-4'>
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative group p-3 sm:p-4 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-outline/60 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <Icon className='size-5 sm:size-6' />
              {isActive && (
                <motion.div
                  layoutId='active-nav-dot'
                  className='absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(201,153,107,1)]'
                />
              )}
              <div className='absolute left-full ml-4 px-3 py-1.5 bg-on-surface text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl hidden md:block'>
                {tab.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
