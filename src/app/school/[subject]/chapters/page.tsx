import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import {
  getSchoolChapters, getChapterPosition, groupChaptersByUnit, chapterDisplayTitle,
  isSchoolSubject, schoolSubjectCode, SCHOOL_SUBJECT_META,
} from '@/lib/school/schoolRouting'

/**
 * Full chapter list (Sprint BH) — secondary view behind "View all chapters".
 * Mobile-first cards grouped by unit/theme with completion status; the
 * current chapter is highlighted and remains the only tappable CTA.
 */
export default async function SchoolChapterListPage({ params }: { params: { subject: string } }) {
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

  const chapters = getSchoolChapters(board, subjectSlug, grade)
  if (chapters.length === 0) redirect('/dashboard')

  const sp = await withRetry(() => prisma.studentProgress.findUnique({
    where: { userId_subjectCode: { userId: session.user.id, subjectCode: schoolSubjectCode(board, subjectSlug, grade) } },
    select: { completedLessons: true },
  }))
  const completed = new Set(sp?.completedLessons ?? [])
  const pos = getChapterPosition(chapters, sp?.completedLessons ?? [])!
  const groups = groupChaptersByUnit(chapters)
  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug, icon: '📘', color: 'var(--coral)', bg: 'var(--coral-muted)' }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <nav className="sticky top-0 z-50"
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href={`/school/${subjectSlug}`} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> {m.label}
          </Link>
          <span className="text-xs font-bold font-mono" style={{ color: m.color }}>{pos.completedCount}/{pos.totalCount}</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-5 py-8 space-y-6">
        <header className="flex items-center gap-3">
          <span className="text-2xl">{m.icon}</span>
          <h1 className="text-xl font-black tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            All chapters
          </h1>
        </header>

        {groups.map((group) => (
          <section key={group.unit}>
            {groups.length > 1 && (
              <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2 px-0.5" style={{ color: 'var(--text-secondary)' }}>
                {group.unit}
              </h2>
            )}
            <div className="space-y-2">
              {group.chapters.map((ch) => {
                const isDone = completed.has(ch.order)
                const isCurrent = ch.id === pos.current.id
                const card = (
                  <div className="flex items-center gap-3 rounded-2xl p-4 transition-all"
                    style={{
                      background: isCurrent ? 'var(--coral-muted)' : 'var(--bg-surface)',
                      border: `1px solid ${isCurrent ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                      opacity: isDone ? 0.65 : 1,
                    }}>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{
                        background: isDone ? 'var(--green-muted)' : 'var(--bg-elevated)',
                        border: `1px solid ${isDone ? 'var(--green)' : 'var(--border-default)'}`,
                        color: isDone ? 'var(--green)' : 'var(--text-secondary)',
                      }}>
                      {isDone ? '✓' : ch.order}
                    </span>
                    <span className="text-sm font-semibold leading-snug flex-1"
                      style={{ color: isCurrent ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      {chapterDisplayTitle(ch.title)}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider shrink-0" style={{ color: 'var(--accent-primary)' }}>
                        Current
                      </span>
                    )}
                  </div>
                )
                return isCurrent ? (
                  <Link key={ch.id} href={`/learn?subject=${subjectSlug}&chapter=${encodeURIComponent(ch.id)}`} style={{ textDecoration: 'none', display: 'block' }}>
                    {card}
                  </Link>
                ) : (
                  <div key={ch.id}>{card}</div>
                )
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
