import { useMutation } from '@tanstack/react-query'
import { registerApi } from '@/features/auth/api/register.api'
import type { RegisterRequest } from '@/features/auth/type'

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => registerApi(data),
  })
}
