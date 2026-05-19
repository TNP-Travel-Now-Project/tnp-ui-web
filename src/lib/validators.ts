/**
 * Hàm validation cơ bản (cho các trường hợp đơn giản không cần Zod)
 *
 * ⚠️ Ưu tiên dùng Zod schema trong feature (features/{feature}/schemas/).
 * File này chỉ dùng cho validation nhanh, một-off.
 *
 * Cách dùng:
 *   import { isValidPhone, isValidEmail } from '@/lib/validators'
 *
 *   if (!isValidPhone(phone)) return 'Số điện thoại không hợp lệ'
 */

/**
 * Kiểm tra số điện thoại Việt Nam (10 hoặc 11 số, bắt đầu bằng 0)
 *
 * Hợp lệ: 0981234567, 0369876543, 01234567890
 */
export function isValidPhone(value: string): boolean {
  if (!value) return false
  // 10 số: bắt đầu bằng 03, 05, 07, 08, 09
  // 11 số: bắt đầu bằng 01 (đầu số cũ)
  return /^(0[35789]\d{8}|01\d{9})$/.test(value.replace(/\D/g, ''))
}

/**
 * Kiểm tra email cơ bản
 *
 * Lưu ý: validation chi tiết nên dùng Zod email()
 */
export function isValidEmail(value: string): boolean {
  if (!value) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/**
 * Kiểm tra password có đủ mạnh không (ít nhất 8 ký tự, có chữ hoa, chữ thường, số)
 */
export function isValidPassword(value: string): boolean {
  if (!value) return false
  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value)
}

/**
 * Kiểm tra URL hợp lệ
 */
export function isValidUrl(value: string): boolean {
  if (!value) return false
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
