import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRegister } from '@/features/auth/hooks/register/useRegister'
import {
  type RegisterFormData,
  RegisterSchema,
  toRegisterRequest,
} from '@/features/auth/schemas/register.schema'
import { ApiError } from '@/lib/api-error'

export const useRegisterForm = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const mutation = useRegister()
  const router = useRouter()

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
      await mutation.mutateAsync(toRegisterRequest(data))

      toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
      form.reset()
      onSuccess?.()
      router.push('/')
    } catch (error) {
      const apiError = ApiError.fromAxiosError(error)
      toast.error(apiError.message)
    }
  }

  return {
    form,
    mutation,
    onSubmit,
  }
}
