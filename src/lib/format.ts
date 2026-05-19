/**
 * Tiện ích định dạng số, chuỗi, tiền tệ
 *
 * Cách dùng:
 *   import { formatCurrency, formatPhone, truncate, capitalize } from '@/lib/format'
 *
 *   formatCurrency(150000)          // "150.000 ₫"
 *   formatPhone('0981234567')      // "098 123 4567"
 *   truncate('Hello world', 8)     // "Hello wo..."
 *   capitalize('hello')            // "Hello"
 */

/**
 * Định dạng tiền tệ VND
 *
 * @example formatCurrency(150000) → "150.000 ₫"
 * @example formatCurrency(0) → "0 ₫"
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return ''
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

/**
 * Định dạng số có dấu phân cách
 *
 * @example formatNumber(1500000) → "1.500.000"
 */
export function formatNumber(value: number | null | undefined): string {
  if (value == null) return ''
  return new Intl.NumberFormat('vi-VN').format(value)
}

/**
 * Định dạng số điện thoại Việt Nam
 *
 * @example formatPhone('0981234567') → "098 123 4567"
 * @example formatPhone('0981234567') → "098 123 4567"
 */
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }

  return phone
}

/**
 * Cắt chuỗi với dấu "..." nếu quá dài
 *
 * @example truncate('Hello world', 8) → "Hello wo..."
 * @example truncate('Hello', 10) → "Hello"
 */
export function truncate(text: string | null | undefined, maxLength: number): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Viết hoa chữ cái đầu
 *
 * @example capitalize('hello world') → "Hello world"
 */
export function capitalize(text: string | null | undefined): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Chuyển chuỗi thành slug URL
 *
 * @example slugify('Xin chào thế giới') → "xin-chao-the-gioi"
 */
export function slugify(text: string | null | undefined): string {
  if (!text) return ''
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
