'use client'

import { useRouter } from 'next/navigation'
import { AllTripsView } from '@/features/trip/components'
import { MOCK_TRIPS } from '@/shared/lib/mock-data'

export default function AllTripsPage() {
  const router = useRouter()

  return (
    <AllTripsView
      trips={MOCK_TRIPS}
      onBack={() => router.push('/dashboard')}
      onTripSelect={(id) => router.push(`/trips/${id}`)}
    />
  )
}
