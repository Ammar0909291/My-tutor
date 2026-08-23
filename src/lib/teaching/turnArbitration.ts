/**
 * TURN ARBITRATION — the single deterministic authority for deciding WHICH
 * educational action owns a turn. Phase 3.
 *
 * ── THE DEFECT THIS EXISTS FOR ──────────────────────────────────────────────
 * route.ts builds the system prompt by concatenating 73 `systemPrompt +=`
 * blocks. Precedence between them is expressed by exactly two devices, and the
 * component that resolves both is the model:
 *
 *   1. SOURCE POSITION — later append wins by recency. The route says so
 *      itself: "injected LAST of all blocks", "Ordering is the fix".
 *   2. PROSE AUTHORITY CLAIMS — seven blocks each assert supremacy over
 *      "everything above", in English, to the model:
 *        TURN DIRECTIVE        "overrides any earlier advisory pacing"
 *        FIRST LESSON PROTOCOL "OVERRIDES ANY CONFLICTING GUIDANCE ABOVE"
 *        RECOVERY              "PREEMPTS EVERYTHING ABOVE"
 *        RESPONSE LANGUAGE     "OUTRANKS EVERY INSTRUCTION ABOVE"
 *        TEACHING ACTION       "overrides the turn move"          (x2)
 *        NEW REQUEST AFTER COMPLETION / OBSERVATION REPAIR         (x2)
 *
 * The claims are positional, untyped, non-transitive, and unchecked. So the
 * LLM is the arbiter — and Phase 2 measured the consequences: CLOSING -> teaching
 * REACHABLE, CLOSING -> prose question REACHABLE, VISUAL_REQUEST -> unrelated
 * quiz REACHABLE.
 *
 * THE ROOT CAUSE IS NOT MODEL DISOBEDIENCE. The close block is appended at
 * route.ts:2314; the TURN DIRECTIVE at 2894, ~580 lines later, opening with
 * "overrides any earlier advisory pacing". `grep -c "CLOSING\|episode"
 * conversationState.ts` is 0 — the block claiming override authority is
 * structurally incapable of knowing the session is closing. The model obeys
 * correctly; the close loses by design, because the design is "last and
 * loudest wins" and the close is neither.
 *
 * ── THE FIX: ARBITRATION BY ABSENCE ─────────────────────────────────────────
 * A model cannot resolve a contradiction it never receives. The losing action
 * is not out-shouted with louder prose — it does not appear. This module
 * decides who wins; the call sites ask it, and stay silent when they lose.
 *
 * ── THIS IS A GENERALISATION, NOT A NEW MECHANISM ───────────────────────────
 * `decideNextMoveDetailed` already does exactly this, for exactly one claimant:
 *
 *     conversationState.ts:899
 *     if (ctx.recoveryTurn) return { move: 'teach', ... }
 *     // "Recovery preempts — the recovery script already forbids questions."
 *
 * That is deterministic Axis-1 arbitration, in production, tested. The route
 * passes `recoveryTurn` and does NOT pass the episode phase — which is §B
 * restated as a missing function argument. This module takes that pattern from
 * one hard-coded claimant to a declared, ordered set.
 *
 * ── WHAT IT DELIBERATELY DOES NOT DO ────────────────────────────────────────
 * It DECIDES NOTHING ABOUT CONTENT and RE-DERIVES NOTHING. Every field of
 * `TurnClaims` is a fact an existing owner already computed:
 *   degraded          <- eos-runtime/degradedMode.isDegradedProvider
 *   recoveryActive    <- recoveryGuard.detectFailureState (via recoveryKey)
 *   learnerRequest*   <- turnIntent (masteryGate.detectLearnerRequest / conflicts)
 *   closing           <- sessionLifecycle episode phase
 *   placementAsking   <- placementVerification
 *   completionReady   <- masteryGate
 * No detector is called here, none is widened, and no regex lives in this file.
 * It is the same discipline `b2AskIllegal` already applies to questionLegality:
 * consume the verdict, never restate the rule.
 *
 * ── SCOPE: ONE AXIS, DELIBERATELY ───────────────────────────────────────────
 * Classifying all 73 blocks by what they constrain gives four INDEPENDENT axes:
 *
 *   AXIS 1  TURN ACTION  — what the tutor DOES this turn.        <- this module
 *   AXIS 2  SUBJECT      — which concept it is about (excursion).
 *   AXIS 3  MEDIUM       — which figure, if any (visual contract).
 *   AXIS 4  REGISTER     — how to acknowledge, which language (CUE, output lang).
 *
 * Contradiction exists only WITHIN Axis 1. That is why 73 blocks coexist
 * without 73-way conflict, and why RECOVERY (Axis 1) and the EXCURSION
 * DIRECTIVE (Axis 2) can both be "injected LAST" without actually fighting —
 * route.ts:3060 already says so: "RECOVERY still owns HOW to respond to
 * distress, and this owns WHICH concept that response is about."
 *
 * A flat ladder over all four axes would suppress blocks that are not in
 * conflict — stripping the visual contract from a recovery turn, or the
 * Russian-language rule from a closing turn. So axes 2-4 are OUT OF SCOPE here
 * and are not consulted, not suppressed, and not reordered.
 *
 * Pure. Total. No I/O, no imports with side effects, no model calls.
 */

