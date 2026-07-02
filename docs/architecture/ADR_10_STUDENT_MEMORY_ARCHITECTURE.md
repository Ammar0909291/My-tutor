# ADR 10 · Student Memory Architecture

**Status:** Proposed (documentation only — implementation blocked on Canonical KG v1 freeze and explicit user approval)
**Date:** 2026-07-02
**Supersedes:** nothing — first ADR on memory architecture
**Superseded by:** —

---

## 1. Problem

The Educational Brain reads learner state before every teaching decision and
writes learner outcomes after every probe, practice session, and assessment.
This read/write contract is the most failure-prone surface in the system.

**The concrete failure class:** "Resume lesson where I left off — in the wrong
chapter." "Mastery shown as 72% on the profile page and 48% on the
chapter view." "Misconception detected two sessions ago — Brain keeps
introducing it today." These are all the *same bug*: a learner state read
got state from a different surface than a different part of the system
expected.

**The source:** the current codebase has at least eight distinct "memory"
surfaces with no common contract and no single-writer ownership:

| Surface | Reads | Known writers |
|---------|-------|---------------|
| `TopicProgress` | `service.ts`, `learningProfile.ts`, `route.ts` | `route.ts`, assessment routes, `learningOrchestrator.ts`, `nextBestAction.ts` |
| `RetentionMetric` | `memory/repository.ts` | `memory/update-pipeline.ts` ONLY — Permanent Rule 14 |
| `ReviewSchedule` | `memory/repository.ts` | `memory/update-pipeline.ts` ONLY — Permanent Rule 14 |
| `MistakeRecord` | `memory/repository.ts` | `route.ts`, assessment routes |
| `LearningProfile` | `learningProfile.ts`, `memory/service.ts` | `profile/route.ts`, settings flow |
| `LearnSession` | `route.ts` | `route.ts` |
| `Message` | `route.ts`, context synthesis | `route.ts` |
| `contextSnapshot` (JSONB column) | `route.ts` | `route.ts`, several route sub-paths |

`RetentionMetric`/`ReviewSchedule` already enforce single-writer ownership
(Permanent Rule 14) — and they are the most reliable surfaces. `TopicProgress`
has at least four writers and is the most bug-prone. The pattern is
clear: single-writer ownership works; scattered ownership fails.

A second, separate gap: the `LearnerMemory` interface (the computed read
snapshot passed to the Teaching Engine via `TeachingMemorySnapshot`) conflates
*how well the learner once mastered a concept* (`masteryScore`) with *how much
they currently retain* (`decayedScore`). The live code uses a flat
`masteryPct` threshold of 70 (hardcoded in `memory/types.ts:9`) for every
concept regardless of concept difficulty, forgetting rate, or learner history.
ADR 07 found five non-unified mastery representations across the codebase;
ADR 10 designs the storage model that unification depends on.

A third gap: **Session Memory is implicit**. The working memory of an active
learning session (current concept, open worked-example step, pending probe,
accumulated in-session misconceptions) lives in `contextSnapshot` (JSONB) and
reconstructed on every turn from `Message` history. The Brain re-derives
these from raw text turn by turn; they are never explicitly stored and
queried as structured state.

---

## 2. Evidence

**Live code — fragmented writers:**
- `src/lib/memory/types.ts:9` — `masteryPct < 70` is the hardcoded mastery
  threshold; `WeakConcept` carries `masteryPct` derived from `TopicProgress`
- `src/lib/memory/types.ts:41` — `LearnerMemory` is assembled from
  `TopicProgress`, `RetentionMetric`, `MistakeRecord`, `LearningProfile`,
  `SubjectAnalytics`, `ReviewSchedule` (six different tables)
- `src/lib/memory/types.ts:84` — `TeachingMemorySnapshot` is the lean
  projection passed to `decide()` — carries `retentionScore` (0–100,
  aliased as `confidenceLevel`) rather than a typed mastery level
- `src/lib/school/adaptive/learningProfile.ts` — independently re-classifies
  `TopicProgress.masteryPct` with its own hardcoded threshold (ADR 07 Finding)
- `prisma/schema.prisma` — `TopicProgress`, `RetentionMetric`, `MistakeRecord`,
  `LearningProfile`, `LearnSession`, `Message`, `VisualizationCache`,
  `ChapterContentCache`, `contextSnapshot` all represent learner state with no
  explicit ownership model

