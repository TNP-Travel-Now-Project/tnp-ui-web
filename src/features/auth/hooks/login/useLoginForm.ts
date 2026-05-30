import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLogin } from '@/features/auth/hooks/login/useLogin'
import type { LoginFormData } from '@/features/auth/schemas/login.schema'
import { LoginSchema } from '@/features/auth/schemas/login.schema'

export function useLoginForm() {
  const mutation = useLogin()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    await toast.promise(mutation.mutateAsync(data), {
      loading: 'Đang thực hiện đang nhập...',
      success: 'Đăng nhập thành công.',
      error: (error) => error.message || 'Đăng nhập thất bại!',
    })

    form.reset()
  }

  return {
    form,
    mutation,
    onSubmit,
  }
}
