import styles from './dashboard.module.css'
import type { DailyQuestData } from './types'

interface DailyQuestsProps {
  quests: DailyQuestData[]
}

export function DailyQuests({ quests }: DailyQuestsProps) {
  return (
    <div className={styles['side-card']}>
      <div className={styles['side-title']}>
        Daily Quests <a href="#">View all</a>
      </div>
      {quests.map((quest) => {
        const pct = Math.min(100, (quest.progress / quest.target) * 100)
        return (
          <div key={quest.id} className={styles.quest}>
            <div className={`${styles['quest-icon']} ${styles[quest.iconBg]}`}>{quest.icon}</div>
            <div className={styles['quest-body']}>
              <div className={styles['quest-name']}>{quest.name}</div>
              <div className={styles['quest-bar']}>
                <div
                  className={styles['quest-fill']}
                  style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${quest.gradientFrom}, ${quest.gradientTo})` }}
                />
              </div>
              <span className={styles['quest-pct']}>
                {quest.progress} / {quest.target} {quest.unitLabel}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
