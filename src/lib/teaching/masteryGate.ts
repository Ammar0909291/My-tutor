/**
 * Mastery Gate — server-authoritative lesson-completion authority.
 *
 * Root cause this module fixes: lesson completion used to be decided by
 * the LLM ([LESSON_COMPLETE] emitted whenever the student said "got it" /
 * "done" / "next topic"), parsed client-side, and written straight to
 * curriculum progress — a chatbot flow, not a teacher. Conversation
 * length, acknowledgements, and autonomy requests could all complete a
 * lesson with zero verified learning.
 *
 * The new contract (single authority, no other paths):
 *
 *   A lesson completes ONLY when MasteryVerified(state) — the learner has
 *   answered ≥1 CHECK question and ≥2 PRACTICE questions correctly for
 *   this concept (the conversation state machine's own evidence counters,
 *   fed by the graded SIGNAL tag on real answers). Everything else —
 *   turn count, elapsed time, "got it", "ok", "next", button presses —
 *   is acknowledgement, not evidence, and can never complete a lesson.
 *
 * Enforcement is server-side: an unauthorized [LESSON_COMPLETE] tag is
 * stripped from the response before it is persisted or returned, so the
 * client's completion flow (which fires off the tag) structurally cannot
 * run without mastery. The learner can still explicitly choose
 * "Skip Anyway" in the UI — that is a visible, deliberate act, never a
 * silent skip.
 *
 * Pure module: no DB, no I/O — everything here is unit-testable.
 */

import { repliesWithQuestion, stripAddressTokens } from './conversationState'
import type { ConversationState } from '@/lib/teaching/conversationState'

// ── Mastery definition (Bug 3 / Bug 12) ──────────────────────────────────────

/** Evidence thresholds: one verified-correct CHECK answer and two
 * verified-correct PRACTICE answers — the same gates the phase ladder
 * uses to reach TRANSFER. Counters are high-water marks (a later failure
 * drops the phase but never erases earned evidence), so mastery, once
 * verified, is stable within the concept. */
export const MASTERY_CHECK_REQUIRED = 1
export const MASTERY_PRACTICE_REQUIRED = 2

export function masteryVerified(state: ConversationState | null): boolean {
  if (!state) return false
  return (
    state.correctAtCheck >= MASTERY_CHECK_REQUIRED &&
    state.correctAtPractice >= MASTERY_PRACTICE_REQUIRED
  )
}

/**
 * Strict mastery: requires VERIFIED evidence only — signals that passed
 * independent cross-checking (signalVerification.ts). Used by the
 * completion gate (gateLessonCompletion) so lesson completion cannot be
 * authorized by contradicted or suspicious evidence.
 *
 * Falls back to the regular counters when verified counters are absent
 * (persisted state from before this feature was added), so existing
 * sessions are not broken.
 */
export function masteryVerifiedStrict(state: ConversationState | null): boolean {
  if (!state) return false
  const hasVerifiedCounters = (state.verifiedCorrectAtCheck ?? 0) > 0 || (state.verifiedCorrectAtPractice ?? 0) > 0
  const hasContradictions = (state.signalContradictions ?? 0) > 0
  // THE LEGACY FALLBACK MUST NOT LAUNDER AN INVENTED ANSWER KEY.
  //
  // The fallback below exists for state persisted before verified counters
  // existed. A session graded entirely against model-invented keys reaches it
  // by a different road — zero verified counters, zero contradictions — and
  // would then certify on the plain counters, defeating the whole point of
  // excluding those grades. Measured on this exact shape while writing the
  // fix, before it shipped.
  //
  // A session that has RECORDED an unauthored grade is demonstrably not a
  // legacy session, since the field is being written, so declining the
  // fallback here cannot reopen the case the fallback was written for.
  const hasUnauthoredKeys = (state.unauthoredKeyGrades ?? 0) > 0
  if (!hasVerifiedCounters && !hasContradictions && !hasUnauthoredKeys) {
    return masteryVerified(state)
  }
  const vCheck = state.verifiedCorrectAtCheck ?? 0
  const vPractice = state.verifiedCorrectAtPractice ?? 0
  return (
    vCheck >= MASTERY_CHECK_REQUIRED &&
    vPractice >= MASTERY_PRACTICE_REQUIRED
  )
}

/**
 * THE SINGLE AUTHORITY ON "HAS THIS LEARNER MASTERED THIS CONCEPT?"
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Three components used to answer this question independently, and they
 * disagreed on reachable states (OWNERSHIP_CENSUS_2026-09-01 §B2):
 *
 *   completion gate  gateLessonCompletion  ->  masteryVerifiedStrict
 *   client payload   buildMasterySummary   ->  masteryVerified && !laundered
 *   permanent record conceptOutcome        ->  hasDemonstratedMastery && !laundered
 *
 * Measured live through the REAL fold (not a raw grid): a learner reaching
 * TRANSFER whose CHECK grade was CONTRADICTED (check 1 / practice 2 /
 * verifiedCheck 0 / contradictions 1 / keys 0) had payload.verified = true and
 * the record = 'mastered', while the completion gate correctly REFUSED
 * [LESSON_COMPLETE]. The learner was told they had mastered a concept the gate
 * would not certify — success-condition #7's exact shape.
 *
 * ── THE RESOLUTION ──────────────────────────────────────────────────────────
 * There is now ONE function. `gateLessonCompletion`, `buildMasterySummary`
 * (the payload), and `conceptOutcome` (the permanent record) all consult it,
 * so they cannot disagree for ANY state, reachable or not — the guarantee is
 * structural, not a coincidence over the states someone happened to test.
 *
 * It is `masteryVerifiedStrict` — the tightest of the three, and already the
 * completion authority. Routing the other two through it is provably
 * MONOTONE-TIGHTER: `strict ⟹ masteryVerified && !laundered` (the old payload)
 * and `strict ⟹ hasDemonstratedMastery && !laundered` (the old record), so a
 * lesson the two authorities used to certify still certifies UNLESS the
 * completion gate would have refused it — in which case the old "mastered" was
 * a false claim. No ordinary, cleanly-graded lesson changes: a genuine
 * check-1/practice-2 with clean or absent verification still verifies through
 * the strict fallback (see masteryVerifiedStrict).
 *
 * `hasDemonstratedMastery` (conceptBudget.ts) is deliberately NOT folded into
 * this: it answers a DIFFERENT question — "should this concept stop being
 * actively taught" — which is legitimately satisfied by mastery OR budget
 * exhaustion, and must stay separate so a budget-exhausted concept still
 * closes without being recorded as mastered.
 */
export function conceptMasteryVerdict(state: ConversationState | null): boolean {
  return masteryVerifiedStrict(state)
}

// ── Bug 2: acknowledgements are not evidence ─────────────────────────────────

