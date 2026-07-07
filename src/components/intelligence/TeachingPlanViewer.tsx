'use client'
/**
 * TeachingPlanViewer — Educational Intelligence Sprint 5, Task 5.
 *
 * Development-only viewer for the new Adaptive Teaching Plan layer. Fetches
 * GET /api/intelligence/teaching-plan and displays the Sprint 4 difficulty
 * profile, the Sprint 4 adaptation recommendations, and the generated
 * Sprint 5 teaching plan. Renders nothing outside NODE_ENV === 'development',
 * matching the other intelligence viewers. No production UI; nothing consumes
 * the plan.
 */
import { useEffect, useState } from 'react'

const preStyle: React.CSSProperties = {
  fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)',
  borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto',
}

function Block({ title, data }: { title: string; data: unknown }) {
  return (
    <section>
      <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>{title}</h2>
      <pre style={preStyle}>{data === null ? 'Loading…' : JSON.stringify(data, null, 2)}</pre>
    </section>
  )
}

export function TeachingPlanViewer() {
  const [profile, setProfile] = useState<unknown>(null)
  const [recommendations, setRecommendations] = useState<unknown>(null)
  const [teachingPlan, setTeachingPlan] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/teaching-plan')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setProfile(data.profile ?? null)
        setRecommendations(data.recommendations ?? null)
        setTeachingPlan(data.teachingPlan ?? null)
      })
      .catch(() => setError('Failed to load teaching plan data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null
  if (error) return <pre style={preStyle}>{error}</pre>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <Block title="Difficulty profile (Sprint 4, reused)" data={profile} />
      <Block title="Adaptation recommendations (Sprint 4, reused)" data={recommendations} />
      <Block title="Generated teaching plan (Sprint 5)" data={teachingPlan} />
    </div>
  )
}
