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
import { resolveRequestedConceptId, conceptIndex } from '@/lib/teaching/concept/requestedConcept'
import { isTopicQuestion } from './session'
import { extractRequestedTopic, isMediumWord } from './requestedTopic'
import { contentWords } from './visualEngine'
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

/**
 * DID THE LEARNER ASK ABOUT SOMETHING THIS FIGURE IS NOT?
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * Step 1 above matches the learner's words against a KG index, and step 3 falls
 * back to the lesson when nothing matched. For a topic the curriculum has never
 * heard of, step 1 CANNOT match — so a learner in an SI-units lesson who types
 * "Explain Kubernetes pod scheduling" silently targets SI Units and
 * Measurement. Measured, exactly that: target `phys.meas.units`, origin
 * `lesson-concept`. With generation enabled the engine would draw a correct,
 * well-judged figure of SI units while the tutor answered about Kubernetes.
 *
 * That is the wrong-figure failure this engine exists to prevent, and it is the
 * one shape of it no downstream gate can catch: every check downstream asks
 * "is this a good figure of the concept it claims", and the answer is yes. The
 * claim itself is what is wrong.
 *
 * ── THE TEST, AND WHY IT IS THIS ONE ────────────────────────────────────────
 * Only on the FALLBACK — when the learner explicitly asked to be taught
 * something and the curriculum could not name it. Then: does the request share
 * ANY vocabulary with the topic that would be drawn?
 *
 *   "Explain Kubernetes pod scheduling"  vs  SI Units   -> nothing in common
 *   "Explain why SI units matter here"   vs  SI Units   -> "units"
 *   "what is this?"                      vs  anything   -> no content words
 *   "show me a diagram"                  vs  anything   -> no content words
 *
 * ZERO overlap is a deliberately weak bar to clear, because a false suppression
 * costs a learner a figure they could have had, and a false pass teaches them
 * the wrong picture. One shared content word is enough to believe the request
 * is about the lesson. And no keyword table decides it: the comparison is the
 * learner's own words against the concept's own words, so it works identically
 * for a topic nobody has enumerated.
 *
 * NOT a teaching decision. It does not open, close or redirect an excursion —
 * the Teaching Engine owns all of that and is untouched. It answers one visual
 * question: may this figure claim to be what the learner asked for.
 */

export function requestTargetsSomethingElse(message: string, target: VisualTarget): boolean {
  // Only the fallback can be wrong in this way. A concept the learner actually
  // named IS what they asked for, by construction.
  if (target.origin !== 'lesson-concept') return false
  // The WEAK family too — see QUESTION_FORM_RE. It governs only this
  // predicate, never the teaching target and never an eviction.
  if (!isTopicQuestion(message)) return false

  // THE TOPIC PHRASE, not the whole sentence.
  //
  // This used to scan every content word in the message, which meant a learner
  // who says anything about THEMSELVES was read as naming a topic. Measured in
  // the real app, on the opening turn of every lesson:
  //
  //     "I am a complete beginner. Please explain this topic to me."
  //        -> named {complete, beginner, topic} -> none is physics vocabulary
  //        -> suppressed, concept null, no figure possible
  //
  // `extractRequestedTopic` already answers "what did they name?" for the
  // grounding path — it takes what follows the request phrase and stops at the
  // end of the clause. Using it here makes ONE definition of a named topic
  // serve both, and deletes the second word list this module was keeping.
  // ONE content word is enough HERE. Measured across 40 fresh topics: the
  // commonest way a learner names a topic is with a single noun —
  // "What are isotopes?", "What is a titration?", "What are isomers?" — and
  // every one of them fell under the two-word floor, so this predicate said
  // "they named nothing", the lesson's own curated card was served, and the
  // tutor narrated it. 46 of the 62 figures a learner received were the
  // lesson's picture on somebody else's topic: a crystal lattice for
  // titration, a free-body diagram for the refraction of light — the latter
  // in answer to "Draw it for me."
  //
  // The two-word floor still governs everywhere else, because everywhere else
  // the cost is different: there it protects a figure the learner is already
  // reading. Here the only thing at stake is whether a NEW figure of the wrong
  // concept gets drawn, and this engine's whole stance is that no figure beats
  // a wrong one.
  const requested = extractRequestedTopic(message, 1, true)
  if (!requested) return false
  const named = [...requested.words]

  // A MEDIUM IS NOT A TOPIC. Dropping to one word means "show me a graph",
  // "draw a diagram", "can you show a picture" now name "graph" / "diagram" /
  // "picture" — words about the FORM of the answer, not its subject. Those
  // requests mean "draw what we are studying", so they must fall through to
  // the lesson rather than suppress it. `VISUAL_MEDIUM_NOUNS` is the list the
  // engine already keeps for exactly this distinction; there is no second one.
  if (named.every((w) => isMediumWord(w))) return false
  // POSITIVE EVIDENCE REQUIRED, and `extractRequestedTopic` already applies
  // it: a phrase with fewer than two content words is not a name, so it
  // returns null above and nothing is suppressed. "explain this again",
  // "explain it more simply" and "show me a diagram" all land there.

  const drawn = contentWords(`${target.title} ${target.description ?? ''}`, true)
  for (const word of named) if (drawn.has(word)) return false

  // IS THIS EVEN OFF-CURRICULUM?
  //
  // Everything above tests the request against ONE concept — the lesson's. That
  // is not the same question. Measured in a real six-turn session, "what is
  // energy exactly" inside an SI-units lesson and "what is an atom made of"
  // inside a Nature-of-Matter lesson both reached here: two topic-shaped words,
  // no overlap with the lesson's own text, suppressed. Both are ordinary
  // in-lesson physics and chemistry questions, and both lost their figure.
  //
  // The discriminator that was missing is the curriculum itself. "Energy" and
  // "atom" are concepts it teaches; "Kubernetes" is not a word it has ever
  // heard. A request built from vocabulary the curriculum knows is a question
  // about the subject being studied, even when the lesson's own concept does
  // not happen to use those words — and the lesson's figure is a defensible
  // neighbour for it. Only a request made entirely of words the curriculum has
  // never seen is genuinely somewhere else.
  // THE ESCAPE HATCH THAT USED TO SIT HERE, AND WHY IT IS GONE.
  //
  // It read: `return !subjectKnowsAnyOf(named, target.conceptId)` — i.e. a
  // request built from words the SUBJECT knows anywhere in its corpus was
  // treated as a question about the subject being studied, and the lesson's
  // figure was called "a defensible neighbour" for it.
  //
  // Measured across 40 fresh topics, that premise does not hold. "titration",
  // "electrolysis", "isotopes" and "light" are all chemistry/physics
  // vocabulary, so every one of them took this exit — and what the learner
  // then saw was an ionic-crystal lattice for a titration question and a
  // free-body diagram for the refraction of light. A neighbour is a concept
  // that helps explain the question; these were simply a different concept's
  // picture, narrated as if it belonged.
  //
  // What remains is the check above, which is the honest one: if any word the
  // learner named appears in the LESSON'S OWN title or description, the
  // lesson's figure is genuinely about what they asked and is kept. That is
  // what still protects "Explain why SI units matter here" in an SI-units
  // lesson, and "what is an atom made of" in a lesson whose description talks
  // about atoms. Nothing else earns the fallback.
  return true
}

