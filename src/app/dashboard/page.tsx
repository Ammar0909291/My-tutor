import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { BookOpen, Clock, Flame, GraduationCap, Layers, Sparkles, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { StartLessonButton } from '@/components/dashboard/StartLessonButton'

const SUBJECT_META: Record<string, { icon: string; label: string; gradient: string; border: string; glow: string }> = {
  c:       { icon: '⚙️', label: 'C язык',          gradient: 'from-blue-600/20 to-cyan-600/10',     border: 'border-blue-500/30',    glow: 'shadow-blue-500/10'   },
  cpp:     { icon: '🔷', label: 'C++',              gradient: 'from-cyan-600/20 to-indigo-600/10',   border: 'border-cyan-500/30',    glow: 'shadow-cyan-500/10'   },
  python:  { icon: '🐍', label: 'Python',           gradient: 'from-emerald-600/20 to-teal-600/10',  border: 'border-emerald-500/30', glow: 'shadow-emerald-500/10' },
  english: { icon: '🇬🇧', label: 'Английский язык', gradient: 'from-violet-600/20 to-purple-600/10', border: 'border-violet-500/30',  glow: 'shadow-violet-500/10' },
}
function subjectMeta(slug: string) {
  return SUBJECT_META[slug] ?? { icon: '📘', label: slug, gradient: 'from-accent-600/20 to-accent-600/10', border: 'border-accent-500/30', glow: 'shadow-accent-500/10' }
}

const VOICE_LABELS: Record<string, string> = {
  alexei: 'Алексей (строгий)',
  maria:  'Мария (мягкий)',
  dmitry: 'Дмитрий (дружелюбный)',
  pNInz6obpgDQGcFmaJgB: 'Александр',
  ErXwobaYiN019PkySvjV: 'Антон',
  EXAVITQu4vr4xnSDxMaL: 'Наталья',
}

const TEACHING_LANG_DISPLAY: Record<string, string> = {
  ru: '🇷🇺 Русский',
  en: '🇬🇧 Английский',
  hi: '🇮🇳 Хинди',
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [user, recentSessions, totalLessons] = await Promise.all([
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
  ])

  if (!user?.onboardingCompleted) redirect('/onboarding')

  const profile = user.profile
  const enrolledSubjects = profile?.subjects ?? []
  const primarySubject = enrolledSubjects[0]?.subject
  const voiceLabel = profile?.voiceId ? (VOICE_LABELS[profile.voiceId] ?? profile.voiceId) : null
  const langDisplay = profile?.teachingLanguage ? (TEACHING_LANG_DISPLAY[profile.teachingLanguage] ?? profile.teachingLanguage) : null
  const displayName = profile?.displayName ?? user.name ?? 'Студент'

  return (
    <div className="min-h-screen text-white" style={{ background: '#0A0A0F' }}>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 70%)', filter: 'blur(120px)' }} />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              <span className="text-white font-black text-sm">MT</span>
            </div>
            <span className="font-bold text-white text-sm tracking-tight">My Tutor</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:block" style={{ color: '#52525B' }}>{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 animate-fade-in">

        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Привет, {displayName}! 👋
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#52525B' }}>Твоя персональная доска обучения</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard icon={GraduationCap} label="Всего уроков" value={String(totalLessons)} />
          <StatCard icon={Layers} label="Предметов" value={String(enrolledSubjects.length)} />
          <StatCard
            icon={Flame}
            label="Последний урок"
            value={recentSessions[0]
              ? new Date(recentSessions[0].startedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
              : '—'}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Start lesson hero */}
            <div className="relative rounded-2xl p-7 overflow-hidden border border-white/[0.07]"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(15,15,24,0.95) 100%)' }}>
              <div className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)' }} />
              <div className="relative flex items-start gap-4">
                {primarySubject && (
                  <div className={`w-14 h-14 rounded-2xl border bg-gradient-to-br ${subjectMeta(primarySubject.slug).gradient} ${subjectMeta(primarySubject.slug).border} flex items-center justify-center text-2xl shrink-0`}>
                    {subjectMeta(primarySubject.slug).icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {primarySubject && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-accent-300 mb-3"
                      style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                      <Sparkles size={11} />
                      {subjectMeta(primarySubject.slug).label}
                    </span>
                  )}
                  <h2 className="text-xl font-black text-white tracking-tight mb-1">Готов к уроку?</h2>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#71717A' }}>{profile?.selfDescription}</p>
                </div>
              </div>
              <div className="relative mt-6">
                <StartLessonButton />
              </div>
            </div>

            {/* Enrolled subjects */}
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background: '#0F0F18' }}>
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                <Layers size={14} className="text-accent-400" />
                <h3 className="font-bold text-white text-sm">Мои программы</h3>
              </div>
              {enrolledSubjects.length === 0 ? (
                <div className="py-14 text-center px-6">
                  <div className="text-4xl mb-3">🧭</div>
                  <p className="font-bold text-white mb-1.5">Пока нет программ</p>
                  <p className="text-sm" style={{ color: '#71717A' }}>Заверши онбординг, чтобы выбрать предмет.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3 p-4">
                  {enrolledSubjects.map((ps) => {
                    const m = subjectMeta(ps.subject.slug)
                    return (
                      <div key={ps.id}
                        className={`group flex items-center gap-3 p-4 rounded-xl border bg-gradient-to-br ${m.gradient} ${m.border} hover:-translate-y-0.5 transition-all duration-200 cursor-default`}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                          style={{ background: 'rgba(255,255,255,0.05)' }}>
                          {m.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm truncate">{ps.subject.name}</p>
                          <p className="text-xs truncate mt-0.5" style={{ color: '#52525B' }}>
                            {ps.level ? `Уровень: ${ps.level}` : m.label}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Session history */}
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background: '#0F0F18' }}>
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent-400" />
                  <h3 className="font-bold text-white text-sm">История уроков</h3>
                </div>
                {recentSessions.length > 0 && (
                  <span className="text-xs" style={{ color: '#3F3F46' }}>последние {recentSessions.length}</span>
                )}
              </div>
              {recentSessions.length === 0 ? (
                <div className="py-16 text-center px-6">
                  <div className="text-5xl mb-4">📚</div>
                  <p className="font-bold text-white mb-1.5">Уроков пока нет</p>
                  <p className="text-sm" style={{ color: '#71717A' }}>Начни свой первый урок — он появится здесь.</p>
                </div>
              ) : (
                <ul className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  {recentSessions.map((s) => {
                    const m = subjectMeta(s.subject.slug)
                    const summary = s.summary
                    return (
                      <li key={s.id} className="px-5 py-4 hover:bg-white/[0.03] transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5"
                            style={{ background: 'rgba(255,255,255,0.04)' }}>
                            {m.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm">{s.title ?? s.subject.name}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#3F3F46' }}>
                              {new Date(s.startedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {summary && <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#52525B' }}>{summary}</p>}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Profile card */}
            <div className="rounded-2xl border border-white/[0.07] p-5" style={{ background: '#0F0F18' }}>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={14} className="text-accent-400" />
                <h3 className="font-bold text-white text-sm">Твой профиль</h3>
              </div>

              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-lg font-black text-white"
                style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
              <p className="font-bold text-white text-base mb-0.5">{displayName}</p>
              <p className="text-xs mb-5" style={{ color: '#3F3F46' }}>{session.user.email}</p>

              <div className="space-y-4">
                <ProfileRow label="Основной предмет">
                  {primarySubject ? (
                    <span className="text-sm font-semibold text-white">{subjectMeta(primarySubject.slug).icon} {subjectMeta(primarySubject.slug).label}</span>
                  ) : <span className="text-sm" style={{ color: '#3F3F46' }}>—</span>}
                </ProfileRow>
                <ProfileRow label="Голос репетитора">
                  <span className="text-sm text-zinc-300">{voiceLabel ?? '—'}</span>
                </ProfileRow>
                {langDisplay && (
                  <ProfileRow label="Язык обучения">
                    <span className="text-sm text-zinc-300">{langDisplay}</span>
                  </ProfileRow>
                )}
                {profile?.selfDescription && (
                  <ProfileRow label="О себе">
                    <p className="text-xs leading-relaxed line-clamp-4" style={{ color: '#52525B' }}>{profile.selfDescription}</p>
                  </ProfileRow>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background: '#0F0F18' }}>
              <div className="px-5 py-4 border-b border-white/[0.06]">
                <h3 className="font-bold text-white text-sm">Быстрые действия</h3>
              </div>
              <div className="p-3 space-y-1">
                {[
                  { label: 'Начать урок', href: '/learn', icon: Sparkles },
                  { label: 'История сессий', href: '#history', icon: Clock },
                ].map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className="text-accent-400" />
                      <span className="text-sm text-zinc-300">{label}</span>
                    </div>
                    <ArrowRight size={13} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] p-5" style={{ background: '#0F0F18' }}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={14} className="text-accent-400" />
        <span className="text-xs" style={{ color: '#52525B' }}>{label}</span>
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  )
}

function ProfileRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#3F3F46' }}>{label}</p>
      {children}
    </div>
  )
}
