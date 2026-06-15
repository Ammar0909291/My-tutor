import styles from './dashboard.module.css'
import type { DailyGoalData } from './types'

interface DailyGoalCardProps {
  data: DailyGoalData
}

// Matches the ring's stroke-dasharray (2 * π * r=36 ≈ 226) in dashboard.module.css.
const RING_CIRCUMFERENCE = 226

export function DailyGoalCard({ data }: DailyGoalCardProps) {
  const dashoffset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * data.percent) / 100

  return (
    <div className={styles['goal-card']}>
      <div className={styles['ring-wrap']}>
        <svg width="84" height="84">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B9EFF" />
            </linearGradient>
          </defs>
          <circle className={styles['ring-bg']} cx="42" cy="42" r="36" />
          <circle
            className={styles['ring-fill']}
            cx="42"
            cy="42"
            r="36"
            style={{ '--ring-dashoffset': dashoffset } as unknown as React.CSSProperties}
          />
        </svg>
        <div className={styles['ring-center']}>
          <div className={styles['ring-pct']}>{data.percent}%</div>
        </div>
      </div>
      <div className={styles['goal-info']}>
        <div className={styles['goal-title']}>{data.title}</div>
        <div className={styles['goal-desc']}>{data.description}</div>
        <div className={styles['goal-bar']}>
          <div
            className={styles['goal-bar-fill']}
            style={{ '--goal-width': `${data.percent}%` } as unknown as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  )
}
