'use client'

import { useRouter } from 'next/navigation'
import AboutUs from '@/features/landing/components/AboutUs/about-us'

export default function AboutPage() {
  const router = useRouter()
  return <AboutUs onBack={() => router.push('/')} onContactClick={() => router.push('/contact')} />
}
