'use client'

import { AuthProvider, QueryProvider, ThemeProvider } from '@/shared/components/providers'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme='light'>{children}</ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  )
}
