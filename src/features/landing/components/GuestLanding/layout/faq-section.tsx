import { faqs } from '@/features/landing/constants/guest.constant'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/layout/accordion'

export default function FAndQSection() {
  return (
    <section id='faq' className='py-24 bg-slate-50'>
      <div className='container max-w-3xl mx-auto px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4'>
            Câu hỏi thường gặp
          </h2>
          <p className='text-slate-600 text-lg'>Mọi thắc mắc của bạn đều được giải đáp tại đây.</p>
        </div>

        <Accordion className='w-full bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-2'>
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={faq.value}
              value={faq.value}
              className='border-b-slate-100 last:border-0 py-2'
            >
              <AccordionTrigger className='text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-slate-600 text-base leading-relaxed'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
