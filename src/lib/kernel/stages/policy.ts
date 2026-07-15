/**
 * Stage 8 — POLICY. Owner: Policy Engine (RS §5).
 *
 * K3 v1: emits a PolicyDecision derived from decisions the current runtime
 * already makes (move, stageCeiling, budgets, worked-example-first). The
 * seven-band evaluation network + compiled policy packs are K4's territory;
 * this stage exists to carry those decisions through the pipeline typed,
 * with a PRNG seed recorded so future MRT cells (S4/OSF) have a home.
 */
import { createHash } from 'node:crypto'
import type { KernelState, Stage, PolicyDecision, PolicyMove } from '../types'
import { newId } from '../context'

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
