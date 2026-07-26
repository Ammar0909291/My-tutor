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
| mathematics | 908 | 137 | 82 `math.found.*` entries (COMPLETE, DOMAIN CERTIFIED 2026-07-26) + 55 `math.arith.*` entries (`fractions`, `counting`, `fraction-equivalence`, `fraction-multiplication`, `fraction-reciprocal`, `mixed-numbers`, `improper-fractions`, `ratios`, `counting-sequence`, `subitizing`, `place-value`, `number-line`, `proportion`, `unit-rate`, `ones-tens-hundreds`, `addition`, `decimals`, `expanded-form`, `number-base`, `ordering`, `direct-variation`, `inverse-variation`, `subtraction`, `multiplication`, `percentages`, `rounding`, `carrying`, `mental-addition`, `decimal-operations`, `terminating-decimals`, `repeating-decimals`, `negative-numbers`, `division`, `significant-figures`, `exponentiation`, `column-addition`, `borrowing`, `multiplication-table`, `percentage-calculations`, `estimation`, `absolute-value`, `integer-arithmetic`, `remainder`, `order-of-operations`, `exponent-rules`, `square-numbers`, `long-multiplication`, `mental-multiplication`, `divisor-dividend`, `percentage-change`, `cube-numbers`, `scientific-notation`, `long-division`, `square-roots`, `mental-arithmetic` — `math.arith` domain IN PROGRESS, 55/58, only 3 concepts remain, all blocked on unauthored number-theory prerequisites `math.nt.gcd`/`math.nt.lcm`), see Delivery history. All confirmed Quality Gate 3 heading-scheme violations found by this program have been repaired — 0 known violations remain in mathematics. |
| physics | 238 | 238 | **100% COMPLETE (2026-07-23).** pre-existing 67 (TEMPLATE.md-era) + 12 Wave 6 + 25 Wave 7 + 15 Wave 8 + 16 Wave 9 + 9 Wave 10 + 11 Wave 11 + 8 Wave 12 + 6 Wave 13 + 10 Wave 14 + 9 Wave 15 + 7 Wave 16 + 12 Wave 17 + 8 Wave 18 + 8 Wave 19 + 5 Wave 20 + 5 Wave 21 + 2 Wave 22 + 2 Wave 23 + 1 Wave 24 (FINAL): `phys.mod.diode-rectification` — every physics KG concept now has a full Educational Brain entry; see Delivery history for the full pre-existing-67, Wave-6 through Wave-23 name lists |
| english | 216 | 3 | `eng.phonics.letter-sound-correspondence`, `eng.phonics.phonemic-awareness` (previously uncounted here — corrected), `eng.phonics.print-concepts` (2026-07-22, this batch) — **both of English's zero-prerequisite entry nodes are now covered** |
| chemistry | 186 | 186 | **100% COMPLETE (2026-07-26).** Completion Loop 2026-07-25/26, batch 5 of 5: chem.poly.condensation, natural, biodegradable, properties authored, closing chem.poly to 5/5 (chem.poly.addition was already covered). Batches 1-4 closed chem.alc (6/6), chem.carb (7/7), chem.nitro (5/5), chem.bio (6/6) in that order. Every Chemistry KG concept now has a full 21-section Educational Brain entry, a fully authored 16-section Blueprint (`docs/curriculum/blueprints/chem.*.md`), and an authored Teaching Asset (`docs/chemistry/teaching-assets/assets.json`, status draft) — the stale 2026-07-23 note below claiming all-placeholder Blueprint content is corrected here. **Known bookkeeping gap (not corrected this batch):** `EDUCATIONAL_BRAIN_INDEX.md`, `AUTHORING_QUEUE.md`, and `QUALITY.md` were not regenerated for the 21 chemistry entries authored 2026-07-25/26 (chem.alc.epoxides/protection, chem.carb.ketones/carboxylic/alpha-reactions/derivatives/spectro/named-reactions, chem.nitro.amino-acids/diazonium/heterocycles, chem.bio.proteins/carbohydrates/lipids/enzyme-kinetics/nucleic-acids/vitamins, chem.poly.condensation/natural/biodegradable/properties) — those three registry files still show chemistry as 165/186 and should be regenerated from source in a future pass, per `PRODUCTION_PIPELINE.md`'s workflow. |
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
  **Correction (2026-07-25, does not rewrite the historical record above):**
  the "KEY DISCOVERY" claim that all 186 chemistry Blueprint entries are
  `[TEMPLATE]` placeholders is now stale — a separate completion program
  (2026-07-25) fully authored all 186 `docs/curriculum/blueprints/chem.*.md`
  Blueprints (16-section format) and transcribed them into
  `docs/chemistry/teaching-assets/assets.json` (all 186 entries now
  `status: draft`, not `placeholder`). New chemistry EB entries authored
  from 2026-07-25 onward correctly cite these real Blueprints in their
  Blueprint References section; the 165 entries authored before this date
  still carry the now-inaccurate "no Blueprint content exists" statement
  and were not retroactively rewritten (out of scope for this batch).

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

### Batch 28 — Chemistry level 13 (2026-07-23)
Authored 15 level-13 concepts in topological order: `chem.anal.spectroscopy`, `chem.anal.volumetric`, `chem.bond.intermolecular`, `chem.coord.cft`, `chem.coord.nomenclature`, `chem.coord.stability`, `chem.dblock.oxo-species`, `chem.elect.galvanic-cell`, `chem.hyd.alkanes`, `chem.org.aromaticity`, `chem.org.electronic-effects`, `chem.org.isomerism`, `chem.org.qualitative-analysis`, `chem.solid.ionic-solids`, `chem.solid.properties`. Chemistry: 106 → 121/186.

**Merge note (2026-07-23)**: this Batch 28 (Chemistry level 13) and this
session's Physics Wave 19 batch were pushed independently and merged via
`git merge`. No file overlap in authored concept files — only this file
and `ROADMAP.md` needed reconciliation. Combined true total after merge:
**384** entries (223 physics + 37 mathematics + 121 chemistry + 3
english), out of 1,775 total KG concepts — 1,391 remaining, 21.63%.
Re-verified via a full recount of every live file in
`educational-brain/concepts/{subject}/` after the merge.

### Physics EB Wave 20 (2026-07-23)

