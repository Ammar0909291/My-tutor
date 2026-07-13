/**
 * Asset Generation Pipeline (Phase 5 task 2) — the single entry point that
 * turns one freshly generated lesson into reviewable Knowledge Assets.
 * Normalizes the text, decomposes it into labelled explanation sections
 * (lessonDecomposition.ts) and extracts any assessment items already
 * present (probeExtraction.ts), validates every candidate
 * (validation.ts) before it ever reaches the database, and hands
 * validated candidates to the existing capture functions
 * (captureGeneratedExplanation / captureGeneratedProbe) — which already
 * own canonical-slug generation, duplicate detection, and versioning
 * (decideCaptureAction in versioning.ts). This file adds no new
 * dedup/versioning logic of its own; it is purely the ingestion front door
 * those already-built pieces were missing.
 *
 * Fire-and-forget by contract, matching the call site in route.ts: never
 * throws, never blocks a turn. Every attempt (accepted or rejected) is
 * recorded in captureTracker for the health report (task 6).
 */
import type { GradeBand } from '@prisma/client'
import type { ExplanationKind, ProbeKind, ProbeChoice } from './assetIdentity'
import type { CaptureOutcome } from './versioning'
import { decomposeLesson } from './lessonDecomposition'
import { extractProbes } from './probeExtraction'
import { validateExplanationCandidate, validateProbeCandidate } from './validation'
import { captureGeneratedExplanation } from './explanationMemory'
import { captureGeneratedProbe } from './teachingActionRepository'
import { captureTracker } from './captureTracker'

export interface IngestLessonInput {
  conceptId: string
  subjectSlug: string
  language: string
  gradeBand: GradeBand
  rawContent: string
  authorId: string
}

export interface IngestedExplanation {
  familyKind: ExplanationKind
  outcome: CaptureOutcome
}

export interface IngestedProbe {
  probeKind: ProbeKind
  outcome: CaptureOutcome
}

export interface IngestLessonResult {
  explanations: IngestedExplanation[]
  probes: IngestedProbe[]
}

function normalizeLessonText(raw: string): string {
  return raw.replace(/\r\n/g, '\n').trim()
}

/**
 * Decomposes + extracts + validates + captures. Called after a successful
 * LLM generation, the same point where captureGeneratedExplanation used to
 * be called directly for the whole response as one core_explanation blob.
 */
export async function ingestGeneratedLesson(input: IngestLessonInput): Promise<IngestLessonResult> {
  const explanations: IngestedExplanation[] = []
  const probes: IngestedProbe[] = []

  try {
    const normalized = normalizeLessonText(input.rawContent)

    for (const section of decomposeLesson(normalized)) {
      const validation = validateExplanationCandidate({
        conceptId: input.conceptId,
        language: input.language,
        content: section.content,
        familyKind: section.familyKind,
      })

      let outcome: CaptureOutcome
      if (!validation.valid) {
        outcome = { action: 'rejected', reason: validation.reason }
        captureTracker.recordRejection()
      } else {
        outcome = await captureGeneratedExplanation({
          conceptId: input.conceptId,
          subjectSlug: input.subjectSlug,
          language: input.language,
          gradeBand: input.gradeBand,
          content: section.content,
          familyKind: section.familyKind,
          authorId: input.authorId,
        })
        captureTracker.record(outcome)
      }
      explanations.push({ familyKind: section.familyKind, outcome })
    }

    for (const probe of extractProbes(normalized)) {
      const validation = validateProbeCandidate({
        conceptId: input.conceptId,
        language: input.language,
        stem: probe.stem,
        probeKind: probe.probeKind,
        choices: probe.choices,
      })

      let outcome: CaptureOutcome
      if (!validation.valid) {
        outcome = { action: 'rejected', reason: validation.reason }
        captureTracker.recordRejection()
      } else {
        outcome = await captureGeneratedProbe({
          conceptId: input.conceptId,
          subjectSlug: input.subjectSlug,
          language: input.language,
          gradeBand: input.gradeBand,
          stem: probe.stem,
          choices: probe.choices as ProbeChoice[] | undefined,
          correctValue: probe.correctValue,
          probeKind: probe.probeKind,
          authorId: input.authorId,
        })
        captureTracker.record(outcome)
      }
      probes.push({ probeKind: probe.probeKind, outcome })
    }
  } catch (err) {
    console.warn('[pipeline] ingestGeneratedLesson failed:', err)
  }

  return { explanations, probes }
}
