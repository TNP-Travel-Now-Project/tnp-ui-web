import z from 'zod'

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at latest 2 characters long!' })
    .max(150, { message: 'Name must be at most 150 characters long!' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }),

  email: z.email({ message: 'Invalid email address' }),

  description: z
    .string()
    .min(10, { message: 'Name must be at latest 2 characters long!' })
    .max(250, { message: 'Name must be at most 250 characters long!' }),
})

export type ContactFormData = z.infer<typeof ContactSchema>
