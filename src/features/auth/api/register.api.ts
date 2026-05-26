import type { RegisterRequest, RegisterResponse } from '@/features/auth/type'
import axiosClient from '@/lib/api-client'

export const registerApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axiosClient.post('/auth/register ', data)
  return response.data
}
