'use client'

import { useEffect, useState } from 'react'
import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'

interface Props {
  variant?: string
  [key: string]: unknown
}

interface SubjectEntry {
  slug: string
  name: string
  completionPercent: number
  isCompleted: boolean
}

interface CareerData {
  subjects: SubjectEntry[]
  readinessScore: number
}

const CAREER_ROLES: Record<string, { role: string; requires: string[] }> = {
  python:     { role: 'Python Developer',          requires: ['python'] },
  javascript: { role: 'Frontend Developer',        requires: ['javascript'] },
  typescript: { role: 'Full-Stack Developer',      requires: ['typescript', 'javascript'] },
  java:       { role: 'Backend Developer',         requires: ['java'] },
  cpp:        { role: 'Systems Engineer',          requires: ['cpp', 'c'] },
  c:          { role: 'Embedded Developer',        requires: ['c'] },
  english:    { role: 'English Communication',     requires: ['english'] },
  russian:    { role: 'Russian Language Proficiency', requires: ['russian'] },
  mathematics:{ role: 'Quantitative Analyst',      requires: ['mathematics'] },
  physics:    { role: 'Physics Researcher',        requires: ['physics'] },
}

export default function CareerSummaryPanel(_props: Props) {
  const [data, setData] = useState<CareerData | null>(null)

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then(async (res) => {
        const profileSubjects = res.data?.subjects ?? []
        if (!profileSubjects.length) return

        const slugs: string[] = profileSubjects.map((ps: any) => ps.subject.slug)

        // Fetch progress for all enrolled subjects
        const progressResults = await Promise.allSettled(
          slugs.map((slug: string) =>
            fetch(`/api/curriculum/progress?subject=${slug}`).then((r) => r.json())
          )
        )

        const subjects: SubjectEntry[] = profileSubjects.map((ps: any, i: number) => {
          const prog = progressResults[i].status === 'fulfilled' ? progressResults[i].value?.progress : null
          return {
            slug: ps.subject.slug,
            name: ps.subject.name,
            completionPercent: prog?.completionPercent ?? 0,
            isCompleted: prog?.isCompleted ?? false,
          }
        })

        const totalPct = subjects.reduce((s, sub) => s + sub.completionPercent, 0)
        const readinessScore = subjects.length > 0 ? Math.round(totalPct / subjects.length) : 0

        setData({ subjects, readinessScore })
      })
      .catch(() => {})
  }, [])

  if (!data || data.subjects.length === 0) return null

  const { subjects, readinessScore } = data

  // Derive potential roles based on enrolled subjects
  const roles = subjects
    .flatMap((sub) => {
      const career = CAREER_ROLES[sub.slug]
      if (!career) return []
      const met = career.requires.every((req) => subjects.some((s) => s.slug === req))
      return [{ role: career.role, progress: sub.completionPercent, met }]
    })
    .filter((v, i, arr) => arr.findIndex((x) => x.role === v.role) === i)
    .slice(0, 3)

  const readinessColor = readinessScore >= 70 ? '#56D364' : readinessScore >= 40 ? '#F6B444' : '#F87171'

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Career Readiness
        </h3>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${readinessColor}22`, color: readinessColor }}
        >
          {readinessScore}%
        </span>
      </div>

      {/* Overall readiness bar */}
      <div className="space-y-1">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${readinessScore}%`, background: readinessColor }}
          />
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Average completion across {subjects.length} enrolled subject{subjects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Per-subject */}
      <div className="space-y-2">
        {subjects.map((sub) => {
          const libSub = findLibrarySubject(sub.slug)
          const icon = libSub?.icon ?? '📘'
          const pctColor = sub.completionPercent >= 70 ? '#56D364' : sub.completionPercent >= 40 ? '#F6B444' : '#79C0FF'
          return (
            <div key={sub.slug} className="flex items-center gap-3">
              <span className="text-base w-6 text-center">{icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-xs mb-0.5">
                  <span style={{ color: 'var(--text-primary)' }}>{sub.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{sub.completionPercent}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${sub.completionPercent}%`, background: pctColor }}
                  />
                </div>
              </div>
              {sub.isCompleted && <span className="text-xs">✅</span>}
            </div>
          )
        })}
      </div>

      {/* Potential roles */}
      {roles.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Potential Roles</p>
          <div className="flex flex-wrap gap-1.5">
            {roles.map(({ role, progress }) => (
              <span
                key={role}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: progress >= 70 ? '#56D36420' : 'var(--bg-base)',
                  color: progress >= 70 ? '#56D364' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { CareerSummaryPanel }
