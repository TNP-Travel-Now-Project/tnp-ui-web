import { useMutation } from '@tanstack/react-query'
import type { LoginCommand, LoginResponse } from '@/shared/api'
import { postApiAuthLogin } from '@/shared/api'

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCommand>({
    mutationFn: async (data) => {
      const { data: result } = await postApiAuthLogin({ body: data, throwOnError: true })
      return result
    },
  })
}
