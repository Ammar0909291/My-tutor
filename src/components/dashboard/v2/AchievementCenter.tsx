import Link from 'next/link'
import { Fragment } from 'react'
import { Card, SectionTitle, ProgressBar } from '@/components/ui/candy'
import styles from './dashboard.module.css'
import type { AchievementData } from './types'

interface AchievementCenterProps {
  data: AchievementData
}

const LEVELS = [
  { name: 'Novice',       icon: '🌱' },
  { name: 'Student',      icon: '📖' },
  { name: 'Practitioner', icon: '⚡' },
  { name: 'Expert',       icon: '🚀' },
  { name: 'Master',       icon: '🏆' },
]

export function AchievementCenter({ data }: AchievementCenterProps) {
  const xpPct = data.xpToNext
    ? Math.min(100, Math.round((data.xp / data.xpToNext) * 100))
    : 100

  const currentIdx = LEVELS.findIndex(l => l.name === data.levelName)
  const safeIdx = currentIdx >= 0 ? currentIdx : 0
  const currentLevel = LEVELS[safeIdx]

  const tagline = data.xp === 0
    ? 'Your journey begins 🌱'
    : `${data.xp} XP earned so far`

  const xpNextText = data.xpToNext != null
    ? `Next: ${data.xpToNext} XP`
    : 'Maximum level reached! 🏆'

  const certMsg =
    data.certCount === 0 ? 'Complete a subject to earn one'
    : data.certCount === 1 ? 'First certificate earned! 🎉'
    : 'Keep collecting'

  const streakMsg =
    data.streakDays === 0 ? 'Day 1 — start your streak! 🔥'
    : data.streakDays === 1 ? '1 day streak — keep going!'
    : `${data.streakDays}-day streak! 🔥`

  return (
    <div className={styles['achievement-section']}>
      <SectionTitle>🏆 Achievements</SectionTitle>
      <Card className={styles['level-card']}>

        {/* Header: badge circle + name + tagline */}
        <div className={styles['level-card-header']}>
          <div
            className={styles['level-badge-circle']}
            style={{ background: data.levelColor }}
          >
            <span className={styles['level-badge-emoji']}>{currentLevel?.icon ?? '🌱'}</span>
          </div>
          <div className={styles['level-title-block']}>
            <div className={styles['level-name']} style={{ color: data.levelColor }}>
              {data.levelName}
            </div>
            <div className={styles['level-tagline']}>{tagline}</div>
          </div>
        </div>

        {/* XP progress bar */}
        <div className={styles['level-xp-section']}>
          <div className={styles['level-xp-row']}>
            <span className={styles['level-xp-val']}>{data.xp} XP</span>
            <span className={styles['level-xp-next']}>{xpNextText}</span>
          </div>
          <ProgressBar
            percent={xpPct}
            height={10}
            borderRadius={5}
            fillColor={data.levelColor}
            animated={true}
          />
        </div>

        {/* Level ladder */}
        <div className={styles['level-ladder-row']}>
          {LEVELS.map((lvl, idx) => {
            const isDone    = idx < safeIdx
            const isCurrent = idx === safeIdx
            const stepClass = [
              styles['level-step'],
              isDone    ? styles['level-step-done']    : '',
              isCurrent ? styles['level-step-current'] : '',
            ].filter(Boolean).join(' ')

            return (
              <Fragment key={lvl.name}>
                {idx > 0 && (
                  <div
                    className={[
                      styles['level-connector'],
                      isDone ? styles['level-connector-done'] : '',
                    ].filter(Boolean).join(' ')}
                  />
                )}
                <div className={stepClass}>
                  <div className={styles['level-step-dot']} />
                  <span className={styles['level-step-name']}>{lvl.name}</span>
                </div>
              </Fragment>
            )
          })}
        </div>

        {/* Stat tiles */}
        <div className={styles['level-stats-grid']}>
          <Link href="/certificates" className={styles['level-stat-tile']}>
            <span className={styles['level-stat-icon']}>🎓</span>
            <div className={styles['level-stat-info']}>
              <div className={styles['level-stat-val']}>
                {data.certCount === 0 ? '—' : data.certCount}
              </div>
              <div className={styles['level-stat-label']}>
                {data.certCount === 0 ? 'First cert coming soon' : 'Certificates'}
              </div>
              <div className={styles['level-stat-msg']}>{certMsg}</div>
            </div>
          </Link>

          <div className={styles['level-stat-tile']}>
            <span className={styles['level-stat-icon']}>🔥</span>
            <div className={styles['level-stat-info']}>
              <div className={styles['level-stat-val']}>
                {data.streakDays === 0 ? '—' : data.streakDays}
              </div>
              <div className={styles['level-stat-label']}>Day streak</div>
              <div className={styles['level-stat-msg']}>{streakMsg}</div>
            </div>
          </div>
        </div>

      </Card>
    </div>
  )
}
