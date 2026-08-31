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

import { matchTopicRequest, matchTopicQuestion } from './session'
import { contentWords } from './visualEngine'
import { runtimeTopicIdentity, type TopicIdentity } from './topicIdentity'
import { VISUAL_MEDIUM_NOUNS } from '@/lib/teaching/masteryGate'

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
  // Added 2026-08-11, when one content word became enough to NAME a topic for
  // the suppression test. These sit between the request and the real topic and
  // are never the topic themselves: "explain this TOPIC to me" and "explain
  // DIFFERENTLY" would otherwise name "topic" and "differently" and read as
  // requests for something other than the lesson. Same role as "again" and
  // "simply", which were already here. A list about English, not about
  // subjects — it cannot grow when the curriculum does.
  'topic', 'differently', 'simpler', 'detail', 'thing', 'stuff', 'bit',
])

/**
 * REPEAT ADVERBIALS — "say it AGAIN", spelled as a phrase.
 *
 * `LEADING_CONNECTIVES` above already contains `again`, `more`, `simply` and
 * `differently`, because a request to be re-taught names no new subject. But it
 * trims ONE WORD AT A TIME, so it stops dead on the commonest spoken form of
 * the same thing: "one more time" begins with `one`, which is not a connective
 * and never can be ("one" is a real word).
 *
 * MEASURED IN PRODUCTION, PHASE D, on phys.mech.orbital-mechanics. A weak
 * learner typed "please explain one more time simple words" and the runtime
 * extracted the topic "one more time simple words", opened an unresolved-topic
 * excursion on it, and the tutor spent the rest of the lesson teaching how to
 * explain things simply — shoelaces, bicycles, a steering wheel, a board game.
 * Circular Orbital Mechanics was never mentioned again. The lesson ran to the
 * 22-turn cap at check=0 practice=0 and could not close.
 *
 * WHY A PHRASE AND NOT MORE WORDS IN THE SET ABOVE. Both `time` and `word` were
 * measured as single-word additions and both are unsafe on their own: trimming
 * `time` from the front turns "explain time dilation" into "dilation" and, far
 * worse, makes bare "explain time" name nothing — and time IS a physics topic.
 * A leading PHRASE cannot do that: "explain time" does not begin with "one more
 * time", so it is untouched.
 *
 * Anchored to the FRONT for the same reason the word list is: these can only
 * ever sit between the request and the topic. A list about English, not about
 * subjects — it cannot grow when the curriculum does, and it never decides
 * WHAT to draw.
 */
const LEADING_REPEAT_ADVERBIAL =
  /^\s*(?:just\s+)?(?:one\s+more\s+time|one\s+more\s+times|once\s+more|one\s+more|one\s+time)\b[\s,]*/i

/**
 * HOW TO WORD IT, not what to say — "in simple words", "in your own words".
 *
 * The tail of the same production utterance. After LEADING_REPEAT_ADVERBIAL
 * removes "one more time" from "explain one more time simple words", what is
 * left at the front is "simple words", and `simple` alone is not enough to stop
 * it: `simple` is already a discourse noun but `word` is not, so one word
 * survives and the phrase reads as a subject.
 *
 * A PHRASE, and specifically NOT the bare word `word` in DISCOURSE_NOUNS. That
 * was written first and measured: `problem` is ALREADY a discourse noun, so
 * adding `word` made "word problems" — a real mathematics topic — name nothing.
 * Requiring the wording adjective keeps every genuine topic that merely
 * contains "word": "word problems", "sight words", "word equation" are all
 * untouched because none of them is "<wording adjective> words".
 *
 * A list about English, not about subjects.
 */
