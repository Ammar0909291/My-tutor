'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, BookOpen, GitBranch, BarChart2, Bot, Settings, ChevronRight, Activity, Menu, X } from 'lucide-react'
import { EagleMascot } from '@/components/ui/candy'

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

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              color: active ? 'var(--candy-purple)' : 'var(--candy-ink-soft)',
              background: active ? 'rgba(139,92,246,0.1)' : 'transparent',
              textDecoration: 'none',
              transition: 'background .15s, color .15s',
            }}
          >
            <Icon size={15} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{label}</span>
            <ChevronRight size={11} className="opacity-0 group-hover:opacity-40 transition-opacity" />
          </Link>
        )
      })}
    </nav>
  )
}

function Brand() {
  return (
    <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--candy-shadow)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <EagleMascot variant="logo" size={32} />
      <div>
        <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--candy-red)', margin: 0 }}>My Tutor</p>
        <p style={{ fontSize: 10, color: 'var(--candy-ink-soft)', margin: 0 }}>Mission Control</p>
      </div>
    </div>
  )
}

export function AdminShell({ userEmail, children }: { userEmail: string; children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex"
        style={{
          width: 224,
          flexShrink: 0,
          flexDirection: 'column',
          background: 'var(--candy-card)',
          borderRight: '1px solid var(--candy-shadow)',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
        }}
      >
        <Brand />
        <NavLinks />
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--candy-shadow)', fontSize: 10, color: 'var(--candy-ink-soft)' }}>
          <p style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</p>
          <Link href="/dashboard" style={{ color: 'var(--candy-red)', textDecoration: 'none', display: 'block', marginTop: 4 }}>
            ← Back to app
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div
        className="flex md:hidden"
        style={{
          position: 'sticky', top: 0, zIndex: 30,
          alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'var(--candy-card)',
          borderBottom: '1px solid var(--candy-shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <EagleMascot variant="logo" size={26} />
          <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--candy-red)' }}>Mission Control</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open admin menu"
          style={{ background: 'none', border: 'none', padding: 6, color: 'var(--candy-ink)', cursor: 'pointer' }}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="md:hidden" style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}
          />
          <div
            style={{
              position: 'absolute', top: 0, left: 0, height: '100vh', width: 260,
              background: 'var(--candy-card)', display: 'flex', flexDirection: 'column',
              boxShadow: '0 0 24px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Brand />
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close admin menu"
                style={{ background: 'none', border: 'none', padding: 12, marginRight: 4, color: 'var(--candy-ink-soft)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>
            <NavLinks onNavigate={() => setDrawerOpen(false)} />
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--candy-shadow)', fontSize: 10, color: 'var(--candy-ink-soft)' }}>
              <p style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</p>
              <Link href="/dashboard" style={{ color: 'var(--candy-red)', textDecoration: 'none', display: 'block', marginTop: 4 }}>
                ← Back to app
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="md:ml-[224px]" style={{ padding: 24 }}>{children}</main>
    </div>
  )
}
