import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/app/provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/shared/components/feedback/Toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const THEME_SCRIPT = `(function() {
  try {
    var theme = localStorage.getItem('theme') || 'system';
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(dark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  } catch(e) {}
})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn('font-sans', inter.variable)} suppressHydrationWarning>
      <body>
        <div aria-hidden='true' style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<script>${THEME_SCRIPT}<\/script>` }} />
        <Providers>
          {children}
          <Toaster position='top-right' />
        </Providers>
      </body>
    </html>
  )
}
