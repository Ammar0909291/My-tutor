'use client'

import { useEffect } from 'react'
import styles from './dashboard.module.css'
import { TopBar } from './TopBar'
import { HeroBanner } from './HeroBanner'
import { DailyGoalCard } from './DailyGoalCard'
import { ContinueCard } from './ContinueCard'
import { PracticeModes } from './PracticeModes'
import { SkillPath } from './SkillPath'
import { LeagueCard } from './LeagueCard'
import { DailyQuests } from './DailyQuests'
import { useConfetti } from './useConfetti'
import type { DashboardV2Data } from './types'

interface DashboardV2Props {
  data: DashboardV2Data
}

export function DashboardV2({ data }: DashboardV2Props) {
  const fireConfetti = useConfetti(styles.confetti)

  useEffect(() => {
    const timer = setTimeout(fireConfetti, 300)
    return () => clearTimeout(timer)
  }, [fireConfetti])

  return (
    <div className={styles.dashboardV2}>
      <div className={styles.wrap}>
        <TopBar data={data.topBar} />

        <div className={styles.main}>
          <HeroBanner data={data.hero} />
          <DailyGoalCard data={data.dailyGoal} />

          <div className={styles['sec-title']}>⚡ Jump back in</div>
          <ContinueCard data={data.continueLesson} />

          <div className={styles['sec-title']}>🎮 Practice modes</div>
          <PracticeModes modes={data.practiceModes} />

          <div className={styles['sec-title']}>🗺️ Your path</div>
          <SkillPath nodes={data.skillPath} />
        </div>

        <div className={styles.side}>
          <LeagueCard league={data.league} />
          <DailyQuests quests={data.dailyQuests} />
        </div>
      </div>
    </div>
  )
}
