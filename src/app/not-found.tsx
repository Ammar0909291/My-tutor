'use client'
import Link from 'next/link'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { CandyPage, Card, CandyButton, EagleMascot } from '@/components/ui/candy'

/**
 * App-wide 404 — replaces Next.js's bare default not-found page with the
 * candy design system so a mistyped/stale URL doesn't drop a student out of
 * the product's visual language.
 */
export default function NotFound() {
  const { t } = useLanguage()

  return (
    <CandyPage className="p-6">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen text-center gap-4">
        <EagleMascot variant="hero" size={96} />
        <Card className="px-6 py-8 flex flex-col items-center gap-3">
          <span className="text-4xl" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-purple)' }}>404</span>
          <h1 className="text-xl" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>
            {t('not_found_title')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
            {t('not_found_body')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
            <Link href="/dashboard" className="flex-1">
              <CandyButton
                className="w-full px-5 py-3 rounded-2xl text-sm"
                style={{ background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, border: 'none' }}
              >
                {t('not_found_cta_dashboard')}
              </CandyButton>
            </Link>
            <Link href="/learn" className="flex-1">
              <CandyButton
                className="w-full px-5 py-3 rounded-2xl text-sm"
                style={{ background: 'var(--candy-card)', color: 'var(--candy-ink)', fontWeight: 800, border: 'none' }}
              >
                {t('not_found_cta_learn')}
              </CandyButton>
            </Link>
          </div>
        </Card>
      </div>
    </CandyPage>
  )
}
