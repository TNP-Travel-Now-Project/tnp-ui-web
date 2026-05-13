// components/Feedback/types.ts
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading'

export interface ToastProps {
  message: string
  type?: ToastType
  duration?: number // giây
}
