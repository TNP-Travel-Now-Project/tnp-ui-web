import type { Metadata } from 'next'
import AboutUs from '@/features/landing/components/AboutUs/about-us'

export const metadata: Metadata = { title: 'Về chúng tôi - chudu4be' }

export default function AboutPage() {
  return <AboutUs  />
}
