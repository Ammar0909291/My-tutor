/**
 * K4 — Base Policy Pack v0 (in-code).
 *
 * The seed pack. Rules cite the frozen documents that authored them.
 * C4 replaces this with a build artifact compiled from CEKR/BrainScript;
 * the engine executes both identically (that is the whole point of
 * policy-as-data).
 *
 * Coverage (K4 v1):
 *  Band 0: recovery preemption
 *  Band 1: obligations (retro-close-owed, opening reviews)
 *  Band 2: legality (stage ceiling from TSM; question-budget filters;
 *          first-lesson vocabulary ban; register floor)
 *  Band 3: authored dispatch — EMPTY (needs CEKR/C4)
 *  Band 4: D1 grid + move selection tables
 *  Band 5: worked-example-first, beginner tuning, autonomy honoring
 *  Band 6: fallback chain default
 *
 * Every rule declares its citation. The MANDATORY set is:
 *   Band 0: recovery-preempt
 *   Band 2: stage-ceiling, question-budget
 *   Band 4: default-move-fallback
 *   Band 6: fallback-chain
 */
import type { PolicyPack, Rule } from './types'
import { getStageCeiling } from '../tsm/phases'

const P = (id: string, band: 0|1|2|3|4|5|6, citation: string, guard: Rule['guard'], effect: Rule['effect'], opts: { specificity: number; mandatory?: boolean }): Rule => ({
  ruleId: id, band, citation, guard, effect,
  specificity: opts.specificity, mandatory: opts.mandatory ?? false,
})

// ── Band 0 — Interrupts ─────────────────────────────────────────────────────

const b0Recovery = P(
  'B0.recovery.preempt.v1', 0,
  'foundations/01 §3 + decision-engine/03 §0',
  { reads: ['interruptActive', 'failureStateKey'], match: (i) => i.interruptActive && i.failureStateKey !== null, describe: 'interrupt.active with failure state key' },
  {
    move: 'RECOVER',
    actionClass: 'RECOVERY_SCRIPT',
    budgets: { maxQuestions: 0, maxParagraphs: 2, maxNewTerms: 0 },
    vocabularyBans: ['formula', 'notation'],
    visualClass: null,
    contentSlots: [{ kind: 'recovery-script', payload: {}, citation: 'foundations/01 §3' }],
  },
  { specificity: 2, mandatory: true },
)

// ── Band 1 — Obligations ────────────────────────────────────────────────────

const b1RetroWin = P(
  'B1.opening.retro-win.v1', 1,
  'decision-engine/07 §1 + §8 rules 2–3',
  { reads: ['freshBoundary', 'retroWinOwed'], match: (i) => i.freshBoundary && i.retroWinOwed, describe: 'fresh session boundary owing an engineered win' },
  { contentSlots: [{ kind: 'opening-block', payload: { retroWinOwed: true }, citation: 'decision-engine/07 §8' }] },
  { specificity: 2 },
)

const b1DueReviews = P(
  'B1.opening.due-reviews.v1', 1,
  'decision-engine/07 §1',
  { reads: ['freshBoundary', 'dueReviewCount'], match: (i) => i.freshBoundary && i.dueReviewCount > 0, describe: 'fresh boundary with due reviews' },
  { contentSlots: [{ kind: 'opening-block', payload: { dueReviewCount: 'fromInputs' }, citation: 'decision-engine/07 §1' }] },
  { specificity: 2 },
)

// ── Band 2 — Legality (subtractive) ─────────────────────────────────────────

const b2StageCeiling = P(
  'B2.legality.stage-ceiling.v1', 2,
  'RS §4.10 + conversationState PHASE_MAX_QUESTION_STAGE',
  { reads: ['phase'], match: () => true, describe: 'always apply the phase ceiling' },
  { stageCeiling: 0 }, // placeholder — engine computes from phase; this rule tags provenance
  { specificity: 1, mandatory: true },
)

const b2QuestionBudget = P(
  'B2.legality.question-budget.v1', 2,
  'first-lesson/02 §2 + conversationState',
  { reads: ['consecutiveFailures', 'contentRegister', 'isFirstLessonContext'], match: () => true, describe: 'always apply the question budget floor' },
  { budgets: { maxQuestions: 0 } },   // upper bound; Band 4 may lift to 1
  { specificity: 1, mandatory: true },
)

