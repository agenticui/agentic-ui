import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

interface MessageSkeletonProps {
  className?: string
  role?: 'user' | 'assistant'
}

export function MessageSkeleton({ className, role = 'assistant' }: MessageSkeletonProps) {
  return (
    <div className={cn(
      'flex w-full gap-3 p-4 rounded-lg',
      role === 'user' ? 'ml-auto max-w-[80%] flex-row-reverse' : 'mr-auto max-w-[80%]',
      className
    )}>
      <Skeleton className="rounded-full w-8 h-8 shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

interface ThinkingAnimationProps {
  className?: string
  message?: string
}

export function ThinkingAnimation({ className, message = 'AI is thinking...' }: ThinkingAnimationProps) {
  return (
    <div className={cn('flex items-center gap-3 p-4 rounded-lg bg-muted/50 mr-auto max-w-[80%]', className)}>
      <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 w-8 h-8 flex items-center justify-center text-white text-sm font-semibold">
        AI
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{message}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary', sizes[size], className)} />
  )
}

interface PulseLoaderProps {
  className?: string
  count?: number
  size?: 'sm' | 'md' | 'lg'
}

export function PulseLoader({ className, count = 3, size = 'md' }: PulseLoaderProps) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn('rounded-full bg-primary animate-pulse', sizes[size])}
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </div>
  )
}

interface WaveLoaderProps {
  className?: string
  count?: number
}

export function WaveLoader({ className, count = 5 }: WaveLoaderProps) {
  return (
    <div className={cn('flex items-end gap-1', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-1 bg-primary rounded-full animate-wave"
          style={{ 
            animationDelay: `${i * 100}ms`,
            height: `${Math.random() * 20 + 10}px`
          }}
        />
      ))}
    </div>
  )
}