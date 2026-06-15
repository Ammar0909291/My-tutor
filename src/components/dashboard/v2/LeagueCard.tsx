import styles from './dashboard.module.css'
import type { LeagueData } from './types'

interface LeagueCardProps {
  league: LeagueData
}

export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <div className={styles['side-card']}>
      <div className={styles['league-banner']}>
        <div className={styles['league-icon']}>{league.emoji}</div>
        <div className={styles['league-name']}>{league.name}</div>
        <div className={styles['league-sub']}>{league.subtitle}</div>
      </div>
      {league.entries.map((entry) => (
        <div key={entry.rank} className={`${styles['rank-row']} ${entry.isMe ? styles.me : ''}`}>
          <div className={`${styles['rank-num']} ${entry.isTop ? styles.top : ''}`}>{entry.rank}</div>
          <div className={styles['rank-av']} style={{ background: entry.avatarColor }}>
            {entry.avatarLetter}
          </div>
          <div className={styles['rank-name']}>{entry.name}</div>
          <div className={styles['rank-xp']}>{entry.xp}</div>
        </div>
      ))}
    </div>
  )
}
