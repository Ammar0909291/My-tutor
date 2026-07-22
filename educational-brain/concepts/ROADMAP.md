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
| Concepts with an Educational Brain entry | **76** |
| Remaining | **1,680** |
| Completion percentage | **4.33%** |

---

## 2. Subject progress

| Subject | KG concepts | EB entries | Coverage | Entry point(s) | Entry points covered |
|---|---|---|---|---|---|
| mathematics | 908 | 6 | 0.66% | `math.found.mathematical-thinking` | **Yes** |
| physics | 238 | 67 | 28.15% | `phys.meas.units` | Yes |
| english | 216 | 3 | 1.39% | `eng.phonics.phonemic-awareness`, `eng.phonics.print-concepts` | Yes (both) |
| chemistry | 186 | 0 | 0.00% | `chem.found.matter` | No |
| biology | 89 | 0 | 0.00% | `bio.found.what-is-biology` | No |
| computer_science | 119 | 0 | 0.00% | `cs.found.intro-computers` | No |

Physics's KG count reflects the 2026-07-22 Particle Physics + Semiconductor
Physics additions (216 → 238); its 67 existing entries predate that
addition and cover none of the 22 new concepts (see §4).

---

## 3. Domain status — math.found (IN PROGRESS)

Per the standing Domain Certification workflow: complete one domain at a
time, in strict prerequisite order, never starting a new domain before
the current one is finished.

| Metric | Value |
|---|---|
| Domain | `math.found` (mathematics / Foundations) |
| Total concepts in domain | 82 |
| Authored this program | 5 |
| Remaining | 77 |
| Status | **IN PROGRESS** — not eligible for Domain Certification yet |

Authored so far (Wave 1 — root + all 4 direct level-1 children, in
strict topological order): `mathematical-thinking` (level 0, the domain
root), `abstraction`, `pattern-recognition`, `problem-solving`,
`mathematical-language` (all level 1 — every concept whose only
prerequisite is the root). Wave 2 (level 2 — every concept requiring
only already-READY level-0/1 concepts) is next: `generalization`,
`inductive-reasoning`, `problem-solving-strategies`,
`mathematical-modeling`, `mathematical-notation`, `mathematical-symbols`,
`logic`, `definition` (8 concepts, all requiring only concepts already
authored). No other domain will be started until all 82 `math.found`
concepts are `READY` and Domain Certification passes.

---

## 4. Current batch

**Curriculum Completion Program batch 4** (this batch, Domain
Certification Mode): authored 5 `math.found` concepts (Wave 1 — root +
immediate children). Domain not yet complete; certification not run
(would fail — 77/82 still missing). No other domain touched.

---

## 5. Priority queue (evidence-based, computed against live KG roots)

Per `COVERAGE.md`'s expansion protocol, AND the current standing
Domain-Completion rule (finish `math.found` before any other domain):

1. **`math.found` Wave 2 (8 concepts, level 2)** — the immediate next
   authoring target, per the Domain Certification Mode instruction to
   never jump between subjects/domains until the current one is done:
   `generalization`, `inductive-reasoning`, `problem-solving-strategies`,
   `mathematical-modeling`, `mathematical-notation`,
   `mathematical-symbols`, `logic`, `definition`.
2. **`math.found` Waves 3+ (69 remaining concepts)**, in strict
   topological order, until all 82 are `READY`.
3. Only after `math.found` is 100% complete and certified: the queue
   returns to the cross-subject priorities identified previously —
   `chem.found.matter`, `bio.found.what-is-biology`,
   `cs.found.intro-computers` (each subject's own uncovered entry point),
   then physics's Particle Physics / Semiconductor Physics domains
   (`phys.particle.four-forces`, `phys.mod.energy-bands`), then
   everything else in prerequisite order.

Full computed order (all 1,680 remaining concepts): see
`AUTHORING_QUEUE.md` — note that file's own row order is the
general-purpose graph-derived queue and does not yet encode the
domain-completion constraint; §5 above is a manual override authorized
by the current standing instruction and takes precedence over
`AUTHORING_QUEUE.md`'s literal row order until `math.found` is complete.

## 6. Next batch

**Batch 5 (recommended)**: continue `math.found` Wave 2 — the 8 level-2
concepts listed in §5 item 1, in strict prerequisite order, no other
domain started.
