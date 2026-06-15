'use client'

import { useState } from 'react'
import styles from './dashboard.module.css'
import { EagleMascot, useConfetti } from '@/components/ui/candy'
import type { TopBarData } from './types'

interface TopBarProps {
  data: TopBarData
}

export function TopBar({ data }: TopBarProps) {
  const [waving, setWaving] = useState(false)
  const fireConfetti = useConfetti()

  function handleMascotClick() {
    setWaving(true)
    fireConfetti()
  }

  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>
        <div
          className={`${styles['logo-mascot']} ${waving ? styles.waving : ''}`}
          onClick={handleMascotClick}
          onAnimationEnd={() => setWaving(false)}
        >
          <EagleMascot variant="logo" />
        </div>
        <div className={styles['logo-text']}>
          My<span>Tutor</span>
        </div>
      </div>
      <div className={styles['top-stats']}>
        <div className={`${styles['stat-chip']} ${styles['chip-streak']}`}>
          <span className={styles.ic}>🔥</span> {data.streak}
        </div>
        <div className={`${styles['stat-chip']} ${styles['chip-gem']}`}>
          <span className={styles.ic}>💎</span> {data.gems}
        </div>
        <div className={`${styles['stat-chip']} ${styles['chip-heart']}`}>
          <span className={styles.ic}>❤️</span> {data.hearts}
        </div>
      </div>
    </div>
  )
}
