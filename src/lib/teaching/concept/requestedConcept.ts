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
import { resolveConceptMatches, normalizeToTokens, titleHead } from './conceptIndex'
import { matchTopicRequest } from '@/lib/teaching/visual/session'
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

/**
 * ONE tokenizer, shared with the matcher.
 *
 * This used to be a second, simpler one: lowercase and strip punctuation, with
 * no spelling fold and no singularization. That made the FILTERS disagree with
 * the MATCHER about what a word is, and a disagreement here reads as a missing
 * concept. Measured:
 *
 *   "What is orbital hybridisation?"
 *     matcher : Hybridization, NORMALIZED_TITLE 0.85   (the fold worked)
 *     filter  : message words ["what","is","orbital","hybridisation"] — none
 *               equals or begins with "hybridization", so no governing cue was
 *               found, the match was judged INCIDENTAL and dropped
 *     result  : null → no excursion → the tutor answered about hybridisation
 *               while the lesson's ionic-crystal figure stayed on screen
 *
 * The American spelling resolved perfectly the whole time, which is exactly
 * how a defect like this stays invisible.
 */
function tokens(text: string): string[] {
  return normalizeToTokens(text)
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

/** Stop words that never carry a topic on their own. */
const HEAD_STOP = new Set(['a', 'an', 'the', 'this', 'that', 'these', 'those', 'it', 'exactly', 'actually', 'really', 'again'])

/**
 * THE NAMED TOPIC THE CORPUS-WIDE AMBIGUITY GUARD THREW AWAY.
 *
 * ── THE DEFECT, measured across 60 production turns ─────────────────────────
 * A learner asked "What is entropy?" and the resolver returned NULL, so the
 * Teaching Engine never learned that another concept had been named, never
 * opened an excursion, and the turn kept teaching Free Body Diagrams. The
 * learner asked three times, including "This makes no sense", and was answered
 * about forces each time. Same shape for orbital hybridisation against Ionic
 * Crystal Structures.
 *
 * The curriculum HAS these concepts — `phys.therm.entropy "Entropy and
 * Disorder"`, `chem.bond.hybridization "Hybridization"`. Nothing was missing
 * but the ability to name them.
 *
 * ── WHY THE NORMAL PATH CANNOT SEE THEM ─────────────────────────────────────
 * `deriveTitleComponents` admits a one-word conjunct of a compound title only
 * when that word appears in exactly ONE title in the WHOLE corpus (1,775
 * concepts, six subjects). "entropy" appears in "Entropy and Disorder" and in
 * "Statistical Definition of Entropy", so it is dropped — and the guard is
 * hardest on exactly the words a learner is most likely to ask about, because
 * an important idea is named in more titles. That precision rule is right for
 * the general matcher, which scans whole sentences for incidental mentions,
 * and wrong for the one case where the learner has explicitly said what they
 * want to be taught.
 *
 * ── THE RULE ────────────────────────────────────────────────────────────────
 * Runs ONLY when the normal path found nothing, and only on an explicit topic
 * request, so it can never override or weaken an existing match. It asks a
 * narrower question than the matcher does: is the phrase the learner named the
 * HEAD of some concept's title — what that concept is *about* — rather than a
 * word appearing somewhere inside it?
 *
 *   "entropy"      -> "Entropy and Disorder"              head match  ✓
 *                    "Statistical Definition of Entropy"  not the head ✗
 *   "hybridisation"-> "Hybridization"                     head match  ✓
 *
 * That single distinction resolves the ambiguity the corpus-wide count could
 * not: of the two entropy concepts, exactly one is *about* entropy plainly.
 * The learner's own subject wins first, and a phrase that is still ambiguous
 * after that returns null — an honest "I could not name it" rather than a
 * guess, which the off-curriculum path already handles correctly.
 */
function resolveNamedTopicHead(
  message: string,
  lessonPrefix: string | null,
  index: readonly ConceptIndexEntry[],
): string | null {
  const request = matchTopicRequest(message ?? '')
  if (!request) return null

  // What follows the request phrase, to the end of the clause — the same
  // "what did they name" shape the rest of the engine uses.
  const clause = (message ?? '').slice(request.end).split(/[?.!,;:]|\b(?:and|but|so|because|then)\b/i)[0] ?? ''
  const named = normalizeToTokens(clause).filter((t) => !HEAD_STOP.has(t))
  if (named.length === 0 || named.length > 4) return null
  const phrase = named.join(' ')

  const hits: ConceptIndexEntry[] = []
  for (const entry of index) {
    const head = titleHead(entry.title) ?? entry.title
    // ONLY a genuine conjunct splits a title, never a preposition.
    //
    // "Entropy and Disorder" is about entropy, so "Entropy" is a real name for
    // it. "Parts of a Circle" is about circles — its subject is the whole
    // phrase, and treating "Parts" as its name made the discourse word in
    // "can you explain that part again" resolve to a geometry concept and
    // hijack an open viscosity excursion. Measured; caught by
    // conceptExcursion.test.ts before this reached anything.
    //
    // The same rule keeps "Statistical Definition of Entropy" whole, which is
    // what makes the plain entropy concept the unambiguous winner.
    const leading = head.split(/\s+(?:and|or)\s+/i)[0] ?? head
    if (normalizeToTokens(leading).filter((t) => !HEAD_STOP.has(t)).join(' ') === phrase) hits.push(entry)
  }
  if (hits.length === 0) return null

  const local = lessonPrefix ? hits.filter((h) => idPrefix(h.conceptId) === lessonPrefix) : []
  const pool = local.length > 0 ? local : hits
  if (pool.length === 1) return pool[0].conceptId

  // Still ambiguous: prefer the plainest title — the concept the phrase names
  // outright over one that qualifies it. A genuine tie stays null.
  const shortest = Math.min(...pool.map((p) => normalizeToTokens(p.title).length))
  const plainest = pool.filter((p) => normalizeToTokens(p.title).length === shortest)
  return plainest.length === 1 ? plainest[0].conceptId : null
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

    // Nothing cleared the floor. Before giving up — and giving up is what
    // stopped the learner's question from ever becoming the teaching target —
    // ask whether they named a concept plainly enough to be its title's head.
    if (!requested) requested = resolveNamedTopicHead(message ?? '', lessonPrefix, conceptIndex())

    return requested
  } catch {
    return null      // resolution failure must never break the turn
  }
}
