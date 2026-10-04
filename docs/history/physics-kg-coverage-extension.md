# Physics KG coverage-driven extension (owner exception 2026-10-03)

Standing owner exception (CLAUDE.md, 2026-10-03): extend each subject's KG until the
subject is covered — physics first, core tier first, from
`docs/architecture/PHYSICS_KG_GAP_AUDIT.md`. Every new node follows
`KG_CONCEPT_GRANULARITY_STANDARD.md` and ships in the same push with its blueprint,
compiled package, EB entry, 2 explanations, 5 gradeable distractor-mapped probes,
a concept-scoped figure and a pinning test. Electronics (transistors, logic gates)
stays excluded.

## Batches landed on `main` (2026-10-04, fast-forward to `a646276d`)

Built on `claude/ecstatic-noether-sc65l2`, one validated commit per batch, then landed
on `main` in one fast-forward on the owner's instruction ("merge this branch into main
and keep working on main only"). Physics KG 238 → 262.

| Batch | Commit | Concepts |
|---|---|---|
| 1 | `d7c47993` | density, measuring instruments (vernier/screw gauge), mass and weight, rectilinear propagation |
| 2 | `6f90e85d` | linearisation and uncertainty, simple machines, variation of g, terminal velocity |
| 3 | `6f0eac57` | Newton's law of cooling, blackbody radiation, energy resources, echo and SONAR |
| 4 | `bfb1b74d` | human eye, scattering of light, electrostatic potential energy, cells in series/parallel |
| 5 | `901a320b` | moving-coil galvanometer, motors and generators, household electricity, connected bodies |
| 6 | `a646276d` | thin-film interference, diffraction grating, resolving power, conductors in electrostatics |

Validation at every batch: `tsc` clean; full vitest suite green except the 3
`certificationSessionCleanup` timeouts that also fail on `origin/main` (pre-existing,
not touched); seed dry-run 0 duplicate identities; contract audit 100% at the
5-probe depth; resolver collision probe (`what is X?` style requests) checked for
captures. Notable fixes found on the way: a node name "Graphs, Linearisation…" captured
"teach me graph theory" (renamed `phys.meas.linearisation-and-uncertainty`); two
same-kind probes at the same difficulty collide on seed identity (difficulty is the
ladder segment) — caught by the dry-run in batch 6 and fixed.

KGCS transitive reductions recorded in each EB entry's Curriculum Feedback (e.g.
conductors require `electric-potential` only; `gauss-law` is reached through it).

## Lesson-order remap (owner-approved 2026-10-04)

Lesson order is a concept's position in the KG, and `student_progress.currentLesson` /
`completedLessons` (and `lesson_bookmarks.lessonOrder`) store those numbers, so
inserting nodes shifts later lessons. `scripts/physics/remap-lesson-orders.ts --from
<old-ref>` recomputes old → new order from the two graphs (refusing if its recompute
disagrees with `getKnowledgeGraph()`), and prints one SQL transaction; it never touches
the database.

- Pre-deploy measurement (count-only): 778 physics `student_progress` rows, 359 holding
  an order the new graph moves; 0 physics bookmarks.
- Mapping: 238 → 262 lessons, 233 stored order numbers move; one-to-one, so the inverse
  mapping reverses it if ever needed.
- Run once, right after deploy `dpl_9vcHThWSho3RfmWbCbQXUxPfGPib` (commit `a646276d`)
  went READY (2026-10-04). Pre-check: no physics progress row written since
  2026-10-03 21:11, i.e. nothing recorded under the new numbering before the remap.
- Verified exactly against the expectation computed from the same mapping before the
  write: `currentLesson` sum 6823 → 8160 (expected 8160); `completedLessons` sum
  595 → 690 (expected 690); completed count 11 → 11; 778 rows; 0 bookmarks.

## Batches 7–8 landed on `main` (2026-10-04, `139a0b51`) — core tier complete

| Batch | Commit | Concepts |
|---|---|---|
| 7 | `ce893437` | series LCR circuit (requires `lc-circuits`), AC power, nuclear atom and alpha scattering (`bohr-model` re-pointed to it, `coulombs-law` edge reduced away), nucleus size and force |
| 8 | `139a0b51` | non-inertial frames (requires `relative-motion` + `circular-motion`), equation of continuity (`bernoulli` re-pointed to it, `pressure-fluids` edge reduced away), specific heats of gases |

