import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import Link from 'next/link'
import { LayoutDashboard, Users, BookOpen, GitBranch, BarChart2, Bot, Settings, ChevronRight, Activity } from 'lucide-react'

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
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r flex flex-col"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
        <div className="px-4 py-5 border-b flex items-center gap-2" style={{ borderColor: 'var(--border-default)' }}>
          <span className="text-lg">🔥</span>
          <div>
            <p className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--accent-primary)' }}>My Tutor</p>
            <p className="text-[10px]" style={{ color: 'var(--text-dim)' }}>Admin Console</p>
          </div>
        </div>
        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/5 group"
              style={{ color: 'var(--text-secondary)' }}>
              <Icon size={15} className="shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight size={11} className="opacity-0 group-hover:opacity-40 transition-opacity" />
            </Link>
          ))}
        </nav>
        <div className="px-4 py-3 border-t text-[10px]" style={{ borderColor: 'var(--border-default)', color: 'var(--text-dim)' }}>
          <p>{session.user.email}</p>
          <Link href="/dashboard" className="hover:underline mt-0.5 block" style={{ color: 'var(--accent-primary)' }}>
            ← Back to app
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
