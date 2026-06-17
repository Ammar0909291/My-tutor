import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import Link from 'next/link'
import { LayoutDashboard, Users, BookOpen, GitBranch, BarChart2, Bot, Settings, ChevronRight, Activity } from 'lucide-react'
import { EagleMascot } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

const NAV = [
  { href: '/admin',                  label: 'Overview',        icon: LayoutDashboard },
  { href: '/admin/users',            label: 'Users',           icon: Users },
  { href: '/admin/subjects',         label: 'Subjects',        icon: BookOpen },
  { href: '/admin/curriculum',       label: 'Curriculum',      icon: GitBranch },
  { href: '/admin/knowledge-graphs', label: 'Knowledge Graphs',icon: GitBranch },
  { href: '/admin/analytics',        label: 'Analytics',       icon: BarChart2 },
  { href: '/admin/ai-ops',           label: 'AI Operations',   icon: Bot },
  { href: '/admin/ops',              label: 'Ops Center',      icon: Activity },
  { href: '/admin/settings',         label: 'System Settings', icon: Settings },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login?callbackUrl=/admin')
  const ok = await isAdmin(session.user.id)
  if (!ok) redirect('/dashboard')

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)', display: 'flex' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 224,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--candy-card)',
          borderRight: '1px solid var(--candy-shadow)',
        }}
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--candy-shadow)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <EagleMascot variant="logo" size={32} />
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--candy-red)', margin: 0 }}>My Tutor</p>
            <p style={{ fontSize: 10, color: 'var(--candy-ink-soft)', margin: 0 }}>Mission Control</p>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--candy-ink-soft)',
                textDecoration: 'none',
                transition: 'background .15s, color .15s',
              }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{label}</span>
              <ChevronRight size={11} className="opacity-0 group-hover:opacity-40 transition-opacity" />
            </Link>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--candy-shadow)', fontSize: 10, color: 'var(--candy-ink-soft)' }}>
          <p style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user.email}</p>
          <Link href="/dashboard" style={{ color: 'var(--candy-red)', textDecoration: 'none', display: 'block', marginTop: 4 }}>
            ← Back to app
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto', padding: 32 }}>{children}</main>
    </div>
  )
}
