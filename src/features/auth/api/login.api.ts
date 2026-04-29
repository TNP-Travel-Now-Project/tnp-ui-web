import type { LoginRequest, LoginResponse } from '@/src/features/auth/type'
import api from '@/src/shared/lib/api-client'

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data)
  return response.data
}
