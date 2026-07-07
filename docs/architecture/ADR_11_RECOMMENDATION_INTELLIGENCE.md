# ADR 11 · Recommendation Intelligence

**Status:** Proposed (documentation only — implementation blocked on Canonical KG v1 freeze and explicit user approval)
**Date:** 2026-07-02
**Supersedes:** nothing — first ADR on recommendation architecture
**Superseded by:** —

---

## 1. Problem

The Educational Brain's nine live Recommendation engines (Engines 22–31) serve two structurally
distinct purposes that are not distinguished anywhere in the current codebase:

1. **Cross-session recommendations** — "what the student should do next across sessions" (displayed
   on the Dashboard; produced by `learningOrchestrator.ts` via an 8-priority chain returning ONE
   recommendation).
2. **In-session signal injection** — "what the tutor should know during this specific turn" (advisory
   text blocks injected into `systemPrompt` for the current chat turn; produced by `weakTopics.ts`,
   `learningNarrative.ts`, `dailyPlan.ts`, `examReadiness.ts`, independently, in sequence, with no
   reconciliation).

The failure mode of the current in-session path: the tutor's system prompt may contain simultaneously
"weak topic: arithmetic" (from `weakTopics.ts`) AND "longitudinal trend: RAPID_IMPROVEMENT on
arithmetic" (from `learningNarrative.ts`) with no mechanism to resolve the contradiction. The LLM
receives both signals at once and must determine which to weight more heavily — this is a *pedagogical
decision* left to a probabilistic text model rather than to the deterministic Educational Brain.

**The concrete failure class:** a student who has just dramatically improved at their weakest topic
is told by the tutor to "pay attention to your weak areas" because the Weak Topic engine still
flags the topic from three-week-old `MistakeRecord` rows — the Narrative engine's improvement
signal arrived in the same system prompt but the LLM chose the more conservative directive.

**Three additional gaps, confirmed by reading the live code:**

1. **Library Mode has no recommendation tier.** The School Mode path (route.ts:~304–780) calls
   five distinct engines that produce advisory signals for the tutor. The Library Mode path
   (route.ts:~964–1223) has only a `subjectAnalytics.weakTopics` string list injected at route.ts:1099
   — a pre-aggregated, non-personalized proxy, not the full recommendation cluster. Library learners
   receive materially weaker per-session tutor guidance.

2. **Recommendation engines are blind to evidence quality.** `weakTopics.ts` reads `MistakeRecord`
   (mistake count as a proxy for weakness), `examReadiness.ts` reads `PracticeSession` + `TopicProgress`
   (score as a proxy for readiness), `spacedRevision.ts` reads `TopicProgress.completedAt`
   (completion date as a proxy for forgetting). None of these engines read `EvidenceRecord`
   (the visual-mastery tracking evidence) or any quality signal about which teaching interventions
   actually worked for this student. The Evidence Engine (ADR 13) will produce exactly this signal —
   but there is currently no designed integration point for it in the Recommendation cluster.

3. **No session-level signal reconciliation model.** The `learningOrchestrator.ts` has a clear
   documented priority model (1–8, first match wins). The in-session injection path has no
   equivalent — all engines run, all signals are concatenated, none are suppressed based on
   conflicts with others.

---

## 2. Evidence

**Live callers of recommendation engines in `route.ts`:**

```
route.ts:416  getWeakTopicsForSubject()  → School Mode only
route.ts:612  getLearningNarrative()     → School Mode only
route.ts:629  getDailyStudyPlan()        → School Mode only
route.ts:781  getExamReadinessForSubject() → School Mode only
route.ts:1099 subjectAnalytics.weakTopics (pre-computed string array)  → Library Mode only
```

No call to any of these engines appears in the Library Mode branch (route.ts:~964–1223) except the
pre-aggregated `subjectAnalytics.weakTopics` at line 1099. The full `weakTopics.ts`,
`learningNarrative.ts`, `dailyPlan.ts`, `examReadiness.ts` engine calls are gated inside the School
Mode block (`if (schoolCtx)`).

