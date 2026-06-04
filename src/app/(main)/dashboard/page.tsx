'use client'

import { useRouter } from 'next/navigation'
import { DashboardView } from '@/features/dashboard/components'
import { MOCK_TRIPS, SUMMARY_STATS } from '@/shared/lib/mock-data'

export default function DashboardPage() {
  const router = useRouter()

  return (
    <DashboardView
      trips={MOCK_TRIPS}
      stats={SUMMARY_STATS}
      onStartCreate={() => router.push('/trips/new')}
      onTripSelect={(id) => router.push(`/trips/${id}`)}
      onViewAllTrips={() => router.push('/trips')}
    />
  )
}
