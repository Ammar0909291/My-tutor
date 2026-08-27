/**
 * THE REMEDIATION OUTPUT CONTRACT (Phase H3).
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * A learner who says "sir i not understand this" is detected (H1), classified
 * CONFUSION (H2), given a directive that says re-teach the same idea more
 * simply (H2), and then handed to the model with NOTHING checking what comes
 * back. Traced through the repository:
 *
 *   D-4b ANSWER-STUDENT-FIRST -> ESCALATE_TO_LLM -> executor LLM_OPEN
 *     · `buildBrainExecutionBlock` returns '' unless the executor is
 *       LLM_RENDERER, so the Brain adds no scoping to this turn
 *     · `buildTeachingStrategyBlock` — FOUNDATION_REBUILD's own "use concrete,
 *       everyday examples before introducing formal definitions" and "avoid
 *       introducing extension material" — is suppressed while the Brain owns
 *       decisions (`legacyDecisionBlocksSuppressed()`)
 *     · the K5 output verifier is env-gated; `readVerifierMode` returns 'off'
 *       unless ENABLE_OUTPUT_VERIFIER / ENABLE_EOS_RUNTIME is set, and neither
 *       is set in production
 *
 * So the remediation instruction is a REQUEST. This module is the smallest
 * thing that turns one part of it into a CONSTRAINT.
 *
 * ── WHAT IT MEASURED, AND WHAT IT REFUSES TO ────────────────────────────────
 * Measured live (H2, 2026-08-27): two chemistry remediation turns answered
 * "sir i not understand this" by re-asking the previous turn's question and
 * nothing else. groq returned 58 and 64 characters, so the MODEL produced the
 * echo — nothing downstream stripped an explanation. Both turns carried
 * `legalityBlocked: QL1_NO_ANSWERABLE_SOURCE` and `move: 'show'`: the kernel
 * had ALREADY decided a question was illegal ("nothing has been taught yet
 * this session … the learner has no source to answer from"), the ladder obeyed
 * it, `foldLegalityMetrics` even counts the event as `askViolations` — and
 * nothing acted on any of it.
 *
 * This module decides ONE structural question: **did the turn explain anything
 * at all, or is it only a question / only a repeat?** It never decides whether
 * an explanation is TRUE. A plausible, plain, on-concept explanation resting on
 * a false analogy passes this floor, and nothing in this repository can catch
 * it — that boundary is stated in the tests rather than papered over.
 *
 * ── HOW IT IS BUILT ─────────────────────────────────────────────────────────
 * Nothing here re-derives what the repository already knows. "Which part of a
 * turn is the question" is `dropAnswerableContent` + `dropOrphanedLeadIn`, the
 * pair `withholdUngradedGateQuestion` already uses to cut a turn back to its
 * teaching — including their existing, deliberate exclusions (a confirmation
 * tail like "does that make sense?" is not an answerable question and must
 * survive). They are reused, not copied.
 *
 * Pure: no I/O, no model calls, no state. The route owns the repair.
 */
import { cutBackToTeaching } from './gateAssessment'

export type RemediationOutputViolation = 'question-only' | 'repeats-previous-turn'

export interface RemediationOutputCheck {
  violation: RemediationOutputViolation | null
  /** Machine-readable, for the repair appendix and the log. Never shown to a
   *  learner (I-22: learner-facing text never mentions the apparatus). */
  reason: string | null
}

const OK: RemediationOutputCheck = { violation: null, reason: null }

/** Normalised for comparison only — never for display. */
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')

/**
 * The two conversation classes whose whole purpose is to re-teach. Read from
 * `classifyConversation`'s own vocabulary rather than re-detected from the
 * learner's text, so this cannot drift from the decision the prompt was built
 * around.
 */
export function isRemediationTurn(conversationDecisionType: string | null | undefined): boolean {
  return conversationDecisionType === 'CONFUSION'
    || conversationDecisionType === 'REPHRASE_REQUEST'
}

export interface RemediationOutputInput {
  /** `isRemediationTurn(conversationDecision.type)`. */
  remediationTurn: boolean
  /** The cleaned, learner-visible draft. */
  text: string
  /** The previous ASSISTANT message, for the repeat check. */
  previousAssistantText?: string | null
  /**
   * A structured MCQ was attached to this turn. Then the question IS the
   * turn's content and withholding it would delete what the learner is meant
   * to answer — the same exclusion `withholdUngradedGateQuestion` makes.
   */
  hasStructuredMcq?: boolean
}

