/**
 * Recovery Guard — deterministic failure-state detection + authored
 * script retrieval.
 *
 * The Brain's most absolute law, previously left to LLM discretion:
 *  - decision-engine/03 §0  the preemption rule — a failure-state
 *                           utterance makes the teaching state irrelevant;
 *                           RECOVERY preempts everything.
 *  - foundations/04 P5      no content enters a flooded mind.
 *  - foundations/04 P20     the learner's stated internal state is ground
 *                           truth — accepted instantly, never re-inferred.
 *  - foundations/01 §3      the base script library (validate → shrink →
 *                           bank one win), per utterance.
 *  - first-lesson/05        lesson-one deltas (tighter shrinks; one
 *                           failure state per session; "I'm scared" /
 *                           "I'm stupid" / "I can't").
 *
 * Detection is deliberately conservative: strong identity utterances
 * ("I give up", "I'm stupid", "I hate maths") match anywhere; mild,
 * ambiguous ones ("I don't know", "I'm confused") match only when the
 * message is short enough to BE the utterance rather than contain it
 * incidentally ("I don't know if chapter 3 covers this" must not fire).
 * A missed detection degrades to today's behavior (LLM judgment); a
 * false fire delivers a gentle, proportionate script — the asymmetry
 * favors firing only on confident matches.
 */

// The single owner of "is this message a bare acknowledgement" (see
// isRepeatedAnswer below). conversationState.ts does not import this module,
// so this edge adds no cycle.
import { isLowSignalAcknowledgement } from './conversationState'

export type FailureStateKey =
  | 'dont_know' | 'dont_understand' | 'confused' | 'forgot' | 'guessing'
  | 'too_hard' | 'give_up' | 'hate_subject' | 'scared' | 'stupid' | 'cant'
  // P1 (confusion-detection coverage gap): the learner isn't confused about
  // the CONCEPT — they're objecting to the teaching METHOD itself (repeated
  // Socratic questioning). Distinct failure state, distinct script: stop
  // asking, start showing, this turn and the next one.
  | 'too_many_questions'
  // P0-3: FRUSTRATION — distinct from every state above, which are all
  // honest admissions of struggle. Frustration is an affect signal (anger/
  // exasperation at the CONVERSATION, not the content) and needs a
  // different script: acknowledge briefly, apologize if the tutor caused
  // it (e.g. by repeating itself), then change strategy — never validate-
  // and-shrink like 'dont_know', never argue the point.
  | 'frustrated'