/**
 * Bare acknowledgements ("got it", "ok", "next", "thanks", "👍", …) must
 * never advance mastery. The LLM is forbidden from emitting a SIGNAL for
 * non-answers, but prompt rules are advisory — this is the deterministic
 * guard: when the learner's message is a bare acknowledgement, any parsed
 * SIGNAL for the turn is discarded before it can touch evidence,
 * TopicProgress, or the phase ladder.
 *
 * Detection is whole-message (trimmed, punctuation-tolerant), never
 * substring — "ok, but why does the moon not fall?" is a real question
 * and must NOT match.
 */
const ACK_PHRASES = [
  'got it', 'ok', 'okay', 'k', 'kk', 'fine', 'sure', 'yes', 'yep', 'yeah',
  'no problem', 'continue', 'go', 'go on', 'next', 'next topic', 'next lesson',
  'thanks', 'thank you', 'thx', 'nice', 'cool', 'great', 'good', 'alright',
  'understood', 'i understand', 'i got it', 'makes sense', 'done',
  'понял', 'поняла', 'хорошо', 'ок', 'да', 'дальше', 'спасибо', 'понятно',
  'samajh gaya', 'samajh gayi', 'theek hai', 'accha', 'haan', 'aage',
]

const EMOJI_ONLY_RE = /^[\s\p{Emoji_Presentation}\p{Extended_Pictographic}👍👌🙏✅]+$/u

export function isBareAcknowledgement(message: string): boolean {
  const text = message.trim().toLowerCase()
  if (!text) return false
  if (EMOJI_ONLY_RE.test(message.trim())) return true
  // Strip trailing punctuation/emoji for the phrase comparison.
  const normalized = text
    .replace(/[\s!.…,;:)\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]+$/u, '')
    .replace(/^[\s(]+/, '')
  if (!normalized) return true
  return ACK_PHRASES.includes(normalized)
}

// ── Bug 1: the completion gate itself ────────────────────────────────────────

export interface CompletionGateResult {
  /** Text with the tag removed when completion was NOT authorized. */
  cleanText: string
  /** The tag was present and mastery evidence allows completion. */
  authorized: boolean
  /** The tag was present but was stripped (no mastery evidence). */
  suppressed: boolean
}

export interface CompletionGateOptions {
  /**
   * True when the Teaching Engine has an OFF-LESSON CONCEPT EXCURSION open
   * (`teaching/excursion.ts`). The lesson is paused, so this turn cannot
   * finish it — see the rule inside gateLessonCompletion.
   *
   * Optional and defaulting to false, so every existing caller keeps exactly
   * its previous behaviour; only a caller that HAS excursion state can pause
   * the gate, and a caller that forgets it fails toward the old, evidence-only
   * behaviour rather than toward silently completing.
   */
  excursionActive?: boolean
}

const LESSON_COMPLETE_RE = /\s*\[LESSON_COMPLETE\]\s*/gi

/**
 * The single completion chokepoint. Whatever made the model emit
 * [LESSON_COMPLETE] — "got it", autonomy request, hallucinated
 * confidence — the tag survives to the client ONLY when the state
 * machine's own evidence counters say mastery is verified.
 * Fail-closed: a missing/null state can never authorize completion.
 */
/**
 * THE LEARNER JUST ANSWERED A QUESTION THE TUTOR ASKED IN PROSE.
 *
 * `answersPendingQuestion` (route.ts) is `mcqGradeHoisted !== null` — keyed on
 * the MCQ grade, so it recognises an answer to a WIDGET question and is blind
 * to an answer to a PROSE one. Measured in production: the tutor asked which
 * was larger on a winding road, the learner answered correctly and with
 * reasoning, and D1-MEMORY-HIT served a stored essay (llmCallCount=0) instead
 * of reacting. They had to ask "was my answer right?" to get anything back.
 *
 * Composed from the two detectors that already exist — `repliesWithQuestion`
 * (conversationState.ts, already used by checkBrainCompliance) and
 * `isBareAcknowledgement` above. Deliberately NOT a new detector, and
 * deliberately not a change to `answersPendingQuestion`, whose MCQ meaning is
 * load-bearing elsewhere.
 *
 * WHY IT DOES NOT SWALLOW "why?" — a question is not an answer, and D4b
 * (ANSWER-STUDENT-FIRST) already owns that case and outranks memory serving on
 * its own. This guard is only about the OTHER half of that rule: the learner
 * who answered rather than asked. D4b's trigger set is untouched.
 *
 * Knows nothing about phases, mastery counters or grading — it decides only
 * whether a static asset may serve on a turn that owes a reaction.
 */
export function answersProseQuestion(input: {
  /** The tutor's previous message, as the learner saw it. */
  lastAssistantText: string | null | undefined
  /** The learner's message this turn. */
  learnerMessage: string
  /**
   * A canonical MCQ was already on the learner's screen, awaiting an answer.
   *
   * THE RESIDUAL THIS CLOSES, measured in production after the first version of
   * this guard shipped. On a mastery-gate turn the QUESTION lives in the
   * widget and the prose is only a lead-in — "Now let's tackle our first
   * practice question to lock this in." carries no question mark, so
   * `repliesWithQuestion` correctly reported false and this guard could not
   * see that anything had been asked. The learner then answered
   * "A. 400 over 80 is 5 for the speed, and the velocity is 0 because they end
   * at the start line"; `gradeMcqAnswer` refused to parse it
   * (`{chosenIndex: null, correct: null}`), so `answersPendingQuestion` was
   * false too — and the stored essay served.
   *
   * Both guards missed the same turn for two different reasons. This is the
   * one that was structurally blind: the tutor HAD asked, just not in prose.
   *
   * Grading is untouched — an unparseable answer stays ungraded and no mastery
   * counter moves. This only stops a STATIC asset serving on a turn that owes
   * the learner a reaction.
   */
  pendingQuestionOnScreen?: boolean
}): boolean {
  try {
    const prev = input.lastAssistantText
    const tutorAsked = input.pendingQuestionOnScreen === true
      || (!!prev && repliesWithQuestion(prev))
    if (!tutorAsked) return false
    const msg = input.learnerMessage?.trim() ?? ''
    if (msg.length === 0) return false
    // A receipt is not an answer — "ok" after a question keeps its existing
    // behaviour, which the readiness guard already handles at a mastery gate.
    if (isBareAcknowledgement(msg)) return false
    // A question is not an answer. D4b owns it.
    if (msg.endsWith('?')) return false
    return true
  } catch {
    // A guard must never break a turn; the pre-existing behaviour is the safe
    // outcome.
    return false
  }
}

