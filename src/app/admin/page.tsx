import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import Link from 'next/link'
import { Users, BookOpen, GitBranch, BarChart2, Bot, Settings, ArrowRight } from 'lucide-react'
import { Card, SectionTitle } from '@/components/ui/candy'

const SECTIONS = [
  { href: '/admin/users',            label: 'Users',           icon: Users,     desc: 'View, search and manage student accounts', color: 'var(--candy-red)',    bg: 'rgba(255, 75, 75, 0.12)' },
  { href: '/admin/subjects',         label: 'Subjects',        icon: BookOpen,  desc: 'Manage the subject and curriculum catalog', color: 'var(--candy-blue)',   bg: 'rgba(59, 158, 255, 0.12)' },
  { href: '/admin/curriculum',       label: 'Curriculum',      icon: GitBranch, desc: 'Chapter, lesson and module structure',      color: 'var(--candy-purple)', bg: 'rgba(139, 92, 246, 0.12)' },
  { href: '/admin/knowledge-graphs', label: 'Knowledge Graphs',icon: GitBranch, desc: 'KG nodes, misconceptions and mastery weights', color: 'var(--candy-pink)', bg: 'rgba(255, 95, 162, 0.12)' },
  { href: '/admin/analytics',        label: 'Analytics',       icon: BarChart2, desc: 'Platform-wide engagement and completion metrics', color: 'var(--candy-green)', bg: 'rgba(88, 204, 2, 0.12)' },
  { href: '/admin/ai-ops',           label: 'AI Operations',   icon: Bot,       desc: 'AI usage, budget, model routing and quality', color: 'var(--candy-orange)', bg: 'rgba(255, 150, 0, 0.12)' },
  { href: '/admin/settings',         label: 'System Settings', icon: Settings,  desc: 'Environment, feature flags and admin roster', color: 'var(--candy-ink-soft)', bg: 'var(--candy-bg)' },
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
    <div style={{ maxWidth: 960 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>Admin Console</h1>
        <p style={{ fontSize: 14, color: 'var(--candy-ink-soft)', marginTop: 4 }}>My Tutor platform administration</p>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Students', value: users },
          { label: 'Admins',         value: admins },
        ].map(({ label, value }) => (
          <Card key={label} style={{ padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--candy-ink-soft)', margin: 0 }}>{label}</p>
            <p style={{ fontSize: 32, fontWeight: 800, color: 'var(--candy-ink)', margin: '4px 0 0' }}>
              {value ?? '—'}
            </p>
          </Card>
        ))}
      </div>

      <SectionTitle style={{ marginBottom: 12 }}>Operations</SectionTitle>

      {/* Nav grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        {SECTIONS.map(({ href, label, icon: Icon, desc, color, bg }) => (
          <Link key={href} href={href} className="group" style={{ textDecoration: 'none' }}>
            <Card style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 14, height: '100%' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--candy-ink)', margin: 0 }}>{label}</p>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--candy-ink-soft)', marginTop: 2 }}>{desc}</p>
              </div>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-60 transition-opacity" style={{ marginTop: 4, flexShrink: 0, color: 'var(--candy-ink-soft)' }} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
