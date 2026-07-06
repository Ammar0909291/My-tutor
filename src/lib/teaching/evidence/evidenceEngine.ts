// W1-3 (ADR 13 Phase 1): Append-only Evidence Engine — fire-and-forget writer.
//
// Single writer: the Persist stage (route.ts turn-close block).
// No readers wired in Phase 1. Aggregation and rolling-window worker are Phase 2.
// No FK to User — denormalized for lock-free INSERT on the hot path (ADR 13 §5).

import { prisma } from '@/lib/db/prisma'
import { EvidenceCategory, GradeBand } from '@prisma/client'

export { EvidenceCategory, GradeBand }

export interface EvidenceEventInput {
  userId: string
  sessionId?: string
  turnId?: string        // assistant Message.id
  conceptId: string      // KG node slug; Phase 1: subject slug proxy
  language: string       // BCP-47, e.g. "ru", "en"
  gradeBand: GradeBand
  category: EvidenceCategory
  assetId?: string
  misconceptionId?: string
  curriculumId?: string
  outcome: string
  strength: number       // 0–1; ASSET_SHOWN must always pass 0.0
  rawScore?: number
  contextHash?: string
}

/**
 * Fire-and-forget evidence append. Errors are silently discarded — evidence
 * loss is acceptable; turn failure on evidence write is not (ADR 13 §10 P1).
 */
export function appendEvidenceEvent(input: EvidenceEventInput): void {
  prisma.evidenceEvent
    .create({
      data: {
        userId:          input.userId,
        sessionId:       input.sessionId,
        turnId:          input.turnId,
        conceptId:       input.conceptId,
        language:        input.language,
        gradeBand:       input.gradeBand,
        category:        input.category,
        assetId:         input.assetId,
        misconceptionId: input.misconceptionId,
        curriculumId:    input.curriculumId,
        outcome:         input.outcome,
        strength:        input.strength,
        rawScore:        input.rawScore,
        contextHash:     input.contextHash,
      },
    })
    .catch(() => {})
}
