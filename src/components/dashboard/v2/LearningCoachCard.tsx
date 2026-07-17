'use client'

import { useEffect, useState } from 'react'
import { Card, ProgressRing, SectionTitle } from '@/components/ui/candy'
import { useLanguage } from '@/components/ui/LanguageToggle'
import type { TranslationKey } from '@/lib/i18n'
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

const PACE_KEY: Record<string, TranslationKey> = {
  FAST: 'dashx_pace_fast',
  STEADY: 'dashx_pace_steady',
  SLOW: 'dashx_pace_slow',
}

// Reuses the Coach Planner's existing skill-level translations
// (src/lib/i18n.ts coach_level_*) — same concept (a skill-level label),
// no new duplicate vocabulary.
const LEVEL_BADGE: Record<string, { labelKey: TranslationKey; color: string; bg: string }> = {
  beginner:     { labelKey: 'coach_level_beginner2',    color: '#fff', bg: 'rgba(255,255,255,0.20)' },
  intermediate: { labelKey: 'coach_level_intermediate', color: '#fff', bg: 'rgba(255,255,255,0.22)' },
  advanced:     { labelKey: 'coach_level_advanced',     color: '#fff', bg: 'rgba(255,255,255,0.22)' },
}

function humanize(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function LearningCoachCard() {
  const { t } = useLanguage()
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
        <SectionTitle>{t('dashx_learning_intelligence')}</SectionTitle>
        <div className={styles['coach-skeleton']}>
          <div className={styles['coach-skeleton-shimmer']} />
        </div>
      </div>
    )
  }

  if (!state || state.subjects.length === 0) {
    return (
      <div className={styles['coach-section']}>
        <SectionTitle>{t('dashx_learning_intelligence')}</SectionTitle>
        <Card className={styles['coach-empty-card']}>
          <div className={styles['coach-empty-icon']}>🧠</div>
          <div className={styles['coach-empty-title']}>{t('dashx_coach_empty_title')}</div>
          <p className={styles['coach-empty-sub']}>{t('dashx_coach_empty_sub')}</p>
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

  const focusTile = weakest ?? { name: t('dashx_keep_going'), completionPercent: masteryPct }

  return (
    <div className={styles['coach-section']}>
      <SectionTitle>{t('dashx_learning_intelligence')}</SectionTitle>
      <Card className={styles['coach-card']}>

        {/* Gradient header */}
        <div className={styles['coach-header']}>
          <div>
            <div className={styles['coach-header-title']}>{t('dashx_coach_header_title')}</div>
            <div className={styles['coach-header-sub']}>{t('dashx_coach_header_sub')}</div>
          </div>
          <span className={styles['coach-level-badge']} style={{ color: badge.color, background: badge.bg }}>
            {t(badge.labelKey)}
          </span>
        </div>

        {/* 3-tile row */}
        <div className={styles['coach-tiles']}>
          {/* Strongest */}
          <div className={`${styles['coach-tile']} ${styles['coach-tile-green']}`}>
            <span className={styles['coach-tile-icon']}>💪</span>
            <span className={styles['coach-tile-label']}>{t('dashx_strongest')}</span>
            <span className={styles['coach-tile-name']}>{strongest.name}</span>
            <span className={styles['coach-tile-pct']} style={{ color: 'var(--green)' }}>
              {strongest.completionPercent > 0 ? `${strongest.completionPercent}%` : t('dashx_build_it_up')}
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
                  <span className={styles['coach-ring-word']}>{t('coach_preview_ring_word')}</span>
                </div>
              }
            />
            <span className={styles['coach-tile-label']} style={{ marginTop: 6 }}>{t('dashx_mastery_trend')}</span>
            <span className={styles['coach-pace']}>{t(PACE_KEY[pace] ?? PACE_KEY.STEADY)}</span>
          </div>

          {/* Focus Here */}
          <div className={`${styles['coach-tile']} ${styles['coach-tile-amber']}`}>
            <span className={styles['coach-tile-icon']}>🎯</span>
            <span className={styles['coach-tile-label']}>{t('dashx_focus_here')}</span>
            <span className={styles['coach-tile-name']}>{focusTile.name}</span>
            <span className={styles['coach-tile-pct']} style={{ color: 'var(--yellow-d)' }}>
              {focusTile.completionPercent > 0 ? `${focusTile.completionPercent}%` : t('dashx_start_here')}
            </span>
          </div>
        </div>

        {/* Recommended focus chips */}
        {weakConcepts.length > 0 && (
          <div className={styles['coach-focus-row']}>
            <span className={styles['coach-focus-heading']}>{t('dashx_recommended_focus')}</span>
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
            <span>{t('dashx_coach_warming')}</span>
          </div>
        )}

      </Card>
    </div>
  )
}
