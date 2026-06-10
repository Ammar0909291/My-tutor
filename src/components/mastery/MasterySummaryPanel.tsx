'use client'

import { useEffect, useState } from 'react'

interface Props {
  variant?: string
  [key: string]: unknown
}

interface MasteryData {
  subjectSlug: string
  subjectName: string
  estimatedLevel: string
  averageMastery: number
  strongConcepts: string[]
  weakConcepts: string[]
  confidenceScore: number
  learningPace: string
}

function humanize(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function MasterySummaryPanel(_props: Props) {
  const [data, setData] = useState<MasteryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get primary enrolled subject first
    fetch('/api/profile')
      .then((r) => r.json())
      .then(async (res) => {
        const subjects = res.data?.subjects ?? []
        if (!subjects.length) { setLoading(false); return }
        const slug = subjects[0].subject.slug
        const name = subjects[0].subject.name
        const ins = await fetch(`/api/learner/profile-insights?subject=${slug}`).then((r) => r.json())
        if (!ins.hasSignal && !ins.meta) { setLoading(false); return }
        const meta = ins.meta ?? {}
        setData({
          subjectSlug: slug,
          subjectName: name,
          estimatedLevel: meta.estimatedLevel ?? 'beginner',
          averageMastery: meta.averageMastery ?? 0,
          strongConcepts: meta.strongConcepts ?? [],
          weakConcepts: meta.weakConcepts ?? [],
          confidenceScore: meta.confidenceScore ?? 0,
          learningPace: meta.learningPace ?? 'STEADY',
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return null
  if (!data) return null

  const levelColors: Record<string, string> = {
    beginner: '#56D364',
    intermediate: '#F6B444',
    advanced: '#79C0FF',
  }
  const levelColor = levelColors[data.estimatedLevel] ?? '#71717A'

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Mastery — {data.subjectName}
        </h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
          style={{ background: `${levelColor}22`, color: levelColor }}
        >
          {data.estimatedLevel}
        </span>
      </div>

      {/* Mastery progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span>Avg. Mastery</span>
          <span>{data.averageMastery}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${data.averageMastery}%`, background: levelColor }}
          />
        </div>
      </div>

      {/* Confidence */}
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span>Confidence score:</span>
        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{data.confidenceScore}/100</span>
        <span>· Pace:</span>
        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{data.learningPace}</span>
      </div>

      {/* Strong concepts */}
      {data.strongConcepts.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium" style={{ color: '#56D364' }}>💪 Strong</p>
          <div className="flex flex-wrap gap-1.5">
            {data.strongConcepts.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: '#56D36420', color: '#56D364' }}
              >
                {humanize(c)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Weak concepts */}
      {data.weakConcepts.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium" style={{ color: '#F87171' }}>🔍 Needs Work</p>
          <div className="flex flex-wrap gap-1.5">
            {data.weakConcepts.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: '#F8717120', color: '#F87171' }}
              >
                {humanize(c)}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.strongConcepts.length === 0 && data.weakConcepts.length === 0 && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Complete more lessons to see mastery analysis.
        </p>
      )}
    </div>
  )
}

export { MasterySummaryPanel }
