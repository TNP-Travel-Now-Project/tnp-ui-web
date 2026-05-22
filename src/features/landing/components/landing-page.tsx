'use client'

import type { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import GuestLanding from '@/features/landing/components/GuestLanding/guest-landing'
import LandingLayout from '@/shared/components/layout/landing-layout'
import { useAuth } from '@/shared/components/providers'

export const metadata: Metadata = { title: 'Trang chủ - chudu4be' }

export default function LandingPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <div className='w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    )
  }

  if (isAuthenticated) return null

  return (
    <LandingLayout>
      <GuestLanding
        onLogin={() => router.push('/login')}
        onNavigateAbout={() => router.push('/about')}
      />
    </LandingLayout>
  )
}
