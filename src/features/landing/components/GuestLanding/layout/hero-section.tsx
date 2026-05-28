import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Star, Users } from 'lucide-react'
import Image from 'next/image'
import { Badge, Button } from '@/shared/components/common'
import PageContainer from '@/shared/components/layout/page-container'

export default function HeroSection({ onLogin }: { onLogin: () => void }) {
  
  return (
    <section
      id='home'
      className='relative pt-28 pb-20 md:pt-20 md:pb-32 overflow-hidden flex items-center min-h-[90vh]'
    >
      <PageContainer className='relative px-5 z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center'>
          {/* Left Column: Content */}
          <div className='space-y-8 text-center lg:text-left order-1 lg:order-1'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='flex justify-center lg:justify-start'
            >
              <Badge
                variant='secondary'
                className='px-4 h-9 items-center rounded-lg text-sm font-semibold flex gap-2 border-primary/20 bg-primary/5 text-primary shadow-sm hover:bg-primary/10 transition-colors'
              >
                <Sparkles className='w-4 h-4' />
                Công cụ đồng hành du lịch số #1 Việt Nam
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='text-4xl sm:text-5xl md:text-7xl lg:text-[52px] font-extrabold text-neutral-10 tracking-tight leading-[1.1] lg:leading-[1.05]'
            >
              Mọi chuyến đi đều trở nên{' '}
              <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-600'>
                tuyệt vời hơn
              </span>{' '}
              khi đi cùng nhau.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='text-base md:text-xl text-neutral-20 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed'
            >
              Quản lý lịch trình, chia sẻ chi phí, và liên lạc không gián đoạn trong một nền tảng
              duy nhất. Tạm biệt những bảng tính rắc rối.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 pt-4'
            >
              <Button
                size='lg'
                onClick={onLogin}
                className='flex-1 sm:flex-none h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-base text-white font-bold rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group max-w-45'
              >
                Bắt đầu
                <ArrowRight className='ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='flex-1 sm:flex-none h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-base font-bold rounded-lg border-2 hover:bg-slate-50 transition-all max-w-45'
                onClick={() =>
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Xem cách làm
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='pt-6 flex flex-col items-center lg:items-start gap-4'
            >
              <div className='flex -space-x-3 justify-center lg:justify-start'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className='w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm'
                  >
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt='User avatar' />
                  </div>
                ))}
              </div>
              <div className='flex flex-col items-center lg:items-start gap-1'>
                <div className='flex text-amber-400'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className='w-4 h-4 fill-current' />
                  ))}
                </div>
                <span className='text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest text-center lg:text-left'>
                  Được yêu thích bởi 10,000+ tín đồ xê dịch
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Preview */}
          <div className='relative order-2 lg:order-2'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className='relative z-10'
            >
              <div className='relative lg:w-145 rounded-2xl md:rounded-3xl p-2 md:p-3 bg-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-900/5'>
                <div className='aspect-4/3 rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-inner relative'>
                  <Image
                    fill
                    sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw'
                    src=''
                    alt='App Interface'
                    className='w-full lg:w-139 h-full object-cover opacity-95 transition-all duration-700 hover:scale-100'
                  />
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.3 }}
                className='absolute -top-6 -right-6 md:-right-20 z-20 bg-white p-3 md:p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-100'
              >
                <div className='w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200'>
                  <CheckCircle2 size={20} />
                </div>
                <div className='hidden sm:block'>
                  <p className='text-[10px] font-black uppercase text-slate-400'>Thanh toán</p>
                  <p className='text-sm font-black text-slate-900'>Chia xong 100%</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.3 }}
                className='absolute -bottom-6 -left-6 md:-left-8 z-20 bg-white p-3 md:p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-100'
              >
                <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20'>
                  <Users size={20} />
                </div>
                <div className='hidden sm:block'>
                  <p className='text-[10px] font-black uppercase text-slate-400'>Thành viên</p>
                  <p className='text-sm font-black text-slate-900'>+4 người vừa tham gia</p>
                </div>
              </motion.div>

              {/* Decorative background element behind image */}
              <div className='absolute -inset-4 bg-linear-to-tr from-primary/20 to-violet-500/20 blur-2xl -z-10 rounded-[3rem]'></div>
            </motion.div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
