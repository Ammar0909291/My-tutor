/**
 * THE TURN CONTRACT — everything the server decided BEFORE the model was
 * called, compiled once, frozen, and read by every consumer thereafter.
 *
 * Full design: docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md. This module
 * is Batch 0 of that document's nine-batch migration plan: the types and the
 * compiler exist here, UNCONSUMED — nothing in route.ts reads from this
 * module yet. That wiring is Batch 1 onward.
 *
 * ── WHAT THIS IS NOT ────────────────────────────────────────────────────────
 * It is NOT a decision-maker. Every field is copied from an existing
 * authority — conversationState, masteryGate, turnArbitration, turnProgress,
 * gateAssessment, the visual resolver, excursion, knowledgeGap,
 * recoveryGuard, placementVerification, capabilityModel. This module MUST NOT
 * contain a rule, a threshold, a detector, or a regex. Its whole job is to say
 * WHERE a fact came from and WHEN it was true. A future session adding logic
 * here has turned it into a second teaching engine, which is the failure mode
 * this repository has met before (`src/lib/educationalBrain/*`,
 * `curriculum/teachingActionEngine.ts`). Enforced structurally by
 * turnContract.test.ts, the way turnProgress.test.ts enforces its own module.
 *
 * `certifies`/`mayStateVerdict` below are the one apparent exception: they are
 * explicitly a NAME for a rule that already exists elsewhere
 * (`conversationState.ts`'s `verified = evidence.serverGraded === true`,
 * `probeKeyIsAuthored` in mcq.ts), not a new rule — see design doc §8 item 2.
 *
 * ── WHY FROZEN ──────────────────────────────────────────────────────────────
 * Three locals today are read pre-model and overwritten post-model
 * (`sessionEpisodeHoisted` L9296, `capabilityStateHoisted` L7575,
 * `narrativeStateHoisted` L8206), so a read's meaning depends on its line
 * number. Freezing makes that representable only as two objects, which is what
 * `persistedEpisodeHoisted` and `conversationStateAfterTurnHoisted` already
 * are — by hand, for two fields out of three.
 */

