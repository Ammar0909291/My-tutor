'use client'

import { useRouter } from 'next/navigation'
import styles from './dashboard.module.css'
import { CandyButton, useConfetti } from '@/components/ui/candy'
import { useLanguage } from '@/components/ui/LanguageToggle'
import type { ContinueLessonData } from './types'

interface ContinueCardProps {
  data: ContinueLessonData
}

export function ContinueCard({ data }: ContinueCardProps) {
  const fireConfetti = useConfetti()
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <CandyButton
      type="button"
      className={styles['continue-card']}
      depth={6}
      hoverLift={3}
      hoverDepth={9}
      activePush={3}
      activeDepth={3}
      shadowColor="var(--candy-green-d)"
      onClick={() => {
        fireConfetti()
        router.push(data.href)
      }}
    >
      <div className={styles['cc-left']}>
        <div className={styles['cc-icon']}>{data.emoji}</div>
        <div className={styles['cc-text']}>
          <div className={styles['cc-label']}>{data.label}</div>
          <div className={styles['cc-title']}>{data.title}</div>
          <div className={styles['cc-meta']}>
            {t('dashx_continue_meta').replace('{xp}', String(data.xpReward)).replace('{min}', String(data.estimatedMinutes))}
          </div>
        </div>
      </div>
      <div className={styles['cc-play']}>▶</div>
    </CandyButton>
  )
}
