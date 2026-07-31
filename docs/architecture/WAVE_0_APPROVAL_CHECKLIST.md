# Wave 0 — Per-Item Implementation Approval Checklist

**Status:** Prepared 2026-07-04 (integration-prep). Extended 2026-07-31 with
gated items for the 31 open cross-owner handoffs of Phases 1–4 (Wave H below).
**Nothing on this list is approved.** This document grants no permission by
existing — it is the instrument the project owner uses to grant it, one
checkbox at a time. Drafting an item is not approving it: every item added
2026-07-31 is unchecked, and G1 and G2 remain in force exactly as stated below.

**The two Wave 0 gates** (`ARCHITECTURE_COMPLETION_REPORT_V1.md` §5):
- [ ] **G1 — Canonical KG v1 freeze declared by the Curriculum Production
  Pipeline.** Status 2026-07-04: mathematics KG is `v1.0.1 frozen`;
  campaign is `1.0.0-draft`, `subjects_complete: 0`
  (`docs/CANONICAL_CURRICULUM_MANIFEST.json`). The owner must confirm
  whether freeze scope is per-subject or campaign-wide before any
  KG-coupled item below is approvable.
- [ ] **G2 — Explicit per-item owner approval**, recorded by checking the
  item's box here (and noting date + name), then logging the approved set
  in project memory.

Approval order must respect the dependency column — approving an item
whose prerequisites are unchecked has no effect. Item IDs are stable;
reference them in commits (e.g. `implements W2-3`).

---

## Wave 0 — decisions (no code)

| ID | Item | Source | Depends on | Approved |
|---|---|---|---|---|
| W0-1 | Confirm KG v1 freeze scope (per-subject vs campaign-wide) and record it in CLAUDE.md | Manifest; ADR 06 | G1 | [ ] |
| W0-2 | Register English canonical KG in the runtime registry — 2 lines (`SUBJECT_ADAPTERS` + `ID_PREFIX_TO_SUBJECT`, `knowledgeGraph.ts:41-56`) + retire `case 'english'` legacy routing (line 286). Until then English learners are served the legacy static graph | R20; CLAUDE.md subject pattern | G2 (production code; may precede G1 since the English KG is already `production` + validator-PASS) | [ ] |

## Wave 1 — additive foundations (no behavior change)

| ID | Item | Source | Depends on | Approved |
|---|---|---|---|---|
| W1-1 | ADR 06 KG consumption gate (version/status/shape/diagnostic surface) in `subjectKgAdapter.ts` | ADR 06 §Future plan | W0-1 | [ ] |
| W1-2 | ADR 10 Phase 1: create `ConceptMasteryRecord`, `BrainConfig`, `ActiveMisconception` tables + typed `SessionMemory` schema (additive `prisma db push`; no reader/writer migration) | ADR 10 §10 | — | [ ] |
| W1-3 | ADR 13 Phase 1: `appendEvidenceEvent()` fire-and-forget in chat-route persist stage (append-only; nothing reads it) | ADR 13 §10 | — | [x] already implemented in the codebase (`src/lib/teaching/evidence/evidenceEngine.ts`, wired at the route.ts persist stage) — checklist updated to match reality, 2026-07-07 |
| W1-4 | ADR 14 Phase 1: create `AssetIdentity` + three family tables (empty) | ADR 14 §10 | — | [x] already implemented in the codebase (`src/lib/teaching/assets/assetIdentity.ts` + schema) — checklist updated to match reality, 2026-07-07 |
| W1-5 | P10 T3b seam: extract chat-route orchestration into an importable function (test-only refactor of `route.ts`) | `VALIDATION_FRAMEWORK_P10.md` §2/§7 (GATED) | — | [ ] |
| W1-6 | P10 client seam: env-override for provider base URL so the transcript player can serve T3a over HTTP | `VALIDATION_FRAMEWORK_P10.md` §3 (GATED) | — | [ ] |

Exit gate: tsc ratchet holds; vitest green; six-subject KG validation
green; zero behavior diff on the fixture set.

