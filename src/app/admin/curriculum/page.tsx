import { CandyPage } from '@/components/ui/candy'

export default function AdminCurriculumPage() {
  const boards = [
    { name: 'CBSE', subjects: ['Mathematics','Science','English','Hindi','Sanskrit','Social Science'], grades: '6–12' },
    { name: 'UP Board', subjects: ['Mathematics','Science','English','Hindi','Sanskrit','Social Science'], grades: '6–12' },
  ]
  return (
    <CandyPage legacy className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Curriculum Explorer</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>Read-only board / subject / chapter structure</p>
      </div>
      <div className="space-y-4">
        {boards.map(b => (
          <div key={b.name} className="rounded-xl border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-base" style={{ color: 'var(--text-primary)' }}>{b.name}</h2>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--green)22', color: 'var(--green)' }}>Grades {b.grades}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {b.subjects.map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-lg border" style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border p-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
        <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
          Full chapter and lesson structure defined in <code className="font-mono">src/lib/education/*Catalog.ts</code> files (26 TypeScript catalog modules covering both boards). Interactive curriculum editor planned for a future sprint.
        </p>
      </div>
    </CandyPage>
  )
}
