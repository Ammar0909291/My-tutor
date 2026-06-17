'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
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

type State = 'idle' | 'loading' | 'success' | 'error'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }} />}>
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setErrorMsg(t('reset_error_invalid_token'))
      setState('error')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setErrorMsg(t('reset_error_mismatch'))
      setState('error')
      return
    }
    if (password.length < 8) {
      setErrorMsg(t('reset_error_too_short'))
      setState('error')
      return
    }

    setState('loading')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? t('reset_error_generic'))
        setState('error')
      } else {
        setState('success')
        setTimeout(() => router.push('/auth/login'), 3000)
      }
    } catch {
      setErrorMsg(t('reset_error_network'))
      setState('error')
    }
  }

  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3
  const strengthColors = ['transparent', '#F85149', '#E3B341', '#56D364']
  const strengthLabels = ['', t('reset_strength_weak'), t('reset_strength_medium'), t('reset_strength_strong')]

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      <div className="absolute top-5 right-5"><LanguageToggle /></div>

      <div className="absolute top-5 left-5 flex items-center gap-2">
        <EagleMascot variant="logo" size={28} />
        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--candy-red)' }}>My Tutor</span>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          <AuthBackLink href="/" label={t('nav_back_home')} icon="home" />
          <AuthBackLink href="/auth/login" label={t('nav_back_login')} />
        </div>

        {state === 'success' ? (
          <Card style={{ padding: 28, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <EagleMascot variant="hero" size={72} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', marginBottom: 12 }}>
              {t('reset_success_title')}
            </h1>
            <p style={{ fontSize: 14, marginBottom: 20, color: 'var(--candy-ink-soft)' }}>
              {t('reset_success_sub')}
            </p>
            <Link href="/auth/login" className="block w-full"
              style={{ padding: '12px', borderRadius: 14, background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, fontSize: 14, textAlign: 'center', textDecoration: 'none', boxShadow: '0 4px 0 var(--candy-purple-d)' }}>
              {t('reset_success_login')}
            </Link>
          </Card>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <EagleMascot variant="hero" size={56} />
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>Create a new password</h1>
                <p style={{ fontSize: 13, color: 'var(--candy-ink-soft)', margin: 0 }}>{t('reset_sub')}</p>
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
                    {t('reset_label_password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? 'text' : 'password'} value={password}
                      onChange={(e) => { setPassword(e.target.value); setState('idle'); setErrorMsg(null) }}
                      required placeholder={t('reset_placeholder_password')} style={{ ...inputStyle, paddingRight: 40 }}
                      disabled={!token}
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--candy-ink-soft)' }}>
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3].map((lvl) => (
                          <div key={lvl} className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{ background: strength >= lvl ? strengthColors[strength] : 'var(--candy-shadow)' }} />
                        ))}
                      </div>
                      <span className="text-xs font-medium" style={{ color: strengthColors[strength] }}>
                        {strengthLabels[strength]}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--candy-ink-soft)' }}>
                    {t('reset_label_confirm')}
                  </label>
                  <input
                    type={showPwd ? 'text' : 'password'} value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setState('idle'); setErrorMsg(null) }}
                    required placeholder={t('reset_placeholder_confirm')} style={confirm && confirm !== password ? { ...inputStyle, borderColor: 'var(--candy-red)' } : inputStyle}
                    disabled={!token}
                  />
                  {confirm && confirm !== password && (
                    <p className="mt-1 text-xs" style={{ color: 'var(--candy-red)' }}>{t('reset_mismatch_hint')}</p>
                  )}
                </div>

                <CandyButton type="submit"
                  disabled={state === 'loading' || !token || password !== confirm || password.length < 8}
                  className="w-full" shadowColor="var(--candy-purple-d)"
                  style={{ padding: '12px', borderRadius: 14, background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, fontSize: 14, opacity: (state === 'loading' || !token || password !== confirm || password.length < 8) ? 0.5 : 1 }}>
                  {state === 'loading' ? t('reset_saving') : t('reset_btn')}
                </CandyButton>
              </form>
            </Card>

            <p className="text-center mt-6 text-sm" style={{ color: 'var(--candy-ink-soft)' }}>
              <Link href="/auth/forgot-password" className="font-semibold hover:underline" style={{ color: 'var(--candy-red)' }}>
                {t('reset_new_link')}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
