'use client'

import MainLayout from '@/shared/components/layout/main-layout'
import { ThemeSetter } from '@/shared/components/providers/ThemeProvider/theme-setter'

export default function MainRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeSetter theme='light' />
      <MainLayout>{children}</MainLayout>
    </>
  )
}