/**
 * The Axis-1 actions that can own a turn, and the ORDER OF AUTHORITY.
 *
 * Highest first. This array is the single statement of precedence in the
 * runtime — there is deliberately no second copy, and every consuming site
 * reads the verdict rather than re-deriving a private subset of this order.
 * (Before Phase 3 there were three such private subsets — `gateEligible`,
 * `shouldRepairFillerTurn` and `shouldInjectAffectClose` — each incomplete in
 * a different way, and every hole was a Phase 2 REACHABLE finding.)
 *
 * EVIDENCE FOR EACH RUNG, and the two places this diverges from the ordering
 * proposed for this phase. Both divergences are argued from shipped behaviour,
 * not preference.
 *
 *  1 RECOVERY — basePack `B0.recovery.preempt.v1` is the ONLY Band-0 rule and
 *    is `mandatory: true`; decision-engine/03 §0; recoveryGuard.ts:710.
 *
 *    >> DIVERGENCE 1: RECOVERY ABOVE CLOSE, not below.
 *    The proposed ordering put EXPLICIT STOP above DISTRESS. Repository
 *    evidence is unanimous the other way: recovery is the only Band-0
 *    mandatory rule, the only block claiming total preemption, and it is
 *    already appended AFTER the close (3031 > 2314), so under the positional
 *    convention it already wins today. This is a HOW/THAT split, not a
 *    contest: recovery owns the STANCE, and the episode stays CLOSING, so the
 *    session still ends — it ends warmly instead of abruptly. Nothing about
 *    the learner's stop is discarded.
 *
 *  2 LEARNER_REQUEST — masteryGate.ts:602 "learner request outranks the
 *    machine's own pacing"; questionLegality QL-3 calls a stated learner
 *    directive "the one signal that is ground truth rather than inference".
 *
 *    >> DIVERGENCE 2: LEARNER_REQUEST ABOVE CLOSE.
 *    Series A Phase 4 (shipped, live-verified) already establishes this:
 *    `shouldInjectAffectClose` DEFERS the close when the turn is ambiguous,
 *    because "the learner has something outstanding". Placing CLOSE above
 *    REQUEST here would contradict verified production behaviour. The close is
 *    deferred, never cancelled — the episode stays CLOSING and it fires on the
 *    first turn with nothing outstanding.
 *
 *  3 CLOSE — sessionLifecycle 07 §6; Phase 1 made it survive the request
 *    boundary, which is what makes it arbitrable at all.
 *
 *  4 COMPLETE — the lesson is finished; no further teaching move applies.
 *
 *  5 TEACH — the ordinary ladder turn. THE FLOOR: it always claims, so the
 *    verdict is total and `owner` is never null. EOS v2 §5.2's completeness
 *    rule, restated for this axis.
 *
 * ── THREE PROPOSED RUNGS THAT ARE DELIBERATELY NOT HERE ─────────────────────
 * Each was investigated and excluded on evidence. A rung that can never claim
 * is dead code that reads as protection, which is worse than an honest gap.
 *
 *  >> SAFETY / PROVIDER FAILURE — proposed 1st. NOT A RUNG, because it cannot
 *     be a prompt-block claimant at all: the degraded path runs at
 *     route.ts:4009, AFTER the provider call has already failed. The prompt was
 *     built and sent; `degradedTurn()` then REPLACES the whole turn with a
 *     fixed template, so there is no block left for it to outrank. Phase 2 C8
 *     measured `DEGRADED -> mastery` as already BLOCKED. Its protection is real
 *     and lives one layer down, where it belongs.
 *
 *  >> PLACEMENT — proposed as its own authority. NOT A RUNG, for two reasons.
 *     (a) Its highest-value collision is already closed: route.ts:2381 guards
 *     the placement block with `!recoveryKeyHoisted`. (b) Its remaining
 *     collisions (with CLOSE and with a learner request) are closed by making
 *     placement a CONSUMER of NEW_QUESTION rather than a claimant — which also
 *     keeps the verdict computable ONCE, before placement runs, instead of
 *     forcing a second evaluation site. A PLACEMENT x ASSESS collision is
 *     conceivable but was NOT measured reachable, and inventing a rung for an
 *     unproven collision is the speculation this phase is meant to replace.
 *
 *  >> KNOWLEDGE GAP / PREREQUISITE — proposed 4th. NOT A RUNG, and this is a
 *     finding rather than an omission: Phase 2 C5 measured that NO
 *     knowledge-gap state exists in the runtime at all — a named gap is filed
 *     as distress and the named concept is discarded. There is nothing to
 *     claim with. Building that state is a different architectural layer and
 *     is explicitly out of this phase's scope; it is reported, not patched
 *     around.
 */
