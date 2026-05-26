import axios from 'axios'
import { ApiError } from '@/lib/api-error'
import { config } from '@/lib/config'
import { getCSRFToken } from '@/lib/csrf'

/**
 * Axios instance dùng chung cho toàn bộ ứng dụng
 *
 * Tính năng:
 * - Tự động gắn CSRF token vào request
 * - Tự động parse lỗi thành ApiError (có status code, message, field errors)
 * - Base URL từ env (qua config)
 *
 * Cách dùng:
 *   import axiosClient from '@/lib/axiosClient-client'
 *   import type { axiosClientResponse } from '@/shared/types'
 *
 *   // GET
 *   const { data } = await axiosClient.get<ApiResponse<User>>('/users/1')
 *
 *   // POST
 *   const { data } = await axiosClient.post<ApiResponse<User>>('/users', payload)
 *
 *   // Error handling
 *   try { ... }
 *   catch (e) { throw ApiError.fromAxiosError(e) }
 */

export const axiosClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ====================== Request Interceptor ======================

axiosClient.interceptors.request.use((reqConfig) => {
  const csrf = getCSRFToken()

  if (csrf) {
    reqConfig.headers['X-CSRF-TOKEN'] = csrf
  }

  return reqConfig
})

// ====================== Response Interceptor ======================

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Parse lỗi Axios thành ApiError để component dễ xử lý
    return Promise.reject(ApiError.fromAxiosError(error))
  },
)
