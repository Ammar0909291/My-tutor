/**
 * Visual Mastery Persistence Adapter — Visual Learning Sprint M, Task 3.
 *
 * Sits between the in-memory collector (useVisualMastery, Sprint L) and
 * storage (EvidenceRecord, via the API route in
 * src/app/api/visual-mastery/persist/route.ts). Pure data-shaping only — no
 * Prisma import here, so this module is safe to import from client code
 * (the quiz components) as well as the server route, and is trivially unit
 * testable without a database.
 *
 * Pipeline: Mastery Event (renderer onMasteryEvent)
 *        -> Collector (useVisualMastery's per-instance dedup + summary)
 *        -> Persistence Adapter (this file: summary -> EvidenceRecord rows)
 *        -> Storage (EvidenceRecord, type: VISUAL, weight: 0)
 *
 * Deliberately summarized, not per-click: the adapter consumes the
 * collector's already-deduplicated per-engine `VisualMasterySummary`
 * (`{ graph: { shown, interacted, completed }, ... }`), not raw
 * VisualMasterySignal events — one EvidenceRecord row per visual engine
 * observed in a session, not one per interaction.
 */
import type { VisualMasteryEngine, VisualMasterySource } from './visualMastery'
import type { VisualMasterySummary } from '@/hooks/useVisualMastery'

/** What a quiz completion handler sends to the persist API. */
export interface VisualMasteryPersistRequest {
  subjectSlug: string
  topicSlug: string
  source: VisualMasterySource
  sessionId?: string
  summary: VisualMasterySummary
}

/** One additive EvidenceRecord row, shaped for `prisma.evidenceRecord.createMany`. `userId` is attached by the API route from the authenticated session, never trusted from the client. */
export interface VisualMasteryEvidenceInput {
  subjectSlug: string
  topicSlug: string
  type: 'VISUAL'
  /** Matches EvidenceRecord.engineKey — the visual engine name (e.g. "graph", "number_line"). Gives each engine its own unique row per (user, topic) while the DB @@unique constraint prevents concurrent duplicates. */
  engineKey: string
  /** Challenge-completion rate for this engine this session, 0-100. 0 when no challenge was attempted (a pure "shown" observation still gets a row, scored 0, so it's never silently dropped). */
  score: number
  /** Always 0 — visual signals are evidence-only and must never be blended into any existing or future weighted-average mastery score by default (see docs/VISUAL_MASTERY_PERSISTENCE_AUDIT.md). */
  weight: 0
  method: 'visual_mastery'
  notes: {
    visualType: VisualMasteryEngine
    shown: number
    interacted: number
    completed: number
    source: VisualMasterySource
    sessionId?: string
    persistedAt: string
  }
}

/** Builds one EvidenceRecord input per visual engine present in the summary. Returns an empty array when the summary is empty (e.g. a quiz with no visuals shown) — callers should skip the persist call entirely in that case. */
export function buildVisualMasteryEvidence(req: VisualMasteryPersistRequest): VisualMasteryEvidenceInput[] {
  const persistedAt = new Date().toISOString()
  return Object.entries(req.summary).map(([visualType, counts]) => ({
    subjectSlug: req.subjectSlug,
    topicSlug: req.topicSlug,
    type: 'VISUAL' as const,
    engineKey: visualType,
    score: counts.shown > 0 ? Math.round((counts.completed / counts.shown) * 100) : 0,
    weight: 0 as const,
    method: 'visual_mastery' as const,
    notes: {
      visualType: visualType as VisualMasteryEngine,
      shown: counts.shown,
      interacted: counts.interacted,
      completed: counts.completed,
      source: req.source,
      sessionId: req.sessionId,
      persistedAt,
    },
  }))
}

/**
 * Client-side helper: POSTs a collector summary to the persist API.
 * Fire-and-forget by design — a failed save must never block or alter the
 * quiz completion flow it's called from. Returns true on success, false on
 * any failure (network, auth, validation), and never throws.
 */
export async function persistVisualMasterySummary(req: VisualMasteryPersistRequest): Promise<boolean> {
  if (Object.keys(req.summary).length === 0) return true // nothing to save, not a failure
  try {
    const res = await fetch('/api/visual-mastery/persist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    })
    return res.ok
  } catch {
    return false
  }
}
