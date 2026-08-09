/**
 * "Which concept did the learner explicitly name this turn?" — ONE authority.
 *
 * This logic used to live inside `visual/resolveVisualTarget.ts`, where it was
 * reachable only by the visualization layer. That was the structural reason an
 * off-lesson question could not become a teaching excursion: the only component
 * that knew the learner had named another concept was the one component that is
 * not allowed to own lesson lifecycle.
 *
 * It now lives in the concept layer and has two consumers:
 *
 *   • the Teaching Engine's excursion lifecycle (`teaching/excursion.ts`)
 *   • the visual target resolver (`visual/resolveVisualTarget.ts`)
 *
 * Both therefore see the SAME answer by construction — the figure can never
 * depict a concept the teaching layer did not agree the learner asked for.
 *
 * Deterministic, index-only, no LLM, no network, no database. Every rule below
 * is a filter that was already here before the move; nothing was loosened.
 */

import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { resolveConceptMatches } from './conceptIndex'
import { buildConceptIndexFromKnowledgeGraph } from './conceptIndexSource'
import { VISUAL_MEDIUM_NOUNS } from '@/lib/teaching/masteryGate'
import type { ConceptIndexEntry } from './conceptUnderstanding'

/** Minimum confidence before a learner-named concept may override the lesson. */
export const EXCURSION_CONFIDENCE_FLOOR = 0.6

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

/**
 * INCIDENTAL VOCABULARY — the defect this closes.
 *
 * Every single-word KG title is an EXACT_TITLE match at confidence 0.95, which
 * outranks the longer, correct, same-subject match. Measured against the live
 * KGs, in a physics lesson:
 *
 *   "free-body diagram of a block on a rough inclined PLANE" -> math.geom.plane
 *        (0.95) beat phys.mech.free-body-diagram (0.85) — the learner asked for
 *        an FBD and the resolver went on a geometry excursion.
 *   "light refracts through a convex lens using RAY diagrams" -> math.geom.ray
 *   "how REFLECTION works"                                    -> math.geom.reflection
 *        (the geometric transformation, not the optical phenomenon)
 *
 * In each case the word is incidental — it names a thing inside the sentence,
 * not the topic being requested. The distinction is the same one isMediumUsage
 * already draws: a bare one-word title counts as a topic only when a teaching
 * cue governs it, or when it IS the whole request ("vectors").
 */
function isIncidentalWord(message: string, matchedText: string): boolean {
  const matched = tokens(matchedText)
  if (matched.length !== 1) return false        // multi-word titles are specific
  const noun = matched[0]
  const words = tokens(message)
  // "vectors" / "vectors please" — the request IS the word.
  if (words.length <= 2) return false
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== noun && !words[i].startsWith(noun)) continue
    for (let back = 1; back <= CUE_WINDOW && i - back >= 0; back++) {
      if (REQUEST_CUE.has(words[i - back])) return false   // governed → a topic
    }
  }
  return true
}

/**
 * Topic governance for the incidental rule. Wider than TEACHING_CUE because a
 * request verb governs a topic just as a teaching verb does — "show me VECTOR
 * graph" asks for vectors. It stays separate from TEACHING_CUE so that
 * isMediumUsage is unaffected: "show me a GRAPH" must remain a medium request,
 * not a request for graph theory.
 */
const REQUEST_CUE = new Set([
  ...TEACHING_CUE,
  'show', 'draw', 'illustrate', 'visualize', 'visualise', 'demonstrate', 'see',
])

/** The canonical KG id prefix a concept belongs to (`phys`, `math`, …). */
export function idPrefix(conceptId: string): string {
  return conceptId.split('.')[0] ?? ''
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').replace(/s\b/g, '').trim()
}

/**
 * Is the matched concept simply the lesson's own topic under a shorter name?
 * "Vector" inside a "Scalars and Vectors" lesson is not an excursion — it is
 * the lesson, and drawing a different subject's node instead loses the lesson's
 * own registry binding.
 */
function isLessonTopicRestated(matchedTitle: string, lessonTitle: string | null): boolean {
  if (!lessonTitle) return false
  const a = normalizeTitle(matchedTitle)
  const b = normalizeTitle(lessonTitle)
  if (!a || !b) return false
  return b.includes(a) || a.includes(b)
}

