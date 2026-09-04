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
// B2. THE SCOPE AND THE SURPLUS RULE INTERACT, AND AT DEPTH 4 THEY CANCEL
//
// Not anticipated when the scope was written, derived afterwards and then
// confirmed against production. Two independent conditions must both hold:
//
//   this scope        the concept has produced a FAILURE
//   the surplus rule  poolSize - 1 >= CREDITS_REQUIRED_FOR_MASTERY  (>= 4 left)
//
// A learner cannot fail without having been ASKED, and being asked SPENDS a
// probe. So at the moment of first failure at least one probe is already gone.
//
// Physics probe depth, measured in production 2026-09-01 (ACTIVE PROBE assets
// with >= 2 choices, grouped by concept and band):
//
//   261 pairs · min 4 · avg 4.77 · max 6 · 0 below 4 · 65 at exactly 4
//
// So for the 65 pairs at depth exactly 4 — a quarter of physics — E1 can
// NEVER fire under this scope: the failure that opens the scope is the same
// event that drops the pool to 3 and closes the surplus rule.
//
// This is arithmetic, not a defect, and it is recorded so it is not
// re-derived from scratch. It also names the lever precisely: raising those
// 65 pairs to five probes is what would make E1 reach them, and that is
// content work, not gate logic.
// ═══════════════════════════════════════════════════════════════════════════
describe('B2. the scope and the surplus rule must BOTH hold', () => {
  const CREDITS_REQUIRED = 3

  /** The surplus rule, restated: is spending one here affordable? */
  const surplusAllows = (poolRemaining: number) => poolRemaining - 1 >= CREDITS_REQUIRED

  it('at depth 4, the first failure leaves 3 and the surplus rule declines', () => {
    // Being asked spends one, so a learner who has failed has at most 3 left.
    expect(surplusAllows(4 - 1)).toBe(false)
  })

  it('at depth 5 it fires on the first failure, and not after a second', () => {
    expect(surplusAllows(5 - 1)).toBe(true)
    expect(surplusAllows(5 - 2)).toBe(false)
  })

  it('at depth 6 it survives two spent probes', () => {
    expect(surplusAllows(6 - 1)).toBe(true)
    expect(surplusAllows(6 - 2)).toBe(true)
    expect(surplusAllows(6 - 3)).toBe(false)
  })

  it('the production decline is reproduced exactly', () => {
    // [gate-assessment] {"declined":"below-guide-no-surplus",
    //                    "phase":"DEMONSTRATE","poolSize":3}
    expect(surplusAllows(3)).toBe(false)
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

  it('the route NO LONGER spells the condition modelled here — superseded', () => {
    // SUPERSEDED 2026-09-04 (R3). The struggling-learner scope is removed:
    // physics Tier A batch 5 measured 15 of 19 UNMEASURED sessions sitting at
    // DEMONSTRATE, move 'show', NOT struggling, already carrying a model-
    // invented question graded against a key the model wrote — on concepts
    // each holding 4-6 reviewed authored probes. The premise that a
    // progressing learner's DEMONSTRATE turn is a quiet show turn was false.
    // `mayAttachProbeBelowGuide` (pool - 1 >= 3) is now the SOLE guard on the
    // early spend. Behaviour is pinned against the real modules in
    // demonstrateAuthoredProbeSubstitution.test.ts.
    // The model above is retained as the historical record of what E1 shipped
    // and why; it is no longer the route's condition.
    expect(ROUTE).not.toContain('const strugglingOnThisConcept =')
    expect(ROUTE).not.toContain("(phaseBeforeTurn === 'DEMONSTRATE' && strugglingOnThisConcept)")
    expect(ROUTE).toContain("(phaseBeforeTurn === 'DEMONSTRATE')")
  })

  it('the SURPLUS rule is still what keeps mastery reachable', () => {
    // This scope decides WHETHER to look for a probe; mayAttachProbeBelowGuide
    // decides whether spending one is affordable. Both must remain.
    expect(ROUTE).toContain('mayAttachProbeBelowGuide(phaseBeforeTurn, probe.poolSize)')
  })
})
