'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, SectionTitle } from '@/components/ui/candy'
import { useLanguage } from '@/components/ui/LanguageToggle'
import styles from './dashboard.module.css'

interface ReviewItem {
  conceptId: string
  subject: string
  overdue: boolean
  daysOverdue: number
  maintenanceStatus: string
}

interface ReviewQueueState {
  overdue: ReviewItem[]
  dueToday: ReviewItem[]
  totalDue: number
}

function humanizeConcept(id: string): string {
  const last = id.split('.').pop() ?? id
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Surfaces the Spaced Retrieval Scheduler (Claude Recommendation #8) to the
 * student — the backend has computed a due-for-review queue since it was
 * wired into route.ts, but had no visible surface until now. Read-only:
 * fetches /api/learner/review-queue (which itself only calls the existing
 * loadReviewQueue loader) and renders it. Follows LearningCoachCard's
 * self-fetching client-widget pattern so the server-side dashboard data
 * loader (getDashboardV2Data.ts) needs no changes.
 */
export function ReviewQueueCard() {
  const router = useRouter()
  const { t } = useLanguage()
  const [state, setState] = useState<ReviewQueueState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('/api/learner/review-queue')
      .then((r) => r.json())
      .then((data: ReviewQueueState) => { if (!cancelled) setState(data) })
      .catch(() => { if (!cancelled) setState({ overdue: [], dueToday: [], totalDue: 0 }) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <div className={styles['coach-section']}>
        <SectionTitle>{t('dashx_review_queue_title')}</SectionTitle>
        <div className={styles['coach-skeleton']}>
          <div className={styles['coach-skeleton-shimmer']} />
        </div>
      </div>
    )
  }

  if (!state || state.totalDue === 0) return null // nothing due — no empty-state noise on every visit

  const items = [...state.overdue, ...state.dueToday].slice(0, 4)

  return (
    <div className={styles['coach-section']}>
      <SectionTitle>{t('dashx_review_queue_title')}</SectionTitle>
      <Card className={styles['coach-card']}>
        <div className={styles['coach-header']}>
          <div>
            <div className={styles['coach-header-title']}>
              {t('dashx_review_due_n').replace('{n}', String(state.totalDue))}
            </div>
            <div className={styles['coach-header-sub']}>
              {t('dashx_review_sub')}
            </div>
          </div>
        </div>

        <div className={styles['coach-focus-row']}>
          <span className={styles['coach-focus-heading']}>{t('dashx_due_now')}</span>
          <div className={styles['coach-focus-chips']}>
            {items.map((item) => (
              <button
                key={item.conceptId}
                type="button"
                className={styles['coach-focus-chip']}
                onClick={() => router.push(`/learn?subject=${encodeURIComponent(item.subject)}`)}
                title={item.overdue ? t('dashx_days_overdue').replace('{n}', String(item.daysOverdue)) : t('dashx_due_today')}
              >
                {humanizeConcept(item.conceptId)}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
