/**
 * Package Runtime — Phase 3: Lesson Assembler.
 *
 * Student State + Educational Package → Lesson Context. Every byte of the
 * output derives from the package (via the reader) — no blueprint markdown,
 * no EB concept entries, no database. Pure and deterministic: the same
 * (state, package) pair always yields the same LessonContext.
 *
 * The `block` field intentionally mirrors the legacy BLUEPRINT CONTEXT
 * prompt-block shape (headings, advisory framing) so swapping the source
 * from markdown-at-request-time to compiled-package does not change Tutor
 * Max's external behavior — same seam, same style of context, new engine.
 */
import type { EducationalPackage, LessonContext, StudentLessonState } from './types'
import {
  getAdaptiveRules, getCoreExplanation, getLearningObjectives, getMasteryProbes,
  getMisconceptions, getPrerequisites, getSessionFlow, getWorkedExamples,
} from './reader'

/** Worked-example budget per content register (deterministic selection:
 *  always the first N in authored order). */
const EXAMPLE_BUDGET: Record<'beginner' | 'intermediate' | 'expert', number> = {
  beginner: 1,
  intermediate: 2,
  expert: 3,
}

export function assembleLessonContext(
  state: StudentLessonState,
  pkg: EducationalPackage,
): LessonContext {
  const register = state.register ?? 'intermediate'
  const activeMcIds = state.activeMisconceptionIds ?? []

  const coreExplanation = getCoreExplanation(pkg)
  const allExamples = getWorkedExamples(pkg)
  const workedExamples = allExamples.slice(0, EXAMPLE_BUDGET[register])
  const misconceptions = getMisconceptions(pkg)
  const masteryProbes = getMasteryProbes(pkg)
  const sessionFlow = getSessionFlow(pkg)
  const adaptiveRules = getAdaptiveRules(pkg)
  const learningObjectives = getLearningObjectives(pkg)

  // Active misconceptions first (repair priority), authored order otherwise.
  const orderedMisconceptions = [
    ...misconceptions.filter((m) => m.localKey !== null && activeMcIds.includes(m.localKey)),
    ...misconceptions.filter((m) => m.localKey === null || !activeMcIds.includes(m.localKey)),
  ]

  const lines: string[] = []
  lines.push('\n\nEDUCATIONAL PACKAGE CONTEXT')
  lines.push(`Concept: ${pkg.manifest.conceptId}`)
  lines.push(`Package: ${pkg.manifest.packageId}@${pkg.manifest.packageVersion} (${pkg.manifest.contentHash.slice(0, 19)}…)`)

  if (learningObjectives.length > 0) {
    lines.push('\nLEARNING OBJECTIVE')
    for (const lo of learningObjectives) lines.push(lo.content)
  }

  if (coreExplanation && (state.isFirstExposure !== false || register === 'beginner')) {
    lines.push('\nCORE EXPLANATION')
    lines.push(coreExplanation.content)
  } else if (coreExplanation) {
    // Returning learner above beginner register: definition line only.
    lines.push('\nCORE EXPLANATION (condensed — returning learner)')
    lines.push(coreExplanation.content.split('\n\n')[0] ?? coreExplanation.content)
  }

  if (workedExamples.length > 0) {
    lines.push(`\nWORKED EXAMPLES (${workedExamples.length} of ${allExamples.length} selected for ${register} register)`)
    for (const we of workedExamples) lines.push(`\n${we.content}`)
  }

  if (orderedMisconceptions.length > 0) {
    lines.push('\nKNOWN MISCONCEPTIONS — watch for these and address them directly if the student shows signs:')
    for (const mc of orderedMisconceptions) {
      const priority = mc.localKey !== null && activeMcIds.includes(mc.localKey) ? ' [ACTIVE — repair first]' : ''
      lines.push(`\n${mc.localKey ?? mc.title}${priority}`)
      lines.push(mc.content)
    }
  }

  if (masteryProbes.length > 0) {
    lines.push('\nMASTERY PROBES — use these to verify understanding before advancing:')
    for (const mp of masteryProbes) lines.push(`\n${mp.content}`)
  }

  if (adaptiveRules.length > 0) {
    lines.push('\nADAPTIVE GUIDANCE')
    for (const ar of adaptiveRules) lines.push(ar.content)
  }

  if (sessionFlow) {
    lines.push('\nSESSION FLOW (advisory pacing guide)')
    lines.push(sessionFlow.content)
  }

  lines.push('\nUse this package context to teach accurately. Do not reference "the package" or these section labels directly to the student.')

  return {
    conceptId: pkg.manifest.conceptId,
    source: 'educational-package',
    packageId: pkg.manifest.packageId,
    packageHash: pkg.manifest.contentHash,
    block: lines.join('\n'),
    coreExplanation,
    workedExamples,
    misconceptions: orderedMisconceptions,
    masteryProbes,
    sessionFlow,
    adaptiveRules,
    learningObjectives,
    prerequisites: getPrerequisites(pkg),
  }
}
