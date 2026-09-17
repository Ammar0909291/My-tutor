/**
 * WHAT THE TURN ACTUALLY PRODUCED — compiled ONCE, immediately after the
 * provider call returns and the machine tags are parsed, and BEFORE the first
 * repair pass runs (today: `cleanText = parsed.cleanText`, route.ts L6549).
 *
 * Full design: docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md. Batch 0 of
 * that document's plan: types + compiler + assertion function, UNCONSUMED —
 * nothing in route.ts reads from this module yet.
 *
 * ── WHY A SECOND OBJECT AND NOT MORE CONTRACT FIELDS ──────────────────────
 * §4 of PHYSICS_TEACHER_MIGRATION_ARCHITECTURE establishes that two surfaces
 * are irreducibly GENERATE → DETECT → REPAIR: the `?? mcqParse.mcq` fallback,
 * and prose teaching content. There is no way to know before the call whether
 * the model will invent a question. So the answer is not to eliminate those
 * fields — it is to TYPE them, in an object whose name says they are
 * post-hoc, separate from the object whose name says it was decided in
 * advance.
 *
 * ── `text` IS STILL MUTABLE, DELIBERATELY ─────────────────────────────────
 * 42 repair passes rewrite `cleanText`. Freezing it would be a rewrite of
 * route.ts, which this design explicitly is not. `TurnDelivery` freezes the
 * FACTS the repair passes read (what was graded, what is on screen, what was
 * withheld) — which is what they each re-derive today. The text itself stays a
 * local. A later phase may promote it; this one does not.
 *
 * ── NOT A VERIFIER ─────────────────────────────────────────────────────────
 * `assertDeliverySatisfiesContract` checks a turn against ITSELF (two
 * representations of one fact agree). It never judges teaching quality,
 * factual correctness, or prose, and it must never grow into the composed
 * output verifier this repository already tried and disabled
 * (src/lib/kernel/verifier/rules.ts — off in production because V-Q2 makes
 * legitimate turns unreachable, route.ts L7097-7101). It does not throw: a
 * throw here would turn a representation bug into a teaching outage.
 */

