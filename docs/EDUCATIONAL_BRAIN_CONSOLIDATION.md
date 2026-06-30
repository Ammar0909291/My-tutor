# Educational Brain — Consolidation Decision (Architecture Decision Record 01)

> Author: Chief Educational Brain Architect (Claude session)
> Date: 2026-06-30
> Status: **DECIDED** — governs all subsequent Educational Brain work
> Scope: orchestration/decision-layer architecture only. No curriculum,
> concept, KG, or teaching-content changes are made or proposed here.

---

## TL;DR

This codebase contains **three independent implementations** of "decide what
to teach this student right now" — built 17 days apart by three different
sessions, none aware of the other two. Only the **oldest** one is actually
wired into what students see. The two newer ones (one of them mine, built
yesterday) are fully functional in isolation but **never execute against
live traffic** — they are orphaned/shadow code.

**Decision:** `src/lib/school/adaptive/*` (wired into
`src/app/api/learn/chat/route.ts`) is declared the **Brain of Record** — the
one production teaching-decision engine. The other two are archived in
place (not deleted) with explicit status headers. No new parallel decision
pipeline may be started without amending this ADR.

This required zero code behavior changes. It is a documentation and
governance decision, validated entirely by reading code and git history —
no curriculum, concept, or teaching-content file was touched.

---

## 1. The Evidence

### 1.1 Three systems, same job, three different days

