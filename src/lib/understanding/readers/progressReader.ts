/**
 * CUE Progress Reader — reads WHERE the learner is: current concept,
 * its first KG prerequisite, and the progression state of this session.
 *
 * Reuses: the route's already-resolved concept id (teaching-engine seeding /
 * contextSnapshot.currentConceptNodeId), the in-memory Knowledge Graph
 * (getKGNode — a pure lookup, no I/O), placementVerification's persisted
 * state machine, and the due-review count the route already computed.
 * Pure function; the KG read is an in-memory map hit.
 */
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { PlacementVerificationState } from '@/lib/teaching/placementVerification'
import type { SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import { type ProgressState, type Sourced, sourced, unknownValue } from '../types'

export interface ProgressReaderInput {
  /** resolvedConceptId ?? contextSnapshot.currentConceptNodeId — already computed by the route. */
  conceptId: string | null
  placement: PlacementVerificationState | null
  pendingPlacementProbe: 'below' | 'at' | 'above' | null
  dueReviewCount: number
  episode: SessionEpisode | null
}

export interface ProgressReaderOutput {
  currentTopic: Sourced<string>
  prerequisiteTopic: Sourced<string>
  progressState: Sourced<ProgressState>
}

export function readProgress(input: ProgressReaderInput): ProgressReaderOutput {
  let currentTopic: Sourced<string>
  let prerequisiteTopic: Sourced<string>

  if (input.conceptId) {
    const node = getKGNode(input.conceptId)
    if (node) {
      currentTopic = sourced(`${node.id} (${node.title})`, 'knowledgeGraph', 0.95)
      const firstPrereq = node.prerequisites[0]
      if (firstPrereq) {
        const prereqNode = getKGNode(firstPrereq)
        prerequisiteTopic = sourced(
          prereqNode ? `${prereqNode.id} (${prereqNode.title})` : firstPrereq,
          'knowledgeGraph', 0.9,
        )
      } else {
        prerequisiteTopic = sourced('none', 'knowledgeGraph', 0.9)
      }
    } else {
      // Concept id known to the session but not resolvable in the KG
      // (e.g. legacy non-KG subject slug) — keep the raw id, say so.
      currentTopic = sourced(input.conceptId, 'contextSnapshot', 0.6)
      prerequisiteTopic = unknownValue() as Sourced<string>
    }
  } else {
    currentTopic = unknownValue() as Sourced<string>
    prerequisiteTopic = unknownValue() as Sourced<string>
  }

  let progressState: Sourced<ProgressState>
  if (input.pendingPlacementProbe || (input.placement && !input.placement.verified)) {
    progressState = sourced('placement_in_progress', 'placementVerification', 0.85)
  } else if (input.dueReviewCount > 0 && input.episode?.phase !== 'CORE') {
    progressState = sourced('reviews_due', 'sessionLifecycle', 0.8)
  } else if (input.conceptId) {
    progressState = sourced('on_track', 'contextSnapshot', 0.6)
  } else {
    progressState = unknownValue<ProgressState>() as Sourced<ProgressState>
  }

  return { currentTopic, prerequisiteTopic, progressState }
}