/**
 * SUBJECT-LOCAL READING — the defect this closes.
 *
 * Production, 2026-08-08, lesson "Dimensional Analysis" (physics):
 *   learner: "Show reflection using a ray diagram"
 *   rendered: the "Geometry Shapes" card (triangle, rectangle, circle)
 *   tutor:   "Notice in the geometry shapes figure on your screen … a ray of
 *             light coming in (the incident ray) hits the surface"
 * — a figure with no ray, no surface and no normal, described as if it had all
 * three.
 *
 * Cause: "Reflection" is an EXACT_TITLE match for math.geom.reflection (the
 * geometric transformation) at 0.95, and the matcher never surfaces
 * phys.opt.reflection, whose title is the longer "Reflection and Laws of
 * Reflection". Preferring a same-subject CANDIDATE cannot help when the
 * subject's own concept is not a candidate at all.
 *
 * So when the winning match comes from another subject, look the same word up
 * inside the lesson's subject directly: a physics learner who says "reflection"
 * means optical reflection. Deterministic, index-only, no LLM. Returns null
 * when the subject has no such concept, leaving the cross-subject excursion
 * intact — "explain photosynthesis" from a physics lesson still reaches biology.
 */
function subjectLocalReading(
  matchedText: string,
  lessonPrefix: string | null,
  index: readonly ConceptIndexEntry[],
): string | null {
  if (!lessonPrefix) return null
  const word = normalizeTitle(matchedText)
  if (!word) return null

  let best: { conceptId: string; length: number } | null = null
  for (const entry of index) {
    if (idPrefix(entry.conceptId) !== lessonPrefix) continue
    const title = normalizeTitle(entry.title)
    // Whole-word containment only: "Reflection and Laws of Reflection"
    // contains "reflection"; "Refraction" does not contain it at all.
    if (!new RegExp(`\\b${escapeRegex(word)}\\b`).test(title)) continue
    // The shortest qualifying title is the most on-topic one — a longer title
    // mentions the word incidentally alongside other ideas.
    if (!best || title.length < best.length) best = { conceptId: entry.conceptId, length: title.length }
  }
  return best?.conceptId ?? null
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// The index is derived from static in-memory KG data, so building it once per
// process is safe and keeps resolution in the microsecond range.
let cachedIndex: readonly ConceptIndexEntry[] | null = null
export function conceptIndex(): readonly ConceptIndexEntry[] {
  if (!cachedIndex) cachedIndex = buildConceptIndexFromKnowledgeGraph()
  return cachedIndex
}

/** Test seam — lets a test reset memoized KG state between cases. */
export function __resetConceptIndexCache(): void {
  cachedIndex = null
}

/**
 * The concept the learner EXPLICITLY named this turn, or null.
 *
 * Null is the common and correct answer: most turns are answers, follow-ups
 * and corrections, and none of those name a new concept. Never throws —
 * resolution failure degrades to null rather than breaking the turn.
 */
export function resolveRequestedConceptId(
  message: string,
  lessonConceptId: string | null,
  preferredSubject?: string | null,
): string | null {
  try {
    const matches = resolveConceptMatches(message ?? '', conceptIndex(), preferredSubject ?? null)
    // Drop medium-word and incidental-vocabulary matches BEFORE picking the
    // best one, so a genuine concept sitting behind them still wins: "show me
    // vector graph" ranks {Graph, Graph, Vector} and must resolve to Vector;
    // "free-body diagram … inclined plane" ranks {Plane, Free Body Diagrams}
    // and must resolve to Free Body Diagrams.
    const viable = matches.filter(
      (m) =>
        m.confidence >= EXCURSION_CONFIDENCE_FLOOR &&
        !isMediumUsage(message ?? '', m.matchedText) &&
        !isIncidentalWord(message ?? '', m.matchedText),
    )
    // Same-subject candidates win over an equally-confident foreign one. The
    // lesson's own id prefix is the subject signal — it needs no mapping table
    // and cannot disagree with the KG.
    const lessonPrefix = lessonConceptId ? idPrefix(lessonConceptId) : null
    const best =
      (lessonPrefix ? viable.find((m) => idPrefix(m.conceptId) === lessonPrefix) : null) ??
      viable[0] ??
      null
    let requested: string | null = best?.conceptId ?? null

    // The winner belongs to another subject: check whether the learner's own
    // subject has a concept of that name before travelling to a foreign one.
    if (best && lessonPrefix && idPrefix(best.conceptId) !== lessonPrefix) {
      requested = subjectLocalReading(best.matchedText, lessonPrefix, conceptIndex()) ?? requested
    }

    // A shorter name for the lesson's own topic is the lesson, not a trip away
    // from it — keep the lesson concept and its registry binding.
    if (
      requested &&
      lessonConceptId &&
      requested !== lessonConceptId &&
      best &&
      isLessonTopicRestated(best.matchedText, getKGNode(lessonConceptId)?.title ?? null)
    ) {
      requested = null
    }
    return requested
  } catch {
    return null      // resolution failure must never break the turn
  }
}
