import { Trip } from '@/shared/types'
import { TripCard } from '@/features/trip/components/TripCard'
import { Button } from '@/shared/components/common'

interface AllTripsViewProps {
  trips: Trip[]
  onBack: () => void
  onTripSelect: (id: string) => void
}

export function AllTripsView({ trips, onBack, onTripSelect }: AllTripsViewProps) {
  return (
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-2xl font-black text-on-surface tracking-tight'>
            Tất cả chuyến đi
          </h2>
          <p className='text-sm text-outline font-medium'>
            Danh sách các chuyến đi của bạn
          </p>
        </div>
        <Button
          onClick={onBack}
          className='px-4 py-2 bg-surface-container hover:bg-outline-variant/20 text-on-surface text-xs font-bold rounded-lg transition-all'
        >
          Quay lại
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
      </div>
    </div>
  )
}
