'use client'

/**
 * Sprint EG — Learning Growth Panel (student-facing).
 * Displays learning effectiveness scores, strongest/weakest subjects,
 * and top misconception categories. Fetches from
 * GET /api/analytics/learning-effectiveness (auth-gated, own data only).
 */

import { useEffect, useState } from 'react'

interface MasteryGrowth {
  averageMastery: number
  masteredTopics: number
  totalTopics: number
  learningVelocity: number
  recentTrend: 'IMPROVING' | 'STEADY' | 'DECLINING'
}

interface SubjectEff {
  subjectSlug: string
  topics: number
  masteredTopics: number
  avgMastery: number
  avgScore: number
  checkpointPassRate: number
}

interface Misconception {
  category: string
  count: number
  share: number
}

interface Report {
  masteryGrowth: MasteryGrowth
  strongestSubjects: SubjectEff[]
  weakestSubjects: SubjectEff[]
  topMisconceptions: Misconception[]
  learningEffectivenessScore: number
  retentionEffectivenessScore: number
  recommendationEffectivenessScore: number
}

function trendIcon(t: string) {
  if (t === 'IMPROVING') return '↗'
  if (t === 'DECLINING') return '↘'
  return '→'
}
function trendColor(t: string) {
  if (t === 'IMPROVING') return 'var(--green)'
  if (t === 'DECLINING') return 'var(--coral)'
  return 'var(--text-secondary)'
}

function ScoreBadge({ label, score }: { label: string; score: number }) {
  const color = score >= 70 ? 'var(--green)' : score >= 40 ? 'var(--yellow)' : 'var(--coral)'
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="text-2xl font-black" style={{ color }}>{score}<span className="text-xs font-normal">/100</span></div>
      <div className="text-xs text-center" style={{ color: 'var(--text-dim)' }}>{label}</div>
    </div>
  )
}

function SubjectRow({ s, rank }: { s: SubjectEff; rank: 'best' | 'weak' }) {
  const color = rank === 'best' ? 'var(--green)' : 'var(--coral)'
  const label = s.subjectSlug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="flex-1 text-sm" style={{ color: 'var(--text-primary)' }}>{label}</div>
      <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{s.masteredTopics}/{s.topics} mastered</div>
      <div className="text-xs font-bold w-10 text-right" style={{ color }}>{s.avgMastery}%</div>
    </div>
  )
}

export function LearningGrowthPanel() {
  const [data, setData] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    fetch('/api/analytics/learning-effectiveness')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d: Report) => { setData(d); setLoading(false) })
      .catch(() => { setFetchError(true); setLoading(false) })
  }, [])

  if (loading) return <div className="text-xs py-2" style={{ color: 'var(--text-dim)' }}>Loading growth data…</div>
  if (fetchError) return <div className="text-xs py-2" style={{ color: 'var(--coral)' }}>Could not load growth data — try refreshing.</div>
  if (!data || data.masteryGrowth.totalTopics === 0) {
    return <div className="text-xs py-2" style={{ color: 'var(--text-dim)' }}>No learning data yet. Start practising to see your growth!</div>
  }

  const { masteryGrowth: mg, strongestSubjects, weakestSubjects, topMisconceptions } = data

  return (
    <div className="space-y-4">
      {/* Effectiveness scores */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--text-dim)' }}>Effectiveness Scores</p>
        <div className="flex gap-4 rounded-xl p-4" style={{ background: 'var(--bg-base)' }}>
          <ScoreBadge label="Learning" score={data.learningEffectivenessScore} />
          <ScoreBadge label="Retention" score={data.retentionEffectivenessScore} />
          <ScoreBadge label="Recommendations" score={data.recommendationEffectivenessScore} />
        </div>
      </div>

      {/* Mastery overview */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-dim)' }}>Mastery Overview</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg p-3" style={{ background: 'var(--bg-base)' }}>
            <div className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{mg.averageMastery}%</div>
            <div className="text-xs" style={{ color: 'var(--text-dim)' }}>Avg mastery</div>
          </div>
          <div className="rounded-lg p-3" style={{ background: 'var(--bg-base)' }}>
            <div className="text-xl font-black" style={{ color: 'var(--blue)' }}>{mg.masteredTopics}</div>
            <div className="text-xs" style={{ color: 'var(--text-dim)' }}>Topics mastered</div>
          </div>
          <div className="rounded-lg p-3" style={{ background: 'var(--bg-base)' }}>
            <div className="text-xl font-black" style={{ color: trendColor(mg.recentTrend) }}>
              {trendIcon(mg.recentTrend)}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-dim)' }}>30-day trend</div>
          </div>
        </div>
      </div>

      {/* Strongest subjects */}
      {strongestSubjects.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--text-dim)' }}>Strongest Subjects</p>
          <div className="rounded-xl px-3 py-1" style={{ background: 'var(--bg-base)' }}>
            {strongestSubjects.map((s) => <SubjectRow key={s.subjectSlug} s={s} rank="best" />)}
          </div>
        </div>
      )}

      {/* Weakest subjects */}
      {weakestSubjects.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--text-dim)' }}>Needs Attention</p>
          <div className="rounded-xl px-3 py-1" style={{ background: 'var(--bg-base)' }}>
            {weakestSubjects.map((s) => <SubjectRow key={s.subjectSlug} s={s} rank="weak" />)}
          </div>
        </div>
      )}

      {/* Top misconceptions */}
      {topMisconceptions.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-dim)' }}>Common Mistake Patterns</p>
          <div className="space-y-1.5">
            {topMisconceptions.map((m) => (
              <div key={m.category} className="flex items-center gap-2">
                <div className="flex-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {m.category.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-dim)' }}>{m.share}%</div>
                <div className="w-20 h-1.5 rounded-full" style={{ background: 'var(--bg-base)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${m.share}%`, background: 'var(--coral)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
