/**
 * PHASE 4 · ISS-01 RECONCILIATION — the complete evidence base.
 *
 * WHAT THIS ADDS TO `ladderConformance.test.ts`, AND WHY IT IS SEPARATE.
 *
 * ladderConformance.test.ts is the ISS-01 burn-down instrument: 12 rows,
 * (phase × correct|incorrect), pinning D1/D2/D3. It is correct and it stays.
 * But its 12 rows enumerate TWO of the SIX evidence kinds the shipping fold
 * accepts, and the four it omits are the ones that carry the reachability
 * law, the anti-hollow-advancement boundary, and the degraded-turn guard.
 * Enumerating only the two both machines happen to share makes the canonical
 * machine look closer to shippable than it is.
 *
 * This file enumerates the FULL evidence vocabulary of both machines and the
 * full state space of each, and it records four defects ISS-01 does not name.
 * One of them (D4) is decisive: it means the canonical machine cannot be
 * promoted even if D1/D2/D3 were all fixed.
 *
 *   D4  ABSORBING BARRIER. Under canonical authority, bridged to the move
 *       layer by the repo's own `canonicalToLegacy`, a PERFECT learner never
 *       leaves DEMONSTRATE. Canonical DEMONSTRATE and NAME both map to legacy
 *       DEMONSTRATE, whose decided move is unconditionally `show`; a `show`
 *       turn asks nothing, so no SIGNAL is emitted, so `signalCorrect` is
 *       null, and `step()` holds on a null signal. The canonical machine has
 *       no counterpart to conversationState.ts's "reachability law" and no
 *       `acknowledgement` evidence, which are the two things that make the
 *       shipping ladder escape that exact fixed point. D2 measured the
 *       canonical walk by FEEDING it correct signals on turns the runtime
 *       would never have asked on — the optimistic reading. In the runtime
 *       the machine never reaches ASSESS at all.
 *
 *   D5  EVIDENCE-VOCABULARY GAP. Canonical `TurnEvidence` has 4 fields;
 *       the shipping `TurnEvidence` has 20+. The canonical machine cannot
 *       express `acknowledgement`, `learnerRequest: 'explain_differently'`,
 *       `degradedTurn` or `signalVerificationStatus` — i.e. it cannot
 *       represent the P4/F7 degraded-turn guard or strict-mastery evidence.
 *
 *   D6  TWO STAGE-CEILING AUTHORITIES. `PHASE_MAX_QUESTION_STAGE`
 *       (conversationState, read by route.ts and by simulation invariant I-1)
 *       and `getStageCeiling` (kernel/tsm/phases, read by BASE_PACK) agree on
 *       ALL SIX legacy names and disagree at exactly three canonical names —
 *       NAME (+1), INDEPENDENT (−1), ASSESS (+2). Today they agree because
 *       the phase is passed verbatim in the legacy vocabulary.
 *
 *   D7  A DOWNWARD TRANSITION THAT MOVES UP. `step()` labels every failure
 *       edge `direction: 'down'` without consulting the index it computed.
 *       At DIAGNOSE/ANCHOR with `demonstrated: true` the floor is DEMONSTRATE
 *       (index 2), so a failure moves the learner FORWARD two states while
 *       the provenance record says it dropped them.
 *
 * METHOD. Both machines are pure, total functions over small finite state
 * spaces, so enumeration is complete and a production shadow would prove
 * strictly less. Nothing here is sampled and nothing here is a regex.
 *
 * This file changes no production behaviour. It pins the current behaviour of
 * both ladders so that the reconciliation decision (ISS-01 Option A/B/C) is
 * taken against measured facts, and so that whichever option is chosen fails
 * loudly here rather than silently in front of a learner.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, decideNextMoveDetailed,
  PHASE_ORDER, PHASE_MAX_QUESTION_STAGE,
  type ConversationState, type TeachingPhase, type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { initialMachineState, step, machineFromLegacy, type MachineState } from '@/lib/kernel/tsm/machine'
import {
  PHASE_ORDER_10, canonicalToLegacy, legacyToCanonical,
  STAGE_CEILING, LEGACY_STAGE_CEILING, getStageCeiling, type CanonicalPhase,
} from '@/lib/kernel/tsm/phases'
import {
  masteryVerified, masteryVerifiedStrict,
  MASTERY_CHECK_REQUIRED, MASTERY_PRACTICE_REQUIRED,
} from '@/lib/teaching/masteryGate'
import { checkEpisode, type EpisodeTurn } from '@/lib/kernel/simulation/invariants'

const CONCEPT = 'phys.mech.newtons-first-law'

// ── the full evidence vocabulary of the SHIPPING fold ───────────────────────

type EvidenceKind =
  | 'correct' | 'incorrect' | 'recovery'
  | 'acknowledgement' | 'explain_differently' | 'no-signal'

const LEGACY_EVIDENCE: Record<EvidenceKind, TurnEvidence> = {
  correct:             { askedQuestion: true,  signalCorrect: true,  recoveryFired: false },
  incorrect:           { askedQuestion: true,  signalCorrect: false, recoveryFired: false },
  recovery:            { askedQuestion: false, signalCorrect: null,  recoveryFired: true },
  acknowledgement:     { askedQuestion: false, signalCorrect: null,  recoveryFired: false, acknowledgement: true },
  explain_differently: { askedQuestion: false, signalCorrect: null,  recoveryFired: false, learnerRequest: 'explain_differently' },
  'no-signal':         { askedQuestion: false, signalCorrect: null,  recoveryFired: false },
}

const EVIDENCE_KINDS = Object.keys(LEGACY_EVIDENCE) as EvidenceKind[]

function legacyStep(phase: TeachingPhase, kind: EvidenceKind, demonstrated: boolean): ConversationState {
  return advanceConversationState(
    { ...initialConversationState(CONCEPT), phase, demonstrated },
    LEGACY_EVIDENCE[kind],
  )
}

/** The canonical machine's evidence vocabulary, in full. It has four members;
 *  two of the six above (acknowledgement, explain_differently) have NO
 *  canonical representation at all — see D5. */
