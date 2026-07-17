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

const LESSON_COMPLETE_RE = /\s*\[LESSON_COMPLETE\]\s*/gi

/**
 * The single completion chokepoint. Whatever made the model emit
 * [LESSON_COMPLETE] — "got it", autonomy request, hallucinated
 * confidence — the tag survives to the client ONLY when the state
 * machine's own evidence counters say mastery is verified.
 * Fail-closed: a missing/null state can never authorize completion.
 */
export function gateLessonCompletion(
  text: string,
  state: ConversationState | null,
): CompletionGateResult {
  const hasTag = /\[LESSON_COMPLETE\]/i.test(text)
  if (!hasTag) return { cleanText: text, authorized: false, suppressed: false }
  if (masteryVerified(state)) {
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

const DIAGRAM_RE = /\b(diagram|visuali[sz]e|show\s+me|picture|draw|drawing|graph|chart|animation|simulation|image)\b/i
const EXAMPLE_RE = /\b(real[\s-]?life|real[\s-]?world|example|application|story|use\s+case|everyday)\b/i
const EXPLAIN_DIFF_RE = /\b(explain\s+(it\s+)?(differently|again|another\s+way|in\s+a\s+different\s+way|more\s+simply|simpler)|different\s+explanation|another\s+explanation|say\s+it\s+differently|i\s+(don'?t|do\s+not)\s+understand|i(?:'?m|\s+am)\s+(confused|lost)|no\s+idea|not\s+following|didn'?t\s+get\s+(it|that)|makes?\s+no\s+sense)\b/i

/**
 * Detect an explicit teaching-action request in the learner's message.
 * Priority: explain-differently (a confusion statement outranks the
 * medium it mentions) → diagram → real-life example. Deterministic,
 * pre-LLM — the Teaching Engine chooses the action, not the model.
 */
export function detectLearnerRequest(message: string): LearnerRequest | null {
  const text = message.trim()
  if (!text) return null
  if (EXPLAIN_DIFF_RE.test(text)) return 'explain_differently'
  if (DIAGRAM_RE.test(text)) return 'diagram'
  if (EXAMPLE_RE.test(text)) return 'real_life_example'
  return null
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
export function buildLearnerRequestBlock(
  request: LearnerRequest,
  availableVisualType: string | null,
  remediationTier = 0,
  hasEstablishedExample = false,
): string {
  switch (request) {
    case 'diagram':
      return (
        '\n\nTEACHING ACTION: DIAGRAM (learner-requested — overrides the turn move). ' +
        'The student asked to SEE it. Do NOT reply with another prose paragraph. ' +
        (availableVisualType
          ? `Lead with the visual: emit the VISUAL:${availableVisualType} tag first, then at most two short sentences pointing at what to look at.`
          : 'Build the picture in text: a labelled ASCII/structured diagram or a precise step-by-step visual description ("imagine a horizontal line; on its left end…"), then one sentence of guidance.') +
        ' No new abstract explanation this turn.'
      )
    case 'real_life_example':
      return realLifeExampleDirective(hasEstablishedExample)
    case 'explain_differently': {
      // Tier 0 (first time this concept has needed it): a different
      // explanation — same channel (prose), genuinely different content.
      if (remediationTier <= 0) {
        return (
          '\n\nTEACHING ACTION: CHANGE_REPRESENTATION — DIFFERENT EXPLANATION ' +
          '(learner said they did not understand). Your previous explanation did ' +
          'not land — repeating similar wording is forbidden. Give a genuinely ' +
          'different explanation: different angle, different words, different ' +
          'starting point. Shorter than before, one idea only, no new vocabulary. ' +
          'Do not ask a question this turn; end with an invitation.'
        )
      }
      // Tier 1 (still confused after a different explanation): worked example.
      if (remediationTier === 1) {
        return (
          '\n\nTEACHING ACTION: CHANGE_REPRESENTATION — WORKED EXAMPLE (this concept ' +
          'has already needed one different explanation and it still did not land — ' +
          'stop explaining in the abstract). Show ONE complete worked example, start ' +
          'to finish, stating the reason for each step. No new theory, no question ' +
          'this turn.'
        )
      }
      // Tier 2: real-world example (reuses the existing directive verbatim —
      // same teaching action the learner gets by asking for one directly).
      if (remediationTier === 2) {
        return realLifeExampleDirective(hasEstablishedExample).replace(
          'TEACHING ACTION: REAL_LIFE_EXAMPLE (learner-requested — overrides the turn move).',
          'TEACHING ACTION: CHANGE_REPRESENTATION — REAL_LIFE_EXAMPLE (a different ' +
          'explanation and a worked example have both already failed to land this ' +
          'concept — try the concrete, personal angle next).',
        )
      }
      // Tier 3: visualization, through the existing Visualization Registry —
      // the caller (route.ts) is responsible for force-rendering
      // availableVisualType via shouldForceVisualRender/resolveResponseVisual
      // exactly as it already does for an explicit 'diagram' request; this
      // text only carries the instruction when no visual is registered.
      if (remediationTier === 3) {
        return (
          '\n\nTEACHING ACTION: CHANGE_REPRESENTATION — VISUALIZATION (three different ' +
          'explanations of this concept have not landed — words are not working; SHOW ' +
          'it instead). ' +
          (availableVisualType
            ? `Lead with the visual: emit the VISUAL:${availableVisualType} tag first, then at most two short sentences.`
            : 'No registered visual exists for this concept — build the clearest possible text diagram or step-by-step visual description instead.') +
          ' No new prose explanation this turn.'
        )
      }
      // Tier 4+: guided step-by-step — hand-holding, minimal questioning
      // (task 4/5: repeated confusion reduces Socratic questioning and never
      // asks the learner to infer something not yet taught).
      return (
        '\n\nTEACHING ACTION: CHANGE_REPRESENTATION — GUIDED STEP-BY-STEP (four prior ' +
        'attempts at this concept have not landed). Switch to full co-production: walk ' +
        'ONE micro-step at a time, doing it WITH the learner rather than asking them to ' +
        'produce it. Do not ask them to predict, guess, or infer anything not already ' +
        'shown. At most one very small confirming check, never an open question.'
      )
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
    verified: masteryVerified(state),
    phase: state.phase,
    checkCorrect: state.correctAtCheck,
    practiceCorrect: state.correctAtPractice,
    checkRequired: MASTERY_CHECK_REQUIRED,
    practiceRequired: MASTERY_PRACTICE_REQUIRED,
    completionSuppressed: opts.completionSuppressed,
    gatePending: opts.gatePending,
  }
}
