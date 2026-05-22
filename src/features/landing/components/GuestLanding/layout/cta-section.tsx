import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/shared/components/common'

export default function CTASection({ onLogin }: { onLogin: () => void }) {
  return (
    <section className='py-24 px-4 md:px-6 relative overflow-hidden bg-primary'>
      <div className='absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none select-none'>
        <div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-125'>
          <Image
            fill
            alt='UI Background'
            className='object-cover blur-[0.5px]'
            sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw'
            src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'
          />
        </div>
      </div>

      <div className='container max-w-4xl mx-auto text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='space-y-6 md:space-y-8'
        >
          <h2 className='text-2xl sm:text-3xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.2]'>
            Sẵn sàng cho chuyến phiêu lưu <br className='hidden sm:block' /> tiếp theo?
          </h2>
          <p className='text-base md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed'>
            Tham gia cộng đồng 50,000+ người dùng thông thái và bắt đầu lên kế hoạch ngay hôm nay.
          </p>
          <div className='flex flex-row justify-center items-center gap-2 sm:gap-4 pt-6'>
            <Button
              size='lg'
              onClick={onLogin}
              className='flex-1 sm:w-60 h-12 md:h-14 bg-white text-primary hover:bg-white/90 text-sm md:text-base font-bold rounded-lg shadow-lg transition-all'
            >
              Bắt đầu ngay
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='flex-1 sm:w-60 h-12 md:h-14 border-2 border-white bg-transparent text-white hover:bg-white/10 text-sm md:text-base font-bold rounded-lg transition-all'
            >
              Xem demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
