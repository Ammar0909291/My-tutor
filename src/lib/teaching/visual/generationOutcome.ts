/**
 * WHAT HAPPENED WHEN THE ENGINE TRIED TO DRAW A CONCEPT.
 *
 * THE GAP THIS CLOSES. A rejected generation currently returns a reason to the
 * caller and is then discarded. Nothing is written down. That is survivable
 * while generation is off, and indefensible the moment it is on, because the
 * two questions you must be able to answer are:
 *
 *   is the GENERATOR weak?      (it keeps producing unusable scenes)
 *   is the RULE too strict?     (it keeps rejecting good ones)
 *
 * and a discarded rejection makes them indistinguishable. The first real
 * measurement (2026-08-10) landed squarely on the second: the anchor rule
 * rejected 7 of 7 of this repository's own authored gold-standard figures. Had
 * rejections been recorded from the start, that would have been visible as a
 * pattern long before anyone thought to test the rule against known-good input.
 *
 * So an outcome is recorded for EVERY attempt, accepted or not.
 *
 * ── WHY A SINK INTERFACE ────────────────────────────────────────────────────
 * The recorder is injected, exactly as `VisualizationCacheClient` is. That
 * keeps this module pure and testable, keeps the engine honest when no database
 * is reachable (the outcome is dropped, the turn is unaffected), and means the
 * persistence decision — AssetIdentity + VisualAsset rows — lives with the code
 * that owns those tables rather than inside the generator.
 *
 * Recording is ALWAYS best-effort. A failure to write an audit row must never
 * fail a teaching turn.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import type { EngineRejection, GeneratedFigure } from './visualEngine'
import type { ServicePolicy } from './generationPolicy'

export interface GenerationOutcome {
  conceptId: string
  conceptTitle: string
  /** The policy in force when the attempt ran — an outcome is only readable against it. */
  policy: ServicePolicy
  /** Wall-clock cost of the attempt, for the budget work that follows. */
  elapsedMs: number
  /** True when the scene came from the cache rather than the model. */
  cached: boolean
  /** The model that produced it, when one was called. */
  model?: string
  result:
    | {
        ok: true
        scene: SceneSpec
        served: boolean
        /**
         * The figure in the form the model actually chose. `scene` above cannot
         * represent a VisualSpec and carries an EMPTY placeholder for one, which
         * would have written blank evidence rows for every generated graph,
         * number line, geometry figure and process flow. Readers prefer this.
         */
        figure?: GeneratedFigure
      }
    | {
        ok: false
        reason: EngineRejection
        scene: SceneSpec | null
        /**
         * WHAT WAS REJECTED, verbatim.
         *
         * The module's own justification is telling a weak generator from an
         * over-strict rule, and a rejection with no payload cannot distinguish
         * them: the 7-of-7 false-reject finding was only legible because the
         * rejected figures were still in front of us. Recording the reason
         * without the artefact would have reproduced exactly the blindness this
         * file exists to remove.
         */
        payload?: unknown
      }
}

/**
 * Where outcomes go. Implemented by the persistence layer; omitted in tests and
 * wherever no database is reachable.
 *
 * `record` must not throw. Callers wrap it anyway — belt and braces — because
 * an audit trail is never worth a failed lesson.
 */
export interface GenerationOutcomeSink {
  record(outcome: GenerationOutcome): Promise<void>
}

/**
 * Hand an outcome to the sink, swallowing everything.
 *
 * Returns whether it was recorded, so a caller that cares (an operator script,
 * a test) can tell "no sink" from "sink failed" — while a teaching turn, which
 * does not care, can ignore it entirely.
 */
export async function recordGenerationOutcome(
  outcome: GenerationOutcome,
  sink?: GenerationOutcomeSink,
): Promise<boolean> {
  if (!sink) return false
  try {
    await sink.record(outcome)
    return true
  } catch {
    return false
  }
}

/**
 * A one-line summary of an attempt, for logs and for the operator surface.
 *
 * Deliberately states the POLICY and whether the figure was SERVED, not merely
 * whether it validated: "accepted but held for review" and "accepted and shown
 * to a learner" are different events and must never read the same.
 */
export function describeOutcome(outcome: GenerationOutcome): string {
  const where = outcome.cached ? 'cache' : (outcome.model ?? 'model')
  if (outcome.result.ok) {
    const served = outcome.result.served ? 'SERVED' : 'HELD-FOR-REVIEW'
    return `${outcome.conceptId} accepted (${served}) policy=${outcome.policy} from=${where} ${outcome.elapsedMs}ms`
  }
  return `${outcome.conceptId} rejected:${outcome.result.reason} policy=${outcome.policy} from=${where} ${outcome.elapsedMs}ms`
}
