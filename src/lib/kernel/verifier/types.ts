/**
 * K5 — Output Verifier: rule codes and violation types (RS §9.2).
 *
 * The verifier is pure and deterministic. Given a RenderDraft + a
 * VerifierContext (drawn from RenderPlan + PolicyDecision), it produces
 * an ordered list of violations. Two severities:
 *
 *   REJECT — the draft must be re-rendered (or, on second attempt,
 *            replaced by a deterministic template).
 *   STRIP  — the draft is auto-repaired (offending token removed);
 *            no attempt is consumed.
 *
 * The K3 verify stage already carries `VerificationResult`; K5 fills in
 * the real body and adds the rejection loop caller.
 */
import type { PolicyMove } from '../types'
import type { Budgets } from '../policy/types'

/** Every rule code in the RS §9.2 closed set. K5 v1 implements the full
 *  set — some rules run in LOG-only mode where lexicons are pending
 *  (per RS §20). */
export const RULE_CODES = [
  'V-Q1',       // question count > budgets.maxQuestions
  'V-Q2',       // TEACH/SHOW/RECOVER/CLOSE move ending in a question
  'V-STAGE',    // calculation demand while stageCeiling < 6
  'V-VOC-NAME', // concept terms while vocabularyUnlocked=false
  'V-VOC-FORMULA', // formula patterns while formulaUnlocked=false
  'V-VOC-REG',  // register-banned tokens (IPA at beginner, etc.)
  'V-TERMS',    // new technical terms > budgets.maxNewTerms
  'V-LEN',      // paragraph count > budgets.maxParagraphs
  'V-CAP',      // references an operation whose capability is NO
  'V-REC',      // recovery turn contains a question or new content
  'V-ASSESS',   // emits assessment-result patterns when not scoring
  'V-TAG',      // non-whitelisted tag present (STRIP)
  'V-COMPLETE', // completion-claim patterns when not authorized
  'V-PRAISE',   // banned praise/mockery for current affect band
  'V-REACT',    // (LOG-only in v1) REACT mandated but missing
  'V-CLOSE',    // CLOSE move introduces new content (RS I-14)
  'V-AFFIRM',   // opens by agreeing with a definition the LEARNER proposed
  // S1 (Runtime Redesign Mission, Part 3/4) — history-aware rules. All LOG
  // severity for now: thresholds are unvalidated against real traffic, and
  // this codebase's own promotion discipline (eos-runtime/flags.ts) is
  // "measure in LOG before ENFORCE, never guess a threshold straight to
  // enforcement." See kernel/verifier/history.ts for the detectors.
  'V-DUP-EXACT',    // draft is byte-identical (normalized) to a recent turn
  'V-DUP-NEAR',     // draft is near-duplicate of the immediately previous turn
  'V-DUP-QUESTION', // draft asks a near-duplicate question of a recent one
  'V-REC-REPEAT',   // recovery turn near-duplicates an earlier rung's script
  'V-OSCILLATE',    // phase sequence shows an A→B→A→B cycle
  // S2 (Runtime Redesign Mission Part 5) — objective-model rules. See
  // teaching/objectiveModel.ts.
  'V-OBJ',          // assessment-shaped draft targets an already-completed objective
  'V-NOPROGRESS',   // no objective advancement in NO_PROGRESS_TURN_THRESHOLD turns
] as const

export type RuleCode = (typeof RULE_CODES)[number]

/** REJECT stops the draft; STRIP is auto-repair without consuming an
 *  attempt (RS §9.2). LOG is informational (V-REACT in v1). */
export type Severity = 'REJECT' | 'STRIP' | 'LOG'

export const SEVERITY: Record<RuleCode, Severity> = {
  'V-Q1':        'REJECT',
  'V-Q2':        'REJECT',
  'V-STAGE':     'REJECT',
  'V-VOC-NAME':  'REJECT',
  'V-VOC-FORMULA': 'REJECT',
  'V-VOC-REG':   'REJECT',
  'V-TERMS':     'REJECT',
  'V-LEN':       'REJECT',
  'V-CAP':       'REJECT',
  'V-REC':       'REJECT',
  'V-ASSESS':    'REJECT',
  'V-TAG':       'STRIP',
  'V-COMPLETE':  'REJECT',
  'V-PRAISE':    'REJECT',
  'V-REACT':     'LOG',
  'V-CLOSE':     'REJECT',
  'V-AFFIRM':    'REJECT',
  // S1 — LOG only until real-traffic false-positive rates are measured
  // (design report §S7: "never flip all at once").
  'V-DUP-EXACT':    'LOG',
  'V-DUP-NEAR':     'LOG',
  'V-DUP-QUESTION': 'LOG',
  'V-REC-REPEAT':   'LOG',
  'V-OSCILLATE':    'LOG',
  // S2 — LOG only; see S1's note above (never guess a threshold to REJECT).
  'V-OBJ':          'LOG',
  'V-NOPROGRESS':   'LOG',
}

