'use client'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

const STEPS = ['how1', 'how2', 'how3', 'how4'] as const

const SUBJECTS = [
  { slug: 'c',       icon: 'C',   accent: '#F78166', desc_key: 'subj_c_desc'       as const },
  { slug: 'cpp',     icon: 'C++', accent: '#79C0FF', desc_key: 'subj_cpp_desc'     as const },
  { slug: 'python',  icon: '🐍',  accent: '#56D364', desc_key: 'subj_python_desc'  as const },
  { slug: 'english', icon: '🇬🇧', accent: '#E3B341', desc_key: 'subj_english_desc' as const },
]

const TESTIMONIALS = [
  { text_key: 't1_text', name_key: 't1_name' },
  { text_key: 't2_text', name_key: 't2_name' },
  { text_key: 't3_text', name_key: 't3_name' },
] as const

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-base)' }}>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50"
        style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-base" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </Link>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href="#features" className="hover:text-white transition-colors">{t('nav_features')}</a>
            <a href="#how"      className="hover:text-white transition-colors">{t('nav_how')}</a>
            <a href="#pricing"  className="hover:text-white transition-colors">{t('nav_pricing')}</a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2.5">
            <LanguageToggle />
            <Link href="/auth/login" className="btn-ghost text-xs px-3 py-1.5">{t('cta_login')}</Link>
            <Link href="/auth/signup" className="btn-primary text-xs px-4 py-2">{t('cta_start')}</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center px-5 pt-[60px]"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, rgba(247,129,102,0.08) 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 20%, rgba(121,192,255,0.08) 0%, transparent 60%),
                       var(--bg-base)`,
        }}>
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">

          {/* Left */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
              style={{ background: 'rgba(247,129,102,0.1)', border: '1px solid rgba(247,129,102,0.3)', color: 'var(--accent-primary)' }}>
              {t('hero_badge')}
            </div>

            {/* H1 */}
            <h1 className="font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              <span className="text-gradient-coral">{t('hero_title_accent')}</span>
              <br />
              <span>AI‑репетитор</span>
            </h1>

            <p className="text-lg mb-9 leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              {t('hero_sub')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/auth/signup" className="btn-primary gap-2 px-7 py-3.5 text-base font-bold">
                {t('cta_start')} <ArrowRight size={18} />
              </Link>
              <Link href="/auth/login" className="btn-ghost px-7 py-3.5 text-base">
                {t('cta_login')}
              </Link>
            </div>

            {/* Social proof */}
            <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{t('hero_social_proof')}</p>
          </div>

          {/* Right — Mockup window */}
          <div className="hidden lg:flex justify-center">
            <div className="animate-float w-full max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
                {/* Titlebar */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>урок.py</span>
                </div>
                {/* Code area */}
                <div className="p-4 font-mono text-xs leading-relaxed" style={{ background: '#0D1117', borderBottom: '1px solid var(--border-default)' }}>
                  <div><span style={{ color: '#79C0FF' }}>def </span><span style={{ color: '#56D364' }}>hello</span><span style={{ color: 'var(--text-secondary)' }}>():</span></div>
                  <div className="pl-4"><span style={{ color: '#79C0FF' }}>print</span><span style={{ color: 'var(--text-secondary)' }}>(</span><span style={{ color: '#E3B341' }}>&quot;Привет, мир!&quot;</span><span style={{ color: 'var(--text-secondary)' }}>)</span></div>
                  <div className="mt-1"><span style={{ color: '#56D364' }}>hello</span><span style={{ color: 'var(--text-secondary)' }}>()</span></div>
                </div>
                {/* Chat bubble */}
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: 'var(--accent-primary)' }}>М</div>
                    <div className="rounded-lg p-3 text-xs leading-relaxed flex-1"
                      style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent-primary)', color: 'var(--text-primary)' }}>
                      Отлично! Теперь попробуй изменить значение переменной — что думаешь произойдёт? 🤔
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-5">
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
      <section id="how" className="py-24 px-5" style={{ background: 'var(--bg-surface)' }}>
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
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-14" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t('subjects_title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUBJECTS.map((s) => (
              <div key={s.slug}
                className="group relative p-6 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${s.accent}55`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${s.accent}14` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}>
                <div className="text-3xl mb-4 font-black" style={{ color: s.slug === 'c' || s.slug === 'cpp' ? s.accent : undefined }}>{s.icon}</div>
                <p className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {s.slug === 'c' ? 'C' : s.slug === 'cpp' ? 'C++' : s.slug === 'python' ? 'Python' : 'English'}
                </p>
                <p className="text-xs leading-snug mb-4" style={{ color: 'var(--text-secondary)' }}>{t(s.desc_key)}</p>
                <Link href="/auth/signup" className="text-xs font-semibold" style={{ color: s.accent }}>{t('subj_start')}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-5" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-14" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t('pricing_title')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Free */}
            <div className="p-7 rounded-2xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>{t('plan_free_name')}</p>
              <p className="text-3xl font-black mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t('plan_free_price')}</p>
              {(['plan_free_f1','plan_free_f2','plan_free_f3'] as const).map((k) => (
                <div key={k} className="flex gap-2.5 items-center mb-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={14} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                  {t(k)}
                </div>
              ))}
              <Link href="/auth/signup" className="btn-ghost w-full mt-6 py-2.5 text-center block">{t('cta_start')}</Link>
            </div>
            {/* Pro */}
            <div className="p-7 rounded-2xl relative" style={{ background: 'var(--bg-elevated)', border: `2px solid var(--accent-primary)`, boxShadow: '0 0 30px rgba(247,129,102,0.12)' }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-coral text-xs px-3 py-1">{t('plan_pro_badge')}</span>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>{t('plan_pro_name')}</p>
              <p className="text-3xl font-black mb-6" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t('plan_pro_price')}</p>
              {(['plan_pro_f1','plan_pro_f2','plan_pro_f3','plan_pro_f4'] as const).map((k) => (
                <div key={k} className="flex gap-2.5 items-center mb-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Check size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  {t(k)}
                </div>
              ))}
              <Link href="/auth/signup" className="btn-primary w-full mt-6 py-2.5 text-center block">{t('cta_start')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-14" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {t('testimonials_title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item) => (
              <div key={item.text_key} className="p-6 rounded-2xl"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: 'var(--text-primary)' }}>&ldquo;{t(item.text_key)}&rdquo;</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>— {t(item.name_key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-10 px-5" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-default)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span className="font-bold text-sm" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{t('footer_rights')}</p>
          <div className="flex gap-5 text-xs" style={{ color: 'var(--text-dim)' }}>
            <a href="#features" className="hover:text-white transition-colors">{t('nav_features')}</a>
            <a href="#pricing"  className="hover:text-white transition-colors">{t('nav_pricing')}</a>
            <Link href="/auth/login" className="hover:text-white transition-colors">{t('cta_login')}</Link>
            <LanguageToggle />
          </div>
        </div>
      </footer>

    </div>
  )
}
