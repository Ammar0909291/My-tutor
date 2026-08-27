/**
 * PHASE H1 — A WEAK LEARNER'S CONFUSION MUST BE VISIBLE, AND MUST SHORTEN THE REPLY.
 *
 * ── THE TWO DEFECTS THIS FILE PINS ──────────────────────────────────────────
 *
 * ROOT CAUSE A — the confusion detector only speaks textbook English.
 *   Measured (Phase H, read-only) against the real modules: the persona's own
 *   sentence, "sir i not understand this", returns
 *   `detectLearnerRequest -> null`, `detectFailureState -> null`,
 *   `isDontKnowSignal -> false`. It is invisible to every deterministic reader
 *   on the turn path, so the remediation branch of `advanceConversationState`
 *   — the branch that counts the struggle, re-shows the phase and raises
 *   frustration — never runs. 19 of 27 measured confusion phrasings were
 *   invisible in exactly this way, including grammatical English
 *   ("i cannot understand", "i am not able to understand").
 *
 * ROOT CAUSE B — the first confusion had no effect on response length.
 *   `responseBudget` only restricts at `consecutiveFailures >= 2`, so an
 *   expert-register learner's FIRST admission of confusion was answered with
 *   an unbounded reply. Measured: expert/0 -> null, expert/1 -> null,
 *   expert/2 -> 6.
 *
 * ── WHAT THIS FILE DELIBERATELY DOES NOT DO ─────────────────────────────────
 * It does not turn every phrase containing "difficult", "hard" or "explain"
 * into a confusion signal. Over-matching is the more expensive failure: a
 * false positive spends `consecutiveFailures`, raises `frustrationLevel`, and
 * re-shows a phase for a learner who was doing fine. Every negative control
 * below is a phrase a REAL learner sends while progressing normally, and each
 * one is asserted to stay out.
 */
