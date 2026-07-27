/**
 * K3 — the single move owner, and the parity observer.
 *
 * The kernel pipeline, its 15 stages and the shadow adapter already existed;
 * they are not retested here. What is tested is what was missing: one owner
 * for the move mapping (it had drifted between two hand-written copies), and
 * the comparison that makes the K3 Definition of Done measurable.
 */

import { describe, it, expect } from 'vitest'
import { toPolicyMove, maxQuestionsFor } from '@/lib/kernel/policyMove'
import {
  compareDecisions, foldParityMetrics, initialParityMetrics, readParityMetrics,
  agreementRate, parityTags, type DecisionFacts,
} from '@/lib/kernel/parity'

// ── THE SINGLE MOVE OWNER ───────────────────────────────────────────────────

describe('toPolicyMove — one owner, authority-ordered', () => {
  it('maps the concept ladder', () => {
    const base = { recoveryKey: null, episodePhase: 'CORE' }
    expect(toPolicyMove({ ...base, ladderMove: 'teach' })).toBe('TEACH')
    expect(toPolicyMove({ ...base, ladderMove: 'show' })).toBe('SHOW')
    expect(toPolicyMove({ ...base, ladderMove: 'ask' })).toBe('ASK')
  })

  it('RECOVER outranks everything — including a CLOSING session', () => {
    // decideNextMove() returns 'teach' on a recovery turn, so RECOVER is not
    // derivable from the ladder. This is the case the old duplicate missed.
    expect(toPolicyMove({ recoveryKey: 'dont_know', episodePhase: 'CLOSING', ladderMove: 'teach' }))
      .toBe('RECOVER')
  })

  it('CLOSE outranks the concept ladder — the close is protected', () => {
    expect(toPolicyMove({ recoveryKey: null, episodePhase: 'CLOSING', ladderMove: 'ask' }))
      .toBe('CLOSE')
  })

  it('returns null when nothing decided a move (pre-directive turns)', () => {
    expect(toPolicyMove({ recoveryKey: null, episodePhase: null, ladderMove: null })).toBeNull()
    expect(toPolicyMove({ recoveryKey: null, episodePhase: undefined, ladderMove: 'nonsense' })).toBeNull()
  })

  it('the question budget follows the MAPPED move, not the ladder', () => {
    // A recovery turn whose ladder said 'ask' still carries a budget of 0.
    const move = toPolicyMove({ recoveryKey: 'confused', episodePhase: null, ladderMove: 'ask' })
    expect(move).toBe('RECOVER')
    expect(maxQuestionsFor(move)).toBe(0)
    expect(maxQuestionsFor('ASK')).toBe(1)
    expect(maxQuestionsFor(null)).toBe(0)
  })

  it('is deterministic and pure', () => {
    const input = { recoveryKey: null, episodePhase: 'CORE', ladderMove: 'show' }
    const snapshot = JSON.parse(JSON.stringify(input))
    expect(toPolicyMove(input)).toBe(toPolicyMove(input))
    expect(JSON.parse(JSON.stringify(input))).toEqual(snapshot)
  })

  it('REGRESSION — the drift this file exists to prevent', () => {
    // The kernel shadow adapter previously used a three-way mapping with no
    // RECOVER and no CLOSE, while the verifier path had already been fixed.
    // Parity would have measured a decision the route no longer makes.
    const stale = (ladder: string | null) =>
      ladder === 'teach' ? 'TEACH' : ladder === 'show' ? 'SHOW' : ladder === 'ask' ? 'ASK' : null
    const recoveryTurn = { recoveryKey: 'dont_know', episodePhase: null, ladderMove: 'teach' }
    expect(toPolicyMove(recoveryTurn)).not.toBe(stale(recoveryTurn.ladderMove))
    const closingTurn = { recoveryKey: null, episodePhase: 'CLOSING', ladderMove: 'teach' }
    expect(toPolicyMove(closingTurn)).not.toBe(stale(closingTurn.ladderMove))
  })
})

// ── THE PARITY OBSERVER ─────────────────────────────────────────────────────

const facts = (over: Partial<DecisionFacts> = {}): DecisionFacts => ({
  move: 'SHOW', stageCeiling: 2, maxQuestions: 0, maxNewTerms: 1,
  phase: 'DEMONSTRATE', recoveryActive: false, ...over,
})

describe('compareDecisions', () => {
  it('agrees when every decision field matches', () => {
    const r = compareDecisions(facts(), facts())
    expect(r.agree).toBe(true)
    expect(r.divergences).toEqual([])
  })

  it('names the field, the route value and the kernel value', () => {
    const r = compareDecisions(facts({ move: 'SHOW' }), facts({ move: 'ASK' }))
    expect(r.agree).toBe(false)
    expect(r.divergences).toEqual([{ field: 'move', route: 'SHOW', kernel: 'ASK' }])
  })

  it('reports EVERY divergent field, not just the first', () => {
    const r = compareDecisions(
      facts({ move: 'SHOW', stageCeiling: 2, maxQuestions: 0 }),
      facts({ move: 'ASK', stageCeiling: 6, maxQuestions: 1 }),
    )
    expect(r.divergences.map((d) => d.field)).toEqual(['move', 'stageCeiling', 'maxQuestions'])
  })

  it('is order-stable, so logs and diffs are comparable across turns', () => {
    const a = compareDecisions(facts({ move: 'ASK', phase: 'GUIDE' }), facts())
    const b = compareDecisions(facts({ move: 'ASK', phase: 'GUIDE' }), facts())
    expect(a.divergences).toEqual(b.divergences)
  })

  it('treats null and undefined-shaped values as distinct from a value', () => {
    expect(compareDecisions(facts({ move: null }), facts({ move: 'SHOW' })).agree).toBe(false)
    expect(compareDecisions(facts({ stageCeiling: null }), facts({ stageCeiling: 2 })).agree).toBe(false)
  })

  it('is pure — neither input is mutated', () => {
    const route = facts(); const kernel = facts({ move: 'ASK' })
    const snap = [JSON.stringify(route), JSON.stringify(kernel)]
    compareDecisions(route, kernel)
    expect([JSON.stringify(route), JSON.stringify(kernel)]).toEqual(snap)
  })
})

