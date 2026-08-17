/**
 * DETERMINISTIC GATE-ASSESSMENT LEAD-IN — Phase 2 of LLM dependency reduction.
 *
 * ── WHAT THIS REPLACES, AND WHAT IT DOES NOT ────────────────────────────────
 * At a mastery gate the server ALREADY owns the assessment: `findBestProbe`
 * selects a reviewed authored probe, `probeToMcq` converts it (refusing
 * anything not unambiguously gradeable), the choices and `correctIndex` are
 * the authored key, and `gradeMcqAnswer` grades against that key. The model's
 * entire remaining job is stated in `buildGateAssessmentBlock`: "Your job this
 * turn is the LEAD-IN ONLY: one or two sentences."
 *
 * So this module writes those one or two sentences, and NOTHING else changes:
 * same probe, same question, same choices, same order, same correctIndex, same
 * grading path, same evidence, same ladder transition. The MCQ payload is
 * already assembled by the caller before this is reached — this only supplies
 * the sentence above it.
 *
 * ── WHY IT REFUSES MORE OFTEN THAN THE GATE ITSELF FIRES ────────────────────
 * A gate turn is not always ONLY a lead-in, and rendering it as though it were
 * would silently drop teaching the learner is owed. Three refusals, each for a
 * defect that would otherwise reach a learner:
 *
 *   1. AN ANSWER IS WAITING TO BE REACTED TO. CHECK and PRACTICE are exactly
 *      the phases where the learner has usually just answered something. The
 *      LLM turn reacts to that answer and THEN leads in. A lead-in alone would
 *      drop the reaction — the learner answers, and the tutor acts as if they
 *      had not. Composing a reaction is a different and much riskier piece of
 *      work; it is deliberately not attempted here.
 *
 *   2. A FIGURE IS ON SCREEN. When a figure is attached this turn, the visual
 *      contract governs how the tutor's words relate to it. Text that never
 *      mentions a diagram the learner can plainly see is worse than no
 *      diagram, so the figure keeps the model.
 *
 *   3. THE LESSON IS NOT IN ENGLISH. These templates are English. The tutor
 *      teaches in en/hi/ru, and a Hindi learner must not receive an English
 *      sentence stapled to an authored question. Translating them is authoring
 *      work with a review requirement, not a string table, so a non-English
 *      lesson keeps the model.
 *
 * Refusal returns null and the caller falls back to the existing LLM path
 * unchanged. An assessment is never silently degraded.
 *
 * ── ON REPETITION ───────────────────────────────────────────────────────────
 * The instruction to avoid robotic repetition is why the templates are keyed
 * to the CONCEPT rather than being interchangeable filler: the server knows
 * the concept's real title, so the sentence can name what is being checked
 * instead of saying "here is a question". Rotation is derived from the
 * question text itself, so two consecutive gates in one lesson cannot draw the
 * same frame, and the same probe always renders identically (a re-read of the
 * transcript must not change).
 */

/**
 * Lead-in frames. Each is a complete one-or-two-sentence bridge that works
 * WITHOUT knowing the learner's previous answer — which is the whole premise
 * of the pre-answer gate turn.
 *
 * They deliberately do not praise, do not claim the learner has understood
 * anything, and do not restate the question: the question renders as tappable
 * buttons directly beneath, and repeating it reads as a stutter.
 */
const FRAMES_WITH_CONCEPT: ReadonlyArray<(concept: string) => string> = [
  (c) => `Let's check one thing about ${c} before we go further.`,
  (c) => `Here's a question on ${c} — take your time with it.`,
  (c) => `Quick check on ${c}. Think it through before you choose.`,
  (c) => `One to try, on ${c}. There's no rush.`,
  (c) => `Let's see how ${c} is sitting. Pick the one you think is right.`,
  (c) => `A question about ${c} now — read it carefully first.`,
]

/**
 * Used only when the concept has no usable title. Still never hollow: it says
 * what is about to happen and gives the learner permission to take time.
 */
const FRAMES_WITHOUT_CONCEPT: ReadonlyArray<string> = [
  'Let\'s check this one before we go further.',
  'Here\'s a question — take your time with it.',
  'Quick check. Think it through before you choose.',
  'One to try. There\'s no rush.',
]

/**
 * Stable, well-distributed index from the question text. Same probe → same
 * frame forever (a reloaded transcript must read identically), different
 * probes → different frames, which is what stops two consecutive gates in a
 * lesson from opening the same way.
 */
function frameIndex(question: string, modulo: number): number {
  let h = 0
  for (let i = 0; i < question.length; i++) h = (h * 31 + question.charCodeAt(i)) | 0
  return Math.abs(h) % modulo
}

export interface GateLeadInInput {
  /** The question the server already selected. Used for rotation only. */
  question: string
  /** Human-readable concept title, when the KG has one. */
  conceptTitle: string | null
  /** The learner's teaching language. Anything but 'en' refuses. */
  teachingLanguage: string
  /** True when this turn is reacting to an answer the learner just gave. */
  hasPendingAnswerToReactTo: boolean
  /** True when a figure is attached to this turn. */
  hasAttachedFigure: boolean
}

/**
 * The deterministic lead-in, or null when the model should keep this turn.
 *
 * Null is a normal, expected outcome — see the three refusals above. The
 * caller must treat null as "use the existing LLM path", never as "send an
 * empty turn".
 */
export function renderGateLeadIn(input: GateLeadInInput): string | null {
  if (input.hasPendingAnswerToReactTo) return null
  if (input.hasAttachedFigure) return null
  if (input.teachingLanguage !== 'en') return null

  const question = typeof input.question === 'string' ? input.question.trim() : ''
  if (question.length === 0) return null

  const title = typeof input.conceptTitle === 'string' ? input.conceptTitle.trim() : ''
  // A title is only useful if it reads as a phrase in a sentence. An id-looking
  // or absurdly long string would produce "Let's check one thing about
  // phys.mech.newtons-first-law", which is worse than the neutral frame.
  const usableTitle = title.length > 0 && title.length <= 60 && !title.includes('.')
    ? title
    : null

  if (usableTitle) {
    const i = frameIndex(question, FRAMES_WITH_CONCEPT.length)
    return FRAMES_WITH_CONCEPT[i](usableTitle)
  }
  const i = frameIndex(question, FRAMES_WITHOUT_CONCEPT.length)
  return FRAMES_WITHOUT_CONCEPT[i]
}
