export default function AdminKGPage() {
  const domains = [
    { name: 'Mathematics', nodes: '200+', file: 'mathKnowledgeGraph.ts', color: 'var(--blue)' },
    { name: 'Science', nodes: '180+', file: 'scienceKnowledgeGraph.ts', color: 'var(--green)' },
    { name: 'English', nodes: '120+', file: 'englishKnowledgeGraph.ts', color: 'var(--yellow)' },
    { name: 'Hindi', nodes: '150+', file: 'hindiKnowledgeGraph.ts', color: 'var(--coral)' },
    { name: 'Sanskrit', nodes: '80+', file: 'sanskritKnowledgeGraph.ts', color: 'var(--purple)' },
    { name: 'Social Science', nodes: '160+', file: 'socialScienceKnowledgeGraph.ts', color: 'var(--blue)' },
  ]
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Knowledge Graphs</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>Read-only explorer — KG nodes, misconceptions, mastery weights</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {domains.map(d => (
          <div key={d.name} className="rounded-xl border p-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{d.name}</span>
              <span className="text-xs font-bold" style={{ color: d.color }}>{d.nodes} nodes</span>
            </div>
            <p className="text-[11px] font-mono" style={{ color: 'var(--text-dim)' }}>src/lib/education/{d.file}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border p-5" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
        <h2 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-dim)' }}>Node structure</h2>
        <pre className="text-xs leading-relaxed overflow-auto" style={{ color: 'var(--text-secondary)' }}>{`{
  id: string           // e.g. "math.algebra.linear-equations"
  title: string
  domain: string
  difficulty: 1–5
  prerequisites: string[]
  misconceptions: string[]
  masteryWeight: number
}`}</pre>
        <p className="text-xs mt-3" style={{ color: 'var(--text-dim)' }}>Interactive KG editor planned for a future sprint.</p>
      </div>
    </div>
  )
}
