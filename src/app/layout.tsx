import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Providers from '@/app/provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/shared/components/feedback/Toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const THEME_SCRIPT = `(function() {
  try {
    var theme = localStorage.getItem('theme');
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme) {
      if (theme === 'system') {
        var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(dark ? 'dark' : 'light');
      } else {
        root.classList.add(theme);
      }
    } else {
      var path = window.location.pathname;
      var isLanding = path === '/' || path.startsWith('/about') || path.startsWith('/contact');
      if (isLanding) {
        var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(dark ? 'dark' : 'light');
      } else {
        root.classList.add('light');
      }
    }
  } catch(e) {}
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn('font-sans', inter.variable)} suppressHydrationWarning>
      <body>
        <Script id='theme-script' strategy='beforeInteractive'>
          {THEME_SCRIPT}
        </Script>
        {/* <div aria-hidden='true' style={{ display: 'none' }} /> */}
        <Providers>
          {children}
          <Toaster position='top-right' />
        </Providers>
      </body>
    </html>
  )
}
