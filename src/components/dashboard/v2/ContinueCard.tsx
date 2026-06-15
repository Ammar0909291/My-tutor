'use client'

import styles from './dashboard.module.css'
import { useConfetti } from './useConfetti'
import type { ContinueLessonData } from './types'

interface ContinueCardProps {
  data: ContinueLessonData
}

export function ContinueCard({ data }: ContinueCardProps) {
  const fireConfetti = useConfetti(styles.confetti)

  return (
    <button type="button" className={styles['continue-card']} onClick={() => fireConfetti()}>
      <div className={styles['cc-left']}>
        <div className={styles['cc-icon']}>{data.emoji}</div>
        <div className={styles['cc-text']}>
          <div className={styles['cc-label']}>{data.label}</div>
          <div className={styles['cc-title']}>{data.title}</div>
          <div className={styles['cc-meta']}>
            +{data.xpReward} XP · about {data.estimatedMinutes} min
          </div>
        </div>
      </div>
      <div className={styles['cc-play']}>▶</div>
    </button>
  )
}
