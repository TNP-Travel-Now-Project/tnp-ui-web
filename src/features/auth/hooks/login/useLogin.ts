import { useMutation } from '@tanstack/react-query'
import type { LoginPageProps, LoginRequest } from '@/src/features/auth//type'
import { loginApi } from '@/src/features/auth/api/login.api'

export const useLogin = ({ onSuccess }: LoginPageProps) => {
  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: () => {
      onSuccess?.()
    },
    onError: () => {
      alert('Login failed. Please check your credentials and try again.')
    },
  })
}
