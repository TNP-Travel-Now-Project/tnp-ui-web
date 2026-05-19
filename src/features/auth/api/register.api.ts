import type { RegisterRequest, RegisterResponse } from '@/features/auth/type'
import api from '@/lib/api-client'

export const registerApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register ', data)
  return response.data
}
