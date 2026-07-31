# Phase 2 — Visual Intelligence Architecture

**Document class:** Architecture blueprint. Design only.
**Status:** **CANONICAL.** Approved for merge by repository-owner authorization on 2026-07-31,
the owner attesting that the merge-gate review is complete and that v2.1.0 resolves its
findings. No review artifact is committed to this repository; the approval of record is the
owner's authorization (§18.1). This is the canonical Visual Intelligence Architecture. It
remains architecture only — nothing is implemented, all stages stay G1/G2 gated, and W4-2
remains gated.
**Version:** 2.1.0 (supersedes 2.1.0-draft and 2.0.0-draft; Appendix D is the change log)
**Owner:** Pappu (Chief Architect track)
**Phase:** 02 of the phased architecture program (`architecture/phase-02-visual-intelligence`)
**Builds on:** Phase 1 Teaching Quality Architecture v1.2.0 (CANONICAL) — extended, never modified
**Normative language:** RFC 2119 (MUST / MUST NOT / SHOULD / MAY).

**Governance compliance.** This document writes no code, modifies no runtime, route, schema,
API, curriculum file, Knowledge Graph, React component, prompt, or rendering path. It modifies
no Phase 1 content. It introduces no competing renderer taxonomy, asset model, cache, or
validator — those belong to ADR 12 and ADR 14 and are consumed by reference. Implementation
remains gated on G1 (Canonical KG v1 freeze) and G2 (explicit per-item owner approval), and
additionally on W4-2, which the Wave 0 checklist marks as untouched visual territory. Nothing
here constitutes a request for implementation approval.

---

## Table of Contents

