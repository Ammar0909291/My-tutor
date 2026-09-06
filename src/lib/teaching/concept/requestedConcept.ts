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
import { DISCOURSE_NOUNS } from '@/lib/teaching/visual/requestedTopic'
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
 * DISCOURSE DEIXIS — the Phase-6 P0, and the third filter this chain was
 * missing.
 *
 * ── THE DEFECT, observed live in production ────────────────────────────────
 * A learner in a CHEMISTRY lesson typed "explain the main idea please". The
 * tutor replied with the English reading-comprehension method, attached
 * `eng.reading.main-idea-and-details`'s figure, and abandoned chemistry.
 * Identical in physics. Measured across 30 ordinary discourse phrases x 3
 * lessons: 15/90 false positives, 10/90 CROSS-SUBJECT.
 *
 * ── WHY THE TWO EXISTING FILTERS CANNOT CATCH IT (traced, not assumed) ─────
 *   "explain the main idea please" -> matchedText "Main Idea", TITLE_COMPONENT,
 *      confidence 0.80. `isMediumUsage` handles only single-word VISUAL medium
 *      nouns; `isIncidentalWord` returns false immediately for any multi-word
 *      title ("multi-word titles are specific").
 *   "what is the point of this?"   -> matchedText "Point", EXACT_TITLE, 0.95.
 *      `isIncidentalWord` DOES look at it, finds "what" inside its 3-token
 *      window, and concludes the noun is GOVERNED, i.e. a genuine topic.
 *
 * That governance rule is correct for real topics ("what is a vector") and
 * exactly wrong for discourse nouns, because "what is the point of this?" uses
 * the same grammar to mean something entirely different. Neither filter asks
 * the one question that separates them: IS THE MATCHED TEXT A SUBJECT, OR IS IT
 * THE VOCABULARY OF TALKING ABOUT A LESSON?
 *
 * ── THE RULE ───────────────────────────────────────────────────────────────
 * A match whose matched text is made ENTIRELY of discourse vocabulary names
 * nothing. It is deixis — it points at whatever is already being taught — so
 * the honest answer is null, which leaves the lesson exactly where it is and
 * lets the tutor answer in context. That is the same "an honest 'I could not
 * name it' rather than a guess" stance the rest of this module already takes.
 *
 * `DISCOURSE_NOUNS` is IMPORTED, not redefined: it is the same list
 * `namedTopicUnknownTo` uses for the unresolved-topic path, and the P0 was
 * reachable through BOTH paths precisely because they disagreed about what
 * counts as naming a topic. One list, both paths, no third mechanism.
 *
 * ── MEASURED COST ──────────────────────────────────────────────────────────
 * Across all 1,775 KG concepts in all six subjects, exactly ONE has a title
 * made entirely of discourse vocabulary: `math.geom.point "Point"`. So a bare
 * "teach me point" no longer resolves. That is an accepted, measured trade —
 * one out-of-scope concept against a defect that silently switches the taught
 * subject — and "points and lines", "point of view", "boiling point",
 * "decimal point" are all unaffected, because one real word is enough.
 */
function isDiscourseOnlyMatch(matchedText: string): boolean {
  const words = tokens(matchedText)
  if (words.length === 0) return false
  return words.every((w) => DISCOURSE_NOUNS.has(w))
}

/**
 * E3 · A REQUEST GOVERNS ITS OWN CLAUSE, AND ONLY ITS OWN CLAUSE.
 *
 * ── THE DEFECT, reproduced offline from a production transcript ─────────────
 * Physics lesson `phys.wave.beats`, real account, 2026-09-05. A weak-English
 * learner typed:
 *
 *   "i dont know sir. that is what i am asking you. please dont ask me
 *    question, please teach me why loud and soft happens"
 *                    ^^^^^^                        ^^^^^
 *                    matched here                  requested here
 *
 * and the tutor switched to teaching `eng.speaking.asking-and-answering-
 * questions`. The concept the resolver returned was named in a DIFFERENT
 * CLAUSE from the one the request verb governs: "teach me" governs "why loud
 * and soft happens", which names no concept at all. "Asking" is a report of
 * what the learner is doing, not a topic they asked for.
 *
 * ── WHY THIS IS NOT ANOTHER WORD LIST ──────────────────────────────────────
 * Five lexical discriminators for this defect family have now been measured
 * and REJECTED — three recorded in docs/architecture/WRONG_CONCEPT_RETRIEVAL.md,
 * plus two more measured during the 2026-09-06 investigation (a deictic
 * complement rule wrongly blocked 8 of 10 genuine requests; a definite-
 * determiner rule wrongly blocked 3 of 11, including "teach me the
 * derivative"). This rule is POSITIONAL: it asks where the match sits relative
 * to the request, and reads no vocabulary at all.
 *
 * ── SCOPE, deliberately narrow ─────────────────────────────────────────────
 * It applies ONLY when the message contains an explicit request phrase, i.e.
 * only when the request is what would justify moving the teaching target. A
 * message with no request phrase ("i dont understand photosynthesis", "i dont
 * know enough about the mole concept") is untouched, which is what keeps every
 * knowledge-gap path working.
 *
 * The DEICTIC-CLAUSE EXEMPTION matters as much as the rule. "photosynthesis,
 * can you explain it" names its topic BEFORE the request and the request's own
 * clause names nothing but "it". Suppressing that would be a false positive of
 * exactly the kind this file keeps measuring and rejecting, so when the
 * governed clause carries no content word the rule stands down and the earlier
 * mention is honoured.
 *
 * ── MEASURED ───────────────────────────────────────────────────────────────
 * Blocks the production utterance above and its sibling phrasing. Wrongly
 * blocks 0 of 11 genuine requests measured (photosynthesis, mole concept,
 * entropy, vectors, derivative, apoptosis, mitochondria, "teach me the
 * derivative", "can you explain the mitochondria", "what is a derivative",
 * "explain photosynthesis to me please"). Pinned by F7.
 *
 * Token-based, using the SAME tokenizer as the matcher. A raw substring search
 * was written first and rejected: matchedText comes from a KG TITLE, so
 * "Newton's Second Law" would not be found inside "teach me newtons second
 * law" and a genuine request would have been suppressed by punctuation.
 */
