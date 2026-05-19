import type { LoginRequest, LoginResponse } from '@/features/auth/type'
import api from '@/lib/api-client'

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data)
  return response.data
}