const b2FirstLessonVocab = P(
  'B2.legality.first-lesson-vocab.v1', 2,
  'first-lesson/07 subject adaptations',
  { reads: ['isFirstLessonContext'], match: (i) => i.isFirstLessonContext, describe: 'lesson-one is active' },
  { vocabularyBans: ['SI', 'phoneme', 'metric system', 'quantum', 'derivative'] },
  { specificity: 1 },
)

const b2BeginnerVocab = P(
  'B2.legality.beginner-vocab.v1', 2,
  'foundations/03 §5 register floor',
  { reads: ['contentRegister'], match: (i) => i.contentRegister === 'beginner', describe: 'beginner register' },
  { vocabularyBans: ['ipa', 'phonetic notation'] },
  { specificity: 1 },
)

// ── Band 3 — Authored dispatch (empty in K4 v1; C4 populates from CEKR) ─────

// (deliberately empty — see docstring)

// ── Band 4 — Policy tables (D1 grid + move selection) ───────────────────────

/**
 * The D1 grid (foundations/02 §1): speed × correctness × confidence → quadrant.
 * K4 v1 captures the two most actionable quadrants (validation/03).
 */
const b4FastWrongConfident = P(
  'B4.d1.misconceiving.v1', 4,
  'foundations/02 §1 + validation/03',
  { reads: ['lastSignalCorrect', 'lastSignalConfidence'], match: (i) => i.lastSignalCorrect === false && i.lastSignalConfidence === 'high', describe: 'fast-wrong-confident = misconception signature' },
  { move: 'TEACH', actionClass: 'MISCONCEPTION_FIX' },
  { specificity: 2 },
)

const b4HesitantCorrect = P(
  'B4.d1.fragile.v1', 4,
  'foundations/02 §1',
  { reads: ['lastSignalCorrect', 'lastSignalConfidence'], match: (i) => i.lastSignalCorrect === true && i.lastSignalConfidence === 'low', describe: 'hesitant-correct = FRAGILE — hold' },
  { move: 'ASK', actionClass: 'REPEAT_SAME_TYPE' },
  { specificity: 2 },
)

