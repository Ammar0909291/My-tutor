import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import Link from 'next/link'
import { Users, BookOpen, GitBranch, BarChart2, Bot, Settings, ArrowRight } from 'lucide-react'

const SECTIONS = [
  { href: '/admin/users',            label: 'Users',           icon: Users,     desc: 'View, search and manage student accounts' },
  { href: '/admin/subjects',         label: 'Subjects',        icon: BookOpen,  desc: 'Manage the subject and curriculum catalog' },
  { href: '/admin/curriculum',       label: 'Curriculum',      icon: GitBranch, desc: 'Chapter, lesson and module structure' },
  { href: '/admin/knowledge-graphs', label: 'Knowledge Graphs',icon: GitBranch, desc: 'KG nodes, misconceptions and mastery weights' },
  { href: '/admin/analytics',        label: 'Analytics',       icon: BarChart2, desc: 'Platform-wide engagement and completion metrics' },
  { href: '/admin/ai-ops',           label: 'AI Operations',   icon: Bot,       desc: 'AI usage, budget, model routing and quality' },
  { href: '/admin/settings',         label: 'System Settings', icon: Settings,  desc: 'Environment, feature flags and admin roster' },
]

async function getStats() {
  try {
    const [users, admins] = await withRetry(() =>
      Promise.all([
        prisma.user.count({ where: { isDeleted: false } }),
        prisma.user.count({ where: { role: 'ADMIN', isDeleted: false } }),
      ])
    )
    return { users, admins }
  } catch {
    return { users: null, admins: null }
  }
}

export default async function AdminOverviewPage() {
  const { users, admins } = await getStats()

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>Admin Console</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>My Tutor platform administration</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Total Students', value: users },
          { label: 'Admins',         value: admins },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl p-5 border"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-dim)' }}>{label}</p>
            <p className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
              {value ?? '—'}
            </p>
          </div>
        ))}
      </div>

      {/* Nav grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SECTIONS.map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href}
            className="group flex items-start gap-4 p-5 rounded-xl border transition-colors hover:border-[var(--accent-primary)]"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
            <div className="mt-0.5 p-2 rounded-lg" style={{ background: 'var(--coral-muted)' }}>
              <Icon size={16} style={{ color: 'var(--coral)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
            </div>
            <ArrowRight size={14} className="mt-1 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
              style={{ color: 'var(--text-dim)' }} />
          </Link>
        ))}
      </div>
    </div>
  )
}
