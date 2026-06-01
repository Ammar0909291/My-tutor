import { CSSProperties } from 'react'

interface SkeletonProps { className?: string; style?: CSSProperties }

export function Skeleton({ className = '', style }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={style} />
}

export function MessageSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[80, 60, 90].map((w, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="w-7 h-7 rounded-full shrink-0" />
          <Skeleton className="h-4 rounded" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
  )
}