**Phase 2 specification (`docs/educational-brain/05-memory-system.md`):**
- Formally identifies 8 fragmented surfaces and names the exact bug class they
  produce
- Proposes six stores with single-writer ownership: Session, Student,
  Knowledge, Teaching, Brain, Long-term
- Specifies the Bayesian mastery update model: `masteryScore` (ever-known) vs.
  `decayedScore` (currently known) — resolves the ADR 07 unification gap
- Documents that only stages 9 (Checkpoint) and 10 (Persist) are writers;
  all read stages share the read model
- The phase 2 doc is reconciled as complementary to the live architecture
  (ADR 10 reconciliation, 2026-07-02) — not conflicting

**ADR 07 finding (Mastery Intelligence):**
- Found five non-unified mastery representations; designated `MasteryLevel`
  as canonical; proposed extending to Library Mode — ADR 10 designs the
  storage contract `MasteryLevel` unification depends on

**Permanent Rule 14 (`ARCHITECTURE_DECISIONS.md`):**
- Student Memory Engine (Engine 6) writes ONLY `RetentionMetric` and
  `ReviewSchedule` — the one surface that enforces single-writer ownership,
  confirming the architectural principle works

---

## 3. Alternative designs

### Design A — Continue with fragmented surfaces + incremental cleanup

Add ownership annotations (comments, lint rules) to the existing fragmented
surfaces. No new schema. Migrate writers one-by-one over time.

- ✅ No schema migration.
- ✅ Incremental — doesn't require all writers to change at once.
- ❌ The ownership boundary lives only in comments; a new route or a new
  developer will write to `TopicProgress` directly because nothing prevents
  it.
- ❌ The mastery-threshold hardcoding (`70`) and the learner-profile's
  independent re-classification persist indefinitely.
- ❌ Session Memory remains implicit; the "wrong chapter on resume" bug class
  persists.
- ❌ Every new Educational Brain feature (Evidence Engine, Asset Lifecycle)
  must choose where to write and will pick inconsistently.
- **Rejected**: Does not resolve the root cause. Annotating a fragmented
  system gives the appearance of architecture without the guarantee.

### Design B — Unified `LearnerState` object per user (monolithic)

One Postgres row per `(userId, subjectSlug)` carrying all learner state as
JSONB.

- ✅ One read to get everything.
- ❌ Write contention: every turn, every quiz, every event worker updates the
  same row. At 10M learners × 10 turns/day this collapses.
- ❌ Schema-on-read: every consumer must know the JSONB bag's current
  structure.
- ❌ Multi-language / multi-curriculum learners require either a deeply nested
  key scheme or one row per `(userId, subjectSlug, language, curriculum)` —
  the row count explodes and the join cost is pushed to the application.
- **Rejected**: Fails at scale and hides structure that the system needs to
  query explicitly (e.g., "all learners with this misconception active").

### Design C — Six memory stores, one database, single-writer ownership (selected)

Six stores with distinct tables, distinct owners, distinct lifetimes —
all in the same Postgres database for transactional safety and operational
simplicity. Each store has exactly one module that owns all writes; all
other modules read.

- ✅ Ownership is enforced by module boundary, not by comment.
- ✅ Single-DB transactionality: probe pass → mastery delta in one tx.
- ✅ Each store scales on its own axis (Redis for Session, Postgres for
  Student, cold object store for Long-term).
- ✅ Consistent with Permanent Rule 14's already-proven pattern.
- ✅ Unblocks ADR 07 mastery unification (Student Memory is the canonical
  store for `MasteryLevel`).
- ❌ More schema surface than Design B for the read path.
- ❌ Single-database ceiling; plan for sharding at 10M+ learners (see §6).
- **Selected**: This is Design C from `docs/educational-brain/05-memory-system.md`,
  refined against live codebase evidence.

---

## 4. Selected design

### 4.1 Six memory stores — taxonomy

