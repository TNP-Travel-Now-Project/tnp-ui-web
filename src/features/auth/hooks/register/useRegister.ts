import { useMutation } from '@tanstack/react-query'
import type { RegisterCommand, RegisterResponse } from '@/shared/api'
import { postApiAuthRegister } from '@/shared/api'

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterCommand>({
    mutationFn: async (data) => {
      const { data: result } = await postApiAuthRegister({ body: data, throwOnError: true })
      return result
    },
  })
}
