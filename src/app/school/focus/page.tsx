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
import { Card, CandyButton, Pill, EagleMascot } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

/**
 * Focus Mode (Sprint BQ, restyled Sprint G) — walks through today's study
 * plan one task at a time. URL: /school/focus?task=0 (default task=0)
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
      <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)', display: 'flex', flexDirection: 'column' }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
          <div style={{ maxWidth: 576, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> Back
            </Link>
          </div>
        </nav>
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: 360 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <EagleMascot variant="hero" size={88} />
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: 'var(--candy-ink)' }}>All caught up!</h1>
            <p style={{ fontSize: 14, marginBottom: 24, color: 'var(--candy-ink-soft)' }}>No tasks for today. Keep up the great work.</p>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <CandyButton style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontSize: 14, fontWeight: 800, borderRadius: 14, background: 'var(--candy-red)', color: '#fff' }} shadowColor="#C73A3A">
                Back to Dashboard <ArrowRight size={14} />
              </CandyButton>
            </Link>
          </div>
        </main>
      </div>
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
    color: 'var(--candy-red)',
    bg: 'rgba(255, 75, 75, 0.12)',
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
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
        <div style={{ maxWidth: 576, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Back
          </Link>
          <Pill color="var(--candy-bg)" style={{ color: 'var(--candy-ink-soft)', border: '1px solid var(--candy-shadow)' }}>
            <Clock size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
            ~{totalMinutes} min today
          </Pill>
        </div>
      </nav>

      <main style={{ maxWidth: 576, margin: '0 auto', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Sprint CO: Current Priority — derived from the Learning Navigator */}
        {navigatorAction && (
          <p style={{ fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', color: NAVIGATOR_URGENCY_COLORS[navigatorAction.urgency] }}>
            <span>🎯 Current Priority:</span>
            <span style={{ color: 'var(--candy-ink)' }}>{navigatorAction.title}</span>
            <span style={{ color: 'var(--candy-ink-soft)', fontWeight: 400 }}>— {navigatorAction.reason}</span>
          </p>
        )}

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {tasks.map((_, i) => (
            <div
              key={i}
              style={{ height: 6, flex: 1, borderRadius: 8, background: i <= taskIndex ? 'var(--candy-red)' : 'var(--candy-shadow)', transition: 'background .3s' }}
            />
          ))}
        </div>

        <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--candy-ink-soft)' }}>
          Task {taskIndex + 1} of {tasks.length}
        </p>

        {/* Current task card */}
        <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, background: m.bg }}>
              {m.icon}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: m.color }}>{task.subjectLabel}</p>
              <p style={{ fontSize: 12, marginTop: 2, color: 'var(--candy-ink-soft)' }}>~{task.estimatedMinutes} min</p>
            </div>
          </div>

          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.3, color: 'var(--candy-ink)', margin: 0 }}>{task.title}</h1>
            <p style={{ fontSize: 14, marginTop: 4, color: 'var(--candy-ink-soft)' }}>{task.reason}</p>
          </div>

          <Link href={task.href} style={{ textDecoration: 'none' }}>
            <CandyButton
              style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 0', fontSize: 14, fontWeight: 800, borderRadius: 14, background: 'var(--candy-red)', color: '#fff' }}
              shadowColor="#C73A3A"
            >
              {ACTION_LABELS[task.priority] ?? 'Start Learning'} <ArrowRight size={16} />
            </CandyButton>
          </Link>
        </Card>

        {/* Upcoming tasks */}
        {tasks.slice(taskIndex + 1).length > 0 && (
          <Card style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, color: 'var(--candy-ink-soft)' }}>Up next</p>
            {tasks.slice(taskIndex + 1).map((t, i) => {
              const tm =
                SCHOOL_SUBJECT_META[t.subjectSlug] ??
                { icon: '📘', color: 'var(--candy-red)' }
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, padding: '4px 0' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{tm.icon}</span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 700, color: 'var(--candy-ink-soft)' }}>{t.title}</span>
                  <span style={{ fontSize: 12, flexShrink: 0, color: 'var(--candy-ink-soft)' }}>~{t.estimatedMinutes} min</span>
                </div>
              )
            })}
          </Card>
        )}

        {/* Skip / done */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
          {taskIndex > 0 ? (
            <Link href={`/school/focus?task=${taskIndex - 1}`} style={{ fontSize: 12, fontWeight: 800, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          {isLast ? (
            <Link href="/dashboard" style={{ fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--candy-red)', textDecoration: 'none' }}>
              🔥 {streak?.currentStreak ?? 0}-day streak · Done ✓
            </Link>
          ) : (
            <Link href={`/school/focus?task=${taskIndex + 1}`} style={{ fontSize: 12, fontWeight: 800, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              Skip →
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
