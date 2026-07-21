/**
 * CUE Student Memory Reader — reads the persisted per-learner session state
 * (contextSnapshot fields + episode) into a mastery-state description.
 *
 * Reuses: contextSnapshot.lastSignal / sessionFailureCount (written by the
 * route's existing evidence machinery), sessionLifecycle's episode, and
 * lastSuccessfulTeachingStyle (Student Intelligence's existing memory).
 * Descriptions, never verdicts (student-state design law). Pure function.
 */
import type { SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import { type MasteryState, type Sourced, sourced, unknownValue } from '../types'

export interface StudentMemoryReaderInput {
  lastSignal: { correctness?: boolean; confidence?: string } | null
  sessionFailureCount: number
  episode: SessionEpisode | null
  lastSuccessfulTeachingStyle: string | null
}

export interface StudentMemoryReaderOutput {
  masteryState: Sourced<MasteryState>
  /** Feeds recommendedTeachingMode as the LOWEST-priority source. */
  lastSuccessfulTeachingStyle: string | null
}

export function readStudentMemory(input: StudentMemoryReaderInput): StudentMemoryReaderOutput {
  const failures = Math.max(
    typeof input.sessionFailureCount === 'number' ? input.sessionFailureCount : 0,
    input.episode?.visibleFailures ?? 0,
  )
  let masteryState: Sourced<MasteryState>
  if (failures >= 2) {
    masteryState = sourced('struggling', 'contextSnapshot', 0.75)
  } else if (input.lastSignal?.correctness === false || failures > 0) {
    masteryState = sourced('fragile', 'signals:lastSignal', 0.7)
  } else if (input.lastSignal?.correctness === true) {
    masteryState = sourced('progressing', 'signals:lastSignal', 0.7)
  } else {
    masteryState = unknownValue<MasteryState>() as Sourced<MasteryState>
  }
  return {
    masteryState,
    lastSuccessfulTeachingStyle: input.lastSuccessfulTeachingStyle ?? null,
  }
}
