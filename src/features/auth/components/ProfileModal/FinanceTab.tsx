'use client'

import { motion } from 'framer-motion'
import { Camera, Plus } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'
import { WALLETS } from './profile-modal.constants'
import WalletCard from './WalletCard'

export default function FinanceTab() {
  const [qrImage, setQrImage] = useState<string | null>(null)
  const qrInputRef = useRef<HTMLInputElement>(null)

  const handleQrChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setQrImage(url)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className='space-y-6'
    >
      <div className='p-4 sm:p-6 bg-primary/5 rounded-3xl border-2 border-dashed border-primary/20 flex flex-col items-center gap-4'>
        <div className='text-center'>
          <p className='text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest mb-1'>
            Mã QR Thanh toán
          </p>
          <p className='text-[9px] sm:text-[10px] text-outline font-medium'>
            Dùng để nhận tiền từ các thành viên trong nhóm
          </p>
        </div>

        <div
          onClick={() => qrInputRef.current?.click()}
          className='w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-2xl border border-outline-variant/30 shadow-inner flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all overflow-hidden relative group'
        >
          {qrImage ? (
            <img src={qrImage} alt='QR Code' className='w-full h-full object-cover' />
          ) : (
            <div className='flex flex-col items-center gap-2 opacity-40'>
              <Camera size={32} />
              <span className='text-[10px] font-bold uppercase tracking-widest'>Chọn ảnh QR</span>
            </div>
          )}
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <p className='text-white text-[10px] font-bold uppercase tracking-widest'>Thay đổi</p>
          </div>
        </div>

        <input
          type='file'
          ref={qrInputRef}
          onChange={handleQrChange}
          accept='image/*'
          className='hidden'
        />

        <div className='flex flex-col sm:flex-row gap-2 w-full'>
          <button
            onClick={() => qrInputRef.current?.click()}
            className='flex-1 px-6 py-3 bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all ring-4 ring-primary/10'
          >
            Chọn QR nhận tiền
          </button>
          <button
            onClick={() => qrInputRef.current?.click()}
            className='flex-1 px-6 py-3 border-2 border-primary text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full hover:bg-primary/5 active:scale-95 transition-all'
          >
            Cập nhật QR
          </button>
        </div>
      </div>

      <div className='space-y-3'>
        <h4 className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-outline pl-1'>
          Danh sách tài khoản
        </h4>
        {WALLETS.map((wallet) => (
          <WalletCard key={wallet.name} wallet={wallet} />
        ))}
      </div>

      <button className='flex items-center gap-2 text-primary font-black text-xs bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-all shadow-sm'>
        <Plus size={14} /> Thêm ví mới
      </button>
    </motion.div>
  )
}