export function gateLessonCompletion(
  text: string,
  state: ConversationState | null,
  opts?: CompletionGateOptions,
): CompletionGateResult {
  const hasTag = /\[LESSON_COMPLETE\]/i.test(text)
  if (!hasTag) return { cleanText: text, authorized: false, suppressed: false }
  // THE LESSON IS PAUSED, SO IT CANNOT FINISH.
  //
  // Production defect this closes: mid-excursion the learner said "I still
  // don't understand it" and the app rendered "That's SI Units and Measurement
  // finished — nice work" with the Viscosity figure still on screen. The tag
  // was authorized because this gate reads ONE thing — the lesson concept's
  // accumulated mastery counters — and had no idea a side question was open.
  // Those counters are not evidence about THIS turn, and (before the
  // attribution fix at the fold site) an excursion turn's own SIGNAL could
  // even raise them, so a detour could manufacture the mastery that completed
  // the lesson the learner had walked away from.
  //
  // Checked BEFORE the evidence test, so no amount of evidence overrides it,
  // and it strips rather than passes — the client's completion PATCH is driven
  // by this tag, so removing it prevents the StudentProgress/TopicProgress
  // transition itself rather than hiding it. A lesson genuinely completed
  // BEFORE the excursion opened is untouched: that completion is already
  // persisted and nothing here rewrites it.
  if (!opts?.excursionActive && conceptMasteryVerdict(state)) {
    return { cleanText: text, authorized: true, suppressed: false }
  }
  return {
    cleanText: text.replace(LESSON_COMPLETE_RE, ' ').replace(/\s+$/g, '').trim(),
    authorized: false,
    suppressed: true,
  }
}

/**
 * P0-3 (School Mode): School has no conversation-state machine and so
 * cannot run the full evidence-based gateLessonCompletion above — but a
 * bare acknowledgement ("got it", "next", "ok") must still never be able
 * to authorize completion on its own, regardless of what the model
 * emitted. Extracted out of route.ts's inline School-mode branch into a
 * named, pure, tested function (Phase 5: complete the existing guard
 * rather than leave it as untestable inline logic) — narrower than
 * gateLessonCompletion (no evidence check, just the acknowledgement
 * guard), reusing the exact same isBareAcknowledgement() and
 * LESSON_COMPLETE_RE this file already defines.
 */
export function stripCompletionOnBareAcknowledgement(text: string, learnerMessage: string): string {
  if (!/\[LESSON_COMPLETE\]/i.test(text)) return text
  if (!isBareAcknowledgement(learnerMessage)) return text
  return text.replace(LESSON_COMPLETE_RE, ' ').replace(/\s+$/g, '').trim()
}

// ── A.1: repeated mastery detection (natural lesson conclusion) ─────────────

/**
 * Detects when the learner has exceeded mastery thresholds and continues
 * answering correctly in TRANSFER — the lesson should conclude naturally
 * rather than continuing to generate more transfer questions indefinitely.
 *
 * Returns true when:
 *   - mastery is verified (CHECK + PRACTICE gates passed)
 *   - the phase is TRANSFER
 *   - correctAtPractice exceeds the required threshold (surplus evidence)
 *
 * The caller injects a directive prompting the LLM to wrap up; the gate
 * itself (gateLessonCompletion) still authorizes the [LESSON_COMPLETE] tag.
 */
export function shouldConcludeNaturally(state: ConversationState | null): boolean {
  if (!state) return false
  if (!masteryVerified(state)) return false
  return state.phase === 'TRANSFER' && state.correctAtPractice > MASTERY_PRACTICE_REQUIRED
}

export function buildNaturalConclusionBlock(): string {
  return (
    '\n\nNATURAL CONCLUSION — the student has demonstrated mastery: they passed ' +
    'the check and practice gates and answered additional transfer questions ' +
    'correctly. Wrap up this lesson NOW: briefly celebrate what they achieved, ' +
    'give one sentence on what comes next, and append [LESSON_COMPLETE] at the ' +
    'very end. Do NOT ask another question — the evidence is sufficient.'
  )
}

// ── Bug 4: autonomy without mastery → explicit choice, never silent skip ─────

/**
 * Injected INSTEAD of the old autonomy block when the learner asks to
 * move on before mastery. The old block instructed the model to append
 * [LESSON_COMPLETE] unconditionally — the exact silent-skip bug.
 */
export function buildMasteryGateBlock(): string {
  return (
    '\n\nMASTERY GATE — the student asked to move on, but has NOT yet shown ' +
    'mastery of this lesson (no verified correct answers on the check and ' +
    'practice questions). Do NOT emit [LESSON_COMPLETE]. Warmly tell them ' +
    "they haven't finished proving this one yet, and offer exactly two " +
    'choices: "Continue Learning" (recommended — one small check question ' +
    'right now) or "Skip Anyway" (their call, but the gap stays on record). ' +
    'Then ask the smallest possible check question so continuing is easy. ' +
    'Never complete a lesson on acknowledgement alone.'
  )
}

// ── Bugs 5/6/7: deterministic learner-request → teaching action ─────────────

export type LearnerRequest = 'diagram' | 'real_life_example' | 'explain_differently'

// `visuali[sz](?:e|ation)` covers the VERB (visualize/visualise) and the NOUN
// (visualization/visualisation). Production evidence: 10 learner messages used
// the noun and none was detected, so "Explain me vector with visualization"
// received no DIAGRAM directive while "…with a diagram" — same request, same
// session — did. The noun now behaves exactly like the other visual nouns
// already in this alternation (diagram, picture, image). Deliberately NOT
// widened to bare "visual"/"visuals": that is the Teaching Planner's matcher
// (teachingPlanner.ts), which is non-authoritative and combines it with intent
// before acting; this regex commands a turn-overriding directive on its own.
/**
 * The NOUNS in that vocabulary — the words that name a visual medium and can
 * therefore ALSO be a Knowledge Graph concept title ("Graph", "Chart").
 *
 * Exported because the visual target resolver needs exactly this list to tell
 * "show me a graph" (medium) from "teach me graph" (topic). Defining a second
 * list there would be two sources of truth for one vocabulary, so the request
 * grammar below is built FROM this array rather than repeating it.
 *
 * Nouns only: "show me", "draw" and "visualize" are verbs — they can never
 * collide with a concept title, so they stay in the regex alone.
 */
export const VISUAL_MEDIUM_NOUNS = [
  'diagram', 'visualization', 'visualisation', 'picture', 'drawing',
  'graph', 'chart', 'animation', 'simulation', 'image',
] as const

/**
 * ── ASKING FOR A PICTURE, AS OPPOSED TO MENTIONING ONE ──────────────────────
 *
 * The previous rule was: any medium noun anywhere in the message is a diagram
 * request. Measured against 37 real phrasings, that is wrong in both
 * directions at once.
 *
 * IT FIRED WHEN NOBODY ASKED
 *     "picture this: a ball rolling"          -> diagram
 *     "I get the picture"                     -> diagram
 *     "the graph of my grades is going down"  -> diagram
 * IT STAYED SILENT WHEN SOMEBODY DID
 *     "can you illustrate that" · "sketch it" · "show it visually"
 *     "I need to see this visually" · "any visual for this?"
 *
 * The distinction is grammatical, not lexical: a request either uses a verb
 * that can only mean "produce a visual", or it puts a medium noun inside an
 * ordinary English construction for asking. So the rule is built from those
 * two parts, over the SAME exported noun vocabulary the target resolver uses
 * to tell a medium from a topic — not from a list of phrases anyone has heard.
 */

/**
 * Verbs that mean "produce a visual" and nothing else. No noun required: a
 * learner who types "sketch it" has asked, and there is no other reading.
 * `picture`, `graph`, `chart` and `diagram` are deliberately NOT here — each is
 * also a NOUN, and "I don't understand the diagram" must stay a statement of
 * confusion rather than becoming a request for one. They are covered by the
 * weaker mention rule below, which sits underneath confusion.
 */