function matchPrecedesItsRequest(message: string, matchedText: string): boolean {
  const request = matchTopicRequest(message ?? '')
  if (!request) return false                    // no request: rule inapplicable

  const needle = tokens(matchedText)
  if (needle.length === 0) return false

  // Where the governed clause begins, counted in TOKENS so punctuation and
  // spelling folds cannot shift the boundary.
  const governedFrom = tokens((message ?? '').slice(0, request.end)).length
  const words = tokens(message ?? '')

  // Does the governed clause name anything at all? If every word after the
  // request is discourse or deixis, the request points at what is already
  // being taught and cannot be used to reject an earlier, genuine mention.
  const governed = words.slice(governedFrom)
  const namesSomething = governed.some(
    (w) => !DISCOURSE_NOUNS.has(w) && !HEAD_STOP.has(w) && !TEACHING_CUE.has(w),
  )
  if (!namesSomething) return false

  for (let i = 0; i + needle.length <= words.length; i++) {
    let hit = true
    for (let j = 0; j < needle.length; j++) {
      if (words[i + j] !== needle[j]) { hit = false; break }
    }
    // An occurrence at or after the request's end IS inside the governed
    // clause — one such occurrence is enough to keep the match.
    if (hit && i >= governedFrom) return false
  }
  return true                                   // every occurrence precedes it
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

/**
 * A HYPHENATED COMPOUND IS ONE WORD — the defect this closes.
 *
 * Production, physics lesson "Refraction and Snell's Law":
 *   learner : "can you draw diagram of ray bending please"
 *   resolved: phys.mod.x-rays — "X-Rays and Their Properties"
 * The learner asked to see light bending and the engine opened an X-RAY
 * excursion and drew an X-ray figure. Because an open excursion freezes the
 * mastery ladder and blocks every authored probe, the lesson also stopped
 * being assessable — ten turns, zero questions, the phase never moved.
 *
 * Cause: this function replaced EVERY non-alphanumeric with a space and then
 * stripped trailing plurals, so
 *
 *   "X-Rays and Their Properties"          -> "x ray and their propertie"
 *   "Nature of Light: Ray and Wave Models" -> "nature of light  ray and wave model"
 *
 * The first string contains a standalone word "ray" that the TITLE DOES NOT
 * CONTAIN — it was manufactured by splitting the compound. `subjectLocalReading`
 * then takes the SHORTEST qualifying title, and the manufactured match (25
 * chars) beat the genuine one (35). The selector was never the problem; it was
 * offered a candidate it should never have seen.
 *
 * Splitting on the hyphen also matches the NEGATION of a word: bare "ideal"
 * currently reads `chem.sol.activity`, "Activity and Non-ideal Solutions".
 *
 * SWAPPING IN THE SHARED TOKENIZER IS NOT THE FIX, and was measured before
 * this was written: `normalizeToTokens('X-Rays and Their Properties')` is
 * `[x, ray, and, their, property]` — it strips hyphens to spaces and
 * singularises exactly as this function does, so it manufactures the same
 * token. The missing rule is hyphen INTEGRITY, which neither normaliser had.
 *
 * So: an ASCII hyphen joining two alphanumerics is ELIDED (x-rays -> xrays)
 * before the existing punctuation rule runs. Everything else here is
 * unchanged. Exposure: 92 of the 1,775 canonical titles carry an intra-word
 * hyphen (NP-Completeness, Cauchy-Riemann, Letter-Sound Correspondence,
 * Subject-Verb Agreement, ...), and each was a latent instance of the same
 * defect.
 *
 * Deliberately ASCII-only. Two chemistry titles use an EN-dash between words
 * ("Acid–Base Theories", "Acid–Base Titrations"); there the dash joins two
 * independent words rather than forming one, and eliding it would stop bare
 * "base" reading those titles — an unmeasured change, and not this defect.
 * The lookahead (rather than consuming the following character) is what makes
 * a doubly-hyphenated compound collapse in one pass.
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/([a-z0-9])-(?=[a-z0-9])/g, '$1')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/s\b/g, '')
    .trim()
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
 * The phrase a title is ABOUT — its leading conjunct.
 *
 * "Temperature and Thermal Equilibrium" is about TEMPERATURE. "Viruses,
 * Viroids and Lichens" is about VIRUSES. The trailing conjuncts are things
 * the concept also covers, not what it is named for. This is the same
 * leading-conjunct reading `resolveNamedTopicHead` already uses; it is
 * factored out here so both callers cannot drift apart about what a title
 * names.
 */
function leadingConjunct(title: string): string {
  const head = titleHead(title) ?? title
  return head.split(/\s+(?:and|or)\s+/i)[0] ?? head
}

// Every phrase that some concept is ABOUT, built once from the same index the
// matcher uses. Memoized alongside `cachedIndex` and cleared with it.
let cachedHeadNamed: ReadonlySet<string> | null = null
function headNamedPhrases(): ReadonlySet<string> {
  if (!cachedHeadNamed) {
    const out = new Set<string>()
    for (const entry of conceptIndex()) {
      const key = tokens(leadingConjunct(entry.title)).join(' ')
      if (key) out.add(key)
    }
    cachedHeadNamed = out
  }
  return cachedHeadNamed
}

/**
 * E2 · THE LESSON'S OWN VOCABULARY IS NOT A TRIP AWAY FROM THE LESSON.
 *
 * ── THE DEFECT, reproduced offline from a production transcript ─────────────
 * Physics lesson `phys.therm.zeroth-law` ("Zeroth Law of Thermodynamics"),
 * real account, 2026-09-05. The learner's FIRST message of the lesson — the
 * most ordinary opening a beginner can make — was:
 *
 *   "sir i dont understand what is thermal equilibrium meaning.
 *    my english is weak please explain simple"
 *
 * That resolved to `phys.therm.temperature`, a listed prerequisite, and opened
 * a knowledge-gap detour. Production telemetry: turnsHeld 6, turnsBlocked 8,
 * closed only by R2's turn limit. While it ran, `notExcursion` blocked every
 * authored probe and the ladder sat at OBSERVE with check 0 / practice 0 while
 * the learner answered four questions correctly.
 *
 * The lesson's own KG description is, verbatim:
 *   "If two systems are each in thermal equilibrium with a third, they are in
 *    thermal equilibrium with each other."
 * The learner asked about the lesson's DEFINING TERM. The resolver held that
 * text and never read it — `isLessonTopicRestated` compares the matched text
 * against the lesson's TITLE alone, and "Zeroth Law of Thermodynamics" does
 * not contain the words "thermal equilibrium".
 *
 * ── THE THREE CONDITIONS, AND WHY EACH IS LOAD-BEARING ─────────────────────
 * A blanket "the phrase is in the lesson description" rule was measured first
 * and REJECTED: 397 corpus collisions, suppressing genuine prerequisite
 * detours like "i dont understand photosynthesis" inside a plant-respiration
 * lesson, whose description names photosynthesis outright. All three
 * conditions together are what make this narrow enough to be safe.
 *
 *   1. NON-HEAD COMPONENT. The phrase must be a trailing conjunct of the
 *      candidate's title, not what the candidate is named for. "Photosynthesis"
 *      IS the head of `bio.plant.photosynthesis`, so that request is untouched.
 *
 *   2. NO CONCEPT IS HEAD-NAMED BY THE PHRASE. If any concept in any subject
 *      is ABOUT this phrase, the learner named a real curriculum topic and may
 *      travel to it. This single condition is what preserves every legitimate
 *      request measured: photosynthesis, mole concept, mitochondria, benzene,
 *      eigenvalues, entropy, apoptosis. It also preserves the CROSS-SUBJECT
 *      contract — "teach me the mole concept" from a physics lesson still
 *      reaches chemistry, because `chem.found.mole-concept` is head-named.
 *      When nothing is head-named by it, the phrase is VOCABULARY rather than
 *      a topic: no lesson exists to send the learner to.
 *
 *   3. THE CURRENT LESSON'S OWN DESCRIPTION USES IT. This is the positive
 *      evidence that the lesson can answer the question where it stands.
 *      Without it the rule would be a claim about the phrase in general; with
 *      it, the claim is only ever "THIS lesson already covers this term".
 *
 * A fourth case is deliberately left to its existing owner: when the LESSON'S
 * TITLE contains the phrase, `isLessonTopicRestated` already handles it, so
 * this rule steps aside rather than duplicating that judgement.
 *
 * ── MEASURED, corpus-wide over all 1,775 concepts in six subjects ───────────
 * 175 (lesson, phrase, candidate) triples satisfy all four conditions — 60
 * cross-subject, 115 same-subject. Reading them, the overwhelming majority are
 * resolutions that are WRONG TODAY and are corrected by suppression:
 *   "resolution" in a Scope-and-Namespaces / Hashing / DNS / Plot-Structure
 *      lesson -> `phys.meas.vector-addition` ("Vector Addition and Resolution")
 *   "interior" in Parallel Lines / Polygon Angle Sum / Triangle Angle Sum
 *      -> `math.top.interior-closure` (point-set topology)
 *   "closure" in Vector Space / Group Theory / Binary Operation -> the same
 *      topology concept, which is a different closure entirely
 *   "range"  in a Python loops lesson -> `math.func.domain-range`
 *   "beta"   in Signal Transduction -> `phys.mod.radioactivity`
 *   "surroundings" in an English Interjections lesson -> `chem.thermo.system`
 * The remainder are same-subject terms the lesson demonstrably explains
 * (eigenvectors during Diagonalization, rate of change during Derivative
 * (Definition), pH during Buffer Solutions), which is exactly the behaviour
 * this rule is for: answer it here rather than pausing the lesson.
 *
 * Returning null does not silence the tutor. It leaves the teaching target on
 * the lesson, and the lesson's own material is what the term is explained
 * from — the same "an honest 'I could not name it' rather than a guess" stance
 * the rest of this module takes.
 */
function lessonOwnsTheTerm(
  matchedText: string,
  candidateTitle: string,
  lessonNodeTitle: string,
  lessonDescription: string,
): boolean {
  const phrase = tokens(matchedText).join(' ')
  if (!phrase) return false
  // 1. the phrase is not what the candidate is named for
  if (phrase === tokens(leadingConjunct(candidateTitle)).join(' ')) return false
  // 2. no concept anywhere is ABOUT this phrase
  if (headNamedPhrases().has(phrase)) return false
  // 4. the lesson's TITLE already covers it -> isLessonTopicRestated's case
  if (` ${tokens(lessonNodeTitle).join(' ')} `.includes(` ${phrase} `)) return false
  // 3. the lesson's own definition uses the term
  return ` ${tokens(lessonDescription).join(' ')} `.includes(` ${phrase} `)
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
  cachedHeadNamed = null
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
  // THE SAME DISCOURSE RULE AS THE MAIN CHAIN, and the reason it must be
  // repeated here rather than only in the filter above. This fallback runs
  // precisely WHEN the main chain found nothing, so filtering a discourse
  // match out of `viable` only hands the same phrase to this function instead:
  // "can you explain the main idea" tokenizes to exactly "main idea", which IS
  // the head of "Main Idea and Supporting Details". Measured — it was the one
  // case still resolving after the filter above was added.
  if (named.every((t) => DISCOURSE_NOUNS.has(t))) return null
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
        !isIncidentalWord(message ?? '', m.matchedText) &&
        // PHASE 6 P0: "the main idea", "the point" — deixis, not a subject.
        // Sits alongside the other two "is this really a topic?" filters
        // rather than anywhere else, so all three are read together.
        !isDiscourseOnlyMatch(m.matchedText) &&
        // E3: named in a different clause from the request that would justify
        // moving the teaching target. The fourth member of the same family,
        // and the only one that reads position rather than vocabulary.
        !matchPrecedesItsRequest(message ?? '', m.matchedText),
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
    const lessonNode = lessonConceptId ? getKGNode(lessonConceptId) : null
    if (
      requested &&
      lessonConceptId &&
      requested !== lessonConceptId &&
      best &&
      isLessonTopicRestated(best.matchedText, lessonNode?.title ?? null)
    ) {
      requested = null
    }

    // E2: the learner asked about a term the lesson's own definition already
    // uses, and no concept in the curriculum is named for that term. Answer it
    // here. Tested against the concept that would ACTUALLY be returned, not
    // against `best`, because `subjectLocalReading` above may have replaced it.
    if (requested && lessonConceptId && requested !== lessonConceptId && best && lessonNode) {
      const candidateTitle = getKGNode(requested)?.title ?? null
      const lessonDescription = lessonNode.description ?? null
      if (
        candidateTitle &&
        lessonDescription &&
        lessonOwnsTheTerm(best.matchedText, candidateTitle, lessonNode.title, lessonDescription)
      ) {
        requested = null
      }
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
