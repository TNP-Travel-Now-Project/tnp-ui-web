'use client'

import GuestLanding from '@/features/landing/components/GuestLanding/guest-landing'
import { useGuestLanding } from '@/features/landing/hooks/useGuestLanding'
import { Loading } from '@/shared/components/feedback'
import LandingLayout from '@/shared/components/layout/landing-layout'
import { ThemeSetter } from '@/shared/components/providers/ThemeProvider/theme-setter'

export default function LandingPage() {
  const {
    isAuthenticated,
    isLoading,
    currentCustomer,
    totalCustomers,
    navigate,
    handleNext,
    handlePrev
  } = useGuestLanding()

  if (isLoading) {
    return <Loading size='lg' inline text='Đang xử lý...' />
  }

  if (isAuthenticated) return null

  return (
    <LandingLayout>
      <ThemeSetter theme='system' />
      <GuestLanding
        onNavigateAbout={navigate.about}
        currentCustomer={currentCustomer}
        totalCustomers={totalCustomers}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </LandingLayout>
  )
}