export interface Violation {
  code: RuleCode
  severity: Severity
  /** The matched span (short excerpt, ≤80 chars) — feeds the rerender
   *  appendix and the OutputRejected evidence event. */
  matched?: string
  /** Optional human-readable context (never surfaced to the learner). */
  detail?: string
}

/**
 * The context the verifier reads. Sourced from the RenderPlan +
 * PolicyDecision + a handful of state flags. Everything here is derived
 * before RENDER runs — nothing about the LLM's output participates in
 * verifier state (verifier is a total function of draft × context).
 */
export interface VerifierContext {
  move: PolicyMove | null
  budgets: Budgets
  stageCeiling: number
  vocabularyBans: string[]
  /** Whether the NAME state has been passed for the current concept
   *  (RS §5.1 gate); false → concept-term lexicon is banned. */
  vocabularyUnlocked: boolean
  /** Whether FORMALIZE has been passed (or not required); false →
   *  formulas are banned. */
  formulaUnlocked: boolean
  /** Content register — feeds V-VOC-REG lexicon selection. */
  contentRegister: 'beginner' | 'intermediate' | 'expert'
  /** Is the assessment state SCORING/CONCLUDING (V-ASSESS gate)? */
  assessmentActive: boolean
  /** Is a LessonCompleted authorization live for this turn (V-COMPLETE)? */
  lessonCompletionAuthorized: boolean
  /** REACT mandated (learner produced content this turn) — V-REACT LOG rule. */
  reactMandated: boolean
  /** The affect band (praise gating). */
  affectBand: 'calm' | 'strained' | 'flooded'
  /** Concept terms currently banned as new (V-VOC-NAME lexicon per RS §9.2).
   *  Pack-supplied per language; MVP ships an English seed. */
  bannedConceptTerms: string[]
  /** Capability ids currently in a NO state (OBSERVED_NO / STATED_NO) for
   *  this learner. Supplied by capabilityModel.noCapabilities(); V-CAP scans
   *  only for these. Empty ⇒ V-CAP is a no-op, which is the correct
   *  behaviour for a learner with no recorded operational failures. */
  noCapabilities?: string[]
  /** Learner content preview (short) — the REACT rule reads it. */
  learnerText: string
  /** Legal single-line tags for this turn (V-TAG whitelist). */
  legalTags: string[]
  /** S1 — recent-turn history for the V-DUP-x / V-OSCILLATE rules. Optional:
   *  undefined ⇒ those rules are no-ops (a caller that hasn't wired history
   *  yet gets the exact same behavior as before this addition — additive
   *  by construction, matching this module's own convention for noCapabilities). */
  turnHistory?: import('./history').TurnHistory
  /** The recovery key active on THIS turn (null if none) — feeds
   *  V-REC-REPEAT. Independent of `move === 'RECOVER'` because a caller may
   *  know the key before mapping it to a PolicyMove. */
  recoveryKey?: string | null
  /** The phase this turn is expected to land on (legacy 6-phase name) —
   *  feeds V-OSCILLATE. */
  phaseAfter?: string | null
  /** S2 — is the CURRENT objective already completed (ObjectiveState.
   *  completedAt !== null, per objectiveModel.isObjectiveLockedFromAssessment)?
   *  Feeds V-OBJ. Undefined ⇒ no-op (additive, matching every other optional
   *  field in this context). */
  objectiveCompleted?: boolean
  /** S2 — has the current objective stalled (objectiveModel.hasStalled)?
   *  Feeds V-NOPROGRESS (LOG only — a rerender cannot fix a curriculum
   *  problem, per the design report). */
  objectiveStalled?: boolean
}

/** The verifier's output. Consumers apply the rejection protocol below. */
export interface VerifyDecision {
  verdict: 'PASS' | 'REJECT'
  violations: Violation[]
  attempt: 1 | 2
  resolution: 'passthrough' | 'accepted' | 'rerender' | 'template' | 'stripped'
  /** The (possibly auto-repaired) text ready for delivery. */
  repairedText: string
}
