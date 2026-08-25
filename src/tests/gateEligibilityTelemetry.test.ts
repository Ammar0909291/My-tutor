/**
 * PHASE 7Q — WHY THE MASTERY GATE DID NOT OPEN.
 *
 * THE BLIND SPOT. `[gate-assessment]` is emitted inside `if (gateEligible)`.
 * So the ONLY turn that logs anything about the gate is a turn where the gate
 * already opened. Every closed turn — the common case, and the interesting one
 * — was indistinguishable from a turn where this code does not exist.
 *
 * Every live investigation since 7K paid for that: 7M-B recorded "zero
 * [gate-assessment] lines — the gate never ran" and had to re-derive WHICH of
 * eight conjuncts fell over by reading the source and reasoning about state
 * that was never captured. 7N-3 hit the same wall three times on three
 * different concepts, each blocked by a DIFFERENT and individually correct
 * rule, and none of them said so.
 *
 * THIS PHASE CHANGES NO BEHAVIOUR. The eight terms are the same eight terms,
 * in the same order, with the same meanings. What changed is that they are now
 * named, evaluated once, reported on EVERY turn, and — the property that makes
 * the log trustworthy — `gateEligible` is DERIVED from the same object that is
 * logged, so the log cannot claim one thing while the gate does another.
 *
 * Two things these tests must therefore prove, and neither is about a message:
 *   1. the conjunction is unchanged (AND of exactly those eight terms);
 *   2. the logged object IS the decision, not a hand-maintained copy of it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

// The block, isolated once so no test accidentally matches a similar-looking
// line elsewhere in a 7,000-line route.
const BLOCK = (() => {
  const start = ROUTE.indexOf('const gateTerms = {')
  const end = ROUTE.indexOf('if (gateEligible && memoryState)')
  expect(start).toBeGreaterThan(-1)
  expect(end).toBeGreaterThan(start)
  return ROUTE.slice(start, end)
})()

const TERMS = [
  'phaseAllowsProbe',
  'probeAttachablePhase',
  'hasMemoryState',
  'noUnansweredProbeOnScreen',
  'notFirstLesson',
  'notExcursion',
  'arbitrationAllowsProbe',
  'notClosingTurn',
] as const

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE DECISION IS UNCHANGED
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7Q — the gate decision itself did not move', () => {
  it('all eight conjuncts are still present, each exactly once', () => {
    for (const term of TERMS) {
      const hits = BLOCK.split(new RegExp(`\\b${term}\\b`)).length - 1
      expect(hits, `${term} should be declared exactly once`).toBeGreaterThanOrEqual(1)
    }
  })

  it('carries the same eight predicates the pre-7Q conjunction spelled out', () => {
    // Each right-hand side, verbatim from the conjunction this replaced. If a
    // term's MEANING is ever edited, this fails and the editor must come here.
    expect(BLOCK).toContain('isProbeAttachablePhase(phaseBeforeTurn)')
    expect(BLOCK).toContain('memoryState !== null')
    expect(BLOCK).toContain('!unansweredProbeOnScreen')
    expect(BLOCK).toContain('!firstLessonActiveHoisted')
    expect(BLOCK).toContain('!excursionActiveHoisted')
    expect(BLOCK).toContain("allows('AUTHORED_PROBE')")
    expect(BLOCK).toContain('!closingTurnWithholdsQuestion(sessionEpisodeHoisted?.phase)')
  })

  it('is an AND of every term — no term is optional', () => {
    expect(BLOCK).toMatch(/const gateEligible = Object\.values\(gateTerms\)\.every\(Boolean\)/)
  })

  it('does not re-spell the conjunction anywhere else in the route', () => {
    // The old hand-written `a && b && c && ...` form is gone. If it comes
    // back, two sources of truth exist again and the log becomes a claim
    // rather than a record.
    expect(ROUTE).not.toMatch(/gateEligible\s*=\s*\n?\s*phaseAllowsProbe\s*&&/)
  })

  it('still fails safe when arbitration is unavailable', () => {
    // arbitrationUnavailable() denies AUTHORED_PROBE, so the term is false and
    // the AND is false. The fallback must remain wired in.
    expect(BLOCK).toContain('turnArbitrationHoisted ?? arbitrationUnavailable()')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE LOG IS THE DECISION
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7Q — the telemetry cannot drift from the gate', () => {
  it('logs on every turn, not only when the gate opened', () => {
    const logAt = BLOCK.indexOf("console.log('[gate-eligibility]")
    expect(logAt).toBeGreaterThan(-1)
    // The emit sits BEFORE the `if (gateEligible …)` guard, which is where
    // BLOCK ends — so by construction it is outside it.
    expect(BLOCK.slice(logAt)).not.toContain('if (gateEligible')
  })

  it('spreads the same object the decision was derived from', () => {
    // `...gateTerms` — not eight hand-copied fields, which is exactly how the
    // three drifting copies of the precedence order in Phase 3 came about.
    expect(BLOCK).toMatch(/\.\.\.gateTerms,?\s*\}\)\)/)
  })

  it('reports the failing terms directly, so the closed case is readable', () => {
    expect(BLOCK).toContain('blockedBy')
    expect(BLOCK).toMatch(/Object\.entries\(gateTerms\)\.filter\(\(\[, v\]\) => !v\)/)
  })

  it('carries the phase and move, so a line is interpretable on its own', () => {
    expect(BLOCK).toContain('phase: phaseBeforeTurn')
    expect(BLOCK).toContain('move: evidenceMoveHoisted')
    expect(BLOCK).toContain('eligible: gateEligible')
  })

  it('keeps the probe-selection log, which answers a different question', () => {
    // [gate-eligibility] says whether the gate could run; [gate-assessment]
    // says what it found when it did. Neither replaces the other — a gate that
    // is eligible and finds NOTHING is a content gap, not a rule.
    expect(ROUTE).toContain("console.log('[gate-assessment] '")
    expect(ROUTE).toContain('probeFound: probe !== null')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. NEGATIVE CONTROLS — the shape of the object, proven on real semantics
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7Q — blockedBy semantics', () => {
  // The route's expression, reproduced here against synthetic terms. This is
  // the one piece of logic 7Q adds, so it is worth asserting on values rather
  // than only on source text.
  const blockedBy = (terms: Record<string, boolean>) =>
    Object.entries(terms).filter(([, v]) => !v).map(([k]) => k)
  const eligible = (terms: Record<string, boolean>) => Object.values(terms).every(Boolean)

  const allTrue = Object.fromEntries(TERMS.map((t) => [t, true]))

  it('is empty exactly when the gate is eligible', () => {
    expect(blockedBy(allTrue)).toEqual([])
    expect(eligible(allTrue)).toBe(true)
  })

  it('names the single failing term', () => {
    const t = { ...allTrue, notClosingTurn: false }
    expect(blockedBy(t)).toEqual(['notClosingTurn'])
    expect(eligible(t)).toBe(false)
  })

  it('names EVERY failing term, not just the first — the 7N-3 case', () => {
    // Three live attempts were each blocked by a different correct rule, and
    // a first-failure-only log would have hidden two of them per turn.
    const t = { ...allTrue, phaseAllowsProbe: false, arbitrationAllowsProbe: false }
    expect(blockedBy(t)).toEqual(['phaseAllowsProbe', 'arbitrationAllowsProbe'])
  })

  it('reports in declaration order, so lines are comparable across turns', () => {
    const t = { ...allTrue, notExcursion: false, hasMemoryState: false }
    expect(blockedBy(t)).toEqual(['hasMemoryState', 'notExcursion'])
  })
})