import type { TutorMCQ } from '@/lib/teaching/mcq'
import type { ConversationState } from '@/lib/teaching/conversationState'
import type { SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import type { CapabilityState, CapabilityObservation } from '@/lib/teaching/capabilityModel'
import type { NarrativeState } from '@/lib/teaching/narrativeTracker'
import type { FrustrationMachine } from '@/lib/kernel/frustration'
import type { TurnOutcome } from '@/lib/teaching/turnProgress'
import type { LessonCompletionPayload } from '@/lib/teaching/lessonCompletion'
import type { StanceViolationCode } from '@/lib/teaching/stanceEnforcement'
import type { VerifierMetrics } from '@/lib/kernel/verifier'
import type { AttemptVectorV2 } from '@/lib/evidence-spine/types'
import type { AdaptationStateVector } from '@/lib/teaching/adaptation/asv'
import {
  type TurnContract,
  type IdentifiedProbe,
  type ServerGrade,
  certifies,
} from '@/lib/teaching/turnContract'

export interface TurnDelivery {
  /** The contract this delivery is measured against. */
  readonly contract: TurnContract

  // ── GENERATION ────────────────────────────────────────────────────────────
  readonly generation: {
    readonly provider: string
    readonly llmCallCount: number
    readonly finishReason: string | null
    readonly degraded: boolean
    readonly consecutiveOutages: number
    readonly memory: {
      readonly servingMode: string | null
      readonly confidence: number | null
      readonly assetId: string | null
      readonly conceptId: string | null
      readonly exactGradeMatch: boolean | null
      readonly fallbackUsed: boolean | null
      readonly fallbackReasonCode: string
    }
  }

  // ── QUESTION — the one artifact with a real pre/post split ────────────────
  readonly question: {
    /**
     * Where this turn's question came from. The field the four sequential
     * `mcqHoisted = null` overrides (route.ts L5953, L5977, L5994, L6022) are
     * each a clause of, and which nothing downstream can currently recover
     * without calling `probeKeyIsAuthored` again.
     */
    readonly source: 'gate-authored' | 'model-parsed' | 'none'
    /** Attached THIS turn, after every withhold. Null is a real outcome. */
    readonly attached: IdentifiedProbe | null
    /** The model's own item when it was WITHHELD, so its prose copy can be
     *  stripped too (today `withheldModelMcqHoisted`). */
    readonly withheldModelProbe: TutorMCQ | null
    readonly modelProbeVerdict: string | null
    /** Liveness rung 1 took a probe off the screen this turn. */
    readonly released: boolean
    readonly releasedQuestionText: string | null
    /**
     * THE SINGLE ANSWER to "what question is the learner looking at".
     *
     * `mcqToServe(attached, pending, grade)` is called SIX times in route.ts
     * today (L6122, L7947, L9762, L10705, L10876, L10914), each behind its own
     * dynamic import under a different alias, across a mutation of its first
     * argument at L10040. This field is that value, computed once at the point
     * the artifact decision is final, and read by the snapshot persist, the
     * client payload, the re-offer detector, the empty-turn guards and the
     * question-delivery contract.
     */
    readonly served: TutorMCQ | null
  }

  // ── FIGURE — what is genuinely on the learner's screen ────────────────────
  readonly figure: {
    /** A figure payload was produced by THIS message. */
    readonly attachedThisTurn: boolean
    /** This message INTRODUCED it (session.turns === 0), vs merely holding it. */
    readonly introducedThisTurn: boolean
    /**
     * The learner has a figure — attached now OR held from an earlier turn.
     * `figureReference.ts` and `asciiDiagramGuard.ts` both need exactly this
     * and today share one un-named local (route.ts L8586). Keying either on
     * `attachedThisTurn` alone strips a TRUE reference on every held turn —
     * a defect found by reading the ownership gate, not by a test, because
     * nothing would have failed.
     */
    readonly onScreen: boolean
  }

  // ── VERDICT — what the server knows about the learner's answer ────────────
  readonly verdict: {
    /** Identical to `contract.inbound.grade`; restated so verdict consumers
     *  have one import, and so `assertDeliverySatisfiesContract` has something
     *  to compare (A1). */
    readonly grade: ServerGrade | null
    readonly signalVerification: 'CLEAN' | 'SUSPICIOUS' | 'CONTRADICTED'
    /** `certifies(grade)` — the positive provenance the VERIFIED mastery
     *  counters require. Duplicated as a field only so the fold's
     *  `TurnEvidence.serverGraded` has a stable source. */
    readonly serverGraded: boolean
    readonly signalSuppressedReason: string | null
    readonly teachingIntegrityFellThrough: boolean
  }

  // ── AFTER — the folded state. NEVER the same field as the contract's. ─────
  readonly after: {
    readonly ladder: ConversationState | null
    readonly episode: SessionEpisode | null
    readonly capability: CapabilityState | null
    readonly capabilityObservations: readonly CapabilityObservation[]
    readonly narrative: NarrativeState | null
    readonly frustration: FrustrationMachine | null
    readonly frustrationBand: 'calm' | 'strained' | 'flooded' | null
    readonly turnHistoryUpdate: Readonly<Record<string, unknown>> | null
    readonly turnProgress: {
      readonly outcome: TurnOutcome
      readonly stagnantTurns: number
      readonly rung: number
      readonly probeHeldTurns: number
    } | null
  }

  // ── COMPLETION ────────────────────────────────────────────────────────────
  readonly completion: {
    readonly payload: LessonCompletionPayload | null
    readonly masteryGatePending: boolean
    readonly masteryCompletionSuppressed: boolean
  }

  // ── POST-MODEL PROVENANCE — logged, never branched on ─────────────────────
  readonly provenance: {
    readonly hint: string | null
    readonly fillerDetected: boolean
    readonly stanceViolations: readonly StanceViolationCode[]
    readonly eosVerifierMetrics: VerifierMetrics | null
    readonly eosVerifierTags: readonly string[]
    readonly progressionTags: readonly string[]
    readonly attemptVector: AttemptVectorV2 | null
    readonly adaptationState: AdaptationStateVector | null
  }
}

/**
 * The raw material `compileTurnDelivery` assembles into `TurnDelivery`. Field
 * names and shapes mirror `TurnDelivery` exactly, minus `contract` (supplied
 * separately, since it is the object already compiled by
 * `compileTurnContract` — never re-derived here).
 */
export type TurnDeliveryInput = {
  readonly [K in Exclude<keyof TurnDelivery, 'contract'>]: TurnDelivery[K]
}

/**
 * Compile the frozen `TurnDelivery` from its raw material plus the contract
 * it is measured against. Deliberately not more than a freeze — see the
 * module header and `compileTurnContract`'s own docblock.
 */
export function compileTurnDelivery(contract: TurnContract, input: TurnDeliveryInput): TurnDelivery {
  return Object.freeze({
    contract,
    generation: Object.freeze({
      ...input.generation,
      memory: Object.freeze({ ...input.generation.memory }),
    }),
    question: Object.freeze({ ...input.question }),
    figure: Object.freeze({ ...input.figure }),
    verdict: Object.freeze({ ...input.verdict }),
    after: Object.freeze({
      ...input.after,
      turnProgress: input.after.turnProgress ? Object.freeze({ ...input.after.turnProgress }) : null,
    }),
    completion: Object.freeze({ ...input.completion }),
    provenance: Object.freeze({ ...input.provenance }),
  })
}

export interface ContractViolation {
  readonly code: string
  readonly detail: string
}

/**
 * DOES THIS DELIVERY SATISFY ITS CONTRACT?
 *
 * ── IT DOES NOT THROW, AND THAT IS THE DESIGN ─────────────────────────────
 * route.ts serves real learners. A throw here turns a representation bug into
 * a teaching outage. It returns violations; the caller logs one structured
 * line. Every check below is a property this repo believes is ALREADY TRUE, so
 * a violation in production is information, not an error to handle — and the
 * shadow phase (Batch 1) exists precisely to find out whether the beliefs hold
 * before anything depends on them.
 *
 * ── IT IS NOT A VERIFIER ──────────────────────────────────────────────────
 * It checks the turn against ITSELF — that two representations of one fact
 * agree. It never judges teaching quality, factual correctness, or prose. The
 * composed output verifier (src/lib/kernel/verifier/rules.ts, 22 rules) is OFF
 * in production because V-Q2 makes legitimate turns unreachable (route.ts
 * L7101); this must not become a second attempt at it. Every check is TOTAL
 * and DETERMINISTIC: no model call, no DB read, no regex over teaching prose.
 *
 * A9 and A10 are NOT currently guaranteed by the runtime (design doc §5.1) —
 * they are shadow-only permanently, unless a later owner decision promotes
 * them. They are still checked and reported here because the point of shadow
 * mode is to measure whether they hold, not to assume it.
 */
export function assertDeliverySatisfiesContract(d: TurnDelivery): ContractViolation[] {
  const violations: ContractViolation[] = []

  // A1 — the grade is read at 30 sites; a repair pass must never change it.
  if (d.verdict.grade !== d.contract.inbound.grade) {
    violations.push({
      code: 'A1',
      detail: `verdict.grade !== contract.inbound.grade (grade=${JSON.stringify(d.verdict.grade)} contractGrade=${JSON.stringify(d.contract.inbound.grade)})`,
    })
  }

  // A2 — serving a model item under the gate's lead-in (D1).
  if (d.question.source === 'gate-authored') {
    const attached = d.question.attached
    const gateProbe = d.contract.assessment.gateProbe
    if (!attached || attached.keyProvenance !== 'authored') {
      violations.push({
        code: 'A2',
        detail: `source=gate-authored but attached.keyProvenance=${attached?.keyProvenance ?? 'null'}`,
      })
    } else if (!gateProbe || attached.assetId !== gateProbe.assetId) {
      violations.push({
        code: 'A2',
        detail: `source=gate-authored but attached.assetId=${attached.assetId} !== gateProbe.assetId=${gateProbe?.assetId ?? 'null'}`,
      })
    }
  }

  // A3 — the two derivations of D1 disagreeing.
  if (d.verdict.serverGraded !== certifies(d.verdict.grade)) {
    violations.push({
      code: 'A3',
      detail: `serverGraded=${d.verdict.serverGraded} !== certifies(grade)=${certifies(d.verdict.grade)}`,
    })
  }

  // A4 — an invented key certifying mastery (phys.mech.friction, 2026-09-01).
  if (d.verdict.grade?.keyProvenance === 'model-invented' && d.verdict.signalVerification === 'CLEAN') {
    violations.push({
      code: 'A4',
      detail: 'model-invented grade reported signalVerification=CLEAN',
    })
  }

  // A5 — the lead-in that named a list that was not there (D5).
  if (d.question.released === true && d.question.served !== null) {
    violations.push({
      code: 'A5',
      detail: 'question.released=true but question.served is non-null',
    })
  }

  // A6 — persist/response divergence; the "seventh defect" (D4). Checked
  // against `served` itself, since Batch 0 has no `pendingMcq` write to
  // compare against yet — the caller (Batch 1+) compares the ACTUAL persisted
  // value to `d.question.served` and reports here under the same code.
  // (Left as a documented no-op until Batch 1 wires a real comparison input;
  // see design doc §5.1 A6 and §6 Batch 1.)

  // A7 — recovery/CLOSE turns serving a quiz (Phase 3, measured live).
  if (d.question.attached !== null && d.contract.authority.arbitration?.allows('NEW_QUESTION') === false) {
    violations.push({
      code: 'A7',
      detail: 'question.attached is non-null but arbitration.allows(NEW_QUESTION) === false',
    })
  }

  // A8 — a figure claimed as introduced with no payload.
  if (d.figure.introducedThisTurn === true && d.figure.attachedThisTurn !== true) {
    violations.push({
      code: 'A8',
      detail: 'figure.introducedThisTurn=true but figure.attachedThisTurn is not true',
    })
  }

  return violations
}
