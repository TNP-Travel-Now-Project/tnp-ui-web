'use client'

import { motion } from 'framer-motion'
import { Bell, Mail, MessageSquare } from 'lucide-react'
import { useState } from 'react'

interface NotificationSetting {
  id: string
  title: string
  desc: string
  icon: typeof Bell
  enabled: boolean
}

const DEFAULT_SETTINGS: NotificationSetting[] = [
  {
    id: 'email',
    title: 'Thông báo Email',
    desc: 'Nhận tóm tắt chi phí qua email',
    icon: Mail,
    enabled: true,
  },
  {
    id: 'push',
    title: 'Thông báo Push',
    desc: 'Cập nhật chuyến đi trên điện thoại',
    icon: Bell,
    enabled: true,
  },
  {
    id: 'chat',
    title: 'Tin nhắn nhóm',
    desc: 'Hiển thị tin nhắn riêng tư',
    icon: MessageSquare,
    enabled: false,
  },
]

export default function NotificationsTab() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const toggleSetting = (id: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className='space-y-4'>
        {settings.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className='flex items-center justify-between p-3 border border-outline-variant/10 rounded-2xl bg-surface-container/30'
            >
              <div className='flex items-center gap-3 sm:gap-4'>
                <div className='p-2 sm:p-2.5 bg-surface-container rounded-xl text-primary shadow-inner'>
                  <Icon size={18} />
                </div>
                <div>
                  <p className='text-[11px] sm:text-sm font-black'>{item.title}</p>
                  <p className='text-[9px] sm:text-xs text-outline font-medium mt-0.5'>
                    {item.desc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting(item.id)}
                className={`w-9 h-5 sm:w-10 sm:h-5.5 rounded-full relative transition-all duration-300 ${item.enabled ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-outline-variant/40'}`}
              >
                <div
                  className={`absolute top-1 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-white rounded-full transition-all shadow-sm ${item.enabled ? 'right-1' : 'left-1'}`}
                />
              </button>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
