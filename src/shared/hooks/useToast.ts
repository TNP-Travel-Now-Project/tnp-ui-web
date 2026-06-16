import { toast } from 'sonner'

/**
 * Hook tiện ích cho toast notification
 *
 * Dùng để thay thế cho useToast() từ staging layout/Toast (file rỗng).
 * Hỗ trợ 2 cách gọi:
 *   1. showToast('message')
 *   2. showToast('success', 'Thao tác thành công')
 *   3. showToast('error', 'Có lỗi xảy ra')
 *
 * Cách dùng:
 *   const { showToast } = useToast()
 *   showToast('success', 'Đã cập nhật thành công!')
 */
export function useToast() {
  const showToast = (typeOrMessage: string, message?: string) => {
    if (!message) {
      toast(typeOrMessage)
      return
    }
    switch (typeOrMessage) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      case 'warning':
        toast.warning(message)
        break
      default:
        toast(message)
        break
    }
  }

  return { showToast }
}
