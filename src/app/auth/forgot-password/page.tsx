'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LanguageToggle, useLanguage } from '@/components/ui/LanguageToggle'
import { AuthBackLink } from '@/components/auth/AuthBackLink'
import { Card, CandyButton, EagleMascot } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 14,
  border: '1px solid var(--candy-shadow)',
  background: 'var(--candy-card)',
  color: 'var(--candy-ink)',
  fontSize: 14,
}

type State = 'idle' | 'loading' | 'sent' | 'error'

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? data.message ?? t('error_required'))
        setState('error')
      } else {
        setState('sent')
      }
    } catch {
      setErrorMsg(t('reset_error_network'))
      setState('error')
    }
  }

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      <div className="absolute top-5 right-5"><LanguageToggle /></div>

      {/* Logo */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <EagleMascot variant="logo" size={28} />
        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--candy-red)' }}>My Tutor</span>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          <AuthBackLink href="/" label={t('nav_back_home')} icon="home" />
          <AuthBackLink href="/auth/login" label={t('nav_back_login')} />
        </div>

        {state === 'sent' ? (
          <Card style={{ padding: 28, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <EagleMascot variant="hero" size={72} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', marginBottom: 12 }}>
              {t('forgot_success')}
            </h1>
            <p style={{ fontSize: 14, marginBottom: 20, lineHeight: 1.5, color: 'var(--candy-ink-soft)' }}>
              <span style={{ fontWeight: 700, color: 'var(--candy-ink)' }}>{email}</span>
            </p>
            <Link href="/auth/login" className="block w-full"
              style={{ padding: '12px', borderRadius: 14, background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, fontSize: 14, textAlign: 'center', textDecoration: 'none', boxShadow: '0 4px 0 var(--candy-purple-d)' }}>
              {t('forgot_back')}
            </Link>
          </Card>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <EagleMascot variant="hero" size={56} />
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>We&rsquo;ll help you get back in</h1>
                <p style={{ fontSize: 13, color: 'var(--candy-ink-soft)', margin: 0 }}>{t('forgot_sub')}</p>
              </div>
            </div>

            <Card style={{ padding: 24 }}>
              {errorMsg !== null && (
                <div className="mb-5 p-3.5 rounded-xl text-sm"
                  style={{ background: 'rgba(255, 75, 75, 0.08)', border: '1px solid rgba(255, 75, 75, 0.2)', color: 'var(--candy-red)' }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--candy-ink-soft)' }}>
                    {t('forgot_email')}
                  </label>
                  <input
                    type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorMsg(null) }}
                    required placeholder="your@email.com" style={inputStyle}
                  />
                </div>
                <CandyButton
                  type="submit" disabled={state === 'loading'}
                  className="w-full" shadowColor="var(--candy-purple-d)"
                  style={{ padding: '12px', borderRadius: 14, background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, fontSize: 14, opacity: state === 'loading' ? 0.5 : 1 }}>
                  {state === 'loading' ? '...' : t('forgot_btn')}
                </CandyButton>
              </form>
            </Card>

            <p className="text-center mt-6 text-sm" style={{ color: 'var(--candy-ink-soft)' }}>
              <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: 'var(--candy-red)' }}>
                {t('forgot_back')}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