const VISUAL_VERB_RE = /\b(draw|sketch|illustrate|visuali[sz]e)\b/i

/**
 * "show me" with no object. Kept from the previous rule rather than dropped:
 * in a tutoring turn an unqualified "show me" is a request to be SHOWN, and
 * removing it would narrow behaviour that has shipped for months while fixing
 * a different defect. It survives every measured negative — no idiom in the
 * corpus ("I get the picture", "picture this", "the graph of my grades") gets
 * near it.
 */
const SHOW_ME_RE = /\b(?:show|showing)\s+(?:me|us)\b/i

/** The medium being named. Built from the shared vocabulary, plus the forms
 *  that only ever appear in requests. */
const MEDIUM_NOUN = `(?:${[...VISUAL_MEDIUM_NOUNS, 'illustration', 'sketch'].join('|')})`

/**
 * A medium noun inside a construction that ASKS for it. Each alternative is a
 * general English request frame, so it generalises past the examples that
 * motivated it:
 *
 *   show / give / make me a <noun>        "show me a picture"
 *   can I see a <noun>                    "can I see a diagram of that"
 *   is there a <noun>                     "is there a picture"
 *   do you have a <noun>                  "do you have a diagram"
 *   want / need to see ... <noun>         "I need to see this visually"
 *   a <noun> would help                   "a diagram would help"
 *   any <noun>                            "any visual for this?"
 *   show it <noun>ly                      "show it visually"
 */
const MEDIUM_REQUEST_RE = new RegExp(
  [
    `\\b(?:show|give|send|make|create|display|add|put)\\s+(?:me|us)?\\s*(?:a|an|the|some)?\\s*${MEDIUM_NOUN}\\b`,
    `\\b(?:show|explain|teach|do)\\s+(?:it|this|that|me)?\\s*${MEDIUM_NOUN}\\b`,
    `\\b(?:can|could|would|will|may)\\s+(?:you|i|we)\\s+(?:\\w+\\s+){0,3}?${MEDIUM_NOUN}\\b`,
    `\\b(?:is|are)\\s+there\\s+(?:a|an|any|some)?\\s*${MEDIUM_NOUN}\\b`,
    `\\b(?:do|did|have)\\s+you\\s+(?:have|got)\\s+(?:a|an|any)?\\s*${MEDIUM_NOUN}\\b`,
    `\\b(?:want|need|like|love)\\s+(?:to\\s+see\\s+)?(?:\\w+\\s+){0,3}?${MEDIUM_NOUN}\\b`,
    `\\b${MEDIUM_NOUN}\\s+(?:would|will|might|could)\\s+help\\b`,
    `\\bany\\s+${MEDIUM_NOUN}\\b`,
    `\\blet\\s+(?:me|us)\\s+see\\s+(?:a|an|the)?\\s*${MEDIUM_NOUN}\\b`,
    // "show it visually", "I need to see this visually" — an adverb, not a
    // noun, so it cannot be spelled with MEDIUM_NOUN. Kept to request frames
    // only: bare "visual"/"visuals" belongs to the Teaching Planner's
    // non-authoritative matcher, and widening to it here is forbidden.
    `\\b(?:show|see|explain|draw|do|need|want)\\s+(?:\\w+\\s+){0,3}?visually\\b`,
  ].join('|'),
  'i',
)

/**
 * A medium noun used as a VERB is not a request: "picture this", "graph it".
 * Checked before the verb rule so the one construction that reads as a request
 * but never is cannot slip through it.
 */
const MEDIUM_AS_VERB_RE = /\bpicture\s+(?:this|that)\b/i

/**
 * Did the learner ASK to be shown something? The strong reading — a verb that
 * can only mean "produce a visual", a bare "show me", or a medium noun inside
 * a request frame. Only this outranks a statement of confusion.
 */
export function asksForAVisual(text: string): boolean {
  if (MEDIUM_AS_VERB_RE.test(text)) return false
  return VISUAL_VERB_RE.test(text) || SHOW_ME_RE.test(text) || MEDIUM_REQUEST_RE.test(text)
}

/**
 * Did the learner merely NAME a medium? The weak reading, and the rule that
 * shipped before this one: production evidence showed "Explain me vector with
 * visualization" is a diagram request even though it contains no request frame.
 *
 * It stays BELOW confusion, which is the distinction the old single rule could
 * not express: "I don't understand the diagram" names a medium and is not a
 * request for one, while "I do not understand. Can you show me a picture?" is.
 */
export function mentionsAVisualMedium(text: string): boolean {
  if (MEDIUM_AS_VERB_RE.test(text)) return false
  return new RegExp(`\\b${MEDIUM_NOUN}\\b`, 'i').test(text)
}

// ── WHICH FORM WAS ASKED FOR ──────────────────────────────────────────────
//
// THE DEFECT THIS SERVES (production, measured 2026-08-11):
//
//   lesson: Ohm's Law · learner: "Can you graph this?"
//   attached: the curated `electric_circuit` scene — a circuit diagram
//
// and every other phrasing returned the identical figure: "show me a graph of
// this", "can you draw a diagram", "show me an animation". The medium the
// learner named reached nothing at all. The harm is not the circuit — that is
// the right curated figure for Ohm's Law — it is the tutor then narrating it
// as though it were the graph that was asked for.
//
// This function reports the form ONLY. It does not choose, reorder, or veto a
// figure: curated and approved content keeps its authority, and the medium
// noun never overrides the tier order. What it enables is honesty about the
// difference — see `buildVisualContractBlock`.
//
// Only forms whose meaning is unmistakable are reported. "diagram", "picture",
// "drawing", "image", "visualisation", "sketch" and "illustration" are generic
// words for "something visual" and constrain nothing, so they return null.

/** A visual form specific enough that showing a different one is a mismatch. */
export type RequestedVisualForm =
  /** A plot of one quantity against another. */
  | 'plot'
  /** Something that moves. */
  | 'motion'

/** Build a request-frame regex over a restricted noun set. */
function mediumRequestFor(nouns: readonly string[]): RegExp {
  const noun = `(?:${nouns.join('|')})`
  return new RegExp(
    [
      `\\b(?:show|give|send|make|create|display|add|put|draw|plot)\\s+(?:me|us)?\\s*(?:a|an|the|some)?\\s*${noun}\\b`,
      `\\b(?:show|explain|teach|do)\\s+(?:it|this|that|me)?\\s*${noun}\\b`,
      `\\b(?:can|could|would|will|may)\\s+(?:you|i|we)\\s+(?:\\w+\\s+){0,3}?${noun}\\b`,
      `\\b(?:is|are)\\s+there\\s+(?:a|an|any|some)?\\s*${noun}\\b`,
      `\\b(?:do|did|have)\\s+you\\s+(?:have|got)\\s+(?:a|an|any)?\\s*${noun}\\b`,
      `\\b(?:want|need|like|love)\\s+(?:to\\s+see\\s+)?(?:\\w+\\s+){0,3}?${noun}\\b`,
      `\\b${noun}\\s+(?:would|will|might|could)\\s+help\\b`,
      `\\bany\\s+${noun}\\b`,
      `\\blet\\s+(?:me|us)\\s+see\\s+(?:a|an|the)?\\s*${noun}\\b`,
    ].join('|'),
    'i',
  )
}

