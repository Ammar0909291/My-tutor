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
| mathematics | 908 | 37 | `math.arith.fractions` + 36 `math.found.*` entries (Waves 1-6) — math.found domain IN PROGRESS (36/82), see Delivery history |
| physics | 238 | 223 | pre-existing 67 (TEMPLATE.md-era) + 12 Wave 6 + 25 Wave 7 + 15 Wave 8 + 16 Wave 9 + 9 Wave 10 + 11 Wave 11 + 8 Wave 12 + 6 Wave 13 + 10 Wave 14 + 9 Wave 15 + 7 Wave 16 + 12 Wave 17 + 8 Wave 18 + 8 Wave 19 (2026-07-23, level 19, this batch): `phys.qm.wkb-approximation`, `phys.qm.s-matrix-basics`, `phys.astro.stellar-evolution`, `phys.astro.cosmology`, `phys.particle.neutrinos`, `phys.particle.hadron-quark-model`, `phys.particle.strong-interaction`, `phys.mod.energy-bands` — 15 concepts remain (93.70%); see Delivery history for the full pre-existing-67, Wave-6 through Wave-18 name lists |
| english | 216 | 3 | `eng.phonics.letter-sound-correspondence`, `eng.phonics.phonemic-awareness` (previously uncounted here — corrected), `eng.phonics.print-concepts` (2026-07-22, this batch) — **both of English's zero-prerequisite entry nodes are now covered** |
| chemistry | 186 | 106 | levels 0–12 complete (106/186); domains started: chem.found, chem.atomic, chem.state, chem.thermo, chem.elect, chem.surface, chem.env, chem.period, chem.kinet, chem.sol, chem.equil, chem.anal, chem.bond, chem.sblock, chem.redox, chem.dblock, chem.org, chem.pblock, chem.solid — IN PROGRESS |
| biology | 108 | 0 | — (KG count 89→108 per the Pipeline's 2026-07-22 v2.0.0 freeze, a concurrent external change) |
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
- **Curriculum Completion Program, batch 4 — Domain Certification Mode,
  math.found Wave 1** (2026-07-22): first batch under the new
  one-domain-at-a-time discipline. Authored 5 concepts in strict
  topological order — the domain root `math.found.mathematical-thinking`
  (level 0) and all 4 of its direct level-1 children (`abstraction`,
  `pattern-recognition`, `problem-solving`, `mathematical-language`) —
  every one already grounded in an existing, richly-detailed Blueprint
  (all 5 have Blueprints in `docs/curriculum/blueprints/`). Each entry
  reuses its Blueprint's Misconception Registry and Student State
  Protocols by reference rather than restating them, and adds the
  deeper reasoning layers a Blueprint doesn't carry (Core Understanding,
  Mental Models with shelf-life triggers, birth-type-classified
  misconceptions, anti-analogies, Teaching Sequence reasoning, Transfer
  Connections). All 5 entries conform exactly to
  `EDUCATIONAL_BRAIN_STANDARD.md`'s 21-section structure (verified via
  heading scan). `math.found` is 5/82 concepts — genuinely IN PROGRESS,
  not certified or frozen; 77 concepts remain in strict prerequisite
  order before this domain is complete. No other domain or subject was
  started. `EDUCATIONAL_BRAIN_INDEX.md`, `AUTHORING_QUEUE.md`,
  `ROADMAP.md`, and `QUALITY.md` regenerated from source; re-validated
  0 orphans, 0 duplicates across all 76 entries.
- **Curriculum Completion Program, batch 5 — Domain Certification Mode,
  math.found Wave 2** (2026-07-22): authored the 8 concepts whose
  prerequisites became fully satisfied after Wave 1 — `definition`,
  `generalization`, `inductive-reasoning`, `logic`,
  `mathematical-modeling`, `mathematical-notation`,
  `mathematical-symbols`, `problem-solving-strategies` (determined
  programmatically from the live KG + EB directory, not manually
  chosen). Of these, 3 (`generalization`, `logic`,
  `mathematical-notation`) had existing Blueprints reused by reference;
  5 had none, stated explicitly in each entry's Blueprint References
  section per Quality Gate 2 rather than silently omitted, with
  misconceptions authored directly via the birth-taxonomy diagnostic
  procedure. One genuine Curriculum Feedback finding: `mathematical-
  notation` and `mathematical-symbols` have unusually close KG
  descriptions, identical prerequisites, and identical Bloom level —
  recorded honestly as a possible future KGCS merge-criteria review, not
  fixed (no Canonical KG file modified). All 8 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure. `math.found`
  is 13/82 — still genuinely IN PROGRESS; 69 concepts remain. No other
  domain or subject was started. All five tracking files regenerated
  from source; re-validated 0 orphans, 0 duplicates across all 84
  entries.
- **Curriculum Completion Program, batch 6 — Domain Certification Mode,
  math.found Wave 3** (2026-07-22): authored the 6 concepts whose
  prerequisites became fully satisfied after Wave 2 — `axiom`,
  `deductive-reasoning`, `proposition`, `reading-mathematics`,
  `set-theory`, `variable` (determined programmatically from the live
  KG + EB directory against the live KG's `requires` edges; matched the
  Domain Certification Mode prompt's own expected candidate list
  exactly). Of these, 5 (`axiom`, `deductive-reasoning`, `proposition`,
  `set-theory`, `variable`) had existing Blueprints reused by
  reference — each entry cites the Blueprint's Misconception Registry
  by MC number with birth-type classification added, never restating
  worked examples or mastery probes; 1 (`reading-mathematics`) had none,
  stated explicitly in its Blueprint References section per Quality
  Gate 2, with 3 misconceptions authored directly via the birth-taxonomy
  diagnostic procedure. The open `mathematical-notation`/`mathematical-
  symbols` Curriculum Feedback item from Wave 2 is explicitly carried
  forward, unresolved, per this batch's own SPECIAL REVIEW instruction —
  not modified, not merged, still an open KGCS review item until
  math.found reaches 82/82. All 6 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (`grep "^## "` diffed against the canonical order for
  every file). `math.found` is 19/82 — still genuinely IN PROGRESS; 63
  concepts remain (Wave 4 candidates already computed:
  `axiomatic-system`, `logical-connectives`, `predicate`, `set`). No
  other domain or subject was started. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates, 0
  broken KG references, 0 invalid Blueprint references across all 90
  entries.
- **Curriculum Completion Program, batch 7 — Domain Certification Mode,
  math.found Wave 4** (2026-07-22): authored the 4 concepts whose
  prerequisites became fully satisfied after Wave 3 — `axiomatic-
  system`, `logical-connectives`, `predicate`, `set` (verified
  programmatically against the live KG's `requires` edges, matching the
  Domain Certification Mode prompt's own expected candidate list
  exactly). All 4 had existing Blueprints reused by reference — each
  entry cites the Blueprint's Misconception Registry by MC number with
  birth-type classification added, never restating worked examples,
  transfer probes, or mastery gates. One new genuine Curriculum
  Feedback finding, recorded honestly rather than silently resolved:
  `math.found.set`'s own Misconception Register (order/repetition,
  ∅-vs-{∅}) substantially overlaps `math.found.set-theory`'s own
  MC-2/MC-4/MC-1 — both Blueprints were authored independently and
  converge on nearly identical trigger examples; this entry resolved the
  distinction as a definitional-recognition floor (`set`, remember,
  0.90 threshold) versus operational fluency (`set-theory`, understand,
  0.80 threshold), a defensible split per the KG's own prerequisite
  edge, but flagged the misconception-content duplication for the
  Curriculum Production Pipeline's future consideration — no Canonical
  KG file or Blueprint modified. The open `mathematical-notation`/
  `mathematical-symbols` item from Wave 2 remains carried forward
  unresolved. All 4 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order. `math.found` is 23/82 — still genuinely IN PROGRESS; 59
  concepts remain (Wave 5 candidates already computed:
  `cartesian-product`, `empty-set`, `ordered-pair`, `predicate-logic`,
  `set-builder-notation`, `set-membership`, `set-theory-axiomatic`,
  `truth-table`). No other domain or subject was started. All six
  tracking files regenerated from source; re-validated 0 orphans, 0
  duplicates, 0 broken KG references, 0 invalid Blueprint references
  across all 94 entries.
