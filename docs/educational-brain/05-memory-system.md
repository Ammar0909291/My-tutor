# 05 · Memory System — what is remembered where, and why

> *Memory in the Brain is not "one cache." It is six distinct stores
> with different owners, lifetimes, consistency guarantees, and
> truth. Confusing them is how learning systems become unsafe.*

---

## 1. Why one memory is not enough

The current codebase has at least eight different "memory" surfaces
already — `Profile`, `LearningProfile`, `TopicProgress`,
`RetentionMetric`, `MistakeRecord`, `LearnSession`, `Message`,
`VisualizationCache`, `ChapterContentCache` — and they share no
common contract. A learner's "current chapter" is sometimes
inferred from `Message` history, sometimes from `LearnSession`,
sometimes from `TopicProgress.completedAt`. This is how bugs in
"resume lesson where I left off" happen.

Phase 1 formalizes **six memory stores**. Each has one owner, one
write path, one read pattern, one lifetime, one consistency model.
A field that doesn't fit cleanly into one store doesn't exist.

---

## 2. Three candidate designs for memory architecture

### Design A — Single denormalized "LearnerState" object per user

One row per user, JSON-bag style. All mutable learner state in one
place.

- ✅ Atomic reads — one query gets everything the Decision Pipeline
  needs.
- ❌ Write contention; the same row is updated by every turn,
  every quiz, every event consumer.
- ❌ Schema-on-read: every consumer has to know the bag's structure.
- ❌ Multi-language / multi-curriculum learners blow it up.

### Design B — Microservice per memory kind (separate DBs)

Independent stores for each memory kind, each with its own database.

- ✅ Maximally isolated; one store's outage doesn't cascade.
- ❌ Cross-store joins are application-level and slow.
- ❌ Eventual-consistency between stores is a real cost (a probe
  pass writes to Mastery; the Decision Pipeline reads from Mastery
  immediately and may miss the write).
- ❌ Overengineered for a single-deployment educational app.

### Design C — One database, six tables, six READ MODELS

All six memory stores in one Postgres database, each with its own
table (or set of tables), each with a single owner module that owns
all writes. Reads can join across; writes never can.

- ✅ Atomic transactions across stores when needed (e.g., a probe
  pass writes both Probe outcome and Mastery delta in one tx).
- ✅ Each store has a clean ownership boundary, observable in code.
- ✅ Restartable: a single database backup snapshot is the entire
  Brain's memory.
- ❌ Single-DB ceiling; have to plan for sharding at the 10M-learner
  point (doc 09).

### Choice — Design C

C is the only design that gives us the ownership clarity of B with
the operational simplicity of A. The sharding ceiling is a Phase-3
problem; until then, a single Postgres instance with read replicas
handles the load.

---

## 3. The six memory stores

```
                    Owner             Lifetime          Source of truth
─────────────────────────────────────────────────────────────────────────
1. Session Memory   pipeline          minutes-hours     transient until persisted
2. Student Memory   persist stage     forever           SoT for the learner
3. Knowledge Memory graph layer       forever           SoT for what is true
4. Teaching Memory  evidence engine   forever           SoT for what teaches well
5. Brain Memory     config layer      bounded           SoT for "how I decide"
6. Long-term Memory snapshot layer    cold storage      SoT for reproducibility
─────────────────────────────────────────────────────────────────────────
```

Each is described below.

---

## 4. Session Memory — "what is happening right now"

Owner: the Decision Pipeline. Lifetime: bounded by the session (1-60
minutes). Storage: Redis with TTL, plus the active `LearnSession`
row.

What it remembers:

```text
SessionMemory(sessionId) {
  currentConceptId          — what concept the conversation is on
  currentWorkedExample      — if one is open: { conceptId, step, stepCount }
  lastAssetsShown           — the last N assets, by family, to avoid immediate repetition
  pendingProbeId            — set after stage 7 emits a probe; stage 9 reads it
  activeMisconceptionsThisSession   — set, derived from in-session events
  shortCircuitCooldowns     — e.g., don't visualize same concept twice in 5 turns
  conversationModeOverride  — set by branch transitions ('recovery' → 'school')
  pacing                    — how many turns since last probe, etc.
}
```

