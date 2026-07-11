# Blueprint Validation Specification

The complete, deterministic specification a concept blueprint must pass
to be structurally valid. Every check resolves to PASS or FAIL. This
document checks conformance to `educational-brain/concepts/TEMPLATE.md`
and `COVERAGE.md`; it never redefines them.

---

## 0. Scope and entry classes

A blueprint is one file `educational-brain/concepts/{subject}/{kg-id}.md`.
`COVERAGE.md` defines two valid classes; validation branches on which the
author declared:

- **FULL entry** — all 14 mandatory sections present and substantive.
- **INSTRUMENTED SKELETON** — the instrument sections at seed quality;
  prose sections (Explanation / Analogy / Demonstration) may be thin or
  a labelled deferral. The file MUST carry a top-of-file label declaring
  itself a skeleton (COVERAGE.md §Amendment).

A file that is neither (thin prose, no instruments) is INVALID —
`COVERAGE.md`: "the reverse remains invalid."

---

## 1. Mandatory section presence (the 14 + 1)

Exact headers from `TEMPLATE.md`. Each is a hard gate: absent → FAIL.

| # | Section header | FULL | SKELETON | Instrument? |
|---|---|---|---|---|
| 1 | `## Identity` | required | required | anchor |
| 2 | `## Mental models` | required | required¹ | HIGH-prose |
| 3 | `## Why beginners fail here` | required | required | — |
| 4 | `## Misconception library` | required | **required** | **INSTRUMENT** |
| 5 | `## Explanation library` | required | deferrable² | prose |
| 6 | `## Analogy library` | required | deferrable² | prose |
| 7 | `## Demonstration library` | required | deferrable² | prose |
| 8 | `## Discovery lesson` | required | required³ | — |
| 9 | `## Teaching actions` | required | required | dispatch |
| 10 | `## Voice teaching` | required | required | — |
| 11 | `## Assessment` | required | **required** | **INSTRUMENT** |
| 12 | `## Recovery notes` | required | required | — |
| 13 | `## Memory & review` | required | required | — |
| 14 | `## Transfer map` | required | required | — |
| 15 | `## Curriculum feedback` | if earned | if earned | — |

¹ Mental models may be compressed in a skeleton but the four-stage
structure must still be named (it drives model-versioning).
² Deferrable only in a labelled SKELETON, and only as an explicit
"deferred — see COVERAGE quality bar" line, never as silent absence.
³ Discovery lesson must still *choose a side* (guided discovery vs.
argued direct instruction) even in a skeleton — an empty choice fails.

**Check V1**: every non-deferrable section header is present verbatim.
**Check V2**: no section is present-but-empty (header followed only by
whitespace or a single placeholder line).
**Check V3**: skeleton files carry the top-of-file skeleton label;
full files do not claim deferral on any section.

---

## 2. Per-section content rules (objective)

Each rule is a FAIL condition. These operationalize `TEMPLATE.md`'s prose
requirements into checkable predicates.

**Identity (1)**
- V4: KG id in the header matches the filename and resolves to a real
  node in `docs/{subject}/kg/graph.json` (binding rule — no entry
  without a KG node).
- V5: Prerequisites list states, per prerequisite, *what part is load-
  bearing* — not just the id. A bare id list fails.
- V6: Difficulty / Bloom / mastery threshold / est. hours are present and
  match the KG (restated for self-containment; KG authoritative on
  divergence).
- V7: 2–5 observable "the learner can…" objectives; each is observable
  (contains a demonstrable verb, not "understand"/"know").

**Mental models (2)**
- V8: Four stages named (beginner/intermediate/advanced/expert) OR an
  explicit statement of why fewer apply.
