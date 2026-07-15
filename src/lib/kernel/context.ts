/**
 * K3 — Context helpers. Immutable per-turn identity + pure KernelState
 * threading. Kept separate from types so tests can construct fixtures
 * without importing every stage.
 */
import type { KernelState, TurnContext, StageName } from './types'

let counter = 0
/** ULID-shaped id; sortable-ish, collision-free for one process. Real ULIDs
 * arrive when the C-1 discipline is enforced repo-wide (out of K3 scope). */
export function newId(prefix: string): string {
  counter = (counter + 1) & 0xffffff
  return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`
}

export function makeTurnContext(input: Omit<TurnContext, 'turnId' | 'receivedAtMs'> & Partial<Pick<TurnContext, 'turnId' | 'receivedAtMs'>>): TurnContext {
  return {
    turnId: input.turnId ?? newId('t'),
    receivedAtMs: input.receivedAtMs ?? Date.now(),
    learnerId: input.learnerId,
    sessionId: input.sessionId,
    subjectSlug: input.subjectSlug,
    messageLength: input.messageLength,
    isSchoolMode: input.isSchoolMode,
  }
}

export function initialState(context: TurnContext, adapters?: Record<string, unknown>): KernelState {
  return { context, adapters }
}

/** Add or replace an artifact by field name, producing a new state. */
export function withArtifact<K extends keyof KernelState>(
  state: KernelState,
  key: K,
  value: NonNullable<KernelState[K]>,
): KernelState {
  return { ...state, [key]: value }
}

/** Stage-ordering constant used by the pipeline orchestrator + tests. */
export const STAGE_ORDER: readonly StageName[] = [
  'INGEST', 'SENSE', 'COMMIT-1', 'FOLD', 'INTERRUPT-SCAN',
  'SCHEDULE', 'TSM-STEP', 'POLICY', 'RESOLVE', 'PLAN',
  'RENDER', 'VERIFY', 'COMMIT-2', 'PERSIST', 'POST',
] as const
