'use client'

import { useParams, useRouter } from 'next/navigation'
import { PlanningTrip } from '@/features/trip/components'

export default function TripPlanningPage() {
  const params = useParams()
  const router = useRouter()

  return (
    <PlanningTrip
      onBack={() => router.push('/dashboard')}
      onNext={() => router.push(`/trips/${params.id}/itinerary`)}
    />
  )
}
