import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { BookOpen, Clock, ChevronRight, Zap } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'

const SUBJECT_META: Record<string, { icon: string; color: string; bg: string }> = {
  c:       { icon: '⚙️', color: 'text-blue-600',   bg: 'bg-blue-50' },
  cpp:     { icon: '🔷', color: 'text-cyan-600',    bg: 'bg-cyan-50' },
  python:  { icon: '🐍', color: 'text-green-600',   bg: 'bg-green-50' },
  english: { icon: '🇬🇧', color: 'text-purple-600', bg: 'bg-purple-50' },
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [profile, recentSessions] = await Promise.all([
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { subjects: { include: { subject: true }, take: 1 } },
    }),
    prisma.learnSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: 'desc' },
      take: 5,
      include: { subject: { select: { name: true, slug: true } }, messages: { take: 1, orderBy: { createdAt: 'desc' } } },
    }),
  ])

  if (!profile) redirect('/onboarding')

  const primarySubject = profile.subjects[0]?.subject
  const meta = primarySubject ? SUBJECT_META[primarySubject.slug] ?? SUBJECT_META['python'] : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top Nav ── */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-semibold text-slate-900">My Tutor</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">{session.user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* ── Greeting ── */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-900">
            Привет, {profile.displayName}! 👋
          </h1>
          <p className="text-slate-500 mt-1">Готов продолжить обучение?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* ── Main card ── */}
          <div className="md:col-span-2 space-y-5">
            {/* Start lesson CTA */}
            {primarySubject && meta && (
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{meta.icon}</span>
                      <span className="font-semibold text-indigo-200 text-sm">
                        {primarySubject.name}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Продолжить обучение</h2>
                    <p className="text-indigo-200 text-sm leading-relaxed line-clamp-2">
                      {profile.selfDescription}
                    </p>
                  </div>
                  <Zap className="text-indigo-300 shrink-0 mt-1" size={28} />
                </div>
                <Link
                  href="/learn"
                  className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  Начать урок
                  <ChevronRight size={16} />
                </Link>
              </div>
            )}

            {/* Session history */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  История уроков
                </h3>
                {recentSessions.length > 0 && (
                  <span className="text-xs text-slate-400">{recentSessions.length} урок(ов)</span>
                )}
              </div>

              {recentSessions.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="text-4xl mb-3">📚</div>
                  <p className="font-medium text-slate-700">Уроков пока нет</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Нажми «Начать урок» — это будет твой первый урок!
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-50">
                  {recentSessions.map((s) => {
                    const m = SUBJECT_META[s.subject.slug] ?? SUBJECT_META['python']
                    return (
                      <li key={s.id}>
                        <Link
                          href={`/learn?session=${s.id}`}
                          className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group"
                        >
                          <div className={`w-9 h-9 ${m.bg} rounded-xl flex items-center justify-center text-lg shrink-0`}>
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
                          <ChevronRight
                            size={16}
                            className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0"
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-slate-400" />
                Твой профиль
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Предмет</p>
                  {primarySubject && meta ? (
                    <div className="flex items-center gap-2">
                      <span>{meta.icon}</span>
                      <span className={`text-sm font-semibold ${meta.color}`}>
                        {primarySubject.name}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Не выбран</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Уровень</p>
                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">
                    {profile.selfDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Статистика</h3>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  )
}
