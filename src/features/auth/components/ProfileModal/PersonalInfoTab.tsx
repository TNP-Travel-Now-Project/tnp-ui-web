'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DatePickerWithTime } from '@/shared/components/composite/DatePickerWithTime'
import { Label } from '@/shared/components/ui/form/label'
import GenderAvatar from './GenderAvatar'
import type { Gender } from './profile-modal.types'

export default function PersonalInfoTab() {
  const [gender, setGender] = useState<Gender>('Nam')
  const [birthday, setBirthday] = useState<Date | null>(new Date('1995-10-24'))

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-4'
    >
      <div className='flex items-start justify-between gap-6'>
        <div className='space-y-1.5 flex-1'>
          <Label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Tên đầy đủ
          </Label>
          <input
            type='text'
            defaultValue='Tuấn Nguyễn'
            className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
          />
        </div>
        <GenderAvatar gender={gender} onGenderChange={setGender} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
        <div className='space-y-1.5'>
          <Label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Username
          </Label>
          <input
            type='text'
            defaultValue='tuan.explorer'
            className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
          />
        </div>
        <div className='space-y-1.5'>
          <Label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Số điện thoại
          </Label>
          <input
            type='tel'
            defaultValue='0987 654 321'
            className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
        <div className='space-y-1.5'>
          <Label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>
            Ngày sinh
          </Label>
          <div className='h-[38px] sm:h-[42px]'>
            <DatePickerWithTime date={birthday} onChange={setBirthday} />
          </div>
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label className='text-[10px] sm:text-xs font-bold text-on-surface opacity-60'>Bio</Label>
        <textarea
          className='w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none h-20 sm:h-24 resize-none transition-all leading-relaxed'
          placeholder='Hãy giới thiệu một chút về bạn...'
        />
      </div>

      <div className='flex justify-end pt-2'>
        <button className='w-full sm:w-auto px-10 py-2 sm:py-2.5 bg-primary text-white rounded-lg font-black text-xs shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95'>
          Lưu thay đổi
        </button>
      </div>
    </motion.div>
  )
}
