'use client'

import { cn } from '@/lib/utils'
import { AvatarFallback, AvatarImage, Avatar as ShadcnAvatar } from '@/components/ui/layout/avatar'

export interface AvatarProps extends React.ComponentProps<typeof ShadcnAvatar> {
  src?: string
  alt?: string
  fallback?: string | React.ReactNode
  size?: 'sm' | 'lg'
  status?: 'online' | 'offline' | 'away' | 'busy'
}

const sizeMap = {
  sm: 'h-8 w-8',
  lg: 'h-12 w-12',
}

const Avatar = ({
  src,
  alt = '',
  fallback,
  size = 'lg',
  status,
  className,
  ...props
}: AvatarProps) => {
  return (
    <div className='relative inline-block'>
      <ShadcnAvatar className={cn(sizeMap[size], className)} {...props}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>
          {typeof fallback === 'string' ? fallback : fallback || alt?.slice(0, 2)?.toUpperCase()}
        </AvatarFallback>
      </ShadcnAvatar>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background',
            {
              'bg-green-500': status === 'online',
              'bg-gray-400': status === 'offline',
              'bg-yellow-500': status === 'away',
              'bg-red-500': status === 'busy',
            },
          )}
        />
      )}
    </div>
  )
}

export default Avatar

/// code template
// <Avatar
//   src="https://..."
//   alt="Nguyễn Văn A"
//   size="lg"
//   status="online"
//   fallback="NV"
// />
///
