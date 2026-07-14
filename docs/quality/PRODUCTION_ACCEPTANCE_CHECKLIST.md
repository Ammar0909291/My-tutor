# Production Acceptance Checklist

The final gate. A blueprint becomes part of the Educational Brain only
when it passes every MANDATORY item below. Failing any single mandatory
item → **NOT ACCEPTED**, no exceptions, regardless of scorecard band or
prose quality. This checklist composes the audits in this directory into
one accept/reject decision.

The checklist does not review the blueprint's ideas (that is Pappu's
authoring authority) — it verifies the blueprint is internally
consistent, deterministic, reusable, and instrument-complete enough to
scale. Content correctness is the author's; conformance is QA's.

---

## 1. Mandatory gates (any FAIL → NOT ACCEPTED)

**Structural**
- [ ] G1 — Declared class (FULL / SKELETON) present; all required
  sections for that class present and non-empty (Validation V1–V3).
- [ ] G2 — Identity anchored: KG id = filename, resolves to a real KG
  node; prerequisites state load-bearing part; observable objectives
  (V4–V7).

**Instruments (the moat — hardest gates)**
- [ ] G3 — Misconception library present with ≥1 entry; every entry
  scores ≥ 8/10 with no zero attribute; every birth type VALID
  (Misconception Quality Audit; Validation V11–V13).
- [ ] G4 — Assessment names concrete items with a distractor-mapped
  golden probe where one exists, and a gate set with a DELAYED component
  (V19–V20).
- [ ] G5 — AI Removal Audit: all five probes PASS and the residue ledger
  is fully authorized (`AI_REMOVAL_AUDIT.md`).

**Consistency & determinism**
- [ ] G6 — Teaching actions: no unknown action, no family mislabel, no
  conflicting dispatch, no knowledge-type mismatch (Consistency T1/T2/T5/T6).
- [ ] G7 — Sequence fidelity: any 7-step repair, fading ladder, or
  discovery design used is complete and in order; preemption never
  overridden (Protocol PR6–PR9).
- [ ] G8 — Concrete-before-abstract for beginner-reachable concepts:
  beginner mental model is concrete, abstract earned last,
  demonstrate-before-explain in dispatch (CPA C1/C3/C5).

**Reusability (anti-scale-rot)**
- [ ] G9 — No universal engine restated (V30); nothing concept-generic —
  every line earned by this concept (V31).
- [ ] G10 — Discovery lesson chose and argued a side (V16); recovery
  notes concept-specific only (V21).

---

## 2. Quality gates (FLAG → revise before acceptance; do not hard-block if resolved)

- [ ] Q1 — Scorecard band A or B (≥ 75). A C-band blueprint is revised to
  B before acceptance; a D-band is rejected outright.
- [ ] Q2 — Tier-A concepts: band A required (≥ 90) — the highest-impact
  concepts meet the seed bar, not merely pass.
- [ ] Q3 — No teaching-action synonym-watchlist hits; no terminology
  drift (Consistency T3).
- [ ] Q4 — Prose libraries meet minimums for a FULL entry (≥2
  explanations, ranked analogies with breaking points, home-doable demo);
  or legitimate labelled deferral in a SKELETON (V14–V15).
- [ ] Q5 — Curriculum-feedback recorded if the blueprint surfaced any KG
  issue (missing prerequisite edge, difficulty mislabel) — surfaced to
  the Pipeline, never fixed locally.

---

## 3. Forward-compatible gates (N/A until the construct is authored)

- [ ] F1 — Primitive usage (approved-only, no hidden creation) — **N/A
  until a Primitive Library exists** (`PRIMITIVE_USAGE_AUDIT.md`).
- [ ] F2 — Protocol usage (approved-only, sequencing intact) — **N/A
  until a Protocol Library exists** (`PROTOCOL_USAGE_AUDIT.md`).
- [ ] F3 — CPA construct compliance — **N/A until a CPA Library exists**
  (`CPA_COMPLIANCE_AUDIT.md`). (The concrete-first *principle* is already
  enforced by G8.)

An N/A gate is a PASS for acceptance. A blueprint is never blocked for
lacking a construct the framework has not authored.

---

## 4. The decision

```
ACCEPTANCE: {kg-id}   CLASS: {FULL|SKELETON}   TIER: {A|B|C}
MANDATORY GATES G1–G10:  {10/10 | list FAILs}
QUALITY GATES Q1–Q5:     {5/5 | list FLAGs}
FORWARD GATES F1–F3:     N/A (constructs not yet authored)
SCORECARD: {n}/100  BAND: {A|B|C|D}
DECISION:  ACCEPTED | NOT ACCEPTED
```

Rules:
- **Any G-gate FAIL → NOT ACCEPTED.** Return to author with the exact
  G-number(s) and the specific line(s).
- **Any Q-gate FLAG → revise-then-accept** (not a rejection, but not
  accepted until resolved).
- **F-gates are N/A** and never block.
- Acceptance is recorded (blueprint id, class, tier, score, date, gates
  passed) so the dashboard's Panel 7 and the audit trail stay accurate.

---

## 5. What acceptance guarantees

An accepted blueprint is: structurally complete for its class,
instrument-strong (misconceptions ≥8, assessment with a delayed gate),
AI-removal-clean (teaches without a smart renderer patching gaps),
consistent (no action/terminology/sequence drift), reusable (no engine
restatement, nothing paste-anywhere), and concrete-first. It is NOT
guaranteed pedagogically perfect — that judgement remains the author's.
This checklist guarantees the blueprint will *scale* without dragging the
Brain's average quality down, which is the entire purpose of this QA
layer: hundreds or thousands of concepts, one consistent standard, no
uninterrupted authoring.
