import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plane,
  Users,
  Heart,
  Sparkles,
  MapPin,
  Globe,
  ShieldCheck,
  Mail,
  ArrowLeft,
  Camera,
  Briefcase,
  Code2,
} from 'lucide-react'
import Header from '@/shared/components/layout/Header/Header'
import { Button } from '@/shared/components/common/Button'

interface AboutUsProps {
  onBack: () => void
  onLogin: () => void
  onRegister: () => void
  isLoggedIn: boolean
  onContactClick: () => void
  onMenuClick: () => void
}

export default function AboutUs({
  onBack,
  onLogin,
  onRegister,
  isLoggedIn,
  onContactClick,
  onMenuClick,
}: AboutUsProps) {
  const [isReadMore, setIsReadMore] = useState(false)
  return (
    <div className='min-h-screen bg-white font-sans'>
      <Header
        onMenuClick={onMenuClick}
        onProfileClick={() => {}}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLogin}
        onRegisterClick={onRegister}
      />

      <main className='pt-12 pb-20'>
        <div className='container max-w-6xl mx-auto px-5'>
          {/* Hero Section */}
          <section className='relative mb-20'>
            <button
              onClick={onBack}
              className='flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold mb-8 group'
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
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight'>
                  Tận hưởng mọi <br />
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500'>
                    hành trình
                  </span>{' '}
                  cùng nhau.
                </h1>
                <p className='text-slate-600 text-base sm:text-lg md:text-xl font-medium leading-relaxed'>
                  chudu4be không chỉ là một ứng dụng lập kế hoạch du lịch. Chúng tôi là người bạn
                  đồng hành số, giúp kết nối đam mê và xóa tan mọi rắc rối trong những chuyến đi
                  nhóm.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='relative'
              >
                <div className='aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative z-10'>
                  <img
                    src='https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=2000&auto=format&fit=crop'
                    alt='Travel with friends'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='absolute -top-6 -right-6 w-full h-full bg-slate-50 rounded-[2rem] -z-10 mt-3 ml-3'></div>
              </motion.div>
            </div>
          </section>

          {/* Founder Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='py-16 bg-slate-50 rounded-[3rem] px-8 md:px-16 mb-24'
          >
            <div className='grid grid-cols-1 md:grid-cols-12 gap-12 items-center'>
              <div className='md:col-span-4 flex flex-col items-center'>
                <div className='w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6'>
                  <img
                    src='https://i.pravatar.cc/300?u=nguyenthanhtuan'
                    className='w-full h-full object-cover'
                    alt='Nguyễn Thành Tuấn'
                  />
                </div>
                <h3 className='text-[20px] font-black text-slate-900'>Nguyễn Thành Tuấn</h3>
                <p className='text-primary font-bold uppercase tracking-[0.2em] text-sm mt-1'>
                  Founder & CEO
                </p>

                <div className='flex gap-4 mt-6'>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary shadow-sm transition-all'
                  >
                    <Code2 size={20} />
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary shadow-sm transition-all'
                  >
                    <Briefcase size={20} />
                  </a>
                  <a
                    href='#'
                    className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary shadow-sm transition-all'
                  >
                    <Camera size={20} />
                  </a>
                </div>
              </div>

              <div className='md:col-span-8 space-y-6'>
                <blockquote className='text-[20px] font-medium italic text-slate-700 leading-relaxed'>
                  &quotSinh ra từ niềm đam mê xê dịch và những trải nghiệm thực tế về sự khó khăn
                  khi lên kế hoạch đi chơi cùng bạn bè, tôi muốn tạo ra một công cụ giúp mọi người
                  gạt bỏ nỗi lo lắng về lịch trình và tiền bạc để trọn vẹn tận hưởng từng khoảnh
                  khắc.&quot
                </blockquote>
                <div className='space-y-4 text-slate-600 font-medium text-sm sm:text-base relative'>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${isReadMore ? 'max-h-[1000px]' : 'max-h-[4.5em]'}`}
                  >
                    <p>
                      Tôi tin rằng du lịch là cách tốt nhất để chúng ta thấu hiểu bản thân và kết
                      nối sâu sắc với thế giới xung quanh. Tuy nhiên, việc vận hành một chuyến đi
                      nhóm thường bị cản trở bởi những bảng tính Excel phức tạp, những tranh cãi về
                      chi tiêu và sự lạc lõng trong lịch trình.
                    </p>
                    <p className='mt-4'>
                      Với nền tảng công nghệ, chudu4be giải quyết bài toán đó một cách mượt mà nhất.
                      Chúng tôi không chỉ làm ứng dụng, chúng tôi xây dựng văn hóa du lịch thông
                      minh tại Việt Nam.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsReadMore(!isReadMore)}
                    className='text-primary font-bold hover:underline mt-2 flex items-center gap-1'
                  >
                    {isReadMore ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Mission & Values */}
          <section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: <Globe className='w-8 h-8 text-blue-500' />,
                title: 'Tầm nhìn toàn cầu',
                desc: 'Mang giải pháp công nghệ du lịch Việt vươn tầm thế giới, giúp mọi người dễ dàng khám phá bất cứ đâu.',
              },
              {
                icon: <ShieldCheck className='w-8 h-8 text-emerald-500' />,
                title: 'Tin cậy & Minh bạch',
                desc: 'Đảm bảo mọi khoản chi phí và thông tin đều rõ ràng, tạo sự tin tưởng tuyệt đối giữa các thành viên.',
              },
              {
                icon: <Heart className='w-8 h-8 text-rose-500' />,
                title: 'Gắn kết cộng đồng',
                desc: 'Bất kể bạn là ai, chudu4be luôn hỗ trợ bạn tạo nên những kỷ niệm đáng nhớ nhất cùng những người thân yêu.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className='p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group'
              >
                <div className='flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6'>
                  <div className='p-3 sm:p-4 rounded-2xl bg-slate-50 w-fit group-hover:scale-110 transition-transform'>
                    {item.icon}
                  </div>
                  <span className='text-slate-300 text-2xl font-light md:hidden'>-</span>
                  <h4 className='text-lg sm:text-xl font-black text-slate-900'>{item.title}</h4>
                </div>
                <p className='text-slate-500 text-sm sm:text-base font-medium leading-relaxed'>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </section>

          {/* Contact CTA */}
          <section className='mt-32 text-center space-y-8 bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden'>
            <div className='absolute inset-0 opacity-10 rounded-[48px] border'>
              <div className='absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-20 -mt-20'></div>
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-10 -mb-10'></div>
            </div>

            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white relative z-10 font-sans tracking-tight'>
              Bạn muốn đồng hành cùng chúng tôi?
            </h2>
            <p className='text-white/80 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto relative z-10 leading-relaxed'>
              Chúng tôi luôn chào đón những tâm hồn yêu xê dịch và am hiểu công nghệ tham gia đội
              ngũ.
            </p>
            <div className='flex justify-center relative z-10'>
              <Button
                onClick={onContactClick}
                size='lg'
                className='bg-white text-primary hover:bg-white/90 h-14 px-12 font-bold rounded-2xl shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95'
              >
                Kết nối với chudu4be
              </Button>
            </div>
          </section>
        </div>
      </main>

      <footer className='py-10 text-center border-t border-slate-100 text-slate-400 text-sm font-medium'>
        © 2024 chudu4be - Crafted with ❤️ by Nguyễn Thành Tuấn
      </footer>
    </div>
  )
}
