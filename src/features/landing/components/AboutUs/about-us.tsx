import { BackgroundEffects } from '@/shared/components/effect'
import PageShell from '@/shared/components/layout/page-shell'
import ContactSection from './layout/contact-section'
import FounderSection from './layout/founder-section'
import HeroSection from './layout/hero-section'
import MissionSection from './layout/mission-section'

interface AboutUsProps {
  onBack: () => void
  onContactClick: () => void
}

export default function AboutUs({ onBack, onContactClick }: AboutUsProps) {
  return (
    <PageShell>
      <BackgroundEffects variant='community' />

      <HeroSection onBack={onBack} />
      <FounderSection />
      <MissionSection />
      <ContactSection onContactClick={onContactClick} />

      <footer className='py-10 text-center border-t bg-neutral-0 text-neutral-70 font-bold text-sm'>
        chudu4be - Thông tin về chúng tôi
      </footer>
    </PageShell>
  )
}
