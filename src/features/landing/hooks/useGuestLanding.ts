'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { testimonialsData } from '@/features/landing/constants/guest.constant'
import { useAuth } from '@/shared/components/providers'

export function useGuestLanding() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentCustomer = testimonialsData[currentIndex]
  const totalCustomers = testimonialsData.length

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCustomers)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCustomers) % totalCustomers)
  }

  const goAbout = useCallback(() => router.push('/about'), [router])

  return {
    currentCustomer,
    totalCustomers,
    isAuthenticated,
    isLoading,
    navigate: {
      about: goAbout,
    },
    handleNext,
    handlePrev,
  }
}