| System | Files | First commit | Last commit | Wired into a live route? | Lines |
|---|---|---|---|---|---|
| **`school/adaptive/*`** (Brain of Record) | 18 modules under `src/lib/school/adaptive/` | 2026-06-12 (`7bafd57`) | 2026-06-29 (`f21b3ff`) | **Yes** — `src/app/api/learn/chat/route.ts:293-922`, synchronous, result shapes the actual system prompt sent to the AI | ~3,000+ |
| **Eb* pipeline** | `src/lib/educationalBrain/*` (7 files) + 21 `Eb*` Prisma models + 11 spec docs under `docs/educational-brain/` | 2026-06-28 | 2026-06-28 (same day, 5 commits) | **No** — invoked fire-and-forget at `route.ts:1515-1517` (`void import(...).then(...).catch(()=>{})`), result discarded, gated by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE` (default off) | 480 |
| **Canonical-KG Teaching Engine stack** | `src/lib/teaching-engine/`, `src/lib/curriculum/teachingActionEngine.ts`, `teachingAssetAdapter.ts`, `teachingAssets.ts` | 2026-06-29 | 2026-06-29 (same day) | **No** — zero importers anywhere in `src/app/`, `src/components/`, or any other live module (confirmed by grep; only test/validation scripts reference it) | ~1,500+ |

All three solve the same problem: given a student's mastery state,
misconceptions, and position in a knowledge graph, decide what teaching
strategy/action to take next. All three were built without knowledge of
the other two — there is no comment, doc reference, or commit message in
any of the three that mentions either of the other systems.

### 1.2 What's actually live, precisely

`src/app/api/learn/chat/route.ts` (1,548 lines, the single live AI-tutor
endpoint) branches on `schoolCtx` (set when the session carries a school
chapter id **and** `profile.userType === 'SCHOOL_STUDENT'`, `route.ts:80-104`):

- **School students** (`schoolCtx` truthy): the full Brain of Record runs —
  `masteryIntelligence`, `misconceptionEngine`, `conceptTransfer`,
  `confidenceCalibration`, `learningMomentum`, `teachingStrategy`
  (synthesizes the prior five into ONE of 7 strategies, deterministic
  priority order, no LLM), `spacedRevision`, `prerequisiteRecovery`,
  `examReadiness`, `nextBestAction`, `learningNarrative`, `dailyPlan`,
  `lessonPlanner` — each contributes a text block to `systemPrompt` that
  the AI tutor actually receives (`route.ts:408-922`).
- **General learners** (`schoolCtx` null — the majority of users, since
  general learning is the primary product surface): receive only
  `buildKnowledgeGraphContext()` — a prerequisite-position summary from the
  canonical/legacy KG bridge. None of the adaptive intelligence modules run
  for them. **This asymmetry is real and is the most actionable finding in
  this document — see §4.**

A stale doc claim worth correcting here: `docs/ARCHITECTURE_REFERENCE.md`
states `SCHOOL_MODE_ENABLED=false` gates the chapter workspace off. That
flag (`src/lib/education/index.ts:4`) is in fact **not read anywhere** that
controls routing — `src/app/dashboard/page.tsx:43` and `src/app/learn/page.tsx`
route by `profile.userType === 'SCHOOL_STUDENT'` directly. School Mode is
live today for school-student accounts. The flag is vestigial.

### 1.3 The canonical Knowledge Graph **is** live (correction to an earlier assumption)

It would be easy to conclude from finding the Teaching Engine stack
orphaned that the canonical KG platform (`docs/{subject}/kg/graph.json`,
908+194+187+119+89 = 1,497 concepts across math/physics/chemistry/CS/biology)
is also disconnected. **It is not.** `src/lib/curriculum/knowledgeGraph.ts`
is a bridge layer that wraps `subjectKgAdapter.ts` (`createSubjectAdapter()`)
and is the actual function called by `buildKnowledgeGraphContext()` —
which both the general-learner path and the school-student path use. The
curriculum pipeline's KG output reaches students today. What's redundant
is specifically the **decision/orchestration layer** built on top of it
(Teaching Engine `decide()`, Teaching Action Engine `decideAction()`,
Teaching Assets), not the KG data itself.

### 1.4 Eb* model usage (detail, for anyone tempted to revive it)

Of the 21 `Eb*` Prisma models, only 4 are touched by any non-seed
application code (`EbConcept`, `EbConceptEdge`, `EbAssetIdentity` —
read-only; `EbEvidenceEvent` — write-only, never read back). 13 of 21
(62%) — including `EbExplanation`, `EbVisual`, `EbProbe`, `EbAssetScore`,
`EbBrainConfig` — have **zero references anywhere** outside their own
schema declaration. No asset content has ever been created or served by
this system. The 11-document spec under `docs/educational-brain/` describes
an 11-stage pipeline (Frame→Intent→Retrieval→Memory→Strategy→Composition→
Generation→Visual→Probe→Narration→Checkpoint→Persist); only stages 0, 1, 2,
a partial 5, and a partial 10 have any code, and the implemented
Composition stage never actually selects or serves asset content — it only
summarizes concept counts. The spec's own Milestone 1 success criterion
("a real physics question served end-to-end via a retrieved asset") is not
met by the current code.

This is not a criticism of the spec's thinking — docs 01-11 are a careful,
principled design (see §5). It is a statement of fact about what got built
versus what shipped.

---

## 2. Why this happened (root cause)

1. **No single discoverable source of truth.** Nothing in the repo says
   "the live teaching-decision engine is `school/adaptive/*`." It isn't
   named "Educational Brain," "Teaching Engine," or anything a session
   searching for prior art would naturally find. `docs/EDUCATIONAL_BRAIN_AUDIT.md`
   — the most recent, most comprehensive audit (1,124 lines, dated
   2026-06-28) — **does not mention `school/adaptive/` at all**, despite it
   being a mature, 17-day, 18-module, actively-committed system at the time
   of writing. The audit's own engine inventory (§6, engines A–O) has no
   entry for it.
2. **Single-day spec-to-shadow-code drops invite the next single-day drop.**
   Both the Eb* pipeline and my own Teaching Engine stack were built,
   tested, and reported as "production reports" within one calendar day,
   each without first grepping for `decide(` or `TeachingStrategy` or
   `nextBestAction` against the existing codebase. A multi-week spec
   document (`docs/educational-brain/`) makes a system look authoritative
   and "the" design, which discourages the next builder from checking
   whether something already ships.
3. **Architecture docs drift from code faster than they're corrected** —
   the `SCHOOL_MODE_ENABLED` example in §1.2 is a second, independent
   instance of the same root cause: a stale claim in a reference doc sent
   a future reader (me, twice) down the wrong path until directly verified
   against route code.

The fix for (1) and (3) is the same: one declared Brain of Record, kept
in sync with code via the validation rule in §6, with archived alternatives
labeled in-place rather than left to be rediscovered by accident.

---

## 3. The Decision

**`src/lib/school/adaptive/*`, as wired into `src/app/api/learn/chat/route.ts`,
is the Brain of Record** — the one production teaching-decision system.

Governance rule, effective immediately for this role and any future
session working on Educational Brain architecture:

> Before starting any new "decide what to teach / what strategy / what
> mastery state" system, you MUST grep `src/lib/school/adaptive/` and
> `src/app/api/learn/chat/route.ts` first and explain in the proposal why
> extending the Brain of Record in place is insufficient. A new parallel
> pipeline is not an acceptable answer to "the existing one feels
> architecturally rough" — refactor the live system instead (see §6).

### Why needed
Three competing implementations in 17 days is an accelerating pattern, not
a one-off. Without a declared Brain of Record, the most likely next event
is a fourth rewrite — this time by me, since I hold the "Chief Architect"
mandate and could easily have proposed "Educational Brain v2" as today's
deliverable without this audit.

### Benefits
- Single place to extend = compounding improvements instead of scattered
  partial ones (the staleMate/strategy-rotation logic already in
  `teachingStrategy.ts:144-211` is a real, working evidence-feedback
  mechanism — exactly what the Eb* Evidence Engine spec was trying to
  build from scratch).
- Removes the discovery cost that produced this ADR in the first place for
  every future session.
- Zero migration risk — the declaration changes no code path.

### Risks
- Declaring a "winner" might discard good ideas from the other two systems.
  Mitigated in §5 (ideas backlog, not deletion).
- `school/adaptive/*`'s known weaknesses (≈30 sequential `await import()`
  calls inline in a 1,548-line route file, string-concatenated prompt
  blocks rather than structured output) are real and should not be read as
  "this is fine forever" — see §6 for the in-place refactor path.

### Backward compatibility
Total — no behavior change. This section of the ADR is pure documentation
plus two header-comment additions to dormant files (§5), which do not
affect any code path that executes.

### Validation strategy
Re-run the grep evidence in §1 after any future PR touching these systems;
if a new file under `src/lib/` independently re-implements mastery level,
misconception confidence, or teaching strategy selection, that is itself
the signal this ADR was violated.

---

## 4. The real gap this audit found (queued for next iteration, not solved today)

The asymmetry in §1.2 is the most valuable actionable finding: **general
learners — the larger, primary user segment — get none of the adaptive
intelligence that school students get.** They receive a static KG-position
string and nothing about their mastery level, misconceptions, momentum, or
an explicit teaching strategy. The Brain of Record exists; it is simply
not invoked for most of the product's users.

This is *not* a new-system problem — it is "wire the existing Brain of
Record to a second context (general learning) it wasn't originally built
for." `school/adaptive/*`'s functions already take `subjectSlug` +
`kgNodeIds` as generic parameters; the school-specific parts are mainly
`board`/`grade`/`chapterId` plumbing, not the decision logic itself. This
is the highest-value next architectural increment and is queued as the
next item in this loop (see CLAUDE.md update), deliberately not attempted
in the same iteration as this consolidation decision, so each change can
be validated independently.

---

## 5. What happens to the other two systems

**Archived in place, not deleted.** Both contain real design value (the
Eb* spec's Evidence Engine ranking model and Knowledge Asset versioning
model in particular are more rigorous than anything in the live system).
Header comments added (this iteration) to make status undeniable to the
next reader:

- `src/lib/educationalBrain/pipeline.ts` — archived-shadow status comment
  added; env flag left as-is (default off); code untouched otherwise.
- `src/lib/curriculum/teachingActionEngine.ts` — archived-orphan status
  comment added; code untouched otherwise.

**Ideas backlog extracted for future, evidence-gated proposals** (not
approved for implementation by this ADR — each would need its own
why/benefit/risk writeup):
1. Evidence-weighted asset ranking (Eb* doc 04) — the live system's
   staleMate detection is single-signal (repeat-strategy-no-progress); a
   proper Beta-binomial confidence-weighted score per teaching strategy,
   stratified by grade/language, would be a genuine upgrade, additive to
   `teachingStrategyEvent`.
2. Structured `TurnContext` output instead of string-concatenated prompt
   blocks (Eb* doc 03) — would make the Brain of Record's stages
   independently testable without a live LLM, addressing the route file's
   actual weakness without replacing it.
3. AI Dependency Index tracking (Eb* doc 06, doc 09) — `generateAIResponse`
   regenerating the explanation body every turn is a real, quantified cost
   and quality risk; the metric concept is sound even though the original
   doc's solution (full asset-retrieval rewrite) is the wrong path forward
   given §1.4's evidence.

---

## 6. Implementation roadmap (this ADR's own actions)

1. ✅ Evidence-gathering (this document, §1).
2. ✅ Add archive-status header comments to the two dormant systems.
3. ✅ Update `CLAUDE.md` with the Brain of Record pointer and the
   governance rule from §3.
4. ⬜ (Next loop iteration) Design the general-learner adaptive-intelligence
   wiring from §4 as its own ADR, with its own why/benefit/risk/rollout —
   the next highest-value increment, now that duplication risk is closed
   off.

---

## 7. Appendix — file map

```
LIVE — Brain of Record
  src/lib/school/adaptive/                      18 modules
  src/app/api/learn/chat/route.ts:293-922        wiring site (school students)
  src/app/api/learn/chat/route.ts:107-260 (approx) buildKnowledgeGraphContext call (general learners)
  src/lib/curriculum/knowledgeGraph.ts            canonical + legacy KG bridge (live, both paths)
  src/lib/curriculum/subjectKgAdapter.ts          canonical graph.json loader (live)

ARCHIVED — Eb* pipeline (shadow, gated off, never affects response)
  src/lib/educationalBrain/                       7 files, 480 lines
  prisma/schema.prisma:1883-2381                  21 Eb* models, 13 with zero runtime usage
  docs/educational-brain/README.md + 01-11        spec docs (ideas backlog, see §5)
  src/app/api/learn/chat/route.ts:1515-1517        fire-and-forget invocation site

ARCHIVED — Canonical-KG Teaching Engine stack (orphaned, zero importers)
  src/lib/teaching-engine/
  src/lib/curriculum/teachingActionEngine.ts
  src/lib/curriculum/teachingActionSchema.ts
  src/lib/curriculum/teachingAssets.ts
  src/lib/curriculum/teachingAssetAdapter.ts
  src/lib/curriculum/teachingAssetSchema.ts
```
