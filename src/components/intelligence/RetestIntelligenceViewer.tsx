'use client'
/**
 * RetestIntelligenceViewer — Educational Intelligence Sprint 3, Task 4.
 *
 * Development-only viewer for the new Retest Candidate Model / Generator
 * (Tasks 2/3), extending the dev-only intelligence tooling started in
 * Sprint 1/2. Fetches the authenticated user's data from
 * GET /api/intelligence/retest-candidates and displays:
 *   - the existing practice target plan (Sprint 2, unmodified)
 *   - the new priority-banded retest candidate plan (high/medium/low)
 *
 * Renders nothing outside NODE_ENV === 'development', matching the same
 * dev-only gate as every prior intelligence viewer — there is no
 * production UI for this.
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

interface RetestCandidate {
  topic: string
  reason: string
  retestPriority: 'high' | 'medium' | 'low'
  subjectSlug?: string
  topicSlug?: string
  visualType?: string
}

interface RetestCandidatePlan {
  high: RetestCandidate[]
  medium: RetestCandidate[]
  low: RetestCandidate[]
}

function PriorityList<T>({ title, items }: { title: string; items: T[] }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, margin: '0 0 4px', opacity: 0.8 }}>{title}</h3>
      <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
        {items.length === 0 ? '(none)' : JSON.stringify(items, null, 2)}
      </pre>
    </div>
  )
}

export function RetestIntelligenceViewer() {
  const [targets, setTargets] = useState<PracticeTargetPlan | null>(null)
  const [retestCandidates, setRetestCandidates] = useState<RetestCandidatePlan | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/retest-candidates')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setTargets(data.targets ?? null)
        setRetestCandidates(data.retestCandidates ?? null)
      })
      .catch(() => setError('Failed to load retest intelligence data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Practice targets (Sprint 2, unmodified)
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
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Retest candidates (Sprint 3, Task 3 — priority-banded)
        </h2>
        {error ? (
          <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)' }}>{error}</pre>
        ) : retestCandidates === null ? (
          <pre style={{ fontSize: 12 }}>Loading…</pre>
        ) : (
          <>
            <PriorityList title="High retest priority" items={retestCandidates.high} />
            <PriorityList title="Medium retest priority" items={retestCandidates.medium} />
            <PriorityList title="Low retest priority" items={retestCandidates.low} />
          </>
        )}
      </section>
    </div>
  )
}