/**
 * HAS THE LEARNER MOVED OFF THE TOPIC THE ON-SCREEN FIGURE DEPICTS?
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * Measured in the running app, in a real session, three turns in a row. A
 * kinetic-energy graph was on screen; the learner then asked about SI units:
 *
 *   "What are SI units and why do we need them?"
 *   → figure held: "Kinetic Energy as a Function of Velocity (m = 2 kg)"
 *   → tutor: "Look at the plotted curve on your screen: the mass of two
 *             kilograms uses the SI unit for mass…"
 *   → and by the third turn, about base units:
 *     "the mass of two kilograms and the units of speed on the axes are built
 *      directly from those fundamental base units."
 *
 * The axes are Velocity and Kinetic Energy. There is no mass on the screen.
 * The tutor is instructed to teach from the figure's own words, so a figure
 * held past its topic does not merely sit there being irrelevant — it is
 * narrated, confidently, into a description of something the learner is not
 * looking at.
 *
 * ── WHY CONTINUITY HELD IT ──────────────────────────────────────────────────
 * `decideContinuity` may move the screen to a different concept only when the
 * curriculum can NAME that concept. "SI units" does not clear the excursion
 * confidence floor (2 of the 4 words in "SI Units and Measurement"), so
 * `requestedConceptId` was null, the switch branch could not fire, and the turn
 * fell through to the catch-all hold that exists for follow-ups and answers.
 *
 * So the hold was reached by a request to be taught something else — the one
 * kind of turn it was never meant to cover. The engine's other guard against
 * this, `requestTargetsSomethingElse`, is skipped whenever a figure is already
 * on screen, deliberately, so that a side question cannot snatch away the
 * figure a learner is reading. That left nobody asking the question.
 *
 * ── THE TEST ────────────────────────────────────────────────────────────────
 * The same one its sibling uses, pointed at the figure instead of the lesson:
 * `extractRequestedTopic` says what the learner named — it needs two content
 * words, so "explain that again", "explain it more simply" and "show me a
 * diagram" name nothing and can never release a figure — and the named words
 * are compared against the on-screen figure's OWN words.
 *
 *   "What are SI units…"          vs Kinetic Energy   -> nothing shared -> release
 *   "What is kinetic energy?"     vs Kinetic Energy   -> shared         -> hold
 *   "What is field strength?"     vs Electric Field   -> shared         -> hold
 *   "Explain that again"          vs anything         -> named nothing  -> hold
 *
 * Releasing is not the same as replacing: the caller switches to whatever the
 * learner actually named, which is null in exactly this case, and a null target
 * draws NO figure. That is the intended outcome — this engine already treats an
 * honest empty screen as an ordinary success, and it is strictly better than
 * either the stale figure or a second unrelated one.
 */