/** Repeated struggle → SHOW, don't interrogate (foundations/01 §3 + Phase F). */
const b4RepeatedStruggle = P(
  'B4.repeated-struggle.show.v1', 4,
  'foundations/01 §3 (worked-example-first)',
  { reads: ['consecutiveFailures'], match: (i) => i.consecutiveFailures >= 2, describe: '≥2 consecutive failures' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  // Specificity 3 = deliberately higher than phase-defaults (1) and D1 grid
  // rules (2). Repeated-struggle is the most selective Band-4 rule because
  // it fires only after other Band-4 rules would (accumulated failure signal).
  { specificity: 3 },
)

/** Two-question ceiling (RS §4.10 planner rule). */
const b4QuestionCeiling = P(
  'B4.max-consecutive-questions.v1', 4,
  'decision-engine/06 §1 + conversationState.decideNextMove',
  { reads: [], match: () => true, describe: 'unconditional; sets 1 max question' },
  { budgets: { maxQuestions: 1 } },
  { specificity: 0 },
)

/** Default move by phase — filled when nothing above matched. */
const b4DefaultAsk = P(
  'B4.default.observe.ask.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'OBSERVE' || i.phase === 'ANCHOR' || i.phase === 'DIAGNOSE', describe: 'anchoring phase → ask observation' },
  { move: 'ASK', actionClass: 'OBSERVATION_QUESTION' },
  { specificity: 1 },
)

const b4DefaultShow = P(
  'B4.default.demonstrate.show.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'DEMONSTRATE' || i.phase === 'NAME', describe: 'demonstrate/name → show' },
  { move: 'SHOW', actionClass: 'DEMONSTRATION' },
  { specificity: 1 },
)

const b4DefaultTeach = P(
  'B4.default.guide.teach.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'GUIDE' || i.phase === 'GUIDED' || i.phase === 'FORMALIZE', describe: 'guided phase → teach' },
  { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION' },
  { specificity: 1 },
)

const b4DefaultCheck = P(
  'B4.default.check.ask.v1', 4,
  'conversationState PHASE_ORDER',
  { reads: ['phase'], match: (i) => i.phase === 'CHECK' || i.phase === 'ASSESS' || i.phase === 'PRACTICE' || i.phase === 'INDEPENDENT' || i.phase === 'TRANSFER' || i.phase === 'REFLECT', describe: 'check/practice/transfer/reflect → ask' },
  { move: 'ASK', actionClass: 'PROBE' },
  { specificity: 1 },
)

const b4Fallback = P(
  'B4.default.fallback.v1', 4,
  'runtime: kernel deadlock fallback',
  { reads: [], match: () => true, describe: 'unconditional — final default' },
  { move: 'TEACH', actionClass: 'GUIDED_EXPLANATION' },
  { specificity: 0, mandatory: true },
)

// ── Band 5 — Personalization ─────────────────────────────────────────────────

const b5BeginnerBudget = P(
  'B5.personalize.beginner-budget.v1', 5,
  'foundations/03 §5 register + Phase D',
  { reads: ['contentRegister', 'consecutiveFailures'], match: (i) => i.contentRegister === 'beginner', describe: 'beginner register' },
  { budgets: { maxParagraphs: 4, maxNewTerms: 1 } },
  { specificity: 1 },
)

const b5BeginnerStrained = P(
  'B5.personalize.beginner-strained.v1', 5,
  'foundations/04 P5 — no content into a flooded mind',
  { reads: ['contentRegister', 'consecutiveFailures'], match: (i) => i.contentRegister === 'beginner' && i.consecutiveFailures >= 2, describe: 'beginner + strained' },
  { budgets: { maxParagraphs: 2, maxNewTerms: 0 } },
  { specificity: 2 },
)

const b5IntermediateBudget = P(
  'B5.personalize.intermediate-budget.v1', 5,
  'Phase D response budgets',
  { reads: ['contentRegister'], match: (i) => i.contentRegister === 'intermediate', describe: 'intermediate register' },
  { budgets: { maxParagraphs: 7, maxNewTerms: 2 } },
  { specificity: 1 },
)

const b5ExpertBudget = P(
  'B5.personalize.expert-budget.v1', 5,
  'Phase D response budgets',
  { reads: ['contentRegister'], match: (i) => i.contentRegister === 'expert', describe: 'expert register' },
  { budgets: { maxParagraphs: null, maxNewTerms: 3 } },
  { specificity: 1 },
)

const b5AutonomyHonor = P(
  'B5.personalize.autonomy.v1', 5,
  'runtime: P3 learner autonomy',
  { reads: ['autonomyRequested'], match: (i) => i.autonomyRequested, describe: 'learner asked to move on' },
  { contentSlots: [{ kind: 'autonomy', payload: {}, citation: 'runtime:P3' }] },
  { specificity: 1 },
)

// ── Band 6 — Tie-break / final fallback chain ────────────────────────────────

const b6FallbackChain = P(
  'B6.fallback-chain.default.v1', 6,
  'runtime: kernel P-2 fallback ladder',
  { reads: [], match: () => true, describe: 'unconditional; final default' },
  { fallbackChain: ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE'] },
  { specificity: 0, mandatory: true },
)

// ── Assembled pack ──────────────────────────────────────────────────────────

export const BASE_PACK: PolicyPack = {
  packVersion: '0.4.0-k4',
  rules: [
    b0Recovery,
    b1RetroWin, b1DueReviews,
    b2StageCeiling, b2QuestionBudget, b2FirstLessonVocab, b2BeginnerVocab,
    b4FastWrongConfident, b4HesitantCorrect, b4RepeatedStruggle, b4QuestionCeiling,
    b4DefaultAsk, b4DefaultShow, b4DefaultTeach, b4DefaultCheck, b4Fallback,
    b5BeginnerBudget, b5BeginnerStrained, b5IntermediateBudget, b5ExpertBudget, b5AutonomyHonor,
    b6FallbackChain,
  ],
}

/** Runtime-computed stage ceiling (imported by engine, tagged with the B2
 *  rule id in provenance so the ceiling is auditable). */
export function computeStageCeilingFromPhase(phase: string): number {
  return getStageCeiling(phase)
}
