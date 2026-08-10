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
import { isExplicitTopicRequest } from './session'
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
  if (!isExplicitTopicRequest(message)) return false

  const named = namedTopicWords(message)
  // POSITIVE EVIDENCE REQUIRED. Silence is not a mismatch: "explain this
  // again", "explain it more simply", "show me a diagram" name no topic, and
  // suppressing those would take a figure away from the very turns that most
  // need one. Two surviving words is the bar because one is routinely an
  // adverb the discourse list has not seen — measured on real phrasings,
  // "simply", "properly", "slowly" all survive alone, and none of them is a
  // topic. Two unrelated content words in a row is a noun phrase.
  if (named.length < MIN_NAMED_TOPIC_WORDS) return false

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
  return !subjectKnowsAnyOf(named, target.conceptId)
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

function subjectKnowsAnyOf(words: readonly string[], conceptId: string): boolean {
  const prefix = conceptId.split('.')[0]
  let vocab = subjectVocabularies.get(prefix)
  if (!vocab) {
    vocab = new Set<string>()
    for (const entry of conceptIndex()) {
      if (entry.conceptId.split('.')[0] !== prefix) continue
      for (const w of contentWords(entry.title, true)) vocab.add(w)
      for (const alias of entry.aliases ?? []) for (const w of contentWords(alias, true)) vocab.add(w)
    }
    subjectVocabularies.set(prefix, vocab)
  }
  for (const w of words) if (vocab.has(w)) return true
  return false
}

/** Test seam — the vocabularies are derived from the KG and memoized with it. */
export function __resetSubjectVocabularies(): void {
  subjectVocabularies.clear()
}

/** How many topic-shaped words a request must carry before it names a topic. */
const MIN_NAMED_TOPIC_WORDS = 2

/**
 * ENGLISH DISCOURSE WORDS — words that are not a topic in any subject.
 *
 * This is deliberately a list about ENGLISH, not about subjects. It contains no
 * concept, no domain and no topic, so it does not grow when the curriculum
 * does, and it cannot become the keyword table that decides WHAT to draw — the
 * archetype-engine failure this codebase already made once. It only helps
 * answer whether the learner named anything at all.
 *
 * The engine's own stopwords cover generic FIGURE vocabulary; these cover
 * generic REQUEST vocabulary, which is a different set: a learner says "explain
 * it again more simply", and none of those five words is a subject.
 */
const DISCOURSE_WORDS = new Set([
  'explain', 'describe', 'tell', 'teach', 'demonstrate', 'illustrate', 'draw',
  'again', 'please', 'more', 'simply', 'simpler', 'simple', 'easier', 'easy',
  'slowly', 'properly', 'clearly', 'better', 'differently', 'another', 'other',
  'about', 'like', 'want', 'need', 'know', 'think', 'mean', 'means', 'meaning',
  'really', 'actually', 'just', 'still', 'also', 'thing', 'things', 'stuff',
  'part', 'parts', 'bit', 'little', 'much', 'many', 'some', 'any', 'these',
  'those', 'there', 'here', 'again', 'okay', 'thanks', 'thank', 'sorry',
  'help', 'give', 'make', 'take', 'come', 'goes', 'went', 'does', 'done',
  'cannot', 'dont', 'doesnt', 'didnt', 'wont', 'lets', 'would', 'could',
  'should', 'might', 'will', 'shall', 'been', 'being', 'said', 'says',
])

/** The topic-shaped words in a request: content words that are not discourse. */
function namedTopicWords(message: string): string[] {
  return [...contentWords(message)].filter((w) => !DISCOURSE_WORDS.has(w))
}
