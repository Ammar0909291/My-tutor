import Link from 'next/link'
import { Card, SectionTitle, ProgressBar } from '@/components/ui/candy'
import styles from './dashboard.module.css'
import type { AchievementData } from './types'

interface AchievementCenterProps {
  data: AchievementData
}

export function AchievementCenter({ data }: AchievementCenterProps) {
  const xpPct = data.xpToNext
    ? Math.min(100, Math.round((data.xp / data.xpToNext) * 100))
    : 100

  return (
    <div className={styles['achievement-section']}>
      <SectionTitle>🏆 Achievements</SectionTitle>
      <Card className={styles['achievement-card']}>
        <div className={styles['achievement-row']}>
          {/* Level + XP progress */}
          <div className={styles['achievement-level']}>
            <div className={styles['achievement-level-row']}>
              <span className={styles['achievement-level-label']}>Level</span>
              <span className={styles['achievement-level-name']} style={{ color: data.levelColor }}>
                {data.levelName}
              </span>
              <span className={styles['achievement-xp-label']}>
                {data.xp} XP{data.xpToNext ? ` · next: ${data.xpToNext}` : ''}
              </span>
            </div>
            <ProgressBar
              percent={xpPct}
              height={10}
              borderRadius={5}
              fillColor={data.levelColor}
              animated={false}
            />
          </div>

          {/* Cert chip */}
          <Link href="/certificates" className={styles['achievement-chip']} style={{ textDecoration: 'none' }}>
            <span className={styles['achievement-chip-icon']}>🎓</span>
            <div>
              <div className={styles['achievement-chip-val']}>{data.certCount}</div>
              <div className={styles['achievement-chip-lbl']}>Certificates</div>
            </div>
          </Link>

          {/* Streak chip */}
          <div className={styles['achievement-chip']}>
            <span className={styles['achievement-chip-icon']}>🔥</span>
            <div>
              <div className={styles['achievement-chip-val']}>{data.streakDays}</div>
              <div className={styles['achievement-chip-lbl']}>Day streak</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