const LEADING_WORDING_CLAUSE =
  /^\s*(?:in\s+)?(?:very\s+)?(?:simple|simpler|plain|easy|easier|basic|small|short|your\s+own|my\s+own|normal|everyday)\s+(?:words|language|terms|english)\b[\s,]*/i

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
export function extractRequestedTopic(
  message: string,
  /**
   * How many content words a phrase needs before it counts as a NAME.
   *
   * Two by default, and that default is load-bearing: it is what stops
   * "explain that again", "explain it more simply" and "show me a diagram"
   * from naming anything, which in turn stops them taking away a figure the
   * learner is reading or grounding a generation on a discourse fragment.
   *
   * ONE is passed by the suppression path only, and the asymmetry is the
   * point. Withholding a NEW figure costs a learner a picture they never had;
   * removing one mid-explanation, or drawing the wrong concept, costs them
   * more. Measured across 40 fresh topics: single-word topics — "isotopes",
   * "titration", "electrolysis", "isomers" — are the commonest way a learner
   * names something, and every one of them slipped past this floor, so the
   * lesson's own curated card was served instead. 46 of 62 figures a learner
   * received were the lesson's picture on somebody else's topic.
   */
  minWords: number = MIN_TITLE_WORDS,
  /** Also accept the weaker QUESTION forms ("why does X", "what causes X").
   *  Passed by the suppression path only, for the same reason `minWords` is. */
  includeQuestionForms = false,
): RequestedTopic | null {
  const request = includeQuestionForms ? matchTopicQuestion(message ?? '') : matchTopicRequest(message ?? '')
  if (!request) return null

  const after = (message ?? '').slice(request.end)
  const clause = after.split(TOPIC_TERMINATORS)[0] ?? ''

  // Trim connectives from the front, one at a time, so only a genuine leader is
  // removed and a topic that legitimately begins with one is kept intact.
  //
  // The PHRASE strip runs first, and must: "one more time" is trimmed as a unit
  // because no single word in it can safely join the set (see
  // LEADING_REPEAT_ADVERBIAL). Whatever follows it — "please", "in simple
  // words" — is then handled by the existing word-by-word trim and the
  // discourse-noun test, exactly as it already is for "again".
  // Word trims and phrase trims INTERLEAVE until nothing more comes off.
  //
  // A single pass in either order is not enough, and the case that proves it is
  // "explain it one more time please": the clause begins with `it`, which is a
  // connective, so an anchored phrase strip run first sees "it one more…" and
  // misses. Trimming `it` first exposes "one more time", and stripping that
  // exposes "please", which is a connective again. Looping to a fixed point is
  // the only order-independent answer, and it terminates because every branch
  // removes at least one word.
  let words = clause.trim().split(/\s+/).filter(Boolean)
  for (;;) {
    if (words.length && LEADING_CONNECTIVES.has(words[0].toLowerCase().replace(/[^a-z0-9]/g, ''))) {
      words = words.slice(1)
      continue
    }
    const rest = words.join(' ')
    const stripped = rest.replace(LEADING_REPEAT_ADVERBIAL, '').replace(LEADING_WORDING_CLAUSE, '')
    if (stripped !== rest) {
      words = stripped.trim().split(/\s+/).filter(Boolean)
      continue
    }
    break
  }

  const title = words.join(' ').trim().slice(0, MAX_TITLE_CHARS).trim()
  if (!title) return null

  const topicWords = contentWords(title)
  if (topicWords.size < minWords) return null

  return { title, words: topicWords }
}

/**
 * Is this word about the FORM of an answer rather than its subject?
 *
 * Reads the engine's existing medium-noun list; no second list is kept. Lived
 * in `resolveVisualTarget.ts` until the teaching layer needed the same
 * distinction — it belongs with the rest of "what did the learner name".
 * `contentWords` folds a trailing plural, so entries are compared folded.
 */
export function isMediumWord(word: string): boolean {
  for (const noun of VISUAL_MEDIUM_NOUNS) {
    const folded = noun.endsWith('s') && noun.length > 4 ? noun.slice(0, -1) : noun
    if (word === folded || word === noun) return true
  }
  return word === 'illustration' || word === 'sketch' || word === 'figure' || word === 'plot'
}

/**
 * Words about the LESSON'S MACHINERY rather than its subject.
 *
 * The sibling of `isMediumWord`, found the same way it was: by measuring. With
 * a one-word floor and the weak question family, "What is the answer?", "What
 * is the next step?", "What is the formula?", "What is my score?" and "How do
 * I solve this?" all NAME something — "answer", "step", "formula", "score",
 * "solve" — and none of them shares vocabulary with the lesson's concept. So
 * each one read as a request to be taught something else, and would have split
 * the lesson in half over an ordinary in-lesson question. 8 of 31 measured.
 *
 * A list about how tutoring is talked about, not about any subject: it cannot
 * grow when the curriculum does, and it never decides WHAT to teach — only
 * that a phrase made of nothing but these has not named a topic.
 *
 * Deliberately NOT here: "unit", "law", "force", "energy" and every other word
 * that is both ordinary English and real subject matter. And the rule below
 * needs only ONE word to survive this list, so "chemical formula", "first law"
 * and "percentage difference" all still name their topic.
 */
