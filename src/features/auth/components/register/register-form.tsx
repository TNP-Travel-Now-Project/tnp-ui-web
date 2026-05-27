'use client'

import { useState } from 'react'
import { useRegister } from '@/features/auth/hooks/register/useRegister'
import type { RegisterRequest } from '@/features/auth/type'
import { Button } from '@/shared/components/common/Button'
import { Input } from '@/shared/components/common/Input'
import { Label } from '@/shared/components/ui/form/label'
import {
  Form,
  FormInput,
  FormPassword
} from '@/shared/components/form'
import { useLoginForm } from '@/features/auth/hooks/login/useLoginForm'

interface RegisterFormProps {
  onSuccess: () => void
  onSwitchToLogin?: () => void
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const mutation = useRegister({ onSuccess })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    const nameParts = fullName.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const data: RegisterRequest = {
      firstName,
      lastName,
      userName: email,
      email,
      password,
      confirmPassword,
      phoneNumber: '',
      dateOfBirth: '',
    }

    mutation.mutate(data)
  }

  const { form, onSubmit, formError, isPending } = useLoginForm({ onSuccess })
  return (
    <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>

      <Form {...form}>
        <div className='space-y-2'>
          <FormInput
            name='email'
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
            type='text'
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
            name='password'
            label=''
            placeholder='Xác nhận lại mật khẩu'
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

      {/* {error && (
        <p className='text-xs font-bold text-error text-center'>{error}</p>
      )}

      <div className='space-y-1 sm:space-y-2'>
        <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>
          Họ và tên
        </Label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder='Nhập họ và tên'
          className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-neutral-0'
          required
        />
      </div>

      <div className='space-y-1 sm:space-y-2'>
        <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>Email</Label>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='you@example.com'
          className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-neutral-0'
          required
        />
      </div>

      <div className='space-y-1 sm:space-y-2'>
        <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>
          Mật khẩu
        </Label>
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Tạo mật khẩu'
          className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-neutral-0'
          required
        />
      </div>

      <div className='space-y-1 sm:space-y-2'>
        <Label className='text-xs sm:text-sm font-bold text-on-surface ml-1'>
          Xác nhận mật khẩu
        </Label>
        <Input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Nhập lại mật khẩu'
          className='h-11 sm:h-13 rounded-xl sm:rounded-2xl bg-near-white border-neutral-2 border-[1.5px] px-4 sm:px-5 focus-visible:ring-primary/10 text-sm sm:text-[15px] font-medium transition-all focus:bg-neutral-0'
          required
        />
      </div>

      <Button
        type='submit'
        loading={mutation.isPending}
        loadingText='Đang tạo tài khoản...'
        className='w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-on-surface text-neutral-0 font-bold text-sm sm:text-base hover:opacity-90 transition-all shadow-xl shadow-on-surface/10 mt-2 sm:mt-4'
      >
        Tạo tài khoản
      </Button>

      <p className='text-center text-xs sm:text-sm font-bold text-outline sm:mt-4'>
        Đã có tài khoản?{' '}
        <Button
          type='button'
          onClick={onSwitchToLogin}
          className='text-safety-orange hover:underline font-black outline-none'
        >
          Đăng nhập
        </Button>
      </p> */}
    </form>
  )
}