## Wave 2 — engine extensions

| ID | Item | Source | Depends on | Approved |
|---|---|---|---|---|
| W2-1 | ADR 08: Library-mode seed-and-persist of `currentConceptNodeId` | ADR 08 §4(a) | W1-2 | [ ] |
| W2-2 | ADR 09: `lessonStageProgress` + `planSignature` cross-turn continuity | ADR 09 §4 | W1-2 | [ ] |
| W2-3 | ADR 07: extend `MasteryLevel` to Library Mode; consolidate `learningProfile.ts` — **requires the ADR 07 equivalence-validation report first** (the one flagged behavior-change risk) | ADR 07; R2/R7 | W1-2 | [ ] |
| W2-4 | ADR 11: Session Recommendation Reconciler + `getTopLibraryRecommendation()` | ADR 11 §4 | W1-2 (BrainConfig `maxSessionSignals`) | [ ] |
| W2-5 | ADR 05: expose `cross_links`/`mastery_threshold` past the adapter; per-concept thresholds via BrainConfig replace flat 70 | ADR 05; ADR 07; R3 | W0-1, W1-1, W1-2 | [ ] |

Exit gate: fixture 6 (R15 signal-conflict) and fixture 12 (ADR 08 gap)
flip and are reviewed; Library-mode fixtures green.

## Wave 3 — memory migration (highest risk, R14 — approve alone)

| ID | Item | Source | Depends on | Approved |
|---|---|---|---|---|
| W3-1 | ADR 10 Phases 2–3: migrate readers, then the four `TopicProgress` writers, to single-writer `ConceptMasteryRecord` | ADR 10 §10; R14 | W1-2; Wave 2 complete | [ ] |

Exit gate: old/new mastery reads reconciled on a production snapshot;
no fixture regression.

## Wave 4 — asset-model activation (P2/ADI payoff)

| ID | Item | Source | Depends on | Approved |
|---|---|---|---|---|
| W4-1 | ADR 14 Phase 2: passive catalogue population (generated content persisted as DRAFT; pipeline `teaching-assets/assets.json` ingested as curated source; nothing served) | ADR 14 §10 | W1-4 | [x] approved by project owner as an explicit exception (chat instruction, 2026-07-07, out of G1/G2 sequence — G1 KG-freeze not yet declared). Scope: EXPLANATION + PROBE families only for physics/mathematics/english (the three live curriculums); `teaching-assets/assets.json` ingestion not built. Implements `captureGeneratedExplanation`/`captureGeneratedProbe` in `src/lib/teaching/assets/`. |
| W4-2 | ADR 12 Phases 2–3: concept-keyed visual cache; all visual LLM calls to background authoring — **fixes R16; `ENABLE_DYNAMIC_VISUALIZATION` stays off everywhere until this lands** | ADR 12 §4; R16, R17 | W1-4 | [ ] not in scope of this build — VISUAL family intentionally untouched (see W4-1 note) |
| W4-3 | ADR 14 Phase 3: active retrieval (ACTIVE assets served; per-block LLM skip; `incompatibilities` gate live) | ADR 14 §10 | W4-1, W1-3 | [x] approved by project owner as an explicit exception (chat instruction, 2026-07-07, out of G1/G2 sequence). `findBestExplanation`/`findBestProbe`/`assembleLesson` wired into `src/app/api/learn/chat/route.ts` before the LLM call; `incompatibilities` gate implemented in the matcher (`activeMisconceptionIds` param) but not yet fed real data from `ActiveMisconception` — defaults to no-op. Live-verified: with an ACTIVE asset present, the route returns `provider: "memory"` and skips the LLM entirely; with none present (the default, empty-catalogue state), behavior is unchanged from before this build. |
| W4-4 | ADR 13 Phases 2–3: EWMA worker + nightly rollup + bias counters; `assetEffectivenessSignal` into the ADR 11 Reconciler | ADR 13 §10 | W1-3, W2-4 | [ ] |

