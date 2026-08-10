/**
 * THE TOPIC THE LEARNER NAMED, AND THE WORDS TO DRAW IT FROM.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Target resolution matches a learner's words against a KG index. A topic the
 * curriculum has never heard of cannot match, so the engine either drew the
 * LESSON — a figure of something the learner did not ask about — or, once that
 * was stopped, drew nothing at all. Both are wrong for the same reason: the
 * engine had no way to say what "Kubernetes pod scheduling" IS.
 *
 * Two things are needed to draw any topic, and the curriculum was supplying
 * both for free: a NAME (identity, caching, provenance) and TEXT (something to
 * draw from and to be judged against). This module obtains both for a topic the
 * curriculum does not contain.
 *
 * ── WHERE THE TEXT COMES FROM, AND WHY IT IS ALLOWED TO ─────────────────────
 * From the LEARNER'S OWN WORDS: this turn's message, plus their earlier
 * messages in the same session that are about the same topic. Nothing else.
 *
 * Specifically NOT from the model. A description the generator wrote, or that
 * the tutor wrote a turn earlier, is not independent grounding — judging a
 * generated figure against generated prose asks a model whether it agrees with
 * itself, and it does. The learner's words are the one source that is both
 * about the topic they asked about and not produced by the thing being checked.
 *
 * ── WHAT THIS DOES AND DOES NOT GUARANTEE ───────────────────────────────────
 * It guarantees the figure is OF the topic the learner asked about, drawn from
 * what they said about it. It does NOT certify that what they said is true —
 * learners hold misconceptions, and a learner who describes something wrongly
 * must not have that drawn back at them as fact. That is the critic's job and
 * it is a separate one: `correctness` asks whether everything the figure
 * asserts is TRUE, not whether it matches the grounding. A figure that
 * faithfully depicts a learner's misconception is relevant and false, and the
 * critic rejects it on correctness.
 *
 * ── DECLINING IS A NORMAL OUTCOME ───────────────────────────────────────────
 * "Explain Kubernetes pod scheduling" is 33 characters and says nothing about
 * what pod scheduling IS. There is no honest figure to draw from it, so the
 * engine declines and the learner is taught in words. Manufacturing a
 * description to make generation possible is precisely the failure this module
 * exists to avoid.
 *
 * Pure and synchronous. No model, no network, no database, no KG.
 */

import { matchTopicRequest } from './session'
import { contentWords } from './visualEngine'
import { runtimeTopicIdentity, type TopicIdentity } from './topicIdentity'

/**
 * Connectives that can only ever sit BETWEEN the request phrase and the topic.
 * Trimmed from the front of a candidate title so "explain to me the difference
 * between X and Y" names the difference and not the word "to".
 *
 * A list about English, not about subjects: it cannot grow when the curriculum
 * does, and it never decides WHAT to draw.
 */
const LEADING_CONNECTIVES = new Set([
  'me', 'us', 'to', 'about', 'the', 'a', 'an', 'that', 'this', 'it', 'more',
  'again', 'please', 'briefly', 'exactly', 'basically', 'simply', 'how',
])

/** Where a named topic stops: the sentence does, or the learner's aside does. */
const TOPIC_TERMINATORS = /[.?!;:\n—]|\s-\s/

/** A title long enough to be a topic and short enough to be an identity. */
const MAX_TITLE_CHARS = 90

/**
 * Distinct content words a title must carry before it is a NAME rather than a
 * fragment. One word is routinely an adverb ("simply", "properly") that
 * survived the connective trim; two unrelated content words in sequence are a
 * noun phrase.
 */
const MIN_TITLE_WORDS = 2

/**
 * Content words the grounding must carry BEYOND the title itself.
 *
 * The character floor alone is not a substance test: "explain kubernetes pod
 * scheduling please I really want to know" clears 40 characters and says
 * nothing about pod scheduling. This asks for words that are not simply the
 * topic's own name repeated.
 */
const MIN_SUBSTANCE_WORDS = 3

/** How much learner text may be carried into a prompt and a grounding hash. */
const MAX_GROUNDING_CHARS = 1200

/** How far back through the learner's own turns to look. */
const MAX_PRIOR_MESSAGES = 12

