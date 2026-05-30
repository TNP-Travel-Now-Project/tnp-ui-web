'use client'

import LandingLayout from '@/shared/components/layout/landing-layout'
import { ThemeSetter } from '@/shared/components/providers'

export default function AboutPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeSetter theme='system' />
      <LandingLayout>{children}</LandingLayout>
    </>
  )
}
