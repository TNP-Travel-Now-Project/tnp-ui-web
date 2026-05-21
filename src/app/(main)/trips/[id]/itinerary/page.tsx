'use client'

import { useParams, useRouter } from 'next/navigation'
import { TripItineraryBuild } from '@/features/trip/components'

export default function TripItineraryPage() {
  const params = useParams()
  const router = useRouter()

  return (
    <TripItineraryBuild
      onBack={() => router.push(`/trips/${params.id}/planning`)}
    />
  )
}