function canonicalStep(phase: CanonicalPhase, kind: EvidenceKind, demonstrated: boolean) {
  const ev = {
    correct:     { signalCorrect: true,  signalConfidence: 'high' as const, recoveryFired: false, learnerRestated: true },
    incorrect:   { signalCorrect: false, signalConfidence: null,            recoveryFired: false, learnerRestated: false },
    recovery:    { signalCorrect: null,  signalConfidence: null,            recoveryFired: true,  learnerRestated: false },
    'no-signal': { signalCorrect: null,  signalConfidence: null,            recoveryFired: false, learnerRestated: false },
  }[kind as 'correct' | 'incorrect' | 'recovery' | 'no-signal']
  return step({ ...initialMachineState(phase), demonstrated }, ev)
}

// ── A · complete state spaces, enumerated ──────────────────────────────────

describe('A — the two state spaces, enumerated in full', () => {
  it('the shipping ladder is total over 6 phases x 6 evidence kinds x demonstrated', () => {
    const rows: string[] = []
    for (const demonstrated of [true, false]) {
      for (const phase of PHASE_ORDER) {
        for (const kind of EVIDENCE_KINDS) {
          const next = legacyStep(phase, kind, demonstrated)
          expect(PHASE_ORDER, `${phase}+${kind} left the ladder`).toContain(next.phase)
          rows.push(`${demonstrated ? 'D' : '-'} ${phase}+${kind}=>${next.phase}`)
        }
      }
    }
    // 2 x 6 x 6 — every cell defined, none throwing, none escaping the ladder.
    expect(rows).toHaveLength(72)
    expect(new Set(rows).size).toBe(72)
  })

  it('the canonical machine is total over 10 states x its 4 evidence kinds', () => {
    const rows: string[] = []
    for (const demonstrated of [true, false]) {
      for (const phase of PHASE_ORDER_10) {
        for (const kind of ['correct', 'incorrect', 'recovery', 'no-signal'] as const) {
          const r = canonicalStep(phase, kind, demonstrated)
          expect(PHASE_ORDER_10, `${phase}+${kind} left the ladder`).toContain(r.result.to)
          rows.push(`${demonstrated ? 'D' : '-'} ${phase}+${kind}=>${r.result.to}`)
        }
      }
    }
    expect(rows).toHaveLength(80)
  })

  it('D5 — the canonical machine cannot EXPRESS two of the six shipping evidence kinds', () => {
    // Not a style observation. `acknowledgement` is the only input a learner
    // can give after a delivery turn (a delivery turn asks nothing, so no
    // SIGNAL exists to read); `explain_differently` is the remediation
    // request. Both have transitions in the shipping fold and no canonical
    // counterpart, so a canonical authority would discard them.
    const canonicalEvidenceFields = ['signalCorrect', 'signalConfidence', 'recoveryFired', 'learnerRestated']
    const shippingOnly = ['acknowledgement', 'learnerRequest', 'degradedTurn', 'signalVerificationStatus', 'deliveredTeaching']
    for (const f of shippingOnly) expect(canonicalEvidenceFields).not.toContain(f)

    // And each of the two has a real, non-identity transition in the shipping fold.
    expect(legacyStep('GUIDE', 'acknowledgement', true).phase).toBe('CHECK')
    // PHASE E (G-2): the first remediation request inside a mastery gate holds
    // the rung. G-2b (2026-08-30): the FIRST clarification now holds at GUIDE too. `remediationCount` is cleared by a graded-correct answer, so a learner alternating "explain it again" with a correct answer met this branch with the counter at 0 every time — every request was the first, and GUIDE<->DEMONSTRATE cycled for the whole lesson (reproduced: 12 turns, 6 correct answers, check 0). The SECOND request still steps down, which is what is asserted here now.
    // So the non-identity transition is asserted on the SECOND request, which
    // is where it now lives at every phase.
    const heldOnce = legacyStep('GUIDE', 'explain_differently', true)
    expect(heldOnce.phase).toBe('GUIDE')
    expect(advanceConversationState(heldOnce, {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
      learnerRequest: 'explain_differently',
    }).phase).toBe('DEMONSTRATE')
  })

  it('D5b — the canonical machine has no degraded-turn guard (the P4/F7 invariant)', () => {
    // Shipping: a degraded (outage-template) turn pins the phase AND the
    // mastery counters, even when a stray SIGNAL claims correctness.
    const degraded = advanceConversationState(
      { ...initialConversationState(CONCEPT), phase: 'CHECK', demonstrated: true },
      { askedQuestion: true, signalCorrect: true, recoveryFired: false, degradedTurn: true },
    )
    expect(degraded.phase).toBe('CHECK')
    expect(degraded.correctAtCheck).toBe(0)

    // Canonical: the same turn is indistinguishable from a real correct
    // answer, because `degradedTurn` cannot be represented.
    const m = canonicalStep('INDEPENDENT', 'correct', true)
    expect(m.state.correctAtCheck).toBe(1)
  })

  it('D5c — the canonical machine never writes the VERIFIED counters strict mastery reads', () => {
    let m = machineFromLegacy('OBSERVE', { demonstrated: true })
    for (let i = 0; i < 30 && m.phase !== 'TRANSFER'; i++) {
      m = step(m, { signalCorrect: true, signalConfidence: 'high', recoveryFired: false, learnerRestated: true }).state
    }
    expect(Object.keys(m)).not.toContain('verifiedCorrectAtCheck')
    expect(Object.keys(m)).not.toContain('verifiedCorrectAtPractice')
    // So masteryVerifiedStrict is blocked for a second, independent reason.
    const asState: ConversationState = {
      ...initialConversationState(CONCEPT),
      correctAtCheck: m.correctAtCheck, correctAtPractice: m.correctAtPractice,
    }
    expect(masteryVerifiedStrict(asState)).toBe(false)
  })
})

