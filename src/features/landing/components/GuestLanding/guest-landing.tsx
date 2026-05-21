import { motion } from 'framer-motion'
import { useState } from 'react'
import { Plane, Users, Heart, Star, Globe, Hash, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/shared/components/layout/Header/Header'
import { Button } from '@/shared/components/common'
import { faqs, planedUps, timelineTrips } from '@/features/landing/contants/landing.constant'
import HeroSection from '@/features/landing/components/GuestLanding/layout/hero-section'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/layout/accordion'
import Image from 'next/image'

interface GuestLandingProps {
  onLogin: () => void
  onRegister: () => void
  onMenuClick: () => void
  onNavigateAbout: () => void
  onNavigateHome?: () => void
  onNavigateContact?: () => void
}

export default function GuestLanding({
  onLogin,
  onRegister,
  onMenuClick,
  onNavigateAbout,
  onNavigateHome,
  onNavigateContact,
}: GuestLandingProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null)
  const [activePlace, setActivePlace] = useState<number | null>(null)

  return (
    <div className='min-h-screen bg-background font-sans'>
      <Header
        onMenuClick={onMenuClick}
        onProfileClick={() => {}}
        isLoggedIn={false}
        onLoginClick={onLogin}
        onRegisterClick={onRegister}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateContact={onNavigateContact}
      />

      {/* Hero Section */}
      <HeroSection onLogin={onLogin} />

      {/* Popular Places Section */}
      <section id='popular-places' className='bg-white'>
        <div className='text-center py-16 px-4'>
          <p className='text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4'>
            Khơi nguồn cảm hứng
          </p>
          <h2 className='text-2xl md:text-5xl font-bold text-slate-900 mb-8 font-sans leading-snug'>
            Cùng lên kế hoạch cho điểm đến tiếp theo
          </h2>
          <div className='w-12 h-[2px] bg-slate-200 mx-auto'></div>
        </div>

        <div className='w-full grid grid-cols-2 md:flex h-auto md:h-[340px] lg:h-[420px]'>
          {planedUps.map((place, idx) => (
            <button
              type='button'
              key={place.title}
              className='relative flex-1 group overflow-hidden h-40 sm:h-52 md:h-full cursor-pointer touch-manipulation appearance-none border-none bg-transparent p-0 text-left'
              onClick={() => setActivePlace(activePlace === idx ? null : idx)}
            >
              <Image
                fill
                src={place.img}
                alt={place.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${activePlace === idx ? 'scale-110' : 'group-hover:scale-110'}`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b from-[#2c4c41]/80 to-[#1e342c]/90 transition-opacity duration-300 flex flex-col items-center justify-end pb-8 px-4 text-center ${activePlace === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <p
                  className={`text-white text-[9px] font-bold uppercase tracking-[0.2em] mb-2 transform transition-all duration-500 delay-100 ${activePlace === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}
                >
                  {place.subtitle}
                </p>
                <h3
                  className={`text-white text-sm md:text-xl font-bold leading-snug transform transition-all duration-500 delay-150 ${activePlace === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}
                >
                  {place.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How it Works Section - Fully Responsive Timeline Layout */}
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

                  {/* Visual (Image) */}
                  <div
                    className={`w-full lg:w-1/2 pl-16 lg:pl-0 ${step.align === 'left' ? 'lg:order-1 lg:pr-20' : 'lg:order-2 lg:pl-20'}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className='relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 max-w-[240px] sm:max-w-none mx-auto sm:mx-0'
                    >
                      <Image
                        fill
                        src={step.img}
                        alt={step.title}
                        className='w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700'
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id='testimonials' className='py-16 md:py-24 bg-white overflow-hidden'>
        <div className='container max-w-6xl mx-auto px-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center'>
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='relative max-w-[280px] sm:max-w-md mx-auto sm:mx-0 w-full'
            >
              <div className='aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10'>
                <Image
                  fill
                  src='https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2000&auto=format&fit=crop'
                  alt='Customer'
                  className='w-full h-full object-cover'
                />
              </div>
              {/* Decorative Background Shape */}
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
                  &quotDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.&quot
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
                      href='#'
                      className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors'
                    >
                      <Globe className='w-4 h-4 md:w-5 md:h-5' />
                    </a>
                    <a
                      href='#'
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
                    <button className='w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all'>
                      <ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
                    </button>
                    <button className='w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all'>
                      <ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id='faq' className='py-24 bg-slate-50'>
        <div className='container max-w-3xl mx-auto px-4 md:px-6'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4'>
              Câu hỏi thường gặp
            </h2>
            <p className='text-slate-600 text-lg'>
              Mọi thắc mắc của bạn đều được giải đáp tại đây.
            </p>
          </div>

          <Accordion className='w-full bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-2'>
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={faq.value}
                value={faq.value}
                className='border-b-slate-100 last:border-0 py-2'
              >
                <AccordionTrigger className='text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-slate-600 text-base leading-relaxed'>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 px-4 md:px-6 relative overflow-hidden bg-primary'>
        {/* Simplified Dashboard Background Overlay */}
        <div className='absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none select-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-125'>
            <img
              src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'
              alt='UI Background'
              className='w-full h-full object-cover blur-[0.5px]'
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

      {/* Footer */}
      <footer className='bg-[#f2f4ef] pt-20 pb-10 px-4 md:px-6'>
        <div className='container max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 px-2 sm:px-0'>
            <div className='md:col-span-4'>
              <div className='flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start w-full gap-6'>
                <div className='space-y-4 text-left'>
                  <div className='flex items-center md:justify-start gap-2'>
                    <span className='text-2xl font-black text-primary tracking-tight'>
                      chudu4be
                    </span>
                  </div>
                  <p className='text-slate-600 font-medium leading-relaxed max-w-[180px] sm:max-w-xs text-xs sm:text-sm md:text-base'>
                    Giải pháp lập kế hoạch du lịch nhóm hàng đầu Việt Nam.
                  </p>
                </div>

                {/* Creator Profile - Right on Mobile, Below on Tablet/Desktop */}
                <div
                  onClick={onNavigateAbout}
                  className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/50 rounded-2xl border border-white/80 shadow-sm cursor-pointer hover:bg-white hover:border-primary/30 transition-all group'
                >
                  <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden flex-shrink-0 group-hover:border-primary/50 transition-colors'>
                    <img
                      src='https://i.pravatar.cc/150?u=nguyenthanhtuan'
                      className='w-full h-full object-cover rounded-full'
                      alt='Nguyễn Thành Tuấn'
                    />
                  </div>
                  <div className='text-left'>
                    <p className='text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                      Người sáng lập
                    </p>
                    <p className='font-extrabold text-slate-800 text-xs sm:text-sm group-hover:text-primary transition-colors'>
                      Nguyễn Thành Tuấn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='md:col-span-8 grid grid-cols-3 gap-4 md:gap-12'>
              <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                <h4 className='font-bold text-slate-800 mb-6 text-sm sm:text-base'>Công ty</h4>
                <ul className='space-y-4 text-slate-500 font-medium text-xs sm:text-sm'>
                  <li>
                    <button
                      onClick={onNavigateAbout}
                      className='hover:text-primary transition-colors'
                    >
                      Về chúng tôi
                    </button>
                  </li>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      Nghề nghiệp
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      Blog du lịch
                    </a>
                  </li>
                </ul>
              </div>

              <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                <h4 className='font-bold text-slate-800 mb-6 text-sm sm:text-base'>Hỗ trợ</h4>
                <ul className='space-y-4 text-slate-500 font-medium text-xs sm:text-sm'>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      Trung tâm
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      Liên hệ
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                <h4 className='font-bold text-slate-800 mb-6 text-sm sm:text-base'>Pháp lý</h4>
                <ul className='space-y-4 text-slate-500 font-medium text-xs sm:text-sm'>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      Riêng tư
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      Điều khoản
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-primary transition-colors'>
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-between items-center text-slate-500 font-medium text-sm pt-8 border-t border-slate-200/60'>
            <p>© 2024 chudu4be. All rights reserved. Travel smarter, together.</p>
            <div className='flex items-center gap-4 mt-6 md:mt-0'>
              <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary cursor-pointer shadow-sm border border-slate-100'>
                <Plane size={15} />
              </div>
              <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary cursor-pointer shadow-sm border border-slate-100'>
                <Users size={15} />
              </div>
              <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary cursor-pointer shadow-sm border border-slate-100'>
                <Heart size={15} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