```
                Owner              Lifetime         Source of truth
──────────────────────────────────────────────────────────────────────
1. Session      Pipeline           minutes–hours    Transient until Persist stage
2. Student      Persist stage      forever          SoT for who this learner is
3. Knowledge    KG adapter layer   forever          SoT for what is true (ADR 06)
4. Teaching     Evidence Engine    forever          SoT for what teaches well (ADR 13)
5. Brain        Config layer       per-deploy       SoT for runtime Brain policies
6. Long-term    Snapshot worker    cold (multi-yr)  SoT for reproducibility + research
──────────────────────────────────────────────────────────────────────
```

Knowledge Memory (Store 3) is already fully specified by the Canonical
Knowledge Graph (ADRs 05-06) — this ADR does not touch it. Teaching
Memory (Store 4) is the Evidence Engine — specified by ADR 13. This ADR
specifies Stores 1, 2, 5, and 6, with Store 2 (Student Memory) as the
primary subject because it owns the most critical learning-state data and
has the worst current ownership discipline.

### 4.2 Store 1 — Session Memory

**Owner:** the pipeline (`route.ts` turn handler). **Lifetime:** bounded
by the active `LearnSession` (minutes to hours). **Storage:** Redis TTL
(fast read per stage) + the existing `contextSnapshot` JSONB column
(durability across network interruptions).

**Formal schema** (additions to the existing `contextSnapshot` structure,
all fields explicitly typed):

```typescript
interface SessionMemory {
  // Which concept is active
  currentConceptId: string | null          // slug (from KG)

  // Worked-example continuity (currently persisted, see ADR 09)
  currentWorkedExample: {
    conceptId: string; step: number; stepCount: number
  } | null

  // New: lesson stage continuity (ADR 09 proposed extension)
  lessonStageProgress: LessonStageProgressKey | null

  // New: pending probe (set after stage 7; stage 9 reads and clears)
  pendingProbeId: string | null
  pendingProbeAssetId: string | null       // future: Knowledge Asset id

  // New: in-session misconceptions (detected this session, not yet persisted)
  activeMisconceptionsThisSession: Array<{
    topicSlug: string; category: string; detectedAt: number
  }>

  // New: anti-repetition guard (don't show same visual/asset twice in 5 turns)
  recentAssetIds: string[]                 // last N assets shown

  // New: pacing signals
  turnsSinceLastProbe: number
  turnsSinceConceptChange: number
}
```

**Single writer:** the Persist stage of the pipeline (stage 10 / the
`route.ts` turn-close block). **Readers:** all stages in the same turn.

**What this fixes:** The Brain currently re-derives `currentConceptId`,
`pendingProbeId`, and in-session misconception patterns from `Message`
history on every turn. Making these explicit fields eliminates the
text-scanning and the "wrong concept on resume" failure mode.

### 4.3 Store 2 — Student Memory (primary subject of ADR 10)

**Owner:** the Persist stage. **Lifetime:** forever. **Storage:** Postgres,
several tables — the existing `RetentionMetric`, `ReviewSchedule`, and the
evolved `TopicProgress`, `MistakeRecord`, plus a new `ConceptMastery` table
(when the KG v1 freeze makes KG-concept-aligned mastery necessary).

**Canonical mastery representation:**

Following ADR 07, `MasteryLevel` is the single mastery type. The Student
Memory Engine is its sole writer. Reading mastery from `TopicProgress.masteryPct`
directly is a bug (it bypasses the canonical representation). The formal
mastery record per `(userId, conceptId)`:

```typescript
interface ConceptMasteryRecord {
  userId:            string
  conceptId:         string             // KG node slug (stable)

  // The two mastery scalars — never conflated (ADR 07 gap)
  masteryScore:      number             // 0–1: best score ever achieved
  decayedScore:      number             // 0–1: current retention after time decay
  masteryConfidence: number             // 0–1: statistical confidence in the score

  masteryLevel:      MasteryLevel       // canonical enum (ADR 07)

  // Update provenance
  lastProbeOutcome:  'pass' | 'fail' | 'partial' | null
  lastSeenAt:        Date
  attemptCount:      number
  sampleSize:        number             // effective # of graded interactions
}
```

**Mastery update rule** (per probe outcome):
- Correct probe answer: `masteryScore += step × probeDifficulty × (1 - masteryScore)`;
  where `step = 0.15` for foundational probes, `0.25` for proficient-level probes.
