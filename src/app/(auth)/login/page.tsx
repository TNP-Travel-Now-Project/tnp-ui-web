'use client'

import { useRouter } from 'next/navigation'
import AuthModal from '@/features/auth/components/AuthModal/AuthModal'

export default function LoginPage() {
  const router = useRouter()

  return (
    <AuthModal
      isOpen={true}
      onClose={() => router.push('/')}
      onSuccess={() => router.push('/dashboard')}
      activeTab='login'
      onTabChange={() => { }}
    />
  )
}
