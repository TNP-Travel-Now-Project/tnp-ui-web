'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AuthModal } from '@/features/auth/components/AuthModal'
import Sidebar from '@/shared/components/layout/Sidebar/Sidebar'
import { useAuth } from '@/shared/components/providers'
import Header from './Header/Header'

interface LandingProps {
  children?: React.ReactNode
}

export default function LandingLayout({ children }: LandingProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login')

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
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isLoggedIn={false}
        currentPage='landing'
        onNavigateLanding={() => router.push('/')}
        onNavigateAbout={() => router.push('/about')}
        onNavigateContact={() => router.push('/contact')}
      />
      <Header onNavigateLanding={() => router.push('/')} isLoggedIn={false} />

      <main className='min-h-screen bg-background'>{children}</main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => router.refresh()}
        initialTab={authInitialTab}
      />
    </>
  )
}
