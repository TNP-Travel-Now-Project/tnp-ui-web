'use client'

import { useRouter } from 'next/navigation'
import { CreateTrip } from '@/features/trip/components'

export default function CreateTripPage() {
  const router = useRouter()

  return (
    <CreateTrip
      onBack={() => router.push('/dashboard')}
      onPlanning={() => router.push('/trips/new/planning')}
    />
  )
}