- Incorrect probe answer: `masteryScore -= step × (masteryScore)`.
- `decayedScore = masteryScore × exp(-Δt / halfLife)` where `halfLife`
  is derived from the concept's `estimated_hours` field (faster-learned
  concepts have shorter half-lives as a default; the Evidence Engine
  refines this — ADR 13).
- `masteryLevel` is recomputed from `masteryScore` via the canonical
  classification table proposed in ADR 07.

**Active misconceptions:**

```typescript
interface ActiveMisconception {
  userId:           string
  misconceptionId:  string             // canonical misconception slug
  topicSlug:        string             // concept the misconception applies to
  confidence:       number             // 0–1, Bayesian update per detection/repair
  firstDetectedAt:  Date
  lastDetectedAt:   Date
  repairAttempts:   number
  lastRepairAt:     Date | null
  status:           'ACTIVE' | 'REPAIR_IN_PROGRESS' | 'REPAIRED' | 'ESCALATED'
}
```

**Single-writer rule:** ONLY the Persist stage (stage 10) may write to
any Student Memory table. All other routes that currently write
`TopicProgress` directly (`learningOrchestrator.ts`, assessment routes,
`nextBestAction.ts`) will be migrated to emit structured events consumed
by the Persist stage — eliminating the multiple-writer bug class.

### 4.4 Store 5 — Brain Memory (policy store)

**Owner:** the config layer. **Lifetime:** per-deploy, with database
overlays for experiments. **Storage:** versioned config files (JSON) +
a `BrainConfig` Postgres table for A/B experiment overlays.

The Brain Memory formalizes what are currently hardcoded constants into
explicitly named, versioned, auditable policy fields:

```typescript
interface BrainConfig {
  // Mastery classification thresholds (currently ASSESSMENT_PASS_THRESHOLD = 70)
  masteryThresholds: Record<MasteryLevel, number>

  // Teaching strategy weights (currently implicit in teachingStrategy.ts)
  strategySignalWeights: Record<string, number>

  // Visual policy defaults per strategy (currently hardcoded if/else)
  visualPolicyByStrategy: Record<TeachingStrategyType, VisualPolicy>

  // Probe frequency targets (currently implicit)
  probeTargetFrequency: number    // turns per probe on average

  // Misconception confidence thresholds (currently: LOW=2 occurrences, MEDIUM=3-4, HIGH=5+)
  misconceptionConfidenceLevels: { LOW: number; MEDIUM: number; HIGH: number }

  // Active A/B experiment arms (indexed by userId hash)
  activeExperiments: ExperimentArm[]
}
```

`BrainConfig` is **read-only at runtime** — no teaching-path code may
write to it. It is updated by deployments and by the Evidence Engine's
experiment promotion path (ADR 13).

This resolves the hardcoded-constant problem identified in ADR 05 and
ADR 07 without requiring every constant to be exposed in the Canonical KG.

### 4.5 Store 6 — Long-term Memory

**Owner:** a nightly snapshot worker. **Lifetime:** cold storage,
multi-year. **Storage:** object store (S3/R2/GCS), columnar Parquet.

Not a primary concern for Phase 2 implementation. Specified here for
completeness and so that no Phase 2 feature inadvertently destroys
the reproducibility trail:

- Daily snapshot of `AssetIdentity` quality scores (Teaching Memory).
- Daily snapshot of canonical KG state (Knowledge Memory).
- Daily snapshot of `BrainConfig`.
- Append-only export of `EvidenceEvent` log (ADR 13).
- Student Memory per active learner: PII-gated, opt-in for research
  populations only.

**Retention:** 7 years for regulatory, 3 years for research. Snapshots
are write-once, append-only. No code may read from Long-term Memory
during a live request — cold reads only, for audit and research.

---

## 5. Trade-offs

**Single-writer ownership vs. migration cost:** Converting `TopicProgress`
from a many-writer to a single-writer model requires changing every caller
to emit events rather than writing directly. This is a non-trivial Phase 2
migration. The trade-off is accepted because the bug class produced by
multi-writer tables is chronic and worsens with each new feature that reads
learner state.

**Explicit Session Memory vs. contextSnapshot simplicity:** Formalizing
Session Memory adds schema structure to what is currently a flexible JSONB
blob. It trades flexibility for debuggability — when a session ends
incorrectly, every Session Memory field has a named value and a clear
owner, instead of "somewhere in the JSONB."

