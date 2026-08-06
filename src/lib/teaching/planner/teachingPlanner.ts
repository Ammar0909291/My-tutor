/**
 * Teaching Planner — the orchestration layer.
 *
 * `planTeachingTurn()` is a pure, deterministic function: same inputs always
 * produce a deeply-equal plan. No LLM calls, no database, no Prisma, no
 * rendering, no lesson execution, no visualization generation. It decides
 * WHICH subsystem runs and on WHAT concept; every subsystem it names already
 * exists.
 *
 * Not wired into the runtime — integration is deliberately deferred.
 *
 * RULE ORDER IS THE CONTRACT. Intent classification walks an explicitly
 * ordered rule list and returns on the first match. The order encodes real
 * precedence (an explicit "go back to the lesson" outranks everything; a
 * comparison outranks a plain explanation because it names two concepts),
 * and it is what makes the planner deterministic rather than
 * "whichever regex happened to be checked first".
 */

import {
  TeachingIntent, LessonMode, ExecutionStep,
  type PlannerInputs, type TeachingPlan, type PlanRequirements,
  type ExcursionPlan, type ResolvedConcept,
} from './teachingPlan'

// ── Signal detection ──────────────────────────────────────────────────────
//
// These regexes cover intents the existing runtime has NO detector for at
// all. The one overlap — diagram/example requests — is NOT re-detected here:
// callers pass `learnerRequest` from the existing `detectLearnerRequest()`
// (masteryGate.ts) and the planner consumes that decision.
//
// VISUALIZATION_NOUN_RE is the single deliberate widening. The investigation
// proved `DIAGRAM_RE` matches the verb forms ("visualize"/"visualise") but
// not the noun ("visualization"), so "Explain X with visualization" produced
// no request signal at all. This adds the noun forms only; it does not
// restate the verb forms the existing detector already owns.

