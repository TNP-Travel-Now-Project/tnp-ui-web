'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/shared/components/layout/Sidebar/Sidebar'
import { AboutUs } from '@/features/landing/components'
import { AuthModal } from '@/features/auth/components/AuthModal'

export default function AboutPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login')

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isLoggedIn={false}
        currentPage='about'
        onNavigateLanding={() => router.push('/')}
        onNavigateAbout={() => router.push('/about')}
        onNavigateContact={() => router.push('/contact')}
      />
      <AboutUs
        onBack={() => router.push('/')}
        onLogin={() => {
          setAuthInitialTab('login')
          setIsAuthModalOpen(true)
        }}
        onRegister={() => {
          setAuthInitialTab('register')
          setIsAuthModalOpen(true)
        }}
        isLoggedIn={false}
        onContactClick={() => router.push('/contact')}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigateHome={() => {
          setIsSidebarOpen(false)
          router.push('/')
        }}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => router.refresh()}
        initialTab={authInitialTab}
      />
    </>
  )
}
