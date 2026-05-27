import { Heart, Plane, Users } from 'lucide-react'
import Image from 'next/image'
import { categoriesFooter } from '@/features/landing/constants/guest.constant'
import PageContainer from '@/shared/components/layout/page-container'

export default function FooterSection({ onNavigateAbout }: { onNavigateAbout: () => void }) {
  return (
    <footer className='bg-hover-grey pt-20 pb-10'>
      <PageContainer className='px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 px-2 sm:px-0'>
          <div className='md:col-span-4'>
            <div className='flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start w-full gap-6'>
              <div className='space-y-4 text-left'>
                <div className='flex items-center md:justify-start gap-2'>
                  <span className='text-2xl font-black text-primary tracking-tight'>chudu4BE</span>
                </div>
                <p className='text-neutral-60 font-medium leading-relaxed max-w-45 sm:max-w-xs text-xs sm:text-sm md:text-base'>
                  Giải pháp lập kế hoạch du lịch nhóm hàng đầu Việt Nam.
                </p>
              </div>

              {/* Creator Profile - Right on Mobile, Below on Tablet/Desktop */}
              <div className='flex justify-center md:justify-start items-center w-full'>
                <button
                  type='button'
                  onClick={onNavigateAbout}
                  className='flex justify-center items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-neutral-5 rounded-2xl border-0 shadow-sm cursor-pointer hover:bg-neutral-0 hover:border-primary/30 transition-all group'
                >
                  <div className='relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden shrink-0 group-hover:border-primary/50 transition-colors'>
                    <Image
                      fill
                      src='/author.jpg'
                      sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw'
                      className='w-full h-full object-cover rounded-full'
                      alt='Nguyễn Thành Tuấn'
                    />
                  </div>
                  <div className='text-left'>
                    <p className='text-[9px] sm:text-[10px] font-bold text-neutral-40 uppercase tracking-wider'>
                      Người sáng lập
                    </p>
                    <p className='font-extrabold text-neutral-90 text-xs sm:text-sm group-hover:text-primary transition-colors'>
                      Nguyễn Thành Tuấn
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className='md:col-span-8 grid grid-cols-3 gap-4 md:gap-12'>
            {categoriesFooter.map((category) => (
              <div
                key={category.title}
                className='flex flex-col items-center md:items-start text-center md:text-left'
              >
                <h4 className='font-bold text-neutral-90 mb-6 text-sm sm:text-base'>
                  {category.title}
                </h4>

                <ul className='space-y-4 text-neutral-60 font-medium text-xs sm:text-sm'>
                  {category.items.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className='hover:text-primary transition-colors'>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center text-slate-500 font-medium text-sm pt-8 border-t border-slate-200/60'>
          <p className='font-bold'>chudu4be - Chắp cánh cho tuổi trẻ, vững bước cho chuyến đi.</p>
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
      </PageContainer>
    </footer>
  )
}
