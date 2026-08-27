/**
 * DID THIS TURN TEACH ANYTHING?
 *
 * ── THE GAP THIS FILLS ──────────────────────────────────────────────────────
 * Every instrument in this repository asks whether a turn BROKE A RULE. None
 * asked whether it taught. So a turn can pass arbitration, pass the H3
 * remediation floor, pass the affirmation guard, invent no mastery, cite no
 * banned analogy, stay perfectly on concept — and contain no teaching at all.
 *
 * Measured in production, 2026-08-27, immediately after a learner said for the
 * second time that they did not understand:
 *
 *     "I understand you're still unsure about how friction works.
 *      Do I have that right?"
 *
 * `[remediation-floor] violation: null`. Every guard clean. The child learned
 * nothing. That turn is the reason this module exists.
 *
 * ── WHY THE EXISTING FLOOR MISSES IT ────────────────────────────────────────
 * H3 asks "is there any text left once the questions are cut away". A
 * confirmation tail ("Do I have that right?") is DELIBERATELY excluded from
 * `askedAnswerableQuestion` — correctly, it is not a mastery question — so the
 * reflection sentence in front of it survives the cut, the remainder is
 * non-empty, and the floor reports teaching happened. The floor is not wrong;
 * it was answering a different question.
 *
 * ── WHAT THIS MEASURES ──────────────────────────────────────────────────────
 * A SUBSTANTIVE sentence is one that says something about the SUBJECT. A
 * sentence about the LEARNER'S STATE ("I understand you're stuck"), a
 * confirmation ("does that make sense?"), or a piece of stage management
 * ("let's carry on") is not teaching, however welcome it is in a lesson. A turn
 * taught something when at least one substantive sentence survives.
 *
 * ── WHAT IT DOES NOT MEASURE, AND MUST NOT BE READ AS ───────────────────────
 * Not truth. Not quality. Not whether the explanation is any good, pitched
 * right, or on the correct concept. A confident, fluent, completely wrong
 * paragraph is "substantive" here. This is a FLOOR — the difference between
 * teaching and saying nothing — and it is the only claim it makes.
 *
 * Warmth is not the target. A reflection FOLLOWED by teaching passes, because
 * the reflection is not the problem; the reflection being the whole turn is.
 *
 * Pure: no I/O, no model call, no state.
 */

/**
 * Sentences that talk ABOUT the exchange rather than about the subject.
 *
 * Every pattern here was written against a turn this system actually produced,
 * not imagined. Anchored at the start of the sentence (or matching a whole
 * short sentence) so that the same words appearing mid-explanation — "you're
 * saying the force doubles, so…" — do not silently delete real teaching.
 */
const META_SENTENCE: RegExp[] = [
  // Reflecting the learner's own words back at them.
  //
  // A HEDGE IN FRONT DEFEATED THIS, AND WAS MEASURED DOING SO. Production,
  // phys.qm.spin, 2026-08-27, on the second consecutive "I still don't
  // understand" — the whole turn, twenty-five words, after a repair had already
  // run once:
  //
  //     "I think you're saying you're still unsure how the two spots in the
  //      experiment show that electrons have a built-in two-valued spin.
  //      Is that right?"
  //
  // The second sentence matched as meta. The first did not, because the prefix
  // group allowed only and/so/okay, so "I think " carried it straight past —
  // it scored as the turn's one substantive sentence and the reflection
  // shipped. That is the exact failure this module was written for, wearing a
  // hedge. `mean` is included alongside `saying` as the same move with a
  // synonym; over-matching one sentence is cheap, because a turn only fails
  // when NO sentence is substantive, so a reflection FOLLOWED by teaching
  // still passes.
  /^(and\s+|so\s+|okay,?\s+|ok,?\s+)?(i\s+(think|guess|believe|suppose)\s+)?you(?:'re| are|r)?\s+(saying|mean|meaning|telling me)\b/i,
  /^(and\s+|so\s+)?i\s+(understand|hear|see|know|can see|get)\s+(that\s+)?you\b/i,
  /^(it\s+)?sounds?\s+like\s+you\b/i,
  /^(and\s+|so\s+)?you\s+(still\s+)?(feel|think|find|seem)\b/i,
  /^i'?m\s+(glad|sorry)\b/i,
  /^(that'?s|thats)\s+(okay|ok|fine|alright|understandable)\b/i,
  // Asking the learner to confirm the exchange rather than the content.
  /\b(have|has|did)\s+i\s+got\s+(that|it)\s+right\b/i,
  /\bdo\s+i\s+have\s+(that|it)\s+right\b/i,
  /\bhas\s+that\s+got\s+it\s+right\b/i,
  /^(is|does)\s+that\s+(right|correct|make sense|clear)\b/i,
  /^does\s+that\s+(help|make sense)\b/i,
  /^(am|are)\s+(i|we)\s+(right|on the right track)\b/i,
  // Stage management.
  /^(let'?s|lets|shall we|we'?ll)\s+(see|go|start|begin|carry on|continue|move on|try again)\b/i,
  /^(good|great|nice|perfect|excellent|well done|exactly|correct|right|okay|ok|alright|sure)\b[\s!.,—-]*$/i,
  /^no\s+(worries|problem)\b/i,
  /^(take your time|no rush)\b/i,
]

/** Words that carry no subject content, excluded before counting. */
const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'so', 'if', 'then', 'than', 'that', 'this',
  'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'can', 'could',
  'shall', 'should', 'may', 'might', 'must', 'i', 'you', 'your', 'yours', 'we',
  'us', 'our', 'it', 'its', 'they', 'them', 'their', 'he', 'she', 'him', 'her',
  'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'from', 'as', 'about',
  'into', 'over', 'up', 'down', 'out', 'not', 'no', 'yes', 'ok', 'okay',
  'me', 'my', 'here', 'there', 'now', 'just', 'very', 'really', 'still',
  'what', 'which', 'who', 'how', 'why', 'when', 'where', 'lets', 'let',
])

