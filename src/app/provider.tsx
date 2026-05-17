'use client'

import { QueryProvider, ThemeProvider } from '@/shared/components/providers'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {/* <ToastProvider> */}
        {children}
        {/* </ToastProvider> */}
      </ThemeProvider>
    </QueryProvider>
  )
}
