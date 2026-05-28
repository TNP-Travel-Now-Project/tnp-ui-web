'use client'
import { Button } from '@/shared/components/common/Button'
import {
  Form,
  FormInput,
  FormPassword
} from '@/shared/components/form'
import { useRegisterForm } from '@/features/auth/hooks/register/useRegisterForm'

export default function RegisterForm() {
  const { form, mutation, onSubmit } = useRegisterForm()

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
