import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { postApiAuthLogout } from '@/shared/api'
import { useAuthStore } from '@/shared/stores/auth-store'
import { toast } from 'sonner'

export const useLogout = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async () => {
      await postApiAuthLogout({ throwOnError: true })
    },
    onSuccess: () => {
      useAuthStore.getState().logout()
      router.push('/')
      toast.success('Đăng xuất thành công')
    },
    onError: () => {
      useAuthStore.getState().logout()
      router.push('/')
      toast.error('Đang xử lý quá trình đăng xuất!')
    },
  })
}
