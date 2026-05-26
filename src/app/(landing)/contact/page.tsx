'use client'

import { useRouter } from 'next/navigation'
import Contact from '@/features/landing/components/Contact/contact'

export default function ContactPage() {
  const router = useRouter()
  return (
    <Contact
      onBack={() => router.push('/')}
      // isLoggedIn={false}
    />
  )
}
