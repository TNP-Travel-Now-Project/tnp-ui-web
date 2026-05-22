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
    <div className='min-h-screen bg-white font-sans'>
      <main className='pt-12 pb-20'>
        <div className='container max-w-6xl mx-auto px-5'>
          {/* Hero Section */}
          <HeroSection onBack={onBack} />
          {/* Founder Section */}
          <FounderSection />
          {/* Mission & Values */}
          <MissionSection />
          {/* Contact CTA */}
          <ContactSection onContactClick={onContactClick} />
        </div>
      </main>

      <footer className='py-10 text-center border-t border-slate-100 text-slate-400 text-sm font-medium'>
        © chudu4be - Crafted with by Nguyễn Thành Tuấn
      </footer>
    </div>
  )
}
