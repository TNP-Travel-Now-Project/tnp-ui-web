'use client'

import { useRouter } from 'next/navigation'
import RegisterForm from '@/features/auth/components/register/register-form'

export default function RegisterPage() {
  const route = useRouter()
  return <RegisterForm onSuccess={() => route.push('/order')} />
}
