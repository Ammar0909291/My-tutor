import Link from 'next/link'
import { ArrowRight, Settings } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { InstallBanner } from '@/components/dashboard/InstallBanner'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

/**
 * School Student home (Sprint BG).
 *
 * Four sections, in priority order: Continue Learning, Today's Goal,
 * My Subjects, Progress Snapshot. Subjects come from board + grade — the
 * student is never asked again. Chapter routing attaches in Sprint BH; until
 * subject cards route to /school/<slug> (Sprint BH).
 */

// Display metadata for school subject slugs (slugs match BoardSubjectCatalog
// subjectSlug values so Sprint BH can attach catalogs without remapping).
const SUBJECT_META: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  mathematics:    { label: 'Mathematics',    icon: '🔢', color: 'var(--blue)',   bg: 'var(--blue-muted)' },
  science:        { label: 'Science',        icon: '🔬', color: 'var(--green)',  bg: 'var(--green-muted)' },
  english:        { label: 'English',        icon: '📖', color: 'var(--yellow)', bg: 'var(--yellow-muted)' },
  social_science: { label: 'Social Science', icon: '🌍', color: 'var(--purple)', bg: 'var(--coral-muted)' },
}

const BOARD_LABELS: Record<string, string> = {
  cbse: 'CBSE',
  up_board: 'UP Board',
}

export interface SchoolSubjectProgress {
  slug: string
  completionPercent: number
  lastChapterTitle: string | null
  lastStudiedAt: Date | null
}

export interface SchoolDashboardProps {
  displayName: string
  board: string
  grade: number
  streakDays: number
  xpPoints: number
  studiedToday: boolean
  subjects: SchoolSubjectProgress[]
}

export function SchoolDashboard({ displayName, board, grade, streakDays, xpPoints, studiedToday, subjects }: SchoolDashboardProps) {
  const boardLabel = BOARD_LABELS[board] ?? board.toUpperCase()

  // Continue target = most recently studied subject, else Mathematics first
  const sorted = [...subjects].sort((a, b) => (b.lastStudiedAt?.getTime() ?? 0) - (a.lastStudiedAt?.getTime() ?? 0))
  const active = sorted.find((s) => s.lastStudiedAt) ?? subjects[0]
  const activeMeta = active ? SUBJECT_META[active.slug] : undefined
  const hasHistory = !!active?.lastStudiedAt

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50"
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-base" style={{ color: 'var(--coral)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
              🎒 {boardLabel} · Class {grade}
            </span>
            <ThemeToggle />
            <Link href="/settings" className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5">
              <Settings size={13} />
            </Link>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-5 py-8 space-y-6">

        <InstallBanner />

        {/* ═══ SECTION 1 — CONTINUE LEARNING ═══ */}
        <section className="relative rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-md)' }}>
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, var(--coral-muted) 0%, transparent 55%)' }} />
          <div className="relative p-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
              {hasHistory ? 'Continue learning' : 'Start learning'}
            </p>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight mb-1"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              Hi {displayName}! 👋
            </h1>
            {active && activeMeta && (
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                {activeMeta.icon} <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{activeMeta.label}</span>
                {active.lastChapterTitle ? ` — ${active.lastChapterTitle}` : hasHistory ? '' : ' — your first lesson awaits'}
              </p>
            )}
            <Link href={active ? `/school/${active.slug}` : '/dashboard'}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-sm font-bold rounded-xl text-white transition-transform hover:scale-[1.02]"
              style={{ background: 'var(--coral)', textDecoration: 'none', boxShadow: 'var(--coral-glow)' }}>
              {hasHistory ? 'Continue' : 'Start now'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ═══ SECTION 2 — TODAY'S GOAL ═══ */}
        <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>🎯 Today&apos;s Goal</h2>
            <span className="text-xs font-bold" style={{ color: 'var(--coral)' }}>🔥 {streakDays}-day streak</span>
          </div>
          <ul className="space-y-2">
            <GoalItem done={studiedToday} label="Study one chapter" />
            <GoalItem done={false} label="Solve 5 practice questions" />
            <GoalItem done={false} label="Review yesterday&apos;s mistakes" />
          </ul>
        </section>

        {/* ═══ SECTION 3 — MY SUBJECTS ═══ */}
        <section>
          <h2 className="font-bold text-sm uppercase tracking-wide mb-3 px-0.5" style={{ color: 'var(--text-primary)' }}>📚 My Subjects</h2>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map((s) => {
              const m = SUBJECT_META[s.slug] ?? { label: s.slug, icon: '📘', color: 'var(--coral)', bg: 'var(--coral-muted)' }
              return (
                <Link key={s.slug} href={`/school/${s.slug}`}
                  className="rounded-2xl p-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', textDecoration: 'none', minHeight: 110 }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: m.bg }}>
                    {m.icon}
                  </div>
                  <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{m.label}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, s.completionPercent))}%`, background: m.color }} />
                    </div>
                    <span className="text-[11px] font-mono font-bold" style={{ color: m.color }}>{s.completionPercent}%</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ═══ SECTION 4 — PROGRESS SNAPSHOT ═══ */}
        <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>📈 Progress</h2>
            <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>⚡ {xpPoints} XP</span>
          </div>
          <div className="space-y-2.5">
            {subjects.map((s) => {
              const m = SUBJECT_META[s.slug] ?? { label: s.slug, icon: '📘', color: 'var(--coral)', bg: 'var(--coral-muted)' }
              return (
                <div key={s.slug} className="flex items-center gap-3">
                  <span className="text-sm w-6 text-center shrink-0">{m.icon}</span>
                  <span className="text-xs font-semibold w-28 shrink-0 truncate" style={{ color: 'var(--text-primary)' }}>{m.label}</span>
                  <div className="h-2 flex-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, s.completionPercent))}%`, background: m.color, transition: 'width .5s' }} />
                  </div>
                  <span className="text-[11px] font-mono font-bold w-9 text-right shrink-0" style={{ color: m.color }}>{s.completionPercent}%</span>
                </div>
              )
            })}
          </div>
        </section>

      </main>
    </div>
  )
}

function GoalItem({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm" style={{ color: done ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0"
        style={{
          background: done ? 'var(--green-muted)' : 'var(--bg-elevated)',
          border: `1px solid ${done ? 'var(--green)' : 'var(--border-default)'}`,
          color: done ? 'var(--green)' : 'var(--text-dim)',
        }}>
        {done ? '✓' : ''}
      </span>
      <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
    </li>
  )
}
