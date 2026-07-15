/**
 * K6 — Build a K5 VerifierContext from route.ts hoisted values.
 *
 * The route already computes every input this needs (recovery, first-
 * lesson, session-failure counters, register, conversationState phase,
 * autonomy, budgets from the turn directive, etc.). This module maps
 * them into the K5 VerifierContext shape without recomputing anything.
 *
 * Pure. No I/O.
 */
import type { VerifierContext } from '@/lib/kernel/verifier'

export interface BuildContextInput {
  // Learner / register
  contentRegister: 'beginner' | 'intermediate' | 'expert'
  // Move + phase from the runtime (Phase C–G current shipping names)
  move: 'TEACH' | 'SHOW' | 'ASK' | 'RECOVER' | 'CLOSE' | null
  phase: string | null
  stageCeiling: number | null
  // Concept / gates
  vocabularyUnlocked: boolean
  formulaUnlocked: boolean
  // Interrupt state — recovery is the only Band-0 preempt today
  recoveryActive: boolean
  // Budgets from the turn directive
  maxQuestions: 0 | 1
  maxParagraphs: number | null
  maxNewTerms: number
  // Explicit vocabulary bans (first-lesson + subject-specific packs)
  vocabularyBans: string[]
  // Assessment machine state
  assessmentActive: boolean
  // Completion authorization for this turn
  lessonCompletionAuthorized: boolean
  // Affect band (derived from sessionFailureCount today; K7 upgrades)
  sessionFailureCount: number
  // The learner's own message (for V-REACT LOG only)
  learnerText: string
  // Whether the assistant is expected to REACT (learner produced content)
  reactMandated: boolean
  // Whitelisted output tags — visual, hint, worked example, lesson tags
  legalTags: string[]
  // Per-concept concept-term bans (pack-supplied when C4 packs carry them;
  // undefined uses the lexicon default in K5)
  bannedConceptTerms: string[]
}

/** Map register + failure count → affect band. Conservative floor:
 *  strained above the first failure; flooded at recovery-active. */
function affectBandFrom(recoveryActive: boolean, failures: number): VerifierContext['affectBand'] {
  if (recoveryActive) return 'flooded'
  if (failures >= 2) return 'strained'
  return 'calm'
}

export function buildVerifierContext(input: BuildContextInput): VerifierContext {
  return {
    move: input.recoveryActive ? 'RECOVER' : input.move,
    budgets: {
      maxQuestions: input.maxQuestions,
      maxParagraphs: input.maxParagraphs,
      maxNewTerms: input.maxNewTerms,
    },
    stageCeiling: input.stageCeiling ?? 2,
    vocabularyBans: input.vocabularyBans,
    vocabularyUnlocked: input.vocabularyUnlocked,
    formulaUnlocked: input.formulaUnlocked,
    contentRegister: input.contentRegister,
    assessmentActive: input.assessmentActive,
    lessonCompletionAuthorized: input.lessonCompletionAuthorized,
    reactMandated: input.reactMandated,
    affectBand: affectBandFrom(input.recoveryActive, input.sessionFailureCount),
    bannedConceptTerms: input.bannedConceptTerms,
    learnerText: input.learnerText,
    legalTags: input.legalTags,
  }
}
