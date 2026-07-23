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
| Concepts with an Educational Brain entry | **190** |
| Remaining | **1,585** |
| Completion percentage | **10.70%** |

---

## 2. Subject progress

| Subject | KG concepts | EB entries | Coverage | Entry point(s) | Entry points covered |
|---|---|---|---|---|---|
| mathematics | 908 | 32 | 3.52% | `math.found.mathematical-thinking` | **Yes** |
| physics | 238 | 155 | 65.13% | `phys.meas.units` | Yes |
| english | 216 | 3 | 1.39% | `eng.phonics.phonemic-awareness`, `eng.phonics.print-concepts` | Yes (both) |
| chemistry | 186 | 0 | 0.00% | `chem.found.matter` | No |
| biology | 108 | 0 | 0.00% | `bio.found.what-is-biology` | No |
| computer_science | 119 | 0 | 0.00% | `cs.found.intro-computers` | No |

Physics's KG count reflects the 2026-07-22 Particle Physics + Semiconductor
Physics additions (216 → 238); its 67 pre-existing entries predated that
addition. Wave 6 (12 concepts, dependency level 6) raised physics to
79/238; Wave 7 (25 concepts, dependency level 7) raised physics to
104/238; Wave 8 (15 concepts, dependency level 8) raised physics to
119/238 (50.00%); Wave 9 (16 concepts, dependency level 9) raised
physics to 135/238 (56.72%) — introducing the first Modern Physics and
Relativity domain entries (`phys.mod.photoelectric-effect`,
`phys.rel.postulates`); Wave 10 (9 concepts, dependency level 10) raised
physics to 144/238 (60.50%); this session's Wave 11 batch (11 concepts,
dependency level 11) raised physics to 155/238 (65.13%) — introducing
the first Statistical Mechanics domain entry
(`phys.stat.probability-basics`) — still none of the 22 new Particle
Physics/Semiconductor Physics concepts are covered yet (those sit at
much deeper dependency levels, since the Particle Physics domain has its
own internal prerequisite chain rooted at
`phys.particle.four-forces`).
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
2026-07-22, COMPLETE)

A direct, explicit user instruction ("audit Physics Educational Brain,
verify exactly which 67 already exist, then continue authoring the
remaining Educational Brain concepts in strict prerequisite/topological
order") redirected one batch specifically to physics, overriding §3's
math.found-first default for this batch only. `math.found` was NOT
touched and remains 31/82 — the standing default target for any future
batch without an equally explicit override.

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
reference. Raised physics from 67→79/238.

---

## 3c. Domain status — physics Wave 7 (explicit exception batch,
2026-07-23, COMPLETE)

A second, direct, explicit user instruction — a numbered set of mandatory
rules for continuing Physics Educational Brain production — again
redirected work specifically to physics, overriding §3's math.found-first
default for this batch only. `math.found` was NOT touched and remains
31/82.

| Metric | Value |
|---|---|
| Domain | physics (whole subject, not a sub-domain) |
| Total concepts in subject | 238 |
| Authored before this batch | 79 |
| Authored this batch (Wave 7, dependency level 7) | 25 |
| Total now | 104 |
| Remaining | 134 |
| Status | **IN PROGRESS** |

Re-audited from a fresh `git fetch origin && git checkout main && git pull
origin main` (per mandatory rule 1) before authoring anything: confirmed
main only had 67 physics EB files at that point — the prior session's
Wave 6 work (22 blueprints + 12 EB entries) had never been merged, only
existed on the feature branch. Merged that branch's work into `main`
first (fast-forward, no conflicts), THEN re-audited again and confirmed
79/238 as the true starting point for this batch. Independently
recomputed dependency levels via a fresh Kahn's-algorithm pass over the
live KG's `requires` edges (not trusting `AUTHORING_QUEUE.md`'s stored
levels blindly) — the level-7 set matched the queue's stored rows
exactly, 25 concepts: `phys.mech.friction`, `phys.mech.tension`,
`phys.mech.normal-force`, `phys.mech.kinetic-energy`,
`phys.mech.potential-energy`, `phys.mech.power`, `phys.mech.impulse`,
`phys.mech.center-of-mass`, `phys.mech.angular-kinematics`,
`phys.mech.gravitational-field`, `phys.mech.stress-strain`,
`phys.mech.buoyancy`, `phys.mech.surface-tension`, `phys.therm.first-law`,
`phys.wave.shm`, `phys.opt.diffraction`, `phys.em.dielectrics`,
`phys.em.energy-capacitor`, `phys.em.resistivity`, `phys.em.dc-circuits`,
`phys.em.electrical-power`, `phys.em.solenoid`,
`phys.em.mutual-inductance`, `phys.em.ac-basics`,
`phys.em.maxwells-equations`. All 25 had existing Blueprints reused by
reference. Wave 8 (level 8, 15 concepts) is computed and next, but NOT
started this batch, per the "stop after this batch, report, then
re-audit" mandatory-rules discipline.

