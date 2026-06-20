'use client'
/**
 * WeightedTeachingPlanViewer — Educational Intelligence Sprint 9, Task 7.
 *
 * Development-only viewer for the Personalized Teaching Plan Weighting layer.
 * Fetches GET /api/intelligence/weighted-teaching-plan and shows, per topic,
 * the original vs weighted method order, plus the weighting insights. Renders
 * nothing outside NODE_ENV === 'development'. No production UI.
 */
import { useEffect, useState } from 'react'

interface WeightedPlan {
  topic: string
  topicSlug: string
  difficultyLevel: string
  originalMethods: string[]
  recommendedMethods: string[]
  weights: { method: string; effectiveness: string; weight: number }[]
}
interface Insight { method: string; action: string; message: string }

const preStyle: React.CSSProperties = {
  fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)',
  borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto',
}

export function WeightedTeachingPlanViewer() {
  const [weighted, setWeighted] = useState<WeightedPlan[] | null>(null)
  const [insights, setInsights] = useState<Insight[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/weighted-teaching-plan')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setWeighted(data.weightedPlan ?? null)
        setInsights(data.insights ?? null)
      })
      .catch(() => setError('Failed to load weighted teaching plan data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null
  if (error) return <pre style={preStyle}>{error}</pre>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Original → weighted method order</h2>
        {weighted === null ? <pre style={preStyle}>Loading…</pre> : weighted.length === 0 ? (
          <pre style={preStyle}>(no plans to weight yet)</pre>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {weighted.map((p) => (
              <div key={p.topicSlug} style={{ ...preStyle, padding: 10 }}>
                <div style={{ fontWeight: 700 }}>{p.topic} <span style={{ opacity: 0.7 }}>({p.difficultyLevel})</span></div>
                <div style={{ opacity: 0.75 }}>before: {p.originalMethods.join(' → ')}</div>
                <div>after:  {p.recommendedMethods.join(' → ')}</div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Weighting insights (advisory)</h2>
        <pre style={preStyle}>
          {insights === null ? 'Loading…' : insights.length === 0 ? '(no insights — not enough effectiveness evidence yet)' : insights.map((i) => `• ${i.message}`).join('\n')}
        </pre>
      </section>
    </div>
  )
}
