'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider, QueryProvider, ThemeProvider } from '@/shared/components/providers'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
        <AuthProvider>
          <ThemeProvider defaultTheme='light'>{children}</ThemeProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryProvider>
  )
}