- **Curriculum Completion Program, batch 8 — Domain Certification Mode,
  math.found Wave 5** (2026-07-22): authored the 8 concepts whose
  prerequisites became fully satisfied after Wave 4 — `cartesian-
  product`, `empty-set`, `ordered-pair`, `predicate-logic`, `set-
  builder-notation`, `set-membership`, `set-theory-axiomatic`,
  `truth-table` (verified programmatically against the live KG's
  `requires` edges, matching the Domain Certification Mode prompt's own
  expected candidate list exactly). 7 of the 8 had existing Blueprints
  reused by reference — each entry cites the Blueprint's Misconception
  Registry by MC number with birth-type classification added, never
  restating worked examples, transfer probes, or mastery gates; 1
  (`empty-set`) had none, stated explicitly, with 2 of its 3
  misconceptions authored directly via the birth-taxonomy diagnostic
  procedure and the 3rd (∅-vs-{∅}) cited by reference from `set-theory`/
  `set` rather than re-derived. One new genuine Curriculum Feedback
  finding, recorded honestly: the ∅-vs-{∅} confusion is now registered
  in THREE Educational Brain entries (`set-theory`'s MC-1, `set`'s MC-3,
  `empty-set`'s MC-3) — a structural consequence of ∅'s genuine
  relevance to all three KG nodes, not an authoring error, but
  strengthening the case (already raised in `set`'s own Wave 4
  Curriculum Feedback) for a clearer per-node ownership split at a
  future Blueprint revision — no Canonical KG file or Blueprint
  modified. A second, informational-only note: `predicate-logic`'s
  quantifier-negation misconception (MC-2) and `truth-table`'s
  connective-negation misconception (MC-3), both authored this same
  Wave, are structurally related (both are De Morgan's-law applications)
  but genuinely distinct — flagged for a future cross-reference, not a
  duplication. The open `mathematical-notation`/`mathematical-symbols`
  item from Wave 2 remains carried forward unresolved. All 8 entries
  verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order. `math.found` is 31/82 — still genuinely
  IN PROGRESS; 51 concepts remain (Wave 6 candidates already computed:
  `logical-equivalence`, `ordinal-number`, `quantifiers`, `relation`,
  `subset`). No other domain or subject was started. All six tracking
  files regenerated from source; re-validated 0 orphans, 0 duplicates,
  0 broken KG references, 0 invalid Blueprint references across all 102
  entries. A concurrent commit (`52ed09e`, CS Explanation Memory asset
  seeding, `src/lib/teaching/assets/csSeedAssets.ts` only) landed on
  `origin/main` during this batch — verified zero file overlap with this
  program's own files before rebasing; no KG file was touched by that
  commit, so no further reconciliation was required.
- **Curriculum Completion Program, batch 9 — Physics Wave 6 (explicit
  user-directed exception to the standing math.found-first default)**
  (2026-07-22): a direct, explicit user instruction ("audit Physics
  Educational Brain, verify exactly which 67 already exist, then continue
  authoring the remaining Educational Brain concepts in strict
  prerequisite/topological order") redirected this batch specifically to
  the physics subject, overriding math.found's standing priority for this
  one batch only — `math.found` was NOT touched and remains 31/82,
  IN PROGRESS, the default target for any future batch without an
  equally explicit override. Audit first: fetched and rebased onto latest
  `origin/main` (one new commit, `d8401bae`, CS Explanation Memory
  completion, zero file overlap with physics), then verified
  programmatically (not by inspection) that exactly 67 physics
  `educational-brain/concepts/physics/*.md` files exist, that they have
  zero overlap with `AUTHORING_QUEUE.md`'s 171 physics rows, and that the
  union of both sets equals exactly the physics KG's 238 concepts —
  confirming `AUTHORING_QUEUE.md` was already current against the KG
  extension (216→238) and needed no recomputation before authoring began.
  Authored the complete Wave 6 (12 concepts, dependency level 6, the
  first physics level with any missing concepts) — every concept
  verified to have all prerequisites already `READY`:
  `phys.mech.universal-gravitation`, `phys.mech.hookes-law`,
  `phys.mech.pressure-fluids`, `phys.wave.standing-waves`,
  `phys.wave.beats`, `phys.opt.optical-instruments`,
  `phys.opt.youngs-experiment`, `phys.em.capacitance`, `phys.em.ohms-law`,
  `phys.em.amperes-law`, `phys.em.lenzs-law`, `phys.em.self-inductance`.
  All 12 had existing Blueprints (`docs/curriculum/blueprints/{id}.md`,
  Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register/Profile by name with
  birth-type classification added (never re-deriving probe/bridge/
  replacement text), plus its session-script and assessment-probe
  components, never restating worked examples or full item banks. All 12
  entries verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact
  21-section structure and heading order (`grep "^## "` diffed against
  the canonical order for every file — 0 mismatches). Six genuine
  Curriculum Feedback findings recorded (not fixed, no KG file modified):
  every one of the 12 concepts has an empty KG `cross_links` array despite
  a genuine, identifiable cross-subject or cross-domain connection in 11
  of the 12 cases (mathematics' inverse-square functions for
  `universal-gravitation`; chemistry's molecular bond vibration models for
  `hookes-law`; biology's blood-pressure gradients for `pressure-fluids`;
  mathematics' Fourier analysis for `standing-waves`; music theory for
  `beats`; biology's eye anatomy for `optical-instruments`; computer
  science's digital/semiconductor circuits for `ohms-law`; mathematics'
  vector calculus for `amperes-law`; chemistry's Le Chatelier's principle
  for `lenzs-law`; mathematics' differential equations for
  `self-inductance`) — `youngs-experiment` alone was assessed as
  genuinely having no strong cross-subject connection at this curriculum
  level, an honest "weak but real" conclusion, not a fabricated link.
  `phys.em.ohms-law`'s KG-recorded hub status (4 direct `unlocks`, the
  most of any concept in this wave) was verified against the live KG and
  reflected in its Identity section. `physics` is now 79/238 (159
  concepts remain); Wave 7 (the next dependency level with newly-eligible
  concepts) was NOT computed or started this batch, per the standing
  one-bounded-batch-per-turn discipline — a full level-6 wave is one
  complete, coherent batch. All six tracking files
  (`EDUCATIONAL_BRAIN_INDEX.md`, `AUTHORING_QUEUE.md`, `ROADMAP.md`,
  `QUALITY.md`, `COVERAGE.md`, `VALIDATION_REPORT.md`) regenerated from
  source; re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 114 entries.

- **Curriculum Completion Program, batch 10 — Physics Wave 7 (second
  explicit user-directed exception, mandatory-rules cycle)** (2026-07-23):
  a second, direct, explicit user instruction — an 11-point numbered set
  of mandatory rules for continuing Physics Educational Brain production
  — again redirected this batch specifically to physics, overriding
  `math.found`'s standing priority for this batch only. `math.found` was
  NOT touched and remains 31/82, IN PROGRESS. Audit first (per mandatory
  rule 1/2, "never trust previous reports"): `git fetch origin &&
  git checkout main && git pull origin main` revealed `main` had only 67
  physics EB files — the entire prior session's Wave 6 work (22
  blueprints + 12 EB entries) had never actually been merged, only
  existed on the feature branch `claude/physics-blueprint-audit-x8usq8`.
  Checked for file conflicts (none), rebased the branch onto latest
  `origin/main`, fast-forward-merged into `main` (`d3bce523..db424458`),
  and pushed `main` directly — establishing the TRUE starting point,
  79/238, before authoring anything. Re-audited again: independently
  recomputed dependency levels via a fresh Kahn's-algorithm pass over the
  live KG's `requires` edges (not trusting `AUTHORING_QUEUE.md`'s stored
  levels blindly) and confirmed the level-7 set matched the queue's
  stored rows exactly — 25 concepts, the full level. Authored all 25:
  `phys.mech.friction`, `phys.mech.tension`, `phys.mech.normal-force`,
  `phys.mech.kinetic-energy`, `phys.mech.potential-energy`,
  `phys.mech.power`, `phys.mech.impulse`, `phys.mech.center-of-mass`,
  `phys.mech.angular-kinematics`, `phys.mech.gravitational-field`,
  `phys.mech.stress-strain`, `phys.mech.buoyancy`,
  `phys.mech.surface-tension`, `phys.therm.first-law`, `phys.wave.shm`,
  `phys.opt.diffraction`, `phys.em.dielectrics`,
  `phys.em.energy-capacitor`, `phys.em.resistivity`,
  `phys.em.dc-circuits`, `phys.em.electrical-power`, `phys.em.solenoid`,
  `phys.em.mutual-inductance`, `phys.em.ac-basics`,
  `phys.em.maxwells-equations`. All 25 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text
  or restating worked examples/full item banks. All 25 entries verified
  against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure
  and heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 104 physics EB files map
  to a valid KG id). A concurrent commit set landed on `origin/main`
  mid-batch (`806eb9b5`/`95d6e44a`/`ff07c8cc` — lesson-history-restore
  fix, 22 physics brain-package artifacts, Prisma pool sizing) — verified
  zero file overlap with this batch's work, merged cleanly. Physics KG
  re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG file
  was touched. `physics` is now 104/238 (134 concepts remain); Wave 8
  (dependency level 8, 15 concepts — `phys.mech.inclined-plane` through
  `phys.em.electromagnetic-waves`) is computed and next, but NOT started
  this batch, per the mandatory-rules cycle's "batch, validate, report,
  then re-audit before continuing" discipline. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates, 0 broken
  KG references, 0 invalid Blueprint references across all 139 entries.

