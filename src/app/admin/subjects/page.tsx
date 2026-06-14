import { prisma } from '@/lib/db/prisma'

export default async function AdminSubjectsPage() {
  const subjects = await prisma.subject.findMany({
    select: { id: true, slug: true, name: true, type: true, description: true,
      _count: { select: { profileSubjects: true } } },
    orderBy: { name: 'asc' },
  })
  const badge = (t: string) => <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase" style={{ background: 'var(--blue-muted)', color: 'var(--blue)' }}>{t}</span>
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Subjects</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>{subjects.length} subjects in catalog</p>
      </div>
      {subjects.length === 0 && <p className="text-sm" style={{ color: 'var(--text-dim)' }}>No subjects seeded yet.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {subjects.map(s => (
          <div key={s.id} className="rounded-xl border p-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{s.name}</span>
              {badge(s.type)}
            </div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-dim)' }}>/{s.slug}</p>
            {s.description && <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{s.description.slice(0,120)}{s.description.length>120?'…':''}</p>}
            <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{s._count.profileSubjects} enrolled learners</p>
          </div>
        ))}
      </div>
    </div>
  )
}
