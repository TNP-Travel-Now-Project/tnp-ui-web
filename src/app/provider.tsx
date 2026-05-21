'use client'

import { QueryProvider, ThemeProvider, AuthProvider } from '@/shared/components/providers'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  )
}
