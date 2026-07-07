import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import tokenStyles from '@/components/ui/candy/tokens.module.css'
import { AdminShell } from './_components/AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login?callbackUrl=/admin')
  const ok = await isAdmin(session.user.id)
  if (!ok) redirect('/dashboard')

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
      <AdminShell userEmail={session.user.email ?? ''}>{children}</AdminShell>
    </div>
  )
}
