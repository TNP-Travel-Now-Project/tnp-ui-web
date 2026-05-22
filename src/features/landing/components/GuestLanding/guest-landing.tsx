import { useState } from 'react'
import CTASection from '@/features/landing/components/GuestLanding/layout/cta-section'
import FAndQSection from '@/features/landing/components/GuestLanding/layout/faq-section'
import FooterSection from '@/features/landing/components/GuestLanding/layout/footer-section'
import HeroSection from '@/features/landing/components/GuestLanding/layout/hero-section'
import PopularSection from '@/features/landing/components/GuestLanding/layout/popular-section'
import TestimonialsSection from '@/features/landing/components/GuestLanding/layout/testimonials-section'
import TimeLineSection from '@/features/landing/components/GuestLanding/layout/timeline-section'

interface GuestLandingProps {
  onLogin: () => void
  onNavigateAbout: () => void
}

export default function GuestLanding({ onLogin, onNavigateAbout }: GuestLandingProps) {
  const [activePlace, setActivePlace] = useState<number | null>(null)

  return (
    <div className='min-h-screen bg-background font-sans'>
      <HeroSection onLogin={onLogin} />

      <PopularSection setActivePlace={setActivePlace} activePlace={activePlace} />

      <TimeLineSection />

      <TestimonialsSection />

      <FAndQSection />

      <CTASection onLogin={onLogin} />

      <FooterSection onNavigateAbout={onNavigateAbout} />
    </div>
  )
}
