'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ArrowRight, Check, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useCountry, useTheme, type Country } from '@/components/Providers'
import { CandyPage, Card, CandyButton, Pill } from '@/components/ui/candy'
import styles from './homepage.module.css'

const STEPS = ['how1', 'how2', 'how3', 'how4'] as const

const SUBJECTS = [
  { slug: 'c',       icon: 'C',   accent: 'var(--orange)', desc_key: 'subj_c_desc'       as const },
  { slug: 'cpp',     icon: 'C++', accent: 'var(--blue)',   desc_key: 'subj_cpp_desc'     as const },
  { slug: 'python',  icon: '🐍',  accent: 'var(--green)',  desc_key: 'subj_python_desc'  as const },
  { slug: 'english', icon: '🇬🇧', accent: 'var(--yellow)', desc_key: 'subj_english_desc' as const },
]

const FAQ_KEYS = [
  { q: 'faq_q1', a: 'faq_a1' },
  { q: 'faq_q2', a: 'faq_a2' },
  { q: 'faq_q3', a: 'faq_a3' },
  { q: 'faq_q4', a: 'faq_a4' },
  { q: 'faq_q5', a: 'faq_a5' },
] as const

const AVATAR_COLORS = ['var(--orange)', 'var(--blue)', 'var(--green)', 'var(--yellow)', 'var(--pink)']

const FEAT_ICON_BG = ['var(--purple)', 'var(--blue)', 'var(--green)']

