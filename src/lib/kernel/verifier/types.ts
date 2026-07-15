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
  /** Learner content preview (short) — the REACT rule reads it. */
  learnerText: string
  /** Legal single-line tags for this turn (V-TAG whitelist). */
  legalTags: string[]
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
