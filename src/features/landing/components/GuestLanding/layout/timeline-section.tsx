import { motion } from 'framer-motion'
import Image from 'next/image'
import { timelineTrips } from '@/features/landing/constants/landing.constant'

export default function TimeLineSection() {
  return (
    <section id='how-it-works' className='py-20 bg-white overflow-hidden'>
      <div className='container max-w-6xl mx-auto px-4 md:px-6'>
        <div className='text-center max-w-3xl mx-auto mb-16 md:mb-20'>
          <h2 className='text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 md:mb-6'>
            Chuẩn bị chuyến đi <br className='hidden sm:block' /> trong vài phút
          </h2>
          <p className='text-base md:text-lg text-slate-600 font-medium'>
            Quy trình đơn giản, hiệu quả giúp bạn và bạn bè có một kỳ nghỉ hoàn hảo mà không tốn
            sức.
          </p>
        </div>

        <div className='relative'>
          {/* Vertical Line */}
          <div className='absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2' />

          <div className='space-y-20 lg:space-y-32'>
            {timelineTrips.map((step) => (
              <div key={step.title} className='relative flex flex-col lg:flex-row items-center'>
                {/* Timeline Node */}
                <div className='absolute left-8 lg:left-1/2 -translate-x-1/2 top-0 lg:top-1/2 lg:-translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary text-white border-2 lg:border-4 border-white shadow-lg z-10 flex items-center justify-center font-bold text-sm lg:text-base'>
                  {step.num}
                </div>

                {/* Content (Text) */}
                <div
                  className={`w-full lg:w-1/2 pl-16 lg:pl-0 mb-8 lg:mb-0 ${step.align === 'left' ? 'lg:order-2 lg:pl-20 text-left' : 'lg:order-1 lg:pr-20 lg:text-right'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='space-y-3'
                  >
                    <h3 className='text-xl md:text-3xl font-black text-slate-900 leading-tight'>
                      {step.title}
                    </h3>
                    <p className='text-slate-600 text-sm md:text-lg leading-relaxed font-medium'>
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                <div
                  className={`w-full lg:w-1/2 pl-16 lg:pl-0 ${step.align === 'left' ? 'lg:order-1 lg:pr-20' : 'lg:order-2 lg:pl-20'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='relative aspect-4/3 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 max-w-[240px] sm:max-w-none mx-auto sm:mx-0'
                  >
                    <Image
                      fill
                      src={step.img}
                      alt={step.title}
                      sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw'
                      className='object-cover transition-transform duration-700 hover:scale-105'
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
