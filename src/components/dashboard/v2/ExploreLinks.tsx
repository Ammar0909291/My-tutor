import Link from 'next/link'
import { Card, SectionTitle } from '@/components/ui/candy'
import styles from './dashboard.module.css'

const GROUPS = [
  {
    label: 'Practice & Learn',
    links: [
      { icon: '🃏', label: 'Flashcards', href: '/flashcards' },
      { icon: '📚', label: 'Library', href: '/library' },
    ],
  },
  {
    label: 'Track Progress',
    links: [
      { icon: '📊', label: 'Progress', href: '/progress' },
      { icon: '🏆', label: 'Leaderboard', href: '/leaderboard' },
      { icon: '🎓', label: 'Certificates', href: '/certificates' },
    ],
  },
  {
    label: 'Account',
    links: [
      { icon: '⚙️', label: 'Settings', href: '/settings' },
    ],
  },
]

export function ExploreLinks() {
  return (
    <div className={styles['explore-section']}>
      <SectionTitle>🧭 Explore</SectionTitle>
      <Card className={styles['explore-card']}>
        <div className={styles['explore-groups']}>
          {GROUPS.map((group) => (
            <div key={group.label} className={styles['explore-group']}>
              <div className={styles['explore-group-label']}>{group.label}</div>
              <div className={styles['explore-group-row']}>
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className={styles['explore-nav-item']}>
                    <span className={styles['explore-nav-item-icon']}>{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
