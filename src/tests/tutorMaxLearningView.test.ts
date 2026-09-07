/**
 * TUTOR MAX ACTIVE LEARNING VIEW — regression tests for the maximized
 * learner workspace, the larger/reachable lesson list, the floating Quick
 * Check MCQ, and Tutor History.
 *
 * LessonScreen.tsx has no render harness (see chatAutoScroll.test.ts,
 * lessonHistoryIsolation.test.ts, activeLessonAgreement.test.ts for the
 * established pattern this file follows): pure functions are imported and
 * exercised directly against real data; everything else is pinned with a
 * source-text assertion against the real file, anchored on unique code
 * fragments rather than "the word X appears somewhere."
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { resolveMcqHistoryResult } from '@/components/learn/LessonScreen'
import {
  computeLessonLockState, resolveActiveLesson,
  type CurriculumLesson, type CurriculumProgress,
} from '@/lib/curriculum/lessonNavigation'
import { getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'

const read = (p: string) => readFileSync(path.join(process.cwd(), p), 'utf8')
const SRC = read('src/components/learn/LessonScreen.tsx')

// Real physics KG, built exactly the way activeLessonAgreement.test.ts does —
// reused here rather than a hand-rolled fixture graph.
const graph = getKnowledgeGraph('physics')
let order = 0
const lessons = (graph?.modules ?? []).flatMap((module, modIdx) =>
  module.nodes.map((node, nodeIdx) => ({
    id: `physics-${modIdx + 1}-${nodeIdx + 1}`,
    subjectCode: 'physics',
    unit: modIdx + 1,
    unitTitle: module.title,
    lesson: nodeIdx + 1,
    lessonTitle: node.title,
    lessonGoal: node.description ?? '',
    order: ++order,
    topicSlug: node.slug,
  })),
) satisfies CurriculumLesson[]
const orderOf = (slug: string) => lessons.find((l) => l.topicSlug === slug)?.order ?? -1
const SIG_FIGS = 'phys.meas.significant-figures'
const NEWTONS_FIRST_LAW = 'phys.mech.newtons-first-law'

// ── 1. Tutor Max maximized beside the left nav — nav is never gated on
//    maximizedPanel any more ─────────────────────────────────────────────
describe('1 — left icon nav rail stays visible while a panel is maximized', () => {
  it('the nav className is unconditional, not `maximizedPanel ? \'hidden\' : ...`', () => {
    expect(SRC).not.toMatch(/<nav className=\{maximizedPanel/)
    const navIdx = SRC.indexOf('LEFT ICON NAV RAIL')
    const block = SRC.slice(navIdx, navIdx + 600)
    expect(block).toMatch(/<nav className="hidden md:flex"/)
  })
})

// ── 2. Lesson list not visible behind Tutor Max by default ──────────────
describe('2 — Tutor Max is the default Active Learning View', () => {
  it('maximizedPanel defaults to \'chat\', not null — the maximized chat/teaching panel is the resting state', () => {
    expect(SRC).toMatch(/useState<PanelName \| null>\('chat'\)/)
  })

  it('the 3-panel grid collapses to one column whenever maximizedPanel is set (including the default)', () => {
    const gridIdx = SRC.indexOf('3-PANEL GRID')
    const block = SRC.slice(gridIdx, gridIdx + 1600)
    expect(block).toMatch(/maximizedPanel \? 'grid grid-cols-1'/)
  })
})

// ── 3. Knowledge Map / Unit Overview removed from this learning experience ─
describe('3 — Knowledge Map and Unit Overview are gone from the learning view', () => {
  it('no knowledgeMapOpen state and no LearnerPositionPanel usage remain', () => {
    expect(SRC).not.toContain('knowledgeMapOpen')
    expect(SRC).not.toContain('<LearnerPositionPanel')
  })

  it('the Unit Overview nav card (expand-all-units button) is gone', () => {
    expect(SRC).not.toContain("setExpandedUnits(curriculumUnits.map((u) => u.number))")
  })
})

// ── 4. Active concept highlight must be authoritative, never stale ──────
describe('4 — lesson list "current" highlight agrees with the authoritative active lesson', () => {
  // Reproduces the exact production divergence activeLessonAgreement.test.ts
  // (SCENARIO 5) established: a stale completion counter (order 5) while the
  // lesson genuinely open is far ahead (order 18, via activeLessonSlug).
  const currentLesson = orderOf(SIG_FIGS) // = 5
  const active = NEWTONS_FIRST_LAW // = order 18

  it('fixture reproduces the divergence', () => {
    expect(currentLesson).toBe(5)
    expect(orderOf(NEWTONS_FIRST_LAW)).toBe(18)
  })

  it('computeLessonLockState fed the RAW progress (the bug) marks the STALE lesson current, not the one on screen', () => {
    const progress: CurriculumProgress = { currentLesson, completedLessons: [], activeLessonSlug: active }
    const staleLesson = lessons.find((l) => l.order === currentLesson)!
    const openLesson = lessons.find((l) => l.topicSlug === NEWTONS_FIRST_LAW)!
    const staleState = computeLessonLockState(staleLesson, { progress, topicProgressMap: {}, availableTopicSlugs: [] })
    const openState = computeLessonLockState(openLesson, { progress, topicProgressMap: {}, availableTopicSlugs: [] })
    expect(staleState.isCurrent).toBe(true)
    expect(openState.isCurrent).toBe(false)
  })

  it('overriding currentLesson with resolveActiveLesson\'s order (the fix LessonScreen applies) marks the REAL open lesson current instead', () => {
    const progress: CurriculumProgress = { currentLesson, completedLessons: [], activeLessonSlug: active }
    const currentLessonData = resolveActiveLesson(lessons, progress)
    expect(currentLessonData?.topicSlug).toBe(NEWTONS_FIRST_LAW)

    // The exact override LessonScreen.tsx's lessonListLockProgress memo builds.
    const fixedProgress: CurriculumProgress = {
      ...progress,
      currentLesson: currentLessonData?.order ?? progress.currentLesson,
    }
    const staleLesson = lessons.find((l) => l.order === currentLesson)!
    const openLesson = lessons.find((l) => l.topicSlug === NEWTONS_FIRST_LAW)!
    const staleState = computeLessonLockState(staleLesson, { progress: fixedProgress, topicProgressMap: {}, availableTopicSlugs: [] })
    const openState = computeLessonLockState(openLesson, { progress: fixedProgress, topicProgressMap: {}, availableTopicSlugs: [] })

    expect(openState.isCurrent).toBe(true)
    expect(staleState.isCurrent).toBe(false)
  })

  it('LessonScreen.tsx actually wires the override into the row-rendering call site, not just the raw progress', () => {
    expect(SRC).toContain('const lessonListLockProgress: CurriculumProgress = useMemo(')
    expect(SRC).toContain("currentLesson: currentLessonData?.order ?? curriculumProgress.currentLesson,")
    expect(SRC).toMatch(/computeLessonLockState\(lesson, \{ progress: lessonListLockProgress, topicProgressMap, availableTopicSlugs \}\)/)
    // The shared utility's OTHER call site (requestLessonSwitch's own isRestart
    // check) must be untouched — this fix is scoped to the row map only.
    expect(SRC).toMatch(/const state = computeLessonLockState\(target, ctx\)/)
  })
})

// ── 5/6. Every authored MCQ renders only in the floating Quick Check panel,
//    and stays interactive/pending until answered ───────────────────────
describe('5/6 — MCQ renders only as a floating Quick Check, never an ordinary chat bubble', () => {
  it('the MCQ block uses the floating quickCheckFloating class, gated on activeMcq and not streaming/completed', () => {
    expect(SRC).toMatch(/\{activeMcq && !isStreaming && !lessonCompletion && \(/)
    const idx = SRC.indexOf('{activeMcq && !isStreaming && !lessonCompletion && (')
    const block = SRC.slice(idx, idx + 1200)
    expect(block).toContain('className={styles.quickCheckFloating}')
    expect(block).toContain("t('lc_quick_check_label')")
  })

  it('the CSS class is a floating overlay (absolute-positioned), not inline chat flow', () => {
    const css = read('src/components/learn/LessonScreen.module.css')
    const idx = css.indexOf('.quickCheckFloating {')
    const block = css.slice(idx, idx + 300)
    expect(block).toContain('position: absolute')
  })

  it('tapping an option still routes through the same sendMessage path used for typed answers — one answer channel, server remains authoritative', () => {
    const idx = SRC.indexOf("{activeMcq.options.map((option, i) => (")
    const block = SRC.slice(idx, idx + 2400)
    expect(block).toContain('void sendMessage(sessionId, option)')
    // Clears the question (single active MCQ) before the request goes out.
    expect(block).toContain('setActiveMcq(null)')
  })
})

// ── 7. Tutor History reflects the authoritative event, never fabricated ──
describe('7 — resolveMcqHistoryResult (Tutor History grading signal)', () => {
  it('is the ONLY honest client-observable signal: the answer key is never sent, so correctness is derived from the server\'s own mastery counters moving', () => {
    expect(resolveMcqHistoryResult(0, 1, 0)).toBe('correct')
    expect(resolveMcqHistoryResult(2, 2, 1)).toBe('correct') // practice count moved
    expect(resolveMcqHistoryResult(2, 2, 0)).toBe('not-counted') // neither moved
    expect(resolveMcqHistoryResult(null, 1, 0)).toBe('correct') // no prior baseline treated as 0
    expect(resolveMcqHistoryResult(3, undefined, undefined)).toBe('not-counted') // no mastery block at all in the response
  })

  it('a decrease (should not happen, but must not be misreported as correct) is not-counted', () => {
    expect(resolveMcqHistoryResult(5, 1, 1)).toBe('not-counted')
  })
})

describe('7b — the MCQ tap and its response are wired to the SAME history entry (baseline capture + resolution)', () => {
  it('the tap handler snapshots the pre-answer mastery total as the baseline before sending', () => {
    const idx = SRC.indexOf("{activeMcq.options.map((option, i) => (")
    const block = SRC.slice(idx, idx + 2400)
    expect(block).toMatch(/pendingMcqMasteryBaselineRef\.current =\s*\n\s*\(masteryState\?\.checkCorrect \?\? 0\) \+ \(masteryState\?\.practiceCorrect \?\? 0\)/)
    expect(block).toContain("result: 'pending'")
  })

  it('the response handler resolves the pending entry using resolveMcqHistoryResult against the SAME server mastery fields', () => {
    const idx = SRC.indexOf('if (pendingMcqMasteryBaselineRef.current !== null) {')
    const block = SRC.slice(idx, idx + 500)
    expect(block).toContain('resolveMcqHistoryResult(baseline, data.mastery?.checkCorrect, data.mastery?.practiceCorrect)')
  })
})

// ── 8/9/10. History hide/show; hiding expands Tutor Max; no duplicates ───
describe('8/9/10 — Tutor History panel: hide/show, expands Tutor Max when hidden, never duplicates an entry', () => {
  it('a persistent toggle button controls mcqHistoryOpen, defaulting closed', () => {
    expect(SRC).toMatch(/const \[mcqHistoryOpen, setMcqHistoryOpen\] = useState\(false\)/)
    expect(SRC).toMatch(/onClick=\{\(\) => setMcqHistoryOpen\(\(v\) => !v\)\}/)
  })

  it('the entry list only exists in the DOM while open (unmounted, not just visually collapsed) — closing hands its space back to the flex:1 conversation area above with no manual resize logic', () => {
    // The panel's own JSX comment — the LAST of several "TUTOR HISTORY"
    // comments in this file (the others annotate the state declarations and
    // the response-handler resolution logic exercised above).
    const idx = SRC.lastIndexOf('TUTOR HISTORY')
    const block = SRC.slice(idx, idx + 3200)
    expect(block).toMatch(/\{mcqHistoryOpen && \(/)
    // The toggle row itself is flexShrink:0 and OUTSIDE the conditional, so
    // "Show" is always reachable even while the list is unmounted.
    expect(block.indexOf('setMcqHistoryOpen((v) => !v)')).toBeLessThan(block.indexOf('{mcqHistoryOpen && ('))
  })

  it('history entries are pushed once per tap and resolved in place — never re-pushed for the same answer', () => {
    // The response handler updates the existing pending row by index; it
    // never calls setMcqHistoryLog with an appended entry.
    const idx = SRC.indexOf('if (pendingMcqMasteryBaselineRef.current !== null) {')
    const block = SRC.slice(idx, idx + 700)
    expect(block).toContain('const idx = prev.findIndex((e) => e.result === \'pending\')')
    expect(block).toContain('next[idx] = { ...next[idx], result }')
    expect(block).not.toContain('...prev, {')
  })
})

// ── 11. Existing server-authoritative grading/mastery/lifecycle untouched ─
describe('11 — server remains authoritative; nothing here invents correctness or mastery', () => {
  it('resolveMcqHistoryResult never reads anything but the server mastery counters passed to it — no correctIndex, no client-side answer key', () => {
    const idx = SRC.indexOf('export function resolveMcqHistoryResult(')
    const end = SRC.indexOf('\n}', idx)
    const body = SRC.slice(idx, end)
    expect(body).not.toMatch(/correctIndex/)
    expect(body).not.toMatch(/isCorrect/)
  })

  it('the Quick Check tap handler does not call setMasteryState or otherwise fabricate a grade — it only sends the answer and records a PENDING history row', () => {
    const idx = SRC.indexOf("{activeMcq.options.map((option, i) => (")
    const block = SRC.slice(idx, idx + 2400)
    expect(block).not.toContain('setMasteryState')
  })
})
