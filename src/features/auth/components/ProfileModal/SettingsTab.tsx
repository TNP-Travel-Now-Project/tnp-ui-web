'use client'

import { Globe, Languages, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SettingsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-6'
    >
      <div className='space-y-4'>
        <h4 className='text-xs font-black uppercase tracking-widest text-outline'>
          Giao diện & Trải nghiệm
        </h4>

        <div className='p-4 bg-surface-container rounded-2xl border border-outline-variant/10 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-white rounded-xl text-primary shadow-sm'>
              <Moon size={18} />
            </div>
            <div>
              <p className='text-sm font-black'>Chế độ tối (Dark Mode)</p>
              <p className='text-xs text-outline mt-0.5'>Tiết kiệm pin và dịu mắt hơn.</p>
            </div>
          </div>
          <button className='w-10 h-5.5 rounded-full bg-outline-variant/40 relative'>
            <div className='absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full shadow-sm' />
          </button>
        </div>

        <div className='p-4 bg-surface-container rounded-2xl border border-outline-variant/10 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-white rounded-xl text-primary shadow-sm'>
              <Languages size={18} />
            </div>
            <div>
              <p className='text-sm font-black'>Ngôn ngữ</p>
              <p className='text-xs text-outline mt-0.5'>Tiếng Việt (Mặc định)</p>
            </div>
          </div>
          <button className='text-primary font-bold text-sm hover:underline'>Thay đổi</button>
        </div>
      </div>

      <div className='space-y-4 pt-4'>
        <h4 className='text-xs font-black uppercase tracking-widest text-outline'>
          Dữ liệu & Quyền riêng tư
        </h4>

        <div className='p-4 bg-surface-container rounded-2xl border border-outline-variant/10 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='p-2 bg-white rounded-xl text-primary shadow-sm'>
              <Globe size={18} />
            </div>
            <div>
              <p className='text-sm font-black'>Vùng & Quốc gia</p>
              <p className='text-xs text-outline mt-0.5'>Việt Nam (UTC+7)</p>
            </div>
          </div>
          <button className='text-primary font-bold text-sm hover:underline'>Thay đổi</button>
        </div>
      </div>
    </motion.div>
  )
}
