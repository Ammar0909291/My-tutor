# ADR 13 · Evidence Engine

**Status:** Proposed (documentation only — implementation blocked on Canonical KG v1 freeze and explicit user approval)
**Date:** 2026-07-02
**Supersedes:** nothing — first ADR on evidence architecture
**Superseded by:** —

---

## 1. Problem

The Educational Brain currently has no mechanism to learn whether its own teaching decisions are
working. It does not know which explanation assets produce higher probe pass rates, which
strategies produce greater mastery delta, or which visual representations lead to fewer re-asks.
Every turn, the Brain selects assets and strategies with zero feedback from prior turns — it has
no improving-over-time property.

**The concrete failure class:** the Brain repeatedly serves the same ineffective explanation for
a concept because it has no signal that the previous 300 students who saw it scored poorly
on the subsequent probe. Without an Evidence Engine, the Brain is a sophisticated selector
operating in a closed loop with no reward signal. A world-class human teacher notices when
an explanation isn't landing ("they keep making the same mistake") and changes approach. The
Brain cannot do this today.

**Two existing evidence data structures found in the live codebase (confirmed by reading
`prisma/schema.prisma`) — neither is the Evidence Engine:**

| Schema | Table | Purpose | Status |
|---|---|---|---|
| `EvidenceRecord` | `evidence_records` | Per-learner, per-topic quality signal used by visual-mastery tracking (`visualMasteryPersistence.ts`, `improvementTracking.ts`) — adjusts *student-level* learning trajectory | LIVE, not wired into canonical Teaching pipeline |
| `EbEvidenceEvent` + `EbAssetScore` | `eb_evidence_event`, `eb_asset_score` | Per-asset, cross-student quality signal from the dormant `educationalBrain/*` pipeline — adjusts *system-level* content quality | DORMANT, written only when `ENABLE_EDUCATIONAL_BRAIN_PIPELINE` is true |