---

## 3d. Domain status — physics Wave 8 (explicit exception batch,
2026-07-23, COMPLETE)

Continuation of the same mandatory-rules production cycle (§3c),
immediately following Wave 7 within the same conversation per rule 10.
`math.found` was NOT touched and remains 31/82.

| Metric | Value |
|---|---|
| Domain | physics (whole subject, not a sub-domain) |
| Total concepts in subject | 238 |
| Authored before this batch | 104 |
| Authored this batch (Wave 8, dependency level 8) | 15 |
| Total now | 119 |
| Remaining | 119 |
| Status | **IN PROGRESS — exactly 50.00% complete** |

Re-fetched `origin/main` after the Wave 7 push and confirmed 0 commits
ahead/behind before starting (per rule 10) — no other session had
touched physics EB concurrently. Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-8 set matched `AUTHORING_QUEUE.md`'s stored rows
exactly, 15 concepts: `phys.mech.inclined-plane`,
`phys.mech.work-energy-theorem`, `phys.mech.conservation-of-energy`,
`phys.mech.conservation-of-momentum`, `phys.mech.torque`,
`phys.mech.gravitational-potential`, `phys.therm.thermodynamic-processes`,
`phys.wave.shm-energy`, `phys.wave.pendulum`, `phys.wave.spring-mass`,
`phys.opt.single-slit`, `phys.em.kirchhoffs-laws`, `phys.em.emf`,
`phys.em.lc-circuits`, `phys.em.electromagnetic-waves`. All 15 had
existing Blueprints reused by reference (`phys.opt.single-slit` cited 4
misconceptions, matching the same 4-misconception density already
established for its sibling `phys.opt.diffraction`). Wave 9 (level 9,
16 concepts) is computed and next, but NOT started this batch.

---

## 3e. Domain status — physics Wave 9 (explicit exception batch,
2026-07-23, COMPLETE)

Continuation of the same mandatory-rules production cycle (§3c/§3d),
immediately following Wave 8 within the same conversation per rule 10.
`math.found` was NOT touched and remains 31/82.

| Metric | Value |
|---|---|
| Domain | physics (whole subject, not a sub-domain) |
| Total concepts in subject | 238 |
| Authored before this batch | 119 |
| Authored this batch (Wave 9, dependency level 9) | 16 |
| Total now | 135 |
| Remaining | 103 |
| Status | **IN PROGRESS — 56.72% complete** |

Re-fetched `origin/main` after the Wave 8 push and confirmed 0 commits
ahead/behind before starting (per rule 10) — no other session had
touched physics EB concurrently. Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-9 set matched `AUTHORING_QUEUE.md`'s stored rows
exactly, 16 concepts: `phys.mech.conservative-forces`,
`phys.mech.collisions-elastic`, `phys.mech.collisions-inelastic`,
`phys.mech.moment-of-inertia`, `phys.mech.equilibrium`,
`phys.mech.orbital-mechanics`, `phys.mech.escape-velocity`,
`phys.mech.bernoulli`, `phys.therm.second-law`, `phys.therm.heat-engines`,
`phys.wave.damped-oscillations`, `phys.em.wheatstone-bridge`,
`phys.em.potentiometer`, `phys.em.rc-circuits`,
`phys.mod.photoelectric-effect`, `phys.rel.postulates`. All 16 had
existing Blueprints reused by reference (`phys.mod.photoelectric-effect`
and `phys.rel.postulates` each cited 4 misconceptions, matching the
4-misconception density pattern already established for
`phys.opt.diffraction`/`phys.opt.single-slit`). This wave introduced the
first Modern Physics and Relativity domain entries in this program.
Wave 10 (level 10, 9 concepts) is computed and next, but NOT started
this batch.

---

## 3f. Domain status — physics Wave 10 (explicit exception batch,
2026-07-23, COMPLETE)

