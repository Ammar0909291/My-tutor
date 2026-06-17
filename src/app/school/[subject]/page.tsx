import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { chapterDisplayTitle, isLibraryModeRequest, isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolSubjectProgress } from '@/lib/school/schoolProgress'
import { getStudyPlan } from '@/lib/school/adaptive/studyPlan'
import { MarkChapterCompleteButton } from '@/components/school/MarkChapterCompleteButton'
import { Card, CandyButton, Pill, ProgressBar, SectionTitle } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'
import { getExamReadinessForSubject } from '@/lib/school/adaptive/examReadiness'
import { getSubjectRoadmap } from '@/lib/school/roadmap/learningRoadmap'
import { getLearningNavigatorAction, navigatorTitleForCurrentChapter, NAVIGATOR_URGENCY_COLORS } from '@/lib/school/navigation/learningNavigator'
import { NavigatorActionCard } from '@/components/school/NavigatorActionCard'

/**
 * School subject home (Sprint BH, restyled Sprint F): board-aware landing
 * for one subject. Progressive disclosure — current/next/previous chapter
 * only; the full chapter list lives behind "View all chapters".
 */
export default async function SchoolSubjectPage({ params, searchParams }: { params: { subject: string }, searchParams?: Record<string, string | string[] | undefined> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  if (isLibraryModeRequest(searchParams)) redirect('/dashboard?mode=library')

  const profile = await withRetry(() => prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  }))
  if (!profile?.educationBoard || !profile.grade) redirect('/dashboard')

  const { educationBoard: board, grade } = profile
  const subjectSlug = params.subject
  if (!isSchoolSubject(board, subjectSlug)) redirect('/dashboard')

  const [progress, recentSessions] = await withRetry(() => Promise.all([
    getSchoolSubjectProgress(session.user.id, board, grade, subjectSlug).catch(() => null),
    prisma.learnSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: 'desc' },
      take: 3,
      select: { id: true, title: true, startedAt: true },
    }),
  ]))
  if (!progress) redirect('/dashboard')

  // Sprint BP: compact 4-step study plan + Sprint CE: exam readiness + Sprint CK: roadmap
  // + Sprint CO: unified Learning Navigator action
  const [studyPlan, examReadiness, roadmap, navigatorAction] = await Promise.all([
    getStudyPlan(session.user.id, board, grade, subjectSlug).catch(() => []),
    getExamReadinessForSubject(session.user.id, board, grade, subjectSlug).catch(() => null),
    getSubjectRoadmap(session.user.id, board, grade, subjectSlug).catch(() => null),
    getLearningNavigatorAction(session.user.id, board, grade).catch(() => null),
  ])

  const pos = progress.position
  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug, icon: '📘', color: 'var(--candy-red)', bg: 'rgba(255, 75, 75, 0.12)' }
  const boardLabel = board === 'cbse' ? 'CBSE' : board === 'up_board' ? 'UP Board' : board

  // Sprint CO.1: when the Navigator's recommendation IS this subject's current
  // chapter, fold it into the Current Chapter card instead of showing a
  // separate (duplicate) Navigator card above it.
  const samePriorityTarget = !!navigatorAction
    && navigatorAction.subjectSlug === subjectSlug
    && navigatorAction.chapterId === pos.current.id
  const priorityColor = navigatorAction ? NAVIGATOR_URGENCY_COLORS[navigatorAction.urgency] : undefined
  const continueLabel = samePriorityTarget && navigatorAction
    ? navigatorTitleForCurrentChapter(navigatorAction) ?? navigatorAction.title
    : 'Continue learning'
  const continueHref = samePriorityTarget && navigatorAction
    ? navigatorAction.href
    : `/school/${subjectSlug}/chapter/${encodeURIComponent(pos.current.id)}`

  const readinessGood = examReadiness && (examReadiness.level === 'strongly_prepared' || examReadiness.level === 'exam_ready')

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
        <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Home
          </Link>
          <Pill color="var(--candy-card)" style={{ color: 'var(--candy-ink-soft)', border: '1px solid var(--candy-shadow)' }}>
            🎒 {boardLabel} · Class {grade}
          </Pill>
        </div>
      </nav>

      <main style={{ maxWidth: 768, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Subject header */}
        <header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0, background: m.bg }}>
            {m.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--candy-ink)', margin: 0 }}>{m.label}</h1>
            <p style={{ fontSize: 12, marginTop: 2, color: 'var(--candy-ink-soft)' }}>
              {pos.completedCount} completed · {pos.totalCount - pos.completedCount} remaining
            </p>
            <p style={{ fontSize: 12, marginTop: 2, color: 'var(--candy-ink-soft)' }}>
              Chapter {pos.current.order} of {pos.totalCount}
              {pos.next ? ` · Next recommended: Chapter ${pos.next.order}` : ''}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'monospace', color: m.color }}>{pos.percent}%</span>
            {examReadiness && examReadiness.confidence !== 'low' && (
              <Pill color={readinessGood ? 'var(--candy-green)' : 'var(--candy-yellow)'} style={{ color: '#fff', whiteSpace: 'nowrap' }}>
                {readinessGood ? '✓ Exam Ready' : 'Needs Revision'}
              </Pill>
            )}
          </div>
        </header>

        {/* Progress bar */}
        <ProgressBar percent={pos.percent} fillColor={m.color} />

        {/* Sprint CO: Recommended Next Action — placed above roadmap/progress.
            Sprint CO.1: hidden when it targets THIS subject's current chapter
            (folded into the Current Chapter card below instead, to avoid a
            duplicate card). */}
        {navigatorAction && !samePriorityTarget && <NavigatorActionCard action={navigatorAction} compact />}

        {/* Current chapter — primary card */}
        <Card style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
          <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, color: 'var(--candy-red)' }}>
            Current chapter · {pos.current.order} of {pos.totalCount}
          </p>
          <h2 style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.3, marginBottom: 16, color: 'var(--candy-ink)' }}>
            {chapterDisplayTitle(pos.current.title)}
          </h2>

          {/* Sprint CO.1: Navigator priority folded into this card when its
              target is this chapter — avoids a duplicate recommendation card. */}
          {samePriorityTarget && navigatorAction && (
            <div style={{ borderRadius: 14, padding: 12, marginBottom: 16, background: 'var(--candy-bg)', border: `1px solid ${priorityColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6, color: priorityColor }}>
                  {navigatorAction.urgency === 'high' && <AlertTriangle size={11} />}
                  🎯 Priority
                </span>
                <Pill color={priorityColor} style={{ color: '#fff', fontSize: 9, textTransform: 'uppercase' }}>
                  {navigatorAction.urgency}
                </Pill>
              </div>
              <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>{navigatorAction.reason}</p>
              <p style={{ fontSize: 11, marginTop: 4, color: 'var(--candy-ink-soft)' }}>🎯 {navigatorAction.expectedOutcome}</p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href={continueHref} style={{ textDecoration: 'none' }}>
              <CandyButton
                style={{ width: '100%', background: 'var(--candy-red)', color: '#fff', borderRadius: 14, padding: '14px 28px', fontSize: 14, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                shadowColor="#C73A3A"
              >
                {continueLabel} <ArrowRight size={16} />
              </CandyButton>
            </Link>
            <MarkChapterCompleteButton subject={subjectSlug} chapterId={pos.current.id} />
          </div>
        </Card>

        {/* Sprint BP: study plan — max 4 simple steps, no roadmap UI */}
        {studyPlan.length > 0 && (
          <Card style={{ padding: 20 }}>
            <SectionTitle style={{ fontSize: 13, marginBottom: 12 }}>Study plan</SectionTitle>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {studyPlan.map((step) => (
                <li key={step.slot} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', width: 48, flexShrink: 0, color: 'var(--candy-ink-soft)' }}>
                    {step.slot}
                  </span>
                  <Link href={step.href} style={{ fontWeight: 700, flex: 1, color: 'var(--candy-ink)', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {step.label}
                  </Link>
                  <ArrowRight size={13} style={{ flexShrink: 0, color: 'var(--candy-ink-soft)' }} />
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Previous / Next — quiet secondary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {pos.previous && (
            <Card style={{ padding: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, color: 'var(--candy-ink-soft)' }}>← Previous</p>
              <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, color: 'var(--candy-ink-soft)' }}>{chapterDisplayTitle(pos.previous.title)}</p>
            </Card>
          )}
          {pos.next && (
            <Card style={{ padding: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, color: 'var(--candy-ink-soft)' }}>Up next →</p>
              <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, color: 'var(--candy-ink)' }}>{chapterDisplayTitle(pos.next.title)}</p>
            </Card>
          )}
        </div>

        {/* View all chapters + Take Mock Test — secondary actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Link href={`/school/${subjectSlug}/chapters`} style={{ textDecoration: 'none' }}>
            <CandyButton style={{ width: '100%', textAlign: 'center', fontSize: 14, fontWeight: 800, padding: '12px 0', borderRadius: 14, background: 'var(--candy-card)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink)' }}>
              All chapters ({pos.totalCount})
            </CandyButton>
          </Link>
          <Link href={`/school/${subjectSlug}/mock`} style={{ textDecoration: 'none' }}>
            <CandyButton style={{ width: '100%', textAlign: 'center', fontSize: 14, fontWeight: 800, padding: '12px 0', borderRadius: 14, background: 'var(--candy-purple)', color: '#fff' }} shadowColor="var(--candy-purple-d)">
              🎓 Take Mock Test
            </CandyButton>
          </Link>
        </div>

        {/* Sprint CK: Learning Roadmap — compact chapter progression */}
        {roadmap && roadmap.allChapters.length > 0 && (
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <SectionTitle style={{ fontSize: 13 }}>🗺️ Learning Roadmap</SectionTitle>
              <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>
                {roadmap.completedCount}/{roadmap.totalCount} · {roadmap.completionPercent}%
              </span>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {roadmap.allChapters.map((ch) => {
                const icon = ch.status === 'completed' ? '✓' : ch.status === 'current' ? '→' : '○'
                const iconColor = ch.status === 'completed' ? 'var(--candy-green)' : ch.status === 'current' ? 'var(--candy-red)' : 'var(--candy-ink-soft)'
                const textColor = ch.status === 'upcoming' ? 'var(--candy-ink-soft)' : 'var(--candy-ink)'
                const weight = ch.status === 'current' ? 800 : 500
                return (
                  <li key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                    <span style={{ width: 16, textAlign: 'center', flexShrink: 0, fontWeight: 800, color: iconColor }}>{icon}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColor, fontWeight: weight }}>{ch.title}</span>
                  </li>
                )
              })}
            </ul>
            <p style={{ fontSize: 11, marginTop: 12, color: 'var(--candy-ink-soft)' }}>
              {roadmap.estimatedRemainingSteps === 0
                ? 'All chapters complete — great work!'
                : `${roadmap.estimatedRemainingSteps} chapter${roadmap.estimatedRemainingSteps === 1 ? '' : 's'} remaining to finish this subject`}
            </p>
          </Card>
        )}

        {/* Recent activity — compact */}
        {recentSessions.length > 0 && (
          <Card style={{ padding: 20 }}>
            <SectionTitle style={{ fontSize: 13, marginBottom: 12 }}>Recent activity</SectionTitle>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentSessions.map((s) => (
                <li key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                  <span style={{ flexShrink: 0 }}>📚</span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--candy-ink)' }}>{s.title ?? 'Study session'}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', flexShrink: 0, color: 'var(--candy-ink-soft)' }}>
                    {new Date(s.startedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </main>
    </div>
  )
}
