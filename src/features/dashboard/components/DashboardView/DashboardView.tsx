import { Trip, SummaryStat } from '@/shared/types'
import { TripCard } from '@/features/trip/components/TripCard'
import { SummaryCard } from '@/shared/components/composite'
import { Button } from '@/shared/components/common'
import { ArrowRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardViewProps {
  trips: Trip[]
  stats: SummaryStat[]
  onStartCreate: () => void
  onTripSelect: (id: string) => void
  onViewAllTrips: () => void
}

export function DashboardView({
  trips,
  stats,
  onStartCreate,
  onTripSelect,
  onViewAllTrips,
}: DashboardViewProps) {
  return (
    <>
      {/* Welcome Hero */}
      <section className='mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div className='max-w-2xl'>
          <h1 className='text-4xl font-bold text-on-surface mb-2 tracking-tight'>
            Chào {new Date().getHours() < 12 ? 'sáng' : 'mừng'}, Tuấn!
          </h1>
          <p className='text-lg text-on-surface-variant font-medium opacity-80'>
            Sẵn sàng cho chuyến phiêu lưu tiếp theo?
          </p>
        </div>
      </section>

      {/* Upcoming Trips */}
      <section className='mb-12'>
        <div className='flex items-center justify-between mb-4 sm:mb-6'>
          <h2 className='text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2'>
            Chuyến đi sắp tới
            <span className='bg-secondary-container text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full'>
              3
            </span>
          </h2>
          <Button
            onClick={onViewAllTrips}
            className='text-primary font-semibold text-xs sm:text-sm flex items-center gap-1 hover:underline'
          >
            Xem tất cả
            <ArrowRight size={14} />
          </Button>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'>
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onTripSelect(trip.id)}
              className='cursor-pointer'
            >
              <TripCard trip={trip} />
            </div>
          ))}

          {/* Add New Project Placeholder */}
          <motion.div
            onClick={onStartCreate}
            className='rounded-md sm:rounded-2xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-2 sm:p-6 lg:p-12 group cursor-pointer hover:border-primary hover:bg-primary/5 transition-all col-span-2 md:col-span-2 lg:col-span-1 h-32 sm:h-auto'
          >
            <div className='w-8 h-8 sm:w-16 sm:h-16 rounded-lg bg-surface-container flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform'>
              <Plus className='text-primary-container' size={24} />
            </div>
            <p className='text-xs sm:text-base font-bold text-on-surface-variant group-hover:text-primary'>
              Lên lịch mới
            </p>
            <p className='hidden sm:block text-xs text-outline text-center mt-2 max-w-[160px]'>
              Hãy bắt đầu một hành trình mới cùng bạn bè!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Insights Summary */}
      <section>
        <h3 className='text-lg font-bold text-on-surface mb-4 sm:mb-6'>
          Tổng quan chi tiêu & Hoạt động
        </h3>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6'>
          {stats.map((stat) => (
            <SummaryCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>
    </>
  )
}
