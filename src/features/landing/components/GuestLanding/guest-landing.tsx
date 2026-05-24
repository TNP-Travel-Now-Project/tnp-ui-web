import { useState } from 'react'
import CTASection from '@/features/landing/components/GuestLanding/layout/cta-section'
import FAndQSection from '@/features/landing/components/GuestLanding/layout/faq-section'
import FooterSection from '@/features/landing/components/GuestLanding/layout/footer-section'
import HeroSection from '@/features/landing/components/GuestLanding/layout/hero-section'
import PopularSection from '@/features/landing/components/GuestLanding/layout/popular-section'
import TestimonialsSection from '@/features/landing/components/GuestLanding/layout/testimonials-section'
import TimeLineSection from '@/features/landing/components/GuestLanding/layout/timeline-section'
import BackgroundEffects from '@/shared/components/effect/background-effect'
import PageShell from '@/shared/components/layout/page-shell'
import type { TestimonialItem } from '@/features/landing/types/landing.types'

interface GuestLandingProps {
  currentCustomer: TestimonialItem
  totalCustomers: number

  onLogin: () => void
  onNavigateAbout: () => void
  handleNext: () => void
  handlePrev: () => void
}

export default function GuestLanding({
  onLogin,
  onNavigateAbout,
  currentCustomer,
  totalCustomers,
  handleNext,
  handlePrev,
}: GuestLandingProps) {
  const [activePlace, setActivePlace] = useState<number | null>(null)

  return (
    <PageShell>
      <BackgroundEffects variant='travel' />

      <HeroSection onLogin={onLogin} />
      <PopularSection setActivePlace={setActivePlace} activePlace={activePlace} />
      <TimeLineSection />
      <TestimonialsSection
        currentCustomer={currentCustomer}
        totalCustomers={totalCustomers}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <FAndQSection />
      <CTASection onLogin={onLogin} />
      <FooterSection onNavigateAbout={onNavigateAbout} />
    </PageShell>
  )
}
