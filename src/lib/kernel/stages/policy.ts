/**
 * Stage 8 — POLICY. Owner: Policy Engine (RS §5).
 *
 * This stage runs the K3 adapter path: the ladder, the Band-2 legality gate
 * and the authority-ordered move mapping.
 *
 * It does NOT run the K4 engine. An `enginePolicyStage` used to live here as
 * a second entry point to the engine and was removed in the final audit: it
 * had zero callers and zero tests, because the engine's actual production
 * consumer is eos-runtime/policyGate (which reads the pack REGISTRY rather
 * than a caller-supplied pack). Two ways to run the engine is one more than
 * there should be, and the unused one would have drifted.
 *
 * What survives from that path is engineDecisionToPolicyDecision below —
 * genuinely shared, by policyGate's callers and the K6 simulation battery.
 */
import { createHash } from 'node:crypto'
import type { KernelState, Stage, PolicyDecision, PolicyMove } from '../types'
import { newId } from '../context'
import type { EnginePolicyDecision } from '../policy/types'
import { decideNextMoveDetailed, type ConversationState } from '@/lib/teaching/conversationState'
import type { LegalityContext } from '@/lib/teaching/questionLegality'
import { toPolicyMove, maxQuestionsFor } from '../policyMove'
import { responseBudget, decideVisualFirst } from '@/lib/teaching/conversationState'

/**
 * EXTRACTED (K3 promotion 2 of 2). `move` and `maxNewTerms` were previously
 * handed in already-decided; the stage now DERIVES both from the same inputs
 * route.ts uses — the Band-2 legality gate, the ladder, the interrupt and the
 * session phase — via decideNextMoveDetailed() and toPolicyMove().
 *
 * The remaining fields are genuinely produced elsewhere (visual selection,
 * length budget, pack vocabulary bans) and are still supplied. They are the
 * next extraction targets, in that order.
 */
export interface PolicyAdapters {
  /** Ladder state at decision time. null ⇒ no move can be derived. */
  conversationState: ConversationState | null
  /** Band-2 inputs: prior-knowledge evidence + capability state/demands. */
  legality: LegalityContext
  /** Drives maxNewTerms (beginner 1, otherwise 2) — the route's own rule. */
  contentRegister: 'beginner' | 'intermediate' | 'expert'
  /** Session layer; CLOSING outranks the ladder. */
  episodePhase: string | null | undefined
  /** Interrupt key. OPTIONAL and normally omitted: the kernel already
   *  senses it in stage 5 (INTERRUPT-SCAN reads the utterance-state sensor),
   *  so POLICY reads its own upstream artifact and only falls back to this
   *  when the caller has an interrupt the pipeline could not sense. */
  recoveryKey?: string | null
  workedExampleFirst: boolean
  actionClass: string | null
  /** The visual the registry/detector matched for this lesson, or null.
   *  A context-derived FACT (DB/lesson strings), supplied like every FOLD
   *  input because RS P-R1 forbids I/O in stages 4-10. The DECISION of
   *  whether to lead with it is made here, not by the caller. */
  availableVisualType: string | null
  /** The learner explicitly asked for a diagram / a different explanation
   *  needing one — overrides the phase rule, as the route does. */
  learnerRequestedVisual?: boolean
  vocabularyBans: string[]
  provenance: string[]
}

function seededFrom(learnerId: string, sessionId: string, turnId: string): number {
  const h = createHash('sha256').update(`${learnerId}|${sessionId}|${turnId}`).digest()
  return h.readUInt32BE(0)
}

// ── K3 adapter path (unchanged behaviour) ────────────────────────────────────

