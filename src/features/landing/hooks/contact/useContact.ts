import { ApiError } from '@/lib/api-error'
import { useMutation } from '@tanstack/react-query'
import { contactApi } from '@/features/landing/api/contact.api'
import type { BaseResponse } from '@/shared/types/response'
import type { ContactInput, ContactOutput } from '@/features/landing/types/contact.type'

export const useSendContactInfo = () => {
  return useMutation<BaseResponse<ContactOutput>, ApiError, ContactInput>({
    mutationFn: async (formData: ContactInput) => contactApi(formData),
  })
}