import { describe, it, expect } from 'vitest'
import { detectLearnerRequest, isBareAcknowledgement } from '@/lib/teaching/masteryGate'
import { detectFailureState, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'
import {
  advanceConversationState, initialConversationState, responseBudget, type Register,
} from '@/lib/teaching/conversationState'
import { isExplicitTopicRequest } from '@/lib/teaching/visual/session'
import { asksForPractice } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'

// ── ROOT CAUSE A ────────────────────────────────────────────────────────────

/**
 * The phrases Phase H measured as invisible, grouped by the family each one
 * belongs to. Grouping is not decoration: each family is ONE extension of ONE
 * existing alternative in `EXPLAIN_DIFF_RE`, which is what keeps this a widened
 * pattern rather than a second detector.
 */
const NEWLY_SEEN: Array<[family: string, phrase: string]> = [
  // Family 1 — negated understanding with a dropped or non-standard auxiliary.
  // The existing rule is `i (don't|do not) understand`; these are the same
  // sentence from a learner who does not write standard English.
  ['negated-understanding', 'sir i not understand this'],
  ['negated-understanding', 'i not understand'],
  ['negated-understanding', 'i not understand this'],
  ['negated-understanding', 'not understand sir'],
  ['negated-understanding', 'i cannot understand'],
  ['negated-understanding', "i can't understand this"],
  ['negated-understanding', 'i am not able to understand'],
  ['negated-understanding', 'i am not understanding anything'],
  // Family 2 — "not getting it", the same claim with a different verb.
  ['not-getting-it', 'i am not getting it'],
  ['not-getting-it', 'i not getting this'],
  // Family 3 — an explicit request to be told it more simply. The existing
  // rule already covers "explain it more simply" and "simpler"; these are the
  // same request in the register the persona actually uses.
  ['simplify', 'please explain easy'],
  ['simplify', 'explain in easy way'],
  ['simplify', 'explain in simple words'],
  ['simplify', 'simple please'],
  ['simplify', 'more simple sir'],
  ['simplify', 'make it simple'],
  // Family 4 — self-reported weakness. Unambiguous: nobody writes this while
  // succeeding.
  ['weakness', 'i am weak in this'],
  ['weakness', "i'm weak in this topic"],
  // Family 5 — "teach me" with NOTHING after it. A bare re-teach request. It
  // is anchored to the end of the message precisely so that "teach me about
  // relativity" — which NAMES a topic and is a topic request, not confusion —
  // cannot reach it. See the negative control below.
  ['bare-teach-me', 'teach me'],
  ['bare-teach-me', 'ok sir please teach me'],
  ['bare-teach-me', 'sir please teach me again'],
]

describe('ROOT CAUSE A — the confusion a weak learner actually writes is seen', () => {
  for (const [family, phrase] of NEWLY_SEEN) {
    it(`[${family}] "${phrase}" reaches the remediation path`, () => {
      expect(detectLearnerRequest(phrase)).toBe('explain_differently')
    })
  }

  it('the standard-English phrasings that already worked still work', () => {
    // The regression risk of widening a pattern is that a rewrite loses a
    // branch. These eight were measured as SEEN before H1 and must stay seen.
    for (const p of [
      "i don't understand", 'I do not understand', "I'm confused", 'I am lost',
      'no idea', "didn't get it", 'makes no sense', 'explain it differently',
      'explain it more simply', 'can you say it differently',
    ]) {
      expect(detectLearnerRequest(p), p).toBe('explain_differently')
    }
  })
})

describe('ROOT CAUSE A — the negative controls stay out', () => {
  /**
   * A learner who is FINE. Each of these is a phrase that shares vocabulary
   * with the widened families and must not be read as distress.
   */
  it('an acknowledgement is never a request, and never mastery evidence', () => {
    for (const p of ['ok', 'ok sir', 'okay', 'yes', 'yes sir', 'got it', 'thanks']) {
      expect(detectLearnerRequest(p), p).not.toBe('explain_differently')
    }
    // The meaning of "ok" is explicitly out of H1's scope — pinned unchanged.
    expect(isBareAcknowledgement('ok')).toBe(true)
    expect(isBareAcknowledgement('yes')).toBe(true)
  })

  it('a claim of understanding is not a claim of confusion', () => {
    expect(detectLearnerRequest('I understand')).toBeNull()
    expect(detectLearnerRequest('I understand this now')).toBeNull()
    expect(detectLearnerRequest('now i understand sir')).toBeNull()
    expect(detectLearnerRequest('i understand it')).toBeNull()
  })

  it('an ordinary content question is not distress', () => {
    for (const p of [
      'please explain why option B is wrong',
      'why does this happen',
      'what is the formula',
      'why is the answer B and not C',
      'can you explain the second step',
    ]) {
      expect(detectLearnerRequest(p), p).not.toBe('explain_differently')
    }
  })

  it('CHARACTERIZATION — "I don\'t understand why B is wrong" was already a request, and still is', () => {
    // Named as a negative control in the H1 brief. It is NOT changed here, and
    // the honest reason is that it is PRE-EXISTING behaviour with a defensible
    // reading: the learner did say they do not understand something. Changing
    // it would mean teaching this detector to parse what follows "understand",
    // which is the unbounded-ambiguity the brief's own stop rule warns about.
    // Pinned so a later pass changes it deliberately rather than by accident.
    expect(detectLearnerRequest("I don't understand why B is wrong")).toBe('explain_differently')
  })

  it('a NAMED topic request is a topic request, not confusion', () => {
    // The whole reason the bare-teach-me pattern is end-anchored.
    expect(detectLearnerRequest('teach me about relativity')).toBeNull()
    expect(detectLearnerRequest('teach me quantum mechanics')).toBeNull()
    expect(detectLearnerRequest('please teach me about the mole concept')).toBeNull()
    // …and the excursion reader that owns topic requests is untouched.
    expect(isExplicitTopicRequest('teach me about relativity')).toBe(true)
  })

  it('difficulty acknowledged WITH intent to continue is not a request to re-explain', () => {
    expect(detectLearnerRequest('this is difficult but I want to continue')).toBeNull()
    expect(detectLearnerRequest('it is hard but interesting')).toBeNull()
  })

  it('"not following the instructions" is a compliance complaint, not confusion', () => {
    // PRE-EXISTING FALSE POSITIVE, fixed here because H1's brief names it.
    // The bare `not following` alternative matched any object at all, so a
    // learner (or a quoted prompt) saying "not following the instructions"
    // spent a failure and re-showed the phase. "not following" with a PRONOUN
    // object — the actual confusion idiom — is unchanged.
    expect(detectLearnerRequest('not following the instructions')).toBeNull()
    expect(detectLearnerRequest('you are not following the instructions')).toBeNull()
    expect(detectLearnerRequest('not following')).toBe('explain_differently')
    expect(detectLearnerRequest("i'm not following you")).toBe('explain_differently')
    expect(detectLearnerRequest('not following this')).toBe('explain_differently')
  })

  it('a request for practice is still a request for practice', () => {
    // `asksForPractice` is a separate reading with its own arbitration rung;
    // routing it through the learner-request vocabulary would DENY the
    // authored probe (see masteryGate's own note). Unchanged.
    expect(asksForPractice('i want practice please')).toBe(true)
    expect(detectLearnerRequest('i want practice please')).toBeNull()
  })
})

describe('ROOT CAUSE A — detector ORDER is preserved', () => {
  it('an explicit ask for a visual still outranks a statement of confusion', () => {
    // masteryGate's documented order: asksForAVisual -> EXPLAIN_DIFF_RE ->
    // mentionsAVisualMedium -> EXAMPLE_RE. The widened patterns sit inside the
    // SECOND of those, so the first must still win.
    expect(detectLearnerRequest('i not understand, can you show me a picture')).toBe('diagram')
    expect(detectLearnerRequest('sir i not understand this, draw a diagram please')).toBe('diagram')
  })

  it('a bare mention of a medium still ranks BELOW confusion', () => {
    expect(detectLearnerRequest('i not understand this diagram')).toBe('explain_differently')
  })

  it('a real-life-example request still ranks below confusion', () => {
    expect(detectLearnerRequest('i not understand, give me a real life example'))
      .toBe('explain_differently')
  })
})

describe('ROOT CAUSE A — the recovery detector is NOT duplicated', () => {
  it('phrases that already had a failure state keep it', () => {
    // H1 adds no pattern to recoveryGuard. These were already visible THERE,
    // and recovery outranks everything in turn arbitration — that is unchanged.
    expect(detectFailureState('this is too hard for me')).toBe('too_hard')
    expect(detectFailureState('i dont get this sir')).toBe('dont_understand')
    expect(detectFailureState("i don't know")).toBe('dont_know')
    // `isDontKnowSignal` takes the KEY, not the message — it is the membership
    // test over `detectFailureState`'s result, not a second reader of the text.
    expect(isDontKnowSignal(detectFailureState("i don't know"))).toBe(true)
    expect(isDontKnowSignal(detectFailureState('sir i not understand this'))).toBe(false)
  })

  it('KNOWN GAP, reported not patched: bare intensified difficulty stays invisible', () => {
    // "its very difficult" / "too difficult sir" belong to recoveryGuard's
    // `too_hard` family, whose canonical form ("this is too hard") it already
    // owns. Widening a RECOVERY trigger suppresses teaching for the whole turn
    // and is a different decision from widening a remediation trigger, so it
    // is left for a separate pass rather than smuggled in here.
    expect(detectFailureState('too difficult sir')).toBeNull()
    expect(detectLearnerRequest('too difficult sir')).toBeNull()
  })
})

// ── ROOT CAUSE B ────────────────────────────────────────────────────────────

/**
 * STEP 2 — WHICH STATE FEEDS THE BUDGET.
 *
 * Three candidates were compared: `consecutiveFailures`, `remediationCount`
 * and `frustrationLevel`. The remediation branch writes all three, so all
 * three are "already produced". `consecutiveFailures` is chosen because it is
 * ALREADY the parameter `responseBudget` takes and already the value the route
 * passes — so the fix is a threshold change inside one pure function and
 * touches no call site, no route, and no state shape. `remediationCount` would
 * have needed a new argument and a new call site; `frustrationLevel` is a
 * derived, rounded blend of the other two and is the least direct reading of
 * "this learner is struggling right now".
 */
describe('ROOT CAUSE B — the budget table, pinned', () => {
  const CELL: Array<[Register, number, number | null]> = [
    // register        failures  expected
    ['beginner', 0, 4], ['beginner', 1, 4], ['beginner', 2, 2], ['beginner', 3, 2],
    ['intermediate', 0, 7], ['intermediate', 1, 7], ['intermediate', 2, 4], ['intermediate', 3, 4],
    // The ONE cell H1 changes: an expert-register learner's first struggle used
    // to be answered with an unbounded reply.
    ['expert', 0, null], ['expert', 1, 7], ['expert', 2, 6], ['expert', 3, 6],
  ]

  for (const [register, failures, expected] of CELL) {
    it(`${register} @ ${failures} failure(s) -> ${String(expected)}`, () => {
      expect(responseBudget(register, failures, 0)).toBe(expected)
    })
  }

  it('exactly ONE cell moved — everything else is byte-identical to before H1', () => {
    /** The pre-H1 function, restated so the diff is computed rather than claimed. */
    const before = (r: Register, f: number, d = 0): number | null => {
      const struggling = f >= 2
      const fluent = !struggling && d >= 2
      if (r === 'beginner') return struggling ? 2 : fluent ? 2 : 4
      if (r === 'intermediate') return struggling ? 4 : fluent ? 4 : 7
      return struggling ? 6 : fluent ? 6 : null
    }
    const moved: string[] = []
    for (const r of ['beginner', 'intermediate', 'expert'] as const) {
      for (let f = 0; f <= 5; f += 1) {
        for (const d of [0, 1, 2, 5, 20]) {
          if (responseBudget(r, f, d) !== before(r, f, d)) moved.push(`${r}/f${f}/d${d}`)
        }
      }
    }
    expect(moved).toEqual(['expert/f1/d0', 'expert/f1/d1'])
  })

  it('7 is not a new number — it is the intermediate register\'s own ceiling', () => {
    // A first struggle drops an expert to the next register down's ordinary
    // budget. Repeated struggle still applies the existing, tighter 6.
    expect(responseBudget('expert', 1, 0)).toBe(responseBudget('intermediate', 0, 0))
    expect(responseBudget('expert', 2, 0)).toBeLessThan(responseBudget('expert', 1, 0)!)
  })

  it('demonstrated fluency still wins over a single wobble', () => {
    // An expert who has answered correctly twice and then asks one clarifying
    // question is not "struggling" — the existing fluent tier (6) still applies
    // and is tighter than the new unsettled tier, so this cannot widen a reply.
    expect(responseBudget('expert', 1, 2)).toBe(6)
  })

  it('struggle only ever SHORTENS — the invariant every register obeys', () => {
    for (const r of ['beginner', 'intermediate', 'expert'] as const) {
      let prev = responseBudget(r, 0, 0) ?? Number.POSITIVE_INFINITY
      for (let f = 1; f <= 4; f += 1) {
        const next = responseBudget(r, f, 0) ?? Number.POSITIVE_INFINITY
        expect(next, `${r} @ ${f}`).toBeLessThanOrEqual(prev)
        prev = next
      }
    }
  })
})

// ── THE TWO HALVES, JOINED ──────────────────────────────────────────────────

const evidence = (over: Partial<Parameters<typeof advanceConversationState>[1]> = {}) => ({
  askedQuestion: false, signalCorrect: null, recoveryFired: false, ...over,
})

describe('the original failure, end to end and deterministic', () => {
  it('"sir i not understand this" now spends a struggle and bounds the reply', () => {
    const s0 = initialConversationState()
    expect(s0.consecutiveFailures).toBe(0)
    expect(responseBudget('expert', s0.consecutiveFailures, 0)).toBeNull()  // unbounded, correctly

    const request = detectLearnerRequest('sir i not understand this')
    expect(request).toBe('explain_differently')

    const s1 = advanceConversationState(s0, evidence({ learnerRequest: request }))
    expect(s1.consecutiveFailures).toBe(1)
    expect(s1.remediationCount).toBe(1)
    expect(s1.explanationCount).toBe(1)
    expect(s1.frustrationLevel).toBeGreaterThan(s0.frustrationLevel)

    // THE POINT OF THE WHOLE PHASE: the very next reply is bounded.
    const budget = responseBudget('expert', s1.consecutiveFailures, 0)
    expect(budget).not.toBeNull()
    expect(budget).toBe(7)
  })

  it('"ok sir" afterwards does NOT erase the struggling state', () => {
    // The explicit constraint from the brief. An acknowledgement is not
    // evidence of understanding, and must not restore the unbounded budget.
    let s = advanceConversationState(
      initialConversationState(),
      evidence({ learnerRequest: 'explain_differently' }),
    )
    const afterConfusion = { ...s }

    s = advanceConversationState(s, evidence())           // "ok sir": no signal at all
    expect(s.consecutiveFailures).toBe(afterConfusion.consecutiveFailures)
    expect(s.remediationCount).toBe(afterConfusion.remediationCount)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(responseBudget('expert', s.consecutiveFailures, 0)).toBe(7)
  })

  it('repeated confusion still reaches the existing, tighter bound', () => {
    let s = initialConversationState()
    for (let i = 0; i < 2; i += 1) {
      s = advanceConversationState(s, evidence({ learnerRequest: 'explain_differently' }))
    }
    expect(s.consecutiveFailures).toBe(2)
    expect(responseBudget('expert', s.consecutiveFailures, 0)).toBe(6)
  })

  it('a learner who never struggles is completely unaffected', () => {
    let s = initialConversationState()
    s = advanceConversationState(s, evidence({ askedQuestion: true }))
    expect(s.consecutiveFailures).toBe(0)
    expect(responseBudget('expert', s.consecutiveFailures, 0)).toBeNull()
  })
})

// ── STEP 6 — the two rated sessions, replayed without a provider ────────────

/**
 * The exact learner turns from the two sessions Phase H rated. Replayed
 * through the REAL readers the route uses — `readTurnIntent` (which owns
 * `detectLearnerRequest` and `detectFailureState`), the real fold, and the
 * real budget — so the deterministic half of each session is measured rather
 * than described. No provider, no network, no database: this says what the
 * ENGINE now decides, and deliberately claims nothing about what the model
 * then writes.
 */
describe('STEP 6 — replay: the two rated sessions', () => {
  /** The register these sessions ran at (expert = the unbounded row). */
  const REGISTER: Register = 'expert'

  const replay = (turns: string[]) => {
    let s = initialConversationState()
    let prior: string | null = null
    return turns.map((message) => {
      const intent = readTurnIntent(message, prior)
      s = advanceConversationState(s, evidence({
        learnerRequest: intent.learnerRequest === 'explain_differently' ? 'explain_differently' : null,
        recoveryFired: intent.failureState !== null,
      }))
      prior = message
      return {
        message,
        learnerRequest: intent.learnerRequest,
        failureState: intent.failureState,
        consecutiveFailures: s.consecutiveFailures,
        remediationCount: s.remediationCount,
        budget: responseBudget(REGISTER, s.consecutiveFailures, s.correctAtCheck + s.correctAtPractice),
      }
    })
  }

  it('chemistry polarity — the confusion is seen on the turn it is written', () => {
    const t = replay(['sir i not understand this', 'ok sir', 'ok sir please teach me'])

    // T1 — the sentence that was invisible before H1.
    expect(t[0].learnerRequest).toBe('explain_differently')
    expect(t[0].consecutiveFailures).toBe(1)
    expect(t[0].remediationCount).toBe(1)
    expect(t[0].budget).toBe(7)              // was null — an unbounded reply

    // T2 — "ok sir". THE CRITICAL ASSERTION OF THIS PHASE.
    expect(t[1].learnerRequest).toBeNull()   // not a request
    expect(t[1].failureState).toBeNull()     // not distress either
    expect(t[1].consecutiveFailures).toBe(1) // does NOT erase the struggle
    expect(t[1].remediationCount).toBe(1)    // does NOT clear remediation
    expect(t[1].budget).toBe(7)              // does NOT restore the unbounded reply

    // T3 — a bare re-teach request is now seen, and tightens further.
    expect(t[2].learnerRequest).toBe('explain_differently')
    expect(t[2].consecutiveFailures).toBe(2)
    expect(t[2].budget).toBe(6)
  })

  it('physics spacetime — the same persona, and mastery is never fabricated', () => {
    const t = replay(['sir i not understand this', 'ok sir', 'ok', 'i not understand this'])
    expect(t.map((x) => x.consecutiveFailures)).toEqual([1, 1, 1, 2])
    expect(t.map((x) => x.budget)).toEqual([7, 7, 7, 6])
    // Four turns, three of them acknowledgements or confusion, and NOT ONE of
    // them is evidence of understanding. `correctAtCheck`/`correctAtPractice`
    // are written by graded answers only — H1 changes neither.
    let s = initialConversationState()
    for (const m of ['sir i not understand this', 'ok sir', 'ok', 'i not understand this']) {
      const intent = readTurnIntent(m, null)
      s = advanceConversationState(s, evidence({
        learnerRequest: intent.learnerRequest === 'explain_differently' ? 'explain_differently' : null,
      }))
    }
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.masteryVerified ?? false).toBe(false)
  })

  it('the BEFORE state, restated, so the delta is computed not claimed', () => {
    // The pre-H1 readers, for the persona's own first sentence.
    const PRE_H1_EXPLAIN_DIFF = /\b(explain\s+(it\s+)?(differently|again|another\s+way|in\s+a\s+different\s+way|more\s+simply|simpler)|different\s+explanation|another\s+explanation|say\s+it\s+differently|i\s+(don'?t|do\s+not)\s+understand|i(?:'?m|\s+am)\s+(confused|lost)|no\s+idea|not\s+following|didn'?t\s+get\s+(it|that)|makes?\s+no\s+sense)\b/i
    expect(PRE_H1_EXPLAIN_DIFF.test('sir i not understand this')).toBe(false)   // invisible
    expect(detectLearnerRequest('sir i not understand this')).toBe('explain_differently')  // seen
  })
})