**`learningOrchestrator.ts` architecture (confirmed by reading the file):**

- Priority 1: `failed_assessment` — latest chapter assessment failed, chapter incomplete
- Priority 2: `prerequisite_gap` — HIGH-confidence KG prerequisite missing (School only; `KG_BY_ID`
  coupling noted in ADR 02 §7 item 1)
- Priority 3: `spaced_revision_due` — overdue node from spaced revision engine
- Priority 4: `weak_topic` — severe weak topic (severity ≥ threshold)
- Priority 5: `exam_readiness_risk` — subject readiness < 40%
- Priority 6: `mock_test_weakness` — recent mock weak node not yet mastered
- Priority 7: `continue_chapter` — resume current chapter
- Priority 8: `start_next_chapter` — begin first chapter for a new subject

This is clean priority-chain logic. The problem is that this chain is used ONLY for the Dashboard
recommendation. The in-session signal injection path is a separate, unstructured concatenation.

**`learningNarrative.ts` classification (confirmed by reading the file):**
Five trends: `RAPID_IMPROVEMENT | STEADY_PROGRESS | RECOVERY_PHASE | PLATEAU | REGRESSION_RISK`.
"Earlier = days 8–30, recent = last 7 days" — longitudinal comparison, not single-session snapshot.
This is a *counter-signal* to weak topic flagging: if the narrative says `RAPID_IMPROVEMENT`, the
weak topic injection should be suppressed or reframed as "recently conquered challenge" rather than
"ongoing weakness."

**`weakTopics.ts` scoring (confirmed by reading the file):**
`severity = Σ (weight × recency_multiplier)` over 30-day `MistakeRecord` rows; excludes
`TopicProgress.MASTERED` nodes. Recency multiplier of 2.0 for ≤7 days, 1.5 for ≤14 days, 1.0
otherwise. No interaction with `learningNarrative.ts` — the two engines do not read each other.

**`studyPlan.ts` (confirmed by reading the file):**
Simple 4-step ordered list for the active chapter (Today/Next/Then/After). Not called from
`route.ts` — used only from chapter-page components. Not part of the in-session injection path.

**Bible §6.7 prior finding (confirmed):**
"Nine-engine Recommendation cluster, read-only over Mastery/Memory's conclusions, never
independently scoring mastery (Permanent Rule 7), never called by/calling the Teaching tier
(Permanent Rule 12). `learningOrchestrator.ts` is the confirmed primary 8-tier cross-engine
aggregator."

---

## 3. Alternative designs

### Design A — Status quo + Library Mode parity only

Port the four in-session engines (`weakTopics`, `learningNarrative`, `dailyPlan`, `examReadiness`)
to the Library Mode path using the same unconstrained concatenation. Does not solve the signal
conflict problem; copies it to Library Mode.

*Rejected*: harms Library learners in the same way School learners are currently harmed, and
doesn't address the fundamental architectural gap.

### Design B — Merge all recommendations into `learningOrchestrator.ts`

Extend the 8-priority chain to cover in-session signals too. A single chain now determines both
the dashboard recommendation AND the in-session prompt signals.

