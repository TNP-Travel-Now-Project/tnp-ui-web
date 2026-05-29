import { Button } from '@/shared/components/common/Button'
import PageContainer from '@/shared/components/layout/page-container'

export default function ContactSection({ onContactClick: openContact }: { onContactClick: () => void }) {
  return (
    <PageContainer>
      <section className='mt-32 mb-30 text-center space-y-8 rounded-2xl p-12 md:p-20 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10 rounded-[48px] border'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-20 -mt-20'></div>
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-auth-layout rounded-full -ml-10 -mb-10'></div>
        </div>

        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white relative z-10 font-sans tracking-tight'>
          Bạn muốn đồng hành cùng chúng tôi?
        </h2>
        <p className='text-white/80 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto relative z-10 leading-relaxed'>
          Chúng tôi luôn chào đón những tâm hồn yêu xê dịch và am hiểu công nghệ tham gia đội ngũ.
        </p>
        <div className='flex justify-center relative z-10'>
          <Button
            onClick={openContact}
            size='lg'
            className='bg-neutral-0 text-primary hover:bg-neutral-0/90 h-14 px-12 font-bold rounded-xl shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95'
          >
            Kết nối với chudu4be
          </Button>
        </div>
      </section>
    </PageContainer>
  )
}
