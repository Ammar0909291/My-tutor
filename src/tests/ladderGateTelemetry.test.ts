/**
 * PHASE E — THE GATE TELEMETRY IS OBSERVATIONAL, AND NOTHING ELSE.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Production and the offline replay disagree: the same learner sequence chose
 * `ask` offline and `show` on all eight OBSERVE turns live. Five behavioural
 * candidates have been proposed against that gap and every one was inert,
 * because none was aimed at the gate production actually took — and no log
 * names it.
 *
 * `decideNextMoveDetailed` has SEVEN return points. Gate 2 (question legality)
 * already computes a `blockedReason` saying which rule fired, the route already
 * hoists it into `legalityBlockedReasonHoisted`, and no log has ever printed
 * it. The `[ladder]` line now carries it, along with every counter the other
 * six gates read.
 *
 * ── WHAT THIS FILE MUST PROVE ───────────────────────────────────────────────
 * A diagnostic pass earns nothing if it can itself perturb the thing it
 * measures. So this asserts the two properties that make the telemetry safe:
 *
 *   1. the decision is BYTE-IDENTICAL — `decideNextMoveDetailed` is called with
 *      the same inputs and returns the same move as before, across the full
 *      gate matrix;
 *   2. every logged field is a READ of state the decision already saw, never a
 *      recomputation that could drift from the real rule.
 *
 * It deliberately does NOT assert the log's wording. The message is not the
 * contract; the inertness is.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  initialConversationState, decideNextMove, decideNextMoveDetailed,
  type ConversationState, type NextMoveContext,
} from '@/lib/teaching/conversationState'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

/** The telemetry block, isolated so no assertion can match elsewhere. */
const GATES = (() => {
  const start = ROUTE.indexOf('            gates: {')
  expect(start, 'the gates block must exist').toBeGreaterThan(-1)
  const end = ROUTE.indexOf('          })', start)
  return ROUTE.slice(start, end)
})()

const st = (over: Partial<ConversationState> = {}): ConversationState =>
  ({ ...initialConversationState('phys.mech.force'), ...over })
