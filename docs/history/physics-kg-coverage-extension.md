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

## Next

The advanced tier (16 concepts, audit §B) is the owner's later call; electronics
(transistors, logic gates) stays excluded. Each future landing needs its own remap run
right after deploy.
