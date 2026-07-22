# Educational Brain Coverage Roadmap

Live progress tracker for the Curriculum Completion Program (see
`CLAUDE.md`'s "Curriculum Completion Program" section for governance).
Computed directly against the live KG files and the live
`educational-brain/concepts/` directory tree — regenerate the counts
below from source whenever this file is updated, never hand-estimate.

---

## 1. Totals

| Metric | Value |
|---|---|
| Total KG concepts (all 6 subjects) | **1,756** |
| Concepts with an Educational Brain entry | **94** |
| Remaining | **1,662** |
| Completion percentage | **5.35%** |

---

## 2. Subject progress

| Subject | KG concepts | EB entries | Coverage | Entry point(s) | Entry points covered |
|---|---|---|---|---|---|
| mathematics | 908 | 24 | 2.64% | `math.found.mathematical-thinking` | **Yes** |
| physics | 238 | 67 | 28.15% | `phys.meas.units` | Yes |
| english | 216 | 3 | 1.39% | `eng.phonics.phonemic-awareness`, `eng.phonics.print-concepts` | Yes (both) |
| chemistry | 186 | 0 | 0.00% | `chem.found.matter` | No |
| biology | 89 | 0 | 0.00% | `bio.found.what-is-biology` | No |
| computer_science | 119 | 0 | 0.00% | `cs.found.intro-computers` | No |

Physics's KG count reflects the 2026-07-22 Particle Physics + Semiconductor
Physics additions (216 → 238); its 67 existing entries predate that
addition and cover none of the 22 new concepts.

---

## 3. Domain status — math.found (IN PROGRESS)

| Metric | Value |
|---|---|
| Domain | `math.found` (mathematics / Foundations) |
| Total concepts in domain | 82 |
| Authored this program | 23 |
| Remaining | 59 |
| Status | **IN PROGRESS** — not eligible for Domain Certification yet |

Wave 1 (5, level 0-1): `mathematical-thinking` (root), `abstraction`,
`pattern-recognition`, `problem-solving`, `mathematical-language`.
Wave 2 (8, level 2): `definition`, `generalization`,
`inductive-reasoning`, `logic`, `mathematical-modeling`,
`mathematical-notation`, `mathematical-symbols`,
`problem-solving-strategies`. Wave 3 (6, level 3): `axiom`,
`deductive-reasoning`, `proposition`, `reading-mathematics`,
`set-theory`, `variable`. Wave 4 (4, level 4, complete this batch):
`axiomatic-system`, `logical-connectives`, `predicate`, `set`. Wave 5
(8, level 5 — prerequisites now fully satisfied by Wave 4) is next:
`cartesian-product`, `empty-set`, `ordered-pair`, `predicate-logic`,
`set-builder-notation`, `set-membership`, `set-theory-axiomatic`,
`truth-table`. No other domain will be started until all 82
`math.found` concepts are `READY` and Domain Certification passes.

---

## 4. Current batch

**Curriculum Completion Program batch 7** (this batch, Domain
Certification Mode, math.found Wave 4): authored 4 concepts — every
`math.found` node whose prerequisites became fully satisfied after
Wave 3 (`axiomatic-system`, `logical-connectives`, `predicate`, `set`).
All 4 reuse an existing Blueprint by reference, citing Misconception
Registries without duplicating worked examples or mastery probes. One
new genuine Curriculum Feedback finding (not fixed, no KG/Blueprint
modified): `math.found.set`'s Misconception Register substantially
overlaps `math.found.set-theory`'s own (order/repetition, ∅-vs-{∅}) —
recorded honestly rather than silently merged. The open `mathematical-
notation`/`mathematical-symbols` item from Wave 2 remains carried
forward unresolved. Domain not yet complete; certification not run
(would fail — 59/82 still missing). No other domain touched.

**Prior batch (batch 6, Domain Certification Mode, math.found Wave 3)**:
authored 6 concepts — every `math.found` node whose prerequisites became
fully satisfied after Wave 2 (`axiom`, `deductive-reasoning`,
`proposition`, `reading-mathematics`, `set-theory`, `variable`). 5 of
the 6 reuse an existing Blueprint by reference; 1 (`reading-
mathematics`) has no existing Blueprint, stated explicitly, with
misconceptions authored directly via the birth-taxonomy diagnostic
procedure.

**Prior batch (batch 5, Domain Certification Mode, math.found Wave 2)**:
authored 8 concepts — every `math.found` node whose prerequisites became
fully satisfied after Wave 1. 5 of the 8 have no existing Blueprint
(stated explicitly in each entry rather than omitted); misconceptions
for those were authored directly via the birth-taxonomy diagnostic
procedure. One genuine KG-adjacent finding recorded as Curriculum
Feedback (not fixed): the close resemblance between
`math.found.mathematical-notation` and `math.found.mathematical-
symbols`.

---

## 5. Priority queue

1. **`math.found` Wave 5 (8 concepts, level 5)**: `cartesian-product`,
   `empty-set`, `ordered-pair`, `predicate-logic`,
   `set-builder-notation`, `set-membership`, `set-theory-axiomatic`,
   `truth-table`.
2. **`math.found` Waves 6+ (51 remaining concepts)**, in strict
   topological order, until all 82 are `READY`.
3. Only after `math.found` is 100% complete and certified: the queue
   returns to cross-subject priorities — `chem.found.matter`,
   `bio.found.what-is-biology`, `cs.found.intro-computers`, then
   physics's Particle Physics / Semiconductor Physics domains, then
   everything else in prerequisite order.

Full computed order (all 1,662 remaining concepts): see
`AUTHORING_QUEUE.md` — §5 above (the domain-completion constraint) takes
precedence over that file's literal row order until `math.found` is
complete.

## 6. Next batch

**Batch 8 (recommended)**: continue `math.found` Wave 5 — the 8 level-5
concepts listed in §5 item 1, in strict prerequisite order, no other
domain started.
