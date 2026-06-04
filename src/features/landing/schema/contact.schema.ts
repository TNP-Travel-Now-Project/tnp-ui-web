import z from 'zod'

export const ContactSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'Vui lòng nhập họ và tên' })
    .min(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' })
    .max(150, { message: 'Họ và tên không được vượt quá 150 ký tự' }),

  email: z
    .string()
    .nonempty({ message: 'Vui lòng nhập email' })
    .email({ message: 'Địa chỉ email không hợp lệ' }),

  description: z
    .string()
    .nonempty({ message: 'Vui lòng nhập nội dung' })
    .min(10, { message: 'Nội dung phải có ít nhất 10 ký tự' })
    .max(250, { message: 'Nội dung không được vượt quá 250 ký tự' }),
})

export type ContactFormData = z.infer<typeof ContactSchema>

export const toContactRequest = (data: ContactFormData) => ({
  name: data.username,
  email: data.email,
  description: data.description,
})