/**
 * At least this many content words before a sentence counts as saying
 * something.
 *
 * TWO, AND THE REASON IS MEASURED. It was four, and four rejected a card's own
 * micro-check — "You press down on the book with your hand. Easier or harder to
 * slide?" carries three content words per sentence — which is the exact move
 * the hold block asks the tutor to make. Caught by a test before it shipped.
 *
 * Lowering it costs nothing, because the word count was never what caught the
 * real failures: every empty turn measured in production is made ENTIRELY of
 * meta sentences and scores zero substantive sentences however low this floor
 * goes. The count only ever produced false positives on short, genuine
 * questions. The meta list is the instrument; this is a backstop against
 * one-word noise.
 */
const MIN_CONTENT_WORDS = 2

function splitSentences(text: string): string[] {
  return text
    // Treat line breaks and list bullets as sentence boundaries too: a model
    // that writes one idea per line must not have them read as one sentence.
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.replace(/^[\s*\-•>#\d.)]+/, '').trim())
    .filter((s) => s.length > 0)
}

/**
 * CURLY APOSTROPHES ARE THE DEFAULT, NOT THE EXCEPTION.
 *
 * Caught by the first production measurement this module was used for, which is
 * the only reason it is here. The live turn read "So you're saying you still
 * don't understand what a kilogram is" with U+2019, every meta pattern was
 * written with U+0027, and the sentence scored SUBSTANTIVE — so the floor stayed
 * silent on exactly the reflection-only turn it exists to catch. One character.
 */
const straighten = (s: string) => s.replace(/[\u2018\u2019\u02BC]/g, "'")

function isMeta(sentence: string): boolean {
  const s = straighten(sentence)
  return META_SENTENCE.some((re) => re.test(s))
}

function contentWordCount(sentence: string): number {
  const words = sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s'’-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  return words.filter((w) => !FUNCTION_WORDS.has(w.replace(/['’]s$/, ''))).length
}

/**
 * The sentences of this turn that say something about the subject.
 *
 * Exported so a caller can show WHICH sentence carried the teaching rather than
 * only a boolean — the difference between a measurement you can act on and a
 * number you have to trust.
 */
export function substantiveSentences(text: string): string[] {
  try {
    if (typeof text !== 'string' || text.trim().length === 0) return []
    return splitSentences(text).filter(
      (s) => !isMeta(s) && contentWordCount(s) >= MIN_CONTENT_WORDS,
    )
  } catch {
    // A measurement must never take a turn down. "Cannot tell" is reported as
    // "nothing measured", and the one caller treats that as no violation.
    return []
  }
}

/** Did this turn say anything about the subject at all? */
export function turnTaughtSomething(text: string): boolean {
  return substantiveSentences(text).length > 0
}