0. [Reconciliation Map](#0-reconciliation-map) — §0.1 inventory · §0.2 canonical visual hierarchy · §0.3 ownership boundary and handoffs · **§0.4 a contradiction between reused authorities** *(new in v2.1.0)*
1. [Executive Summary](#1-executive-summary)
2. [Design Principles](#2-design-principles)
3. [System Overview and Layer Model](#3-system-overview-and-layer-model)
4. [VD-1 · Visual Decision Engine](#4-vd-1--visual-decision-engine) — *when*, and *when not*
5. [VD-2 · Visual Purpose Taxonomy](#5-vd-2--visual-purpose-taxonomy) — *why*
6. [VD-3 · Visual Selection Engine](#6-vd-3--visual-selection-engine) — *which*
7. [VD-4 · The VisualIntent Projection](#7-vd-4--the-visualintent-projection) — the interface, incl. **§7.4 the VisualAvailability projection** *(new in v2.1.0)*
8. [VD-5 · Campaign and Strategy Interaction](#8-vd-5--campaign-and-strategy-interaction)
9. [VD-6 · Visuals and Mastery](#9-vd-6--visuals-and-mastery)
10. [VD-7 · Fallback Hierarchy and Graceful Degradation](#10-vd-7--fallback-hierarchy-and-graceful-degradation)
11. [VD-8 · Accessibility](#11-vd-8--accessibility)
12. [VD-9 · Visual Quality Standards and Metrics](#12-vd-9--visual-quality-standards-and-metrics)
13. [Interfaces](#13-interfaces)
14. [Risks](#14-risks)
15. [Trade-offs](#15-trade-offs)
16. [Governance, Scalability and Extensibility](#16-governance-and-extensibility)
17. [Future Implementation Guidance](#17-future-implementation-guidance)
18. [Acceptance Criteria](#18-acceptance-criteria)
19. [Open Questions](#19-open-questions)
20. [Reconciliation Procedure Execution Record](#20-reconciliation-procedure-execution-record)
21. [Merge Requirements](#21-merge-requirements)

Appendices: A Glossary · B Compliance statement · C Feedback to other owners · **D Change log v2.0.0 → v2.1.0**

---

## 0. Reconciliation Map

Phase 1 §17 is binding on this phase, so the seven-step reconciliation was executed **before**
any design work. §20 is the execution record. This section is its output, and it changed the
shape of Phase 2 substantially — the visual territory is the most crowded in the repository,
and a naive Phase 2 would have duplicated an existing ADR almost in full.

### 0.1 Visual-territory inventory

| Authority | What it owns today | Verdict | Rationale |
|---|---|---|---|
| **ADR 12 · Visualization & Simulation Architecture** | The `VisualAsset` model, the `VisualRenderer` taxonomy, the Visual Policy table, concept-keyed caching, background authoring, the mandatory `a11yDescription`, five validator layers, the migration plan | **Reused — and treated as binding** | **The single most important finding.** ADR 12 already owns most of what a naive reading of the Phase 2 brief would design: the *taxonomy*, the *lifecycle*, the *selection mechanics*, the *accessibility requirement*, and the *quality validators*. Phase 2 designs none of these again. See §0.2 for the line. |
| **ADR 12 §13 · the leaf-dependency rule** | "The Visual tier may not read `TeachingDecision`, `TeachingAction`, or `LessonPlan` — only the single `visual_type` field." Visual is a leaf: everything may call it; it calls nothing | **Reused — a hard constraint on this phase** | This forbids the obvious Phase 2 design (a visual engine that reads campaign and strategy state). Phase 2's central architectural move exists to respect it — see §7. **Scope assumption recorded, v2.1.0** — see below. |
| **`DEPENDENCY_RULES.md` · the leaf entry** | Verbatim: *"this is a leaf dependency. Everything calls into it; it calls into nothing"* — scoped in that file to the **Visual Type System** (`school/visuals/{visualTypes,detectVisual}.ts`) | **Reused, with an inherited ambiguity recorded** | ADR 12 §13 cites this rule but generalizes it from that one module to "the Visual tier" as a whole (`sceneGenerators/`, `visualizationCache`, `generateVisualizationCode`). **Phase 2 adopts ADR 12's broader reading**, because that is the reading its own §13 asserts and the one a visual architecture must satisfy to be safe. But the generalization is ADR 12's, not `DEPENDENCY_RULES`', and Phase 2 records rather than resolves it (VF-6). If the narrow reading is correct, Phase 2's VI-1…VI-5 are stricter than required — which is the safe direction to be wrong. |
| **ADR 14 · Knowledge Asset Lifecycle** | `AssetIdentity`, the DRAFT→REVIEW→ACTIVE→DEPRECATED→RETIRED lifecycle, `incompatibilities` (misconception gating), at most one ACTIVE per `canonicalSlug` | **Reused — and named as Phase 2's lifecycle target** | Visual assets are assets. Phase 2 defines no second lifecycle. **It also does not assume ADR 12's and ADR 14's lifecycles agree — they do not; see §0.4.** |
| **ADR 15 · Rendered Reality Model** | Server-authoritative log of what visuals are actually on the learner's screen; five invariants incl. perception-before-reference | **Reused, and load-bearing for §8** | Cross-turn visual awareness is ADR 15's, not Phase 2's. Phase 2 *consumes* RRM to answer "what has this learner already seen in this campaign." |
| **ADR 08 · Teaching Action Intelligence** | `TeachingDecision.visual_type`; the Posture/Action layer split | **Extended** | Phase 2 widens the projection `visual_type` carries (§7) without changing who decides. |
| **ADR 09 · Dynamic Lesson Composition** | Cross-turn stage continuity via `lessonStageProgress` | **Reused** | Already extended by Phase 1 TQ-2. Phase 2 adds no stage concept. |
| **Phase 1 §5.4 · TQ-2 VISUAL phase conditions** | The four conditions under which the VISUAL arc phase is entered; the skip-with-reason-code requirement (gate G7) | **Extended** | Phase 1 answered *whether the arc enters a visual phase*. Phase 2 answers *whether this turn carries a visual, of what pedagogical function*. Related, not identical — §4.1. |
| **Phase 1 §6.3 · M1 Visual Teaching, M7 Simulation** | Method definitions: intent, prohibitions (no decorative visuals; simulation mastery re-verified outside the sim), shapes, failure signatures, repair ladders | **Extended** | Phase 2 supplies the decision layer these methods are dispatched by. Method definitions are not re-authored. |
| **Phase 1 §7.4 · the eight-axis Difference Operator** | Axis 1 channel, axis 3 representation, axis 4 concreteness, axis 8 instance | **Reused** | A visual re-teach is an axis-1/3/4 change under the existing operator. Phase 2 introduces **no separate visual difference rule** — see §8.3. |
| **`EDUCATIONAL_BRAIN_PRIMITIVE_ARCHITECTURE.md` (FINAL) + `PRIMITIVE_LIBRARY.md`** | P06 CONCRETE EMBODIMENT, **P07 PERCEPTUAL REPRESENTATION**, P08 ABSTRACT NOTATION, P17 CONTRAST, **P47 DIAGRAM CONSTRUCTION**, P60 VARIATION, P86 MODALITY SWITCHING; the CPA grammar P06→P07→P08 | **Reused — the grounding for §4 and §5** | The visual decision is, at bottom, a question about position on the CPA chain. P07 *is* the visual primitive. Phase 2 grounds its taxonomy in these rather than inventing categories. |
| **Live code** — `sceneGenerators/` (31 files), `visuals/` (`generateVisualizationCode.ts`, `parseVisualizationCode.ts`, `visualizationCache.ts`), `visualizationDecision.ts` | Seven visual pipelines, flag-gated, LIVE | **Reused (read-only)** | Owned by the runtime owner. Phase 2 modifies nothing and proposes no new pipeline. |
| **Bible §3 Engines 36–42, §6.8** | The engine map for visual and scene generation | **Extended** | Requires a Phase 2 pointer on approval (handoff). |
| **`WAVE_0_APPROVAL_CHECKLIST.md` W4-2** | Visual asset model activation — explicitly gated, untouched | **Reused** | Phase 2 adds no approval item and does not unblock W4-2. |
| **`DEPENDENCY_RULES.md`** | The Visual tier's leaf position; Permanent Rule 9 (no second LLM call per turn) | **Reused — binding** | §4.5's decision procedure is deterministic precisely so it cannot introduce an LLM call. |
| **`assessment/06`** (modality) · **`teaching-actions/01`** (SHOW family) | Visual and drawing assessment modality; Drawing, Matching, Concept Map actions | **Reused** | Consumed as authored pedagogy; not re-authored. |

**Superseded: used zero times.** Phase 2 replaces nothing.

### 0.2 The canonical visual hierarchy — and the line Phase 2 must not cross

The reconciliation's key output. Visual work spans two tiers with different owners, and the
brief's fifteen scope items distribute across both. Designing all fifteen would have duplicated
ADR 12 wholesale.

```
 ══════════ PEDAGOGICAL TIER — decides. Phase 1 / Phase 2 territory ══════════

  L-A  WHETHER   Should this turn carry a visual at all?          ★ VD-1
                 (and the harder question: should it NOT?)
  L-B  WHY       What pedagogical function must it perform?       ★ VD-2
                 The justification. No function ⇒ no visual.
  L-C  WHICH     Which purpose-satisfying form, given the         ★ VD-3
                 learner, the campaign, and what they've seen?
                        │
                        │  VisualIntent  — a typed projection, one direction,
                        ▼  no back-reads (§7). Preserves ADR 12 §13's leaf rule.
 ══════════ PRODUCTION TIER — renders. ADR 12 / ADR 14 territory ═════════════

  L-D  HOW       Renderer selection, spec payload, parametric      ADR 12 §4.2/4.3
                 vs dynamic authoring backends
  L-E  ASSET     Identity, cache, lifecycle, versioning,           ADR 12 §4.1, ADR 14
                 at most one ACTIVE per slug
  L-F  VALIDATE  Schema, static render, consistency, a11y,         ADR 12 §4.5/4.6
                 curator gate for generated code
  L-G  RENDER    Components, scenes, iframes, KaTeX                live code (runtime owner)
  L-H  OBSERVE   What is actually on screen, across turns          ADR 15 (RRM)
```

**Phase 2 designs L-A, L-B and L-C, plus the projection between the tiers.** It consumes
L-D through L-H by reference.

**The brief's fifteen scope items, mapped honestly:**

| Brief item | Disposition |
|---|---|
| Visual Decision Engine | **Designed** — VD-1 (§4) |
| Visual pedagogical justification | **Designed** — VD-2 (§5); the genuine gap in the repository |
| Visual Selection Engine | **Designed at the pedagogical layer only** — VD-3 (§6) selects a *purpose and form class*; ADR 12 §4.3's Visual Policy selects the *renderer*. Two layers, one interface |
| Visualization taxonomy | **Split.** *Purpose* taxonomy designed (§5, new). *Renderer* taxonomy reused from ADR 12 §4.2 — not re-authored |
| Visualization lifecycle | **Reused** — ADR 12 §4.1 + ADR 14. Phase 2 adds only the pedagogical *retirement signal* (§12.4) |
| Simulation architecture | **Designed at the pedagogical layer** — §6.4 and §9.3 (simulation as instrument). Rendering and sandboxing remain ADR 12's |
| Diagram architecture | **Designed at the pedagogical layer** — §5, §6.3. `SceneSpec`/renderers remain ADR 12's |
| Interactive learning blocks | **Designed at the pedagogical layer** — §6.4, §9.3, incl. the learner-constructs case (P47) |
| Multi-modal teaching | **Designed** — §10.2, grounded in Phase 1's channel axis and P86 MODALITY SWITCHING |
| Visual fallback hierarchy | **Designed** — VD-7 (§10) |
| Visual accessibility | **Extended, not re-designed** — ADR 12 §4.5 owns the mandatory description; §11 adds the *instructional-equivalence* standard and the alternative-path rule |
| Visual governance | **Designed** — §16 |
| Visual metrics | **Designed** — VD-9 (§12), bounded against Phase 1 TQ-7 and OSF |
| Visual quality standards | **Split.** *Technical* validation reused from ADR 12 §4.6. *Pedagogical* quality standard designed (§12.2) |
| Visual extensibility | **Designed** — §16.4 |

**How visuals affect mastery** (brief item, not in the fifteen) is designed in §9 and is, in my
assessment, the most consequential section in this document.

### 0.3 Ownership boundary and handoffs

`ARCHITECTURAL_GOVERNANCE_REGISTRY.md` records: *Visualization / Simulation | Mohammad /
Visual | `sceneGenerators/`, `visuals/`, `generateVisualizationCode.ts` | LIVE (flag-gated) |
ADR 12* — with Pappu listed as a forbidden editor.

That boundary is respected literally. Phase 2 authors nothing inside the production tier, and
its outputs there are **proposals requiring the runtime owner's acceptance**:

| ID | Handoff | Territory |
|---|---|---|
| **VH-1** | `TeachingDecision.visual_type` widens to the typed `VisualIntent` (§7) | Teaching Engine + ADR 08 — runtime owner |
| **VH-2** | ADR 12's Visual Policy table gains a `purpose` dimension alongside `strategy` (§6.5) | ADR 12 — runtime owner |
| **VH-3** | `a11yDescription` is strengthened from *present and non-empty* to *instructionally equivalent* (§11.2) | ADR 12 §4.5 — runtime owner |
| **VH-4** | RRM records the `VisualIntent` that produced each rendered visual, not only the visual (§8.2) | ADR 15 — runtime owner |
| **VH-5** | Bible §3/§6.8 gains a Phase 2 pointer; ADR 12 gains a scope note recording that its "when" is now supplied by VD-1 | Bible + ADR 12 — runtime owner |
| **VH-6** | Wave 0 gains Phase 2 stage items; W4-2 remains gated and is **not** unblocked by this document | Wave 0 — owner |
| **VH-7** | The **`VisualAvailability` projection** (§7.4) is published by the production tier — a coarse, one-directional capability summary containing no asset ids, cache keys, renderer names or spec payloads | ADR 12 — runtime owner |
| **VH-8** | **`representationDependence`** (§9.1) is added as a per-concept property of the learner model, with three levels | **ADR 10 Student Memory — runtime owner** |

**VH-8 is called out specifically.** v2.0.0 introduced `representationDependence` in §9.1
without a handoff, while presenting this list as complete — the learner model is ADR 10's, and
the governance registry lists the Brain/authoring owner as a forbidden editor of it. That was a
silent ownership shift, which is the exact anti-pattern Phase 1 §17.2 names ("assuming
territory"). It is now an explicit proposal requiring the runtime owner's acceptance, and
Phase 2's merge authorizes it no more than it authorizes VH-1…VH-7.

**Unresolved boundary carried forward.** Phase 1's OQ-10 — whether phase architecture documents
belong in `docs/architecture/`, which the registry assigns to the runtime owner — applies
identically here and is not re-litigated. Recorded as VQ-8.

### 0.4 A contradiction between two reused authorities (recorded v2.1.0)

Reconciliation must record contradictions it finds between the documents it reuses, not smooth
them. v2.0.0 marked ADR 12 and ADR 14 both "Reused" and treated their asset lifecycles as one
coherent model. **They are two different lifecycles**, and the divergence is verifiable:

| | ADR 12 §4.1 | ADR 14 |
|---|---|---|
| States | `'draft' \| 'active' \| 'deprecated'` (3) | `DRAFT → REVIEW → ACTIVE → DEPRECATED → RETIRED` (5), plus `EXPERIMENT_VARIANT` |
| Review step | none | `REVIEW`, with a curator queue |
| Terminal state | none — `deprecated` is terminal | `RETIRED` |
| Deprecation triggers | not enumerated | five, enumerated, evidence-driven |
| Uniqueness rule | none stated | at most one `ACTIVE` per `canonicalSlug` |

**This contradiction predates Phase 2 and is not Phase 2's to fix** — both documents belong to
the runtime owner. It is recorded as feedback **VF-5** (Appendix C) rather than resolved here.

**Phase 2's lifecycle target is ADR 14's**, and the choice is not arbitrary: Phase 2's only
lifecycle interaction is the *pedagogical retirement signal* (§12.4), which needs a destination
that has a review step, a curator queue and enumerated deprecation triggers. ADR 12's
three-state field has none of these; ADR 14's lifecycle has all three. Every reference in this
document to "the asset lifecycle" therefore means ADR 14's, and §12.4 says so explicitly.

---

## 1. Executive Summary

### 1.1 The question

> *How does an AI decide that a learner needs to see something — and, far more often, that they
> do not?*

The second half is the harder and more valuable half, and it is where existing systems fail.
A visual that carries no instructional load does not merely waste effort: it **adds extraneous
cognitive load and reduces learning**. This is among the best-established findings in
instructional research, and it means the default answer to "should we show a picture?" must be
*no*, overturned only by a stated reason.

Left to a language model, the answer is always yes. Generating a diagram is fluent, it looks
like effort, and it is rewarded by the appearance of richness. So the constraint must be
structural, exactly as Phase 1's answer-withholding was.

### 1.2 What Phase 2 adds

**(A) The missing layer is *why*, not *how*.** The repository has a great deal of visual
machinery: seven live pipelines, 31 scene generators, an asset model, a renderer taxonomy, a
cache, five validator layers. What it does not have — anywhere — is a statement of what a
visual is *for* on a given turn. ADR 12 answers "which renderer draws it." Nothing answers
"which pedagogical function must it perform, and what happens if none applies." **VD-2's Visual
Purpose Taxonomy is Phase 2's core contribution**, and it is what makes the decision auditable:
a visual with no declared purpose is not a weak visual, it is an illegal one.

**(B) The decision moves up, the production stays down.** ADR 12 §13 forbids the visual tier
from reading teaching state — it is a leaf. That constraint is correct, and it means a "Visual
Decision Engine" living inside the visual tier would be architecturally illegal. So VD-1 sits
in the *teaching* tier, alongside Phase 1's components, and communicates downward through a
single widened projection: the **VisualIntent** (§7). Today's `visual_type` is a bare renderer
hint carrying no justification; the VisualIntent carries purpose, the claim it must land,
constraints, and the fallback contract — while remaining a one-directional projection, so the
leaf rule is preserved rather than bent.

**(C) Visuals become evidence, not just delivery.** §9 is the section I would defend hardest.
A learner who can only succeed *with* the diagram has not mastered the concept; they have
mastered the diagram. Phase 2 makes **representation-dependence** a first-class, detectable
learner state, requires mastery to be verified in the absence of the supporting visual, and
formalizes the inverse: how a learner *manipulates* a simulation or *constructs* a diagram
(P47) is a richer diagnostic signal than anything they type. Visuals are both the most
seductive way to fake understanding and the most revealing way to detect it.

**(D) Degradation is designed, not incidental.** Assets are missing for most concepts — that is
the repository's honest steady state, not a temporary condition. VD-7 defines a fallback
hierarchy in which every rung still teaches, and in which the *purpose* survives even when the
form does not.

### 1.3 What Phase 2 deliberately does not do

It designs no renderer, no cache, no asset schema, no validator, no component, and no second
lifecycle. It does not unblock W4-2. It does not modify Phase 1. Where the brief's scope items
are already owned, §0.2 says so plainly rather than producing a parallel design that would have
to be reconciled away later — which is precisely the failure Phase 1 spent three review cycles
learning to avoid.

---

## 2. Design Principles

**VP1 · The default is no visual.**
A visual is admitted by justification, never by availability. "We have a diagram for this
concept" is not a reason to show it.

**VP2 · Every visual states its purpose and its claim.**
A visual exists to make one specific claim perceptible. Purpose and claim are recorded before
production. No purpose ⇒ no visual; two purposes ⇒ two visuals, or a simpler one.

**VP3 · Decide above, render below, project between.**
The pedagogical decision never reaches into the production tier, and the production tier never
reads teaching state. ADR 12 §13's leaf rule is preserved by construction.

**VP4 · The visual is a representation, not the concept.**
Every visual is one representation among several. Mastery is a property of the concept and MUST
be demonstrable without the representation that taught it.

**VP5 · Perception before reference.**
The system may not refer to a visual the learner has not demonstrably received. Inherited from
ADR 15; restated because VD-1 is where a violation would originate.

**VP6 · Load is the budget, not the canvas.**
A visual competes for the same working memory as the words beside it. Adding a channel is only
a gain when it *reduces* total load or carries structure prose cannot.

**VP7 · Interaction is instrumentation.**
Where a learner can manipulate or construct, that behaviour is evidence and MUST be captured as
such. A simulation used only for delivery wastes its most valuable property.

**VP8 · Degrade the form, never the purpose.**
When the intended visual is unavailable, the fallback must still attempt the same pedagogical
function. Silently dropping to prose is a defect, not a fallback.

**VP9 · Accessibility is an alternative path, not a caption.**
A description that does not carry the same instructional content as the visual is a failure of
the visual, not of the description.

**VP10 · Visual decisions are auditable and deterministic.**
The whole chain — purpose, claim, alternatives rejected, fallback taken — is recorded. The
decision procedure introduces no LLM call (Permanent Rule 9).

---

## 3. System Overview and Layer Model

```
 ┌──────────────────────── PERCEPTION (Plane 1, existing) ───────────────────────┐
 │  Learner Twin · mastery · misconceptions · load · accessibility profile       │
 └──────────────────────────────────┬───────────────────────────────────────────┘
                                    ▼
 ┌──────── CAMPAIGN SCALE (Phase 1, CANONICAL — extended, not modified) ─────────┐
 │  TQ-1 Strategy (archetype) · TQ-2 Arc (incl. VISUAL phase §5.4)               │
 │  TQ-3 Methods (M1 Visual Teaching, M7 Simulation) · TQ-4 Re-teaching          │
 └──────────────────────────────────┬───────────────────────────────────────────┘
                                    ▼
 ┌──────────────── PEDAGOGICAL VISUAL TIER  ★ PHASE 2 ──────────────────────────┐
 │                                                                              │
 │   ┌───────────────┐    ┌───────────────┐    ┌───────────────┐                │
 │   │ VD-1 DECISION │───▶│ VD-2 PURPOSE  │───▶│ VD-3 SELECTION│                │
 │   │ whether       │    │ why + claim   │    │ which form    │                │
 │   └───────┬───────┘    └───────────────┘    └───────┬───────┘                │
 │           │  no-visual + reason code (Phase 1 G7)   │                        │
 │           ▼                                          ▼                        │
 │   ┌──────────────────────────────────────────────────────────┐               │
 │   │ VD-4  VisualIntent  — typed, one-directional projection  │               │
 │   └──────────────────────────┬───────────────────────────────┘               │
 │   VD-5 campaign/strategy  ·  VD-6 mastery  ·  VD-7 fallback  ·  VD-8 a11y    │
 └──────────────────────────────┼───────────────────────────────────────────────┘
                                ▼   (leaf boundary — no back-reads, ADR 12 §13)
 ┌──────────── PRODUCTION VISUAL TIER (ADR 12 / 14 / 15, existing) ─────────────┐
 │  Visual Policy → renderer · asset cache · authoring backends · validators    │
 │  → render → RRM records what was actually shown                              │
 └──────────────────────────────────┬───────────────────────────────────────────┘
                                    ▼
 ┌──────────────────── EVIDENCE (Phase 1 TQ-7 · OSF · ADR 13) ──────────────────┐
 │  VD-9 visual process metrics feed the existing joins; no new evidence store  │
 └──────────────────────────────────────────────────────────────────────────────┘
```

**One-authority statement.** VD-1/2/3 decide *whether, why, which purpose*. ADR 12 decides
*which renderer and which asset*. `C-29` continues to decide advancement; Phase 2 supplies
evidence to it and never certifies mastery. ADR 15 continues to own what is on screen.

---

## 4. VD-1 · Visual Decision Engine

### 4.1 Purpose and boundary with Phase 1 §5.4

Phase 1 already defines four conditions for entering the arc's **VISUAL phase**. VD-1 is not a
replacement, and the distinction is precise:

- **Phase 1 §5.4** answers a *campaign-scale* question: does this concept's arc include a
  dedicated visual phase?
- **VD-1** answers a *turn-scale* question: does **this turn's** teaching act carry a visual —
  which can be true during EXPLANATION, EXAMPLES, GUIDED_PRACTICE or ASSESSMENT, not only
  during a VISUAL phase, and can be false *during* a VISUAL phase if the learner's state
  contraindicates it.

Both must hold for a visual to appear in a VISUAL phase; VD-1 alone governs every other phase.

### 4.2 The admission test

A visual is admitted only if **all four** hold. This is the structural expression of VP1.

```
 A1  PURPOSE       A purpose from VD-2's closed taxonomy applies, and the specific
                   CLAIM the visual must make is nameable in one sentence.
 A2  NECESSITY     The claim's structure is not linearizable in prose at this
                   learner's reading load — OR the visual demonstrably reduces
                   total load relative to the prose that would replace it.
 A3  CAPACITY      Current load headroom admits a second channel (VP6).
 A4  LEGALITY      Not prohibited by state, method, campaign history, or
                   accessibility profile (§4.4).
```

**A1 is the gate that does the work.** "Name the claim in one sentence" is deliberately a
severe test: a visual whose claim cannot be stated is decorative, and decorative visuals are
prohibited by Phase 1's M1 and by VP2.

### 4.3 When NOT to visualize — the enumerated contraindications

Given VP1, this list matters more than the admission test, and it is enumerated rather than
left to judgement. Each is a **hard no**, not a preference.

| # | Contraindication | Why |
|---|---|---|
| **N1** | The claim is definitional or conventional | A convention has no structure to reveal; a diagram of an arbitrary naming rule teaches the diagram |
| **N2** | The visual would carry the answer the learner is currently owed | Phase 1's withholding policy applies to every channel. A diagram that gives away the result is the same failure as telling |
| **N3** | Load is already at capacity | Adding a channel to a saturated learner reduces performance (VP6) |
| **N4** | An equivalent visual failed for this learner on this claim | Repetition without change; the Phase 1 axis-8/axis-3 rules apply (§8.3) |
| **N5** | Assessment of *unaided* recall is in progress | The visual becomes a scaffold and invalidates the evidence (§9.2) |
| **N6** | The learner is in RECOVERY | `C-31` preempts; a new representation during distress adds load when the need is safety |
| **N7** | The concept's mastery target is symbolic fluency and the learner is at the symbolic rung | Reverting to pictorial breaks the CPA chain's direction (P06→P07→P08) and can regress abstraction |
| **N8** | The visual would be the learner's *only* route to the claim, in a domain requiring representational flexibility | Manufactures representation-dependence (§9.1) |
| **N9** | Accessibility profile precludes the channel and no instructionally equivalent alternative exists | §11.3 — an inaccessible visual is not a partial win |
| **N10** | The turn is a CLOSING or SUMMARY act | Phase 1 protects the close; a new representation at closure creates an open loop |

Every no-visual outcome is recorded with its contraindication code.

#### 4.3.1 Relationship to Phase 1's gate G7 — corrected in v2.1.0

**v2.0.0 stated that G7's reason codes "gain the N-codes above." That was wrong**, in three
separate ways, and the correction matters more than the error: Phase 1 §8.3 defines G7's set as
**closed** — *"a reason outside the set fails the gate, and adding a reason requires an
amendment"* — so extending it silently would have modified a canonical document Phase 2 is
forbidden to touch. The supporting citation pointed at VH-2, which concerns ADR 12's Visual
Policy and is unrelated. And the forward reference to §12.3 resolved to nothing.

**The correct resolution requires no Phase 1 amendment at all**, because the two record
different things at different scales — the same distinction §4.1 already draws:

| | Phase 1 **G7** | Phase 2 **N-codes** |
|---|---|---|
| Scale | Campaign / arc | Turn |
| Question | Why did this *concept's arc* serve no non-verbal representation? | Why does *this turn* carry no visual? |
| Owner | Phase 1 (canonical, closed at four codes) | Phase 2 |
| Codes | VERBAL_CLAIM · CHANNEL_UNAVAILABLE · ASSET_ABSENT · LOAD_REDUCTION | N1…N10 |

**N-codes do not extend G7. They are a Phase 2-owned turn-scale record**, and G7 is untouched.

The two meet only in one case: when an arc's VISUAL phase completes having served no non-verbal
representation, G7 must be answered. Only **persistent** contraindications can produce that
outcome, and each maps to an existing Phase 1 code — no new code is required:

| Persistent contraindication | Maps to Phase 1 G7 code |
|---|---|
| N1 definitional/conventional claim | `VERBAL_CLAIM` |
| N3 load at capacity throughout | `LOAD_REDUCTION` |
| N6 sustained RECOVERY | `CHANNEL_UNAVAILABLE` (learner context precludes it) |
| N9 accessibility profile precludes the channel | `CHANNEL_UNAVAILABLE` |
| *(no form available — VD-7 rung F8)* | `ASSET_ABSENT` |

The remaining six — **N2** (would reveal an owed answer), **N4** (an equivalent visual already
failed), **N5** (unaided assessment in progress), **N7** (symbolic-rung mismatch), **N8**
(dependence risk) and **N10** (closing act) — are **transient turn conditions**. None persists
across an entire arc phase: the answer stops being owed, the assessment ends, the close
completes. So none can produce an arc-scale no-visual outcome, and none ever needs a G7 code.

**This is why no handoff is required.** Phase 1 is untouched, its closed set stays closed at
four, and the mapping above is Phase 2's own record of how its turn-scale codes project onto
Phase 1's arc-scale gate when — and only when — the gate is implicated.

### 4.4 Inputs

CPA position (from the primitive grammar: is the learner at P06, P07 or P08 for this claim?),
concept structural type, current arc phase and teaching state, load estimate, accessibility
profile, campaign visual history (via RRM), active misconceptions, method in flight, and the
Difference Operator's failed-attempt set.

**CPA position is the primary input**, and this is the design's grounding: the visual question
is fundamentally *where on the concrete→pictorial→abstract chain does this learner stand for
this claim?* P07 PERCEPTUAL REPRESENTATION is the visual primitive; the CPA grammar already
orders it. Phase 2 does not invent a decision framework — it reads one that the FINAL primitive
architecture already established.

### 4.5 Determinism

The procedure is a deterministic evaluation over typed inputs. It MUST NOT invoke a model.
This is required by Permanent Rule 9 (no second LLM call per turn) and by VP10, and it is why
the admission test is expressed as four boolean conditions over state rather than as a
judgement.

### 4.6 Responsibilities

Owns the whether-decision and its recorded justification. **Must not own** purpose definitions
(VD-2), form selection (VD-3), renderer or asset choice (ADR 12), arc phase (Phase 1 TQ-2),
advancement (`C-29`), or what is on screen (ADR 15).

### 4.7 Failure modes

- **Justification theatre.** A1 is satisfied by a purpose label attached without thought. This
  is the dominant risk and it is measured, not prevented: §12.3 tracks purpose distribution;
  a system where one purpose dominates is not justifying, it is labelling.
- **Over-suppression.** N1–N10 are conservative and could starve visual-dependent domains
  (geometry, mechanics, molecular structure). Measured as visual-admission rate per subject
  against an authored expectation; sustained divergence is a defect against the contraindication
  set, not against the subject.
- **CPA position unavailable.** Where the learner's CPA rung is unknown, VD-1 SHOULD default to
  admitting P07 for a first encounter and to withholding for a re-teach, and record the
  uncertainty — the asymmetry follows Phase 1's asymmetric-caution principle.

---

## 5. VD-2 · Visual Purpose Taxonomy

### 5.1 Why this is the core contribution

The repository can render a great deal and justify none of it. ADR 12's `VisualRenderer` is a
taxonomy of *mechanism* — KaTeX, scene spec, dynamic component. There is no taxonomy of
*function*. Without one, "should we show a visual?" has no principled answer, "which visual?"
degenerates to whatever is cached, and no metric can ask whether visuals are helping, because
nothing states what they were for.

### 5.2 The taxonomy

**Closed set.** Closure is deliberate, for the same reasons Phase 1 closed its archetype and
method sets: an open set cannot accumulate effectiveness evidence, cannot be tie-broken
deterministically, and cannot be audited. Extension is by versioned amendment (§16.4).

**Grounding is by primitive *composition*, not by a single primitive** (strengthened v2.1.0).
v2.0.0 grounded six of ten purposes in bare P07, which made the grounding criterion nearly
inert as a discriminator — six purposes sharing one grounding cannot be told apart by it.
Because the FINAL primitive architecture establishes that anything above a primitive *is* a
composition (§0.2 C-3), each purpose is now grounded in the composition it actually names, and
each composition is distinct.

| # | Purpose | The claim it makes perceptible | Grounding composition | Characteristic failure |
|---|---|---|---|---|
| **VP-A** | **STRUCTURE-REVEAL** | "This thing has these parts in this arrangement" | P07 alone — the base case | Learner recalls the picture's layout, not the structure |
| **VP-B** | **PROCESS-TRACE** | "This changes over time/steps in this order" | P14 → P07 → P15 (predict, show, observe) | Learner watches; nothing predicted, so nothing tested |
| **VP-C** | **RELATION-MAP** | "These entities relate in this way" | P07 + P16 COMPARISON over entity pairs | Decorative concept map; relations unlabelled |
| **VP-D** | **QUANTITY-SENSE** | "This magnitude compares to that one thus" | P07 + P16 over *magnitudes* | Reads values off; never internalizes scale |
| **VP-E** | **CONTRAST-DISCRIMINATE** | "These two differ *here* and only here" | **P17 CONTRAST** — one dimension varied | Varies more than one dimension; learns the pair, not the boundary |
| **VP-F** | **MODEL-EXTERNALIZE** | "Here is the mental model you should be running" | P26 SCHEMA ACTIVATION → P07 → P14 | Model accepted as a picture, never operated |
| **VP-G** | **ATTENTION-DIRECT** | "Look *here* — this is the load-bearing detail" | P07 *annotating an existing* P07 — the only recursive purpose | Highlights the salient rather than the important |
| **VP-H** | **MEMORY-OFFLOAD** | "Hold this externally so working memory is free" | P07 held *persistently* alongside another primitive | Becomes a permanent crutch → representation-dependence (§9.1) |
| **VP-I** | **LEARNER-CONSTRUCT** | *(inverted)* "Show me your model by drawing it" | **P47 DIAGRAM CONSTRUCTION** | Graded as art rather than read as diagnosis |
| **VP-J** | **MANIPULATE-DISCOVER** | "Change this and observe what follows" | P14 → learner action → P15 → P25 abstraction | Play without extraction (Phase 1 M7's guard) |

Distinctness now holds on all three of §16.4's criteria rather than two: no two purposes share a
grounding composition, a claim type, and a characteristic failure.

**VP-H is a constrained purpose, not a free one** (clarified v2.1.0). Review correctly observed
that its characteristic failure *is* representation-dependence — the exact harm §9.1 exists to
detect. It is retained because deliberate external memory is genuinely instructional while a
schema is being built, but it is the one purpose that carries a mandatory obligation:

> **A visual admitted under VP-H MUST carry a withdrawal plan** — a stated point at which the
> offload is removed and a withdrawal probe (§9.1) is scheduled. VP-H without a withdrawal plan
> is not admitted. It is the only purpose that manufactures its own failure mode if left
> unbounded, so it is the only one that must declare in advance how it ends.

**Three properties of the set:**

- **VP-I and VP-J invert the direction of information.** In VP-A…VP-H the system shows and the
  learner receives. In VP-I and VP-J the learner produces and the system *reads*. These are the
  instrument purposes, and they are where §9.3's evidence comes from. A visual architecture
  containing only the first eight is a delivery architecture.
- **Every purpose has a characteristic failure.** As with Phase 1's archetypes, a purpose
  without an observable failure signature is inadmissible — it cannot be diagnosed against or
  improved.
- **Each is grounded in an existing primitive.** No purpose invents pedagogy; each names the
  primitive it serves.

### 5.3 The claim statement

Every admitted visual carries a **claim** — one sentence, in the concept's own terms, naming
what this visual must make perceptible. Not a title, not a caption: the proposition.

*"The bisector meets the opposite side at a point that divides it in the ratio of the adjacent
sides"* is a claim. *"Triangle diagram"* is not.

The claim is load-bearing in four places: it is A1's admission test; it is what VD-3 selects a
form against; it is what the accessibility description must convey (§11.2); and it is what
§12.2's pedagogical quality standard is evaluated against. **A visual whose claim cannot be
written is not admitted** — which is the mechanism by which decoration becomes structurally
impossible rather than merely discouraged.

### 5.4 Purpose ⇒ form-class affinities

Advisory (VD-3 decides), and deliberately not renderer-level — renderers are ADR 12's.

| Purpose | Natural form classes | Contra-indicated forms |
|---|---|---|
| VP-A Structure | labelled static diagram, exploded view | animation (motion distracts from static structure) |
| VP-B Process | stepped sequence, animation with prediction points | single static frame |
| VP-C Relation | graph/network, matrix | free-form illustration |
| VP-D Quantity | plot, scaled comparison, number line | schematic without scale |
| VP-E Contrast | side-by-side minimal pair | any single image |
| VP-F Model | schematic with named parts + operating rule | photorealism (detail obscures the model) |
| VP-G Attention | annotation/overlay on existing visual | a *new* visual (which resets orientation cost) |
| VP-H Offload | reference table, persistent panel | animation (transient by nature) |
| VP-I Construct | blank/partial canvas, sorting surface | any completed visual (destroys the task) |
| VP-J Manipulate | bounded interactive with observable state | video (non-interactive by definition) |

---

## 6. VD-3 · Visual Selection Engine

### 6.1 Purpose and the boundary with ADR 12's Visual Policy

Two selections happen, at two layers, and conflating them would duplicate ADR 12:

- **VD-3 (pedagogical)** selects a **purpose-satisfying form class** and the constraints it must
  honour, given the learner, the campaign, and what they have already seen.
- **ADR 12 §4.3 (production)** selects the **renderer and concrete asset**, by cache lookup over
  accepted renderers.

VD-3 outputs a form class and constraints; ADR 12 maps those to renderers. VH-2 proposes adding
`purpose` alongside `strategy` in ADR 12's policy table so the mapping has the input it needs —
a request into the runtime owner's territory, not a change made here.

### 6.2 The selection funnel

Deliberately shaped like Phase 1's funnels so the mechanisms read as one family.

```
 VS1  AUTHORED OVERRIDE — the concept's Blueprint or Protocol names a visual
      for this claim → that IS the selection. Authored beats derived.

 VS2  PURPOSE FIT — cut form classes outside VD-2 §5.4's row for this purpose.

 VS3  CPA ADMISSIBILITY — cut forms whose concreteness is below the learner's
      established rung (regression) or more than one rung above it (a leap).
      Grounded in P06→P07→P08; enforces Phase 1 §0.2 C-2.

 VS4  LEARNER CONSTRAINTS — accessibility profile, reading load, device and
      channel capability, age band, attention span.

 VS5  HISTORY EXCLUSION — cut forms that failed for this learner on this claim;
      cut forms already shown this campaign unless the purpose is VP-G
      (ATTENTION-DIRECT), which by definition annotates something already seen.

 VS6  LOAD ADMISSIBILITY — cut forms whose element count exceeds current
      headroom. Interactive forms carry the highest intrinsic load.

 VS7  AVAILABILITY — cut form classes absent from the concept's
      VisualAvailability projection (§7.4). Filters against a COARSE,
      one-directional projection only: never a catalogue query, never an
      asset id, never a cache key, never a renderer name. Never generate
      in-turn (ADR 12 §4.4). A miss does not fail the turn — it routes to
      VD-7's fallback ladder.

 VS8  TIE-BREAK — population effectiveness for this purpose on this concept,
      sourced from the Evidence Engine (ADR 13) and INERT until that evidence
      exists; then a deterministic seed (learner + concept + turn), so replay
      is exact.
```

**VS7 and VS8 are deliberately the weakest filters, and both are bounded** (revised v2.1.0).
They are the two that reach toward the production and evidence tiers respectively, so each is
constrained to a value published *to* the pedagogical tier rather than a read *into* another
tier: VS7 consumes the availability projection defined in §7.4; VS8 consumes ADR 13's
effectiveness scores and defines no effectiveness model of its own. **Until ADR 13 evidence
accumulates, VS8 reduces to the deterministic seed** — the same posture Phase 1's own tie-break
filter takes for the same reason.

**Empty-funnel behaviour.** Not an error. It routes to VD-7 (§10) with the purpose preserved,
and emits a visual-coverage defect naming the concept, the claim and the purpose. That defect
is the single most useful authoring signal this architecture produces (§12.4).

### 6.3 Diagrams

The dominant case. Governed entirely by purpose: a diagram serving VP-A must show parts and
arrangement and may omit dynamics; one serving VP-E must vary exactly one dimension between
panels — a diagram that varies two is a defect against VP-E regardless of its visual quality.
Rendering, spec format and validation are ADR 12's.

### 6.4 Simulations and interactive blocks

An interactive block is admitted only for **VP-J MANIPULATE-DISCOVER** or **VP-I
LEARNER-CONSTRUCT**. Using an interactive for a claim a static diagram would carry is a load
error, not a richness gain.

Three requirements, all inherited or extended from existing pedagogy rather than invented:

1. **Bounded state space.** The learner must be able to reach the instructive states without a
   search. An unbounded sandbox is exploration, not teaching.
2. **Prediction before manipulation.** Inherited from Phase 1 M5/M7 and primitive P14 — a
   manipulation without a committed prediction is television with a slider.
3. **Extraction is mandatory.** The learner must state the rule in their own words, and mastery
   must be re-verified **outside** the simulation. This is Phase 1 M7's chocolate-covered-broccoli
   guard, and §9.2 makes it a gate rather than an instruction.

### 6.5 Interface to the production tier

VD-3 emits form class + constraints inside the VisualIntent (§7). It never names a renderer, a
cache key, or an asset id — those are ADR 12's vocabulary and reaching into them would breach
the tier boundary in the opposite direction.

---

## 7. VD-4 · The VisualIntent Projection

### 7.1 Why the interface is the architecture

ADR 12 §13 states the constraint plainly: *"The Teaching Engine's `visual_type` field is the
only input the Visual tier may receive from the Teaching chain. The Visual tier may not read
`TeachingDecision`, `TeachingAction`, or `LessonPlan`."* The visual tier is a leaf.

That rule is correct — it is what stops the visual subsystem becoming a second reader of
teaching state and eventually a second decider. But it creates a real problem: `visual_type`
is a bare renderer hint. It carries no purpose, no claim, no constraints, no fallback contract.
So the production tier cannot tell a decorative request from a load-bearing one, and cannot
degrade intelligently, because it does not know what the visual was *for*.

**Phase 2's resolution: widen the projection, not the coupling.** The VisualIntent replaces
`visual_type` with a typed, self-contained value object. It is still a one-directional
projection; the visual tier still reads exactly one field and still calls into nothing. The
leaf rule is preserved *by construction* rather than by restraint.

### 7.2 The object

```
VisualIntent {
  purpose            -- VD-2, one value from the closed set. REQUIRED.
  claim              -- one sentence, the proposition to be made perceptible. REQUIRED.
  formClass          -- VD-3's output; a class, never a renderer
  cpaRung            -- concrete | pictorial | abstract — the target rung
  constraints {
      maxElements            -- load ceiling
      mustVaryExactlyOne     -- set for VP-E; a contract the producer must honour
      mustNotReveal[]        -- claims the visual must not give away (N2)
      interactionRequired    -- true only for VP-I / VP-J
      channelsAvailable[]    -- from the accessibility profile
  }
  a11yRequirement    -- the instructional content the description MUST convey (§11.2)
  fallbackContract   -- the ordered degradation path VD-7 authorized for this intent
  provenance {
      decisionId, admittedBy, alternativesRejected[], contraindicationsCleared[]
  }
}
```

**Three fields carry the design.**

`claim` makes the intent self-describing. A producer receiving a claim can validate its output
against it, and a fallback can attempt the same claim in another form. `visual_type` could
never support either.

`fallbackContract` is decided *above* and executed *below*. The production tier must not
improvise a degradation, because it lacks the pedagogical context to know which loss is
acceptable — VD-7 does.

`provenance.alternativesRejected[]` is mandatory, for the same reason Phase 1 made it mandatory:
a decision record stating only what was chosen cannot be debugged, and counterfactual analysis
is impossible without it.

### 7.3 Directionality invariants

- **VI-1** The VisualIntent flows downward only. The production tier returns rendered-result
  facts to the Ledger and to RRM; it never returns a decision.
- **VI-2** The production tier MUST NOT read any teaching-tier object. The VisualIntent is the
  complete interface.
- **VI-3** The production tier MAY refuse an intent it cannot satisfy. Refusal is a typed
  outcome, and it triggers the `fallbackContract` rather than an error.
- **VI-4** The pedagogical tier MUST NOT read renderer internals, cache state, asset ids, spec
  payloads, or any production-tier implementation detail. It learns only *what was ultimately
  shown* (through RRM) and *what classes of form are available* (through the projection in
  §7.4, and through nothing else).

VI-4 is the symmetric constraint, and it matters: without it Phase 2 would slowly acquire
knowledge of ADR 12's internals and the boundary would erode from above.

- **VI-5** The **VisualAvailability projection is the sole exception to VI-4**, and it is
  bounded by construction (§7.4). It is *published* by the production tier, never *queried* by
  the pedagogical tier — so the production tier still calls into nothing, and the leaf rule is
  strengthened rather than weakened.

### 7.4 The VisualAvailability projection (added v2.1.0)

**Why it exists.** Review found a genuine contradiction in v2.0.0: VS7 asked "does an asset
exist?", which is a read of ADR 12's catalogue, while VI-4 forbade exactly that. Either VS7
could not execute or the leaf isolation was broken on every turn. The contradiction was real
and the acceptance criterion asserting leaf preservation was false as written.

**The resolution is a second one-directional projection, in the opposite direction to the
VisualIntent.** It carries capability, not content.

```
VisualAvailability {
  conceptId
  formClassesAvailable[]        -- pedagogical form classes only (§6.1)
  formClassesGenerableInTurn[]  -- deterministically producible without
                                --   entering the turn's latency budget
  projectionVersion
}
```

**What it MUST NOT contain**, enumerated because the value of the boundary is entirely in what
is excluded: asset ids · cache keys · renderer names or the `VisualRenderer` enum · spec
payloads · quality scores · asset counts · lifecycle status · any production identifier.

Everything excluded is something whose presence would let the pedagogical tier reason about
ADR 12's internals — which is how the boundary would erode. Form classes are Phase 2's own
vocabulary (§6.1), so the projection is expressed entirely in terms the pedagogical tier
already owns.

**Directionality.** The production tier computes and publishes the projection as a value. The
pedagogical tier reads it. **No call crosses the boundary in either direction**, so
`DEPENDENCY_RULES.md`'s leaf rule — "everything calls into it; it calls into nothing" — holds
exactly as written. This is why the fix is a projection rather than a lookup API: an API would
have been a call, and a call would have been a coupling.

**Staleness is acceptable and is why the projection is coarse.** It answers "could a diagram
for this concept plausibly be served?", not "which asset will be served?" A wrong answer costs
one fallback-ladder step (§10.2), never a failed turn — which is precisely the error tolerance
that lets the projection stay coarse enough to remain a boundary.

---

## 8. VD-5 · Campaign and Strategy Interaction

### 8.1 Strategy archetype shapes visual purpose

Phase 1's nine archetypes have genuinely different visual profiles, and this is where visuals
stop being a generic feature and become part of a teaching approach.

| Archetype | Characteristic purposes | Notes |
|---|---|---|
| A1 CONCRETE-FIRST | VP-I, then VP-A | Visual follows manipulation; P06 precedes P07 |
| A2 DERIVATIONAL | VP-G, VP-H | Attention-direction along the chain; offload to free WM for the derivation |
| A3 CONTRASTIVE | **VP-E** | Contrast is the archetype; a non-contrastive visual undercuts it |
| A4 NARRATIVE | VP-B | Process-trace carries story structure |
| A5 MODEL-BUILDING | **VP-F**, then VP-J | Externalize the model, then operate it |
| A6 PROCEDURAL-COACHING | VP-B, VP-G | Step trace with attention on the failure-prone step |
| A7 SOCRATIC-DISCOVERY | VP-I, VP-J | Learner-produced; a *shown* visual can pre-empt the discovery |
| A8 ANALOGICAL-TRANSFER | VP-C | Relation-map across domains — the mapping is the content |
| A9 EXPERIENTIAL-SIMULATION | **VP-J** | The archetype's defining purpose |

**A7 carries a specific hazard.** Showing a completed visual during a discovery campaign can
deliver the very insight the learner was to construct — contraindication N2 applied to the
visual channel. A7's default is learner-produced (VP-I), not tutor-shown.

### 8.2 Campaign visual memory

A campaign spans turns and sessions, so "what has this learner already seen for this concept" is
campaign-scale state. **Phase 2 introduces no new store.** ADR 15's Rendered Reality Model
already records what was rendered; VH-4 proposes that RRM additionally record the
`VisualIntent` that produced each entry, which turns a log of pictures into a log of
*pedagogical attempts* — queryable by purpose and claim, which is what VS5 and §12 need.

Three campaign rules:

- **CV-1 · Orientation cost is paid once.** Re-showing an established visual costs less than a
  new one. Prefer VP-G annotation of a known visual over a new visual for a related claim.
- **CV-2 · Representation count is bounded per concept.** Beyond a small number of distinct
  representations for one concept, the learner is integrating representations rather than
  learning the concept. The bound is a campaign budget, not a per-turn rule.
- **CV-3 · A visual established in a campaign persists as shared reference.** Later turns may
  refer to it — subject to VP5, perception-before-reference, which RRM enforces.

### 8.3 Visual re-teaching uses Phase 1's operator unchanged

**Phase 2 defines no separate visual difference rule.** A visual re-teach is an ordinary move
under Phase 1's eight-axis Difference Operator:

- introducing a visual where prose failed → primary axis **1 (channel)**, with representation
  and instance in closure;
- a different *kind* of visual for the same claim → primary axis **3 (representation)**;
- the same form at a different abstraction level → primary axis **4 (concreteness)**;
- **a different instance of the same form** (a second diagram of the same class) → primary axis
  **8 (instance)**, which forces nothing and is the cheapest legal visual change.

Axis 8's per-method distinctness predicate applies: for M1 Visual Teaching, a genuinely
different instance requires a **different organizing principle**, not a restyle. Two diagrams
differing only in colour are the same attempt, and the operator correctly rejects the second as
paraphrase.

This reuse is deliberate and is the strongest evidence the two phases compose: the hardest part
of visual adaptation was solved at Phase 1 and needed no visual-specific machinery.

---

## 9. VD-6 · Visuals and Mastery

The section with the most consequence, and the one most likely to be got wrong by a system that
treats visuals as delivery.

### 9.1 Representation-dependence

**The failure.** A learner who succeeds only while the diagram is present has not mastered the
concept. They have mastered *the concept-with-the-diagram*, which is a different and much
narrower competence. Because the visual makes performance look strong, this failure is
invisible precisely when it is most advanced — the same structure as Phase 1's fast-and-wrong
dangerous quadrant.

**Phase 2 PROPOSES it as a first-class learner state — handoff VH-8, not an enacted change.**
`representationDependence` would be a per-concept property of the learner model, which is
ADR 10's territory and the runtime owner's to accept or decline. Three levels:

```
 INDEPENDENT   performs unaided, in a representation not used to teach it
 SUPPORTED     performs with the taught representation; degrades markedly without it
 DEPENDENT     performs only with the taught representation present
```

**Detection** is a *withdrawal probe*: pose an equivalent item with the visual absent, at least
one turn after a supported success, at matched difficulty. A large performance gap between the
supported and withdrawn conditions is the signature. This is a scheduled instrument, not an
inference — Phase 1's principle that verified state is *manufactured by deliberate probes*
rather than recalled from transcripts applies directly.

**Treatment** is not visual removal, which merely fails the learner. It is deliberate
representational variation: teach the same claim in a second representation (P60 VARIATION,
P86 MODALITY SWITCHING), then withdraw both.

### 9.2 Mastery gates

Three rules, expressed as constraints on evidence rather than advice.

- **MG-1 · No mastery gate may be passed with a supporting visual present.** A visual during an
  unaided-assessment item is a scaffold, and the item's evidence is downgraded to *supported*.
  This is contraindication N5 as an evidence rule, and it is what stops visuals inflating
  mastery.
- **MG-2 · Simulation success is not concept mastery.** Mastery demonstrated inside a simulation
  must be re-verified outside it before any gate is passed. Phase 1 M7's guard, promoted from a
  method prohibition to a gate.
- **MG-3 · Phase 2 never certifies mastery.** VD-6 produces evidence; `C-29` decides
  advancement (Phase 1 §5.0 SYNC-1/SYNC-3). No visual outcome advances a learner directly.

MG-1 and MG-2 will make some learners look *less* masterful than today's system reports. That
is the point: the current number is partly an artifact of scaffolded assessment.

### 9.3 Visuals as instruments (VP-I, VP-J)

The inverse and under-exploited direction. What a learner **constructs** or **manipulates**
exposes mental models that language conceals — a learner who cannot articulate a misconception
will often draw it without hesitation.

| Signal | Reads as evidence of |
|---|---|
| What is drawn first (P47) | What the learner takes as structurally primary |
| What is omitted | Absent components of the mental model — usually a cleaner signal than what is present |
| Spatial/proportional errors | Quantitative misconceptions invisible in prose |
| Manipulation search pattern (VP-J) | Whether a causal model is being run or parameters are being guessed |
| Which variable is changed first | The hypothesized causal driver |
| Self-correction during construction | Active monitoring — a strong positive signal |

**Capture requirement.** Where a learner constructs or manipulates, that trace MUST be captured
as observation (VP7). A simulation used only for delivery discards its most valuable property.
Construction is graded as *diagnosis*, never as artwork — a rough sketch with correct structure
is strong evidence; a neat drawing with a missing relation is not.

### 9.4 Visuals and misconceptions

Two directions, both consequential:

- **Diagnostic.** A constructed diagram can surface a misconception faster than questioning,
  and its verbatim structural error is misconception evidence under the existing ledger.
- **Iatrogenic.** A visual can *create* a misconception — the classic case being a diagram whose
  incidental features are read as essential (the always-horizontal lever, the always-equilateral
  triangle). This is misconception **birth type 4 (notation/representation-induced)** in the
  existing taxonomy, and Phase 2 requires that a visual's *incidental* features be distinguished
  from its *essential* ones in the claim, so that variation can be designed rather than
  discovered after the misconception forms.

---

## 10. VD-7 · Fallback Hierarchy and Graceful Degradation

### 10.1 The steady state is scarcity

Assets are absent for most concepts and will remain so for a long time. Degradation is therefore
the **normal path**, not an exception, and must teach — VP8.

### 10.2 The ladder

Ordered by fidelity to the *purpose*. Each rung attempts the same claim.

```
 F0  Authored asset for this claim, purpose-matched          — ideal
 F1  Authored asset for an adjacent claim, purpose-matched   — narrower but true
 F2  Parametric/deterministic generation (no LLM in-turn)    — ADR 12's inline path
 F3  Different form class, same purpose                      — Phase 1 axis-3 change
 F4  STRUCTURED PROSE SUBSTITUTE                             — see below
 F5  Purpose-preserving substitution in another modality     — physical/enactive
     (e.g. "fold a paper along the diagonal" instead of a diagram)
 F6  Learner construction (VP-I)                             — often BETTER than F0
 F7  Defer the claim to a later turn with an authored asset  — legal; not failure
 F8  Proceed without the visual, purpose recorded unmet      — emits a coverage defect
```

**F4 is not "give up and write prose."** A structured prose substitute is prose *organized by
the purpose*: for VP-A, an explicit part-by-part enumeration with arrangement stated; for VP-E,
an explicit one-dimension-at-a-time comparison. Unstructured prose is F8, not F4, and the
distinction is what stops the ladder collapsing into its own last rung.

**F6 deserves its position.** When no asset exists, asking the learner to draw the thing is
frequently *superior* to showing them one — it converts an absence into an instrument (§9.3).
That a scarcity fallback outperforms the ideal in some conditions is a genuine finding, not a
consolation, and §12 measures it.

**F5 and multi-modal teaching.** The channel axis is Phase 1's axis 1; P86 MODALITY SWITCHING is
the primitive. A purpose can often be served enactively or aurally when visually unavailable —
and for a learner with a reading-load signature or a visual accessibility need, F5 may be the
*primary* path rather than a fallback (§11.3).

### 10.3 Degradation rules

- **D1** The chosen rung is recorded on the turn; an unrecorded degradation is a defect.
- **D2** Degradation never silently drops the purpose. If no rung serves it, that is F8 and it
  emits a coverage defect.
- **D3** The learner is never shown a failure. They receive teaching at whatever rung was
  reached — inherited from `C-36`'s degrade-but-always-serve-something rule.
- **D4** The fallback path is authorized *above* (in the `fallbackContract`) and executed
  *below*. The production tier does not choose pedagogical losses.
- **D5** Repeated F7/F8 for the same claim escalates from a per-turn defect to an authoring
  priority item (§12.4).

---

## 11. VD-8 · Accessibility

### 11.1 Position

ADR 12 §4.5 already makes `a11yDescription` mandatory and non-empty, and makes an asset without
one ineligible for ACTIVE. That requirement is reused, not re-designed. Phase 2 adds the
*standard the description must meet* and the *alternative-path rule*, both of which are
pedagogical and therefore in this tier.

### 11.2 Instructional equivalence (VH-3)

**Non-empty is too weak a bar.** "Diagram of a triangle" satisfies it and teaches nothing.

> **The standard: a description satisfies the requirement only if a learner who receives the
> description alone can make the same claim the visual was admitted to make.**

Operationally, the description is evaluated against the intent's `claim` (§5.3) — which is why
the claim is carried in the VisualIntent and surfaced as `a11yRequirement`. This is a
strengthening of ADR 12 §4.5's validator layer 1 and is recorded as handoff VH-3, not applied
here.

**A description that cannot meet the standard indicts the visual, not the description** (VP9).
If the claim cannot be conveyed in words at all, the visual is carrying genuinely
non-linearizable structure — in which case an *alternative path* is required, not a better
caption.

### 11.3 Alternative paths

The accessibility profile is an **input to the decision**, not a post-hoc adaptation. Concretely:

- It enters VD-1 as contraindication **N9** and VD-3 as filter **VS4**, so an inaccessible form
  is never selected in the first place.
- Where a purpose cannot be served in an available channel, VD-7's **F5** provides a
  purpose-preserving substitution in another modality — a first-class path, not a downgrade.
- **The accommodate-vs-measure boundary is preserved.** Where the visual channel *is* the
  assessed competence (reading a graph in a data-literacy concept), substitution accommodates
  the learner but does not measure the target skill, and the evidence MUST be recorded as
  accommodated rather than silently counted as equivalent. This mirrors the boundary the
  existing corpus already draws for oral assessment of decoding.

---

## 12. VD-9 · Visual Quality Standards and Metrics

### 12.1 Boundary

Phase 1 TQ-7 owns process quality; OSF owns outcomes; ADR 13 owns evidence storage; ADR 12 §4.6
owns *technical* validation. **VD-9 owns pedagogical visual quality only, and introduces no new
evidence store.** Its metrics are dimensions within Phase 1's existing tiers.

### 12.2 The pedagogical quality standard

Technical validity (renders, schema-valid, a11y present) is ADR 12's. A technically perfect
visual can still be pedagogically wrong. Seven criteria, evaluated against the intent:

| # | Criterion | Failure |
|---|---|---|
| **Q1** | **Claim fidelity** — makes the stated claim perceptible | Beautiful, correct, and about something else |
| **Q2** | **Signal-to-decoration** — every element serves the claim | Extraneous load |
| **Q3** | **One-dimension discipline** (VP-E) — exactly one dimension varies | Teaches the pair, not the boundary |
| **Q4** | **Essential-vs-incidental marked** | Manufactures birth-type-4 misconceptions (§9.4) |
| **Q5** | **Load within budget** — element count within the intent's ceiling | Exceeds capacity |
| **Q6** | **CPA placement correct** — at or one rung above the learner | Regression or a leap |
| **Q7** | **Instructional equivalence achievable** (§11.2) | Inaccessible in substance |

**Q1 and Q4 are the two that a technically-focused review will miss**, and they are the two that
cause the most damage — one wastes the turn, the other creates a misconception.

### 12.3 Metrics

**Process (Phase 1 TQ-7 Tier A):** visual admission rate; contraindication distribution (which
N-codes fire); **purpose distribution** — the key integrity metric, since a system where one
purpose dominates is labelling rather than justifying; fallback-rung distribution;
purpose-unmet (F8) rate; decoration-rejection rate.

**In-lesson (Tier B):** post-visual unaided success; **withdrawal-gap** (supported minus
withdrawn performance) — the direct representation-dependence measure; construction-diagnosis
yield (misconceptions surfaced per VP-I turn); manipulation-to-extraction conversion for VP-J.

**Retention (Tier C, OSF-owned):** the question that matters — does a concept taught with a
visual retain better *when tested without it*? Phase 2 supplies the process side of the join
and does not compute the outcome.

**Attribution (Tier D):** effectiveness per purpose × concept × learner state, which is what
lets the visual library improve rather than merely grow.

**Counter-metrics.** Visual admission rate rising without a corresponding Tier B gain is the
signature of decorative drift. A falling withdrawal-gap is the clearest evidence visuals are
building transferable competence; a rising one means they are building dependence. **Visual
richness MUST NOT be an objective at any level** — the same structural prohibition Phase 1
places on engagement, and for the same reason: it inverts into the failure the architecture
exists to prevent.

### 12.4 Retirement and authoring signals

- A visual whose Q1 fails repeatedly for one purpose is retired for that purpose (it may remain
  valid for another) — a *pedagogical* retirement signal feeding **ADR 14's** deprecation
  triggers and curator queue specifically, per §0.4's disambiguation. ADR 12's three-state field
  has no review step, no curator queue and no enumerated triggers, so it is not a viable
  destination for this signal. Phase 2 defines no second lifecycle.
- Repeated F7/F8 for one claim is a **visual coverage defect**, ranked by concept centrality.
  This is the highest-value authoring signal the architecture produces, because it names exactly
  what to author: a concept, a claim, and a purpose.

---

## 13. Interfaces

**Principles.** Constraints flow down, evidence flows up. Pure and typed where possible, so
replay is exact. Versioned, with the version in the decision record. No component reads
another's internals.

| From | To | Payload | Direction |
|---|---|---|---|
| Plane 1 Twin | VD-1 | CPA rung, load, accessibility profile, misconceptions | down |
| Phase 1 TQ-1/TQ-2/TQ-3 | VD-1 | archetype, arc phase, method in flight | down |
| ADR 15 RRM | VD-1, VD-3 | campaign visual history (what was shown, and — VH-4 — with which intent) | up |
| VD-1 | VD-2 | admission + contraindications cleared | across |
| VD-2 | VD-3 | purpose + claim | across |
| VD-3 | VD-4 | form class + constraints | across |
| **VD-4** | **ADR 12 production tier** | **`VisualIntent`** — the sole interface (VI-2) | **down** |
| ADR 12 | Ledger / RRM | rendered result, refusal, or fallback taken | up |
| VD-6 | `C-29` | visual-derived evidence — never a mastery verdict (MG-3) | up |
| VD-9 | Phase 1 TQ-7 | visual process metrics as dimensions in existing tiers | across |
| VD-7 | authoring queue | visual coverage defects (concept, claim, purpose) | up |

**The one constraint contract**, narrowing-only, consistent with Phase 1's Band 2 pattern:

```
VisualConstraint { forbiddenForms[], maxElements, mustNotReveal[], requiredChannels[] }
```

It may remove options from what the production tier may serve and may never add one — the same
invariant that keeps Phase 1 from legalizing an illegal action.

---

## 14. Risks

| # | Risk | Sev | Likelihood | Mitigation | Residual |
|---|---|---|---|---|---|
| **VR1** | **Empty visual libraries.** Most concepts have no authored asset for most purposes | High | **Certain** | VD-7's ladder is designed for scarcity; F6 turns absence into instrumentation; coverage defects rank authoring by centrality | **High** — a content problem no architecture solves |
| **VR2** | **Justification theatre.** Purposes attached without thought, satisfying A1 formally | High | **High** | Claim-statement requirement is a severe test; purpose distribution tracked as an integrity metric | Medium |
| **VR3** | **Over-suppression.** N1–N10 starve visual-dependent domains | Medium | Medium | Admission rate per subject tracked against authored expectation | Medium |
| **VR4** | **Representation-dependence undetected.** Withdrawal probes are costly and may be skipped under budget pressure | **High** | Medium | Probe scheduled by the review scheduler, not by the turn; withdrawal-gap is a reported Tier B metric | Medium |
| **VR5** | **Leaf-rule erosion.** Production tier acquires teaching context, or VD reads renderer internals | High | Medium | VI-1…VI-4 stated as invariants in both directions; VI-4 is the one usually forgotten | Medium |
| **VR6** | **Iatrogenic misconceptions** from incidental visual features | Medium | **High** | Q4 requires essential/incidental marking; variation designed rather than discovered | Medium — unmitigated where assets are unauthored |
| **VR7** | **Interface churn.** VH-1 widens a field ADR 08 owns; if declined, Phase 2's projection has no carrier | High | Medium | VisualIntent is additive and back-compatible: `visual_type` derivable from `formClass`, so ADR 12 works unchanged during migration | Low–Medium |
| **VR8** | **Purpose set wrong.** Ten purposes may not partition real visual teaching | Medium | Medium | Closed and versioned; characteristic failures make miscategorization observable; VQ-1 tracks it | Medium |
| **VR9** | **Latency and cost.** Decision runs every turn | Low | Low | Deterministic boolean evaluation; no LLM (VP10, Rule 9); generation never in-turn (ADR 12 §4.4) | Low |
| **VR10** | **Mastery numbers fall** when MG-1/MG-2 land, and are misread as regression | Medium | **High** | Stated in advance: the prior number was partly scaffolded-assessment artifact. Report the change with its cause | Low |

---

## 15. Trade-offs

**VT1 · Default-no vs. default-yes.** Chosen: default no. *Cost:* some learners who would
benefit get prose. *Why:* the failure modes are asymmetric — an unnecessary visual reliably
costs load and can manufacture misconceptions, while a missing one is recoverable next turn and
is detectable via the confusion it produces.

**VT2 · Closed purpose taxonomy vs. free-form justification.** Chosen: closed. *Cost:* a genuine
purpose outside the ten cannot be expressed until amended. *Why:* free-form justification cannot
accumulate evidence, cannot be tie-broken, and degenerates into restating the visual's title.

**VT3 · Widening the projection vs. accepting `visual_type`.** Chosen: widen. *Cost:* a change to
a field another owner controls (VH-1), and a migration. *Why:* without purpose and claim
downstream, the production tier cannot validate, cannot degrade intelligently, and cannot
attribute effectiveness. Back-compatibility keeps the cost bounded.

**VT4 · Mastery gates that lower reported mastery.** Chosen: MG-1/MG-2 as written. *Cost:*
metrics regress and look like a product problem. *Why:* the alternative is certifying
scaffolded performance as mastery, which is the exact self-deception Phase 1's evidence rules
exist to prevent.

**VT5 · Designing only L-A/L-B/L-C.** Chosen: the narrow tier. *Cost:* Phase 2 is smaller than
its brief implies, and several scope items resolve to "already owned." *Why:* the alternative
duplicates ADR 12, and duplication in the visual tier is the specific defect ADR 12 itself was
written to fix — it found seven competing pipelines.

**VT6 · Withdrawal probes cost learner time.** Chosen: keep them, scheduled rather than
inline. *Cost:* a probe that "wastes" a turn a learner would rather spend progressing. *Why:*
without them, representation-dependence is invisible until it fails in a context that matters.

---

## 16. Governance, Scalability and Extensibility

### 16.1 Ownership summary

| Decision | Owner |
|---|---|
| Whether a visual appears this turn | **VD-1** |
| Why — purpose and claim | **VD-2** |
| Which form class and constraints | **VD-3** |
| Which renderer and asset | ADR 12 |
| Asset identity and lifecycle | ADR 12 / ADR 14 |
| Technical validity | ADR 12 §4.6 |
| Pedagogical validity | **VD-9 §12.2** |
| What is on screen, across turns | ADR 15 |
| Whether the learner has mastered the concept | `C-29` (Phase 1 SYNC-1) |
| Whether the arc has a VISUAL phase | Phase 1 TQ-2 §5.4 |

### 16.2 Change control

The purpose taxonomy, the contraindication set, the fallback ladder, and the VisualIntent shape
are versioned artifacts. Amendments carry a migration declaration (`CARRIED` / `SCOPED` /
`RETIRED`), matching Phase 1 §4.3's V-1…V-3, so accumulated effectiveness evidence is never
silently carried across a definitional change.

### 16.3 Scalability (added v2.1.0)

Review noted this was absent. ADR 12 §6 owns *production* scalability — cache growth, render
cost, storage. This section owns only the **pedagogical authoring space**, which is Phase 2's
to size because Phase 2's purpose taxonomy is what multiplies it.

**The combinatorial space, stated honestly:**

```
  10 purposes  ×  ~1,756 KG concepts  ×  claims per concept (several)
               ×  form classes per purpose  ×  languages  ×  grade bands
```

Fully populated this is millions of assets and is **not a reachable target**. Saying so plainly
matters: an architecture that implies full coverage sets an authoring program up to fail against
a denominator nobody ever computed.

**Three properties keep it tractable, and none is a hope:**

- **SC-1 · The space is sparse by design, not by shortfall.** Most concept×purpose cells are
  never admitted, because VD-1's default is no visual and N1–N10 rule out large regions
  a priori (a definitional concept admits no VP-A at all). The reachable space is the
  *admitted* space, not the cross product.
- **SC-2 · Coverage is demand-ranked, never enumerated.** VD-7's coverage defects (§12.4) are
  emitted only for claims a learner actually reached and ranked by concept centrality, so
  authoring follows real traffic. This is the same discipline Phase 1 applies to concept
  entries, and it is why an unbounded space does not imply an unbounded program.
- **SC-3 · Degradation is the steady state.** VD-7's ladder assumes absence (VR1: "Certain"),
  and F6 converts absence into instrumentation. A concept with zero authored visuals still
  teaches — so coverage is a quality gradient, not a launch gate.

**What does scale linearly** and is therefore bounded: the ten purposes (fixed), the
contraindication set (fixed), the nine fallback rungs (fixed), and the availability projection
(one coarse record per concept). **Phase 2 adds no per-turn cost that grows with the asset
library** — the decision is a boolean evaluation over typed state (§4.5), and VS7 reads a
projection whose size is independent of how many assets exist.

**The honest residual:** authoring effort per concept rises with the number of *purposes* a
concept genuinely needs, and nothing here reduces that. It is a content cost, tracked by VR1,
not an architectural one.

### 16.4 Extensibility

- **New purpose:** admissible only with a distinct claim type, a distinct characteristic
  failure, and a grounding primitive — the same admissibility discipline Phase 1 applies to
  archetypes and methods. A purpose that duplicates another's failure signature is that purpose
  renamed.
- **New form class:** requires a purpose it serves and a fallback position. Renderer support is
  ADR 12's separate question.
- **New modality** (haptic, AR, spatial): enters as channels in `constraints.channelsAvailable`
  and as F5 substitutions. **The taxonomy should not need amending** — purposes are stated in
  terms of cognitive function, not medium, which is the property that should let this
  architecture outlive its current rendering technology.
- **Learned selection:** VS8's tie-break may become a learned policy over the enumerated form
  classes with the funnel as a hard action mask — the same containment pattern EOS uses for
  `C-28` Band 3 and Phase 1 uses for TQ-1.

---

## 17. Future Implementation Guidance

**Nothing below is authorized.** Every item is G1/G2 gated, and W4-2 remains gated and is not
unblocked by this document. Sequenced by evidence-unlock, matching Phase 1 §14.1.

- **Stage V1 — Instrumentation.** Record purpose, claim and contraindication codes on every
  turn, with no behaviour change. Makes the decoration rate measurable for the first time. If
  the measured decorative-visual rate is low, later stages should be reconsidered.
- **Stage V2 — VD-9 offline evaluation.** Read-only pedagogical quality scoring over recorded
  trajectories; establishes the baseline every later stage is judged against.
- **Stage V3 — VD-1 admission test as a constraint.** First learner-visible change. Requires
  V1's data and an agreed contraindication set.
- **Stage V4 — VisualIntent projection (VH-1).** Additive and back-compatible; `visual_type`
  remains derivable throughout.
- **Stage V5 — VD-7 fallback ladder.**
- **Stage V6 — VD-6 withdrawal probes and MG-1/MG-2.** Deliberately late: it changes reported
  mastery and should land only when the surrounding measurement is trustworthy.
- **Stage V7 — VP-I/VP-J instrumentation.** Requires interactive infrastructure that is W4-2
  territory.

**Preconditions before V3:** V1 has run long enough for a baseline; the contraindication set has
survived review against real trajectories; the purpose taxonomy shows no dominant-label
collapse; and the accessibility standard (VH-3) is agreed, since N9 depends on it.

---

## 18. Acceptance Criteria

Criteria for the **document**, not an implementation.

| # | Criterion | Status |
|---|---|---|
| V-A1 | Every scope item designed, or reconciled to an existing owner with rationale | ✅ §0.2 |
| V-A2 | Phase 1 extended, never modified or contradicted | ✅ — no Phase 1 content changed |
| V-A3 | No contradiction with the FINAL primitive architecture, ADR 08, ADR 09 | ✅ §0.1 |
| V-A4 | ADR 12's leaf-dependency rule preserved by construction, **with no cross-boundary call in either direction** | ✅ §7.3 VI-1…VI-5, §7.4 — **was FALSE in v2.0.0** (VS7 required a catalogue read VI-4 forbade); now objectively true: the only cross-boundary flows are two published projections, and neither is a call |
| V-A5 | No duplicate renderer taxonomy, asset model, cache, lifecycle, or validator | ✅ §0.2; §0.4 additionally records that the two reused lifecycles contradict, and names ADR 14 as Phase 2's target |
| V-A6 | "When NOT to visualize" enumerated, not left to judgement | ✅ §4.3 (N1–N10) |
| V-A7 | Every visual carries a purpose and a stateable claim | ✅ §5.3 |
| V-A8 | Visual↔mastery interaction defined, incl. representation-dependence | ✅ §9 |
| V-A9 | Graceful degradation defined with the purpose preserved | ✅ §10 |
| V-A10 | Ownership unambiguous; cross-owner handoffs explicit | ✅ §0.3, §16.1 |
| V-A11 | Metrics bounded against TQ-7/OSF; no new evidence store | ✅ §12.1 |
| V-A12 | Decision procedure deterministic; no added LLM call | ✅ §4.5 |
| V-A13 | Risks state residual risk; trade-offs state accepted cost | ✅ §14, §15 |
| V-A14 | No code, runtime, schema, API, component, prompt, or curriculum change | ✅ document only |
| V-A15 | Phase 1 §17's reconciliation procedure executed and recorded | ✅ §20 |
| V-A16 | Extensibility defined for new purposes, forms and modalities | ✅ §16.4 |
| V-A17 | Every component declares a falsifiable prediction or failure signature | ⚠️ **PARTIAL** — VD-1, VD-2, VD-6 and VD-7 carry them; VD-3 and VD-8 express falsifiability only through failure modes. Not manufactured to close the checklist |
| V-A18 | **Independent merge-gate review recommends approval** | ✅ **MET — by repository-owner authorization, 2026-07-31.** The owner attests the merge-gate review is complete and that v2.1.0 resolves its four blocking findings. **No review artifact is committed to this repository** — the approval of record is the owner's authorization (§18.1). Not self-marked: the author did not certify this. |
| V-A19 | **No Phase 1 content is modified, and no Phase 1 closed set is extended** | ✅ §4.3.1 — v2.0.0 extended G7's closed set; v2.1.0 removes the extension entirely. Phase 1 is byte-identical |
| V-A20 | **Every proposed change in another owner's territory is an explicit handoff** | ✅ §0.3 VH-1…VH-8 — VH-7 and VH-8 added in v2.1.0 to cover the availability projection and the learner-model field |
| V-A21 | **Contradictions found between reused authorities are recorded, not smoothed** | ✅ §0.4 (ADR 12 vs ADR 14 lifecycles); §0.1 (`DEPENDENCY_RULES` leaf scope) |
| V-A22 | **Scalability is treated and the authoring space is sized honestly** | ✅ §16.3 |

**Status: CANONICAL.** Twenty-one of twenty-two met; **V-A17 remains PARTIAL** — VD-3 and VD-8
still lack falsifiable predictions, deliberately not manufactured to close a checklist. It is
carried forward as known, accepted debt against Stage V1 data rather than closed by assertion.

### 18.1 Approval record

**Canonicalization authority: repository owner, 2026-07-31.**

| Item | Record |
|---|---|
| Merge-gate review | Completed; the owner attests to its completion and to v2.1.0 resolving its four blocking findings (B1–B4, Appendix D) |
| Review artifact in this repository | **None.** No review document is committed here, and none should be cited as if it were |
| Approval of record | **Repository-owner authorization**, given explicitly on 2026-07-31 |
| Author's role | The author did not certify this document (Phase 1 §18). The author's own review of v2.0.0 was explicitly disclosed as non-independent and returned DO NOT APPROVE; v2.1.0 answers all four of its blocking findings |

**Why this is recorded plainly.** Phase 1 §18 prohibits an architecture's author from
certifying it, and permits the owner to accept a review performed outside the repository —
provided the record states plainly that no artifact exists and does not reconstruct one. That
clause is honoured here. A future reader auditing this decision should look to the owner's
authorization and should not search for a review file in this repository.

**Effect.** Phase 2 is the canonical Visual Intelligence Architecture. Its purpose taxonomy
(§5.2), contraindications (§4.3), VisualIntent and VisualAvailability projections (§7), fallback
ladder (§10.2) and mastery gates (§9.2) govern visual teaching decisions from here.

**What canonicalization does NOT do.** It authorizes no implementation. Every stage remains
G1/G2 gated; **W4-2 remains gated and is not unblocked**; and handoffs VH-1…VH-8 remain
proposals awaiting the runtime owner's acceptance. Canonical means *this is the agreed
architecture*, not *this may now be built*.

---

## 19. Open Questions

**VQ-1 · Is ten the right number of purposes?** Grounded in primitives and in the existing SHOW
family, but unvalidated against real teaching. Resolvable only from Stage V1's distribution: a
purpose never selected is probably not a purpose, and a dominant one is probably several.

**VQ-2 · What is the correct representation budget per concept (CV-2)?** A bound exists — beyond
some number the learner integrates representations instead of learning — but its value is
unknown and probably varies by domain.

**VQ-3 · How often should withdrawal probes run?** Too rare misses dependence; too frequent
wastes learner time and reads as distrust. No basis yet for a default.

**VQ-4 · Does F6 (learner construction) genuinely outperform F0 (authored asset) in some
conditions?** §10.2 asserts it does. If true it is a significant finding that should reorder the
ladder and reduce authoring pressure. Testable at Stage V2; asserted, not established.

**VQ-5 · Should purpose be per-turn or per-claim?** Phase 2 treats it per-claim, with a turn
possibly carrying one claim. A turn making two claims with two purposes is currently modelled as
two visuals, which may be wrong for compound diagrams.

**VQ-6 · Where does the CPA rung live?** VD-1's primary input, but no field records a learner's
CPA position per claim today. Either derived from the ladder rung or a new field — a data
dependency, and the visual analogue of Phase 1's knowledge-type gap.

**VQ-7 · Can Q1 claim-fidelity be evaluated automatically?** Requires judging whether an image
makes a proposition perceptible. Human review is reliable and does not scale; a model judge is
scalable and unvalidated.

**VQ-8 · Phase-document ownership.** Phase 1's OQ-10, unchanged: `docs/architecture/` is the
runtime owner's territory per the registry. Owner decision.

---

## 20. Reconciliation Procedure Execution Record

Phase 1 §17 executed in full, **before** design work. Recorded so a later phase can see what was
checked.

| Step | Action | Result |
|---|---|---|
| 1 · Inventory | Directory listing of `docs/architecture/` (52 + 7), `educational-brain/`, `docs/curriculum/`; grep for visual authorities across all | 14 authorities touching visual territory identified (§0.1) |
| 2 · Governance registry | Read in full | Visualization/Simulation owned by the runtime owner, Pappu a forbidden editor → §0.3's boundary and VH-1…VH-6 |
| 3 · ADR reconciliation | Read what each ADR **selected**, not what it diagnosed | **ADR 12 already owns taxonomy, lifecycle, selection mechanics, a11y and validators** — the finding that reshaped this phase. ADR 15 owns cross-turn visual state |
| 4 · Document reconciliation | One verdict per authority | §0.1; Superseded used zero times. **v2.1.0:** added the `DEPENDENCY_RULES` leaf entry as a distinct authority, and recorded the ADR 12 / ADR 14 lifecycle contradiction in §0.4 rather than smoothing it |
| 5 · Ownership verification | One owner per responsibility | §16.1. **v2.1.0:** re-run after review found `representationDependence` had shifted ADR 10 territory silently → VH-8 |
| 6 · Authority verification | Checked every decision for a second decider | Two selection layers found and separated (§6.1). **v2.1.0:** the v2.0.0 leaf claim was FALSE — VS7 required a catalogue read VI-4 forbade. Resolved by the §7.4 availability projection; both cross-boundary flows are now published values, not calls |
| 7 · Independent review | Not performed by the author | §21 |

**Anti-patterns actively checked** (Phase 1 §17.2): reconciled ADR 12's *selected design*, not
its problem statement; read the FINAL primitive architecture in substance; produced the document
list from a directory listing; consulted the governance registry; **searched for an existing
artifact doing this job under another name** — which found ADR 12's Visual Policy, and is the
check that prevented Phase 2 from re-inventing it.

**Honest limitation.** I did not read all 31 scene generators or `PRIMITIVE_LIBRARY.md` in full
(310 KB). I verified the visual primitives Phase 2 relies on (P06, P07, P08, P17, P47, P60, P86)
and ADR 12's selected design in detail. A reviewer should treat the primitive-grounding claims in
§5.2 as the least-verified part of this document.

---

## 21. Merge Requirements

Phase 2 may be merged only when **all** hold:

1. All acceptance criteria met except those explicitly carried as partial, with the carry stated.
2. **An independent merge-gate review recommends approval.** Per Phase 1 §18 the author may
   declare only READY FOR INDEPENDENT MERGE REVIEW and may never self-certify. The reviewer must
   assume nothing is correct and verify against the repository, not against this document.
3. The reconciliation record (§20) is confirmed complete by that reviewer — in particular that no
   further unreconciled visual authority exists.
4. Handoffs VH-1…VH-6 are acknowledged by the runtime owner as *proposals*; Phase 2's merge
   authorizes none of them.
5. W4-2 remains gated. Merging Phase 2 does not unblock visual implementation.
6. Merge convention: `--no-ff` merge commit, no squash, no rebase of public history.
7. On approval, the Bible, the governance registry and the EOS blueprint index gain Phase 2
   pointers (VH-5) — runtime-owner actions.

**Suggested reviewer focus**, ranked by where I judge this document weakest: the purpose
taxonomy's completeness (VQ-1, §5.2 — the least-verified section); whether §7's VisualIntent
genuinely preserves ADR 12 §13 or merely restates it; whether the ten contraindications
over-suppress; and whether §9's mastery gates are implementable against the existing evidence
model.

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| **Purpose** | One of ten pedagogical functions a visual may serve (§5.2). Closed set. |
| **Claim** | The one-sentence proposition a visual must make perceptible (§5.3). |
| **VisualIntent** | The typed, one-directional projection from the pedagogical tier to the production tier (§7). |
| **Form class** | A pedagogical category of visual (diagram, plot, interactive). Not a renderer. |
| **Renderer** | ADR 12's production mechanism. Never chosen by Phase 2. |
| **CPA rung** | Position on concrete→pictorial→abstract, from the primitive grammar P06→P07→P08. |
| **Representation-dependence** | A learner state: performance requires the taught representation (§9.1). |
| **Withdrawal probe** | A scheduled item posed without the supporting visual, to detect the above. |
| **Contraindication** | An enumerated reason a visual MUST NOT appear (N1–N10, §4.3). |
| **Fallback rung** | A position on VD-7's ladder, F0–F8 (§10.2). |
| **Instructional equivalence** | The a11y standard: the description alone supports the same claim (§11.2). |

## Appendix B — Compliance statement

Produced under the repository's Chief Architect governance rules and Phase 1 §17. It reads and
reuses the existing corpus; introduces no parallel pipeline, renderer, asset model, cache, or
lifecycle; modifies no runtime, route, schema, API, component, prompt, curriculum file,
Knowledge Graph, or `educational-brain/` document; modifies no Phase 1 content; implements
nothing; and requests no implementation approval. Where it found existing components sufficient
it consumed them by reference and said so.

## Appendix C — Feedback to other owners

**VF-1 · ADR 12 §4.5's a11y bar is too weak** to guarantee instructional access: non-empty
admits "Diagram of a triangle." §11.2 proposes instructional equivalence, evaluated against the
intent's claim (VH-3).

**VF-2 · ADR 12's Visual Policy keys on strategy only.** Strategy determines *style*; purpose
determines *what the visual must do*. Two turns in one strategy can need different purposes.
Proposal: add `purpose` as a policy dimension (VH-2).

**VF-3 · ADR 15's RRM records visuals, not intents.** Recording the originating VisualIntent
would make campaign visual history queryable by purpose and claim, which VS5 and §12 both need
(VH-4).

**VF-4 · No field records a learner's CPA position per claim** (VQ-6). This is the visual
analogue of Phase 1's REQUIRED-BUT-ABSENT knowledge-type gap, and it is VD-1's primary input.
Recorded for the Twin/Student-Memory owner.

**VF-5 · ADR 12 and ADR 14 carry two different asset lifecycles** (added v2.1.0). ADR 12 §4.1
defines `status: 'draft' | 'active' | 'deprecated'`; ADR 14 defines
`DRAFT → REVIEW → ACTIVE → DEPRECATED → RETIRED` plus `EXPERIMENT_VARIANT`, with a curator
queue, five enumerated deprecation triggers and a one-ACTIVE-per-slug rule. A visual asset is
subject to both documents and it is not stated which governs. Phase 2 targets ADR 14's (§0.4,
§12.4) and does not attempt to resolve the contradiction — both documents belong to the runtime
owner. Recorded for reconciliation at their discretion.

**VF-6 · The Visual leaf rule's scope differs between two documents** (added v2.1.0).
`DEPENDENCY_RULES.md` scopes its leaf entry to the Visual Type System
(`school/visuals/{visualTypes,detectVisual}.ts`); ADR 12 §13 cites that rule but applies it to
"the Visual tier" as a whole. Phase 2 adopts the broader reading and is therefore stricter than
the narrow reading would require. Worth an explicit statement in whichever document is
authoritative.

---

## Appendix D — Change log, v2.0.0-draft → v2.1.0-draft

An independent-style merge-gate review returned **DO NOT APPROVE** on v2.0.0 with four blocking
issues and six important improvements. All ten are resolved below. **No architectural redesign
was performed** — the review's own conclusion was that the shape is sound and the defects are
consistency, governance and boundary faults. Nothing was rejected.

### D.1 Blocking issues

| ID | Issue | Resolution | Sections |
|---|---|---|---|
| **B1** | VS7 required a catalogue read that VI-4 forbade; leaf isolation broken; V-A4 false | **§7.4 `VisualAvailability` projection** — coarse, one-directional, expressed in Phase 2's own form-class vocabulary, with an enumerated exclusion list (no asset ids, cache keys, renderer names, spec payloads, quality scores, counts or lifecycle status). VS7 restated to filter against it. **VI-4 tightened** (adds spec payloads and implementation detail) and **VI-5 added** making the projection the sole, bounded exception. Crucially it is *published*, never *queried* — so no call crosses the boundary in either direction and the leaf rule is **strengthened**, not weakened. New handoff **VH-7** | §6.2 VS7, §7.3 VI-4/VI-5, §7.4, §18 V-A4 |
| **B2** | Unauthorized extension of Phase 1's closed G7 set, via a mis-cited handoff (VH-2, unrelated) and a forward reference resolving to nothing | **§4.3.1 replaces the extension entirely.** Checking N1–N10 against Phase 1's actual four codes showed the premise was wrong: G7 is *arc-scale*, N-codes are *turn-scale* — the boundary §4.1 already draws. **N-codes do not extend G7.** Only the four persistent contraindications can produce an arc-scale outcome, and each maps to an existing Phase 1 code; the other six are transient and never reach the gate. **No Phase 1 amendment and no handoff are required**, and both broken citations are gone | §4.3.1 |
| **B3** | ADR 12 (3-state) and ADR 14 (5-state) lifecycles contradict; both marked "Reused" | **§0.4 records the contradiction** with a state-by-state comparison, states that it predates Phase 2 and belongs to the runtime owner, and **names ADR 14 as Phase 2's target** — chosen on the evidence that only ADR 14 has the review step, curator queue and enumerated triggers a retirement signal needs. §12.4 updated. Feedback **VF-5** added | §0.1, §0.4, §12.4, App. C |
| **B4** | `representationDependence` added to ADR 10's learner model with no handoff, while the handoff list read as complete | **Handoff VH-8 added** and called out explicitly as a silent ownership shift corrected. §9.1 reworded from "makes it a first-class learner state" to "**proposes** it — handoff VH-8, not an enacted change." §12.1's "no new evidence store" clarified to distinguish a store from a proposed field | §0.3, §9.1, §12.1 |

### D.2 Important improvements

| ID | Issue | Resolution | Sections |
|---|---|---|---|
| **I-1** | Six of ten purposes grounded in bare P07 — grounding nearly inert as a discriminator | Grounding is now by primitive **composition**, consistent with the FINAL primitive architecture's own position that everything above a primitive is a composition. All ten compositions are distinct, so §16.4's three-criterion admissibility test is genuinely three-part | §5.2 |
| **I-2** | VP-H MEMORY-OFFLOAD's characteristic failure *is* representation-dependence | Retained but reclassified as a **constrained purpose**: a VP-H visual MUST carry a withdrawal plan and a scheduled withdrawal probe, or it is not admitted. The only purpose that must declare in advance how it ends | §5.2 |
| **I-3** | VS8 tie-break used "population effectiveness" — ADR 13 territory | Sourced explicitly from ADR 13 and marked **inert until that evidence exists**, reducing to the deterministic seed — the same posture Phase 1's own tie-break takes | §6.2 VS8 |
| **I-4** | No scalability treatment | **§16.3** added: sizes the combinatorial space honestly, states plainly that full coverage is not a reachable target, and gives three tractability properties (sparse by design, demand-ranked, degradation as steady state) plus what scales linearly and the honest residual | §16.3 |
| **I-5** | `DEPENDENCY_RULES` scopes the leaf rule to `school/visuals/*`; ADR 12 §13 generalizes it | Recorded as a distinct inventory row with the scope assumption stated: Phase 2 adopts the broader reading, which is the **safe direction to be wrong**. Feedback **VF-6** added | §0.1, App. C |
| **I-6** | V-A4 self-marked ✅ against a claim the document falsified | V-A4 corrected with its prior falsity stated; **V-A19…V-A22 added** covering Phase 1 non-modification, handoff completeness, contradiction recording and scalability | §18 |

**Minor items m-1…m-5** were folded into the sections above (VP-H hedging, purpose/contra-
indication orthogonality, glossary, advisory marking, feedback cross-references).

### D.3 Scope confirmation

**No architectural scope was expanded.** v2.1.0 adds exactly one new architectural object — the
`VisualAvailability` projection — and it exists solely to *remove* a coupling, not to add
capability: it is strictly less powerful than the catalogue read v2.0.0 implicitly required.
Everything else is a correction, a clarification, a recorded contradiction, or a handoff.

No new subsystem. No new component. No new engine. No new evidence store. No new lifecycle.
No Phase 1 modification — Phase 1 is byte-identical. No ADR modification — every proposed change
to another owner's document is a handoff (VH-1…VH-8) or feedback (VF-1…VF-6), and Phase 2's
merge authorizes none of them. No runtime code.

The purpose taxonomy remains ten. The contraindications remain ten. The fallback ladder remains
nine rungs. The component set remains VD-1…VD-9.
