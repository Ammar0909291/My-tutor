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

export interface PolicyAdapters {
  move: PolicyMove | null
  actionClass: string | null
  maxQuestions: 0 | 1
  maxParagraphs: number | null
  maxNewTerms: number
  visualClass: string | null
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
      const move: PolicyMove | null = interrupt?.preemptsPolicy ? 'RECOVER' : a.move
      const decision: PolicyDecision = {
        decisionId: newId('d'),
        turnId: context.turnId,
        move,
        actionClass: a.actionClass,
        budgets: {
          maxQuestions: (move === 'ASK' ? 1 : 0) as 0 | 1,
          maxParagraphs: a.maxParagraphs,
          maxNewTerms: a.maxNewTerms,
        },
        stageCeiling,
        vocabularyBans: a.vocabularyBans,
        visualDirective: { use: a.visualClass !== null, visualClass: a.visualClass },
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