export function checkRemediationOutput(input: RemediationOutputInput): RemediationOutputCheck {
  try {
    if (!input.remediationTurn) return OK
    if (input.hasStructuredMcq) return OK
    const text = typeof input.text === 'string' ? input.text : ''
    // An empty draft is a different failure with a different owner (the
    // provider path). Claiming it here would only mislabel it.
    if (text.trim().length === 0) return OK

    // 1. DID IT EXPLAIN ANYTHING? Cut the turn back to its teaching using the
    //    repository's existing splitter. Nothing left ⇒ the entire turn was a
    //    question, however new or well-phrased that question is.
    if (cutBackToTeaching(text).length === 0) {
      return {
        violation: 'question-only',
        reason: 'the entire turn was a question; the learner said they do not understand '
          + 'and was asked something instead of being taught',
      }
    }

    // 2. DID IT SAY ANYTHING NEW? Strict containment, so this can only fire on
    //    genuine repetition — a reply whose every word already appeared in the
    //    turn the learner just told us did not land.
    const prev = typeof input.previousAssistantText === 'string' ? input.previousAssistantText : ''
    if (prev.trim().length > 0) {
      const here = norm(text)
      if (here.length > 0 && norm(prev).includes(here)) {
        return {
          violation: 'repeats-previous-turn',
          reason: 'the reply is contained word-for-word in the previous turn — the one the '
            + 'learner has just said did not land',
        }
      }
    }

    return OK
  } catch {
    // A floor must never take a turn down. Unchanged is the safe outcome.
    return OK
  }
}

/**
 * The remediation contract, restated as an ENFORCED instruction.
 *
 * Shape and stance copied from the V-AFFIRM safety floor's own repair appendix
 * in route.ts: name the rejection, say what to do instead, and hand the model
 * the CURRICULUM'S OWN material rather than telling it to try harder. That
 * repair's recorded lesson was that a prohibition alone fails — "telling the
 * model 'don't agree' leaves it with nothing to say instead" — so `authored`
 * carries retrieval, never invention, and is simply absent when the curriculum
 * has nothing to offer.
 *
 * The directions below are not new pedagogy. They are FOUNDATION_REBUILD's own
 * authored instructions (`STRATEGY_INSTRUCTIONS.FOUNDATION_REBUILD`), which the
 * engine already selected for this turn and whose prompt block is suppressed.
 */
export function buildRemediationRepairAppendix(
  violation: RemediationOutputViolation,
  authored: string,
): string {
  const named = violation === 'question-only'
    ? 'Your reply was only a question. The learner told you they do not understand; '
      + 'asking them something else does not teach them anything.'
    : 'Your reply repeated what you had already said. The learner has just told you '
      + 'that exact wording did not land, so saying it again cannot help.'
  return (
    '\n\nOUTPUT REJECTED (server-side check). ' + named
    + ' Re-teach the SAME idea, more simply: start from one concrete everyday thing the '
    + 'learner already knows, use plain words, and take one small step. Explain first — '
    + 'do not open with a question, and do not reply with only a question. '
    + 'Do not introduce a new formula, derivation or piece of notation, and do not move '
    + 'the lesson forward: stay on this concept until it lands.'
    + authored
    + '\nAnswer the learner now.'
  )
}

/**
 * The last resort, spoken in the curriculum's own words.
 *
 * Same reasoning as the affirmation floor's own final fallback: a safe template
 * that says nothing is only half a fix, because the learner asked a real
 * question and received filler. The Knowledge Graph description is the one
 * place the curriculum states a concept in a single learner-facing sentence,
 * for every concept — so the fallback is correct by construction (it asserts
 * only what the curriculum asserts) and is genuinely an explanation.
 *
 * Returns null when there is no usable sentence, handing the decision back to
 * the caller rather than fabricating a definition. `readsAsProse` is the same
 * shape test the affirmation floor applies for the same reason: authored text
 * is written for an AUTHOR, and its ordinary case is a mastery rubric or a
 * metadata block, which is wrong to SAY.
 */
export function buildRemediationFallbackText(conceptSentence: string | null | undefined): string | null {
  const s = (conceptSentence ?? '').trim()
  if (s.length < 25 || s.length > 400) return null
  if (/^[[(]/.test(s)) return null            // "[Boundary statement] …"
  if (/^\s*\d+[.)]\s/.test(s)) return null    // a numbered rubric item
  return (
    'Let me put it in the simplest words I have.\n\n'
    + s + '\n\n'
    + 'Tell me which part of that is the fuzzy one, and I will go slower there.'
  )
}
