# Wave 0 — Per-Item Implementation Approval Checklist

**Status:** Prepared 2026-07-04 (integration-prep). **Nothing on this list
is approved.** This document grants no permission by existing — it is the
instrument the project owner uses to grant it, one checkbox at a time.

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

**Recording an approval:** check the box, append `(YYYY-MM-DD, name)`,
commit with message `governance: approve <IDs>`. Then implementation of
those items may begin, in dependency order, under the validation gates
named per wave. Anything unchecked stays architecture-only, per Bible
§10.1 rule 2.

---

## Phase 1 Teaching Quality Architecture — items not yet listed

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

Phase 1's other cross-owner handoffs (H-2…H-6, §0.3) are likewise proposals
awaiting the runtime owner and are not approved by canonicalization.

---

## Phase 2 Visual Intelligence Architecture — items not yet listed

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
unblock it. Phase 2's eight cross-owner handoffs (VH-1…VH-8, §0.3) are likewise
proposals awaiting the runtime owner and are not approved by canonicalization.

---

## Phase 3 Adaptive Teaching Architecture — items not yet listed

`PHASE_03_ADAPTIVE_TEACHING_ARCHITECTURE.md` became **CANONICAL** on 2026-07-31
(v3.1.0). As with Phases 1 and 2, canonical means the architecture is agreed; it
authorizes **no implementation**. Its §25 sequences implementation by
evidence-unlock, and **no stage has an approval item here** — so all remain
architecture-only by default.

Phase 3's own §29 requirement 5 states it plainly: *"G1 and G2 remain in force.
Merging Phase 3 unblocks no implementation and adds no Wave 0 item by itself."*
This section records that fact rather than creating items.

Its twelve cross-owner handoffs (AH-1…AH-12, §0.3) are proposals awaiting the
runtime owner and are not approved by canonicalization. Two deserve flagging
before any Wave 0 item is drafted:

| Handoff | Why it needs care |
|---|---|
| **AH-1** | `C-32`'s four unstructured outputs become one typed Adaptation State Vector. `C-32` retains the loop, the band and the veto, and **transfers the adjustment decision** — an ownership change, not only an instrument. |
| **AH-2** | The ASV is persisted as per-learner-per-concept standing state in an existing ADR 10 store. **No new store** — but §29 notes this is "the one that looks small and is not." |

`AH-9` is a documentation correction to `ENGINE_REFERENCE.md` #16 and carries no
implementation. ISS-01 remains **BLOCKED**; Phase 3 does not resolve it, and
§10.2/§16 must be re-checked whichever way it resolves.
