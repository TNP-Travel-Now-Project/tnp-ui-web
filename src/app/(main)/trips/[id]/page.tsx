'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { TripDetail } from '@/features/trip/components'
import { MOCK_DETAIL } from '@/shared/lib/mock-data'

export default function TripDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [hasNotification, setHasNotification] = useState(false)

  return (
    <TripDetail
      trip={MOCK_DETAIL}
      onBack={() => router.push('/dashboard')}
      onImminentActivity={setHasNotification}
    />
  )
}
