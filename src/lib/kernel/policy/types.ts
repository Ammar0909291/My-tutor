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
  // Band 2 legality — the VERDICT, not the raw evidence.
  //
  // Masterplan K4: "Band 0–2 legality (capability gates live HERE …)".
  // The verdict is computed by questionLegality.ts (QL-1 no answerable
  // source · QL-2 diagnostic concluded · QL-3 learner directive · QL-4
  // missing capability, which itself delegates to capabilityModel's
  // capabilityLegality). It is carried in rather than re-derived: two
  // modules computing "may this turn ask a question" is exactly the
  // duplicate ownership the band structure exists to prevent, and the
  // capability lattice is far too large to restate as pack predicates.
  //
  // OPTIONAL, and absence means legal. A pack that has never been told a
  // turn is illegal must not invent an illegality, and every existing
  // caller keeps its behaviour unchanged.
  askLegal?: boolean
  /** questionLegality's LegalityReason, for provenance only. */
  askBlockedReason?: string | null
  // Band 4 decision matrix — the counters the conversation ladder's heuristic
  // reads (conversationState decideNextMoveHeuristic). Each exists because of
  // an observed failure: a tutor that kept asking after two "I don't know"s,
  // that re-probed prior knowledge forever, that asked three questions without
  // giving anything. Optional, and absent means zero, so a caller that does
  // not supply them gets the phase defaults exactly as before.
  consecutiveDontKnows?: number
  totalKnowledgeProbes?: number
  consecutivePriorKnowledgeProbes?: number
  observeFailures?: number
  questionsAskedSinceTeach?: number
  teachSegmentsSinceQuestion?: number
  /** The caller's worked-example-first request (≥2 session failures or a
   *  FOUNDATION_REBUILD strategy) — a NextMoveContext input, not ladder state. */
  workedExampleFirst?: boolean
  /** Has anything been taught this session? The ladder's blocked-ask branch
   *  gives a SHOW before anything is taught and a TEACH after
   *  (conversationState decideNextMoveDetailed), and the pack mirrors that
   *  split exactly. Distinct from `demonstrated`, which tracks the concept
   *  ladder rather than the session. */
  taughtThisSession?: boolean
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
