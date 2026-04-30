'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLogin } from '@/src/features/auth/hooks/useLogin'
import type { LoginFormData } from '@/src/features/auth/schemas/login.schema'
import { LoginSchema, toLoginRequest } from '@/src/features/auth/schemas/login.schema'
import type { LoginPageProps } from '@/src/features/auth/type'

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  })

  const mutation = useLogin({ onSuccess })

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

      <input placeholder='email' {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input placeholder='password' type='password' {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type='submit'>Login</button>
    </form>
  )
}