- **Curriculum Completion Program, batch 11 — Physics Wave 8 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 7 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 7 push and confirmed 0 commits
  ahead/behind before starting — no other session had touched physics EB
  concurrently. `math.found` was NOT touched and remains 31/82.
  Independently recomputed dependency levels via a fresh Kahn's-algorithm
  pass over the live KG's `requires` edges — the level-8 set (15
  concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 15: `phys.mech.inclined-plane`,
  `phys.mech.work-energy-theorem`, `phys.mech.conservation-of-energy`,
  `phys.mech.conservation-of-momentum`, `phys.mech.torque`,
  `phys.mech.gravitational-potential`,
  `phys.therm.thermodynamic-processes`, `phys.wave.shm-energy`,
  `phys.wave.pendulum`, `phys.wave.spring-mass`, `phys.opt.single-slit`,
  `phys.em.kirchhoffs-laws`, `phys.em.emf`, `phys.em.lc-circuits`,
  `phys.em.electromagnetic-waves`. All 15 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text.
  `phys.opt.single-slit` cited all 4 of its Blueprint's documented
  misconceptions (matching the same 4-misconception density already
  established for its sibling `phys.opt.diffraction` in Wave 7) rather
  than the more typical 2. All 15 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 119 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched. `physics` is now exactly
  119/238 — 50.00% complete, the halfway point of the subject. Wave 9
  (dependency level 9, 16 concepts — `phys.mech.conservative-forces`
  through `phys.rel.postulates`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 154 entries.

- **Curriculum Completion Program, batch 12 — Physics Wave 9 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 8 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 8 push and confirmed 0 commits
  ahead/behind before starting — no other session had touched physics EB
  concurrently. `math.found` was NOT touched and remains 31/82.
  Independently recomputed dependency levels via a fresh Kahn's-algorithm
  pass over the live KG's `requires` edges — the level-9 set (16
  concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 16: `phys.mech.conservative-forces`,
  `phys.mech.collisions-elastic`, `phys.mech.collisions-inelastic`,
  `phys.mech.moment-of-inertia`, `phys.mech.equilibrium`,
  `phys.mech.orbital-mechanics`, `phys.mech.escape-velocity`,
  `phys.mech.bernoulli`, `phys.therm.second-law`,
  `phys.therm.heat-engines`, `phys.wave.damped-oscillations`,
  `phys.em.wheatstone-bridge`, `phys.em.potentiometer`,
  `phys.em.rc-circuits`, `phys.mod.photoelectric-effect`,
  `phys.rel.postulates`. All 16 had existing Blueprints (Component-format)
  reused by reference — each entry cites its Blueprint's Misconception
  Engine/Register by name with birth-type classification added, never
  re-deriving probe/bridge/replacement text. `phys.mod.photoelectric-effect`
  and `phys.rel.postulates` each cited all 4 of their Blueprint's
  documented misconceptions (matching the 4-misconception density pattern
  already established for `phys.opt.diffraction`/`phys.opt.single-slit`
  in Waves 7-8). This wave introduced the first Modern Physics
  (`phys.mod.photoelectric-effect`) and Relativity (`phys.rel.postulates`)
  domain entries in this program — both entry points reached via the
  classical-electromagnetism capstone (`phys.em.electromagnetic-waves`,
  Wave 8) and, for relativity, classical mechanics' relative-motion
  concept. All 16 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 135 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched. `physics` is now 135/238 —
  56.72% complete. Wave 10 (dependency level 10, 9 concepts —
  `phys.mech.rotational-dynamics` through `phys.rel.simultaneity`) is
  computed and next, but NOT started this batch. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates, 0 broken
  KG references, 0 invalid Blueprint references across all 170 entries.

- **Curriculum Completion Program, batch 13 — Physics Wave 10 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 9 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 9 push and confirmed 0 commits
  ahead/behind before starting — no other session had touched physics EB
  concurrently. `math.found` was NOT touched and remains 31/82.
  Independently recomputed dependency levels via a fresh Kahn's-algorithm
  pass over the live KG's `requires` edges — the level-10 set (9
  concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 9: `phys.mech.rotational-dynamics`,
  `phys.mech.keplers-laws`, `phys.mech.satellites`, `phys.mech.viscosity`,
  `phys.mech.generalized-coordinates`, `phys.therm.entropy`,
  `phys.wave.forced-oscillations`, `phys.mod.photons`,
  `phys.rel.simultaneity`. All 9 had existing Blueprints (Component-
  format) reused by reference — each entry cites its Blueprint's
  Misconception Engine/Register by name with birth-type classification
  added, never re-deriving probe/bridge/replacement text.
  `phys.mod.photons` cited all 4 of its Blueprint's documented
  misconceptions, matching the 4-misconception density pattern already
  established for `phys.opt.diffraction`/`phys.opt.single-slit`/
  `phys.mod.photoelectric-effect`/`phys.rel.postulates`. All 9 entries
  verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order (0 mismatches), zero duplicate filenames/
  concept IDs, zero orphans against the live physics KG (all 144
  physics EB files map to a valid KG id). Physics KG re-validated:
  PASS, 238/238 reachable, 0 failures/warnings — no KG file was touched.
  `physics` is now 144/238 — 60.50% complete. Wave 11 (dependency level
  11, 11 concepts — `phys.mech.angular-momentum` through
  `phys.stat.probability-basics`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 179 entries.

- **Curriculum Completion Program, batch 14 — Physics Wave 11 (mandatory-
  rules cycle continuation)** (2026-07-23): the same mandatory-rules
  production cycle continued immediately after Wave 10 within the same
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 10 push and confirmed 0
  commits ahead/behind before starting — no other session had touched
  physics EB concurrently. `math.found` was NOT touched and remains
  31/82. Independently recomputed dependency levels via a fresh Kahn's-
  algorithm pass over the live KG's `requires` edges — the level-11 set
  (11 concepts) matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero
  discrepancy. Authored all 11: `phys.mech.angular-momentum`,
  `phys.mech.rolling-motion`, `phys.mech.euler-lagrange-equation`,
  `phys.therm.carnot-cycle`, `phys.therm.third-law`,
  `phys.mod.compton-effect`, `phys.mod.de-broglie`, `phys.mod.bohr-model`,
  `phys.mod.x-rays`, `phys.rel.time-dilation`,
  `phys.stat.probability-basics`. All 11 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text.
  Six of the eleven (all four Modern Physics concepts plus
  `phys.rel.time-dilation` and `phys.stat.probability-basics`) each cited
  all 4 of their Blueprint's documented misconceptions, extending the
  4-misconception density pattern to a total of 10 concepts across this
  program. This wave introduced the first Statistical Mechanics domain
  entry (`phys.stat.probability-basics`) in this program. All 11 entries
  verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order (0 mismatches), zero duplicate filenames/
  concept IDs, zero orphans against the live physics KG (all 155
  physics EB files map to a valid KG id). Physics KG re-validated: PASS,
  238/238 reachable, 0 failures/warnings — no KG file was touched.
  `physics` is now 155/238 — 65.13% complete. Wave 12 (dependency level
  12, 8 concepts — `phys.mech.conservation-of-angular-momentum` through
  `phys.stat.boltzmann-factor`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates, 0 broken KG references, 0
  invalid Blueprint references across all 190 entries.

- **Curriculum Completion Program, batch 15 — Domain Certification Mode,
  math.found Wave 6** (2026-07-23): returning to `math.found` after the
  mandatory-rules physics production cycle (batches 9-14). Authored the 5
  concepts whose prerequisites became fully satisfied after Wave 5 —
  `logical-equivalence`, `subset`, `quantifiers`, `relation`,
  `ordinal-number` (verified programmatically against the live KG's
  `requires` edges; matches the Wave-6 candidate list already computed in
  batch 8's closing section). All 5 had existing Blueprints reused by
  reference — each entry cites its Blueprint's Misconception Registry by
  MC number with birth-type classification added, never restating worked
  examples or mastery probes. `quantifiers` carries 4 misconceptions
  (MC-4, the ∀-implication/∃-conjunction asymmetry, is the rare case where
  a notation-induced misconception requires its own concrete counterexample
  demonstration rather than just a verbal correction). `ordinal-number` is
  the first expert-difficulty entry in this domain (estimated_hours: 12);
  its two Type-6 misconceptions (commutativity; ordinal=cardinal) both
  require the order-type bijection argument as the collision instrument —
  algebraic counter-argument alone is insufficient. The open
  `mathematical-notation`/`mathematical-symbols` Curriculum Feedback item
  from Wave 2 remains carried forward, unresolved. `math.found` is 36/82
  — still IN PROGRESS; 46 concepts remain (Wave 7 candidates to be
  computed from the live KG before the next batch). No other domain or
  subject was started this batch. **Reconciliation note (added during
  batch 16's merge, below): on direct inspection, all 5 of these files
  actually use a different, numbered 21-section heading scheme (`## 1.
  Concept Identity` … `## 21. Certification Status`) rather than
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact heading text, despite this
  batch's own claim of exact conformance — flagged as new migration debt
  in `QUALITY.md`, not silently rewritten.**

- **Curriculum Completion Program, Chemistry EB batch 1 — levels 0–3
  (standing production run)** (2026-07-23): new standing production
  instruction — author ALL 186 Chemistry Educational Brain entries in
  strict topological dependency order (22 levels, 0–21), one level per
  commit, continuing without stopping until 186/186. Level 0 (1 concept):
  `chem.found.matter`. Level 1 (4 concepts): `chem.found.states-of-matter`,
  `chem.found.pure-substances`, `chem.found.measurement`,
  `chem.atomic.atomic-theory`. Level 2 (8 concepts):
  `chem.found.significant-figures`, `chem.found.mole-concept`,
  `chem.atomic.subatomic-particles`, `chem.atomic.electromagnetic-radiation`,
  `chem.state.kinetic-theory`, `chem.thermo.system`, `chem.elect.conductance`,
  `chem.surface.colloids`, `chem.env.atmosphere`. Level 3 (10 concepts):
  `chem.found.stoichiometry`, `chem.found.concentration`,
  `chem.atomic.atomic-spectra`, `chem.atomic.photoelectric-effect`,
  `chem.period.classification`, `chem.state.gas-laws`, `chem.thermo.first-law`,
  `chem.surface.emulsions`, `chem.env.air-pollution`, `chem.env.water-soil`.
  KEY DISCOVERY: all 186 chemistry Blueprint entries in
  `docs/chemistry/teaching-assets/assets.json` contain `[TEMPLATE]`
  placeholder strings — no authored Blueprint content exists for chemistry.
  All chemistry EB entries are authored entirely from KG data
  (description, difficulty, bloom, estimated_hours, mastery_threshold,
  requires, unlocks, cross_links) and domain chemistry expertise, not by
  cross-referencing Blueprint content. Blueprint References section in
  each entry explicitly states this template status. 24 entries authored;
  all verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
  structure and heading order; 0 orphans, 0 duplicates. Chemistry is
  24/186 — 12.90% complete; Level 4 is next. **Reconciliation note (added
  during batch 16's merge, below): this batch's own commits never added
  their 24 rows to `EDUCATIONAL_BRAIN_INDEX.md`, `QUALITY.md`, or removed
  them from `AUTHORING_QUEUE.md` — a bookkeeping gap corrected as part of
  that merge, not left inconsistent.**

- **Batch 16 — Physics Wave 12 (2026-07-23)**: continuing the same
  mandatory-rules production cycle immediately following Wave 11 in this
  conversation, per rule 10's "fetch, re-audit, continue" discipline.
  Re-fetched `origin/main` after the Wave 11 push and confirmed 0
  commits ahead/behind before starting — no other session had touched
  physics EB concurrently. `math.found` was NOT touched and remains
  31/82 at batch start. Independently recomputed dependency levels via a
  fresh Kahn's-algorithm pass over the live KG's `requires` edges — the
  level-12 set (8 concepts) matched `AUTHORING_QUEUE.md`'s stored rows
  exactly, zero discrepancy. Authored all 8:
  `phys.mech.conservation-of-angular-momentum`,
  `phys.mech.cyclic-coordinates-conservation-laws`, `phys.mech.hamiltonian`,
  `phys.therm.refrigerators`, `phys.mod.wave-particle-duality`,
  `phys.mod.atomic-spectra`, `phys.rel.length-contraction`,
  `phys.stat.boltzmann-factor`. All 8 had existing Blueprints
  (Component-format) reused by reference — each entry cites its
  Blueprint's Misconception Engine/Register by name with birth-type
  classification added, never re-deriving probe/bridge/replacement text.
  All 8 cited all 4 of their Blueprint's documented misconceptions,
  extending the 4-misconception density pattern to a total of 18
  concepts across this program. This wave introduced the second
  Statistical Mechanics domain entry (`phys.stat.boltzmann-factor`) and
  reached the Hamiltonian formulation hub concept (`phys.mech.hamiltonian`),
  a genuine bridge into quantum mechanics via its KG unlock
  `phys.qm.scattering-theory-born-approximation`. All 8 entries verified
  against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure
  and heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 163 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched; all 6 subject KGs
  re-validated PASS. `physics` is now 163/238 — 68.49% complete.
  **This batch's push hit a concurrent push to `origin/main`** (the
  `math.found` Wave 6 batch and the Chemistry EB batch 1 above, both
  landed while this batch was in progress). Merged rather than force-
  pushed; found and corrected two real bookkeeping gaps in that
  concurrent work (chemistry's rows never added to
  `EDUCATIONAL_BRAIN_INDEX.md`/`QUALITY.md`/removed from
  `AUTHORING_QUEUE.md`) and one structural non-conformance (the
  `math.found` Wave 6 files' actual headings, discovered on inspection,
  don't match the Standard despite that batch's own claim) — both noted
  in place above rather than silently rewritten. True post-merge total,
  recomputed fresh from the live directories: **227** entries (163
  physics + 37 mathematics + 24 chemistry + 3 english), not hand-merged
  from the two conflicting drafts. Wave 13 (dependency level 13, 6
  concepts — `phys.mech.hamiltons-equations`, `phys.mod.radioactivity`,
  `phys.qm.wave-function`, `phys.rel.lorentz-transform`,
  `phys.stat.maxwell-boltzmann`, `phys.stat.partition-function`) is
  computed and next, but NOT started this batch. All six tracking files
  regenerated from source; re-validated 0 orphans, 0 duplicates across
  all 227 entries.

- **Batch 17 — Physics Wave 13 (2026-07-23)**: continuing the same
  mandatory-rules production cycle immediately following the Wave 12
  merge in this conversation, per rule 10's "fetch, re-audit, continue"
  discipline. Re-fetched `origin/main` after the Wave 12 merge-push and
  confirmed 0 commits ahead/behind before starting — no other session had
  touched physics EB concurrently this time. `math.found` was NOT
  touched and remains 37/82. Independently recomputed dependency levels
  via a fresh Kahn's-algorithm pass over the live KG's `requires`
  edges — the level-13 set (6 concepts) matched `AUTHORING_QUEUE.md`'s
  stored rows exactly, zero discrepancy. Authored all 6:
  `phys.mech.hamiltons-equations`, `phys.mod.radioactivity`,
  `phys.qm.wave-function`, `phys.rel.lorentz-transform`,
  `phys.stat.maxwell-boltzmann`, `phys.stat.partition-function`. All 6
  had existing Blueprints (Component-format) reused by reference — each
  entry cites its Blueprint's Misconception Engine/Register by name with
  birth-type classification added, never re-deriving probe/bridge/
  replacement text. 5 of the 6 (all but `phys.mech.hamiltons-equations`,
  whose Blueprint documents only 2 misconceptions) cited all 4 of their
  Blueprint's documented misconceptions, extending the 4-misconception
  density pattern to a total of 23 concepts across this program. This
  wave introduced the first Quantum Mechanics domain entry in this
  program (`phys.qm.wave-function`) and expanded Statistical Mechanics
  with two more hub concepts — `phys.stat.maxwell-boltzmann` and
  `phys.stat.partition-function` (the latter a major hub feeding six
  downstream KG concepts: `phys.stat.bose-einstein`,
  `phys.stat.entropy-statistical`, `phys.stat.fermi-dirac`,
  `phys.stat.free-energy`, `phys.stat.grand-canonical-ensemble`,
  `phys.stat.fluctuations-correlations`). All 6 entries verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order (0 mismatches), zero duplicate filenames/concept IDs,
  zero orphans against the live physics KG (all 169 physics EB files map
  to a valid KG id). Physics KG re-validated: PASS, 238/238 reachable, 0
  failures/warnings — no KG file was touched; all 6 subject KGs
  re-validated PASS. `physics` is now 169/238 — 71.01% complete. True
  total, recomputed fresh: **233** entries (169 physics + 37 mathematics
  + 24 chemistry + 3 english), 1,542 remaining, 13.13%. Wave 14
  (dependency level 14, 10 concepts — `phys.mech.poisson-brackets`,
  `phys.mod.radioactive-decay`, `phys.qm.schrodinger-equation`,
  `phys.qm.uncertainty-principle`, `phys.rel.relativistic-momentum`,
  `phys.stat.bose-einstein`, `phys.stat.entropy-statistical`,
  `phys.stat.fluctuations-correlations`, `phys.stat.free-energy`,
  `phys.stat.grand-canonical-ensemble`) is computed and next, but NOT
  started this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates across all 233 entries. **Merge
  note**: this batch's push encountered a concurrent push to
  `origin/main` (the Chemistry EB batch 2 below, 8 concepts). Merged
  rather than force-pushed; true post-merge total, recomputed fresh:
  **241** entries (169 physics + 37 mathematics + 32 chemistry + 3
  english), 1,534 remaining, 13.58%.

- **Curriculum Completion Program, Chemistry EB batch 2 — level 4**
  (2026-07-23): continuation of the standing production run. Level 4
  (8 concepts): `chem.atomic.bohr-model`, `chem.kinet.rate`,
  `chem.sol.types`, `chem.state.molar-mass-gas`, `chem.state.real-gases`,
  `chem.thermo.enthalpy`, `chem.thermo.entropy`,
  `chem.thermo.heat-capacities`. All authored from KG data and domain
  chemistry expertise (all chemistry Blueprints remain `[TEMPLATE]`
  placeholder strings). All 8 verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
  heading order; 0 orphans, 0 duplicates. Chemistry is 32/186 — 17.20%
  complete; Level 5 is next (6 concepts: `chem.atomic.quantum-numbers`,
  `chem.kinet.photochemistry`, `chem.kinet.rate-law`, `chem.sol.solubility`,
  `chem.thermo.gibbs`, `chem.thermo.third-law`).
  this batch's own commit updated `COVERAGE.md`/`ROADMAP.md` but did not
  add its 8 rows to `EDUCATIONAL_BRAIN_INDEX.md`/`QUALITY.md` or remove
  them from `AUTHORING_QUEUE.md` — corrected as part of the Wave 13
  merge above.

- **Batch 19 — Physics Wave 14 (2026-07-23)**: continuing the same
  mandatory-rules production cycle immediately following Wave 13's
  second merge in this conversation, per rule 10's "fetch, re-audit,
  continue" discipline. Re-fetched `origin/main` after the Wave 13
  merge-push and confirmed 0 commits ahead/behind before starting — no
  other session had touched physics EB concurrently this time.
  `math.found` was NOT touched and remains 37/82. Independently
  recomputed dependency levels via a fresh Kahn's-algorithm pass over
  the live KG's `requires` edges — the level-14 set (10 concepts)
  matched `AUTHORING_QUEUE.md`'s stored rows exactly, zero discrepancy.
  Authored all 10: `phys.mech.poisson-brackets`,
  `phys.mod.radioactive-decay`, `phys.qm.schrodinger-equation`,
  `phys.qm.uncertainty-principle`, `phys.rel.relativistic-momentum`,
  `phys.stat.bose-einstein`, `phys.stat.entropy-statistical`,
  `phys.stat.fluctuations-correlations`, `phys.stat.free-energy`,
  `phys.stat.grand-canonical-ensemble`. All 10 had existing Blueprints
  (Component-format, mostly 4-misconception style; the two
  `phys.stat.fluctuations-correlations` and
  `phys.stat.grand-canonical-ensemble` entries used a Component-style
  C2 Misconception Register table with only 2 documented misconceptions
  each) reused by reference — each entry cites its Blueprint's
  Misconception Engine/Register by name with birth-type classification
  added, never re-deriving probe/bridge/replacement text. This wave
  completed the Schrödinger-equation hub (`phys.qm.schrodinger-equation`,
  unlocking 5 downstream quantum-mechanics concepts:
  `phys.qm.harmonic-oscillator-qm`, `phys.qm.hydrogen-atom-qm`,
  `phys.qm.operators`, `phys.qm.particle-in-box`,
  `phys.qm.quantum-tunneling`) and expanded Statistical Mechanics with
  four more hub concepts (Bose-Einstein statistics, statistical entropy,
  fluctuations/correlations, free energy, grand canonical ensemble). All
  10 entries verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact
  21-section structure and heading order (0 mismatches), zero duplicate
  filenames/concept IDs, zero orphans against the live physics KG (all
  179 physics EB files map to a valid KG id). Physics KG re-validated:
  PASS, 238/238 reachable, 0 failures/warnings — no KG file was touched;
  all 6 subject KGs re-validated PASS. `physics` is now 179/238 —
  75.21% complete. True total, recomputed fresh: **251** entries (179
  physics + 37 mathematics + 32 chemistry + 3 english), 1,524 remaining,
  14.14%. Wave 15 (dependency level 15, 9 concepts —
  `phys.mech.canonical-transformations`, `phys.mod.nuclear-reactions`,
  `phys.qm.harmonic-oscillator-qm`, `phys.qm.operators`,
  `phys.qm.particle-in-box`, `phys.qm.quantum-tunneling`,
  `phys.rel.mass-energy`, `phys.stat.chemical-potential`,
  `phys.stat.phase-transitions`) is computed and next, but NOT started
  this batch. All six tracking files regenerated from source;
  re-validated 0 orphans, 0 duplicates across all 251 entries.

- **Batch 20 — Chemistry EB level 5 (2026-07-23)**: authored the 6 concepts at dependency level 5 —
  `chem.atomic.quantum-numbers`, `chem.kinet.photochemistry`, `chem.kinet.rate-law`,
  `chem.sol.solubility`, `chem.thermo.gibbs`, `chem.thermo.third-law`. All 6 verified against
  `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading order (0 mismatches),
  zero duplicates, zero orphans. Chemistry is now 38/186 — 20.43% complete.
  True total, recomputed fresh: **257** entries (179 physics + 37 mathematics + 38
  chemistry + 3 english), 1,518 remaining, 14.48%.

### Chemistry batch 4 — level 6 (2026-07-23)
Authored 7 concepts in topological order (level 6):
- `chem.atomic.orbitals` (proficient/understand/4h/0.75) — s/p/d/f shapes; radial/angular nodes (radial=n−l−1, angular=l); multielectron energy splitting
- `chem.env.ozone` (developing/understand/2h/0.75) — Chapman cycle; CFC photodissociation → Cl• catalytic chain; polar vortex; Montreal Protocol
- `chem.equil.concept` (developing/understand/2h/0.75) — dynamic equilibrium; ΔG = 0 at equilibrium; Q vs K; ΔG° = −RT ln K
- `chem.kinet.arrhenius` (proficient/apply/4h/0.80) — k = Ae^(−Ea/RT); linear form; two-T form; catalyst lowers Ea
- `chem.kinet.integrated-rate` (proficient/apply/4h/0.80) — zero/first/second-order integrated laws; half-lives; three-plot diagnostic; pseudo-first-order
- `chem.kinet.mechanism` (advanced/analyze/4h/0.75) — elementary steps; RDS; pre-equilibrium elimination; SSA; mechanism consistency
- `chem.thermo.cell-thermo` (proficient/apply/3h/0.75) — ΔG = −nFE; ΔG° = −nFE°; K from E°; Nernst equation; (∂E/∂T) = ΔS/nF

Chemistry: 38 → 45/186 entries. Total authored: 257 → 264.

### Chemistry batch 4 — level 7 (2026-07-23)

Five concepts in strict topological order (level 7 — all prerequisites at level ≤ 6):
- `chem.atomic.electronic-config` (developing/apply) — Aufbau, Pauli, Hund; 4s→3d fill, 3d→4s ionise; Cr/Cu anomalies; exchange energy
- `chem.atomic.quantum-mech-model` (proficient/understand) — Schrödinger equation qualitative; ψ vs |ψ|² Born interpretation; Heisenberg uncertainty (fundamental)
- `chem.equil.kc-kp` (proficient/apply) — Kc/Kp expressions; stoichiometric exponents; heterogeneous equilibria exclude solids/liquids; ICE tables; Kp=Kc(RT)^Δn
- `chem.equil.kw-ph` (developing/apply) — Kw=[H⁺][OH⁻]=10⁻¹⁴; pH=−log[H⁺]; pH+pOH=14 at 298K; strong acids/bases; neutral≠pH7 at non-298K
- `chem.kinet.catalysis` (proficient/understand) — Ea lowered (not K); homogeneous vs heterogeneous; Arrhenius rate ratio; enzyme kinetics qualitative

Running total: 50/186 chemistry entries. Levels 0–7 complete.

### Chemistry batch 5 — level 8 (2026-07-23)

Six concepts in strict topological order (level 8 — all prerequisites at level ≤ 7):
- `chem.equil.acids-bases` (developing/understand) — Arrhenius/Brønsted-Lowry/Lewis; conjugate pairs (exactly 1 H⁺ difference); amphoteric species; Ka×Kb=Kw; pKa down=strength up
- `chem.equil.complex-equil` (advanced/apply) — Kf formation constants; stepwise Kn; β=K₁×K₂×...×Kn; competition Knet=Ksp×Kf; add equilibria→multiply K; reverse→1/K
- `chem.equil.le-chatelier` (developing/apply) — concentration/pressure/temperature stresses; catalyst no shift; Δn_gas=0 case; van't Hoff isochore; Haber/Contact industrial applications
- `chem.equil.solubility` (proficient/apply) — Ksp; stoichiometric multipliers (2s, 3s); Q_sp precipitation; common ion effect; compare solubility across formula types via s not Ksp
- `chem.period.modern-periodic-law` (developing/understand) — Z not mass (Moseley); four blocks s/p/d/f; (n−1)d for d-block; period length; hydrogen anomaly
- `chem.surface.adsorption` (proficient/understand) — physisorption vs chemisorption; Freundlich (empirical); Langmuir (monolayer, θ=bP/(1+bP)); Sabatier principle

Running total: 56/186 chemistry entries. Levels 0–8 complete.

### Batch 24 — Chemistry Educational Brain level 9 (2026-07-23)

10 entries authored in strict topological order (level 9 — concepts whose prerequisites are all in levels 0–8):

- `chem.anal.chromatography` (proficient/apply): stationary/mobile phase; Rf calculation; TLC, HPLC, GC, ion-exchange, size-exclusion; MC-1 low Rf = HIGH affinity; MC-2 large molecules elute FIRST in size-exclusion
- `chem.anal.gravimetric` (proficient/apply): gravimetric factor = M(analyte)×stoich/M(precipitate); four stages; BaSO₄ and AgCl; co-precipitation → HIGH error; MC-1 inverted GF; MC-2 co-precipitation direction; MC-3 excess precipitant
- `chem.bond.metallic-bonding` (developing/understand): electron-sea model; non-directional; malleability/conductivity/lustre/high mp; band theory qualitative; MC-1 metallic=covalent; MC-2 liquid metals don't conduct; MC-3 d-block complexity
- `chem.equil.weak-acid` (proficient/apply): ICE table; Ka=x²/(C₀−x); 5% approximation; Ostwald's dilution law; α increases on dilution; Ka×Kb=Kw; polyprotic acids; MC-1 dilution decreases α; MC-2 Ka+Kb=Kw; MC-3 5% always valid
- `chem.period.atomic-radius` (developing/analyze): covalent/van der Waals/ionic radii; trends (decreasing across period, increasing down group); Zeff; isoelectronic series; lanthanide contraction; MC-1 radius increases across period; MC-2 cation>parent; MC-3 period 6 always larger
- `chem.period.ionization-energy` (developing/analyze): IE₁ definition; successive IEs and shell-boundary jump; general trend; two anomalies (Group 2/13: 3p>3s energy; Group 15/16: pairing repulsion); distance effect down group; MC-1 no exceptions; MC-2 jump position=valence electrons; MC-3 shielding explanation for group trend
- `chem.period.electron-affinity` (developing/analyze): ΔegH sign convention; general trend; anomalies Group 2 (ns² complete), Group 15 (half-filled p), F<Cl (crowded n=2 shell); second EA positive; Mulliken electronegativity; MC-1 more negative=weaker; MC-2 F/Cl same mechanism as N/O; MC-3 second EA negative
- `chem.period.valency` (developing/apply): unpaired electrons → ground-state valency; d-orbital expansion period 3+; period 2 cannot expand; cross-multiplication rule for formulas; transition metal variable oxidation states; MC-1 group number=valency; MC-2 NCl₅ by analogy; MC-3 oxidation state=electron count
- `chem.sblock.hydrogen` (developing/understand): unique position (not alkali metal); three isotopes; dihydrogen preparation; ionic/covalent/metallic hydrides; water anomalies (H-bonding, ice density); H₂O₂ dual redox role; hydrogen fuel; MC-1 H=alkali metal; MC-2 ice denser; MC-3 H₂O₂ always oxidant
- `chem.surface.heterogeneous-cat` (advanced/analyze): three-step mechanism (adsorption→surface reaction→desorption); active sites (geometric+electronic); Sabatier principle; poisoning; promoters; Haber (Fe, rate-limiting N₂ chemisorption); Contact (V₂O₅, Mars-van Krevelen); catalytic converter; MC-1 catalyst provides energy; MC-2 Haber/Contact catalyst swap; MC-3 poisoning=total deactivation

Chemistry: 56 → 66 entries. Levels 0–9 complete.

### Batch 25 — Chemistry Level 10 (2026-07-23)
7 concepts authored (level 10 complete, 73/186 chemistry entries):
- chem.bond.covalent-bonding — developing/understand; Lewis structures, bond order, polarity, molecular polarity vector sum
- chem.bond.ionic-bonding — developing/understand; electron transfer, lattice energy, Born-Haber overview, properties from lattice model
- chem.equil.buffer — proficient/apply; Henderson-Hasselbalch, buffer capacity, blood buffer, component selection
- chem.equil.hydrolysis — proficient/apply; salt classification, anion/cation hydrolysis, Kh=Kw/Ka, pH calculation
- chem.equil.titration — proficient/apply; all four curve types, equivalence vs endpoint, indicator selection, pH at six stages
- chem.period.periodic-properties — developing/analyze; synthesis node: Zeff/n framework, electronegativity, metallic character, reactivity, diagonal relationships
- chem.redox.oxidation-state — developing/apply; OS rule set (priority cascade), OIL RIG, oxidising/reducing agent, disproportionation

### Batch 26 — Chemistry Level 11 (2026-07-23)
16 concepts authored (topological level 11):
chem.bond.bond-parameters, chem.bond.coordinate-bond, chem.bond.hybridization, chem.bond.resonance, chem.bond.vsepr, chem.dblock.general, chem.org.iupac, chem.pblock.group13, chem.pblock.group14, chem.pblock.group15, chem.pblock.group16, chem.pblock.group17, chem.pblock.group18, chem.redox.balancing, chem.sblock.alkali, chem.solid.crystal-systems
Chemistry: 73 → 89/186 entries (47.85%).

### Physics EB Wave 15 (2026-07-23)

9 concepts authored in strict topological order (dependency level 15 —
all prerequisites satisfied by the 179 physics EB entries authored
through Wave 14, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG rather than trusting any stored level number):
`phys.mech.canonical-transformations`, `phys.mod.nuclear-reactions`,
`phys.qm.harmonic-oscillator-qm`, `phys.qm.operators`,
`phys.qm.particle-in-box`, `phys.qm.quantum-tunneling`,
`phys.rel.mass-energy`, `phys.stat.chemical-potential`,
`phys.stat.phase-transitions`. This completes the second major Quantum
Mechanics cluster (operators, particle-in-box, harmonic oscillator,
tunneling — all four downstream of the `phys.qm.schrodinger-equation` hub
authored in Wave 14) and closes out the Statistical Mechanics domain's
final two leaf concepts (chemical potential, phase transitions), plus one
Classical Mechanics capstone (canonical transformations) and one Modern
Physics capstone (nuclear reactions, generalizing radioactive decay's
Q-value machinery to induced two-body reactions). All 9 had existing
Blueprints (`docs/curriculum/blueprints/{id}.md`) reused by reference —
Misconception Libraries cited by MC-ID/number with birth-type
classification added per this program's standard practice, never
restating worked examples, demonstrations, or full teaching-action
sequences already owned by the Blueprint. All 9 entries verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicate filenames/concept IDs (confirmed via
`git log --diff-filter=A` showing 0 prior commits touching any of the 9
new files), zero orphans against the live physics KG (all 188 physics EB
files map to a valid KG id). Physics KG re-validated: PASS, 238/238
reachable, 0 failures/warnings — no KG file was touched; all 6 subject
KGs re-validated PASS. `physics` is now 188/238 — 78.99% complete. True
total, recomputed fresh: **317** entries (188 physics + 37 mathematics +
89 chemistry + 3 english), out of 1,775 total KG concepts across all 6
subjects — 1,458 remaining, 17.86%. Wave 16 candidates
were not computed this batch — the next iteration of this program should
begin with a fresh `git fetch`/pull, re-audit current Physics EB state
from scratch (per this program's standing discipline of never trusting
stored counts), and recompute the next topological wave from the live KG.
All six tracking files regenerated from source; re-validated 0 orphans, 0
duplicates across all 317 entries.

### Physics EB Wave 16 (2026-07-23)

7 concepts authored in strict topological order (dependency level 16 —
all prerequisites satisfied by the 188 physics EB entries authored
through Wave 15, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG): `phys.mech.hamilton-jacobi-equation`,
`phys.mod.binding-energy`, `phys.qm.hydrogen-atom-qm`, `phys.qm.spin`,
`phys.rel.spacetime`, `phys.stat.ising-model`, `phys.particle.four-
forces`. This wave is notable for `phys.particle.four-forces` —
verified as the formal root node (zero prerequisites within the domain,
requiring only `phys.em.coulombs-law` and `phys.mod.nuclear-reactions`
from outside it) of the entire Particle Physics domain, opening that
16-concept domain for future waves. All 7 had existing Blueprints
reused by reference — Misconception Libraries cited by MC-ID/number
with birth-type classification added. All 7 entries verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicate filenames/concept IDs (confirmed
via `git log --diff-filter=A` showing 0 prior commits touching any of
the 7 new files), zero orphans against the live physics KG (all 195
physics EB files map to a valid KG id, repo-wide scan across all 6
subjects also clean). Physics KG re-validated: PASS, 238/238 reachable,
0 failures/warnings — no KG file was touched; all 6 subject KGs
re-validated PASS. `physics` is now 195/238 — 81.93% complete. True
total, recomputed fresh: **324** entries (195 physics + 37 mathematics +
89 chemistry + 3 english), out of 1,775 total KG concepts — 1,451
remaining, 18.25%. Wave 17 candidates were not computed this batch — the
next iteration of this program should begin with a fresh `git fetch`/
pull, re-audit current Physics EB state from scratch, and recompute the
next topological wave from the live KG.

### Physics EB Wave 17 (2026-07-23)

12 concepts authored in strict topological order (dependency level 17 —
all prerequisites satisfied by the 195 physics EB entries authored
through Wave 16, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG): `phys.mod.nuclear-fission`, `phys.mod.
nuclear-fusion`, `phys.mod.nuclear-models`, `phys.qm.pauli-exclusion`,
`phys.qm.perturbation-theory`, `phys.qm.selection-rules`, `phys.qm.
angular-momentum-addition`, `phys.qm.density-matrix`, `phys.stat.phase-
transitions-critical-phenomena`, `phys.stat.monte-carlo-basics`,
`phys.particle.particle-classification`, `phys.particle.gauge-bosons`.
This is the largest single wave since Wave 9 (16 concepts), reflecting
the unlock cascade from Wave 16's domain-opening concepts:
`phys.mod.binding-energy` unlocked 3 leaf nuclear-physics concepts
(fission, fusion, nuclear models); `phys.qm.operators`/`phys.qm.spin`/
`phys.qm.hydrogen-atom-qm` together unlocked 5 quantum-mechanics
concepts (Pauli exclusion, perturbation theory, selection rules,
angular-momentum addition, density matrix); `phys.stat.ising-model`
unlocked 2 statistical-mechanics concepts (critical phenomena, Monte
Carlo methods); `phys.particle.four-forces` unlocked 2 more Particle
Physics concepts (particle classification, gauge bosons), continuing
the domain opened in Wave 16. All 12 had existing Blueprints reused by
reference. All 12 entries verified against `EDUCATIONAL_BRAIN_
STANDARD.md`'s exact 21-section structure and heading order (0
mismatches), zero duplicate filenames/concept IDs, zero orphans against
the live physics KG (all 207 physics EB files map to a valid KG id,
repo-wide scan across all 6 subjects also clean). Physics KG re-
validated: PASS, 238/238 reachable, 0 failures/warnings — no KG file
was touched; all 6 subject KGs re-validated PASS. `physics` is now
207/238 — 86.97% complete. True total, recomputed fresh: **336**
entries (207 physics + 37 mathematics + 89 chemistry + 3 english), out
of 1,775 total KG concepts — 1,439 remaining, 18.93%. Wave 18 candidates
were not computed this batch — the next physics iteration should begin
with a fresh fetch/audit per this program's standing discipline.

### Physics EB Wave 18 (2026-07-23)

8 concepts authored in strict topological order (dependency level 18 —
all prerequisites satisfied by the 207 physics EB entries authored
through Wave 17, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, triggered by the explicit standing
instruction "Keep continue until 238/238 done"): `phys.qm.variational-
method`, `phys.qm.identical-particles`, `phys.qm.scattering-theory-born-
approximation`, `phys.stat.fermi-dirac`, `phys.astro.stellar-structure`,
`phys.particle.antimatter`, `phys.particle.quarks`, `phys.particle.
leptons`. This wave draws from three different domains simultaneously:
Wave 17's `phys.qm.perturbation-theory`/`phys.qm.angular-momentum-
addition`/`phys.qm.pauli-exclusion` together unlocked 3 more quantum-
mechanics concepts (variational method, identical particles, scattering
theory); `phys.stat.partition-function` plus Wave 17's `phys.qm.pauli-
exclusion` unlocked Fermi-Dirac statistics; `phys.mod.nuclear-fusion`
(Wave 17) plus the pre-existing `phys.mech.universal-gravitation`
unlocked the Astrophysics domain's `phys.astro.stellar-structure` (the
first Astrophysics-domain concept authored — a 6-concept domain not
previously called out separately in project memory, confirmed present
in the live KG); Wave 17's `phys.particle.particle-classification`
unlocked 3 more Particle Physics concepts (antimatter, quarks, leptons).
All 8 had existing Blueprints reused by reference. All 8 entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 215 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
215/238 — 90.34% complete. True total, recomputed fresh: **344** entries
(215 physics + 37 mathematics + 89 chemistry + 3 english), out of 1,775
total KG concepts — 1,431 remaining, 19.38%. Per the standing
instruction, Wave 19 candidates were not computed this batch — the next
physics iteration should begin immediately with a fresh fetch/audit per
this program's standing discipline, continuing without pausing until
physics reaches 238/238.

### Physics EB Wave 19 (2026-07-23)

8 concepts authored in strict topological order (dependency level 19 —
all prerequisites satisfied by the 215 physics EB entries authored
through Wave 18, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.qm.wkb-approximation`,
`phys.qm.s-matrix-basics`, `phys.astro.stellar-evolution`, `phys.astro.
cosmology`, `phys.particle.neutrinos`, `phys.particle.hadron-quark-
model`, `phys.particle.strong-interaction`, `phys.mod.energy-bands`.
This wave continues consuming Wave 18's unlock cascade: `phys.qm.
quantum-tunneling` plus Wave 18's `phys.qm.variational-method` unlocked
the WKB approximation; Wave 18's `phys.qm.scattering-theory-born-
approximation` unlocked S-matrix basics; Wave 18's `phys.astro.stellar-
structure` unlocked both `phys.astro.stellar-evolution` and (combined
with the pre-existing `phys.rel.spacetime`) `phys.astro.cosmology`;
Wave 18's `phys.particle.leptons` unlocked `phys.particle.neutrinos`;
`phys.particle.quarks` unlocked `phys.particle.hadron-quark-model`;
`phys.particle.gauge-bosons` plus `phys.particle.quarks` unlocked
`phys.particle.strong-interaction`; and `phys.mod.atomic-spectra` plus
Wave 18's `phys.stat.fermi-dirac` unlocked `phys.mod.energy-bands` (the
entry point for the six-concept semiconductor-physics extension). All 8
had existing Blueprints reused by reference. All 8 entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 223 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
223/238 — 93.70% complete. True total at the moment this wave was
authored (before merging the concurrent chemistry batch below):
**352** entries (223 physics + 37 mathematics + 89 chemistry + 3
english), out of 1,775 total KG concepts — 1,423 remaining, 19.83%. Per
the standing instruction, Wave 20 candidates were not computed this
batch — the next physics iteration should begin immediately with a
fresh fetch/audit per this program's standing discipline, continuing
without pausing until physics reaches 238/238.

**Merge note (2026-07-23)**: this Wave 19 commit and a concurrent
session's Chemistry level-12 batch (below) were pushed independently and
merged via `git merge`, both touching this file and `ROADMAP.md`. No
file overlap in the authored `.md` concept files themselves (physics vs.
chemistry) — only the two shared tracking files needed reconciliation.
Combined true total after merge: **369** entries (223 physics + 37
mathematics + 106 chemistry + 3 english), out of 1,775 total KG
concepts — 1,406 remaining, 20.79%. Re-verified via a full recount of
every live file in `educational-brain/concepts/{subject}/` after the
merge, not by simple addition of the two batches' self-reported totals.

### Batch 27 — Chemistry level 12 (17 concepts, 2026-07-23)
17 concepts authored at topological level 12 in strict dependency order.

Files authored:
- chem.bond.mo-theory (MO theory: LCAO, bonding/antibonding, bond order, O₂ paramagnetism)
- chem.bond.polar-molecules (dipole vector addition; CO₂ nonpolar despite polar bonds; BF₃ vs NF₃)
- chem.coord.werner (Werner's primary/secondary valency; AgNO₃ precipitation; chelate effect)
- chem.dblock.first-row (Cr/Cu anomalies; Fe/Cu/Mn/Cr OS; Fe²⁺/Fe³⁺/Cu²⁺/MnO₄⁻/Cr₂O₇²⁻ chemistry)
- chem.dblock.lanthanides (f-block; lanthanide contraction; f–f transitions; NdFeB/Eu/Tb/Ce/Gd applications)
- chem.org.hybridization (sp³/sp²/sp in organic; O and N heteroatom hybridization; pyridine-N vs pyrrole-N)
- chem.org.purification (distillation/recrystallisation/extraction/TLC/column/GC-MS; mp as purity indicator)
- chem.org.spectroscopy (MS M⁺/base peak/isotope patterns; IR key absorptions; ¹H NMR δ/splitting/integration)
- chem.pblock.trends (oxide acidity Period 3; chloride hydrolysis; hydride bp anomalies; inert pair; first-member anomaly)
- chem.redox.activity-series (E° definition; SHE; E°cell = E°cathode − E°anode; displacement reactions; activity series)
- chem.redox.disproportionation (same element same OS → split to higher and lower; Cu⁺ unstable; Cl₂/alkali; H₂O₂; E° criterion)
- chem.redox.titrations (KMnO₄ self-indicating/H₂SO₄ only; K₂Cr₂O₇/diphenylamine; iodometric/thiosulfate 2:1; starch near endpoint)
- chem.sblock.alkaline-earth (Group 2; +2 always; reactivity ↑ down; hydroxide solubility ↑ down; sulphate solubility ↓ down; carbonate thermal stability; Be anomaly)
- chem.solid.amorphous (no long-range order; isotropic; Tg; no sharp mp; glass/polymers/metallic glasses; glass-flow myth)
- chem.solid.defects (Schottky/Frenkel point defects; density effects; non-stoichiometry FeO₁₋ₓ; F-centres; dislocations)
- chem.solid.packing (CCP ABCABC vs HCP ABABAB; 74% packing; 2 tet + 1 oct holes per CCP atom; NaCl/ZnS/CaF₂ hole-filling)
- chem.thermo.bond-enthalpy (mean bond enthalpies; ΔH ≈ Σbroken − Σformed; estimate not exact; F–F weakness; N≡N strength)

Running total: 106/186 chemistry entries. Levels 0–12 complete.
