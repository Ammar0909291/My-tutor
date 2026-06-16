import styles from './dashboard.module.css'
import { Card, ProgressRing } from '@/components/ui/candy'
import type { DailyGoalData } from './types'

interface DailyGoalCardProps {
  data: DailyGoalData
}

export function DailyGoalCard({ data }: DailyGoalCardProps) {
  return (
    <Card className={styles['goal-card']}>
      <ProgressRing percent={data.percent} label={<div className={styles['ring-pct']}>{data.percent}%</div>} />
      <div className={styles['goal-info']}>
        <div className={styles['goal-title']}>{data.title}</div>
        <div className={styles['goal-desc']}>{data.description}</div>
      </div>
    </Card>
  )
}
