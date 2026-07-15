# EOS v2 — Runtime Specification

**Document class:** Implementation bible — the CPU instruction set + kernel
specification for `EOS_V2_ARCHITECTURE.md` (the frozen architectural vision).
**Status:** SPECIFICATION — design only. Implementation of any section remains
gated on explicit owner approval (G2).
**Normative language:** MUST / MUST NOT / SHOULD / MAY per RFC 2119. Any
sentence without a normative keyword is explanatory and non-binding.
**Version:** 1.0.0 (this spec is itself semver'd; see §19).
**Rule of construction:** where this document and the Architecture disagree,
the Architecture's *laws* (L1–L8) win and this document is defective; where
the Architecture is silent, **this document decides** — engineers MUST NOT
invent behaviour not specified here; gaps are spec bugs to be filed, not
judgment calls to be made.

---

## Table of Contents

0. Conventions, identifiers, time, numbers
1. The Turn Pipeline (15 stages, ownership table)
2. The Event System (envelope, catalog, ordering, idempotency, replay)
3. Data Contracts (16 contracts, field-level)
4. State Machines (14 machines, full transition tables)
5. The Policy Engine (rule schema, evaluation order, conflict resolution)
6. The Action & Content Resolution contract
7. The Conversation Planner contract
8. The LLM Contract (driver + sensor roles)
9. The Output Verifier (rule codes, rejection protocol)
10. The Scheduler contract
11. Memory & Persistence contracts (ownership matrix)
12. Determinism classification
13. Subsystem implementation contracts (interfaces, dependencies)
14. Invariants (I-1 … I-24)
15. Failure handling (P-0 … P-8)
16. Performance budgets
17. Testing requirements (T-1 … T-8)
18. BrainConfig v1 default values (the numbers)
19. Versioning & compatibility rules
20. Resolved ambiguities & standing critiques

---

## 0. Conventions, Identifiers, Time, Numbers

- **C-1.** All identifiers MUST be ULIDs (sortable, collision-free). Entity id
  fields are named `<entity>Id`.
- **C-2.** All timestamps MUST be UTC milliseconds, server-assigned at commit.
  Client timestamps MAY be recorded as payload but MUST NOT order anything.
- **C-3.** Per-learner event ordering is by `seq` — a per-learner monotonic
  integer assigned transactionally at append (§2.2). Wall-clock time MUST NOT
  be used for ordering; it MAY be used for decay and boundaries.
- **C-4.** All tunable numbers in this spec are **BrainConfig keys**, written
  `cfg:<key>` with their v1 default in §18. Engineers MUST read them from the
  active policy pack, MUST NOT hardcode them, and MUST treat the §18 defaults
  as the shipped values.
- **C-5.** All enums are closed sets. Adding a value is a pack/spec version
  event (§19), never an ad-hoc extension.
- **C-6.** "The kernel" = pipeline stages 4–10 (§1). "A turn" = one learner
  message and the system's one response to it.
- **C-7.** Randomness: the only permitted random source in the kernel is a
  PRNG seeded with `hash(learnerId, sessionId, turnSeq)`; the seed MUST be
  recorded in the DecisionRecorded event. Everything else in the kernel MUST
  be pure.

---

## 1. The Turn Pipeline

Fifteen stages. Each stage's output is **immutable** once produced: downstream
stages MUST NOT modify upstream artifacts; they produce new artifacts that
reference upstream ones by id.

| # | Stage | Owner subsystem | Input | Output | Who MUST NOT touch it |
|---|---|---|---|---|---|
| 1 | INGEST | Gateway | raw message, client meta | `TurnContext` (turnId, seq reservation, timings) | everyone downstream (read-only) |
| 2 | SENSE | Perception | TurnContext + raw text | candidate `EvidenceEvent[]` | kernel MUST NOT add perception events |
| 3 | COMMIT-1 | Evidence Store | candidate events | committed events (seq assigned) | nobody may mutate/delete (append-only) |
| 4 | FOLD | Model Plane | committed events + snapshots | updated model views (`StudentView` parts) | policy MUST NOT write models |
| 5 | INTERRUPT SCAN | Recovery Engine | StudentView, this turn's events | `InterruptState` | policy MUST NOT suppress it |
| 6 | SCHEDULE | Scheduler | session state, review queue, concept processes | `TurnAgenda` (active conceptId, episode type, obligations) | action layer MUST NOT re-pick concepts |
| 7 | TSM STEP | Teaching State Machine | TurnAgenda + evidence gates | `TeachingStateView` (post-transition) | policy reads, never writes states directly |
| 8 | POLICY | Policy Engine | StudentView, TeachingStateView, InterruptState, TurnAgenda, packs | `PolicyDecision` | renderer never sees rules, only results |
| 9 | RESOLVE | Action Engine | PolicyDecision + Content Index | `TeachingAction` (assets bound) | conversation layer MUST NOT swap actions |
| 10 | PLAN | Conversation Planner | TeachingAction + Episode Memory | `RenderPlan` | driver MUST NOT alter plan constraints |
| 11 | RENDER | LLM Driver / Visual Driver / Template | RenderPlan | `RenderDraft` | — (probabilistic; recorded) |
| 12 | VERIFY | Output Verifier | RenderDraft + RenderPlan | `VerifiedOutput` OR rejection loop (§9.3) | nothing bypasses verification (I-2) |
| 13 | COMMIT-2 | Evidence Store | VerifiedOutput + DecisionRecorded + violations | committed turn | append-only |
| 14 | PERSIST | Memory subsystem | session/TSM snapshots | updated snapshots | single-writer matrix (§11) |
| 15 | POST | Async workers | committed turn | aggregates, capture ingestion, schedules, analytics | MUST NOT affect the current turn |

**Hard rules.**
- **P-R1.** Stages 4–10 MUST be synchronous, in-order, and free of I/O other
  than reads of committed state and packs. No network calls. No LLM calls.
- **P-R2.** Stage 11 is the only stage that MAY call an LLM for rendering;
  stage 2 is the only stage that MAY call an LLM for classification.
- **P-R3.** If any stage 4–10 throws, the turn enters panic handling P-0 (§15)
  — it MUST NOT fall through to a raw LLM call. There is no "just prompt it"
  escape hatch, by design.
- **P-R4.** Stage outputs MUST carry the ids of their inputs (provenance
  chain); the DecisionRecorded event (§2.3 #20) serializes the whole chain.

---

## 2. The Event System

### 2.1 Envelope (all events)

| Field | Type | Meaning | Rules |
|---|---|---|---|
| eventId | ULID | identity | assigned at append |
| seq | int64 | per-learner order | transactional counter; gapless per learner |
| learnerId | ULID | subject | MUST be canonical user id |
| sessionId | ULID | session scope | nullable only for cross-session admin events |
| turnId | ULID | turn scope | nullable for async events |
| type | enum | catalog entry (§2.3) | closed set |
| payload | typed object | per-type schema | schema version pinned |
| source | {componentId, version} | producer | mandatory |
| confidence | float 0–1 | producer's confidence | 1.0 for deterministic producers |
| packVersion | semver | active policy pack at emission | mandatory for kernel events |
| idempotencyKey | string | dedupe | `hash(type, turnId, discriminator)` |

- **E-1.** The store is append-only. Corrections are new events
  (`type=EvidenceRetracted`, referencing the retracted eventId); folds MUST
  honor retractions by ignoring the referenced event on re-fold.
- **E-2.** Idempotency: an append with an existing idempotencyKey MUST be a
  silent no-op returning the original eventId.
- **E-3.** Ordering guarantee consumed by folds: events for one learner are
  totally ordered by `seq`. Cross-learner ordering is undefined and MUST NOT
  be relied upon.
- **E-4.** Replay classes: `REPLAY_INPUT` (perception + learner actions — fed
  back in during replay) and `REPLAY_DERIVED` (kernel outputs — recomputed and
  diffed during replay, never fed back in). Every catalog entry declares one.

### 2.2 Sequence assignment
`seq` MUST be assigned inside the same transaction as the append, from a
per-learner counter row. Batch appends within one turn get consecutive seq in
pipeline order (stage 2 events before stage 13 events of the same turn).

### 2.3 Event catalog

P = producer, C = consumers, RC = replay class. Payload lists are exhaustive —
adding a field is a schema version bump.

| # | Type | P | C | Payload | RC |
|---|---|---|---|---|---|
| 1 | StudentMessageReceived | Gateway | Perception, Analytics | text, clientMeta, latencyFromPrevTurnMs | INPUT |
| 2 | AnswerObserved | Answer sensor | Knowledge, Capability, Confidence, Misconception folds | itemRef?, correct: bool?, statedConfidence: low\|med\|high?, confusion: bool, capabilityRefs[], conceptId?, scaffoldLevel: 0–4, hintDebt: int, questionStage: 1–7? | INPUT |
| 3 | UtteranceStateDetected | Utterance sensor | Recovery, Frustration fold | failureStateKey (11-value enum, per v1 recoveryGuard), verbatim (redaction-subject), strength: strong\|mild | INPUT |
| 4 | AutonomyRequested | Autonomy sensor | TSM, Scheduler | matchedPhrase | INPUT |
| 5 | SilenceDetected | Timeout watcher | Recovery, Conversation | durationMs, inState | INPUT |
| 6 | LearnerQuestionAsked | Question sensor | Curiosity fold, Conversation | topicRef?, unprompted: bool, depthSignal: surface\|mechanism\|boundary | INPUT |
| 7 | CalibrationSampled | Assessment | Confidence fold | predicted: low\|med\|high, actual: bool, itemRef | INPUT |
| 8 | LoadSignatureDetected | Load sensor | WM/Load folds | marker enum: lengthCorrelatedErrors\|stepLoss\|abandonMidResponse\|statedTooFast | INPUT |
| 9 | CapabilityObserved | Capability fold (post-attribution) | Policy (via views), Analytics | capabilityId, direction: success\|failure\|stated_no, contextTag, diagnostic: bool, itemRef | DERIVED |
| 10 | CapabilityPromoted | Capability fold | Analytics, Scheduler | capabilityId, from, to, evidenceRefs[] | DERIVED |
| 11 | CapabilityDowngraded | Capability fold | Analytics, authoring queue | capabilityId, from, to, cause: contradiction\|stated | DERIVED |
| 12 | MisconceptionDetected | Misconception fold | Policy views, authoring | misconceptionId?, conceptId, verbatimPhrase, birthTypeHypothesis: 1–6?, strength | DERIVED |
| 13 | MisconceptionRepairStep | Kernel (repair dispatch) | Misconception fold | misconceptionId, step: elicit\|commit\|collide\|replace\|contrast\|apply\|reprobe, collisionCaseId, outcome? | DERIVED |
| 14 | AssessmentStarted | Assessment module | Analytics, Conversation | kind: placement\|inline\|gate\|retention\|calibration, conceptId?, plannedItems | DERIVED |
| 15 | AssessmentSkipped | Assessment module | Analytics | kind, reason enum: affect\|budget\|recovery\|beginner_gate\|value_below_cost | DERIVED |
| 16 | AssessmentCompleted | Assessment module | Mastery, Knowledge folds | kind, itemsAsked, outcomes[], aborted: bool, abortReason? | DERIVED |
| 17 | RecoveryEntered | Recovery Engine | Recovery Memory, Analytics | failureStateKey, scriptId, escalationRung: 0–2, sessionFailureCount | DERIVED |
| 18 | RecoveryExited | Recovery Engine | Recovery Memory | scriptId, exitTSMState, turnsInRecovery, nextTurnOutcomeJoin: pending | DERIVED |
| 19 | TeachingActionSelected | Action Engine | Analytics, Teacher Memory | actionId (27-catalog), mediaForm, assetIds[], costTier: 0–3, evidenceContract[] | DERIVED |
| 20 | DecisionRecorded | Kernel | Replay, Analytics, provenance audit | full PolicyDecision (§3.10) incl. rulePath[], prngSeed, inputStateHashes | DERIVED |
| 21 | PhaseTransitioned | TSM | Analytics, Scheduler | machine: enum(§4), from, to, direction: up\|down\|reset, gateEvidenceRefs[] | DERIVED |
| 22 | LessonCompleted | TSM/Mastery | Scheduler, Progress UI | conceptId, certification: provisional\|certified, exitState | DERIVED |
| 23 | ReviewScheduled | Scheduler | Review queue | conceptId\|capabilityId, dueAt, recallProbAtScheduling | DERIVED |
| 24 | VisualRequested | Visual module | Renderers, cache | visualClass(§6.3), specRef, costTier, a11yRequired: true | DERIVED |
| 25 | VisualRendered | Visual driver | Analytics, cache | specRef, cacheHit: bool, renderMs, failed?: degradedToTier | DERIVED |
| 26 | PolicyConflictDetected | Pack compiler / kernel | Engineering alerts | ruleIds[], band, resolution: specificity\|lexical | DERIVED |
| 27 | OutputRejected | Verifier | Driver quality metrics | violationCodes[](§9.2), attempt: 1\|2, resolution: rerender\|template | DERIVED |
| 28 | RenderCompleted | Driver | Commit | driverId, modelVersion, tokens, latencyMs, attempt | DERIVED |
| 29 | SessionBoundaryDetected | Session machine | All session-scoped state | gapMs, boundaryType: inactivity\|explicit\|abandon | INPUT |
| 30 | SessionAbandoned | Timeout worker | Motivation fold, retro-close debt | lastState, lastEventWasFailure: bool | INPUT |
| 31 | HintIssued | Hint module | Knowledge fold (debt), Analytics | ladderType(§4.10 of arch — concept\|strategic\|step1\|step2\|step3\|motivational\|reflective), itemRef | DERIVED |
| 32 | TemplateFallbackUsed | Verifier | Engineering alerts | cause: doubleViolation\|driverDown\|panic | DERIVED |
| 33 | EvidenceRetracted | Admin/audit tooling | folds | retractedEventId, reason | INPUT |
| 34 | PackActivated | Pack manager | kernel | packVersion, previousVersion | INPUT |
| 35 | MasteryCertified | Mastery module | Scheduler, Progress | conceptId, level: ANCHORED\|PROBABLE, componentEvidence{rung, retentionProbeRef, transferRef} | DERIVED |
| 36 | ForgettingProbeResult | Assessment (retention) | Forgetting fold | conceptId, recalled: bool, gapDays, cued: bool | INPUT |

**E-5.** Consumers MUST tolerate unknown *future* event types (skip) but MUST
NOT skip unknown fields of known types (schema pinning catches this at decode).

---

## 3. Data Contracts

Field tables: **O** = owner (sole writer), **L** = lifetime. Readers are
unrestricted unless stated. Any field not listed here does not exist.

### 3.1 StudentView (assembled per turn; never stored)
Composition of §3.2–3.9 views + identity: `{learnerId, ageBand:
early_child|child|teen|adult, language, register: beginner|intermediate|expert,
accessibilitySignatures[], guardianFlags[]}`. O: assembler (stage 4). L: turn.

### 3.2 CapabilityState (per learner × capability)
| Field | Values | Meaning | O | L |
|---|---|---|---|---|
| status | UNKNOWN, STATED_NO, OBSERVED_NO, SHAKY, RELIABLE, AUTOMATIC, EXPERT | current lattice state | Capability fold | permanent |
| highWaterMark | same enum | best ever | fold | permanent |
| evidence | {succ:int, fail:int, contexts:set, lastAt} | counts | fold | permanent |
| freshnessDays | int | days since last evidence | derived | — |
| stale | bool | freshnessDays > cfg:cap.staleDays | derived | — |
| perContext | map contextTag → modifier −1/0/+1 | context adjustment | fold | permanent |

Transition rules are the Capability machine (§4.11). **Nothing outside the
fold may write any field** (I-8).

### 3.3 KnowledgeState (per learner × concept)
| Field | Values | O | L |
|---|---|---|---|
| rung | UNKNOWN…EXPERT (8-rung) | Knowledge fold | permanent |
| rungConfidence | low\|med\|high (evidence-count banded: <2, 2–4, ≥5 qualifying events) | fold | — |
| highWaterMark | rung | fold | permanent |
| hintDebt | int (current concept episode) | fold | concept episode |
| retentionHalfLifeDays | float | Forgetting fold | permanent |
| lastRetrievalAt | ts | fold | permanent |
| status | LEARNING, PROVISIONAL, CERTIFIED_PROBABLE, CERTIFIED_ANCHORED, FORGOTTEN_ACCESS | Mastery module | permanent |

### 3.4 TeachingState (per learner × concept process)
| Field | Values | O | L |
|---|---|---|---|
| state | DIAGNOSE, ANCHOR, DEMONSTRATE, NAME, FORMALIZE, GUIDED, INDEPENDENT, REFLECT, ASSESS, TRANSFER | TSM | concept process |
| scaffoldDial | 0–4 (0=full worked, 4=solo) — GUIDED only | TSM | state |
| entryRung | rung at process start | TSM | process |
| failuresAtState | int | TSM | state (reset on transition) |
| representationChanges | int at current state | TSM | state |
| suspended | bool + resumeToken | Scheduler | process |
| vocabularyUnlocked | bool (NAME passed) | TSM | process |
| formulaUnlocked | bool (FORMALIZE passed or not required) | TSM | process |

### 3.5 ConversationState (per session)
| Field | Values | O | L |
|---|---|---|---|
| questionsAskedSinceGive | int | Conversation Planner fold | session |
| givesSinceQuestion | int | planner fold | session |
| consecutiveFailures | int | planner fold | session |
| lastMove | TEACH\|SHOW\|ASK\|RECOVER\|CLOSE\|CELEBRATE\|WAIT | planner | turn+1 |
| threadRefs | ≤3 episode-memory refs for continuity | planner | session |
| silenceCount | int | planner | session |

### 3.6 RecoveryState (per session)
| Field | Values | O | L |
|---|---|---|---|
| active | bool | Recovery Engine | turns in recovery |
| failureStateKey | 11-value enum | engine | recovery episode |
| escalationRung | 0,1,2 (base / stop-questions / close-concept) | engine | session |
| sessionFailureCount | int | engine | session |
| entryTSMState | TSM state at entry | engine | recovery episode |
| whatRestoresRefs | learned restore actions | Recovery Memory | permanent |

### 3.7 AssessmentState (per session)
`{activeKind?: enum, itemsAskedThisSession: int, pendingItemRef?, affectBudgetSpent: int, placementBracket?: below|at|above, placementConcluded: bool, lastInlineCheckTurnSeq: int}`. O: Assessment module. L: session (placement conclusion inherited cross-session).

### 3.8 LessonState (session layer)
`{phase: OPEN|CORE|CLOSE, episodeType: NEW|REVIEW|REPAIR|RESUMPTION, retroCloseDebt: bool, retroWinOwed: bool, affectBudget: {spent:int, cap:int}, openedAt, dueReviewsServed: int}`. O: Session machine. L: session.

### 3.9 MasteryState — see KnowledgeState.status; certification components:
`{rungEvidence, retentionProbe: {ref, gapDays ≥ cfg:mastery.minGapDays}, transferEvent: {ref, surfaceDistance ≥ cfg:mastery.minTransferDistance}, hintDebtAtGate: 0 required}`. O: Mastery module. L: permanent.

### 3.10 PolicyDecision (the kernel's output; immutable)
| Field | Values |
|---|---|
| decisionId, turnId | ULIDs |
| move | TEACH, SHOW, ASK, RECOVER, CLOSE, CELEBRATE, WAIT |
| actionClass | one of 27-catalog family entries |
| tsmState | post-transition state |
| stageCeiling | 1–7 |
| budgets | {maxQuestions: 0\|1, maxParagraphs: int\|null, maxNewTerms: int, maxNewElements: int} |
| contentSlots | ordered slot list with resolution requirements |
| vocabularyBans[] | term list active this turn |
| visualDirective | {use: bool, visualClass?, specRef?} |
| provenance | rulePath[]: ordered {band, ruleId, packVersion} |
| prngSeed | int64 |
| fallbackChain | ordered degraded alternatives (≥1 always) |

### 3.11 TeachingAction
`{actionId, mediaForm, assets: slot→assetId|templateId, interactionContract, evidenceContract: expected event types, setupCostTier: 0–3}`. O: Action Engine. L: turn.

### 3.12 VisualRequest
`{visualClass (§6.3), conceptId, specRef | paramTemplate+params, costTier, a11yDescription: REQUIRED non-empty, replacesProseBudget: int ≥ 1}`. O: Visual module. L: turn.

### 3.13 HintRequest
`{ladderType, targetItemRef, requiresCapabilities[] (all MUST be ≥ RELIABLE), stageOfHint ≤ item.stage − 1, debtWeight}`. O: Hint module. L: turn.

### 3.14 RenderPlan
`{planId, decisionId, skeleton: [REACT?, MOVE, INVITE?], persona ref, lawsSummary ref, directive (serialized decision constraints), payload slots (resolved text/asset content), historyWindow: last cfg:render.historyTurns turns, bannedPatterns[], lengthBudget, questionBudget}`. O: Conversation Planner. L: turn.

### 3.15 VerificationResult
`{draftId, verdict: PASS|REJECT, violations: [{code(§9.2), evidence: matched span}], attempt, resolution}`. O: Verifier. L: turn.

### 3.16 EvidenceRecord — the envelope of §2.1. O: Evidence Store. L: permanent.

---

## 4. State Machines

Common rules for ALL machines:
- **SM-1.** Transitions fire only in pipeline stages 5–8 (never during render).
- **SM-2.** Every transition MUST emit PhaseTransitioned with gate evidence refs.
- **SM-3.** Illegal-transition requests (from any module) MUST throw a kernel
  invariant error → P-0. There is no "force" API.
- **SM-4.** Rollback: machines never roll back within a turn; a mis-transition
  discovered later is corrected by a *new* compensating transition (event-
  sourced honesty). Snapshot restore is only for storage corruption (P-6).
- **SM-5.** Authorizer column names the ONLY component allowed to request the
  transition; the machine itself validates gates.

### 4.1 Teaching machine (concept layer) — 10 states (§3.4)

| From → To | Preconditions & evidence | Authorizer |
|---|---|---|
| (entry) → per-rung mapping | rung UNKNOWN/RECOGNIZED → DIAGNOSE (skip to ANCHOR if placement already resolved); IMITATES/ASSISTED → GUIDED; INDEPENDENT → ASSESS; AUTOMATIC+ → TRANSFER | Scheduler |
| DIAGNOSE → ANCHOR | prior-knowledge resolved: placementConcluded OR probe answered OR rung known | Assessment |
| ANCHOR → DEMONSTRATE | ≥1 AnswerObserved with substantive engagement (correct Stage-1/2 answer, or LearnerQuestionAsked on the anchor) | TSM (gate auto) |
| DEMONSTRATE → NAME | demoInstancesShown ≥ 2 AND ≥1 correct prediction/echo AnswerObserved | TSM |
| NAME → FORMALIZE | own-words restatement AnswerObserved (correct, produced, scaffoldLevel ≤1) AND concept.formalizable | TSM |
| NAME → GUIDED | own-words gate AND NOT concept.formalizable | TSM |
| FORMALIZE → GUIDED | formula anchored: 1 correct read-back of formula meaning in plain words | TSM |
| GUIDED → INDEPENDENT | fluency gate: correct AND latency ≤ cfg:fluency.latencyFactor × baseline AND statedConfidence ≠ low, at scaffoldDial=4, ≥ cfg:fluency.count times | TSM |
| INDEPENDENT → REFLECT | ≥2 unaided correct (hintDebt=0) | TSM |
| REFLECT → ASSESS | reflection produced OR skipped-by-flow (policy row FLOW-1) | Reflection module |
| ASSESS → TRANSFER | gate items passed, hintDebt=0 | Assessment |
| TRANSFER → exit | ≥1 transfer success at surfaceDistance ≥ cfg:mastery.minTransferDistance | Mastery |
| any → one-below | any failure event (AnswerObserved correct=false, or RecoveryEntered) — exactly one step down; floor = DEMONSTRATE once demonstrated, else ANCHOR | TSM auto |
| any → same (repr. change) | 2nd failure at same state → representationChanges++ , new representation mandated | Policy Band 4 |
| any → SUSPENDED | 3rd failure at same state (stuck protocol) | Scheduler |
| SUSPENDED → re-entry | scheduled repair episode; re-enter one below suspension state, hysteresis credit: 1 fluent success re-advances | Scheduler |
| any → provisional exit | AutonomyRequested: mark LessonCompleted{provisional}, schedule verification episode ≤ cfg:autonomy.verifyWithinDays | TSM |

Illegal (MUST throw): any upward skip of ≥2 states; entry to NAME without
DEMONSTRATE evidence in this process (unless entry-mapped); any transition
during active recovery except recovery's own exit placement.

### 4.2 Session machine — OPEN → CORE → CLOSE
| Transition | Precondition | Authorizer |
|---|---|---|
| (boundary) → OPEN | SessionBoundaryDetected (gap ≥ cfg:session.gapMinutes, attention-scaled) | Session machine |
| OPEN: obligations order | retroCloseDebt first → retroWinOwed engineered win → opening retrieval (due reviews, ≤ cfg:session.maxOpeningReviews) → continuity beat | fixed order, no reordering |
| OPEN → CORE | first substantive learner response in OPEN | auto |
| CORE → CLOSE | affectBudget.spent ≥ cap OR summit trigger (big win + cfg:session.summitWindowMin elapsed) OR explicit goodbye | Session machine |
| CLOSE rules | close-on-a-win script; no new content (I-14); unresolved state → next-session queue, never misrepresented as resolved | — |
| abandon | SessionAbandoned → retroCloseDebt=true; if lastEventWasFailure → retroWinOwed=true | timeout worker |

### 4.3 Recovery machine (interrupt overlay)
States: IDLE → ACTIVE(VALIDATE → SHRINK → BANK_WIN) → EXITING → IDLE.
| Transition | Precondition | Authorizer |
|---|---|---|
| IDLE → ACTIVE | UtteranceStateDetected (any strength) OR behavioral trigger (consecutiveFailures ≥ cfg:recovery.behavioralTrigger, silence ≥ cfg:recovery.silenceMs in ASK context) | Recovery Engine (Band 0) |
| within ACTIVE | VALIDATE and SHRINK MAY merge into one turn; BANK_WIN requires one success event of any size | engine |
| ACTIVE escalation | same session, repeated entries: rung = f(sessionFailureCount): 0 if <2, 1 if 2–3 (stop all questions), 2 if ≥4 (close concept today) | engine |
| ACTIVE → EXITING | win banked OR learner override utterance ("I'm fine") — override recorded | engine |
| EXITING → IDLE | TSM placed one state below entryTSMState (floor rules apply); RecoveryExited emitted with next-turn join armed | engine |
| suppressions while ACTIVE | placement probes, inline checks, asset-memory serving, visual-first: all suppressed (I-11) | kernel |

Router exclusions (MUST NOT enter recovery): fast+wrong+high-confidence →
Misconception pipeline; fast-correct+drive-slide (boredom) → drive policy.

### 4.4 Assessment machine
States: IDLE → SELECTING → ITEM_PENDING → SCORING → (SELECTING | CONCLUDING) → IDLE.
| Rule | Content |
|---|---|
| entry gates | affect band = calm AND recovery IDLE AND not within failure-budget shadow (last event ≠ failure) AND (register ≥ Stage-4 questioning OR kind=placement) — else AssessmentSkipped |
| one-in-flight | at most one pendingItemRef globally per session (I-15); a probe answer turn never stacks a new question |
| non-decisive items | item answered during CONFUSED/GUESSING classification is aborted unscored (AssessmentCompleted.outcomes marks `void`) |
| stopping | stop at: decision determined \| CI within threshold \| itemsAskedThisSession ≥ cfg:assess.sessionItemCap \| affect budget spent → conclude conservative |
| placement sub-machine | three brackets below→at→above, nerve-settler first; failure budget 2; DOWNWARD-only silent adjustment; concluded state inherited cross-session |

### 4.5 Conversation turn machine (per turn, inside PLAN)
REACT (mandatory if learner produced content) → MOVE (exactly one) → INVITE
(question iff move=ASK; else non-interrogative hand-back). Counters (§3.5)
update post-VERIFY from the *verified* output, using deterministic question
detection (question marks outside code fences).
Move legality: `questionsAskedSinceGive ≥ cfg:conv.maxConsecutiveQuestions
(=2)` bans ASK; recovery ACTIVE bans ASK; move=WAIT only after SilenceDetected
below wait-time threshold.

### 4.6 Placement machine — see 4.4 placement sub-machine; boot rule: a
learner with zero evidence in a subject MUST pass through placement (or
explicit beginner claim → entry order) before any GUIDED+ state is reachable.

### 4.7 Mastery machine (per concept)
LEARNING → PROVISIONAL (autonomy exit) → CERTIFIED_PROBABLE (gate passed, no
retention component yet) → CERTIFIED_ANCHORED (rung AUTOMATIC + retention
probe ≥ cfg:mastery.minGapDays + transfer event, hintDebt 0) →
FORGOTTEN_ACCESS (failed retention probe) → back via cued recovery only
(never re-teaching; failed *cued* recovery ×2 → reopen LEARNING at GUIDED).
Downgrades from ANCHORED require two independent contradicting evidence
events (L7). Authorizer: Mastery module only.

### 4.8 Review machine (per scheduled item)
SCHEDULED → DUE (recallProb ≤ cfg:review.dueThreshold) → SERVED (retrieval
item delivered in OPEN or CORE slot) → outcome: recalled → rescheduled at
grown interval; not recalled → cued retry same session → ForgettingProbeResult
either way. Review load per session ≤ cfg:review.maxSessionFraction; overflow
ranked by downstream-dependency count (KG unlock counts), ties by longest
overdue.

### 4.9 Scheduling machine (concept processes)
Each concept process: PENDING → ACTIVE (≤1 per session at a time) →
(COMPLETED | SUSPENDED | PARKED). Selection order each session: retro
obligations → REPAIR episodes → due REVIEW batch → resume SUSPENDED (if
cooldown ≥ cfg:sched.stuckCooldownSessions elapsed) → NEW next concept from
entry order. Curiosity prefetch: an unprompted learner question about
concept X with all capability gates satisfiable MAY promote X ahead of entry
order (single-slot jump; provenance = curiosity rule id).

### 4.10 Question-stage ladder (not a stored machine; a per-turn ceiling)
Ceiling = min(TSM state ceiling [OBSERVE-class states 2; GUIDED/CHECK-class
4; PRACTICE-class 6; TRANSFER 7], register ceiling [beginner start 2],
recovery ceiling [ACTIVE → 0]). Movement: a failed answer at stage N sets a
soft cap N−1 for cfg:stage.capTurns turns. Authorizer: kernel only. The LLM
never selects stages (I-1).

### 4.11 Capability machine (per capability)
| From → To | Evidence | Notes |
|---|---|---|
| UNKNOWN → SHAKY | 1 diagnostic success | |
| UNKNOWN → OBSERVED_NO | 1 diagnostic failure | |
| UNKNOWN → STATED_NO | stated inability utterance | trusted instantly |
| STATED_NO → SHAKY | 1 demonstrated success | cheapest overturn |
| OBSERVED_NO → SHAKY | 2 successes (≥1 diagnostic) | |
| SHAKY → RELIABLE | ≥2 unaided successes in ≥2 contextTags | |
| RELIABLE → AUTOMATIC | fluency gate ×cfg:cap.automaticCount (=3) | |
| AUTOMATIC → EXPERT | teaching-back or cross-domain transfer event | |
| any ↓ | only fresh contradicting evidence: 2 failures within cfg:cap.contradictionWindow events; drop exactly one level; highWaterMark kept | decay NEVER demotes; stale → probe |
| compound items | success updates all referenced capabilities weakly (+0.5 weight); failure updates NONE (attribution logic) | diagnostic items weight 1.0 |

### 4.12 Confidence machine (per domain)
Calibration levels L0→L3; promote on cfg:conf.calibrationWindow consecutive
well-calibrated samples (|predicted − actual| small); demote on systematic
miss streak. Quadrant classification per answer: (confidence × correctness)
→ fluent / FRAGILE / MISCONCEIVING / CONFUSED — consumed by Band 4 rows.

### 4.13 Motivation machine (slow variable)
ENGAGED → COASTING → FADING → DETACHED; transitions on rolling windows of
session frequency/effort vs learner's own baseline (cfg:motiv.windowSessions);
recovery path any → ENGAGED via return + win. DETACHED is a scheduler/
notification concern, never a teaching-turn concern.

### 4.14 Frustration machine (fast variable)
CALM → STRAINED (1 failure or 1 mild utterance) → FLOODED (strong utterance,
or ≥2 failures in 3 turns, or spiral signature) → recovering (Recovery
ACTIVE) → CALM (after banked win + 1 clean turn). STRAINED tightens budgets
(§18: strained modifiers); FLOODED = Band 0. Authorizer: Frustration fold →
Recovery Engine.

---

## 5. The Policy Engine

### 5.1 Rule schema (compiled pack format)
```
Rule := {
  ruleId: string (stable, citation-bearing, e.g. "B4.D1.fast-wrong.v2"),
  band: 0–6,
  guard: conjunction of typed predicates over DECLARED readable fields,
  effect: partial PolicyDecision (fields it sets),
  specificity: int (computed = count of bound predicates, see 5.3),
  citation: educational-brain path (MANDATORY),
  mandatory: bool (mandatory rules cannot be shadowed by optional ones)
}
```
Rules MUST declare which state fields they read (`reads[]`); the compiler
MUST reject a rule reading fields outside its band's allowed set (field-
ownership map in §13). This enforces the designated-owner rule.

### 5.2 Evaluation order (normative)
1. Band 0 (interrupts). If any Band-0 rule fires: its effect is the whole
   decision skeleton; bands 1–4 are SKIPPED; bands 5–6 MAY refine surface
   fields only (script personalization). 
2. Band 1 (obligations) in fixed obligation order (§4.2).
3. Band 2 (legality) — subtractive only: filters candidate moves/actions/
   stages/media. Band-2 rules MUST NOT add candidates.
4. Band 3 (authored per-concept dispatch): if the active concept has an
   authored dispatch row matching the situation, it sets move+actionClass+
   contentSlots outright; Band 4 is SKIPPED for those fields.
5. Band 4 (policy tables): first-match within specificity order fills any
   fields still unset.
6. Band 5 (personalization): MAY set representation/anchor/pace fields; MUST
   NOT alter move, stageCeiling, budgets, or legality outcomes.
7. Band 6 (tie-break): deterministic — (a) least-recently-used representation
   (from Episode Memory), (b) lowest setupCostTier, (c) seeded PRNG.

Completeness rule: after Band 6, every PolicyDecision field MUST be set. If
`move` is unset or the legal action set is empty → deadlock protocol P-2.

### 5.3 Conflict resolution
Within a band, if ≥2 rules' guards are satisfied and their effects collide on
a field: higher specificity wins; equal specificity → mandatory beats
optional; still equal → the pack compiler MUST have rejected it (overlap
check); if it reaches runtime anyway → lexicographically smallest ruleId wins
AND PolicyConflictDetected is emitted (engineering alert — this is always a
pack bug).

### 5.4 Mandatory vs optional
Mandatory (MUST exist in every pack; compiler-verified): the Band-0 interrupt
set, the legality set (capability gate, stage ceiling, question budget, load
budget, incompatibility guard, register floor), the deadlock fallback ladder,
the close-on-win rule, lesson-one lockdown config. Optional: everything
Band 4–6.

### 5.5 Inheritance & compilation
Packs layer: `base` → `subject overlay` → `ageBand overlay` → `experiment
overlay (cohort-scoped)`. Later layers may ADD rules and OVERRIDE same-ruleId
rules; they MUST NOT delete mandatory rules. The compiler produces one flat,
totally-ordered rule list per (subject, ageBand, cohort) and MUST verify:
no equal-specificity overlaps, every state×quadrant cell covered (no silent
cells — the Correction-2 class of bug is a compile error), every state has a
zero-requirement fallback action, all citations resolve to existing Brain
paths.

### 5.6 Versioning
Packs are semver'd. A session pins the pack version active at session start
(`packVersion` on every kernel event); mid-session activation applies at next
session boundary only (I-20). Replay uses the recorded version. Major bump =
any change to mandatory rules or enums; minor = new optional rules; patch =
threshold changes within declared safe ranges.

---

## 6. Action & Content Resolution

- **A-1.** Input: PolicyDecision.actionClass + contentSlots. Output:
  TeachingAction with every slot bound.
- **A-2.** Resolution ladder per slot (strict order): ACTIVE asset (concept+
  language+ageBand keyed) → parametric template instance → constrained
  generation (captured as DRAFT into the ADR-14 lifecycle; the *instance
  used this turn* is what was generated, verifier-checked) → scripted
  fallback text from the pack. Emit costTier used.
- **A-3.** An asset whose `incompatibilities` intersect the learner's ACTIVE
  misconceptions MUST be skipped (I-10) — next ladder rung.
- **6.3 Visual classes (closed set):** `static_diagram, annotated_steps,
  table, timeline, graph_2d, number_line, geometry_2d, animation,
  simulation_widget, three_d, whiteboard_sequence, comparison_panel`.
  Decision inputs and phase rules per Architecture §9.4; runtime rules:
  visual allowed only when PolicyDecision.visualDirective.use=true; the
  a11yDescription is REQUIRED; attaching a visual MUST reduce
  budgets.maxParagraphs by visualRequest.replacesProseBudget (≥1).
- **A-4.** Evidence contract: the TeachingAction lists the event types the
  next learner turn is expected to produce; stage-2 sensors use it to focus
  classification (e.g., an ASK move arms AnswerObserved with the itemRef).

---

## 7. The Conversation Planner

- **CP-1.** Skeleton REACT→MOVE→INVITE (§4.5). REACT is mandatory when the
  learner's turn contained an answer, question, or feeling; it MUST be
  contentful (references what they said), enforced by verifier heuristic
  V-REACT (advisory-only in v1, §9.2).
- **CP-2.** The directive serialization (the ONLY decision text the driver
  sees) MUST contain exactly: move line, stage ceiling, budgets, banned
  vocabulary list, visual instruction, content payload slots, continuity
  thread (≤1), persona ref, laws summary ref. Total directive+laws+persona
  target ≤ cfg:render.maxControlTokens.
- **CP-3.** History window: last cfg:render.historyTurns (=6) verified turns,
  verbatim. The planner MUST NOT include raw model-plane state (profiles,
  ledgers) in the prompt — derived constraints only (this is the token-and-
  interference reduction that retires the v1 20-block stack).
- **CP-4.** Continuity: at most one thread reference per turn, chosen LRU
  from ConversationState.threadRefs.

---

## 8. The LLM Contract

### 8.1 Roles
The LLM appears in exactly two places:

**(a) Renderer (stage 11).**
- Input: RenderPlan serialization (§7). Output: natural-language turn text,
  optionally containing ONLY whitelisted tags: the visual tag (iff directive
  allows), nothing else. 
- The renderer MUST: render the decided move; keep within budgets; use the
  provided content payload as the substance; maintain persona/register; react
  to the learner's words.
- The renderer MUST NOT (verifier-enforced where mechanically checkable):
  choose or change teaching strategy, question stage, recovery behaviour,
  lesson flow, mastery/completion claims, capability judgments, assessments,
  visuals not directed, new concepts not in payload, or any tag not
  whitelisted. It MUST NOT mention the control apparatus to the learner.

**(b) Sensor (stage 2).**
- Schema-constrained classification only; outputs are proposals recorded as
  evidence with confidence; fabrication contract: a sensor asked "was the
  answer correct?" on a turn with no armed item MUST output `no_item`.

### 8.2 Driver interface (any model)
`render(planSerialization, historyWindow) → {text, tags[]}` and
`classify(schemaId, inputs) → typed output` — plus health check. Conformance
suite §17 T-8 gates any new model version. Model identity/version recorded on
RenderCompleted. Drivers are stateless; retries are the pipeline's job.

### 8.3 Hard prohibition
No component may concatenate free-form pedagogy instructions into the prompt
outside the RenderPlan serializer (I-2). Grep-able rule: the driver module
exposes no string-accepting prompt parameter other than the serializer's
output type.

---

## 9. The Output Verifier

### 9.1 Position
Runs on every rendered draft, including template fallbacks (templates should
always pass; a failing template is a P-1 engineering alert).

### 9.2 Rule codes (closed set, v1)

| Code | Check (deterministic) | Severity |
|---|---|---|
| V-Q1 | question count > budgets.maxQuestions (question marks outside code fences; interrobang counts; rhetorical exemption: none) | REJECT |
| V-Q2 | move ∈ {TEACH, SHOW, RECOVER, CLOSE} and text ends with a question | REJECT |
| V-STAGE | contains a calculation demand (imperative + number/operator pattern from pack lexicon) while stageCeiling < 6 | REJECT |
| V-VOC-NAME | contains conceptTermList entries while vocabularyUnlocked=false | REJECT |
| V-VOC-FORMULA | contains formula patterns (symbol=expression, LaTeX, `√`, `^`) while formulaUnlocked=false | REJECT |
| V-VOC-REG | register-banned tokens (IPA at beginner; pack lexicons e.g. "SI" lesson-one physics; "phoneme" lesson-one English) | REJECT |
| V-TERMS | new technical terms (pack lexicon match, not in prior verified turns) > budgets.maxNewTerms | REJECT |
| V-LEN | paragraph count > budgets.maxParagraphs (paragraph = blank-line-separated block; code blocks count as 1) | REJECT |
| V-CAP | references an operation whose capability is OBSERVED_NO/STATED_NO as something to perform (pack lexicon per capability) | REJECT |
| V-REC | recovery turn contains any question or new content markers | REJECT |
| V-ASSESS | emits assessment-result patterns when Assessment machine ≠ SCORING/CONCLUDING | REJECT |
| V-TAG | non-whitelisted tag present | STRIP (auto-repair, no reject) |
| V-COMPLETE | completion-claim patterns when no LessonCompleted authorized | STRIP claim + REJECT if load-bearing |
| V-PRAISE | banned praise/mockery patterns for current affect band | REJECT |
| V-REACT | (advisory v1) no reference to learner's content when REACT mandated | LOG only |

Lexicons (term lists, formula patterns, praise patterns) ship in the policy
pack, per language.

### 9.3 Rejection protocol (normative, exact)
1. Attempt 1 fails → emit OutputRejected{attempt:1}; re-render ONCE with the
   identical RenderPlan plus a violations appendix naming each code and the
   matched span. Temperature unchanged. No plan changes.
2. Attempt 2 fails (any REJECT code) → emit OutputRejected{attempt:2} +
   TemplateFallbackUsed; render the deterministic template from
   PolicyDecision.fallbackChain[0] (every decision carries one, §3.10). The
   template path MUST NOT call the LLM.
3. STRIP-severity violations are auto-repaired in place (tag removal) without
   consuming an attempt.
4. There is never a third LLM attempt in a turn (performance + determinism of
   worst case).
5. All violations, both attempts, are committed as evidence (driver quality
   metrics; F5 SLO).

---

## 10. The Scheduler

Covered structurally in §4.8–4.9. Additional normative rules:
- **S-1.** The Scheduler is the ONLY authorizer of concept activation,
  suspension, resumption, and episode typing.
- **S-2.** Session agenda is computed at OPEN and MAY be re-computed only at
  interrupt exit and obligation completion — never mid-move.
- **S-3.** Review scheduling writes ReviewScheduled with the recall
  probability at scheduling time (audit trail for the Forgetting model).
- **S-4.** Notification/proactive scheduling (out-of-session) is out of scope
  for this version of the runtime spec except as an event consumer.

---

## 11. Memory & Persistence — Ownership Matrix

| Store | Sole writer | Write moment | Readers | Never |
|---|---|---|---|---|
| Evidence log | Evidence Store API | stages 3, 13 | everyone | update/delete |
| Model snapshots (12) | each model's fold | stage 4 / async re-fold | StudentView assembly | cross-model writes |
| TSM/process state | TSM | stage 7 (persist stage 14) | policy, scheduler | writes from policy/action layers |
| Session/Lesson state | Session machine | stage 14 | all session-scoped | mid-render mutation |
| ConversationState | Planner fold | stage 14 (post-verify) | planner | pre-verify counting |
| Recovery/Assessment state | their engines | stage 14 | kernel | — |
| Episode Memory | episode summarizer | post-episode async | planner continuity | raw-transcript reads in kernel path |
| Teacher Memory (population) | nightly aggregators | async | Bands 4–6 as priors | per-turn writes |
| Asset catalog | authoring pipeline + capture | async | Action Engine | serving DRAFT status |
| Packs | pack manager | PackActivated | kernel | mid-session swap (I-20) |

- **M-1.** All snapshot writes are optimistic-concurrency guarded
  (version counter); conflict → retry fold from log tail (safe by purity).
- **M-2.** PII: verbatim fields are redaction-subject at ingest per the
  owner-set privacy policy; downstream stores receive redacted forms.

---

## 12. Determinism Classification

| Component | Class | Notes |
|---|---|---|
| Sensors (LLM classifiers) | PROBABILISTIC-RECORDED | outputs committed; error-modeled |
| Deterministic sensors (regex, timers) | DETERMINISTIC | versioned patterns |
| Folds (all 12 models) | DETERMINISTIC (MUST) | pure; property-tested |
| TSM, all machines §4 | DETERMINISTIC (MUST) | no LLM input ever |
| Policy Engine | DETERMINISTIC (MUST) | seeded PRNG only |
| Action/Content resolution | DETERMINISTIC given catalog state | generation rung records its output as the deterministic artifact |
| Conversation Planner | DETERMINISTIC (MUST) | |
| Renderer | PROBABILISTIC-RECORDED | outside determinism boundary |
| Verifier | DETERMINISTIC (MUST) | pure functions of draft+plan |
| Scheduler | DETERMINISTIC (MUST) | |
| Aggregators | DETERMINISTIC over committed data | |

Components marked MUST: any nondeterminism found there (wall-clock branch,
unseeded random, map-iteration order leaks, locale-dependent string ops) is a
release-blocking defect (T-6 hunts these).

**MUST always use authored policy (never model judgment):** move selection,
stage ceilings, budgets, recovery entry/exit, assessment start/stop/scoring
gates, mastery/certification, capability updates, scheduling, visual use/class.

---

## 13. Subsystem Implementation Contracts

Format: public interface (what others may call) / events consumed / events
emitted / allowed deps / forbidden deps. "Views" are read-only typed getters.

| Subsystem | Public interface | Consumes | Emits | Allowed deps | Forbidden deps |
|---|---|---|---|---|---|
| Gateway | ingest(msg) | — | StudentMessageReceived | Evidence API | kernel internals, drivers |
| Perception | sense(turnCtx) | #1 | #2–8, 29, 30, 36 | driver.classify, Evidence API | model snapshots (sensors don't read state, prevents circularity; exception: latency baseline via provided turnCtx) |
| Evidence Store | append(events), read(learnerId, fromSeq), retract | #33 | — | storage | everything else |
| Model folds ×12 | view(learnerId) per model | their subscribed types | #9–13 (derived) | Evidence API | other models' internals, policy, drivers |
| Recovery Engine | scan(view) → InterruptState; own machine | #3, 5 + Frustration view | #17, 18 | packs (scripts) | renderer, assessment internals |
| Scheduler | agenda(sessionCtx) | #4, 21–23, 29, 35 | #23 + activation events | KG index, Forgetting view, TSM view | policy internals, drivers |
| TSM | step(agenda, gates) → TeachingStateView | gate evidence via views | #21, 22 | views | policy (TSM doesn't read rules), drivers |
| Policy Engine | decide(views…) → PolicyDecision | — (pure) | #20, 26 | packs, views | Evidence writes, drivers, storage |
| Action Engine | resolve(decision) → TeachingAction | — | #19 | Asset catalog, packs | model writes, drivers (except cache checks) |
| Hint module (in policy plane) | hint(request) → slot content | Knowledge/Capability views | #31 | packs, catalog | LLM |
| Assessment module | gates + item selection | #2, 7 | #14–16, 36 | item banks, views | renderer |
| Visual module | visualDirective inputs → VisualRequest | — | #24 | catalog, packs | LLM decision input |
| Conversation Planner | plan(action, episodeView) → RenderPlan | #6 | — | Episode Memory view | model-plane raw state (CP-3) |
| Drivers (LLM/visual/template) | render/classify/health | — | #25, 28 | network | EVERYTHING internal: a driver imports only its input types |
| Verifier | verify(draft, plan) → result | — | #27, 32 | pack lexicons | drivers (it never re-calls; the pipeline does) |
| Mastery module | certify checks | #16, 36 | #35, 22 | views | renderer, policy internals |
| Pack manager | activate, get(version) | #34 | #34 | compiler artifacts | runtime state |

Global dependency law: dependencies point downward in the plane stack
(Expression → Decision → Model → Perception → Substrates); any upward import
is an architecture-test failure (T-7).

---

## 14. Invariants (release-blocking; each maps to a test)

- **I-1** No question above the effective stage ceiling is ever asked. (V-STAGE + policy tests)
- **I-2** Every assistant turn carries a DecisionRecorded event with non-empty rulePath, and every draft passed the Verifier. (architecture test)
- **I-3** No formula content before formulaUnlocked; no concept terms before vocabularyUnlocked. (V-VOC-*)
- **I-4** No capability promotion without qualifying evidence events; no promotion skipping levels. (fold property tests)
- **I-5** No assessment item while affect ≠ CALM, during recovery, or in the failure shadow. (simulation invariant)
- **I-6** Recovery MUST fire on every pack-listed utterance; it is never skipped or deferred. (utterance corpus test)
- **I-7** ≤1 question per turn; never >2 consecutive ASK turns. (V-Q1 + planner tests)
- **I-8** No store is written by a non-owner (matrix §11). (architecture test)
- **I-9** No subsystem mutates another's state directly — all cross-subsystem influence flows through events or views. (dependency test)
- **I-10** No asset incompatible with an ACTIVE misconception is ever served. (resolution tests)
- **I-11** During recovery: no placement probes, no inline checks, no memory-served assets, no visuals-first. (simulation invariant)
- **I-12** Failure never drops the TSM more than one state; success never advances more than one state. (machine property)
- **I-13** Mastery certification requires delayed + transfer + zero hint debt; same-session evidence never certifies. (mastery tests)
- **I-14** CLOSE contains no new content; abandoned sessions create retro-close debt paid at next OPEN. (session tests)
- **I-15** At most one assessment item in flight per session. (assessment tests)
- **I-16** Budgets in a verified output never exceed the decision's budgets. (verifier soundness test)
- **I-17** Decisions are replay-identical given (log prefix, pack version, seed). (T-4)
- **I-18** Every rendered turn's provenance chain resolves end-to-end (turn→plan→action→decision→rules→pack). (audit test)
- **I-19** The legal action set is never empty after Band 2 — the fallback chain exists for every decision. (compiler + P-2 tests)
- **I-20** Pack versions never change mid-session. (kernel test)
- **I-21** STATED_NO capabilities are honored immediately (no task requiring them until overturned). (legality tests)
- **I-22** Learner-facing text never mentions internal state, models, bands, budgets, or this apparatus. (lexicon check, audit)
- **I-23** Evidence log is append-only; retraction is additive. (store tests)
- **I-24** A turn always completes: on any internal failure the learner receives the P-0 safe turn, never an error or silence. (chaos tests)

---

## 15. Failure Handling

| # | Failure | Detection | Mandated behaviour |
|---|---|---|---|
| P-0 | Kernel panic (exception in stages 4–10) | pipeline guard | Serve the SAFE TURN: pack-scripted warm, content-free continuation ("let me think about the best next step — meanwhile, tell me…") from templates; emit incident event; freeze TSM (no transitions); next turn retries normally. Never a raw LLM call, never an error to the learner (I-24). |
| P-1 | Template failure (fallback itself fails verification) | verifier on template | serve pack's ultra-fallback static string; page engineering (this is a pack build defect) |
| P-2 | Policy deadlock (empty legal set / unset move) | completeness check §5.2 | fallbackChain: easiest legal SHOW → echo micro-win → warm close; emit PolicyConflictDetected-class incident |
| P-3 | LLM unavailable / degraded (health check, violation-rate spike > cfg:driver.violationSlo) | driver health | DEGRADED DETERMINISTIC MODE: template renders + asset serving + scripted moves + practice items; sensors fall back to deterministic subset; assessment pauses (except deterministic-scorable items); banner-free (learner not told "AI down") |
| P-4 | Brain/pack unavailable at boot | pack manager | pin last-activated pack (packs are immutable artifacts, cached); if none: refuse new sessions, existing sessions run on session-pinned pack |
| P-5 | Corrupted evidence (checksum/decode failure) | store integrity scan | quarantine the corrupt range; folds run from last good snapshot + clean tail; affected models widen confidence; incident |
| P-6 | Snapshot corruption / fold divergence (snapshot ≠ re-fold spot check) | scheduled audits | discard snapshot, re-fold from log (source of truth); L4 makes this always safe |
| P-7 | Replay mismatch (T-4 failure in CI or prod audit) | replay harness | release blocked / prod audit incident; bisect to the nondeterminism; no learner-facing action |
| P-8 | Version mismatch (event schema newer than reader) | decode guard | reader upgrades before processing (queue holds); kernel never guesses at unknown schemas |

---

## 16. Performance Budgets (server-side, per turn, p95)

| Stage(s) | Budget |
|---|---|
| 2 SENSE (incl. one classify call) | ≤ 800 ms |
| 3–10 kernel (COMMIT-1 → PLAN) | ≤ 150 ms |
| 11 RENDER | ≤ 6 s (driver SLA), streaming permitted after verification of the complete draft only — see note |
| 12 VERIFY | ≤ 30 ms per attempt |
| 13–14 COMMIT/PERSIST | ≤ 100 ms |
| Worst case total (double rejection → template) | ≤ 14 s |

Note on streaming: because verification is post-hoc on the full draft,
token-streaming to the client MUST NOT begin before verification passes.
(A future spec version may define incremental verification; until then,
perceived latency is managed with typing indicators — correctness beats
streaming.) Fold cost MUST be O(events since last snapshot); snapshot cadence
cfg:store.snapshotEveryNEvents.

---

## 17. Testing Requirements

| # | Class | Requirement (gate) |
|---|---|---|
| T-1 | Unit | every fold, gate, filter, verifier rule, and machine transition has direct tests; coverage of §4 transition tables is exhaustive (every row + every illegal-transition throw) |
| T-2 | Property | fold laws (snapshot ≡ fold(log); retraction correctness); budget soundness (I-16); machine monotonicity (I-12); capability lattice (I-4); fuzzed event sequences never reach illegal states |
| T-3 | Golden decisions | curated state→PolicyDecision tables (≥200 rows at launch, sourced from Brain worked traces D7/D9/D10); byte-compared |
| T-4 | Determinism/replay | same log prefix + pack + seed → identical DecisionRecorded stream, cross-machine, CI-gated; prod sampling audit weekly |
| T-5 | Simulation | persona automata (≥6 canonical personas) × ≥10⁴ episodes per release candidate; invariant violations (I-1…I-24 subset marked "simulation") MUST be zero; outcome-distribution diffs reviewed |
| T-6 | Nondeterminism hunt | mutation-style CI job: repeated runs with shuffled map orders, varied locales, clock skew — any decision diff fails |
| T-7 | Architecture | dependency direction (§13), single-writer (I-8), kernel choke point (I-2), driver isolation (§8.3 grep rule) |
| T-8 | Driver conformance | new model/version passes: render-contract suite (violation rate ≤ SLO on corpus), classify-schema suite (precision/recall floors), fabrication tests (no_item honesty) before activation |
| — | Regression | every prod incident and every authored anti-pattern (16-entry anti-library) becomes a permanent test; OutputRejected/PolicyConflict events auto-file candidate cases |

---

## 18. BrainConfig v1 Defaults (normative shipped values)

| Key | Default | Used in |
|---|---|---|
| conv.maxConsecutiveQuestions | 2 | §4.5 |
| conv.questionsPerTurn.ask | 1 | budgets |
| budgets.paragraphs.beginner / strained | 4 / 2 | §3.10 |
| budgets.paragraphs.intermediate / strained | 7 / 4 | |
| budgets.paragraphs.expert / strained | null / 6 | |
| budgets.maxNewTerms.beginner / other | 1 / 2 | V-TERMS |
| budgets.maxNewElements (beginner/int/exp) | 2 / 3 / 4 | load filter |
| session.gapMinutes | 30 (attention-scaled ±) | §4.2 |
| session.affectBudget.cap / lessonOne | 2 / 1 | §4.2 |
| session.maxOpeningReviews | 3 | §4.2 |
| recovery.behavioralTrigger | 2 consecutive failures | §4.3 |
| recovery.silenceMs | 90000 | §4.3 |
| recovery.escalation rungs | <2 / 2–3 / ≥4 failures | §4.3 |
| fluency.latencyFactor | 1.25 × personal baseline | §4.1 |
| fluency.count | 3 | §4.1 |
| cap.automaticCount | 3 | §4.11 |
| cap.contradictionWindow | 5 events | §4.11 |
| cap.staleDays | 45 | §3.2 |
| assess.sessionItemCap | 5 | §4.4 |
| mastery.minGapDays | 7 | §4.7 |
| mastery.minTransferDistance | 1 (different surface family) | §4.7 |
| review.dueThreshold (recall prob) | 0.7 | §4.8 |
| review.maxSessionFraction | 0.4 | §4.8 |
| sched.stuckCooldownSessions | 1 | §4.9 |
| stage.capTurns | 3 | §4.10 |
| autonomy.verifyWithinDays | 7 | §4.1 |
| conf.calibrationWindow | 5 samples | §4.12 |
| motiv.windowSessions | 6 | §4.13 |
| render.historyTurns | 6 | §7 |
| render.maxControlTokens | 500 | §7 |
| driver.violationSlo | 5% of turns with any REJECT | P-3 |
| store.snapshotEveryNEvents | 200 | §16 |

---

## 19. Versioning & Compatibility

- **V-1.** Three independently versioned artifacts: this spec (semver),
  policy packs (semver, §5.6), event schemas (per-type integer versions).
- **V-2.** Events are immutable history: readers MUST support all past schema
  versions of types they consume (decode adapters), forever.
- **V-3.** Estimator (fold) versions are recorded per snapshot; upgrading an
  estimator triggers lazy re-fold; two estimator versions MUST NOT write the
  same model concurrently.
- **V-4.** Kernel releases declare the spec version they implement; a kernel
  MUST refuse packs whose major version it does not support.
- **V-5.** Session pinning: pack + kernel version at session start govern the
  whole session (I-20).

---

## 20. Resolved Ambiguities & Standing Critiques

Decisions this spec makes that the Architecture left open (recorded so
implementers know they are decisions, not accidents):

1. **Conversation counters count verified output, not drafts** — the learner
  experienced the verified turn; drafts are driver noise.
2. **Failure success-evidence is kept on phase drop** (high-water credit)
  rather than voided — re-earning transitions is enforced by the drop itself.
3. **Specificity = bound-predicate count; final tie = lexical ruleId** —
  crude but total; ties are compiler bugs surfaced loudly (#26).
4. **No third render attempt** — worst-case latency and determinism of the
  fallback path outrank a third dice roll.
5. **No token streaming before verification** — correctness over perceived
  latency until incremental verification is specified.
6. **Sensors don't read model state** — prevents perception/model circularity;
  the cost (less context-aware classification) is bought back via evidence
  contracts arming sensors with expected items.
7. **Compound-item failures update no capability** — attribution honesty
  beats data volume.
8. **Placement adjustments remain downward-only and silent** (inherited from
  placement/02 and kept as a runtime rule).
9. **Boredom and overconfidence are routed away from Recovery** at the
  detector level, not the script level — category errors are cheapest to
  prevent at routing.
10. **The safe turn (P-0) is content-free** — a panicking kernel must not
  guess pedagogy; it buys one turn of warmth and retries.

Standing critiques carried forward (unresolved by design, revisit with data):
incremental verification for streaming; per-language verifier lexicon
coverage (non-English lexicons will lag — V-VOC rules degrade to LOG-only
until a language's lexicon ships, an explicit temporary weakening); the
element-count load estimator's crudeness (calibrated post-hoc via
LoadSignatureDetected, §4.9 of the Architecture); whether REACT enforcement
(V-REACT) can ever be made deterministic enough to REJECT on (v1: advisory).

---

*End of runtime specification v1.0.0. Implementation of any section requires
owner approval (G2). Gaps discovered during implementation are spec bugs:
file them against this document — do not invent behaviour.*
