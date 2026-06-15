'use client'

import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'
import { Card } from '@/components/ui/candy'

interface Props {
  subjectSlug: string
  accent?: string
  lang?: string
}

export default function SubjectModuleTree({ subjectSlug, accent }: Props) {
  const subject = findLibrarySubject(subjectSlug)
  const accentColor = accent ?? 'var(--candy-purple)'

  if (!subject || subject.modules.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
        No curriculum available yet.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {subject.modules.map((mod) => (
        <Card key={mod.slug} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm" style={{ color: accentColor, fontWeight: 800 }}>
              {mod.title}
            </h4>
            <span className="text-xs" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
              ~{mod.estimatedHours}h
            </span>
          </div>
          <ul className="space-y-1">
            {mod.nodes.map((node) => (
              <li key={node.slug} className="text-sm flex items-center gap-2" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentColor, opacity: 0.6 }} />
                {node.title}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}
