/**
 * Tiện ích xử lý ngày tháng
 *
 * Dùng native Intl API, không cần thêm thư viện.
 * Nếu sau này cần nhiều hơn, cân nhắc thêm date-fns.
 *
 * Cách dùng:
 *   import { formatDate, formatRelative, toISODate } from '@/lib/date'
 *
 *   formatDate('2026-05-19')          // "19/05/2026"
 *   formatDate('2026-05-19', 'en')    // "5/19/2026"
 *   formatRelative('2026-05-18')      // "Hôm qua"
 *   toISODate(new Date())             // "2026-05-19"
 *   isValidDate('2026-05-19')         // true
 */

const LOCALE = 'vi-VN'
const TIME_ZONE = 'Asia/Ho_Chi_Minh'

/**
 * Định dạng ngày theo locale Việt Nam
 *
 * @example formatDate('2026-05-19') → "19/05/2026"
 * @example formatDate('2026-05-19', 'en') → "5/19/2026"
 */
export function formatDate(date: string | Date | null | undefined, locale = LOCALE): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

/**
 * Định dạng ngày + giờ
 *
 * @example formatDateTime('2026-05-19T14:30:00') → "19/05/2026, 14:30"
 */
export function formatDateTime(date: string | Date | null | undefined, locale = LOCALE): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Định dạng thời gian tương đối (VD: "2 giờ trước", "3 ngày trước")
 *
 * @example formatRelative('2026-05-18') → "Hôm qua"
 * @example formatRelative('2026-05-17') → "2 ngày trước"
 */
export function formatRelative(date: string | Date | null | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''

  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return 'Vừa xong'
  if (diffMin < 60) return `${diffMin} phút trước`
  if (diffHour < 24) return `${diffHour} giờ trước`
  if (diffDay === 1) return 'Hôm qua'
  if (diffDay < 7) return `${diffDay} ngày trước`
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} tuần trước`

  return formatDate(date)
}

/**
 * Chuyển Date về ISO string (chỉ lấy ngày, VD: "2026-05-19")
 * Dùng để gửi lên API
 */
export function toISODate(date: Date | null | undefined): string {
  if (!date) return ''
  if (isNaN(date.getTime())) return ''
  return date.toISOString().split('T')[0]
}

/**
 * Kiểm tra giá trị có phải ngày hợp lệ không
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime())
}

/**
 * Kiểm tra chuỗi có phải ngày hợp lệ không
 *
 * @example isValidDateString('2026-05-19') → true
 * @example isValidDateString('abc') → false
 */
export function isValidDateString(value: string): boolean {
  if (!value) return false
  const d = new Date(value)
  return !isNaN(d.getTime())
}
