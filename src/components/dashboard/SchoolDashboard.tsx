'use client'

import Link from 'next/link'
import { ArrowRight, Settings, Flame, Zap } from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { InstallBanner } from '@/components/dashboard/InstallBanner'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { NavigatorActionCard } from '@/components/school/NavigatorActionCard'
import type { LearningNavigatorAction } from '@/lib/school/navigation/navigatorTypes'
import { ProgressReportButton } from '@/components/dashboard/ProgressReportButton'
import { Card, CandyButton, Pill, ProgressBar, SectionTitle, EagleMascot, useConfetti } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

/**
 * School Student home (Sprint BG).
 *
 * Four sections, in priority order: Continue Learning, Today's Goal,
 * My Subjects, Progress Snapshot. Subjects come from board + grade — the
 * student is never asked again. Chapter routing attaches in Sprint BH; until
 * subject cards route to /school/<slug> (Sprint BH).
 *
 * School Sprint B: restyled onto the candy primitives (Card/CandyButton/
 * Pill/ProgressBar/SectionTitle) to match Dashboard V2 / Lesson Experience.
 * No data shape, computation, or routing changes.
 */

// Display metadata for school subject slugs (slugs match BoardSubjectCatalog
// subjectSlug values so Sprint BH can attach catalogs without remapping).
const SUBJECT_META: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  mathematics:    { label: 'Mathematics',    icon: '🔢', color: 'var(--candy-blue)',   bg: 'var(--candy-blue)22' },
  science:        { label: 'Science',        icon: '🔬', color: 'var(--candy-green)',  bg: 'var(--candy-green)22' },
  english:        { label: 'English',        icon: '📖', color: 'var(--candy-yellow)', bg: 'var(--candy-yellow)22' },
  social_science: { label: 'Social Science', icon: '🌍', color: 'var(--candy-purple)', bg: 'var(--candy-purple)22' },
}

const BOARD_LABELS: Record<string, string> = {
  cbse: 'CBSE',
  up_board: 'UP Board',
}

export interface SchoolSubjectProgress {
  slug: string
  completionPercent: number
  completedCount: number
  totalCount: number
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
  // Sprint BO: single top revision recommendation; null hides the card
  revision?: { subjectSlug: string; subjectLabel: string; chapterId: string; chapterTitle: string } | null
  // Sprint BP: next best action; null hides the card
  nextAction?: {
    type: 'retake_assessment' | 'practice_weak' | 'continue_chapter' | 'start_next_chapter'
    subjectSlug: string
    subjectLabel: string
    chapterId: string
    title: string
    reason: string | null
  } | null
  pendingAssessment?: { subjectSlug: string; chapterId: string } | null
  // Sprint BQ: daily study plan tasks; empty array hides the card
  dailyPlan?: {
    subjectSlug: string
    subjectLabel: string
    chapterId: string
    title: string
    estimatedMinutes: number
    reason: string
    priority: string
    href: string
  }[]
  // Sprint CD: learning momentum (streak + recent achievement)
  momentum?: {
    currentStreak: number
    longestStreak: number
    recentAchievement: { slug: string; title: string; icon: string } | null
  } | null
  // Sprint CE: exam readiness per subject
  examReadiness?: {
    subjectSlug: string
    subjectLabel: string
    readinessPercent: number
    level: string
  }[] | null
  // Sprint CO: single unified action from the Learning Navigator
  navigatorAction?: LearningNavigatorAction | null
  // Sprint CK: academic journey (roadmap completion per subject)
  academicJourney?: {
    subjectSlug: string
    subjectLabel: string
    completedCount: number
    totalCount: number
    completionPercent: number
  }[] | null
}

const NEXT_ACTION_LABELS: Record<string, { heading: string; cta: string }> = {
  retake_assessment:   { heading: 'Retake', cta: 'Retake Assessment' },
  bridge_prerequisite: { heading: 'Foundation', cta: 'Review Foundation' },
  review_spaced:       { heading: 'Review', cta: 'Quick Review' },
  practice_weak:       { heading: 'Review', cta: 'Review Weak Areas' },
  continue_chapter:    { heading: 'Continue', cta: 'Continue' },
  start_next_chapter:  { heading: 'Start', cta: 'Start Chapter' },
}

