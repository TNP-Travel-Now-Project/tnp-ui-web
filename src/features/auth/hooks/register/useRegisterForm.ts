import { toast } from 'sonner'
import { type RegisterFormData, RegisterSchema } from '@/features/auth/schemas/register.schema'
import { useRegister } from '@/features/auth/hooks/register/useRegister'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const useRegisterForm = () => {
  const mutation = useRegister()

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
    await toast.promise(mutation.mutateAsync(data), {
      loading: 'Đang thực hiện đăng ký...',
      success: 'Đăng ký thành công.',
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
