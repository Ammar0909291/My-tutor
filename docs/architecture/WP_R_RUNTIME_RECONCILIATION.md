# WP-R — Runtime Reconciliation: Evidence Spine vs. every existing per-turn capture subsystem

**Status:** Reconciliation record. Advisory tier (Authority Index row 6).
**Produced:** 2026-07-31, against `main @ 827f3796`.
**Authorises:** nothing. G1 and G2 remain in force. This document changes no
runtime behaviour, no schema, no payload, and no API. It is the
reuse-vs-duplicate determination that WP-3 is declared to depend on.

---

## 0. Why this document exists

WP-3 carries the constraint **"No duplicate capture path."** That constraint is
not checkable from inside WP-3: it is a statement about everything *else* the
turn already writes. Before this document, no artefact in the repository
enumerated the per-turn capture surfaces, so "no duplicate" could only have been
asserted, never verified.

WP-R answers one question per subsystem: **does WP-3 reuse it, extend it,
constrain itself against it, or duplicate it?** Every verdict below cites a file
and line read at `827f3796`. Where a claim could not be traced to source it is
marked as such rather than inferred from names, comments, or architecture
documents.

**Method.** The route's write surface was enumerated mechanically rather than by
reading prose:

```
grep -roE "prisma\.[a-zA-Z]+\.(create|createMany|update|upsert|updateMany)" \
  src/app/api/learn/chat/route.ts | sort -u
```

returning exactly seven direct model writes, then every indirect capture helper
invoked from the same route was resolved to its module and its storage target.

---

## 1. Scope

**In scope:** any subsystem that writes a record *per assistant turn* on the
live chat path (`src/app/api/learn/chat/route.ts`), plus any dormant subsystem
that would do so if enabled.

**Out of scope, and why:** cross-session aggregates and read-only consumers.
They are listed in §4 so the reconciliation is complete, but they cannot
duplicate a capture path because they capture nothing.

---

## 2. Reconciliation table

Thirteen subsystems. Verdict vocabulary is WP-R's own: **REUSE** (WP-3 uses it
unchanged), **EXTEND** (WP-3 adds to it), **CONSTRAIN** (WP-3 must stay out of
it, and the boundary is stated), **DUPLICATE** (it already overlaps another
capture path).

| # | Subsystem | Entry point | Writes | Verdict |
|---|---|---|---|---|
| 1 | **Evidence Spine (EOS M1)** | `emitTurn()` — `route.ts:3709` | `SpineEvent` | **EXTEND** |
| 2 | **Evidence Engine (ADR 13)** | `appendEvidenceEvent()` — 6 sites, `route.ts:3222/3246/3270/3296/3319/3372` | `EvidenceEvent` | **CONSTRAIN** |
| 3 | **Teaching Strategy log** | `route.ts:3138` | `TeachingStrategyEvent` | **CONSTRAIN** |
| 4 | **Mistake ledger** | `route.ts:3349` (2 sites) | `MistakeRecord` | **CONSTRAIN** |
| 5 | **Kernel COMMIT-1 / PERSIST** | `kernel/stages/commit1.ts`, `stages/persist.ts` | nothing — receipts only | **CONSTRAIN** |
| 6 | **Eb pipeline persist stage** | `educationalBrain/persistStage.ts:32` | `EbEvidenceEvent` | **DUPLICATE** (dormant) |
| 7 | **Session snapshot** | `writeSnapshotDelta()` — `route.ts:3865` | `LearnSession.contextSnapshot` | **CONSTRAIN** |
| 8 | **Asset capture pipeline** | `ingestGeneratedLesson()` — `route.ts:2560` | `AssetIdentity` + family (DRAFT) | **REUSE** |
| 9 | **Memory serving telemetry** | `route.ts:2465` | `MemoryServingEvent` | **REUSE** |
| 10 | **Brain runtime metrics** | `recordDispatch/recordCompliance/recordBrainEvent` | in-process counters only | **REUSE** |
| 11 | **Progress writers** | `route.ts:3409`, `:3478`, `:3886` | `TopicProgress`, `StudentProgress` | **REUSE** |
| 12 | **Spine-derived signals** | `teaching/evidence/spineSignals.ts` | nothing — reader | **REUSE** |
| 13 | **Visual mastery persist** | `api/visual-mastery/persist/route.ts:50` | `EvidenceRecord` | **REUSE** |

