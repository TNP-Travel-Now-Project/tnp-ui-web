import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import PageContainer from '@/shared/components/layout/page-container'

export default function HeroSection({ onBack: openHome }: { onBack: () => void }) {
  return (
    <section className='relative bg-transparent mb-12'>
      <PageContainer className='relative px-5 z-10'>
        <button
          type='button'
          onClick={openHome}
          className='flex items-center gap-2 text-neutral-2 hover:text-primary transition-colors font-bold mb-12 pt-8 group'
        >
          <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
          Quay lại trang chủ
        </button>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='space-y-6'
          >
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider'>
              <Sparkles className='w-3 h-3' />
              Về chúng tôi
            </div>
            <h1 className='text-neutral-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight'>
              Tận hưởng mọi <br />
              <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-safety-orange'>
                hành trình
              </span>{' '}
              cùng nhau.
            </h1>
            <p className='text-neutral-20 text-base sm:text-lg md:text-xl font-medium leading-relaxed'>
              chudu4be không chỉ là một ứng dụng lập kế hoạch du lịch. Chúng tôi là người bạn đồng
              hành số, giúp kết nối đam mê và xóa tan mọi rắc rối trong những chuyến đi nhóm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='relative'
          >
            <div className='aspect-4/3 rounded-4xl overflow-hidden shadow-2xl relative z-10'>
              <img
                src='https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2000&auto=format&fit=crop'
                alt='Travel with friends'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='absolute -top-3 right-0 w-full h-full bg-neutral-0 rounded-4xl -z-10 mt-3 ml-3'></div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  )
}
