'use client'

import MainLayout from '@/shared/components/layout/main-layout'

export default function MainRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>{children}</MainLayout>
  )
}
