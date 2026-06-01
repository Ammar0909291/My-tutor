'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!data.success) {
      setError(data.error === 'Email already registered' ? 'Этот email уже зарегистрирован' : data.error)
      setLoading(false)
      return
    }
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) setError('Ошибка входа после регистрации. Попробуй войти вручную.')
    else { router.push('/onboarding'); router.refresh() }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/onboarding' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="relative w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              <span className="text-white font-black">MT</span>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">My Tutor</span>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">Создай аккаунт</h1>
          <p className="mt-2 text-sm" style={{ color: '#71717A' }}>Первый урок бесплатно, без карты</p>
        </div>

        <div className="gradient-border">
          <div className="p-7 rounded-[1.25rem]" style={{ background: '#0F0F18' }}>
            <button onClick={handleGoogle} disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 text-sm font-medium text-zinc-200 hover:bg-white/[0.06] transition-colors duration-200 disabled:opacity-50">
              <GoogleIcon />
              {googleLoading ? 'Загрузка...' : 'Продолжить с Google'}
            </button>

            <Divider />

            {error && (
              <div className="mb-5 p-3.5 rounded-xl border border-red-500/20 text-red-400 text-sm animate-scale-in"
                style={{ background: 'rgba(239,68,68,0.08)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Имя" type="text" value={name} onChange={setName} placeholder="Иван" />
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="your@email.com" />
              <Field label="Пароль" type="password" value={password} onChange={setPassword} placeholder="Минимум 8 символов" />
              <button type="submit" disabled={loading}
                className="btn-gradient w-full py-3.5 rounded-xl text-sm font-bold text-white mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                {loading ? 'Создаём аккаунт...' : 'Создать аккаунт →'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center mt-6 text-sm" style={{ color: '#71717A' }}>
          Уже есть аккаунт?{' '}
          <Link href="/auth/login" className="text-accent-400 font-semibold hover:text-accent-300 transition-colors">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

function Field({ label, type, value, onChange, placeholder }: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: '#52525B' }}>{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        required placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      />
    </div>
  )
}

function Divider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.07]" /></div>
      <div className="relative flex justify-center text-xs">
        <span className="px-3 text-zinc-600" style={{ background: '#0F0F18' }}>или</span>
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
