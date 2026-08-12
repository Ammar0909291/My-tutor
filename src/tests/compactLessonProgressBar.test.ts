import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { buildLessonProgress, LESSON_STAGES } from '@/lib/teaching/lessonProgress'

/**
 * THE COMPACT 6-BAR HEADER INDICATOR WAS INVISIBLE IN PRODUCTION.
 *
 * ── VERIFIED AGAINST THE LIVE APP (screenshot evidence, 2026-08-12) ─────────
 * The Tutor Max header showed "Got it / Not clear", proving an assistant
 * message had already loaded — but no 6-bar indicator appeared before it.
 *
 * ── ROOT CAUSE, TRACED LessonScreen → CompactLessonProgressBar ──────────────
 * `CompactLessonProgressBar` (LessonProgressBar.tsx) is driven entirely by
 * `masteryState?.phase`, and correctly renders null when
 * `buildLessonProgress` has no trustworthy phase (this is intentional — see
 * lessonProgress.test.ts's "renders nothing before the lesson starts" case,
 * left UNCHANGED here).
 *
 * `masteryState` is set in exactly one place in the ordinary chat flow: the
 * `if (data.mastery)` handler fed by `/api/learn/chat`'s response. But every
 * NORMAL way a learner reaches a lesson — opening it, restarting it,
 * reviewing it, resuming it, advancing to the next one — goes through
 * `callLessonInit()`, which calls `/api/learn/lesson-init` instead.  That
 * route is DELIBERATELY minimal (its own file header: "does NOT replicate
 * the full route.ts system prompt pipeline (mastery gate, evidence blocks,
 * ...)") and its response is `{ success, text, provider }` — no `mastery`
 * field, ever. `callLessonInit` never called `setMasteryState` at all, so:
 *   - on first entry, masteryState stayed null forever until the learner's
 *     first real chat turn -> the bar was invisible exactly when the
 *     screenshot was taken.
 *   - on restart/review/next, masteryState kept the PREVIOUS lesson's phase
 *     (never reset) -> a second, milder bug: stale progress from a lesson
 *     that had just reopened at its start.
 *
 * ── THE FIX ──────────────────────────────────────────────────────────────
 * `callLessonInit`'s success handler now also seeds
 * `setMasteryState({ verified: false, gatePending: false, phase: 'OBSERVE' })`.
 * This is not a second progress state: 'OBSERVE' is the exact value
 * `initialConversationState()` (conversationState.ts) assigns a fresh or
 * unresolved concept, so the client is seeding the same default the server
 * itself would produce, not inventing one. The real server-authoritative
 * phase overwrites it on the very next turn that reaches
 * `/api/learn/chat` — which is every "Got it" / "Not clear" tap or typed
 * reply — via the pre-existing `if (data.mastery)` handler.
 *
 * ── WHY THIS TEST IS A SOURCE ASSERTION ─────────────────────────────────────
 * LessonScreen.tsx has no React-render test harness in this repo (no
 * @testing-library/react anywhere in src/tests/) — the established pattern
 * for client-only logic that needs a browser DOM is a source assertion
 * against the file, exactly as `completedLessonIsReEnterable.test.ts` does
 * for this same file's `callLessonInit`. The presentational bar math itself
 * (6 bars, past/current/reached mapping) IS pure-function-testable and is
 * covered below without any source-text matching.
 */
const SCREEN = path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx')
const screenSrc = readFileSync(SCREEN, 'utf8')

describe('lesson-init seeds a deterministic phase (the missing-bar fix)', () => {
  it('calls setMasteryState with phase OBSERVE after a successful lesson-init response', () => {
    // Must appear after the success/throw guard, so a failed lesson-init
    // never fabricates progress for content that didn't load.
    const guardLine = screenSrc.split('\n').findIndex((l) =>
      /if \(!res\.ok \|\| !data\.success \|\| !data\.text\) throw new Error/.test(l))
    const seedLine = screenSrc.split('\n').findIndex((l) =>
      /setMasteryState\(\{ verified: false, gatePending: false, phase: 'OBSERVE' \}\)/.test(l))
    expect(guardLine).toBeGreaterThan(-1)
    expect(seedLine).toBeGreaterThan(guardLine)
  })

  it('the seeded value uses a real ProgressPhase, not an invented one', () => {
    // Directly ties the seeded literal to the same phase the presentational
    // layer already knows how to render — if 'OBSERVE' were ever renamed in
    // lessonProgress.ts, buildLessonProgress would reject it and this
    // assertion (not a UI screenshot) is what would catch the drift.
    expect(buildLessonProgress('OBSERVE')).not.toBeNull()
  })
})

/**
 * ── PRESENTATIONAL BAR LOGIC (pure, no DOM needed) ──────────────────────────
 * Mirrors CompactLessonProgressBar's exact reached/past classification
 * (LessonProgressBar.tsx): a bar is "reached" (solid) once its stage index
 * is at-or-before the current stage, or the lesson is mastery-verified; a
 * bar is "current" only at the exact stage and only pre-verification.
 */
function barStates(phase: string | undefined, masteryVerified: boolean) {
  const progress = buildLessonProgress(phase, masteryVerified)
  if (!progress) return null
  return LESSON_STAGES.map((stage, i) => {
    const past = progress.complete || i < progress.stageIndex
    const current = !progress.complete && i === progress.stageIndex
    return { phase: stage.phase, reached: past || current, current }
  })
}

describe('CompactLessonProgressBar — bar count and completion mapping', () => {
  it('renders exactly 6 bars for every real phase', () => {
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER']) {
      const states = barStates(phase, false)
      expect(states).not.toBeNull()
      expect(states).toHaveLength(6)
    }
  })

  it('renders nothing (null) when there is no trustworthy phase — unchanged, intentional', () => {
    expect(barStates(undefined, false)).toBeNull()
    expect(barStates('NOT_A_PHASE', false)).toBeNull()
  })

  it('at OBSERVE (post lesson-init seed): only bar 1 is reached, none past', () => {
    const states = barStates('OBSERVE', false)!
    expect(states.map((s) => s.reached)).toEqual([true, false, false, false, false, false])
    expect(states.map((s) => s.current)).toEqual([true, false, false, false, false, false])
  })

  it('mid-lesson (CHECK): stages 1-3 solid/past, stage 4 current, 5-6 empty', () => {
    const states = barStates('CHECK', false)!
    expect(states.map((s) => s.reached)).toEqual([true, true, true, true, false, false])
    expect(states.filter((s) => s.current).map((s) => s.phase)).toEqual(['CHECK'])
  })

  it('mastery-verified lights every bar regardless of nominal phase', () => {
    const states = barStates('CHECK', true)!
    expect(states.every((s) => s.reached)).toBe(true)
    expect(states.every((s) => !s.current)).toBe(true)
  })
})
