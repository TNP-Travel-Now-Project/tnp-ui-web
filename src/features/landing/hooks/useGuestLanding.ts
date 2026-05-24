'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { useAuth } from '@/shared/components/providers'
import { useState } from 'react'
import { testimonials_data } from '@/features/landing/constants/guest.constant'

export function useGuestLanding() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentCustomer = testimonials_data[currentIndex]
  const totalCustomers = testimonials_data.length

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCustomers)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCustomers) % totalCustomers)
  }

  const goLogin = useCallback(() => router.push('/login'), [router])
  const goAbout = useCallback(() => router.push('/about'), [router])

  return {
    currentCustomer,
    totalCustomers,
    isAuthenticated,
    isLoading,
    navigate: {
      login: goLogin,
      about: goAbout,
    },
    handleNext,
    handlePrev,
  }
}
