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
| Concepts with an Educational Brain entry | **71** |
| Remaining | **1,685** |
| Completion percentage | **4.04%** |

---

## 2. Subject progress

| Subject | KG concepts | EB entries | Coverage | Entry point(s) | Entry points covered |
|---|---|---|---|---|---|
| mathematics | 908 | 1 | 0.11% | `math.found.mathematical-thinking` | **No** |
| physics | 238 | 67 | 28.15% | `phys.meas.units` | Yes |
| english | 216 | 3 | 1.39% | `eng.phonics.phonemic-awareness`, `eng.phonics.print-concepts` | Yes (both) |
| chemistry | 186 | 0 | 0.00% | `chem.found.matter` | No |
| biology | 89 | 0 | 0.00% | `bio.found.what-is-biology` | No |
| computer_science | 119 | 0 | 0.00% | `cs.found.intro-computers` | No |

Physics's KG count reflects the 2026-07-22 Particle Physics + Semiconductor
Physics additions (216 → 238); its 67 existing entries predate that
addition and cover none of the 22 new concepts (see §4).

---

## 3. Current batch

**Curriculum Completion Program batch 2** (this batch): production
framework only — `EDUCATIONAL_BRAIN_STANDARD.md`, `ROADMAP.md`,
`QUALITY.md`, `TEMPLATE.md` retirement. No concept entries authored.

---

## 4. Priority queue (evidence-based, computed against live KG roots)

Per `COVERAGE.md`'s expansion protocol — placement entry points first,
then cut-nodes, then misconception hubs, then prerequisite order —
computed directly by finding every KG node with an empty `requires` list
(a true zero-prerequisite entry point) per subject and checking it
against the existing entry directory:

1. **`math.found.mathematical-thinking`** (mathematics) — mathematics'
   own zero-prerequisite entry node has never been authored; the
   existing single math entry (`math.arith.fractions`) is deep inside
   the arithmetic domain, not the entry point. This is the exact same
   gap pattern already fixed twice for English (`phonemic-awareness`,
   `print-concepts`) — highest-priority item in the entire queue.
2. **`chem.found.matter`** (chemistry) — chemistry has zero Educational
   Brain coverage; its entry point is the correct first concept.
3. **`bio.found.what-is-biology`** (biology) — same situation, biology's
   entry point.
4. **`cs.found.intro-computers`** (computer_science) — same situation,
   computer_science's entry point.
5. **Physics's 22 uncovered Particle Physics + Semiconductor Physics
   concepts** (`phys.particle.*` ×16, `phys.mod.energy-bands` and its 5
   siblings) — physics's own entry point is already covered, so the next
   physics priority per the protocol's "cut-nodes next" step is
   `phys.particle.four-forces` and `phys.mod.energy-bands` (the entry
   nodes of the two newest domains) rather than continuing the existing
   22-batch mechanics/E&M/thermal sequence, since a brand-new domain
   with zero coverage outranks incremental depth in an already
   substantially-covered one.
6. **Everything else**, in prerequisite order within each subject, per
   the existing protocol — not enumerated here node-by-node; consult
   each subject's KG `requires` graph at the time of the next batch
   after items 1–5 are done.

## 5. Next batch

**Batch 3 (recommended)**: author `math.found.mathematical-thinking` —
item 1 above. Single concept, matches the program's one-bounded-unit-
per-batch rule, and closes the most consequential remaining
placement-entry-point gap (mathematics is the single largest subject by
concept count, 908, with the thinnest coverage, 0.11%, and its true
entry point has never been touched).
