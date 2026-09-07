/**
 * THE 'K' COLLISION — a verbatim-correct answer must never be swallowed by
 * the bare-acknowledgement guard.
 *
 * ── THE DEFECT (chem.bio.vitamins Tier-A certification, 2026-09-07) ────────
 * The authored probe "The four fat-soluble vitamins are conventionally
 * listed as A, D, E and ______." has the literal correct option "K".
 * `masteryGate.ACK_PHRASES` contains 'k' (chat-speak for "okay"), so
 * `isBareAcknowledgement("K")` returns true. route.ts's grading guard —
 * `if (!isBareAcknowledgement(message) && !turnIntent.wantsPractice) { ...
 * gradeMcqAnswer(...) }` — skipped calling `gradeMcqAnswer` ENTIRELY for
 * every "K" reply, so `chosenIndex`/`correct` never had a chance to
 * resolve. Reproduced deterministically on the live deployed app: served
 * options logged raw as `["K","C","B12","B6"]`, "K" submitted verbatim,
 * `chosen: null, correct: null` on every single attempt. The probe could
 * never be answered, so the concept could never reach CHECK/PRACTICE
 * credit through it. Any authored option whose text happens to equal an
 * ACK_PHRASES entry ('ok','yes','done','next','good','great','cool',
 * 'fine','sure','continue','go','thanks', 'k', …) is affected identically,
 * for any concept.
 *
 * ── THE FIX (mcq.ts + route.ts) ──────────────────────────────────────────
 * `isVerbatimPendingOption` carves out the ONE case that must always reach
 * `gradeMcqAnswer`: the message, trimmed and case-folded, equals one of the
 * pending question's own options byte-for-byte — the same "tapping an
 * option sends its text verbatim" signal `resolveMcqChoice`'s own rule 0
 * already treats as the strongest, least ambiguous evidence there is. The
 * acknowledgement guard was built for the WEAKER inference rules (1-5) and
 * must never suppress that signal. route.ts's guard becomes
 * `!isBareAcknowledgement(message) || isVerbatimPendingOption(message, pendingMcqHoisted)`.
 *
 * ── WHAT MUST NOT REGRESS (Phase 7P, 2026-08-25) ────────────────────────
 * "one more please" (a genuine practice request, NOT an exact option match)
 * must stay suppressed exactly as before — the fix only exempts a
 * byte-for-byte option match, never a fuzzy or partial one.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gradeMcqAnswer, isVerbatimPendingOption, type TutorMCQ } from '@/lib/teaching/mcq'
import { isBareAcknowledgement } from '@/lib/teaching/masteryGate'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

const VITAMIN_K_MCQ: TutorMCQ = {
  question: 'The four fat-soluble vitamins are conventionally listed as A, D, E and ______.',
  options: ['K', 'C', 'B12', 'B6'],
  correctIndex: 0,
  assetId: '6f906078-03ee-419f-b75f-4dca2ce0725e',
}

/** The exact guard added to route.ts, mirrored against the real predicates. */
function gradingIsAttempted(message: string, pendingMcq: TutorMCQ | null, wantsPractice: boolean): boolean {
  if (!pendingMcq) return false
  return (!isBareAcknowledgement(message) || isVerbatimPendingOption(message, pendingMcq)) && !wantsPractice
}

