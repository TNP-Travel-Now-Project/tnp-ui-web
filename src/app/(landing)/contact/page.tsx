import Contact from '@/features/landing/components/Contact/Contact'
import type { Metadata } from 'next'

<<<<<<< HEAD
export const metadata: Metadata = { title: 'Liên hệ - chudu4be' }
=======
import { useRouter } from 'next/navigation'
import Contact from '@/features/landing/components/Contact/Contact'
>>>>>>> fe6ea22 (refactor(ui): TNP-TuanNT refactor landing-layout, split AuthModalContext in folder Contexts Provider component)

export default function ContactPage() {
  return <Contact />
}