Exit gate: ADI measurably falls on a replay corpus; served-asset turns
byte-stable; a11yDescription on every served visual.

## Wave 5 — closure

| ID | Item | Source | Depends on | Approved |
|---|---|---|---|---|
| W5-1 | ADR 14 Phase 4: ProbeAsset migration + evidence-driven deprecation live | ADR 14 §10 | W4-3, W4-4 | [ ] |
| W5-2 | ADR 10 Phase 4: deprecate legacy `TopicProgress` writes | ADR 10 §10 | W3-1 | [ ] |
| W5-3 | R19: archive-status headers on retired Teaching Assets Platform files | ADR 14; R19 | — | [ ] |
| W5-4 | ~~CI wiring for KG validator~~ — **already done pre-gate** (2026-07-04, `.github/workflows/validate.yml`); the ADR 06 runtime load-time gate is W1-1 | R6 | — | done |

---

## Wave H — cross-owner handoff decisions (Phases 1–4)

Added 2026-07-31. The four canonical phase documents each end with a set of
**explicit cross-owner handoffs** — requests into another owner's territory that
the phase's own canonicalization deliberately does not enact. Until now those 31
handoffs existed only inside the phase documents, with no gated item anywhere, so
there was no instrument by which an owner could approve or decline one. This
section is that instrument.

**Item IDs are the handoff IDs themselves** (`H-*`, `VH-*`, `AH-*`, `EH-*`), which
are already stable and canonical in the phase documents. No parallel ID space is
introduced. Reference them in commits exactly like the `W*` items above.

Three of these handoffs (H-5, VH-6, AH-8) ask that this checklist gain items.
Drafting this section discharges the **handoff** half of that request. The
**stage** half — promoting Phases 1 and 2's `Proposed ID` tables (P1-1…P1-7,
P2-1…P2-7) and Phase 3 §25 / Phase 4's stages into gated items — is **not** done
here and remains open; their rows say so.

**Nothing in this section is approved.** Every box is unchecked. Per the header,
an unchecked item is architecture-only, and per Bible §10.1 rule 2 it authorizes
no implementation. Approving any row here still requires G2, and any row whose
dependency column names G1 additionally requires G1.

### Phase 1 — Teaching Quality (`PHASE_01_…md` §0.3)

| ID | Handoff | Source | Owner | Depends on | Approved |
|---|---|---|---|---|---|
| H-1 | `C-28`'s decision record gains the AttemptVector as a captured field | Phase 1 §11.2 | Runtime schema — runtime owner | G2; must be decided jointly with AH-3 (one field group, not two schemas) | [ ] |
| H-2 | `C-30`'s documented approach-history responsibility retired in favour of TQ-4's typed `failedAttempts` set | Phase 1 §4.1 | Engine responsibility — runtime owner | G2; H-1 | [ ] |
| H-3 | Bible ADR index records ADR 09 as *extended by Phase 1 TQ-2* | Phase 1 §5.7 RC-5 | Bible — runtime owner | G2. **Amends a Frozen v1.0 document** (Authority Index row 5) — documentation-only, but via the amendment path, not a direct edit | [ ] |
| H-4 | Bible engine map gains the Campaign scale and TQ-1…TQ-7 | Phase 1 §0.3 | Bible — runtime owner | G2. Frozen v1.0 (row 5), as H-3 | [ ] |
| H-5 | This checklist gains items for Phase 1 §14's stages | Phase 1 §0.3 | Wave 0 — owner | **Partially discharged 2026-07-31**: handoff items H-1…H-6 now listed. Stage items P1-1…P1-7 remain `Proposed ID` only and are still to be promoted | [ ] |
| H-6 | All Phase 1 → runtime interfaces (§11) expressed through `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md`, never around it | Phase 1 §11 | Contract — runtime owner | G2 | [ ] |

### Phase 2 — Visual Intelligence (`PHASE_02_…md` §0.3)

