# Coverage Manifest

Live count of canonical KG concepts with authored Educational Brain entries.
Updated in the same commit as any entry added.

| Subject | KG concepts | Entries authored | Coverage |
|---|---|---|---|
| mathematics | 908 | 1 | `math.arith.fractions` |
| physics | 216 | 1 | `phys.mech.newtons-first-law` |
| english | 216 | 2 | `eng.phonics.letter-sound-correspondence`, `eng.phonics.phonemic-awareness` |
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
- **Delivery 14** (2026-07-10): `eng.phonics.phonemic-awareness` — English's
  true zero-prerequisite entry node (`requires: []`), authored ahead of file
  order per this manifest's own expansion protocol priority 1 ("placement
  entry points first," above cut-nodes and misconception hubs — all 3
  Delivery 5 seed entries are cut-nodes/misconception hubs, not entry
  points). This is the exact node `../first-lesson/07 §1` names as the
  origin of the platform's own documented English-lesson-one failure.
  Applied the newly-authored `../misconceptions/01-birth-taxonomy.md §7`
  diagnostic procedure to a concept for the first time since that
  taxonomy was written, surfacing 3 new misconceptions (language
  contamination on the word "sound" itself; syllable/phoneme-counting
  overgeneralization; rhyme-only "same sound" from rhyme-first
  instruction) as a validation stress-test of Deliveries 11–13's generic
  engines against genuinely new content. `eng.phonics.print-concepts`
  (the KG's other zero-prerequisite entry node) remains the next
  highest-priority gap per this same protocol — not authored this
  delivery, recorded as the immediate next coverage item.
