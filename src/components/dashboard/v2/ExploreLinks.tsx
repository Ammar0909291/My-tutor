import Link from 'next/link'
import { SectionTitle } from '@/components/ui/candy'
import styles from './dashboard.module.css'

const LINKS = [
  { label: '🃏 Flashcards',   href: '/flashcards' },
  { label: '📚 Library',      href: '/library' },
  { label: '📊 Progress',     href: '/progress' },
  { label: '🏆 Leaderboard',  href: '/leaderboard' },
  { label: '🎓 Certificates', href: '/certificates' },
  { label: '⚙️ Settings',     href: '/settings' },
]

export function ExploreLinks() {
  return (
    <div className={styles['explore-section']}>
      <SectionTitle>🧭 Explore</SectionTitle>
      <div className={styles['explore-links']}>
        {LINKS.map(({ label, href }) => (
          <Link key={href} href={href} className={styles['explore-chip']}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