export function policyStage(a: PolicyAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'POLICY',
    async run(state) {
      const { context, teachingState, interrupt } = state
      const stageCeiling = teachingState?.stageCeiling ?? 2

      // The stage decides. Same functions, same inputs, same order as the
      // route: Band-2 legality first, then the authority-ordered mapping.
      // Prefer the pipeline's OWN sensing over anything the caller supplies:
      // stage 5 already classified the utterance. This is what makes the
      // recovery path kernel-derived end to end rather than adapter-fed.
      const recoveryKey = interrupt?.preemptsPolicy
        ? (interrupt.failureStateKey ?? 'unknown')
        : (a.recoveryKey ?? null)
      const ladder = a.conversationState
        ? decideNextMoveDetailed(a.conversationState, {
            recoveryTurn: recoveryKey != null,
            workedExampleFirst: a.workedExampleFirst,
            legality: a.legality,
          }).move
        : null
      const move: PolicyMove | null = toPolicyMove({
        recoveryKey,
        episodePhase: a.episodePhase,
        ladderMove: ladder,
      })
      const maxNewTerms = a.contentRegister === 'beginner' ? 1 : 2
      // maxParagraphs: the route's exact expression —
      //   firstLesson ? 2 : responseBudget(register, consecutiveFailures)
      // Both inputs are already kernel artifacts: the register from FOLD
      // (stage 4) and the failure count from TSM-STEP (stage 7, promoted).
      // The first-lesson override is 2 because that protocol mandates
      // two-sentence bursts, which the ordinary beginner budget of 4 would
      // silently widen.
      const maxParagraphs = state.view?.isFirstLessonContext === true
        ? 2
        : responseBudget(
            a.contentRegister,
            teachingState?.consecutiveFailures ?? 0,
            // Same success term as the route, from the same promoted TSM
            // counters — the shadow must mirror the shipping formula exactly
            // or parity reports a divergence that is not real.
            (teachingState?.counters.correctAtCheck ?? 0) + (teachingState?.counters.correctAtPractice ?? 0),
          )

      // visualClass: the route's exact expression —
      //   learnerRequested ? available : decideVisualFirst(available, state, move)
      // decideVisualFirst is pure and already the owner of the phase rule
      // (visuals lead while anchoring/showing; during CHECK/PRACTICE/TRANSFER
      // the learner produces, so an unrequested visual is noise).
      const visualClass = a.availableVisualType === null
        ? null
        : a.learnerRequestedVisual === true
          ? a.availableVisualType
          : (a.conversationState && ladder
              ? decideVisualFirst(a.availableVisualType, a.conversationState, ladder)
              : null)

      const decision: PolicyDecision = {
        decisionId: newId('d'),
        turnId: context.turnId,
        move,
        actionClass: a.actionClass,
        budgets: {
          maxQuestions: maxQuestionsFor(move),
          maxParagraphs,
          maxNewTerms,
        },
        stageCeiling,
        vocabularyBans: a.vocabularyBans,
        visualDirective: { use: visualClass !== null, visualClass },
        provenance: [
          ...(interrupt?.preemptsPolicy ? [`recovery:${interrupt.failureStateKey ?? ''}`] : []),
          ...(interrupt?.autonomyRequested ? ['autonomy'] : []),
          ...a.provenance,
        ],
        prngSeed: seededFrom(context.learnerId, context.sessionId, context.turnId),
        fallbackChain: ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE'],
      }
      return { ...state, policy: decision }
    },
  }
}

// ── K4 engine path — the policy engine as decision authority ─────────────────

/**
 * EnginePolicyDecision → the pipeline's PolicyDecision artifact. ONE owner:
 * the engine stage and the simulation battery both need this mapping, and
 * two copies would let the shadow measurement and the merge gate disagree
 * about what the engine decided.
 */
export function engineDecisionToPolicyDecision(
  engineDecision: EnginePolicyDecision,
  ctx: { learnerId: string; sessionId: string; turnId: string },
): PolicyDecision {
  return {
    decisionId: newId('d'),
    turnId: ctx.turnId,
    move: engineDecision.move,
    actionClass: engineDecision.actionClass,
    budgets: {
      maxQuestions: engineDecision.budgets.maxQuestions,
      maxParagraphs: engineDecision.budgets.maxParagraphs,
      maxNewTerms: engineDecision.budgets.maxNewTerms,
    },
    stageCeiling: engineDecision.stageCeiling,
    vocabularyBans: engineDecision.vocabularyBans,
    visualDirective: { use: engineDecision.visualClass !== null, visualClass: engineDecision.visualClass },
    provenance: engineDecision.provenance.map((t) => t.ruleId),
    prngSeed: seededFrom(ctx.learnerId, ctx.sessionId, ctx.turnId),
    fallbackChain: engineDecision.fallbackChain,
  }
}
