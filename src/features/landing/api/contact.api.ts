import type { ContactInput, ContactOutput } from '@/features/landing/types/contact.type'
import { axiosClient } from '@/lib/api-client'
import type { BaseResponse } from '@/shared/types/response'

export const contactApi = async (formData: ContactInput): Promise<BaseResponse<ContactOutput>> => {
  const response = await axiosClient.post('/user/contact', formData)
  return response.data
}
