import type { LoginRequest, LoginResponse } from '@/features/auth/type'
import { axiosClient } from '@/lib/api-client'

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post('/auth/login', data)
  return response.data
}
