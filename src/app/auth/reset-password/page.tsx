'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useLanguage, LanguageToggle } from '@/components/ui/LanguageToggle'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--bg-base)' }} />}>
      <ResetPasswordForm />
    </Suspense>
  )
}

function ResetPasswordForm() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token') ?? ''
  const { t } = useLanguage()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!token) {
      setErrorMsg(t('rp_invalid_link'))
      setState('error')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setErrorMsg(t('rp_mismatch'))
      setState('error')
      return
    }
    if (password.length < 8) {
      setErrorMsg(t('rp_min_length'))
      setState('error')
      return
    }

    setState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? t('error_default'))
        setState('error')
      } else {
        setState('success')
        setTimeout(() => router.push('/auth/login'), 3000)
      }
    } catch {
      setErrorMsg(t('error_no_connection'))
      setState('error')
    }
  }

  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3
  const strengthColors = ['transparent', '#F85149', '#E3B341', '#56D364']
  const strengthLabels = ['', t('rp_strength_weak'), t('rp_strength_medium'), t('rp_strength_strong')]

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute top-5 right-5"><LanguageToggle /></div>

      <div className="absolute top-5 left-5 flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
      </div>

      <div className="w-full max-w-sm animate-fade-in">

        {state === 'success' ? (
          <div className="text-center">
            <div className="text-5xl mb-5">✅</div>
            <h1 className="text-2xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {t('rp_success_title')}
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {t('rp_success_desc')}
            </p>
            <Link href="/auth/login" className="btn-primary block w-full py-3 text-center text-sm font-bold">
              {t('rp_login_now')}
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {t('rp_title')}
            </h1>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
              {t('rp_sub')}
            </p>

            {(state === 'error') && (
              <div className="mb-5 p-3.5 rounded-xl text-sm"
                style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)', color: '#F85149' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>
                  {t('rp_new_password_label')}
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'} value={password}
                    onChange={(e) => { setPassword(e.target.value); setState('idle') }}
                    required placeholder={t('signup_password_placeholder')} className="input-field pr-10"
                    disabled={!token}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }}>
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((lvl) => (
                        <div key={lvl} className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{ background: strength >= lvl ? strengthColors[strength] : 'var(--bg-elevated)' }} />
                      ))}
                    </div>
                    <span className="text-xs font-medium" style={{ color: strengthColors[strength] }}>
                      {strengthLabels[strength]}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>
                  {t('rp_confirm_label')}
                </label>
                <input
                  type={showPwd ? 'text' : 'password'} value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setState('idle') }}
                  required placeholder={t('rp_confirm_placeholder')} className="input-field"
                  style={confirm && confirm !== password ? { borderColor: '#F85149' } : undefined}
                  disabled={!token}
                />
                {confirm && confirm !== password && (
                  <p className="mt-1 text-xs" style={{ color: '#F85149' }}>{t('rp_confirm_mismatch')}</p>
                )}
              </div>

              <button type="submit"
                disabled={state === 'loading' || !token || password !== confirm || password.length < 8}
                className="btn-primary w-full py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                {state === 'loading' ? t('rp_saving') : t('rp_submit')}
              </button>
            </form>

            <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Link href="/auth/forgot-password" className="font-semibold hover:underline" style={{ color: 'var(--accent-primary)' }}>
                {t('rp_request_new_link')}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