// "graph" and "chart" are already shared vocabulary; "plot" is added here and
// ONLY here, because it is form-specific by definition and never a generic
// word for a picture. VISUAL_MEDIUM_NOUNS is deliberately left alone — it
// drives whether a visual was requested at all, which this must not change.
const PLOT_REQUEST_RE = mediumRequestFor(['graph', 'graphs', 'chart', 'charts', 'plot', 'plots'])
const MOTION_REQUEST_RE = mediumRequestFor(['animation', 'animations', 'simulation', 'simulations'])

// The imperative. "graph it", "plot this" — the one place a medium word used
// as a VERB names a form rather than a picture, which is why it is read here
// and nowhere else. `MEDIUM_AS_VERB_RE` still governs "picture this".
const PLOT_IMPERATIVE_RE = /\b(?:graph|plot|chart)\s+(?:it|this|that|these|them)\b/i
const MOTION_IMPERATIVE_RE = /\b(?:animate|simulate)\s+(?:it|this|that|these|them)\b/i

/**
 * The specific visual form the learner asked for, or null when they named a
 * generic medium, named none, or were not asking.
 */
export function requestedVisualForm(text: string): RequestedVisualForm | null {
  if (!text || MEDIUM_AS_VERB_RE.test(text)) return null
  if (PLOT_REQUEST_RE.test(text) || PLOT_IMPERATIVE_RE.test(text)) return 'plot'
  if (MOTION_REQUEST_RE.test(text) || MOTION_IMPERATIVE_RE.test(text)) return 'motion'
  return null
}

const EXAMPLE_RE = /\b(real[\s-]?life|real[\s-]?world|example|application|story|use\s+case|everyday)\b/i
/**
 * "I DIDN'T UNDERSTAND — SAY IT ANOTHER WAY."
 *
 * ── WHY THIS PATTERN WAS WIDENED (Phase H1) ─────────────────────────────────
 * This regex is the ONLY deterministic door into the remediation branch of
 * `advanceConversationState` — the branch that counts the struggle, re-shows
 * the phase, and (via `consecutiveFailures`) shortens the next reply. Before
 * H1 it only recognised textbook English. Measured against the real modules,
 * the sentence a real learner sent in production —
 *
 *     "sir i not understand this"
 *
 * — returned null here, null from `detectFailureState`, and false from
 * `isDontKnowSignal`. It was invisible to every reader on the turn path, so
 * the learner was answered as though they had said nothing at all. 19 of 27
 * measured confusion phrasings failed the same way, including grammatical
 * English ("i cannot understand", "i am not able to understand").
 *
 * ── THE RULE THAT KEPT THIS FROM BECOMING A KEYWORD SOUP ────────────────────
 * Every alternative below is an extension of an alternative that was ALREADY
 * here, in the same family. Nothing new in kind was added:
 *   · "i don't understand"      -> the same claim with a dropped, non-standard
 *                                  or modal auxiliary
 *   · "explain it more simply"  -> the same request in plainer words
 *   · (new, but unambiguous)      self-reported weakness, and a bare "teach me"
 *                                  with no topic named after it
 * A false positive is the expensive direction — it spends a failure, raises
 * frustration and re-shows a phase for a learner who was doing fine — so the
 * difficulty family ("this is very difficult") is deliberately NOT here: its
 * canonical form already belongs to recoveryGuard's `too_hard`, and widening a
 * RECOVERY trigger suppresses teaching for a whole turn, which is a different
 * decision from widening a remediation trigger.
 *
 * Written as a joined list rather than one literal because the literal it
 * replaced was already unreadable at 400 characters, and an unreadable pattern
 * is one nobody can audit for the false positives that matter.
 */
const EXPLAIN_DIFF_RE = new RegExp([
  // ── "say it another way" (unchanged) ──
  String.raw`\bexplain\s+(?:it\s+|this\s+|that\s+)?(?:differently|again|another\s+way|in\s+a\s+different\s+way|more\s+simply|simpler)\b`,
  String.raw`\b(?:different|another)\s+explanation\b`,
  String.raw`\bsay\s+it\s+differently\b`,

  // ── "say it MORE SIMPLY" — the same request, in the register a weak
  //    learner actually writes. `more simply` / `simpler` were already here.
  String.raw`\bexplain\s+(?:it\s+|this\s+|that\s+)?(?:to\s+me\s+)?(?:in\s+)?(?:an?\s+)?(?:more\s+|very\s+)?(?:easy|easier|simple|simpler)(?:\s+(?:way|words|language|terms|english))?\b`,
  String.raw`\b(?:in\s+)?(?:easy|simple)\s+(?:way|words|language|terms|english)\b`,
  String.raw`\b(?:more\s+)?(?:simple|simpler|easy|easier)\s+(?:please|sir|ma'?am|madam)\b`,
  String.raw`\bmake\s+it\s+(?:more\s+)?(?:simple|simpler|easy|easier)\b`,

  // ── "I do not understand" and its non-standard forms ──
  String.raw`\bi\s+(?:don'?t|do\s+not)\s+understand\b`,
  // Covers "i not understand", "not understand sir", "i am not understanding",
  // "i am not able to understand". Cannot match "understandable" — the `\b`
  // after the optional `ing` refuses it.
  String.raw`\bnot\s+(?:able\s+to\s+)?understand(?:ing)?\b`,
  String.raw`\b(?:can'?t|cannot|couldn'?t|could\s+not)\s+understand\b`,
  String.raw`\bnot\s+getting\s+(?:it|this|that|any\s+of\s+(?:it|this))\b`,
  String.raw`\bi(?:'?m|\s+am)\s+(?:confused|lost)\b`,
  String.raw`\bno\s+idea\b`,
  // "not following" with a PRONOUN object is the confusion idiom. With an
  // INSTRUCTION object it is a compliance complaint about someone else, and
  // matching it was a pre-existing false positive that spent a failure.
  String.raw`\bnot\s+following\b(?!\s+(?:the\s+|these\s+|those\s+|your\s+|my\s+)?(?:instruction|instructions|direction|directions|rule|rules|step|steps|order|orders)\b)`,
  String.raw`\bdidn'?t\s+get\s+(?:it|that)\b`,
  String.raw`\bmakes?\s+no\s+sense\b`,

  // ── self-reported weakness. Nobody writes this while succeeding. ──
  String.raw`\bi(?:'?m|\s+am)\s+(?:very\s+|so\s+|really\s+)?weak\s+(?:in|at|with)\b`,

  // ── a bare "teach me", END-ANCHORED so it cannot swallow a topic ──
  // "ok sir please teach me" is a re-teach request; "teach me about
  // relativity" NAMES a topic and belongs to the excursion reader, which is
  // left untouched. The `$` is the entire discriminator.
  String.raw`\bteach\s+me(?:\s+(?:again|this|it|sir|please|more|properly|slowly|once\s+more))*\s*[.!?…]*$`,
].join('|'), 'i')

