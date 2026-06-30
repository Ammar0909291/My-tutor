# Educational Brain — Consolidation Decision (Architecture Decision Record 01)

> Author: Chief Educational Brain Architect (Claude session)
> Date: 2026-06-30
> Status: **DECIDED, CORRECTED** — see §0. Governs Educational Brain work
> not already covered by `docs/architecture/EDUCATIONAL_BRAIN_V1.md` (the
> authoritative architecture freeze for the canonical pipeline itself).
> Scope: orchestration/decision-layer architecture only. No curriculum,
> concept, KG, or teaching-content changes are made or proposed here.

---

## 0. Correction notice (read first)

This ADR was originally drafted against a stale local checkout. While
writing it, a **concurrent session** pushed a comprehensive architecture
freeze — `docs/architecture/{EDUCATIONAL_BRAIN_V1,ENGINE_REFERENCE,
DATA_FLOW,DEPENDENCY_RULES,EXTENSION_GUIDE,ARCHITECTURE_DECISIONS}.md`
(commit `6b8e4e0`) — plus several feature commits that wire
`src/lib/teaching-engine/index.ts` (`decide()`), the Teaching Action
Generator, and the Dynamic Lesson Composer into the live chat route. That
freeze is **more current and more thorough** than this document for the
question "what is the live teaching-decision system." After merging that
work in, two claims below were corrected before this document was
committed:

1. **`src/lib/teaching-engine/index.ts` (`decide()`) is LIVE**, not
   orphaned. The original draft of this document lumped it in with the
   genuinely-orphaned `src/lib/curriculum/teachingActionEngine.ts` because
   the two have confusingly similar names and purposes. They are
   different files. `decide()` is statically imported into
   `src/app/api/learn/chat/route.ts:20` and is the frozen core of the
   canonical pipeline per `docs/architecture/EDUCATIONAL_BRAIN_V1.md`.
   Only `src/lib/curriculum/teachingActionEngine.ts` (+ its
   `teachingAssetAdapter.ts`/`teachingAssets.ts`/schema companions) is
   orphaned — confirmed independently by this document's own grep
   evidence (§1.4) and by the freeze's own `ARCHITECTURE_DECISIONS.md`
   Finding 2. Two independent sessions reaching the same conclusion about
   the same file is good corroboration, not a coincidence to discard.
2. **The general-learner gap is real but narrower than first stated.**
   The original draft claimed general learners get "none of the adaptive
   intelligence." Per the freeze's `DATA_FLOW.md` (items 35–48), the
   canonical pipeline's core — KG context, learner intelligence profile,
   Student Memory snapshot, Teaching Engine `decide()`, Teaching Action
   Generator, Dynamic Lesson Composer, and a non-school misconception-engine
   path — runs for **every** session, school or general/Library. What is
   genuinely school-only is the larger `school/adaptive/*` diagnostic and
   strategy-synthesis cluster (mastery level, momentum, confidence
   calibration, the 7-type synthesized teaching strategy, spaced revision,
   prerequisite recovery, exam readiness, next-best-action, learning
   narrative, daily plan, chapter-scoped lesson planner, assessment
   intelligence) — all inside the single `if (schoolCtx)` gate at
   `route.ts:294–838`. §4 below is corrected accordingly.

