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
import { tsmStepStage, stageCeilingFor } from '@/lib/kernel/stages/tsmStep'
import { policyStage } from '@/lib/kernel/stages/policy'
import { interruptScanStage } from '@/lib/kernel/stages/interruptScan'
import { senseStage } from '@/lib/kernel/stages/sense'
import { commit1Stage } from '@/lib/kernel/stages/commit1'
import { initialState, makeTurnContext } from '@/lib/kernel/context'
import {
  initialConversationState, decideNextMoveDetailed, PHASE_MAX_QUESTION_STAGE,
  PHASE_ORDER, type ConversationState,
} from '@/lib/teaching/conversationState'
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


// ── PROMOTION EVIDENCE — stages 7 and 8 derive what the route computes ──────

const CTX = { learnerId: 'L1', sessionId: 'S1', subjectSlug: 'physics', messageLength: 5, isSchoolMode: false }
const cs = (phase: string, over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState('c'), phase: phase as never, taughtThisSession: true, ...over,
})

describe('PROMOTED stage 7 (TSM-STEP) — parity with the route formula', () => {
  it('derives the ceiling identically to the route, for every phase', async () => {
    for (const phase of PHASE_ORDER) {
      const s = await tsmStepStage({ conversationState: cs(phase) })
        .run(initialState(makeTurnContext(CTX)))
      // The route's own expression: PHASE_MAX_QUESTION_STAGE[state.phase]
      expect(s.teachingState?.stageCeiling).toBe(PHASE_MAX_QUESTION_STAGE[phase])
      expect(s.teachingState?.phase).toBe(phase)
    }
  })

  it('falls back to the OBSERVE floor when there is no ladder state', async () => {
    const s = await tsmStepStage({ conversationState: null }).run(initialState(makeTurnContext(CTX)))
    expect(s.teachingState?.stageCeiling).toBe(PHASE_MAX_QUESTION_STAGE.OBSERVE)
  })

  it('stageCeilingFor is total over unknown phases', () => {
    expect(stageCeilingFor('NOT_A_PHASE')).toBe(PHASE_MAX_QUESTION_STAGE.OBSERVE)
    expect(stageCeilingFor(null)).toBe(PHASE_MAX_QUESTION_STAGE.OBSERVE)
  })
})

describe('PROMOTED stage 8 (POLICY) — parity with the route decision', () => {
  const POL_BASE = {
    legality: {}, contentRegister: 'beginner' as const, episodePhase: 'CORE',
    workedExampleFirst: false, actionClass: null, maxParagraphs: 4,
    visualClass: null, vocabularyBans: [], provenance: [],
  }

  it('derives the same move the route derives, across the ladder', async () => {
    for (const phase of PHASE_ORDER) {
      const state = cs(phase)
      // What the route computes.
      const routeMove = toPolicyMove({
        recoveryKey: null, episodePhase: 'CORE',
        ladderMove: decideNextMoveDetailed(state, { recoveryTurn: false, workedExampleFirst: false }).move,
      })
      // What the kernel derives, independently, inside the stage.
      let s = initialState(makeTurnContext(CTX))
      s = await interruptScanStage.run({ ...s, committed: [] })
      s = await tsmStepStage({ conversationState: state }).run(s)
      s = await policyStage({ ...POL_BASE, conversationState: state }).run(s)
      expect(s.policy?.move).toBe(routeMove)
      expect(s.policy?.budgets.maxQuestions).toBe(maxQuestionsFor(routeMove))
    }
  })

  it('senses recovery END-TO-END with no adapter telling it', async () => {
    // The whole point of the promotion: the message alone drives the decision.
    let s = initialState(makeTurnContext(CTX))
    s = await senseStage({ message: "I don't know" }).run(s)
    s = await commit1Stage.run(s)
    s = await interruptScanStage.run(s)
    s = await tsmStepStage({ conversationState: cs('OBSERVE') }).run(s)
    s = await policyStage({ ...POL_BASE, conversationState: cs('OBSERVE') }).run(s)
    expect(s.policy?.move).toBe('RECOVER')
    expect(s.policy?.budgets.maxQuestions).toBe(0)
  })

  it('CLOSING outranks the ladder inside the stage', async () => {
    let s = initialState(makeTurnContext(CTX))
    s = await interruptScanStage.run({ ...s, committed: [] })
    s = await tsmStepStage({ conversationState: cs('OBSERVE') }).run(s)
    s = await policyStage({ ...POL_BASE, conversationState: cs('OBSERVE'), episodePhase: 'CLOSING' }).run(s)
    expect(s.policy?.move).toBe('CLOSE')
  })

  it('derives maxNewTerms from the register, as the route does', async () => {
    const run = async (contentRegister: 'beginner' | 'intermediate') => {
      let s = initialState(makeTurnContext(CTX))
      s = await interruptScanStage.run({ ...s, committed: [] })
      s = await tsmStepStage({ conversationState: cs('OBSERVE') }).run(s)
      s = await policyStage({ ...POL_BASE, contentRegister, conversationState: cs('OBSERVE') }).run(s)
      return s.policy?.budgets.maxNewTerms
    }
    expect(await run('beginner')).toBe(1)
    expect(await run('intermediate')).toBe(2)
  })

  it('an undefined recoveryKey does NOT read as an active interrupt', async () => {
    // Regression: `!== null` treated undefined as a live interrupt and forced
    // RECOVER on every caller that omitted the field.
    let s = initialState(makeTurnContext(CTX))
    s = await interruptScanStage.run({ ...s, committed: [] })
    s = await tsmStepStage({ conversationState: cs('OBSERVE') }).run(s)
    s = await policyStage({ ...POL_BASE, conversationState: cs('OBSERVE') }).run(s)
    expect(s.policy?.move).not.toBe('RECOVER')
  })

  it('full-parity check: kernel decision equals route decision on every phase', async () => {
    for (const phase of PHASE_ORDER) {
      const state = cs(phase)
      let s = initialState(makeTurnContext(CTX))
      s = await interruptScanStage.run({ ...s, committed: [] })
      s = await tsmStepStage({ conversationState: state }).run(s)
      s = await policyStage({ ...POL_BASE, conversationState: state }).run(s)
      const routeMove = toPolicyMove({
        recoveryKey: null, episodePhase: 'CORE',
        ladderMove: decideNextMoveDetailed(state, { recoveryTurn: false, workedExampleFirst: false }).move,
      })
      const parity = compareDecisions(
        { move: routeMove, stageCeiling: PHASE_MAX_QUESTION_STAGE[phase],
          maxQuestions: maxQuestionsFor(routeMove), maxNewTerms: 1,
          phase, recoveryActive: false },
        { move: s.policy!.move, stageCeiling: s.policy!.stageCeiling,
          maxQuestions: s.policy!.budgets.maxQuestions, maxNewTerms: s.policy!.budgets.maxNewTerms,
          phase: s.teachingState!.phase, recoveryActive: s.interrupt?.active === true },
      )
      expect(parity.divergences).toEqual([])
      expect(parity.agree).toBe(true)
    }
  })
})
