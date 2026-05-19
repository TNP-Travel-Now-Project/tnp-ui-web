import { cn } from '@/lib/utils'
import { Skeleton as ShadcnSkeleton } from '@/components/ui/feedback/skeleton'

export interface SkeletonProps extends React.ComponentProps<typeof ShadcnSkeleton> {
  width?: string | number
  height?: string | number
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

export const Skeleton = ({ width, height, rounded = 'md', className, ...props }: SkeletonProps) => {
  return (
    <ShadcnSkeleton
      className={cn(
        {
          'rounded-sm': rounded === 'sm',
          'rounded-md': rounded === 'md',
          'rounded-lg': rounded === 'lg',
          'rounded-full': rounded === 'full',
        },
        className,
      )}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
      {...props}
    />
  )
}

/// code template
// <Skeleton width={300} height={20} />
// <Skeleton className="h-12 w-12 rounded-full" />
///