This document's remaining, surviving contributions — not already covered
by the freeze — are: (a) the explicit "two unrelated decision systems
were each built without checking for the other" governance failure mode
and a governance rule to prevent a third recurrence, (b) the Eb* spec's
genuinely valuable but un-extracted design ideas (the freeze documents
Eb*'s status but does not mine its spec for ideas), and (c) the corrected,
narrower general-learner diagnostic-cluster gap as the next queued
increment. Where this document and the freeze cover the same ground, the
freeze is the source of truth — **read `docs/architecture/EDUCATIONAL_BRAIN_V1.md`
first.**

---

## 1. The Evidence

### 1.1 Two genuinely orphaned/dormant systems (corrected)

| System | Files | First commit | Wired into a live route? | Lines |
|---|---|---|---|---|
| **Eb* pipeline** | `src/lib/educationalBrain/*` (7 files) + 21 `Eb*` Prisma models + 11 spec docs under `docs/educational-brain/` | 2026-06-28 | **No** — fire-and-forget at `route.ts` (post-response), result discarded, gated by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE` (default off). Confirmed independently by `docs/architecture/ARCHITECTURE_DECISIONS.md` Part 2 ("Two pipelines, by design"). | 480 |
| **`teachingActionEngine.ts` + Teaching Assets Platform** | `src/lib/curriculum/teachingActionEngine.ts`, `teachingActionSchema.ts`, `teachingAssets.ts`, `teachingAssetAdapter.ts`, `teachingAssetSchema.ts` | 2026-06-29 (my own prior commits, `d446b45`/`78ad2c1`) | **No** — zero importers anywhere in `src/app/`, `src/components/`, or any other live module. Confirmed independently by `docs/architecture/ARCHITECTURE_DECISIONS.md` Finding 2. **Not the same file as** `src/lib/teaching-engine/index.ts`, which IS live (see §0). | ~1,500+ |

Both were built without first checking for prior art against the live
system, and in my own case, without checking the Eb* pipeline either —
the exact failure mode §2 generalizes.

### 1.2 What's live — defer to the freeze, narrow correction only

`docs/architecture/EDUCATIONAL_BRAIN_V1.md` + `DATA_FLOW.md` are
authoritative for the full live pipeline trace. The one fact worth
restating here because it drives §4: per `DATA_FLOW.md` items 35–48, the
canonical pipeline core (KG context, learner intelligence profile,
Student Memory, `decide()`, Teaching Action Generator, Lesson Composer,
non-school misconception path) runs for **every** chat turn regardless of
`schoolCtx`. The `school/adaptive/*` diagnostic/strategy cluster
(mastery level, misconception confidence beyond the basic non-school
check, momentum, calibration, synthesized teaching strategy, spaced
revision, prerequisite recovery, exam readiness, next-best-action,
learning narrative, daily plan, chapter-scoped lesson planner, assessment
intelligence) is the part still gated behind `if (schoolCtx)`
(`route.ts:294–838`) and does not run for general/Library learners. See
§4.

A stale doc claim worth correcting here too: `docs/ARCHITECTURE_REFERENCE.md`
states `SCHOOL_MODE_ENABLED=false` gates the chapter workspace off. That
flag (`src/lib/education/index.ts:4`) is in fact **not read anywhere**
that controls routing — `src/app/dashboard/page.tsx:43` and
`src/app/learn/page.tsx` route by `profile.userType === 'SCHOOL_STUDENT'`
directly. School Mode is live today for school-student accounts. The
flag is vestigial.

### 1.3 The canonical Knowledge Graph is live (uncontested, both audits agree)

The canonical KG platform (`docs/{subject}/kg/graph.json`, 1,497 concepts
across math/physics/chemistry/CS/biology) is live via
`src/lib/curriculum/knowledgeGraph.ts` → `subjectKgAdapter.ts`, consumed
by `buildKnowledgeGraphContext()` for every session. This is confirmed by
both this document's own grep evidence and `docs/architecture/EDUCATIONAL_BRAIN_V1.md`
§4 (Engine inventory, "Knowledge" tier).

### 1.4 Eb* model usage (detail, for anyone tempted to revive it)

Of the 21 `Eb*` Prisma models, only 4 are touched by any non-seed
application code (`EbConcept`, `EbConceptEdge`, `EbAssetIdentity` —
read-only; `EbEvidenceEvent` — write-only, never read back). 13 of 21
(62%) — including `EbExplanation`, `EbVisual`, `EbProbe`, `EbAssetScore`,
`EbBrainConfig` — have **zero references anywhere** outside their own
schema declaration. No asset content has ever been created or served by
this system. The 11-document spec under `docs/educational-brain/`
describes an 11-stage pipeline; only stages 0, 1, 2, a partial 5, and a
partial 10 have any code, and the implemented Composition stage never
actually selects or serves asset content — it only summarizes concept
counts. The spec's own Milestone 1 success criterion ("a real physics
question served end-to-end via a retrieved asset") is not met by the
current code. This is not a criticism of the spec's thinking — docs
01–11 are a careful, principled design (see §5) — it is a statement of
fact about what got built versus what shipped.

---

## 2. Why this happened (root cause)

1. **No single discoverable source of truth existed before this freeze.**
   `docs/EDUCATIONAL_BRAIN_AUDIT.md` (1,124 lines, dated 2026-06-28, the
   most recent prior audit before the freeze) does not mention
   `school/adaptive/` at all, despite it being a mature, actively-committed
   live system at the time of writing. `docs/architecture/EDUCATIONAL_BRAIN_V1.md`
   (committed the same day as this document) now closes this gap and
   should be treated as solved going forward — see the validation rule in
   §6.
2. **Single-day spec-to-shadow-code drops invite the next single-day
   drop, and I made this mistake too.** The Eb* pipeline and my own
   Teaching Action Engine stack were each built and reported as
   "production" within one calendar day, without first grepping for
   `decide(`, `TeachingStrategy`, or `nextBestAction` against the existing
   codebase. I then repeated a milder version of the same error while
   writing the first draft of this very document — conflating a live file
   with a similarly-named orphaned one, because I was working from a
   checkout that had already fallen behind a concurrent session's commits.
   The fix that generalizes from both: **before declaring something
   orphaned or live, re-fetch and re-grep against the current remote
   tip, not a checkout that may be hours stale.**
3. **Architecture docs drift from code faster than they're corrected** —
   the `SCHOOL_MODE_ENABLED` example in §1.2 is an independent instance of
   the same root cause.

---

## 3. The Decision

The **canonical pipeline documented in `docs/architecture/EDUCATIONAL_BRAIN_V1.md`**
(KG → Student Memory → Teaching Engine `decide()` → Teaching Action
Generator → Dynamic Lesson Composer, plus the `school/adaptive/*`
diagnostic/strategy/recommendation cluster for school sessions) is the
Brain of Record — the one production teaching-decision system. This ADR
does not introduce a second name or a second framing for it; it adopts
the freeze's framing and terminology going forward.

Governance rule, effective immediately for this role and any future
session working on Educational Brain architecture:

> Before starting any new "decide what to teach / what strategy / what
> mastery state" system, you MUST (a) re-fetch the remote tip of the
> working branch, (b) read `docs/architecture/EDUCATIONAL_BRAIN_V1.md` and
> grep `src/lib/teaching-engine/`, `src/lib/school/adaptive/`, and
> `src/app/api/learn/chat/route.ts`, and (c) explain in the proposal why
> extending the canonical pipeline in place is insufficient. A new
> parallel pipeline is not an acceptable answer to "the existing one
> feels architecturally rough" — refactor the live system instead.

### Why needed
Two competing dormant implementations built within two days of each other
(Eb*, then my own) is an accelerating pattern. A third nearly happened
inside this very document, via stale-checkout conflation rather than a
deliberate new pipeline — which is its own argument for rule (a) above.

### Benefits
- Single place to extend = compounding improvements instead of scattered
  partial ones (the staleMate/strategy-rotation logic already in
  `teachingStrategy.ts:144–211` is a real, working evidence-feedback
  mechanism — exactly what the Eb* Evidence Engine spec was trying to
  build from scratch).
- Removes the discovery cost that produced this ADR for every future
  session, on top of what the freeze already removes.
- Zero migration risk — the declaration changes no code path.

### Risks
- Declaring a "winner" might discard good ideas from the dormant systems.
  Mitigated in §5 (ideas backlog, not deletion).
- The canonical pipeline's own known complexity (≈30+ sequential
  `await import()` calls inline in a 1,600+-line route file,
  string-concatenated prompt blocks rather than structured output) is
  real and already disclosed honestly in the freeze's six findings — not
  re-litigated here.

### Backward compatibility
Total — no behavior change. This document is pure documentation plus two
header-comment additions to dormant files, corrected to be accurate after
the merge in §0, which do not affect any code path that executes.

### Validation strategy
Re-run the grep evidence in §1 after any future PR touching these
systems, **against a freshly fetched remote tip** (see §2 point 2); if a
new file under `src/lib/` independently re-implements mastery level,
misconception confidence, or teaching strategy selection, that is itself
the signal this ADR was violated.

---

## 4. The real gap (corrected, narrower — CLOSED for its portable half by ADR 02)

Per the corrected §1.2: general/Library learners already receive the
canonical pipeline's core (KG position, learner intelligence profile,
Student Memory snapshot, Teaching Engine `decide()`, Teaching Action
Generator, Lesson Composer, a non-school misconception check). What they
used to not receive is the `school/adaptive/*` diagnostic/strategy
cluster: explicit mastery level (`TRUE_MASTERY`/`FALSE_MASTERY`/
`AT_RISK`/`DEVELOPING`), confidence calibration, learning momentum, the
single synthesized 7-type teaching strategy
(`teachingStrategy.ts`/`determineStrategy()`), spaced revision,
prerequisite recovery, exam readiness, next-best-action, learning
narrative, and daily plan — all gated behind the single
`if (schoolCtx)` block at `route.ts:294–838`.

**`docs/architecture/ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md`
(2026-06-30, implemented) closed the portable half of this gap.** Reading
every function body (not just signatures) in the mastery → misconception →
transfer → confidence → momentum → stalemate → synthesized-strategy chain
showed `board`/`grade` are unused plumbing throughout — the whole chain is
keyed on `userId + subjectSlug + chapterId + kgNodeIds`. ADR 02 wired the
synthesized `getTeachingStrategy()` block plus spaced revision into the
Library branch of `route.ts`, substituting the current module's slug for
`chapterId` and its node slugs for `kgNodeIds` — the same substitution
pattern the pre-existing misconception-engine Library wiring already used.
`nextBestAction`/`dailyPlan`/`examReadiness` remain genuinely school-only
(they walk a board/grade syllabus tree with no Library equivalent) — see
ADR 02 §2 for the evidence split. `prerequisiteRecovery`/`lessonPlanner`
remain unwired pending a `KnowledgeNode[]` shape reconciliation (ADR 02 §7
follow-up #1) — the smaller, still-open residue of this gap.

---

## 5. What happens to the two dormant systems

**Archived in place, not deleted.** Both contain real design value (the
Eb* spec's Evidence Engine ranking model and Knowledge Asset versioning
model in particular are more rigorous than anything in the live system).
Header comments added (this iteration, corrected per §0) to make status
undeniable to the next reader:

- `src/lib/educationalBrain/pipeline.ts` — archived-shadow status comment,
  corrected to cross-reference the freeze's `ARCHITECTURE_DECISIONS.md`
  Part 2; env flag left as-is (default off); code untouched otherwise.
- `src/lib/curriculum/teachingActionEngine.ts` — archived-orphan status
  comment, corrected to explicitly disambiguate from the live
  `src/lib/teaching-engine/index.ts` and cross-reference the freeze's
  Finding 2; code untouched otherwise.

**Ideas backlog extracted for future, evidence-gated proposals** (not
approved for implementation by this ADR — each would need its own
why/benefit/risk writeup; the freeze does not cover this ground, so it
survives as this document's distinct contribution):
1. Evidence-weighted asset ranking (Eb* doc 04) — the live system's
   staleMate detection is single-signal (repeat-strategy-no-progress); a
   proper Beta-binomial confidence-weighted score per teaching strategy,
   stratified by grade/language, would be a genuine upgrade, additive to
   `teachingStrategyEvent`.
2. Structured `TurnContext` output instead of string-concatenated prompt
   blocks (Eb* doc 03) — would make the canonical pipeline's stages
   independently testable without a live LLM, addressing a weakness the
   freeze's own findings already disclose, without replacing the pipeline.
3. AI Dependency Index tracking (Eb* doc 06, doc 09) — the AI Router
   regenerating the explanation body every turn is a real, quantified
   cost and quality risk; the metric concept is sound even though the
   original doc's solution (full asset-retrieval rewrite) is the wrong
   path forward given §1.4's evidence.

---

## 6. Implementation roadmap (this ADR's own actions)

1. ✅ Evidence-gathering (this document, §1) — corrected in §0 after
   merging a concurrent session's freeze.
2. ✅ Add archive-status header comments to the two genuinely dormant
   systems (corrected per §0).
3. ✅ Update `CLAUDE.md` with the canonical-pipeline pointer, deferring to
   `docs/architecture/EDUCATIONAL_BRAIN_V1.md`, and the governance rule
   from §3.
4. ✅ Designed and implemented the general-learner diagnostic-cluster wiring
   from §4 as its own ADR with its own why/benefit/risk/rollout — see
   `docs/architecture/ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md`. Portable
   half (synthesized teaching strategy + spaced revision) shipped; the
   board/grade-coupled half (`nextBestAction`/`dailyPlan`/`examReadiness`)
   correctly stays school-only; `prerequisiteRecovery`/`lessonPlanner`
   queued as ADR 02's own follow-up #1.

---

## 7. Appendix — file map (corrected)

```
LIVE — canonical pipeline (authoritative: docs/architecture/EDUCATIONAL_BRAIN_V1.md)
  src/lib/teaching-engine/{index,types}.ts        decide() — frozen core, runs for every session
  src/lib/school/adaptive/teachingActionGenerator.ts   TAG — runs for every session
  src/lib/school/adaptive/lessonComposer.ts            Dynamic Lesson Composer — runs for every session
  src/lib/memory/                                  Student Memory Engine — runs for every session
  src/lib/school/adaptive/                         18 modules; diagnostic/strategy/recommendation
                                                    cluster — school sessions only (route.ts:294-838)
  src/app/api/learn/chat/route.ts                  wiring site (see DATA_FLOW.md for full 65-step trace)
  src/lib/curriculum/knowledgeGraph.ts              canonical + legacy KG bridge (live, every session)
  src/lib/curriculum/subjectKgAdapter.ts             canonical graph.json loader (live)

ARCHIVED — Eb* pipeline (shadow, gated off, never affects response)
  src/lib/educationalBrain/                         7 files, 480 lines
  prisma/schema.prisma                              21 Eb* models, 13 with zero runtime usage
  docs/educational-brain/README.md + 01-11          spec docs (ideas backlog, see §5)
  src/app/api/learn/chat/route.ts                   fire-and-forget invocation site (post-response)

ARCHIVED — teachingActionEngine.ts + Teaching Assets Platform (orphaned, zero importers)
  src/lib/curriculum/teachingActionEngine.ts        decideAction() — NOT the same as teaching-engine/decide()
  src/lib/curriculum/teachingActionSchema.ts
  src/lib/curriculum/teachingAssets.ts
  src/lib/curriculum/teachingAssetAdapter.ts
  src/lib/curriculum/teachingAssetSchema.ts
```