import type { TutorMCQ } from '@/lib/teaching/mcq'
import type { ConversationState, TeachingPhase } from '@/lib/teaching/conversationState'
import type { TurnArbitration } from '@/lib/teaching/turnArbitration'
import type { SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import type { VisualDecision } from '@/lib/teaching/visual/types'
import type { ExcursionDecision } from '@/lib/teaching/excursion'
import type { KnowledgeGap } from '@/lib/teaching/knowledgeGap'
import type { FailureStateKey } from '@/lib/teaching/recoveryGuard'
import type { LearnerRequest } from '@/lib/teaching/masteryGate'
import type { TeachingHistory } from '@/lib/teaching/teachingHistory'
import type { ObjectiveState } from '@/lib/teaching/objectiveModel'
import type { CapabilityState, CapabilityId } from '@/lib/teaching/capabilityModel'
import type { PlacementVerificationState } from '@/lib/teaching/placementVerification'
import type { QuestionLedger } from '@/lib/teaching/repetitionGuard'
import type { LegalityReason } from '@/lib/teaching/questionLegality'
import type { TeachingStrategyType } from '@/lib/school/adaptive/teachingStrategy'
import type { OutputBias, HintBiasKind } from '@/lib/school/adaptive/teachingOutputBias'
import type { ConversationDecision } from '@/lib/teaching/conversationDecision'
import type { RetrievalCache } from '@/lib/teaching/retrievalCache'
import type { TeachingLevel } from '@/lib/teaching/teachingGranularity'
import type { MappedMove } from '@/lib/kernel/policyMove'
import type { ParityMetrics } from '@/lib/kernel/parity'
import type { TeachingDecision } from '@/lib/understanding/decisionEngine'
import type { DispatchPlan } from '@/lib/understanding/dispatcher'

/**
 * WHERE A GRADED QUESTION'S ANSWER KEY CAME FROM.
 *
 * This is the distinction `unauthoredKeyGradeHoisted` and
 * `gradedAgainstServerKeyHoisted` were each invented to express, separately,
 * 62 lines apart (route.ts L6363 / L6427). It is a pure function of
 * `TutorMCQ.assetId` — `probeKeyIsAuthored` is
 * `typeof assetId === 'string' && assetId.trim() !== ''` — so naming it costs
 * nothing and removes two derivations plus five downstream re-checks.
 *
 * 'authored'       an AssetIdentity probe; `gateAssessment.probeToMcq` is the
 *                  ONLY writer of `assetId`. Server ground truth.
 * 'model-invented' parsed from the model's own <!--MCQ--> tag. Counted, never
 *                  credited (conversationState.ts `unauthoredKeyGrades`).
 */
export type KeyProvenance = 'authored' | 'model-invented'

/** A probe, carrying its provenance so no consumer has to re-derive it. */
export interface IdentifiedProbe {
  readonly mcq: TutorMCQ
  readonly keyProvenance: KeyProvenance
  /** Present iff keyProvenance === 'authored'. */
  readonly assetId: string | null
}

/**
 * THE SERVER'S VERDICT ON THIS TURN'S ANSWER.
 *
 * A discriminated union, deliberately. The route establishes at L2481
 *
 *     if (g.correct !== null) mcqGradeHoisted = g
 *
 * that a non-null grade always carries a boolean — and then states the type as
 * `{ chosenIndex: number | null; correct: boolean | null } | null`, which
 * permits a state the code cannot produce, 8,569 lines from where the
 * invariant is established. Four downstream consumers each re-add
 * `typeof correct === 'boolean'` to compensate. Here the invariant IS the
 * type, so removing those re-guards is provably equivalent, not a judgement.
 *
 * `keyProvenance` rides on the grade rather than beside it, because every
 * measured incident in this area (phys.mech.friction 2026-09-01, the
 * 2026-09-14 "Great job!" finding) is a consumer that had the verdict in hand
 * and not the provenance.
 */
export type ServerGrade =
  | { readonly kind: 'graded'; readonly chosenIndex: number; readonly correct: boolean
      readonly keyProvenance: KeyProvenance }
  | { readonly kind: 'unresolved'; readonly chosenIndex: null; readonly correct: null
      readonly keyProvenance: KeyProvenance }

/** True iff this grade may certify mastery. The ONE definition; see design doc §5 A3. */
export function certifies(g: ServerGrade | null): boolean {
  return g?.kind === 'graded' && g.keyProvenance === 'authored'
}

/** True iff a consumer may state a verdict to the learner with full confidence. */
export function mayStateVerdict(g: ServerGrade | null): boolean {
  return certifies(g)
}

export interface TurnContract {
  // ── IDENTITY ──────────────────────────────────────────────────────────────
  readonly identity: {
    readonly sessionId: string
    readonly userId: string
    readonly subjectSlug: string
    /** PCD-004: resolved ONCE; the five sites that read activeLessonSlug agree. */
    readonly activeLessonSlug: string | null
    readonly lessonKeyThisTurn: string | null
    readonly conceptId: string | null
    /** Library-mode concept identity (ADR 08 §4a). */
    readonly libraryConceptNodeId: string | null
    /** Server-measured at ingress, before any DB work (foundations/03 §7). */
    readonly turnReceivedAt: number
    /** Ephemeral (machine-authored) instruction ⇒ the learner said nothing. */
    readonly learnerAuthoredMessage: string
  }

  // ── AUTHORITY — who owns this turn (turnArbitration.ts, Phase 3) ──────────
  readonly authority: {
    /** Null only on paths that never reach the wave-0 block; consumers fall
     *  back to `arbitrationUnavailable()` exactly as they do today. */
    readonly arbitration: TurnArbitration | null
    readonly recoveryKey: FailureStateKey | null
    readonly firstLessonActive: boolean
    readonly excursion: {
      readonly active: boolean
      readonly decision: ExcursionDecision | null
      readonly teachingTitle: string | null
    }
    readonly knowledgeGap: KnowledgeGap | null
    readonly learnerRequest: LearnerRequest | null
    readonly navigationRequest: boolean
    readonly claimChallengeActive: boolean
  }

  // ── LADDER — the conversation state AS READ (never as folded) ─────────────
  readonly ladder: {
    /** The pre-turn state. The POST-turn state is TurnDelivery.after.ladder. */
    readonly state: ConversationState | null
    readonly phaseBeforeTurn: TeachingPhase | null
    readonly evidenceMove: string | null
    readonly objective: ObjectiveState | null
    readonly lessonCompletedBefore: boolean
    readonly lessonCompletionRespectsNewIntent: boolean
    readonly conceptPreviouslyMastered: boolean
    readonly teachingHistory: TeachingHistory | null
    readonly questionLedger: QuestionLedger
  }

  // ── EPISODE — session lifecycle (07 §8) ───────────────────────────────────
  readonly episode: {
    /** The episode as DERIVED for this turn. */
    readonly current: SessionEpisode | null
    /** The episode AS STORED at turn start — today's `persistedEpisodeHoisted`,
     *  which exists because comparing against the in-request value discarded an
     *  explicit stop (see its docblock, route.ts L1955). */
    readonly persisted: SessionEpisode | null
    readonly fresh: boolean
  }

  // ── INBOUND — what the learner did, read once ─────────────────────────────
  readonly inbound: {
    readonly isBareAck: boolean
    readonly lowSignalAck: boolean
    /** The probe the PREVIOUS turn asked, read back from the snapshot. */
    readonly pendingProbe: IdentifiedProbe | null
    /** This turn's grade of `pendingProbe`. Null when nothing was graded. */
    readonly grade: ServerGrade | null
    readonly priorTurnUnresolvedProseMcq: boolean
  }

  // ── ASSESSMENT — what the gate decided, pre-model ─────────────────────────
  readonly assessment: {
    /** The authored probe the gate selected for THIS turn, or null. */
    readonly gateProbe: IdentifiedProbe | null
    readonly gateLeadIn: string | null
    /** `null` means the selector never ran — ignorance, NOT "none exist". */
    readonly authoredProbesExist: boolean | null
    readonly declinedByPolicy: boolean
    readonly phaseAllowsProbe: boolean
    /** The ORIGINAL isProbeAttachablePhase, never the gate's E1-widened copy. */
    readonly probeWouldCountThisPhase: boolean
    readonly observeAskViolation: boolean
    readonly gateTerms: Readonly<Record<string, boolean>> | null
    readonly legalityBlockedReason: LegalityReason | null
    readonly legalityBlock: string | null
  }

  // ── FIGURE — the visual resolver's verdict, decided pre-model ─────────────
  readonly figure: {
    readonly decision: VisualDecision | null
    readonly availableVisual: string | null
    readonly allowedVisuals: readonly string[] | null
    readonly forceRender: boolean
    readonly generationCountBefore: number
  }

  // ── LIVENESS — counters read from the PRE-turn snapshot (turnProgress.ts) ──
  readonly liveness: {
    readonly priorStagnantTurns: number
    readonly priorProbeStarvedTurns: number
    readonly probeStarvationRelieved: boolean
    readonly arbitrationWasSoleBlocker: boolean
    readonly consecutiveDontKnows: number
    readonly priorConfirmations: number
  }

  // ── PLACEMENT ─────────────────────────────────────────────────────────────
  readonly placement: {
    readonly level: 'intermediate' | 'advanced' | null
    readonly askedProbe: 'below' | 'at' | 'above' | null
    readonly previous: PlacementVerificationState | null
    readonly inherited: boolean
  }

  // ── STRATEGY / BUDGETS — advisory inputs to prompt assembly ───────────────
  readonly strategy: {
    readonly teachingStrategy: TeachingStrategyType | null
    readonly outputBias: OutputBias | null
    readonly hintBias: HintBiasKind | null
    readonly strategyTopicSlug: string | null
    readonly selectedStrategy: number | null
    readonly conversationDecision: ConversationDecision | null
    readonly cueDecision: TeachingDecision | null
    readonly dispatchPlan: DispatchPlan | null
    readonly retrievalCache: RetrievalCache | null
    readonly outputLanguageBlock: string
    readonly kernelMaxQuestions: 0 | 1
    readonly routeMaxParagraphs: number | null
    readonly kernelPolicyMove: MappedMove | null
    readonly evidenceStageCeiling: number | null
    readonly evidenceWorkedExampleFirst: boolean
    readonly evidenceAutonomy: boolean
    readonly libraryDueRevisionCount: number
    readonly teachingStepUpdate: { teachingStepIndex: number; teachingStepConceptId: string } | null
  }

  // ── CAPABILITY — as read, pre-model ───────────────────────────────────────
  readonly capability: {
    readonly stateBefore: CapabilityState | null
    readonly required: readonly CapabilityId[]
  }

  // ── PROVENANCE — read by nothing, logged only (Phase 0 / EOS M1) ──────────
  readonly provenance: {
    readonly decisionConceptId: string | null
    readonly decisionGranularity: TeachingLevel | null
    readonly decisionProbeId: string | null
    readonly kernelParityMetrics: ParityMetrics | null
    readonly kernelParityTags: readonly string[]
    readonly enginePolicyParity: ParityMetrics | null
    readonly enginePolicyTags: readonly string[]
    readonly signalRepairFired: boolean
    readonly isFirstLessonContext: boolean
  }
}

/**
 * The raw material `compileTurnContract` assembles into `TurnContract`. Field
 * names and shapes mirror `TurnContract` exactly — the compiler's whole job is
 * `Object.freeze`, not transformation. Callers (route.ts, Batch 1 onward)
 * build this directly from the `Hoisted` locals it replaces.
 */
export type TurnContractInput = {
  readonly [K in keyof TurnContract]: TurnContract[K]
}

/**
 * Compile the frozen `TurnContract` from its raw material.
 *
 * Deliberately not more than a freeze: every field already comes from an
 * existing authority (see the module header). Freezing the top-level object
 * AND each named group protects against an accidental post-hoc write — the
 * same class of bug D3 in the design doc documents for the unfrozen
 * `Hoisted` locals.
 */
export function compileTurnContract(input: TurnContractInput): TurnContract {
  return Object.freeze({
    identity: Object.freeze({ ...input.identity }),
    authority: Object.freeze({
      ...input.authority,
      excursion: Object.freeze({ ...input.authority.excursion }),
    }),
    ladder: Object.freeze({ ...input.ladder }),
    episode: Object.freeze({ ...input.episode }),
    inbound: Object.freeze({ ...input.inbound }),
    assessment: Object.freeze({ ...input.assessment }),
    figure: Object.freeze({ ...input.figure }),
    liveness: Object.freeze({ ...input.liveness }),
    placement: Object.freeze({ ...input.placement }),
    strategy: Object.freeze({ ...input.strategy }),
    capability: Object.freeze({ ...input.capability }),
    provenance: Object.freeze({ ...input.provenance }),
  })
}
