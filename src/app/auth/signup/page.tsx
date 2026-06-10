'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useLanguage, LanguageToggle } from '@/components/ui/LanguageToggle'

export default function SignupPage() {
  const { t, lang } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) { setError(t('error_required')); return }
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.error === 'Email already registered' ? t('error_email_taken') : (data.error ?? t('error_required')))
        setLoading(false); return
      }
      const result = await signIn('credentials', { email, password, redirect: false })
      setLoading(false)
      if (!result || result.error) {
        setError(t('error_account_created'))
        return
      }
      window.location.href = '/onboarding'
    } catch {
      setLoading(false)
      setError(t('error_required'))
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/onboarding' })
  }

  const features = [
    { emoji: '🎓', text: t('left_feature_1') },
    { emoji: '💬', text: t('left_feature_2') },
    { emoji: '🧠', text: t('left_feature_3') },
  ]

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)' }}>
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden"
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-default)' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(247,129,102,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(121,192,255,0.08) 0%, transparent 50%)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-16">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-lg" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </div>
          <blockquote className="text-2xl font-bold leading-snug mb-8" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            &ldquo;{t('left_quote')}&rdquo;
          </blockquote>
          <div className="flex flex-col gap-2">
            {features.map((f) => (
              <span key={f.text} className="text-sm px-3 py-1.5 rounded-lg inline-block w-fit"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}>
                {f.emoji} {f.text}
              </span>
            ))}
          </div>

          {/* Floating product preview cards */}
          <div className="relative mt-10" style={{ height: '180px' }}>
            {/* Card 1 — subject */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              animation: 'floatCard 4s ease-in-out infinite',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
              borderRadius: 12, padding: '10px 16px', fontSize: 13,
              color: 'var(--text-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
            }}>
              🎯 {lang === 'ru' ? 'Язык C · Урок 1' : lang === 'hi' ? 'C भाषा · पाठ 1' : 'C Language · Lesson 1'}
            </div>
            {/* Card 2 — chat bubble */}
            <div style={{
              position: 'absolute', top: 44, left: 24,
              animation: 'floatCard 4s ease-in-out infinite 1.3s',
              background: 'rgba(247,129,102,0.12)', border: '1px solid rgba(247,129,102,0.3)',
              borderRadius: 12, padding: '10px 16px', fontSize: 13,
              color: 'var(--text-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              maxWidth: 240,
            }}>
              💬 {lang === 'ru' ? 'Привет! Начнём с основ C 🚀' : lang === 'hi' ? 'नमस्ते! C से शुरू करते हैं 🚀' : 'Hello! Lets start with C basics 🚀'}
            </div>
            {/* Card 3 — code snippet */}
            <div style={{
              position: 'absolute', top: 96, left: 12,
              animation: 'floatCard 4s ease-in-out infinite 2.6s',
              background: 'var(--bg-base)', border: '1px solid var(--border-default)',
              borderRadius: 12, padding: '10px 16px', fontSize: 12,
              color: '#79C0FF', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              fontFamily: 'monospace',
            }}>
              <span style={{ color: '#FF7B72' }}>printf</span>
              <span style={{ color: 'var(--text-primary)' }}>(&quot;Hello, World!&quot;);</span>
            </div>
          </div>
        </div>
        <p className="relative text-xs" style={{ color: 'var(--text-dim)' }}>🎓 {t('left_social')}</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-5 right-5"><LanguageToggle /></div>

        <div className="w-full max-w-sm animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <span className="text-2xl">🔥</span>
            <span className="font-bold text-lg" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </div>

          <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{t('signup_title')}</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>{t('signup_sub')}</p>

          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-5 disabled:opacity-50"
            style={{ background: '#fff', color: '#333', border: '1px solid #e5e7eb' }}>
            <GoogleIcon />
            {googleLoading ? t('signup_google_loading') : t('signup_google')}
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full" style={{ borderTop: '1px solid var(--border-default)' }} /></div>
            <div className="relative flex justify-center"><span className="px-3 text-xs" style={{ background: 'var(--bg-base)', color: 'var(--text-dim)' }}>{t('login_or')}</span></div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl text-sm animate-scale-in"
              style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)', color: '#F85149' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>{t('signup_name')}</label>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value); clearError() }} required
                placeholder={lang === 'ru' ? 'Иван' : lang === 'hi' ? 'राहुल' : 'John'} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>{t('signup_email')}</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearError() }} required
                placeholder="your@email.com" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-dim)' }}>{t('signup_password')}</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); clearError() }} required
                  placeholder={t('signup_password_placeholder')} className="input-field pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }}>
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-1 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? t('signup_loading') : t('signup_submit')}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('signup_has_account')}{' '}
            <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: 'var(--accent-primary)' }}>{t('signup_login_link')}</Link>
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
