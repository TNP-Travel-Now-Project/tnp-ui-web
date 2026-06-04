import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .email({ message: 'Địa chỉ email không hợp lệ' })
    .trim()
    .nonempty({ message: 'Vui lòng nhập email' }),

  password: z
    .string()
    .nonempty({ message: 'Vui lòng nhập mật khẩu' })
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
    .max(20, { message: 'Mật khẩu không được vượt quá 20 ký tự' })
    .regex(/[A-Z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa' })
    .regex(/[a-z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ thường' })
    .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ số' })
    .regex(/[~!@#$%^&*()_+=?]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt' }),

  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof LoginSchema>
