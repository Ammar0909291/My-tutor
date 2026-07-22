# Coverage Manifest

Live count of canonical KG concepts with authored Educational Brain entries,
plus the full per-entry changelog. Updated in the same commit as any entry
added. **For the dashboard view (totals, completion %, current/next batch,
priority queue) see [`ROADMAP.md`](ROADMAP.md)** — that file owns the
high-level numbers so they are computed in one place; this file owns the
detailed per-subject entry list and delivery-by-delivery history. If the
two ever disagree, `ROADMAP.md`'s freshly-computed totals are authoritative
and this file's summary row should be corrected to match.

| Subject | KG concepts | Entries authored | Coverage |
|---|---|---|---|
| mathematics | 908 | 1 | `math.arith.fractions` |
| physics | 238 | 67 | `phys.meas.*` (8), `phys.mech.displacement`, `phys.mech.velocity`, `phys.mech.acceleration`, `phys.mech.kinematics-1d`, `phys.mech.newtons-first-law`, `phys.mech.force`, `phys.mech.kinematics-2d`, `phys.mech.projectile-motion`, `phys.therm.temperature`, `phys.wave.wave-properties`, `phys.em.electric-charge`, `phys.therm.zeroth-law`, `phys.therm.thermal-expansion`, `phys.therm.heat-transfer`, `phys.wave.transverse-waves`, `phys.wave.longitudinal-waves`, `phys.wave.sound-waves`, `phys.opt.nature-of-light`, `phys.em.coulombs-law`, `phys.em.electric-current`, `phys.therm.ideal-gas-law`, `phys.therm.specific-heat`, `phys.wave.wave-speed`, `phys.em.electric-field`, `phys.em.magnetic-field`, `phys.opt.reflection`, `phys.opt.refraction`, `phys.opt.wave-optics`, `phys.wave.doppler-effect`, `phys.wave.sound-intensity`, `phys.em.electric-dipole`, `phys.em.gauss-law`, `phys.em.magnetic-flux`, `phys.em.magnetic-force`, `phys.em.magnetic-materials`, `phys.therm.kinetic-theory`, `phys.therm.calorimetry`, `phys.wave.superposition`, `phys.opt.mirrors`, `phys.opt.total-internal-reflection`, `phys.opt.lenses`, `phys.opt.dispersion`, `phys.opt.polarization`, `phys.mech.newtons-second-law`, `phys.therm.internal-energy`, `phys.therm.phase-transitions`, `phys.wave.interference`, `phys.opt.lens-power`, `phys.opt.brewsters-law`, `phys.em.electric-potential`, `phys.em.biot-savart`, `phys.em.magnetic-dipole`, `phys.em.faradays-law`, `phys.mech.relative-motion`, `phys.mech.circular-motion`, `phys.mech.newtons-third-law`, `phys.mech.free-body-diagram`, `phys.mech.work`, `phys.mech.momentum` — KG concept count corrected 194→238 (2026-07-22): reflects the Particle Physics domain + Semiconductor Physics additions authored that day; no new physics entries added this batch |
| english | 216 | 3 | `eng.phonics.letter-sound-correspondence`, `eng.phonics.phonemic-awareness` (previously uncounted here — corrected), `eng.phonics.print-concepts` (2026-07-22, this batch) — **both of English's zero-prerequisite entry nodes are now covered** |
| chemistry | 186 | 0 | — |
| biology | 89 | 0 | — |
| computer_science | 119 | 0 | — |

## Expansion protocol (the priority order for authoring)

Coverage grows in leverage order, not file order:

1. **Placement entry points first** — the concepts learners actually land on
   (the level-appropriate entry nodes per difficulty tier), because every
   learner meets them, and meets them at their most fragile (first sessions).
2. **Cut-nodes next** — concepts that gate the most downstream content
   (highest `unlocks` fan-out and highest betweenness on the prerequisite
   graph). A great entry on a cut-node improves every path through it.
3. **Misconception hubs** — concepts with rich documented misconception
   literatures (fractions, negatives, Newton's laws, equals sign, photosynthesis
   energetics, variable-as-object...). These are where authored knowledge
   most outperforms per-turn AI improvisation.
4. **Everything else in prerequisite order** — floors before what stands on
   them, matching how learners actually arrive.

This policy is applied concretely, per subject, in `ROADMAP.md`'s Priority
queue section — that is where "which concept is next" is computed from the
live KG; this section states the rule, not the current answer.

