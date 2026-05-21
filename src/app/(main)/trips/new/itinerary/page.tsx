'use client'

import { useRouter } from 'next/navigation'
import { TripItineraryBuild } from '@/features/trip/components'

export default function NewTripItineraryPage() {
  const router = useRouter()

  return (
    <TripItineraryBuild
      onBack={() => router.push('/trips/new/planning')}
    />
  )
}