export const DISCOURSE_NOUNS = new Set([
  // the apparatus of an exercise
  'answer', 'question', 'step', 'part', 'example', 'formula', 'difference',
  'problem', 'exercise', 'solution', 'mistake', 'error', 'result', 'reason',
  'way', 'method', 'rule', 'idea', 'meaning', 'word', 'note', 'point',
  // HOW TO DELIVER IT, NOT WHAT TO TEACH — the manner adverbs.
  //
  // Measured 2026-08-29, physics `phys.qm.hydrogen-atom-qm`, a struggling-
  // learner run. The learner typed:
  //
  //     "ok i am trying, can you explain one more time slowly"
  //
  // LEADING_REPEAT_ADVERBIAL correctly removes "one more time", and what
  // survives is the single word `slowly` — not a medium noun, not lesson
  // apparatus, so ONE word survived and the phrase read as a subject.
  // `namedTopicUnknownTo` returned the topic "slowly", an excursion opened
  // against it, and the tutor spent ELEVEN turns teaching the English adverb
  // "slowly" inside a quantum mechanics lesson: "'Slowly' is an adverb that
  // tells us how an action is performed", then eight generated MCQs of the
  // form "Which sentence uses 'slowly' correctly?" with options like "The
  // river flows slowly" / "The snail moves slowly across the grass".
  //
  // The learner answered six of them correctly. None could count — they are
  // unkeyed model questions about a different subject — so the session sat at
  // GUIDE with checkCorrect 0 for the whole run and the hydrogen atom was
  // never returned to.
  //
  // This is the exact shape of the 'practice problem' defect below, and of the
  // L1 qualifier defect: a word about HOW the learner wants to be taught read
  // as WHAT they want taught. It bites hardest on precisely the learner this
  // list matters most for — the one with weak English, who asks for delivery
  // changes constantly.
  //
  // A list about how tutoring is talked about, not about any subject. The
  // one-surviving-word rule still protects real requests: "explain diffraction
  // slowly" keeps `diffraction` and still names its topic.
  'slowly', 'quickly', 'simply', 'clearly', 'easily', 'properly', 'briefly',
  'carefully', 'differently', 'easy', 'easier', 'slower', 'faster',
  // ASKING FOR THE EXERCISE ITSELF — the Phase-7C defect.
  //
  // Measured in production, physics `phys.opt.total-internal-reflection`, a
  // clean single-concept session sitting at GUIDE. The learner typed:
  //
  //     "ok yes lets try practice problem"
  //
  //   [excursion] requestedTopic: 'practice problem', transition: 'started',
  //               active: true
  //   [ladder]    excursion: true
  //
  // 'problem' was already here, but ONE surviving word is enough and
  // 'practice' was absent — so a request FOR a practice question was read as
  // a request to be taught a topic called "practice problem". The excursion
  // opened, `excursionActiveHoisted` went true, `gateEligible` went false,
  // `findBestProbe` was never called, and the concept's three reviewed
  // authored probes were skipped in favour of an unconstrained model
  // question. The route's own detector flagged it unprompted:
  // `divergences: ["QUESTION_SHIPPED_WITHOUT_PROBE"]`. The substitute
  // question then shipped a WRONG answer key (water->air, correct option
  // 55°, key said 48°), which is the harm the authored path exists to
  // prevent, and the lesson's figure was dropped the same turn
  // ("named-topic-left-the-figure").
  //
  // 'check' is added on the same measured evidence — "let's do the check"
  // named the topic "check" — and is the other half of how a learner asks
  // for the gate's own question.
  //
  // Both are safe for the same reason 'main' was: ONE surviving real word is
  // enough. Checked against every concept title in all six registered
  // subjects — 'check' appears in NONE, and 'practice' in exactly one
  // (`cs.se.agile-design-principles`, "Agile Practices and Software Design
  // Principles"), where 'agile' survives and still names the topic.
  'practice', 'check',
  // GENERIC MODIFIERS — the Phase-6 P0's missing word.
  //
  // 'idea' and 'point' were already here, and "what is the point of this?"
  // correctly returned null because of it. "explain the main idea please" did
  // NOT, because `.every()` needs EVERY word to be discourse and 'main' was
  // absent — so the phrase survived as the named topic "main idea please" and
  // opened an unresolved-topic excursion, pausing the lesson.
  //
  // Only 'main' is added, and only on measured evidence. Its obvious siblings
  // were deliberately REJECTED because each is real subject vocabulary
  // somewhere in the curriculum: 'basic' (acid-base chemistry), 'general'
  // (general relativity), 'simple' (simple machines), 'core' (planetary core),
  // 'central' (central atom). Adding those would trade this defect for a worse
  // one. 'key' was checked and is not needed — "what is the key idea?" already
  // resolves to null today.
  //
  // One surviving real word is still enough, so "main sequence stars" and
  // "main group elements" are untouched: 'sequence'/'stars'/'group'/'elements'
  // all survive.
  'main',
  // POLITENESS — never names a subject, in any curriculum.
  //
  // Found by the Phase-6 P0 test rather than by inspection: after 'main' was
  // added, "explain the main idea please" STILL produced the topic "main idea
  // please", because ONE non-discourse word is enough to survive and 'please'
  // was that word. A phrase cannot be rescued from being deixis by being polite.
  'please', 'thanks', 'thank',
  // the apparatus of a course
  'lesson', 'topic', 'chapter', 'test', 'quiz', 'exam', 'homework',
  'assignment', 'score', 'mark', 'grade', 'progress',
  // task verbs — what to DO, never what it is ABOUT
  'solve', 'calculate', 'explain', 'understand', 'learn', 'study', 'know',
  'mean', 'work', 'do',
  // PERCEPTION VERBS — what something LOOKS LIKE, never what it is.
  //
  // Measured in production: "can you show me what that looks like" extracted
  // the topic "what that looks like" and opened an unresolved-topic excursion
  // that stayed ACTIVE for four turns. An open excursion PAUSES the lesson, so
  // `turnCountsForLesson` froze the mastery ladder at OBSERVE for the rest of
  // the session — every graded correct answer after that counted for nothing.
  //
  // The phrase is deixis: "that"/"this" point back at what is already being
  // taught, so nothing is named at all. `work` and `mean` are already in this
  // list for exactly this reason ("how that works", "what this means" both
  // correctly return null); the perception verbs were simply missing.
  //
  // `sound` is deliberately EXCLUDED: it is a real physics topic, and adding it
  // would make "explain sound" resolve to nothing.
  'look', 'seem', 'appear', 'like',
  // position words, safe here because one surviving word is enough
  'next', 'last', 'first', 'previous', 'other',
  // WHAT KIND OF PRESENTATION, not what subject.
  //
  // Added after a real production capture: the session snapshot held
  //   excursion.targetTopicTitle = "real-life example of this"
  // because "show me a real-life example of this" names {real, life} — words
  // the lesson's own text does not contain, so the guard let them through and
  // a request for a different presentation of the CURRENT topic split the
  // lesson in half.
  //
  // Note this could NOT be solved with `detectLearnerRequest`, which was the
  // obvious reuse and was measured before being rejected: it returns
  // 'real_life_example' for "give me a real-life example of FRICTION" too, so
  // gating on it would have suppressed genuine topic requests. The words are
  // the discriminator, not the request form.
  //
  // Every one of these is safe only because ONE surviving word is enough:
  // "simple machines", "real gases", "half-life" and "life processes" all
  // keep a real word and are unaffected.
  'real', 'life', 'everyday', 'practical', 'simple', 'basic', 'easy',
  'quick', 'short', 'another', 'different',
])