## Entry quality bar

The three original seed entries set the depth bar; the exact structural
contract they (and every entry since) must follow is now
**[`EDUCATIONAL_BRAIN_STANDARD.md`](EDUCATIONAL_BRAIN_STANDARD.md)**
(supersedes `TEMPLATE.md`, 2026-07-22) — read it before authoring the next
entry. An entry thinner than the bar is not merged; it is finished first.
Coverage counts only full-standard entries — partial entries are worse than
none because they read as "covered" to every future author and to the
retrieval engine. Per-entry completeness against the tracked fields is in
[`QUALITY.md`](QUALITY.md).

## Delivery history

- **Delivery 5** (2026-07-10): integration layer authored (README, TEMPLATE,
  this manifest) + 3 seed entries, one per live-curriculum subject, each
  anchored to a verified canonical KG node.
- **Physics blueprint production** (2026-07-13): physics domain expansion begins;
  batches 1–5 complete: `phys.meas.units`, `phys.meas.scalars-vectors`, `phys.meas.dimensions`,
  `phys.meas.errors`, `phys.meas.significant-figures`, `phys.meas.vector-addition`,
  `phys.meas.vector-products`, `phys.meas.unit-conversion`, `phys.mech.displacement`,
  `phys.mech.velocity`, `phys.mech.acceleration`, `phys.mech.kinematics-1d`,
  `phys.mech.newtons-first-law`, `phys.mech.force`, `phys.mech.kinematics-2d`,
  `phys.mech.projectile-motion` (16/194 concepts); batch 6: `phys.therm.temperature`,
  `phys.wave.wave-properties`, `phys.em.electric-charge` (19/194 concepts);
  batch 7: `phys.therm.zeroth-law`, `phys.therm.thermal-expansion`, `phys.therm.heat-transfer`
  (22/194 concepts); batch 8: `phys.wave.transverse-waves`, `phys.wave.longitudinal-waves`,
  `phys.wave.sound-waves` (25/194 concepts); batch 9: `phys.opt.nature-of-light`,
  `phys.em.coulombs-law`, `phys.em.electric-current` (28/194 concepts);
  batch 10: `phys.therm.ideal-gas-law`, `phys.therm.specific-heat`,
  `phys.wave.wave-speed` (31/194 concepts);
  batch 11: `phys.em.electric-field`, `phys.em.magnetic-field`,
  `phys.opt.reflection` (34/194 concepts);
  batch 12: `phys.opt.refraction`, `phys.opt.wave-optics`,
  `phys.wave.doppler-effect` (37/194 concepts);
  batch 13: `phys.wave.sound-intensity`, `phys.em.electric-dipole`,
  `phys.em.gauss-law` (40/194 concepts);
  batch 14: `phys.em.magnetic-flux`, `phys.em.magnetic-force`,
  `phys.em.magnetic-materials` (43/194 concepts);
  batch 15: `phys.therm.kinetic-theory`, `phys.therm.calorimetry`,
  `phys.wave.superposition` (46/194 concepts);
  batch 16: `phys.opt.mirrors`, `phys.opt.total-internal-reflection`,
  `phys.opt.lenses` (49/194 concepts);
  batch 17: `phys.opt.dispersion`, `phys.opt.polarization`,
  `phys.mech.newtons-second-law` (52/194 concepts);
  batch 18: `phys.therm.internal-energy`, `phys.therm.phase-transitions`,
  `phys.wave.interference` (55/194 concepts);
  batch 19: `phys.opt.lens-power`, `phys.opt.brewsters-law`,
  `phys.em.electric-potential` (58/194 concepts);
  batch 20: `phys.em.biot-savart`, `phys.em.magnetic-dipole`,
  `phys.em.faradays-law` (61/194 concepts);
  batch 21: `phys.mech.relative-motion`, `phys.mech.circular-motion`,
  `phys.mech.newtons-third-law` (64/194 concepts);
  batch 22: `phys.mech.free-body-diagram`, `phys.mech.work`,
  `phys.mech.momentum` (67/194 concepts, snapshot count now stale — see
  physics row above, corrected to 238).
