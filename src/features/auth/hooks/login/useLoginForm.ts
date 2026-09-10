import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLogin } from '@/features/auth/hooks/login/useLogin'
import type { LoginFormData } from '@/features/auth/schemas/login.schema'
import { LoginSchema } from '@/features/auth/schemas/login.schema'
import { useAuthStore } from '@/shared/stores/auth-store'

export function useLoginForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const mutation = useLogin()
  const login = useAuthStore((s) => s.login)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await mutation.mutateAsync(data)

      const user = {
        id: result.userId!,
        email: result.email ?? '',
        name: result.email ?? '',
        role: result.roles?.[0] ?? '',
      }

      login(result.accessToken ?? result.userId!, user)
      toast.success('Đăng nhập thành công.')

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
    