import { faqs } from '@/features/landing/constants/guest.constant'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/layout/accordion'

export default function FAndQSection() {
  return (
    <section id='faq' className='py-24 bg-white'>
      <div className='container max-w-3xl mx-auto px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4'>
            Câu hỏi thường gặp
          </h2>
          <p className='text-slate-600 text-lg'>Mọi thắc mắc của bạn đều được giải đáp tại đây.</p>
        </div>

        <Accordion className='w-full bg-neutral-0 rounded-2xl shadow-sm border border-neutral-40'>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.value}
              value={faq.value}
              className='border-b border-neutral-5 last:border-0 py-2 px-4 data-open:bg-primary/30 transition-colors duration-200'
            >
              <AccordionTrigger className='text-neutral-90 font-bold text-lg hover:no-underline hover:text-primary transition-colors'>
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className='text-neutral-90 text-base leading-relaxed'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
