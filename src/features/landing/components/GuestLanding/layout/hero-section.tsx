import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Star, Users } from 'lucide-react'
import { Badge, Button } from '@/shared/components/common'

export default function HeroSection({ onLogin }: { onLogin: () => void }) {
  return (
    <section
      id='home'
      className='relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden flex items-center min-h-[90vh]'
    >
      <div className='absolute top-1/4 left-0 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob'></div>
      <div className='absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000'></div>
      <div className='absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000'></div>

      <div className='container max-w-7xl mx-auto px-5 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
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
                className='px-4 h-[36px] items-center rounded-lg text-sm font-semibold flex gap-2 border-primary/20 bg-primary/5 text-primary shadow-sm hover:bg-primary/10 transition-colors'
              >
                <Sparkles className='w-4 h-4' />
                Công cụ đồng hành du lịch số #1 Việt Nam
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='text-4xl sm:text-5xl md:text-7xl lg:text-[74px] font-extrabold text-slate-900 tracking-tight leading-[1.1] lg:leading-[1.05]'
            >
              Mọi chuyến đi đều trở nên{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600'>
                tuyệt vời hơn
              </span>{' '}
              khi đi cùng nhau.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='text-base md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed'
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
                className='flex-1 sm:flex-none h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-base font-bold rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group max-w-[200px]'
              >
                Bắt đầu
                <ArrowRight className='ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='flex-1 sm:flex-none h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-base font-bold rounded-lg border-2 hover:bg-slate-50 transition-all max-w-[200px]'
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
              <div className='relative lg:w-[580px] rounded-2xl md:rounded-3xl p-2 md:p-3 bg-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-900/5'>
                <div className='aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-inner relative'>
                  <img
                    src='https://www.asherfergusson.com/wp-content/uploads/2020/03/italy-landscape-1000x320.jpg'
                    alt='App Interface'
                    className='w-full lg:w-[556px] h-full object-cover opacity-95 transition-all duration-700 hover:scale-105'
                  />
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                // transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className='absolute -top-6 -right-6 md:-right-8 z-20 bg-white p-3 md:p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-100'
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
                // transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
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
              <div className='absolute -inset-4 bg-gradient-to-tr from-primary/20 to-violet-500/20 blur-2xl -z-10 rounded-[3rem]'></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
