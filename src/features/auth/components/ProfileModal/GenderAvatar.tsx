'use client'

import { Camera } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/overlay'
import type { Gender, GenderAvatarProps } from './profile-modal.types'
import {
  GENDER_BG,
  GENDER_HOVER_BG,
  GENDER_ICONS,
  GENDER_OPTIONS,
} from './profile-modal.constants'

export default function GenderAvatar({ gender, onGenderChange }: GenderAvatarProps) {
  const [avatar, setAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2TLzey_rvR3RLYd4skh0wp5_tpZnVFMr2v_QT9m_Zq5K50hDUKa36YQYikfcaJDSZ3Xsyi_FPFY3JlEGRZdanoVBlvbf-e6K_ta28M-cT5xK1ZbRMAF_NP7K0OEKyagXrs8lx3J5NwN31tgmEFYDTMnRut620qsRhK2CGci86ZL8DjHPgFKz3nKNloBFTB7VS0U436bLxxc6mA33uNiv6ZavY-O8D_kNHWgjdPULdHBICM5Lr51NHawrn8A9kOAPQvH_P_lVF7Ld4',
  )

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const newAvatar = event.target.result as string
          setAvatar(newAvatar)
          const img = document.getElementById('profile-avatar-img') as HTMLImageElement
          if (img) img.src = newAvatar
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const otherOptions = GENDER_OPTIONS.filter((g) => g !== gender)

  return (
    <div className='relative'>
      <div className='relative group cursor-pointer'>
        <div
          onClick={() => (document.getElementById('avatar-input') as HTMLInputElement)?.click()}
          className='w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-primary/10 relative z-0'
        >
          <img
            src={avatar}
            alt='Profile'
            className='w-full h-full object-cover'
            id='profile-avatar-img'
          />
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <Camera size={20} className='text-white' />
          </div>
        </div>

        <div className='absolute -top-0.5 -right-0.5 z-30'>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[12px] sm:text-[13px] font-black transition-all outline-none ring-0 text-white ${GENDER_BG[gender]}`}
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className='flex items-center justify-center pointer-events-none'
                >
                  {GENDER_ICONS[gender]}
                </motion.span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side='right'
              align='center'
              sideOffset={10}
              className='p-0 border-none shadow-none bg-transparent w-auto'
            >
              <motion.div
                initial={{ opacity: 0, x: -15, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className='flex flex-row items-center gap-1.5 p-1.5 bg-white rounded-full shadow-2xl border border-outline-variant/10 relative'
                style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))' }}
              >
                {otherOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => onGenderChange(opt)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xl font-black transition-all hover:scale-110 active:scale-95 ${GENDER_HOVER_BG[opt]}`}
                  >
                    {GENDER_ICONS[opt]}
                  </button>
                ))}

                <div className='absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-outline-variant/10' />
                <div className='absolute top-[40%] -left-3.5 w-2.5 h-2.5 bg-white rounded-full opacity-70' />
                <div className='absolute top-[60%] -left-5 w-1.5 h-1.5 bg-white rounded-full opacity-40' />
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <input
        type='file'
        id='avatar-input'
        onChange={handleAvatarChange}
        accept='image/jpeg, image/png'
        className='hidden'
      />
    </div>
  )
}
