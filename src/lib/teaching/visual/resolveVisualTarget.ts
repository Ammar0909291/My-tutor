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
import { VISUAL_MEDIUM_NOUNS } from '@/lib/teaching/masteryGate'
import type { ConceptIndexEntry } from '@/lib/teaching/concept/conceptUnderstanding'
import type { ArchetypeContext } from './archetypes'

/** Minimum confidence before a learner-named concept may override the lesson. */
const EXCURSION_CONFIDENCE_FLOOR = 0.6

// ── Medium vs topic ───────────────────────────────────────────────────────
//
// RELEASE BLOCKER this fixes: "show me a graph" during a Kinematics lesson
// resolved to math.disc.graph — the graph-THEORY concept — and left the
// lesson on an excursion, with the visual contract asserting a vertices-and-
// edges figure was correct. The learner asked for a velocity-time graph.
//
// The words that name a visual MEDIUM are also, for a handful of them, real
// KG concept titles: "Graph", "Chart". The concept matcher cannot tell them
// apart because both readings are identical to it — verified: "show me a
// graph" and "teach me graph" both produce {math.disc.graph, EXACT_TITLE,
// confidence 0.95, 1 token}. No existing confidence score, method or token
// count separates them, so the distinction has to come from how the word is
// USED, not from the match.
//
// The rule below is that distinction and nothing more: a one-word title that
// is medium vocabulary counts as a concept ONLY when a teaching cue governs
// it. Everything else — including every multi-word title such as "Graph
// Coloring" or "Graph of a Function" — is untouched.
const MEDIUM_NOUNS: ReadonlySet<string> = new Set(VISUAL_MEDIUM_NOUNS)

/** Words that mark the following noun as a TOPIC being taught, not a medium. */
const TEACHING_CUE = new Set([
  'teach', 'teaches', 'teaching', 'taught',
  'learn', 'learning', 'study', 'studying', 'understand', 'understanding',
  'explain', 'explains', 'explaining', 'define', 'defines', 'definition',
  'what', 'whats', 'about', 'meaning',
])

/** How many preceding tokens may carry the cue ("what is a graph" needs 3). */
const CUE_WINDOW = 3

function tokens(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').split(/\s+/).filter(Boolean)
}

/**
 * Is this matched title a medium word being used AS a medium?
 *
 * True  → "show me a graph", "draw a graph", "graph it",
 *          "teach me vector with graph"   (the noun is the medium)
 * False → "teach me graph", "what is a graph", "explain graph theory"
 *          (a teaching cue governs the noun — it is the topic)
 * False → any multi-word title, and any title that is not medium vocabulary
 *          ("Trees", "Sets" are concepts, never media).
 */
export function isMediumUsage(message: string, matchedText: string): boolean {
  const matched = tokens(matchedText)
  if (matched.length !== 1) return false
  const noun = matched[0]
  if (!MEDIUM_NOUNS.has(noun)) return false

  const words = tokens(message)
  // Check EVERY occurrence: the noun is a topic if any occurrence is governed
  // by a teaching cue. "teach me vector with graph" has no such occurrence.
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== noun) continue
    for (let back = 1; back <= CUE_WINDOW && i - back >= 0; back++) {
      if (TEACHING_CUE.has(words[i - back])) return false
    }
  }
  return true
}

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
    // Drop medium-word matches BEFORE picking the best one, so a genuine
    // concept sitting behind them still wins: "show me vector graph" ranks
    // {Graph, Graph, Vector} and must resolve to Vector, not Graph.
    const best = matches.find(
      (m) => m.confidence >= EXCURSION_CONFIDENCE_FLOOR && !isMediumUsage(message ?? '', m.matchedText),
    ) ?? null
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
