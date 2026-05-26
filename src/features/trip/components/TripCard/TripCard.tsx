import { motion } from 'framer-motion'
import { Calendar, Edit, MapPin, MoreVertical, Share2, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/navigation/dropdown-menu'
import type { Trip } from '@/shared/types'

interface TripCardProps {
  trip: Trip
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <motion.div className='bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#d6d0cc]/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 group'>
      <div className='relative h-32 sm:h-52 w-full overflow-hidden'>
        <img
          src={trip.image}
          alt={trip.title}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
        />
        <div
          className={`absolute top-3 left-3 sm:top-5 sm:left-5 ${
            trip.status === 'active' ? 'bg-primary' : 'bg-tertiary/90 backdrop-blur-md'
          } text-white text-[9px] sm:text-[11px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 shadow-lg whitespace-nowrap`}
        >
          {trip.status === 'active' && (
            <span className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse'></span>
          )}
          {trip.status === 'active' ? 'Đang hành trình' : 'Kế hoạch'}
        </div>
      </div>

      <div className='p-4 sm:p-6'>
        <div className='flex justify-between items-start mb-2 sm:mb-3'>
          <h3 className='font-bold text-sm sm:text-lg text-on-surface line-clamp-1 leading-tight tracking-tight group-hover:text-primary transition-colors'>
            {trip.title}
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              className='text-outline/40 hover:text-primary transition-all p-1 hover:bg-surface-container rounded-[4px] hidden sm:block outline-none'
            >
              <MoreVertical size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40' onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem className='cursor-pointer font-bold gap-2 focus:bg-primary/10'>
                <Edit size={14} />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer font-bold gap-2 focus:bg-primary/10'>
                <Share2 size={14} />
                Chia sẻ
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer font-bold gap-2 text-error focus:bg-error/10 focus:text-error'>
                <Trash size={14} />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex flex-col gap-1 sm:gap-2 mb-4 sm:mb-6 text-outline/80 text-[10px] sm:text-xs'>
          <div className='flex items-center gap-2'>
            <div className='p-1 bg-surface-container rounded-md'>
              <Calendar size={13} className='shrink-0 text-primary' />
            </div>
            <span className='font-medium tracking-tight'>
              {trip.startDate} - {trip.endDate}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='p-1 bg-surface-container rounded-md'>
              <MapPin size={13} className='shrink-0 text-primary' />
            </div>
            <span className='font-medium tracking-tight truncate'>{trip.location}</span>
          </div>
        </div>

        <div className='flex items-center justify-between border-t border-outline-variant/30 pt-4 sm:pt-5'>
          <div className='flex -space-x-2 sm:-space-x-2.5'>
            {trip.participants.slice(0, 3).map((p) => (
              <img
                key={p.id}
                src={p.avatar}
                alt={p.name}
                className='w-6 h-6 sm:w-9 sm:h-9 rounded-[4px] border-2 border-white object-cover shadow-sm ring-1 ring-outline-variant/20'
              />
            ))}
            {trip.participants.length > 3 && (
              <div className='w-6 h-6 sm:w-9 sm:h-9 rounded-[4px] border-2 border-white bg-surface-container text-primary text-[8px] sm:text-[11px] flex items-center justify-center font-black ring-1 ring-outline-variant/20'>
                +{trip.participants.length - 3}
              </div>
            )}
          </div>
          <div className='text-right'>
            <p className='text-[8px] sm:text-[10px] text-outline/60 font-bold uppercase tracking-widest leading-none mb-1'>
              {trip.status === 'active' ? 'Ngân sách' : 'Dự kiến'}
            </p>
            <p className='font-extrabold text-xs sm:text-xl text-primary tracking-tight'>
              ${trip.budget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
