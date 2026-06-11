'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LanguageToggle, useLanguage } from '@/components/ui/LanguageToggle'
import { AuthBackLink } from '@/components/auth/AuthBackLink'

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
    <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute top-5 right-5"><LanguageToggle /></div>

      {/* Logo */}
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
      </div>

      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <AuthBackLink href="/" label={t('nav_back_home')} icon="home" />
          <AuthBackLink href="/auth/login" label={t('nav_back_login')} />
        </div>

        {state === 'sent' ? (
          <div className="text-center">
            <div className="text-5xl mb-5">📬</div>
            <h1 className="text-2xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {t('forgot_success')}
            </h1>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{email}</span>
            </p>
            <Link href="/auth/login" className="btn-primary block w-full py-3 text-center text-sm font-bold">
              {t('forgot_back')}
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {t('forgot_title')}
            </h1>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
              {t('forgot_sub')}
            </p>

            {errorMsg !== null && (
              <div className="mb-5 p-3.5 rounded-xl text-sm"
                style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)', color: '#F85149' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>
                  {t('forgot_email')}
                </label>
                <input
                  type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorMsg(null) }}
                  required placeholder="your@email.com" className="input-field"
                />
              </div>
              <button
                type="submit" disabled={state === 'loading'}
                className="btn-primary w-full py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                {state === 'loading' ? '...' : t('forgot_btn')}
              </button>
            </form>

            <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: 'var(--accent-primary)' }}>
                {t('forgot_back')}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
