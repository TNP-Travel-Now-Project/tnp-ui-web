'use client'

import { useRouter } from 'next/navigation'
import { PlanningTrip } from '@/features/trip/components'

export default function NewTripPlanningPage() {
  const router = useRouter()

  return (
    <PlanningTrip
      onBack={() => router.push('/trips/new')}
      onNext={() => router.push('/trips/new/itinerary')}
    />
  )
}
