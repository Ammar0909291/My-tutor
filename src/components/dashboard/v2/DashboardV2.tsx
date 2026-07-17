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
import { ReviewQueueCard } from './ReviewQueueCard'
import { SectionTitle, useConfetti } from '@/components/ui/candy'
import { InstallBanner } from '@/components/dashboard/InstallBanner'
import { useLanguage } from '@/components/ui/LanguageToggle'
import type { DashboardV2Data } from './types'

interface DashboardV2Props {
  data: DashboardV2Data
}

export function DashboardV2({ data }: DashboardV2Props) {
  const fireConfetti = useConfetti()
  const { t } = useLanguage()

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

          <SectionTitle>{t('dashx_jump_back_in')}</SectionTitle>
          <ContinueCard data={data.continueLesson} />

          <SectionTitle>{t('dashx_practice_modes')}</SectionTitle>
          <PracticeModes modes={data.practiceModes} />

          <SectionTitle>{t('dashx_your_path')}</SectionTitle>
          <SkillPath nodes={data.skillPath} currentHref={data.continueLesson.href} />

          {/* ── RESTORED EDUCATIONAL CAPABILITIES ── */}
          <SubjectsGrid subjects={data.subjects} />

          {/* School Mode content cards intentionally hidden from the UI
              (presentation layer only — SchoolExtras and School Mode data
              are untouched). */}

          <AchievementCenter data={data.achievement} />
          <ActivityTimeline items={data.recentActivity} />

          {/* AI-powered learning coach (client — fetches own data) */}
          <LearningCoachCard />

          {/* Spaced Retrieval Scheduler surface (client — fetches own data).
              Renders nothing when no concepts are due (no empty-state noise). */}
          <ReviewQueueCard />

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