const STRONG_PATTERNS: Array<[FailureStateKey, RegExp]> = [
  ['give_up',      /\bi\s+(just\s+)?(give|gave)\s+up\b/i],
  ['stupid',       /\bi(?:'?m|\s+am)\s+(so\s+|just\s+|too\s+)?(stupid|dumb|an idiot)\b/i],
  ['scared',       /\bi(?:'?m|\s+am)\s+(really\s+|so\s+)?(scared|afraid|frightened)\b/i],
  ['hate_subject', /\bi\s+hate\s+(this|maths?|math|physics|chemistry|biology|english|reading|school|it)\b/i],
  ['too_hard',     /\b(this|it)(?:'?s|\s+is)\s+(way\s+|just\s+|really\s+)?too\s+(hard|difficult)\b/i],
  ['cant',         /\bi\s+(just\s+)?can'?t\s+do\s+(this|it|maths?|math|any of this)\b/i],
  // Absolute-ignorance signals — strong because they leave no ambiguity
  ['dont_know',    /\bi\s+(know\s+)?nothing\s+(about\s+\S+\s+)?at\s+all\b|\bi\s+know\s+absolutely\s+nothing\b/i],
  ['dont_know',    /\b(i\s+have\s+no\s+idea|i\s+(don'?t|do\s+not)\s+have\s+any\s+idea|no\s+clue|how\s+would\s+i\s+know)\b/i],
  // "idk" — the most common texting abbreviation for "I don't know"
  ['dont_know',    /\bidk\b/i],
  // "beats me" / "I'm clueless" / "I'm drawing a blank"
  ['dont_know',    /\b(beats\s+me|i(?:'?m|\s+am)\s+clueless|drawing\s+a\s+blank)\b/i],
  // "I quit" — unambiguous surrender, same weight as "I give up"
  ['give_up',      /\bi\s+(just\s+)?quit\b/i],
  // "I never learned this" / "we never studied that" / "never been taught it"
  // — the learner is reporting an absent foundation, not confusion about a
  // present one. Unambiguous wherever it appears in the message.
  ['dont_know',    /\bnever\s+(learned|studied|been\s+taught)\s+(this|that|it|about)\b/i],
  // P1: the learner is objecting to the questioning itself, not the concept
  // — matches with or without a leading "I" ("why do you keep asking me
  // questions", "stop asking me so many questions", "too many questions").
  ['too_many_questions', /\bwhy\s+(do\s+you|are\s+you)\s+(keep\s+asking|asking\s+(me\s+)?so\s+many)\b/i],
  ['too_many_questions', /\b(stop|quit)\s+asking\s+(me\s+)?(so\s+many\s+)?questions\b/i],
  ['too_many_questions', /\btoo\s+many\s+questions\b/i],
  ['too_many_questions', /\bwhy\s+(do\s+you\s+)?keep\s+(quizzing|questioning|testing)\s+me\b/i],
  // "Can you explain ... rather than (keep) asking" / "instead of asking
  // (me) questions" / "rather than asking questions" — the learner contrasts
  // a request for teaching with the questioning they're getting. The pattern
  // requires both halves (explain/teach AND asking/questions) to avoid false-
  // firing on either alone.
  ['too_many_questions', /\b(explain|teach|tell|show)\b.*\b(rather\s+than|instead\s+of)\b.*\b(ask(ing)?|question)/i],
  // P0-3: emphatic repetition/exasperation — the learner is not admitting
  // ignorance, they are objecting to being asked again ("I SAID NO",
  // "no no no", "how many times", "for the third time", "ugh", "omg").
  ['frustrated', /\bi\s+(already\s+)?(said|told\s+you)\s+no\b/i],
  // "I already told you", "I already said", "I told you already [yes/that/so]"
  // — objecting to being re-asked, regardless of what word follows "already".
  ['frustrated', /\bi\s+already\s+(said|told(\s+you)?)\b/i],
  ['frustrated', /\bi\s+(said|told\s+you)\s+already\b/i],
  ['frustrated', /\b(no[.,!]*\s+){2,}no\b/i],
  ['frustrated', /\bhow\s+many\s+times\b/i],
  ['frustrated', /\bfor\s+the\s+(second|third|fourth|fifth|\d+(st|nd|rd|th))\s+time\b/i],
  ['frustrated', /\bomg\b/i],
  ['frustrated', /\bugh+\b/i],
  // Profanity is one signal among several here, never the sole detector —
  // kept to unambiguous words to avoid false-firing on incidental subject
  // content (history/literature can legitimately mention milder words).
  ['frustrated', /\b(fuck(?:ing)?|shit|wtf|bullshit|ffs|smh)\b/i],
  // Sad emoticons as the whole message — a nonverbal distress signal.
  // Whole-message anchored (never matches mid-sentence typos).
  ['scared',     /^[:;][\s]*[(\[]+[.\s!?]*$|^[)\]]+[\s]*[:;][.\s!?]*$/],
  // P2 (universal fix): bare question-marks — complete confusion, nothing
  // the student can contribute; treat as confused, not dont_know (the
  // distinction: confused means "I'm lost", dont_know means "I have no
  // information" — ? / ??? signals the former). A single bare ? carries
  // the same signal as multiple — the live transcript shows students
  // sending exactly one question mark when completely lost.
  ['confused',          /^\?{1,}[!?.…\s]*$/],
  // P2: explicit "you take over" imperatives — the student is not confused
  // about the concept; they're objecting to the Socratic method and asking
  // for direct instruction. Map to too_many_questions (stop asking, teach
  // directly). Whole-message anchored to avoid catching "can you explain
  // why gravity..." mid-sentence.
  ['too_many_questions', /^(just\s+)?(you|u)\s+(explain|tell\s+me|show\s+me)[.!?\s]*$/i],
  ['too_many_questions', /^just\s+(tell|show|explain)\s+(me|it|us)[.!?\s]*$/i],
  ['too_many_questions', /^(re\s*[-–]?\s*explain|explain\s+again|explain\s+it\s+again|explain\s+that\s+again)[.!?\s]*$/i],
  // Bare imperative "Explain" / "please explain it" as the WHOLE message —
  // the learner is asking to be taught, not answering. Whole-message
  // anchored so "explain why the ball falls" (a real content question)
  // never matches.
  ['too_many_questions', /^(please\s+)?explain(\s+(it|this|that))?[.!?\s]*$/i],
  ['too_many_questions', /^(just\s+)?(tell|show)\s+(me|us)\s+(the\s+answer|what\s+it\s+is|how\s+it\s+works)[.!?\s]*$/i],

  // ── ISS-09 — Russian and Hindi pattern sets ────────────────────────────
  //
  // The app teaches in ru and hi (TeachingLanguage), and every pattern above
  // is English-only: a Russian learner writing «я не понимаю» reached the
  // Recovery Engine as an ordinary answer and got a follow-up QUESTION,
  // which is the exact failure recovery exists to prevent — for the two
  // languages least able to ask for help in English.
  //
  // NO LANGUAGE PARAMETER, deliberately. Cyrillic and Devanagari cannot
  // collide with the Latin patterns above, and those cannot collide with
  // these, so the SCRIPT is the discriminator and every call site stays
  // unchanged. Romanized Hindi is the one exception and is anchored
  // accordingly (see below).
  //
  // These live in STRONG (not MILD) for the same reason their English
  // counterparts do: they are absolute-ignorance and identity utterances
  // that leave no ambiguity, and the MILD tier's ≤80-char gate would drop
  // them from a longer sentence.

  // Russian. NOTE: JavaScript's \b is ASCII-only — `\bя` can never match,
  // because `я` is not a \w character, so a first draft using \b was dead
  // code that silently matched nothing. Unicode-aware boundaries
  // ((?<!\p{L}) / (?!\p{L}) with the u flag) are used instead.
  ['dont_know',    /(?<!\p{L})я\s+не\s+знаю(?!\p{L})|(?<!\p{L})понятия\s+не\s+имею(?!\p{L})|(?<!\p{L})не\s+имею\s+понятия(?!\p{L})/iu],
  ['dont_understand', /(?<!\p{L})(я\s+)?не\s+понимаю(?!\p{L})|(?<!\p{L})ничего\s+не\s+понятно(?!\p{L})|(?<!\p{L})не\s+понял[аи]?(?!\p{L})/iu],
  ['forgot',       /(?<!\p{L})(я\s+)?забы(л|ла|ли)(?!\p{L})/iu],
  ['give_up',      /(?<!\p{L})(я\s+)?сдаю́?сь(?!\p{L})|(?<!\p{L})я\s+больше\s+не\s+могу(?!\p{L})/iu],
  ['cant',         /(?<!\p{L})я\s+не\s+могу\s+(это|этого)(?!\p{L})|(?<!\p{L})у\s+меня\s+не\s+получается(?!\p{L})/iu],
  ['stupid',       /(?<!\p{L})я\s+(такой\s+|такая\s+)?(тупой|тупая|глупый|глупая|дурак)(?!\p{L})/iu],
  ['too_hard',     /(?<!\p{L})(это\s+)?слишком\s+(сложно|трудно|тяжело)(?!\p{L})/iu],
  ['scared',       /(?<!\p{L})мне\s+страшно(?!\p{L})|(?<!\p{L})я\s+боюсь(?!\p{L})/iu],
  ['hate_subject', /(?<!\p{L})я\s+ненавижу\s+\p{L}+/iu],
  ['too_many_questions', /(?<!\p{L})(хватит\s+вопросов|слишком\s+много\s+вопросов|перестань\s+спрашивать|просто\s+объясни)(?!\p{L})/iu],

  // Hindi (Devanagari) — «मुझे नहीं पता», «समझ नहीं आया», «भूल गया»
  ['dont_know',    /मुझे\s+(कुछ\s+)?नहीं\s+पता|पता\s+नहीं|मालूम\s+नहीं/u],
  ['dont_understand', /समझ\s+(में\s+)?नहीं\s+आया|मुझे\s+समझ\s+नहीं|समझ\s+नहीं\s+आ\s+रहा/u],
  ['forgot',       /भूल\s+ग(या|यी|ये)/u],
  ['give_up', /मैं\s+हार\s+(मान\s+)?(गया|गयी|मानता|मानती)|छोड़\s+(दो|दिया)/u],
  ['cant',         /मुझसे\s+नहीं\s+होगा|मैं\s+नहीं\s+कर\s+सकता|मैं\s+नहीं\s+कर\s+सकती/u],
  ['too_hard',     /बहुत\s+(मुश्किल|कठिन)\s*(है)?/u],
  ['scared',       /मुझे\s+डर\s+लग/u],
  ['too_many_questions', /बहुत\s+सारे\s+सवाल|सवाल\s+मत\s+पूछो|बस\s+बताओ|सिर्फ\s+बताओ/u],

  // Romanized Hindi (Hinglish) — the one set written in Latin script, so
  // each is anchored to a multi-word phrase with no English reading:
  // "nahi pata" / "samajh nahi aaya" / "bhool gaya" are not substrings of
  // any English sentence this tutor would see.
  ['dont_know',    /\b(mujhe\s+)?(kuch\s+)?nah?i+\s+pata\b|\bpata\s+nah?i+\b|\bmalum\s+nah?i+\b/i],
  ['dont_understand', /\bsamajh\s+(mein\s+)?nah?i+\s+(aaya|aa\s+raha)\b|\bsamajh\s+nah?i+\b/i],
  ['forgot',       /\bbh?ool\s+gay[ai]\b/i],
  ['cant',         /\bmujhse\s+nah?i+\s+hoga\b/i],
]

const MILD_PATTERNS: Array<[FailureStateKey, RegExp]> = [
  // F2 (real-student session): "wait did i pass? I DON'T THINK I UNDERSTAND
  // it" fell through this pattern — "think i" sits between the negation and
  // "understand", and the fixed word order below had no room for a hedge. A
  // hedged admission is not a rarer shape of "I don't understand"; it's the
  // softer way a low-confidence student says the same thing.
  ['dont_understand', /\bi\s+(really\s+|just\s+)?(don'?t|do\s+not)\s+(think\s+i\s+)?understand\b/i],
  // Past-tense / pronoun-less variants — "Didn't understand", "still didn't
  // get it", "didn't follow" — the live-transcript bug: the present-tense
  // pattern above missed the most common student phrasings.
  ['dont_understand', /\b(didn'?t|did\s+not)\s+(understand|get\s+(?:it|that|this)|follow)\b/i],
  ['dont_understand', /\bstill\s+(don'?t|do\s+not|didn'?t)\s+(understand|get\s+(?:it|that|this)|know\s+what\s+you|follow)\b/i],
  ['dont_understand', /\bnot\s+understanding\b/i],
  ['confused',        /\bi(?:'?m|\s+am)\s+(so\s+|really\s+|totally\s+)?(confused|lost)\b/i],
  // "I'm nervous / anxious" — frequently replaces "scared" but shares the
  // same recovery script (name it, shrink stakes, slow down). Placed in MILD
  // because "I'm a bit nervous about the presentation" should not fire.
  ['scared',          /\bi(?:'?m|\s+am)\s+(really\s+|so\s+|very\s+|a\s+bit\s+)?(nervous|anxious)\b/i],
  // "I've always been bad at physics" / "I always fail at maths" / "physics
  // is impossible for me" — negative academic identity, needs the same
  // externalize-and-find-a-win script as hate_subject.
  ['hate_subject',    /\b(always|never)\s+(been|was|am)\s+(bad|terrible|awful|hopeless|useless)\s+at\s+(this|math|maths|physics|science|chemistry|biology)\b/i],
  ['hate_subject',    /\b(always\s+)?(fail|failed)\s+at\s+(it|this|math|maths|physics|science|chemistry|biology)\b/i],
  ['hate_subject',    /\b(math|maths|physics|science|chemistry|biology|this)\s+(is|was)\s+(impossible|so\s+hard|too\s+hard|pointless)\s+for\s+me\b/i],
  ['confused',        /\b(really\s+confusing|this\s+is\s+confusing)\b/i],
  // P1: "makes no sense" was already covered elsewhere (masteryGate.ts's
  // explain-differently detector) but NOT the far more common phrasing
  // "this/that doesn't make sense" — the recovery guard, being the
  // preemptive classifier, needs it directly.
  ['confused',        /\b(this|that|it)\s+(doesn'?t|does\s+not)\s+make\s+(any\s+)?sense\b/i],
  ['confused',        /\bmakes?\s+no\s+sense\b/i],
  // PHASE 5 (Case G, R3 from Phase 4's own live-verification finding): every
  // sibling pattern in this file that negates a verb already allows an
  // optional intensifier between the subject and the negation — scared
  // (really|so), confused (so|really|totally), dont_understand at line 184
  // (really|just), dont_understand's "get it" variant at line 222 (still).
  // This was the one bare "I ... know" pattern with no such group at all, so
  // "I still don't know enough about the mole concept" and "I really don't
  // know how to start" matched nothing — not a new frame, just this pattern
  // catching up to a convention already used ten times elsewhere in this
  // file.
  ['dont_know',       /\bi\s+(?:really\s+|still\s+|just\s+)?(don'?t|do\s+not)\s+know\b/i],
  ['dont_know',       /\bi\s+know\s+nothing\b/i],
  // P1: bare "don't know" / "dunno" with no subject pronoun — a common
  // terse reply the "I ..." patterns above miss entirely. Whole-message
  // match only (never a substring) so "don't know if that's it, but..."
  // doesn't false-fire.
  ['dont_know',       /^(i\s+)?(don'?t|do\s+not|dunno)\s*(know)?[.!?…\s]*$/i],
  // "I can't say" / "can't say" as the whole message — a polite refusal
  // that means "I have no information", same treatment as dont_know.
  ['dont_know',       /^(i\s+)?can'?t\s+say[.!?…\s]*$/i],
  // P1: present-tense "don't get it" — the existing masteryGate.ts pattern
  // only matched the past tense ("didn't get it"); this is the far more
  // common live phrasing.
  ['dont_understand', /\b(i\s+)?(still\s+)?(don'?t|do\s+not)\s+get\s+(it|that|this)\b/i],
  ['forgot',          /\bi\s+(forgot|forget)\b|\bi\s+can'?t\s+remember\b/i],
  ['guessing',        /\bi(?:'?m|\s+was)\s+(just\s+)?guessing\b|\bthat\s+was\s+a\s+guess\b/i],
  // P1 (2026-08-22): past-tense "I guessed" / "I just guessed" — the
  // existing pattern above only matched the progressive ("I'm guessing" /
  // "I was guessing"), missing the equally common simple-past phrasing.
  // Same structural family, just the other tense of the same verb. Excludes
  // "guessed correctly/right" so a learner reporting a lucky-but-CORRECT
  // guess is not routed into the recovery script.
  ['guessing',        /\bi\s+(just\s+)?guessed\b(?!\s+(?:it\s+)?(?:correctly|right))/i],
  // P1 (2026-08-22): "I wasn't sure" — a direct admission of low-confidence
  // response, the same disclosure the 'guessing' script already rewards.
  ['guessing',        /\bi\s+wasn'?t\s+sure\b|\bi\s+was\s+not\s+sure\b/i],
  // P1 (2026-08-22): "<subject> is/are confusing me" — a structural family
  // ("the direction is confusing me", "this notation is confusing me",
  // "these steps are confusing me") rather than a subject-specific phrase
  // list. Anchored on the verb phrase "confusing me" itself, which is what
  // is invariant across the family; the existing "I'm confused" /
  // "this is confusing" patterns above cover the two other common shapes
  // but neither matches a NAMED subject as the confusing thing.
  ['confused',        /\b(?:is|are|was|were)\s+(?:really\s+|so\s+|totally\s+)?confusing\s+me\b/i],
  // "huh" / "huh?" — bare confusion, not a genuine question
  ['confused',        /^huh\s*[?!.…]*$/i],
  // "my mind is blank" / "mind blank" / "I'm blank" — unable to produce
  ['dont_know',       /\b(mind\s+(is\s+|went\s+)?blank|i(?:'?m|\s+am)\s+blank)\b/i],
  // "no idea" as a standalone short reply (not "I have no idea" which is STRONG)
  ['dont_know',       /^no\s+idea[.!?…\s]*$/i],
  // P1: a terse one-word interrogative echo, and ONLY that echo, is a
  // strong signal the learner doesn't have enough to answer with — not a
  // genuine substantive question (those come with content: "why does it
  // fall down?"). Whole-message match, optional punctuation only.
  ['dont_understand', /^(where|what|why|how)\s*[?!.…]*$/i],
]

/** Mild utterances only fire when the message is short enough to BE the
 * utterance (not merely contain it mid-paragraph). */
const MILD_MAX_LENGTH = 120

const REPHRASE_REQUEST_RE = /\b(explain|say|tell|show|try|put)\b.*?\b(differently|another\s+way|in\s+a\s+different\s+way|a\s+different\s+way)\b/i

function isRephraseRequest(text: string): boolean {
  return REPHRASE_REQUEST_RE.test(text)
}

/**
 * P0-3: structural "shouting" check — deliberately NOT a phrase list.
 * Requires enough alphabetic content (>= 8 letters) and multiple words so
 * a short, legitimately-capitalized answer ("NO", "TRUE", "DNA") can never
 * misfire; requires an uppercase ratio high enough that normal sentence
 * capitalization can't trigger it by accident.
 */
function isShoutingCaps(text: string): boolean {
  const letters = text.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 8) return false
  if (!/\s/.test(text.trim())) return false
  const upper = text.replace(/[^A-Z]/g, '')
  return upper.length / letters.length >= 0.7
}

/**
 * P0-3: repeated-identical-answer check — the learner's normalized message
 * matches their own immediately preceding message. Structural, not a
 * phrase list: any content can trigger it.
 *
 * An ACKNOWLEDGEMENT is not an answer, so repeating one is not repeating an
 * answer, and this check must not see it. That exclusion was already the
 * stated contract; it was implemented as a `length >= 4` proxy, and a length
 * floor is not a test for "is this an acknowledgement". It admitted every
 * acknowledgement longer than three characters — "got it", "continue",
 * "next", "understood", "makes sense" — while excluding only the shortest
 * ("go", "yes", "ok"). The consequence was a self-reinforcing stall on the
 * one input a delivery turn can produce:
 *
 *   delivery turn asks nothing ⇒ the learner can only acknowledge ⇒ a second
 *   acknowledgement is read as 'frustrated' ⇒ detectFailureState returns
 *   non-null ⇒ the route sets recoveryFired ⇒ advanceConversationState takes
 *   its `failed` branch, which returns BEFORE the acknowledgement transition
 *   ⇒ the phase steps DOWN instead of forward, and buildRecoveryBlock (which
 *   preempts everything and forbids new content) makes the tutor emit
 *   another holding line ⇒ the learner acknowledges again.
 *
 * So the acknowledgement transition was unreachable from exactly the state
 * that needs it. The floor is kept for genuinely short repeated content; the
 * acknowledgement class is now excluded by the predicate that owns it —
 * isLowSignalAcknowledgement(), the same one that drives the acknowledgement
 * transition in advanceConversationState(). Sharing that single owner is what
 * makes it impossible for the two to disagree about what an acknowledgement
 * is, which is the property whose absence produced this bug.
 */
/**
 * A REQUEST FOR THE NEXT QUESTION IS NOT AN ANSWER, SO REPEATING ONE IS NOT
 * REPEATING AN ANSWER.
 *
 * ── THE DEFECT, TRACED END TO END IN PRODUCTION ─────────────────────────────
 * phys.mech.viscosity, captured turn by turn on the real account. The learner
 * asked for a question, was taught, and asked again — the ordinary rhythm of a
 * lesson. On the SECOND identical request:
 *
 *   detectFailureState('ok give me the next question',
 *                      'ok give me the next question')  ->  'frustrated'
 *
 * which the route turns into `recoveryFired`, which
 * `advanceConversationState` reads as `failed`:
 *   · consecutiveFailures + 1
 *   · phaseDown()
 *   · the memory path suppressed ('Recovery mode')
 *
 * MAX_CONSECUTIVE_FAILURES is 3, so the third such turn exhausts the concept
 * budget, `isConceptClosed` returns true, and the lesson FINALISES. Measured:
 * the viscosity lesson ended 68 seconds in, on turn 4, with checkCorrect 0 and
 * practiceCorrect 0 — on a turn where the learner had just answered correctly
 * — and every later turn served the completion text forever
 * ("what's one thing you notice or find surprising…", provider=memory,
 * llmCallCount=0). The learner is shown the door and then talked at in a loop.
 *
 * This is the mechanism behind every "frozen at DEMONSTRATE with 0/0" row the
 * engine sweep reported: the ladder was never stuck, the LESSON WAS OVER.
 *
 * ── THE FIX IS THIS FUNCTION'S OWN REASONING, APPLIED ONCE MORE ─────────────
 * `isRepeatedAnswer` already excludes acknowledgements, and the classifier
 * above already excludes recovery utterances, both on the ground that they are
 * not ANSWERS. A request to be given a question is not an answer either. It is
 * the most ordinary thing a willing learner types, and typing it twice means
 * they are still willing — the opposite of what 'frustrated' asserts.
 *
 * Deliberately narrow: it matches a request for a QUESTION/PROBLEM/EXAMPLE, or
 * a bare "next"/"carry on" form. It does NOT match a repeated substantive
 * answer, which still falls through to 'frustrated' exactly as before, and it
 * does not match a request to be re-explained — `isRephraseRequest` owns that,
 * and repeating it IS a signal worth acting on.
 */
const NEXT_ITEM_REQUEST_RE =
  /^(?:ok(?:ay)?|right|sure|yes|yeah|alright)?[\s,.]*(?:can\s+you\s+|could\s+you\s+|please\s+|lets?\s+|i(?:'|’)?d\s+like\s+|i\s+want\s+)*(?:give\s+me|gimme|ask\s+me|show\s+me|do|try|have|get)?\s*(?:me\s+)?(?:the\s+|a\s+|an\s+|one\s+|another\s+|some\s+|more\s+|next\s+|other\s+)*(?:more\s+|next\s+|new\s+|practice\s+|practise\s+|another\s+)*(?:question|questions|problem|problems|example|examples|exercise|exercises|one)\b[\s\S]{0,40}$/i

/** A bare "next" / "keep going" style nudge, with no content of its own. */
const BARE_NEXT_RE = /^(?:ok(?:ay)?[\s,.]*)?(?:next|another|more|again|continue|carry\s+on|go\s+on|keep\s+going)\s*(?:please|one|question)?[\s.!?]*$/i

function isNextItemRequest(text: string): boolean {
  const t = text.trim()
  if (t.length > MILD_MAX_LENGTH) return false
  return NEXT_ITEM_REQUEST_RE.test(t) || BARE_NEXT_RE.test(t)
}

function isRepeatedAnswer(message: string, priorUserMessage: string | null | undefined): boolean {
  if (!priorUserMessage) return false
  const normalize = (s: string) => s.trim().toLowerCase().replace(/['’]/g, '').replace(/[.,!?…\s]+/g, ' ').trim()
  const a = normalize(message)
  const b = normalize(priorUserMessage)
  if (a.length < 4 || a !== b) return false
  if (isNextItemRequest(message)) return false
  return !isLowSignalAcknowledgement(message)
}

/**
 * priorUserMessage (optional, default undefined): the learner's immediately
 * preceding message, when the caller has it — enables the repeated-answer
 * check above. Omitting it (every pre-existing call site) reproduces the
 * exact prior behavior; no existing caller's result changes.
 */
export function detectFailureState(message: string, priorUserMessage?: string | null): FailureStateKey | null {
  const text = message.trim()
  for (const [key, re] of STRONG_PATTERNS) {
    if (re.test(text)) return key
  }
  if (isShoutingCaps(text)) return 'frustrated'
  // A RECOVERY UTTERANCE is not an answer either, so repeating one is not
  // repeating an answer — the same reasoning that already excludes
  // acknowledgements from isRepeatedAnswer(), applied to the other input
  // family that is not an answer. The mild classification therefore runs
  // BEFORE the repeated check rather than after it.
  //
  // Ordering was the whole defect. "I don't know" said twice — the single
  // most likely behaviour of a genuinely stuck learner — matched
  // isRepeatedAnswer first and returned 'frustrated', so it never reached
  // its own classifier. 'frustrated' is not in DONT_KNOW_SIGNAL_KEYS, so
  // consecutiveDontKnows did not increment on the second signal, and the
  // Rule 2 escalation that ends discovery and forces explanation after two
  // consecutive signals could not fire for the learner who needs it most.
  // It also re-inferred an internal state the learner had just stated,
  // against foundations/04 P20 (stated internal state is ground truth,
  // accepted instantly, never re-inferred) — a law this module's own header
  // declares.
  //
  // Genuinely repeated CONTENT is unaffected: a repeated substantive answer
  // matches no pattern here and still falls through to 'frustrated' below.
  if (text.length <= MILD_MAX_LENGTH && !isRephraseRequest(text)) {
    for (const [key, re] of MILD_PATTERNS) {
      if (re.test(text)) return key
    }
  }
  if (isRepeatedAnswer(text, priorUserMessage)) return 'frustrated'
  return null
}

/** The authored scripts, foundations/01 §3 — validate, shrink, bank a win.
 * Each entry is the general script; the lesson-one delta swaps in
 * first-lesson/05's tighter version where one exists. The preDemonstration
 * delta (Rule 2 escalation) swaps in when NOTHING has been demonstrated
 * for this concept yet — before demonstration there is nothing for the
 * learner to answer from, so shrinking to a smaller QUESTION is still a
 * question they cannot answer; the only correct move is to show/explain. */
const SCRIPTS: Record<FailureStateKey, { general: string; lessonOne?: string; preDemonstration?: string }> = {
  dont_know: {
    general:
      'Validate lightly ("fair enough — let\'s make it smaller"), then SHRINK ' +
      'the open question into a two-choice question. Any answer to the ' +
      'two-choice form — right or wrong — gets banked warmly ("there you go") ' +
      'and you resume one step below where the block occurred. Never press ' +
      'them to "just think harder".',
    lessonOne:
      'Shrink all the way to ECHO — not even a two-choice: "no problem — say ' +
      'it with me: ..." Echo cannot fail. A question arrived too early; do ' +
      'not ask another one this turn.',
    preDemonstration:
      '"I don\'t know" BEFORE anything has been shown means the question ' +
      'arrived before the teaching — that is the lesson\'s fault, never ' +
      'theirs. Do NOT shrink to another question: there is nothing yet for ' +
      'them to answer from. Say "of course — I haven\'t shown you yet", then ' +
      'EXPLAIN the idea directly with one concrete demonstration or worked ' +
      'example. No questions this turn.',
  },
  dont_understand: {
    general:
      'Say "okay — let\'s come at it differently" with zero surprise or ' +
      'disappointment, then CHANGE REPRESENTATION entirely — a different ' +
      'channel (concrete example, demonstration, story), NEVER the same ' +
      'explanation repeated louder or slower.',
    lessonOne:
      'The only legal move is BACK TO DEMONSTRATION — show it again, slower, ' +
      'exaggerated. No re-explanation of any kind: a beginner cannot ' +
      'triangulate between two verbal explanations.',
  },
  confused: {
    general:
      'Normalize first ("that\'s the normal feeling right before this clicks"), ' +
      'then localize with EXACTLY ONE boundary question ("is it the first part ' +
      'or the second part that\'s fuzzy?"). Re-teach only the located part.',
    lessonOne:
      'Normalize and SKIP localization — a beginner cannot answer "which ' +
      'part?" about a whole they don\'t have. Go back one step silently and ' +
      'make the step smaller.',
    preDemonstration:
      'Normalize and SKIP localization — nothing has been demonstrated yet, ' +
      'so there is no "which part?" to locate. Demonstrate the idea directly, ' +
      'one concrete step, smaller than whatever was just attempted. No ' +
      'questions this turn.',
  },
  forgot: {
    general:
      'Say "totally normal — it comes back fast" as fact, then CUED RETRIEVAL: ' +
      'give back the encoding context ("remember the pizza-slices picture?") ' +
      'and let THEM retrieve. Never re-teach from zero — storage survives; ' +
      'access is what weakened.',
  },
  guessing: {
    general:
      'REWARD THE DISCLOSURE LOUDLY: "thank you for telling me — that\'s ' +
      'exactly the useful thing to say." Their honesty is worth more than a ' +
      'lucky guess. Then step back one level: the question outran the ' +
      'teaching — that is the lesson\'s fault, never theirs.',
  },
  too_hard: {
    general:
      'Say "yeah — let\'s split it" (never contest the claim), then split off ' +
      'ONE 30-second sub-step and prove it\'s doable. When it lands: "that\'s ' +
      'the hardest part — you just did it."',
    lessonOne:
      'Split to CO-PRODUCTION: do it WITH them, voices overlapping, fading ' +
      'within the same attempt ("say it with me... again... now you finish ' +
      'it"). The proof arrives inside one breath.',
  },
  give_up: {
    general:
      'Say "okay — I\'ve got this one." NO pep talk. Hard stop on their ' +
      'attempt: YOU perform the task once, thinking aloud, with zero pressure ' +
      'to participate. Do not hand it back this turn. Insisting they try ' +
      'again right now is the fastest way to convert a bad moment into a ' +
      'shutdown.',
    lessonOne:
      'Teaching is over for this session: perform the skill once more with ' +
      'visible enjoyment, bank any tiniest win available, and close warmly ' +
      'NOW.',
  },
  hate_subject: {
    general:
      'Validate and externalize in one sentence: "that\'s a lot of bad history ' +
      'talking — this isn\'t going to be that." Target the PAST TEACHING, ' +
      'never them and never the subject as unfixable. Then find the smallest, ' +
      'most private win available right now. NO speech about why the subject ' +
      'is actually great — a first success is the only counter-argument that ' +
      'works.',
  },
  scared: {
    general:
      'NEVER say "don\'t be scared". Name it lightly, normalize it, and shrink ' +
      'the stakes to zero OUT LOUD: "lots of people feel nervous here — good ' +
      'news, there\'s nothing to get wrong today." Then demonstrate more and ' +
      'ask less; go slower, lower, quieter.',
  },
  stupid: {
    general:
      'Immediate calm contradiction WITH EVIDENCE, never reassurance: point to ' +
      'a specific thing they did minutes ago that contradicts it ("people who ' +
      'can\'t do this don\'t solve what you solved two minutes ago"). Then a ' +
      'guaranteed win within 60 seconds. Reassurance ("no you\'re not!") is an ' +
      'opinion and gets discarded; evidence sticks.',
    lessonOne:
      'Evidence-contradiction, one unfailable win, then END EARLY on that win ' +
      '— this utterance spends the whole session\'s affect budget by itself.',
  },
  cant: {
    general:
      'Handle physically, not verbally: CO-PRODUCTION immediately ("we\'ll do ' +
      'it together — you don\'t have to do anything alone yet"). Arguing with ' +
      '"I can\'t" grants it a debate; thirty seconds of doing it together ' +
      'hands them the counter-evidence: "you just did."',
  },
  // P1: the complaint is about the METHOD (Socratic questioning), not the
  // concept — do not defend the method, do not ask a clarifying question
  // about the complaint itself (that would BE another question). Acknowledge
  // once, then switch immediately to direct demonstration/explanation.
  too_many_questions: {
    general:
      'Acknowledge it plainly and briefly ("fair — let\'s switch it up"), then ' +
      'STOP asking questions. Teach the next piece directly: show or explain ' +
      'it outright, worked-example style, with no question attached to the ' +
      'end of your response. Do not ask them to predict, guess, or infer ' +
      'anything they have not already been taught — that is what triggered ' +
      'this. Earn the right to ask again only after at least one full turn ' +
      'of pure demonstration.',
    lessonOne:
      'STOP asking anything this turn and the next. Demonstrate the idea once, ' +
      'plainly, start to finish, with zero questions attached. A beginner who ' +
      'says this has been asked to infer something before being shown it.',
  },
  // P0-3: frustration (anger/exasperation at the conversation, not honest
  // struggle with the content) — never validate-and-shrink like dont_know;
  // acknowledge briefly, apologize if the tutor caused it, then switch
  // strategy outright. The forbidden move is repeating the same question
  // (verbatim or rephrased) — that IS the loop that caused this.
  frustrated: {
    general:
      'Acknowledge it briefly and plainly ("sorry — I hear you, let\'s try this ' +
      'differently"). A short apology is appropriate if you have been asking ' +
      'the same or a similar question repeatedly; do not over-apologize or ' +
      'dwell on it. Then change strategy immediately: do NOT ask the same ' +
      'question again in any form — not verbatim, not rephrased, not ' +
      'simplified. Switch to a direct demonstration or explanation with a ' +
      'concrete example instead, with no question attached to the end of ' +
      'your response. Tone: calm and steady — never defensive, never matching ' +
      'their intensity, never chiding them for how they said it.',
    lessonOne:
      'Apologize once, briefly, then STOP asking anything this turn and the ' +
      'next. Demonstrate the idea plainly, start to finish. A beginner who is ' +
      'frustrated this early needs proof the friction is over, not another ' +
      'attempt at the same question.',
  },
}

/**
 * Rule 2 escalation membership — the SINGLE owner of "does this failure
 * state count toward ConversationState.consecutiveDontKnows?" (the counter
 * decideNextMove() reads to end discovery after two consecutive signals and
 * force explanation). Previously this membership was decided inline, twice,
 * in route.ts — the same decision in two places. 'confused' is included:
 * "I'm confused" is an explain-me signal exactly like "I don't know", and
 * two consecutive confusion signals must end questioning the same way.
 */
const DONT_KNOW_SIGNAL_KEYS: ReadonlySet<FailureStateKey> = new Set([
  'dont_know', 'dont_understand', 'confused',
])

export function isDontKnowSignal(key: FailureStateKey | null): boolean {
  return key !== null && DONT_KNOW_SIGNAL_KEYS.has(key)
}

/**
 * The RECOVERY block — injected LAST, preempting every other instruction
 * (decision-engine/03 §0: the teaching state is irrelevant; foundations/04
 * P5: no content enters a flooded mind).
 *
 * sessionFailureCount drives escalation so the same script never repeats
 * indefinitely (decision-engine/05: per-failure ladders, one-dimension-per-rung).
 *
 * preDemonstration: true when the conversation state machine has not yet
 * recorded a demonstration for this concept (ConversationState.demonstrated
 * === false) — scripts with a preDemonstration delta then explain/show
 * instead of shrinking to another question the learner cannot answer.
 * Lesson-one deltas outrank it (they already forbid questions and shrink
 * further). Optional with default false so pre-existing callers keep their
 * exact prior behavior.
 */
export interface RecoveryScopeOptions {
  /**
   * The title of the concept an OFF-LESSON EXCURSION is currently teaching
   * (`teaching/excursion.ts`), or null/absent on an ordinary lesson turn.
   *
   * WHY RECOVERY NEEDS THIS. Recovery owns HOW to answer distress, and that
   * is untouched. But two of its escalation rungs also answer a question that
   * is NOT theirs — WHICH concept to teach next: "we'll come back to this and
   * move to a simpler related point" (2+ failures) and "close this concept for
   * today ... return to it next session" (4+). On a lesson turn those are
   * correct. Mid-excursion they are the exact opposite of correct, and were
   * observed in production reading, verbatim, as:
   *
   *   learner: "I still don't understand it"
   *   tutor:   "I hear you ... let's pause on that for today. Next time, we
   *             will return to our lesson on scalar and vector quantities."
   *
   * The learner had asked for that side concept two turns earlier and was
   * still asking. Confusion about a thing you asked to learn is a reason to
   * TEACH IT AGAIN, never a reason to take it away.
   */
  excursionTargetTitle?: string | null
}

export function buildRecoveryBlock(
  key: FailureStateKey,
  isFirstLesson: boolean,
  sessionFailureCount = 0,
  preDemonstration = false,
  scope?: RecoveryScopeOptions,
): string {
  const script = SCRIPTS[key]
  const body = (isFirstLesson && script.lessonOne) ? script.lessonOne
    : (preDemonstration && script.preDemonstration) ? script.preDemonstration
    : script.general

  // S4 (Runtime Redesign Mission Part 3, closes design-report gap G3):
  // "recovery must escalate, never repeat identical." Before this rung,
  // sessionFailureCount 0 and 1 both fell through to escalation='', so two
  // consecutive same-key failures (the single most common recovery pattern
  // — "I don't know" said twice in a row) produced a byte-identical
  // RECOVERY block both times. This rung-1 tier is the smallest change that
  // makes every failure-count value produce genuinely different text: it
  // does not change WHAT the tutor must do (still validate-and-shrink, per
  // the base script), only ADDS an explicit variation directive so a second
  // occurrence of the same struggle is never handled with the identical
  // words as the first. S1's V-REC-REPEAT (kernel/verifier/history.ts) is
  // the detector that would have caught a violation of this; this rung is
  // the source-side fix that makes the violation structurally rarer.
  // MID-EXCURSION the rungs keep escalating VARIETY but may never escalate
  // to abandonment: the concept the learner asked for is not the runtime's to
  // withdraw. The affect law is untouched — still validate, still shrink,
  // still no new content, still no question-answering-a-question.
  const excursionTarget = scope?.excursionTargetTitle?.trim() || null
  let escalation = ''
  if (excursionTarget) {
    const target = `"${excursionTarget}"`
    escalation =
      `\n- STAY ON ${target.toUpperCase()} (an off-lesson question the learner ` +
      'asked for is open — see the EXCURSION DIRECTIVE): being confused about ' +
      'it is a reason to teach it again, NOT a reason to leave it. Do NOT ' +
      'defer, postpone or park it, do NOT promise it for another day or another ' +
      'session, do NOT wrap up the session, and do NOT pivot to the paused ' +
      'lesson or to any of its points.\n' +
      `- Change representation again — a different concrete example, a different ` +
      `everyday object, a smaller piece of ${target} — then ask whether they ` +
      'still have a doubt about it. Only the learner saying they understand ' +
      'ends this, and until then the answer to confusion is another explanation.'
    if (sessionFailureCount >= 2) {
      escalation +=
        '\n- REPEATED STRUGGLE (2+ this session): do not reuse any wording, ' +
        'example or analogy already used for it. Shrink to the single smallest ' +
        'piece that can be shown, and show it — no questions this turn beyond ' +
        'the doubt check above.'
    }
  } else if (sessionFailureCount >= 4) {
    escalation =
      '\n- AFFECT BUDGET EXHAUSTED (4+ failures this session): Close this concept ' +
      'for today. Acknowledge the struggle warmly, tell the learner you will return ' +
      'to it next session, and pivot immediately to something they can succeed at ' +
      'right now. Do NOT attempt another explanation or question on this topic.'
  } else if (sessionFailureCount >= 2) {
    escalation =
      '\n- REPEATED STRUGGLE (2+ failures this session): Stop ALL questions this ' +
      'turn. Do not offer a two-choice question. Validate once ("I hear you — this ' +
      'one is stubborn"), give a SHORT demonstration of the concept yourself (show, ' +
      'don\'t ask), say "we\'ll come back to this" and move to a simpler related point.'
  } else if (sessionFailureCount >= 1) {
    escalation =
      '\n- SECOND OCCURRENCE THIS SESSION: this struggle already came up once ' +
      'today. Do not reuse the same wording, the same example, or the same ' +
      'analogy you used last time — vary the approach even though the goal ' +
      '(validate, shrink, bank one win) stays the same.'
  }

  return (
    '\n\nRECOVERY — PREEMPTS EVERYTHING ABOVE (the student just voiced a ' +
    'failure state; their stated state is ground truth — never argue with it, ' +
    'never second-guess it, never answer it with a question):\n' +
    `- ${body}\n` +
    '- No new content this turn. No assessment. No calibration questions. ' +
    'One goal only: validate, shrink, and bank one small genuine win.\n' +
    '- Tone: calm, warm, unhurried. Do not become MORE energetic or jokey — ' +
    'matched energy; playfulness on struggle reads as mockery.' +
    escalation
  )
}
