import { useMutation } from '@tanstack/react-query'
import { registerApi } from '@/features/auth/api/register.api'
import type { RegisterRequest, RegisterResponse } from '@/features/auth/type'

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (data) => registerApi(data),
  })
}