/**
 * THE TOPIC THE LEARNER NAMED, WHEN IT IS NOT THE ONE ALREADY BEING TAUGHT.
 *
 * Extracted from `requestTargetsSomethingElse`, which asked exactly this
 * question of the visual layer and answered it well. Two callers now need it
 * and they need it for different reasons, so the shared half lives here and
 * each keeps its own gates:
 *
 *   the visual layer  — may this figure claim to be what they asked for?
 *   the Teaching Engine — is this a question about something else, which the
 *                         excursion lifecycle must take rather than steer away
 *                         from? (see excursion.ts's UNRESOLVED TOPICS note)
 *
 * Three filters, in order, each earning its place:
 *
 *   1. A NAME. `extractRequestedTopic` with the weak question family and a
 *      one-word floor — "What causes friction?", "How does a catalyst work?"
 *      and "Teach me about moles" are how learners actually ask, and all three
 *      fall under the two-word floor that protects a figure already on screen.
 *      "Why?", "explain that again" and "I am lost" name nothing and stop here.
 *   2. A MEDIUM IS NOT A TOPIC. "show me a diagram" names "diagram" — a word
 *      about the form of the answer. Those requests mean "about what we are
 *      studying", so they are not somewhere else.
 *   3. NOT THE THING ALREADY BEING TAUGHT. One shared content word with the
 *      current topic's own title or description is enough to believe the
 *      question is about it. Deliberately a weak bar: a false "somewhere else"
 *      splits a lesson in half over a follow-up, and "why does temperature
 *      change it?" inside a thermal lesson must stay exactly where it is.
 *
 * No keyword table and no curriculum lookup: the learner's own words against
 * the taught topic's own words, so it behaves identically for a topic nobody
 * has ever authored.
 */
export function namedTopicUnknownTo(message: string, taughtText: string): RequestedTopic | null {
  const requested = extractRequestedTopic(message, 1, true)
  if (!requested) return null

  const named = [...requested.words]
  // ONE surviving word is enough. A phrase made ENTIRELY of medium nouns and
  // lesson machinery has named no subject; a phrase with any real word in it
  // has, so "chemical formula" and "first law" are unaffected.
  if (named.every((w) => isMediumWord(w) || DISCOURSE_NOUNS.has(w))) return null

  const taught = contentWords(taughtText ?? '', true)
  for (const word of named) if (taught.has(word)) return null

  return requested
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
