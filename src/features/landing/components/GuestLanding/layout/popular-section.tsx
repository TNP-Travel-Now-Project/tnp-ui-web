import Image from 'next/image'
import { planedUps } from '@/features/landing/constants/guest.constant'

interface PopularSectionProps {
  setActivePlace: (idx: number | null) => void
  activePlace: number | null
}

export default function PopularSection({ setActivePlace, activePlace }: PopularSectionProps) {
  return (
    <section id='popular-places' className=' bg-white'>
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
              sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw,33vw'
              className={`object-cover transition-transform duration-700 ${activePlace === idx ? 'scale-110' : 'group-hover:scale-110'}`}
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
  )
}
