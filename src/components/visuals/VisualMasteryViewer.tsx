'use client'
/**
 * VisualMasteryViewer — Visual Learning Sprint M Task 5, extended Sprint N Task 6.
 *
 * Development-only viewer for persisted Visual Mastery evidence. Fetches the
 * authenticated user's EvidenceRecord(type: VISUAL) rows from
 * /api/visual-mastery/persist (GET) and displays:
 *   - the raw saved rows (one per visual engine per persisted session)
 *   - a persisted summary aggregated across all saved rows (client-side, Sprint M)
 *   - the server-computed VisualLearningProfile and weak visual areas (Sprint N)
 *
 * Renders nothing outside NODE_ENV === 'development', matching the same
 * dev-only gate as VisualMasteryDevSummary (Sprint L) — there is no
 * production UI for this. The route itself is a normal authenticated API
 * route; this component is the only thing gating visibility.
 */
import { useEffect, useState } from 'react'

interface VisualMasteryEvidenceNotes {
  visualType: string
  shown: number
  interacted: number
  completed: number
  source?: string
  sessionId?: string
  persistedAt: string
}

interface VisualMasteryEvidenceRow {
  id: string
  subjectSlug: string
  topicSlug: string
  score: number
  weight: number
  createdAt: string
  notes: VisualMasteryEvidenceNotes
}

interface VisualLearningProfileEntry {
  shown: number
  interacted: number
  completed: number
  completionRatePct: number | null
}

interface VisualWeaknessEntry {
  visualType: string
  shown: number
  completed: number
  completionRatePct: number
  recommendation: string
}

export function VisualMasteryViewer() {
  const [rows, setRows] = useState<VisualMasteryEvidenceRow[] | null>(null)
  const [profile, setProfile] = useState<Record<string, VisualLearningProfileEntry> | null>(null)
  const [weaknesses, setWeaknesses] = useState<VisualWeaknessEntry[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/visual-mastery/persist')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setRows(data.records ?? [])
        setProfile(data.profile ?? {})
        setWeaknesses(data.weaknesses ?? [])
      })
      .catch(() => setError('Failed to load persisted visual mastery data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  const persistedSummary = (rows ?? []).reduce<Record<string, { shown: number; interacted: number; completed: number }>>((acc, row) => {
    const key = row.notes?.visualType ?? 'unknown'
    const bucket = acc[key] ?? { shown: 0, interacted: 0, completed: 0 }
    bucket.shown += row.notes?.shown ?? 0
    bucket.interacted += row.notes?.interacted ?? 0
    bucket.completed += row.notes?.completed ?? 0
    acc[key] = bucket
    return acc
  }, {})

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Visual Learning Profile (Sprint N — server-computed, per visual type)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (profile === null ? 'Loading…' : JSON.stringify(profile, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Weak visual areas (Sprint N — completion rate below {'<50%'}, recommendation only)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (weaknesses === null ? 'Loading…' : weaknesses.length === 0 ? '(no weak visual areas detected)' : JSON.stringify(weaknesses, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Persisted summary (client-aggregated across all saved EvidenceRecord rows, Sprint M)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (rows === null ? 'Loading…' : JSON.stringify(persistedSummary, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Saved mastery signals (most recent first, max 50)
        </h2>
        <pre style={{ fontSize: 11, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', maxHeight: 260, overflow: 'auto' }}>
          {error ?? (rows === null ? 'Loading…' : rows.length === 0 ? '(no rows saved yet — complete a quiz with a visual challenge)' : JSON.stringify(rows, null, 2))}
        </pre>
      </section>
    </div>
  )
}
