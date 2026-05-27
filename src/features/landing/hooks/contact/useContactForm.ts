'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSendContactInfo } from '@/features/landing/hooks/contact/useContact'
import { type ContactFormData, ContactSchema } from '@/features/landing/schema/contact.schema'

export default function useContactForm() {
  const mutation = useSendContactInfo()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  })

  const onSubmit = async (values: ContactFormData) => {
    await toast.promise(mutation.mutateAsync(values), {
      loading: 'Đang gửi lời tin nhắn...',
      success: 'Đã gửi tin nhắn cho chudu4be',
      error: (error) => error.message || 'Gửi tin nhắn thất bại',
    })

    form.reset()
  }

  return {
    form,
    mutation,
    onSubmit,
  }
}
