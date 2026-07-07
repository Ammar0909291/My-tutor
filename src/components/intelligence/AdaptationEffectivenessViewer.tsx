'use client'
/**
 * AdaptationEffectivenessViewer — Educational Intelligence Sprint 7, Task 7.
 *
 * Development-only viewer for the Adaptation Effectiveness layer. Fetches
 * GET /api/intelligence/adaptation-effectiveness and displays per-topic
 * effectiveness (level, improvement %, methods) and per-method insights.
 * Renders nothing outside NODE_ENV === 'development'. No production UI.
 */
import { useEffect, useState } from 'react'

interface Effectiveness {
  subjectSlug: string
  topicSlug: string
  topic: string
  difficultyLevel: 'low' | 'medium' | 'high'
  teachingMethods: string[]
  masteryBefore: number
  masteryAfter: number
  improvement: number
  effectiveness: 'high' | 'medium' | 'low' | 'regression'
}

interface Insight {
  method: string
  sampleSize: number
  averageImprovement: number
  assessment: 'effective' | 'moderate' | 'limited' | 'negative' | 'uncertain'
  message: string
}

const preStyle: React.CSSProperties = {
  fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)',
  borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto',
}

const LEVEL_COLOR: Record<string, string> = {
  high: '#16a34a', medium: '#d4a017', low: '#6b7280', regression: '#dc2626',
}

export function AdaptationEffectivenessViewer() {
  const [effectiveness, setEffectiveness] = useState<Effectiveness[] | null>(null)
  const [insights, setInsights] = useState<Insight[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/adaptation-effectiveness')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setEffectiveness(data.effectiveness ?? null)
        setInsights(data.insights ?? null)
      })
      .catch(() => setError('Failed to load adaptation effectiveness data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null
  if (error) return <pre style={preStyle}>{error}</pre>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Per-topic effectiveness</h2>
        {effectiveness === null ? <pre style={preStyle}>Loading…</pre> : effectiveness.length === 0 ? (
          <pre style={preStyle}>(no adapted topics with before/after data yet)</pre>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {effectiveness.map((e) => (
              <div key={`${e.subjectSlug}:${e.topicSlug}`} style={{ ...preStyle, padding: 10 }}>
                <div style={{ fontWeight: 700 }}>
                  {e.topic}{' '}
                  <span style={{ color: LEVEL_COLOR[e.effectiveness] ?? 'inherit' }}>
                    [{e.effectiveness.toUpperCase()}]
                  </span>
                </div>
                <div>mastery {e.masteryBefore}% → {e.masteryAfter}% ({e.improvement >= 0 ? '+' : ''}{e.improvement}%) · difficulty {e.difficultyLevel}</div>
                <div style={{ opacity: 0.75 }}>methods: {e.teachingMethods.join(', ')}</div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Per-method insights (advisory)</h2>
        <pre style={preStyle}>
          {insights === null ? 'Loading…' : insights.length === 0 ? '(no insights yet)' : insights.map((i) => `• ${i.message}`).join('\n')}
        </pre>
      </section>
    </div>
  )
}
