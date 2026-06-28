import { CandyPage } from './CandyPage'
import { EagleMascot } from './Mascot'

export interface PageLoadingSkeletonProps {
  /** Short status line shown under the mascot, e.g. "Loading your library…". */
  label: string
}

/**
 * Shared candy-styled route-loading fallback (the content of a Next.js
 * `loading.tsx`), reused across every server-rendered student route that
 * fetches data before its page can render — so a slow network shows the
 * product's mascot/spinner instead of a blank screen or the previous page.
 */
export function PageLoadingSkeleton({ label }: PageLoadingSkeletonProps) {
  return (
    <CandyPage className="p-6">
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen text-center">
        <EagleMascot variant="hero" size={72} />
        <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--candy-purple)', borderTopColor: 'transparent' }} />
        <p className="text-sm" style={{ color: 'var(--candy-ink-soft)', fontWeight: 700 }}>{label}</p>
      </div>
    </CandyPage>
  )
}
