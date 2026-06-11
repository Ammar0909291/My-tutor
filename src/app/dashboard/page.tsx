import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { BookOpen, Clock, Flame, GraduationCap, Layers, Sparkles, ArrowRight, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { StartLessonButton } from '@/components/dashboard/StartLessonButton'
import { UpgradeButton } from '@/components/dashboard/UpgradeButton'

const SUBJECT_META: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  c:       { icon: '⚙️',  color: '#79C0FF', bg: 'rgba(121,192,255,0.08)',  border: 'rgba(121,192,255,0.2)'  },
  cpp:     { icon: '🔷',  color: '#79C0FF', bg: 'rgba(121,192,255,0.08)',  border: 'rgba(121,192,255,0.2)'  },
  python:  { icon: '🐍',  color: '#56D364', bg: 'rgba(86,211,100,0.08)',   border: 'rgba(86,211,100,0.2)'   },
  english: { icon: '🇬🇧', color: '#E3B341', bg: 'rgba(227,179,65,0.08)',   border: 'rgba(227,179,65,0.2)'   },
}
function sm(slug: string) {
  return SUBJECT_META[slug] ?? { icon: '📘', color: '#F78166', bg: 'rgba(247,129,102,0.08)', border: 'rgba(247,129,102,0.2)' }
}

