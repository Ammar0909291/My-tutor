import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { BookOpen, Clock, Flame, GraduationCap, Layers, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { StartLessonButton } from '@/components/dashboard/StartLessonButton'

const SUBJECT_META: Record<string, { icon: string; label: string; ring: string; glow: string }> = {
  c:       { icon: '⚙️', label: 'C язык',           ring: 'border-blue-500/30',   glow: 'bg-blue-500/10'   },
  cpp:     { icon: '🔷', label: 'C++',               ring: 'border-cyan-500/30',   glow: 'bg-cyan-500/10'   },
  python:  { icon: '🐍', label: 'Python',            ring: 'border-emerald-500/30', glow: 'bg-emerald-500/10' },
  english: { icon: '🇬🇧', label: 'Английский язык',  ring: 'border-violet-500/30', glow: 'bg-violet-500/10' },
}
function subjectMeta(slug: string) {
  return SUBJECT_META[slug] ?? { icon: '📘', label: slug, ring: 'border-accent-500/30', glow: 'bg-accent-500/10' }
}

const VOICE_LABELS: Record<string, string> = {
  alexei: 'Алексей (строгий)',
  maria:  'Мария (мягкий)',
  dmitry: 'Дмитрий (дружелюбный)',
  pNInz6obpgDQGcFmaJgB: 'Александр',
  ErXwobaYiN019PkySvjV: 'Антон',
  EXAVITQu4vr4xnSDxMaL: 'Наталья',
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
          include: {
            // Restored: fetch ALL enrolled subjects, not just the first
            subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } },
          },
        },
      },
    }),
    prisma.learnSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: 'desc' },
      take: 3,
      include: { subject: { select: { name: true, slug: true } } },
    }),
    prisma.learnSession.count({ where: { userId: session.user.id } }),
  ])

  if (!user?.onboardingCompleted) redirect('/onboarding')

  const profile = user.profile
  const enrolledSubjects = profile?.subjects ?? []
  const primarySubject = enrolledSubjects[0]?.subject
  const voiceLabel = profile?.voiceId ? (VOICE_LABELS[profile.voiceId] ?? profile.voiceId) : null

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[140px]" />

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-20 glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-700 rounded-lg flex items-center justify-center shadow-lg shadow-accent-600/30">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-semibold text-white">My Tutor</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 hidden sm:block">{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="relative max-w-6xl mx-auto px-6 py-10 animate-fade-in">
        {/* ── Greeting ── */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Привет, {profile?.displayName ?? user.name ?? 'Студент'}! 👋
          </h1>
          <p className="text-slate-400 mt-1.5">Твоя персональная доска обучения</p>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard icon={GraduationCap} label="Всего уроков" value={String(totalLessons)} />
          <StatCard icon={Layers} label="Предметов" value={String(enrolledSubjects.length)} />
          <StatCard
            icon={Flame}
            label="Последний урок"
            value={recentSessions[0] ? new Date(recentSessions[0].startedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) : '—'}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Start lesson hero */}
            <div className="relative glass rounded-2xl p-7 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-600/15 to-transparent" />
              <div className="relative flex items-start gap-4">
                {primarySubject && (
                  <div className={`w-14 h-14 rounded-2xl border ${subjectMeta(primarySubject.slug).ring} ${subjectMeta(primarySubject.slug).glow} flex items-center justify-center text-2xl shrink-0`}>
                    {subjectMeta(primarySubject.slug).icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {primarySubject && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-600/15 border border-accent-500/20 text-accent-300 text-xs font-semibold mb-2">
                      <Sparkles size={11} />
                      {subjectMeta(primarySubject.slug).label}
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-white mb-1">Готов к уроку?</h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{profile?.selfDescription}</p>
                </div>
              </div>
              <div className="relative mt-6"><StartLessonButton /></div>
            </div>

            {/* Subjects grid (RESTORED) */}
            <div className="glass rounded-2xl">
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
                <Layers size={15} className="text-accent-400" />
                <h3 className="font-semibold text-white text-sm">Мои программы</h3>
              </div>
              {enrolledSubjects.length === 0 ? (
                <div className="py-12 text-center px-6">
                  <div className="text-4xl mb-3">🧭</div>
                  <p className="font-semibold text-slate-200 mb-1">Пока нет программ</p>
                  <p className="text-sm text-slate-400">Заверши онбординг, чтобы выбрать предмет.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3 p-4">
                  {enrolledSubjects.map((ps) => {
                    const m = subjectMeta(ps.subject.slug)
                    return (
                      <div key={ps.id} className={`group flex items-center gap-3 p-4 rounded-xl border ${m.ring} ${m.glow} hover:bg-white/5 transition-all hover:-translate-y-0.5`}>
                        <div className="w-11 h-11 rounded-xl bg-slate-800/60 flex items-center justify-center text-xl shrink-0">{m.icon}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white text-sm truncate">{ps.subject.name}</p>
                          <p className="text-xs text-slate-400 truncate">{ps.level ? `Уровень: ${ps.level}` : m.label}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Session history */}
            <div className="glass rounded-2xl">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                  <Clock size={15} className="text-accent-400" />
                  История уроков
                </h3>
                {recentSessions.length > 0 && <span className="text-xs text-slate-500">последние {recentSessions.length}</span>}
              </div>

              {recentSessions.length === 0 ? (
                <div className="py-14 text-center px-6">
                  <div className="text-5xl mb-4">📚</div>
                  <p className="font-semibold text-slate-200 mb-1">Уроков пока нет</p>
                  <p className="text-sm text-slate-400">Начни свой первый урок — он появится здесь.</p>
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {recentSessions.map((s) => {
                    const m = subjectMeta(s.subject.slug)
                    const summary = (s as typeof s & { summary?: string | null }).summary
                    return (
                      <li key={s.id} className="px-5 py-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-xl bg-slate-800/60 flex items-center justify-center text-base shrink-0 mt-0.5">{m.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-100 text-sm">{s.title ?? s.subject.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {new Date(s.startedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {summary && <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{summary}</p>}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm mb-4">
                <BookOpen size={15} className="text-accent-400" />
                Твой профиль
              </h3>
              <div className="space-y-4">
                <ProfileRow label="Основной предмет">
                  {primarySubject ? (
                    <span className="font-semibold text-sm text-white">{subjectMeta(primarySubject.slug).icon} {subjectMeta(primarySubject.slug).label}</span>
                  ) : <span className="text-sm text-slate-500">—</span>}
                </ProfileRow>
                <ProfileRow label="Голос репетитора">
                  <span className="text-sm text-slate-200">{voiceLabel ?? '—'}</span>
                </ProfileRow>
                <ProfileRow label="Уровень">
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4 mt-0.5">{profile?.selfDescription}</p>
                </ProfileRow>
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
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        <Icon size={15} className="text-accent-400" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

function ProfileRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      {children}
    </div>
  )
}
