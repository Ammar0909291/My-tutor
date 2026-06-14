import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'

async function getStats() {
  const now = new Date()
  const d7 = new Date(now.getTime() - 7*86400000)
  const d30 = new Date(now.getTime() - 30*86400000)
  try {
    const [total, active7, active30, enrollments, completedSubjects, novice, student, practitioner, expert] = await withRetry(() =>
      Promise.all([
        prisma.user.count({ where: { isDeleted: false } }),
        prisma.studySession.groupBy({ by: ['userId'], where: { date: { gte: d7 } } }).then(r => r.length),
        prisma.studySession.groupBy({ by: ['userId'], where: { date: { gte: d30 } } }).then(r => r.length),
        prisma.profileSubject.count(),
        prisma.studentProgress.count({ where: { isCompleted: true } }),
        prisma.user.count({ where: { xpPoints: { lt: 100 }, isDeleted: false } }),
        prisma.user.count({ where: { xpPoints: { gte: 100, lt: 500 }, isDeleted: false } }),
        prisma.user.count({ where: { xpPoints: { gte: 500, lt: 1000 }, isDeleted: false } }),
        prisma.user.count({ where: { xpPoints: { gte: 1000 }, isDeleted: false } }),
      ])
    )
    return { total, active7, active30, enrollments, completedSubjects, xp: [novice, student, practitioner, expert] }
  } catch { return null }
}

export default async function AdminAnalyticsPage() {
  const s = await getStats()
  const stat = (label: string, value: string | number, sub?: string, color = 'var(--text-primary)') => (
    <div className="rounded-xl border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
      <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-dim)' }}>{label}</p>
      <p className="text-3xl font-black" style={{ color }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{sub}</p>}
    </div>
  )
  if (!s) return <div className="text-sm" style={{ color: 'var(--text-dim)' }}>Analytics unavailable — DB not reachable.</div>
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>Platform-wide engagement metrics</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {stat('Total Learners', s.total)}
        {stat('Active (7 days)', s.active7, 'unique active users', 'var(--green)')}
        {stat('Active (30 days)', s.active30, 'unique active users')}
        {stat('Enrollments', s.enrollments, 'subject enrollments')}
        {stat('Completions', s.completedSubjects, 'subjects completed')}
        {stat('Completion Rate', s.enrollments ? `${Math.round(s.completedSubjects/s.enrollments*100)}%` : '—')}
      </div>
      <div className="rounded-xl border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
        <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: 'var(--text-dim)' }}>XP Distribution</h2>
        {[['0–99 XP (Novice)', s.xp[0]], ['100–499 XP (Student)', s.xp[1]], ['500–999 XP (Practitioner)', s.xp[2]], ['1000+ XP (Expert+)', s.xp[3]]].map(([label, count]) => {
          const pct = s.total ? Math.round((count as number)/s.total*100) : 0
          return (
            <div key={label as string} className="mb-3">
              <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                <span>{label as string}</span><span>{count as number} ({pct}%)</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'var(--bg-base)' }}>
                <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: 'var(--coral)' }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
