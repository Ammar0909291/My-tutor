# Phase 4 — Educational Assets Architecture

**Document class:** Architecture blueprint. Design only.
**Status:** DRAFT — pending independent merge-gate review. Not canonical. Not approved. Not
self-certified (Phase 1 §18).
**Version:** 4.0.0-draft
**Phase:** 04 (`architecture/phase-04-educational-assets`)
**Builds on:** Phase 1 v1.2.0, Phase 2 v2.1.0, Phase 3 v3.1.0 — all CANONICAL, all binding, none
modified.
**Authority position:** Row 6 — **Advisory** — under `docs/architecture/README.md`'s ladder.
Where this document and a Frozen document disagree, **the Frozen document wins and this
document is the bug**.
**Normative language:** RFC 2119.

**Governance compliance.** No code, runtime, schema, API, prompt, database, UI, curriculum or KG
change. No ADR edit. No Bible edit. No governance edit. No pseudocode. No implementation plan.
Every cross-owner change is a handoff. G1 and G2 remain in force; merging this document unblocks
no implementation and adds no Wave 0 item.

---

> ## The finding that determines this document's size
>
> Phase 1 §17's reconciliation was executed before any architecture was written, as required.
> It returned an unusual result, and the honest response is to report it rather than design
> around it:
>
> **All sixteen items in Phase 4's brief already have owners.** Not "mostly" — all sixteen.
> Asset identity, versioning, provenance, lifecycle, retirement, relationships, multilingual
> variants, ranking and validation are owned by **CEKR, which is Frozen at row 3**. Evidence and
> the curator loop are ADR 13's. The runtime catalogue is ADR 14's. Authoring is the SDK's.
> And the last item — the prioritized authoring work queue this phase was closest to inventing —
> **already exists and runs**, in `src/lib/teaching/assets/contentQualityDashboard.ts`.
>
> Phase 4 therefore designs **no asset system**. It reconciles the territory, records four
> contradictions it found and did not fix, and specifies **two narrow integration seams** that
> genuinely have no owner: authored demand has no path into the live work queue (§4), and
> "sufficiently covered" means four different things to four consumers with no reconciliation
> (§5). Everything else is a pointer to an existing owner.
>
> A Phase 4 that designed an asset architecture would have duplicated a Frozen document and a
> live subsystem simultaneously. That outcome was avoided by reading source, which is the
> procedure working as intended.

---

## Table of Contents