---

## 3. Per-subsystem determination

### 3.1 Evidence Spine — **EXTEND**

`emitTurn(prismaLike, facts)` (`evidence-spine/turnEmitter.ts:124`) is invoked
from exactly **one** non-test site, `route.ts:3709`. Confirmed by:

```
grep -rn "emitTurn(" src --include=*.ts | grep -v /tests/
```

which returns the call site, the declaration, and two header comments — no
second caller. It writes through `writer.ts`
(`prisma.spineEvent.create`, sequence allocated by
`prisma.spineEvent.aggregate({ _max: { seq } })`), so the `SpineEvent` model
already exists and `payload` is a JSON column.

Its kill switch is real and first-line:

```ts
export function emitTurn(prismaLike: unknown, facts: TurnFacts): void {
  if (process.env.ENABLE_EVIDENCE_SPINE === '0') return
```

`types.ts` carries `CURRENT_SCHEMA_VERSION` as a per-event-type record, so
`DecisionRecorded` can be versioned independently of the other eleven types.

**Why EXTEND and not a new path:** the Spine is the only subsystem that already
emits one record per turn keyed to `turnId`, is already single-writer, is already
versioned per event type, and is already governed by an invariant requiring
universal coverage — `EOS_V2_RUNTIME_SPECIFICATION.md:748` I-2: *"Every assistant
turn carries a DecisionRecorded event with non-empty rulePath."* A new capture
path would have to re-earn all four properties.

### 3.2 Evidence Engine — **CONSTRAIN**

Six call sites, writing `prisma.evidenceEvent` (`evidenceEngine.ts:34`) across
four categories: `ASSET_SHOWN` (3222), `PROBE_OUTCOME` (3246),
`MISCONCEPTION_DETECTED` (3270), and `LEARNER_FEEDBACK` (3296 voice, 3319
recovery, 3372 hint). Approved as **W1-3**, recorded implemented in
`WAVE_0_APPROVAL_CHECKLIST.md:37`.

**This is the subsystem WP-R exists to check, and it is not a duplicate of WP-3.**
Its axis is *per-concept pedagogical evidence, accumulated across turns and
across learners* for ADR 13's scoring. WP-3's axis is *the decision record for
one turn*. None of WP-3's four constructs — AttemptVector, Adaptation State
Vector, Adjustment Record, `consumesReteachBudget` — is written by any of the six
sites; verified by grep, which finds those identifiers only under
`docs/architecture/`, never in `src/`.

**The constraint:** WP-3 must not add its four constructs here, and must not
migrate `PROBE_OUTCOME` / `MISCONCEPTION_DETECTED` into the Spine payload. Those
two categories are the nearest thing to an overlap — both describe the same
turn — but they are *observations about the learner's answer*, whereas WP-3
captures *the decision the engine made*. Moving them would break ADR 13's reader
(`evidenceReader.ts`) without any WP-3 requirement calling for it.

### 3.3 Teaching Strategy log — **CONSTRAIN**

`route.ts:3138`, fire-and-forget, gated `if (strategyHoisted && outputBiasHoisted
&& userId)`. Records the 7-value Posture selection per turn.

Conceptually adjacent to `DecisionRecorded` — both are per-turn decision records
— but they are the **Posture** and **Action** halves of ADR 08's own split, which
Phase 3's AH-5 exists to document. **The constraint:** WP-3 extends the Action
record; it must not fold the Posture log into the Spine, because AH-5 is an
unapproved handoff and folding would pre-empt it.

Note its guard: `TeachingStrategyEvent` is *not* written on every turn (three
conditions must hold), so it cannot satisfy I-2 and is not a candidate carrier
for WP-3's payload.

### 3.4 Mistake ledger — **CONSTRAIN**

`route.ts:3349`, two sites, guarded `if (resolvedConceptId)`. Feeds the existing
`detectMisconceptions()` → `MISCONCEPTION_REPAIR` machinery.