const RETURN_TO_LESSON_RE = /\b(back\s+to\s+(the\s+)?(lesson|topic|chapter)|resume\s+(the\s+)?lesson|continue\s+(the\s+)?lesson|where\s+we(?:'?re|\s+were)\s+(left|up\s+to)|carry\s+on\s+with)\b/i
const CHANGE_TOPIC_RE = /\b(switch\s+to|change\s+(the\s+)?topic|move\s+on\s+to|let'?s\s+do|skip\s+(this|ahead)|instead\s+of\s+this|forget\s+(this|that)|stop\s+(this|the)\s+lesson)\b/i
const COMPARE_RE = /\b(compare|comparison|difference\s+between|differences\s+between|versus|vs\.?|contrast|how\s+(is|are)\s+.{1,40}\s+different|same\s+as)\b/i
const QUIZ_RE = /\b(quiz|test\s+me|ask\s+me|practice\s+questions?|give\s+me\s+(a\s+)?(question|problem)s?\s+to|mcq|check\s+(my\s+)?understanding)\b/i
const SOLVE_RE = /\b(solve|calculate|compute|work\s+(this|it)\s+out|find\s+the\s+value|what\s+is\s+the\s+answer|how\s+do\s+i\s+(solve|calculate)|step[\s-]by[\s-]step)\b/i
const REVISE_RE = /\b(revise|revision|review|recap|refresh|go\s+over\s+(it|this|that)\s+again|remind\s+me)\b/i
const DEFINE_RE = /\b(define|definition\s+of|what\s+(is|are)\s+(a|an|the)?\s*\w|what\s+does\s+.{1,40}\s+mean|meaning\s+of)\b/i
const VISUALIZATION_NOUN_RE = /\b(visuali[sz]ation|visuals?)\b/i
const FOLLOW_UP_RE = /\b(why|how\s+come|what\s+about\s+(it|that|this)|and\s+then|so\s+then|tell\s+me\s+more|go\s+on|continue|elaborate|expand\s+on\s+(it|that|this))\b/i

/** Pronoun-only reference with no new concept named — a continuation of the
 *  turn before it, not a new request. Deliberately only consulted for
 *  QUESTIONS: a bare acknowledgement ("ok, got it") also contains a pronoun
 *  but is lesson continuation, not a follow-up question. */
const PRONOUN_REFERENCE_RE = /\b(it|that|this|they|them|those|these)\b/i

/** Interrogative framing — a trailing '?' or a leading question word. */
const QUESTION_RE = /\?\s*$|^\s*(what|why|how|when|where|which|who|can|could|do|does|did|is|are|should)\b/i

// ── Concept resolution ────────────────────────────────────────────────────

/** Deterministic ranking: confidence desc, then conceptId asc as the
 *  tie-break so equal-confidence matches never reorder between runs. */
function rankConcepts(matches: readonly ResolvedConcept[]): readonly ResolvedConcept[] {
  return [...matches].sort((a, b) =>
    b.confidence - a.confidence || a.conceptId.localeCompare(b.conceptId))
}

function resolveConcepts(inputs: PlannerInputs): readonly ResolvedConcept[] {
  if (!inputs.resolveConcept) return []
  const message = inputs.message ?? ''
  if (message.trim() === '') return []
  return rankConcepts(inputs.resolveConcept(message))
}

// ── Intent classification ─────────────────────────────────────────────────

interface Classification {
  intent: TeachingIntent
  confidence: number
  reason: string
}

/**
 * Walks the ordered rule list. `namedConcepts` is the resolver's ranked
 * output; several rules depend on whether the student actually named a
 * concept, which is what separates "explain Newton's Second Law" (an
 * excursion) from "explain that again" (a follow-up inside the lesson).
 */
function classifyIntent(inputs: PlannerInputs, namedConcepts: readonly ResolvedConcept[]): Classification {
  const message = (inputs.message ?? '').trim()
  if (message === '') {
    return { intent: TeachingIntent.UNKNOWN, confidence: 0, reason: 'Empty message — nothing to classify.' }
  }

  const namesAConcept = namedConcepts.length > 0
  const namesTwoConcepts = namedConcepts.length >= 2
  const wantsVisual = inputs.learnerRequest === 'diagram' || VISUALIZATION_NOUN_RE.test(message)

  // 1. Explicit return outranks everything — the student is telling us where
  //    they want to be, which no inference should override.
  if (RETURN_TO_LESSON_RE.test(message)) {
    return { intent: TeachingIntent.RETURN_TO_LESSON, confidence: 0.95, reason: 'Explicit request to return to the lesson.' }
  }

  // 2. Explicit topic change — a deliberate move with no return owed.
  if (CHANGE_TOPIC_RE.test(message)) {
    return { intent: TeachingIntent.CHANGE_TOPIC, confidence: 0.9, reason: 'Explicit request to change topic.' }
  }

  // 3. Comparison needs two concepts; a comparison marker alone (e.g. "how is
  //    this different?") is a follow-up about the current concept, not a
  //    two-concept comparison, so both conditions are required.
  if (COMPARE_RE.test(message) && namesTwoConcepts) {
    return { intent: TeachingIntent.COMPARE_CONCEPTS, confidence: 0.9, reason: 'Comparison marker with two or more named concepts.' }
  }

  if (QUIZ_RE.test(message)) {
    return { intent: TeachingIntent.QUIZ_ME, confidence: 0.9, reason: 'Explicit request to be quizzed or tested.' }
  }

  if (SOLVE_RE.test(message)) {
    return { intent: TeachingIntent.SOLVE_PROBLEM, confidence: 0.85, reason: 'Request to solve or calculate a concrete problem.' }
  }

  if (REVISE_RE.test(message)) {
    return { intent: TeachingIntent.REVISE_TOPIC, confidence: 0.85, reason: 'Request to revise or review previously taught material.' }
  }

  // 4. Visualization outranks plain explanation: "explain X with a diagram"
  //    is both, and the visual is the part the current runtime gets wrong.
  //    The explanation is still required — see requirementsFor().
  if (wantsVisual) {
    return { intent: TeachingIntent.VISUALIZE_CONCEPT, confidence: namesAConcept ? 0.9 : 0.75, reason: 'Visualization requested (learnerRequest=diagram or an explicit visualization noun).' }
  }

  if (inputs.learnerRequest === 'real_life_example') {
    return { intent: TeachingIntent.REAL_WORLD_EXAMPLE, confidence: 0.85, reason: 'Real-world example requested (existing learnerRequest signal).' }
  }

  // 5. A definition request only counts as DEFINE_TERM when a concept is
  //    actually named; otherwise "what is it?" is a follow-up.
  if (DEFINE_RE.test(message) && namesAConcept) {
    return { intent: TeachingIntent.DEFINE_TERM, confidence: 0.8, reason: 'Definition requested for a named concept.' }
  }

  // 6. A named concept with no other marker is an explanation request.
  if (namesAConcept) {
    return { intent: TeachingIntent.EXPLAIN_CONCEPT, confidence: 0.75, reason: 'A concept is explicitly named with no more specific request marker.' }
  }

  // 7. No concept named: a continuation marker or bare pronoun reference is a
  //    follow-up on whatever we were already doing.
  if (FOLLOW_UP_RE.test(message) || (QUESTION_RE.test(message) && PRONOUN_REFERENCE_RE.test(message))) {
    return { intent: TeachingIntent.FOLLOW_UP, confidence: 0.7, reason: 'Continuation marker, or a question referring back by pronoun, with no new concept named.' }
  }

  // 8. Inside a lesson, an unmarked message is lesson work.
  if (inputs.activeLessonConceptId) {
    return { intent: TeachingIntent.CONTINUE_LESSON, confidence: 0.6, reason: 'No explicit request signal while a lesson is active — treated as lesson continuation.' }
  }

  return { intent: TeachingIntent.UNKNOWN, confidence: 0.3, reason: 'No request signal, no named concept, and no active lesson.' }
}

// ── Derivations ───────────────────────────────────────────────────────────

/** Intents that are ABOUT a specific concept, and can therefore leave the
 *  lesson when that concept differs from the lesson's own. */
const CONCEPT_DIRECTED: ReadonlySet<TeachingIntent> = new Set([
  TeachingIntent.EXPLAIN_CONCEPT,
  TeachingIntent.VISUALIZE_CONCEPT,
  TeachingIntent.COMPARE_CONCEPTS,
  TeachingIntent.DEFINE_TERM,
  TeachingIntent.SOLVE_PROBLEM,
  TeachingIntent.REVISE_TOPIC,
  TeachingIntent.REAL_WORLD_EXAMPLE,
])

function requirementsFor(intent: TeachingIntent): PlanRequirements {
  const base: PlanRequirements = { explanation: false, visualization: false, assessment: false, workedSolution: false, revision: false }
  switch (intent) {
    case TeachingIntent.VISUALIZE_CONCEPT:
      // Explanation too: a visual alone is not teaching.
      return { ...base, explanation: true, visualization: true }
    case TeachingIntent.EXPLAIN_CONCEPT:
    case TeachingIntent.DEFINE_TERM:
    case TeachingIntent.COMPARE_CONCEPTS:
    case TeachingIntent.REAL_WORLD_EXAMPLE:
    case TeachingIntent.FOLLOW_UP:
      return { ...base, explanation: true }
    case TeachingIntent.QUIZ_ME:
      return { ...base, assessment: true }
    case TeachingIntent.SOLVE_PROBLEM:
      return { ...base, explanation: true, workedSolution: true }
    case TeachingIntent.REVISE_TOPIC:
      return { ...base, explanation: true, revision: true }
    case TeachingIntent.CONTINUE_LESSON:
    case TeachingIntent.CHANGE_TOPIC:
    case TeachingIntent.RETURN_TO_LESSON:
    case TeachingIntent.UNKNOWN:
    default:
      return base
  }
}

function targetConceptFor(
  intent: TeachingIntent,
  inputs: PlannerInputs,
  namedConcepts: readonly ResolvedConcept[],
): string | null {
  if (intent === TeachingIntent.RETURN_TO_LESSON) return inputs.activeLessonConceptId
  // A named concept wins for concept-directed intents; otherwise the turn is
  // about wherever we already are (mid-excursion first, then the lesson).
  if (CONCEPT_DIRECTED.has(intent) && namedConcepts.length > 0) return namedConcepts[0].conceptId
  return inputs.currentExcursionConceptId ?? inputs.activeLessonConceptId ?? null
}

function lessonModeFor(intent: TeachingIntent, inputs: PlannerInputs, targetConceptId: string | null): LessonMode {
  if (intent === TeachingIntent.CHANGE_TOPIC) return LessonMode.LESSON_CHANGED
  if (!inputs.activeLessonConceptId) return LessonMode.NO_LESSON
  if (intent === TeachingIntent.RETURN_TO_LESSON) return LessonMode.IN_LESSON
  const offLesson = targetConceptId !== null && targetConceptId !== inputs.activeLessonConceptId
  return offLesson ? LessonMode.TEMPORARY_EXCURSION : LessonMode.IN_LESSON
}

function excursionFor(lessonMode: LessonMode, inputs: PlannerInputs): ExcursionPlan {
  if (lessonMode === LessonMode.TEMPORARY_EXCURSION) {
    return { isExcursion: true, returnToConceptId: inputs.activeLessonConceptId, returnToLesson: true }
  }
  return { isExcursion: false, returnToConceptId: null, returnToLesson: false }
}

function executionSequenceFor(
  intent: TeachingIntent,
  requires: PlanRequirements,
  lessonMode: LessonMode,
): readonly ExecutionStep[] {
  const steps: ExecutionStep[] = []
  if (requires.revision) steps.push(ExecutionStep.REVISION)
  if (requires.explanation) steps.push(ExecutionStep.EXPLANATION)
  if (requires.workedSolution) steps.push(ExecutionStep.WORKED_SOLUTION)
  // Visualization runs after the explanation it accompanies: the VIE builds a
  // VisualIntent for the concept the explanation just addressed.
  if (requires.visualization) steps.push(ExecutionStep.VISUALIZATION)
  if (requires.assessment) steps.push(ExecutionStep.ASSESSMENT)
  if (intent === TeachingIntent.CONTINUE_LESSON || intent === TeachingIntent.CHANGE_TOPIC) {
    steps.push(ExecutionStep.LESSON_FLOW)
  }
  if (intent === TeachingIntent.RETURN_TO_LESSON) steps.push(ExecutionStep.LESSON_RESUME)
  // An excursion always ends by handing control back.
  else if (lessonMode === LessonMode.TEMPORARY_EXCURSION) steps.push(ExecutionStep.LESSON_RESUME)
  return steps
}

// ── Entry point ───────────────────────────────────────────────────────────

/**
 * Plan one student turn. Pure and deterministic — given the same inputs (and
 * a deterministic `resolveConcept`), always returns a deeply-equal plan.
 */
export function planTeachingTurn(inputs: PlannerInputs): TeachingPlan {
  const namedConcepts = resolveConcepts(inputs)
  const { intent, confidence, reason } = classifyIntent(inputs, namedConcepts)

  const targetConceptId = targetConceptFor(intent, inputs, namedConcepts)
  const lessonMode = lessonModeFor(intent, inputs, targetConceptId)
  const excursion = excursionFor(lessonMode, inputs)
  const requires = requirementsFor(intent)
  const executionSequence = executionSequenceFor(intent, requires, lessonMode)

  const comparisonConceptIds = intent === TeachingIntent.COMPARE_CONCEPTS
    ? namedConcepts.map(c => c.conceptId)
    : []

  const reasoning: string[] = [reason]
  if (namedConcepts.length > 0) {
    reasoning.push(`Concepts named in the message: ${namedConcepts.map(c => c.conceptId).join(', ')}.`)
  } else {
    reasoning.push('No concept was resolved from the message text.')
  }
  reasoning.push(`Lesson mode: ${lessonMode} (active lesson concept: ${inputs.activeLessonConceptId ?? 'none'}).`)
  if (excursion.isExcursion) {
    reasoning.push(`Temporary excursion — control returns to ${excursion.returnToConceptId ?? 'the lesson'} afterwards.`)
  }

  return {
    intent,
    targetConceptId,
    comparisonConceptIds,
    lessonMode,
    excursion,
    requires,
    executionSequence,
    confidence,
    reasoning,
  }
}
