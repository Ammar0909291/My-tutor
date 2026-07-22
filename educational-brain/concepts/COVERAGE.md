# Coverage Manifest

Live count of canonical KG concepts with authored Educational Brain entries.
Updated in the same commit as any entry added.

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

## Entry quality bar

The three seed entries ARE the bar. An entry thinner than the seeds is not
merged; it is finished first. Coverage counts only full-template entries —
partial entries are worse than none because they read as "covered" to every
future author and to the retrieval engine.

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
