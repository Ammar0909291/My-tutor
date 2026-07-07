'use client'
/**
 * PracticeTargetsViewer — Educational Intelligence Sprint 2, Task 4.
 *
 * Development-only viewer for the new Practice Target Model / Generator
 * (Tasks 2/3), extending the dev-only intelligence tooling started in
 * Sprint 1's RevisionIntelligenceViewer. Fetches the authenticated
 * user's data from GET /api/intelligence/practice-targets and displays:
 *   - revision recommendations (Sprint 1, unmodified)
 *   - the priority-banded practice target plan (high/medium/low)
 *
 * Renders nothing outside NODE_ENV === 'development', matching the same
 * dev-only gate as VisualMasteryViewer / RevisionIntelligenceViewer —
 * there is no production UI for this.
 */
import { useEffect, useState } from 'react'

interface PracticeTarget {
  topic: string
  reason: string
  priority: 'high' | 'medium' | 'low'
  subjectSlug?: string
  topicSlug?: string
  visualType?: string
}

interface PracticeTargetPlan {
  high: PracticeTarget[]
  medium: PracticeTarget[]
  low: PracticeTarget[]
}

interface ReviewRecommendation {
  subjectSlug: string
  topicSlug: string
  title: string
  masteryPct: number
  daysSinceLastStudied: number | null
}

interface PracticeRecommendation {
  visualType: string
  label: string
  completionRatePct: number
}

interface RevisionRecommendations {
  review: ReviewRecommendation[]
  practice: PracticeRecommendation[]
}

function PriorityList({ title, items }: { title: string; items: PracticeTarget[] }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, margin: '0 0 4px', opacity: 0.8 }}>{title}</h3>
      <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
        {items.length === 0 ? '(none)' : JSON.stringify(items, null, 2)}
      </pre>
    </div>
  )
}

export function PracticeTargetsViewer() {
  const [recommendations, setRecommendations] = useState<RevisionRecommendations | null>(null)
  const [targets, setTargets] = useState<PracticeTargetPlan | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/practice-targets')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setRecommendations(data.recommendations ?? null)
        setTargets(data.targets ?? null)
      })
      .catch(() => setError('Failed to load practice target data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Revision recommendations (Sprint 1, unmodified)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (recommendations === null ? 'Loading…' : JSON.stringify(recommendations, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Practice target plan (Sprint 2, Task 3 — priority-banded)
        </h2>
        {error ? (
          <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)' }}>{error}</pre>
        ) : targets === null ? (
          <pre style={{ fontSize: 12 }}>Loading…</pre>
        ) : (
          <>
            <PriorityList title="High priority" items={targets.high} />
            <PriorityList title="Medium priority" items={targets.medium} />
            <PriorityList title="Low priority" items={targets.low} />
          </>
        )}
      </section>
    </div>
  )
}
