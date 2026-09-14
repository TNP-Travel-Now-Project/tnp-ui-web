import { z } from 'zod'
import type { RegisterCommand } from '@/shared/api'
import { passwordField } from './password.schema'

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

    password: passwordField(),

    confirmPassword: z.string().nonempty({ message: 'Vui lòng xác nhận mật khẩu' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof RegisterSchema>

export const toRegisterRequest = (data: RegisterFormData): RegisterCommand => ({
  // firstName: data.firstName,
  // lastName: data.lastName,
  userName: data.username,
  email: data.email,
  password: data.password,
  confirmPassword: data.confirmPassword,
  // phoneNumber: data.phoneNumber,
  // dateOfBirth: data.dateOfBirth,
})
