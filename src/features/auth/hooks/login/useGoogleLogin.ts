'use client'

import { useMutation } from '@tanstack/react-query'
import type { CredentialResponse } from '@react-oauth/google'
import type { LoginResponse } from '@/shared/api'
import { useAuthStore } from '@/shared/stores/auth-store'
import { axiosClient } from '@/lib/api-client'
import { toast } from 'sonner'

export function useGoogleLogin({ onSuccess }: { onSuccess?: () => void } = {}) {
  const login = useAuthStore((s) => s.login)

  const mutation = useMutation({
    mutationFn: async (idToken: string) => {
      const { data } = await axiosClient.post<LoginResponse>('/auth/google-login', { tokenId: idToken })
      return data
    },

    onSuccess: (result) => {
      const user = {
        id: result.userId ?? '',
        email: result.email ?? '',
        name: result.email ?? '',
        role: result.roles?.[0] ?? '',
      }

      login(result.accessToken ?? result.userId ?? '', user)
      toast.success('Đăng nhập thành công.')
      onSuccess?.()
    },

    onError: () => {
      toast.error('Đăng nhập Google thất bại!')
    },
  })

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      mutation.mutate(credentialResponse.credential)
    }
  }

  return {
    handleGoogleSuccess,
    isLoading: mutation.isPending,
  }
}
