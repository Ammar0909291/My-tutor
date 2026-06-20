'use client'
/**
 * LearningDifficultyViewer — Educational Intelligence Sprint 4
 * (Learning Difficulty Intelligence), Task 6.
 *
 * Development-only viewer for the new Learning Difficulty layer. Fetches
 * GET /api/intelligence/learning-difficulty and displays:
 *   - the per-topic Learning Difficulty Profile
 *   - the LOW / MEDIUM / HIGH difficulty signals
 *   - the recommended teaching adaptations (advisory only)
 *
 * Renders nothing outside NODE_ENV === 'development', matching the same
 * dev-only gate as the other intelligence viewers. No production UI.
 */
import { useEffect, useState } from 'react'

interface DifficultyEntry {
  topic: string
  subjectSlug: string
  topicSlug: string
  masteryPct: number
  attempts: number
  revisions: number
  retests: number
  visualWeaknesses: string[]
  difficultyLevel: 'low' | 'medium' | 'high'
  signals: string[]
}

interface DifficultyProfile {
  entries: DifficultyEntry[]
  visualWeaknesses: string[]
  counts: { low: number; medium: number; high: number }
}

interface DifficultySummary {
  high: DifficultyEntry[]
  medium: DifficultyEntry[]
  low: DifficultyEntry[]
}

interface AdaptationRecommendation {
  topic: string
  subjectSlug: string
  topicSlug: string
  difficultyLevel: 'low' | 'medium' | 'high'
  adaptations: string[]
  reason: string
}

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

export function LearningDifficultyViewer() {
  const [profile, setProfile] = useState<DifficultyProfile | null>(null)
  const [difficulties, setDifficulties] = useState<DifficultySummary | null>(null)
  const [recommendations, setRecommendations] = useState<AdaptationRecommendation[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/learning-difficulty')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setProfile(data.profile ?? null)
        setDifficulties(data.difficulties ?? null)
        setRecommendations(data.recommendations ?? null)
      })
      .catch(() => setError('Failed to load learning difficulty data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  if (error) {
    return <pre style={preStyle}>{error}</pre>
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <Block title="Learning Difficulty Profile (per topic + counts)" data={profile} />
      <Block title="Difficulty signals (LOW / MEDIUM / HIGH)" data={difficulties} />
      <Block title="Teaching adaptation recommendations (advisory only)" data={recommendations} />
    </div>
  )
}
