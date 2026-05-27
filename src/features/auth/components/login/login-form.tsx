'use client'

import { useLoginForm } from '@/features/auth/hooks/login/useLoginForm'
import { Button } from '@/shared/components/common/Button'
import {
  Form,
  FormInput,
} from '@/shared/components/form'

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToRegister?: () => void
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const { form, onSubmit, formError, isPending } = useLoginForm({ onSuccess })

  return (
    <div className='space-y-5 sm:space-y-6'>
      <div className='space-y-3'>
        <Button
          variant='outline'
          className='w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl border-outline-variant/30 font-bold text-sm sm:text-[15px] flex items-center justify-center gap-3 hover:bg-neutral-5 transition-all shadow-sm dark:hover:text-green-dark border-[1.5px] text-neutral-100'
        >
          <img
            src='https://www.google.com/favicon.ico'
            className='w-4 h-4 sm:w-5 sm:h-5'
            alt='Google'
          />
          Tiếp tục với Google
        </Button>
      </div>

      <div className='relative pt-1 sm:pt-2 pb-1'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-neutral-2' />
        </div>
        <div className='relative flex justify-center text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-neutral-30'>
          <span className='bg-neutral-0 px-4'>Hoặc</span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 sm:space-y-6'>
        <Form {...form}>
          <div className='space-y-2'>
            <FormInput
              name='email'
              type='text'
              control={form.control}
              label=''
              placeholder='Nhập email của bạn'
              labelClassName='text-xs sm:text-sm font-bold text-on-surface ml-1'
              inputClassName='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] text-neutral-90 font-medium transition-all focus:bg-neutral-0'
            />
          </div>

          <div className='space-y-2'>
            <FormInput
              name='password'
              type='text'
              control={form.control}
              label=''
              placeholder='Nhập mật khẩu'
              labelClassName='text-xs sm:text-sm text-neutral-90 font-bold ml-1'
              inputClassName='h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] text-neutral-90 font-medium transition-all focus:bg-neutral-0'
            />
          </div>

          {formError && (
            <p className='text-xs font-bold text-error text-center'>{formError}</p>
          )}

          <Button
            type='submit'
            loading={isPending}
            loadingText='Đang đăng nhập...'
            className='w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl text-neutral-0 font-bold text-sm sm:text-base hover:opacity-90 transition-all shadow-xl shadow-on-surface/10 mt-2 sm:mt-4'
          >
            Đăng nhập
          </Button>
        </Form>
      </form>

    </div>
  )
}
