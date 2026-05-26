import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/shared/components/common'
import { Form, FormInput, FormTextarea } from '@/shared/components/form'
import useContactForm from '@/features/landing/hooks/contact/useContactForm'
import { contactFormProps } from '@/features/landing/constants/guest.constant'

export default function FormColumns() {
  const { form, mutation, onSubmit } = useContactForm()
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='md:col-span-6 lg:col-span-7 bg-auth-layout/70 rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-neutral-10'
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <Form {...form}>
          <div className='space-y-2'>
            <FormInput
              name='name'
              type='text'
              control={form.control}
              label='họ và tên'
              placeholder='Nhập họ tên của bạn'
              labelClassName={contactFormProps.labelClass}
              inputClassName={contactFormProps.inputClass}
            />
          </div>

          <div className='space-y-2'>
            <FormInput
              name='email'
              type='email'
              control={form.control}
              label='địa chỉ Email'
              placeholder='Nhập email của bạn'
              labelClassName={contactFormProps.labelClass}
              inputClassName={contactFormProps.inputClass}
            />
          </div>

          <div className='space-y-2'>
            <FormTextarea
              rows={4}
              name='description'
              control={form.control}
              label='Nội dung tin nhắn'
              placeholder='Nhập vấn đề bạn muốn mô tả'
              labelClassName={contactFormProps.labelClass}
              textareaClassName={contactFormProps.textareaClass}
            />
          </div>

          <Button
            type='submit'
            loading={mutation.isPending}
            loadingText='Đang gửi...'
            className='w-full h-12 md:h-14 rounded-2xl bg-primary hover:bg-primary/90 text-neutral-0 font-bold text-base md:text-lg shadow-xl shadow-primary/20 transition-all group'
          >
            Gửi lời nhắn
            <Send className='ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
          </Button>
        </Form>
      </form>
    </motion.div>
  )
}
