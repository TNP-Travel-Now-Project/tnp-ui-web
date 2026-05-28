import { useMutation } from '@tanstack/react-query'
import type { LoginRequest } from '@/features/auth//type'
import { loginApi } from '@/features/auth/api/login.api'

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
  })
}