/**
 * How much of two words must agree before they are the same topic word.
 *
 * Exact matching is too literal for the way people actually write: a learner
 * asks about "pod SCHEDULING" and then describes what the "SCHEDULER" does, and
 * the message that carries the real grounding is discarded for want of three
 * letters. Measured on that exact pair, which is why this exists.
 *
 * A shared prefix is a stemmer that needs no vocabulary, so it works the same
 * for a topic nobody has authored. Seven characters is long enough that
 * unrelated words do not collide — "measure" and "measles" would need eight —
 * and short enough to catch the endings people actually vary.
 */
const STEM_PREFIX = 7

/** Do these two words share a stem, or a plural, or nothing? */
function sameWord(a: string, b: string): boolean {
  if (a === b) return true
  const n = Math.min(a.length, b.length)
  return n >= STEM_PREFIX && a.slice(0, STEM_PREFIX) === b.slice(0, STEM_PREFIX)
}

/** Is this message about the named topic? */
function mentionsTopic(text: string, topic: RequestedTopic): boolean {
  const words = contentWords(text)
  for (const w of words) for (const t of topic.words) if (sameWord(w, t)) return true
  return false
}

export interface RequestedTopic {
  /** What the learner called it — the title, verbatim apart from trimming. */
  title: string
  /** Its content words, for matching their other messages about it. */
  words: Set<string>
}

/**
 * The topic named in an explicit request, or null when none was named.
 *
 * Deterministic and vocabulary-free: it takes what follows the request phrase
 * and stops at the end of the clause. It does not look anything up, so it works
 * identically for a topic that exists and one nobody has ever authored.
 */
export function extractRequestedTopic(message: string): RequestedTopic | null {
  const request = matchTopicRequest(message ?? '')
  if (!request) return null

  const after = (message ?? '').slice(request.end)
  const clause = after.split(TOPIC_TERMINATORS)[0] ?? ''

  // Trim connectives from the front, one at a time, so only a genuine leader is
  // removed and a topic that legitimately begins with one is kept intact.
  let words = clause.trim().split(/\s+/).filter(Boolean)
  while (words.length && LEADING_CONNECTIVES.has(words[0].toLowerCase().replace(/[^a-z0-9]/g, ''))) {
    words = words.slice(1)
  }

  const title = words.join(' ').trim().slice(0, MAX_TITLE_CHARS).trim()
  if (!title) return null

  const topicWords = contentWords(title)
  if (topicWords.size < MIN_TITLE_WORDS) return null

  return { title, words: topicWords }
}

/**
 * Assemble the learner's own words about this topic into grounding text.
 *
 * The current message always counts — it is where the topic was named. Earlier
 * messages count only when they mention the topic, so an unrelated aside from
 * ten turns ago cannot pad a thin request over the threshold.
 */
export function learnerGroundingText(
  topic: RequestedTopic,
  message: string,
  priorLearnerMessages: readonly string[] = [],
): string {
  const parts: string[] = []
  const seen = new Set<string>()

  const push = (text: string) => {
    const trimmed = (text ?? '').trim()
    if (!trimmed || seen.has(trimmed)) return
    seen.add(trimmed)
    parts.push(trimmed)
  }

  push(message)
  for (const prior of priorLearnerMessages.slice(-MAX_PRIOR_MESSAGES)) {
    if (mentionsTopic(prior ?? '', topic)) push(prior)
  }

  return parts.join(' ').replace(/\s+/g, ' ').slice(0, MAX_GROUNDING_CHARS).trim()
}

/**
 * The identity for a topic the learner named, or null when there is not enough
 * of their own text to draw it from.
 *
 * Reuses `runtimeTopicIdentity` — same character floor, same stable
 * `topic:<hash>` id, same `runtime` provenance — so this adds a SOURCE of
 * grounding and no second notion of what a topic is. The substance test is the
 * one thing it adds, because a request is not a description.
 */
export function requestedTopicIdentity(
  message: string,
  priorLearnerMessages: readonly string[] = [],
): TopicIdentity | null {
  const topic = extractRequestedTopic(message)
  if (!topic) return null

  const description = learnerGroundingText(topic, message, priorLearnerMessages)

  // Substance beyond the topic's own name. Without this, repeating the title
  // for forty characters would look like grounding.
  let substance = 0
  for (const w of contentWords(description)) {
    let isTitleWord = false
    for (const t of topic.words) if (sameWord(w, t)) { isTitleWord = true; break }
    if (!isTitleWord) substance++
  }
  if (substance < MIN_SUBSTANCE_WORDS) return null

  return runtimeTopicIdentity({ title: topic.title, description })
}
