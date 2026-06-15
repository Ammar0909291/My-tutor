import styles from '@/components/dashboard/v2/dashboard.module.css'

export default function DashboardLoading() {
  return (
    <div className={styles.dashboardV2}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontSize: 14, fontWeight: 700, color: 'var(--ink-soft)' }}>
        Loading your dashboard…
      </div>
    </div>
  )
}
