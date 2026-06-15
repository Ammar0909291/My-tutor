import styles from './dashboard.module.css'
import type { PracticeModeData } from './types'

interface PracticeModesProps {
  modes: PracticeModeData[]
}

const MODE_CLASS: Record<PracticeModeData['id'], string> = {
  tutor: styles['m-tutor'],
  quiz: styles['m-quiz'],
  coach: styles['m-coach'],
}

export function PracticeModes({ modes }: PracticeModesProps) {
  return (
    <div className={styles.modes}>
      {modes.map((mode) => (
        <button key={mode.id} type="button" className={`${styles.mode} ${MODE_CLASS[mode.id]}`}>
          {mode.badge && <div className={styles['mode-badge']}>{mode.badge}</div>}
          <div className={styles['mode-emoji']}>{mode.emoji}</div>
          <div className={styles['mode-name']}>{mode.name}</div>
          <div className={styles['mode-desc']}>{mode.description}</div>
        </button>
      ))}
    </div>
  )
}
