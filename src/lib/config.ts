/**
 * Cấu hình ứng dụng tập trung
 *
 * Truy cập biến môi trường qua object này thay vì gọi process.env trực tiếp.
 * Giúp:
 * - Type-safe: tự động có kiểu, tránh sai chính tả
 * - Fail fast: báo lỗi ngay khi import nếu thiếu env
 * - Dễ mock khi test
 *
 * Cách dùng:
 *   import { config } from '@/lib/config'
 *   fetch(`${config.apiBaseUrl}/auth/login`)
 */

export const config = {
  /** API Base URL từ .env.local (VD: https://localhost:7160/api) */
  get apiBaseUrl() {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL
    if (!url) {
      throw new Error('Missing env: NEXT_PUBLIC_API_BASE_URL')
    }
    return url
  },

  /** Origin (VD: https://localhost:7160) — dùng cho generated SDK vì paths đã bao gồm /api */
  get apiBaseOrigin() {
    const url = this.apiBaseUrl
    return url.endsWith('/api') ? url.slice(0, -4) : url
  },

  /** Tên ứng dụng */
  get appName() {
    return process.env.NEXT_PUBLIC_APP_NAME || 'TNP UI'
  },

  /** Version hiển thị */
  get appVersion() {
    return process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
  },
} as const
