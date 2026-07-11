/**
 * Action Procedure Retrieval — Wave 1 (Runtime Guardian).
 *
 * decide() (the frozen Teaching Engine) already names WHICH action runs
 * each turn, deterministically. But HOW each action is executed — fully
 * authored in the Educational Brain — was never retrieved: the LLM
 * re-invented worked-example structure, repair sequences, and review
 * form on every turn. This module is a data-only transcription (the
 * brainSeedAssets pattern) keyed by the ActionType decide() already
 * emits. No new pedagogy: every line cites its authored source.
 *
 * Sources:
 *  - educational-brain/teaching-actions/ (the 27-action catalog):
 *    per-action procedure + failure mode.
 *  - educational-brain/misconceptions/02-the-repair-sequence.md:
 *    the generic 7-step repair.
 *  - educational-brain/decision-engine/06 §1-2: question ceiling and
 *    the one-move-per-turn rule, where an action's procedure depends
 *    on them.
 */
import type { ActionType } from '@/lib/teaching-engine/types'

const PROCEDURES: Record<ActionType, { title: string; lines: string[] }> = {
  VISUAL_EXPLANATION: {
    // teaching-actions/01-show-family.md #1 Demonstration
    title: 'Demonstration (SHOW)',
    lines: [
      'Elicit a prediction BEFORE any reveal ("what do you think happens if…?") — a demonstration without a committed prediction is television.',
      'Show the thing working TWICE before naming or defining it (one instance is an event, two are a pattern).',
      'Exaggerate the critical moment on the first pass ("watch RIGHT here").',
      'If confusion appears, re-run the SAME demo slower with the key instant exaggerated — do not switch examples yet, and never re-explain verbally what the demo just showed.',
    ],
  },
  STEP_BY_STEP_GUIDED: {
    // teaching-actions/01 #2 Worked Example + 03 #10 Completion Problem;
    // self-explanation attachment per 04 #18 (closes validation/05's gap)
    title: 'Worked Example → Completion (SHOW→DO fading)',
    lines: [
      'Show the complete solution once, stating the REASON for each step, not just the move.',
      'Attach one self-explanation prompt to a pivotal step ("why did we do that step there, and not earlier?") — a restated procedure is not an explanation; redirect once to the WHY.',
      'Then hand over a COMPLETION problem: the first steps already solved, the learner finishes the rest. Never jump from a full worked example straight to a fully independent problem.',
      'Grow the learner-completed fraction only after fluent success — fast, correct, and confident together; a slow-correct answer holds the current level.',
    ],
  },
  INTERACTIVE_QUESTIONING: {
    // teaching-actions/04 #15 Prediction + #18 Self-Explanation;
    // decision-engine/06 §1 question ceiling
    title: 'Prediction + Self-Explanation (TEST-THINKING)',
    lines: [
      'Ask for a committed prediction before any reveal; a wrong prediction is the stake that makes the reveal teach — never soften it before the reveal lands.',
      'For correct work, probe the WHY ("why does that step work?") — target the reason, not a recital of the steps.',
      'HARD CEILING: never more than two questions in a row. After two, GIVE something — a statement, a demonstration beat, an observation — before any third question.',
      'Every learner answer gets a contentful reaction before your next move — evidence you heard it, not "great!".',
    ],
  },
  PROBLEM_SOLVING_SESSION: {
    // teaching-actions/03 #11 Faded Practice
    title: 'Faded Practice (DO)',
    lines: [
      'Fresh isomorphic problems at controlled difficulty — never repeat an identical item.',
      'Fade support one level at a time: supported → prompted → fully solo.',
      'Advance the fade ONLY on the fluency gate: fast + correct + confident, not correctness alone. A hesitant success means one more of the SAME type.',
      'One problem per turn; when a solo attempt fails, step back one support level silently — no commentary about stepping back.',
    ],
  },
  MISCONCEPTION_FIX: {
    // misconceptions/02-the-repair-sequence.md §1 — the 7-step sequence
    title: 'Misconception Repair (the 7-step sequence — follow IN ORDER)',
    lines: [
      '1. ELICIT the learner\'s actual rule in their own words — a probe their wrong model will answer confidently, never an accusation.',
      '2. COMMIT them to it explicitly ("so you\'re saying X — lock that in") before showing anything.',
      '3. COLLIDE: one concrete case where their committed rule visibly breaks. Let the mismatch sit in silence for a beat before you speak — the silence does the teaching.',
      '4. REPLACE: state the correct model ONCE, plainly — one clear sentence through the door the collision opened, not a lecture.',
      '5. CONTRAST: name why the old rule felt right and exactly where it stops working — skipping this is why repairs regrow.',
      '6. APPLY: the learner uses the new model on a FRESH surface — never the collision case itself.',
      '7. Do NOT certify the repair this session — re-probing comes delayed and disguised, another day.',
      'Never spot-correct and move on; if this misconception was repaired before, use a DIFFERENT collision case than last time.',
    ],
  },
  RAPID_REVIEW: {
    // teaching-actions/05 #23 Retrieval-Schedule Prompt
    title: 'Retrieval Practice (ORGANIZE)',
    lines: [
      'Produce-the-answer retrieval only — NEVER "do you remember X?" (that tests whether they think they remember, not the memory itself).',
      'Cue with the encoding context ("remember the pizza-sharing approach — …?"), not a bare definition request.',
      'Expect the cascade: one successful retrieval often pulls related items back — when the learner starts filling in unprompted, do not interrupt.',
      'Failed retrieval gets a richer cue, not the answer; give the answer only after two cued attempts, then have them produce it back.',
    ],
  },
}

/**
 * The retrieved HOW for the action decide() selected. Injected directly
 * under the TEACHING ENGINE DECISION block so the decision and its
 * authored execution procedure read as one instruction.
 */
export function buildActionProcedureBlock(actionType: ActionType): string {
  const p = PROCEDURES[actionType]
  if (!p) return ''
  return (
    `\n\nACTION PROCEDURE — ${p.title} (authored method for the action above; follow it, do not improvise the structure):\n` +
    p.lines.map((l) => `- ${l}`).join('\n')
  )
}
