import { z } from 'zod'

/**
 * Password validation rules dùng chung cho login & register
 *
 * Rules:
 * - Min 8, max 20 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 digit
 * - At least 1 special character (~!@#$%^&*()_+=?)
 */
export const passwordValidation = {
  min: 8,
  max: 20,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  digit: /[0-9]/,
  special: /[~!@#$%^&*()_+=?]/,
}

export const passwordField = (options?: { nonempty?: boolean }) => {
  let field = z
    .string()
    .min(passwordValidation.min, {
      message: `Mật khẩu phải có ít nhất ${passwordValidation.min} ký tự`,
    })
    .max(passwordValidation.max, {
      message: `Mật khẩu không được vượt quá ${passwordValidation.max} ký tự`,
    })
    .regex(passwordValidation.uppercase, { message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa' })
    .regex(passwordValidation.lowercase, { message: 'Mật khẩu phải chứa ít nhất 1 chữ thường' })
    .regex(passwordValidation.digit, { message: 'Mật khẩu phải chứa ít nhất 1 chữ số' })
    .regex(passwordValidation.special, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt' })

  if (options?.nonempty) {
    field = field.nonempty({ message: 'Vui lòng nhập mật khẩu' })
  }

  return field
}