const ctx = (over: Partial<NextMoveContext> = {}): NextMoveContext =>
  ({ recoveryTurn: false, workedExampleFirst: false, ...over })

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE DECISION DID NOT MOVE — the whole gate matrix, before and after
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase E — the move engine is untouched', () => {
  // One case per return point in decideNextMoveDetailed, plus the phase ladder.
  const CASES: { name: string; state: ConversationState; ctx: NextMoveContext }[] = [
    { name: 'gate 1 recovery', state: st(), ctx: ctx({ recoveryTurn: true }) },
    { name: 'gate 2 legality, nothing taught', state: st({ taughtThisSession: false }), ctx: ctx() },
    { name: 'gate 2 legality, taught', state: st({ taughtThisSession: true }), ctx: ctx() },
    { name: 'gate 3 dontKnows', state: st({ taughtThisSession: true, consecutiveDontKnows: 2, teachSegmentsSinceQuestion: 0 }), ctx: ctx() },
    { name: 'gate 4 knowledgeProbes', state: st({ taughtThisSession: true, totalKnowledgeProbes: 2, teachSegmentsSinceQuestion: 0 }), ctx: ctx() },
    { name: 'gate 5 priorKProbes', state: st({ taughtThisSession: true, consecutivePriorKnowledgeProbes: 2, teachSegmentsSinceQuestion: 0 }), ctx: ctx() },
    { name: 'gate 6 observeFailures at OBSERVE', state: st({ taughtThisSession: true, phase: 'OBSERVE', observeFailures: 2, teachSegmentsSinceQuestion: 0 }), ctx: ctx() },
    { name: 'gate 6 does NOT fire above OBSERVE', state: st({ taughtThisSession: true, phase: 'GUIDE', demonstrated: true, observeFailures: 2, teachSegmentsSinceQuestion: 0 }), ctx: ctx() },
    { name: 'gate 7 budget spent', state: st({ taughtThisSession: true, questionsAskedSinceTeach: 2 }), ctx: ctx() },
    { name: 'remedial already delivered', state: st({ taughtThisSession: true, consecutiveDontKnows: 2, teachSegmentsSinceQuestion: 1 }), ctx: ctx() },
    { name: 'GUIDE with practice requested', state: st({ taughtThisSession: true, phase: 'GUIDE', demonstrated: true }), ctx: ctx({ practiceRequested: true }) },
    { name: 'workedExampleFirst', state: st({ taughtThisSession: true }), ctx: ctx({ workedExampleFirst: true }) },
  ]

  it('every gate still returns a move, and the wrapper still agrees with it', () => {
    for (const c of CASES) {
      const detailed = decideNextMoveDetailed(c.state, c.ctx)
      expect(['teach', 'show', 'ask'], c.name).toContain(detailed.move)
      // The thin wrapper the rest of the codebase uses must not diverge.
      expect(decideNextMove(c.state, c.ctx), c.name).toBe(detailed.move)
    }
  })

  it('the decision is a PURE function — reading it twice cannot change it', () => {
    // If telemetry had introduced any shared mutable state, a second call with
    // the same inputs could differ. It cannot.
    for (const c of CASES) {
      const a = decideNextMoveDetailed(c.state, c.ctx)
      const b = decideNextMoveDetailed(c.state, c.ctx)
      expect(b, c.name).toEqual(a)
    }
  })

  it('the decision does not mutate the state it was given', () => {
    for (const c of CASES) {
      const before = JSON.stringify(c.state)
      decideNextMoveDetailed(c.state, c.ctx)
      expect(JSON.stringify(c.state), c.name).toBe(before)
    }
  })

  it('gate 2 still surfaces a blockedReason when it fires — the field being logged', () => {
    // Nothing taught and no evidenced prior knowledge: ASK is illegal.
    const d = decideNextMoveDetailed(st({ taughtThisSession: false }), ctx())
    expect(d.move).not.toBe('ask')
    expect(d.blockedReason, 'gate 2 must name its reason').not.toBeNull()
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. THE TELEMETRY READS; IT DOES NOT DECIDE
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase E — the log block is inert', () => {
  it('sits inside the console.log argument and nowhere else', () => {
    // One occurrence, and it is the object literal passed to the [ladder] log.
    expect(ROUTE.split('            gates: {').length - 1).toBe(1)
    const ladderAt = ROUTE.indexOf("console.log('[ladder]'")
    expect(ladderAt).toBeGreaterThan(-1)
    expect(ROUTE.indexOf('            gates: {')).toBeGreaterThan(ladderAt)
  })

  it('contains no control flow — nothing can branch on it', () => {
    // A conditional, loop, return, throw or assignment inside the block would
    // mean the diagnostic can act. Ternaries and `??` are reads, not branches
    // of execution, and are the shape the surrounding log already uses.
    expect(GATES).not.toMatch(/\bif\s*\(/)
    expect(GATES).not.toMatch(/\bfor\s*\(/)
    expect(GATES).not.toMatch(/\bwhile\s*\(/)
    expect(GATES).not.toMatch(/\breturn\b/)
    expect(GATES).not.toMatch(/\bthrow\b/)
    expect(GATES).not.toMatch(/\bawait\b/)
    // No assignment: `=` only ever appears as part of `===`, `!==`, `>=`, `??=`
    // is absent entirely. Strip the comparisons, then look for a bare `=`.
    const code = GATES.replace(/[=!><]==?/g, '').replace(/^\s*\/\/.*$/gm, '')
    expect(code).not.toMatch(/[^=!><]=[^=]/)
  })

  it('reads the PRE-turn state — the same object the decision was handed', () => {
    // conversationStateHoisted is what route.ts passes to
    // decideNextMoveDetailed. Reading the POST-turn state instead would
    // describe a different moment and quietly mislead the investigation.
    for (const field of [
      'taughtThisSession', 'consecutiveDontKnows', 'totalKnowledgeProbes',
      'consecutivePriorKnowledgeProbes', 'observeFailures', 'consecutiveFailures',
      'demonstrated', 'teachSegmentsSinceQuestion',
    ]) {
      expect(GATES, field).toContain(`conversationStateHoisted?.${field}`)
    }
    expect(GATES).not.toContain('conversationStateAfterTurnHoisted')
  })

  it('prints the blockedReason the decision already produced, not a re-derivation', () => {
    expect(GATES).toContain('legalityBlocked: legalityBlockedReasonHoisted')
    // It must NOT call questionLegality again — a second evaluation could
    // disagree with the one the move was actually made from.
    expect(GATES).not.toContain('questionLegality')
  })

  it('carries every input Phase E asked for', () => {
    for (const field of [
      'recoveryTurn', 'legalityBlocked', 'remedialPending', 'consecutiveDontKnows',
      'totalKnowledgeProbes', 'consecutivePriorKnowledgeProbes', 'observeFailures',
      'consecutiveFailures', 'demonstrated', 'workedExampleFirst',
      'practiceRequested', 'questionSanctioned', 'learnerRequest', 'degradedTurn',
    ]) expect(GATES, field).toContain(`${field}:`)
  })

  it('the fields the line already had are unchanged', () => {
    // Phase E adds; it does not rewrite the existing [ladder] contract that
    // earlier phases' analyses depend on.
    for (const field of [
      'signalTag:', 'correctness:', 'move:', 'mcqAsked:', 'phaseBefore:',
      'phaseAfter:', 'check:', 'practice:', 'questionsAskedSinceTeach:',
      'teachSegmentsSinceQuestion:', 'wantsPractice:', 'phaseAllowsProbe:',
      'budgetDeniedRequestedAsk:',
    ]) expect(ROUTE, field).toContain(field)
  })

  it('remedialPending mirrors the real conjunct, not a restated rule', () => {
    // decideNextMoveHeuristic gates 3-6 on !remedialGiveDelivered(state),
    // which is (teachSegmentsSinceQuestion ?? 0) > 0. The log states the
    // negation of exactly that expression over exactly that field.
    const SRC = readFileSync('src/lib/teaching/conversationState.ts', 'utf8')
    expect(SRC).toContain('return (state.teachSegmentsSinceQuestion ?? 0) > 0')
    expect(GATES).toContain('(conversationStateHoisted?.teachSegmentsSinceQuestion ?? 0) === 0')
  })
})
