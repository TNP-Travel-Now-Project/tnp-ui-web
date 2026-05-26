import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Globe, Hash, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/components/common'
import type { TestimonialItem } from '@/features/landing/types/landing.type'

interface TestimonialProps {
  currentCustomer: TestimonialItem
  totalCustomers: number
  handleNext: () => void
  handlePrev: () => void
}

export default function TestimonialsSection({
  currentCustomer,
  totalCustomers,
  handleNext,
  handlePrev,
}: TestimonialProps) {
  return (
    <section id='testimonials' className='py-16 md:py-24 bg-green-bright overflow-hidden'>
      <div className='container max-w-6xl mx-auto px-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center'>
          {/* Left Column */}
          <div className='relative max-w-70 sm:max-w-md mx-auto sm:mx-0 w-full'>
            <div className='aspect-4/5 sm:aspect-square md:aspect-4/5 rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-neutral-0'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentCustomer.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className='relative w-full h-full'
                >
                  <Image
                    fill
                    alt={currentCustomer.name}
                    className='object-cover'
                    sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw'
                    src={currentCustomer.avatar}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bóng nền đằng sau ảnh - Đã đổi từ bg-slate-50 sang bg-neutral-5 */}
            <div className='absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-full h-full bg-neutral-5 rounded-3xl -z-10 mt-3 sm:mt-5 ml-3 sm:ml-5'></div>
          </div>

          {/* Right Column: Content */}
          <div className='space-y-6 md:space-y-8'>
            <div className='space-y-3 md:space-y-4'>
              {/* Đổi chữ màu amber thành màu cam thương hiệu của bạn text-safety-orange */}
              <p className='text-safety-orange font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs'>
                Testimonials
              </p>
              <h2 className='text-2xl sm:text-3xl md:text-5xl font-black text-neutral-900 leading-tight'>
                Khách hàng nói gì về chúng tôi?
              </h2>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={currentCustomer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-4 md:space-y-6'
              >
                <div className='flex flex-row items-center justify-between gap-4'>
                  <h4 className='text-sm md:text-lg font-bold text-neutral-900 border-b-2 border-safety-orange pb-1 inline-block'>
                    Đánh giá:
                  </h4>
                  <div className='flex text-safety-orange'>
                    {Array.from({ length: currentCustomer.rating }).map((_, idx) => (
                      <Star key={idx.toString()} className='w-3 h-3 md:w-5 md:h-5 fill-current' />
                    ))}
                  </div>
                </div>

                {/* Nội dung đánh giá */}
                <p className='text-neutral-600 text-sm sm:text-base md:text-xl font-medium leading-relaxed italic min-h-25'>
                  {currentCustomer.testimonial}
                </p>

                {/* Thông tin người đánh giá */}
                <div className='flex items-center justify-between pt-4 md:pt-6 border-t border-neutral-10'>
                  <div className='space-y-0.5 md:space-y-1'>
                    <h5 className='text-base md:text-xl font-black text-safety-orange'>
                      {currentCustomer.name}
                    </h5>
                    <p className='text-neutral-500 font-bold text-[10px] md:text-sm uppercase tracking-wide'>
                      {currentCustomer.role}
                    </p>
                  </div>
                  <div className='flex gap-2 md:gap-4'>
                    <Link
                      href={currentCustomer.website}
                      className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-5 flex items-center justify-center text-neutral-500 hover:text-primary-teal transition-colors'
                    >
                      <Globe className='w-4 h-4 md:w-5 md:h-5' />
                    </Link>
                    <Link
                      href={currentCustomer.hashtag}
                      className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-5 flex items-center justify-center text-neutral-500 hover:text-primary-teal transition-colors'
                    >
                      <Hash className='w-4 h-4 md:w-5 md:h-5' />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination & Controls */}
            <div className='flex items-center justify-between pt-4 md:pt-8'>
              <div className='flex items-center gap-2 md:gap-4 text-neutral-900 font-black text-lg md:text-2xl'>
                <span>{currentCustomer.id}</span>
                <div className='w-10 md:w-16 h-1 bg-safety-orange'></div>
                <span className='text-neutral-20'>{String(totalCustomers).padStart(2, '0')}</span>
              </div>

              <div className='flex gap-2 md:gap-4'>
                <Button
                  onClick={handlePrev}
                  className='w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-10 flex items-center justify-center text-neutral-900 bg-neutral-0 hover:bg-safety-orange hover:text-neutral-0 hover:border-safety-orange transition-all cursor-pointer'
                >
                  <ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
                </Button>
                <Button
                  onClick={handleNext}
                  className='w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-10 flex items-center justify-center text-neutral-900 bg-neutral-0 hover:bg-safety-orange hover:text-neutral-0 hover:border-safety-orange transition-all cursor-pointer'
                >
                  <ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