- **Curriculum Completion Program, batch 1** (2026-07-22): first batch
  under the new incremental-program workflow (see CLAUDE.md's
  "Curriculum Completion Program" section for the governance framing).
  Authored `eng.phonics.print-concepts` — the coverage gap
  `eng.phonics.phonemic-awareness.md`'s own Curriculum feedback section
  had already flagged by name as the next priority (English's other
  zero-prerequisite entry node). Also corrected two stale bookkeeping
  errors found while establishing this batch's baseline: (1) this
  manifest undercounted English at 1 entry when `phonemic-awareness`
  (Delivery 14) had already been authored and never added to this table
  — corrected to reflect both pre-existing entries; (2) physics's "KG
  concepts" column read 194, a snapshot that predates this session's
  Particle Physics + Semiconductor Physics KG additions (216→238) —
  corrected; the 67-entry batch counts above are left as their original
  historical record (each batch total was accurate against the KG size
  at the time it was written) rather than rewritten. No physics entries
  were added this batch — this correction is bookkeeping only.
  Cross-checked against the existing Blueprint
  (`docs/curriculum/blueprints/eng.phonics.print-concepts.md`, already
  authored by the Curriculum Production Pipeline) to avoid duplicating
  its misconception register and worked examples — the new entry reuses
  that content by reference and adds the deeper reasoning layers
  (mental models, birth-type misconception classification, analogy
  library with breaking points, discovery-lesson argument, teaching
  action dispatch, voice teaching, transfer map) that the Blueprint
  format does not carry. Quality-bar entries: 3/216 English concepts.
- **Curriculum Completion Program, batch 2 — production framework**
  (2026-07-22): no new concept entries authored (deliberately — this
  batch's deliverable was the framework itself). Reviewed a
  representative sample of the 71 existing entries across all 3 subjects
  and batches, found real heading-style drift (numbered vs. unnumbered
  sections, beginning somewhere between physics batches 12 and 17) and a
  genuine duplication risk (all 71 entries' concepts already have a
  Blueprint, and existing "Assessment" sections were not yet scoped
  narrowly against that overlap). Produced `EDUCATIONAL_BRAIN_STANDARD.md`
  (the new 21-section canonical authoring contract, superseding
  `TEMPLATE.md`, which now just points to it), `ROADMAP.md` (computed
  totals: 1,756 KG concepts across 6 subjects, 71 authored, 4.04%
  complete, plus an evidence-based priority queue — mathematics' own
  zero-prerequisite entry node, `math.found.mathematical-thinking`, has
  never been authored, ranked above chemistry/biology/computer_science's
  equally-uncovered entry points only by mathematics's much larger total
  concept count), and `QUALITY.md` (a generated per-entry completeness
  ledger for all 71 existing entries, with one flagged self-limitation
  in its own detection script rather than a silently "corrected" number).
  No existing entries were rewritten to the new Standard — reconciliation
  is tracked as separate future work, not retroactively applied.
- **Curriculum Completion Program, batch 3 — pipeline validation and
  indexing** (2026-07-22): no new concept entries authored (deliberately
  — this batch's deliverable was validating and indexing the pipeline
  before large-scale authoring begins). Re-ran the KG validator against
  all 6 subjects (first time biology and computer_science were checked
  this session) — all 6 PASS, 0 failures, 100% reachable. Generated
  `EDUCATIONAL_BRAIN_INDEX.md` (1,756 rows, one per KG concept across all
  6 subjects, with Blueprint/EB/Status columns), found 0 orphan EB files,
  0 duplicate EB files, 0 broken KG references. Found 2 unresolvable
  cross-links: `math.de.ode`'s is a recognized aspirational placeholder
  (not a defect), `chem.atomic.electromagnetic-radiation`'s is a genuine
  broken reference (points to a nonexistent physics slug) — recorded as
  Curriculum Feedback in `VALIDATION_REPORT.md`, not fixed (this batch
  does not modify any Canonical Knowledge Graph). Computed root/
  intermediate/terminal breakdown and a full topological-order
  `AUTHORING_QUEUE.md` (1,685 rows — every MISSING concept, priority 1
  onward, purely graph-derived: level-by-level, subjects interleaved in
  a fixed order, no manual ordering). Produced `QUALITY_GATES.md` (8
  mandatory pre-acceptance checks) and `PRODUCTION_PIPELINE.md`
  (Phase 4's batch-selection algorithm, documented not automated, plus
  the Phase 6 frozen workflow: select → author → validate → update
  INDEX/ROADMAP/QUALITY/COVERAGE → commit → push). Verdict: no blocking
  defect found; production workflow declared FROZEN.
