/**
 * Stage 13 — COMMIT-2. Owner: Evidence Store. Persists the assistant turn
 * + DecisionRecorded (RS §1). K3 v1: the actual DB write is delegated to
 * the caller (route.ts already creates the assistant Message row); this
 * stage records the committed identity so downstream stages can reference
 * it.
 */
import type { KernelState, Stage, CommittedTurn } from '../types'

export interface Commit2Adapters {
  assistantMessageId: string
  cleanText: string
  decisionRecordedSeq?: number | null
}

export function commit2Stage(a: Commit2Adapters): Stage<KernelState, KernelState> {
  return {
    name: 'COMMIT-2',
    async run(state) {
      const committedTurn: CommittedTurn = {
        turnId: state.context.turnId,
        assistantMessageId: a.assistantMessageId,
        decisionRecordedSeq: a.decisionRecordedSeq ?? null,
        cleanText: a.cleanText,
      }
      return { ...state, committedTurn }
    },
  }
}
