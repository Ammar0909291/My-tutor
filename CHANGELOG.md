# Changelog

All notable changes to this project are documented here.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Entries describe what changed and what it means for behaviour — a change that
alters no runtime behaviour says so explicitly, because in this codebase that
is the interesting property.

---

## [Unreleased] — Implementation Program v2 (WP-0 … WP-9)

Branch `claude/teaching-quality-architecture-xd00jx`, 14 commits against
`main @ 827f3796`. 45 files, +4442 / −37.

The campaign implements the capture, persistence and evaluation layers of the
canonical Phase 1–4 architecture. **Almost all of it is shadow**: with one
exception noted under *Changed*, no teaching decision, response, prompt or API
differs from before this branch. Nothing was applied, adapted, admitted or
enforced — the packages build the instruments that later, separately-gated work
will read.

### Added

**Evidence capture (WP-3, P1-1, WP-8)**
- `DecisionRecorded` payload v2 — four optional fields (`attemptVector`,
  `adaptationState`, `adjustmentRecord`, `consumesReteachBudget`) on **one**
  event, **one** payload, **one** turn, emitted by the **single existing**
  `emitTurn()` call. V1 rows decode unchanged; `DecisionRecordedV2` extends
  `DecisionRecordedV1`, so compatibility is structural rather than asserted.
- `AttemptVector` capture (Phase 1 Stage 1) as a **declared self-report**, not
  a derivation. Phase 1 §11.2 rules out inferring pedagogical intent from
  rendered output; the composing component declares its own choices through an
  invisible tag that is stripped before the reply is stored, rendered or
  parsed further. Honesty class **PROXY**, exported as a constant.
- Typed six-dial `AdaptationStateVector` (D1 SCAFFOLD … D6 INTERLEAVING),
  declared on the **same** tag — attributes, not a second tag, so there remains
  exactly one declaration channel and one capture path.

**Persistence (WP-4)**
- Four **nullable** columns on two **existing** tables:
  `concept_mastery_records.adaptationState`, `.representationDependence`,
  `evidence_events.scaffoldLevel`, `.hintDebt`.
  Migration `20260801000000_wp4_persistence_carriers` — additive only, no
  table, no model, no backfill, no column dropped or retyped.
  **These columns have no writer.** They are carriers for gated work; `NULL`
  means "not captured", never a default.

**Policy store (WP-8 prerequisite)**
- `src/lib/config/brainConfig.ts` — the first runtime reader for the
  `BrainConfig` table, which had existed with none. RS §18 supplies the
  normative default; a stored row overrides it. Mis-typed rows are rejected
  rather than coerced; a store failure degrades to the default **and records
  why**.

**Evaluation, shadow (WP-5, WP-6, WP-7, WP-8, WP-9)**
- Phase 1 Stage 2 + 3–7: TQ-5's 11 gates and 10 dimensions; TQ-4's Difference
  Operator with a **total and pure** `closure()`; the paraphrase baseline.
- Phase 2 V2 + V3–V6: VD-9 quality criteria, VD-1 admission over the ten
  enumerated contraindications, VD-7 fallback authorisation, VD-6 withdrawal
  gates MG-1/MG-2.
- Phase 3 S2 + S3–S7: AF-ladder publication, and the five adaptation stages
  evaluated with `applied: false` on every report.
- H-2: approach history as TQ-4's typed `failedAttempts` set, **derived** from
  captured AttemptVectors — no second history, no second store.
- EH-1 authored-demand input to the live authoring queue (closes the
  `totalServed === 0` blind spot that made never-served concepts invisible);
  EH-2 sufficiency vector as a per-concept read model.
- VH-1/2/3/4/7: `VisualIntent` and `VisualAvailability` projections, RRM
  recording the intent behind each rendered visual.

### Changed

- **The system prompt.** One capture instruction is appended per turn
  (~1172 characters, soliciting the declaration tag). This is the campaign's
  only behavioural surface. It is gated by `ENABLE_ATTEMPT_CAPTURE`; with the
  flag off the prompt is byte-identical to pre-campaign. Nothing reads the
  captured vectors on the live path, so no teaching decision differs — but the
  model's input is not byte-identical by default, and that is stated here
  rather than buried.
- `coveragePercent` is **unchanged** and reinterpreted, not replaced (EH-2).
- `writer.ts` now stamps `schemaVersion` per event type. It previously
  hardcoded `1` for all twelve types, which would have made any version bump a
  silent no-op.

