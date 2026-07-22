'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { CandyPage, Card, CandyButton, EagleMascot } from '@/components/ui/candy'

/**
 * Inline recoverable screen for TRANSIENT server-side failures (a DB
 * timeout, a Neon cold start, a dropped connection while rendering a
 * Server Component).
 *
 * Root cause this exists for: /learn and /dashboard used to `throw` on a
 * transient DB timeout, which escalated a routine network hiccup all the
 * way to the app-wide error boundary (error.tsx — "Something went wrong",
 * Error ID: <digest>). A connection blip is NOT unrecoverable corruption;
 * it must stay local to the page, retry itself, and never reset navigation.
 *
 * Recovery model:
 *  - auto-retry via router.refresh() with backoff (3s → 6s → 12s), tracked
 *    in sessionStorage because a successful refresh unmounts this component
 *    and a failed one remounts it fresh (server re-render), so React state
 *    can't carry the attempt count across attempts;
 *  - after 3 auto attempts, stop auto-retrying (no infinite refresh loop —
 *    the manual Retry button remains and resets the counter);
 *  - a counter older than 60s is stale (previous, already-recovered
 *    incident) and is discarded.
 */
const AUTO_RETRY_DELAYS_MS = [3000, 6000, 12000]
const COUNTER_STALE_MS = 60000

export function ConnectionRecovery({ retryKey }: { retryKey: string }) {
  const { t } = useLanguage()
  const router = useRouter()
  const [autoExhausted, setAutoExhausted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const storageKey = `connection-recovery:${retryKey}`

  useEffect(() => {
    let attempt = 0
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as { attempt: number; ts: number }
        if (Date.now() - parsed.ts < COUNTER_STALE_MS) attempt = parsed.attempt
      }
    } catch { /* sessionStorage unavailable (private mode) — degrade to manual retry only */ }

    if (attempt >= AUTO_RETRY_DELAYS_MS.length) {
      setAutoExhausted(true)
      return
    }

    timerRef.current = setTimeout(() => {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify({ attempt: attempt + 1, ts: Date.now() }))
      } catch { /* ignore */ }
      router.refresh()
    }, AUTO_RETRY_DELAYS_MS[attempt])

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [router, storageKey])

  const manualRetry = () => {
    try { sessionStorage.removeItem(storageKey) } catch { /* ignore */ }
    setAutoExhausted(false)
    router.refresh()
  }

  return (
    <CandyPage className="p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen text-center gap-4">
        <EagleMascot variant="hero" size={96} />
        <Card className="px-6 py-8 flex flex-col items-center gap-3">
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>
            {t('error_title')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
            {t('lesson_connect_failed')}
          </p>
          {!autoExhausted && (
            <p className="text-xs" style={{ color: 'var(--candy-ink-soft)', opacity: 0.7 }}>
              {t('lesson_reconnecting')}
            </p>
          )}
          <CandyButton
            onClick={manualRetry}
            className="px-5 py-3 rounded-2xl text-sm mt-2 w-full"
            style={{ background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, border: 'none' }}
          >
            {t('error_cta_retry')}
          </CandyButton>
        </Card>
      </div>
    </CandyPage>
  )
}
