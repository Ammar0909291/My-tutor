/**
 * Visual target resolution — "which concept are we drawing?"
 *
 * THE EXCURSION RULE: a concept the learner explicitly named ALWAYS outranks
 * the concept of the lesson they happen to be sitting in. A learner in a
 * Calorimetry lesson who types "teach me vectors with a diagram" gets a VECTOR
 * figure, not a calorimetry figure and not a text apology.
 *
 * This promotes `resolveConceptMatches()` — which until now only ran in the
 * Brain's shadow runtime, where its answer was logged and discarded — into the
 * authority for visual targeting. It is deterministic, has its own
 * specificity floor against false positives on one-word titles, and reads the
 * canonical KGs through the existing adapters.
 */

import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { resolveConceptMatches } from '@/lib/teaching/concept/conceptIndex'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import type { ConceptIndexEntry } from '@/lib/teaching/concept/conceptUnderstanding'
import type { ArchetypeContext } from './archetypes'

/** Minimum confidence before a learner-named concept may override the lesson. */
const EXCURSION_CONFIDENCE_FLOOR = 0.6

export interface VisualTarget extends ArchetypeContext {
  /** True when the learner named a concept other than the lesson's. */
  excursion: boolean
  /** `learner-request` | `lesson-concept` — logged for auditability. */
  origin: 'learner-request' | 'lesson-concept'
}

// The index is derived from static in-memory KG data, so building it once per
// process is safe and keeps target resolution in the microsecond range.
let cachedIndex: readonly ConceptIndexEntry[] | null = null
function conceptIndex(): readonly ConceptIndexEntry[] {
  if (!cachedIndex) cachedIndex = buildConceptIndexFromKnowledgeGraph()
  return cachedIndex
}

/** Test seam — lets a test reset memoized KG state between cases. */
export function __resetConceptIndexCache(): void {
  cachedIndex = null
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
  let requested: string | null = null
  try {
    const matches = resolveConceptMatches(message ?? '', conceptIndex(), preferredSubject ?? null)
    const best = matches.find((m) => m.confidence >= EXCURSION_CONFIDENCE_FLOOR) ?? null
    requested = best?.conceptId ?? null
  } catch {
    requested = null      // resolution failure must never break the turn
  }

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
