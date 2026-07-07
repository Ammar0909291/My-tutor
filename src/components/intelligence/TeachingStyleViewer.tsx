'use client'
/**
 * TeachingStyleViewer — Educational Intelligence Sprint 11, Task 5.
 *
 * Development-only viewer for the Teaching Style Transparency layer. Fetches
 * GET /api/intelligence/active-teaching-style and shows the difficulty level,
 * active (weighted-ordered) methods, the plain-English explanation, and the
 * priorities. Renders nothing outside NODE_ENV === 'development'. No production UI.
 */
import { useEffect, useState } from 'react'

interface ActiveTeachingStyle {
  topic: string
  subjectSlug: string
  topicSlug: string
  difficultyLevel: 'low' | 'medium' | 'high'
  activeMethods: string[]
  practiceIntensity: string
  revisionPriority: string
  retestPriority: string
}

const preStyle: React.CSSProperties = {
  fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)',
  borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto',
}
const LEVEL_COLOR: Record<string, string> = { high: '#dc2626', medium: '#d4a017', low: '#16a34a' }

export function TeachingStyleViewer() {
  const [style, setStyle] = useState<ActiveTeachingStyle | null | undefined>(undefined)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/active-teaching-style')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setStyle(data.teachingStyle ?? null)
        setExplanation(data.explanation ?? null)
      })
      .catch(() => setError('Failed to load active teaching style.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null
  if (error) return <pre style={preStyle}>{error}</pre>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Active teaching style</h2>
        {style === undefined ? <pre style={preStyle}>Loading…</pre> : style === null ? (
          <pre style={preStyle}>(no specific style — standard instruction)</pre>
        ) : (
          <div style={{ ...preStyle, padding: 12 }}>
            <div style={{ fontWeight: 700 }}>
              {style.topic}{' '}
              <span style={{ color: LEVEL_COLOR[style.difficultyLevel] ?? 'inherit' }}>[{style.difficultyLevel.toUpperCase()}]</span>
            </div>
            <div style={{ marginTop: 6 }}>active methods (weighted order):</div>
            <ol style={{ margin: '4px 0 0 18px', padding: 0 }}>
              {style.activeMethods.map((m, i) => <li key={m + i}>{m}</li>)}
            </ol>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              practice: {style.practiceIntensity} · revision: {style.revisionPriority} · retest: {style.retestPriority}
            </div>
          </div>
        )}
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>Why your tutor teaches this way</h2>
        <pre style={{ ...preStyle, whiteSpace: 'pre-wrap' }}>{explanation === null ? 'Loading…' : explanation}</pre>
      </section>
    </div>
  )
}
