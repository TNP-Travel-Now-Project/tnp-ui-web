import type { RegisterRequest, RegisterResponse } from '@/src/features/auth/type'
import api from '@/src/shared/lib/api-client'

export const registerApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register ', data)
  return response.data
}