Physics KG 262 → 269: all 31 core-tier concepts from the gap audit are now in the KG.
Validation per batch as above (batch 8: full suite 17606/17618, only the 3 pre-existing
cleanup timeouts; seed dry-run 13100 items, 0 duplicates; contract audit 269/269,
292/292 at 5 probes). Landed in one push with a second owner-approved remap
(`--from c765e335`): 262 → 269 lessons, 232 order numbers move (all from lesson 31 up),
147 of 778 physics progress rows affected.

Run once right after deploy `dpl_8bbvhwxs5qyAjagzZUonu9Lj43W3` (`139a0b51`) went READY.
Pre-check: no physics progress row written since 2026-10-03 21:11; state equal to the
end of the first remap. Verified exactly against the precomputed expectation:
`currentLesson` sum 8160 → 8311 (expected 8311); `completedLessons` sum 690 → 702
(expected 702); completed count 11 → 11; 778 rows; 0 bookmarks.

## Advanced tier, batches 9–12 landed on `main` (2026-10-04, `086b6a05`)

Started under the owner's "keep working". Scope: audit §B minus electronics
(transistors and logic gates stay excluded by owner rule) and minus special-purpose
diodes (held back as the owner's decision) — 13 concepts.

| Batch | Commit | Concepts |
|---|---|---|
| 9 | `4ba55739` | Earth–Moon–Sun system (`phys.astro.solar-system`), stellar properties, distance ladder, Hall effect |
| 10 | `2b64aff8` | lasers, radiation safety, communication systems, radiation and antennas |
| 11 | `c70738f7` | coupled oscillators, nonlinear dynamics and period doubling, fields in matter (+ `amperes-law`, KGCS P1), superconductivity (+ `resistivity`, KGCS P1) |
| 12 | `086b6a05` | equivalence principle and curved spacetime (`phys.rel.general-relativity-intro`, + `non-inertial-frames`, KGCS P1) |

Physics KG 269 → 282. Renames to stop cross-subject resolver captures: stellar
properties (not "magnitude", which is mathematics), nonlinear dynamics named "Nonlinear
Dynamics and Period Doubling" so "what is chaos?" in mathematics still resolves to
`math.de.chaos`. Batch 12 adds two physics-only resolver hits ("equivalence
principle", "curved spacetime"); "what is an equivalence relation?" and "what is
curvature?" in mathematics still resolve to their own concepts.

Batch 12 also rewrites five new descriptions as sentences: the GR one was over the
400-character limit for speakable prose (`blueprintSpineIsProse.test.ts`), and four
from batches 9–11 (coupled oscillators, radiation safety, Earth–Moon–Sun system,
distance ladder) used 2+ semicolons, which `remediationGrounding.readsAsProse` rejects
as syllabus outlines. Packages and the Tier A manifest are unaffected.

Validation for batch 12: `tsc` clean; seed dry-run 13191 items, 0 duplicates; contract
audit 282/282 concepts, 305/305 pairs at 5 probes; pinned + batch tests 397/397.

Known, pre-existing, not touched: `phys.qm.identical-particles` requires `phys.qm.spin`
but `spin` does not list it in `unlocks` (present before this campaign began).
Also pre-existing in the original 238 nodes, not touched: `phys.mech.stress-strain` and
`phys.stat.phase-transitions-critical-phenomena` have descriptions with 2+ semicolons,
which `remediationGrounding.readsAsProse` will not speak.

Landed in one push with a third owner-approved remap (`--from ed38b58e`): 269 → 282
lessons, 163 stored order numbers move (from lesson 107 up), 2 of 778 physics progress
rows affected. Run once right after deploy `dpl_HPRhM8ph2VfdLKu2LWNGdUxvowGj`
(`086b6a05`) went READY. Pre-check (twice, before and after READY): no physics progress
row written since 2026-10-03 21:11; state equal to the end of the second remap.
Verified exactly against the precomputed expectation: `currentLesson` sum 8311 → 8317
(expected 8317); `completedLessons` sum 702 → 712 (expected 712); completed count
11 → 11; 778 rows; 0 bookmarks.

## Batch 13 and audit §C enrichment (2026-10-04) — extension finished

Owner instruction: "Finish it". Scope applied: the last held advanced-tier node (special
diodes) plus all fifteen §C enrichments. Transistors and logic gates stay excluded by
the standing owner rule; the black-holes and stellar-evolution edges stay unchanged (no
added edge is strictly necessary, KGCS P1).

| Commit | Content |
|---|---|
| `39d1eaa9` | batch 13: `phys.mod.special-diodes` (Zener regulator, LED band gap, photodiode, solar cell); requires `diode-rectification` (I–V curve, KGCS P2 over `pn-junction`) and `ohms-law` (KGCS P1). No "LED" alias — it would match the English word "led". |
| `944bac5c` | §C: fifteen existing concepts each get one Core Understanding paragraph and one probe |

§C mechanics:
- **Probes** go only into an existing ladder (a new difficulty rung: nine) or a brand-new
  `true_false`/`short_answer` slot (six). None joins a singleton slot, which would
  re-identify a seeded row and trip the bootstrap's abandoned-slug guard (P-10). The
  legacy collision ratchet rises by exactly the nine rungs (645 → 654); the live resolver
  still maps every probe to a unique slug.
- **Paragraphs** carry no governing wording and no back-reference opener, so
  `packCoreUnderstanding` admits them only into spare budget and can never displace an
  already-exposed unit (checked before/after for all fifteen). Six are exposed to the
  tutor's authoritative channel (moment of inertia, stress–strain, pressure in fluids,
  Wheatstone bridge, resistivity, sound waves); nine sit in already-full entries and stay
  in the EB file only, with the probe carrying the topic into lessons.
- The bootstrap is create-only: the fifteen new probes reach production as new
  identities on the next cold start; the EB paragraphs ship with the deploy.
- `physicsCoverageEnrichment.test.ts` pins all of the above.

Physics KG: 283 concepts. The coverage audit is complete apart from the two
owner-excluded electronics nodes.

Landed on `main` at `944bac5c` (owner-approved), deploy `dpl_8FdbDG1ZJbHQgSqk6AqTVRhhQQSp`
READY. The lesson-order remap (`--from b7e4e01e`: lessons 215–282 shift by one) was **not
run, because it was a verified no-op**: before the push and again after READY, 0 of 779 physics
progress rows held any lesson ≥ 215 (highest `currentLesson` 177, highest completed 176),
0 bookmarks. Running it after deploy could only have mis-shifted a row written under the new
numbering. Cold-start bootstrap at 16:39 UTC created `phys.mod.special-diodes` (2 explanations,
5 probes) and exactly fifteen new probe identities on the fifteen §C concepts (one each), with
0 status changes to existing identities on those concepts — nothing orphaned.

### Live production QA (2026-10-04, after `944bac5c`)

Owner asked to validate on a named real account; logging in with the password pasted in chat
was blocked by the session's credential-safety classifier, so the same harness
(`scripts/qa/physicsOneConceptLive.ts`) ran on disposable `qa-*@mytutor-qa.invalid`
accounts, each deleted afterwards with re-login proven blocked. Every lesson: own figure
served on 3 turns, authored quizzes graded from the seed key, one deliberate wrong answer
corrected with its reason, verified mastery (check 1/1, practice 2/2), lesson complete.

| Concept | Lesson | Figure | Note |
|---|---|---|---|
| `phys.mod.special-diodes` | 215 | `phys-special-diodes` | all 5 authored probes served |
| `phys.rel.general-relativity-intro` | 243 | `phys-general-relativity` | misconception probe keeps its reasons (two "No —" heads would collide) — not a give-away |
| `phys.wave.coupled-oscillators` | 115 | `phys-coupled-oscillators` | |
| `phys.astro.stellar-properties` | 260 | `phys-hr-diagram` | |
| `phys.em.wheatstone-bridge` | 158 | existing | §C meter-bridge probe served, graded correct |
| `phys.therm.kinetic-theory` | 90 | existing | §C mean-free-path probe served, graded correct |
| `phys.mech.circular-motion` | 19 | existing | §C conical-pendulum probe served, graded correct |

DB check: all 20 new probe identities (5 + 15) have a `probe_assets` row with ≥ 2 choices.
Observed, pre-existing and unchanged: live chat turns write DRAFT ADULT `core_explanation`
rows (one per turn; not served), including from these QA sessions.

## Next

Physics KG is at 283 and the coverage audit is done. Only the electronics nodes
(transistors, logic gates) remain, excluded by owner rule. Any future node landing
needs its own remap run right after deploy.