Continuation of the same mandatory-rules production cycle (§3c/§3d/§3e),
immediately following Wave 9 within the same conversation per rule 10.
`math.found` was NOT touched and remains 31/82.

| Metric | Value |
|---|---|
| Domain | physics (whole subject, not a sub-domain) |
| Total concepts in subject | 238 |
| Authored before this batch | 135 |
| Authored this batch (Wave 10, dependency level 10) | 9 |
| Total now | 144 |
| Remaining | 94 |
| Status | **IN PROGRESS — 60.50% complete** |

Re-fetched `origin/main` after the Wave 9 push and confirmed 0 commits
ahead/behind before starting (per rule 10) — no other session had
touched physics EB concurrently. Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-10 set matched `AUTHORING_QUEUE.md`'s stored rows
exactly, 9 concepts: `phys.mech.rotational-dynamics`,
`phys.mech.keplers-laws`, `phys.mech.satellites`, `phys.mech.viscosity`,
`phys.mech.generalized-coordinates`, `phys.therm.entropy`,
`phys.wave.forced-oscillations`, `phys.mod.photons`,
`phys.rel.simultaneity`. All 9 had existing Blueprints reused by
reference (`phys.mod.photons` cited all 4 of its Blueprint's documented
misconceptions, matching the 4-misconception density pattern already
established for `phys.opt.diffraction`/`phys.opt.single-slit`/
`phys.mod.photoelectric-effect`/`phys.rel.postulates`). Wave 11 (level
11, 11 concepts) is computed and next, but NOT started this batch.

---

## 3g. Domain status — physics Wave 11 (explicit exception batch,
2026-07-23, COMPLETE)

Continuation of the same mandatory-rules production cycle
(§3c/§3d/§3e/§3f), immediately following Wave 10 within the same
conversation per rule 10. `math.found` was NOT touched and remains
31/82.

| Metric | Value |
|---|---|
| Domain | physics (whole subject, not a sub-domain) |
| Total concepts in subject | 238 |
| Authored before this batch | 144 |
| Authored this batch (Wave 11, dependency level 11) | 11 |
| Total now | 155 |
| Remaining | 83 |
| Status | **IN PROGRESS — 65.13% complete** |

Re-fetched `origin/main` after the Wave 10 push and confirmed 0 commits
ahead/behind before starting (per rule 10) — no other session had
touched physics EB concurrently. Independently recomputed dependency
levels via a fresh Kahn's-algorithm pass over the live KG's `requires`
edges — the level-11 set matched `AUTHORING_QUEUE.md`'s stored rows
exactly, 11 concepts: `phys.mech.angular-momentum`,
`phys.mech.rolling-motion`, `phys.mech.euler-lagrange-equation`,
`phys.therm.carnot-cycle`, `phys.therm.third-law`,
`phys.mod.compton-effect`, `phys.mod.de-broglie`, `phys.mod.bohr-model`,
`phys.mod.x-rays`, `phys.rel.time-dilation`,
`phys.stat.probability-basics`. All 11 had existing Blueprints reused by
reference (`phys.mod.compton-effect`, `phys.mod.de-broglie`,
`phys.mod.bohr-model`, `phys.mod.x-rays`, `phys.rel.time-dilation`, and
`phys.stat.probability-basics` each cited all 4 of their Blueprint's
documented misconceptions, extending the 4-misconception density
pattern to 10 concepts now). This wave introduced the first Statistical
Mechanics domain entry in this program (`phys.stat.probability-basics`).
Wave 12 (level 12, 8 concepts) is computed and next, but NOT started
this batch.

---

## 4. Current batch

**Curriculum Completion Program batch 14 (this batch, Physics Wave 11,
explicit exception — see §3g for full detail)**: authored the complete
physics dependency-level-11 wave (11 concepts), continuing the same
mandatory-rules cycle immediately after Wave 10 within the same
conversation. All 11 verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s
exact 21-section structure and heading order (0 mismatches), zero
duplicates, zero orphans against the live physics KG (155 total physics
EB files). `math.found` remains 31/82, untouched this batch. Physics KG
re-validated PASS (238/238 reachable, 0 failures/warnings, no KG file
touched). All six tracking files regenerated; re-validated 0 orphans, 0
duplicates, 0 broken KG references, 0 invalid Blueprint references
across all 190 entries. Physics EB reached 155/238 — 65.13%. This wave
introduced the first Statistical Mechanics
(`phys.stat.probability-basics`) domain entry in this program.

