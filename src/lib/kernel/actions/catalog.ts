/**
 * K4 — Teaching Action catalog (closed set, RS §6 syscall table).
 *
 * A subset of D12's 27 actions the runtime USES today. Rest arrive when
 * their consuming policy row / content payload arrives (K4/K5 follow-on).
 * The set is closed: unknown action classes fall through to a scripted
 * default rather than being invented.
 */

export const TEACHING_ACTIONS = [
  // SHOW family
  'DEMONSTRATION',       // teaching-actions/01 #1
  'WORKED_EXAMPLE',      // #2
  // TELL family
  'GUIDED_EXPLANATION',  // #6 explanation
  'ANALOGY',             // #7
  // DO family
  'COMPLETION_PROBLEM',  // #10
  'FADED_PRACTICE',      // #11
  // TEST-THINKING family
  'OBSERVATION_QUESTION', // #14 predictive/observational
  'PROBE',                // generic diagnostic item
  'SELF_EXPLANATION',     // #18
  // Special-purpose
  'MISCONCEPTION_FIX',    // misconceptions/02 the 7-step
  'RECOVERY_SCRIPT',      // foundations/01 §3
  'REPEAT_SAME_TYPE',     // FRAGILE hold — one more of the same
  'RETRIEVAL_PROMPT',     // teaching-actions/05 #23
  'WARM_CLOSE',           // decision-engine/07 §6
] as const

export type TeachingActionId = (typeof TEACHING_ACTIONS)[number]

/** Presentation and interaction defaults per action. RS §6 says the
 *  Visual Engine (§9.5) picks the medium; this table captures the
 *  default only, and Band 5 personalization / VisualDirective may
 *  override it. */
export const ACTION_DEFAULTS: Record<TeachingActionId, {
  presentationMode: 'text' | 'visual_and_text' | 'interactive'
  interactionLevel: 'low' | 'guided' | 'active' | 'high'
  cost: 0 | 1 | 2 | 3
}> = {
  DEMONSTRATION:        { presentationMode: 'visual_and_text', interactionLevel: 'low',    cost: 1 },
  WORKED_EXAMPLE:       { presentationMode: 'text',            interactionLevel: 'low',    cost: 1 },
  GUIDED_EXPLANATION:   { presentationMode: 'text',            interactionLevel: 'guided', cost: 0 },
  ANALOGY:              { presentationMode: 'text',            interactionLevel: 'low',    cost: 0 },
  COMPLETION_PROBLEM:   { presentationMode: 'interactive',     interactionLevel: 'active', cost: 1 },
  FADED_PRACTICE:       { presentationMode: 'interactive',     interactionLevel: 'active', cost: 1 },
  OBSERVATION_QUESTION: { presentationMode: 'interactive',     interactionLevel: 'active', cost: 0 },
  PROBE:                { presentationMode: 'interactive',     interactionLevel: 'active', cost: 0 },
  SELF_EXPLANATION:     { presentationMode: 'interactive',     interactionLevel: 'guided', cost: 0 },
  MISCONCEPTION_FIX:    { presentationMode: 'text',            interactionLevel: 'guided', cost: 2 },
  RECOVERY_SCRIPT:      { presentationMode: 'text',            interactionLevel: 'low',    cost: 0 },
  REPEAT_SAME_TYPE:     { presentationMode: 'interactive',     interactionLevel: 'active', cost: 0 },
  RETRIEVAL_PROMPT:     { presentationMode: 'interactive',     interactionLevel: 'active', cost: 0 },
  WARM_CLOSE:           { presentationMode: 'text',            interactionLevel: 'low',    cost: 0 },
}

/** Which actions are legal in which phases (RS §6 fit table subset). */
export const PHASE_FIT: Record<string, TeachingActionId[]> = {
  DIAGNOSE:    ['PROBE', 'OBSERVATION_QUESTION'],
  ANCHOR:      ['OBSERVATION_QUESTION', 'DEMONSTRATION'],
  DEMONSTRATE: ['DEMONSTRATION', 'WORKED_EXAMPLE', 'ANALOGY'],
  NAME:        ['GUIDED_EXPLANATION', 'OBSERVATION_QUESTION'],
  FORMALIZE:   ['GUIDED_EXPLANATION', 'WORKED_EXAMPLE'],
  GUIDED:      ['GUIDED_EXPLANATION', 'COMPLETION_PROBLEM', 'WORKED_EXAMPLE'],
  INDEPENDENT: ['FADED_PRACTICE', 'PROBE'],
  REFLECT:     ['SELF_EXPLANATION', 'RETRIEVAL_PROMPT'],
  ASSESS:      ['PROBE'],
  TRANSFER:    ['PROBE', 'FADED_PRACTICE'],
  // Legacy 6-phase (ISS-01 handled at phases.legacyToCanonical)
  OBSERVE:     ['OBSERVATION_QUESTION', 'DEMONSTRATION'],
  GUIDE:       ['GUIDED_EXPLANATION', 'WORKED_EXAMPLE'],
  CHECK:       ['PROBE', 'OBSERVATION_QUESTION'],
  PRACTICE:    ['FADED_PRACTICE', 'PROBE'],
}

export function isKnownAction(x: string): x is TeachingActionId {
  return (TEACHING_ACTIONS as readonly string[]).includes(x)
}
