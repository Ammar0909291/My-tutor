'use client'
/**
 * ImprovementTrackingViewer — Educational Intelligence Sprint 4, Task 4.
 *
 * Development-only viewer for the new Improvement Tracking Model /
 * Analyzer (Tasks 2/3), extending the dev-only intelligence tooling
 * started in Sprints 1–3. Fetches the authenticated user's data from
 * GET /api/intelligence/improvement-tracking and displays:
 *   - improving topics/visual areas
 *   - stable topics/visual areas
 *   - declining topics/visual areas
 *
 * Renders nothing outside NODE_ENV === 'development', matching the
 * same dev-only gate as every prior intelligence viewer — there is no
 * production UI for this.
 */
import { useEffect, useState } from 'react'

interface TopicImprovementEntry {
  topic: string
  previousMastery: number
  currentMastery: number
  improvementPct: number
  status: 'improving' | 'stable' | 'declining'
  subjectSlug?: string
  topicSlug?: string
  visualType?: string
  flagged: boolean
}

interface ImprovementSummary {
  improving: TopicImprovementEntry[]
  stable: TopicImprovementEntry[]
  declining: TopicImprovementEntry[]
}

function StatusList({ title, items }: { title: string; items: TopicImprovementEntry[] }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, margin: '0 0 4px', opacity: 0.8 }}>{title}</h3>
      <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
        {items.length === 0 ? '(none)' : JSON.stringify(items, null, 2)}
      </pre>
    </div>
  )
}

export function ImprovementTrackingViewer() {
  const [improvement, setImprovement] = useState<ImprovementSummary | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/improvement-tracking')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setImprovement(data.improvement ?? null)
      })
      .catch(() => setError('Failed to load improvement tracking data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div>
      {error ? (
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)' }}>{error}</pre>
      ) : improvement === null ? (
        <pre style={{ fontSize: 12 }}>Loading…</pre>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          <StatusList title="Improving" items={improvement.improving} />
          <StatusList title="Stable" items={improvement.stable} />
          <StatusList title="Declining" items={improvement.declining} />
        </div>
      )}
    </div>
  )
}
