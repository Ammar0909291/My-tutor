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
| Total KG concepts (all 6 subjects) | **1,775** |
| Concepts with an Educational Brain entry | **102** |
| Remaining | **1,673** |
| Completion percentage | **5.75%** |

---

## 2. Subject progress

| Subject | KG concepts | EB entries | Coverage | Entry point(s) | Entry points covered |
|---|---|---|---|---|---|
| mathematics | 908 | 32 | 3.52% | `math.found.mathematical-thinking` | **Yes** |
| physics | 238 | 67 | 28.15% | `phys.meas.units` | Yes |
| english | 216 | 3 | 1.39% | `eng.phonics.phonemic-awareness`, `eng.phonics.print-concepts` | Yes (both) |
| chemistry | 186 | 0 | 0.00% | `chem.found.matter` | No |
| biology | 108 | 0 | 0.00% | `bio.found.what-is-biology` | No |
| computer_science | 119 | 0 | 0.00% | `cs.found.intro-computers` | No |

Physics's KG count reflects the 2026-07-22 Particle Physics + Semiconductor
Physics additions (216 → 238); its 67 existing entries predate that
addition and cover none of the 22 new concepts. Biology's KG count
reflects the Curriculum Production Pipeline's own 2026-07-22 Biology KG
v2.0.0 freeze (89 → 108 concepts, 19 new concepts incl. a new `bio.div`
domain) — a concurrent, external change to this program's own work,
picked up via rebase; biology still has 0 Educational Brain entries.

---

## 3. Domain status — math.found (IN PROGRESS)

| Metric | Value |
|---|---|
| Domain | `math.found` (mathematics / Foundations) |
| Total concepts in domain | 82 |
| Authored this program | 31 |
| Remaining | 51 |
| Status | **IN PROGRESS** — not eligible for Domain Certification yet |

Wave 1 (5, level 0-1): `mathematical-thinking` (root), `abstraction`,
`pattern-recognition`, `problem-solving`, `mathematical-language`.
Wave 2 (8, level 2): `definition`, `generalization`,
`inductive-reasoning`, `logic`, `mathematical-modeling`,
`mathematical-notation`, `mathematical-symbols`,
`problem-solving-strategies`. Wave 3 (6, level 3): `axiom`,
`deductive-reasoning`, `proposition`, `reading-mathematics`,
`set-theory`, `variable`. Wave 4 (4, level 4): `axiomatic-system`,
`logical-connectives`, `predicate`, `set`. Wave 5 (8, level 5, complete
this batch): `cartesian-product`, `empty-set`, `ordered-pair`,
`predicate-logic`, `set-builder-notation`, `set-membership`,
`set-theory-axiomatic`, `truth-table`. Wave 6 (5, level 6 —
prerequisites now fully satisfied by Wave 5) is next: `logical-
equivalence`, `ordinal-number`, `quantifiers`, `relation`, `subset`. No
other domain will be started until all 82 `math.found` concepts are
`READY` and Domain Certification passes.

---

## 4. Current batch

**Curriculum Completion Program batch 8** (this batch, Domain
Certification Mode, math.found Wave 5): authored 8 concepts — every
`math.found` node whose prerequisites became fully satisfied after
Wave 4 (`cartesian-product`, `empty-set`, `ordered-pair`, `predicate-
logic`, `set-builder-notation`, `set-membership`, `set-theory-
axiomatic`, `truth-table`). 7 of the 8 reuse an existing Blueprint by
reference; 1 (`empty-set`) has no existing Blueprint, stated
explicitly, with 2 misconceptions authored directly via the birth-
taxonomy diagnostic procedure (a 3rd, the ∅-vs-{∅} confusion, cited by
reference from `set`/`set-theory` rather than re-derived). One new
genuine Curriculum Feedback finding (not fixed, no KG/Blueprint
modified): the ∅-vs-{∅} confusion is now registered in THREE Educational
Brain entries (`set-theory`, `set`, `empty-set`) — a structural
consequence of ∅'s relevance to all three nodes, recorded honestly. The
open `mathematical-notation`/`mathematical-symbols` item from Wave 2
remains carried forward unresolved. Domain not yet complete;
certification not run (would fail — 51/82 still missing). No other
domain touched.

**Prior batch (batch 7, Domain Certification Mode, math.found Wave 4)**:
authored 4 concepts — every `math.found` node whose prerequisites became
fully satisfied after Wave 3 (`axiomatic-system`, `logical-connectives`,
`predicate`, `set`). All 4 reuse an existing Blueprint by reference. One
Curriculum Feedback finding: `math.found.set`'s Misconception Register
substantially overlaps `math.found.set-theory`'s own.

**Prior batch (batch 6, Domain Certification Mode, math.found Wave 3)**:
authored 6 concepts — every `math.found` node whose prerequisites became
fully satisfied after Wave 2 (`axiom`, `deductive-reasoning`,
`proposition`, `reading-mathematics`, `set-theory`, `variable`). 5 of
the 6 reuse an existing Blueprint by reference; 1 (`reading-
mathematics`) has no existing Blueprint, stated explicitly, with
misconceptions authored directly via the birth-taxonomy diagnostic
procedure.

---

## 5. Priority queue

1. **`math.found` Wave 6 (5 concepts, level 6)**: `logical-equivalence`,
   `ordinal-number`, `quantifiers`, `relation`, `subset`.
2. **`math.found` Waves 7+ (46 remaining concepts)**, in strict
   topological order, until all 82 are `READY`.
3. Only after `math.found` is 100% complete and certified: the queue
   returns to cross-subject priorities — `chem.found.matter`,
   `bio.found.what-is-biology`, `cs.found.intro-computers`, then
   physics's Particle Physics / Semiconductor Physics domains, then
   everything else in prerequisite order.

Full computed order (all 1,673 remaining concepts): see
`AUTHORING_QUEUE.md` — §5 above (the domain-completion constraint) takes
precedence over that file's literal row order until `math.found` is
complete.

## 6. Next batch

**Batch 9 (recommended)**: continue `math.found` Wave 6 — the 5 level-6
concepts listed in §5 item 1, in strict prerequisite order, no other
domain started.
