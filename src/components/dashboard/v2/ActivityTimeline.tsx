import { Card, SectionTitle } from '@/components/ui/candy'
import styles from './dashboard.module.css'
import type { ActivityItem } from './types'

interface ActivityTimelineProps {
  items: ActivityItem[]
}

const BUCKET_LABELS = { today: 'Today', yesterday: 'Yesterday', earlier: 'Earlier' }

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  if (items.length === 0) return null

  const buckets: Record<'today' | 'yesterday' | 'earlier', ActivityItem[]> = {
    today: [],
    yesterday: [],
    earlier: [],
  }
  for (const item of items) buckets[item.bucket].push(item)

  return (
    <div className={styles['activity-section']}>
      <SectionTitle>📖 Recent Activity</SectionTitle>
      <Card className={styles['activity-card']}>
        {(['today', 'yesterday', 'earlier'] as const).map((bucket) => {
          const list = buckets[bucket]
          if (list.length === 0) return null
          return (
            <div key={bucket} className={styles['activity-bucket']}>
              <div className={styles['activity-bucket-label']}>{BUCKET_LABELS[bucket]}</div>
              <ul className={styles['activity-list']}>
                {list.map((item) => (
                  <li key={item.id} className={styles['activity-item']}>
                    <span className={styles['activity-icon']}>{item.subjectIcon}</span>
                    <span className={styles['activity-name']}>
                      {item.title ?? item.subjectName}
                    </span>
                    <span className={styles['activity-time']}>{item.timeStr}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </Card>
    </div>
  )
}
