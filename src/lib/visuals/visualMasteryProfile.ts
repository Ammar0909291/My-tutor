/**
 * Visual Learning Profile — Visual Learning Sprint N, Tasks 2/3/4.
 *
 * Reads Sprint M's persisted `EvidenceRecord(type: VISUAL)` rows and builds a
 * read-only, per-visual-type engagement profile, plus a simple completion-
 * rate-based weakness list. Pure aggregation over already-persisted data —
 * no new schema, no writes, no scoring/grading semantics (a "completion
 * rate" here is a descriptive engagement statistic, not a mastery score).
 *
 * Deliberately separate from `summarizeVisualMastery()` in `visualMastery.ts`
 * (Sprint K/L), which aggregates in-memory `VisualMasterySignal[]` for a
 * single session. This module aggregates *persisted* evidence across a
 * student's entire history, and is never called by — and never calls into —
 * any existing recommendation/progress/revision/weak-topic file (see
 * docs/VISUAL_INTELLIGENCE_AUDIT.md).
 */
import { prisma } from '@/lib/db/prisma'
import type { VisualMasteryEngine } from './visualMastery'

/** One visual evidence row's `notes` shape, as written by Sprint M's persistence adapter. */
interface VisualEvidenceNotes {
  visualType: VisualMasteryEngine | string
  shown: number
  interacted: number
  completed: number
}

/** The minimal shape this module needs from an `EvidenceRecord` row — callers may pass full Prisma rows. */
export interface VisualEvidenceRow {
  notes: VisualEvidenceNotes | null
}

/** Per-visual-type engagement counts, summed across every persisted row for a user. */
export interface VisualLearningProfileEntry {
  shown: number
  interacted: number
  completed: number
  /** completed / shown, rounded to whole percent; null when never shown. Descriptive only — not a grade. */
  completionRatePct: number | null
}

/** Example: `{ graph: { shown: 20, completed: 15, ... }, geometry: { shown: 10, completed: 9, ... } }` (per the Sprint N brief). */
export type VisualLearningProfile = Partial<Record<VisualMasteryEngine, VisualLearningProfileEntry>>

/**
 * Task 2/3 — builds the profile from a flat list of persisted evidence rows.
 * Pure function: no Prisma dependency, no I/O, so it's independently testable
 * and reusable wherever rows are already in hand (e.g. the dev viewer's API route).
 */
export function buildVisualLearningProfile(rows: VisualEvidenceRow[]): VisualLearningProfile {
  const profile: VisualLearningProfile = {}

  for (const row of rows) {
    const notes = row.notes
    if (!notes?.visualType) continue
    const visualType = notes.visualType as VisualMasteryEngine
    const entry = profile[visualType] ?? { shown: 0, interacted: 0, completed: 0, completionRatePct: null }
    entry.shown += notes.shown ?? 0
    entry.interacted += notes.interacted ?? 0
    entry.completed += notes.completed ?? 0
    profile[visualType] = entry
  }

  for (const entry of Object.values(profile)) {
    if (!entry) continue
    entry.completionRatePct = entry.shown > 0 ? Math.round((entry.completed / entry.shown) * 100) : null
  }

  return profile
}

/** Task 2/3 — loads a user's persisted visual evidence and builds their profile. The only Prisma call in this module; read-only, queries `EvidenceRecord` exclusively. */
export async function getVisualLearningProfile(userId: string): Promise<VisualLearningProfile> {
  const rows = await prisma.evidenceRecord.findMany({
    where: { userId, type: 'VISUAL' },
    select: { notes: true },
  })
  return buildVisualLearningProfile(rows as unknown as VisualEvidenceRow[])
}

/** Task 4 — one weak visual area, recommendation only. Never mutates curriculum, progress, or evidence data. */
export interface VisualWeaknessEntry {
  visualType: VisualMasteryEngine
  shown: number
  completed: number
  completionRatePct: number
  recommendation: string
}

/** Below this completion rate, a visual type is flagged as a weak engagement area. Chosen so the brief's own example (Graph 80%, Geometry 90%, Process Flow 25%) flags only Process Flow. */
export const VISUAL_WEAKNESS_THRESHOLD_PCT = 50

/**
 * Task 4 — identifies visual types the student shows but rarely completes.
 * Excludes types never shown (`completionRatePct === null`) — no evidence is
 * not the same signal as weak engagement. Sorted weakest-first.
 */
export function detectVisualWeaknesses(
  profile: VisualLearningProfile,
  thresholdPct: number = VISUAL_WEAKNESS_THRESHOLD_PCT
): VisualWeaknessEntry[] {
  const weaknesses: VisualWeaknessEntry[] = []

  for (const [visualType, entry] of Object.entries(profile) as [VisualMasteryEngine, VisualLearningProfileEntry][]) {
    if (!entry || entry.completionRatePct === null || entry.completionRatePct >= thresholdPct) continue
    weaknesses.push({
      visualType,
      shown: entry.shown,
      completed: entry.completed,
      completionRatePct: entry.completionRatePct,
      recommendation: `Low completion on ${visualType} visuals (${entry.completionRatePct}%, ${entry.completed}/${entry.shown}) — consider revisiting ${visualType}-based practice.`,
    })
  }

  return weaknesses.sort((a, b) => a.completionRatePct - b.completionRatePct)
}