0. [Reconciliation Map](#0-reconciliation-map) — §0.1 inventory · §0.2 the ownership map for all sixteen brief items · §0.3 ownership boundary and handoffs · §0.4 contradictions recorded, not fixed
1. [Executive Summary](#1-executive-summary)
2. [Design Principles](#2-design-principles)
3. [System Overview — the asset stack and its seams](#3-system-overview)
4. [EA-1 · The Demand Routing Seam](#4-ea-1--the-demand-routing-seam)
5. [EA-2 · The Sufficiency Model](#5-ea-2--the-sufficiency-model)
6. [Interaction with the canonical phases](#6-interaction-with-the-canonical-phases)
7. [Risks](#7-risks)
8. [Trade-offs](#8-trade-offs)
9. [Acceptance Criteria](#9-acceptance-criteria)
10. [Open Questions](#10-open-questions)
11. [Reconciliation Procedure Execution Record](#11-reconciliation-procedure-execution-record)
12. [Merge Requirements](#12-merge-requirements)

Appendices: A Glossary · B Compliance statement · C Feedback to other owners · D Explicit deferrals

---

## 0. Reconciliation Map

### 0.1 Inventory

Produced from a directory listing of `docs/architecture/` (52 + 7 `eos-v3/`), `docs/curriculum/`,
and `src/lib/teaching/assets/` (21 files), not from memory or from what a prior phase cited.
Verdicts: **Reused** · **Extended** · **Complemented** · **Superseded** · **Independent** · **N/A**.

**A. Frozen authorities — binding, not negotiable**

| Authority | What it owns, verified by reading it | Verdict |
|---|---|---|
| **`CEKR`** §2.1 the envelope | `id` (namespaced `cekr:<kind>/<slug-or-ulid>`, "permanent identity") · `rev` (RevisionHash, "immutable revision identity") · `schemaVersion` · `status` DRAFT\|REVIEW\|ACTIVE\|DEPRECATED\|RETIRED, "aligned with ADR 14" · `provenance {authorType, authorRef, createdAt, basis[]}` · `citations` SourceSpan[] ≥1 · `tags` "discovery only, never semantics" | **Reused — owns asset identity and provenance outright** |
| **`CEKR` §10** Versioning and Revision Model | head index id→ACTIVE rev per channel · `Revision` entity with a reason taxonomy · `SUPERSEDES` edge · **"Deprecation ≠ deletion… Deletion does not exist"** · `Conflict` node with OPEN / RESOLVED / **ACCEPTED_TENSION** · `BrainSnapshot` | **Reused — owns versioning and retirement outright** |
| **`CEKR` §3, §8.1, §8.2, §11, §13** | relationship model · explanation ranking · **language/register variants** · validation V-1…V-16 · runtime lookup and the evidence join | **Reused — owns relationships, discoverability, multilingual and validation outright** |
| `EOS_V2_ARCHITECTURE` · `EOS_V2_RUNTIME_SPECIFICATION` | Laws, planes, band semantics; runtime invariants and **§18 the only normative source for constants** | **Reused** — Phase 4 sets no constant and publishes to no band |

**B. Frozen v1.0 — the ADRs**

| Authority | Owns | Verdict |
|---|---|---|
| **ADR 14** Knowledge Asset Lifecycle | `AssetIdentity`; DRAFT→REVIEW→ACTIVE→DEPRECATED→RETIRED; `canonicalSlug`; at most one ACTIVE per slug; `incompatibilities` misconception gating; five evidence-driven deprecation triggers | **Reused — owns the runtime asset catalogue and lifecycle** |
| **ADR 13** Evidence Engine | `EbEvidenceEvent`, `EbAssetScore`, single-writer rule, and **`CuratorQueueEntry`** with triggers `low_score_high_traffic \| misconception_no_repair \| generation_burst` | **Reused — owns asset *quality* feedback.** Verified: every trigger is a degradation signal. **None is "asset missing."** That distinction is the whole of §4 |
| ADR 12 | `VisualAsset`, renderers, cache, validators | **Reused** — and see §0.4 CT-1 |
| ADR 10 | Six memory stores | **Reused** — Phase 4 proposes no store |

**C. Living / Advisory documents**

| Authority | Owns | Verdict |
|---|---|---|
| `EDUCATIONAL_BRAIN_AUTHORING_SDK` | BrainScript DSL · Brain IDE · author workflow · multi-author collaboration · Brain QA · AI-assisted authoring with rails · repository organization · migration · testing | **Reused — owns authoring.** Verified against its section list: it owns *how a human authors an asset*. It contains **no prioritization section** — which is consistent with §4's finding that prioritization lives in the runtime, not the SDK |
| `EDUCATIONAL_BRAIN_COMPILER` | Brain → runtime compilation, `brain.lock` | **Reused** — Phase 4 defines no compilation step |
| `OUTCOME_SCIENCE_FRAMEWORK` | Outcome constructs, experiment design, causal attribution | **Complemented** — Phase 4 defines no outcome metric |
| `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` | The "encode teaching not content" doctrine, AI-Removal Test | **Reused** — Pappu-owned; Phase 4 restates none of it |
| `docs/curriculum/TEACHING_BLUEPRINT_SPECIFICATION.md`, `PRIMITIVE_LIBRARY.md` | Blueprint authoring contract; ~91 primitives | **Reused** |
| **Phase 1 v1.2.0** (CANONICAL) | §0.2 canonical teaching hierarchy; §17 reconciliation procedure; §18 self-certification prohibition; asset-absent reason codes | **Reused — binding.** Its §17 governs this document's process and §18 governs its approval |
| **Phase 2 v2.1.0** (CANONICAL) | Visual purposes; `VisualAvailability`; **visual coverage defects** ranked by centrality | **Extended at the seam only** (§4) |
| **Phase 3 v3.1.0** (CANONICAL) | Adaptive dials; authoring flags on repeated escalation | **Extended at the seam only** (§4) |

**D. Live runtime — behaviour-checked, not interface-checked**

Phase 3's merge-gate found a cited file that was a stub. That lesson was applied here: every
file below was opened and read, not inferred from its name.

| File | Lines | What it actually does | Verdict |
|---|---|---|---|
| **`contentQualityDashboard.ts`** | 348 | **`coveragePercent` · `WorkQueueItem` · `buildWorkQueue(concepts, limit=50)` · `recommendationFor()` → `AuthoringRecommendation` · `AUTHOR_FIRST_ASSET` · deterministic severity sort.** Demand-weighted: a concept with `totalServed === 0` is explicitly *not* prioritized "regardless of coverage" | **Reused — THIS IS THE AUTHORING WORK QUEUE.** Phase 4 does not build one |
| `repositoryStats.ts` | 199 | `getConceptAssetCounts` · `getDuplicateCandidates` · `getVersionChainCount` | **Reused** — duplicate and lineage reporting exists |
| `versioning.ts` | 65 | `LineageAsset` · `CaptureDecision` · `decideCaptureAction` | **Reused** — and see §0.4 CT-2 |
| `assetIdentity.ts` · `matcher.ts` · `validation.ts` · `ranking.ts` · `similarity.ts` · `explanationMemory.ts` · `teachingActionRepository.ts` · `pipeline.ts` · `probeExtraction.ts` · `captureTracker.ts` · `lessonDecomposition.ts` · `studentState.ts` · `index.ts` | 64 · 137 · 105 · 89 · 53 · 256 · 238 · 130 · 163 · 72 · 98 · 83 · 40 | The live AssetIdentity pipeline: identity, matching, validation, ranking, similarity, capture, extraction | **Reused — all real, none a stub** |
| `authoredSeedAssets.ts` · `chemistrySeedAssets.ts` · `biologySeedAssets.ts` · `csSeedAssets.ts` · `brainSeedAssets.ts` | 49,523 · 16,081 · 7,184 · 4,883 · 274 | Authored seed content | **Reused — content, not architecture** |

**Superseded: used zero times.** Phase 4 replaces nothing.

### 0.2 The ownership map for all sixteen brief items

The core deliverable of this reconciliation. Each item, its owner, and what Phase 4 contributes.

| # | Brief item | Existing owner | Phase 4 contributes |
|---|---|---|---|
| 1 | **Asset identity** | **CEKR §2.1** (Frozen) — `id`, "permanent identity" | Nothing. Pointer only |
| 2 | **Asset lifecycle** | **ADR 14**; CEKR §2.1 `status` states it is "aligned with ADR 14" | Nothing. Pointer, plus CT-1 |
| 3 | **Authoring** | `EDUCATIONAL_BRAIN_AUTHORING_SDK` | Nothing |
| 4 | **Validation** | **CEKR §11** V-1…V-16 (Frozen); runtime `validation.ts` | Nothing |
| 5 | **Evidence** | **ADR 13**; CEKR §13 evidence join | Nothing |
| 6 | **Retirement** | **CEKR §10** (Frozen) — "Deletion does not exist"; ADR 14's five triggers | Nothing |
| 7 | **Versioning** | **CEKR §10** (Frozen) — rev, head index, `SUPERSEDES` | Nothing. Pointer, plus CT-2 |
| 8 | **Discoverability** | **CEKR §8.1** ranking, §13 lookup, §2.1 `tags`; runtime `ranking.ts`, `matcher.ts` | Nothing |
| 9 | **Provenance** | **CEKR §2.1** (Frozen) — `provenance` + `citations` | Nothing |
| 10 | **Multilingual assets** | **CEKR §8.2** language/register variants (Frozen) | Nothing |
| 11 | **Asset relationships** | **CEKR §3** relationship model (Frozen) | Nothing |
| 12 | **Ownership boundaries** | `ARCHITECTURAL_GOVERNANCE_REGISTRY` | Nothing. §0.3 records position |
| 13 | **Runtime interaction** | **CEKR §13**; `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT` | Nothing |
| 14 | **Educational Brain interaction** | `EDUCATIONAL_BRAIN_COMPILER` | Nothing |
| 15 | **Visual Intelligence interaction** | **Phase 2** + ADR 12 | §6.2 — the seam only |
| 16 | **Adaptive Teaching interaction** | **Phase 3** | §6.3 — the seam only |
| — | *(not in the brief)* **Authoring prioritization** | **`contentQualityDashboard.ts`** (live) | §4 — the routing seam |
| — | *(not in the brief)* **Sufficiency** | **nobody** | §5 — the one genuinely unowned definition |

**Sixteen of sixteen briefed items are owned. Phase 4 designs two seams and nothing else.**

### 0.3 Ownership boundary and handoffs

`ARCHITECTURAL_GOVERNANCE_REGISTRY` records: *AssetIdentity pipeline | Mohammad |
`src/lib/teaching/assets/` | **COMPLETE** | Never rebuild: **YES***, and *Teaching Asset
Philosophy | Pappu*. Pappu is a forbidden editor of `src/`.

Phase 4 authors nothing in `src/`. Both seams are expressed as handoffs:

| ID | Handoff | Territory |
|---|---|---|
| **EH-1** | `contentQualityDashboard.ts`'s `WorkQueueItem` gains an optional authored-demand input alongside its telemetry-derived signals, so Phase 1/2/3 coverage defects can reach the queue (§4) | AssetIdentity pipeline — runtime owner |
| **EH-2** | The sufficiency vector (§5) is published as a per-concept read model; `coveragePercent` remains unchanged and is reinterpreted, not replaced | AssetIdentity pipeline — runtime owner |
| **EH-3** | ADR 13's `CuratorQueueEntry.trigger` union gains no member from Phase 4. Coverage demand is routed to the work queue, not to the curator queue — recorded so the two are not merged by accident | ADR 13 — runtime owner |
| **EH-4** | CEKR §10's `Conflict` node with `ACCEPTED_TENSION` is the correct home for the contradictions in §0.4; Phase 4 proposes they be filed there rather than in phase documents | CEKR — runtime owner |
| **EH-5** | On approval, the Bible, the governance registry and the EOS blueprint index gain Phase 4 pointers | runtime owner |

**Phase 4's merge authorizes none of these.**

### 0.4 Contradictions recorded, not fixed

Four found. All belong to other owners. Per the Authority Index — *"A gap found while
implementing a frozen document is a spec bug — file it against that document; do not invent
behaviour to cover it"* — none is resolved here.

**CT-1 · Three documents, two lifecycles.** ADR 12 §4.1 defines `status: 'draft' | 'active' |
'deprecated'` (3 states). ADR 14 defines DRAFT→REVIEW→ACTIVE→DEPRECATED→RETIRED (5). CEKR §2.1
defines the same 5 and says explicitly "aligned with ADR 14". Phase 2 recorded the ADR 12 ↔
ADR 14 divergence as VF-5. Phase 4 adds the third data point: **CEKR, the Frozen authority,
sides with ADR 14, making ADR 12 the outlier.** A visual asset is subject to all three. Not
resolved.

**CT-2 · CEKR's revision model and the runtime's versioning model are different shapes.**
CEKR §10 (Frozen) specifies `rev` content hashes, a head index per release channel, a
first-class `Revision` entity with a reason taxonomy, and `SUPERSEDES` edges. Runtime
`versioning.ts` specifies `LineageAsset`, `CaptureDecision` and `decideCaptureAction`. Both are
legitimate for their layer, and no mapping between them is documented anywhere. Whether the
runtime is an implementation of CEKR §10 or an independent model is unstated. Not resolved.

**CT-3 · Coverage is measured one way and needed four ways.**
`contentQualityDashboard.ts` computes `coveragePercent = authoredConcepts / kgConcepts` — a
concept counts as covered if it has *any* authored asset. Phase 1 needs explanations and probes;
Phase 2 needs coverage per *visual purpose* across ten purposes; Phase 3 needs hint-ladder rungs
and scaffold levels. A concept at 100% by the live metric can be uncovered for three of the four
consumers. This is the observation §5 is built on. Not resolved — §5 defines the vector without
changing the existing metric.

**CT-4 · Authored demand has no path into the live queue.** Phases 1, 2 and 3 emit coverage
defects (11, 7 and 2 references respectively) addressed to "the authoring queue". The live queue
exists but derives exclusively from serving telemetry — `totalServed`, `groq_fallback` — and has
no authored-demand input. The two systems are disconnected, and neither document says so. This
is the observation §4 is built on. Not resolved — §4 defines the seam without changing either side.

---

## 1. Executive Summary

### 1.1 What Phase 4 is

A reconciliation, two seam specifications, and four recorded contradictions.

The educational-asset territory is the most heavily owned in this repository: a Frozen
knowledge-representation spec, two Frozen-v1.0 ADRs, an authoring SDK, a compiler, a philosophy
document, and twenty-one live runtime files totalling well over seventy thousand lines. The
correct architectural act here is restraint, and the reconciliation is the deliverable.

### 1.2 The two genuine seams

**EA-1 · Demand routing (§4).** Three canonical phases produce authoring demand as a *by-product
of teaching decisions* — Phase 1 when an asset-absent reason code fires, Phase 2 when a visual
purpose cannot be served, Phase 3 when an escalation rung is reached repeatedly. That demand is
the highest-quality authoring signal the system produces, because it is generated at the exact
moment a real learner needed a specific asset and it did not exist. It currently reaches nothing.
Meanwhile the live work queue prioritizes from serving telemetry, which cannot see an asset that
was never requested because it never existed. **The two halves are complementary and
disconnected.** EA-1 specifies the seam and nothing more.

**EA-2 · Sufficiency (§5).** "Is this concept covered?" has four different correct answers
depending on who asks, and one number is reported. EA-2 defines coverage as a **vector over the
four consumers** rather than a scalar, leaves `coveragePercent` untouched, and states the one
rule that makes the vector meaningful: sufficiency is defined per consumer, never globally.

### 1.3 What Phase 4 explicitly does not do

It designs no asset model, no identity scheme, no version scheme, no lifecycle, no validator, no
ranking function, no authoring workflow, no store, and no queue. Every one of those exists. It
proposes no change to `coveragePercent`, no new `CuratorQueueEntry` trigger, and no edit to any
Frozen document.

---

## 2. Design Principles

**EP1 · The Frozen documents win.** Where Phase 4 and CEKR disagree, Phase 4 is the bug. Every
identity, versioning, provenance, relationship, variant and validation question defers to CEKR.

**EP2 · An existing implementation outranks a proposed design.** `contentQualityDashboard.ts`
runs today. A prettier queue in a document does not.

**EP3 · Record contradictions; do not resolve them.** CEKR §10 provides `ACCEPTED_TENSION` for
exactly this. Four contradictions are recorded in §0.4 and filed as EH-4.

**EP4 · Demand generated by teaching is the best authoring signal.** It carries a learner, a
concept, a moment and a specific unmet need. Telemetry-derived demand cannot see absence.

**EP5 · Sufficiency is per consumer.** No single number can mean "covered" for four consumers
with different needs. A global coverage figure is a summary, never a gate.

**EP6 · Seams are specified, never subsystems.** Both Phase 4 contributions are interfaces
between things that already exist.

---

## 3. System Overview

```
 ┌──────────── FROZEN — CEKR (row 3). Owns the asset itself ─────────────────┐
 │ §2.1 identity · provenance · citations · status   §3  relationships       │
 │ §8.1 ranking  §8.2 language/register variants     §10 versioning · rev ·  │
 │ §11 validation V-1…V-16                                head index ·       │
 │ §13 runtime lookup + evidence join                     SUPERSEDES ·       │
 │                                                        Conflict/TENSION   │
 └───────────────────────────────────┬───────────────────────────────────────┘
                                     │  implemented / specialized by
 ┌───────────────────────────────────▼───────────────────────────────────────┐
 │ FROZEN v1.0 — ADR 14 catalogue & lifecycle · ADR 13 evidence & curator    │
 │ ADR 12 visual assets · ADR 10 stores                                      │
 └───────────────────────────────────┬───────────────────────────────────────┘
                                     │
 ┌───────────────────────────────────▼───────────────────────────────────────┐
 │ LIVE RUNTIME — src/lib/teaching/assets/ (21 files, COMPLETE, never rebuild)│
 │ identity · matcher · validation · ranking · similarity · versioning ·      │
 │ explanationMemory · teachingActionRepository · pipeline · probeExtraction ·│
 │ repositoryStats · contentQualityDashboard  ◄── the live work queue         │
 └──────────▲────────────────────────────────────────────────▲───────────────┘
            │                                                │
   ★ EA-1 demand routing (seam)                  ★ EA-2 sufficiency (seam)
            │                                                │
 ┌──────────┴────────────────────────────────────────────────┴───────────────┐
 │ CANONICAL PHASES — consumers that generate demand and define "enough"     │
 │ Phase 1 explanations/probes · Phase 2 visuals per purpose ·               │
 │ Phase 3 hint rungs & scaffold levels                                      │
 └───────────────────────────────────────────────────────────────────────────┘
```

**One-authority statement.** CEKR owns the asset. ADR 14 owns its catalogue and lifecycle. ADR 13
owns its quality evidence. The runtime owns the implementation and the work queue. The canonical
phases own what they need. **Phase 4 owns the two arrows marked ★, and nothing else.**

---

## 4. EA-1 · The Demand Routing Seam

### 4.1 The problem, stated from evidence

Two demand signals exist and do not meet.

*Teaching-generated demand.* Phase 1 records `ASSET_ABSENT` as a legal reason code and emits a
coverage defect. Phase 2 emits a visual coverage defect naming concept, claim and purpose, and
calls it "the single most useful authoring signal this architecture produces". Phase 3 raises an
authoring flag when an escalation rung is reached repeatedly. All three address "the authoring
queue" and none names a recipient.

*Telemetry-derived demand.* `buildWorkQueue()` ranks concepts from serving statistics. Its logic
is deliberate and good — a concept with `totalServed === 0` is explicitly skipped, "never
requested — nothing to prioritize yet, regardless of coverage" — which correctly avoids authoring
for concepts nobody reaches.

**The structural blind spot:** telemetry can only see assets that were *requested and served
poorly*. It cannot see an asset that was never requested **because it never existed** and the
teaching engine therefore never attempted it. That is precisely the case the phases detect and
precisely the case the queue is blind to. The two signals are complements, not alternatives.

### 4.2 What EA-1 specifies

A single one-directional routing seam. Demand records flow up from the phases into the existing
queue; nothing flows back.

```
 AuthoredDemandRecord
   conceptId          the concept a real learner reached
   assetKind          the CEKR kind that was missing
   consumer           PHASE_1 | PHASE_2 | PHASE_3
   specificity        what exactly was missing, in the consumer's own vocabulary:
                        Phase 1 — the reason code that fired
                        Phase 2 — the purpose and the claim
                        Phase 3 — the ladder and the rung
   occurredAt         when
   learnerReached     true — this is what distinguishes it from a coverage sweep
```

**Four rules, and they are the whole of EA-1:**

- **DR-1 · The seam is additive.** `buildWorkQueue()`'s existing telemetry inputs and its
  deterministic severity sort are unchanged. Authored demand is an *additional* input, and how
  the runtime owner weighs it is theirs to decide (EH-1). Phase 4 proposes no weighting.
- **DR-2 · Demand records are evidence of absence, not requests.** They record that a learner
  reached a point where an asset was needed and none existed. They do not instruct anyone to
  author anything; prioritization remains the queue's.
- **DR-3 · Specificity is preserved in the consumer's vocabulary, never flattened.** A Phase 2
  demand carries its purpose and claim; a Phase 3 demand carries its ladder and rung. Collapsing
  them to "concept X needs an asset" destroys exactly the information that makes the signal
  valuable, and is the failure mode this seam exists to avoid.
- **DR-4 · Demand goes to the work queue, never to `CuratorQueueEntry`.** ADR 13's curator queue
  is triggered by degradation of assets that exist. Absence is a different problem with a
  different remedy. Recorded as EH-3 so the two are not merged by well-meaning accident.

### 4.3 What EA-1 does not specify

Weighting, decay, deduplication policy, queue ordering, storage, or any change to
`coveragePercent`. All belong to the runtime owner.

### 4.4 Falsifiable prediction

*Concepts surfaced by authored demand but invisible to telemetry will, once authored, show
higher first-serve rates than concepts surfaced by telemetry alone* — because they were requested
by the teaching engine at a known moment of need. If authored-demand concepts perform no better,
the signal carries no information the queue lacks and EA-1 should be withdrawn.

---

## 5. EA-2 · The Sufficiency Model

### 5.1 The problem, stated from evidence

`summarizeSubject()` computes `coveragePercent = 100 × authoredConcepts / kgConcepts`. A concept
counts as covered if it has **any** authored asset. That is a reasonable subject-level health
figure and Phase 4 proposes no change to it.

It is not a sufficiency test, and four consumers need four different ones:

| Consumer | "Sufficient" means |
|---|---|
| Phase 1 teaching quality | an explanation exists **and** a probe with misconception-mapped distractors |
| Phase 2 visual intelligence | for each visual purpose the concept genuinely needs, a form serving that purpose |
| Phase 3 adaptive teaching | enough hint-ladder rungs and scaffold levels to fade support |
| Runtime serving | any ACTIVE asset matching learner language and grade band |

A concept can be 100% covered by the live metric and insufficient for three of the four.

### 5.2 What EA-2 specifies

**Coverage is a vector, not a scalar.**

```
 SufficiencyVector (per concept, per language, per grade band)
   teaching     satisfied | partial | absent    — Phase 1's needs
   visual       satisfied | partial | absent    — Phase 2's, per purpose
   adaptive     satisfied | partial | absent    — Phase 3's, per ladder
   serving      satisfied | absent              — any ACTIVE match
```

**Four rules:**

- **SF-1 · Each consumer defines its own component; no other party may.** Phase 2 decides what
  visual sufficiency means, because only Phase 2 knows which purposes a concept needs. Phase 4
  defines the *shape*, never the thresholds.
- **SF-2 · `coveragePercent` is unchanged and reinterpreted.** It is the `serving` component at
  subject scale. It remains a valid health figure; it is simply not the sufficiency test, and
  should not be read as one.
- **SF-3 · There is no global sufficiency score.** Collapsing the vector to one number reproduces
  the defect. A concept is sufficient *for a consumer*, and the honest report is the vector.
- **SF-4 · `absent` is not a defect on its own.** Most concepts will be `absent` for most
  components for a long time (Phase 1 R1 rates empty libraries "Certain"). Sufficiency is a
  gradient that ranks work, never a launch gate — and never a quality judgement on a lesson that
  taught successfully via a fallback.

### 5.3 What EA-2 does not specify

Thresholds, weights, storage, computation schedule, or any consumer's internal definition.

### 5.4 Falsifiable prediction

*Concepts marked `satisfied` on a consumer's component will show fewer fallback-ladder
degradations for that consumer than concepts marked `partial`.* If not, the component's
definition does not describe what that consumer actually needs and belongs back with its owner.

---

## 6. Interaction with the canonical phases

Phase 4 extends all three **at the seam only**. None is modified; all three remain
byte-identical.

**6.1 Phase 1.** Its `ASSET_ABSENT` reason code (a member of gate G7's closed set) becomes a
demand record's `specificity` under DR-3. **Phase 4 proposes no change to G7's closed set** — the
code is read, not amended. Its `teaching` sufficiency component is Phase 1's to define (SF-1).

**6.2 Phase 2.** Its visual coverage defect — concept, claim, purpose — maps directly onto
`AuthoredDemandRecord`, and its `VisualAvailability` projection is the natural source of the
`visual` component. **Phase 4 does not read the asset catalogue**: Phase 2's own §7.4 forbids the
pedagogical tier from reading cache state or asset ids, and EA-2 consumes the projection, not the
catalogue — preserving ADR 12 §13's leaf rule exactly as Phase 2 established it.

**6.3 Phase 3.** Its authoring flag on repeated escalation becomes a demand record carrying
ladder and rung. Its `adaptive` component is Phase 3's to define. **Phase 4 publishes to no band
and sets no constant**, so Phase 3's Band 2 / Band 5 publication targets and RS §18's constants
rule are untouched.

---

## 7. Risks

| # | Risk | Sev | Likelihood | Mitigation | Residual |
|---|---|---|---|---|---|
| **ER1** | **Phase 4 is judged too small to be a phase.** Two seams and a reconciliation is a modest deliverable against a sixteen-item brief | Medium | **High** | The alternative was duplicating a Frozen document and a live subsystem. §0.2 shows the ownership for every item. Restraint here is the correct outcome, not an under-delivery | Low — but the perception is real and worth stating |
| **ER2** | **The seams are never implemented.** Both are handoffs into another owner's territory | Medium | Medium | EH-1 and EH-2 are small and additive by construction; neither changes existing behaviour | Medium |
| **ER3** | **Specificity is flattened at implementation.** DR-3 is the rule most likely to be lost when a demand record meets a queue row | **High** | Medium | Stated as a rule with its rationale; §4.4's prediction fails visibly if it happens | Medium |
| **ER4** | **The sufficiency vector is collapsed to a score.** Dashboards want one number | Medium | **High** | SF-3 forbids it explicitly and says why | Medium — unmitigable by architecture alone |
| **ER5** | **CT-2 hides a real divergence.** If runtime `versioning.ts` is not an implementation of CEKR §10, assets may carry two incompatible histories | **High** | Unknown | Recorded, filed as EH-4, not resolved. **Unknown likelihood is itself the finding** — nobody has stated the relationship | **High** |
| **ER6** | **Behaviour-checking was not exhaustive.** 21 runtime files were opened; the five seed files were checked for size and character only | Medium | Medium | Declared in §11's limitations | Medium |

---

## 8. Trade-offs

**ET1 · Reconciling rather than designing.** *Chosen:* reconcile. *Cost:* Phase 4 is small and
may read as thin. *Why:* every alternative duplicates an owner, and one of those owners is Frozen.

**ET2 · Two seams rather than one integrated asset-governance layer.** *Chosen:* two narrow
seams. *Cost:* no single component owns "asset strategy". *Why:* an integrated layer would have
to read CEKR's model, ADR 14's catalogue and the live queue — becoming a second authority over
all three, which is the defect this repository has repeatedly paid for.

**ET3 · Leaving `coveragePercent` untouched.** *Chosen:* leave it, reinterpret it. *Cost:* a
subject-level number remains that means less than its name suggests. *Why:* it is live, it is
another owner's, and it is correct for what it measures. Changing it is not Phase 4's to do.

**ET4 · Recording CT-1…CT-4 rather than proposing resolutions.** *Chosen:* record. *Cost:* four
known contradictions persist. *Why:* three involve Frozen documents, and the Authority Index
directs that a gap in a Frozen document is filed against it, not covered by invented behaviour.

---

## 9. Acceptance Criteria

| # | Criterion | Status |
|---|---|---|
| EA-A1 | Phase 1 §17's seven-step reconciliation executed **before** architecture was written | ✅ §11 |
| EA-A2 | Every architecture authority carries exactly one verdict, from a directory listing | ✅ §0.1 |
| EA-A3 | All sixteen brief items mapped to an owner | ✅ §0.2 — sixteen of sixteen owned |
| EA-A4 | The Authority Index is consulted and this document's row stated | ✅ header, §0.1 A, EP1 |
| EA-A5 | No Frozen document contradicted; contradictions recorded, not resolved | ✅ §0.4 CT-1…CT-4 |
| EA-A6 | Runtime claims behaviour-checked, not inferred from filenames | ✅ §0.1 D — 21 files opened |
| EA-A7 | Phases 1–3 byte-identical | ✅ verified |
| EA-A8 | Every cross-owner change is a handoff | ✅ EH-1…EH-5 |
| EA-A9 | No new store, queue, lifecycle, validator, identity or version scheme | ✅ §1.3 |
| EA-A10 | No code, runtime, schema, API, prompt, ADR, Bible, governance, curriculum or KG change; no pseudocode; no implementation plan | ✅ document only |
| EA-A11 | Both seams declare a falsifiable prediction | ✅ §4.4, §5.4 |
| EA-A12 | Risks state residual risk; trade-offs state accepted cost | ✅ §7, §8 |
| EA-A13 | Open questions recorded as open | ✅ §10 |
| EA-A14 | **Independent merge-gate review recommends approval** | ❌ **NOT MET — and not self-certifiable** (Phase 1 §18) |

**EA-A14 is the only open criterion.**

---

## 10. Open Questions

**EQ-1 · Is `versioning.ts` an implementation of CEKR §10 or an independent model?** (CT-2.) The
answer determines whether ER5 is a documentation gap or a data-integrity risk. Nobody has stated
it, and Phase 4 cannot answer it without the runtime owner.

**EQ-2 · Should authored demand decay?** A demand record from a learner six months ago may no
longer reflect need. Left to the runtime owner (DR-1) but genuinely undecided.

**EQ-3 · What is the right sufficiency granularity?** EA-2 specifies per concept, per language,
per grade band. That may be too fine to compute affordably or too coarse for Phase 2's
per-purpose needs. Unresolved.

**EQ-4 · Does the `serving` component add anything over `coveragePercent`?** It may be redundant
by construction. Retained for symmetry, flagged as possibly removable.

**EQ-5 · Where should CT-1…CT-4 be filed?** EH-4 proposes CEKR §10's `Conflict` node with
`ACCEPTED_TENSION`. Whether phase-discovered contradictions belong in the knowledge graph or in a
governance register is the owner's call.

**EQ-6 · Phase-document ownership.** Phase 1 OQ-10 and Phase 2 VQ-8, unchanged: the registry
assigns `docs/architecture/` to the runtime owner. Not re-litigated.

---

## 11. Reconciliation Procedure Execution Record

Phase 1 §17, executed in full **before** design work.

| Step | Action | Result |
|---|---|---|
| 1 · Inventory | Directory listing of `docs/architecture/` (52 + 7), `docs/curriculum/`, `src/lib/teaching/assets/` (21 files) | §0.1 |
| 2 · Governance registry | Read | AssetIdentity pipeline = runtime owner, COMPLETE, never rebuild; Teaching Asset Philosophy = Pappu → §0.3, EH-1…EH-5 |
| 3 · ADR reconciliation | Read what each **selected**, not what it diagnosed | ADR 14's lifecycle, ADR 13's `CuratorQueueEntry` triggers read literally — all three are degradation triggers, none is absence. That single check produced §4 |
| 4 · Document reconciliation | One verdict per authority; Frozen documents read in substance | **CEKR owns nine of the sixteen brief items outright.** Superseded used zero times |
| 5 · Ownership verification | One owner per responsibility | §0.2 — sixteen of sixteen owned |
| 6 · Authority verification | Checked every decision for a second decider | Two seams found unowned; **the third candidate — a prioritized authoring queue — was found already implemented**, which is the anti-pattern "inventing an existing class" caught before writing |
| 7 · Independent review | Not performed by the author | §12 |

**Anti-patterns actively checked** (Phase 1 §17.2): reconciled ADRs' selected designs; read the
Frozen CEKR in substance rather than by status line; produced the file list from a directory
listing; consulted the governance registry; and **searched for an existing artifact doing this
job under another name — which found `contentQualityDashboard.ts` and prevented this phase from
duplicating a live subsystem.**

**Honest limitations.** Four, stated so a reviewer knows where to press hardest:

1. **CEKR was read at section level plus §2.1, §2.2, §3, §8, §10, §11 and §13 in detail.** Its
   31 kinds and V-1…V-16 were not enumerated individually. If a kind or validation rule already
   defines sufficiency, §5 is duplicative — the single most likely way this document is wrong.
2. **The five seed asset files (~78,000 lines total) were checked for size and character only.**
   They are content, but if any encodes coverage policy, §5 is under-reconciled.
3. **`buildWorkQueue()`'s ordering logic was read, not exhaustively traced.** DR-1 asserts
   additive integration is possible; that is a claim about a function whose full behaviour was
   not proven.
4. **The AUTHORING_SDK was reconciled from its section list plus targeted checks**, not read in
   full. If it contains a prioritization mechanism outside its section headings, §4 is
   under-reconciled.

---

## 12. Merge Requirements

Phase 4 may be merged only when all hold:

1. All acceptance criteria met except those explicitly carried, with the carry stated (§9:
   EA-A14 open).
2. **An independent merge-gate review recommends approval.** Per Phase 1 §18 the author may
   declare only readiness and may never self-certify. The reviewer must assume nothing is correct
   and verify against the repository.
3. §11's reconciliation record is confirmed complete — in particular that no further unreconciled
   asset authority exists, and that its four limitations are acceptable or closed.
4. Handoffs EH-1…EH-5 are acknowledged by their owners as **proposals**. Phase 4's merge
   authorizes none of them.
5. G1 and G2 remain in force. Merging Phase 4 unblocks no implementation and adds no Wave 0 item.
6. Merge convention: `--no-ff`, no squash, no rebase of public history.

**Suggested reviewer focus**, ranked by where this document is most likely wrong: limitation 1
(whether CEKR already defines sufficiency, which would make §5 duplicative); CT-2 (whether
`versioning.ts` implements CEKR §10, which determines ER5's severity); and whether §4's seam is
genuinely additive to `buildWorkQueue()` or would require changing it.

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| **Authored demand** | A record that a learner reached a point where a specific asset was needed and none existed (§4.2). |
| **Telemetry demand** | Priority derived from serving statistics by `buildWorkQueue()`. Cannot observe absence. |
| **Sufficiency vector** | Per-concept coverage expressed per consumer rather than as a scalar (§5.2). |
| **`coveragePercent`** | The live subject-level metric. Unchanged by Phase 4; the `serving` component at subject scale. |
| **Seam** | An interface between two things that already exist. Phase 4 contributes two and no subsystem. |

## Appendix B — Compliance statement

Produced under the repository's governance rules, Phase 1 §17 and the Authority Index. It reads
and reuses the existing corpus; introduces no asset model, identity scheme, version scheme,
lifecycle, validator, store or queue; modifies no runtime, route, schema, API, component, prompt,
curriculum file, Knowledge Graph, ADR, Bible or governance document; modifies no canonical phase;
implements nothing; and requests no implementation approval.

## Appendix C — Feedback to other owners

**EF-1 · ADR 12's three-state lifecycle is the outlier** (CT-1). CEKR §2.1 and ADR 14 both define
five states and CEKR says it is "aligned with ADR 14". Phase 2 raised this as VF-5 against ADR 12
and ADR 14; the Frozen authority settles the direction. *For the runtime owner.*

**EF-2 · The CEKR revision model and runtime `versioning.ts` have no documented relationship**
(CT-2, ER5, EQ-1). *For the runtime owner and CEKR's owner.*

**EF-3 · `coveragePercent` measures presence, not sufficiency** (CT-3). It is correct for what it
computes; the name invites over-reading. *For the runtime owner.*

**EF-4 · `CuratorQueueEntry` has no absence trigger** (CT-4). All three triggers are degradation
signals. Phase 4 routes absence elsewhere (DR-4, EH-3) rather than proposing a fourth trigger,
but the asymmetry is worth an explicit note in ADR 13. *For the runtime owner.*

**EF-5 · `contentQualityDashboard.ts` is undocumented in the architecture corpus.** A live,
348-line subsystem implementing coverage measurement and a prioritized authoring queue appears in
no ADR, the Bible, or `ENGINE_REFERENCE.md`. Phase 4 found it only by directory listing. Three
phase documents wrote about "the authoring queue" without knowing one existed. *For the runtime
owner — this is the same class as Phase 3's AC-3 finding, inverted: not a documented engine that
computes nothing, but a computing engine that is documented nowhere.*

## Appendix D — Explicit deferrals

| Brief item | Deferred to |
|---|---|
| Asset identity · provenance · versioning · retirement · relationships · multilingual · validation · discoverability | **CEKR** (Frozen) — §0.2 rows 1, 4, 6–11 |
| Asset lifecycle · catalogue | **ADR 14** |
| Evidence · curator loop | **ADR 13** |
| Authoring workflow | **`EDUCATIONAL_BRAIN_AUTHORING_SDK`** |
| Educational Brain interaction | **`EDUCATIONAL_BRAIN_COMPILER`** |
| Runtime interaction | **CEKR §13** + `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT` |
| Ownership boundaries | **`ARCHITECTURAL_GOVERNANCE_REGISTRY`** |
| Authoring prioritization | **`contentQualityDashboard.ts`** (live) |
| Visual / Adaptive interaction | **Phase 2 / Phase 3** — seams only in §6 |