| ID | Handoff | Source | Owner | Depends on | Approved |
|---|---|---|---|---|---|
| VH-1 | `TeachingDecision.visual_type` widens to the typed `VisualIntent` | Phase 2 §7 | Teaching Engine + ADR 08 — runtime owner | G2. Repository note: no `visual_type` field exists on the Teaching Engine decision today (verified at `827f3796`), so this is create-then-widen, not widen alone | [ ] |
| VH-2 | ADR 12's Visual Policy table gains a `purpose` dimension alongside `strategy` | Phase 2 §6.5 | ADR 12 — runtime owner | G2. Frozen v1.0 (row 5) | [ ] |
| VH-3 | `a11yDescription` strengthened from *present and non-empty* to *instructionally equivalent* | ADR 12 §4.5 | ADR 12 — runtime owner | G2 | [ ] |
| VH-4 | RRM records the `VisualIntent` that produced each rendered visual, not only the visual | Phase 2 §8.2 | ADR 15 — runtime owner | G2 | [ ] |
| VH-5 | Bible §3/§6.8 gains a Phase 2 pointer; ADR 12 gains a scope note recording that its "when" is supplied by VD-1 | Phase 2 §0.3 | Bible + ADR 12 — runtime owner | G2. Documentation-only; Frozen v1.0 (row 5) | [ ] |
| VH-6 | This checklist gains Phase 2 stage items; **W4-2 remains gated and is not unblocked** | Phase 2 §0.3 | Wave 0 — owner | **Partially discharged 2026-07-31**: handoff items VH-1…VH-8 now listed. Stage items P2-1…P2-7 remain `Proposed ID` only. W4-2 unchanged | [ ] |
| VH-7 | The `VisualAvailability` projection is published by the production tier — coarse, one-directional, carrying no asset ids, cache keys, renderer names or spec payloads | Phase 2 §7.4 | ADR 12 — runtime owner | G2 | [ ] |
| VH-8 | `representationDependence` added as a per-concept property of the learner model, with three levels | Phase 2 §9.1 | ADR 10 Student Memory — runtime owner | G2; W1-2 (ADR 10 Phase 1 stores) | [ ] |

### Phase 3 — Adaptive Teaching (`PHASE_03_…md` §0.3)

