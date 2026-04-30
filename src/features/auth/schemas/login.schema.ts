import { z } from 'zod'
import type { LoginRequest } from '@/src/features/auth/type'

export const LoginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(20, { message: 'Password must be at most 20 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[~!@#$%^&*()_+=?]/, {
      message: 'Password must contain at least one special character',
    }),

  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof LoginSchema>

export const toLoginRequest = (data: LoginFormData): LoginRequest => ({
  email: data.email,
  password: data.password,
})
