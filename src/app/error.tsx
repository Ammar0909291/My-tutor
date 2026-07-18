'use client'
import { useEffect } from 'react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { CandyPage, Card, CandyButton, EagleMascot } from '@/components/ui/candy'

/**
 * App-wide runtime-error boundary — replaces Next.js's bare default error
 * page with the candy design system so an unhandled render/render-fetch
 * error doesn't drop a student out of the product's visual language.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLanguage()

  useEffect(() => {
    console.error('[app-error-boundary]', error)
  }, [error])

  return (
    <CandyPage className="p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen text-center gap-4">
        <EagleMascot variant="hero" size={96} />
        <Card className="px-6 py-8 flex flex-col items-center gap-3">
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>
            {t('error_title')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
            {t('error_body')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
            <CandyButton
              onClick={() => reset()}
              className="flex-1 px-5 py-3 rounded-2xl text-sm"
              style={{ background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, border: 'none' }}
            >
              {t('error_cta_retry')}
            </CandyButton>
            <CandyButton
              onClick={() => { window.location.href = '/dashboard' }}
              className="flex-1 px-5 py-3 rounded-2xl text-sm"
              style={{ background: 'var(--candy-card)', color: 'var(--candy-ink)', fontWeight: 800, border: 'none' }}
            >
              {t('error_cta_dashboard')}
            </CandyButton>
          </div>
        </Card>
      </div>
    </CandyPage>
  )
}
