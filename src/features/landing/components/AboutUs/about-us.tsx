<<<<<<< HEAD
'use client'

=======
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)
import { BackgroundEffects } from '@/shared/components/effect'
import PageShell from '@/shared/components/layout/page-shell'
import ContactSection from './layout/contact-section'
import FounderSection from './layout/founder-section'
import HeroSection from './layout/hero-section'
import MissionSection from './layout/mission-section'
<<<<<<< HEAD
import { useLandingContext } from '@/shared/contexts/landing-context'
=======
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)

export default function AboutUs() {
  const { openHome, openContact } = useLandingContext()
  return (
    <PageShell>
      <BackgroundEffects variant='community' />

      <HeroSection onBack={openHome} />
      <FounderSection />
      <MissionSection />
      <ContactSection onContactClick={openContact} />

      <footer className='py-10 text-center border-t bg-neutral-0 text-neutral-70 font-bold text-sm'>
        chudu4be - Thông tin về chúng tôi
      </footer>
    </PageShell>
  )
}