export const TURN_AUTHORITY_ORDER = [
  'RECOVERY',
  'LEARNER_REQUEST',
  'CLOSE',
  'COMPLETE',
  'TEACH',
] as const

export type TurnAuthority = (typeof TURN_AUTHORITY_ORDER)[number]

/**
 * What an authority can take away from the blocks below it.
 *
 * Capabilities, not block names, for two reasons: one capability is claimed by
 * several blocks (a "new question" can come from the TURN DIRECTIVE's move
 * line, the authored gate, the placement probe, or the model's own prose), and
 * a block is rarely wholly in conflict — the TURN DIRECTIVE's phase frame and
 * move line are Axis 1, while its length budget, register and acknowledgement
 * lines are Axis 4 and must survive. Suppressing whole blocks would throw away
 * the second kind with the first.
 *
 *  PHASE_FRAME     the ladder's "Teaching phase: ..." instruction
 *  NEXT_MOVE       the ladder's "Next move: TEACH/SHOW/ASK" instruction
 *  NEW_QUESTION    may this turn pose ANY new question (prose included)
 *  AUTHORED_PROBE  may the gate attach a server-selected probe. A subset of
 *                  NEW_QUESTION, kept separate because attaching one also
 *                  SPENDS a scarce authored asset — an action worth denying
 *                  even where a question would have been tolerable.
 *  SESSION_CLOSE   may the session-close block speak
 *  FILLER_REPAIR   may the post-model repair overwrite the turn with a question
 */
export const TURN_CAPABILITIES = [
  'PHASE_FRAME',
  'NEXT_MOVE',
  'NEW_QUESTION',
  'AUTHORED_PROBE',
  'SESSION_CLOSE',
  'FILLER_REPAIR',
] as const

export type TurnCapability = (typeof TURN_CAPABILITIES)[number]

/**
 * The facts an authority claims on. EVERY FIELD IS COMPUTED ELSEWHERE by its
 * designated owner and passed in — this module reads no message text and calls
 * no detector.
 */
export interface TurnClaims {
  /** recoveryGuard: a failure state was detected (route's `recoveryKey`). */
  recoveryActive: boolean
  /**
   * turnIntent: the learner made an explicit teaching-action request, OR the
   * turn is self-contradictory (a stop carrying a question — the case Series A
   * Phase 4 defers the close for).
   *
   * Deliberately NOT "the message contains a question mark". Widening this to
   * every genuine question would make REQUEST own nearly every turn and starve
   * both TEACH and CLOSE. It reuses two readings that already exist and adds
   * no detector.
   */
  learnerRequestActive: boolean
  /** sessionLifecycle: this turn's episode phase is CLOSING. */
  closing: boolean
  /** masteryGate: the lesson is finished / concluding this turn. */
  completionReady: boolean
}

interface AuthoritySpec {
  authority: TurnAuthority
  claims: (c: TurnClaims) => boolean
  /** Capabilities this authority denies to everything below it. */
  suppresses: readonly TurnCapability[]
  reason: string
}

/**
 * The declaration table — Step 3's "blocks declare their precedence class and
 * incompatibilities", in the smallest form that actually governs the prompt.
 *
 * Read it as: when this authority owns the turn, these capabilities are gone.
 * Each entry's suppression set is justified rather than maximal — an authority
 * takes only what genuinely conflicts with it.
 */
