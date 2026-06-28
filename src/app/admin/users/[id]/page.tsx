import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { UserActions } from '../../_components/UserActions'
import { CandyPage } from '@/components/ui/candy'

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, email: true, role: true, xpPoints: true, createdAt: true, isDeleted: true, onboardingCompleted: true,
      profile: { select: { displayName: true, userType: true, educationBoard: true, grade: true, streakDays: true, totalSessions: true, subjects: { include: { subject: { select: { name: true, slug: true } } } } } },
      studentProgress: { select: { subjectCode: true, completionPercent: true, isCompleted: true, lastStudiedAt: true }, take: 20 },
      topicProgress: { select: { subjectSlug: true, status: true, masteryPct: true }, take: 50 },
    },
  })
  if (!user) notFound()
  const badge = (t: string, c: string) => <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase" style={{ background: c+'22', color: c }}>{t}</span>
  const row = (label: string, val: React.ReactNode) => (
    <div className="flex items-start gap-4 py-2.5 border-b" style={{ borderColor: 'var(--border-default)' }}>
      <span className="text-xs w-32 shrink-0 pt-0.5" style={{ color: 'var(--text-dim)' }}>{label}</span>
      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{val}</span>
    </div>
  )
  return (
    <CandyPage legacy className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/users" className="text-xs hover:underline" style={{ color: 'var(--text-dim)' }}>← Users</Link>
        <h1 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{user.name ?? user.email}</h1>
        {badge(user.role, user.role === 'ADMIN' ? 'var(--coral)' : 'var(--text-dim)')}
      </div>
      <div className="rounded-xl border p-5 mb-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
        <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--text-dim)' }}>Profile</h2>
        {row('ID', <span className="font-mono text-xs">{user.id}</span>)}
        {row('Email', user.email)}
        {row('Name', user.name ?? '—')}
        {row('Status', badge(user.isDeleted ? 'Disabled' : 'Active', user.isDeleted ? '#F85149' : 'var(--green)'))}
        {row('XP', user.xpPoints.toLocaleString())}
        {row('Streak', `${user.profile?.streakDays ?? 0} days`)}
        {row('Sessions', user.profile?.totalSessions ?? 0)}
        {row('Board', user.profile?.educationBoard ?? '—')}
        {row('Grade', user.profile?.grade ?? '—')}
        {row('User type', user.profile?.userType ?? '—')}
        {row('Joined', user.createdAt.toLocaleString())}
        {row('Onboarded', user.onboardingCompleted ? 'Yes' : 'No')}
        <div className="mt-4"><UserActions userId={user.id} role={user.role} isDeleted={user.isDeleted} /></div>
      </div>
      {(user.studentProgress.length > 0) && (
        <div className="rounded-xl border p-5 mb-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--text-dim)' }}>Subject Progress</h2>
          {user.studentProgress.map(p => (
            <div key={p.subjectCode} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.subjectCode}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 rounded-full" style={{ background: 'var(--bg-base)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${p.completionPercent}%`, background: 'var(--coral)' }} />
                </div>
                <span className="text-xs w-10 text-right" style={{ color: 'var(--text-secondary)' }}>{p.completionPercent}%</span>
                {p.isCompleted && badge('Done', 'var(--green)')}
              </div>
            </div>
          ))}
        </div>
      )}
      {(user.profile?.subjects && user.profile.subjects.length > 0) && (
        <div className="rounded-xl border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--text-dim)' }}>Enrolled Subjects</h2>
          <div className="flex gap-2 flex-wrap">{user.profile.subjects.map(ps => badge(ps.subject.name, 'var(--blue)'))}</div>
        </div>
      )}
    </CandyPage>
  )
}
