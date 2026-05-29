import type { Metadata } from 'next'
import LandingPage from '@/features/landing/components/landing-page'

export const metadata: Metadata = { title: 'Trang chủ - chudu4be' }

export default function LandingHome() {
  return <LandingPage />
}