export default function HomePage() {
  const { t, lang: _lang, setLang } = useLanguage()
  const { country, setCountry } = useCountry()
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
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
    <CandyPage suppressHydrationWarning className={styles.homepage}>

      {/* ── Animated orbs ─────────────────────────────────────────────────── */}
      <div aria-hidden className={styles.orbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.navLogo}>
            <span className={styles.navLogoMark}>🔥</span>
            <span className={styles.navLogoText}>My Tutor</span>
          </Link>

          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>{t('nav_features')}</a>
            <a href="#how"      className={styles.navLink}>{t('nav_how')}</a>
            <a href="#pricing"  className={styles.navLink}>{t('nav_pricing')}</a>
            <a href="#faq"      className={styles.navLink}>FAQ</a>
          </div>

          <div className={styles.navRight}>
            {/* Country pills */}
            <div className={styles.countryPills}>
              {([
                { key: 'ru' as Country, flag: '🇷🇺', label: 'RU', color: 'var(--orange)' },
                { key: 'in' as Country, flag: '🇮🇳', label: 'IN', color: 'var(--green)' },
                { key: 'global' as Country, flag: '🌍', label: 'GL', color: 'var(--blue)' },
              ]).map(({ key, flag, label, color }) => (
                <button key={key} onClick={() => handleCountrySelect(key)} className={styles.countryPill} style={{
                  borderColor: country === key ? color : undefined,
                  background: country === key ? `color-mix(in srgb, ${color} 16%, transparent)` : undefined,
                  color: country === key ? color : undefined,
                }}>
                  {flag} {label}
                </button>
              ))}
            </div>
            <LanguageToggle />
            <button onClick={toggleTheme} title={(mounted ? theme : 'dark') === 'dark' ? 'Switch to light' : 'Switch to dark'} className={styles.themeBtn}>
              {(mounted ? theme : 'dark') === 'dark' ? '☀️' : '🌙'}
            </button>
            {isGuest && (
              <div className={styles.navLinks} style={{ gap: 10 }}>
                <Link href="/auth/login"  className={`${styles.btnGhost} ${styles.btnSm}`}>{t('cta_login')}</Link>
                <Link href="/auth/signup" className={`${styles.btnPrimary} ${styles.btnSm}`}>{t('cta_start')}</Link>
              </div>
            )}
            {isAuthed && (
              <div className={styles.navLinks} style={{ gap: 10 }}>
                <Link href="/dashboard" className={styles.navLogo} title={userName}>
                  <span className={styles.navAvatar}>{userName.charAt(0).toUpperCase()}</span>
                </Link>
                <Link href="/dashboard" className={`${styles.btnPrimary} ${styles.btnSm}`}>{t('nav_dashboard')}</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} title={t('dash_signout')}
                  className={`${styles.btnGhost} ${styles.btnSm}`} style={{ cursor: 'pointer' }}>
                  <LogOut size={13} /> {t('dash_signout')}
                </button>
              </div>
            )}
            <button onClick={() => setMobileOpen((o) => !o)} className={styles.mobileToggle}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={styles.mobileMenu}>
            {(['nav_features','nav_how','nav_pricing'] as const).map((k, i) => (
              <a key={k} href={['#features','#how','#pricing'][i]} onClick={() => setMobileOpen(false)} className={styles.mobileLink}>{t(k)}</a>
            ))}
            <a href="#faq" onClick={() => setMobileOpen(false)} className={styles.mobileLink}>FAQ</a>
            {isGuest && (
              <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
                <Link href="/auth/login"  className={styles.btnGhost} style={{ flex: 1, justifyContent: 'center' }}>{t('cta_login')}</Link>
                <Link href="/auth/signup" className={styles.btnPrimary} style={{ flex: 1, justifyContent: 'center' }}>{t('cta_start')}</Link>
              </div>
            )}
            {isAuthed && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={styles.navAvatar}>{userName.charAt(0).toUpperCase()}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{userName}</span>
                </div>
                <Link href="/dashboard" className={styles.btnPrimary} style={{ justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>{t('nav_dashboard')}</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.btnGhost} style={{ justifyContent: 'center', cursor: 'pointer' }}>
                  <LogOut size={13} /> {t('dash_signout')}
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <Pill className={styles.heroBadge} color="transparent">{t('hero_badge')}</Pill>

            <h1 className={`${styles.heading} ${styles.heroTitle}`}>
              <span className={styles.heroAccent}>{t('hero_title_accent')}</span>
              <br />
              <span>{t('hero_title_line2') ?? 'AI‑репетитор'}</span>
            </h1>

            <p className={styles.heroSub}>{t('hero_sub')}</p>

            <div className={styles.heroCtas}>
              {isAuthed ? (
                <Link href="/dashboard" className={styles.btnPrimary}>
                  {t('nav_dashboard')} <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link href="/auth/signup" className={styles.btnPrimary}>
                    {t('cta_start')} <ArrowRight size={18} />
                  </Link>
                  <Link href="/auth/login" className={styles.btnGhost}>
                    {t('cta_login')}
                  </Link>
                </>
              )}
            </div>

            {/* Avatar row */}
            <div className={styles.avatarRow}>
              <div className={styles.avatarStack}>
                {AVATAR_COLORS.map((c, i) => (
                  <div key={i} className={styles.avatarChip} style={{ background: c, marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i }}>
                    {['А','М','Д','К','С'][i]}
                  </div>
                ))}
              </div>
              <p className={styles.avatarProofText}>{t('hero_social_proof')}</p>
            </div>
          </div>

          {/* Floating mockup */}
          <div className={styles.heroMockWrap}>
            <div className={styles.heroMock}>
              <div className={styles.mockCard}>
                <div className={styles.mockTop}>
                  <div className={styles.mockDot} style={{ background: 'var(--red)' }} />
                  <div className={styles.mockDot} style={{ background: 'var(--yellow)' }} />
                  <div className={styles.mockDot} style={{ background: 'var(--green)' }} />
                  <span className={styles.mockFile}>lesson.py</span>
                </div>
                <div className={styles.mockCode}>
                  <div><span style={{ color: 'var(--blue)' }}>def </span><span style={{ color: 'var(--green)' }}>hello</span><span style={{ color: '#C9D1D9' }}>():</span></div>
                  <div style={{ paddingLeft: 16 }}><span style={{ color: 'var(--blue)' }}>print</span><span style={{ color: '#C9D1D9' }}>(</span><span style={{ color: 'var(--yellow)' }}>&quot;{t('hero_mock_string')}&quot;</span><span style={{ color: '#C9D1D9' }}>)</span></div>
                  <div style={{ marginTop: 4 }}><span style={{ color: 'var(--green)' }}>hello</span><span style={{ color: '#C9D1D9' }}>()</span></div>
                </div>
                <div className={styles.mockChat}>
                  <div className={styles.mockChatAvatar}>T</div>
                  <div className={styles.mockChatBubble}>{t('hero_mock_msg')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <section className={styles.statsSection}>
        <div className={styles.statsRow}>
          {(['stats_lessons','stats_langs','stats_available'] as const).map((k, i) => (
            <Card key={k} className={styles.statChip}>
              <span className={`${styles.heading} ${styles.statVal}`} style={{ color: ['var(--purple)','var(--blue)','var(--green)'][i] }}>
                {['10K+','4','24/7'][i]}
              </span>
              <span className={styles.statLabel}>{t(k)}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Features / Learning Intelligence ────────────────────────────── */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.heading} ${styles.sectionTitleBig}`}>{t('features_title')}</h2>
          </div>
          <div className={styles.featGrid}>
            {(['feat1','feat2','feat3'] as const).map((k, i) => (
              <Card key={k} className={styles.featCard}>
                <div className={styles.featIcon} style={{ background: `color-mix(in srgb, ${FEAT_ICON_BG[i]} 16%, transparent)` }}>
                  {['🎯','💬','🧠'][i]}
                </div>
                <h3 className={styles.featTitle}>{t(`${k}_title` as any)}</h3>
                <p className={styles.featDesc}>{t(`${k}_desc` as any)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.heading} ${styles.sectionTitleBig}`}>{t('how_title')}</h2>
          </div>
          <div className={styles.stepsRow}>
            {STEPS.map((key, i) => (
              <div key={key} className={styles.stepItem}>
                <div className={styles.stepBadge} style={{ background: i === 0 ? 'var(--purple)' : 'var(--ink-soft)' }}>
                  {i + 1}
                </div>
                <p className={styles.stepText}>{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subjects ─────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.heading} ${styles.sectionTitleBig}`}>{t('subjects_title')}</h2>
          </div>
          <div className={styles.subjGrid}>
            {SUBJECTS.map((s) => (
              <Link key={s.slug} href={ctaHref} className={styles.subjCard} style={{ background: 'var(--card)', borderRadius: 24, boxShadow: '0 4px 0 var(--shadow)' }}>
                <span className={styles.subjStrip} style={{ background: s.accent }} />
                <div className={styles.subjIcon} style={{ color: s.accent }}>{s.icon}</div>
                <p className={styles.subjName}>
                  {s.slug === 'c' ? 'C' : s.slug === 'cpp' ? 'C++' : s.slug === 'python' ? 'Python' : 'English'}
                </p>
                <p className={styles.subjDesc}>{t(s.desc_key)}</p>
                <span className={styles.subjLink} style={{ color: s.accent }}>{t('subj_start')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" className={styles.section}>
        <div className={styles.sectionInner} style={{ maxWidth: 720 }}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.heading} ${styles.sectionTitleBig}`}>{t('pricing_title')}</h2>
          </div>
          <div className={styles.pricingGrid}>
            <Card className={styles.priceCard}>
              <p className={styles.planName}>{t('plan_free_name')}</p>
              <p className={styles.planPrice}>{t('plan_free_price')}</p>
              {(['plan_free_f1','plan_free_f2','plan_free_f3'] as const).map((k) => (
                <div key={k} className={styles.planFeature}>
                  <Check size={14} style={{ color: 'var(--green)', flexShrink: 0 }} />{t(k)}
                </div>
              ))}
              <Link href={ctaHref} className={styles.btnGhost} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                {isAuthed ? t('nav_dashboard') : t('cta_start')}
              </Link>
            </Card>
            <Card className={`${styles.priceCard} ${styles.priceCardPro}`}>
              <Pill className={styles.proBadge} color="var(--purple)">{t('plan_pro_badge')}</Pill>
              <p className={`${styles.planName} ${styles.planNamePro}`}>{t('plan_pro_name')}</p>
              <p className={styles.planPrice}>{t('plan_pro_price')}</p>
              {(['plan_pro_f1','plan_pro_f2','plan_pro_f3','plan_pro_f4'] as const).map((k) => (
                <div key={k} className={styles.planFeature}>
                  <Check size={14} style={{ color: 'var(--purple)', flexShrink: 0 }} />{t(k)}
                </div>
              ))}
              <Link href={ctaHref} className={styles.btnPrimary} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                {isAuthed ? t('nav_dashboard') : t('cta_start')}
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className={styles.section}>
        <div className={styles.sectionInner} style={{ maxWidth: 720 }}>
          <div className={styles.sectionHead}>
            <h2 className={`${styles.heading} ${styles.sectionTitleBig}`}>{t('faq_title')}</h2>
          </div>
          <div className={styles.faqList}>
            {FAQ_KEYS.map(({ q, a }, i) => (
              <Card key={q} className={`${styles.faqItem} ${faqOpen === i ? styles.faqItemOpen : ''}`}>
                <button className={styles.faqBtn} onClick={() => setFaqOpen((prev) => prev === i ? null : i)}>
                  <span className={styles.faqQ}>{t(q)}</span>
                  <ChevronDown size={16} className={`${styles.faqChevron} ${faqOpen === i ? styles.faqChevronOpen : ''}`} />
                </button>
                {faqOpen === i && <div className={styles.faqA}>{t(a)}</div>}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span>🔥</span>
            <span>My Tutor</span>
          </div>
          <p className={styles.footerRights}>{t('footer_rights')}</p>
          <div className={styles.footerLinks}>
            <a href="#features">{t('nav_features')}</a>
            <a href="#pricing">{t('nav_pricing')}</a>
            <a href="#faq">FAQ</a>
            {isAuthed
              ? <Link href="/dashboard">{t('nav_dashboard')}</Link>
              : <Link href="/auth/login">{t('cta_login')}</Link>}
            <LanguageToggle />
          </div>
        </div>
      </footer>

    </CandyPage>
  )
}
