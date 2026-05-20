'use client'

import type * as React from 'react'
import { Toaster } from 'sonner'

export interface ToastProviderProps {
  children: React.ReactNode
  /** Position of toast */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  /** Theme */
  theme?: 'light' | 'dark' | 'system'
  /** Rich colors */
  richColors?: boolean
  /** Expand */
  expand?: boolean
  /** Close button */
  closeButton?: boolean
}

const ToastProvider = ({
  children,
  position = 'bottom-right',
  theme = 'system',
  richColors = false,
  expand = false,
  closeButton = true,
}: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        position={position}
        theme={theme}
        richColors={richColors}
        expand={expand}
        closeButton={closeButton}
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </>
  )
}

// Export sonner functions for convenience
export { toast } from 'sonner'
export { ToastProvider }

// code template
// <ToastProvider position="bottom-right" theme="light" richColors closeButton>
//   {children}
// </ToastProvider>

// Usage
// import { toast } from '@/shared/components/providers'
// toast.success('Thành công!')
// toast.error('Đã xảy ra lỗi')
// toast('Thông báo')