const AUTHORITIES: readonly AuthoritySpec[] = [
  {
    authority: 'RECOVERY',
    claims: (c) => c.recoveryActive,
    // recoveryGuard's own block: "No new content this turn. No assessment. No
    // calibration questions." SESSION_CLOSE is included because a distressed
    // learner is met first; the episode stays CLOSING so the close still
    // arrives, one turn later and warmly (defect D4).
    suppresses: ['PHASE_FRAME', 'NEXT_MOVE', 'NEW_QUESTION', 'AUTHORED_PROBE', 'SESSION_CLOSE', 'FILLER_REPAIR'],
    reason: 'the learner voiced a failure state — recovery owns the turn (Band 0, mandatory)',
  },
  {
    authority: 'LEARNER_REQUEST',
    claims: (c) => c.learnerRequestActive,
    // Deliberately NARROW. The learner asked for something; answering it is
    // the turn. It takes the move line (masteryGate's request blocks already
    // say "overrides the turn move") and the authored probe — converting an
    // explicit request into a graded quiz is defect D3 / Phase 2 C6. It does
    // NOT take NEW_QUESTION: a natural question after delivering the example
    // they asked for is ordinary good teaching, and denying it would be
    // suppression for its own sake. It does NOT take PHASE_FRAME: a request is
    // answered WITHIN a phase, not outside the ladder.
    suppresses: ['NEXT_MOVE', 'AUTHORED_PROBE', 'SESSION_CLOSE'],
    reason: 'the learner asked for something specific — answering it owns the turn',
  },
  {
    authority: 'CLOSE',
    claims: (c) => c.closing,
    // The close block's own text: "do NOT introduce new content, new
    // questions, or another attempt". Defects D1 and D2: the phase frame and
    // move line contradicted it and won on position. SESSION_CLOSE is NOT
    // suppressed — this authority IS the close.
    suppresses: ['PHASE_FRAME', 'NEXT_MOVE', 'NEW_QUESTION', 'AUTHORED_PROBE', 'FILLER_REPAIR'],
    reason: 'the session is closing — no new content, no new question',
  },
  {
    authority: 'COMPLETE',
    claims: (c) => c.completionReady,
    suppresses: ['PHASE_FRAME', 'NEXT_MOVE', 'NEW_QUESTION', 'AUTHORED_PROBE'],
    reason: 'the lesson is finished — no further teaching move applies',
  },
  {
    authority: 'TEACH',
    // THE FLOOR. Always claims, so the verdict is total and `owner` is never
    // null — EOS v2 §5.2's completeness rule for this axis.
    claims: () => true,
    suppresses: [],
    reason: 'ordinary teaching turn',
  },
]

export interface TurnArbitration {
  /** The single action that owns this turn. Never null. */
  owner: TurnAuthority
  /** Every authority that claimed but lost, highest first. */
  overridden: readonly TurnAuthority[]
  /** Capabilities denied this turn. */
  denied: readonly TurnCapability[]
  /** One line, for logs and for the closure report. */
  rationale: string
  /** THE question every call site asks. */
  allows: (capability: TurnCapability) => boolean
}

/**
 * Arbitrate the turn. Pure, total, first-match-wins over TURN_AUTHORITY_ORDER.
 *
 * First-match-wins rather than a score: authority is ordinal, not additive, and
 * two claimants must never be able to combine into a third outcome. It is the
 * same shape `classifyConversation` uses for the register axis and
 * `questionLegality` uses for the ask gate — both already in production.
 */
export function arbitrateTurn(claims: TurnClaims): TurnArbitration {
  const claimed = AUTHORITIES.filter((a) => a.claims(claims))
  // TEACH always claims, so `claimed` is never empty and `[0]` is safe.
  const winner = claimed[0]
  const denied = winner.suppresses
  const overridden = claimed.slice(1).map((a) => a.authority)
  return {
    owner: winner.authority,
    overridden,
    denied,
    rationale: overridden.length === 0
      ? `${winner.authority}: ${winner.reason}`
      : `${winner.authority}: ${winner.reason} (over ${overridden.join(', ')})`,
    allows: (capability) => !denied.includes(capability),
  }
}

/**
 * The verdict for a turn whose facts could not be gathered.
 *
 * FAILS SAFE, and the direction matters: it grants TEACH (so a learner is
 * never met with silence) while denying every capability that could put an
 * ungraded question, a spent asset or an overwritten turn in front of them.
 * The same reasoning as the visual engine's "an unreadable budget counts as
 * exhausted" — a bound fails toward doing less.
 *
 * THIS IS A BEHAVIOUR CHANGE ON THE ERROR PATH, stated rather than left to be
 * discovered. The only way a turn reaches it is route.ts's wave-0 block
 * throwing before the verdict is computed — and a turn in that state has ALSO
 * lost recovery detection, the episode, the first-lesson guard, the placement
 * state, the turn directive and the excursion directive. Previously the
 * authored-probe gate still ran there, with every exclusion reading null:
 * `closingTurnWithholdsQuestion(undefined)` is false, so a learner who had just
 * said "I'm done" or "I'm lost" could be handed a graded question BECAUSE the
 * turn had failed. Refusing to quiz a learner whose state we could not read is
 * the correct reading of that situation, not a degradation of it.
 */
export function arbitrationUnavailable(): TurnArbitration {
  return {
    owner: 'TEACH',
    overridden: [],
    denied: ['NEW_QUESTION', 'AUTHORED_PROBE', 'FILLER_REPAIR'],
    rationale: 'TEACH: arbitration unavailable — failing safe (no question, no probe, no repair)',
    allows: (capability) => !(['NEW_QUESTION', 'AUTHORED_PROBE', 'FILLER_REPAIR'] as readonly TurnCapability[]).includes(capability),
  }
}
