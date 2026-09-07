'use client'
import { useRegisterForm } from '@/features/auth/hooks/register/useRegisterForm'
import { Button } from '@/shared/components/common/Button'
import { Form, FormInput, FormPassword } from '@/shared/components/form'

interface RegisterFormProps {
  onSuccess?: () => void
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { form, mutation, onSubmit } = useRegisterForm({ onSuccess })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 sm:space-y-4'>
      <Form {...form}>
        <div className='space-y-2'>
          <FormInput
            name='username'
            type='text'
            control={form.control}
            label=''
            placeholder='Nhập họ tên của bạn'
            labelClassName='text-xs sm:text-sm text-neutral-90 font-bold ml-1'
            inputClassName='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] text-neutral-90 font-medium transition-all focus:bg-neutral-0'
          />
        </div>

        <div className='space-y-2'>
          <FormInput
            name='email'
            type='email'
            control={form.control}
            label=''
            placeholder='Nhập email của bạn'
            labelClassName='text-xs sm:text-sm font-bold text-on-surface ml-1'
            inputClassName='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] text-neutral-90 font-medium transition-all focus:bg-neutral-0'
          />
        </div>

        <div className='space-y-2'>
          <FormPassword
            control={form.control}
            name='password'
            label=''
            placeholder='Nhập mật khẩu'
            inputClassName='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] text-neutral-90 font-medium transition-all focus:bg-neutral-0'
          />
        </div>

        <div className='space-y-2'>
          <FormPassword
            control={form.control}
            name='confirmPassword'
            label=''
            placeholder='Xác nhận lại mật khẩu'
            inputClassName='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] text-neutral-90 font-medium transition-all focus:bg-neutral-0'
          />
        </div>

        <Button
          type='submit'
          loading={mutation.isPending}
          loadingText='Đang xử lý...'
          className='w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl text-neutral-0 font-bold text-sm sm:text-base hover:opacity-90 transition-all shadow-xl shadow-on-surface/10 mt-2 sm:mt-4'
        >
          Đăng ký
        </Button>
      </Form>
    </form>
  )
}
