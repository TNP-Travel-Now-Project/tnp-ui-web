import axios from 'axios'
import { config } from '@/lib/config'
import { getCSRFToken } from '@/lib/csrf'
import { ApiError } from '@/lib/api-error'

/**
 * Axios instance dùng chung cho toàn bộ ứng dụng
 *
 * Tính năng:
 * - Tự động gắn CSRF token vào request
 * - Tự động parse lỗi thành ApiError (có status code, message, field errors)
 * - Base URL từ env (qua config)
 *
 * Cách dùng:
 *   import api from '@/lib/api-client'
 *   import type { ApiResponse } from '@/shared/types'
 *
 *   // GET
 *   const { data } = await api.get<ApiResponse<User>>('/users/1')
 *
 *   // POST
 *   const { data } = await api.post<ApiResponse<User>>('/users', payload)
 *
 *   // Error handling
 *   try { ... }
 *   catch (e) { throw ApiError.fromAxiosError(e) }
 */

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ====================== Request Interceptor ======================

api.interceptors.request.use((reqConfig) => {
  const csrf = getCSRFToken()

  if (csrf) {
    reqConfig.headers['X-CSRF-TOKEN'] = csrf
  }

  return reqConfig
})

// ====================== Response Interceptor ======================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Parse lỗi Axios thành ApiError để component dễ xử lý
    return Promise.reject(ApiError.fromAxiosError(error))
  },
)

export default api
