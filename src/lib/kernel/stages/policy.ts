/**
 * Stage 8 — POLICY. Owner: Policy Engine (RS §5).
 *
 * K3 provided an adapter-driven stub. K4 upgrades it: when the caller
 * supplies a PolicyPack (typically BASE_PACK), the engine's 7-band
 * evaluation is authoritative and its EnginePolicyDecision is mapped
 * onto the pipeline's PolicyDecision artifact — with full provenance.
 *
 * The adapter-driven path remains for K3 callers that haven't opted in
 * yet (ENABLE_POLICY_PACKS off): pass PolicyAdapters and the previous
 * behaviour applies verbatim. Strangler discipline preserved.
 */
import { createHash } from 'node:crypto'
import type { KernelState, Stage, PolicyDecision, PolicyMove } from '../types'
import { newId } from '../context'
import type { PolicyInputs, PolicyPack, EnginePolicyDecision } from '../policy/types'
import { decide } from '../policy/engine'
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
        : responseBudget(a.contentRegister, teachingState?.consecutiveFailures ?? 0)

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

export interface EnginePolicyInputs {
  pack: PolicyPack
  inputs: PolicyInputs
}

/** Kernel-authoritative POLICY stage. Uses the 7-band engine. Behaviour:
 *   1. Engine decides move / budgets / vocabulary / content slots with
 *      full provenance.
 *   2. Stage packs the result into the pipeline's PolicyDecision shape,
 *      preserving the K3 artifact contract downstream.
 *   3. K3-style provenance strings are derived from engine traces so
 *      existing consumers keep working (union of both worlds while K5
 *      and K6 land).
 */
export function enginePolicyStage(args: EnginePolicyInputs): Stage<KernelState, KernelState> {
  return {
    name: 'POLICY',
    async run(state) {
      const { context } = state
      const engineDecision: EnginePolicyDecision = decide(args.pack, args.inputs)
      const decision: PolicyDecision = {
        decisionId: newId('d'),
        turnId: context.turnId,
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
        prngSeed: seededFrom(context.learnerId, context.sessionId, context.turnId),
        fallbackChain: engineDecision.fallbackChain,
      }
      // Stash the full engine trace on the adapters bag for downstream
      // consumers that want it (RESOLVE reads visualClass; PLAN reads
      // contentSlots via the same bag). Keeps the pipeline artifact
      // typed while carrying the deeper provenance.
      const adapters = { ...(state.adapters ?? {}), engineDecision }
      return { ...state, policy: decision, adapters }
    },
  }
}
