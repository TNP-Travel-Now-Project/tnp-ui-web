import './globals.css'

import { Inter } from 'next/font/google'
import Script from 'next/script'
import Providers from '@/app/provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/shared/components/feedback/Toast'
import { theme_script } from '@/shared/constants'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn('font-sans', inter.variable)} suppressHydrationWarning>
      <body>
        <Script id='theme-script' strategy='beforeInteractive'>
          {theme_script}
        </Script>

        <Providers>
          {children}
          <Toaster position='top-right' />
        </Providers>
      </body>
    </html>
  )
}
