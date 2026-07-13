# Coverage Manifest

Live count of canonical KG concepts with authored Educational Brain entries.
Updated in the same commit as any entry added.

| Subject | KG concepts | Entries authored | Coverage |
|---|---|---|---|
| mathematics | 908 | 1 | `math.arith.fractions` |
| physics | 194 | 4 | `phys.meas.units`, `phys.meas.scalars-vectors`, `phys.meas.dimensions`, `phys.mech.newtons-first-law` |
| english | 216 | 1 | `eng.phonics.letter-sound-correspondence` |
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
  `phys.meas.units`, `phys.meas.scalars-vectors`, `phys.meas.dimensions` authored
  (topological order, measurement & units domain).
