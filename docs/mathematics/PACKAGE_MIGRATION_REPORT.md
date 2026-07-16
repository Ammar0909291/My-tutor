# Mathematics Educational Package Migration — Compile & QA Report

**Date:** 2026-07-16
**Compiler:** `blueprint-frontend@0.3.0-physics-migration` (unchanged compiler id —
reused verbatim, no new compiler version needed for mathematics)
**Command:** `npm run compile:package -- --prefix math.` (batch mode; `--check` for
the determinism gate)
**Result: 153/154 mathematics blueprints compiled to DRAFT Educational Packages.**
(1 blueprint has a documented, permanent content gap — see §6.)

## 1. Gap analysis vs. Physics (Phase 1)

| Dimension | Physics | Mathematics | Note |
|---|---|---|---|
| KG concepts | 216 | 908 | mathematics KG frozen v1.0.1, 24 domains |
| Teaching Blueprints authored | 217 (100%+) | 154 (17.0%) | **the real gap**: 754 KG concepts have no blueprint yet — a Curriculum Production Pipeline authoring gap, out of this session's scope (governance: this session does not author curriculum) |
| Blueprints compiled to packages | 217/217 | 153/154 | this sprint's deliverable |
| Package Runtime proven | yes | yes (this sprint) | |
| Educational Brain integration | yes | yes (this sprint) | |

**Bottom line:** mathematics reaches full feature/architecture parity with physics
for every blueprint that exists. The corpus-completeness gap (154 vs. 908) is a
content-authoring gap belonging to the Curriculum Production Pipeline, not an
architecture or tooling gap — nothing in Phases 2-5 was blocked by it, and
nothing in this session touches the KG or authors new blueprints.

## 2. Format coverage added (Phase 2 — parser extended, not redesigned)

The Blueprint Front-End parser required the same category of purely additive,
title/shape-keyword extensions used for the physics migration — no compiler
logic, no rule/asset model changes:

