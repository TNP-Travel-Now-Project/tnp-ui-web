'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function NavItemCustom({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        'group relative py-2 text-sm font-bold transition-colors',
        isActive ? 'text-primary' : 'text-slate-500 hover:text-primary',
      )}
    >
      {children}

      <span
        className={cn(
          'absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary transition-transform duration-300',
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
        )}
      />
    </Link>
  )
}
