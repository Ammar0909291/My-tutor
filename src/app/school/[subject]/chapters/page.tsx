import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { groupChaptersByUnit, chapterDisplayTitle, isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolSubjectProgress } from '@/lib/school/schoolProgress'
import { Card, Pill, SectionTitle } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

/**
 * Full chapter list (Sprint BH, restyled Sprint F) — secondary view behind
 * "View all chapters". Mobile-first cards grouped by unit/theme with
 * completion status; the current chapter is highlighted and remains the
 * only tappable CTA.
 */
export default async function SchoolChapterListPage({ params }: { params: { subject: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const profile = await withRetry(() => prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  }))
  if (!profile?.educationBoard || !profile.grade) redirect('/dashboard')

  const { educationBoard: board, grade } = profile
  const subjectSlug = params.subject
  if (!isSchoolSubject(board, subjectSlug)) redirect('/dashboard')

  const progress = await withRetry(() => getSchoolSubjectProgress(session.user.id, board, grade, subjectSlug).catch(() => null))
  if (!progress) redirect('/dashboard')

  const completed = progress.completedOrders
  const pos = progress.position
  const groups = groupChaptersByUnit(progress.chapters)
  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug, icon: '📘', color: 'var(--candy-red)', bg: 'rgba(255, 75, 75, 0.12)' }

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
        <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={`/school/${subjectSlug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> {m.label}
          </Link>
          <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'monospace', color: m.color }}>{pos.completedCount}/{pos.totalCount}</span>
        </div>
      </nav>

      <main style={{ maxWidth: 768, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>{m.icon}</span>
          <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--candy-ink)', margin: 0 }}>All chapters</h1>
        </header>

        {groups.map((group) => (
          <section key={group.unit}>
            {groups.length > 1 && (
              <SectionTitle style={{ fontSize: 11, marginBottom: 8 }}>{group.unit}</SectionTitle>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.chapters.map((ch) => {
                const isDone = completed.has(ch.order)
                const isCurrent = ch.id === pos.current.id
                const card = (
                  <Card
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: 16,
                      background: isCurrent ? 'rgba(255, 75, 75, 0.08)' : 'var(--candy-card)',
                      border: `1px solid ${isCurrent ? 'var(--candy-red)' : 'var(--candy-shadow)'}`,
                      opacity: isDone ? 0.65 : 1,
                    }}
                  >
                    <span
                      style={{
                        width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 800, flexShrink: 0,
                        background: isDone ? 'rgba(88, 204, 2, 0.16)' : 'var(--candy-bg)',
                        border: `1px solid ${isDone ? 'var(--candy-green)' : 'var(--candy-shadow)'}`,
                        color: isDone ? 'var(--candy-green-d)' : 'var(--candy-ink-soft)',
                      }}
                    >
                      {isDone ? '✓' : ch.order}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, flex: 1, color: isCurrent ? 'var(--candy-red)' : 'var(--candy-ink)' }}>
                      {chapterDisplayTitle(ch.title)}
                    </span>
                    {(isCurrent || isDone) && (
                      <Pill color={isCurrent ? 'var(--candy-red)' : 'var(--candy-green)'} style={{ color: '#fff', flexShrink: 0, fontSize: 9 }}>
                        {isCurrent ? 'In progress' : 'Completed'}
                      </Pill>
                    )}
                  </Card>
                )
                return isCurrent ? (
                  <Link key={ch.id} href={`/school/${subjectSlug}/chapter/${encodeURIComponent(ch.id)}`} style={{ textDecoration: 'none', display: 'block' }}>
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