// ── B · MASTERY REACHABILITY, the hard invariant ───────────────────────────

describe('B — mastery reachability is a hard invariant of the authoritative ladder', () => {
  /** The invariant, stated once so both ladders are judged by the same
   *  predicate: an all-correct learner walking a legitimate progression must
   *  arrive somewhere masteryVerified() is true, WITHOUT any threshold being
   *  relaxed. */
  function reachesMasteryOnAllCorrect(walk: () => ConversationState): boolean {
    return masteryVerified(walk())
  }

  it('the thresholds this proof is conducted against are unchanged', () => {
    // Any future change to these constants invalidates every reachability
    // claim below and must fail here first.
    expect(MASTERY_CHECK_REQUIRED).toBe(1)
    expect(MASTERY_PRACTICE_REQUIRED).toBe(2)
  })

  it('SHIPPING LADDER: satisfied — 6 turns, check=1 practice=2, strict mastery too', () => {
    const walk = () => {
      let s: ConversationState = { ...initialConversationState(CONCEPT), demonstrated: true }
      const seen: TeachingPhase[] = [s.phase]
      for (let i = 0; i < 30 && s.phase !== 'TRANSFER'; i++) {
        s = advanceConversationState(s, {
          askedQuestion: true, signalCorrect: true, recoveryFired: false,
          signalVerificationStatus: 'CLEAN',
        })
        seen.push(s.phase)
      }
      expect(seen).toEqual(['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'PRACTICE', 'TRANSFER'])
      return s
    }
    const final = walk()
    expect(final.correctAtCheck).toBe(1)
    expect(final.correctAtPractice).toBe(2)
    expect(reachesMasteryOnAllCorrect(walk)).toBe(true)
    expect(masteryVerifiedStrict(final)).toBe(true)
  })

  it('CANONICAL MACHINE, optimistic reading: NOT satisfied (D2)', () => {
    // "Optimistic" because it feeds a correct signal on every turn, including
    // turns the runtime would never have asked on. Even so it fails.
    let m = machineFromLegacy('OBSERVE', { demonstrated: true })
    for (let i = 0; i < 30 && m.phase !== 'TRANSFER'; i++) {
      m = step(m, { signalCorrect: true, signalConfidence: 'high', recoveryFired: false, learnerRestated: true }).state
    }
    expect(m.phase).toBe('TRANSFER')
    expect(m.correctAtCheck).toBe(2)      // canonical gates INDEPENDENT at >= 2
    expect(m.correctAtPractice).toBe(1)   // canonical gates ASSESS at >= 1
    const asState: ConversationState = {
      ...initialConversationState(CONCEPT),
      correctAtCheck: m.correctAtCheck, correctAtPractice: m.correctAtPractice,
    }
    expect(masteryVerified(asState)).toBe(false)
  })

  it('D4 — CANONICAL MACHINE, runtime reading: the learner never reaches ASSESS at all', () => {
    // The honest simulation. The move layer reads the legacy vocabulary, so
    // the canonical phase is bridged by the repo's own `canonicalToLegacy`.
    // A question is asked only when the decided move is `ask`; a perfect
    // learner answers correctly when asked and emits NO signal otherwise,
    // because a turn that asks nothing produces no SIGNAL tag.
    function runCanonicalAsAuthority(start: CanonicalPhase, turns: number) {
      let m: MachineState = { ...initialMachineState(start), demonstrated: true }
      let teachSegmentsSinceQuestion = 0
      let questionsAskedSinceTeach = 0
      const visited = new Set<CanonicalPhase>([m.phase])
      for (let t = 0; t < turns; t++) {
        const asLegacy = canonicalToLegacy(m.phase) as TeachingPhase
        const view: ConversationState = {
          ...initialConversationState(CONCEPT),
          phase: asLegacy, demonstrated: true,
          teachSegmentsSinceQuestion, questionsAskedSinceTeach,
          correctAtCheck: m.correctAtCheck, correctAtPractice: m.correctAtPractice,
        }
        const move = decideNextMoveDetailed(view, {
          recoveryTurn: false, workedExampleFirst: false,
          legality: { hasEvidencedPriorKnowledge: true },
        }).move
        const asked = move === 'ask'
        m = step(m, {
          signalCorrect: asked ? true : null,
          signalConfidence: asked ? 'high' : null,
          recoveryFired: false,
          learnerRestated: true,
        }).state
        visited.add(m.phase)
        if (asked) { questionsAskedSinceTeach += 1; teachSegmentsSinceQuestion = 0 }
        else { teachSegmentsSinceQuestion += 1; questionsAskedSinceTeach = 0 }
      }
      return { final: m, visited }
    }

    for (const start of ['DIAGNOSE', 'ANCHOR', 'DEMONSTRATE'] as CanonicalPhase[]) {
      const { final, visited } = runCanonicalAsAuthority(start, 60)
      // Trapped at DEMONSTRATE, with both mastery counters still zero.
      expect(final.phase, `start=${start}`).toBe('DEMONSTRATE')
      expect(final.correctAtCheck, `start=${start}`).toBe(0)
      expect(final.correctAtPractice, `start=${start}`).toBe(0)
      // ASSESS and TRANSFER are never visited — 60 turns of perfect answers.
      expect(visited.has('ASSESS'), `start=${start}`).toBe(false)
      expect(visited.has('TRANSFER'), `start=${start}`).toBe(false)
    }
  })

  it('D4 root cause — canonical DEMONSTRATE/NAME decide `show`, and `show` emits no signal', () => {
    // Canonical DEMONSTRATE and NAME both bridge to legacy DEMONSTRATE, whose
    // decided move is unconditionally `show`.
    for (const cp of ['DEMONSTRATE', 'NAME'] as CanonicalPhase[]) {
      expect(canonicalToLegacy(cp)).toBe('DEMONSTRATE')
      const view: ConversationState = {
        ...initialConversationState(CONCEPT), phase: 'DEMONSTRATE', demonstrated: true,
      }
      expect(decideNextMoveDetailed(view, {
        recoveryTurn: false, workedExampleFirst: false,
        legality: { hasEvidencedPriorKnowledge: true },
      }).move).toBe('show')
      // …and a null signal holds the canonical machine where it is.
      expect(canonicalStep(cp, 'no-signal', true).result.to).toBe(cp)
    }
    // The shipping ladder escapes precisely because it does NOT require a
    // signal here — the reachability law and the acknowledgement branch both
    // move DEMONSTRATE forward on a no-signal / receipt turn.
    expect(legacyStep('DEMONSTRATE', 'no-signal', true).phase).toBe('GUIDE')
    expect(legacyStep('DEMONSTRATE', 'acknowledgement', true).phase).toBe('GUIDE')
  })
})

// ── C · transition reconciliation: every difference classified ─────────────

type Disposition =
  | 'preserved'            // canonical reproduces the shipping edge exactly
  | 'intentionally-changed'
  | 'intentionally-removed'
  | 'split-or-merged'
  | 'UNEXPLAINED'          // must be zero

interface Row {
  from: TeachingPhase
  kind: EvidenceKind
  shipping: TeachingPhase
  /** null = the canonical machine cannot represent this evidence kind. */
  canonicalAsLegacy: TeachingPhase | null
  disposition: Disposition
  /** The pedagogical reason. Required for every non-preserved row. */
  reason: string
}

/** The canonical machine's answer, expressed in the legacy vocabulary so the
 *  two are comparable at all. Uses the repo's own bridge, not a new one. */
function canonicalAsLegacy(from: TeachingPhase, kind: EvidenceKind): TeachingPhase | null {
  if (kind === 'acknowledgement' || kind === 'explain_differently') return null
  const r = canonicalStep(legacyToCanonical(from), kind, true)
  return canonicalToLegacy(r.result.to) as TeachingPhase
}

const RECONCILIATION: Row[] = [
  // ── correct ──────────────────────────────────────────────────────────────
  { from: 'OBSERVE', kind: 'correct', shipping: 'DEMONSTRATE', canonicalAsLegacy: 'DEMONSTRATE',
    disposition: 'preserved', reason: 'Recognition earns a demonstration in both ladders.' },
  { from: 'DEMONSTRATE', kind: 'correct', shipping: 'GUIDE', canonicalAsLegacy: 'DEMONSTRATE',
    disposition: 'UNEXPLAINED',
    reason: 'Canonical DEMONSTRATE→NAME collapses to DEMONSTRATE under the bridge, so the edge vanishes. Combined with D4 this is the absorbing barrier, not a pedagogical choice.' },
  { from: 'GUIDE', kind: 'correct', shipping: 'CHECK', canonicalAsLegacy: 'PRACTICE',
    disposition: 'UNEXPLAINED',
    reason: 'Canonical GUIDED→INDEPENDENT sends a learner straight to unaided practice with no formative check. Nothing in either spec argues for removing the check; it is an artefact of the CHECK→ASSESS mapping.' },
  { from: 'CHECK', kind: 'correct', shipping: 'PRACTICE', canonicalAsLegacy: 'TRANSFER',
    disposition: 'UNEXPLAINED',
    reason: 'One correct formative answer jumps to transfer-level work, skipping independent practice entirely — the assessment-skip the redesign exists to prevent, introduced BY the migration.' },
  { from: 'PRACTICE', kind: 'correct', shipping: 'PRACTICE', canonicalAsLegacy: 'PRACTICE',
    disposition: 'preserved', reason: 'Both hold at practice until the second success.' },
  { from: 'TRANSFER', kind: 'correct', shipping: 'TRANSFER', canonicalAsLegacy: 'TRANSFER',
    disposition: 'preserved', reason: 'Transfer is terminal in both; the Mastery module owns the exit.' },
  // ── incorrect ────────────────────────────────────────────────────────────
  { from: 'OBSERVE', kind: 'incorrect', shipping: 'DEMONSTRATE', canonicalAsLegacy: 'DEMONSTRATE',
    disposition: 'preserved', reason: 'A concluded diagnostic moves the machine; re-showing is the response in both.' },
  { from: 'DEMONSTRATE', kind: 'incorrect', shipping: 'DEMONSTRATE', canonicalAsLegacy: 'DEMONSTRATE',
    disposition: 'preserved', reason: 'DEMONSTRATE is the floor once demonstrated.' },
  { from: 'GUIDE', kind: 'incorrect', shipping: 'DEMONSTRATE', canonicalAsLegacy: 'GUIDE',
    disposition: 'UNEXPLAINED',
    reason: 'Shipping re-shows (drop one, floor DEMONSTRATE); canonical holds at GUIDE because FORMALIZE also bridges to GUIDE. A learner who fails guided practice is re-guided rather than re-shown.' },
  { from: 'CHECK', kind: 'incorrect', shipping: 'GUIDE', canonicalAsLegacy: 'CHECK',
    disposition: 'UNEXPLAINED',
    reason: 'Shipping drops to guidance; canonical holds at CHECK (ASSESS→REFLECT, both bridging to CHECK). Failing a check and being asked again is the interrogation loop the shipping ladder was corrected to avoid.' },
  { from: 'PRACTICE', kind: 'incorrect', shipping: 'CHECK', canonicalAsLegacy: 'GUIDE',
    disposition: 'UNEXPLAINED',
    reason: 'Canonical drops two rungs where shipping drops one (INDEPENDENT→GUIDED). Direction is defensible, magnitude is not — it contradicts the one-dimension-per-rung law the canonical header itself cites.' },
  { from: 'TRANSFER', kind: 'incorrect', shipping: 'PRACTICE', canonicalAsLegacy: 'CHECK',
    disposition: 'UNEXPLAINED',
    reason: 'A stumble at transfer drops two rungs instead of one. Same law, opposite direction from the CHECK+correct defect.' },
  // ── recovery ─────────────────────────────────────────────────────────────
  { from: 'OBSERVE', kind: 'recovery', shipping: 'DEMONSTRATE', canonicalAsLegacy: 'DEMONSTRATE',
    disposition: 'preserved', reason: 'Recovery preempts and re-shows in both.' },
  { from: 'DEMONSTRATE', kind: 'recovery', shipping: 'DEMONSTRATE', canonicalAsLegacy: 'DEMONSTRATE',
    disposition: 'preserved', reason: 'Floor.' },
  { from: 'GUIDE', kind: 'recovery', shipping: 'DEMONSTRATE', canonicalAsLegacy: 'GUIDE',
    disposition: 'UNEXPLAINED', reason: 'Same conflation as GUIDE+incorrect: recovery must exit one step BELOW entry, and canonical does not leave the phase.' },
  { from: 'CHECK', kind: 'recovery', shipping: 'GUIDE', canonicalAsLegacy: 'CHECK',
    disposition: 'UNEXPLAINED', reason: 'Recovery that does not move the machine re-issues the same directive — the fixed point the shipping fold documents at length.' },
  { from: 'PRACTICE', kind: 'recovery', shipping: 'CHECK', canonicalAsLegacy: 'GUIDE',
    disposition: 'UNEXPLAINED',
    reason: 'Canonical drops two rungs on a recovery utterance where shipping drops one, so a learner who says "I am lost" at practice is returned to guided teaching rather than to a formative check.' },
  { from: 'TRANSFER', kind: 'recovery', shipping: 'PRACTICE', canonicalAsLegacy: 'CHECK',
    disposition: 'UNEXPLAINED',
    reason: 'Canonical drops two rungs on a recovery utterance at transfer where shipping drops one, contradicting the one-dimension-per-rung law the canonical header itself cites.' },
  // ── acknowledgement (no canonical representation) ────────────────────────
  { from: 'OBSERVE', kind: 'acknowledgement', shipping: 'DEMONSTRATE', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED', reason: 'D5: canonical TurnEvidence cannot represent a receipt, so the delivery ladder has no exit after a turn that asked nothing.' },
  { from: 'DEMONSTRATE', kind: 'acknowledgement', shipping: 'GUIDE', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED',
    reason: 'D5, and this is the exact edge whose absence produces D4: a demonstration turn asks nothing, so the receipt is the only evidence that can ever arrive, and canonical discards it.' },
  { from: 'GUIDE', kind: 'acknowledgement', shipping: 'CHECK', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED',
    reason: 'D5: guided teaching ends on a receipt in the shipping ladder, which is how a learner reaches the first formative check at all. Canonical has no receipt, so the check is unreachable from guidance.' },
  { from: 'CHECK', kind: 'acknowledgement', shipping: 'CHECK', canonicalAsLegacy: null,
    disposition: 'intentionally-removed',
    reason: 'The shipping ladder deliberately refuses to move a MASTERY GATE on a receipt (anti-hollow-advancement). Canonical having no acknowledgement channel is accidentally correct here, and only here — the same absence is a defect at every delivery phase above.' },
  { from: 'PRACTICE', kind: 'acknowledgement', shipping: 'PRACTICE', canonicalAsLegacy: null,
    disposition: 'intentionally-removed',
    reason: 'Same anti-hollow-advancement protection: correctAtPractice moves only on a graded answer, so a receipt at practice is deliberately inert in both ladders.' },
  { from: 'TRANSFER', kind: 'acknowledgement', shipping: 'TRANSFER', canonicalAsLegacy: null,
    disposition: 'intentionally-removed',
    reason: 'Same anti-hollow-advancement protection at the terminal gate: "got it" must never be spendable as transfer evidence, and neither ladder lets it be.' },
  // ── explain_differently (no canonical representation) ────────────────────
  { from: 'OBSERVE', kind: 'explain_differently', shipping: 'DEMONSTRATE', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED', reason: 'D5: the remediation request is unrepresentable, so a learner asking to be re-taught is treated as a no-op.' },
  { from: 'DEMONSTRATE', kind: 'explain_differently', shipping: 'DEMONSTRATE', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED',
    reason: 'D5: shipping counts the remediation, raises frustration and re-shows at the floor. Canonical would treat "explain it differently" as a turn that carried no evidence and change nothing.' },
  { from: 'GUIDE', kind: 'explain_differently', shipping: 'GUIDE', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED',
    reason: 'D5 (amended by G-2b, 2026-08-30): the FIRST re-teach request at GUIDE now holds the rung and re-explains in place; the SECOND drops to DEMONSTRATE as before. It previously dropped on the first, and because remediationCount is cleared by a graded-correct answer, a learner alternating "explain it again" with a correct answer met that branch with the counter at 0 every time — so GUIDE<->DEMONSTRATE cycled for a whole lesson and CHECK was never reached. Measured live: 3 physics sessions and 1 chemistry session ended at check 0 / practice 0 in exactly that cycle. Canonical still has no channel for the request at all.' },
  { from: 'CHECK', kind: 'explain_differently', shipping: 'CHECK', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED',
    reason: 'D5 (amended by Phase E, G-2): the FIRST re-teach request inside a mastery gate now holds the gate and re-explains in place — measured live, demoting on a weak learner\'s commonest utterance meant the check was entered and left without ever being asked. The SECOND demotes to GUIDE as before. Canonical still has no channel for the request at all.' },
  { from: 'PRACTICE', kind: 'explain_differently', shipping: 'PRACTICE', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED',
    reason: 'D5 (amended by Phase E, G-2): a first remediation request during practice now holds the rung and re-explains; a second steps down one, as before. Canonical has no channel for it.' },
  { from: 'TRANSFER', kind: 'explain_differently', shipping: 'TRANSFER', canonicalAsLegacy: null,
    disposition: 'UNEXPLAINED',
    reason: 'D5 (amended by Phase E, G-2): a first remediation request at transfer holds the rung and re-explains; a second steps down one, as before. Canonical has no channel for it.' },
  // ── no-signal ────────────────────────────────────────────────────────────
  { from: 'OBSERVE', kind: 'no-signal', shipping: 'OBSERVE', canonicalAsLegacy: 'OBSERVE',
    disposition: 'preserved', reason: 'No evidence, no movement.' },
  { from: 'DEMONSTRATE', kind: 'no-signal', shipping: 'GUIDE', canonicalAsLegacy: 'DEMONSTRATE',
    disposition: 'UNEXPLAINED', reason: 'The reachability law: a phase whose decided move can never ask a question must not have a signal-gated exit. Canonical violates it, which IS D4.' },
  { from: 'GUIDE', kind: 'no-signal', shipping: 'GUIDE', canonicalAsLegacy: 'GUIDE',
    disposition: 'preserved', reason: 'GUIDE alternates teach/ask and escapes via teachSegmentsSinceQuestion.' },
  { from: 'CHECK', kind: 'no-signal', shipping: 'CHECK', canonicalAsLegacy: 'CHECK',
    disposition: 'preserved', reason: 'Gate holds without evidence.' },
  { from: 'PRACTICE', kind: 'no-signal', shipping: 'PRACTICE', canonicalAsLegacy: 'PRACTICE',
    disposition: 'preserved', reason: 'Gate holds without evidence.' },
  { from: 'TRANSFER', kind: 'no-signal', shipping: 'TRANSFER', canonicalAsLegacy: 'TRANSFER',
    disposition: 'preserved', reason: 'Terminal.' },
]

describe('C — every transition classified, none left unexplained by accident', () => {
  it('the table covers the complete cross-product (6 phases x 6 evidence kinds)', () => {
    expect(RECONCILIATION).toHaveLength(PHASE_ORDER.length * EVIDENCE_KINDS.length)
    for (const phase of PHASE_ORDER) {
      for (const kind of EVIDENCE_KINDS) {
        expect(
          RECONCILIATION.filter((r) => r.from === phase && r.kind === kind),
          `${phase}/${kind} missing`,
        ).toHaveLength(1)
      }
    }
  })

  it('every row states the SHIPPING ladder truthfully', () => {
    for (const r of RECONCILIATION) {
      expect(legacyStep(r.from, r.kind, true).phase, `${r.from}/${r.kind}`).toBe(r.shipping)
    }
  })

  it('every row states the CANONICAL machine truthfully', () => {
    for (const r of RECONCILIATION) {
      expect(canonicalAsLegacy(r.from, r.kind), `${r.from}/${r.kind}`).toBe(r.canonicalAsLegacy)
    }
  })

  it('every non-preserved row carries a pedagogical reason', () => {
    for (const r of RECONCILIATION) {
      if (r.disposition !== 'preserved') {
        expect(r.reason.length, `${r.from}/${r.kind} has no reason`).toBeGreaterThan(40)
      }
    }
  })

  it('PINNED: the UNEXPLAINED count is 21 today, and the ISS-01 exit criterion is 0', () => {
    // "Zero divergence" does NOT mean "canonical must equal legacy". It means
    // every difference must have an authoritative, explicitly accepted
    // meaning. Today 21 of 36 transitions have none — they are artefacts of
    // the CHECK↔ASSESS conflation and of the missing evidence vocabulary,
    // not decisions anyone took.
    //
    // ladderConformance.test.ts reports 7 of 12 because it enumerates two
    // evidence kinds. Over the full vocabulary the number is 21 of 36.
    const unexplained = RECONCILIATION.filter((r) => r.disposition === 'UNEXPLAINED')
    expect(unexplained).toHaveLength(21)

    const accepted = RECONCILIATION.filter((r) => r.disposition === 'intentionally-removed')
    expect(accepted).toHaveLength(3)   // the three mastery-gate receipts

    const preserved = RECONCILIATION.filter((r) => r.disposition === 'preserved')
    expect(preserved).toHaveLength(12)

    expect(unexplained.length + accepted.length + preserved.length).toBe(RECONCILIATION.length)
  })
})

// ── D6 / D7 · the two remaining defects ────────────────────────────────────

describe('D6 — two stage-ceiling authorities, agreeing only by vocabulary', () => {
  it('they agree on ALL SIX legacy names (which is why nothing is broken today)', () => {
    for (const p of PHASE_ORDER) {
      expect(getStageCeiling(p), p).toBe(PHASE_MAX_QUESTION_STAGE[p])
      expect(LEGACY_STAGE_CEILING[p], p).toBe(PHASE_MAX_QUESTION_STAGE[p])
    }
  })

  it('PINNED: they disagree at exactly three canonical names', () => {
    const disagreements = PHASE_ORDER_10
      .filter((cp) => STAGE_CEILING[cp] !== LEGACY_STAGE_CEILING[canonicalToLegacy(cp)])
      .map((cp) => [cp, STAGE_CEILING[cp], LEGACY_STAGE_CEILING[canonicalToLegacy(cp)]])
    expect(disagreements).toEqual([
      ['NAME', 3, 2],          // +1: canonical NAME allows identification
      ['INDEPENDENT', 5, 6],   // -1: canonical withholds calculation
      ['ASSESS', 6, 4],        // +2: the CHECK->ASSESS conflation, the one policyGate.ts warns about
    ])
  })

  it('the route table is UNDEFINED for canonical names, so a migration is silent', () => {
    const table = PHASE_MAX_QUESTION_STAGE as unknown as Record<string, number | undefined>
    for (const cp of ['DIAGNOSE', 'ANCHOR', 'NAME', 'FORMALIZE', 'GUIDED', 'INDEPENDENT', 'REFLECT', 'ASSESS']) {
      expect(table[cp], cp).toBeUndefined()
    }
    // DEMONSTRATE and TRANSFER collide by name — worse than undefined,
    // because they are silently REINTERPRETED rather than caught.
    expect(table.DEMONSTRATE).toBe(2)
    expect(table.TRANSFER).toBe(7)
  })

  it('CONSEQUENCE: simulation invariant I-1 goes BLIND on canonical phases', () => {
    const turn = (phase: string, stageCeiling: number): EpisodeTurn => ({
      turnIndex: 0,
      stateBefore: { ...initialConversationState(CONCEPT), phase: phase as TeachingPhase },
      decision: {
        move: 'ASK', stageCeiling, actionClass: null, provenance: [],
        budgets: { maxQuestions: 1, maxNewTerms: 2, maxParagraphs: 3 },
        vocabularyBans: [], fallbackChain: [],
      } as unknown as EpisodeTurn['decision'],
      recoveryActive: false,
    })
    // Legacy: a Stage-7 question at OBSERVE is caught.
    expect(checkEpisode([turn('OBSERVE', 7)]).map((v) => v.code)).toContain('I-1')
    // Canonical: the SAME violation is not caught, because the lookup is
    // undefined and `7 > undefined` is false. The merge gate stops checking.
    expect(checkEpisode([turn('ANCHOR', 7)]).map((v) => v.code)).not.toContain('I-1')
    expect(checkEpisode([turn('ASSESS', 7)]).map((v) => v.code)).not.toContain('I-1')
  })
})

describe('D7 — a failure edge labelled `down` that moves the learner UP', () => {
  it('PINNED: DIAGNOSE/ANCHOR + failure with demonstrated=true advances two states', () => {
    for (const cp of ['DIAGNOSE', 'ANCHOR'] as CanonicalPhase[]) {
      const r = canonicalStep(cp, 'incorrect', true)
      const fromIdx = PHASE_ORDER_10.indexOf(cp)
      const toIdx = PHASE_ORDER_10.indexOf(r.result.to)
      expect(toIdx, cp).toBeGreaterThan(fromIdx)     // it moved UP
      expect(r.result.direction, cp).toBe('down')    // …and says it went down
    }
  })

  it('the shipping ladder has no such state (its floor is consistent with its order)', () => {
    // Once demonstrated, the shipping ladder cannot be at OBSERVE: phaseDown's
    // floor is DEMONSTRATE, and nothing sets `demonstrated` while at OBSERVE.
    const s = legacyStep('OBSERVE', 'incorrect', true)
    expect(PHASE_ORDER.indexOf(s.phase)).toBeGreaterThanOrEqual(PHASE_ORDER.indexOf('DEMONSTRATE'))
  })
})

// ── the guard that keeps this honest ───────────────────────────────────────

describe('S5 guard — nothing here promoted the canonical machine', () => {
  it('advanceConversationState is still the only writer of the live phase', () => {
    let s: ConversationState = { ...initialConversationState(CONCEPT), demonstrated: true }
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: true, recoveryFired: false })
    expect(s.phase).toBe('DEMONSTRATE')
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: true, recoveryFired: false })
    expect(s.phase).toBe('GUIDE')     // canonical would say NAME/DEMONSTRATE
  })

  it('the mastery thresholds were not touched by this analysis', () => {
    expect(MASTERY_CHECK_REQUIRED).toBe(1)
    expect(MASTERY_PRACTICE_REQUIRED).toBe(2)
  })
})