These two structures serve genuinely different purposes and must NOT be merged. The Evidence
Engine designed here is built on the `EbEvidenceEvent`/`EbAssetScore` schema (already
architecturally sound and closely matching ch04's design) wired into the *canonical* Teaching
pipeline — not the dormant `Eb*` pipeline.

---

## 2. Evidence

**`EvidenceRecord` (confirmed from `prisma/schema.prisma:380–400`):**
```
EvidenceRecord {
  userId, subjectSlug, topicSlug,
  type: EvidenceType (QUIZ | PRACTICE | PROJECT | REVIEW | ASSESSMENT | VISUAL),
  score: Float, weight: Float, method: String, engineKey: String
}
unique on (userId, subjectSlug, topicSlug, type, engineKey)
```
Used by `visuals/visualMasteryPersistence.ts` and `intelligence/improvementTracking.ts`. This
is a student-level score ledger, not an asset-quality event log. Correctly categorized in ADR 10
as Student Memory (Store 2 — student evidence for mastery tracking).

**`EbEvidenceEvent` + `EbAssetScore` (confirmed from `prisma/schema.prisma:2298–2336`):**
```
EbEvidenceEvent {
  eventId, occurredAt, turnId, userId, sessionId,
  conceptId, language, gradeBand (EbGradeBand),
  category (EbEvidenceCategory),
  assetId?, misconceptionId?, curriculumId?,
  outcome, strength, rawScore?, contextHash?
}
EbAssetScore {
  assetId, gradeBand, language, learningStyle, windowEnd,
  qualityScore, qualityConfidence, sampleSize, positiveEvents, negativeEvents
}
```
`EbEvidenceEvent` matches ch04's design almost exactly — including `contextHash`, stratified by
`language`/`gradeBand`, with `outcome` and `strength` fields. `EbAssetScore` is the rolling-
window materialized score table ch04 prescribes. Written only by the dormant
`educationalBrain/*` pipeline.

**`docs/educational-brain/04-evidence-engine.md` (ch04, confirmed by reading):**
Design C (stream + windowed batch + sticky rollups) selected; append-only `EvidenceEvent` log
+ 60-second rolling window worker + nightly sticky rollup. Six evidence categories:
`ASSET_SHOWN`, `PROBE_OUTCOME`, `MISCONCEPTION_DETECTED`, `LEARNER_FEEDBACK`, `RE_ASK`,
`SUMMATIVE_OUTCOME`. Beta-binomial conjugate for confidence (stratified prior by author kind).
Bias prevention: exploration budget (5% of turns serve second-ranked alternative), inverse
propensity weighting in nightly rollup, misconception-conditional scoring.

**Gap confirmed from §6.6 of this Bible:** "Two distinct, non-unified evidence representations
exist today... confirmed not yet related or unrelated." ADR 13 resolves this.

---

## 3. Alternative designs

### Design A — Wire the dormant `Eb*` pipeline into the Teaching path

Move `EbEvidenceEvent`/`EbAssetScore` out of the dormant pipeline by enabling it for all
turns. Keep the `educationalBrain/*` orchestration as the write path.

*Rejected*: the `educationalBrain/*` pipeline is a parallel, fire-and-forget orchestration
that was explicitly documented as dormant and "archive-status" (per `EDUCATIONAL_BRAIN_CONSOLIDATION.md`
and CLAUDE.md). Enabling it for live traffic would couple a second, separately-maintained
pipeline to the canonical path — contradicting the one-pipeline governance rule (Permanent
Rule 11 equivalent: never allow two parallel decision pipelines to both write to shared state).
The `Eb*` pipeline is archived; the canonical pipeline gains the Evidence Engine directly.

### Design B — Build a new event schema from scratch

Design a fresh `EvidenceEvent` table, discarding `EbEvidenceEvent`.

*Rejected*: `EbEvidenceEvent` already has the correct schema per ch04's design. Discarding a
correct, already-migrated table and writing a semantically identical one is pure waste. The
right action is to adopt `EbEvidenceEvent` as the canonical Evidence Engine's event log.

### Design C — Adopt `EbEvidenceEvent`/`EbAssetScore` as canonical, wired directly into the Teaching pipeline (selected)

Declare `EbEvidenceEvent` the canonical Evidence Engine's append-only event log and
`EbAssetScore` its rolling-window materialized view. Wire the write path directly from
`route.ts`'s persist stage (stage 10, ch03) into `EbEvidenceEvent` — no `educationalBrain/*`
orchestration involved. The rolling-window worker reads `EbEvidenceEvent` and writes
`EbAssetScore`. The Teaching pipeline reads `EbAssetScore` (never the raw event log).

---

## 4. Selected design

**Design C — Adopt `EbEvidenceEvent`/`EbAssetScore` as canonical, wired into the Teaching pipeline.**

### 4.1 The three-tier evidence chain

```
Turn (canonical pipeline)
  └─► Persist stage (stage 10)
        └─► append EbEvidenceEvent (lock-free INSERT, fire-and-forget)
              ↓
       60-second rolling-window worker
        └─► reads new EbEvidenceEvent rows since high-water mark
        └─► EWMA update per (assetId, gradeBand, language, learningStyle)
        └─► UPSERT EbAssetScore
              ↓
       Nightly rollup job (authoritative)
        └─► full recompute over 30-day window from EbEvidenceEvent log
        └─► OVERWRITE EbAssetScore (sticky rollup)
        └─► emit StrategyEffectivenessScore and MisconceptionPrevalence
```

### 4.2 Six evidence categories (per ch04, now canonical)

| Category | Source | Signal direction | Writer |
|---|---|---|---|
| `ASSET_SHOWN` | Any turn that served an asset | Weak positive (consumed-ness) | Persist stage, every turn |
| `PROBE_OUTCOME` | Checkpoint evaluation | Strong (pass/fail/partial) | Persist stage, after probe |
| `MISCONCEPTION_DETECTED` | `misconceptionEngine.ts` output, stage 9 | Strong negative | Persist stage, on detection |
| `LEARNER_FEEDBACK` | "Got it" / "Not clear" UI buttons | Medium explicit | Feedback API route |
| `RE_ASK` | Next-turn intent matches prior concept | Medium negative | Persist stage, on re-ask detection |
| `SUMMATIVE_OUTCOME` | Chapter assessment / end-of-chapter quiz | Very strong | Assessment submit route |

The `ASSET_SHOWN` category carries weight 0.0 by default (consumed-ness without effectiveness)
— included so the exposure-bias counter (inverse propensity weighting) has a denominator.

### 4.3 Three missing tables — new additions

**`StrategyEffectivenessScore`** (new):
```typescript
interface StrategyEffectivenessScore {
  pedagogicalStrategy: string  // TeachingDecision.action_type
  conceptId: string
  gradeBand: string
  windowEnd: Date
  masteryDeltaMean: number     // E[masteryScore after turn − masteryScore before]
  masteryDeltaVariance: number
  sampleSize: number
}
```
Written by the nightly rollup job. Read by the Teaching Engine's `decide()` in Phase 2
(implementation-phase only; ADR 08 Teaching Action Intelligence keeps `decide()` pure/zero-I/O
for Phase 1, so this read path is explicitly deferred to a future implementation turn where
`decide()` can receive pre-computed strategy scores as an input parameter rather than
calling the DB itself).

**`MisconceptionPrevalence`** (new):
```typescript
interface MisconceptionPrevalence {
  misconceptionId: string    // (topicSlug + category composite)
  gradeBand: string
  windowEnd: Date
  prevalence: number         // proportion of learners affected in 30-day window
  repairableByAssetId?: string  // best-scoring repair asset (if any)
}
```
Written by the nightly rollup job. Read by the `misconceptionEngine.ts` to detect
population-level misconception trends (as opposed to individual-learner misconceptions which
come from `MistakeRecord`).

**`CuratorQueueEntry`** (new — the human-in-the-loop feedback surface):
```typescript
interface CuratorQueueEntry {
  id: string
  trigger: 'low_score_high_traffic' | 'misconception_no_repair' | 'generation_burst'
  conceptId?: string
  misconceptionId?: string
  assetId?: string
  summary: string          // pre-built context for the curator
  status: 'pending' | 'in_review' | 'resolved' | 'dismissed'
  createdAt: Date
}
```
Written by the nightly rollup job when trigger conditions fire (per ch04 §9). Read by a
future curator UI — this is the human feedback loop that prevents AI-authored content from
degrading unnoticed.

### 4.4 Evidence Engine ownership model

The Evidence Engine is the **single writer** of `EbAssetScore`, `StrategyEffectivenessScore`,
`MisconceptionPrevalence`, and `CuratorQueueEntry`. No other component may write these tables.
The `EbEvidenceEvent` log is append-only; no UPDATE or DELETE is permitted (restartability
guarantee). This is a new single-writer rule in the same spirit as Permanent Rule 14
(`RetentionMetric`/`ReviewSchedule` single-writer ownership).

### 4.5 Connection points to ADR 11 (Recommendation Intelligence)

ADR 11 §4.5 designed an `assetEffectivenessSignal` integration point:
```typescript
assetEffectivenessSignal: Record<topicSlug, 'working' | 'not_working' | 'unknown'>
```
ADR 13 implements this as a derived read from `EbAssetScore`:
- `qualityScore × qualityConfidence ≥ 0.65` → `'working'`
- `qualityScore × qualityConfidence < 0.35` → `'not_working'`
- `sampleSize < 30` (insufficient data) → `'unknown'`

The Session Recommendation Reconciler (ADR 11 §4.2) reads this signal to switch from
"revisit the same approach" to "try a different approach" when `'not_working'`.

### 4.6 Connection points to ADR 12 (Visualization & Simulation Architecture)

ADR 12 §4.1 defines `VisualAsset.qualityScore` as a field updated by the Evidence Engine.
ADR 13 specifies the write: the rolling-window worker updates `VisualAsset.qualityScore` and
`VisualAsset.qualityConfidence` from `EbAssetScore` for any asset where `family = 'Visual'`.
The per-turn Visual Asset retrieval (ADR 12 §4.3) ranks by `qualityScore × qualityConfidence`.

### 4.7 Bias prevention (per ch04 §7, now canonical)

Three mandatory bias counters — not optional:

1. **Exploration budget (5%):** the BrainConfig `explorationBudget = 0.05` means 1 in 20
   turns is flagged `policyDecisions.explorationMode = true`, forcing the second-ranked
   alternative asset to be served instead of the top-ranked. This is the mechanism that
   prevents popular assets from accumulating overwhelming evidence advantages.

2. **Inverse propensity weighting (nightly rollup):** a rarely-shown asset's 10 evidence
   events are upweighted by `1/P(shown)` relative to a frequently-shown asset's 50 events,
   so they contribute equally to the quality signal. `P(shown)` is estimated from
   `EbEvidenceEvent` `ASSET_SHOWN` counts.

3. **Misconception-conditional scoring:** `EbAssetScore` is stratified by a `contextHash`
   that captures the learner's active misconception set at decision time. An asset that scores
   poorly only when the learner carries a specific misconception is not deprecated globally —
   it is flagged as "not appropriate without prior misconception repair."

### 4.8 Relationship to `EvidenceRecord`

`EvidenceRecord` is a student-level mastery ledger (per-learner, per-topic score). It is
correctly owned by the Student Memory tier (ADR 10 Store 2). It does NOT feed `EbAssetScore`.

`EbEvidenceEvent` is a system-level content quality event log (cross-student, per-asset).
It feeds `EbAssetScore`. These are orthogonal systems with orthogonal purposes.

The sole overlap point: a `PROBE_OUTCOME` event writes BOTH:
- A `ConceptMasteryRecord` update (ADR 10: student-level mastery update for this learner)
- An `EbEvidenceEvent` (Evidence Engine: asset-quality signal for the asset that was probed)

Both writes happen in the persist stage (stage 10 of the canonical pipeline). Neither write
depends on or reads the other.

---

## 5. Trade-offs

**60-second rolling window lag:** an asset that suddenly breaks (e.g., wrong formula in a
science explanation) takes up to 60 seconds to reflect in `EbAssetScore`. The nightly rollup
is the authoritative correction but arrives in 24 hours. Mitigation: the `LEARNER_FEEDBACK`
category provides a near-real-time signal ("Not clear" button); if the feedback rate spikes,
the rolling window reflects it in ≤60 seconds.

**`EbEvidenceEvent` table growth:** an append-only log with one row per learner per turn
event grows to O(daily_active_users × events_per_turn). At 100K DAU × 5 events/turn, that's
500K rows/day. Partitioned by `occurredAt` (confirmed index exists), 30-day retention for
the live event log (older data moves to Parquet cold storage per ADR 10 Store 6). This is
the standard event-sourcing cost — accepted.

**`StrategyEffectivenessScore` read path for `decide()`:** Ch04 §4.3 proposes using strategy
effectiveness scores as an input to stage 4 (Strategy Selection). ADR 08 froze `decide()` as
pure/zero-I/O. These two are compatible but require a specific implementation pattern: the
caller (`route.ts`) pre-computes the relevant `StrategyEffectivenessScore` rows and passes
them as an additional parameter to `decide()`, which remains pure. This deferred integration
is explicitly noted rather than glossed over.

---

## 6. Scalability

**Event log append:** `INSERT` to `EbEvidenceEvent` is lock-free (no row to update, no unique
constraint on `eventId` to check via unique index only). Safe under high concurrency.

**Rolling-window worker:** reads only rows since its high-water mark (indexed on `occurredAt`).
At 500K rows/day and 60-second windows, that's ~350 new rows per worker invocation — constant
bounded cost per run regardless of total table size.

**Nightly rollup:** O(rows in 30-day window). With Redis caching of intermediate EWMA state,
the nightly job is a correction pass, not a full recompute — it verifies and overwrites rather
than deriving from scratch.

---

## 7. AI independence impact

The Evidence Engine is the primary mechanism for P9 (every-AI-call-reduces-future-dependency):

- **With Evidence Engine off:** every turn calls the LLM to generate an explanation because
  the Brain has no memory of which explanations worked before.
- **With Evidence Engine on:** explanations that score above the quality threshold are served
  from the asset catalogue without LLM generation (per ADR 14 Knowledge Asset Lifecycle).
  The Brain's LLM dependency decreases monotonically as the evidence-ranked asset catalogue
  fills out.

Additionally, P10 (testable-without-live-LLM): the Evidence Engine's logic is pure computation
over the event log — unit-testable with fixed synthetic event streams.

---

## 8. Backward compatibility

`EbEvidenceEvent` and `EbAssetScore` tables already exist in the Prisma schema — no new
table creation needed for these. The rolling-window worker is a new background process (new
code, not a change to existing code). `route.ts` gains a new async fire-and-forget append at
the end of stage 10 — fully additive, no behavior change to existing stages 1-9.

`EvidenceRecord` is untouched. Its callers (`visualMasteryPersistence.ts`,
`improvementTracking.ts`) are untouched. The two systems remain fully parallel.

---

## 9. Validation strategy

**Event log integrity:**
- Unit test: verify that a fixed sequence of Teaching-pipeline turns produces the expected
  `EbEvidenceEvent` rows with correct `category`, `outcome`, and `strength` values.
- Property test: `ASSET_SHOWN` rows must have `strength = 0.0`; `PROBE_OUTCOME` rows must
  have `strength > 0.0`; no event may have `strength < 0` or `strength > 1`.

**Rolling-window correctness:**
- Unit test: replay a fixed event stream through the EWMA update logic and assert
  `qualityScore` converges to the expected value after N events.
- Consistency metric: each nightly rollup computes the same scores via a full log replay and
  asserts `|rolling_score − nightly_score| < 0.05` for all assets. An alert fires if > 5%
  of assets exceed this threshold.

**Bias prevention:**
- Unit test: feed 100 turns for the same concept; assert that approximately 5 of them
  (`explorationBudget = 0.05`) have `explorationMode = true`.
- Integration test: simulate two assets A (high prior score, many events) and B (neutral
  prior score, few events); verify that B's events receive higher inverse-propensity weights
  after nightly rollup.

---

## 10. Migration strategy

**Phase 1 (wire the event append):**
1. Add a `appendEvidenceEvent(event: EbEvidenceEvent)` function (wraps a Prisma `INSERT`).
2. Wire it into `route.ts` stage 10 (the existing persist stage): fire-and-forget,
   non-blocking. The event must not gate the response.
3. Log the events to verify correctness before enabling the rolling-window worker.

**Phase 2 (rolling-window worker):**
1. Implement the 60-second EWMA worker as a background function.
2. Wire `EbAssetScore` reads into the Visual Asset retrieval (ADR 12): rank by
   `qualityScore × qualityConfidence`.
3. Wire the `assetEffectivenessSignal` derivation (§4.5) into the Session Recommendation
   Reconciler (ADR 11).

**Phase 3 (nightly rollup):**
1. Implement the 30-day full-window nightly job.
2. Add `StrategyEffectivenessScore` and `MisconceptionPrevalence` write paths.
3. Add `CuratorQueueEntry` trigger logic.
4. Wire `MisconceptionPrevalence` reads into `misconceptionEngine.ts`.

**Phase 4 (strategy effectiveness → `decide()` input):**
1. Pre-compute relevant `StrategyEffectivenessScore` rows in `route.ts` before `decide()`.
2. Pass as an optional parameter to `decide()` (additive, not a signature breaking change).
3. `decide()` remains pure; the caller supplies the pre-computed data.

---

## 11. Relationship to previous ADRs

**ADR 10 (Student Memory):** `EvidenceRecord` is Student Memory Store 2. `EbEvidenceEvent`
is Teaching Memory Store 4. ADR 13 specifies ADR 10's Store 4 in detail. The single-writer
rule for `EbAssetScore`/`StrategyEffectivenessScore`/`MisconceptionPrevalence` follows the
same pattern as ADR 10's single-writer rule for `RetentionMetric`/`ReviewSchedule`.

**ADR 11 (Recommendation Intelligence):** ADR 11 §4.5 designed the
`assetEffectivenessSignal` integration point. ADR 13 §4.5 implements it: a derived read from
`EbAssetScore` producing `working | not_working | unknown` per concept.

**ADR 12 (Visualization & Simulation Architecture):** ADR 12 §4.1 requires
`VisualAsset.qualityScore` updated by the Evidence Engine. ADR 13 §4.6 specifies the write.

**ADR 14 (Knowledge Asset Lifecycle):** the Evidence Engine is the only writer of asset
quality scores. ADR 14 will specify how high `qualityScore` promotes an asset from `draft`
to `active`, and how low `qualityScore` triggers deprecation via the `CuratorQueueEntry`
table. ADR 13 designs the scoring mechanism; ADR 14 designs the lifecycle state machine.

---

## 12. Relationship to the Canonical Knowledge Graph

`EbEvidenceEvent.conceptId` uses KG concept slugs. The same slug stability guarantee that
ADR 06's consumption gate provides also protects the event log: a slug rename in the KG must
trigger a migration of historical `EbEvidenceEvent` rows — or the historical evidence for a
renamed concept becomes permanently inaccessible. This is captured in the risk register (R18).

---

## 13. Relationship to the Teaching Engine

The Evidence Engine is downstream of the Teaching Engine: it reads outcomes from Teaching-tier
decisions, never makes Teaching-tier decisions itself. `decide()` (Engine 10) remains frozen,
pure, zero-I/O, with zero read of any evidence table.

In Phase 4 (§10), `route.ts` pre-computes `StrategyEffectivenessScore` and passes it to
`decide()` as an additional parameter. This preserves `decide()`'s purity: the LLM-free,
zero-I/O property of `decide()` is preserved because the DB read happens in `route.ts`, not
inside `decide()`. The Teaching Engine freezes remain intact.

---

## 14. Future implementation plan

When implementation is approved:

1. **`src/lib/teaching/evidence/evidenceEngine.ts`** — new file: `appendEvidenceEvent()`,
   `deriveAssetEffectivenessSignal()`, `EvidenceEngineConfig` type.
2. **`src/lib/teaching/evidence/rollingWindowWorker.ts`** — new file: 60-second EWMA updater.
3. **`src/lib/teaching/evidence/nightlyRollup.ts`** — new file: 30-day authoritative recompute.
4. **`prisma/schema.prisma`** — add `StrategyEffectivenessScore`, `MisconceptionPrevalence`,
   `CuratorQueueEntry` models. Rename `EbEvidenceEvent`/`EbAssetScore` Prisma model names
   to drop the `Eb` prefix (the `Eb*` naming was an artifact of the dormant pipeline's
   namespace; the canonical Evidence Engine does not carry that prefix).
5. **`src/app/api/learn/chat/route.ts`** — add fire-and-forget `appendEvidenceEvent()` call
   at end of stage 10 (after all yields and before response flush).
6. **`BrainConfig` update** (ADR 10) — add `explorationBudget = 0.05`,
   `evidenceCategoryWeights`, `betaPriors` per author kind.
7. **Add `Finding 13`** to `ARCHITECTURE_DECISIONS.md` (two non-unified evidence schemas,
   Evidence Engine now canonical, `EbEvidenceEvent` adopted as the event log).

How does this make the Educational Brain think and teach more like a world-class human teacher?
A world-class teacher remembers that a particular analogy never quite lands for a specific type
of learner, and stops using it. The Evidence Engine gives the Brain exactly this: cross-session
memory of *what actually worked*, so its teaching gets measurably better over time rather than
just more sophisticated.