/**
 * Detect an explicit teaching-action request in the learner's message.
 * Priority: explain-differently (a confusion statement outranks the
 * medium it mentions) → diagram → real-life example. Deterministic,
 * pre-LLM — the Teaching Engine chooses the action, not the model.
 */
export function detectLearnerRequest(message: string): LearnerRequest | null {
  const text = message.trim()
  if (!text) return null
  // AN EXPLICIT ASK OUTRANKS A STATEMENT OF CONFUSION.
  //
  // This order was the other way round, and it is what silenced the request
  // measured in the real walkthrough: "I do not understand. Can you show me a
  // picture?" matched the confusion rule first and was classified
  // explain_differently, so `purpose` stayed 'explain' and the engine was
  // never asked for a figure. The learner had already said HOW to fix the
  // confusion; treating the vaguer half of their sentence as the whole of it
  // discards the specific instruction they gave.
  //
  // Confusion alone still routes to explain_differently — the change only
  // affects messages that contain BOTH, where the visual is the more specific
  // request of the two.
  if (asksForAVisual(text)) return 'diagram'
  if (EXPLAIN_DIFF_RE.test(text)) return 'explain_differently'
  // A bare mention, below confusion — see mentionsAVisualMedium.
  if (mentionsAVisualMedium(text)) return 'diagram'
  if (EXAMPLE_RE.test(text)) return 'real_life_example'
  return null
}

/**
 * THE LEARNER ASKED TO BE ASKED. (Phase 7H.)
 *
 * ── WHY THIS IS NOT A `LearnerRequest` ──────────────────────────────────────
 * Every member of `LearnerRequest` — diagram, real_life_example,
 * explain_differently — is a request to be given CONTENT INSTEAD OF a
 * question, which is exactly why the LEARNER_REQUEST arbitration rung
 * `suppresses: ['NEXT_MOVE', 'AUTHORED_PROBE', 'SESSION_CLOSE']` and its own
 * comment says "converting an explicit request into a graded quiz is defect
 * D3 / Phase 2 C6". That suppression is CORRECT for that whole vocabulary.
 *
 * A request for practice is the one kind whose correct fulfilment IS the
 * authored probe. Routing it through `detectLearnerRequest` would set
 * `learnerRequestActive` (route.ts: `turnIntent.learnerRequest !== null`),
 * hand the turn to LEARNER_REQUEST, and DENY the probe — turning "not
 * eligible" into "explicitly forbidden". So it is deliberately a separate
 * reading, and `detectLearnerRequest` is left untouched.
 *
 * ── THE DEFECT THIS EXISTS FOR ──────────────────────────────────────────────
 * Measured live (Phase 7C/7D) on `phys.opt.total-internal-reflection` at
 * GUIDE, with three reviewed gradeable probes ACTIVE and every safety gate
 * clear. The learner typed "ok yes lets try practice problem" and got a
 * MODEL-invented question instead — `[turn-decision] probeId: null,
 * divergences: ["QUESTION_SHIPPED_WITHOUT_PROBE"]`. One such question
 * carried a WRONG answer key (water->air: the only option above the 48.75°
 * critical angle is 55°; the key said 48°), so a learner answering correctly
 * would have been marked wrong.
 *
 * Cause: `decideNextMoveHeuristic`'s GUIDE branch alternates on
 * `teachSegmentsSinceQuestion` alone and takes no learner input, so an
 * explicit request for practice could not reach the move that opens the gate.
 *
 * ── SCOPE, DELIBERATELY NARROW ──────────────────────────────────────────────
 * This reports a PREFERENCE, never an entitlement. It is consumed at exactly
 * one place — the GUIDE branch of the move heuristic — which sits BELOW
 * recovery (`decideNextMoveDetailed` short-circuits on `recoveryTurn` first)
 * and BELOW question legality (QL-3's `askSuppressedTurns`, subtractive), and
 * upstream of every `gateEligible` conjunct (excursion, closing, first
 * lesson, unanswered probe, arbitration). So distress, "stop asking", a
 * close, an excursion or a spent probe pool all still win, unchanged.
 *
 * Never widened to bare "practice"/"test"/"question": those are ordinary
 * subject vocabulary ("best practice", "test tube", "research question"). The
 * request FORM is the discriminator, not the noun.
 */
