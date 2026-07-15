/**
 * EOS K3 — Kernel: pipeline types (RS §1 fifteen stages).
 *
 * Each stage produces an IMMUTABLE artifact (RS §1: "downstream stages MUST
 * NOT modify upstream artifacts; they produce new artifacts that reference
 * upstream ones by id"). Artifacts thread through KernelState, which is the
 * pipeline's only mutable concept — and it is mutable only by adding new
 * artifacts, never by editing existing ones.
 *
 * K3 SCOPE (strangler frame): types are frozen; stage IMPLEMENTATIONS
 * initially delegate to existing modules to preserve 100% behaviour. Every
 * migration of route.ts logic INTO a stage happens behind these contracts,
 * one at a time, in follow-up work.
 */

// ── Immutable identity for one turn (Stage 1 output) ─────────────────────────

export interface TurnContext {
  turnId: string           // ULID-shaped; RS C-1
  learnerId: string
  sessionId: string
  subjectSlug: string
  receivedAtMs: number     // server-assigned; RS C-2
  messageLength: number    // no verbatim in kernel state (ISS-18 prudence)
  isSchoolMode: boolean    // exclusion signal; K3 covers Library only
}

// ── SENSE (Stage 2 output) ───────────────────────────────────────────────────
// A candidate perception fact. Committed evidence (Stage 3) is a superset;
// the sensor emits, the store commits with seq assignment (RS §2.2).

export type SensorId =
  | 'utterance-state'
  | 'autonomy'
  | 'message-shape'
  | 'latency'
  | 'signal-tag' // parsed from ASSISTANT reply post-render; retro-emitted

export interface CandidateEvent {
  sensorId: SensorId
  sensorVersion: number
  confidence: number       // 0..1; deterministic sensors emit 1.0
  kind: string             // maps to Evidence Spine event type when committed
  data: Record<string, unknown>
}

// ── FOLD (Stage 4 output) ────────────────────────────────────────────────────
// StudentView is the composed read-only view (RS §3.1). K3 v1 carries only
// the parts existing runtime already computes; §4 estimators land in K7.

export interface StudentView {
  learnerId: string
  contentRegister: 'beginner' | 'intermediate' | 'expert'
  profileLevel: 'beginner' | 'intermediate' | 'advanced' | null
  sessionFailureCount: number
  currentConceptId: string | null
  hasVerifiedPlacement: boolean
  pendingPlacementProbe: string | null
  isFirstLessonContext: boolean
  /** Placeholder for K7 estimator suite; empty in K3. */
  capabilities: Record<string, unknown>
}

// ── INTERRUPT SCAN (Stage 5 output) ──────────────────────────────────────────

export interface InterruptState {
  active: boolean
  failureStateKey: string | null      // from recoveryGuard
  autonomyRequested: boolean
  /** When active, the kernel routes to recovery script owner-of-turn. */
  preemptsPolicy: boolean
}

// ── SCHEDULE (Stage 6 output) ────────────────────────────────────────────────

export interface TurnAgenda {
  activeConceptId: string | null
  episodeType: 'NEW' | 'REVIEW' | 'REPAIR' | 'RESUMPTION' | 'CONTINUING'
  freshBoundary: boolean
  boundaryGapMs: number | null
  obligations: {
    retroWinOwed: boolean
    dueReviewCount: number
  }
}

// ── TSM STEP (Stage 7 output) ────────────────────────────────────────────────

export interface TeachingStateView {
  phase: string                        // v1: conversationState phase names
  scaffoldDial: number                 // 0..4; 0 = full worked, 4 = solo
  stageCeiling: number                 // 1..7 (question stage policy)
  demonstrated: boolean
  consecutiveFailures: number
  transitionThisTurn: {
    from: string | null
    to: string | null
    direction: 'up' | 'down' | 'reset' | 'none'
  }
}

// ── POLICY (Stage 8 output) ──────────────────────────────────────────────────

export type PolicyMove = 'TEACH' | 'SHOW' | 'ASK' | 'RECOVER' | 'CLOSE' | 'CELEBRATE' | 'WAIT'

export interface PolicyDecision {
  decisionId: string                   // ULID-shaped
  turnId: string                       // provenance chain (RS §1 P-R4)
  move: PolicyMove | null              // null pre-directive turns (v1 tolerance)
  actionClass: string | null           // e.g. 'DEMONSTRATION', 'WORKED_EXAMPLE'
  budgets: {
    maxQuestions: 0 | 1
    maxParagraphs: number | null
    maxNewTerms: number
  }
  stageCeiling: number
  vocabularyBans: string[]
  visualDirective: { use: boolean; visualClass: string | null }
  provenance: string[]                 // named rules that fired this turn
  prngSeed: number                     // RS C-7
  fallbackChain: string[]              // ordered degraded alternatives
}

// ── RESOLVE (Stage 9 output) ─────────────────────────────────────────────────

