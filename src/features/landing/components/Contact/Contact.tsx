import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, ArrowLeft, MessageSquare, Clock } from 'lucide-react'
import Header from '@/shared/components/layout/Header/Header'
import { Button } from '@/shared/components/common'

interface ContactProps {
  onBack: () => void
  onLogin: () => void
  onRegister: () => void
  isLoggedIn: boolean
  onMenuClick: () => void
  onNavigateHome?: () => void
}

export default function Contact({
  onBack,
  onLogin,
  onRegister,
  isLoggedIn,
  onMenuClick,
  onNavigateHome,
}: ContactProps) {
  return (
    <div className='min-h-screen bg-white font-sans'>
      <Header
        onMenuClick={onMenuClick}
        onProfileClick={() => {}}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLogin}
        onRegisterClick={onRegister}
        onNavigateHome={onNavigateHome}
      />

      <main className='pt-12 pb-20'>
        <div className='container max-w-6xl mx-auto px-5'>
          <button
            onClick={onBack}
            className='flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold mb-8 group'
          >
            <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
            Quay lại
          </button>

          <div className='space-y-12'>
            {/* Header: Title and Sub-text (Split on tablet/desktop) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center md:text-left max-w-2xl'
            >
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6'>
                Hãy kết nối với <span className='text-primary'>chudu4be</span>
              </h1>
              <p className='text-slate-600 text-base md:text-lg font-medium leading-relaxed'>
                Bạn có thắc mắc, góp ý hay muốn hợp tác? Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-10 gap-10 lg:gap-16 items-start'>
              {/* Info Items Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='md:col-span-4 lg:col-span-3'
              >
                <div className='grid grid-cols-3 md:grid-cols-1 gap-4 sm:gap-6 md:gap-10'>
                  {/* Email */}
                  <div className='flex flex-col md:flex-row md:items-start gap-3 md:gap-6 text-center md:text-left group'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mx-auto md:mx-0 group-hover:scale-110 transition-transform'>
                      <Mail size={22} className='md:w-6 md:h-6' />
                    </div>
                    <div className='space-y-1 min-w-0'>
                      <h4 className='text-xs md:text-lg font-bold text-slate-900'>Email</h4>
                      <p className='text-[9px] sm:text-[10px] md:text-base text-slate-500 font-medium italic break-all leading-tight'>
                        contact@chudu4be.vn
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className='flex flex-col md:flex-row md:items-start gap-3 md:gap-6 text-center md:text-left group'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mx-auto md:mx-0 group-hover:scale-110 transition-transform'>
                      <Phone size={22} className='md:w-6 md:h-6' />
                    </div>
                    <div className='space-y-1 min-w-0'>
                      <h4 className='text-xs md:text-lg font-bold text-slate-900'>Điện thoại</h4>
                      <p className='text-[9px] sm:text-[10px] md:text-base text-slate-500 font-medium italic leading-tight'>
                        +84 901 234 567
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className='flex flex-col md:flex-row md:items-start gap-3 md:gap-6 text-center md:text-left group'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mx-auto md:mx-0 group-hover:scale-110 transition-transform'>
                      <Clock size={22} className='md:w-6 md:h-6' />
                    </div>
                    <div className='space-y-1 min-w-0'>
                      <h4 className='text-xs md:text-lg font-bold text-slate-900'>Giờ làm</h4>
                      <p className='text-[9px] sm:text-[10px] md:text-base text-slate-500 font-medium leading-tight'>
                        T2 - T6: 8h-18h
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form Column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='md:col-span-6 lg:col-span-7 bg-slate-50 rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-sm border border-slate-100'
              >
                <form className='space-y-6'>
                  <div className='space-y-2'>
                    <label className='text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider'>
                      Họ và tên
                    </label>
                    <input
                      type='text'
                      placeholder='Nguyễn Văn A'
                      className='w-full h-12 md:h-14 px-5 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-sm md:text-base'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider'>
                      Địa chỉ Email
                    </label>
                    <input
                      type='email'
                      placeholder='email@example.com'
                      className='w-full h-12 md:h-14 px-5 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-sm md:text-base'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider'>
                      Nội dung tin nhắn
                    </label>
                    <textarea
                      rows={4}
                      placeholder='Bạn đang nghĩ gì...'
                      className='w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium resize-none text-sm md:text-base'
                    ></textarea>
                  </div>

                  <Button className='w-full h-12 md:h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg shadow-xl shadow-primary/20 transition-all group'>
                    Gửi lời nhắn
                    <Send className='ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <footer className='py-10 text-center text-slate-400 text-sm font-medium border-t border-slate-50'>
        © 2024 chudu4be - Luôn sẵn sàng hỗ trợ bạn
      </footer>
    </div>
  )
}
