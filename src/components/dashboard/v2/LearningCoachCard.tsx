'use client'

import { useEffect, useState } from 'react'
import { Card, ProgressRing, SectionTitle } from '@/components/ui/candy'
import styles from './dashboard.module.css'

interface SubjectProgress {
  slug: string
  name: string
  completionPercent: number
}

interface MasteryMeta {
  estimatedLevel: string
  averageMastery: number
  learningPace: string
  confidenceScore: number
  weakConcepts: string[]
  strongConcepts: string[]
}

interface InsightItem {
  id: string
  icon: string
  message: string
  kind: string
}

interface CoachState {
  subjects: SubjectProgress[]
  mastery: MasteryMeta | null
  focusInsight: InsightItem | null
  hasSignal: boolean
}

const PACE_TEXT: Record<string, string> = {
  FAST:   '⚡ Fast pace',
  STEADY: '🎯 Steady pace',
  SLOW:   '🐢 Step by step',
}

const LEVEL_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  beginner:     { label: 'Getting Started', color: '#fff', bg: 'rgba(255,255,255,0.20)' },
  intermediate: { label: 'Intermediate',    color: '#fff', bg: 'rgba(255,255,255,0.22)' },
  advanced:     { label: 'Advanced',        color: '#fff', bg: 'rgba(255,255,255,0.22)' },
}