**Prior batch (batch 13, Physics Wave 10, explicit exception — see
§3f)**: authored the complete physics dependency-level-10 wave (9
concepts), continuing the same mandatory-rules cycle immediately after
Wave 9 within the same conversation. All 9 verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicates, zero orphans against the live
physics KG. `math.found` remains 31/82, untouched this batch. Physics EB
reached 144/238 — 60.50%.

**Prior batch (batch 12, Physics Wave 9, explicit exception — see
§3e)**: authored the complete physics dependency-level-9 wave (16
concepts), continuing the same mandatory-rules cycle immediately after
Wave 8 within the same conversation. All 16 verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicates, zero orphans against the live
physics KG. `math.found` remains 31/82, untouched this batch. Physics EB
reached 135/238 — 56.72%. This wave introduced the first Modern Physics
(`phys.mod.photoelectric-effect`) and Relativity (`phys.rel.postulates`)
domain entries in this program.

**Prior batch (batch 11, Physics Wave 8, explicit exception — see
§3d)**: authored the complete physics dependency-level-8 wave (15
concepts), continuing the same mandatory-rules cycle immediately after
Wave 7 within the same conversation. All 15 verified against
`EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and heading
order (0 mismatches), zero duplicates, zero orphans against the live
physics KG. `math.found` remains 31/82, untouched this batch. Physics EB
reached exactly 119/238 — 50.00%.

**Prior batch (batch 10, Physics Wave 7, explicit exception — see
§3c)**: authored the complete physics dependency-level-7 wave (25
concepts) under a second, more detailed set of explicit mandatory rules
for continuing physics Educational Brain production. All 25 verified
against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section structure and
heading order (0 mismatches), zero duplicates, zero orphans against the
live physics KG. Discovered and resolved a real process gap: the prior
session's entire Wave 6 batch (blueprints + 12 EB entries) had never
been merged to `main`; merged it first, then continued. `math.found`
remains 31/82, untouched this batch.

**Prior batch (batch 9, Physics Wave 6, explicit exception — see §3b)**:
authored the complete physics dependency-level-6 wave (12 concepts). All
12 verified against `EDUCATIONAL_BRAIN_STANDARD.md`'s exact 21-section
structure and heading order (0 mismatches). Six genuine Curriculum
Feedback findings recorded (not fixed, no KG file modified): 11 of the 12
concepts have a genuine, identifiable cross-subject connection despite an
empty KG `cross_links` array (see `COVERAGE.md`'s Delivery history for
the full per-concept list); `phys.opt.youngs-experiment` alone was
honestly assessed as having no strong cross-subject connection at this
level. `math.found` remains 31/82, untouched this batch.

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
   physics's next dependency level (Wave 8), then everything else in
   prerequisite order.
4. **Standing exception**: physics (or any subject) may be targeted
   again ahead of this default order given an equally explicit,
   subject-specific user instruction, as happened this batch and the
   prior ones (§3b/§3c/§3d/§3e/§3f/§3g/§4). Physics currently has 83
   concepts remaining (155/238 done, 65.13%); its own internal queue's
   next unlocked wave (Wave 12, dependency level 12, 8 concepts) IS
   already computed: `phys.mech.conservation-of-angular-momentum`,
   `phys.mech.cyclic-coordinates-conservation-laws`,
   `phys.mech.hamiltonian`, `phys.therm.refrigerators`,
   `phys.mod.wave-particle-duality`, `phys.mod.atomic-spectra`,
   `phys.rel.length-contraction`, `phys.stat.boltzmann-factor`.

Full computed order (all 1,585 remaining concepts): see
`AUTHORING_QUEUE.md` — §5 above (the domain-completion constraint) takes
precedence over that file's literal row order until `math.found` is
complete, unless overridden per item 4.

## 6. Next batch

**Batch 15 (recommended default)**: resume `math.found` Wave 6 — the 5
level-6 concepts listed in §5 item 1, in strict prerequisite order, no
other domain started. **If instead directed back to physics** (per the
standing mandatory-rules cycle governing this override): author Wave 12
(the 8 concepts listed in §5 item 4) in full, following the same
reuse-by-reference-Blueprint discipline established these past six
batches, then re-fetch/re-audit `main` and continue to Wave 13.
