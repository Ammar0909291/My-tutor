'use client'
import { useState, useEffect, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useLanguage, LanguageToggle } from '@/components/ui/LanguageToggle'
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

const NEXTAUTH_ERROR_KEYS: Record<string, 'error_invalid' | 'error_required'> = {
  CredentialsSignin: 'error_invalid',
}

const NEXTAUTH_ERROR_I18N_KEYS: Record<string, 'error_oauth_linked' | 'error_oauth_signin' | 'error_oauth_callback' | 'error_generic'> = {
  OAuthAccountNotLinked: 'error_oauth_linked',
  OAuthSignin: 'error_oauth_signin',
  Callback: 'error_oauth_callback',
  Default: 'error_generic',
}

// CRITICAL-1 (Sprint D): callbackUrl comes from the query string, so it must
// be a same-origin relative path — never a full URL or protocol-relative
// (//evil.example) string an attacker could plant in a phishing link.
function safeCallbackUrl(raw: string | null): string {
  if (!raw) return '/dashboard'
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/dashboard'
  try {
    // New URL() with a base resolves relative paths and rejects anything
    // that isn't actually same-origin once resolved (e.g. "/\evil.com").
    const resolved = new URL(raw, window.location.origin)
    return resolved.origin === window.location.origin ? `${resolved.pathname}${resolved.search}${resolved.hash}` : '/dashboard'
  } catch {
    return '/dashboard'
  }
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }} />}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const params = useSearchParams()
  const { t, lang } = useLanguage()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorCode = params.get('error')
    if (errorCode) {
      const translationKey = NEXTAUTH_ERROR_KEYS[errorCode]
      const fallbackKey = NEXTAUTH_ERROR_I18N_KEYS[errorCode] ?? 'error_generic'
      setError(translationKey ? t(translationKey) : t(fallbackKey))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError(t('error_required')); return }
    setLoading(true); setError(null)

    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      setLoading(false)

      if (!result) { setError(t('error_generic')); return }
      if (result.error) {
        const translationKey = NEXTAUTH_ERROR_KEYS[result.error]
        const fallbackKey = NEXTAUTH_ERROR_I18N_KEYS[result.error] ?? 'error_generic'
        setError(translationKey ? t(translationKey) : t(fallbackKey))
        return
      }

      window.location.href = safeCallbackUrl(params.get('callbackUrl'))
    } catch {
      setLoading(false)
      setError(t('error_generic'))
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  const features = [
    { emoji: '🎓', text: t('left_feature_1') },
    { emoji: '💬', text: t('left_feature_2') },
    { emoji: '🧠', text: t('left_feature_3') },
  ]

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)', display: 'flex' }}>
      {/* Left decorative panel (desktop) */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden"
        style={{ background: 'var(--candy-card)', borderRight: '1px solid var(--candy-shadow)' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,158,255,0.08) 0%, transparent 50%)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-12">
            <EagleMascot variant="logo" size={36} />
            <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--candy-red)' }}>My Tutor</span>
          </div>
          <blockquote className="text-2xl font-bold leading-snug mb-8" style={{ color: 'var(--candy-ink)' }}>
            &ldquo;{t('left_quote')}&rdquo;
          </blockquote>
          <div className="flex flex-col gap-2">
            {features.map((f) => (
              <span key={f.text} className="text-sm px-3 py-1.5 rounded-lg inline-block w-fit"
                style={{ background: 'var(--candy-bg)', color: 'var(--candy-ink-soft)', border: '1px solid var(--candy-shadow)' }}>
                {f.emoji} {f.text}
              </span>
            ))}
          </div>
        </div>
        <p className="relative text-xs" style={{ color: 'var(--candy-ink-soft)' }}>🎓 {t('left_social')}</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-5 left-5"><AuthBackLink href="/" label={t('nav_back_home')} icon="home" /></div>
        <div className="absolute top-5 right-5"><LanguageToggle /></div>

        <div className="w-full max-w-sm">
          {/* Eagle guide (mobile + desktop) */}
          <div className="flex items-center gap-3 mb-6">
            <EagleMascot variant="hero" size={56} />
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>Welcome back</h1>
              <p style={{ fontSize: 13, color: 'var(--candy-ink-soft)', margin: 0 }}>{t('login_sub')}</p>
            </div>
          </div>

          <Card style={{ padding: 24 }}>
            {/* Google — only shown when GOOGLE_CLIENT_ID/SECRET are configured */}
            {process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true' && (
              <>
                <button onClick={handleGoogle} disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-5 disabled:opacity-50"
                  style={{ background: '#fff', color: '#333', border: '1px solid #e5e7eb' }}>
                  <GoogleIcon />
                  {googleLoading ? t('login_google_loading') : t('login_google')}
                </button>

                {/* Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center"><div className="w-full" style={{ borderTop: '1px solid var(--candy-shadow)' }} /></div>
                  <div className="relative flex justify-center"><span className="px-3 text-xs" style={{ background: 'var(--candy-card)', color: 'var(--candy-ink-soft)' }}>{t('login_or')}</span></div>
                </div>
              </>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl text-sm"
                style={{ background: 'rgba(255, 75, 75, 0.08)', border: '1px solid rgba(255, 75, 75, 0.2)', color: 'var(--candy-red)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--candy-ink-soft)' }}>{t('login_email')}</label>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(null) }} required
                  placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--candy-ink-soft)' }}>{t('login_password')}</label>
                  <Link href="/auth/forgot-password" className="text-xs hover:underline" style={{ color: 'var(--candy-red)' }}>
                    {t('login_forgot')}
                  </Link>
                </div>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setError(null) }} required
                    placeholder="••••••••" style={{ ...inputStyle, paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: 'var(--candy-ink-soft)' }}>
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <CandyButton type="submit" disabled={loading} className="w-full" shadowColor="var(--candy-purple-d)"
                style={{ padding: '12px', marginTop: 4, borderRadius: 14, background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, fontSize: 14, opacity: loading ? 0.5 : 1 }}>
                {loading ? t('login_loading') : t('login_submit')}
              </CandyButton>
            </form>
          </Card>

          <p className="text-center mt-6 text-sm" style={{ color: 'var(--candy-ink-soft)' }}>
            {t('login_no_account')}{' '}
            <Link href="/auth/signup" className="font-semibold hover:underline" style={{ color: 'var(--candy-red)' }}>{t('login_signup_link')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