| ID | Handoff | Source | Owner | Depends on | Approved |
|---|---|---|---|---|---|
| AH-1 | `C-32`'s four unstructured outputs replaced by one typed Adaptation State Vector; `C-32` retains loop, band and veto, and **transfers the adjustment decision** | Phase 3 §5, §0.1 | EOS `C-32` — runtime owner | G2. Flagged in this checklist since Phase 3's canonicalization as an **ownership change**, not only an instrument | [ ] |
| AH-2 | The ASV persisted as per-learner-per-concept standing state in an **existing** ADR 10 store (candidate: Store 2). No new store | Phase 3 §0.3 | ADR 10 — runtime owner | G2; W1-2. Flagged by Phase 3 §29 as "the one that looks small and is not" | [ ] |
| AH-3 | `C-28`'s decision record captures the ASV snapshot and adjustment record as **one field group with Phase 1's AttemptVector (H-1)**, not two | Phase 3 §7.4 | `C-28` + ADR 08 — runtime owner | G2; **must be decided jointly with H-1** — approving either alone risks two schemas for one turn | [ ] |
| AH-4 | Scaffold vocabulary unified: `EOS_V2_RUNTIME_SPECIFICATION` §3.4's `scaffoldDial 0–4` becomes the single definition; `eos-v3` `C-32`'s prose "scaffolding level" is bound to it | Phase 3 §0.4 | EOS v2 + eos-v3 — runtime owner | G2. **Amends a Frozen document** (`EOS_V2_RUNTIME_SPECIFICATION`, Authority Index row 2) via the spec-bug/appendix path. `eos-v3` carries no authority tier (README §"exploration") | [ ] |
| AH-5 | ADR 08 records the Posture layer explicitly: `teachingStrategy.ts`'s 7 postures are the Posture half of ADR 08's Posture/Action split, distinct from Phase 1's 9 archetypes | Phase 3 §6.1 | ADR 08 — runtime owner | G2. Documentation-only; Frozen v1.0 (row 5) | [ ] |
| AH-6 | Evidence records carry `scaffoldLevel` and `hintDebt`, as `EOS_V2`'s `AnswerObserved` already specifies, so assisted and unassisted evidence stay distinguishable | Phase 3 §10.5, §11.4 | ADR 13 — runtime owner | G2; W1-3 | [ ] |
| AH-7 | Bible engine map and §6 gain the adaptive control plane and AT-1…AT-14; ADR index records ADR 08 and ADR 13 as *extended by Phase 3* | Phase 3 §0.3 | Bible — runtime owner | G2. Documentation-only; Frozen v1.0 (row 5) | [ ] |
| AH-8 | This checklist gains items for Phase 3 §25's stages. **Phase 3's merge unblocks nothing** | Phase 3 §0.3 | Wave 0 — owner | **Partially discharged 2026-07-31**: handoff items AH-1…AH-12 now listed. Phase 3 has no `Proposed ID` stage table; §25's stages remain unlisted | [ ] |
| AH-9 | `ENGINE_REFERENCE.md` #16's description of `teachingOutputBias.ts` corrected to record that the file is a stub (AF-1) | Phase 3 §0.3 | `ENGINE_REFERENCE` — runtime owner | G2. Documentation correction only; carries no implementation | [ ] |
| AH-10 | All Phase 3 → runtime interfaces (§18) expressed through `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md`, never around it | Phase 3 §18 | Contract — runtime owner | G2 | [ ] |
| AH-11 | Phase 3's pressure and governor rules authored **into the existing policy pack** (`kernel/policy/basePack.ts`'s format, Bands 2/4/5), not into a new evaluator | Phase 3 §0.3 (v3.1.0) | `kernel/policy/` + EOS runtime — runtime owner | G2. Which wiring frame governs — EOS band pipeline or the live pre-EOS prompt-assembly path — is explicitly the runtime owner's sequencing decision | [ ] |
| AH-12 | `C-28`'s adjustment record carries `consumesReteachBudget`; Phase 1's §7.7 budget counter readable by Band-2 governor rules so an exhausted budget removes D1/D5 failure-response moves | Phase 3 §0.3 (v3.1.0) | `C-28` + Phase 1 budget owner — runtime owner | G2; H-1, AH-3 | [ ] |

### Phase 4 — Educational Assets (`PHASE_04_…md` §0.3)

| ID | Handoff | Source | Owner | Depends on | Approved |
|---|---|---|---|---|---|
| EH-1 | `contentQualityDashboard.ts`'s `WorkQueueItem` gains an optional authored-demand input alongside its telemetry-derived signals | Phase 4 §4 | AssetIdentity pipeline — runtime owner | G2. Subsystem is registered **COMPLETE / never rebuild** — extension routed to its owner, never a re-implementation. Unresolved concern on record: `buildWorkQueue()` filters out items classified `none`, so integration is not purely additive at the type level | [ ] |
| EH-2 | The sufficiency vector published as a per-concept read model; `coveragePercent` unchanged and reinterpreted, not replaced | Phase 4 §5 | AssetIdentity pipeline — runtime owner | G2; EH-1 | [ ] |
| EH-3 | ADR 13's `CuratorQueueEntry.trigger` union gains **no** member from Phase 4; coverage demand routed to the work queue, not the curator queue | Phase 4 §0.3 | ADR 13 — runtime owner | G2. **A handoff that requests no change** — recorded so the two queues are not merged by accident. Approving it enacts nothing | [ ] |
| EH-4 | CEKR §10's `Conflict` node with `ACCEPTED_TENSION` is the home for the contradictions in Phase 4 §0.4; CT-1…CT-4 filed there rather than in phase documents | Phase 4 §0.4 | CEKR — runtime owner | G2. **Amends a Frozen document** (CEKR, Authority Index row 3) via its own §10 revision model. CT-2 remains unresolved | [ ] |
| EH-5 | On approval, the Bible, the governance registry and the EOS blueprint index gain Phase 4 pointers | Phase 4 §0.3 | runtime owner | G2. Documentation-only; carries no implementation | [ ] |