- V9: Each stage states the runnable simulation AND its upgrade trigger
  AND the shelf-life warning (model versioning) — a stage with no
  upgrade trigger fails (this is Universal Principle 6's install point).

**Why beginners fail here (3)**
- V10: Names an actual failure mechanism (a "why"), not a restatement of
  the concept's difficulty.

**Misconception library (4) — INSTRUMENT, hard-gated**
- V11: ≥1 misconception entry (a concept genuinely free of misconceptions
  must state so explicitly and justify it — rare; flagged for reviewer).
- V12: Each entry has all five fields (full spec in
  `MISCONCEPTION_QUALITY_AUDIT.md`): name · birth type · characteristic
  phrase · detection probe (askable verbatim) · recovery path ·
  verification-of-death items. Missing any → FAIL.
- V13: Birth type is one of the 6 authored types (`misconceptions/01`); an
  unlisted birth type fails.

**Explanation / Analogy / Demonstration (5–7) — prose**
- V14: In a FULL entry, ≥2 independent explanations by register/entry-
  state/frame; analogy library ranks each with its breaking point and
  names ≥1 anti-analogy (or states genuine absence); demonstration
  library has ≥1 home-doable, no-equipment demo with a prediction to
  elicit first.
- V15: In a SKELETON, each deferred section is a labelled deferral, not
  empty.

**Discovery lesson (8)**
- V16: Chooses exactly one form (guided-discovery design OR argued
  direct-instruction) and argues it. Silence or "either" fails.

**Teaching actions (9) — dispatch**
- V17: Names actions from the 27-action catalog (`teaching-actions/`) in
  recommended order with a concept-specific reason each. An action not in
  the catalog fails (see `TEACHING_ACTION_CONSISTENCY.md`).

**Voice teaching (10)**
- V18: Describes the ideal tutor's perception (what to listen for on THIS
  concept). Does NOT re-litigate the channel-reality gap — that is owned
  centrally by `foundations/03 §7` per `TEMPLATE.md`.

**Assessment (11) — INSTRUMENT, hard-gated**
- V19: Names concrete ITEMS, not policy references — a golden probe (if
  one exists), distractor-mapped items, the mastery gate set stated with
  production/new-surface/mixed/delayed components for THIS concept.
- V20: The gate set names a delayed component (Universal Principle 17 —
  same-session performance never certifies).

**Recovery notes (12)**
- V21: Concept-specific ONLY — which authored Recovery Engine utterance
  is likeliest here and the concept-specific smaller-question to shrink
  to. Restating the general engine fails (that is `foundations/01`'s job).

**Memory & review (13)**
- V22: States concept type (fact/procedure/concept/tool) → review form,
  plus interleaving partners (which sibling concepts to mix for
  discrimination).

**Transfer map (14)**
- V23: Near/far/cross-subject/real-world targets stated as actual
  situations, not categories. Uses KG `cross_links` where present.

---

## 3. Cross-section consistency (the authoring checklist, re-run)

`TEMPLATE.md`'s 9-item authoring checklist, restated as reviewer gates:
- V24: Every prerequisite line says what PART is load-bearing (=V5).
- V25: Every misconception has an askable probe and a characteristic
  phrase (=V12 subset).
- V26: Every analogy has a breaking point; ≥1 anti-analogy exists or its
  absence is genuinely argued.
- V27: The discovery section chose a side (=V16).
- V28: ≥1 demonstration is home-doable, no equipment.
- V29: The gate set names concrete items (=V19).
- V30: **No section restates a universal engine** (recovery scripts,
  the D1 grid, Universal Principles, the birth taxonomy) — restatement
  is a de-duplication failure; the entry must reference, not copy.
- V31: **Nothing in the entry could be pasted into a different concept's
  entry unchanged** — every line is earned by THIS concept. A reviewer
  spot-checks 3 random lines; any that are concept-generic fail.
- V32: Read aloud — every script survives being spoken (sampled).

---

## 4. Determinism of validation itself

- Every check above is binary and re-runnable by a different reviewer
  with the same result. Where a check samples (V31, V32), the sample
  size and pass bar are fixed (3 lines; 0 generic lines tolerated).
- Validation reads ONLY the blueprint + the referenced framework files.
  It never consults the author's intent or unwritten context.
- A blueprint's class (FULL/SKELETON) is declared by the author, not
  inferred — validation checks the declared class's gates.

---

## 5. Output of a validation run

```
BLUEPRINT: {kg-id}   CLASS: FULL|SKELETON
SECTION PRESENCE:  {14/14 | list missing}
INSTRUMENT GATES:  Misconception PASS|FAIL  Assessment PASS|FAIL
CONTENT CHECKS:    {n passed}/{n} — list every FAIL with its V-number
CONSISTENCY:       V30 dedup PASS|FAIL  V31 concept-specificity PASS|FAIL
RESULT:            VALID | INVALID (any hard gate FAIL → INVALID)
```

A blueprint is **structurally valid** only when every hard gate (V1–V3,
V4, V11–V13, V16, V17, V19–V20) passes. Structural validity is necessary
but not sufficient for acceptance — see `PRODUCTION_ACCEPTANCE_CHECKLIST.md`.
