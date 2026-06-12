import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Target, MessageCircle, Check, ClipboardCheck } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { chapterDisplayTitle, isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolSubjectProgress, getChapterProgressDetails } from '@/lib/school/schoolProgress'
import { getChapterContent } from '@/lib/school/chapterContent'

/**
 * Chapter learning workspace (Sprint BL) — the student's home base for one
 * chapter: what it's about, what they'll learn, two ways to act (continue
 * the tutor / practice), a shortcut into the tutor for common questions, and
 * a minimal at-a-glance progress readout.
 */

const BOARD_LABELS: Record<string, string> = {
  cbse: 'CBSE',
  up_board: 'UP Board',
}

const ASK_CHIPS: { key: string; label: string }[] = [
  { key: 'explain', label: 'Explain this chapter' },
  { key: 'examples', label: 'Give examples' },
  { key: 'summary', label: 'Summarize chapter' },
  { key: 'basics', label: 'Help me understand basics' },
]

function StatCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-dim)' }}>{label}</p>
      <p className="text-lg font-black" style={{ fontFamily: 'var(--font-heading)', color: accent ?? 'var(--text-primary)' }}>{value}</p>
    </div>
  )
}

export default async function ChapterWorkspacePage({ params }: { params: { subject: string; chapterId: string } }) {
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

  const progress = await withRetry(() => getSchoolSubjectProgress(session.user.id, board, grade, subjectSlug).catch(() => null))
  if (!progress) redirect('/dashboard')

  const chapter = progress.chapters.find((c) => c.id === params.chapterId)
  if (!chapter) redirect(`/school/${subjectSlug}`)

  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug, icon: '📘', color: 'var(--coral)', bg: 'var(--coral-muted)' }
  const boardLabel = BOARD_LABELS[board] ?? board
  const completed = progress.completedOrders.has(chapter.order)
  const isCurrent = chapter.id === progress.position.current.id
  const statusLabel = completed ? 'Completed' : isCurrent ? 'In progress' : 'Not started'
  const statusColor = completed ? 'var(--green)' : isCurrent ? 'var(--coral)' : 'var(--text-dim)'

  const [content, details] = await Promise.all([
    getChapterContent(board, subjectSlug, m.label, grade, chapter),
    getChapterProgressDetails(session.user.id, subjectSlug, chapter, completed),
  ])

  const learnHref = `/learn?subject=${subjectSlug}&chapter=${encodeURIComponent(chapter.id)}`
  const practiceHref = `/school/${subjectSlug}/chapter/${encodeURIComponent(chapter.id)}/practice`
  const assessmentHref = `/school/${subjectSlug}/chapter/${encodeURIComponent(chapter.id)}/assessment`
  const summaryParagraphs = content.summary.split(/\n+/).filter((p) => p.trim().length > 0)

  // Next chapter for recommendation when assessment is passed
  const chapterIdx = progress.chapters.findIndex((c) => c.id === chapter.id)
  const nextChapter = chapterIdx >= 0 && chapterIdx < progress.chapters.length - 1
    ? progress.chapters[chapterIdx + 1] : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <nav className="sticky top-0 z-50"
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href={`/school/${subjectSlug}`} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> {m.label}
          </Link>
          <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-secondary)' }}>
            Chapter {chapter.order} of {progress.position.totalCount}
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-5 py-8 space-y-6">

        {/* Phase 1: Chapter header */}
        <header className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: m.bg }}>
            {m.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: m.color }}>
              {m.label} · {boardLabel} · Class {grade}
            </p>
            <h1 className="text-xl font-black leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {chapterDisplayTitle(chapter.title)}
            </h1>
            <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ color: statusColor, background: 'var(--bg-elevated)', border: `1px solid ${statusColor}` }}>
              {statusLabel}
            </span>
          </div>
        </header>

        {/* Phase 5: Chapter summary */}
        <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
          <h2 className="font-bold text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>About this chapter</h2>
          <div className="space-y-2">
            {summaryParagraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{p}</p>
            ))}
          </div>
        </section>

        {/* Phase 2: Learning objectives */}
        <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
          <h2 className="font-bold text-xs uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>What you&apos;ll learn</h2>
          <ul className="space-y-2.5">
            {content.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--green-muted)', color: 'var(--green)' }}>
                  <Check size={11} />
                </span>
                <span className="leading-snug">{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Phase 3: Primary actions */}
        <section className="flex flex-col gap-3">
          <Link href={learnHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold rounded-xl text-white transition-transform hover:scale-[1.02]"
            style={{ background: 'var(--coral)', textDecoration: 'none', boxShadow: 'var(--coral-glow)' }}>
            Continue learning <ArrowRight size={16} />
          </Link>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={practiceHref}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-xl transition-transform hover:scale-[1.02]"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', textDecoration: 'none' }}>
              <Target size={15} /> Practice
            </Link>
            <Link href={assessmentHref}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold rounded-xl transition-transform hover:scale-[1.02]"
              style={{
                background: details.assessmentPassed ? 'var(--green-muted)' : 'var(--bg-elevated)',
                border: `1px solid ${details.assessmentPassed ? 'var(--green)' : 'var(--border-default)'}`,
                color: details.assessmentPassed ? 'var(--green)' : 'var(--text-primary)',
                textDecoration: 'none',
              }}>
              <ClipboardCheck size={15} />
              {details.assessmentPassed ? 'Retake Assessment' : details.assessmentAttempts > 0 ? 'Retake Assessment' : 'Take Assessment'}
            </Link>
          </div>
        </section>

        {/* Phase 4: Ask Tutor */}
        <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
          <h2 className="font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <MessageCircle size={13} /> Ask Tutor
          </h2>
          <div className="flex flex-wrap gap-2">
            {ASK_CHIPS.map((chip) => (
              <Link key={chip.key} href={`${learnHref}&ask=${chip.key}`}
                className="text-xs font-semibold px-3.5 py-2 rounded-full transition-colors"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', textDecoration: 'none' }}>
                {chip.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Phase 6: Progress block */}
        <section className="grid grid-cols-2 gap-3">
          <StatCard label="Chapter" value={completed ? 'Completed' : 'Not yet'} accent={completed ? 'var(--green)' : undefined} />
          <StatCard
            label="Assessment"
            value={details.assessmentPassed ? 'Passed' : details.assessmentAttempts > 0 ? 'Not passed yet' : 'Not taken'}
            accent={details.assessmentPassed ? 'var(--green)' : details.assessmentAttempts > 0 ? 'var(--coral)' : undefined}
          />
          <StatCard
            label="Practice"
            value={details.practiceStatus === 'mastered' ? 'Mastered' : details.practiceStatus === 'in_progress' ? 'In Progress' : 'Not Started'}
            accent={details.practiceStatus === 'mastered' ? 'var(--green)' : details.practiceStatus === 'in_progress' ? 'var(--coral)' : undefined}
          />
          <StatCard label="Practice accuracy" value={details.accuracyPercent !== null ? `${details.accuracyPercent}%` : '—'} />
        </section>

        {/* Phase 6: Next chapter recommendation (when assessment passed) */}
        {details.assessmentPassed && nextChapter && (
          <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--green)' }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--green)' }}>Recommended Next</p>
            <p className="font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>{chapterDisplayTitle(nextChapter.title)}</p>
            <Link href={`/school/${subjectSlug}/chapter/${encodeURIComponent(nextChapter.id)}`}
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl text-white"
              style={{ background: 'var(--green)', textDecoration: 'none' }}>
              Go to next chapter <ArrowRight size={13} />
            </Link>
          </section>
        )}
      </main>
    </div>
  )
}
