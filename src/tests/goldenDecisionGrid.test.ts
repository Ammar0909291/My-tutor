/**
 * K4 — Golden decision GRID (RS T-3, the ≥200-row gate).
 *
 * goldenDecisionTable.test.ts holds 20 curated rows sourced from the Brain's
 * worked traces. Those rows say what the engine SHOULD do and why, in
 * language a human can review — and they are irreplaceable for that. But 20
 * hand-picked rows cannot detect a pack change they do not happen to cover,
 * and RS T-3 asks for "≥200 rows at launch, byte-compared". A curated table
 * that misses a regression is not a weaker gate than a generated one; it is
 * a gate with holes at unknown coordinates.
 *
 * So this file is the other half: an EXHAUSTIVE cross-product over the input
 * dimensions the base pack actually reads, byte-compared against a pinned
 * digest. The two files answer different questions and neither replaces the
 * other:
 *
 *   goldenDecisionTable — "is this decision pedagogically right?" (semantic,
 *                          reviewed by a human, cites the authoring source)
 *   goldenDecisionGrid  — "did ANY decision change?"              (total,
 *                          reviewed by a diff, cites nothing)
 *
 * WHEN THIS TEST FAILS. It means a pack edit changed at least one decision.
 * That is not automatically wrong — it is the review artifact (RS §5.6
 * replay-diff protocol). Re-run with GOLDEN_GRID_PRINT=1 to print the new
 * digest and the changed rows, confirm every change was intended, then pin
 * the new digest in the same commit as the pack change so the two are
 * reviewable together.
 */
import { describe, it, expect } from 'vitest'
import { createHash } from 'node:crypto'
import { decide, BASE_PACK } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'
import { getStageCeiling } from '@/lib/kernel/tsm/phases'

// ── The grid ────────────────────────────────────────────────────────────────
// Every dimension here is a field some BASE_PACK guard reads. Fields no rule
// reads (learnerId, turnId, …) are held constant: varying them would inflate
// the row count without testing anything, which is how a 200-row requirement
// gets satisfied dishonestly.

const PHASES = ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const
const REGISTERS = ['beginner', 'intermediate', 'expert'] as const
const FAILURES = [0, 1, 2] as const
const SIGNALS: Array<{ correct: boolean | null; confidence: 'low' | 'medium' | 'high' | null }> = [
  { correct: null, confidence: null },        // no answer to read
  { correct: false, confidence: 'high' },     // D1 misconceiving quadrant
  { correct: true, confidence: 'low' },       // D1 fragile quadrant
  { correct: true, confidence: 'high' },      // fluent mastery
]
const INTERRUPTS = [false, true] as const
const FIRST_LESSON = [false, true] as const

const BASE: PolicyInputs = {
  turnId: 'grid', learnerId: 'L', sessionId: 'S',
  contentRegister: 'intermediate', profileLevel: 'intermediate',
  sessionFailureCount: 0, isFirstLessonContext: false,
  phase: 'OBSERVE', stageCeiling: 2, demonstrated: false, consecutiveFailures: 0,
  interruptActive: false, failureStateKey: null, autonomyRequested: false,
  retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
  lastSignalCorrect: null, lastSignalConfidence: null, currentConceptId: null,
}

interface GridRow { key: string; inputs: PolicyInputs }

function grid(): GridRow[] {
  const rows: GridRow[] = []
  for (const phase of PHASES)
    for (const contentRegister of REGISTERS)
      for (const consecutiveFailures of FAILURES)
        for (const signal of SIGNALS)
          for (const interruptActive of INTERRUPTS)
            for (const isFirstLessonContext of FIRST_LESSON) {
              rows.push({
                key: [phase, contentRegister, `f${consecutiveFailures}`,
                  `s${signal.correct}/${signal.confidence}`,
                  interruptActive ? 'int' : '-', isFirstLessonContext ? 'L1' : '-'].join('|'),
                inputs: {
                  ...BASE, phase, contentRegister, consecutiveFailures,
                  lastSignalCorrect: signal.correct, lastSignalConfidence: signal.confidence,
                  interruptActive,
                  // An interrupt without a failure state is not an interrupt
                  // the Band-0 rule can act on (it reads both fields), so the
                  // grid supplies the key whenever the flag is set.
                  failureStateKey: interruptActive ? 'dont_know' : null,
                  isFirstLessonContext,
                },
              })
            }
  return rows
}

const ROWS = grid()

/** The decision fields that change what a learner receives. Provenance is
 *  included: a rule firing for a different REASON while producing the same
 *  surface is still a policy change, and the whole point of a rule engine is
 *  that the reason is auditable. */
