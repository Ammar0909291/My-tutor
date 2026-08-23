/**
 * TURN INTENT — the authoritative reading of the learner's message. Phase 1.
 *
 * ── THE PROBLEM THIS BOUNDARY EXISTS FOR ────────────────────────────────────
 * Nine separate places in one turn independently read the learner's raw text
 * and draw their own conclusion from it, spread across ~1,700 lines of
 * route.ts. Nothing reconciles them, so when two disagree the winner is decided
 * by source order. That is the authority defect the architecture audit found,
 * and it is upstream of most of the learner-facing failures.
 *
 * This module is the single place the message is READ. It calls the EXISTING
 * detectors — it does not reimplement, replace or tune any of them — exactly
 * once each, and hands the results to everything downstream.
 *
 * ── WHAT IT DELIBERATELY DOES NOT DO ────────────────────────────────────────
 * It decides nothing. There is no policy here: no precedence between signals,
 * no "stop beats question", no resolution of disagreement. Where two detectors
 * disagree, the disagreement is RECORDED (`conflicts`) and both values are
 * kept. Choosing between them is an authority change and belongs to a later
 * phase; Phase 1's job is to make the disagreement visible and to stop the
 * result depending on which line number ran first.
 *
 * Consequently this file changes no behaviour. Every consumer receives the same
 * value the same detector gave it before, because it IS the same detector call
 * with the same inputs — only hoisted to one place and shared.
 *
 * ── WHAT IS NOT HERE, AND WHY ───────────────────────────────────────────────
 * Two raw-text readers could NOT be moved without changing behaviour, and
 * inventing a way around that would have defeated the point:
 *
 *   · resolveRequestedConceptId  needs `excursionLessonConceptId`, which is
 *     itself computed mid-turn from three fallbacks.
 *   · namedTopicUnknownTo        needs the text of the lesson AND of any
 *     currently-active excursion, i.e. live excursion state.
 *
 * Both are state-dependent, not pure text reads. Hoisting them means hoisting
 * excursion state, which is an excursion redesign — explicitly out of scope for
 * this phase. They remain where they are and are reported.
 */
import { detectFailureState, type FailureStateKey } from './recoveryGuard'
import { detectExplicitFinishRequest } from './sessionLifecycle'
import {
  detectLearnerRequest, requestedVisualForm,
  type LearnerRequest, type RequestedVisualForm,
} from './masteryGate'
import { isGenuineQuestion } from '../understanding/readers/conversationReader'

/**
 * A disagreement between two readings of the same message.
 *
 * Recorded, never resolved. The learner who types "I'm done for today, but why
 * does it bend?" genuinely means both things, and a turn architecture that
 * silently picks one is how a stop gets answered with a question.
 */
export interface TurnIntentConflict {
  code:
    | 'STOP_AND_QUESTION'
    | 'STOP_AND_REQUEST'
    | 'DISTRESS_AND_REQUEST'
  detail: string
}

/**
 * Everything the raw message says, read once.
 *
 * Deliberately small: only the readings that were previously derived from raw
 * text at more than one place, or that another component could contradict. A
 * reading nothing can disagree with does not need to be here.
 */
export interface TurnIntent {
  /** The learner's message, so a consumer never needs to re-read it. */
  readonly message: string
  /** recoveryGuard's failure-state key, or null. */
  failureState: FailureStateKey | null
  /** conversationReader's "is this a real question?" */
  isQuestion: boolean
  /** sessionLifecycle's explicit stop/defer read. */
  wantsToStop: boolean
  /** masteryGate's teaching-action request (diagram / example / simplify). */
  learnerRequest: LearnerRequest | null
  /** masteryGate's specific requested visual FORM, when one was named. */
  visualForm: RequestedVisualForm | null
  /** Readings that disagree. Empty is the common case. */
  conflicts: TurnIntentConflict[]
  /**
   * True when two readings disagree.
   *
   * PHASE 1 RECORDS THIS AND NOTHING ACTS ON IT. The architectural rule it is
   * being built for — ambiguity must not cause an educational action — is a
   * behaviour change and belongs to a later phase. Wiring it now would have
   * meant changing behaviour in the same commit that established the boundary,
   * leaving no clean baseline to compare against.
   */
  ambiguous: boolean
}

/**
 * Read the learner's message once.
 *
 * PURE. Same detectors, same inputs, same results — this is a hoist, not a
 * reinterpretation.
 */
export function readTurnIntent(
  message: string,
  priorUserMessage: string | null,
): TurnIntent {
  const failureState = detectFailureState(message, priorUserMessage)
  const isQuestion = isGenuineQuestion(message)
  const wantsToStop = detectExplicitFinishRequest(message)
  const learnerRequest = detectLearnerRequest(message)
  const visualForm = requestedVisualForm(message)

  const conflicts: TurnIntentConflict[] = []
  if (wantsToStop && isQuestion) {
    conflicts.push({
      code: 'STOP_AND_QUESTION',
      detail: 'the message both ends the session and asks something',
    })
  }
  if (wantsToStop && learnerRequest !== null) {
    conflicts.push({
      code: 'STOP_AND_REQUEST',
      detail: `the message both ends the session and requests ${learnerRequest}`,
    })
  }
  if (failureState !== null && learnerRequest !== null) {
    conflicts.push({
      code: 'DISTRESS_AND_REQUEST',
      detail: `distress (${failureState}) alongside an explicit request for ${learnerRequest}`,
    })
  }

  return {
    message,
    failureState,
    isQuestion,
    wantsToStop,
    learnerRequest,
    visualForm,
    conflicts,
    ambiguous: conflicts.length > 0,
  }
}
