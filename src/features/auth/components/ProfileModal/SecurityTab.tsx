'use client'

import { motion } from 'framer-motion'
import { Lock, Smartphone } from 'lucide-react'

export default function SecurityTab() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className='space-y-4'>
        <div className='p-3.5 sm:p-4 bg-surface-container rounded-2xl flex items-center justify-between border border-outline-variant/10'>
          <div className='flex items-center gap-3 sm:gap-4 overflow-hidden'>
            <div className='p-2 sm:p-2.5 bg-white rounded-xl text-primary shadow-sm flex-shrink-0'>
              <Lock size={18} />
            </div>
            <div className='min-w-0'>
              <p className='text-[11px] sm:text-sm font-black'>Đổi mật khẩu</p>
              <p className='text-[10px] sm:text-xs text-outline mt-0.5 truncate'>
                Đổi định kỳ để bảo mật.
              </p>
            </div>
          </div>
          <button className='text-primary font-bold text-[10px] sm:text-sm hover:underline flex-shrink-0 ml-2'>
            Thay đổi
          </button>
        </div>

        <div className='p-3.5 sm:p-4 bg-surface-container rounded-2xl flex items-center justify-between border border-outline-variant/10'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='p-2 sm:p-2.5 bg-white rounded-xl text-primary shadow-sm'>
              <Smartphone size={18} />
            </div>
            <div>
              <p className='text-[11px] sm:text-sm font-black'>Xác thực 2 lớp (2FA)</p>
              <p className='text-[10px] sm:text-xs text-outline mt-0.5'>Đang bật (SĐT: ****920)</p>
            </div>
          </div>
          <button className='text-error font-bold text-[10px] sm:text-sm hover:underline flex-shrink-0'>
            Tắt
          </button>
        </div>

        <div className='space-y-3 pt-4'>
          <h4 className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-outline'>
            Thiết bị đã đăng nhập
          </h4>
          <div className='space-y-2.5'>
            {[1, 2].map((i) => (
              <DeviceItem key={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DeviceItem() {
  return (
    <div className='flex items-center justify-between p-3 border border-outline-variant/30 rounded-xl bg-surface/30'>
      <div className='flex items-center gap-2.5'>
        <Smartphone size={14} className='text-outline/60' />
        <div>
          <p className='text-[10px] sm:text-xs font-black'>iPhone 15 Pro • TP. Hồ Chí Minh</p>
          <p className='text-[9px] sm:text-[10px] text-outline'>Đang hoạt động • 12 phút trước</p>
        </div>
      </div>
      <button className='text-[9px] sm:text-[10px] font-bold text-error flex-shrink-0 bg-error/5 px-2 py-1 rounded-[4px]'>
        Đăng xuất
      </button>
    </div>
  )
}