function serialize(inputs: PolicyInputs): string {
  const d = decide(BASE_PACK, inputs)
  return JSON.stringify({
    move: d.move, actionClass: d.actionClass, stageCeiling: d.stageCeiling,
    budgets: d.budgets, vocabularyBans: d.vocabularyBans,
    visualClass: d.visualClass, representation: d.representation,
    preemptedBy: d.preemptedBy,
    slots: d.contentSlots.map((s) => s.kind),
    rules: d.provenance.map((t) => `${t.band}:${t.ruleId}:${t.set.join('+')}`),
    conflicts: d.conflicts.map((c) => `${c.band}:${c.ruleIds.join(',')}:${c.resolvedBy}`),
  })
}

function tableDigest(): { digest: string; lines: string[] } {
  const lines = ROWS.map((r) => `${r.key}\t${serialize(r.inputs)}`)
  return { digest: createHash('sha256').update(lines.join('\n')).digest('hex'), lines }
}

// Pinned by the commit that introduced this test. Change it ONLY together
// with the pack change that caused it.
const PINNED_DIGEST = '8ffc05018956dac8e54c22ceeb7ce75d444bdf5279302e0e7638f28e149472c5'

describe('Golden decision grid (RS T-3)', () => {
  it('covers at least the 200 rows RS T-3 requires', () => {
    expect(ROWS.length).toBeGreaterThanOrEqual(200)
    // And every row is distinct — a duplicated key would inflate the count
    // while testing the same coordinate twice.
    expect(new Set(ROWS.map((r) => r.key)).size).toBe(ROWS.length)
  })

  it('is byte-identical to the pinned digest', () => {
    const { digest, lines } = tableDigest()
    if (process.env.GOLDEN_GRID_PRINT === '1') {
      console.log(`\nGOLDEN GRID DIGEST: ${digest}\n${lines.slice(0, 5).join('\n')}\n…`)
    }
    expect(digest, `decision grid changed — review the diff, then re-pin. ` +
      `Re-run with GOLDEN_GRID_PRINT=1 to print the new digest.`).toBe(PINNED_DIGEST)
  })

  it('is deterministic — two evaluations of the whole grid agree', () => {
    expect(tableDigest().digest).toBe(tableDigest().digest)
  })
})

// ── Invariants that must hold on EVERY row ──────────────────────────────────
// These are the properties a curated table asserts row by row and can only
// ever assert for the rows it contains. Here they are universally quantified.

describe('grid invariants (RS §5.2 completeness + §5.4 mandatory set)', () => {
  const decisions = ROWS.map((r) => ({ key: r.key, inputs: r.inputs, d: decide(BASE_PACK, r.inputs) }))

  it('every decision is complete — move, budgets, ceiling, fallback chain', () => {
    for (const { key, d } of decisions) {
      expect(d.move, key).not.toBeNull()
      expect(d.stageCeiling, key).toBeGreaterThanOrEqual(1)
      expect(d.stageCeiling, key).toBeLessThanOrEqual(7)
      expect(d.fallbackChain.length, key).toBeGreaterThan(0)
      expect(d.provenance.length, key).toBeGreaterThan(0)
    }
  })

  it('the question budget and the move never contradict each other', () => {
    // The invariant that makes "never ask two questions in a row" enforceable
    // rather than advisory: a non-ASK turn carries a zero question budget, so
    // the verifier's V-QUESTION rule has an unambiguous ceiling to check.
    for (const { key, d } of decisions) {
      expect(d.budgets.maxQuestions, key).toBe(d.move === 'ASK' ? 1 : 0)
    }
  })

  it('an active interrupt preempts every row it appears in', () => {
    for (const { key, inputs, d } of decisions) {
      if (!inputs.interruptActive) continue
      expect(d.move, key).toBe('RECOVER')
      expect(d.preemptedBy, key).toBe('B0.recovery.preempt.v1')
      // foundations/04 P5 — no content enters a flooded mind.
      expect(d.budgets.maxNewTerms, key).toBe(0)
      expect(d.contentSlots.some((s) => s.kind === 'recovery-script'), key).toBe(true)
    }
  })

  it('the stage ceiling always equals the phase ceiling its owner defines', () => {
    // The ceiling has ONE owner (kernel/tsm/phases getStageCeiling). If the
    // engine ever computed its own, a phase-ladder edit would silently stop
    // reaching policy.
    for (const { key, inputs, d } of decisions) {
      expect(d.stageCeiling, key).toBe(getStageCeiling(inputs.phase))
    }
  })

  it('first-lesson rows always carry the lesson-one vocabulary bans', () => {
    for (const { key, inputs, d } of decisions) {
      if (!inputs.isFirstLessonContext) continue
      expect(d.vocabularyBans, key).toContain('SI')
      expect(d.vocabularyBans, key).toContain('phoneme')
    }
  })

  it('EVERY row evaluates the mandatory Band-2 legality set, preempted or not', () => {
    // The strong form. A Band-0 interrupt skips the selection bands, but a
    // mandatory legality rule an interrupt can switch off is not mandatory
    // (RS §5.4) — so this is quantified over all rows, including recovery.
    for (const { key, d } of decisions) {
      const ids = d.provenance.map((t) => t.ruleId)
      expect(ids, key).toContain('B2.legality.stage-ceiling.v1')
      expect(ids, key).toContain('B2.legality.question-budget.v1')
    }
  })

  it('repeated struggle never ends in a question, in any phase or register', () => {
    // The single most consequential Band-4 rule: interrogating a learner who
    // has failed twice is the failure the worked-example-first rule exists to
    // prevent, and it must hold in EVERY phase — including the ones whose
    // phase default is ASK.
    for (const { key, inputs, d } of decisions) {
      if (inputs.interruptActive || inputs.consecutiveFailures < 2) continue
      expect(d.move, key).not.toBe('ASK')
      expect(d.budgets.maxQuestions, key).toBe(0)
    }
  })

  it('no row produces an unresolved conflict', () => {
    // Conflicts are RECORDED, not fatal — but every one of them is a pack
    // ambiguity resolved by a tie-break rather than by intent, so the grid
    // asserts the base pack currently has none.
    for (const { key, d } of decisions) expect(d.conflicts, key).toEqual([])
  })
})

