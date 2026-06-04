import { z } from 'zod'
import type { RegisterRequest } from '@/features/auth/type'

export const RegisterSchema = z
  .object({
    // firstName: z
    //   .string()
    //   .max(50, { message: 'Tên không được vượt quá 50 ký tự' })
    //   .nonempty({ message: 'Vui lòng nhập tên' }),

    // lastName: z
    //   .string()
    //   .max(50, { message: 'Họ không được vượt quá 50 ký tự' })
    //   .nonempty({ message: 'Vui lòng nhập họ' }),

    username: z
      .string()
      .max(256, { message: 'Tên người dùng không được vượt quá 256 ký tự' })
      .nonempty({ message: 'Vui lòng nhập tên người dùng' }),

    email: z.email({ message: 'Địa chỉ email không hợp lệ' }),

    // phoneNumber: z
    //   .string()
    //   .nonempty({ message: 'Vui lòng nhập số điện thoại' })
    //   .regex(/^\d{10}$/, { message: 'Số điện thoại phải gồm 10 chữ số' }),

    // dateOfBirth: z.string().nonempty({
    //   message: 'Vui lòng nhập ngày sinh',
    // }),

    password: z
      .string()
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
      .max(20, { message: 'Mật khẩu không được vượt quá 20 ký tự' })
      .regex(/[A-Z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa' })
      .regex(/[a-z]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ thường' })
      .regex(/[0-9]/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ số' })
      .regex(/[~!@#$%^&*()_+=?]/, { message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt' }),

    confirmPassword: z.string().nonempty({ message: 'Vui lòng xác nhận mật khẩu' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof RegisterSchema>

export const toRegisterRequest = (data: RegisterFormData): RegisterRequest => ({
  // firstName: data.firstName,
  // lastName: data.lastName,
  username: data.username,
  email: data.email,
  password: data.password,
  confirmPassword: data.confirmPassword,
  // phoneNumber: data.phoneNumber,
  // dateOfBirth: data.dateOfBirth,
})
