import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { TripCard } from '@/features/trip/components/TripCard'
import { Button } from '@/shared/components/common'
import type { Trip } from '@/shared/types'

interface UpcomingTripsProps {
  trips: Trip[]
  onStartCreate: () => void
  onTripSelect: (id: string) => void
  onViewAllTrips: () => void
}

export default function UpcomingTrips({
  trips,
  onStartCreate,
  onTripSelect,
  onViewAllTrips,
}: UpcomingTripsProps) {
  return (
    <div>
      <div className='flex items-center justify-between mb-4 sm:mb-6'>
        <h2 className='text-lg sm:text-xl font-bold text-foreground flex items-center gap-2'>
          Chuyến đi sắp tới
          <span className='bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full'>
            {trips.length}
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
          <div key={trip.id} onClick={() => onTripSelect(trip.id)} className='cursor-pointer'>
            <TripCard trip={trip} />
          </div>
        ))}

        <motion.div
          onClick={onStartCreate}
          className='rounded-md sm:rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center p-2 sm:p-6 lg:p-12 group cursor-pointer hover:border-primary hover:bg-primary/5 transition-all col-span-2 md:col-span-2 lg:col-span-1 h-32 sm:h-auto'
        >
          <div className='w-8 h-8 sm:w-16 sm:h-16 rounded-lg bg-muted flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform'>
            <Plus className='text-primary' size={24} />
          </div>
          <p className='text-xs sm:text-base font-bold text-muted-foreground group-hover:text-primary'>
            Lên lịch mới
          </p>
          <p className='hidden sm:block text-xs text-muted-foreground text-center mt-2 max-w-[160px]'>
            Hãy bắt đầu một hành trình mới cùng bạn bè!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
