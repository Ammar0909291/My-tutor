import Link from 'next/link'
import styles from './dashboard.module.css'
import { Card, ProgressBar } from '@/components/ui/candy'
import type { DailyQuestData } from './types'

interface DailyQuestsProps {
  quests: DailyQuestData[]
}

export function DailyQuests({ quests }: DailyQuestsProps) {
  return (
    <Card className={styles['side-card']}>
      <div className={styles['side-title']}>
        Daily Quests <Link href="/progress">View all</Link>
      </div>
      {quests.map((quest) => {
        const pct = Math.min(100, (quest.progress / quest.target) * 100)
        return (
          <div key={quest.id} className={styles.quest}>
            <div className={`${styles['quest-icon']} ${styles[quest.iconBg]}`}>{quest.icon}</div>
            <div className={styles['quest-body']}>
              <div className={styles['quest-name']}>{quest.name}</div>
              <ProgressBar
                percent={pct}
                height={10}
                borderRadius={6}
                fillColor={`linear-gradient(90deg, ${quest.gradientFrom}, ${quest.gradientTo})`}
                animated={false}
              />
              <span className={styles['quest-pct']}>
                {quest.progress} / {quest.target} {quest.unitLabel}
              </span>
            </div>
          </div>
        )
      })}
    </Card>
  )
}
