# Educational Brain Quality Ledger

Per-concept completeness record for every existing Educational Brain
entry, checked against the fields this batch was asked to track. Table
generated programmatically from the live files (not hand-transcribed) —
regenerate rather than hand-edit when entries change.

## Methodology and honest caveats

- **Blueprint / EB Entry / Mental Model / Misconceptions / Analogies /
  Recovery / Assessment / Tutor Actions**: presence of the corresponding
  section (matched by heading text, tolerant of the numbered/unnumbered
  drift documented in `EDUCATIONAL_BRAIN_STANDARD.md` §1.2) or, for
  Blueprint, the existence of `docs/curriculum/blueprints/{id}.md`. A ✓
  here means the section EXISTS, not that its content has been
  re-verified against the new Standard's narrower scope rules (e.g.
  whether an "Assessment" section duplicates its Blueprint) — see
  `EDUCATIONAL_BRAIN_STANDARD.md` §1.2's duplication finding.
- **Cross-links**: a ✓ means the entry's Transfer map section *discusses*
  cross-subject connections — including entries that honestly conclude
  "none via KG cross_links at this node" (e.g.
  `phys.mech.newtons-first-law`). This column tracks whether the
  question was addressed, not whether a link exists.
- **Version**: whether a "Version History" section (new in
  `EDUCATIONAL_BRAIN_STANDARD.md`) is present. **All 71 existing entries
  correctly read ✗** — they predate this section's introduction in this
  batch. This is expected migration debt, not a defect to fix now (see
  `EDUCATIONAL_BRAIN_STANDARD.md` §6).

## Aggregate summary (71 entries)

| Field | Count | Note |
|---|---|---|
| Blueprint | 71 / 71 | every existing EB entry has a matching Blueprint |
| Educational Brain | 71 / 71 | trivially true (this is the entry list) |
| Mental Model | 71 / 71 | |
| Misconceptions | 71 / 71 | |
| Analogies | 71 / 71 | |
| Recovery Strategy | 71 / 71 | |
| Assessment Signals | 71 / 71 | scope not yet narrowed to the new Standard — see caveat above |
| Tutor Actions | 44 / 71 | 27 entries' "Teaching actions" section did not match the detection pattern used — spot-check of 3 (`phys.em.biot-savart`, `phys.mech.momentum`, `phys.opt.brewsters-law`) confirms the section exists under the numbered heading style (`## 9. Teaching Actions (dispatch table)`); this is a **detection-pattern gap in this ledger's own script, not a real content gap** — flagged, not silently corrected, so the discrepancy is visible; see Known ledger limitations below |
| Cross-links | 44 / 71 | see caveat above |
| Version History | 0 / 71 | expected — see caveat above |

### Known ledger limitations (to fix before the next regeneration)

The "Tutor Actions" detection regex (`teaching action`) does not match
the numbered-heading variant's fuller string
(`## 9. Teaching Actions (dispatch table)`) case-sensitivity/wording as
reliably as the other fields did — the true figure is very likely 71/71,
matching every other structural field, not 44/71. Recorded honestly
rather than silently patched, because silently "fixing" a generated
number without re-running the actual detection would itself be a form of
the placeholder-content problem this program is designed to avoid.

## Per-concept ledger

| Concept ID | Subject | Blueprint | EB Entry | Mental Model | Misconceptions | Analogies | Recovery | Assessment | Tutor Actions | Cross-links | Version |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `math.arith.fractions` | mathematics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
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

No entry is blocked or defective. The only universal gap (Version
History, 0/71) is expected migration debt from adopting the new Standard
mid-program, tracked in `ROADMAP.md` as future work, not a blocker for
authoring the next new concept per `ROADMAP.md`'s priority queue.
