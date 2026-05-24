import { motion } from 'framer-motion'
import { Clock, Mail, Phone } from 'lucide-react'

export default function InfoColumns() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className='md:col-span-4 lg:col-span-3'
    >
      <div className='grid grid-cols-3 md:grid-cols-1 gap-4 sm:gap-6 md:gap-10'>
        <div className='flex flex-col md:flex-row md:items-start gap-3 md:gap-6 text-center md:text-left group'>
          <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mx-auto md:mx-0 group-hover:scale-110 transition-transform'>
            <Mail size={22} className='md:w-6 md:h-6' />
          </div>
          <div className='space-y-1 min-w-0'>
            <h4 className='text-xs md:text-lg font-bold text-neutral-0'>Email</h4>
            <p className='text-[9px] sm:text-[10px] md:text-base text-neutral-2 font-medium italic break-all leading-tight'>
              contact@chudu4be.vn
            </p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:items-start gap-3 md:gap-6 text-center md:text-left group'>
          <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mx-auto md:mx-0 group-hover:scale-110 transition-transform'>
            <Phone size={22} className='md:w-6 md:h-6' />
          </div>
          <div className='space-y-1 min-w-0'>
            <h4 className='text-xs md:text-lg font-bold text-neutral-0'>Điện thoại</h4>
            <p className='text-[9px] sm:text-[10px] md:text-base text-neutral-2 font-medium italic leading-tight'>
              +84 901 234 567
            </p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:items-start gap-3 md:gap-6 text-center md:text-left group'>
          <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mx-auto md:mx-0 group-hover:scale-110 transition-transform'>
            <Clock size={22} className='md:w-6 md:h-6' />
          </div>
          <div className='space-y-1 min-w-0'>
            <h4 className='text-xs md:text-lg font-bold text-neutral-0'>Giờ làm</h4>
            <p className='text-[9px] sm:text-[10px] md:text-base text-neutral-2 font-medium leading-tight'>
              T2 - T6: 8h-18h
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
