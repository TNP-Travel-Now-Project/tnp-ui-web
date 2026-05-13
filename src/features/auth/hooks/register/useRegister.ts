import { useMutation } from '@tanstack/react-query'
import { registerApi } from '@/features/auth/api/register.api'
import type { RegisterPageProps, RegisterRequest } from '@/features/auth/type'

export const useRegister = ({ onSuccess }: RegisterPageProps) => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => registerApi(data),
    onSuccess: () => {
      onSuccess?.()
    },
    onError: () => {
      alert('Registration failed. Please check your information and try again.')
    },
  })
}
