/**
 * Visualization Intelligence Engine (VIE) — minimal integration point.
 *
 * Bridges the Visualization Knowledge Registry (VKR,
 * `visualKnowledgeRegistry.ts`) to the typed `VisualIntent` projection
 * (`visualIntent.ts`, §7.2). This is the one function a Tutor Brain call
 * site would invoke to turn "teach concept X" into a well-formed
 * `VisualIntent` using the registry's authored pedagogical knowledge,
 * rather than inventing purpose/form-class/claim per turn.
 *
 * Pure, deterministic, no I/O, no LLM calls, no rendering. Not wired into
 * any runtime call site (route.ts, teaching-engine, etc.) — additive only,
 * per the standing "no runtime refactoring" constraint on this iteration.
 */

import { lookupVisualKnowledge, type VisualizationPattern } from './visualKnowledgeRegistry'
import { validateVisualIntent, type VisualIntent } from './visualIntent'

/**
 * Construct a well-formed VisualIntent for a concept from the VKR's
 * authored knowledge. Returns null when the registry has no entry for the
 * concept (the caller falls back to its own existing default-purpose
 * logic — this function never fabricates knowledge the registry doesn't
 * carry) or when the concept's best pattern fails structural validation.
 *
 * `patternIndex` lets a caller pick a non-default pattern from the
 * concept's authored `patterns` list (e.g. a later-listed contrast pattern
 * instead of the first structure-reveal one); out-of-range values fall
 * back to index 0.
 */
export function buildVisualIntentFromRegistry(
  conceptId: string | null,
  patternIndex = 0,
): VisualIntent | null {
  const knowledge = lookupVisualKnowledge(conceptId)
  if (!knowledge) return null

  const pattern: VisualizationPattern | undefined =
    knowledge.patterns[patternIndex] ?? knowledge.patterns[0]
  if (!pattern) return null

  const intent: VisualIntent = {
    purpose: pattern.purpose,
    claim: pattern.claim,
    formClass: pattern.formClass,
    cpaRung: pattern.cpaRung,
    a11yRequirement: knowledge.accessibilityGuidance,
  }

  return validateVisualIntent(intent).length === 0 ? intent : null
}

/** True iff the VKR carries knowledge (and thus a constructible
 *  VisualIntent) for this concept. Lets a caller decide whether to invoke
 *  the registry path at all before calling the builder above. */
export function canBuildVisualIntent(conceptId: string | null): boolean {
  return lookupVisualKnowledge(conceptId) !== null
}
