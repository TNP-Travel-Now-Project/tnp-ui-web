import { motion } from 'framer-motion'
import { Briefcase, Camera, Code2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function FounderSection() {
  const [isReadMore, setIsReadMore] = useState(false)
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='py-16 bg-slate-50 rounded-[3rem] px-8 md:px-16 mb-24'
    >
      <div className='grid grid-cols-1 md:grid-cols-12 gap-12 items-center'>
        <div className='md:col-span-4 flex flex-col items-center'>
          <div className='relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6'>
            <Image
              fill
              alt='Nguyễn Thành Tuấn'
              className='object-cover'
              sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw'
              src='/author.jpg'
            />
          </div>
          <h3 className='text-[20px] font-black text-slate-900'>Nguyễn Thành Tuấn</h3>
          <p className='text-primary font-bold uppercase tracking-[0.2em] text-sm mt-1'>
            Founder & CEO
          </p>

          <div className='flex gap-4 mt-6'>
            <a
              href='#1'
              className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary shadow-sm transition-all'
            >
              <Code2 size={20} />
            </a>
            <a
              href='#2'
              className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary shadow-sm transition-all'
            >
              <Briefcase size={20} />
            </a>
            <a
              href='#3'
              className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary shadow-sm transition-all'
            >
              <Camera size={20} />
            </a>
          </div>
        </div>

        <div className='md:col-span-8 space-y-6'>
          <blockquote className='text-[20px] font-medium italic text-slate-700 leading-relaxed'>
            &quot;Sinh ra từ niềm đam mê xê dịch và những trải nghiệm thực tế về sự khó khăn khi lên
            kế hoạch đi chơi cùng bạn bè, tôi muốn tạo ra một công cụ giúp mọi người gạt bỏ nỗi lo
            lắng về lịch trình và tiền bạc để trọn vẹn tận hưởng từng khoảnh khắc.&quot;
          </blockquote>
          <div className='space-y-4 text-slate-600 font-medium text-sm sm:text-base relative'>
            <div
              className={`overflow-hidden transition-all duration-500 ${isReadMore ? 'max-h-[1000px]' : 'max-h-[4.5em]'}`}
            >
              <p>
                Tôi tin rằng du lịch là cách tốt nhất để chúng ta thấu hiểu bản thân và kết nối sâu
                sắc với thế giới xung quanh. Tuy nhiên, việc vận hành một chuyến đi nhóm thường bị
                cản trở bởi những bảng tính Excel phức tạp, những tranh cãi về chi tiêu và sự lạc
                lõng trong lịch trình.
              </p>
              <p className='mt-4'>
                Với nền tảng công nghệ, chudu4be giải quyết bài toán đó một cách mượt mà nhất. Chúng
                tôi không chỉ làm ứng dụng, chúng tôi xây dựng văn hóa du lịch thông minh tại Việt
                Nam.
              </p>
            </div>

            <button
              type='button'
              onClick={() => setIsReadMore(!isReadMore)}
              className='text-primary font-bold hover:underline mt-2 flex items-center gap-1'
            >
              {isReadMore ? 'Thu gọn' : 'Xem thêm'}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