const PRACTICE_REQUEST_RE: readonly RegExp[] = [
  // "quiz me", "test me", "can you test me?"
  /\b(quiz|test)\s+me\b/i,
  // "ask me a question", "ask me another question", "ask me some questions"
  /\bask\s+me\s+(a|another|some|more)?\s*questions?\b/i,
  // "give me a practice problem", "let's try a practice question"
  /\b(practice|practise)\s+(problem|question|exercise)s?\b/i,
  // "let's practice", "can we practice"
  /\b(let'?s|lets|can\s+we|shall\s+we)\s+(practice|practise)\b/i,
  // "give me something to solve", "give me one to solve"
  /\b(something|one|anything)\s+to\s+(solve|try|work\s+on)\b/i,
  // "give me a problem/question" — the bare give, without the word practice.
  //
  // PHASE E: the quantifier was a single OPTIONAL slot, so "give me one
  // question to try" and "give me one more question" — the two forms the live
  // weak-learner run actually sent — both missed: "one" was not in the list,
  // and even with it added a single slot cannot hold "one more". A bounded
  // RUN of quantifiers holds both. Still bounded, and still only quantifiers,
  // so "give me more time to answer the question" does not match — after
  // "more" the pattern demands the noun and finds "time".
  /\bgive\s+me\s+(?:(?:a|an|one|another|some|more)\s+){0,2}(problem|question)s?\b/i,
  // PHASE 7M-A: the bare first-person form. "no wait i dont want to stop, i
  // want to practice" is a REAL production message (2026-08-25) that none of
  // the six patterns above matched — the "let's/can we" forms require a
  // hortative opener this phrasing does not have. Found because a 7M test
  // asserted the production phrase was covered and it was not.
  //
  // PHASE E: the infinitive "to" was mandatory, and dropping it is the
  // defining grammatical feature of the register this product exists for —
  // "i want practice please" was the live run's own phrasing and matched
  // nothing. Making it optional is the whole change; the negation guard
  // below still catches "i don't want practice" and "i don't want to
  // practice", because its {0,2} word window spans "want" and "want to"
  // alike.
  /\b(i\s+want(?:\s+to)?|i'?d\s+like(?:\s+to)?|i\s+wanna|i\s+need(?:\s+to)?)\s+(practice|practise)\b/i,
  // PHASE 7P: the bare "next item" form. "one more please" is a REAL production
  // message (2026-08-25) that matched none of the patterns above and was then
  // fuzzy-matched by gradeMcqAnswer to option A of the pending MCQ, recorded as
  // a WRONG ANSWER, and written to TopicProgress as evidence.
  //
  // ANCHORED AT THE START on purpose. An unanchored /one more/ would swallow
  // "I need one more minute" and "just one more thing about waves", which are
  // not requests for a question. A learner asking for the next item puts it
  // first.
  /^\s*(one|another)\s+more\b/i,
]

/**
 * A negation of the ASK ITSELF ("don't ask me", "stop quizzing me").
 *
 * Bounded to two words after the negator so it cannot reach across a clause:
 * "I don't understand, can you give me a practice problem?" is a GENUINE
 * request whose distress is handled by recovery precedence, not by silencing
 * the request here — `understand` is not one of the asked-for verbs, so this
 * correctly does not fire on it.
 *
 * Belt and braces: `recoveryGuard`'s `too_many_questions` already makes the
 * turn a recovery turn, which short-circuits the move engine before the
 * heuristic ever reads this signal. This keeps the detector honest when read
 * on its own.
 */
const PRACTICE_REQUEST_NEGATED_RE =
  // 'practice|practise' added with the first-person pattern above: without it
  // "I don't want to practice" would match that new pattern and be read as a
  // REQUEST for practice — the exact inversion this guard exists to prevent.
  /\b(don'?t|do\s+not|stop|quit|no\s+more|rather\s+than|instead\s+of)\s+(\w+\s+){0,2}(ask|quiz|test|question|practice|practise)/i

/** Did the learner explicitly ask to be given a question to answer?
 *
 *  PHASE E — read on the politeness-stripped form, so "give me one more
 *  question sir" is the same request as "give me one more question". The
 *  stripped string never leaves this function; every caller still passes, and
 *  every other consumer still sees, the learner's own words. See
 *  `stripAddressTokens`'s note in conversationState.ts for why this is the
 *  whole fix and what it must never touch.
 *
 *  The NEGATION guard is evaluated on the same stripped form on purpose:
 *  "please don't ask me questions sir" must stay a refusal, and it would be
 *  read as one either way, but running both tests over one string is what
 *  keeps a stripped token from ever flipping the sign. */
export function asksForPractice(message: string): boolean {
  const text = stripAddressTokens((message ?? '').trim())
  if (!text) return false
  if (PRACTICE_REQUEST_NEGATED_RE.test(text)) return false
  return PRACTICE_REQUEST_RE.some((re) => re.test(text))
}

/**
 * P2 fix (remaining risk closed): the original version of this directive
 * told the model to "check your own recent turns" for an established
 * example before choosing a new one — purely advisory, AND unreliable by
 * construction, since generateAIResponse only forwards the last 6 messages
 * (client.ts's `messages.slice(-6)`) — an example given earlier in a longer
 * lesson is literally invisible to the model by the time this fires, so the
 * instruction could silently do nothing through no fault of the model.
 * Replaced with a DETERMINISTIC signal computed server-side from
 * ConversationState's own counters (exampleRequests, remediationCount —
 * both already tracked, no new state added) — the caller passes whether an
 * example has already been established for this concept, so the directive
 * tells the model a FACT ("you already have one — extend it") instead of
 * asking it to reconstruct that fact from a context window that may not
 * contain it.
 */
function realLifeExampleDirective(hasEstablishedExample: boolean): string {
  const continuity = hasEstablishedExample
    ? 'An example or analogy for this concept has ALREADY been given earlier this lesson (this is tracked server-side, not something to guess from recent messages). EXTEND that same scenario further — do not introduce a new, unrelated one. Jumping between disconnected examples (a ruler, then coffee, then a stroller) is more confusing than exploring one scenario more deeply. Only switch to a genuinely different scenario if the established one has clearly not worked.'
    : 'This is the first example for this concept this lesson — choose one clearly, since it will be the one you are expected to extend if the student needs another example later.'
  return (
    '\n\nTEACHING ACTION: REAL_LIFE_EXAMPLE (learner-requested — overrides the turn move). ' +
    'The student asked for a concrete application. Do NOT re-explain the theory. ' +
    continuity + ' ' +
    'Give ONE vivid everyday scenario they have personally experienced, walk the ' +
    'concept through that scenario start to finish, and connect back in one sentence. ' +
    'No definitions this turn.'
  )
}

/**
 * The forced TeachingAction directive for the turn. Injected AFTER the
 * turn directive so it overrides the phase's default move — an explicit
 * learner request outranks the machine's own pacing.
 *
 * remediationTier (P1, task 3): how many times THIS concept has already
 * triggered explain_differently this session (ConversationState.
 * remediationCount) — drives an escalating representation ladder instead of
 * repeating the same "try something different" instruction indefinitely.
 * Reuses the already-existing REAL_LIFE_EXAMPLE directive and the
 * Visualization Registry's forced-render mechanism (visualRegistry.ts) —
 * no new teaching actions invented. Only applies to 'explain_differently';
 * ignored for 'diagram'/'real_life_example', which are already explicit.
 *
 * hasEstablishedExample (P2, example continuity): true when
 * ConversationState.exampleRequests > 0 OR the ladder has already reached
 * tier 2 on a prior turn (remediationCount > 2) — i.e. a real-life example
 * has genuinely already been produced for this concept this lesson. Purely
 * additive/optional so pre-existing callers default to false (first-example
 * wording), matching prior behavior.
 */
const STRATEGY_BLOCKS: Record<number, (vis: string | null, prereqId: string | null, visualAttached?: boolean) => string> = {
  0: () =>
    '\n\nTEACHING ACTION: STRATEGY 0 — CONCISE EXPLANATION. ' +
    'Give the shortest possible correct explanation: one sentence of core idea, one concrete example sentence. ' +
    'No analogies, no stories, no questions. End with an invitation, not a question mark.',
  1: () =>
    '\n\nTEACHING ACTION: STRATEGY 1 — SIMPLER WORDING. ' +
    'Re-explain using only common everyday words a 10-year-old would know. ' +
    'Replace every technical term with a plain description. ' +
    'Maximum two short sentences. No questions this turn.',
  2: () =>
    '\n\nTEACHING ACTION: STRATEGY 2 — ANALOGY. ' +
    'Give ONE vivid analogy from the learner\'s everyday life. ' +
    'Walk the concept through that analogy step by step. ' +
    'Do NOT repeat any analogy already used this lesson (the server tracks this). ' +
    'No definitions, no questions this turn.',
  3: (vis, _prereq, visualAttached) =>
    '\n\nTEACHING ACTION: STRATEGY 3 — VISUAL DEMONSTRATION. ' +
    (visualAttached
      ? 'The teaching engine has ALREADY attached a graphical figure to this response and the learner can see it — teach directly to that figure (see the VISUAL CONTRACT block). Do NOT draw an ASCII diagram.'
      : vis
      ? `Lead with the visual: emit the VISUAL:${vis} tag first, then at most two short sentences pointing at what to look at.`
      : 'Build the picture in text: a labelled ASCII/structured diagram or a precise step-by-step visual description ("imagine a horizontal line; on its left end…"), then one sentence of guidance.') +
    ' Words support the visual, not the other way around. No prose explanation this turn.',
  4: () =>
    '\n\nTEACHING ACTION: STRATEGY 4 — PHYSICAL ACTIVITY (observation first, vocabulary second). ' +
    'Design a simple physical activity the learner can do RIGHT NOW: ' +
    '"Stand up." "Walk three steps forward." "Walk three steps back." "Where are you now?" ' +
    'Then introduce the terminology AFTER they experience it. ' +
    'The activity must be doable in any room. No explaining first — the body teaches.',
  5: () =>
    '\n\nTEACHING ACTION: STRATEGY 5 — GUIDED DISCOVERY. ' +
    'Ask ONE carefully chosen question that leads the learner to discover the concept themselves. ' +
    'The question must be answerable from what they already know — never ask them to guess something not yet shown. ' +
    'Wait for their answer. Do not reveal the answer in the same turn.',
  6: (_vis, prereqId) =>
    '\n\nTEACHING ACTION: STRATEGY 6 — PREREQUISITE REMEDIATION. ' +
    (prereqId
      ? `Step back to the prerequisite concept "${prereqId}" — the current concept cannot land without it. Teach the prerequisite briefly, then reconnect to the current topic.`
      : 'Step back to the most likely missing foundation for this concept. Teach it briefly, then reconnect.') +
    ' Do not attempt the current concept again until the prerequisite is addressed.',
}

export function buildLearnerRequestBlock(
  request: LearnerRequest,
  availableVisualType: string | null,
  remediationTier = 0,
  hasEstablishedExample = false,
  strategyIndex?: number,
  prerequisiteId?: string | null,
  /** Visual Resolver V2: a real figure is already attached to this response. */
  visualAlreadyAttached = false,
): string {
  switch (request) {
    case 'diagram':
      return (
        '\n\nTEACHING ACTION: DIAGRAM (learner-requested — overrides the turn move). ' +
        'The student asked to SEE it. Do NOT reply with another prose paragraph. ' +
        (visualAlreadyAttached
          ? 'The teaching engine has ALREADY attached a graphical figure to this response and the learner can see it — teach directly to that figure (see the VISUAL CONTRACT block). Do NOT draw an ASCII diagram.'
          : availableVisualType
          ? `Lead with the visual: emit the VISUAL:${availableVisualType} tag first, then at most two short sentences pointing at what to look at.`
          : 'Build the picture in text: a labelled ASCII/structured diagram or a precise step-by-step visual description ("imagine a horizontal line; on its left end…"), then one sentence of guidance.') +
        ' No new abstract explanation this turn.'
      )
    case 'real_life_example':
      return realLifeExampleDirective(hasEstablishedExample)
    case 'explain_differently': {
      if (typeof strategyIndex === 'number' && strategyIndex >= 0 && strategyIndex <= 6) {
        const builder = STRATEGY_BLOCKS[strategyIndex]
        if (builder) {
          return builder(availableVisualType, prerequisiteId ?? null, visualAlreadyAttached) +
            `\n- Strategy ${strategyIndex} of 7 (server-selected, never repeat a previous strategy).` +
            `\n- Strategies already attempted this lesson: ${remediationTier}. Do NOT reuse any previous approach.`
        }
      }
      return STRATEGY_BLOCKS[0]!(availableVisualType, prerequisiteId ?? null, visualAlreadyAttached)
    }
  }
}

// ── Bug 8: read-state awareness ──────────────────────────────────────────────

/** One directive line when the client reports the learner never expanded
 * the previous long (collapsed) explanation — the engine must not assume
 * unread text was read. */
export function buildUnreadExplanationBlock(): string {
  return (
    '\n\nREAD-STATE — the learner did NOT expand your previous long explanation ' +
    '(it stayed collapsed). Assume it was not fully read: do not build on its ' +
    'details, keep this turn to a few short sentences, and re-anchor the one ' +
    'key idea before anything new.'
  )
}

/**
 * WAS THIS SESSION'S MASTERY GRADED AGAINST A KEY THE MODEL INVENTED?
 *
 * Moved here from lessonSummary.ts so ONE definition serves both readers. It
 * had one reader — the permanent record — while `buildMasterySummary` below,
 * under a header that literally says "one source of truth", reported
 * `masteryVerified` instead. The two disagreed, and the learner saw both.
 *
 * MEASURED live (phys.mech.friction, 2026-09-01, disposable account). A
 * learner answered four questions correctly and reached TRANSFER. In the SAME
 * turn the payload said `mastery.verified: true` and the deterministic close
 * said "Let's pause Friction Forces here for now. Worth another look later:
 * Friction Forces." Reproduced offline against the real modules:
 *
 *   correctAtCheck 1   verifiedCorrectAtCheck 0
 *   correctAtPractice 2   verifiedCorrectAtPractice 2
 *   unauthoredKeyGrades 1
 *   masteryVerified true / masteryVerifiedStrict false
 *   conceptOutcome.status = 'needs_review'
 *
 * — the exact state shape conceptOutcome's own comment already records from
 * an earlier run, so this is the documented case, not a new one.
 *
 * Which authority is right is NOT what this changes: the record's refusal
 * stands, because it exists for a measured reason (an invented key that was
 * WRONG once certified a lesson). What changes is that the payload may no
 * longer claim more than the record will grant. Telling a learner "verified"
 * and "worth another look later" in one breath is worse than either answer
 * alone.
 *
 * Scoped exactly as before: with `unauthoredKeyGrades` at zero — every session
 * where the model invented no graded item — this returns false and both
 * readers behave byte-identically to before.
 */
export function launderedEvidence(state: ConversationState): boolean {
  if ((state.unauthoredKeyGrades ?? 0) === 0) return false
  return !masteryVerifiedStrict(state)
}

// ── Client-facing mastery summary (Bug 9/11 — one source of truth) ──────────

export interface MasterySummary {
  verified: boolean
  phase: string
  checkCorrect: number
  practiceCorrect: number
  checkRequired: number
  practiceRequired: number
  /** This turn's [LESSON_COMPLETE] was stripped for lack of evidence. */
  completionSuppressed: boolean
  /** The learner asked to advance before mastery — client shows the
   * Continue Learning / Skip Anyway choice (default: Continue). */
  gatePending: boolean
}

export function buildMasterySummary(
  state: ConversationState,
  opts: { completionSuppressed: boolean; gatePending: boolean },
): MasterySummary {
  return {
    // ONE authority. The payload's "verified" is the same verdict the
    // completion gate and the permanent record read (`conceptMasteryVerdict`),
    // so the three can never disagree — the incoherence measured live on
    // phys.mech.friction (payload said verified, gate refused) is now
    // structurally impossible rather than patched at one call site.
    verified: conceptMasteryVerdict(state),
    phase: state.phase,
    checkCorrect: state.correctAtCheck,
    practiceCorrect: state.correctAtPractice,
    checkRequired: MASTERY_CHECK_REQUIRED,
    practiceRequired: MASTERY_PRACTICE_REQUIRED,
    completionSuppressed: opts.completionSuppressed,
    gatePending: opts.gatePending,
  }
}