Overlaps `EvidenceCategory.MISCONCEPTION_DETECTED` (§3.2) rather than anything in
WP-3. **The constraint:** WP-3 adds nothing here. The `MistakeRecord` ↔
`EvidenceEvent` misconception overlap is real, pre-existing, and outside WP-R's
remit — ADR 10 §"ActiveMisconception" already proposes its resolution as **W1-2**,
unapproved. Recorded, not resolved.

### 3.5 Kernel COMMIT-1 / PERSIST — **CONSTRAIN**

Neither stage writes. `commit1.ts` classifies candidates as committed and says so
explicitly:

> *"The ACTUAL Evidence Spine append happens post-render via the existing
> emitTurn() call (Stage 15, POST); this preserves single-writer semantics for
> the spine … When the spine writer is extended (K3-follow-on) to write
> pre-render events, this stage becomes the caller; the contract does not
> change."*

`persist.ts` mirrors it for snapshot/progress: *"route.ts owns the actual
snapshot/progress writes today; this stage records that those writes were
performed."*

**The constraint, and it is the sharpest one in this document:** these two stages
are the *designated future callers*. WP-3 must extend the payload at the existing
`emitTurn()` site and must **not** make COMMIT-1 a second writer, or the
single-writer property the stage was written to preserve is lost by the very
package that depends on it.

### 3.6 Eb pipeline persist stage — **DUPLICATE (dormant)**

`educationalBrain/persistStage.ts:32` calls `prisma.ebEvidenceEvent.create` —
structurally a twin of `EvidenceEvent` (§3.2), written from a parallel pipeline.

It is gated at `educationalBrain/pipeline.ts:28`:

```ts
return process.env.ENABLE_EDUCATIONAL_BRAIN_PIPELINE === 'true'
```

default OFF, and `route.ts:3916` documents it as *"Activated only when
ENABLE_EDUCATIONAL_BRAIN_PIPELINE=true; zero-overhead when off."* Project memory
records the whole `src/lib/educationalBrain/*` cluster as archived and
never-executing against live traffic.

**This is the one true duplicate in the repository, and it is dormant.** It is
recorded as DUPLICATE rather than REUSE because the honest finding is that a
second evidence-capture path exists on disk, not that none does. **The
constraint:** WP-3 must not enable it, must not write through it, and must not
treat `EbEvidenceEvent` as an alternative home for its payload. If it is ever
revived, this reconciliation is void and must be re-run.

### 3.7 Session snapshot — **CONSTRAIN**

`writeSnapshotDelta()` (`route.ts:3865`, `db/snapshotWrite.ts:86`) is the
per-turn JSONB merge into `LearnSession.contextSnapshot`, with a `_v` version key
and one-retry optimistic concurrency (ISS-13). It is where most per-turn counters
already ride — the file's own header calls this "the P1 pattern," and
`conversationState.ts`, `objectiveModel.ts`, `progressionIntegrity.ts`,
`renderedRealityModel.ts` and `sessionLifecycle.ts` all say they ride it.

It is therefore the *obvious* place to put WP-3's payload, and that is exactly why
it needs a constraint. **The constraint:** the Adaptation State Vector must not be
stored here. Phase 3's **AH-2** routes standing ASV state to an existing ADR 10
store, not to the session snapshot — `contextSnapshot` is per-`LearnSession`,
while AH-2 specifies per-learner-per-concept state that must outlive the session.
Using the snapshot would silently change AH-2's semantics before AH-2 is approved.

### 3.8 Asset capture pipeline — **REUSE**

`ingestGeneratedLesson()` (`route.ts:2560`, `teaching/assets/pipeline.ts:62`)
calls `captureGeneratedExplanation` / `captureGeneratedProbe` after LLM
generation, persisting DRAFT `AssetIdentity` rows. Approved as **W4-1**.

Captures *content* (what was said), not *decisions* (why). No overlap with WP-3.
Unchanged.

### 3.9 Memory serving telemetry — **REUSE**

