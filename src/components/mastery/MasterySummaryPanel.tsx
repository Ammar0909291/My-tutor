'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/ui/LanguageToggle'

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
  const { t } = useLanguage()
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
    beginner: 'var(--green)',
    intermediate: 'var(--yellow)',
    advanced: 'var(--blue)',
  }
  const levelColor = levelColors[data.estimatedLevel] ?? 'var(--text-dim)'

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
          style={{ background: `color-mix(in srgb, ${levelColor} 13%, transparent)`, color: levelColor }}
        >
          {data.estimatedLevel}
        </span>
      </div>

      {/* Mastery progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span>{t('mastery_avg')}</span>
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
        <span>{t('mastery_confidence')}</span>
        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{data.confidenceScore}/100</span>
        <span>· Pace:</span>
        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{data.learningPace}</span>
      </div>

      {/* Strong concepts */}
      {data.strongConcepts.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium" style={{ color: 'var(--green)' }}>💪 Strong</p>
          <div className="flex flex-wrap gap-1.5">
            {data.strongConcepts.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'color-mix(in srgb, var(--green) 13%, transparent)', color: 'var(--green)' }}
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
          <p className="text-xs font-medium" style={{ color: 'var(--red)' }}>🔍 Needs Work</p>
          <div className="flex flex-wrap gap-1.5">
            {data.weakConcepts.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'color-mix(in srgb, var(--red) 13%, transparent)', color: 'var(--red)' }}
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
