'use client'

import { useRouter } from 'next/navigation'
import styles from './dashboard.module.css'
import { CandyButton, Pill } from '@/components/ui/candy'
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
  const router = useRouter()

  return (
    <div className={styles.modes}>
      {modes.map((mode) => (
        <CandyButton
          key={mode.id}
          type="button"
          className={`${styles.mode} ${MODE_CLASS[mode.id]}`}
          depth={5}
          hoverLift={4}
          activePush={2}
          activeDepth={3}
          onClick={() => router.push(mode.href)}
        >
          {mode.badge && <Pill className={styles['mode-badge']}>{mode.badge}</Pill>}
          <div className={styles['mode-emoji']}>{mode.emoji}</div>
          <div className={styles['mode-name']}>{mode.name}</div>
          <div className={styles['mode-desc']}>{mode.description}</div>
        </CandyButton>
      ))}
    </div>
  )
}
