import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLogin } from '@/features/auth/hooks/login/useLogin'
import type { LoginFormData } from '@/features/auth/schemas/login.schema'
import { LoginSchema } from '@/features/auth/schemas/login.schema'
import type { LoginPageProps } from '@/features/auth/type'

export function useLoginForm({ onSuccess }: LoginPageProps) {
  const [formError, setFormError] = useState<string | null>(null)

  const mutation = useLogin({ onSuccess })

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setFormError(null)
      await mutation.mutateAsync(data)
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Something went wrong, please try again',
      )
    }
  }

  return {
    form,
    onSubmit,
    formError,
    isLoading: mutation.isPending,
  }
}
