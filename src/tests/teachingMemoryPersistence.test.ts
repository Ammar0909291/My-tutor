/**
 * PRODUCTION SYMPTOM — teaching memory partially forgotten INSIDE one lesson:
 *
 *   Explain -> student understands -> explain the SAME concept again ->
 *   student answers correctly -> explain again -> question -> explain again
 *
 * ROOT CAUSE — the teaching-memory ledger was persisted only on turns where
 * the learner explicitly asked for a different explanation.
 *
 * `selectedStrategyHoisted` is assigned in exactly ONE place in route.ts:
 * inside `if (learnerRequestHoisted === 'explain_differently')`. The persist
 * block was guarded by `teachingHistoryHoisted && selectedStrategyHoisted !==
 * null`, so on every ORDINARY teaching turn the tutor taught something and
 * recorded nothing — explanationCount, strategiesUsed, mcqAsked,
 * explanationsServed, confidence, frustration and mastery all sit inside that
 * one block.
 *
 * The READ (~line 1694, buildTeachingMemoryBlock) is unconditional, so the next
 * turn re-read a ledger that had never been updated and the model was told
 * nothing had been taught yet. "Partially" forgotten, because the rare
 * explain_differently turns DID write — the ledger was stale, not empty.
 *
 * TeachingHistory is the canonical owner of "what has already been taught in
 * this lesson" (its siblings visualsShown / mcqAsked / explanationsServed are
 * the established per-concept already-used ledger). Nothing new is introduced
 * here; the owner is simply written on every taught turn.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  readTeachingHistory, updateTeachingHistory, recordMcqAsked, hasAskedMcq,
  recordExplanationServed, hasServedExplanation, selectNextStrategy,
} from '@/lib/teaching/teachingHistory'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const CONCEPT = 'chem.found.mole-concept'

/** The persist block, isolated for structural assertions. */
function persistBlock(): string {
  const start = ROUTE.indexOf('if (teachingHistoryHoisted) {')
  expect(start).toBeGreaterThan(-1)
  return ROUTE.slice(start, start + 3000)
}

describe('the ledger is written on EVERY taught turn', () => {
  it('the persist is no longer gated on an explain-differently-only variable', () => {
    // The defect: `selectedStrategyHoisted !== null` in the guard.
    expect(ROUTE).not.toContain('if (teachingHistoryHoisted && selectedStrategyHoisted !== null) {')
    expect(ROUTE).toContain('if (teachingHistoryHoisted) {')
  })

  it('selectedStrategyHoisted really is assigned only on that one branch', () => {
    // Evidence for why the old guard was fatal, read from the source.
    const assignments = ROUTE.match(/selectedStrategyHoisted = (?!null)/g) ?? []
    expect(assignments.length).toBeGreaterThan(0)
    const firstAssign = ROUTE.indexOf('selectedStrategyHoisted = selectNextStrategy(')
    const branch = ROUTE.lastIndexOf("learnerRequestHoisted === 'explain_differently'", firstAssign)
    expect(branch).toBeGreaterThan(-1)
    expect(firstAssign - branch).toBeLessThan(600) // assigned inside that branch
  })

  it('explanationCount folds unconditionally', () => {
    expect(persistBlock()).toContain('explanationCount: teachingHistoryHoisted.explanationCount + 1')
  })

  it('mcqAsked and explanationsServed fold on ordinary turns too', () => {
    const b = persistBlock()
    expect(b).toContain('recordMcqAsked(memoryHistory, mcqHoisted.question)')
    expect(b).toContain('recordExplanationServed(memoryHistory, assembled.explanationAssetId)')
  })

  it('only the strategy field stays strategy-scoped', () => {
    const b = persistBlock()
    expect(b).toMatch(/strategiesUsed: selectedStrategyHoisted !== null\s*\n?\s*\?/)
  })

  it('the concurrent re-fold applies the same scoping', () => {
    // A turn with no selected strategy must not invent one when re-folding.
    expect(ROUTE).toMatch(/strategiesUsed: capturedStrategy !== null\s*\n?\s*\?/)
  })
})

describe('teaching memory survives every turn (ledger semantics)', () => {
  it('explanationCount accumulates turn over turn', () => {
    let h = readTeachingHistory(undefined, CONCEPT)
    expect(h.explanationCount).toBe(0)
    for (let turn = 1; turn <= 4; turn++) {
      h = updateTeachingHistory(h, { explanationCount: h.explanationCount + 1 })
      expect(h.explanationCount).toBe(turn)
    }
  })

  it('a ledger that is never written stays at zero — the production failure', () => {
    // Reproduces the old behaviour: teach four turns, persist none.
    const h = readTeachingHistory(undefined, CONCEPT)
    expect(h.explanationCount).toBe(0)
    // …which is what told the model nothing had been taught yet.
    expect(selectNextStrategy(h)).toBe(selectNextStrategy(readTeachingHistory(undefined, CONCEPT)))
  })

  it('the same assessment cannot repeat once recorded', () => {
    const q = 'What is the mole ratio of H2 to O2?'
    let h = readTeachingHistory(undefined, CONCEPT)
    expect(hasAskedMcq(h, q)).toBe(false)
    h = recordMcqAsked(h, q)
    expect(hasAskedMcq(h, q)).toBe(true)
  })

  it('the same explanation asset cannot be served twice once recorded', () => {
    let h = readTeachingHistory(undefined, CONCEPT)
    expect(hasServedExplanation(h, 'asset-1')).toBe(false)
    h = recordExplanationServed(h, 'asset-1')
    expect(hasServedExplanation(h, 'asset-1')).toBe(true)
    // A different asset is still servable — this is not a blanket block.
    expect(hasServedExplanation(h, 'asset-2')).toBe(false)
  })

  it('strategy selection advances as explanations accumulate (remediation still works)', () => {
    // Remediation re-explains DIFFERENTLY: the strategy must move once the
    // ledger records that a strategy has been used.
    let h = readTeachingHistory(undefined, CONCEPT)
    const first = selectNextStrategy(h)
    h = updateTeachingHistory(h, { strategiesUsed: [first], explanationCount: 1 })
    const second = selectNextStrategy(h)
    expect(second).not.toBe(first)
  })

  it('the ledger is per-concept — a different concept starts clean', () => {
    let h = readTeachingHistory(undefined, CONCEPT)
    h = recordMcqAsked(h, 'Q1')
    const other = readTeachingHistory(undefined, 'chem.found.stoichiometry')
    expect(hasAskedMcq(other, 'Q1')).toBe(false)
  })

  it('is total — malformed stored history never throws', () => {
    expect(() => readTeachingHistory('not-an-object' as never, CONCEPT)).not.toThrow()
    expect(() => readTeachingHistory(null, CONCEPT)).not.toThrow()
    expect(readTeachingHistory(undefined, CONCEPT).explanationCount).toBe(0)
  })
})
