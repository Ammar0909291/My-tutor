'use client'
/**
 * VisualLearningInsights — Visual Learning Sprint Q, Task 2/3.
 *
 * The first production (non-dev-gated) surface for Sprint M–P's visual
 * intelligence pipeline. Fetches the authenticated user's existing
 * `GET /api/visual-mastery/persist` response (records/profile/weaknesses/
 * recommendations/guidance — all built in prior sprints, none recomputed
 * here) and renders a small, read-only card naming:
 *   - the learner's strongest visual area (highest completion rate)
 *   - their weakest visual area (worst entry from `weaknesses`, already
 *     sorted weakest-first by Sprint N's detectVisualWeaknesses())
 *   - a suggestion (the matching Sprint O recommendation text)
 *
 * Renders nothing while loading, on error, or when no weakness has been
 * detected yet — there is no "everything is fine" message, since an
 * empty render is strictly safer than inventing positive copy from
 * insufficient data. This component never writes anything, never reads
 * or touches scoring/grading state, and is rendered by its callers
 * (PracticeQuiz/AssessmentQuiz/MockTestQuiz) only inside their existing
 * results phase, after scoring has already completed.
 */
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/candy'

const VISUAL_TYPE_LABEL: Record<string, string> = {
  graph: 'Graphs',
  number_line: 'Number Lines',
  geometry: 'Geometry',
  process_flow: 'Process Flows',
}

function labelFor(visualType: string): string {
  return VISUAL_TYPE_LABEL[visualType] ?? visualType
}

interface InsightData {
  strongestArea: string | null
  weakestArea: string
  suggestion: string
}

export function VisualLearningInsights() {
  const [data, setData] = useState<InsightData | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/visual-mastery/persist')
      .then((r) => r.json())
      .then((json) => {
        if (cancelled || json.error) return
        const profile: Record<string, { completionRatePct: number | null }> = json.profile ?? {}
        const weaknesses: { visualType: string; completionRatePct: number }[] = json.weaknesses ?? []
        const recommendations: { visualType: string; recommendation: string }[] = json.recommendations ?? []
        if (weaknesses.length === 0) return

        const weakest = weaknesses[0]
        const strongest = Object.entries(profile)
          .filter(([visualType, entry]) => visualType !== weakest.visualType && entry.completionRatePct !== null)
          .sort((a, b) => (b[1].completionRatePct ?? 0) - (a[1].completionRatePct ?? 0))[0]
        const recommendation = recommendations.find((r) => r.visualType === weakest.visualType)

        setData({
          strongestArea: strongest ? labelFor(strongest[0]) : null,
          weakestArea: labelFor(weakest.visualType),
          suggestion: recommendation?.recommendation ?? `Practice more ${weakest.visualType} activities`,
        })
      })
      .catch(() => { /* never surface a fetch failure here — purely additive content */ })
    return () => { cancelled = true }
  }, [])

  if (!data) return null

  return (
    <Card style={{ padding: 20 }}>
      <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-ink-soft)', margin: '0 0 14px' }}>
        Visual Learning Insight
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.strongestArea && (
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-green)', margin: '0 0 2px' }}>Strongest Area</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--candy-ink)', margin: 0 }}>{data.strongestArea}</p>
          </div>
        )}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-red)', margin: '0 0 2px' }}>Needs Improvement</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--candy-ink)', margin: 0 }}>{data.weakestArea}</p>
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4, color: 'var(--candy-ink-soft)', margin: '0 0 2px' }}>Suggestion</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--candy-ink)', margin: 0 }}>{data.suggestion}.</p>
        </div>
      </div>
    </Card>
  )
}
