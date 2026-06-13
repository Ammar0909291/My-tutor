import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { chapterDisplayTitle, isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolSubjectProgress } from '@/lib/school/schoolProgress'
import { getStudyPlan } from '@/lib/school/adaptive/studyPlan'
import { MarkChapterCompleteButton } from '@/components/school/MarkChapterCompleteButton'
import { getExamReadinessForSubject } from '@/lib/school/adaptive/examReadiness'

/**
 * School subject home (Sprint BH): board-aware landing for one subject.
 * Progressive disclosure — current/next/previous chapter only; the full
 * chapter list lives behind "View all chapters".
 */
export default async function SchoolSubjectPage({ params }: { params: { subject: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const profile = await withRetry(() => prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  }))
  if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) redirect('/dashboard')

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

  // Sprint BP: compact 4-step study plan + Sprint CE: exam readiness
  const [studyPlan, examReadiness] = await Promise.all([
    getStudyPlan(session.user.id, board, grade, subjectSlug).catch(() => []),
    getExamReadinessForSubject(session.user.id, board, grade, subjectSlug).catch(() => null),
  ])

  const pos = progress.position
  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug, icon: '📘', color: 'var(--coral)', bg: 'var(--coral-muted)' }
  const boardLabel = board === 'cbse' ? 'CBSE' : board === 'up_board' ? 'UP Board' : board

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <nav className="sticky top-0 z-50"
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Home
          </Link>
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
            🎒 {boardLabel} · Class {grade}
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-5 py-8 space-y-6">

        {/* Subject header */}
        <header className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ background: m.bg }}>
            {m.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {m.label}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {pos.completedCount} completed · {pos.totalCount - pos.completedCount} remaining
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Chapter {pos.current.order} of {pos.totalCount}
              {pos.next ? ` · Next recommended: Chapter ${pos.next.order}` : ''}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-lg font-black font-mono" style={{ color: m.color }}>{pos.percent}%</span>
            {examReadiness && examReadiness.confidence !== 'low' && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{
                  background: examReadiness.level === 'strongly_prepared' || examReadiness.level === 'exam_ready'
                    ? 'var(--green-muted)' : 'var(--yellow-muted)',
                  color: examReadiness.level === 'strongly_prepared' || examReadiness.level === 'exam_ready'
                    ? 'var(--green)' : 'var(--yellow)',
                  border: `1px solid ${examReadiness.level === 'strongly_prepared' || examReadiness.level === 'exam_ready' ? 'var(--green)' : 'var(--yellow)'}`,
                }}
              >
                {examReadiness.level === 'strongly_prepared' || examReadiness.level === 'exam_ready'
                  ? '✓ Exam Ready' : 'Needs Revision'}
              </span>
            )}
          </div>
        </header>

        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
          <div className="h-full rounded-full" style={{ width: `${pos.percent}%`, background: m.color, transition: 'width .5s' }} />
        </div>

        {/* Current chapter — primary card */}
        <section className="relative rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-md)' }}>
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, var(--coral-muted) 0%, transparent 55%)' }} />
          <div className="relative p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--coral)' }}>
              Current chapter · {pos.current.order} of {pos.totalCount}
            </p>
            <h2 className="text-lg font-black leading-snug mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {chapterDisplayTitle(pos.current.title)}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/school/${subjectSlug}/chapter/${encodeURIComponent(pos.current.id)}`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-xl text-white transition-transform hover:scale-[1.02]"
                style={{ background: 'var(--coral)', textDecoration: 'none', boxShadow: 'var(--coral-glow)' }}>
                Continue learning <ArrowRight size={16} />
              </Link>
              <MarkChapterCompleteButton subject={subjectSlug} chapterId={pos.current.id} />
            </div>
          </div>
        </section>

        {/* Sprint BP: study plan — max 4 simple steps, no roadmap UI */}
        {studyPlan.length > 0 && (
          <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <h2 className="font-bold text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>Study plan</h2>
            <ul className="space-y-2">
              {studyPlan.map((step) => (
                <li key={step.slot} className="flex items-center gap-3 text-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider w-12 shrink-0" style={{ color: 'var(--text-dim)' }}>
                    {step.slot}
                  </span>
                  <Link href={step.href} className="font-semibold flex-1 truncate"
                    style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                    {step.label}
                  </Link>
                  <ArrowRight size={13} className="shrink-0" style={{ color: 'var(--text-dim)' }} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Previous / Next — quiet secondary cards */}
        <section className="grid sm:grid-cols-2 gap-3">
          {pos.previous && (
            <div className="rounded-2xl p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-dim)' }}>← Previous</p>
              <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text-secondary)' }}>
                {chapterDisplayTitle(pos.previous.title)}
              </p>
            </div>
          )}
          {pos.next && (
            <div className="rounded-2xl p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-dim)' }}>Up next →</p>
              <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                {chapterDisplayTitle(pos.next.title)}
              </p>
            </div>
          )}
        </section>

        {/* View all chapters + Take Mock Test — secondary actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href={`/school/${subjectSlug}/chapters`}
            className="block text-center text-sm font-bold py-3 rounded-xl"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', textDecoration: 'none' }}>
            All chapters ({pos.totalCount})
          </Link>
          <Link href={`/school/${subjectSlug}/mock`}
            className="block text-center text-sm font-bold py-3 rounded-xl text-white"
            style={{ background: 'var(--blue)', textDecoration: 'none' }}>
            🎓 Take Mock Test
          </Link>
        </div>

        {/* Recent activity — compact */}
        {recentSessions.length > 0 && (
          <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <h2 className="font-bold text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>Recent activity</h2>
            <ul className="space-y-2">
              {recentSessions.map((s) => (
                <li key={s.id} className="flex items-center gap-3 text-sm">
                  <span className="shrink-0">📚</span>
                  <span className="truncate flex-1" style={{ color: 'var(--text-primary)' }}>{s.title ?? 'Study session'}</span>
                  <span className="text-xs font-mono shrink-0" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(s.startedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