**Six stores vs. one monolith:** More moving parts, but each moves
independently and fails independently. A Redis outage affects only Session
Memory (the turn still completes with a degraded read); a Postgres write
outage affects only Student Memory (sessions can still read cached state).
The monolith fails as a unit.

**`decayedScore` vs. `masteryScore`:** Maintaining two scores adds
computation. The trade-off is accuracy: a learner who hasn't seen
trigonometry in 6 months deserves `decayedScore ≈ 0.4` even if their
`masteryScore = 0.85`, and the Teaching Engine should treat them
differently in each case. A single score cannot model both states.

---

## 6. Scalability

- **Session Memory (Redis):** Redis Cluster shards by `sessionId`. Session
  Memory access at 10M learners × 10 turns/day = 100M reads/day — well
  within Redis Cluster's operational range. TTL cleanup is automatic.
- **Student Memory (Postgres):** `ConceptMasteryRecord` is partitioned by
  `userId` (range or hash). At 1,000 concepts × 10M learners = 10B rows
  — manageable in Postgres with read replicas for the hot read path
  (memory snapshot). The Persist stage writes are serialized per-user
  (one write per turn per user) — no hot-row contention.
- **Brain Memory (config + DB overlay):** Immutable config files are
  copied per instance; DB overlays are read once per session and cached
  in-process. Zero scalability concern.
- **Long-term (object store):** Append-only Parquet partitioned by date.
  Scales to petabytes without Postgres involvement.
- **The sharding point:** Single Postgres instance handles up to ~10M
  learners with read replicas. Above that, partition Student Memory by
  `userId` range across Postgres shards (consistent hash of userId → shard
  id). The Persist stage becomes shard-aware; all other stages read from
  the computed `LearnerMemory` snapshot (one cross-shard call per turn, not
  per stage).

---

## 7. AI independence impact

Student Memory architecture has a direct AI-independence effect: the
Teaching Engine's decision quality is bounded by the quality of the
memory snapshot it receives. A fragmented, inconsistently written memory
surface forces the Brain to tolerate noisy inputs — which in practice means
the LLM compensates by generating contextually inconsistent turns ("treat
this as new material" for a concept the learner already mastered two
sessions ago).

Formalizing Student Memory allows:
- The Brain to **skip** LLM-generated re-explanations for concepts where
  `decayedScore > threshold` — the system already knows the learner
  retained it.
- The Brain to **inject** precise misconception repair instructions (based
  on `ActiveMisconception.confidence`) rather than hoping the LLM infers
  what to fix from vague "the learner struggled" signals.
- The Brain to **reduce LLM context size** by passing structured snapshots
  instead of raw conversation history for state reconstruction — fewer
  tokens per turn, lower cost, faster inference.

This is a concrete instance of first principle P2 (assets not generations)
applied to memory: the learner's history should be a structured record, not
a re-derived inference from conversation text.

---

## 8. Backward compatibility

**Session Memory (Store 1):** The new fields are additions to the existing
`contextSnapshot` JSONB. Old turns that don't write the new fields will
read `null` for the new fields — all six stores design for a clean
null-safe read path. No migration required for historical sessions.

**Student Memory (Store 2):** `ConceptMasteryRecord` is a new table, not
a replacement for `TopicProgress`. Phase 2 migration is additive:
introduce the new table, dual-write during a transition period, migrate
readers, then remove direct-`TopicProgress` writes from non-owner code.
`TopicProgress` remains until the migration is complete; the canonical
read during transition is whichever table has a value.

**`masteryPct` → `masteryScore`:** During the migration period, the
`LearnerMemory` read snapshot (`memory/service.ts`) will compute
`masteryScore` from `TopicProgress.masteryPct / 100` for learners who have
no `ConceptMasteryRecord` yet. This is an explicit fallback, not a silent
siloing — it surfaces in the `masteryConfidence = 0.0` field (we have no
confidence in a score derived from the old table).

**Brain Memory (Store 5):** Hardcoded constants remain in code until the
`BrainConfig` store is populated. The transition is config-file-first: the
first deployment replaces `ASSESSMENT_PASS_THRESHOLD = 70` with
`brainConfig.masteryThresholds.PROFICIENT`, reading from the config file.
No DB migration needed for the first pass; the DB overlay table is added
in Phase 3.