const LANG_DISPLAY: Record<string, string> = { ru: '🇷🇺 Русский', en: '🇬🇧 English', hi: '🇮🇳 हिंदी' }

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [user, recentSessions, totalLessons, subscription] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        onboardingCompleted: true,
        name: true,
        profile: {
          select: {
            displayName: true,
            voiceId: true,
            selfDescription: true,
            teachingLanguage: true,
            subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } },
          },
        },
      },
    }),
    prisma.learnSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: 'desc' },
      take: 5,
      include: { subject: { select: { name: true, slug: true } } },
    }),
    prisma.learnSession.count({ where: { userId: session.user.id } }),
    prisma.subscription.findUnique({ where: { userId: session.user.id } }),
  ])

  if (!user?.onboardingCompleted) redirect('/onboarding')

  const profile = user.profile
  const lang = (profile?.teachingLanguage ?? 'ru') as Lang
  const enrolledSubjects = profile?.subjects ?? []
  const primarySubject = enrolledSubjects[0]?.subject
  const voiceLabel = profile?.voiceId ? (t(lang, `voice_${profile.voiceId}` as Parameters<typeof t>[1]) || profile.voiceId) : null
  const langDisplay = profile?.teachingLanguage ? (LANG_DISPLAY[profile.teachingLanguage] ?? profile.teachingLanguage) : null
  const displayName = profile?.displayName ?? user.name ?? t(lang, 'dash_student_default')
  const locale = lang === 'ru' ? 'ru-RU' : lang === 'hi' ? 'hi-IN' : 'en-US'
  const isPro = subscription?.status === 'ACTIVE'
  const showUpgradeBanner = false // Stripe disabled for now

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* Ambient glow — matches landing page */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[-150px] right-[-50px] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(247,129,102,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(121,192,255,0.06) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      {/* Navbar — same style as landing page */}
      <nav className="sticky top-0 z-50"
        style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-base" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block" style={{ color: 'var(--text-dim)' }}>{session.user.email}</span>
            <Link href="/settings" className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5">
              <Settings size={13} /> {t(lang, 'dash_nav_settings')}
            </Link>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-5 py-10">

        {/* Greeting */}
        <div className="mb-10">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {t(lang, 'dash_greeting')}, <span className="text-gradient-coral">{displayName}</span>! 👋
            </h1>
            {isPro && (
              <span className="badge" style={{ background: 'linear-gradient(135deg,#F6B444,#E8913A)', color: '#fff', border: 'none', fontWeight: 800, letterSpacing: '0.08em' }}>
                PRO
              </span>
            )}
          </div>
          <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{t(lang, 'dash_personal_board')}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard icon={GraduationCap} label={t(lang, 'dash_stat_lessons')} value={String(totalLessons)} color="#F78166" />
          <StatCard icon={Layers}        label={t(lang, 'dash_stat_subjects')} value={String(enrolledSubjects.length)} color="#79C0FF" />
          <StatCard
            icon={Flame} label={t(lang, 'dash_stat_last_lesson')} color="#56D364"
            value={recentSessions[0]
              ? new Date(recentSessions[0].startedAt).toLocaleDateString(locale, { day: 'numeric', month: 'short' })
              : '—'}
          />
        </div>

        {/* Upgrade banner */}
        {showUpgradeBanner && (
          <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl mb-6"
            style={{ background: 'rgba(247,129,102,0.07)', border: '1px solid rgba(247,129,102,0.25)' }}>
            <p className="text-sm font-medium" style={{ color: '#F78166' }}>
              ✦ {t(lang, 'dash_upgrade_banner')}
            </p>
            <UpgradeButton />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Hero start lesson card */}
            <div className="relative rounded-2xl p-7 overflow-hidden"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              {/* Coral glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(247,129,102,0.1) 0%, transparent 60%)' }} />

              <div className="relative flex items-start gap-4">
                {primarySubject && (
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0"
                    style={{ background: sm(primarySubject.slug).bg, border: `1px solid ${sm(primarySubject.slug).border}`, color: sm(primarySubject.slug).color }}>
                    {sm(primarySubject.slug).icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {primarySubject && (
                    <span className="badge badge-coral mb-3 inline-flex">
                      <Sparkles size={10} className="mr-1" />
                      {primarySubject.name}
                    </span>
                  )}
                  <h2 className="text-xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    {t(lang, 'dash_ready_lesson')}
                  </h2>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {profile?.selfDescription}
                  </p>
                </div>
              </div>
              <div className="relative mt-6">
                <StartLessonButton />
              </div>
            </div>

            {/* Enrolled subjects */}
            <SectionCard title={t(lang, 'dash_my_programs')} icon={Layers}>
              {enrolledSubjects.length === 0 ? (
                <EmptyState emoji="🧭" title={t(lang, 'dash_no_programs_title')} sub={t(lang, 'dash_no_programs_sub')} />
              ) : (
                <div className="grid sm:grid-cols-2 gap-3 p-4">
                  {enrolledSubjects.map((ps) => {
                    const m = sm(ps.subject.slug)
                    return (
                      <div key={ps.id} className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black shrink-0"
                          style={{ background: 'var(--bg-elevated)', color: m.color }}>
                          {m.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{ps.subject.name}</p>
                          <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-dim)' }}>
                            {ps.subject.slug}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </SectionCard>

            {/* Session history */}
            <SectionCard
              title={t(lang, 'dash_history_title')}
              icon={Clock}
              right={recentSessions.length > 0
                ? <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{t(lang, 'dash_history_recent').replace('{n}', String(recentSessions.length))}</span>
                : undefined}
            >
              {recentSessions.length === 0 ? (
                <EmptyState emoji="📚" title={t(lang, 'dash_no_lessons_title')} sub={t(lang, 'dash_no_lessons_sub')} />
              ) : (
                <ul className="divide-y" style={{ borderColor: 'var(--border-default)' }}>
                  {recentSessions.map((s) => {
                    const m = sm(s.subject.slug)
                    return (
                      <li key={s.id} className="px-5 py-4 transition-colors hover:bg-white/[0.02]">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-black shrink-0 mt-0.5"
                            style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>
                            {m.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                              {s.title ?? s.subject.name}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
                              {new Date(s.startedAt).toLocaleString(locale, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {s.summary && (
                              <p className="text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                {s.summary}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </SectionCard>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-5">

            {/* Profile card */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #F78166, #FF9E88)' }}>
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{displayName}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-dim)' }}>{session.user.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                {primarySubject && (
                  <ProfileRow label={t(lang, 'dash_primary_subject')}>
                    <span className="badge" style={{ background: sm(primarySubject.slug).bg, color: sm(primarySubject.slug).color, border: `1px solid ${sm(primarySubject.slug).border}` }}>
                      {sm(primarySubject.slug).icon} {primarySubject.name}
                    </span>
                  </ProfileRow>
                )}
                {voiceLabel && (
                  <ProfileRow label={t(lang, 'dash_tutor_voice')}>
                    <span className="badge badge-blue">{voiceLabel}</span>
                  </ProfileRow>
                )}
                {langDisplay && (
                  <ProfileRow label={t(lang, 'dash_teach_lang')}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{langDisplay}</span>
                  </ProfileRow>
                )}
                {profile?.selfDescription && (
                  <ProfileRow label={t(lang, 'dash_about')}>
                    <p className="text-xs leading-relaxed line-clamp-4" style={{ color: 'var(--text-secondary)' }}>
                      {profile.selfDescription}
                    </p>
                  </ProfileRow>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Sparkles size={13} style={{ color: 'var(--accent-primary)' }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{t(lang, 'dash_quick_actions')}</h3>
              </div>
              <div className="p-3 space-y-1">
                {([
                  { label: t(lang, 'dash_action_start'),   href: '/learn',    icon: Sparkles, accent: '#F78166' },
                  { label: t(lang, 'dash_action_history'), href: '#history',  icon: Clock,    accent: '#79C0FF' },
                  { label: t(lang, 'dash_action_settings'),href: '/settings', icon: Settings, accent: '#56D364' },
                ] as { label: string; href: string; icon: LucideIcon; accent: string }[]).map(({ label, href, icon: Icon, accent }) => (
                  <Link key={label} href={href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors group"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={undefined}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${accent}15` }}>
                        <Icon size={13} style={{ color: accent }} />
                      </div>
                      <span className="text-sm">{label}</span>
                    </div>
                    <ArrowRight size={13} style={{ color: 'var(--text-dim)' }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Streak / motivation card */}
            <div className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'var(--bg-surface)', border: '1px solid rgba(247,129,102,0.2)' }}>
              <div className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(247,129,102,0.08) 0%, transparent 60%)' }} />
              <div className="relative">
                <div className="text-3xl mb-2">🔥</div>
                <p className="font-black text-sm mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                  {t(lang, 'dash_motivation_title')}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(lang, 'dash_motivation_sub')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function StatCard({ icon: Icon, label, value, color }: { icon: LucideIcon; label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{label}</span>
      </div>
      <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{value}</p>
    </div>
  )
}

function SectionCard({ title, icon: Icon, right, children }: {
  title: string; icon: LucideIcon; right?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-2">
          <Icon size={13} style={{ color: 'var(--accent-primary)' }} />
          <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

function EmptyState({ emoji, title, sub }: { emoji: string; title: string; sub: string }) {
  return (
    <div className="py-14 text-center px-6">
      <div className="text-4xl mb-3">{emoji}</div>
      <p className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{title}</p>
      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{sub}</p>
    </div>
  )
}

function ProfileRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-dim)' }}>{label}</p>
      {children}
    </div>
  )
}
