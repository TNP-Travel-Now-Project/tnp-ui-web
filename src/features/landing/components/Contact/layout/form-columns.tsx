import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button, Input, Label } from '@/shared/components/common'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/form'

export default function FormColumns() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='md:col-span-6 lg:col-span-7 bg-auth-layout/70 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-neutral-10'
    >
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder='example@email.com' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <form className='space-y-6'>
        <div className='space-y-2'>
          <Label className='text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider'>
            Họ và tên
          </Label>
          <input
            type='text'
            placeholder='Nguyễn Văn A'
            className='w-full h-12 md:h-14 px-5 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-sm md:text-base'
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider'>
            Địa chỉ Email
          </Label>
          <input
            type='email'
            placeholder='email@example.com'
            className='w-full h-12 md:h-14 px-5 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-sm md:text-base'
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider'>
            Nội dung tin nhắn
          </Label>
          <textarea
            rows={4}
            placeholder='Bạn đang nghĩ gì...'
            className='w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium resize-none text-sm md:text-base'
          ></textarea>
        </div>

        <Button className='w-full h-12 md:h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg shadow-xl shadow-primary/20 transition-all group'>
          Gửi lời nhắn
          <Send className='ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
        </Button>
      </form>
    </motion.div>
  )
}