| Gap found | Fix | Blueprints affected |
|---|---|---|
| C0 section titled "Metadata Header" (not "Metadata") | broadened `^metadata\b` match | ~5 |
| Table-cell values/labels wrapped in backticks (`` `math.arith.division` ``) | strip backticks from both label and value matches | ~10 |
| Table-cell labels with a trailing colon inside bold (`**Blueprint ID:**`) | tolerate trailing `:` before closing emphasis | ~2 |
| ALL-CAPS / non-standard field names (`BLUEPRINT_ID`, `KG_ID`, `KG concept ID`, `Concept name`, `Mastery`, `Est. Hours`) | new label aliases | ~10 |
| `requires` list separated by `·` instead of `,` | split on `[,·]` | ~5 |
| Table cell literally `[]` misread as a prerequisite named "`[]`" | normalize bracket-only cells to empty | 1 |
| `#### TA-A01` (4-hash) and `### TA-A01: Title` (colon) TA headers | widened `TA_HEADER_RE` | ~15 |
| Bold-only MC headers with no `###` at all (`**MC-1 (FOUNDATIONAL) — …**`) | new `MC_BOLD_HEADER_RE` pass | 4 |
| `"## Component N (continued) — Title"` never recognized as its own section (silently absorbed into the previous section's body) | `SECTION_HEADER_RE` now tolerates `(continued)` | 39 files contain this pattern |
| Bare bullet-point "Teaching Actions" section with no TA-id/table/bracket structure at all | new bullet-list TA fallback (Shape 6) | 2 |
| `bloom_level:` key (not `bloom`/`bloom_target`) | new alias | 8 |
| "Prerequisites (Tier 1)" label variant (space before parenthetical) | new regex alias | ~3 |

Every fix is a title-keyword or label-alias addition, consistent with the
parser's stated design rule ("format-agnostic… extending the corpus should
need only a new keyword, not a parser rewrite"). **Zero regressions**: physics
was re-verified at 217/217 compile and 217/217 byte-identical `--check` after
every parser change; `git diff` against the committed physics artifacts shows
**zero bytes changed**.

## 3. Asset lowering coverage added

Mathematics blueprints structure worked examples and mastery gates
differently from physics: instead of a dedicated top-level "Worked Examples"
or "Mastery Probes" section, both are frequently authored as a **named
Teaching Action embedded inside the main Protocol sequence** (e.g.
`### TA-A02 — Worked Example Pair: Column Addition with Carrying` or
`### Teaching Action A03 — Mastery Gate (P91)`). Fixes, all additive:

- `BlueprintTeachingAction` gained an optional `body` field (parser's primary
  TA-header extraction shape only) so asset lowering can recover the TA's own
  verbatim content — a structural addition, not a new data model.
- `lowerWorkedExamples` gained a fallback: any teaching action whose title
  matches `/worked example/i` becomes a `worked_example` asset from its body.
- `lowerMasteryProbes` gained the same fallback for `/mastery (gate|assessment|probe)/i`
  titled teaching actions.
- `lowerCoreExplanation` gained a `"Concept Snapshot"` title alias (one more
  authored name for the same core-explanation concern already covered by
  "Concept Spine" / "Cognitive Map" / "Core Idea").

## 4. Validation results (Phase 3)

All 153 compilable artifacts pass the full loader validation chain
(structural schema, conceptId match, compiler allowlist, semver, DRAFT
status, rule-layer hash, whole-package hash) and are byte-for-byte
deterministic (`--prefix math. --check`, 153/153, wired into the same CI
step physics uses).

Asset-kind QA baseline — **100% on every package** (misconceptions, teaching
action metadata, mastery probes, and an explanation surface via
core_explanation or learning_objective — the identical baseline enforced for
physics):

| Kind | Coverage | Note |
|---|---|---|
| misconception | 153/153 | required baseline ✓ |
| teaching_action_meta | 153/153 | required baseline ✓ |
| mastery_probe | 153/153 | required baseline ✓ (56→153 after the embedded-TA fallback) |
| core_explanation ∪ learning_objective | 153/153 | required baseline ✓ (149→153 after the Concept Snapshot alias) |
| core_explanation | 137/153 | |
| learning_objective | 20/153 | |
| reference | 131/153 | |
| teaching_note | 151/153 | |
| worked_example | 29/153 | **structural, not a defect** — the other 124 fold examples into general TAs rather than a separately-titled Worked Example block (99/154 blueprints mention "worked example" in prose; only 29 title a TA/section with it). Mirrors physics, where 106/217 packages also had none — authored-content variance, not a parser gap. |
| adaptive_rule | 0/153 | not authored in this corpus generation (physics: 66/217) |
| session_flow | 0/153 | not authored in this corpus generation (physics: 100/217) |

Metadata: bloom 153/153, difficulty 153/153, masteryThreshold 153/153,
prerequisites 150/153 (3 are genuine root concepts with none), name 145/153
(8 blueprints never author a `name`/`concept_name` field — a content
omission, flagged not fixed; see §6).

Rules: 997 total (avg 6.5/package). Assets: 2,252 total (avg 14.7/package).

## 5. Runtime verification (Phase 4)

Live-verified with `ENABLE_PACKAGE_RUNTIME=1` against `math.arith.fractions`:
loader → validator → lesson assembler produced a 7,980-byte package-sourced
prompt block (`source: "educational-package"`) with zero blueprint-markdown
reads, identical to the physics proof. The `physicsPackageCorpus.test.ts`
pattern is now duplicated for mathematics in `mathPackageCorpus.test.ts`
(12 tests), asserting every artifact loads, validates, and assembles a
non-trivial lesson.

## 6. Educational Brain verification (Phase 5)

- **Package rule layer → K4 Policy Engine:** `math.arith.fractions`'s
  compiled rule pack was activated (test-only, exactly as the physics proof
  does) and `decide()` returned `CONCRETE_HOOK` with package-rule
  provenance — the identical mechanism physics uses, unmodified.
- **Student Intelligence / Learning Orchestrator:** both are already fully
  subject-agnostic (built with no physics-specific logic in the prior two
  sprints). `buildCurriculumContext('mathematics')` returns all 908 KG
  concepts with prerequisites via the existing `subjectKgAdapter` — proving
  the Learning Orchestrator can already reason over the full mathematics KG,
  independent of the 154/908 blueprint-authoring gap (a `LearningIntent` can
  target concepts with or without a compiled package; `packageId` is simply
  `null` for the 754 not-yet-authored ones).
- **Evidence Loop / Tutor Max:** neither has any subject-specific code path;
  both operate identically for mathematics the moment `ENABLE_PACKAGE_RUNTIME=1`
  is set. No changes were needed or made.

## 7. Remaining blockers / production-readiness gaps

1. **Corpus completeness (the dominant remaining gap):** 754/908 mathematics
   KG concepts have no Teaching Blueprint yet. This is Curriculum Production
   Pipeline authoring work, explicitly out of scope for this session
   (governance: do not generate subject knowledge). Until authored, those
   754 concepts teach via the legacy blueprint-context path exactly as they
   do today (no regression) — they simply aren't package-served.
2. **One permanent content gap:** `math.func.function-concept` cites
   prerequisite `math.alg.variable`, absent from the canonical KG. Needs a
   Curriculum Pipeline decision (add the KG node, or correct the
   prerequisite) — tracked in `mathPackageCorpus.test.ts`'s
   `KNOWN_CONTENT_GAPS`, which will fail loudly if the gap is silently
   forgotten or if it's fixed without updating the test.
3. **8 blueprints omit a display name** (`math.abst.binary-operation`,
   `math.abst.group-theory`, `math.prob.conditional-probability`,
   `math.prob.discrete-rv`, `math.prob.probability-axioms`,
   `math.prob.probability-measure`, `math.prob.random-variable`,
   `math.trig.angle-measure`) — a minor authoring omission, not a compiler
   defect; a future compiler enhancement could fall back to the KG's own
   `name` field, but that requires threading KG concept metadata (not just
   `knownConceptIds`) into the compiler and was judged out of scope for this
   session's "do not redesign the compiler" constraint.
4. **Activation decision (G2-gated):** identical to physics — packages stay
   DRAFT; serving mathematics from packages requires the owner to enable
   `ENABLE_PACKAGE_RUNTIME=1` after review.
5. Worked-example and session-flow/adaptive-rule asset density is lower than
   physics for the reasons in §4 — future authoring passes (Curriculum
   Pipeline territory) can add dedicated Worked Example / Session Flow
   sections to raise this, but it's a content enrichment, not a blocker: the
   required QA baseline is 100% today.