---

**Recording an approval:** check the box, append `(YYYY-MM-DD, name)`,
commit with message `governance: approve <IDs>`. Then implementation of
those items may begin, in dependency order, under the validation gates
named per wave. Anything unchecked stays architecture-only, per Bible
§10.1 rule 2.

---

## Phase 1 Teaching Quality Architecture — stage items not yet listed

`PHASE_01_TEACHING_QUALITY_ARCHITECTURE.md` became **CANONICAL** on 2026-07-31
(v1.2.0). Canonical means the architecture is agreed; it authorizes **no
implementation**. Its §14 defines seven evidence-ordered stages, and **none has
an approval item on this checklist yet** — so all seven remain architecture-only
by default, exactly like every unchecked item above.

Before any Phase 1 implementation begins, stages P1-1…P1-7 must be added here as
gated items and approved individually, in dependency order:

| Proposed ID | Stage (Phase 1 §14.2) | Notes |
|---|---|---|
| P1-1 | Stage 1 — capture the AttemptVector on every teaching decision | **Persistence change** (handoff H-1, runtime owner). No behaviour change. Prerequisite for P1-3. |
| P1-2 | Stage 2 — TQ-5 offline trajectory evaluator | Read-only over recorded data. |
| P1-3 | Stage 3 — TQ-4 primary-axis + closure filter, mandatory diagnosis | First learner-visible behaviour change. Gated on §14.3's preconditions, incl. the dependency matrix passing its minimality review. |
| P1-4 | Stage 4 — TQ-3 Method schema populated | Largely transcription of existing authored pedagogy. |
| P1-5 | Stage 5 — TQ-2 arc, persisted via ADR 09 `lessonStageProgress` | Implements ADR 09 Option B as part of this stage. |
| P1-6 | Stage 6 — TQ-1 strategy commitment | Most invasive; depends on P1-3…P1-5. |
| P1-7 | Stage 7 — TQ-7 Tier C/D join | Requires longitudinal data; cannot be pulled earlier. |

Phase 1's six cross-owner handoffs (H-1…H-6, §0.3) are **now listed as gated
items in Wave H above** (drafted 2026-07-31, all unchecked). They remain
proposals awaiting the runtime owner and are not approved by canonicalization —
listing them creates the approval instrument, not the approval.

---

## Phase 2 Visual Intelligence Architecture — stage items not yet listed

`PHASE_02_VISUAL_INTELLIGENCE_ARCHITECTURE.md` became **CANONICAL** on
2026-07-31 (v2.1.0). As with Phase 1, canonical means the architecture is
agreed; it authorizes **no implementation**. Its §17 defines seven
evidence-ordered stages, and **none has an approval item here** — so all seven
remain architecture-only by default.

| Proposed ID | Stage (Phase 2 §17) | Notes |
|---|---|---|
| P2-1 | V1 — record purpose, claim and contraindication codes per turn | No behaviour change. Makes the decorative-visual rate measurable for the first time. Prerequisite for P2-3. |
| P2-2 | V2 — VD-9 offline pedagogical quality evaluation | Read-only over recorded trajectories. |
| P2-3 | V3 — VD-1 admission test as a constraint | First learner-visible change. Gated on V1 data + an agreed contraindication set. |
| P2-4 | V4 — `VisualIntent` projection (handoff VH-1) | Additive and back-compatible; `visual_type` stays derivable. |
| P2-5 | V5 — VD-7 fallback ladder | |
| P2-6 | V6 — withdrawal probes + mastery gates MG-1/MG-2 | Deliberately late: it lowers reported mastery, and should land only when surrounding measurement is trustworthy. |
| P2-7 | V7 — VP-I/VP-J interaction instrumentation | Requires interactive infrastructure that is **W4-2 territory**. |

