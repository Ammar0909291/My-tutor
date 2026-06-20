'use client'
/**
 * RevisionIntelligenceViewer — Educational Intelligence Sprint 1, Task 4.
 *
 * Development-only viewer for the new Revision Profile / Recommendation
 * Engine (Tasks 2/3). Fetches the authenticated user's data from
 * GET /api/intelligence/revision-profile and displays:
 *   - topic strengths and weaknesses (mastery-percentage based)
 *   - visual weaknesses (Sprint N, unmodified)
 *   - "Review" topic recommendations
 *   - "Practice" activity recommendations
 *
 * Renders nothing outside NODE_ENV === 'development', matching the same
 * dev-only gate as VisualMasteryViewer — there is no production UI for
 * this. The route itself is a normal authenticated API route; this
 * component is the only thing gating visibility.
 */
import { useEffect, useState } from 'react'

interface TopicMasterySignal {
  subjectSlug: string
  topicSlug: string
  title: string
  masteryPct: number
  status: string
  lastScore: number | null
}

interface VisualWeaknessEntry {
  visualType: string
  shown: number
  completed: number
  completionRatePct: number
  recommendation: string
}

interface RecommendedRevisionTopic {
  subjectSlug: string
  topicSlug: string
  title: string
  masteryPct: number
}

interface RevisionProfile {
  strengths: TopicMasterySignal[]
  weaknesses: TopicMasterySignal[]
  visualWeaknesses: VisualWeaknessEntry[]
  recommendedRevisionTopics: RecommendedRevisionTopic[]
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

export function RevisionIntelligenceViewer() {
  const [profile, setProfile] = useState<RevisionProfile | null>(null)
  const [recommendations, setRecommendations] = useState<RevisionRecommendations | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    fetch('/api/intelligence/revision-profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return }
        setProfile(data.profile ?? null)
        setRecommendations(data.recommendations ?? null)
      })
      .catch(() => setError('Failed to load revision intelligence data.'))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Strengths (TopicProgress, masteryPct ≥ 75 or MASTERED)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (profile === null ? 'Loading…' : profile.strengths.length === 0 ? '(no strengths detected yet)' : JSON.stringify(profile.strengths, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Weaknesses (TopicProgress, masteryPct {'<'} 50)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (profile === null ? 'Loading…' : profile.weaknesses.length === 0 ? '(no weaknesses detected yet)' : JSON.stringify(profile.weaknesses, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Visual weaknesses (Sprint N, unmodified — completion rate below 50%)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (profile === null ? 'Loading…' : profile.visualWeaknesses.length === 0 ? '(no visual weaknesses detected)' : JSON.stringify(profile.visualWeaknesses, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Review recommendations (Task 3 — topics, recommendation only)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (recommendations === null ? 'Loading…' : recommendations.review.length === 0 ? '(no review recommendations — no weak topics detected)' : JSON.stringify(recommendations.review, null, 2))}
        </pre>
      </section>
      <section>
        <h2 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px', opacity: 0.8 }}>
          Practice recommendations (Task 3 — visual activities, recommendation only)
        </h2>
        <pre style={{ fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, margin: 0, background: 'var(--bg-surface)', overflowX: 'auto' }}>
          {error ?? (recommendations === null ? 'Loading…' : recommendations.practice.length === 0 ? '(no practice recommendations — no visual weaknesses detected)' : JSON.stringify(recommendations.practice, null, 2))}
        </pre>
      </section>
    </div>
  )
}
