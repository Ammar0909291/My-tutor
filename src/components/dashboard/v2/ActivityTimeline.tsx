import Link from 'next/link'
import { Card, SectionTitle } from '@/components/ui/candy'
import styles from './dashboard.module.css'
import type { ActivityItem } from './types'

interface ActivityTimelineProps {
  items: ActivityItem[]
}

const BUCKET_LABELS = { today: 'Today', yesterday: 'Yesterday', earlier: 'Earlier' }

const DOT_COLORS = ['var(--purple)', 'var(--blue)', 'var(--green)', 'var(--orange)', 'var(--pink)']

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  const recentCount = items.filter(i => i.bucket === 'today' || i.bucket === 'yesterday').length

  if (items.length === 0) {
    return (
      <div className={styles['activity-section']}>
        <SectionTitle>📖 Learning Journey</SectionTitle>
        <Card className={styles['journey-card']}>
          <div className={styles['journey-empty']}>
            <div className={styles['journey-empty-dot']} />
            <span className={styles['journey-empty-text']}>Your learning story starts here — complete your first lesson to see progress</span>
            <Link href="/learn" className={styles['journey-empty-link']}>Start →</Link>
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
      <SectionTitle>📖 Learning Journey</SectionTitle>
      <Card className={styles['journey-card']}>
        {recentCount > 0 && (
          <div className={styles['journey-lead']}>
            {recentCount} lesson{recentCount !== 1 ? 's' : ''} this week
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
                  ? `Completed "${item.title}"`
                  : `Studied ${item.subjectName}`
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