`route.ts:2465`, `prisma.memoryServingEvent.create`, fire-and-forget, skipped when
`resolvedConceptId` is null. Its own comment states it "reads nothing, writes
nothing that any serving-path function … will ever read back." Pure telemetry on
the memory-vs-LLM serving decision. No overlap. Unchanged.

### 3.10 Brain runtime metrics — **REUSE**

`understanding/brainMetrics.ts` — `recordDispatch` (`route.ts:2307`),
`recordCompliance` / `recordBrainEvent` (`:3165`, `:3169`). **In-process counters
only; no database write.** The module's header is explicit that they are "an
observability surface, never a store of record," and adds a validated 2026-07-21
note that on Vercel serverless each warm instance holds an independent copy and a
cold start resets them.

**Not a capture subsystem**, therefore cannot duplicate one. Listed because a
name-based sweep would flag `record*` as capture and reach the wrong verdict.

### 3.11 Progress writers — **REUSE**

`topicProgress.upsert` (`:3409`), `studentProgress.update` (`:3478`),
`studentProgress.upsert` (`:3886`). Mastery *state*, not turn *capture*. WP-3
adds nothing. Their own reconciliation is ADR 10's single-writer migration
(**W1-2**/**W3-1**), unapproved and untouched here.

### 3.12 Spine-derived signals — **REUSE**

`teaching/evidence/spineSignals.ts` reads `DecisionRecorded`'s
`workedExampleFirst` + `provenance[]` and joins them to `LessonEvidence` by
`turnId`. Its header states: *"no new telemetry, no schema change, no writer."*

**Significant for WP-3 in one respect:** it is the existing proof that the Spine's
`DecisionRecorded` payload is already consumed by ADR 13's reader path. Extending
that payload has a downstream reader today, so WP-3's additive-and-versioned
requirement is load-bearing, not ceremonial.

### 3.13 Visual mastery persist — **REUSE**

`api/visual-mastery/persist/route.ts:50`, `prisma.evidenceRecord.createMany`. A
**separate endpoint**, driven by client interaction, not by the chat turn — it is
not on `route.ts`'s path at all. No overlap. Unchanged.

---

## 4. Completeness argument

The set above is closed, by three independent sweeps at `827f3796`:

1. **Direct writes.** The `prisma.<model>.<write>` sweep over `route.ts` returns
   exactly seven models: `memoryServingEvent`, `message`, `mistakeRecord`,
   `studentProgress`, `teachingStrategyEvent`, `topicProgress`. All are in the
   table (`message` is conversation content, not capture, and is the seventh).
2. **Indirect helpers.** Every non-`prisma` capture-shaped call in `route.ts`
   (`emitTurn`, `appendEvidenceEvent` ×6, `ingestGeneratedLesson`,
   `writeSnapshotDelta`, `recordDispatch`, `recordCompliance`, `recordBrainEvent`,
   `captureError` ×3) was resolved to its module. `captureError`
   (`lib/monitoring`) is error reporting, not learner capture, and is the only
   one excluded.
3. **Dormant paths.** The `ENABLE_*` sweep over `src/lib/kernel/` and `route.ts`
   surfaced twelve flags; the only one gating a *capture* path not already listed
   is `ENABLE_EDUCATIONAL_BRAIN_PIPELINE` (§3.6).

**Verified answer to WP-R's question:** exactly **one** duplicate capture
mechanism exists — the archived Eb pipeline (§3.6) — and it is flag-gated OFF by
default and does not execute against live traffic. Every other subsystem occupies
a distinct axis. **WP-3's "No duplicate capture path" is satisfiable**, provided
the five CONSTRAIN boundaries in §3.2, §3.3, §3.4, §3.5 and §3.7 are honoured.

---

## 5. What WP-R did not do

- Did not modify runtime behaviour, schema, database, API, or Spine payload.
- Did not resolve the `MistakeRecord` ↔ `EvidenceEvent` misconception overlap
  (§3.4) — that is ADR 10's W1-2, unapproved.
- Did not enable, disable, or delete the dormant Eb pipeline (§3.6). Deleting an
  archived subsystem is not reconciliation and was not asked for.
- Did not begin WP-3, WP-1, or any later package.
- Did not approve anything. Every Wave H item remains unchecked; G1 and G2 stand.
