import Link from 'next/link'
import { Card, SectionTitle } from '@/components/ui/candy'
import { useLanguage } from '@/components/ui/LanguageToggle'
import styles from './dashboard.module.css'
import type { TranslationKey } from '@/lib/i18n'

const GROUPS: { labelKey: TranslationKey; links: { icon: string; labelKey: TranslationKey; href: string }[] }[] = [
  {
    labelKey: 'dashx_explore_group_practice',
    links: [
      { icon: '🃏', labelKey: 'dashx_explore_flashcards', href: '/flashcards' },
      { icon: '📚', labelKey: 'dashx_explore_library', href: '/library' },
    ],
  },
  {
    labelKey: 'dashx_explore_group_track',
    links: [
      { icon: '📊', labelKey: 'dashx_explore_progress', href: '/progress' },
      { icon: '🏆', labelKey: 'dashx_explore_leaderboard', href: '/leaderboard' },
      { icon: '🎓', labelKey: 'dashx_explore_certificates', href: '/certificates' },
    ],
  },
  {
    labelKey: 'dashx_explore_group_account',
    links: [
      { icon: '⚙️', labelKey: 'settings_title', href: '/settings' },
    ],
  },
]

export function ExploreLinks() {
  const { t } = useLanguage()
  return (
    <div className={styles['explore-section']}>
      <SectionTitle>{t('dashx_explore_title')}</SectionTitle>
      <Card className={styles['explore-card']}>
        <div className={styles['explore-groups']}>
          {GROUPS.map((group) => (
            <div key={group.labelKey} className={styles['explore-group']}>
              <div className={styles['explore-group-label']}>{t(group.labelKey)}</div>
              <div className={styles['explore-group-row']}>
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className={styles['explore-nav-item']}>
                    <span className={styles['explore-nav-item-icon']}>{link.icon}</span>
                    {t(link.labelKey)}
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
