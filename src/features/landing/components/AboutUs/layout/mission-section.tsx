import { motion } from 'framer-motion'
import { missionValues } from '@/features/landing/constants/guest.constant'
import PageContainer from '@/shared/components/layout/page-container'

export default function MissionSection() {
  return (
    <section className='bg-neutral-0 px-8 md:px-16 mb-24'>
      <PageContainer>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {missionValues.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className='p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group'
              >
                <div className='flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6'>
                  <div className='p-3 sm:p-4 rounded-2xl bg-slate-50 w-fit group-hover:scale-110 transition-transform'>
                    <Icon className={item.style} />
                  </div>
                  <span className='text-slate-300 text-2xl font-light md:hidden'>-</span>
                  <h4 className='text-lg sm:text-xl font-black text-slate-900'>{item.title}</h4>
                </div>
                <p className='text-slate-500 text-sm sm:text-base font-medium leading-relaxed'>
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
