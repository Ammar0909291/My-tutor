'use client'

import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'

interface Props {
  subjectSlug: string
  accent?: string
  lang?: string
}

export default function SubjectModuleTree({ subjectSlug, accent }: Props) {
  const subject = findLibrarySubject(subjectSlug)

  if (!subject || subject.modules.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        No curriculum available yet.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {subject.modules.map((mod) => (
        <div key={mod.slug} className="rounded-xl border p-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm" style={{ color: accent ?? 'var(--accent-primary)' }}>
              {mod.title}
            </h4>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              ~{mod.estimatedHours}h
            </span>
          </div>
          <ul className="space-y-1">
            {mod.nodes.map((node) => (
              <li key={node.slug} className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent ?? 'var(--accent-primary)', opacity: 0.5 }} />
                {node.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