**W4-2 is unchanged and remains gated.** Phase 2's canonicalization does not
unblock it, and neither does Wave H. Phase 2's eight cross-owner handoffs
(VH-1…VH-8, §0.3) are **now listed as gated items in Wave H above** (drafted
2026-07-31, all unchecked). They remain proposals awaiting the runtime owner and
are not approved by canonicalization.

---

## Phase 3 Adaptive Teaching Architecture — stage items not yet listed

`PHASE_03_ADAPTIVE_TEACHING_ARCHITECTURE.md` became **CANONICAL** on 2026-07-31
(v3.1.0). As with Phases 1 and 2, canonical means the architecture is agreed; it
authorizes **no implementation**. Its §25 sequences implementation by
evidence-unlock, and **no stage has an approval item here** — so all remain
architecture-only by default.

Phase 3's own §29 requirement 5 states it plainly: *"G1 and G2 remain in force.
Merging Phase 3 unblocks no implementation and adds no Wave 0 item by itself."*
This section records that fact rather than creating items.

Its twelve cross-owner handoffs (AH-1…AH-12, §0.3) are **now listed as gated
items in Wave H above** (drafted 2026-07-31, all unchecked). They remain
proposals awaiting the runtime owner and are not approved by canonicalization.
Two carried a standing flag, which Wave H's rows preserve:

| Handoff | Why it needs care |
|---|---|
| **AH-1** | `C-32`'s four unstructured outputs become one typed Adaptation State Vector. `C-32` retains the loop, the band and the veto, and **transfers the adjustment decision** — an ownership change, not only an instrument. |
| **AH-2** | The ASV is persisted as per-learner-per-concept standing state in an existing ADR 10 store. **No new store** — but §29 notes this is "the one that looks small and is not." |

`AH-9` is a documentation correction to `ENGINE_REFERENCE.md` #16 and carries no
implementation. ISS-01 remains **BLOCKED**; Phase 3 does not resolve it, and
§10.2/§16 must be re-checked whichever way it resolves.

---

## Phase 4 Educational Assets Architecture — stage items not yet listed

`PHASE_04_EDUCATIONAL_ASSETS_ARCHITECTURE.md` became **CANONICAL** on 2026-07-31
(v4.0.2). As with Phases 1, 2 and 3, canonical means the architecture is agreed;
it authorizes **no implementation**, and **no stage has an approval item here**.

Phase 4's own §12 requirement 5 states it plainly: *"G1 and G2 remain in force.
Merging Phase 4 unblocks no implementation and adds no Wave 0 item."* This
section records that fact rather than creating items.

Phase 4 is the smallest phase by design — it designs no asset system, because
every briefed item already had an owner. Its five cross-owner handoffs
(EH-1…EH-5, §0.3) are **now listed as gated items in Wave H above** (drafted
2026-07-31, all unchecked). They remain proposals awaiting their owners and are
not approved by canonicalization. Three carried a standing flag, which Wave H's
rows preserve:

| Handoff | Why it needs care |
|---|---|
| **EH-1** | `contentQualityDashboard.ts`'s `WorkQueueItem` gains an authored-demand input. The subsystem is registered **COMPLETE / never rebuild**, so this is an extension routed to its owner, never a re-implementation. Note also that `buildWorkQueue()` filters out items classified `none`, so integration is not purely additive at the type level — the review recorded this as an Important item, unresolved. |
| **EH-2** | The sufficiency vector is published as a per-concept read model. `coveragePercent` is **unchanged** and reinterpreted, not replaced. |
| **EH-3** | A handoff that requests **no change**: ADR 13's `CuratorQueueEntry.trigger` union gains no member. All three existing triggers are degradation signals; absence is routed to the work queue instead. Recorded so the two queues are not merged by accident. |

EH-4 (filing CT-1…CT-4 against CEKR §10's `Conflict` node) and EH-5 (index
pointers) carry no implementation. **W4-2 is unchanged and remains gated**;
Phase 4's canonicalization does not unblock it.
