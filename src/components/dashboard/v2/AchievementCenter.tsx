import Link from 'next/link'
import { Fragment } from 'react'
import { Card, SectionTitle, ProgressBar } from '@/components/ui/candy'
import { useLanguage } from '@/components/ui/LanguageToggle'
import type { TranslationKey } from '@/lib/i18n'
import styles from './dashboard.module.css'
import type { AchievementData } from './types'

interface AchievementCenterProps {
  data: AchievementData
}

// Keyed by the server's canonical English levelName (see getLevel() in
// getDashboardV2Data.ts) — icons only; the displayed name is localized
// separately via LEVEL_NAME_KEY below, never this array's `name`.
const LEVELS = [
  { name: 'Novice',       icon: '🌱' },
  { name: 'Student',      icon: '📖' },
  { name: 'Practitioner', icon: '⚡' },
  { name: 'Expert',       icon: '🚀' },
  { name: 'Master',       icon: '🏆' },
]

const LEVEL_NAME_KEY = {
  Novice: 'level_novice',
  Student: 'level_student',
  Practitioner: 'level_practitioner',
  Expert: 'level_expert',
  Master: 'level_master',
} as const

export function AchievementCenter({ data }: AchievementCenterProps) {
  const { t } = useLanguage()
  const xpPct = data.xpToNext
    ? Math.min(100, Math.round((data.xp / data.xpToNext) * 100))
    : 100

  const currentIdx = LEVELS.findIndex(l => l.name === data.levelName)
  const safeIdx = currentIdx >= 0 ? currentIdx : 0
  const currentLevel = LEVELS[safeIdx]
  const levelNameKey = (LEVEL_NAME_KEY as Record<string, TranslationKey | undefined>)[data.levelName]
  const levelDisplayName = levelNameKey ? t(levelNameKey) : data.levelName

  const tagline = data.xp === 0
    ? t('dashx_ach_tagline_zero')
    : t('dashx_ach_tagline_n').replace('{xp}', String(data.xp))

  const xpNextText = data.xpToNext != null
    ? t('dashx_ach_next_xp').replace('{xp}', String(data.xpToNext))
    : t('dashx_ach_max_level')

  const certMsg =
    data.certCount === 0 ? t('dashx_ach_cert_zero')
    : data.certCount === 1 ? t('dashx_ach_cert_one')
    : t('dashx_ach_cert_more')

  const streakMsg =
    data.streakDays === 0 ? t('dashx_ach_streak_zero')
    : data.streakDays === 1 ? t('dashx_ach_streak_one')
    : t('dashx_ach_streak_n').replace('{n}', String(data.streakDays))

  return (
    <div className={styles['achievement-section']}>
      <SectionTitle>{t('dashx_achievements_title')}</SectionTitle>
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
              {levelDisplayName}
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
                  <span className={styles['level-step-name']}>{t(LEVEL_NAME_KEY[lvl.name as keyof typeof LEVEL_NAME_KEY])}</span>
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
                {data.certCount === 0 ? '0' : data.certCount}
              </div>
              <div className={styles['level-stat-label']}>{t('dashx_ach_certificates_label')}</div>
              <div className={styles['level-stat-msg']}>{certMsg}</div>
            </div>
          </Link>

          <div className={styles['level-stat-tile']}>
            <span className={styles['level-stat-icon']}>🔥</span>
            <div className={styles['level-stat-info']}>
              <div className={styles['level-stat-val']}>
                {data.streakDays === 0 ? '0' : data.streakDays}
              </div>
              <div className={styles['level-stat-label']}>{t('dashx_ach_daystreak_label')}</div>
              <div className={styles['level-stat-msg']}>{streakMsg}</div>
            </div>
          </div>
        </div>

      </Card>
    </div>
  )
}
