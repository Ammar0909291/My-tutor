# Educational Brain Quality Ledger

Per-concept completeness record for every existing Educational Brain
entry, checked against the fields this program tracks. Table generated
programmatically from the live files (not hand-transcribed) — regenerate
rather than hand-edit when entries change.

## Methodology and honest caveats

- **Blueprint / EB Entry / Mental Model / Misconceptions / Analogies /
  Recovery / Assessment / Tutor Actions**: presence of the corresponding
  section (matched by scanning `## ` heading lines for the relevant
  keyword anywhere in the line, tolerant of both the retired numbered
  heading style and the current `EDUCATIONAL_BRAIN_STANDARD.md` heading
  names) or, for Blueprint, the existence of
  `docs/curriculum/blueprints/{id}.md`. A ✓ here means the section
  EXISTS, not that its content has been re-verified against the
  Standard's narrower scope rules.
- **Detection-script limitation from the prior ledger, now fixed**: the
  previous version of this file flagged the "Tutor Actions" column as
  reading 44/71 due to a regex that didn't match the numbered-heading
  variant's fuller wording, and predicted the true figure was "very
  likely 71/71." Re-run this batch with a corrected, line-scanning
  detector: confirmed 76/76 (all 71 pre-existing entries plus all 5 new
  ones) — the prediction was correct, and this ledger's own detector is
  now accurate rather than merely re-asserted.
- **Cross-links**: a ✓ means the entry's Transfer/Cross-Subject section
  *discusses* cross-subject connections — including entries that
  honestly conclude "none via KG cross_links at this node." This column
  tracks whether the question was addressed, not whether a link exists.
- **Version**: whether a "Version History" section (introduced in
  `EDUCATIONAL_BRAIN_STANDARD.md`) is present. The 71 pre-Standard
  entries correctly read ✗ (expected migration debt, documented in
  `EDUCATIONAL_BRAIN_STANDARD.md` §6); the 5 new `math.found.*` entries
  authored this batch correctly read ✓ — the first entries in this
  program to carry Version History from the start.

## Aggregate summary (76 entries)

| Field | Count | Note |
|---|---|---|
| Blueprint | 76 / 76 | every EB entry has a matching Blueprint |
| Educational Brain | 76 / 76 | trivially true (this is the entry list) |
| Mental Model | 76 / 76 | |
| Misconceptions | 76 / 76 | |
| Analogies | 76 / 76 | |
| Recovery Strategy | 76 / 76 | |
| Assessment Signals | 76 / 76 | |
| Tutor Actions | 76 / 76 | corrected this batch — see note above |
| Cross-links | 49 / 76 | +5 from this batch's new entries (all 5 discuss it) |
| Version History | 5 / 76 | expected — only entries authored under the current Standard carry it |

## Per-concept ledger

| Concept ID | Subject | Blueprint | EB Entry | Mental Model | Misconceptions | Analogies | Recovery | Assessment | Tutor Actions | Cross-links | Version |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `math.arith.fractions` | mathematics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `math.found.abstraction` | mathematics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `math.found.mathematical-language` | mathematics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `math.found.mathematical-thinking` | mathematics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `math.found.pattern-recognition` | mathematics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `math.found.problem-solving` | mathematics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `phys.em.biot-savart` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.em.coulombs-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.electric-charge` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.electric-current` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.electric-dipole` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.electric-field` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.electric-potential` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.em.faradays-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.em.gauss-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.magnetic-dipole` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.em.magnetic-field` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.magnetic-flux` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.magnetic-force` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.em.magnetic-materials` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.meas.dimensions` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.meas.errors` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.meas.scalars-vectors` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.meas.significant-figures` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.meas.unit-conversion` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.meas.units` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.meas.vector-addition` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.meas.vector-products` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.acceleration` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.circular-motion` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.mech.displacement` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.force` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.free-body-diagram` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.mech.kinematics-1d` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.kinematics-2d` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.momentum` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.mech.newtons-first-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.newtons-second-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.mech.newtons-third-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.mech.projectile-motion` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.relative-motion` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.mech.velocity` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.mech.work` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.brewsters-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.dispersion` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.lens-power` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.lenses` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.mirrors` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.nature-of-light` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.opt.polarization` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.reflection` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.opt.refraction` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.opt.total-internal-reflection` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.opt.wave-optics` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.therm.calorimetry` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.therm.heat-transfer` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.therm.ideal-gas-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.therm.internal-energy` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.therm.kinetic-theory` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.therm.phase-transitions` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.therm.specific-heat` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.therm.temperature` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.therm.thermal-expansion` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.therm.zeroth-law` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.wave.doppler-effect` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.wave.interference` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.wave.longitudinal-waves` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.wave.sound-intensity` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.wave.sound-waves` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.wave.superposition` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| `phys.wave.transverse-waves` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.wave.wave-properties` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `phys.wave.wave-speed` | physics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `eng.phonics.letter-sound-correspondence` | english | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `eng.phonics.phonemic-awareness` | english | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| `eng.phonics.print-concepts` | english | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |

## What this ledger means for the next batch

No entry is blocked or defective. Version History (5/76) will continue
to rise entry by entry as new concepts are authored under the current
Standard; the 71 pre-Standard entries' migration remains tracked future
work, not a blocker.
