/**
 * K4 — Policy Engine: rule schema and inputs (RS §5.1).
 *
 * Rules are DATA. In K4 they live as in-code constants (the base pack);
 * C4 (out of K4 scope) makes them build artifacts compiled from CEKR /
 * BrainScript. The engine executes them the same way either way.
 */
import type { PolicyMove, TeachingStateView } from '../types'

// ── Inputs the bands may read (RS §5.1 "declared readable fields") ──────────

export interface PolicyInputs {
  turnId: string
  learnerId: string
  sessionId: string
  // Learner state
  contentRegister: 'beginner' | 'intermediate' | 'expert'
  profileLevel: 'beginner' | 'intermediate' | 'advanced' | null
  sessionFailureCount: number
  isFirstLessonContext: boolean
  // Teaching state
  phase: TeachingStateView['phase']
  stageCeiling: number
  demonstrated: boolean
  consecutiveFailures: number
  // Interrupts (Band 0 inputs)
  interruptActive: boolean
  failureStateKey: string | null
  autonomyRequested: boolean
  // Obligations (Band 1)
  retroWinOwed: boolean
  dueReviewCount: number
  freshBoundary: boolean
  // Signal-derived quadrant (D1 grid; Band 4)
  lastSignalCorrect: boolean | null
  lastSignalConfidence: 'low' | 'medium' | 'high' | null
  // Concept
  currentConceptId: string | null
}

// ── Effect (partial PolicyDecision fields a rule can set) ────────────────────

export interface Budgets {
  maxQuestions: 0 | 1
  maxParagraphs: number | null
  maxNewTerms: number
}

export interface ContentSlot {
  kind: 'recovery-script' | 'opening-block' | 'affect-close' | 'first-lesson' |
        'placement-probe' | 'directive' | 'autonomy' | 'action-procedure'
  payload: Record<string, unknown>
  citation: string
}

export interface RuleEffect {
  move?: PolicyMove
  actionClass?: string | null
  budgets?: Partial<Budgets>
  stageCeiling?: number
  vocabularyBans?: string[]
  visualClass?: string | null
  contentSlots?: ContentSlot[]
  fallbackChain?: string[]
  /** Personalization surface (Band 5 only). */
  representation?: string
  /** Set by Band 2 legality filters to REMOVE candidate moves. Subtractive. */
  bannedMoves?: PolicyMove[]
}

// ── Guard: a total predicate over PolicyInputs ───────────────────────────────

export type Predicate<T = PolicyInputs> = (i: T) => boolean

export interface RuleGuard {
  reads: (keyof PolicyInputs)[]
  match: Predicate
  /** Human-readable form for diagnostics + provenance. */
  describe: string
}

// ── Rule ────────────────────────────────────────────────────────────────────

export type BandId = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface Rule {
  ruleId: string          // stable citation-bearing id
  band: BandId
  guard: RuleGuard
  effect: RuleEffect
  /** Computed = count of bound predicates. Filled by the pack compiler in the
   *  authored path; K4 rules set it explicitly. */
  specificity: number
  citation: string        // Brain path or "runtime:<origin>" for engine-owned
  mandatory: boolean
}

// ── Pack (K4: in-code; C4 makes this a build artifact) ───────────────────────

export interface PolicyPack {
  packVersion: string     // semver
  rules: Rule[]
}

// ── Engine output ────────────────────────────────────────────────────────────

export interface DecisionTrace {
  ruleId: string
  band: BandId
  citation: string
  /** How the rule contributed (which effect fields it set). */
  set: string[]
}

export interface EnginePolicyDecision {
  move: PolicyMove
  actionClass: string | null
  budgets: Budgets
  stageCeiling: number
  vocabularyBans: string[]
  visualClass: string | null
  contentSlots: ContentSlot[]
  fallbackChain: string[]
  representation: string | null
  provenance: DecisionTrace[]
  /** RuleId of the Band-0 interrupt if any (RS §5.2 short-circuit marker). */
  preemptedBy: string | null
  /** Non-empty when packs conflict at equal specificity (RS §5.3, PolicyConflictDetected). */
  conflicts: Array<{ band: BandId; ruleIds: string[]; resolvedBy: 'specificity' | 'mandatory' | 'lexical' }>
}
