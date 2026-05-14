import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/app/provider'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn('font-sans', inter.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
