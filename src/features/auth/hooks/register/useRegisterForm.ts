import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRegister } from '@/features/auth/hooks/register/useRegister'
import { type RegisterFormData, RegisterSchema } from '@/features/auth/schemas/register.schema'
import { useAuthStore } from '@/shared/stores/auth-store'

export const useRegisterForm = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const mutation = useRegister()
  const login = useAuthStore((s) => s.login)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await mutation.mutateAsync(data)

      const user = {
        id: result.userId,
        email: result.email,
        name: result.fullName,
      }

      login(result.userId, user)
      toast.success('Đăng ký thành công.')

      form.reset()
      onSuccess?.()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng ký thất bại!'
      toast.error(message)
    }
  }

  return {
    form,
    mutation,
    onSubmit,
  }
}
