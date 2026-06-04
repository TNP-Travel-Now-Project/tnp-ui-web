'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useModalScrollLock } from '@/shared/hook/useModalScrollLock'
import { TAB_HEADINGS } from './profile-modal.constants'
import type { ProfileModalProps, TabType } from './profile-modal.types'
import ProfileModalSidebar from './ProfileModalSidebar'
import PersonalInfoTab from './PersonalInfoTab'
import SecurityTab from './SecurityTab'
import FinanceTab from './FinanceTab'
import NotificationsTab from './NotificationsTab'
import SettingsTab from './SettingsTab'

export default function ProfileModal({
  isOpen,
  onClose,
  initialTab = 'personal',
}: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useModalScrollLock(isOpen)

  const heading = TAB_HEADINGS[activeTab]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]'
          />

          <div className='fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4'>
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className='relative bg-background w-full sm:max-w-4xl rounded-t-[32px] sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden h-[92vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh]'
            >
              <div className='px-6 py-2 sm:py-3 sm:px-8 border-b border-outline-variant/30 flex items-center justify-between bg-white z-10'>
                <h2 className='text-base sm:text-xl font-black text-on-surface tracking-tight'>
                  Cài đặt tài khoản
                </h2>
                <button
                  type='button'
                  onClick={onClose}
                  className='p-2 hover:bg-surface-container rounded-full transition-colors text-outline hover:text-on-surface'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
                </button>
              </div>

              <div className='flex-1 flex overflow-hidden'>
                <ProfileModalSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                <div className='flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 no-scrollbar bg-white'>
                  <div className='max-w-3xl mx-auto'>
                    <div className='mb-8'>
                      <h3 className='text-2xl sm:text-3xl font-black text-on-surface tracking-tighter'>
                        {heading.title}
                      </h3>
                      <p className='text-[10px] sm:text-xs text-outline font-medium mt-1'>
                        {heading.description}
                      </p>
                    </div>

                    {activeTab === 'personal' && <PersonalInfoTab />}
                    {activeTab === 'security' && <SecurityTab />}
                    {activeTab === 'finance' && <FinanceTab />}
                    {activeTab === 'notifications' && <NotificationsTab />}
                    {activeTab === 'settings' && <SettingsTab />}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
