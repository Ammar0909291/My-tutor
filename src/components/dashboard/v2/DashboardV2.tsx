'use client'

import { useEffect } from 'react'
import styles from './dashboard.module.css'
import { TopBar } from './TopBar'
import { NavHeader } from './NavHeader'
import { HeroBanner } from './HeroBanner'
import { DailyGoalCard } from './DailyGoalCard'
import { ContinueCard } from './ContinueCard'
import { PracticeModes } from './PracticeModes'
import { SkillPath } from './SkillPath'
import { LeagueCard } from './LeagueCard'
import { DailyQuests } from './DailyQuests'
import { SubjectsGrid } from './SubjectsGrid'
import { AchievementCenter } from './AchievementCenter'
import { ActivityTimeline } from './ActivityTimeline'
import { ExploreLinks } from './ExploreLinks'
import { LearningCoachCard } from './LearningCoachCard'
import { SchoolExtras } from './SchoolExtras'
import { SectionTitle, useConfetti } from '@/components/ui/candy'
import { InstallBanner } from '@/components/dashboard/InstallBanner'
import type { DashboardV2Data } from './types'

interface DashboardV2Props {
  data: DashboardV2Data
}

export function DashboardV2({ data }: DashboardV2Props) {
  const fireConfetti = useConfetti()

  useEffect(() => {
    const timer = setTimeout(fireConfetti, 300)
    return () => clearTimeout(timer)
  }, [fireConfetti])

  return (
    <div className={styles.dashboardV2}>
      <NavHeader userRole={data.topBar.userRole} />

      <div className={styles.wrap}>
        <div className={styles['full-width']}>
          <InstallBanner />
        </div>

        <TopBar data={data.topBar} />

        <div className={styles.main}>
          <HeroBanner data={data.hero} />
          <DailyGoalCard data={data.dailyGoal} />

          <SectionTitle>⚡ Jump back in</SectionTitle>
          <ContinueCard data={data.continueLesson} />

          <SectionTitle>🎮 Practice modes</SectionTitle>
          <PracticeModes modes={data.practiceModes} />

          <SectionTitle>🗺️ Your path</SectionTitle>
          <SkillPath nodes={data.skillPath} currentHref={data.continueLesson.href} />

          {/* ── RESTORED EDUCATIONAL CAPABILITIES ── */}
          <SubjectsGrid subjects={data.subjects} />

          {/* School Mode content cards — same V2 shell, school-specific data only */}
          {data.school && <SchoolExtras data={data.school} />}

          <AchievementCenter data={data.achievement} />
          <ActivityTimeline items={data.recentActivity} />

          {/* AI-powered learning coach (client — fetches own data) */}
          <LearningCoachCard />

          <ExploreLinks />
        </div>

        <div className={styles.side}>
          <LeagueCard league={data.league} />
          <DailyQuests quests={data.dailyQuests} />
        </div>
      </div>
    </div>
  )
}
