import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getDailyStudyPlan } from '@/lib/school/adaptive/dailyPlan'
import { SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getStudyStreak } from '@/lib/school/achievements/streakEngine'
import { getLearningNavigatorAction, NAVIGATOR_URGENCY_COLORS } from '@/lib/school/navigation/learningNavigator'
import { CandyPage } from '@/components/ui/candy'

/**
 * Focus Mode (Sprint BQ) — walks through today's study plan one task at a time.
 * URL: /school/focus?task=0 (default task=0)
 */
export default async function FocusPage({
  searchParams,
}: {
  searchParams: { task?: string }
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const profile = await withRetry(() =>
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { userType: true, educationBoard: true, grade: true },
    })
  )
  if (
    !profile?.educationBoard ||
    !profile.grade
  ) {
    redirect('/dashboard')
  }

  const { educationBoard: board, grade } = profile
  const [tasks, streak, navigatorAction] = await Promise.all([
    getDailyStudyPlan(session.user.id, board, grade),
    getStudyStreak(session.user.id).catch(() => null),
    // Sprint CO: unified Learning Navigator action — "Current Priority" line
    getLearningNavigatorAction(session.user.id, board, grade).catch(() => null),
  ])

  if (tasks.length === 0) {
    return (
      <CandyPage legacy className="flex flex-col">
        <nav
          className="sticky top-0 z-50"
          style={{
            background: 'var(--bg-overlay)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-default)',
          }}
        >
          <div className="max-w-xl mx-auto px-5 h-[60px] flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              <ArrowLeft size={15} /> Back
            </Link>
          </div>
        </nav>
        <main className="flex-1 flex items-center justify-center px-5">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-4">🎉</div>
            <h1
              className="text-xl font-black mb-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              All caught up!
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              No tasks for today. Keep up the great work.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl text-white"
              style={{ background: 'var(--coral)', textDecoration: 'none' }}
            >
              Back to Dashboard <ArrowRight size={14} />
            </Link>
          </div>
        </main>
      </CandyPage>
    )
  }

  const taskIndex = Math.min(
    Math.max(0, parseInt(searchParams.task ?? '0', 10) || 0),
    tasks.length - 1
  )
  const task = tasks[taskIndex]
  const isLast = taskIndex === tasks.length - 1
  const totalMinutes = tasks.reduce((s, t) => s + t.estimatedMinutes, 0)
  const m = SCHOOL_SUBJECT_META[task.subjectSlug] ?? {
    label: task.subjectLabel,
    icon: '📘',
    color: 'var(--coral)',
    bg: 'var(--coral-muted)',
  }

  const ACTION_LABELS: Record<string, string> = {
    retake_assessment: 'Retake Assessment',
    bridge_prerequisite: 'Review Foundation',
    review_spaced: 'Quick Review',
    practice_weak: 'Review Weak Areas',
    continue_chapter: 'Continue',
    start_next_chapter: 'Start Chapter',
  }

  return (
    <CandyPage legacy className="min-h-screen">
      <nav
        className="sticky top-0 z-50"
        style={{
          background: 'var(--bg-overlay)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div className="max-w-xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
          >
            <ArrowLeft size={15} /> Back
          </Link>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-secondary)',
            }}
          >
            <Clock size={11} className="inline mr-1" />
            ~{totalMinutes} min today
          </span>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-5 py-10 space-y-6">
        {/* Sprint CO: Current Priority — derived from the Learning Navigator */}
        {navigatorAction && (
          <p className="text-xs font-semibold flex items-center gap-1.5 flex-wrap"
            style={{ color: NAVIGATOR_URGENCY_COLORS[navigatorAction.urgency] }}>
            <span>🎯 Current Priority:</span>
            <span style={{ color: 'var(--text-primary)' }}>{navigatorAction.title}</span>
            <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>— {navigatorAction.reason}</span>
          </p>
        )}

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {tasks.map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full"
              style={{
                background: i <= taskIndex ? 'var(--coral)' : 'var(--bg-elevated)',
                transition: 'background .3s',
              }}
            />
          ))}
        </div>

        <p
          className="text-[11px] font-bold uppercase tracking-wider"
          style={{ color: 'var(--text-dim)' }}
        >
          Task {taskIndex + 1} of {tasks.length}
        </p>

        {/* Current task card */}
        <section
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 0% 0%, ${m.bg} 0%, transparent 55%)`,
            }}
          />
          <div className="relative p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: m.bg }}
              >
                {m.icon}
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: m.color }}
                >
                  {task.subjectLabel}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--text-dim)' }}
                >
                  ~{task.estimatedMinutes} min
                </p>
              </div>
            </div>

            <div>
              <h1
                className="text-xl font-black leading-snug"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)',
                }}
              >
                {task.title}
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {task.reason}
              </p>
            </div>

            <Link
              href={task.href}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold rounded-xl text-white transition-transform hover:scale-[1.02]"
              style={{
                background: 'var(--coral)',
                textDecoration: 'none',
                boxShadow: 'var(--coral-glow)',
              }}
            >
              {ACTION_LABELS[task.priority] ?? 'Start Learning'}{' '}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Upcoming tasks */}
        {tasks.slice(taskIndex + 1).length > 0 && (
          <section
            className="rounded-2xl p-4 space-y-2"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-wider mb-1"
              style={{ color: 'var(--text-dim)' }}
            >
              Up next
            </p>
            {tasks.slice(taskIndex + 1).map((t, i) => {
              const tm =
                SCHOOL_SUBJECT_META[t.subjectSlug] ??
                { icon: '📘', color: 'var(--coral)' }
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm py-1"
                >
                  <span className="text-base shrink-0">{tm.icon}</span>
                  <span
                    className="flex-1 truncate font-semibold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {t.title}
                  </span>
                  <span
                    className="text-xs shrink-0"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    ~{t.estimatedMinutes} min
                  </span>
                </div>
              )
            })}
          </section>
        )}

        {/* Skip / done */}
        <div className="flex items-center justify-between pt-2">
          {taskIndex > 0 ? (
            <Link
              href={`/school/focus?task=${taskIndex - 1}`}
              className="text-xs font-bold"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          {isLast ? (
            <Link
              href="/dashboard"
              className="text-xs font-bold flex items-center gap-1.5"
              style={{ color: 'var(--coral)', textDecoration: 'none' }}
            >
              🔥 {streak?.currentStreak ?? 0}-day streak · Done ✓
            </Link>
          ) : (
            <Link
              href={`/school/focus?task=${taskIndex + 1}`}
              className="text-xs font-bold"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              Skip →
            </Link>
          )}
        </div>
      </main>
    </CandyPage>
  )
}
