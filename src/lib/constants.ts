/**
 * Hằng số ứng dụng dùng chung
 *
 * Tập trung các giá trị lặp lại ở một nơi để dễ và tránh sai chính tả.
 *
 * Cách dùng:
 *   import { PAGINATION, STORAGE_KEYS } from '@/lib/constants'
 *
 *   localStorage.setItem(STORAGE_KEYS.TOKEN, token)
 */

// ====================== Pagination ======================

export const PAGINATION = {
  /** Số bản ghi mặc định mỗi trang */
  DEFAULT_PAGE_SIZE: 10,
  /** Số trang mặc định */
  DEFAULT_PAGE: 1,
  /** Các tuỳ chọn page size cho dropdown */
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
} as const

// ====================== Local Storage Keys ======================

export const STORAGE_KEYS = {
  /** Token xác thực */
  TOKEN: 'tnp_token',
  /** Refresh token */
  REFRESH_TOKEN: 'tnp_refresh_token',
  /** Theme đã chọn */
  THEME: 'tnp_theme',
  /** Ngôn ngữ */
  LOCALE: 'tnp_locale',
} as const

// ====================== Date Format Patterns ======================

export const DATE_FORMAT = {
  /** DD/MM/YYYY */
  DEFAULT: 'DD/MM/YYYY',
  /** YYYY-MM-DD (ISO) */
  ISO: 'YYYY-MM-DD',
  /** DD/MM/YYYY HH:mm */
  DATETIME: 'DD/MM/YYYY HH:mm',
} as const

// ====================== HTTP Status ======================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INTERNAL_ERROR: 500,
} as const
