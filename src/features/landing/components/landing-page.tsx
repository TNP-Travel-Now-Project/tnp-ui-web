'use client'

<<<<<<< HEAD
=======
import type { Metadata } from 'next'
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)
import GuestLanding from '@/features/landing/components/GuestLanding/guest-landing'
import { useGuestLanding } from '@/features/landing/hooks/useGuestLanding'
import { Loading } from '@/shared/components/feedback'
import LandingLayout from '@/shared/components/layout/landing-layout'
<<<<<<< HEAD
=======

export const metadata: Metadata = { title: 'Trang chủ - chudu4be' }
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useGuestLanding()
  const {
    currentCustomer,
    totalCustomers,
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
        onNavigateAbout={navigate.about}
        currentCustomer={currentCustomer}
        totalCustomers={totalCustomers}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </LandingLayout>
  )
}