export function SchoolDashboard({ displayName, board, grade, streakDays, xpPoints, studiedToday, subjects, revision, nextAction, pendingAssessment, dailyPlan, momentum, examReadiness, navigatorAction, academicJourney }: SchoolDashboardProps) {
  const boardLabel = BOARD_LABELS[board] ?? board.toUpperCase()
  const fireConfetti = useConfetti()

  // Continue target = most recently studied subject, else Mathematics first
  const sorted = [...subjects].sort((a, b) => (b.lastStudiedAt?.getTime() ?? 0) - (a.lastStudiedAt?.getTime() ?? 0))
  const active = sorted.find((s) => s.lastStudiedAt) ?? subjects[0]
  const activeMeta = active ? SUBJECT_META[active.slug] : undefined
  const hasHistory = !!active?.lastStudiedAt

  // Sprint BN: pending assessment takes priority in Continue Learning CTA
  const continueHref = pendingAssessment
    ? `/school/${pendingAssessment.subjectSlug}/chapter/${encodeURIComponent(pendingAssessment.chapterId)}/assessment`
    : active ? `/school/${active.slug}` : '/dashboard'
  const continueLabel = pendingAssessment ? 'Resume Assessment' : hasHistory ? 'Continue' : 'Start now'

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50"
        style={{ background: 'var(--candy-card)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 0 var(--candy-shadow)' }}>
        <div className="max-w-3xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <EagleMascot variant="logo" size={26} />
            <span style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, fontSize: 16, color: 'var(--candy-ink)' }}>My Tutor</span>
          </Link>
          <div className="flex items-center gap-3">
            <Pill color="var(--candy-shadow)" className="hidden sm:inline-flex" style={{ color: 'var(--candy-ink-soft)' }}>
              🎒 {boardLabel} · Class {grade}
            </Pill>
            <ThemeToggle />
            <Link href="/dashboard?mode=library" className="hidden sm:inline-flex text-xs px-3 py-1.5 font-bold" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              Library Mode
            </Link>
            <Link href="/modes" className="hidden sm:inline-flex text-xs px-3 py-1.5 font-bold" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
              Modes
            </Link>
            <Link href="/settings" className="text-xs px-3 py-1.5 flex items-center gap-1.5" style={{ color: 'var(--candy-ink-soft)' }}>
              <Settings size={13} />
            </Link>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-5 py-8 space-y-5">

        <InstallBanner />

        {/* ═══ RECOMMENDED NEXT ACTION (Sprint CO Learning Navigator) ═══ */}
        {navigatorAction ? (
          <NavigatorActionCard action={navigatorAction} />
        ) : nextAction ? (
          /* Fallback: legacy nextAction card when orchestrator returned null */
          <Card style={{ padding: 18 }}>
            <SectionTitle style={{ fontSize: 13, marginBottom: 8 }}>⭐ Your Next Step</SectionTitle>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--candy-ink-soft)' }}>
              {NEXT_ACTION_LABELS[nextAction.type]?.heading ?? 'Next'}:
            </p>
            <p className="font-bold text-sm mt-0.5" style={{ color: 'var(--candy-ink)' }}>{nextAction.title}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--candy-ink-soft)' }}>{nextAction.subjectLabel} · Class {grade}</p>
            {nextAction.reason && (
              <p className="text-xs mt-2" style={{ color: 'var(--candy-ink-soft)' }}>{nextAction.reason}</p>
            )}
            <Link
              href={`/school/${nextAction.subjectSlug}/chapter/${encodeURIComponent(nextAction.chapterId)}${nextAction.type === 'retake_assessment' ? '/assessment' : ''}`}
              style={{ textDecoration: 'none', display: 'inline-block', marginTop: 12 }}>
              <CandyButton depth={3} shadowColor="var(--candy-red)" activeDepth={1}
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 800, padding: '10px 18px', borderRadius: 12, background: 'var(--candy-red)', color: '#fff' }}>
                {NEXT_ACTION_LABELS[nextAction.type]?.cta ?? 'Continue'} <ArrowRight size={13} />
              </CandyButton>
            </Link>
          </Card>
        ) : null}

        {/* ═══ TODAY'S PLAN (Sprint BQ) ═══ */}
        {dailyPlan && dailyPlan.length > 0 && (
          <Card style={{ padding: 18 }}>
            <div className="flex items-center justify-between mb-3">
              <SectionTitle style={{ fontSize: 13, margin: 0 }}>📅 Today&apos;s Plan</SectionTitle>
              <span className="text-xs font-semibold" style={{ color: 'var(--candy-ink-soft)' }}>
                ~{dailyPlan.reduce((s, t) => s + t.estimatedMinutes, 0)} min
              </span>
            </div>
            <ul className="space-y-2.5 mb-3">
              {dailyPlan.map((task, i) => {
                // Sprint CO.1: when the Navigator's recommendation IS this task,
                // note it instead of repeating the full recommendation card —
                // keeps the Daily Plan intact while avoiding duplication.
                const isNavigatorTarget = !!navigatorAction
                  && navigatorAction.subjectSlug === task.subjectSlug
                  && navigatorAction.chapterId === task.chapterId
                return (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 font-bold"
                      style={{ background: 'var(--candy-bg)', color: 'var(--candy-ink-soft)' }}>
                      {i + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-semibold truncate block" style={{ color: 'var(--candy-ink)' }}>{task.title}</span>
                      <span className="text-xs" style={{ color: 'var(--candy-ink-soft)' }}>{task.subjectLabel} · ~{task.estimatedMinutes} min</span>
                      {isNavigatorTarget && (
                        <span className="text-[10px] block mt-0.5" style={{ color: 'var(--candy-ink-soft)' }}>
                          ✓ Included in your recommended action above
                        </span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
            <Link href="/school/focus" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <CandyButton depth={3} shadowColor="var(--candy-red)" activeDepth={1}
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 800, padding: '10px 18px', borderRadius: 12, background: 'var(--candy-red)', color: '#fff' }}>
                Start Today&apos;s Plan <ArrowRight size={13} />
              </CandyButton>
            </Link>
          </Card>
        )}

        {/* ═══ SECTION 1 — CONTINUE LEARNING ═══ */}
        <Card style={{
          position: 'relative', overflow: 'hidden', padding: 22,
          background: 'linear-gradient(135deg, var(--candy-purple) 0%, var(--candy-blue) 100%)',
          boxShadow: '0 4px 0 var(--candy-purple-d)',
        }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <EagleMascot variant="hero" size={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {hasHistory ? 'Continue learning' : 'Start learning'}
              </p>
              <h1 style={{ fontFamily: 'var(--font-baloo2)', fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, marginBottom: 4 }}>
                Hi {displayName}! 👋
              </h1>
              {active && activeMeta && (
                <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {activeMeta.icon} <span className="font-semibold">{activeMeta.label}</span>
                  {active.lastChapterTitle ? ` — ${active.lastChapterTitle}` : hasHistory ? '' : ' — your first lesson awaits'}
                </p>
              )}
              {pendingAssessment && (
                <p className="text-xs mb-3 font-bold" style={{ color: '#fff' }}>
                  📝 You have an assessment in progress
                </p>
              )}
              <Link href={continueHref} className="w-full sm:w-auto" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <CandyButton onClick={fireConfetti} depth={3} activeDepth={1} shadowColor="rgba(0,0,0,0.2)" className="w-full sm:w-auto"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 26px', borderRadius: 14, fontSize: 14, fontWeight: 800, background: '#fff', color: 'var(--candy-purple-d)' }}>
                  {continueLabel} <ArrowRight size={16} />
                </CandyButton>
              </Link>
            </div>
          </div>
        </Card>

        {/* ═══ RECOMMENDED REVISION (Sprint BO) — suppressed when orchestrator card is shown ═══ */}
        {revision && !navigatorAction && (
          <Card style={{ padding: 18 }}>
            <SectionTitle style={{ fontSize: 13, marginBottom: 8 }}>📌 Recommended Revision</SectionTitle>
            <p className="font-bold text-sm" style={{ color: 'var(--candy-ink)' }}>{revision.chapterTitle}</p>
            <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--candy-ink-soft)' }}>
              {revision.subjectLabel} · Class {grade}
            </p>
            <Link href={`/school/${revision.subjectSlug}/chapter/${encodeURIComponent(revision.chapterId)}`} style={{ textDecoration: 'none', display: 'inline-block' }}>
              <CandyButton depth={2} activeDepth={1} shadowColor="var(--candy-shadow)"
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 800, padding: '10px 18px', borderRadius: 12, background: 'var(--candy-card)', color: 'var(--candy-red)', border: '1px solid var(--candy-red)' }}>
                Review Weak Areas <ArrowRight size={13} />
              </CandyButton>
            </Link>
          </Card>
        )}

        {/* ═══ SECTION 2 — TODAY'S GOAL ═══ */}
        <Card style={{ padding: 18 }}>
          <div className="flex items-center justify-between mb-3">
            <SectionTitle style={{ fontSize: 13, margin: 0 }}>🎯 Today&apos;s Goal</SectionTitle>
            <Pill color="var(--candy-red)" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Flame size={11} /> {streakDays}-day streak
            </Pill>
          </div>
          <ul className="space-y-2">
            <GoalItem done={studiedToday} label="Study one chapter" />
            <GoalItem done={false} label="Solve 5 practice questions" />
            <GoalItem done={false} label="Review yesterday&apos;s mistakes" />
          </ul>
        </Card>

        {/* ═══ SECTION 2b — LEARNING MOMENTUM (Sprint CD) ═══ */}
        {momentum && (
          <Card style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-2xl">🔥</span>
              <div className="min-w-0">
                <p className="text-sm font-black" style={{ color: 'var(--candy-ink)' }}>
                  {momentum.currentStreak}-day streak
                </p>
                {momentum.longestStreak > momentum.currentStreak && (
                  <p className="text-[11px]" style={{ color: 'var(--candy-ink-soft)' }}>
                    Best: {momentum.longestStreak} days
                  </p>
                )}
              </div>
            </div>
            {momentum.recentAchievement && (
              <div className="flex items-center gap-2 shrink-0 max-w-[55%]">
                <span className="text-xl">{momentum.recentAchievement.icon}</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--candy-ink-soft)' }}>Latest</p>
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--candy-ink)' }}>
                    {momentum.recentAchievement.title}
                  </p>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* ═══ SECTION 3 — MY SUBJECTS ═══ */}
        <section>
          <SectionTitle style={{ marginBottom: 12, paddingLeft: 2 }}>📚 My Subjects</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map((s) => {
              const m = SUBJECT_META[s.slug] ?? { label: s.slug, icon: '📘', color: 'var(--candy-red)', bg: 'var(--candy-red)22' }
              return (
                <Link key={s.slug} href={`/school/${s.slug}`} style={{ textDecoration: 'none' }}>
                  <Card style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 110 }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: m.bg }}>
                      {m.icon}
                    </div>
                    <p className="font-bold text-sm" style={{ color: 'var(--candy-ink)' }}>{m.label}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <ProgressBar percent={Math.min(100, Math.max(0, s.completionPercent))} height={8} borderRadius={4} fillColor={m.color} className="flex-1" animated={false} />
                      <span className="text-[11px] font-mono font-bold" style={{ color: m.color }}>{s.completionPercent}%</span>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ═══ SECTION 4 — PROGRESS SNAPSHOT ═══ */}
        <Card style={{ padding: 18 }}>
          <div className="flex items-center justify-between mb-3">
            <SectionTitle style={{ fontSize: 13, margin: 0 }}>📈 Progress</SectionTitle>
            <Pill color="var(--candy-yellow)" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--candy-ink)' }}>
              <Zap size={11} /> {xpPoints} XP
            </Pill>
          </div>
          <div className="space-y-2.5">
            {subjects.map((s) => {
              const m = SUBJECT_META[s.slug] ?? { label: s.slug, icon: '📘', color: 'var(--candy-red)', bg: 'var(--candy-red)22' }
              return (
                <div key={s.slug} className="flex items-center gap-3">
                  <span className="text-sm w-6 text-center shrink-0">{m.icon}</span>
                  <span className="text-xs font-semibold w-28 shrink-0 truncate" style={{ color: 'var(--candy-ink)' }}>{m.label}</span>
                  <ProgressBar percent={Math.min(100, Math.max(0, s.completionPercent))} height={8} borderRadius={4} fillColor={m.color} className="flex-1" animated={false} />
                  <span className="text-[11px] font-mono font-bold w-20 text-right shrink-0" style={{ color: m.color }}>
                    {s.completedCount}/{s.totalCount} · {s.completionPercent}%
                  </span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* ═══ SECTION 4b — ACADEMIC JOURNEY (Sprint CK) — chapter completion, NOT readiness ═══ */}
        {academicJourney && academicJourney.length > 0 && (
          <Card style={{ padding: 18 }}>
            <SectionTitle style={{ fontSize: 13, marginBottom: 12 }}>🗺️ Academic Journey</SectionTitle>
            <div className="space-y-2.5">
              {academicJourney.map((r) => {
                const m = SUBJECT_META[r.subjectSlug] ?? { label: r.subjectLabel, icon: '📘', color: 'var(--candy-red)', bg: 'var(--candy-red)22' }
                return (
                  <div key={r.subjectSlug} className="flex items-center gap-3">
                    <span className="text-sm w-6 text-center shrink-0">{m.icon}</span>
                    <span className="text-xs font-semibold w-28 shrink-0 truncate" style={{ color: 'var(--candy-ink)' }}>{m.label}</span>
                    <ProgressBar percent={Math.min(100, Math.max(0, r.completionPercent))} height={8} borderRadius={4} fillColor={m.color} className="flex-1" animated={false} />
                    <span className="text-[11px] font-mono font-bold w-20 text-right shrink-0" style={{ color: m.color }}>
                      {r.completedCount}/{r.totalCount} · {r.completionPercent}%
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* ═══ SECTION 5 — EXAM READINESS (Sprint CE) ═══ */}
        {examReadiness && examReadiness.length > 0 && (
          <Card style={{ padding: 18 }}>
            <SectionTitle style={{ fontSize: 13, marginBottom: 12 }}>🎓 Exam Readiness</SectionTitle>
            <div className="space-y-2.5">
              {examReadiness.map((r) => {
                const m = SUBJECT_META[r.subjectSlug] ?? { label: r.subjectLabel, icon: '📘', color: 'var(--candy-red)', bg: 'var(--candy-red)22' }
                const levelColor =
                  r.level === 'strongly_prepared' ? 'var(--candy-green)' :
                  r.level === 'exam_ready' ? 'var(--candy-blue)' :
                  r.level === 'developing' ? 'var(--candy-yellow)' :
                  'var(--candy-red)'
                return (
                  <div key={r.subjectSlug} className="flex items-center gap-3">
                    <span className="text-sm w-6 text-center shrink-0">{m.icon}</span>
                    <span className="text-xs font-semibold w-28 shrink-0 truncate" style={{ color: 'var(--candy-ink)' }}>{m.label}</span>
                    <ProgressBar percent={Math.min(100, Math.max(0, r.readinessPercent))} height={8} borderRadius={4} fillColor={levelColor} className="flex-1" animated={false} />
                    <span className="text-[11px] font-mono font-bold w-9 text-right shrink-0" style={{ color: levelColor }}>{r.readinessPercent}%</span>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* ═══ SECTION 6 — PROGRESS REPORT (Sprint CJ) ═══ */}
        <ProgressReportButton />

      </main>
    </div>
  )
}

function GoalItem({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm" style={{ color: done ? 'var(--candy-ink-soft)' : 'var(--candy-ink)' }}>
      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 font-bold"
        style={{
          background: done ? 'var(--candy-green)' : 'var(--candy-bg)',
          color: done ? '#fff' : 'var(--candy-ink-soft)',
        }}>
        {done ? '✓' : ''}
      </span>
      <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
    </li>
  )
}
