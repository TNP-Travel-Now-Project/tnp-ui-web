import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRegister } from '@/features/auth/hooks/register/useRegister'
import { type RegisterFormData, RegisterSchema } from '@/features/auth/schemas/register.schema'
import { useAuth } from '@/shared/components/providers'

export const useRegisterForm = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const mutation = useRegister()
  const { login } = useAuth()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onSubmit',
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

      toast.success('Đăng ký thành công.')

      login(
        {
          id: result.userId,
          email: result.email,
          name: result.fullName,
        },
        result.userId,
      )

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