*Rejected*: cross-session planning and in-session tutor awareness are structurally different
products: the dashboard returns ONE choice; the in-session path must potentially surface multiple
mutually compatible signals (e.g., "student narrative is improving" AND "spaced revision due for
topic X" — both useful, not contradictory). Forcing a single-winner model onto in-session signals
discards useful compatible signals.

### Design C — Two-layer Recommendation Architecture (selected)

Preserve and formalize the distinction between cross-session and in-session tiers, but add a
**Session Recommendation Reconciler** layer to the in-session path:

**Layer 1 — Cross-Session Planner** (already exists as `learningOrchestrator.ts`):
- One recommendation per session, highest-priority signal wins.
- Already sound. Extend to Library Mode with a subject-only (no board/grade) variant.
- Remains School-Mode and Library-Mode aware; the priority-1 and priority-2 items (`failed_assessment`,
  `prerequisite_gap`) remain School-Mode-only as they require the chapter/curriculum structure.

**Layer 2 — Session Recommendation Reconciler** (new component, pure):
- Takes signals from all in-session engines as input.
- Applies a deterministic **signal priority table** to suppress or reframe conflicting signals.
- Emits a `SessionRecommendation` bundle (at most N signals, ranked, with a `suppressedBy` field
  for any signal suppressed due to a higher-priority conflict).
- Remains read-only, pure, deterministic — no new DB queries.

**Signal priority table (proposed, owned by `BrainConfig` per ADR 10):**

| Higher signal | Lower signal | Resolution |
|---|---|---|
| `RAPID_IMPROVEMENT` or `RECOVERY_PHASE` (narrative) | Any `weak_topic` signal for the same topic | Suppress weak_topic; emit narrative with "recently improving" frame |
| `RAPID_IMPROVEMENT` (narrative) | `failed_assessment` (cross-session) | Keep failed_assessment (evidence-based, objective); add "student is improving" qualifier to the reason string |
| `REGRESSION_RISK` (narrative) | `continue_chapter` (cross-session) | Upgrade cross-session to `weak_topic` type; reframe as "foundation consolidation needed" |
| Spaced revision due (Memory tier `dueForReview` list) | `weak_topic` for same node | Merge: emit ONE signal "overdue review + noted weakness" rather than two separate injections |

---

## 4. Selected design

**Design C — Two-layer Recommendation Architecture.**

### 4.1 Layer 1: Cross-Session Planner

The existing `learningOrchestrator.ts` priority chain is sound and is designated the canonical
cross-session planner. Two extensions:

**4.1a Library Mode variant** (`getTopLibraryRecommendation(userId, subjectSlug)`):
- Returns ONE `LibraryRecommendation` using a simplified priority chain:
  - Priority 1: `spaced_revision_due` — `dueForReview` list from Student Memory (ADR 10) is non-empty
  - Priority 2: `weak_concept` — a `WeakConcept` from `TeachingMemorySnapshot.weakConcepts` with
    `masteryPct < 40` (severe, not just below 70)
  - Priority 3: `in_progress_concept` — most recently active topic from `recentTopics`
  - Priority 4: `explore_next` — first unstarted concept in subject KG topological order
- No `failed_assessment` or `prerequisite_gap` (those require board/grade/chapter structure).
- Reads only the already-computed `TeachingMemorySnapshot` — zero additional DB queries.

**4.1b Bridge naming:** The School Mode function is renamed `getTopSchoolRecommendation()` in a
future implementation turn; `getTopRecommendation()` becomes a routing shim that calls the
correct variant based on `sessionMode`. No behavior change in School Mode.

### 4.2 Layer 2: Session Recommendation Reconciler

A new **pure function** (zero I/O):

```typescript
interface InSessionSignal {
  source: 'weak_topic' | 'narrative' | 'exam_readiness' | 'spaced_revision' | 'daily_plan'
  topicSlug?: string   // if topic-specific
  trend?: LearningTrend  // if from narrative engine
  priority: number        // lower = higher priority; 1 = must-show
  payload: string         // the text to inject if not suppressed
}

interface SessionRecommendation {
  signals: InSessionSignal[]          // at most MAX_SESSION_SIGNALS (BrainConfig)
  suppressedSignals: Array<{ signal: InSessionSignal; suppressedBy: InSessionSignal }>
  narrativeTrend: LearningTrend | null
  systemPromptBlock: string           // assembled, ready to inject
}

function reconcileSessionSignals(
  signals: InSessionSignal[],
  config: BrainConfig,
): SessionRecommendation
```

The function:
1. Extracts the `narrativeTrend` from any `narrative` signal.
2. Applies the signal priority table (§3 Design C above) deterministically.
3. Suppresses lower-priority conflicting signals, annotating each with `suppressedBy`.
4. Assembles the `systemPromptBlock` from the surviving signals in priority order.
5. Caps the total number of injected signals at `config.maxSessionSignals` (proposed default: 3 —
   a world-class teacher doesn't simultaneously raise 7 pedagogical concerns).

### 4.3 Signal capping rationale

Empirical observation from the current system: during a single chat turn in School Mode, the system
can inject signals from all four in-session engines (weak topic, narrative, daily plan, exam
readiness) plus the cross-session recommendation `buildPrimaryObjectiveBlock()`. This is five
distinct "what to worry about" directives. A world-class human teacher carries all this context
internally and surfaces ONE most-relevant signal at any given moment. The `maxSessionSignals = 3`
cap forces the Brain to be similarly selective, with the Reconciler making the pedagogical
prioritization decision rather than the LLM.

### 4.4 Library Mode in-session signals

Library Mode receives a simplified `SessionRecommendation` bundle from the Reconciler with at
most two signals:
- Signal 1: `spaced_revision` (from `TeachingMemorySnapshot.dueForReview`, if any)
- Signal 2: `weak_concept` (from `TeachingMemorySnapshot.weakConcepts`, top 1)

No `narrative`, `daily_plan`, or `exam_readiness` signals in Library Mode (insufficient structured
evidence for narrative; no exam schedule; no daily plan without board/grade context). This is a
deliberate constraint, not a gap — Library learners get two clean signals rather than four noisy ones.

### 4.5 Evidence Engine integration point (ADR 13 dependency)

When ADR 13 implements the Evidence Engine, the Session Recommendation Reconciler gains access to
an `assetEffectivenessSignal: Record<topicSlug, 'working' | 'not_working' | 'unknown'>` field
from the Evidence Engine's rolling window output. This signal gates whether a `weak_topic`
recommendation triggers an "alternative approach" directive instead of a "revisit" directive — if
the evidence says the current approach isn't working, the Brain recommends a *different* approach,
not more of the same. This integration point is designed in ADR 11 and implemented in ADR 13.

---

## 5. Trade-offs

**Complexity cost:** The Session Recommendation Reconciler is a new component that all in-session
engine calls must route through. This adds indirection. The benefit: the LLM receives one coherent
directive instead of several that may conflict — pedagogical decisions stay in the deterministic
engine, not the probabilistic renderer.

**Risk of over-suppression:** The signal priority table might suppress a signal that was actually
useful in a specific context. Mitigated by: (a) `suppressedSignals` in the output is visible in
debug logs; (b) the priority table itself is stored in `BrainConfig` (ADR 10 §4.5), so it can be
tuned without a code change.

**Library Mode simplification:** Library learners receive only two in-session signals. For subjects
where the learner has rich longitudinal data (many sessions), this may underserve them compared to
School Mode. Accepted for v1 — Library Mode expansion (adding narrative signals when sufficient
evidence exists) is a Phase 2 enhancement.

**`learningOrchestrator.ts` is School-only in practice (not Library-mode):** The 8-priority chain
depends on `getGradeSubjects(board, grade)` at line 60, `getSchoolChapters(board, slug, grade)` at
line 112, and `getSchoolProgressForSubjects(userId, board, grade, slugs)` at line 66. All three are
board/grade-coupled. A Library Mode variant must avoid these calls — hence the separate
`getTopLibraryRecommendation()` function (§4.1a).

---

## 6. Scalability

The Session Recommendation Reconciler is a pure function with zero I/O — it scales horizontally
with the chat-turn process, O(n) in the number of input signals (bounded by the number of engines
called, a small constant). No new DB queries.

`getTopLibraryRecommendation()` reads only the already-computed `TeachingMemorySnapshot` — zero
additional DB queries above what the current Library Mode path already performs.

The signal priority table is evaluated in a single pass through the input signals, O(n) —
negligible computation relative to the DB queries already performed.

---

## 7. AI independence impact

**Increases AI independence:** By reconciling signals before the LLM call, the Brain makes the
pedagogical prioritization decision deterministically rather than relying on the LLM to weight
competing signals. The `suppressedBy` field makes the decision auditable without an LLM.

A world-class tutor who "knows which of their observations to share right now" is closer to this
model: one coherent pedagogical intent, expressed cleanly to the LLM, which then renders it in
natural language. The LLM is the voice; the Reconciler is the judgment.

No new LLM calls introduced.

---

## 8. Backward compatibility

The Session Recommendation Reconciler is additive — all existing engines still run and produce
their output. The Reconciler sits between engine output and `systemPrompt +=`. During a transition
period, the Reconciler can be introduced with `maxSessionSignals = 99` (effectively no cap, all
signals pass through), allowing existing behavior as a baseline for any A/B measurement.

The `getTopLibraryRecommendation()` function is a net addition, not a change to any existing
School Mode call path. No caller of `getTopRecommendation()` is affected in the transition period.

---

## 9. Validation strategy

**Session Recommendation Reconciler (pure function):**
- Unit-test with fixed `InSessionSignal` arrays covering all conflict patterns in the priority table.
- Assert that: (a) a `RAPID_IMPROVEMENT` narrative always suppresses same-topic `weak_topic` signals;
  (b) `suppressedSignals` is never empty when a conflict would exist; (c) output signal count never
  exceeds `maxSessionSignals`.
- Property test: a Reconciler run with any valid input must always produce a `systemPromptBlock`
  of length > 0 when at least one unsuppressed signal exists.

**`getTopLibraryRecommendation()` (pure, reads computed snapshot):**
- Unit-test with a fixed `TeachingMemorySnapshot`; assert correct priority ordering.
- No LLM needed.

**Integration:**
- A test fixture replays a School Mode chat turn through the reconciliation path with
  conflicting signals and asserts the injected `systemPromptBlock` matches the expected
  deterministic output.

---

## 10. Migration strategy

**Phase 1 (no behavior change):** Add the `SessionRecommendation` type and `reconcileSessionSignals()`
function. Wire it into `route.ts` with `maxSessionSignals = 99` (no suppression). Log `suppressedSignals`
when non-empty so the signal conflict rate can be measured.

**Phase 2 (cap enforcement):** Lower `maxSessionSignals` to the `BrainConfig` value (proposed: 3).
Suppression logic activates. A/B measurement: tutor helpfulness signals (probe pass rate,
session length, re-ask rate) between capped and uncapped sessions.

**Phase 3 (Library Mode parity):** Add `getTopLibraryRecommendation()` and wire the two Library
Mode in-session signals through the same Reconciler. Remove the `subjectAnalytics.weakTopics`
string injection at route.ts:1099 (now superseded).

**Phase 4 (Evidence Engine hook):** After ADR 13 produces the `assetEffectivenessSignal`, add the
"alternative approach" gate to the Reconciler's signal priority table.

---

## 11. Relationship to previous ADRs

**ADR 02 (General Learner Diagnostic Layer):** ADR 02 proved that `teachingStrategy`,
`spacedRevision`, and `lessonPlanner` can run in Library Mode using the unused `board`/`grade`
parameter evidence pattern. ADR 11's Library Mode extension uses the same pattern for
`getTopLibraryRecommendation()` — the subject-only path avoids board/grade-coupled functions
entirely rather than passing unused params.

**ADR 04 (Next-Best-Action Retirement Proposal, permanently unexecuted):** `getChapterNextStep()`
(the one live export of `nextBestAction.ts`) is a per-chapter, per-page utility — it is NOT part
of the cross-session or in-session recommendation tiers. It remains untouched by ADR 11.

**ADR 07 (Mastery Intelligence):** The `getTopLibraryRecommendation()` priority 2 uses
`TeachingMemorySnapshot.weakConcepts` (severity-ranked, sourced from the Student Memory Engine)
— this is consistent with ADR 07's designation of `MasteryLevel` as canonical and the Student
Memory Engine as the single aggregation/projection source.

**ADR 08 (Teaching Action Intelligence):** Confirms that Recommendation and Teaching tiers must
NOT cross-call (Permanent Rule 12). The Session Recommendation Reconciler is in the
Recommendation tier and only adds to `systemPrompt` — it never calls `decide()` or modifies
the `TeachingDecision`. The reconciled signal bundle arrives at `route.ts` as a `systemPrompt +=`
block after the Teaching Action chain has already run, preserving the dependency direction.

**ADR 10 (Student Memory Architecture):** The `BrainConfig` store (ADR 10 §4.5) owns
`maxSessionSignals` and the signal priority table. The `getTopLibraryRecommendation()` function
reads the already-computed `TeachingMemorySnapshot` (ADR 10 §2a Session Memory + §2b Student
Memory read path) — zero new DB queries. `TeachingMemorySnapshot.dueForReview` (ADR 10 §2a)
directly feeds Library Mode Priority 1 signal.

---

## 12. Relationship to the Canonical Knowledge Graph

`getTopLibraryRecommendation()` Priority 4 (`explore_next`) requires the ability to find the
first unstarted concept in subject KG topological order. This uses `ConceptNode.requires[]`
(prerequisites field, already consumed by the Generic Subject Adapter). No new KG fields are
required. Priority 4 is a fallback (all other priorities failed) — it fires only when the student
has no retention history for the subject, which is the new-user case.

---

## 13. Relationship to the Teaching Engine

The Session Recommendation Reconciler sits DOWNSTREAM of the Teaching Engine's full chain
(`decide()` → TAG → Lesson Composer). The reconciled signals are injected into the system prompt
after the Teaching Action block, as advisory context, never as decision overrides (Permanent Rule
12). The Teaching Engine's `TeachingDecision` output is never read by the Reconciler.

The Cross-Session Planner (`learningOrchestrator.ts`) runs in parallel with the Teaching chain
(fired from `route.ts` as a non-blocking recommendation lookup) — it does not gate or modify the
Teaching Engine's output. This parallel-path architecture already exists in School Mode; ADR 11
makes it explicit and extends it to Library Mode.

---

## 14. Future implementation plan

When implementation is approved (after Canonical KG v1 freeze):

1. **`src/lib/school/adaptive/sessionRecommendationReconciler.ts`** — new file implementing the
   `reconcileSessionSignals()` pure function, the `InSessionSignal` type, the `SessionRecommendation`
   type, and the signal priority table (read from `BrainConfig`).
2. **`src/lib/school/adaptive/learningOrchestrator.ts`** — add `getTopLibraryRecommendation()`
   function (subject-only, reads `TeachingMemorySnapshot`); rename existing function to
   `getTopSchoolRecommendation()` with backward-compat shim.
3. **`src/app/api/learn/chat/route.ts`** — route the four in-session engine outputs through
   `reconcileSessionSignals()` before `systemPrompt +=`; wire `getTopLibraryRecommendation()`
   into Library Mode path; remove the pre-aggregated `subjectAnalytics.weakTopics` injection.
4. **`BrainConfig` update** (ADR 10 Phase 1) — add `maxSessionSignals` (default: 3) and
   `sessionSignalPriorityTable` fields.
5. **Add `Finding 11`** to `ARCHITECTURE_DECISIONS.md` (Recommendation Intelligence gap — School
   Mode signal conflicts and Library Mode recommendation absence).

How does this make the Educational Brain think and teach more like a world-class human teacher?
A world-class teacher doesn't simultaneously tell a student "you struggle with algebra" and "you're
improving fast at algebra" — they reconcile those signals internally and produce one coherent message.
The Session Recommendation Reconciler moves that reconciliation into the deterministic Brain, where
it belongs.