export interface TeachingAction {
  actionId: string
  turnId: string
  presentationMode: 'text' | 'visual_and_text' | 'interactive'
  visualClass: string | null
  interactionLevel: 'low' | 'guided' | 'active' | 'high'
  objective: string
  slotsResolved: boolean               // true when payloads are bound
  cost: 0 | 1 | 2 | 3                  // tier
}

// ── PLAN (Stage 10 output) ───────────────────────────────────────────────────

export interface RenderPlan {
  planId: string
  turnId: string
  systemPrompt: string                 // v1: still the composed prompt string
  history: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  budgets: PolicyDecision['budgets']
  vocabularyBans: string[]
  provenance: string[]
}

// ── RENDER (Stage 11 output) ─────────────────────────────────────────────────

export interface RenderDraft {
  draftId: string
  turnId: string
  text: string
  provider: string
  attempts: number
  latencyMs: number
}

// ── VERIFY (Stage 12 output) ─────────────────────────────────────────────────
// K3 provides the INTERFACE ONLY. K5 implements enforcement (RS §9).

export interface VerificationResult {
  verdict: 'PASS' | 'REJECT'
  violations: Array<{ code: string; matched?: string }>
  attempt: 1 | 2
  resolution: 'accepted' | 'rerender' | 'template' | 'passthrough'
}

// ── COMMIT-2 (Stage 13 output) ───────────────────────────────────────────────

export interface CommittedTurn {
  turnId: string
  assistantMessageId: string
  decisionRecordedSeq: number | null   // Evidence Spine seq if written
  cleanText: string                    // tag-stripped
}

// ── PERSIST (Stage 14 output) ────────────────────────────────────────────────

export interface PersistReceipt {
  snapshotUpdated: boolean
  progressUpdated: boolean
}

// ── POST (Stage 15 output) ───────────────────────────────────────────────────

export interface PostReceipt {
  spineEmitted: boolean
  evidenceEventsQueued: number
}

// ── KernelState: the pipeline's growing artifact bag ─────────────────────────
//
// Each stage receives the state, produces its artifact, and yields a new
// state with that artifact added. Stages MUST NOT rewrite earlier artifacts.
// Fields are optional in TypeScript to allow progressive population; the
// pipeline guards enforce presence when a stage requires an upstream artifact.

export interface KernelState {
  readonly context: TurnContext
  readonly candidates?: CandidateEvent[]
  readonly committed?: CandidateEvent[]      // v1: same shape; seq lives in spine
  readonly view?: StudentView
  readonly interrupt?: InterruptState
  readonly agenda?: TurnAgenda
  readonly teachingState?: TeachingStateView
  readonly policy?: PolicyDecision
  readonly action?: TeachingAction
  readonly plan?: RenderPlan
  readonly draft?: RenderDraft
  readonly verification?: VerificationResult
  readonly committedTurn?: CommittedTurn
  readonly persistReceipt?: PersistReceipt
  readonly postReceipt?: PostReceipt
  /**
   * Adapter bag: existing route helpers that stages currently delegate to
   * during the strangler migration. This is deliberately typed as `unknown`
   * so nothing in the kernel can read these except the delegating stages
   * that need them; each stage documents which fields it consumes. The bag
   * shrinks to zero as stages migrate their logic in K3-follow-on work.
   */
  readonly adapters?: Record<string, unknown>
}

// ── Stage function shape ─────────────────────────────────────────────────────

export type StageName =
  | 'INGEST' | 'SENSE' | 'COMMIT-1' | 'FOLD' | 'INTERRUPT-SCAN'
  | 'SCHEDULE' | 'TSM-STEP' | 'POLICY' | 'RESOLVE' | 'PLAN'
  | 'RENDER' | 'VERIFY' | 'COMMIT-2' | 'PERSIST' | 'POST'

export interface Stage<TIn extends KernelState, TOut extends KernelState> {
  readonly name: StageName
  run(state: TIn): Promise<TOut>
}

// ── Pipeline mode flags ──────────────────────────────────────────────────────

/**
 * K3 delivers the strangler frame. The pipeline runs in one of three modes:
 *  - 'off'      — route.ts owns the turn end-to-end (default; ENABLE_KERNEL_PIPELINE unset/0)
 *  - 'shadow'   — pipeline runs alongside route.ts, produces artifacts, but
 *                 does NOT touch the response or the DB (side-effect suppressed).
 *                 Used for parity measurement and golden-transcript capture.
 *  - 'primary'  — pipeline owns the turn; route.ts adapters supply the heavy
 *                 legacy operations (prompt build, LLM call, persist) via the
 *                 adapter bag until K4/K5 finish migration.
 * K4/K5/K6 progressively fill the primary mode's stages with real logic.
 */
export type PipelineMode = 'off' | 'shadow' | 'primary'

export interface PipelineOptions {
  mode: PipelineMode
  /** Suppress console noise in tests. */
  quiet?: boolean
}
