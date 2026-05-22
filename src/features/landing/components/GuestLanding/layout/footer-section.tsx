import { Heart, Plane, Users } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/shared/components/common'

export default function FooterSection({ onNavigateAbout }: { onNavigateAbout: () => void }) {
  return (
    <footer className='bg-[#f2f4ef] pt-20 pb-10 px-4 md:px-6'>
      <div className='container max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 px-2 sm:px-0'>
          <div className='md:col-span-4'>
            <div className='flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start w-full gap-6'>
              <div className='space-y-4 text-left'>
                <div className='flex items-center md:justify-start gap-2'>
                  <span className='text-2xl font-black text-primary tracking-tight'>chudu4be</span>
                </div>
                <p className='text-slate-600 font-medium leading-relaxed max-w-[180px] sm:max-w-xs text-xs sm:text-sm md:text-base'>
                  Giải pháp lập kế hoạch du lịch nhóm hàng đầu Việt Nam.
                </p>
              </div>

              {/* Creator Profile - Right on Mobile, Below on Tablet/Desktop */}
              <button
                type='button'
                onClick={onNavigateAbout}
                className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/50 rounded-2xl border border-white/80 shadow-sm cursor-pointer hover:bg-white hover:border-primary/30 transition-all group'
              >
                <div className='relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden flex-shrink-0 group-hover:border-primary/50 transition-colors'>
                  <Image
                    fill
                    src='/author.jpg'
                    sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw'
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
              </button>
            </div>
          </div>

          <div className='md:col-span-8 grid grid-cols-3 gap-4 md:gap-12'>
            <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <h4 className='font-bold text-slate-800 mb-6 text-sm sm:text-base'>Công ty</h4>
              <ul className='space-y-4 text-slate-500 font-medium text-xs sm:text-sm'>
                <li>
                  <Button
                    onClick={onNavigateAbout}
                    className='hover:text-primary transition-colors'
                  >
                    Về chúng tôi
                  </Button>
                </li>
                <li>
                  <a href='#career' className='hover:text-primary transition-colors'>
                    Nghề nghiệp
                  </a>
                </li>
                <li>
                  <a href='#blog' className='hover:text-primary transition-colors'>
                    Blog du lịch
                  </a>
                </li>
              </ul>
            </div>

            <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <h4 className='font-bold text-slate-800 mb-6 text-sm sm:text-base'>Hỗ trợ</h4>
              <ul className='space-y-4 text-slate-500 font-medium text-xs sm:text-sm'>
                <li>
                  <a href='#center' className='hover:text-primary transition-colors'>
                    Trung tâm
                  </a>
                </li>
                <li>
                  <a href='#contact' className='hover:text-primary transition-colors'>
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href='#faq' className='hover:text-primary transition-colors'>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <h4 className='font-bold text-slate-800 mb-6 text-sm sm:text-base'>Pháp lý</h4>
              <ul className='space-y-4 text-slate-500 font-medium text-xs sm:text-sm'>
                <li>
                  <a href='#privacy' className='hover:text-primary transition-colors'>
                    Riêng tư
                  </a>
                </li>
                <li>
                  <a href='#terms' className='hover:text-primary transition-colors'>
                    Điều khoản
                  </a>
                </li>
                <li>
                  <a href='#cookies' className='hover:text-primary transition-colors'>
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
  )
}