describe('THE FIX — a verbatim-correct reply that collides with an acknowledgement phrase is graded', () => {
  it('reproduces the exact production failure and proves it is fixed', () => {
    // Pre-fix: this was the observed defect.
    expect(isBareAcknowledgement('K')).toBe(true)
    // Post-fix: the exact-option-match carve-out overrides the ack guard.
    expect(gradingIsAttempted('K', VITAMIN_K_MCQ, false)).toBe(true)
    const g = gradeMcqAnswer('K', VITAMIN_K_MCQ)
    expect(g.chosenIndex).toBe(0)
    expect(g.correct).toBe(true)
  })

  it('is case- and whitespace-insensitive, matching how a tap could arrive', () => {
    expect(isVerbatimPendingOption('k', VITAMIN_K_MCQ)).toBe(true)
    expect(isVerbatimPendingOption(' K ', VITAMIN_K_MCQ)).toBe(true)
    expect(isVerbatimPendingOption('K', VITAMIN_K_MCQ)).toBe(true)
  })

  it('a WRONG option that also collides with an ack phrase is graded (and graded wrong)', () => {
    // 'ok'/'done'/'good'/etc. are all ACK_PHRASES; construct a probe where a
    // wrong distractor is exactly 'ok' to prove this isn't correctness-biased.
    const mcq: TutorMCQ = { question: 'x', options: ['ok', 'not ok'], correctIndex: 1 }
    expect(isBareAcknowledgement('ok')).toBe(true)
    expect(gradingIsAttempted('ok', mcq, false)).toBe(true)
    const g = gradeMcqAnswer('ok', mcq)
    expect(g.chosenIndex).toBe(0)
    expect(g.correct).toBe(false)
  })

  it('every other Vitamins probe option ("C", "B12", "B6") still grades normally', () => {
    for (const opt of ['C', 'B12', 'B6']) {
      const g = gradeMcqAnswer(opt, VITAMIN_K_MCQ)
      expect(g.chosenIndex).not.toBeNull()
      expect(g.correct).toBe(false)
    }
  })
})

describe('WHAT MUST NOT REGRESS — Phase 7P (2026-08-25) stays intact', () => {
  const PHYS_MCQ: TutorMCQ = {
    question: 'Which of the following is true when light travels from a denser to a less dense medium?',
    options: ['It bends toward the normal', 'It bends away from the normal'],
    correctIndex: 1,
  }

  it('"one more please" is not a verbatim option and stays suppressed', () => {
    expect(isVerbatimPendingOption('one more please', PHYS_MCQ)).toBe(false)
    expect(isBareAcknowledgement('one more please')).toBe(false) // not an ack either — reaches the guard for a different reason
  })

  it('a genuine bare acknowledgement with no option collision is still suppressed', () => {
    expect(gradingIsAttempted('thanks', PHYS_MCQ, false)).toBe(false)
    expect(gradingIsAttempted('got it', PHYS_MCQ, false)).toBe(false)
  })

  it('a null pending MCQ never triggers the carve-out', () => {
    expect(isVerbatimPendingOption('K', null)).toBe(false)
  })

  it('an empty message never triggers the carve-out', () => {
    expect(isVerbatimPendingOption('', VITAMIN_K_MCQ)).toBe(false)
    expect(isVerbatimPendingOption('   ', VITAMIN_K_MCQ)).toBe(false)
  })

  it('wantsPractice still overrides regardless of an option collision', () => {
    expect(gradingIsAttempted('K', VITAMIN_K_MCQ, true)).toBe(false)
  })
})

describe('route wiring — the carve-out is actually present, in the right place', () => {
  it('the guard imports isVerbatimPendingOption and uses it in the OR branch', () => {
    expect(ROUTE).toContain("const { gradeMcqAnswer, isVerbatimPendingOption } = await import('@/lib/teaching/mcq')")
    const idx = ROUTE.indexOf('isVerbatimPendingOption(message, pendingMcqHoisted)')
    expect(idx).toBeGreaterThan(-1)
    const block = ROUTE.slice(Math.max(0, idx - 300), idx + 100)
    expect(block).toMatch(/!isBareAcknowledgement\(message\)\s*\|\|\s*isVerbatimPendingOption\(message,\s*pendingMcqHoisted\)/)
  })

  it('the guard still requires !turnIntent.wantsPractice', () => {
    const idx = ROUTE.indexOf('isVerbatimPendingOption(message, pendingMcqHoisted)')
    const block = ROUTE.slice(idx, idx + 200)
    expect(block).toContain('!turnIntent.wantsPractice')
  })
})