What it deliberately does NOT remember:

- The full conversation transcript (that's the `Message` table).
- Long-term mastery (that's Student Memory).
- Asset content (that's Knowledge Memory).
- Personality / persona (that's Brain Memory).

Why a separate store: the Decision Pipeline reads SessionMemory on
*every* stage; latency budget is 5 ms. A single Redis hash per session
serves that. Persisting the same data to Postgres on every turn
would blow the latency budget.

**Consistency**: eventually-consistent with Student Memory. The
session ends; on session-close, the persist stage flushes
SessionMemory derivatives into Student Memory (e.g., `currentConceptId`
at session close becomes "last topic studied").

---

## 5. Student Memory — "who this learner is, where they are"

Owner: persist stage (stage 10). Lifetime: forever. Storage:
Postgres, several tables.

What it remembers:

```text
StudentMemory(userId) {
  profile                — Profile row (display name, language preferences, etc.)
  learningProfile        — LearningProfile (style, pace; existing model)
  enrolledCurricula      — ProfileSubject rows
  conceptMastery         — per-concept: { masteryScore, masteryConfidence,
                                          lastSeenAt, attemptCount,
                                          decayedScore — see below }
  activeMisconceptions   — per-misconception: { confidence, firstDetectedAt,
                                                lastDetectedAt, repairAttempts }
  goals                  — LearningGoal rows
  conversationHistory    — pointer to Message tables (paginated)
  achievements           — UserAchievement, XpTransaction rollups
  preferences            — UI/UX settings, language toggles, accessibility
}
```

### Mastery — a Bayesian-ish update model

`masteryScore` per concept is updated whenever a `PROBE_OUTCOME`
fires:

- Start at 0.0 with `masteryConfidence` = 0.1 (we know almost nothing).
- A correct probe answer: bump `masteryScore` toward 1.0 with a step
  size proportional to the probe's difficulty (a harder probe moves
  the score more).
- An incorrect probe answer: bump toward 0.0 similarly.
- `masteryConfidence` grows with sample size (more attempts → more
  confidence).
- `decayedScore` = `masteryScore × exp(-Δt / halfLife)`, where
  halfLife depends on the concept's `estimatedMinutesToMastery`
  (faster-learned ≈ faster-forgotten as a default; reviewed by
  Evidence Engine).

The Decision Pipeline uses `decayedScore` for "do you currently know
this," and the undecayed `masteryScore` for "have you ever known
this" (relevant for retrieval-practice scheduling).

### Active misconceptions

When a `MISCONCEPTION_DETECTED` event fires (probe answered wrong in
the targeted way), the misconception goes into the learner's
`activeMisconceptions` set with confidence 0.7. Further detections
push confidence higher (logarithmically); confirmed *repairs* (the
matching `repairableBy` asset shown, followed by a probe-pass on a
probe with that misconception targeted) decay confidence toward 0
and eventually remove it.

A misconception that's been on a learner for > 90 days with no
repair attempts is *escalated* — it appears in the curator queue and
in `CoachInsight` for the learner.

### Consistency

Student Memory is the **source of truth for the learner**. Read by
the Decision Pipeline (stage 3 Memory). Written only by stage 10
Persist. No other writers. This is critical — the current code has
many writers to `TopicProgress`; this gets cleaned up in Phase 2.

---

## 6. Knowledge Memory — "what is true"

Owner: graph layer (doc 02). Lifetime: forever. Storage: Postgres
tables for `Concept`, `LearningObjective`, `Misconception`,
`Curriculum`, plus an in-memory adjacency snapshot.

What it remembers: see doc 02. This document just clarifies that
it's *memory* — the source of truth for the structural part of the
Brain's knowledge.

### Why a separate store

Knowledge Memory has different lifetime semantics from Student
Memory. A learner's mastery score updates on every probe; a Concept's
title updates approximately never. Different write rates, different
consistency needs, different access patterns. Conflating them costs.

### Consistency

Strong. Knowledge Memory writes are append-only versioned (doc 02 §
11); a read returns the latest active version. The in-memory
adjacency snapshot is refreshed atomically on each write.

---

## 7. Teaching Memory — "what teaches well"

Owner: Evidence Engine (doc 04). Lifetime: forever (append-only
event log) + bounded (rolling windows). Storage: append-only event
log table + per-asset score table + Redis rolling windows.

What it remembers: see doc 04.

### Why a separate store

Teaching Memory is *evidence about how the Brain performs*. It is
not knowledge ("what is true") and not learner state ("who knows
what"). It is performance data about the Brain's own choices. Owned
by the Evidence Engine; written only by Evidence Engine workers.

### Consistency

Eventually consistent on the fast loop (Redis rolling windows,
60-second lag); strongly consistent on the slow loop (nightly
rollups, authoritative).

---

## 8. Brain Memory — "how I decide"

Owner: a small config layer. Lifetime: bounded (per release, plus
experiments). Storage: typed config files in the repo + database
overlays for ranking weights and experiment arms.

What it remembers:

```text
BrainConfig {
  rankingWeights         — current weights for asset ranking (doc 01 § 8)
  strategyTransitionMatrix — per (concept context) → strategy probabilities
  visualPolicyDefaults   — default visualPolicy per strategy
  experimentArms         — active experiments + arm assignments
  classifierRules        — promoted-from-LLM intent classification rules
  promptTemplates        — for the rare cases where an LLM is invoked
  modelChoices           — which model for which stage (with fallback chain)
}
```

The Brain has explicit, *queryable*, *changeable* policies. The
existing chat route bakes policy into 1,400 lines of `if` and `&&`;
Phase 1 surfaces every policy decision as a field that an A/B test
or a curator can change without code.

### Why a separate store

Policies need to be:
- **Auditable**: "What ranking weight did we use on 2026-04-15?"
- **Reversible**: "Roll back the experiment that hurt mastery."
- **Testable**: a different `BrainConfig` instance can power a CI
  fixture replay.

A `BrainConfig` is essentially the running snapshot of who the Brain
is. Versioned; changes deploy with a tagged release.

### Consistency

Strongly consistent within a deploy. Experiment overlays are
per-learner stable (assignment is hashed on `userId`).

---

## 9. Long-term Memory — "what was true at any given moment"

Owner: snapshot layer (runs nightly). Lifetime: cold storage,
multi-year. Storage: object store (S3 / R2 / Google Cloud Storage),
columnar formats (Parquet).

What it remembers:

- Daily snapshot of `AssetIdentity` (every asset's score on every
  day).
- Daily snapshot of `KnowledgeMemory` (graph state).
- Daily snapshot of `BrainConfig`.
- Append-only export of `EvidenceEvent` log.
- Optional: daily snapshot of `StudentMemory` per active learner
  (privacy gate; opt-in for research populations only).

### Why a separate store

Reproducibility. Three years from now, someone asks "what was the
canonical explanation for Newton's second law in CBSE Class 10 on
2026-06-01?" — Long-term Memory answers in seconds, without
disturbing the live Postgres. Also necessary for:

- Regulatory audits.
- Population-level research (with PII removal).
- Re-evaluating Evidence Engine policy retroactively (replay the
  log under new rules to see what would have happened).

### Consistency

Eventually consistent (24h lag). Snapshot is the source of truth
for that day; live Postgres is the source of truth for *now*.

---

## 10. Short-term within-turn memory

Not a store. It's the `TurnContext` (doc 03 § 3). Mentioned here for
completeness: the Brain's short-term memory is the in-process
TurnContext object that lives the lifetime of one turn (~1 second).
Nothing in TurnContext persists beyond the turn except via the
persist stage routing it into one of the six stores above.

---

## 11. Decision Pipeline → Memory map

Which stage reads / writes which store:

| Stage | Session | Student | Knowledge | Teaching | Brain | Long-term |
|-------|:-------:|:-------:|:---------:|:--------:|:-----:|:---------:|
| 0. Frame | R | R | – | – | R | – |
| 1. Intent | R | R | R | – | R | – |
| 2. Retrieval | R | R | R | R | R | – |
| 3. Memory | R | R | R | R | R | – |
| 4. Strategy | R | R | – | R | R | – |
| 5. Composition | R | R | R | R | R | – |
| 6. Visual | R | R | R | R | R | – |
| 7. Probe | R | R | R | R | R | – |
| 8. Narration | R | R | R | – | R | – |
| 9. Checkpoint | RW | – | R | – | R | – |
| 10. Persist | W | W | – | W | – | (via daily snapshot) |

Critically, **only stages 9 and 10 are writers**. Every other stage
is read-only. This is enforced architecturally: writer credentials
are passed only to those two stages.

---

## 12. What memory does NOT remember

The Brain has explicit non-memory: things it deliberately forgets
or never stores.

- **PII in long-term cold storage**: aggregated only, never per-
  learner-identifiable beyond a salted hash.
- **Full LLM prompt/response pairs**: stored only when the response
  becomes an asset; transient otherwise. The cost-benefit doesn't
  justify keeping every Groq exchange.
- **Per-turn LLM input/output verbatim**: stored only via
  `observability` (which contains stage outputs but not full prompts).
- **Implicit signals from message content beyond what the persist
  stage explicitly extracts**. The Brain doesn't "remember" what the
  learner said via embedding-of-everything. It remembers what the
  pipeline decided to extract (intent classification, detected
  misconceptions, probe outcomes).

This explicit non-memory is what keeps the Brain auditable and
privacy-respecting.

---

## 13. Forgetting (intentional)

Three forgetting mechanisms.

### 13.1 Decay

Per-concept mastery decays exponentially (doc 5 § 5). A learner who
hasn't practiced a concept in 6 months is treated as `decayedScore =
masteryScore × 0.5`. Not deleted — the Brain still knows you
*learned* it; the Brain just acknowledges you may not *currently
know* it.

### 13.2 Misconception clearance

A repaired misconception's record stays in `StudentMemory.history`
but is removed from `StudentMemory.activeMisconceptions`. The Brain
no longer factors it into decisions but can resurface it if the
probe-pass that confirmed repair is contradicted later.

### 13.3 Account deletion

A learner deletes their account → cascading hard delete of all
`StudentMemory` rows + redaction of `userId` from all
`EvidenceEvent` rows (replaced with `'deleted-user-hash'`). The
events themselves are kept for aggregate Evidence Engine purposes;
they're just no longer attributable.

---

## 14. Anti-patterns explicitly rejected

- ❌ **One unified user-state object**. Six separate stores with
  clear ownership.
- ❌ **The chat route mutating mastery scores directly**. Only stage
  10 Persist writes Student Memory. Direct mutation from anywhere
  else is a bug to fix in code review.
- ❌ **Caching learned content in Student Memory**. Content lives in
  Knowledge Memory + Asset catalog; Student Memory remembers
  *pointers* and *outcomes*, never copies of content.
- ❌ **Storing arbitrary derived fields in Brain Memory**. If it can
  be derived from another store in real-time, it stays derived.
  BrainConfig holds *policies*, not *facts*.
- ❌ **A single "lesson context" blob carried turn-to-turn**. The
  current code does this via massive system-prompt synthesis;
  Phase 1's TurnContext makes the bag explicit and bounded.
- ❌ **Cross-store transactions for non-essential consistency**.
  Probe pass → mastery update is one transaction (essential). Probe
  pass → daily-snapshot is *not* (the snapshot is reconstructable).
  Strong consistency is reserved for cases where eventual would
  visibly break the learner experience.

---

## 15. Why this design is right for the next 5 years

The six-store split is the only architecture where every memory write
has exactly one owner, every memory read knows its source of truth,
and every consistency model is explicit. The current code's implicit
memory architecture (mastery sometimes from `TopicProgress`,
sometimes from `EvidenceRecord`, sometimes inferred from
`Message` history) is the source of the "session resumed in the
wrong place" / "mastery shown two different numbers on two screens"
bug class. Phase 1's split eliminates that class entirely.

The decisive property is **scale-by-store**, not scale-by-monolith.
Session Memory needs Redis; Student Memory needs Postgres with
read-replicas; Knowledge Memory fits in process memory; Teaching
Memory's hot path needs Redis; Long-term Memory needs cold object
storage. Six stores let each scale on its own axis. One unified
store would force every component onto the highest-throughput
substrate (Redis), losing transactional safety where it matters
(probe pass → mastery update).
