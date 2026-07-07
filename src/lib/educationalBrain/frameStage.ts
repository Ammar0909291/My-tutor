/**
 * Stage 0 — Frame.
 * Builds the initial TurnContext from raw chat-route inputs.
 * Pure (no I/O). Deterministic.
 */
import { randomUUID } from 'crypto'
import type { TurnContext } from './types'

export interface FrameInput {
  userId: string
  sessionId: string
  subjectSlug: string | null
  userMessage: string
}

export function frameStage(input: FrameInput): TurnContext {
  const start = Date.now()
  const ctx: TurnContext = {
    turnId: randomUUID(),
    userId: input.userId,
    sessionId: input.sessionId,
    subjectSlug: input.subjectSlug,
    userMessage: input.userMessage,
    receivedAt: start,
    intent: null,
    candidateConcept: null,
    conceptContext: null,
    candidateAssets: null,
    composedContextNote: null,
    shortCircuit: null,
    spans: [{ stage: 'frame', startedAt: start, durationMs: Date.now() - start }],
  }
  return ctx
}
