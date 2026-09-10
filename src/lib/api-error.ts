import axios from 'axios'

/**
 * Lỗi API có cấu trúc
 *
 * Dùng thay cho Error thông thường khi xử lý lỗi từ backend.
 * Giúp component UI biết được status code, mã lỗi, và details để hiển thị phù hợp.
 *
 * Cách dùng:
 *   import { ApiError } from '@/lib/api-error'
 *
 *   // Trong catch:
 *   if (e instanceof ApiError) {
 *     if (e.status === 401) toast.error('Phiên đăng nhập hết hạn')
 *     else toast.error(e.message)
 *   }
 *
 *   // Trong onError của TanStack Query:
 *   onError: (e) => {
 *     if (e instanceof ApiError && e.status === 409) {
 *       form.setError('email', { message: 'Email đã tồn tại' })
 *     }
 *   }
 */
export class ApiError extends Error {
  constructor(
    /** HTTP status code (401, 403, 404, 409, 422, 500...) */
    public readonly status: number,
    /** Mã lỗi từ backend (VD: 'VALIDATION_ERROR', 'UNAUTHORIZED') */
    public readonly code: string,
    message: string,
    /** Dữ liệu lỗi chi tiết (VD: errors validation map) */
    public readonly details?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'ApiError'
  }

  /** Parse lỗi từ Axios thành ApiError */
  static fromAxiosError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const response = error.response?.data as Record<string, unknown> | undefined

      return new ApiError(
        error.response?.status ?? 0,
        (response?.code as string) ?? 'UNKNOWN',
        (response?.message as string) ?? error.message,
        response?.errors as Record<string, string[]> | undefined,
      )
    }

    if (error instanceof ApiError) return error

    return new ApiError(0, 'UNKNOWN', 'Kết nối không ổn định!')
  }

  /** Kiểm tra có lỗi validation field không */
  getFieldError(field: string): string | undefined {
    return this.details?.[field]?.[0]
  }

  /** Lỗi 401 — Unauthorized */
  get isUnauthorized(): boolean {
    return this.status === 401
  }

  /** Lỗi 403 — Forbidden */
  get isForbidden(): boolean {
    return this.status === 403
  }

  /** Lỗi 404 — Not Found */
  get isNotFound(): boolean {
    return this.status === 404
  }

  /** Lỗi 409 — Conflict (VD: email đã tồn tại) */
  get isConflict(): boolean {
    return this.status === 409
  }

  /** Lỗi 422 — Validation Error */
  get isValidationError(): boolean {
    return this.status === 422
  }
}
