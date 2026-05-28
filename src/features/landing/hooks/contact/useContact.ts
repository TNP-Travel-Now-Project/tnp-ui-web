import { useMutation } from '@tanstack/react-query'
import { contactApi } from '@/features/landing/api/contact.api'
import type { ContactInput, ContactOutput } from '@/features/landing/types/contact.type'
import type { ApiError } from '@/lib/api-error'
import type { BaseResponse } from '@/shared/types/response'

export const useSendContactInfo = () => {
  return useMutation<BaseResponse<ContactOutput>, ApiError, ContactInput>({
    mutationFn: async (formData: ContactInput) => contactApi(formData),
  })
}
