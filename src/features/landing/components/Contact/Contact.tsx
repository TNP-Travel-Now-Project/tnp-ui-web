import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import PageContainer from '@/shared/components/layout/page-container'
import PageShell from '@/shared/components/layout/page-shell'
import FormColumns from './layout/contact-form'
import InfoColumns from './layout/contact-info'
import { BackgroundEffects } from '@/shared/components/effect'

export default function Contact({ onBack }: { onBack: () => void }) {
  return (
    <PageShell>
      <BackgroundEffects variant='nature' />

      <PageContainer>
        <div className='mb-12'>
          <button
            type='button'
            onClick={onBack}
            className='flex items-center gap-2 text-neutral-2 hover:text-primary transition-colors font-bold mb-12 pt-8 group'
          >
            <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
            Quay lại
          </button>

          <div className='space-y-12'>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center md:text-left max-w-2xl'
            >
              <h1 className='text-neutral-2 text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6'>
                Hãy kết nối với <span className='text-primary'>chudu4BE</span>
              </h1>
              <p className='text-neutral-20 text-base md:text-lg font-medium leading-relaxed'>
                Bạn có thắc mắc, góp ý hay muốn hợp tác? Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-10 gap-10 lg:gap-16 items-start'>
              {/* Info Items Column */}
              <InfoColumns />

              {/* Form Column */}
              <FormColumns />
            </div>
          </div>
        </div>
      </PageContainer>

      <footer className='py-10 text-center text-ghost-white text-sm font-bold border-t border-subtext-2'>
        chudu4be - Luôn sẵn sàng hỗ trợ bạn
      </footer>
    </PageShell>
  )
}