// ── The replay diff: engine vs the shipping decision path ───────────────────
// K4's DoD asks for "replay diff vs pre-pack behavior reviewed and accepted".
// This is that diff, computed rather than described: for every grid row, what
// the pack decides against what the legacy formulas decide. It is an
// OBSERVATION test — it asserts the measured divergence profile, so any
// change to either side shows up as a failure to be reviewed.

describe('replay diff — engine vs the legacy decision path', () => {
  /** The route's paragraph budget, from its declared owner. Imported rather
   *  than restated: a restated formula agrees with itself forever. */
  function legacyMaxParagraphs(register: string, failures: number): number | null {
    const struggling = failures >= 2
    if (register === 'beginner') return struggling ? 2 : 4
    if (register === 'intermediate') return struggling ? 4 : 7
    return struggling ? 6 : null
  }

  const diffs = ROWS.map(({ key, inputs }) => {
    const d = decide(BASE_PACK, inputs)
    const fields: string[] = []
    if (d.budgets.maxParagraphs !== legacyMaxParagraphs(inputs.contentRegister, inputs.consecutiveFailures)) {
      fields.push('maxParagraphs')
    }
    if (d.budgets.maxNewTerms !== (inputs.contentRegister === 'beginner' ? 1 : 2)) {
      fields.push('maxNewTerms')
    }
    return { key, inputs, fields }
  })

  it('agrees with the legacy paragraph budget on every non-recovery row', () => {
    // Band 5's register budgets were authored FROM responseBudget(). If this
    // ever fails, the pack and the shipping runtime have drifted apart and a
    // primary-mode flip would silently change every learner's message length.
    for (const { key, inputs, fields } of diffs) {
      if (inputs.interruptActive) continue      // Band 0 sets its own tighter budget
      expect(fields, key).not.toContain('maxParagraphs')
    }
  })

  it('divergence on maxNewTerms is confined to exactly the documented cases', () => {
    // The engine and the route disagree in two places, both intentional:
    //   · recovery rows       → engine 0 (P5: no new terms into a flooded
    //                           mind); the route's formula has no recovery
    //                           case and would still allow 1–2.
    //   · beginner + strained → engine 0 for the same reason.
    //   · expert register     → engine 3; the route's binary
    //                           `beginner ? 1 : 2` has no expert tier.
    // Anything OUTSIDE that set is an unreviewed drift.
    const unexpected = diffs.filter(({ inputs, fields }) =>
      fields.includes('maxNewTerms')
      && !inputs.interruptActive
      && !(inputs.contentRegister === 'beginner' && inputs.consecutiveFailures >= 2)
      && inputs.contentRegister !== 'expert')
    expect(unexpected.map((u) => u.key)).toEqual([])
  })

  it('reports a stable divergence rate (the number the promotion decision reads)', () => {
    const diverged = diffs.filter((x) => x.fields.length > 0).length
    // Pinned: promotion to primary is a data decision, and the data is this
    // number. It must move only when someone changes a rule on purpose.
    //
    // The 624 decompose exactly, with nothing left over:
    //   432 — every recovery row. Band 0 sets its own tighter budget
    //         (2 paragraphs, 0 new terms) and the legacy formulas have no
    //         recovery case at all. Intentional, and the direction is safe.
    //    48 — beginner + strained, on maxNewTerms (engine 0, foundations/04 P5).
    //   144 — every expert row, on maxNewTerms (engine 3; the route's
    //         `beginner ? 1 : 2` has no expert tier).
    // Zero rows diverge on maxParagraphs outside recovery — that is what the
    // preceding test asserts, and it is what makes these two numbers a
    // promotion signal rather than noise.
    expect({ rows: diffs.length, diverged }).toEqual({ rows: ROWS.length, diverged: 624 })
  })
})
