import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Globe, Hash, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/shared/components/common'

export default function TestimonialsSection() {
  return (
    <section id='testimonials' className='py-16 md:py-24 bg-white overflow-hidden'>
      <div className='container max-w-6xl mx-auto px-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center'>
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='relative max-w-70 sm:max-w-md mx-auto sm:mx-0 w-full'
          >
            <div className='aspect-4/5 sm:aspect-square md:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl relative z-10'>
              <Image
                fill
                alt='Customer'
                className='object-cover'
                sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw'
                src='https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2000&auto=format&fit=crop'
              />
            </div>

            <div className='absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-full h-full bg-slate-50 rounded-3xl -z-10 mt-3 sm:mt-5 ml-3 sm:ml-5'></div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='space-y-6 md:space-y-8'
          >
            <div className='space-y-3 md:space-y-4'>
              <p className='text-amber-500 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs'>
                Testimonials
              </p>
              <h2 className='text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight'>
                Khách hàng nói gì về chúng tôi?
              </h2>
            </div>

            <div className='space-y-4 md:space-y-6'>
              <div className='flex flex-row items-center justify-between gap-4'>
                <h4 className='text-sm md:text-lg font-bold text-slate-900 border-b-2 border-amber-500 pb-1 inline-block'>
                  Đánh giá:
                </h4>
                <div className='flex text-amber-500'>
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className='w-3 h-3 md:w-5 md:h-5 fill-current' />
                  ))}
                </div>
              </div>

              <p className='text-slate-500 text-sm sm:text-base md:text-xl font-medium leading-relaxed italic'>
                &quotDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.&quot
              </p>

              <div className='flex items-center justify-between pt-4 md:pt-6 border-t border-slate-100'>
                <div className='space-y-0.5 md:space-y-1'>
                  <h5 className='text-base md:text-xl font-black text-amber-500'>Jack Kelly</h5>
                  <p className='text-slate-400 font-bold text-[10px] md:text-sm uppercase tracking-wide'>
                    Giám đốc Colorlib
                  </p>
                </div>
                <div className='flex gap-2 md:gap-4'>
                  <a
                    href='#network'
                    className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors'
                  >
                    <Globe className='w-4 h-4 md:w-5 md:h-5' />
                  </a>
                  <a
                    href='#network'
                    className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors'
                  >
                    <Hash className='w-4 h-4 md:w-5 md:h-5' />
                  </a>
                </div>
              </div>

              {/* Pagination & Controls */}
              <div className='flex items-center justify-between pt-8 md:pt-12'>
                <div className='flex items-center gap-2 md:gap-4 text-slate-900 font-black text-lg md:text-2xl group cursor-pointer'>
                  <span>03</span>
                  <div className='w-10 md:w-16 h-1 bg-amber-500'></div>
                  <span className='text-slate-300'>04</span>
                </div>
                <div className='flex gap-2 md:gap-4'>
                  <Button className='w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all'>
                    <ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
                  </Button>
                  <Button className='w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all'>
                    <ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
