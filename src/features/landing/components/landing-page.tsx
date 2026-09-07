'use client'

import GuestLanding from '@/features/landing/components/GuestLanding/guest-landing'
import { useGuestLanding } from '@/features/landing/hooks/useGuestLanding'
import { Loading } from '@/shared/components/feedback/Loading'
import LandingLayout from '@/shared/components/layout/landing-layout'
import { ThemeSetter } from '@/shared/components/providers/ThemeProvider/theme-setter'

export default function LandingPage() {
  const {
    isAuthenticated,
    currentCustomer,
    totalCustomers,
    navigate,
    handleNext,
    handlePrev,
  } = useGuestLanding()

  // if (isAuthenticated) {
  //   return <Loading fullScreen inline text='Đang xử lý...' />
  // }

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
