'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ArrowRight, Check, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useCountry, useTheme, type Country } from '@/components/Providers'

const STEPS = ['how1', 'how2', 'how3', 'how4'] as const

const SUBJECTS = [
  { slug: 'c',       icon: 'C',   accent: '#F78166', desc_key: 'subj_c_desc'       as const },
  { slug: 'cpp',     icon: 'C++', accent: '#79C0FF', desc_key: 'subj_cpp_desc'     as const },
  { slug: 'python',  icon: '🐍',  accent: '#56D364', desc_key: 'subj_python_desc'  as const },
  { slug: 'english', icon: '🇬🇧', accent: '#E3B341', desc_key: 'subj_english_desc' as const },
]

const FAQ_KEYS = [
  { q: 'faq_q1', a: 'faq_a1' },
  { q: 'faq_q2', a: 'faq_a2' },
  { q: 'faq_q3', a: 'faq_a3' },
  { q: 'faq_q4', a: 'faq_a4' },
  { q: 'faq_q5', a: 'faq_a5' },
] as const

const AVATAR_COLORS = ['#F78166', '#79C0FF', '#56D364', '#E3B341', '#D2A8FF']

export default function HomePage() {
  const { t, lang: _lang, setLang } = useLanguage()
  const { country, setCountry } = useCountry()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  // Auth state — the homepage must always reflect the real session.
  // status: 'loading' renders neither guest nor user UI (prevents a stale
  // guest flash); 'authenticated' shows the user menu; 'unauthenticated'
  // shows Sign In / Start for Free.
  const { data: session, status } = useSession()
  const isAuthed = status === 'authenticated' && !!session?.user
  const isGuest = status === 'unauthenticated'
  const userName = session?.user?.name ?? session?.user?.email ?? 'Student'
  // Where content CTAs (pricing, subject cards) should send the user
  const ctaHref = isAuthed ? '/dashboard' : '/auth/signup'

  function handleCountrySelect(c: Country) {
    setCountry(c)
    if (c === 'ru') setLang('ru')
    else if (c === 'in') setLang('hi')
    else setLang('en')
  }

  return (
    <div suppressHydrationWarning className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-base)' }}>

      {/* ── Animated orbs ─────────────────────────────────────────────────── */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247,129,102,0.07) 0%, transparent 70%)',
          top: '-10%', left: '-15%',
          animation: 'orbFloat1 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(121,192,255,0.07) 0%, transparent 70%)',
          top: '20%', right: '-10%',
          animation: 'orbFloat2 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(210,168,255,0.05) 0%, transparent 70%)',
          bottom: '10%', left: '30%',
          animation: 'orbFloat1 12s ease-in-out infinite reverse',
        }} />
      </div>

      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(0.97); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50"
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-base" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">{t('nav_features')}</a>
            <a href="#how"      className="hover:text-[var(--text-primary)] transition-colors">{t('nav_how')}</a>
            <a href="#pricing"  className="hover:text-[var(--text-primary)] transition-colors">{t('nav_pricing')}</a>
            <a href="#faq"      className="hover:text-[var(--text-primary)] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Country pills */}
            <div className="hidden md:flex items-center gap-1.5">
              {([
                { key: 'ru' as Country, flag: '🇷🇺', label: 'RU', color: '#F78166' },
                { key: 'in' as Country, flag: '🇮🇳', label: 'IN', color: '#3FB950' },
                { key: 'global' as Country, flag: '🌍', label: 'GL', color: '#79C0FF' },
              ]).map(({ key, flag, label, color }) => (
                <button key={key} onClick={() => handleCountrySelect(key)} style={{
                  padding: '4px 10px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${country === key ? color : 'var(--border-default)'}`,
                  background: country === key ? `${color}26` : 'transparent',
                  color: country === key ? color : 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', gap: 4, transition: 'all 150ms',
                }}>
                  {flag} {label}
                </button>
              ))}
            </div>
            <LanguageToggle />
            {/* Theme toggle */}
            <button onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
              style={{
                width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
                background: 'transparent', border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, transition: 'all 150ms',
              }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {isGuest && (
              <>
                <Link href="/auth/login"  className="btn-ghost text-xs px-3 py-1.5 hidden md:inline-flex">{t('cta_login')}</Link>
                <Link href="/auth/signup" className="btn-primary text-xs px-4 py-2 hidden md:inline-flex">{t('cta_start')}</Link>
              </>
            )}
            {isAuthed && (
              <div className="hidden md:flex items-center gap-2.5">
                <Link href="/dashboard" className="flex items-center gap-2" style={{ textDecoration: 'none' }} title={userName}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--coral), #FF9E88)' }}>
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold max-w-[120px] truncate hidden lg:block" style={{ color: 'var(--text-primary)' }}>
                    {userName}
                  </span>
                </Link>
                <Link href="/dashboard" className="btn-primary text-xs px-4 py-2">{t('nav_dashboard')}</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} title={t('dash_signout')}
                  className="btn-ghost text-xs px-2.5 py-1.5 inline-flex items-center gap-1.5" style={{ cursor: 'pointer' }}>
                  <LogOut size={13} /> {t('dash_signout')}
                </button>
              </div>
            )}
            <button onClick={() => setMobileOpen((o) => !o)} className="md:hidden p-2 rounded-lg"
              style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3"
            style={{ background: 'var(--bg-overlay)', borderTop: '1px solid var(--border-default)' }}>
            {(['nav_features','nav_how','nav_pricing'] as const).map((k, i) => (
              <a key={k} href={['#features','#how','#pricing'][i]}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm transition-colors hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-secondary)' }}>{t(k)}</a>
            ))}
            <a href="#faq" onClick={() => setMobileOpen(false)}
              className="py-2 text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>FAQ</a>
            {isGuest && (
              <div className="flex gap-2 pt-2">
                <Link href="/auth/login"  className="btn-ghost text-sm flex-1 text-center py-2">{t('cta_login')}</Link>
                <Link href="/auth/signup" className="btn-primary text-sm flex-1 text-center py-2">{t('cta_start')}</Link>
              </div>
            )}
            {isAuthed && (
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2.5 py-1">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--coral), #FF9E88)' }}>
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{userName}</span>
                </div>
                <Link href="/dashboard" className="btn-primary text-sm text-center py-2" onClick={() => setMobileOpen(false)}>{t('nav_dashboard')}</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-ghost text-sm text-center py-2 inline-flex items-center justify-center gap-1.5" style={{ cursor: 'pointer' }}>
                  <LogOut size={13} /> {t('dash_signout')}
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-5 pt-[60px] z-10">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">

          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
              style={{ background: 'rgba(247,129,102,0.1)', border: '1px solid rgba(247,129,102,0.3)', color: 'var(--accent-primary)' }}>
              {t('hero_badge')}
            </div>

            <h1 className="font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              <span className="text-gradient-coral">{t('hero_title_accent')}</span>
              <br />
              <span>{t('hero_title_line2') ?? 'AI‑репетитор'}</span>
            </h1>

            <p className="text-lg mb-9 leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              {t('hero_sub')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {isAuthed ? (
                <Link href="/dashboard" className="btn-primary gap-2 px-7 py-3.5 text-base font-bold">
                  {t('nav_dashboard')} <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link href="/auth/signup" className="btn-primary gap-2 px-7 py-3.5 text-base font-bold">
                    {t('cta_start')} <ArrowRight size={18} />
                  </Link>
                  <Link href="/auth/login" className="btn-ghost px-7 py-3.5 text-base">
                    {t('cta_login')}
                  </Link>
                </>
              )}
            </div>

            {/* Avatar row */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {AVATAR_COLORS.map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c, borderColor: 'var(--bg-base)', marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i }}>
                    {['А','М','Д','К','С'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{t('hero_social_proof')}</p>
            </div>
          </div>

          {/* Floating mockup */}
          <div className="hidden lg:flex justify-center relative z-10">
            <div style={{ animation: 'heroFloat 6s ease-in-out infinite' }} className="w-full max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>lesson.py</span>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed" style={{ background: '#0D1117', borderBottom: '1px solid var(--border-default)' }}>
                  <div><span style={{ color: '#79C0FF' }}>def </span><span style={{ color: '#56D364' }}>hello</span><span style={{ color: 'var(--text-secondary)' }}>():</span></div>
                  <div className="pl-4"><span style={{ color: '#79C0FF' }}>print</span><span style={{ color: 'var(--text-secondary)' }}>(</span><span style={{ color: '#E3B341' }}>&quot;{t('hero_mock_string')}&quot;</span><span style={{ color: 'var(--text-secondary)' }}>)</span></div>
                  <div className="mt-1"><span style={{ color: '#56D364' }}>hello</span><span style={{ color: 'var(--text-secondary)' }}>()</span></div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: 'var(--accent-primary)' }}>T</div>
                    <div className="rounded-lg p-3 text-xs leading-relaxed flex-1"
                      style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent-primary)', color: 'var(--text-primary)' }}>
                      {t('hero_mock_msg')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-10 px-5" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-8">
          {(['stats_lessons','stats_langs','stats_available'] as const).map((k, i) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black" style={{ color: ['var(--accent-primary)','#79C0FF','#56D364'][i], fontFamily: 'var(--font-heading)' }}>
                {['10K+','4','24/7'][i]}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t(k)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="relative z-10 py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {t('features_title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {(['feat1','feat2','feat3'] as const).map((k, i) => (
              <div key={k} className="p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(22,27,34,0.8)', border: '1px solid var(--border-default)' }}>
                <div className="text-3xl mb-5">{['🎯','💬','🧠'][i]}</div>
                <h3 className="font-bold text-base mb-2.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t(`${k}_title` as any)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t(`${k}_desc` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how" className="relative z-10 py-24 px-5" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t('how_title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((key, i) => (
              <div key={key} className="flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm mb-4 shrink-0"
                  style={{ background: i === 0 ? 'var(--accent-primary)' : 'var(--bg-elevated)', color: i === 0 ? '#fff' : 'var(--text-secondary)', border: '1px solid var(--border-default)' }}>
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-14" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t('subjects_title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUBJECTS.map((s) => (
              <div key={s.slug}
                className="group relative p-6 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${s.accent}55`; el.style.boxShadow = `0 0 20px ${s.accent}14` }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'var(--border-default)'; el.style.boxShadow = 'none' }}>
                <div className="text-3xl mb-4 font-black" style={{ color: s.slug === 'c' || s.slug === 'cpp' ? s.accent : undefined }}>{s.icon}</div>
                <p className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {s.slug === 'c' ? 'C' : s.slug === 'cpp' ? 'C++' : s.slug === 'python' ? 'Python' : 'English'}
                </p>
                <p className="text-xs leading-snug mb-4" style={{ color: 'var(--text-secondary)' }}>{t(s.desc_key)}</p>
                <Link href={ctaHref} className="text-xs font-semibold" style={{ color: s.accent }}>{t('subj_start')}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="relative z-10 py-24 px-5" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-14" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t('pricing_title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-7 rounded-2xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>{t('plan_free_name')}</p>
              <p className="text-3xl font-black mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t('plan_free_price')}</p>
              {(['plan_free_f1','plan_free_f2','plan_free_f3'] as const).map((k) => (
                <div key={k} className="flex gap-2.5 items-center mb-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={14} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />{t(k)}
                </div>
              ))}
              <Link href={ctaHref} className="btn-ghost w-full mt-6 py-2.5 text-center block">{isAuthed ? t('nav_dashboard') : t('cta_start')}</Link>
            </div>
            <div className="p-7 rounded-2xl relative" style={{ background: 'var(--bg-elevated)', border: '2px solid var(--accent-primary)', boxShadow: '0 0 30px rgba(247,129,102,0.12)' }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-coral text-xs px-3 py-1">{t('plan_pro_badge')}</span>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>{t('plan_pro_name')}</p>
              <p className="text-3xl font-black mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t('plan_pro_price')}</p>
              {(['plan_pro_f1','plan_pro_f2','plan_pro_f3','plan_pro_f4'] as const).map((k) => (
                <div key={k} className="flex gap-2.5 items-center mb-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />{t(k)}
                </div>
              ))}
              <Link href={ctaHref} className="btn-primary w-full mt-6 py-2.5 text-center block">{isAuthed ? t('nav_dashboard') : t('cta_start')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="relative z-10 py-24 px-5" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t('faq_title')}
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ_KEYS.map(({ q, a }, i) => (
              <div key={q} className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{ background: 'var(--bg-elevated)', border: `1px solid ${faqOpen === i ? 'rgba(247,129,102,0.3)' : 'var(--border-default)'}` }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setFaqOpen((prev) => prev === i ? null : i)}>
                  <span className="font-semibold text-sm pr-4" style={{ color: 'var(--text-primary)' }}>{t(q)}</span>
                  <ChevronDown size={16} style={{
                    color: 'var(--text-dim)',
                    flexShrink: 0,
                    transition: 'transform 0.2s',
                    transform: faqOpen === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }} />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t(a)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-10 px-5" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border-default)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{t('footer_rights')}</p>
          <div className="flex gap-5 text-xs items-center" style={{ color: 'var(--text-dim)' }}>
            <a href="#features" className="hover:text-white transition-colors">{t('nav_features')}</a>
            <a href="#pricing"  className="hover:text-white transition-colors">{t('nav_pricing')}</a>
            <a href="#faq"      className="hover:text-white transition-colors">FAQ</a>
            {isAuthed
              ? <Link href="/dashboard" className="hover:text-white transition-colors">{t('nav_dashboard')}</Link>
              : <Link href="/auth/login" className="hover:text-white transition-colors">{t('cta_login')}</Link>}
            <LanguageToggle />
          </div>
        </div>
      </footer>

    </div>
  )
}