export function requestLeavesActiveFigure(
  message: string,
  figureText: string,
  /**
   * The concept the on-screen figure belongs to. Optional, so every existing
   * caller and test is unchanged; supplied by resolveVisual, which holds the
   * live session. See ASKING TO SEE PART OF THE THING below for why it is
   * needed and what it costs.
   */
  figureConceptId?: string | null,
): boolean {
  const requested = extractRequestedTopic(message)
  if (!requested) return false

  const drawn = contentWords(figureText, true)
  // No words to compare against is not evidence of a topic change. Say no.
  if (drawn.size === 0) return false

  for (const word of requested.words) if (drawn.has(word)) return false

  // ── ASKING TO SEE PART OF THE THING IS NOT LEAVING IT ─────────────────────
  //
  // MEASURED live on phys.opt.mirrors, twice, in a struggling-learner session:
  //
  //   learner: "show me a picture of the rays"
  //   -> NO FIGURE, and the tutor answered "Imagine the three standard rays
  //      you'd trace for a concave mirror..." with an empty screen.
  //
  // The figure was a concave-mirror ray diagram — literally a picture of the
  // rays. The release fired because the words it compares against are the KG
  // node's title and description, and this concept's are
  //
  //   "Spherical Mirrors and Mirror Formula. The mirror formula 1/f = 1/v + 1/u
  //    relates focal length, image distance, and object distance..."
  //
  // one sentence, about the FORMULA. Nothing in it says rays, light, or
  // reflection, so a learner asking to see any of those was judged to have
  // changed the subject and the figure was released. "show me a picture of the
  // reflection" and "what is total internal reflection" failed the same way.
  //
  // The test is only ever as good as the words it is given, and a one-sentence
  // description is a thin corpus. So a second, wider source of evidence: the
  // vocabulary of the figure concept's own DOMAIN. A word its domain uses is
  // evidence the learner is still inside the topic the figure belongs to.
  //
  // DOMAIN, not subject, and that boundary is measured rather than assumed.
  // Subject-wide would hold the mirrors figure for "what is nuclear fission"
  // and "explain electric current" — both physics, neither this figure's
  // subject matter. Domain-wide releases both, and still releases every case
  // this rule was written for: "What are SI units...", "Explain Kubernetes pod
  // scheduling", "what is the periodic table".
  //
  // HONEST RESIDUE — the phrasing that started this is STILL released. "rays"
  // folds to "ray", and `contentWords` drops every word under four characters,
  // so "ray" is invisible to the vocabulary machinery on both sides. Reaching
  // it means changing that minimum for the whole visual engine — anchoring and
  // admission included — which is not justified by one phrasing. Recorded in
  // `visualRequestLeavesFigure.test.ts` as a failing-by-design case rather than
  // asserted away.
  if (figureConceptId && curriculumKnowsAnyOf([...requested.words], figureConceptId, 2)) {
    return false
  }

  return true
}

/**
 * The vocabulary of ONE subject — every content word in its concept titles.
 *
 * Per subject, not per curriculum, and that is the whole point. Measured: with
 * the test run against ALL subjects, "Explain Kubernetes pod scheduling" was
 * treated as in-curriculum because "scheduling" appears in the computer-science
 * graph, so the physics learner would have been shown an SI-units figure again.
 * A physics lesson is answered from physics vocabulary; a word the subject being
 * studied has never used is evidence the question left it.
 *
 * Keyed by the id prefix the KG already uses (phys, chem, math, bio, cs, eng),
 * so it needs no list of subjects and gains one automatically when the
 * curriculum does.
 */
const subjectVocabularies = new Map<string, Set<string>>()

/**
 * The vocabulary of a curriculum SLICE, named by how many id segments of
 * `conceptId` define it: 1 is the subject (`phys`), 2 is the domain
 * (`phys.opt`).
 *
 * One builder, two scopes, because two builders would eventually disagree
 * about what a word is — the same reason `contentWords` is exported and shared
 * rather than reimplemented per caller.
 */
function curriculumKnowsAnyOf(
  words: readonly string[],
  conceptId: string,
  depth: 1 | 2,
): boolean {
  const prefix = conceptId.split('.').slice(0, depth).join('.')
  let vocab = subjectVocabularies.get(prefix)
  if (!vocab) {
    vocab = new Set<string>()
    for (const entry of conceptIndex()) {
      if (entry.conceptId.split('.').slice(0, depth).join('.') !== prefix) continue
      for (const w of contentWords(entry.title, true)) vocab.add(w)
      for (const alias of entry.aliases ?? []) for (const w of contentWords(alias, true)) vocab.add(w)
    }
    subjectVocabularies.set(prefix, vocab)
  }
  for (const w of words) if (vocab.has(w)) return true
  return false
}

function subjectKnowsAnyOf(words: readonly string[], conceptId: string): boolean {
  return curriculumKnowsAnyOf(words, conceptId, 1)
}

/** Test seam — the vocabularies are derived from the KG and memoized with it. */
export function __resetSubjectVocabularies(): void {
  subjectVocabularies.clear()
}
