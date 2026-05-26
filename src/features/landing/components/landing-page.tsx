'use client'

import LandingLayout from '@/shared/components/layout/landing-layout'
import { useGuestLanding } from '@/features/landing/hooks/useGuestLanding'
import type { Metadata } from 'next'
import { Loading } from '@/shared/components/feedback'
import GuestLanding from '@/features/landing/components/GuestLanding/guest-landing'

export const metadata: Metadata = { title: 'Trang chủ - chudu4be' }

export default function LandingPage() {
  const {
    currentCustomer,
    totalCustomers,
    isAuthenticated,
    isLoading,
    navigate,
    handleNext,
    handlePrev,
  } = useGuestLanding()

  if (isLoading) {
    return <Loading size='lg' inline text='Đang xử lý...' />
  }

  if (isAuthenticated) return null

  return (
    <LandingLayout>
      <GuestLanding
        onLogin={navigate.login}
        onNavigateAbout={navigate.about}
        currentCustomer={currentCustomer}
        totalCustomers={totalCustomers}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </LandingLayout>
  )
}
