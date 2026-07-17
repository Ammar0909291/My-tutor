import Link from 'next/link'
import { Card, SectionTitle } from '@/components/ui/candy'
import { useLanguage } from '@/components/ui/LanguageToggle'
import styles from './dashboard.module.css'
import type { ActivityItem } from './types'

interface ActivityTimelineProps {
  items: ActivityItem[]
}

const DOT_COLORS = ['var(--purple)', 'var(--blue)', 'var(--green)', 'var(--orange)', 'var(--pink)']

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  const { t } = useLanguage()
  const BUCKET_LABELS = { today: t('dashx_today'), yesterday: t('dashx_yesterday'), earlier: t('dashx_earlier') }
  const recentCount = items.filter(i => i.bucket === 'today' || i.bucket === 'yesterday').length

  if (items.length === 0) {
    return (
      <div className={styles['activity-section']}>
        <SectionTitle>{t('dashx_learning_journey')}</SectionTitle>
        <Card className={styles['journey-card']}>
          <div className={styles['journey-empty']}>
            <div className={styles['journey-empty-timeline']}>
              <div className={styles['journey-empty-dot-ring']}>
                <div className={styles['journey-empty-dot']} />
              </div>
              <div className={styles['journey-empty-fade-line']} />
            </div>
            <div className={styles['journey-empty-body']}>
              <div className={styles['journey-empty-title']}>{t('dashx_journey_empty_title')}</div>
              <div className={styles['journey-empty-sub']}>{t('dashx_journey_empty_sub')}</div>
              <Link href="/learn" className={styles['journey-empty-btn']}>{t('dashx_journey_empty_btn')}</Link>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const buckets: Record<'today' | 'yesterday' | 'earlier', ActivityItem[]> = {
    today: [],
    yesterday: [],
    earlier: [],
  }
  for (const item of items) buckets[item.bucket].push(item)

  let globalIdx = 0

  return (
    <div className={styles['activity-section']}>
      <SectionTitle>{t('dashx_learning_journey')}</SectionTitle>
      <Card className={styles['journey-card']}>
        {recentCount > 0 && (
          <div className={styles['journey-lead']}>
            {t('dashx_journey_lead').replace('{n}', String(recentCount))}
          </div>
        )}

        {(['today', 'yesterday', 'earlier'] as const).map((bucket) => {
          const list = buckets[bucket]
          if (list.length === 0) return null
          return (
            <div key={bucket} className={styles['journey-bucket']}>
              <div className={styles['journey-bucket-label']}>{BUCKET_LABELS[bucket]}</div>
              {list.map((item) => {
                const idx = globalIdx++
                const dotColor = DOT_COLORS[idx % DOT_COLORS.length]
                const narrativeTitle = item.title
                  ? t('dashx_journey_completed').replace('{title}', item.title)
                  : t('dashx_journey_studied').replace('{subject}', item.subjectName)
                const isLast = idx === items.length - 1
                return (
                  <div key={item.id} className={styles['journey-node']}>
                    <div className={styles['journey-node-track']}>
                      <div className={styles['journey-dot']} style={{ background: dotColor }} />
                      {!isLast && <div className={styles['journey-line']} />}
                    </div>
                    <div className={styles['journey-content']}>
                      <div className={styles['journey-title']}>{narrativeTitle}</div>
                      <div className={styles['journey-sub-row']}>
                        <span className={styles['journey-subject-tag']}>{item.subjectName}</span>
                        <span className={styles['journey-time']}>{item.timeStr}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </Card>
    </div>
  )
}