### Fixed

- **B-1 — the declaration tag could reach the learner.** The strip regex was
  written as a copy of `signals.ts` but omitted its `(?:-->|\/>)` alternation,
  so a self-closing tag was never removed and was returned in `cleanText`,
  stored as the assistant message and rendered. `signals.ts` already documented
  this exact failure mode; the copy did not carry the original's fix. Now:
  identical semantics to `SIGNAL_RE`, plus a residual sweep for unterminated
  fragments, plus the `ENABLE_ATTEMPT_CAPTURE` switch. **Stripping is
  deliberately not gated** — a model can emit the tag from conversation context
  after the instruction is removed, so a disabled feature still cannot expose
  one.

### Documentation

- ADR 08 (Posture layer), ADR 12 (purpose dimension; a11y bar raised from
  *present and non-empty* to *instructionally equivalent*), ADR 13
  (`CuratorQueueEntry.trigger` gains no member, and why), `ENGINE_REFERENCE`
  (#16 corrected — `teachingOutputBias.ts` is a stub whose every export
  returns a constant), Bible §3/§6.8 Phase 2 pointers, `eos-v3` scaffold
  vocabulary bound to RS §3.4.
- **RS §18 amended by a new Appendix A-1**, and **CEKR by Appendix C**
  (CT-1…CT-4 filed as `OPEN` Conflicts) — Frozen documents amended by
  appendix that states what it changes, never by silent edit.
- `WP_R_RUNTIME_RECONCILIATION.md` — the reconciliation of 13 per-turn capture
  subsystems that WP-3 depended on.
- Wave 0 checklist gains 31 cross-owner handoff items as gated entries.

### Governance

- **G1 (Canonical KG v1 freeze): NOT declared.** `campaign_version:
  1.0.0-draft`, 1 of 6 subjects frozen. Externally owned by the Curriculum
  Production Pipeline; nothing in this branch advances it.
- **G2: 15 items are implementation-complete and awaiting owner signature**
  (`W1-2 H-1 H-2 VH-1 VH-2 VH-3 VH-4 VH-7 VH-8 AH-1 AH-3 AH-12 EH-1 EH-2
  EH-5`). Six further items are **carrier-only** (`AH-2 AH-6 AH-11 H-5 VH-6
  AH-8`) and must not be signed as complete.
- This branch grants no approval. Merging it does not check a box.

### Module reachability

Every module added by this campaign is intentionally placed. Recorded here so
a future reader does not mistake an unreferenced file for dead code:

| Module | Reachability | Why |
|---|---|---|
| `teaching/attemptVectorSignal.ts` | **Live** | The only campaign code on the request path: instruction, parse, strip. |
| `teaching/adaptation/asv.ts` | **Live (parser only)** | `readAsvAttributes` reads the same tag; the rest of the module is shadow. |
| `config/brainConfig.ts` | **Unreferenced — intentional** | The policy-store reader. Its first consumer is a gated item; `prismaBrainConfigStore` is the production adapter, unused until then. |
| `teaching/adaptation/{governor,policyRules,shadowStages}.ts` | **Unreferenced — intentional** | Shadow control plane. `PHASE3_GOVERNOR_RULES` is exported and deliberately **not** registered into the policy pack: AH-11 makes wiring the runtime owner's decision. |
| `teaching/evaluation/*` | **Unreferenced — intentional** | Offline evaluators. Importing them from the request path would end shadow mode. |
| `teaching/visualIntent.ts` | **Type-only** | Imported by `teaching-engine/types.ts` and `renderedRealityModel.ts` as `import type`, so no runtime coupling. |
| `teaching/assets/sufficiency.ts` | **Unreferenced — intentional** | Read-only analytics. Deliberately **not** added to the assets barrel: that barrel serves the serving path, and `contentQualityDashboard.ts` — which this sits beside — is excluded for the same reason. |

### Notes for deployment

- One additive migration runs via `prisma migrate deploy`. Safe on a live
  database: four nullable columns, no lock-heavy operation, no backfill.
- New optional environment variable: `ENABLE_ATTEMPT_CAPTURE` (default on; set
  to `0` to disable the declaration tag and restore the pre-campaign prompt).
- No change to `package.json`, `tsconfig.json`, `next.config.js` or
  `vercel.json`.
