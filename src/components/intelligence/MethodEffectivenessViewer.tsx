'use client'
/**
 * MethodEffectivenessViewer — Educational Intelligence Sprint 8, Task 7.
 *
 * Development-only viewer for the Method Effectiveness layer. Fetches
 * GET /api/intelligence/method-effectiveness and displays method rankings,
 * strongest/weakest methods, effectiveness levels, and insights. Renders
 * nothing outside NODE_ENV === 'development'. No production UI.
 */
import { useEffect, useState } from 'react'

interface MethodEffectiveness {
  method: string
  topicsUsed: number
  averageImprovement: number
  effectiveness: 'high' | 'medium' | 'low' | 'regression'
  confident: boolean
}
interface PreferredMethods { strongestMethods: string[]; weakestMethods: string[] }
interface Insight { method: string; assessment: string; message: string }

const preStyle: React.CSSProperties = {
  fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)',
  borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto',
}
const LEVEL_COLOR: Record<string, string> = { high: '#16a34a', medium: '#d4a017', low: '#6b7280', regression: '#dc2626' }

export function MethodEffectivenessViewer() {
  const [methods, setMethods] = useState<MethodEffectiveness[] | null>(null)
  const [rankings, setRankings] = useState<string[] | null>(null)
  const [preferred, setPreferred] = useState<PreferredMethods | null>(null)
  const [insights, setInsights] = useState<Insight[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/method-effectiveness')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setMethods(data.methods ?? null)
        setRankings(data.rankings ?? null)
        setPreferred(data.preferredMethods ?? null)
        setInsights(data.insights ?? null)
      })
      .catch(() => setError('Failed to load method effectiveness data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null
  if (error) return <pre style={preStyle}>{error}</pre>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Method ranking (best → worst)</h2>
        {methods === null ? <pre style={preStyle}>Loading…</pre> : methods.length === 0 ? (
          <pre style={preStyle}>(no measured methods yet)</pre>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(rankings ?? []).map((name, i) => {
              const m = methods.find((x) => x.method === name)!
              return (
                <div key={name} style={{ ...preStyle, padding: 10 }}>
                  <span style={{ fontWeight: 700 }}>{i + 1}. {name}</span>{' '}
                  <span style={{ color: LEVEL_COLOR[m.effectiveness] ?? 'inherit' }}>[{m.effectiveness.toUpperCase()}]</span>
                  <div>avg {m.averageImprovement >= 0 ? '+' : ''}{m.averageImprovement}% · {m.topicsUsed} topic{m.topicsUsed === 1 ? '' : 's'}{m.confident ? '' : ' · low evidence'}</div>
                </div>
              )
            })}
          </div>
        )}
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Preferred methods</h2>
        <pre style={preStyle}>
          {preferred === null ? 'Loading…' : `Strongest: ${preferred.strongestMethods.join(', ') || '(none)'}\nWeakest:   ${preferred.weakestMethods.join(', ') || '(none)'}`}
        </pre>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '12px 0 6px', opacity: 0.8 }}>Insights (advisory)</h2>
        <pre style={preStyle}>
          {insights === null ? 'Loading…' : insights.length === 0 ? '(no insights yet)' : insights.map((i) => `• ${i.message}`).join('\n')}
        </pre>
      </section>
    </div>
  )
}
