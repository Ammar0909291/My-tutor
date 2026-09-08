/**
 * A LEARNER'S OWN INCIDENTAL PHRASING MUST NEVER BECOME A NEW LESSON TOPIC.
 *
 * ── MEASURED (real-student session, 2026-09, live production account) ───────
 * Mid-way through an Idioms lesson, a learner wrote (no question mark, not a
 * request for an explanation of anything):
 *
 *   "i pick B spill the beans because you teach me this one at start"
 *
 * Two turns later — after confirming a bare "B" answer — the model's ENTIRE
 * reply pivoted, unprompted, into an unrelated mini-lesson:
 *
 *   "**Teaching "one at start"**
 *   When we want to give a clear, step-by-step instruction, we often start
 *   the list with the number **one**. Example: 1. **One**: Gather the
 *   bread. 2. **Two**: Spread butter. ...
 *   **Quick check** If you were writing a short recipe for a peanut-butter
 *   sandwich, what would you write as the very first step?"
 *
 * The model had literalized the learner's own casual phrase ("this one at
 * start") into a quoted vocabulary item and built an entire off-topic
 * teaching moment — and a new practice question — around it. The learner
 * had to explicitly ask "why we talk about recipe now?" to recover.
 *
 * ── WHY THIS IS NOT A GENERAL "TOPIC RELEVANCE" DETECTOR ────────────────────
 * A blunt "does this content relate to the lesson topic" check would be
 * actively harmful: this tutor's own strongest, most valued behaviour is
 * reaching for everyday analogies with ZERO vocabulary overlap with the
 * concept's title (a megaphone for a microphone in Public Speaking; a
 * sandwich for argument structure in Debate Skills — both observed as
 * GOOD teaching in the same session that surfaced this defect). Stripping
 * on vocabulary mismatch alone would break exactly the pedagogy this
 * product is good at.
 *
 * A blunt "flag a bolded heading that quotes a phrase" check is ALSO wrong
 * for the opposite reason: an Idioms lesson introducing a brand-new idiom
 * mid-lesson ("**Understanding "break the ice"**") is expected, wanted
 * content, and idioms by definition share no vocabulary with the word
 * "idiom" — the concept-title-overlap test that would catch the recipe
 * defect would ALSO strip every legitimate new-vocabulary introduction in
 * exactly the lesson type where the defect was found.
 *
 * ── THE ACTUAL SIGNATURE, NARROWLY SCOPED ────────────────────────────────────
 * What is unique to the defect, and absent from every legitimate case
 * checked above, is where the quoted phrase came from: it is a VERBATIM
 * substring of something the LEARNER THEMSELVES typed in a recent turn,
 * in a message that did NOT ask about it. A learner who asks "what does
 * 'break the ice' mean?" (a real question) gets that phrase explained
 * correctly — legitimate, not stripped, because the source message IS a
 * question. New curriculum vocabulary the model introduces on its own
 * never matches the learner's own prior wording at all, so it never
 * triggers this check either.
 *
 * Scope, deliberately narrow: only fires on a heading-shaped "explaining a
 * quoted phrase" construct (`**Verb-ing "phrase"**` or similar), only when
 * no excursion is active and the learner did not ask a genuine question
 * this turn (both already-computed signals, reused rather than re-derived),
 * and only strips the offending paragraph — never invents replacement
 * content, matching every other repair in this file's family.
 */

/** A heading that explains/introduces a QUOTED phrase, e.g. `**Teaching "one at start"**`. */
const QUOTED_TEACHING_HEADING =
  /\*\*[A-Za-z][\w\s]{0,30}["“]([^"”]{2,60})["”][\w\s]{0,15}\*\*/

/** Same first-person/question-soliciting test the rest of the teaching layer already uses. */
const QUESTION_MARK = /\?/

const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export interface TopicDriftInput {
  /** The outgoing text, other repairs already applied. */
  text: string
  /** Recent messages, most-recent-last — same shape sent to the model. */
  recentMessages: readonly { role: string; content: string }[]
  /** This turn's own learner message. */
  currentMessage: string
  /** No excursion open — a real topic detour already licenses departing
   *  from the anchored concept, and this repair must not fight it. */
  excursionActive: boolean
  /** Did the LEARNER's message this turn itself ask a genuine question?
   *  If so, answering it (even at length, even quoting their words back)
   *  is legitimate and this repair must not strip it. */
  learnerAskedDirectQuestion: boolean
}

export interface TopicDriftResult {
  text: string
  stripped: boolean
  /** The quoted phrase that triggered the strip, for the warn log. */
  removedPhrase: string | null
}

/**
 * Remove a paragraph that builds an unprompted mini-lesson around a quoted
 * phrase lifted verbatim from the learner's own recent, non-question
 * message. See the module docblock for the full reasoning and the two
 * false-positive shapes this deliberately does NOT catch.
 */
export function stripLearnerPhraseDrift(input: TopicDriftInput): TopicDriftResult {
  try {
    if (input.excursionActive || input.learnerAskedDirectQuestion) {
      return { text: input.text, stripped: false, removedPhrase: null }
    }
    const text = typeof input.text === 'string' ? input.text : ''
    if (!text) return { text: input.text, stripped: false, removedPhrase: null }

    // Matched against the FULL text and truncated by character INDEX, not
    // paragraph — real model output is inconsistent about whether a grade
    // acknowledgement ("That's right.") shares a blank-line-delimited
    // paragraph with the drift heading or merely a soft line break, and
    // truncating by index is correct either way.
    const match = text.match(QUOTED_TEACHING_HEADING)
    if (!match || match.index === undefined) return { text: input.text, stripped: false, removedPhrase: null }
    const phrase = match[1]?.trim()
    if (!phrase || phrase.length < 4) return { text: input.text, stripped: false, removedPhrase: null }
    const normPhrase = norm(phrase)
    if (!normPhrase) return { text: input.text, stripped: false, removedPhrase: null }

    // Was this phrase typed by the LEARNER, in a message that did not ask
    // about it? Only the learner's OWN messages count — the model's own
    // prior replies routinely reuse its own vocabulary, which is not drift.
    const learnerMessages = [
      ...input.recentMessages.filter((m) => m.role === 'user').map((m) => m.content),
      input.currentMessage,
    ]
    const sourcedFromLearner = learnerMessages.some((msg) => {
      if (typeof msg !== 'string' || !msg) return false
      if (QUESTION_MARK.test(msg)) return false // a real question about it is legitimate
      return norm(msg).includes(normPhrase)
    })
    if (!sourcedFromLearner) return { text: input.text, stripped: false, removedPhrase: null }

    // A heading-introduced mini-lesson keeps being ABOUT the drifted phrase
    // for the rest of the turn — the worked example, the editorial aside,
    // and the practice question that follows are all part of the SAME
    // off-topic thread the heading opened, not independent content. So the
    // whole tail from the heading onward is dropped, keeping only whatever
    // legitimate content preceded it (e.g. a grade acknowledgement like
    // "That's right.").
    const rebuilt = text.slice(0, match.index).trim()

    return {
      // Emptying the turn is worse than leaving the drift in — matches
      // every other repair in this file's family ("a repair must never
      // break a turn").
      text: rebuilt.length > 0 ? rebuilt : input.text,
      stripped: rebuilt.length > 0,
      removedPhrase: phrase,
    }
  } catch {
    // A repair must never break a turn.
    return { text: input.text, stripped: false, removedPhrase: null }
  }
}
