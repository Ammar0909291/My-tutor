/**
 * Visual target resolution — "which concept are we drawing?"
 *
 * THE EXCURSION RULE: a concept the learner explicitly named ALWAYS outranks
 * the concept of the lesson they happen to be sitting in. A learner in a
 * Calorimetry lesson who types "teach me vectors with a diagram" gets a VECTOR
 * figure, not a calorimetry figure and not a text apology.
 *
 * The rules that decide WHICH concept the learner named — the confidence
 * floor, medium-vs-topic, incidental vocabulary, subject-local reading and the
 * lesson-topic-restated guard — moved to
 * `@/lib/teaching/concept/requestedConcept`, unchanged. They are shared with
 * the Teaching Engine's excursion lifecycle, so the figure can never depict a
 * concept the teaching layer did not agree the learner asked for. This module
 * keeps only the visual-side question: request first, else the lesson.
 */

import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import type { ArchetypeContext } from './archetypes'

export {
  isMediumUsage,
  __resetConceptIndexCache,
  EXCURSION_CONFIDENCE_FLOOR,
} from '@/lib/teaching/concept/requestedConcept'

export interface VisualTarget extends ArchetypeContext {
  /** True when the learner named a concept other than the lesson's. */
  excursion: boolean
  /** `learner-request` | `lesson-concept` — logged for auditability. */
  origin: 'learner-request' | 'lesson-concept'
}

function toContext(conceptId: string): ArchetypeContext | null {
  const node = getKGNode(conceptId)
  if (!node) return null
  return {
    conceptId,
    title: node.title,
    description: node.description ?? '',
    prerequisites: node.prerequisites ?? [],
    difficulty: node.difficulty,
  }
}

/**
 * Decide which concept the visual should depict.
 *
 * Returns null only when neither the learner nor the lesson yields a concept
 * that exists in a canonical KG — a genuinely off-curriculum question, which is
 * one of the few legitimate reasons to fall through to text.
 */
export function resolveVisualTarget(
  message: string,
  lessonConceptId: string | null,
  preferredSubject?: string | null,
): VisualTarget | null {
  // 1. What did the learner actually name?
  const requested = resolveRequestedConceptId(message, lessonConceptId, preferredSubject)

  // 2. The learner's own words win whenever they named something real.
  if (requested) {
    const ctx = toContext(requested)
    if (ctx) {
      return {
        ...ctx,
        excursion: requested !== lessonConceptId,
        origin: 'learner-request',
      }
    }
  }

  // 3. Otherwise draw the lesson's concept.
  if (lessonConceptId) {
    const ctx = toContext(lessonConceptId)
    if (ctx) return { ...ctx, excursion: false, origin: 'lesson-concept' }
  }

  return null
}
