'use client'

import { useRouter } from 'next/navigation'
import LoginForm from '@/src/features/auth/components/login-form'

export default function LoginPage() {
  const route = useRouter()
  
  return <LoginForm onSuccess={() => route.push('/order')} />
}
