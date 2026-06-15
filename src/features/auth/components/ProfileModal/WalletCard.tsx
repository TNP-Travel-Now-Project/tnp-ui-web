import { CreditCard, Plus } from 'lucide-react'
import { formatVND } from './profile-modal.constants'
import type { WalletItem } from './profile-modal.types'

interface WalletCardProps {
  wallet: WalletItem
}

export default function WalletCard({ wallet }: WalletCardProps) {
  return (
    <div className='p-4 sm:p-5 border border-outline-variant/30 rounded-2xl flex items-center justify-between hover:bg-surface-container hover:border-primary/30 transition-all cursor-pointer group bg-surface-container/20'>
      <div className='flex items-center gap-4 sm:gap-5'>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${wallet.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform`}
        >
          <CreditCard size={20} />
        </div>
        <div>
          <p className='text-xs sm:text-base font-black'>{wallet.name}</p>
          <p className='text-[10px] sm:text-xs text-outline font-medium'>{wallet.type}</p>
        </div>
      </div>
      <div className='text-right'>
        <p className='text-base sm:text-xl font-black text-on-surface tracking-tighter'>
          {formatVND(wallet.balance)}
        </p>
        <div className='flex items-center justify-end gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0'>
          <span className='text-[9px] font-black uppercase tracking-tighter'>Chi tiết</span>
          <Plus size={10} />
        </div>
      </div>
    </div>
  )
}
