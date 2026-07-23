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
| mathematics | 908 | 32 | `math.arith.fractions` + 31 `math.found.*` entries (Waves 1-5) — math.found domain IN PROGRESS (31/82), see Delivery history |
| physics | 238 | 104 | pre-existing 67 (TEMPLATE.md-era) + 12 Wave 6 (2026-07-22, level 6) + 25 Wave 7 (2026-07-23, level 7, this batch): `phys.mech.friction`, `phys.mech.tension`, `phys.mech.normal-force`, `phys.mech.kinetic-energy`, `phys.mech.potential-energy`, `phys.mech.power`, `phys.mech.impulse`, `phys.mech.center-of-mass`, `phys.mech.angular-kinematics`, `phys.mech.gravitational-field`, `phys.mech.stress-strain`, `phys.mech.buoyancy`, `phys.mech.surface-tension`, `phys.therm.first-law`, `phys.wave.shm`, `phys.opt.diffraction`, `phys.em.dielectrics`, `phys.em.energy-capacitor`, `phys.em.resistivity`, `phys.em.dc-circuits`, `phys.em.electrical-power`, `phys.em.solenoid`, `phys.em.mutual-inductance`, `phys.em.ac-basics`, `phys.em.maxwells-equations` — 134 concepts remain; see Delivery history for the full pre-existing-67 and Wave-6 name lists |
| english | 216 | 3 | `eng.phonics.letter-sound-correspondence`, `eng.phonics.phonemic-awareness` (previously uncounted here — corrected), `eng.phonics.print-concepts` (2026-07-22, this batch) — **both of English's zero-prerequisite entry nodes are now covered** |
| chemistry | 186 | 0 | — |
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