function humanize(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function LearningCoachCard() {
  const [state, setState] = useState<CoachState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const profileRes = await fetch('/api/profile').then(r => r.json())
        const profileSubjects: Array<{ subject: { slug: string; name: string } }> = profileRes.data?.subjects ?? []
        if (!profileSubjects.length) {
          setState({ subjects: [], mastery: null, focusInsight: null, hasSignal: false })
          setLoading(false)
          return
        }

        const slugs = profileSubjects.map(ps => ps.subject.slug)
        const names: Record<string, string> = {}
        for (const ps of profileSubjects) names[ps.subject.slug] = ps.subject.name

        // Same queries as CareerSummaryPanel
        const progResults = await Promise.allSettled(
          slugs.map(slug => fetch(`/api/curriculum/progress?subject=${slug}`).then(r => r.json()))
        )
        const subjects: SubjectProgress[] = slugs.map((slug, i) => {
          const prog = progResults[i].status === 'fulfilled' ? (progResults[i] as PromiseFulfilledResult<any>).value?.progress : null
          return { slug, name: names[slug] ?? slug, completionPercent: prog?.completionPercent ?? 0 }
        })

        // Same query as MasterySummaryPanel
        const primarySlug = slugs[0]
        const insRes = await fetch(`/api/learner/profile-insights?subject=${primarySlug}`).then(r => r.json())
        const meta: MasteryMeta | null = insRes.meta ?? null
        const focusInsight: InsightItem | null = (insRes.insights ?? []).find((ins: InsightItem) => ins.kind === 'focus') ?? null

        setState({ subjects, mastery: meta, focusInsight, hasSignal: insRes.hasSignal ?? false })
      } catch {
        setState({ subjects: [], mastery: null, focusInsight: null, hasSignal: false })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className={styles['coach-section']}>
        <SectionTitle>🧠 Learning Intelligence</SectionTitle>
        <div className={styles['coach-skeleton']}>
          <div className={styles['coach-skeleton-shimmer']} />
        </div>
      </div>
    )
  }

  if (!state || state.subjects.length === 0) {
    return (
      <div className={styles['coach-section']}>
        <SectionTitle>🧠 Learning Intelligence</SectionTitle>
        <Card className={styles['coach-empty-card']}>
          <div className={styles['coach-empty-icon']}>🧠</div>
          <div className={styles['coach-empty-title']}>Your AI Learning Coach is ready</div>
          <p className={styles['coach-empty-sub']}>Add your first subject and start learning — personalized insights will appear here as you progress.</p>
        </Card>
      </div>
    )
  }

  const { subjects, mastery, focusInsight, hasSignal } = state

  const sorted = [...subjects].sort((a, b) => b.completionPercent - a.completionPercent)
  const strongest = sorted[0]
  const weakest = sorted.length > 1 ? sorted[sorted.length - 1] : null

  const level = mastery?.estimatedLevel ?? 'beginner'
  const badge = LEVEL_BADGE[level] ?? LEVEL_BADGE.beginner
  const masteryPct = mastery?.averageMastery ?? 0
  const pace = mastery?.learningPace ?? 'STEADY'
  const weakConcepts = mastery?.weakConcepts ?? []

  const focusTile = weakest ?? { name: 'Keep going', completionPercent: masteryPct }

  return (
    <div className={styles['coach-section']}>
      <SectionTitle>🧠 Learning Intelligence</SectionTitle>
      <Card className={styles['coach-card']}>

        {/* Gradient header */}
        <div className={styles['coach-header']}>
          <div>
            <div className={styles['coach-header-title']}>Your AI Learning Coach</div>
            <div className={styles['coach-header-sub']}>Personalized insights based on your progress</div>
          </div>
          <span className={styles['coach-level-badge']} style={{ color: badge.color, background: badge.bg }}>
            {badge.label}
          </span>
        </div>

        {/* 3-tile row */}
        <div className={styles['coach-tiles']}>
          {/* Strongest */}
          <div className={`${styles['coach-tile']} ${styles['coach-tile-green']}`}>
            <span className={styles['coach-tile-icon']}>💪</span>
            <span className={styles['coach-tile-label']}>Strongest</span>
            <span className={styles['coach-tile-name']}>{strongest.name}</span>
            <span className={styles['coach-tile-pct']} style={{ color: 'var(--green)' }}>
              {strongest.completionPercent > 0 ? `${strongest.completionPercent}%` : 'Build it up!'}
            </span>
          </div>

          {/* Mastery ring */}
          <div className={styles['coach-tile-center']}>
            <ProgressRing
              percent={masteryPct}
              size={80}
              radius={34}
              strokeWidth={8}
              gradientFrom="var(--purple)"
              gradientTo="var(--blue)"
              trackColor="var(--shadow)"
              label={
                <div className={styles['coach-ring-inner']}>
                  <span className={styles['coach-ring-pct']}>{masteryPct}%</span>
                  <span className={styles['coach-ring-word']}>mastery</span>
                </div>
              }
            />
            <span className={styles['coach-tile-label']} style={{ marginTop: 6 }}>Mastery Trend</span>
            <span className={styles['coach-pace']}>{PACE_TEXT[pace] ?? PACE_TEXT.STEADY}</span>
          </div>

          {/* Focus Here */}
          <div className={`${styles['coach-tile']} ${styles['coach-tile-amber']}`}>
            <span className={styles['coach-tile-icon']}>🎯</span>
            <span className={styles['coach-tile-label']}>Focus Here</span>
            <span className={styles['coach-tile-name']}>{focusTile.name}</span>
            <span className={styles['coach-tile-pct']} style={{ color: 'var(--yellow-d)' }}>
              {focusTile.completionPercent > 0 ? `${focusTile.completionPercent}%` : 'Start here!'}
            </span>
          </div>
        </div>

        {/* Recommended focus chips */}
        {weakConcepts.length > 0 && (
          <div className={styles['coach-focus-row']}>
            <span className={styles['coach-focus-heading']}>🎯 Recommended Focus</span>
            <div className={styles['coach-focus-chips']}>
              {weakConcepts.slice(0, 4).map(c => (
                <span key={c} className={styles['coach-focus-chip']}>{humanize(c)}</span>
              ))}
            </div>
          </div>
        )}

        {/* Focus insight */}
        {focusInsight && (
          <div className={styles['coach-insight-row']}>
            <span className={styles['coach-insight-icon']}>{focusInsight.icon}</span>
            <span className={styles['coach-insight-text']}>{focusInsight.message}</span>
          </div>
        )}

        {/* Warming up */}
        {!hasSignal && !focusInsight && weakConcepts.length === 0 && (
          <div className={styles['coach-warming-row']}>
            <span>📈</span>
            <span>Complete more lessons and your coach will build a personalized picture of your strengths and focus areas.</span>
          </div>
        )}

      </Card>
    </div>
  )
}
