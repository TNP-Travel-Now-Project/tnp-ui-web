'use client'

import { cn } from '@/lib/utils'

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullScreen?: boolean
  inline?: boolean
}

const sizeScale = {
  sm: 0.4,
  md: 0.6,
  lg: 0.8,
  xl: 1,
}

export const Loading = ({
  size = 'xl',
  text,
  fullScreen = false,
  inline = false,
  className,
  ...props
}: LoadingProps) => {
  const cup = (
    <div className='coffee-wrap'>
      <div className='coffee-cup'>
        <div className='coffee-handle' />
      </div>
      <div className='coffee-smoke coffee-smoke--1' />
      <div className='coffee-smoke coffee-smoke--2' />
      <div className='coffee-smoke coffee-smoke--3' />
    </div>
  )

  const scaledCup = (
    <div style={{ transform: `scale(${sizeScale[size]})` }}>
      {cup}
    </div>
  )

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center bg-ghost-white backdrop-blur-sm',
          className,
        )}
        {...props}
      >
        {scaledCup}
        {text && <p className='mt-4 text-sm text-muted-foreground'>{text}</p>}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-screen bg-white gap-3 py-8',
        inline && 'flex-row gap-2 py-0 min-h-0',
        className,
      )}
      {...props}
    >
      {scaledCup}
      {text && <p className={cn('text-sm text-muted-foreground', inline && 'text-base')}>{text}</p>}
    </div>
  )
}
