'use client'

// import type { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import LoginForm from '@/src/features/auth/components/login/login-form'

// export const metadata: Metadata = {
//   title: 'Authentication | Sign Up',
//   description: 'Sign Up page for authentication.',
// }

export default function LoginPage() {
  const route = useRouter()
  return <LoginForm onSuccess={() => route.push('/order')} />
}
