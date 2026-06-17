'use client'

import Link from 'next/link'
import { Settings } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import styles from './dashboard.module.css'

interface NavHeaderProps {
  userRole: 'ADMIN' | 'USER'
}

export function NavHeader({ userRole }: NavHeaderProps) {
  return (
    <nav className={styles['nav-header']}>
      <div className={styles['nav-inner']}>
        <Link href="/" className={styles['nav-logo']}>
          <span>🦅</span>
          <span className={styles['nav-logo-text']}>My <span>Tutor</span></span>
        </Link>
        <div className={styles['nav-actions']}>
          <ThemeToggle />
          {userRole === 'ADMIN' && (
            <Link href="/admin" className={styles['nav-link-admin']}>
              ⚙ Admin
            </Link>
          )}
          <Link href="/modes" className={styles['nav-link']}>
            <span>🎒</span>
            <span className={styles['nav-link-label']}>Modes</span>
          </Link>
          <Link href="/settings" className={styles['nav-link']}>
            <Settings size={15} />
            <span className={styles['nav-link-label']}>Settings</span>
          </Link>
          <SignOutButton />
        </div>
      </div>
    </nav>
  )
}