5 concepts authored in strict topological order (dependency level 20 —
all prerequisites satisfied by the 223 physics EB entries authored
through Wave 19, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.astro.dark-matter`,
`phys.astro.black-holes`, `phys.particle.weak-interaction`,
`phys.particle.conservation-laws`, `phys.mod.semiconductor-
classification`. This wave draws from three domains: Wave 19's
`phys.astro.cosmology` unlocked `phys.astro.dark-matter` (the
Astrophysics domain's leaf/culminating-synthesis node); Wave 19's
`phys.astro.stellar-evolution` plus the pre-existing `phys.rel.spacetime`
unlocked `phys.astro.black-holes`; the pre-existing `phys.particle.
gauge-bosons` plus Wave 19's `phys.particle.hadron-quark-model` unlocked
`phys.particle.weak-interaction`; Wave 19's `phys.particle.hadron-quark-
model` plus the pre-existing `phys.particle.leptons` unlocked `phys.
particle.conservation-laws`; and Wave 19's `phys.mod.energy-bands`
unlocked `phys.mod.semiconductor-classification`, continuing the
semiconductor-physics extension. All 5 had existing Blueprints reused by
reference. All 5 entries verified against `EDUCATIONAL_BRAIN_
STANDARD.md`'s exact 21-section structure and heading order (0
mismatches), zero duplicate filenames/concept IDs, zero orphans against
the live physics KG (all 228 physics EB files map to a valid KG id,
repo-wide scan across all 6 subjects also clean). Physics KG re-
validated: PASS, 238/238 reachable, 0 failures/warnings — no KG file
was touched; all 6 subject KGs re-validated PASS. `physics` is now
228/238 — 95.80% complete. True total, recomputed fresh: **389** entries
(228 physics + 37 mathematics + 121 chemistry + 3 english), out of 1,775
total KG concepts — 1,386 remaining, 21.92%. Per the standing
instruction, Wave 21 candidates were not computed this batch — the next
physics iteration should begin immediately with a fresh fetch/audit per
this program's standing discipline, continuing without pausing until
physics reaches 238/238. Only 10 physics concepts remain across levels
21-24.

### Physics EB Wave 21 (2026-07-23)

5 concepts authored in strict topological order (dependency level 21 —
all prerequisites satisfied by the 228 physics EB entries authored
through Wave 20, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.astro.gravitational-waves`,
`phys.particle.electroweak-unification`, `phys.particle.feynman-
diagrams`, `phys.particle.accelerators-detectors`, `phys.mod.intrinsic-
semiconductors`. This wave draws from three domains: Wave 20's
`phys.astro.black-holes` unlocked `phys.astro.gravitational-waves` (the
Astrophysics domain's terminal node — Astrophysics is now fully
authored); Wave 20's `phys.particle.weak-interaction` unlocked `phys.
particle.electroweak-unification`; the pre-existing `phys.particle.
gauge-bosons` plus Wave 20's `phys.particle.conservation-laws` unlocked
`phys.particle.feynman-diagrams`; Wave 20's `phys.particle.conservation-
laws` plus the pre-existing `phys.rel.relativistic-momentum` unlocked
`phys.particle.accelerators-detectors`; and Wave 20's `phys.mod.
semiconductor-classification` unlocked `phys.mod.intrinsic-
semiconductors`, continuing the semiconductor-physics extension. All 5
had existing Blueprints reused by reference. All 5 entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 233 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
233/238 — 97.90% complete. True total at the moment this wave was
authored: 394 entries (233 physics + 37 mathematics + 121 chemistry + 3
english). Only 5 physics concepts remain, all in Particle Physics
(levels 22-23) and the Modern Physics semiconductor extension (levels
22-24).

### Batch 29 — Chemistry level 14 (2026-07-23, concurrent)

Authored 15 level-14 concepts in topological order, landed on
`origin/main` concurrently with this session's Physics Wave 21 push,
merged via `git merge` with zero file overlap in authored concept files
(only `COVERAGE.md` and `ROADMAP.md` required conflict resolution):
`chem.coord.applications`, `chem.coord.bonding`, `chem.coord.isomerism`,
`chem.dblock.organometallics`, `chem.elect.batteries`,
`chem.elect.corrosion`, `chem.elect.electrolysis`,
`chem.elect.standard-electrode`, `chem.hal.introduction`,
`chem.hyd.arenes`, `chem.hyd.conformations`, `chem.hyd.petroleum`,
`chem.org.reactive-intermediates`, `chem.sblock.water`,
`chem.state.liquids`. Chemistry: 121 → 136/186 (73.12%). True total
after this merge, recomputed fresh by scanning every live file across
all 6 subjects: **409** entries (233 physics + 37 mathematics + 136
chemistry + 3 english), out of 1,775 total KG concepts — 1,366
remaining, 23.04%. Per the standing instruction, Wave 22 candidates were
not computed this batch — the next physics iteration should begin
immediately with a fresh fetch/audit per this program's standing
discipline, continuing without pausing until physics reaches 238/238.

### Physics EB Wave 22 (2026-07-23)

2 concepts authored in strict topological order (dependency level 22 —
all prerequisites satisfied by the 233 physics EB entries authored
through Wave 21, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.particle.higgs-mechanism`,
`phys.mod.extrinsic-semiconductors`. This wave draws from two domains:
Wave 21's `phys.particle.electroweak-unification` plus the pre-existing
`phys.particle.gauge-bosons` unlocked `phys.particle.higgs-mechanism`;
and Wave 21's `phys.mod.intrinsic-semiconductors` unlocked `phys.mod.
extrinsic-semiconductors`, continuing the semiconductor-physics
extension. Both had existing Blueprints reused by reference. Both
entries verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact
21-section structure and heading order (0 mismatches), zero duplicate
filenames/concept IDs, zero orphans against the live physics KG (all 235
physics EB files map to a valid KG id, repo-wide scan across all 6
subjects also clean). Physics KG re-validated: PASS, 238/238 reachable,
0 failures/warnings — no KG file was touched; all 6 subject KGs
re-validated PASS. `physics` is now 235/238 — 98.74% complete. True
total, recomputed fresh: **411** entries (235 physics + 37 mathematics +
136 chemistry + 3 english), out of 1,775 total KG concepts — 1,364
remaining, 23.15%. Per the standing instruction, Wave 23 candidates were
not computed this batch — the next physics iteration should begin
immediately with a fresh fetch/audit per this program's standing
discipline, continuing without pausing until physics reaches 238/238.
Only 3 physics concepts remain: `phys.particle.standard-model` and
`phys.mod.pn-junction` at level 23, then `phys.mod.diode-rectification`
at level 24 — the terminal node.

### Physics EB Wave 23 (2026-07-23)

2 concepts authored in strict topological order (dependency level 23 —
all prerequisites satisfied by the 235 physics EB entries authored
through Wave 22, verified via a fresh Kahn's-algorithm recomputation
against the live physics KG, per the same explicit standing instruction
"Keep continue until 238/238 done"): `phys.particle.standard-model`,
`phys.mod.pn-junction`. This wave draws from two domains:
`phys.particle.standard-model` — the Particle Physics domain's terminal
capstone node — required all four of Wave 22's/prior waves'
`phys.particle.hadron-quark-model`, `phys.particle.gauge-bosons`,
`phys.particle.higgs-mechanism`, and `phys.particle.conservation-laws`
jointly, completing the Particle Physics domain in full; and
`phys.mod.pn-junction` (unlocked from Wave 22's `phys.mod.extrinsic-
semiconductors`, continuing the semiconductor-physics extension). Both
had existing Blueprints reused by reference. Both entries verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicate filenames/concept IDs, zero
orphans against the live physics KG (all 237 physics EB files map to a
valid KG id, repo-wide scan across all 6 subjects also clean). Physics
KG re-validated: PASS, 238/238 reachable, 0 failures/warnings — no KG
file was touched; all 6 subject KGs re-validated PASS. `physics` is now
237/238 — 99.58% complete, with the Particle Physics domain now fully
authored. True total, recomputed fresh: **413** entries (237 physics +
37 mathematics + 136 chemistry + 3 english), out of 1,775 total KG
concepts — 1,362 remaining, 23.27%. Per the standing instruction, Wave
24 candidates were not computed this batch — the next physics iteration
should begin immediately with a fresh fetch/audit per this program's
standing discipline, continuing without pausing until physics reaches
238/238. Only 1 physics concept remains: `phys.mod.diode-rectification`
at level 24 — the terminal node of the entire physics KG. Physics
Educational Brain coverage will reach 238/238 (100%) the moment this
final concept is authored.

### Physics EB Wave 24 (2026-07-23) — FINAL WAVE, PHYSICS 238/238 COMPLETE

The single, final remaining physics concept authored: `phys.mod.diode-
rectification` (dependency level 24, the terminal node of the entire
physics knowledge graph), verified via a fresh Kahn's-algorithm
recomputation against the live physics KG showing it as the sole
remaining unauthored concept, per the same explicit standing instruction
"Keep continue until 238/238 done." Unlocked from Wave 23's `phys.mod.
pn-junction`, completing the six-concept semiconductor-physics extension
of the Modern Physics domain in full (energy bands → classification →
intrinsic → extrinsic/doping → p-n junction → diode rectification). Had
an existing Blueprint, reused by reference. Verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicate filename/concept ID, zero orphan
against the live physics KG (all 238 physics EB files map to a valid KG
id — confirmed via direct file count, `ls educational-brain/concepts/
physics/*.md | wc -l` = 238 — repo-wide scan across all 6 subjects also
clean). Physics KG re-validated: PASS, 238/238 reachable, 0
failures/warnings — no KG file was touched; all 6 subject KGs
re-validated PASS. **`physics` is now 238/238 — 100% complete.** Every
physics KG concept, across all 12 domains (Mechanics, Waves, Optics,
Electromagnetism, Modern Physics, Relativity, Quantum Mechanics,
Statistical Mechanics, Astrophysics, Particle Physics, Measurement, and
the Modern Physics semiconductor extension), now has a full Educational
Brain entry conforming to `EDUCATIONAL_BRAIN_STANDARD.md`. True total,
recomputed fresh: **414** entries (238 physics + 37 mathematics + 136
chemistry + 3 english), out of 1,775 total KG concepts — 1,361
remaining, 23.32%. This is the terminal milestone of the physics-focused
phase of the Curriculum Completion Program's standing instruction —
future sessions resume the program's default cross-subject priority
order (see `ROADMAP.md` §5) unless given an equally explicit,
subject-specific override, exactly as this wave-24 physics campaign
itself began.
### Batch 29 — Chemistry level 14 (2026-07-23)
Authored 15 level-14 concepts in topological order: `chem.coord.applications`, `chem.coord.bonding`, `chem.coord.isomerism`, `chem.dblock.organometallics`, `chem.elect.batteries`, `chem.elect.corrosion`, `chem.elect.electrolysis`, `chem.elect.standard-electrode`, `chem.hal.introduction`, `chem.hyd.arenes`, `chem.hyd.conformations`, `chem.hyd.petroleum`, `chem.org.reactive-intermediates`, `chem.sblock.water`, `chem.state.liquids`. Chemistry: 121 → 136/186.

### Batch 30 — Chemistry level 15 (2026-07-24)
Authored 12 level-15 Chemistry Educational Brain entries in strict topological order:
- `chem.elect.industrial` — Hall-Héroult, Down's cell, chloralkali, electroplating, electrorefining
- `chem.elect.nernst` — Nernst equation, concentration cells, pH/ISE applications
- `chem.hal.cfcs` — DCM, CHCl₃, CCl₄, iodoform test, CFC ozone depletion, Montreal Protocol, HCFCs/HFCs/HFOs
- `chem.hal.haloarenes` — C–X partial double-bond character, resistance to SN, SNAr/Meisenheimer, Dow process, o/p-directing deactivators
- `chem.hal.sn1` — two-step ionisation/attack, racemisation, factors, 1,2-shifts
- `chem.hal.sn2` — concerted backside attack, Walden inversion, substrate/solvent/nucleophile effects, applications
- `chem.hyd.polycyclic` — naphthalene/anthracene/phenanthrene EAS selectivity; pyridine/pyrrole/furan/thiophene aromaticity and reactivity; purines/pyrimidines
- `chem.nitro.nitro-compounds` — nitro group structure, meta-direction, reduction ladder (Sn/HCl vs. Zn/NH₄Cl), nitronium electrophile, TNT
- `chem.org.mechanisms` — NERP classification, curved-arrow conventions, bond cleavage types, mechanism identification from conditions
- `chem.sol.vapour-pressure` — Raoult's law, vapour pressure lowering, ideal/non-ideal deviations, colligative property tree
- `chem.state.phase-diagram` — P–T diagram features, triple point, critical point, water's negative fusion slope, CO₂ diagram, Clausius-Clapeyron
- `chem.surface.surfactants` — amphiphilic structure, CMC, micelle formation (hydrophobic effect = entropic), surfactant types, detergency mechanism, HLB

Chemistry total: 136 → 148 / 186 (79.57%). Level 15 complete.

### Batch 31 — Chemistry level 16 (2026-07-24)
Authored 9 level-16 Chemistry Educational Brain entries in strict topological order:
- `chem.alc.alcohols` — classification; H-bonding bp; acidity/NaOH vs. phenol; substitution (Lucas test); dehydration (Zaitsev, 140°C ether vs 170°C alkene); oxidation (PCC→aldehyde, Jones→acid, 3°→none); esterification
- `chem.elect.concentration-cell` — E° = 0 but E ≠ 0; Nernst; high concentration = cathode; entropic driving force; Nernst potential for neurons; pH electrode
- `chem.hal.elimination` — E2 (concerted, anti-periplanar, bimolecular, Zaitsev); E1 (via carbocation, same RDS as SN1); Hofmann rule (bulky base → less substituted alkene); substitution vs. elimination decision guide
- `chem.hal.grignard` — RMgX preparation; polarity inversion (C+ → C−); addition to HCHO/RCHO/ketone/ester/CO₂; anhydrous requirement (pKₐ ~50); organolithium comparison
- `chem.hyd.alkenes` — sp² geometry; Markovnikov's rule (mechanistic); anti-Markovnikov hydroboration (BH₃/THF, H₂O₂); bromonium ion (anti addition of Br₂); acid hydration/oxymercuration; catalytic hydrogenation (syn); ozonolysis
- `chem.org.arrow-pushing` — arrow = electron pair (tail = source, head = destination); 5 arrow types; chain rule; formal charge verification; common error diagnosis
- `chem.org.pericyclic` — cycloaddition/electrocyclic/sigmatropic; W–H rules ([4n+2] thermal allowed, [4n] forbidden); Diels-Alder (s-cis, electron-rich diene + EWG dienophile, stereospecific); endo/exo (kinetic vs. thermodynamic)
- `chem.sol.activity` — activity coefficient γ; a = γc; positive/negative deviations; ionic strength I = ½Σcᵢzᵢ²; Debye–Hückel limiting law; impact on K and Nernst equation
- `chem.sol.colligative` — VP lowering/bp elevation/fp depression/osmotic pressure; ΔTb = Kbmi, ΔTf = Kfmi, π = iMRT; van 't Hoff factor i; one-cause-four-effects model; molar mass determination

Chemistry total: 148 → 157 / 186 (84.41%). Level 16 complete.

### Batch 32 — Chemistry level 17 (2026-07-24)
- `chem.alc.diols` — Diols and Polyols
- `chem.alc.ethers` — Ethers
- `chem.alc.phenols` — Phenols
- `chem.carb.aldehydes` — Aldehydes
- `chem.hyd.alkynes` — Alkynes
- `chem.nitro.amines` — Amines
- `chem.poly.addition` — Addition Polymerization
- `chem.sol.osmosis` — Osmosis and Osmotic Pressure
Chemistry: 157 → 165/186 (88.71%). New domains: chem.carb, chem.poly.

### Mathematics — Curriculum Completion Program resumed, Forensic Audit + math.found Wave 7 (2026-07-26)

**Forensic audit** (per this batch's own standing "audit first" instruction):
resynced local `main` to `origin/main` (local branch pointer was stale,
diverged 53/50 commits — reset per this program's own standing
resync-if-clean instruction). Programmatic count confirmed the KG
(908 concepts, 24 domains, unchanged), Blueprints (529/908), the
Curriculum Production Pipeline's own Teaching Assets
(`docs/mathematics/teaching-assets/assets.json`, 908/908 status=draft —
complete since the 2026-07-05 dashboard's 877/908 snapshot, pipeline-owned,
not touched by this program), AssetIdentity seed status
(`src/lib/teaching/assets/brainSeedAssets.ts`: only `math.arith.fractions`
seeded, 1/908 — Wave-0-era, unchanged), and runtime registration
(mathematics fully registered in `knowledgeGraph.ts`'s `SUBJECT_ADAPTERS`/
`ID_PREFIX_TO_SUBJECT`, confirmed live). Discovered a `math.found` Wave 6
(5 entries — logical-equivalence, ordinal-number, quantifiers, relation,
subset) already committed to `main` (commit `8bd06f6d`) that this
program's own memory record had not yet caught up to — bringing the true
pre-batch count to 36 `math.found` entries (31 Waves 1-5 + 5 Wave 6), not
31.

**Validation finding (Quality Gate 3 violation, confirmed against
`QUALITY_GATES.md`'s own written criterion)**: all 5 Wave 6 entries use a
numbered "1. Concept Identity" ... "21. Certification Status" heading
scheme that `QUALITY_GATES.md` Gate 3 explicitly retires ("no
numbered-heading variant (retired per the Standard's §1.2 finding)"). The
other 31 pre-existing `math.found` entries, and this batch's own 9 new
entries, all use the correct unnumbered `## Identity` ... `## Version
History` scheme matching `EDUCATIONAL_BRAIN_STANDARD.md` §3 exactly
(verified: identical heading list across all 9 new files via diff). This
is a genuine, documented defect, not merely a style preference — but
fixing it means restructuring content across section boundaries that
don't map 1:1 (the numbered scheme lacks standalone "Learning Objective,"
"Core Understanding," "Why Students Fail," and "Cross-Subject
Connections" sections, and carries three sections — "Authoring Notes,"
"Open Questions," "Certification Status" — the Standard doesn't specify),
so it is a genuine reformatting/re-authoring task, not a find-and-replace.
Following this program's own established precedent (Batch 2, 2026-07-22:
"reconciliation is tracked as separate future work... not retroactively
applied this batch"), this was NOT fixed in this batch — flagged here and
in the mathematics summary row above as the top-priority item for the
next mathematics session.

**Wave 7** — authored the 9 concepts whose prerequisites became fully
satisfied after Wave 6, verified programmatically against the live KG
(`requires` every element already in the authored set): `math.found.proper-subset`,
`math.found.set-equality`, `math.found.set-operations`,
`math.found.power-set`, `math.found.partition`,
`math.found.reflexive-relation`, `math.found.symmetric-relation`,
`math.found.transitive-relation`, `math.found.rules-of-inference`. 7 of
the 9 had existing Blueprints reused by reference (Misconception
Registries cited by ID with birth-type classification added, worked
examples/transfer probes/mastery gates never restated); 2
(`proper-subset`, `set-equality`) had none, stated explicitly, with all
misconceptions authored directly via the birth-taxonomy diagnostic
procedure. One authoring-time self-correction recorded honestly: this
batch's own first draft of `math.found.partition`'s Curriculum Feedback
section briefly conflated the separate Blueprint-corpus and
Educational-Brain-corpus production-order numbering (both called "this
corpus" in the source Blueprint's own Component 7 note) — caught and
corrected before commit; the corrected text distinguishes the two
pipelines explicitly. All 9 entries verified against the Standard's
exact 21-section heading order (identical across all 9, confirmed by
diff). `math.found` 36/82 → **45/82** — still IN PROGRESS; Wave 8
candidates computed programmatically against the live KG (10):
`proof`, `union`, `intersection`, `set-difference`, `complement`,
`venn-diagram`, `equivalence-relation`, `partial-order`,
`function-set-theoretic`, `cardinal-arithmetic`. No other domain
touched. All five tracking files (`EDUCATIONAL_BRAIN_INDEX.md`,
`AUTHORING_QUEUE.md`, `ROADMAP.md`, `QUALITY.md`, `COVERAGE.md`)
regenerated/updated for the 9 new entries in this same commit; re-validated
0 duplicates, 0 orphans (every `math.found.*.md` filename resolves to a
real KG id) across all 46 mathematics entries.

### Mathematics — Quality Gate 3 repair + math.found Wave 8 (2026-07-26, same session)

Per this batch's explicit standing instruction ("repair existing
Mathematics Educational Brain entries FIRST if they violate the current
standard"), ran a full Quality Gate 3 audit across all 46 pre-batch
mathematics entries (comparing each file's `## ` heading list against
`EDUCATIONAL_BRAIN_STANDARD.md`'s canonical 21-section list via diff).
Found 6 violations, not 5: the previously-flagged `math.found` Wave 6
batch (`logical-equivalence`, `ordinal-number`, `quantifiers`,
`relation`, `subset`) plus a newly-discovered one — `math.arith.fractions`
itself, the original Delivery-5 seed entry (2026-07-10), predates
`EDUCATIONAL_BRAIN_STANDARD.md`'s existence and used its own earlier
unnumbered-but-differently-named heading scheme (`Identity`, `Mental
models`, `Why beginners fail here`, `Explanation library`, etc. — not
the current Standard's exact section names).

**All 6 repaired**, restructured to the exact 21-section Standard
scheme, with all content preserved losslessly (verified: no bullet,
example, misconception, or teaching note dropped in any of the 6
diffs). For `math.arith.fractions` specifically — the only one of the
6 with live runtime consumers — re-verified that
`src/lib/teaching/assets/brainSeedAssets.ts`'s five `source:` citation
comments (which name specific sub-labels: "Explanation library, Age
8–11 (mechanism)", "Explanation library, Returning teen/adult",
"Misconception library M1"/"M2") still resolve to the identical text,
now nested under renamed parent sections; `brainSeedAssets.ts` itself
was NOT modified (out of this program's scope). Also corrected this
entry's own stale `estimated_hours: ~4` to the canonical KG value of 20.
Added standalone Learning Objective, Teaching Sequence, Blueprint
References, and Runtime Asset References sections to all 6 repaired
files (none existed pre-repair); each file's Version History gained a
v1.1 entry documenting the repair. **0 Quality Gate 3 violations remain
in mathematics** as of this batch.

**Wave 8** — authored the 10 concepts whose prerequisites became fully
satisfied after Wave 7, verified programmatically against the live KG:
`math.found.proof`, `union`, `intersection`, `set-difference`,
`complement`, `venn-diagram`, `equivalence-relation`, `partial-order`,
`function-set-theoretic`, `cardinal-arithmetic`. 5 of the 10 (`proof`,
`equivalence-relation`, `partial-order`, `function-set-theoretic`,
`cardinal-arithmetic`) had existing Blueprints reused by reference; 5
(the direct children of `math.found.set-operations` — `union`,
`intersection`, `set-difference`, `complement`, `venn-diagram`) had
none, each authored directly via the birth-taxonomy diagnostic
procedure while explicitly reusing `math.found.set-operations`'s own
already-authored survey content by reference rather than duplicating it
(e.g. `set-difference`'s and `complement`'s MC-1 entries cite that
concept's own MC-3/MC-1 by ID instead of re-deriving the identical
asymmetry/universal-set lessons). All 10 verified against the Standard's
exact 21-section heading order.

`math.found` 45/82 → **55/82** — still IN PROGRESS; Wave 9 candidates
computed programmatically against the live KG (12): `direct-proof`,
`proof-by-contradiction`, `proof-by-contrapositive`, `proof-by-cases`,
`existence-proof`, `writing-mathematics`, `theorem`, `conjecture`,
`equivalence-class`, `total-order`, `hasse-diagram`, `cardinality`. No
other domain touched. All five tracking files (`EDUCATIONAL_BRAIN_INDEX.md`,
`AUTHORING_QUEUE.md`, `ROADMAP.md`, `QUALITY.md`, `COVERAGE.md`)
updated in this same commit; re-validated 0 duplicates, 0 orphans, and
(newly, this batch) 0 Quality Gate 3 heading violations across all 56
mathematics entries.

### Mathematics — math.found Wave 9 (2026-07-26, autonomous loop iteration)

Triggered by the user invoking a dynamic `/loop` continuation of the
Mathematics Educational Brain Autonomous Completion Program. Re-synced
`main` (no new commits since the prior batch's push) and re-ran the full
Quality Gate 3 audit across all 56 pre-batch mathematics entries — 0
violations found, confirming the prior batch's repair held.

**Wave 9** — authored the 8 concepts whose prerequisites became fully
satisfied after Wave 8, all forming one coherent sub-domain (the proof-
family children of `math.found.proof`, plus its two freestanding
siblings `theorem` and `conjecture`), verified programmatically against
the live KG: `direct-proof`, `proof-by-contradiction`,
`proof-by-contrapositive`, `proof-by-cases`, `existence-proof`,
`writing-mathematics`, `theorem`, `conjecture`. None of the 8 had an
existing Blueprint — all authored via the birth-taxonomy diagnostic
procedure, each explicitly reusing `math.found.proof`'s own already-
authored worked examples (the n-even/n²-even direct proof, the
√2-irrationality contradiction proof, the n²−n+41 proof-by-example
counterexample) by reference rather than restating them — e.g.
`direct-proof`'s own Demonstrations section narrates `math.found.proof`'s
existing example with structural labels added, not a new example;
`conjecture`'s MC-1 explicitly extends `math.found.proof`'s own MC-1
(proof-by-example) to the terminology of what counts as a theorem.
`proof-by-contrapositive`'s MC-1 (confusing contrapositive with converse/
inverse) was identified as the single highest-stakes misconception in
this wave — arguably the most common named error in introductory proof-
writing generally — and given Foundational weight accordingly.

`math.found` 55/82 → **63/82** — still IN PROGRESS; Wave 10 candidates
computed programmatically against the live KG (7): `uniqueness-proof`,
`lemma`, `corollary`, `equivalence-class`, `total-order`,
`hasse-diagram`, `cardinality`. No other domain touched. All five
tracking files updated in this same commit; re-validated 0 duplicates,
0 orphans, 0 Quality Gate 3 violations across all 64 mathematics
entries.

### Mathematics — math.found Wave 10 (2026-07-26, autonomous loop iteration 2)

Re-synced `main` (one new unrelated commit, `6aed2aa2`, a Groq error-
classification fix — fast-forwarded, zero overlap) and re-ran the full
Quality Gate 3 audit across all 64 pre-batch mathematics entries — 0
violations found.

**Wave 10** — authored the 7 concepts whose prerequisites became fully
satisfied after Wave 9, verified programmatically against the live KG:
`uniqueness-proof`, `lemma`, `corollary`, `equivalence-class`,
`total-order`, `hasse-diagram`, `cardinality`. 3 of the 7
(`equivalence-class`, `total-order`, `cardinality`) had existing
Blueprints reused by reference; 4 (`uniqueness-proof`, `lemma`,
`corollary`, `hasse-diagram`) had none, authored via the birth-taxonomy
diagnostic procedure. `lemma` and `corollary` are sibling entries — both
cite `math.found.theorem`'s own MC-1 (role-vs-rigor conflation) by
reference rather than re-deriving it, since both are direct, specific
instances of that same misconception applied to their own labels; each
then contributes one genuinely new misconception of its own (lemma's
extraction-purpose question; corollary's restatement-vs-genuine-content
distinction). `uniqueness-proof` directly extends `math.found.
existence-proof`'s own existence/uniqueness scope distinction from the
uniqueness side.

`math.found` 63/82 → **70/82** — only 12 concepts now remain:
`proof-by-induction`, `strong-induction`, `well-ordering-principle`,
`finite-set`, `countable-set`, `uncountable-set`, `natural-numbers`,
`integers`, `rational-numbers`, `irrational-numbers`, `real-numbers`,
`complex-numbers`. Wave 11 candidates computed programmatically (2):
`finite-set`, `natural-numbers` — the remaining concepts form a tight
dependency chain (natural-numbers → integers → rational-numbers →
irrational-numbers → real-numbers → complex-numbers, and separately
proof-by-induction/strong-induction/well-ordering-principle depending
on natural-numbers) that will resolve in a small number of further
waves as math.found approaches Domain Certification. No other domain
touched. All five tracking files updated in this same commit;
re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3 violations
across all 71 mathematics entries.

### Mathematics — math.found Wave 11 (2026-07-26, autonomous loop iteration 3)

Autonomous `/loop` iteration 3, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `8e102e44` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 71 pre-batch mathematics entries. **0 violations found** — the
prior iteration's repair work (Wave 6 batch + `math.arith.fractions`)
remains intact; no new violations introduced by Wave 10.

**Wave 11**: authored the 2 concepts whose prerequisites became fully
satisfied after Wave 10, verified programmatically against the live KG:
`finite-set`, `natural-numbers`.

- `math.found.finite-set` — no existing Blueprint (confirmed via
  `ls docs/curriculum/blueprints/math.found.finite-set.md`, not found).
  Two misconceptions authored directly via the birth-taxonomy
  diagnostic procedure: MC-1 (finite equated with "small" or "easily
  writable" rather than the bijection-to-{1,…,n} definition, classified
  Type 1 overgeneralization) and MC-2 (finite confused with "has a
  maximum element," classified Type 1 overgeneralization, repaired via
  the {red, green, blue} unordered finite-set counterexample). Reuses
  `math.found.cardinality`'s own bijection-existence machinery
  throughout rather than re-deriving it.
- `math.found.natural-numbers` — grounded in an existing
  PACKAGE_READY Blueprint (`docs/curriculum/blueprints/math.found.
  natural-numbers.md`, V-1 through V-20 PASS, AIR PASS). Reused the
  Blueprint's own 3-item Misconception Registry by reference (MC-1
  ZERO-MEMBERSHIP — reclassified here as Type 3 language contamination,
  since the learner imports one authoritative-sounding curriculum's
  convention as though it were the symbol's only meaning, rather than
  overgeneralizing from limited examples; FOUNDATIONAL per the
  Blueprint's own MAMR, must clear before MC-2/MC-3; MC-2
  PEANO-INFORMAL; MC-3 WELL-ORDER-FINITE) and the full TA-A07
  mastery-gate item bank (Q1-Q6 + the P76 cross-link transfer probe)
  cited directly by reference rather than restated. This concept's KG
  `unlocks` (`math.arith.counting`, `math.found.proof-by-induction`,
  `math.nt.divisibility`) match the Blueprint's own Component 7 Output
  Unlocks table exactly, cross-checked as part of authoring.

`math.found` 70/82 → **72/82** — only 10 concepts now remain:
`proof-by-induction`, `strong-induction`, `well-ordering-principle`,
`countable-set`, `uncountable-set`, `integers`, `rational-numbers`,
`irrational-numbers`, `real-numbers`, `complex-numbers`. Wave 12
candidates computed programmatically (4): `proof-by-induction`
(now unblocked — both its prerequisites, `proof` and `natural-numbers`,
are authored), `well-ordering-principle`, `countable-set`, `integers` —
all four became ready specifically because `natural-numbers` cleared
this wave; `strong-induction`, `uncountable-set`, and the
`rational-numbers`→`irrational-numbers`→`real-numbers`→
`complex-numbers` chain remain blocked pending their own direct
prerequisites. No other domain touched. All five tracking files updated
in this same commit; re-validated 0 duplicates, 0 orphans, 0 Quality
Gate 3 violations across all 73 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 12 (2026-07-26, autonomous loop iteration 4)

Autonomous `/loop` iteration 4, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `00970aa4` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 73 pre-batch mathematics entries. **0 violations found**.

**Wave 12**: authored the 4 concepts whose prerequisites became fully
satisfied after Wave 11, verified programmatically against the live KG:
`proof-by-induction`, `well-ordering-principle`, `countable-set`,
`integers`.

- `math.found.proof-by-induction` — grounded in an existing
  PACKAGE_READY Blueprint (V-1 through V-20 PASS). Reused the
  Blueprint's own 3-item Misconception Registry by reference (MC-1
  INDUCTIVE-HYPOTHESIS-TREATED-AS-CIRCULAR; MC-2
  BASE-CASE-OMITTED-AS-UNNECESSARY; MC-3
  HYPOTHESIS-NOT-EXPLICITLY-INVOKED — all classified Type 1
  overgeneralization) and the full P77 4-problem set + P76 transfer
  probe cited directly by reference.
- `math.found.well-ordering-principle` — grounded in an existing
  PACKAGE_READY Blueprint. Reused its 3-item Misconception Registry
  (MC-1 EMPTY-SET-EXCEPTION-OVERLOOKED, Type 1; MC-2
  MINIMAL-COUNTEREXAMPLE-STRUCTURE-NOT-RECOGNIZED, Type 1; MC-3
  WELL-ORDERING-ASSUMED-TO-APPLY-BEYOND-NATURAL-NUMBERS, Type 6 analogy
  overextension) and item bank by reference. States and applies the
  Blueprint's own equivalence-to-induction sketch, directly connecting
  to `math.found.proof-by-induction`.
- `math.found.countable-set` — no existing Blueprint (confirmed via
  `ls docs/curriculum/blueprints/math.found.countable-set.md`, not
  found). Three misconceptions authored directly via the
  birth-taxonomy diagnostic procedure: MC-1 (countable equated with
  small, Type 1 overgeneralization), MC-2 (density assumed to increase
  cardinality — the ℚ-vs-ℤ counterintuitive case, Type 6 analogy
  overextension, repaired via Cantor's diagonal enumeration of ℚ⁺),
  MC-3 (countable conflated with countably infinite, Type 3 language
  contamination). Reuses `math.found.finite-set` and `math.found.
  cardinality`'s own definitions throughout rather than re-deriving
  them.
- `math.found.integers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry (MC-1
  NEGATIVE-AS-SUBTRACTION — reclassified here as Type 4 notation-
  induced, since the "−" symbol is genuinely overloaded between binary
  subtraction and unary sign-marking, rather than an overgeneralization
  from limited examples; FOUNDATIONAL per the Blueprint's own MAMR; MC-2
  RING-CONFUSION, Type 1; MC-3 ZERO-ASYMMETRY, Type 1) and the full
  TA-A06 mastery-gate item bank by reference. This concept's KG
  `unlocks` (`math.arith.negative-numbers`, `math.nt.divisibility`)
  match the Blueprint's own Component 7 Output Unlocks table exactly.

`math.found` 72/82 → **76/82** — only 6 concepts now remain:
`strong-induction`, `uncountable-set`, `rational-numbers`,
`irrational-numbers`, `real-numbers`, `complex-numbers`. Wave 13
candidates computed programmatically (3): `strong-induction` (now
unblocked — its prerequisite `proof-by-induction` cleared this wave),
`uncountable-set` (unblocked — its prerequisite `countable-set` cleared
this wave), `rational-numbers` (unblocked — its prerequisite `integers`
cleared this wave); `irrational-numbers` → `real-numbers` →
`complex-numbers` remain blocked pending `rational-numbers` and each
other in sequence. No other domain touched. All five tracking files
updated in this same commit; re-validated 0 duplicates, 0 orphans, 0
Quality Gate 3 violations across all 77 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 13 (2026-07-26, autonomous loop iteration 5)

Autonomous `/loop` iteration 5, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `6ed1bb51` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 77 pre-batch mathematics entries. **0 violations found**.

**Wave 13**: authored the 3 concepts whose prerequisites became fully
satisfied after Wave 12, verified programmatically against the live KG:
`strong-induction`, `uncountable-set`, `rational-numbers`.

- `math.found.strong-induction` — no existing Blueprint (confirmed via
  `ls`, not found). Three misconceptions authored directly via the
  birth-taxonomy diagnostic procedure: MC-1 (strong induction assumed
  more powerful than standard induction, Type 3 language contamination
  — the word "strong" imports its everyday-English connotation of
  superiority rather than its technical meaning of a richer hypothesis;
  repaired via the auxiliary-statement Q(n) equivalence construction),
  MC-2 (overused by default, Type 1 overgeneralization), MC-3 (multiple
  base cases omitted, Type 1 overgeneralization). Directly extends
  `math.found.proof-by-induction`'s own base-case/inductive-step
  vocabulary rather than re-deriving it.
- `math.found.uncountable-set` — no existing Blueprint. Three
  misconceptions authored via the birth-taxonomy diagnostic procedure:
  MC-1 (uncountable equated with vague large size, Type 1, FOUNDATIONAL
  parallel to `math.found.countable-set`'s own MC-1), MC-2 (diagonal
  construction guarantee not understood, Type 1), MC-3 (diagonal
  argument overextended to ℚ, Type 6 analogy overextension — conflating
  the diagonal ARGUMENT that disproves a listing exists for ℝ with the
  diagonal ENUMERATION that constructs one for ℚ, directly reusing
  `math.found.countable-set`'s own Cantor grid-enumeration content by
  reference for the contrast). Cantor's diagonal argument for (0,1)
  authored directly as the concept's central demonstration, confirming
  the strict cardinality inequality |ℝ|>|ℕ| previewed but not proven in
  `math.found.cardinality`'s own Core Understanding.
- `math.found.rational-numbers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry by reference
  (MC-1 FRACTION-UNIQUE — reclassified here as Type 3 language
  contamination, since elementary education presents each fraction
  symbol as a self-contained complete object rather than the learner
  overgeneralizing from limited examples; FOUNDATIONAL per the
  Blueprint's own MAMR; MC-2 DENSITY-COMPLETENESS, also reclassified
  Type 3 — the everyday sense of "dense" as "no gaps" is imported
  wholesale; MC-3 RATIONAL-TERMINATING, Type 1) and the full TA-A07
  mastery-gate item bank (Q1-Q6 + P76 cross-link transfer probe, citing
  `math.arith.fractions` directly) by reference. Cross-checked against
  the already-authored `math.arith.fractions` entry to avoid
  duplicating its own Core Understanding/Mental Models content — cited
  by reference instead. One genuine Curriculum Feedback finding
  recorded honestly (not fixed, no KG file modified): `math.arith.
  fractions` (Delivery 5, 2026-07-10, predating this program's strict
  topological-order discipline) lists `math.found.rational-numbers`
  among its own KG `requires`, meaning it was technically authored
  before its own prerequisite — inherited pre-existing content, not an
  ordering violation by this program's own Wave-by-wave process.

`math.found` 76/82 → **79/82** — only 3 concepts now remain, forming a
strict chain: `irrational-numbers` → `real-numbers` → `complex-numbers`
(each directly requiring the previous, per the KG). Wave 14 candidates
computed programmatically (1): `irrational-numbers` (now unblocked —
its prerequisite `rational-numbers` cleared this wave); `real-numbers`
and `complex-numbers` will each unblock one at a time as the chain
resolves in subsequent waves. No other domain touched. All five
tracking files updated in this same commit; re-validated 0 duplicates,
0 orphans, 0 Quality Gate 3 violations across all 80 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 14 (2026-07-26, autonomous loop iteration 6)

Autonomous `/loop` iteration 6, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `fc612e68` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 80 pre-batch mathematics entries. **0 violations found**.

**Wave 14**: authored the single concept whose prerequisite became
fully satisfied after Wave 13, verified programmatically against the
live KG: `irrational-numbers`.

- `math.found.irrational-numbers` — grounded in an existing
  PACKAGE_READY Blueprint. Reused its 3-item Misconception Registry by
  reference (MC-1 IRRATIONAL-IMPRECISE — reclassified here as Type 4
  notation-induced, since the "=" sign is routinely used informally in
  place of "≈" for decimal approximations in casual practice, directly
  training the conflation at the notation level rather than the
  learner overgeneralizing from limited examples; FOUNDATIONAL per the
  Blueprint's own MAMR; MC-2 INFINITE-DECIMAL-IRRATIONAL, Type 1; MC-3
  IRRATIONAL-RARE, Type 1) and the full TA-A05 mastery-gate item bank
  (Q1-Q4 + P76 independence transfer probe) by reference. The √2
  proof-by-contradiction authored directly as the concept's central
  demonstration. Directly extends `math.found.rational-numbers`'s own
  decimal-characterization diagnostic (terminating/repeating) into the
  complementary non-terminating-non-repeating case, and reuses
  `math.found.countable-set`/`math.found.uncountable-set`'s own
  countability machinery for the abundance argument (ℚ countable, ℝ
  uncountable, therefore ℝ∖ℚ uncountable) rather than re-deriving it.

`math.found` 79/82 → **80/82** — only 2 concepts now remain, forming a
strict chain: `real-numbers` → `complex-numbers`. Wave 15 candidates
computed programmatically (1): `real-numbers` (now unblocked — both its
prerequisites, `irrational-numbers` and `rational-numbers`, are
authored); `complex-numbers` will unblock once `real-numbers` clears in
the next wave — the final wave before `math.found` Domain Certification
becomes eligible at 82/82. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 81 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 15 (2026-07-26, autonomous loop iteration 7)

Autonomous `/loop` iteration 7, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `2751c48f` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 81 pre-batch mathematics entries. **0 violations found**.

**Wave 15**: authored the single concept whose prerequisites became
fully satisfied after Wave 14, verified programmatically against the
live KG: `real-numbers`.

- `math.found.real-numbers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry by reference
  (MC-1 REAL-IS-DECIMAL — reclassified here as Type 3 language
  contamination, since the phrase "real number" sounds like a distinct
  category rather than the learner overgeneralizing from limited
  examples; FOUNDATIONAL per the Blueprint's own MAMR; MC-2
  RATIONAL-IS-COMPLETE, directly inherited from `math.found.
  rational-numbers`'s own MC-2, Type 3; MC-3 IRRATIONALS-ARE-RARE,
  directly inherited from `math.found.irrational-numbers`'s own MC-3,
  Type 1) and the full P77/P76 mastery-gate item bank by reference.
  Synthesizes both prerequisites directly via ℝ=ℚ∪(ℝ∖ℚ); the
  completeness/LUB property authored directly as the concept's central
  demonstration (the {q∈ℚ:q²<2} gap example), extending `math.found.
  rational-numbers`'s own density-without-completeness distinction into
  a fully general structural property. One honest Cross-Subject
  Connections finding recorded (not fixed): both KG `cross_links`
  targets (`math.calc.limits`, `math.real.completeness`) remain
  unauthored — the Blueprint's own P76 transfer probe ((1+1/n)ⁿ→e)
  anticipates `math.calc.limits`'s content directly, to be genuinely
  activated once that concept is authored.

`math.found` 80/82 → **81/82** — only **1 concept now remains**:
`complex-numbers`. Wave 16 (the final wave for this domain) is already
computable: `complex-numbers` — once authored, `math.found` reaches
82/82 and becomes eligible for Domain Certification per `ROADMAP.md`
§3's own standing gate. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 82 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.found Wave 16 — FINAL WAVE, DOMAIN COMPLETE (2026-07-26, autonomous loop iteration 8)

Autonomous `/loop` iteration 8, per the 2026-07-26 loop-activation
standing instruction. Git resync: local `main` was in sync with
`origin/main` at commit `39ab16ef` (no divergence, no new commits to
reconcile) at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 82 pre-batch mathematics entries. **0 violations found**.

**Wave 16 (final wave)**: authored the single remaining `math.found`
concept, verified programmatically against the live KG:
`complex-numbers`.

- `math.found.complex-numbers` — grounded in an existing PACKAGE_READY
  Blueprint. Reused its 3-item Misconception Registry by reference
  (MC-1 SQRT-NEGATIVE-UNDEFINED — reclassified here as Type 4
  notation-induced, since the specific symbol "√(−1)" is what triggers
  the confusion via correct-but-misapplied prior instruction, rather
  than a broad overgeneralization; FOUNDATIONAL per the Blueprint's own
  MAMR; MC-2 I-IS-JUST-A-SYMBOL, Type 1; MC-3
  COMPLEX-NUMBERS-ARE-NOT-REAL, Type 3 language contamination — the
  everyday sense of "complex" as "complicated" is imported directly)
  and the full P77/P76 mastery-gate item bank (cross-linking `math.
  trig.polar-form-complex`) by reference. Directly extends `math.
  found.real-numbers`'s own definitional-extension framing (i declared
  by i²=−1, exactly as √2 and negative integers were declared at
  earlier stages) and geometric distance intuition (modulus as
  two-dimensional Pythagorean distance).

**`math.found` reaches 82/82 (100%) — DOMAIN CERTIFIED.** Verified
programmatically: 0 missing `math.found` concepts against the live KG.
All 82 entries re-verified this batch against Quality Gate 3's exact
21-section heading order — 0 violations across the full domain. 0
duplicates, 0 orphans across all 83 mathematics entries. Full
certification record, including 3 carried-forward-but-non-blocking
KGCS review items, in `VALIDATION_REPORT.md`'s own "Domain
Certification — math.found (UPDATE)" section.

**Next mathematics domain identified (not yet started this batch, per
this program's own "one small bounded batch per turn" discipline —
Wave 16 was itself this batch's one bounded unit of work)**:
`math.arith` (58 total concepts, 1 already authored —
`math.arith.fractions`, the original Delivery-5 seed entry). Its sole
zero-`math.arith`-prerequisite entry node is `math.arith.counting`,
requiring only `math.found.natural-numbers` (already authored) — now
unlocked and ready to be Wave 1 of the `math.arith` domain next
iteration. Full reasoning for selecting `math.arith` over the other 22
unauthored mathematics domains recorded in `ROADMAP.md` §5.

All five tracking files updated in this same commit, including
`ROADMAP.md` §3 (status flipped to COMPLETE — CERTIFIED) and §5 (new
default target: `math.arith` Wave 1) and `VALIDATION_REPORT.md` (new
Domain Certification record appended, superseding but not deleting the
prior 31/82 "does NOT pass" record as historical audit trail).

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 1 (2026-07-26, autonomous loop iteration 9)

Autonomous `/loop` iteration 9, per the 2026-07-26 loop-activation
standing instruction. First batch in the `math.arith` domain,
immediately following `math.found`'s Domain Certification. Git resync:
after pushing the `math.found` certification commit, several
concurrent commits landed (a temporary Chemistry AssetIdentity admin
seeding endpoint, later reverted; then 19 "Chemistry AssetIdentity seed
batch N" data-only commits from a parallel session bringing Chemistry's
DB-backed AssetIdentity rows from ~0 toward 380/744) — all verified via
`git diff --stat` to touch only `CLAUDE.md`, `docs/architecture/*`,
`src/app/api/admin/seed-chemistry-assets/route.ts`, and `vercel.json`,
zero overlap with `educational-brain/` or any KG file; merged cleanly
across two rounds (a 403 push rejection on the first attempt required a
second fetch+merge+push cycle, itself catching one more concurrent
commit).

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 83 pre-batch mathematics entries (the 82 `math.found` entries plus
`math.arith.fractions`). **0 violations found**.

**Domain selection**: computed programmatically which mathematics
domain to target next now that `math.found` is complete. `math.arith`
was selected — the only one of 23 remaining unauthored domains with an
existing authored entry (`math.arith.fractions`, the original
Delivery-5 seed) and the domain immediately adjacent to `math.found` in
the KG's own `requires` structure. Confirmed `math.arith`'s sole
zero-`math.arith`-prerequisite entry node: `math.arith.counting`,
requiring only `math.found.natural-numbers` (already authored).

**Wave 1**: authored `math.arith.counting` — grounded in an existing
PACKAGE_READY Blueprint. Reused its 3-item Misconception Registry by
reference (MC-1 COUNTING-WITHOUT-BIJECTION, FOUNDATIONAL, Type 1
overgeneralization; MC-2 ORDER-DEPENDENT-CARDINALITY, Type 1; MC-3
PROCEDURE-REPLACES-STRUCTURE, Type 1) and the full P77/P76 mastery-gate
item bank by reference. Directly reuses `math.found.natural-numbers`'s
own successor-based tag sequence as the bijection's domain.

**6 further Wave-1-eligible concepts identified and Blueprint-verified
this batch but deliberately deferred to Wave 2** (all require only
`math.arith.fractions`, already authored; all confirmed PACKAGE_READY
via direct read): `math.arith.fraction-equivalence`, `math.arith.
fraction-multiplication`, `math.arith.fraction-reciprocal`, `math.
arith.mixed-numbers`, `math.arith.improper-fractions`, `math.arith.
ratios`. Deferred specifically because their Blueprints use a
substantially longer, more elaborate format (Educational Brain v1.0
primitive-notation style, multi-protocol student-state-matrix
structure, 900-1200 lines each) than the `math.found` domain's
Blueprints (typically 300-650 lines) — authoring all 7 candidates in
one turn risked exceeding this program's own "one small bounded batch"
discipline and quality bar. No re-verification needed next iteration —
proceed directly to authoring all 6 in Wave 2.

`math.arith` now 2/58 (`fractions` + `counting`). No other domain
touched. All five tracking files updated in this same commit (including
`ROADMAP.md` §5's item 1a, updated with the Wave 2 candidate list and
Blueprint-verification status); re-validated 0 duplicates, 0 orphans, 0
Quality Gate 3 violations across all 84 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 2 part 1 (2026-07-26, autonomous loop iteration 10)

Autonomous loop iteration 10, triggered by a bare `/loop` re-invocation
in the same session (the autonomous-default dynamic-pacing template);
resolved to continuing the established, explicitly-active Mathematics
Educational Brain Autonomous Completion Program, since the immediately
prior turn had explicitly deferred 6 Blueprint-verified `math.arith`
Wave 2 candidates for this exact next iteration. Git resync: one
concurrent Chemistry AssetIdentity seed-batch commit (`CLAUDE.md` only,
zero overlap) fast-forward merged cleanly at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 84 pre-batch mathematics entries. **0 violations found**.

**Wave 2 part 1**: authored 3 of the 6 concepts deferred from Wave 1,
all grounded in existing PACKAGE_READY Blueprints (Educational Brain
v1.0 primitive-notation format, previously read in full):

- `math.arith.fraction-equivalence` — reused its 2-item Misconception
  Registry by reference (MC-1 ADDING-PRESERVES-EQUIVALENCE,
  FOUNDATIONAL, Type 1 overgeneralization from the equation-solving
  "same operation to both sides" heuristic; MC-2
  ONLY-SIMPLIFIED-IS-VALID, Type 1) and the 5-probe mastery gate by
  reference.
- `math.arith.fraction-multiplication` — reused its 3-item
  Misconception Registry (MC-1 addition-algorithm-for-multiplication,
  FOUNDATIONAL for MC-2, Type 1; MC-2 dividing-parts-separately, Type
  1; MC-3 whole-number-in-denominator, Type 1) and the area-model
  demonstration by reference. Directly cross-references `math.arith.
  fraction-reciprocal`'s own product-test definition for the division
  algorithm's justification.
- `math.arith.fraction-reciprocal` — reused its 3-item Misconception
  Registry (MC-1 reciprocal-equals-negative — reclassified here as
  Type 3 language contamination, since "opposite" colloquially names
  both the additive and multiplicative inverse; FOUNDATIONAL; MC-2
  whole-number-reciprocal-blind-spot, Type 1; MC-3
  mixed-number-flip-error, Type 1) by reference. Its `math.abst.field`
  cross-link is confirmed informational-only at this Bloom level per
  the Blueprint's own Component 6 note — the word "field" is never
  introduced.

`math.arith` now 5/58 (`fractions`, `counting`, `fraction-equivalence`,
`fraction-multiplication`, `fraction-reciprocal`). 3 further
Wave-2-eligible concepts remain deferred to Wave 2 part 2, already
Blueprint-verified PACKAGE_READY, no re-verification needed:
`math.arith.mixed-numbers`, `math.arith.improper-fractions`, `math.
arith.ratios`. No other domain touched. All five tracking files
updated in this same commit; re-validated 0 duplicates, 0 orphans, 0
Quality Gate 3 violations across all 87 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 2 part 2 (2026-07-26, autonomous loop iteration 11)

Autonomous loop iteration 11, continuing the same established Mathematics
Educational Brain Autonomous Completion Program (dynamic-pacing
`<<autonomous-loop-dynamic>>` sentinel fire). Git resync: one concurrent
Chemistry AssetIdentity seed-batch commit (`CLAUDE.md` only, zero
overlap with `educational-brain/`) fast-forward merged cleanly at this
iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 87 pre-batch mathematics entries. **0 violations found**.

**Wave 2 part 2**: authored the remaining 3 of the 6 concepts deferred
from Wave 1, all grounded in existing Blueprints (Educational Brain
v1.0 primitive-notation format, ~900-1300 lines each):

- `math.arith.mixed-numbers` — reused its 3-item Misconception Registry
  by reference: MC-1 "addition without LCD" (FOUNDATIONAL, Type 1
  overgeneralization from whole-number addition), MC-2 "subtraction
  regrouping omitted" (Type 1), MC-3 "mixed multiplication adds whole
  parts separately" (Type 1, independent of MC-2). Documented in
  Curriculum Feedback (not fixed, no KG/Blueprint file touched) that
  `math.arith.improper-fractions` is a *related* concept, not a formal
  prerequisite in either direction, per both Blueprints' own component
  notes.
- `math.arith.improper-fractions` — reused its 3-item Misconception
  Registry by reference: MC-1 "improper fractions are wrong/invalid"
  (FOUNDATIONAL, reclassified here as Type 3 language contamination —
  the everyday sense of "improper" as "incorrect" contaminates the
  mathematical term), MC-2 "mixed-to-improper conversion without
  understanding" (Type 1), MC-3 "improper-to-mixed denominator loss"
  (Type 1).
- `math.arith.ratios` — reused its 3-item Misconception Registry by
  reference: MC-1 "ratio is commutative" (FOUNDATIONAL, reclassified
  here as Type 6 analogy overextension — overextends the ordinary
  commutativity of addition/multiplication onto ratio notation, where
  order is meaningful), MC-2 "part-to-part vs. part-to-whole confusion"
  (Type 1), MC-3 "ratio simplification changes the underlying
  quantities" (Type 1). Its `math.func.linear-function` cross-link
  (KG `cross_links` field) was verified NOT yet authored in either
  Educational Brain or Blueprint form — documented honestly in
  Cross-Subject Connections rather than invented.

`math.arith` now 8/58 (`fractions`, `counting`, `fraction-equivalence`,
`fraction-multiplication`, `fraction-reciprocal`, `mixed-numbers`,
`improper-fractions`, `ratios`) — Wave 2 fully complete (all 6 deferred
concepts now authored). Wave 3 candidates computed programmatically
from the live KG (all `requires` now satisfied): `math.arith.
counting-sequence`, `math.arith.subitizing`, `math.arith.place-value`,
`math.arith.number-line` (all four unlocked by `math.arith.counting`),
plus `math.arith.proportion`, `math.arith.unit-rate` (both unlocked by
`math.arith.ratios`) — 6 concepts, not yet Blueprint-checked. No other
domain touched. All five tracking files updated in this same commit;
re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3 violations
across all 90 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
run, `npm run build` succeeded (exact figures recorded in the commit
this section accompanies).

### Mathematics — math.arith Wave 3 (2026-07-26, autonomous loop iteration 12)

Autonomous loop iteration 12, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync: one concurrent Chemistry AssetIdentity seed-batch commit
(`CLAUDE.md` only, zero overlap with `educational-brain/`) fast-forward
merged cleanly at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 90 pre-batch mathematics entries. **0 violations found**.

**Wave 3**: authored the 6 concepts whose prerequisites became fully
satisfied after Wave 2 — verified programmatically against the live
KG, matching the expected candidate list exactly: `math.arith.
counting-sequence`, `math.arith.subitizing`, `math.arith.place-value`,
`math.arith.number-line` (all four unlocked by `math.arith.counting`),
plus `math.arith.proportion`, `math.arith.unit-rate` (both unlocked by
`math.arith.ratios`).

- `math.arith.counting-sequence` — reused its Misconception Registry
  by reference: MC-1 SEQUENCE-HAS-GAPS (FOUNDATIONAL, reclassified
  Type 5 instruction-induced), MC-2 COUNT-ORDER-CHANGES-TOTAL (Type 2
  perceptual intuition), MC-3 ZERO-STARTS-SEQUENCE (Type 6 analogy
  overextension from zero-indexed programming conventions).
- `math.arith.subitizing` — no Blueprint exists (verified via
  directory listing); 3 misconceptions authored directly via the
  birth-taxonomy diagnostic procedure: MC-1 SUBITIZING-RANGE-UNBOUNDED
  (FOUNDATIONAL, Type 2 perceptual intuition), MC-2
  SUBITIZING-REQUIRES-CANONICAL-PATTERN (Type 1 overgeneralization),
  MC-3 SUBITIZING-EQUALS-FAST-COUNTING (Type 3 language
  contamination — "instant" reinterpreted as "counting really fast").
- `math.arith.place-value` — reused its Misconception Registry by
  reference: MC-1 DIGIT-IS-VALUE (FOUNDATIONAL, Type 5
  instruction-induced), MC-2 EXPANDED-FORM-ADDITIVE-CONFUSION (Type 4
  notation-induced), MC-3 ZERO-PLACEHOLDER-INVISIBLE (Type 1
  overgeneralization).
- `math.arith.number-line` — reused its Misconception Registry by
  reference: MC-1 NEGATIVE-ORDERING-BY-MAGNITUDE (FOUNDATIONAL, Type 1
  overgeneralization from whole-number size intuition), MC-2
  DISTANCE-FROM-ZERO-DETERMINES-ORDER (Type 1, MC-1 generalized), MC-3
  NUMBER-LINE-HAS-GAPS (Type 2 perceptual intuition). Its Tier 1
  cross-link to `math.geom.coordinate-plane` (already authored) is
  used for a genuine cross-link transfer probe, not independence mode.
- `math.arith.proportion` — reused its Misconception Registry by
  reference: MC-1 QUANTITY-POSITIONS-MISMATCHED-ACROSS-RATIOS
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  ANY-INCREASING-RELATIONSHIP-ASSUMED-PROPORTIONAL (Type 1
  overgeneralization), MC-3
  CROSS-MULTIPLICATION-APPLIED-WITHOUT-VALID-PROPORTION-SETUP (Type 5
  instruction-induced). Its `math.func.linear-function` cross-link
  confirmed genuinely not-yet-authored (same honest-gap pattern as
  `math.arith.ratios`'s identical cross-link from Wave 2).
- `math.arith.unit-rate` — no Blueprint exists (verified via directory
  listing); 3 misconceptions authored directly via the birth-taxonomy
  diagnostic procedure: MC-1 NUMERATOR-DENOMINATOR-CONFUSION
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  UNIT-RATE-MEANS-PER-HOUR (Type 1 overgeneralization from the km/h
  introductory example), MC-3 UNIT-MEANS-MEASUREMENT-UNIT (Type 3
  language contamination — the everyday dual meaning of "unit").

`math.arith` now 14/58. Wave 4 candidates computed programmatically
from the live KG (all `requires` now satisfied): `math.arith.
ones-tens-hundreds`, `math.arith.addition`, `math.arith.decimals`
(Blueprints exist for all three), plus `math.arith.expanded-form`,
`math.arith.number-base`, `math.arith.ordering`, `math.arith.
direct-variation`, `math.arith.inverse-variation` (no Blueprints for
these five) — 8 concepts, not yet authored. No other domain touched.
All five tracking files updated in this same commit; re-validated 0
duplicates, 0 orphans, 0 Quality Gate 3 violations across all 96
mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 4 part 1 (2026-07-26, autonomous loop iteration 13)

Autonomous loop iteration 13, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 96 pre-batch mathematics entries. **0 violations found**.

**Wave 4 candidates re-verified programmatically** (matching the prior
iteration's computed list exactly): 8 concepts — `math.arith.
ones-tens-hundreds`, `math.arith.addition`, `math.arith.decimals`
(Blueprints exist for all three), plus `math.arith.expanded-form`,
`math.arith.number-base`, `math.arith.ordering`, `math.arith.
direct-variation`, `math.arith.inverse-variation` (no Blueprints for
these five). Split into two parts given the heavier no-Blueprint load
(5 of 8, versus Wave 3's 2 of 6) — this batch authors the 3
Blueprint-grounded concepts as Wave 4 part 1.

- `math.arith.ones-tens-hundreds` — reused its Misconception Registry
  by reference: MC-1 ONES-TENS-HUNDREDS-ASSUMED-SEPARATE-CONCEPTS
  (FOUNDATIONAL, Type 1 overgeneralization), MC-2
  ZERO-COLUMN-ASSUMED-OMITTABLE (Type 1), MC-3
  CARRYING-ASSUMED-ARBITRARY-RULE (Type 5 instruction-induced). Found
  and honestly recorded two genuine Blueprint/KG metadata
  discrepancies: the live KG lists `unlocks: [carrying, borrowing]`
  while the Blueprint states "none listed"; the KG's `estimated_hours`
  is 4 while the Blueprint states 3. Both resolved in favor of the KG
  per this program's standing rule (KG authoritative on divergence);
  neither affects the Blueprint's pedagogical content; no KG or
  Blueprint file modified.
- `math.arith.addition` — reused its Misconception Registry by
  reference: MC-1 CARRYING-BREAKDOWN (FOUNDATIONAL, Type 5
  instruction-induced), MC-2 COMMUTATIVITY-UNKNOWN (Type 2 perceptual
  intuition), MC-3 ZERO-ANNIHILATES (Type 6 analogy overextension from
  multiplication's a×0=0 rule). Its Tier 1 cross-link to `math.linalg.
  vector-addition` used for a genuine cross-link transfer probe.
- `math.arith.decimals` — reused its Misconception Registry by
  reference: MC-1 LONGER-DECIMAL-IS-LARGER (FOUNDATIONAL, Type 1
  overgeneralization — the extensively-documented "longer-is-larger"
  error), MC-2 WHOLE-AND-DECIMAL-PARTS-SEPARATE (Type 1), MC-3
  MULTIPLY-BIGGER-DIVIDE-SMALLER-ALWAYS (Type 1).

`math.arith` now 17/58. Wave 4 part 2 (deferred): the 5 no-Blueprint
concepts (`expanded-form`, `number-base`, `ordering`,
`direct-variation`, `inverse-variation`), misconceptions to be
authored directly via the birth-taxonomy diagnostic procedure. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 99 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 4 part 2 (2026-07-26, autonomous loop iteration 14)

Autonomous loop iteration 14, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 99 pre-batch mathematics entries. **0 violations found**.

**Wave 4 part 2**: authored the 5 no-Blueprint concepts deferred from
Wave 4 part 1 — `math.arith.expanded-form`, `math.arith.number-base`,
`math.arith.ordering`, `math.arith.direct-variation`, `math.arith.
inverse-variation` — all misconceptions authored directly via the
birth-taxonomy diagnostic procedure:

- `math.arith.expanded-form` — MC-1 EXPANDED-FORM-AS-DIGIT-PRODUCT
  (FOUNDATIONAL, Type 4 notation-induced), MC-2 ZERO-TERM-OMITTED
  (Type 1), MC-3 DIGIT-ITSELF-AS-TERM (Type 6 analogy overextension
  from an unrelated digit-sum procedure). Noted honestly in Curriculum
  Feedback: substantial conceptual overlap with `math.arith.
  place-value`'s own MC-2/MC-3, an expected consequence of
  `expanded-form` being the dedicated writing-task concept for the
  notation `place-value` first introduces.
- `math.arith.number-base` — MC-1 BASE-10-DIGITS-ASSUMED-UNIVERSAL
  (FOUNDATIONAL, Type 1), MC-2 POSITIONAL-VALUE-STAYS-POWERS-OF-TEN
  (Type 6 analogy overextension), MC-3 HEXADECIMAL-LETTERS-AS-VARIABLES
  (Type 3 language contamination).
- `math.arith.ordering` — MC-1 INEQUALITY-SYMBOL-DIRECTION-REVERSED
  (FOUNDATIONAL, Type 4 notation-induced), MC-2
  STRICT-VS-NONSTRICT-CONFLATION (Type 1), MC-3
  COMPOUND-INEQUALITY-MISREAD-AS-SEPARATE (Type 4 notation-induced).
- `math.arith.direct-variation` — MC-1 CONSTANT-K-MISIDENTIFIED
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  ANY-LINEAR-RELATIONSHIP-ASSUMED-DIRECT-VARIATION (FOUNDATIONAL,
  Type 1, `math.arith.proportion`'s own MC-2 generalized to y=kx),
  MC-3 DIRECT-VARIATION-ASSUMED-ONLY-POSITIVE-K (Type 1).
- `math.arith.inverse-variation` — MC-1
  INVERSE-VARIATION-CONFUSED-WITH-DIRECT-VARIATION (FOUNDATIONAL,
  Type 3 language contamination — the shared word "variation"), MC-2
  INVERSE-VARIATION-ASSUMED-LINEAR-GRAPH (Type 6 analogy
  overextension), MC-3 PRODUCT-CONSTANT-NOT-CHECKED (Type 5
  instruction-induced).

**Genuine discovery, corrected same batch**: while authoring
`direct-variation`, found that Blueprints for `math.func.
linear-function` and `math.func.rational-function` (both dated
2026-07-22) now exist — contradicting a "not yet authored" claim
inherited from `math.arith.proportion`'s and `math.arith.ratios`'s
own Blueprints (accurate at THOSE Blueprints' own authoring time, now
stale). Used this to construct genuine cross-link transfer probes
(Gate 5 in both `direct-variation.md` and `inverse-variation.md`,
grounded in the actual documented content of the now-existing
Blueprints) rather than independence mode. Added a small, targeted
addendum to `math.arith.proportion.md`'s and `math.arith.ratios.md`'s
own Cross-Subject Connections sections recording the correction —
their existing P76 assessment content (each concept's OWN already-
authored mastery-gate probe) was NOT rewritten, since it correctly
reflects those concepts' own Blueprints' content as authored.

`math.arith` now 22/58. Wave 5 candidates to be computed
programmatically next iteration — the candidate pool grew
substantially after Wave 4 (`addition` and `decimals` each unlocked
several new children: `carrying`, `mental-addition`, `subtraction`,
`multiplication`, `decimal-operations`, `terminating-decimals`,
`repeating-decimals`, `percentages`, `rounding`), not yet re-verified
this turn. No other domain touched. All five tracking files updated in
this same commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate
3 violations across all 104 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 5 part 1 (2026-07-26, autonomous loop iteration 15)

Autonomous loop iteration 15, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 104 pre-batch mathematics entries. **0 violations found**.

**Wave 5 candidates computed programmatically**: 9 concepts whose
prerequisites became fully satisfied after Wave 4 — `math.arith.
subtraction`, `math.arith.multiplication`, `math.arith.percentages`,
`math.arith.rounding` (Blueprints exist for all four), plus `math.
arith.carrying`, `math.arith.mental-addition`, `math.arith.
decimal-operations`, `math.arith.terminating-decimals`, `math.arith.
repeating-decimals` (no Blueprints for these five). Split into two
parts given the heavier no-Blueprint load (5 of 9), following the same
pattern as Wave 4 — this batch authors the 4 Blueprint-grounded
concepts as Wave 5 part 1.

- `math.arith.subtraction` — reused its Misconception Registry by
  reference: MC-1 SMALLER-FROM-LARGER (FOUNDATIONAL, Type 1
  overgeneralization), MC-2 COMMUTATIVITY-ASSUMED (Type 1, addition's
  commutative law over-generalized), MC-3 BORROW-NOT-REDUCED (Type 5
  instruction-induced).
- `math.arith.multiplication` — reused its Misconception Registry by
  reference: MC-1 ADDITION-CONFUSION (FOUNDATIONAL, Type 1), MC-2
  COMMUTATIVITY-FALSE (Type 2 perceptual intuition), MC-3
  ZERO-IDENTITY-CONFUSION (Type 6 analogy overextension from
  addition's own a+0=a). Its two Tier 1 cross-links (`math.linalg.
  matrix-multiplication`, `math.abst.ring-theory`) used for a genuine
  cross-link transfer probe.
- `math.arith.percentages` — reused its Misconception Registry by
  reference: MC-1 PERCENT-ASSUMED-DIFFERENT-KIND-OF-NUMBER
  (FOUNDATIONAL, Type 5 instruction-induced), MC-2
  PERCENT-OF-ASSUMED-SPECIAL-PROCEDURE (Type 5), MC-3
  SEQUENTIAL-PERCENT-CHANGES-ASSUMED-TO-CANCEL (Type 1). Found and
  honestly recorded two more Blueprint/KG metadata discrepancies
  (unlocks list, estimated_hours), resolved in favor of the KG per
  standing rule — the same discrepancy pattern first found for
  `ones-tens-hundreds` in Wave 4 part 1.
- `math.arith.rounding` — reused its Misconception Registry by
  reference: MC-1 SIGNIFICANT-FIGURES-CONFLATED-WITH-DECIMAL-PLACES
  (FOUNDATIONAL, Type 3 language contamination), MC-2
  ROUNDING-INTERMEDIATE-RESULTS-ASSUMED-HARMLESS (FOUNDATIONAL, Type
  1), MC-3 LEADING-ZEROS-COUNTED-AS-SIGNIFICANT (Type 1). Its
  `math.num.floating-point` cross-link confirmed genuinely
  not-yet-authored (consistent with the Blueprint's own V-5 check).

`math.arith` now 26/58. Wave 5 part 2 (deferred): the 5 no-Blueprint
concepts (`carrying`, `mental-addition`, `decimal-operations`,
`terminating-decimals`, `repeating-decimals`), misconceptions to be
authored directly via the birth-taxonomy diagnostic procedure. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 108 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 5 part 2 (2026-07-26, autonomous loop iteration 16)

Autonomous loop iteration 16, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 108 pre-batch mathematics entries. **0 violations found**.

**Wave 5 candidates re-verified programmatically**: the pool had grown
to 13 (from the original 9) after Wave 5 part 1 unlocked new children
(`borrowing`, `negative-numbers`, `division`, `multiplication-table`,
`estimation`, `significant-figures`, `exponentiation`) — this batch
sticks to the previously-deferred 5-concept Wave 5 part 2 set rather
than re-splitting the enlarged pool, following the same precedent set
at the Wave 4→5 transition; the 8 newly-unlocked candidates become
Wave 6, to be computed fresh next iteration.

**Wave 5 part 2**: authored the 5 no-Blueprint concepts deferred from
Wave 5 part 1 — `math.arith.carrying`, `math.arith.mental-addition`,
`math.arith.decimal-operations`, `math.arith.terminating-decimals`,
`math.arith.repeating-decimals` — all misconceptions authored directly
via the birth-taxonomy diagnostic procedure:

- `math.arith.carrying` — MC-1 CARRY-VALUE-CONFUSED-WITH-COLUMN-SUM
  (FOUNDATIONAL, Type 4 notation-induced), MC-2 CARRY-CHAIN-BROKEN
  (Type 5 instruction-induced), MC-3 CARRY-ADDED-TO-WRONG-COLUMN
  (Type 4). Deliberately scoped to carrying MECHANICS (which digit
  carries, chain propagation, column placement) rather than
  re-deriving why carrying is necessary, already covered by
  `math.arith.addition`'s own MC-1 and `math.arith.
  ones-tens-hundreds`'s own MC-3 — noted honestly in Curriculum
  Feedback to avoid duplication.
- `math.arith.mental-addition` — MC-1
  MENTAL-MATH-REQUIRES-WRITTEN-ALGORITHM-IN-HEAD (FOUNDATIONAL, Type
  5), MC-2 DECOMPOSITION-ORDER-FIXED (Type 1), MC-3
  MENTAL-ADDITION-LESS-ACCURATE-THAN-WRITTEN (Type 2 perceptual
  intuition).
- `math.arith.decimal-operations` — MC-1
  DECIMAL-MULTIPLICATION-POINT-ALIGNMENT (FOUNDATIONAL, Type 6 analogy
  overextension from addition/subtraction's alignment procedure), MC-2
  DECIMAL-DIVISION-POINT-NOT-SHIFTED (Type 5), MC-3
  DECIMAL-PLACE-COUNT-UNDERCOUNTED (Type 1). Deliberately scoped to
  MULTIPLICATION/DIVISION procedures specifically, since `math.arith.
  decimals`'s own registry already covers comparison and
  addition/subtraction.
- `math.arith.terminating-decimals` — MC-1
  TERMINATING-DECIMAL-DETERMINED-BY-NUMERATOR (FOUNDATIONAL, Type 1),
  MC-2 ANY-SIMPLE-LOOKING-FRACTION-ASSUMED-TERMINATING (Type 2), MC-3
  TERMINATING-MEANS-EXACT-VALUE-DIFFERENT-FROM-FRACTION (Type 3
  language contamination).
- `math.arith.repeating-decimals` — MC-1
  REPEATING-DECIMAL-ASSUMED-APPROXIMATE-NOT-EXACT (FOUNDATIONAL, Type
  3 language contamination), MC-2 BAR-NOTATION-SCOPE-MISREAD (Type 4),
  MC-3 ALL-INFINITE-DECIMALS-ASSUMED-REPEATING (Type 1).

`math.arith` now 31/58. Wave 6 candidates to be computed
programmatically next iteration (13 concepts identified this turn,
not yet fully verified: `borrowing`, `negative-numbers`,
`multiplication-table`, `division`, `decimal-operations` [now
authored], `terminating-decimals` [now authored],
`repeating-decimals` [now authored], `percentage-calculations`,
`estimation`, `significant-figures`, `exponentiation`, plus `carrying`
and `mental-addition` [now authored] — the live list will be
recomputed fresh, not assumed, at the start of the next iteration). No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 113 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 6 part 1 (2026-07-26, autonomous loop iteration 17)

Autonomous loop iteration 17, continuing the same established
Mathematics Educational Brain Autonomous Completion Program
(dynamic-pacing `<<autonomous-loop-dynamic>>` sentinel fire). Git
resync found zero concurrent commits at this iteration's start.

**Repair-audit first** (per this program's standing per-iteration
discipline): re-ran the Quality Gate 3 heading-conformance check across
all 113 pre-batch mathematics entries. **0 violations found**.

**Wave 6 candidates computed programmatically**: 9 concepts whose
prerequisites became fully satisfied after Wave 5 — `math.arith.
negative-numbers`, `math.arith.division`, `math.arith.
significant-figures`, `math.arith.exponentiation` (Blueprints exist
for all four), plus `math.arith.column-addition`, `math.arith.
borrowing`, `math.arith.multiplication-table`, `math.arith.
percentage-calculations`, `math.arith.estimation` (no Blueprints for
these five). Split into two parts given the heavier no-Blueprint load
(5 of 9), following the same pattern as Waves 4 and 5 — this batch
authors the 4 Blueprint-grounded concepts as Wave 6 part 1.

- `math.arith.negative-numbers` — reused its Misconception Registry
  by reference: MC-1 DOUBLE-NEGATIVE-STAYS-NEGATIVE (FOUNDATIONAL,
  Type 2 perceptual intuition), MC-2
  NEGATIVE-TIMES-NEGATIVE-IS-NEGATIVE (Type 2), MC-3
  MINUS-X-IS-ALWAYS-NEGATIVE (Type 4 notation-induced).
- `math.arith.division` — reused its Misconception Registry by
  reference: MC-1 DIVISION-COMMUTATIVE (FOUNDATIONAL, Type 1
  overgeneralization from multiplication), MC-2
  DIVISION-BY-ZERO-DEFINED (Type 6 analogy overextension), MC-3
  REMAINDER-IGNORED (Type 5 instruction-induced). Its Tier 1
  cross-link to `math.nt.divisibility` used for a genuine cross-link
  transfer probe.
- `math.arith.significant-figures` — reused its Misconception
  Registry by reference: MC-1
  ADDITION-SUBTRACTION-RULE-CONFLATED-WITH-MULTIPLICATION-RULE
  (FOUNDATIONAL, Type 1), MC-2
  CALCULATOR-OUTPUT-REPORTED-WITHOUT-ROUNDING (FOUNDATIONAL, Type 5),
  MC-3 LEAST-PRECISE-INPUT-MISIDENTIFIED (Type 5). Its `math.num.
  floating-point` cross-link confirmed genuinely not-yet-authored,
  consistent with `math.arith.rounding`'s own identical finding.
- `math.arith.exponentiation` — reused its Misconception Registry by
  reference: MC-1 EXPONENT-MULTIPLIES-BASE (FOUNDATIONAL, Type 4
  notation-induced), MC-2 EXPONENT-ADDS-COPIES (Type 1), MC-3
  ZERO-EXPONENT-GIVES-ZERO (Type 1).

`math.arith` now 35/58. Wave 6 part 2 (deferred): the 5 no-Blueprint
concepts (`column-addition`, `borrowing`, `multiplication-table`,
`percentage-calculations`, `estimation`), misconceptions to be
authored directly via the birth-taxonomy diagnostic procedure. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 117 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 6 part 2 (2026-07-26, autonomous loop iteration 18)

Autonomous loop iteration 18, continuing immediately after Wave 6 part
1. Git resync found zero concurrent commits at this iteration's start
(`git status --short` clean against the Wave 6 part 1 push).

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 117 pre-batch mathematics entries. **0 violations
found**.

Authored the 5 no-Blueprint concepts deferred from Wave 6's split
(confirmed via directory listing: none of the five have a
`docs/curriculum/blueprints/` file), each via the birth-taxonomy
diagnostic procedure:

- `math.arith.column-addition` (requires `carrying`) — MC-1
  COLUMN-MISALIGNMENT (FOUNDATIONAL, Type 4 notation-induced), MC-2
  DIRECTION-REVERSED (Type 5 instruction-induced), MC-3
  MISSING-DIGIT-MISHANDLED (Type 1 overgeneralization). Misconceptions
  scoped to written-layout/processing-order, deliberately distinct
  from `carrying`'s own regrouping-mechanics registry.
- `math.arith.borrowing` (requires `subtraction`, `ones-tens-hundreds`)
  — MC-1 BORROW-CHAIN-THROUGH-ZEROS-BROKEN (FOUNDATIONAL, Type 5), MC-2
  BORROWED-TEN-MISCOMPUTED (Type 1), MC-3
  BORROW-SOURCE-COLUMN-MISIDENTIFIED (Type 4). Scoped to the
  zero-chain relay and paired-change mechanics, distinct from
  `subtraction`'s conceptual registry and `carrying`'s
  opposite-direction procedure.
- `math.arith.multiplication-table` (requires `multiplication`) — MC-1
  SKIP-COUNTING-SUBSTITUTED-FOR-RECALL (FOUNDATIONAL, Type 5), MC-2
  COMMUTATIVE-PAIRS-MEMORIZED-SEPARATELY (Type 1), MC-3
  NEAR-FACT-CONFUSION (Type 2 perceptual intuition). Scoped to
  fact-recall fluency specifically.
- `math.arith.percentage-calculations` (requires `percentages`) — MC-1
  WHICH-QUANTITY-IS-THE-WHOLE-MISIDENTIFIED (FOUNDATIONAL, Type 5),
  MC-2 FINDING-THE-WHOLE-CONFUSED-WITH-FINDING-THE-PART (Type 6 analogy
  overextension), MC-3 PERCENT-EXCEEDING-100-ASSUMED-IMPOSSIBLE (Type
  1). Its `related` sibling `math.arith.percentage-change` confirmed
  not yet authored (no Blueprint, no EB entry) — P76 transfer probe
  uses independence mode, flagged for revisit once that concept exists.
- `math.arith.estimation` (requires `rounding`) — MC-1
  ESTIMATION-REQUIRES-EXACT-COMPUTATION-FIRST (FOUNDATIONAL, Type 5),
  MC-2 ESTIMATE-TREATED-AS-WRONG-ANSWER (Type 3 language
  contamination), MC-3 ROUNDING-DIRECTION-NOT-CHOSEN-FOR-PURPOSE (Type
  1). Its cross-link `math.num.error-analysis` confirmed not yet
  authored (no Blueprint, no EB entry) — independence mode.

`math.arith` now **40/58**. No other domain touched. All five tracking
files updated in this same commit; re-validated 0 duplicates, 0
orphans, 0 Quality Gate 3 violations across all 122 mathematics
entries. Wave 7 candidates computed programmatically (12): 6
Blueprint-grounded (`absolute-value`, `integer-arithmetic`,
`remainder`, `order-of-operations`, `exponent-rules`, `square-numbers`)
and 6 no-Blueprint (`long-multiplication`, `mental-multiplication`,
`divisor-dividend`, `percentage-change`, `cube-numbers`,
`scientific-notation`) — to be re-verified fresh, not assumed, when
Wave 7 authoring begins.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 7 part 1 (2026-07-26, autonomous loop iteration 19)

Autonomous loop iteration 19, continuing immediately after Wave 6 part
2. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 122 pre-batch mathematics entries. **0 violations
found**.

**Wave 7 candidates re-verified programmatically** (matching the
prior batch's projection exactly): 12 concepts whose prerequisites
became fully satisfied after Wave 6 — 6 Blueprint-grounded
(`absolute-value`, `integer-arithmetic`, `remainder`,
`order-of-operations`, `exponent-rules`, `square-numbers`) and 6
no-Blueprint (`long-multiplication`, `mental-multiplication`,
`divisor-dividend`, `percentage-change`, `cube-numbers`,
`scientific-notation`). Split into two parts (an even 6/6 split, still
following the established pattern of authoring Blueprint-grounded
concepts first) — this batch authors the 6 Blueprint-grounded
concepts as Wave 7 part 1, each reused by reference from its own
Blueprint:

- `math.arith.absolute-value` (requires `negative-numbers`,
  `number-line`) — reused its Misconception Registry by reference:
  MC-1 ABSOLUTE-VALUE-AS-SIGN-REMOVAL (FOUNDATIONAL, Type 4
  notation-induced), MC-2 ABSOLUTE-VALUE-ASSUMED-SOMETIMES-NEGATIVE
  (Type 1), MC-3
  DISTANCE-FROM-ZERO-TREATED-AS-SEPARATE-FROM-DISTANCE-BETWEEN-POINTS
  (Type 6). Its Tier 1 cross-link to `math.real.metric-space` (Blueprint
  confirmed authored) used for a genuine cross-link transfer probe.
- `math.arith.integer-arithmetic` (requires `negative-numbers`,
  `multiplication`) — reused its Misconception Registry by reference:
  MC-1 NEGATIVE-BASE-EXPONENT-ORDER-ERROR (FOUNDATIONAL, Type 4), MC-2
  SIGN-COUNTING-OVERGENERALIZED-CANCELLATION (Type 1), MC-3
  ZERO-DIVISION-SIGN-CONFUSION (Type 6). No cross-links (Blueprint
  confirms empty).
- `math.arith.remainder` (requires `division`) — reused its
  Misconception Registry by reference: MC-1
  DECIMAL-DIGITS-ARE-THE-REMAINDER (FOUNDATIONAL, Type 4), MC-2
  REMAINDER-CAN-EQUAL-OR-EXCEED-DIVISOR (Type 5), MC-3
  NEGATIVE-DIVIDEND-GIVES-NEGATIVE-REMAINDER (Type 2). Cross-link
  `math.nt.modular-arithmetic` confirmed not yet authored — independence
  mode, per the Blueprint's own GR-9 finding.
- `math.arith.order-of-operations` (requires `addition`, `subtraction`,
  `multiplication`, `division`) — reused its Misconception Registry by
  reference: MC-1 LEFT-TO-RIGHT-ONLY (FOUNDATIONAL, Type 1), MC-2
  ADDITION-BEFORE-MULTIPLICATION (Type 5), MC-3
  MULTIPLICATION-BEFORE-DIVISION-ALWAYS (Type 6). No cross-links.
- `math.arith.exponent-rules` (requires `exponentiation`) — reused its
  Misconception Registry by reference: MC-1
  PRODUCT-RULE-MULTIPLIES-EXPONENTS (FOUNDATIONAL, Type 6), MC-2
  POWER-RULE-ADDS-EXPONENTS (Type 6), MC-3 NEGATIVE-EXPONENT-NEGATES
  (Type 4). No cross-links.
- `math.arith.square-numbers` (requires `exponentiation`) — reused its
  Misconception Registry by reference: MC-1 SQUARING-MEANS-DOUBLING
  (FOUNDATIONAL, Type 2), MC-2 NEGATIVE-SQUARED-IS-NEGATIVE (Type 1),
  MC-3 LAST-DIGIT-DECIDES-PERFECT-SQUARE (Type 1). Its Tier 1
  cross-link to `math.geom.area` (Blueprint confirmed authored) used
  for a genuine cross-link transfer probe, per the Blueprint's own
  P76_mode declaration.

`math.arith` now **46/58**. Wave 7 part 2 (deferred): the 6
no-Blueprint concepts (`long-multiplication`, `mental-multiplication`,
`divisor-dividend`, `percentage-change`, `cube-numbers`,
`scientific-notation`), misconceptions to be authored directly via the
birth-taxonomy diagnostic procedure. No other domain touched. All five
tracking files updated in this same commit; re-validated 0 duplicates,
0 orphans, 0 Quality Gate 3 violations across all 128 mathematics
entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 7 part 2 (2026-07-26, autonomous loop iteration 20)

Autonomous loop iteration 20, continuing immediately after Wave 7 part
1. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 128 pre-batch mathematics entries. **0 violations
found**.

**Wave 7 part 2 candidates re-verified programmatically**: the live KG
now shows `math.arith.square-roots` (Blueprint exists) also newly
ready, unlocked by Wave 7 part 1's `square-numbers` — per this
program's established precedent (first applied at the Wave 5→6 and
Wave 6→7 transitions), stuck to the originally-deferred 6-concept Wave
7 part 2 set rather than re-splitting the now-larger pool;
`square-roots` becomes a Wave 8 candidate, computed fresh at that
wave's own start.

Authored the 6 no-Blueprint concepts deferred from Wave 7's split
(confirmed via directory listing: none of the six have a
`docs/curriculum/blueprints/` file), each via the birth-taxonomy
diagnostic procedure:

- `math.arith.long-multiplication` (requires `multiplication-table`,
  `carrying`) — MC-1 PARTIAL-PRODUCT-PLACE-VALUE-SHIFT-OMITTED
  (FOUNDATIONAL, Type 4 notation-induced), MC-2
  CARRY-DROPPED-WITHIN-A-PARTIAL-PRODUCT-ROW (Type 5
  instruction-induced), MC-3
  PARTIAL-PRODUCT-COLUMN-MISALIGNMENT-DURING-ADDITION (Type 1
  overgeneralization).
- `math.arith.mental-multiplication` (requires `multiplication-table`)
  — MC-1 DISTRIBUTIVE-DECOMPOSITION-APPLIED-INCOMPLETELY
  (FOUNDATIONAL, Type 5), MC-2
  HALVING-DOUBLING-MISAPPLIED-TO-AN-ODD-FACTOR (Type 1), MC-3
  POWER-OF-10-SHIFT-COUNT-MISCOUNTED (Type 4).
- `math.arith.divisor-dividend` (requires `division`) — MC-1
  DIVIDEND-DIVISOR-SWAPPED (FOUNDATIONAL, Type 3 language
  contamination), MC-2 QUOTIENT-CONFUSED-WITH-DIVISOR (Type 3), MC-3
  VOCABULARY-INCONSISTENT-ACROSS-NOTATIONS (Type 4).
- `math.arith.percentage-change` (requires `percentage-calculations`)
  — MC-1 WRONG-BASE-USED-FOR-PERCENTAGE-CHANGE (FOUNDATIONAL, Type 5,
  a direct carry-forward of `percentage-calculations`'s own MC-1),
  MC-2 PERCENTAGE-DECREASE-SIGN-DROPPED (Type 1), MC-3
  REPEATED-PERCENTAGE-CHANGES-ASSUMED-TO-CANCEL (Type 6 analogy
  overextension).
- `math.arith.cube-numbers` (requires `exponentiation`) — MC-1
  CUBING-MEANS-TRIPLING (FOUNDATIONAL, Type 1, the identical
  structural confusion as `square-numbers`'s own MC-1, reapplied to a
  new exponent), MC-2 NEGATIVE-CUBED-ASSUMED-POSITIVE (Type 6, a
  direct overextension of `square-numbers`'s own MC-2 fix), MC-3
  CUBE-NUMBER-CONFUSED-WITH-MULTIPLE-OF-THREE (Type 3). Its Tier 1
  cross-link to `math.geom.volume` (Blueprint confirmed authored) used
  for a genuine cross-link transfer probe.
- `math.arith.scientific-notation` (requires `exponentiation`,
  `decimals`) — MC-1 COEFFICIENT-RANGE-VIOLATED (FOUNDATIONAL, Type
  4), MC-2 EXPONENT-SIGN-DIRECTION-CONFUSED (Type 2 perceptual
  intuition), MC-3
  EXPONENT-RENORMALIZATION-SKIPPED-AFTER-COMBINING (Type 5).

`math.arith` now **52/58** — only 6 concepts remain in the domain. No
other domain touched. All five tracking files updated in this same
commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate 3
violations across all 134 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.

### Mathematics — math.arith Wave 8 (2026-07-26, autonomous loop iteration 21)

Autonomous loop iteration 21, continuing immediately after Wave 7 part
2. Git resync found zero concurrent commits at this iteration's start.

**Repair-audit first**: re-ran the Quality Gate 3 heading-conformance
check across all 134 pre-batch mathematics entries. **0 violations
found**.

**Wave 8 candidates re-verified programmatically**: 3 concepts ready
— `math.arith.long-division`, `math.arith.square-roots` (Blueprint
exists — became ready when `square-numbers` was authored in Wave 7
part 1, deliberately deferred to this wave per this program's
established precedent), and `math.arith.mental-arithmetic`. Small
enough to author in one part without splitting.

- `math.arith.square-roots` (requires `square-numbers`) — reused its
  Misconception Registry by reference: MC-1
  SQRT-SYMBOL-CONFLATED-WITH-ALL-ROOTS (FOUNDATIONAL, Type 6 analogy
  overextension), MC-2 NEGATIVE-RADICAND-ALWAYS-UNDEFINED (Type 1),
  MC-3 ESTIMATION-ROUNDS-TO-NEAREST-INTEGER-ONLY (Type 5). Both KG
  cross-links (`math.alg.radicals`, `math.geom.pythagorean-theorem`)
  confirmed not yet authored — independence mode, per the Blueprint's
  own Component 7 finding.
- `math.arith.long-division` (requires `division`,
  `long-multiplication`) — no Blueprint. MC-1
  DIGIT-BRING-DOWN-SKIPPED (FOUNDATIONAL, Type 5), MC-2
  QUOTIENT-DIGIT-COLUMN-MISALIGNED (Type 4), MC-3
  PROCESS-TERMINATED-BEFORE-ALL-DIGITS-BROUGHT-DOWN (Type 1). Scoped
  to the iterative four-step algorithm's procedural failure modes,
  distinct from `math.arith.remainder`'s conceptual registry.
- `math.arith.mental-arithmetic` (requires `mental-addition`,
  `mental-multiplication`) — no Blueprint. MC-1
  STRATEGY-NOT-MATCHED-TO-NUMBER-STRUCTURE (FOUNDATIONAL, Type 1),
  MC-2 COMPENSATION-ADJUSTMENT-NOT-REVERSED (Type 5), MC-3
  MENTAL-DECOMPOSITION-FORCED-INTO-WRITTEN-ALGORITHM-ORDER (Type 6
  analogy overextension).

`math.arith` now **55/58** — only 3 concepts remain
(`fraction-simplification`, `fraction-addition`, `irrational-roots`),
all currently blocked on unauthored number-theory prerequisites
(`math.nt.gcd`, `math.nt.lcm`, and — for `irrational-roots` — this
wave's own `square-roots`, now resolved). `math.arith` cannot reach
Domain Certification until at least `math.nt.gcd` and `math.nt.lcm`
are authored — a genuine cross-domain dependency, to be addressed in
Wave 9. No other domain touched. All five tracking files updated in
this same commit; re-validated 0 duplicates, 0 orphans, 0 Quality Gate
3 violations across all 137 mathematics entries.

Full validation this batch: all 6 subject KG validators PASS (0
failures, 0 warnings each), `npx tsc --noEmit` clean, full vitest suite
2133 passed / 1 skipped (112 files), `npm run build` succeeded.
