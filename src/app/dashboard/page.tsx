import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { StartLessonButton } from '@/components/dashboard/StartLessonButton'

const SUBJECT_META: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  c:       { icon: '⚙️', label: 'C язык',          color: 'text-blue-700',   bg: 'bg-blue-50'   },
  cpp:     { icon: '🔷', label: 'C++',              color: 'text-cyan-700',   bg: 'bg-cyan-50'   },
  python:  { icon: '🐍', label: 'Python',           color: 'text-green-700',  bg: 'bg-green-50'  },
  english: { icon: '🇬🇧', label: 'Английский язык', color: 'text-purple-700', bg: 'bg-purple-50' },
}

const VOICE_LABELS: Record<string, string> = {
  alexei: 'Алексей (строгий)',
  maria:  'Мария (мягкий)',
  dmitry: 'Дмитрий (дружелюбный)',
  // Legacy ElevenLabs IDs stored before voice rename
  pNInz6obpgDQGcFmaJgB: 'Александр',
  ErXwobaYiN019PkySvjV: 'Антон',
  EXAVITQu4vr4xnSDxMaL: 'Наталья',
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [user, recentSessions] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        onboardingCompleted: true,
        name: true,
        profile: {
          include: {
            subjects: { include: { subject: true }, take: 1 },
          },
        },
      },
    }),
    prisma.learnSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: 'desc' },
      take: 10,
      include: {
        subject: { select: { name: true, slug: true } },
      },
    }),
  ])

  if (!user?.onboardingCompleted) redirect('/onboarding')

  const profile = user.profile
  const primarySubject = profile?.subjects[0]?.subject
  const meta = primarySubject ? (SUBJECT_META[primarySubject.slug] ?? SUBJECT_META['python']) : null
  const voiceLabel = profile?.voiceId ? (VOICE_LABELS[profile.voiceId] ?? profile.voiceId) : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Nav ── */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-semibold text-slate-900">My Tutor</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 hidden sm:block">{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* ── Greeting ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Привет, {profile?.displayName ?? user.name ?? 'Студент'}! 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Твоя персональная доска обучения</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ── Left column ── */}
          <div className="md:col-span-2 space-y-5">

            {/* Start lesson hero card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-start gap-4">
                {meta && (
                  <div className={`w-14 h-14 ${meta.bg} rounded-2xl flex items-center justify-center text-2xl shrink-0`}>
                    {meta.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {meta && (
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${meta.bg} ${meta.color} mb-2`}>
                      {meta.label}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-slate-900 mb-1">Готов к уроку?</h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {profile?.selfDescription}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <StartLessonButton />
              </div>
            </div>

            {/* Session history */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
                  <Clock size={15} className="text-slate-400" />
                  История уроков
                </h3>
                {recentSessions.length > 0 && (
                  <span className="text-xs text-slate-400">{recentSessions.length} урок(ов)</span>
                )}
              </div>

              {recentSessions.length === 0 ? (
                <div className="py-14 text-center px-6">
                  <div className="text-5xl mb-4">📚</div>
                  <p className="font-semibold text-slate-700 mb-1">Уроков пока нет</p>
                  <p className="text-sm text-slate-400">
                    У тебя пока нет уроков. Начни свой первый урок!
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-50">
                  {recentSessions.map((s) => {
                    const m = SUBJECT_META[s.subject.slug] ?? SUBJECT_META['python']
                    return (
                      <li key={s.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group">
                        <div className={`w-9 h-9 ${m.bg} rounded-xl flex items-center justify-center text-base shrink-0`}>
                          {m.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm truncate">
                            {s.title ?? s.subject.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {new Date(s.startedAt).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <ChevronRight size={15} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Profile summary */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm mb-4">
                <BookOpen size={15} className="text-slate-400" />
                Твой профиль
              </h3>
              <div className="space-y-4">
                <ProfileRow label="Предмет">
                  {meta ? (
                    <span className={`font-semibold text-sm ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">—</span>
                  )}
                </ProfileRow>
                <ProfileRow label="Голос репетитора">
                  <span className="text-sm text-slate-700">{voiceLabel ?? '—'}</span>
                </ProfileRow>
                <ProfileRow label="Уровень">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 mt-0.5">
                    {profile?.selfDescription}
                  </p>
                </ProfileRow>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 text-sm mb-4">Статистика</h3>
              <div className="space-y-3">
                <Stat label="Всего уроков" value={String(recentSessions.length)} />
                <Stat
                  label="Последний урок"
                  value={
                    recentSessions[0]
                      ? new Date(recentSessions[0].startedAt).toLocaleDateString('ru-RU')
                      : 'Ещё не было'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProfileRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      {children}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  )
}
