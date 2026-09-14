import { z } from 'zod'
import { passwordField } from './password.schema'

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Vui lòng nhập email' })
    .email({ message: 'Địa chỉ email không hợp lệ' }),

  password: passwordField({ nonempty: true }),

  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof LoginSchema>
