import { z } from 'zod'
import type { RegisterRequest } from '@/src/features/auth/type'

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .max(50, { message: 'First name must be not longer than 50 characters' })
      .nonempty({ message: 'First name is required' }),

    lastName: z
      .string()
      .max(50, { message: 'Last name must be not longer than 50 characters' })
      .nonempty({ message: 'Last name is required' }),

    userName: z
      .string()
      .max(256, { message: 'User name must be not longer than 256 characters' })
      .nonempty({ message: 'User name is required' }),

    email: z.email({ message: 'Invalid email address' }),

    phoneNumber: z
      .string()
      .nonempty({ message: 'Phone number is required' })
      .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),

    dateOfBirth: z.string().nonempty({ message: 'Date of birth is required' }),

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

    confirmPassword: z.string().nonempty({ message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  })

export type RegisterFormData = z.infer<typeof RegisterSchema>

export const toRegisterRequest = (data: RegisterFormData): RegisterRequest => ({
  firstName: data.firstName,
  lastName: data.lastName,
  userName: data.userName,
  email: data.email,
  password: data.password,
  confirmPassword: data.confirmPassword,
  phoneNumber: data.phoneNumber,
  dateOfBirth: data.dateOfBirth,
})
