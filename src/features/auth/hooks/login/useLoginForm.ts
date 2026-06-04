import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLogin } from '@/features/auth/hooks/login/useLogin'
import type { LoginFormData } from '@/features/auth/schemas/login.schema'
import { LoginSchema } from '@/features/auth/schemas/login.schema'
import { useAuth } from '@/shared/components/providers'

export function useLoginForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const mutation = useLogin()
  const { login } = useAuth()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await mutation.mutateAsync(data)

      toast.success('Đăng nhập thành công.')

      login(
        {
          id: result.userId!,
          email: result.email ?? '',
          name: result.email ?? '',
          role: result.role ?? '',
        },
        result.accessToken ?? result.userId!,
      )

      form.reset()
      onSuccess?.()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng nhập thất bại!'
      toast.error(message)
    }
  }

  return {
    form,
    mutation,
    onSubmit,
  }
}
