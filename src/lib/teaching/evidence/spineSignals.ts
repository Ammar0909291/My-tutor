/**
 * Evidence Engine — Spine-derived signals (ADR 13 Phase 2 follow-up).
 *
 * Closes one gap left by the initial Evidence Reader (evidenceReader.ts):
 * "worked example used" is an explicit per-lesson capture target, but the
 * Reader draws only from EvidenceEvent / TeachingStrategyEvent /
 * TopicProgress / MistakeRecord, none of which carry it. The one place this
 * signal genuinely exists live is the EOS M1 Evidence Spine's
 * `DecisionRecorded` event (`workedExampleFirst` + `provenance[]`), written
 * every turn by `src/lib/evidence-spine/turnEmitter.ts` from `route.ts`.
 * This module reads that ADDITIONALLY and enriches `LessonEvidence` with
 * it — no new telemetry, no schema change, no writer, no change to
 * evidenceReader.ts/learningAnalytics.ts/authoringFeedback.ts/
 * packageFeedback.ts (their functions accept `LessonEvidence[]` structurally,
 * so passing the enriched, superset objects here works unmodified).
 *
 * SpineEvents aren't reliably conceptId-tagged (only `AnswerObserved`/
 * `LessonCompleted` carry one) — this joins via `turnId` against the SAME
 * EvidenceEventRow list the Reader already consumed. Both writers populate
 * from one turn-close block in `route.ts`, so a shared `turnId` is a safe,
 * exact join key — never a new derivation.
 */
import { prisma } from '@/lib/db/prisma'
import type { EvidenceEventRow, LessonEvidence } from './evidenceReader'
import type { RateStat } from './learningAnalytics'

export interface SpineDecisionRow {
  turnId: string | null
  workedExampleFirst: boolean
  provenance: string[]
}

export interface LessonSpineSignals {
  workedExampleUsed: boolean
  /** Deduped, first-seen order — the coarse "teaching action used" tags
   *  DecisionRecorded actually carries live today (recovery state, autonomy,
   *  verifier outcome, first-lesson, learner-request type — NOT a literal
   *  blueprint Teaching Action id; no runtime path dispatches by TA id yet). */
  decisionProvenance: string[]
}

export type LessonWithSpineSignals = LessonEvidence & LessonSpineSignals

function lessonKeyOf(userId: string, sessionId: string | null, conceptId: string): string {
  return `${userId} ${sessionId ?? ''} ${conceptId}`
}

/** turnId → lessonKey, built from the SAME events evidenceReader.ts
 *  consumed — every EvidenceEvent row carries its lesson's
 *  (userId, sessionId, conceptId). Exported so callers can build this once
 *  per corpus and reuse it. */
export function mapTurnsToLessons(events: EvidenceEventRow[]): Map<string, string> {
  const map = new Map<string, string>()
  for (const e of events) {
    if (!e.turnId) continue
    map.set(e.turnId, lessonKeyOf(e.userId, e.sessionId, e.conceptId))
  }
  return map
}

/** Pure: folds SpineDecisionRow[] into one LessonSpineSignals per lesson. */
export function computeLessonSpineSignals(
  decisions: SpineDecisionRow[],
  turnToLesson: Map<string, string>,
): Map<string, LessonSpineSignals> {
  const out = new Map<string, LessonSpineSignals>()
  for (const d of decisions) {
    if (!d.turnId) continue
    const lessonKey = turnToLesson.get(d.turnId)
    if (!lessonKey) continue
    const entry = out.get(lessonKey) ?? { workedExampleUsed: false, decisionProvenance: [] }
    if (d.workedExampleFirst) entry.workedExampleUsed = true
    for (const tag of d.provenance) {
      if (!entry.decisionProvenance.includes(tag)) entry.decisionProvenance.push(tag)
    }
    out.set(lessonKey, entry)
  }
  return out
}

/** Pure: attaches spine signals to a LessonEvidence[] (returns NEW objects;
 *  input untouched). Lessons with no matching signal default to
 *  { workedExampleUsed: false, decisionProvenance: [] } — never assumed true. */
export function attachSpineSignals(
  lessons: LessonEvidence[],
  signals: Map<string, LessonSpineSignals>,
): LessonWithSpineSignals[] {
  return lessons.map((lesson) => {
    const key = lessonKeyOf(lesson.userId, lesson.sessionId, lesson.conceptId)
    const sig = signals.get(key) ?? { workedExampleUsed: false, decisionProvenance: [] }
    return { ...lesson, ...sig }
  })
}

// ── Worked-example effectiveness ─────────────────────────────────────────────
// Mirrors learningAnalytics.ts's rate-stat / next-probe-join pattern
// (teachingActionSuccessRates) exactly, applied to this one extra signal —
// reuses that module's own RateStat shape rather than redefining it.

function rateStat(successes: number, failures: number): RateStat {
  const total = successes + failures
  return { successes, failures, total, rate: total === 0 ? 0 : successes / total }
}

export interface WorkedExampleEffectiveness {
  withWorkedExample: RateStat
  withoutWorkedExample: RateStat
}

/** Does leading a lesson with a worked example correlate with the lesson's
 *  FIRST probe outcome passing? Lessons with no probes don't count. */
export function computeWorkedExampleEffectiveness(lessons: LessonWithSpineSignals[]): WorkedExampleEffectiveness {
  let wPass = 0, wFail = 0, woPass = 0, woFail = 0
  for (const l of lessons) {
    const firstProbe = l.probes[0]
    if (!firstProbe) continue
    if (l.workedExampleUsed) {
      if (firstProbe.passed) wPass++
      else wFail++
    } else {
      if (firstProbe.passed) woPass++
      else woFail++
    }
  }
  return {
    withWorkedExample: rateStat(wPass, wFail),
    withoutWorkedExample: rateStat(woPass, woFail),
  }
}

// ── Impure loader (the only impure export in this file) ──────────────────────

/** Loads DecisionRecorded rows for exactly the turnIds the Reader's corpus
 *  already identified — never a broader scan. Read-only; never throws
 *  (matches evidenceLoad.ts's non-fatal convention — an empty result is
 *  indistinguishable from "no spine data yet" and never breaks the report). */
export async function loadSpineDecisions(turnIds: string[]): Promise<SpineDecisionRow[]> {
  if (turnIds.length === 0) return []
  try {
    const rows = await prisma.spineEvent.findMany({
      where: { turnId: { in: turnIds }, type: 'DecisionRecorded' },
      select: { turnId: true, payload: true },
    })
    return rows.map((r) => {
      const p = r.payload as { workedExampleFirst?: boolean; provenance?: string[] }
      return { turnId: r.turnId, workedExampleFirst: p.workedExampleFirst === true, provenance: p.provenance ?? [] }
    })
  } catch {
    return []
  }
}
