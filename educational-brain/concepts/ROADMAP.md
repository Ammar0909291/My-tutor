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
| Concepts with an Educational Brain entry | **114** |
| Remaining | **1,661** |
| Completion percentage | **6.42%** |

---

## 2. Subject progress

| Subject | KG concepts | EB entries | Coverage | Entry point(s) | Entry points covered |
|---|---|---|---|---|---|
| mathematics | 908 | 32 | 3.52% | `math.found.mathematical-thinking` | **Yes** |
| physics | 238 | 79 | 33.19% | `phys.meas.units` | Yes |
| english | 216 | 3 | 1.39% | `eng.phonics.phonemic-awareness`, `eng.phonics.print-concepts` | Yes (both) |
| chemistry | 186 | 0 | 0.00% | `chem.found.matter` | No |
| biology | 108 | 0 | 0.00% | `bio.found.what-is-biology` | No |
| computer_science | 119 | 0 | 0.00% | `cs.found.intro-computers` | No |

Physics's KG count reflects the 2026-07-22 Particle Physics + Semiconductor
Physics additions (216 → 238); its 67 pre-existing entries predated that
addition. This session's Wave 6 batch (12 concepts, dependency level 6)
raised physics to 79/238 — still none of the 22 new Particle
Physics/Semiconductor Physics concepts are covered yet (those sit at
much deeper dependency levels, since the Particle Physics domain has its
own internal prerequisite chain rooted at `phys.particle.four-forces`).
Biology's KG count reflects the Curriculum Production Pipeline's own
2026-07-22 Biology KG v2.0.0 freeze (89 → 108 concepts, 19 new concepts
incl. a new `bio.div` domain) — a concurrent, external change to this
program's own work, picked up via rebase; biology still has 0 Educational
Brain entries.

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
`READY` and Domain Certification passes — **except by explicit,
subject-specific user instruction, as happened this batch (§3b)**.

---

## 3b. Domain status — physics Wave 6 (explicit exception batch,
2026-07-22)

A direct, explicit user instruction ("audit Physics Educational Brain,
verify exactly which 67 already exist, then continue authoring the
remaining Educational Brain concepts in strict prerequisite/topological
order") redirected one batch specifically to physics, overriding §3's
math.found-first default for this batch only. `math.found` was NOT
touched and remains 31/82 — the standing default target for any future
batch without an equally explicit override.

| Metric | Value |
|---|---|
| Domain | physics (whole subject, not a sub-domain — physics has 12
  KG domains: `em`, `meas`, `mech`, `mod`, `opt`, `particle`, `qm`,
  `rel`, `stat`, `therm`, `wave`, `astro`) |
| Total concepts in subject | 238 |
| Authored before this session | 67 |
| Authored this batch (Wave 6, dependency level 6) | 12 |
| Total now | 79 |
| Remaining | 159 |
| Status | **IN PROGRESS** |

Audited first (verified programmatically, not by inspection): exactly 67
pre-existing physics EB entries, zero overlap with `AUTHORING_QUEUE.md`'s
171 physics rows, union of both sets exactly equal to the physics KG's
238 concepts — confirming the queue was already current against the
2026-07-22 KG extension (216→238) before this batch began. Wave 6 (12
concepts, the full level, not a partial slice): `phys.mech.universal-
gravitation`, `phys.mech.hookes-law`, `phys.mech.pressure-fluids`,
`phys.wave.standing-waves`, `phys.wave.beats`, `phys.opt.optical-
instruments`, `phys.opt.youngs-experiment`, `phys.em.capacitance`,
`phys.em.ohms-law`, `phys.em.amperes-law`, `phys.em.lenzs-law`,
`phys.em.self-inductance`. All 12 had existing Blueprints reused by
reference. Wave 7 candidates were NOT computed this batch — that
determination is deferred to whichever future batch next targets
physics specifically.

---

## 4. Current batch

**Curriculum Completion Program batch 9 (this batch, Physics Wave 6,
explicit exception — see §3b for full detail)**: authored the complete
physics dependency-level-6 wave (12 concepts). All 12 verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches). Six genuine Curriculum Feedback findings recorded
(not fixed, no KG file modified): 11 of the 12 concepts have a genuine,
identifiable cross-subject connection despite an empty KG `cross_links`
array (see `COVERAGE.md`'s Delivery history for the full per-concept
list); `phys.opt.youngs-experiment` alone was honestly assessed as having
no strong cross-subject connection at this level. `math.found` remains
31/82, untouched this batch. All six tracking files regenerated;
re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0 invalid
Blueprint references across all 114 entries.

**Prior batch (batch 8, Domain Certification Mode, math.found Wave 5)**:
authored 8 concepts — every `math.found` node whose prerequisites became
fully satisfied after Wave 4 (`cartesian-product`, `empty-set`, `ordered-
pair`, `predicate-logic`, `set-builder-notation`, `set-membership`,
`set-theory-axiomatic`, `truth-table`). 7 of the 8 reuse an existing
Blueprint by reference; 1 (`empty-set`) has no existing Blueprint, stated
explicitly. One Curriculum Feedback finding: the ∅-vs-{∅} confusion is
now registered in THREE Educational Brain entries (`set-theory`, `set`,
`empty-set`). The open `mathematical-notation`/`mathematical-symbols`
item from Wave 2 remains carried forward unresolved.

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

1. **Default (resumes next batch unless given an equally explicit
   subject-specific override): `math.found` Wave 6 (5 concepts, level
   6)**: `logical-equivalence`, `ordinal-number`, `quantifiers`,
   `relation`, `subset`.
2. **`math.found` Waves 7+ (46 remaining concepts)**, in strict
   topological order, until all 82 are `READY`.
3. Only after `math.found` is 100% complete and certified: the queue
   returns to cross-subject priorities — `chem.found.matter`,
   `bio.found.what-is-biology`, `cs.found.intro-computers`, then
   physics's next dependency level (Wave 7, not yet computed), then
   everything else in prerequisite order.
4. **Standing exception**: physics (or any subject) may be targeted
   again ahead of this default order given an equally explicit,
   subject-specific user instruction, as happened this batch (§3b/§4).
   Physics currently has 159 concepts remaining (79/238 done); its own
   internal queue (Wave 7 onward) is not yet computed.

Full computed order (all 1,661 remaining concepts): see
`AUTHORING_QUEUE.md` — §5 above (the domain-completion constraint) takes
precedence over that file's literal row order until `math.found` is
complete, unless overridden per item 4.

## 6. Next batch

**Batch 10 (recommended default)**: resume `math.found` Wave 6 — the 5
level-6 concepts listed in §5 item 1, in strict prerequisite order, no
other domain started. **If instead directed back to physics**: compute
Wave 7 (the physics dependency level unlocked once Wave 6's 12 concepts
are `READY` — not yet determined) and author it in full, following the
same reuse-by-reference-Blueprint discipline established this batch.