describe('parity metrics', () => {
  it('counts agreement and per-field divergence', () => {
    let m = initialParityMetrics()
    m = foldParityMetrics(m, compareDecisions(facts(), facts()))
    m = foldParityMetrics(m, compareDecisions(facts({ move: 'SHOW' }), facts({ move: 'ASK' })))
    m = foldParityMetrics(m, compareDecisions(facts({ move: 'SHOW' }), facts({ move: 'ASK' })))
    expect(m.turnsCompared).toBe(3)
    expect(m.turnsAgreed).toBe(1)
    expect(m.byField.move).toBe(2)
  })

  it('agreementRate is suppressed below a minimum sample', () => {
    let m = foldParityMetrics(undefined, compareDecisions(facts(), facts()))
    expect(agreementRate(m)).toBeNull()
    for (let i = 0; i < 19; i++) m = foldParityMetrics(m, compareDecisions(facts(), facts()))
    expect(agreementRate(m)).toBe(1)
  })

  it('a field that never diverges is a stage that is safe to promote', () => {
    let m = initialParityMetrics()
    for (let i = 0; i < 25; i++) {
      m = foldParityMetrics(m, compareDecisions(facts({ stageCeiling: 4 }), facts({ stageCeiling: 4, move: 'ASK' })))
    }
    expect(m.byField.stageCeiling).toBeUndefined()   // never diverged → promotable
    expect(m.byField.move).toBe(25)                  // still diverges → not yet
  })

  it('survives a legacy/partial stored shape', () => {
    expect(readParityMetrics(null)).toEqual(initialParityMetrics())
    expect(readParityMetrics({ turnsCompared: 5 }).turnsAgreed).toBe(0)
    expect(readParityMetrics({ turnsCompared: 5 }).byField).toEqual({})
  })

  it('emits tags only on divergence', () => {
    expect(parityTags(compareDecisions(facts(), facts()))).toEqual([])
    const tags = parityTags(compareDecisions(facts({ move: 'SHOW' }), facts({ move: 'ASK' })))
    expect(tags).toContain('kernel:parity:diverged')
    expect(tags).toContain('kernel:parity:move')
  })
})

// ── BEHAVIOURAL PROOF: identical decisions before/after the extraction ──────

describe('behavioural proof — the extraction changed no decision', () => {
  /** The mapping the route used INLINE before kernel/policyMove existed,
   *  reproduced verbatim from the pre-refactor source. */
  const preRefactor = (recoveryKey: string | null, phase: string | null, ladder: string | null) =>
    recoveryKey !== null ? 'RECOVER'
      : phase === 'CLOSING' ? 'CLOSE'
      : ladder === 'teach' ? 'TEACH'
      : ladder === 'show' ? 'SHOW'
      : ladder === 'ask' ? 'ASK'
      : null

  const CASES: Array<[string | null, string | null, string | null]> = []
  for (const rk of [null, 'dont_know', 'too_many_questions']) {
    for (const ph of [null, 'OPEN', 'CORE', 'CLOSING']) {
      for (const lm of [null, 'teach', 'show', 'ask']) CASES.push([rk, ph, lm])
    }
  }

  it('agrees with the pre-refactor inline mapping on all 48 input combinations', () => {
    expect(CASES).toHaveLength(48)
    for (const [recoveryKey, episodePhase, ladderMove] of CASES) {
      expect(toPolicyMove({ recoveryKey, episodePhase, ladderMove }))
        .toBe(preRefactor(recoveryKey, episodePhase, ladderMove))
    }
  })

  it('and the derived question budget is identical on all 48', () => {
    for (const [recoveryKey, episodePhase, ladderMove] of CASES) {
      const before = preRefactor(recoveryKey, episodePhase, ladderMove) === 'ASK' ? 1 : 0
      expect(maxQuestionsFor(toPolicyMove({ recoveryKey, episodePhase, ladderMove }))).toBe(before)
    }
  })

  it('self-parity: a decision compared against itself always agrees', () => {
    for (const [recoveryKey, episodePhase, ladderMove] of CASES) {
      const move = toPolicyMove({ recoveryKey, episodePhase, ladderMove })
      const f = facts({ move, maxQuestions: maxQuestionsFor(move), recoveryActive: recoveryKey !== null })
      expect(compareDecisions(f, f).agree).toBe(true)
    }
  })
})
