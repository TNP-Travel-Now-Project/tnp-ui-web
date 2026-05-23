import PageContainer from '@/shared/components/layout/page-container'
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
      <PageContainer>
        <HeroSection onBack={onBack} />

        <FounderSection />

        <MissionSection />

        <ContactSection onContactClick={onContactClick} />
      </PageContainer>

      <footer className='py-10 text-center border-t border-slate-100 text-slate-400 text-sm font-medium'>
        © chudu4be - Crafted with by Nguyễn Thành Tuấn
      </footer>
    </PageShell>
  )
}
