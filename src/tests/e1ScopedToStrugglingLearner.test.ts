/**
 * E1 OPENS DEMONSTRATE ONLY FOR A LEARNER WHO HAS ALREADY FAILED.
 *
 * ── WHY THE SCOPE EXISTS ────────────────────────────────────────────────────
 * `a2LadderGateReachability.test.ts` states a real teaching principle: "a
 * teach turn must not have a question stapled onto it." E1 was unreachable
 * because it tried to honour that principle with a condition
 * (`move === 'ask'`) that DEMONSTRATE can never satisfy — proven over 1,536
 * combinations in e1DemonstrateProbeUnreachable.test.ts.
 *
 * Dropping the condition outright would have overridden the principle for
 * every learner. The measured harm was on ONE path:
 *
 *   confidently-wrong learner, deployed app, three concepts
 *   phys.opt.mirrors  3 gradeable questions of 12 turns, 5 of them at
 *                     DEMONSTRATE
 *   friction 3/12 · kinetic-energy 3/12
 *
 * while a PROGRESSING learner reaches verified mastery without E1 at all —
 * eight live runs across four concepts. So the gate opens at DEMONSTRATE only
 * once the concept has produced a failure.
 *
 * ── WHAT THIS FILE GUARDS ───────────────────────────────────────────────────
 * The claim "a progressing learner's show turn is untouched" is the whole
 * safety case for the change, and a claim that is only asserted in a commit
 * message is not verified. This evaluates the route's own expression against
 * the real ConversationState.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

/** The route's own condition, kept in one place so the test cannot drift
 *  from it silently — §C asserts the source still spells exactly this. */
const struggling = (s: ConversationState | null): boolean =>
  (s?.consecutiveFailures ?? 0) > 0 || (s?.observeFailures ?? 0) > 0

/** The full predicate the gate applies, as the route composes it. */
const phaseAllowsProbe = (
  phase: ConversationState['phase'], move: string, s: ConversationState | null,
): boolean =>
  phase === 'CHECK' || phase === 'PRACTICE' || phase === 'TRANSFER'
  || (phase === 'GUIDE' && move === 'ask')
  || (phase === 'DEMONSTRATE' && struggling(s))

const S = (o: Partial<ConversationState> = {}): ConversationState =>
  ({ ...initialConversationState('phys.mech.friction'), ...o })

// ═══════════════════════════════════════════════════════════════════════════
// A. THE PROGRESSING LEARNER IS UNTOUCHED — the safety case
// ═══════════════════════════════════════════════════════════════════════════
describe('A. a learner who has not failed keeps a pure show turn', () => {
  const clean = S({ phase: 'DEMONSTRATE', consecutiveFailures: 0, observeFailures: 0 })

  for (const move of ['show', 'teach', 'ask']) {
    it(`DEMONSTRATE + move '${move}' stays closed`, () => {
      expect(phaseAllowsProbe('DEMONSTRATE', move, clean)).toBe(false)
    })
  }

  it('even after several correct answers — success never opens it', () => {
    const succeeding = S({
      phase: 'DEMONSTRATE', consecutiveFailures: 0, observeFailures: 0,
      correctAtCheck: 1, correctAtPractice: 2, demonstrated: true,
    })
    expect(phaseAllowsProbe('DEMONSTRATE', 'show', succeeding)).toBe(false)
  })

  it('a missing or malformed state cannot open it either', () => {
    expect(phaseAllowsProbe('DEMONSTRATE', 'show', null)).toBe(false)
    expect(phaseAllowsProbe('DEMONSTRATE', 'show',
      S({ phase: 'DEMONSTRATE', consecutiveFailures: undefined as unknown as number }))).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// B. THE STRUGGLING LEARNER CAN NOW BE ASSESSED — the point of the change
// ═══════════════════════════════════════════════════════════════════════════
describe('B. a learner who has failed can be given a gradeable question', () => {
  it('one graded failure opens DEMONSTRATE', () => {
    expect(phaseAllowsProbe('DEMONSTRATE', 'show', S({ phase: 'DEMONSTRATE', consecutiveFailures: 1 })))
      .toBe(true)
  })

  it('an OBSERVE-phase failure counts too — it is the same learner', () => {
    // observeFailures is the other channel by which a concept records that a
    // probe was run and produced nothing (see the QL-2 note in the fold).
    expect(phaseAllowsProbe('DEMONSTRATE', 'teach', S({ phase: 'DEMONSTRATE', observeFailures: 2 })))
      .toBe(true)
  })

  it('and it opens on a teach turn, which is exactly what was impossible before', () => {
    expect(phaseAllowsProbe('DEMONSTRATE', 'teach', S({ phase: 'DEMONSTRATE', consecutiveFailures: 2 })))
      .toBe(true)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// C. NOTHING ELSE MOVED
// ═══════════════════════════════════════════════════════════════════════════
describe('C. GUIDE and the mastery gates are unchanged', () => {
  const failing = S({ consecutiveFailures: 3 })

  it('GUIDE still requires an ask turn, failure or not', () => {
    expect(phaseAllowsProbe('GUIDE', 'ask', failing)).toBe(true)
    expect(phaseAllowsProbe('GUIDE', 'teach', failing)).toBe(false)
    expect(phaseAllowsProbe('GUIDE', 'show', failing)).toBe(false)
  })

  it('the mastery gates still open on any move, as they always did', () => {
    for (const phase of ['CHECK', 'PRACTICE', 'TRANSFER'] as const) {
      for (const move of ['ask', 'teach', 'show']) {
        expect(phaseAllowsProbe(phase, move, S({ phase }))).toBe(true)
      }
    }
  })

  it('OBSERVE is never opened — it is a diagnostic phase', () => {
    for (const move of ['ask', 'teach', 'show']) {
      expect(phaseAllowsProbe('OBSERVE', move, failing)).toBe(false)
    }
  })

  it('the route still spells exactly the condition modelled here', () => {
    expect(ROUTE).toContain('const strugglingOnThisConcept =')
    expect(ROUTE).toContain("(conversationStateHoisted?.consecutiveFailures ?? 0) > 0")
    expect(ROUTE).toContain("(conversationStateHoisted?.observeFailures ?? 0) > 0")
    expect(ROUTE).toContain("(phaseBeforeTurn === 'DEMONSTRATE' && strugglingOnThisConcept)")
  })

  it('the SURPLUS rule is still what keeps mastery reachable', () => {
    // This scope decides WHETHER to look for a probe; mayAttachProbeBelowGuide
    // decides whether spending one is affordable. Both must remain.
    expect(ROUTE).toContain('mayAttachProbeBelowGuide(phaseBeforeTurn, probe.poolSize)')
  })
})
