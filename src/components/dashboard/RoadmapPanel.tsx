'use client'

import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'
import { findRoadmap } from '@/lib/roadmaps/catalog'

interface Props {
  subjectSlug?: string
  primarySubjectSlug?: string
  lang?: string
  [key: string]: unknown
}

export function RoadmapPanel({ subjectSlug, primarySubjectSlug }: Props) {
  const slug = subjectSlug ?? primarySubjectSlug
  if (!slug) return null

  const subject = findLibrarySubject(slug)
  const roadmap = findRoadmap(slug)

  if (!subject) return null

  const modules = subject.modules.slice(0, 5)

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: 'var(--bg-base)', border: '1px solid var(--border-default)' }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          {roadmap ? roadmap.title : `${subject.name} Roadmap`}
        </h3>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-primary)22', color: 'var(--accent-primary)' }}>
          {modules.length} units
        </span>
      </div>

      {roadmap?.description && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{roadmap.description}</p>
      )}

      <ol className="space-y-2">
        {modules.map((mod, i) => (
          <li key={mod.slug} className="flex items-start gap-3">
            <span
              className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: 'var(--accent-primary)22', color: 'var(--accent-primary)' }}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                {mod.title}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {mod.nodes.length} topics · ~{mod.estimatedHours}h
              </p>
            </div>
          </li>
        ))}
      </ol>

      {subject.modules.length > 5 && (
        <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
          +{subject.modules.length - 5} more units
        </p>
      )}
    </div>
  )
}