---

## 9. Validation strategy

Per the Gap Analysis Discipline's testability requirement (P10: testable
without live LLM):

- **Session Memory:** unit-test by constructing a `SessionMemory` snapshot,
  running the pipeline's read stages against it, and asserting the
  `TeachingMemorySnapshot` projection is correct. No LLM or Postgres needed.
- **Student Memory (update model):** unit-test the mastery update function
  (`masteryScore += step × difficulty × (1 - masteryScore)`) with
  property-based tests: monotone increase on repeated correct probes;
  monotone decrease on wrong probes; score bounded [0, 1]; `decayedScore`
  always ≤ `masteryScore`.
- **Brain Memory:** validate the `BrainConfig` JSON schema against a Zod
  schema at load time (analogous to the KG validator in ADR 06). A
  `BrainConfig` that fails schema validation must refuse to start the
  server — never silently fall back to a different constant.
- **Integration:** a test fixture replays a fixed sequence of probe
  outcomes (pass/fail/partial) against a `ConceptMasteryRecord` and
  asserts the resulting `masteryLevel` matches the expected classification
  table from ADR 07.

---

## 10. Migration strategy

**Phase 2a (add, don't replace):**
1. Add `SessionMemory` typed fields to `contextSnapshot` (additive — old
   code reads `null` safely).
2. Create the `ConceptMasteryRecord` table alongside `TopicProgress`.
3. Create the `ActiveMisconception` table alongside `MistakeRecord`.
4. The Persist stage dual-writes to both old and new tables.

**Phase 2b (migrate readers):**
5. `memory/service.ts` reads from the new tables when a record exists,
   falls back to `TopicProgress` when it doesn't.
6. All callers of `LearnerMemory` read the same projection — no change to
   readers (the snapshot shape is backward-compatible).

**Phase 2c (migrate writers, eliminate multiple writers):**
7. Audit every non-Persist-stage write to `TopicProgress`: route them
   through a structured event emitted to the Persist stage queue.
8. The Persist stage is the single writer to `TopicProgress`,
   `ConceptMasteryRecord`, `MistakeRecord`, `ActiveMisconception`.
9. Add a lint rule / TypeScript type guard that prevents direct writes
   to these tables from non-owner modules.

**Phase 2d (deprecate old tables):**
10. Once all readers prefer new tables and all writers are migrated, set
    `TopicProgress` to read-only via a DB constraint.
11. Keep `TopicProgress` for 90 days (for rollback safety), then archive.

---

## 11. Relationship to previous ADRs

- **ADR 05 (KG Consumption Pipeline):** Brain Memory's `BrainConfig`
  consolidates the hardcoded constants that ADR 05 flagged as
  incorrectly using a flat `ASSESSMENT_PASS_THRESHOLD = 70` for all
  concepts. `BrainConfig.masteryThresholds` replaces this constant with
  a policy map that can be adjusted without a code deploy.
- **ADR 06 (KG Consumption Pipeline gate):** Knowledge Memory (Store 3)
  is fully specified by ADR 06's consumption gate. ADR 10 does not
  alter it — it just names Store 3 in the taxonomy.
- **ADR 07 (Mastery Intelligence Architecture):** ADR 07 proposed
  `MasteryLevel` as the canonical mastery type and identified 5 fragmented
  representations. ADR 10 provides the storage contract (`ConceptMasteryRecord`)
  that makes canonical unification possible. ADR 07's proposed extension
  to Library Mode requires `ConceptMasteryRecord` to exist — ADR 10 is a
  prerequisite for that extension.
- **ADR 08 (Teaching Action Intelligence):** The Teaching Engine's
  `decide()` receives a `TeachingMemorySnapshot`. ADR 10 strengthens the
  contract: `retentionScore` (currently 0–100, aliased as `confidenceLevel`)
  becomes a typed `MasteryLevel × decayedScore` pair. ADR 10 does not
  change `decide()`'s signature — it changes what populates the snapshot.
- **ADR 09 (Dynamic Lesson Composition):** ADR 09 proposed adding
  `contextSnapshot.lessonStageProgress`. ADR 10 classifies this field
  as belonging to Session Memory (Store 1) — which is the correct
  location. The two ADRs are consistent; ADR 09's proposal is subsumed
  into ADR 10's Session Memory schema.
- **ADR 13 (Evidence Engine, upcoming):** Teaching Memory (Store 4) is
  fully specified by ADR 13. The evidence the Evidence Engine emits
  (`EvidenceEvent`) is consumed by the Teaching Memory store only; the
  Student Memory store is a *source* of events (probe outcomes, detected
  misconceptions) but not a consumer. ADR 10 defines the event types
  the Persist stage emits; ADR 13 defines how they are consumed.

---

## 12. Relationship to the Canonical Knowledge Graph

Student Memory's `ConceptMasteryRecord` uses `conceptId` (a KG slug) as
its primary key alongside `userId`. This creates a direct dependency on KG
slug stability:

- **Slug stability guarantee:** the Canonical KG's 10-field schema includes
  `id` as a stable slug; the Curriculum Production Pipeline must not
  rename concept slugs without a versioned migration. ADR 10 depends on
  this guarantee being honored.
- **Slug coverage:** `ConceptMasteryRecord` exists only for concepts in
  the learner's active subject's KG. A `userId` × `conceptId` pair that
  doesn't match a live KG slug is rejected at write time.
- **Brain Memory and KG:** `BrainConfig.masteryThresholds` could in
  principle be informed by `mastery_threshold` (the Canonical KG's 10th
  field, currently unexposed — ADR 05). Once ADR 05's proposed exposure
  is approved, `BrainConfig.masteryThresholds` gains a per-concept
  override path: `brainConfig.masteryThresholds[conceptId] ??
  brainConfig.masteryThresholds.default`. This is ADR 10's forward bridge
  to ADR 05 — no new implementation required now, just a reserved field
  in the schema.

---

## 13. Relationship to the Teaching Engine

The Teaching Engine (`decide()`, Engine 10) is frozen and pure — it reads
a `TeachingMemorySnapshot` and returns a `TeachingDecision`. ADR 10 does
not change `decide()`'s interface.

What changes is the **quality** of the snapshot passed in:
- `weakConcepts` will be derived from `decayedScore < threshold` (temporal)
  rather than `masteryPct < 70` (static threshold) — more accurate signals.
- `misconceptions` will be derived from `ActiveMisconception.confidence ≥ 0.5`
  (Bayesian) rather than a count-based heuristic — more reliable signals.
- `retentionScore` will become an explicit `decayedScore` field rather than
  `confidenceLevel` aliased at 0–100 — semantically correct.

The Teaching Engine sees better inputs and produces better decisions without
any changes to its own logic — consistent with the frozen-pure-zero-I/O
guarantee and Permanent Rule 2 (never modify the Teaching Engine to
accommodate a caller's needs; modify the caller instead).

---

## 14. Future implementation plan

Implementation is blocked on Canonical KG v1 freeze (Curriculum Production
Pipeline authority) and explicit user approval. When those gates open:

**Phase 2a (session-safe, lowest blast radius):**
- Add typed `SessionMemory` fields to `contextSnapshot` schema.
- Add `pendingProbeId` and `activeMisconceptionsThisSession` — these
  immediately fix the "Brain forgets mid-session what it just probed"
  failure mode.

**Phase 2b (mastery storage):**
- Create `ConceptMasteryRecord` table.
- Dual-write mastery from the Persist stage; teach `memory/service.ts` to
  prefer the new table.
- Retire the `masteryPct < 70` hardcoding in `memory/types.ts:9`.

**Phase 2c (ownership cleanup):**
- Audit `TopicProgress` writers; route them through Persist stage events.
- Create `BrainConfig` JSON file; replace the first hardcoded constant
  (`ASSESSMENT_PASS_THRESHOLD`).

**Phase 2d (misconception formalization):**
- Create `ActiveMisconception` table.
- Retire `MistakeRecord`-count-based confidence heuristic (`LOW=2, MEDIUM=3-4,
  HIGH=5+`) in favor of Bayesian update from the Evidence Engine (ADR 13).

**ADR 13 dependency:** `ActiveMisconception.confidence` is most valuable
when it is updated by the Evidence Engine's probe-outcome events. Phase 2d
should be sequenced after ADR 13's Evidence Engine is implemented.
