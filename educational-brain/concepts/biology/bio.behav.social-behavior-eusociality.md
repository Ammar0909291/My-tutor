# bio.behav.social-behavior-eusociality — Social Behaviour and Eusociality

## Identity
- **Concept ID**: `bio.behav.social-behavior-eusociality`
- **Subject**: Biology
- **Domain**: Behaviour (`bio.behav`)
- **Prerequisites**: `bio.behav.mating-systems-sexual-selection`
- **Unlocks**: `bio.behav.kin-selection-altruism`
- **Cross-links (KG)**: (none)
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.78
- **Estimated hours**: 5

## Learning Objective
The student can correctly weigh the SPECIFIC costs (resource competition, predation
risk from conspicuousness, disease transmission) against the SPECIFIC benefits
(cooperative defence, information sharing) of group living to explain why it is
NEITHER universally beneficial nor universally costly, and correctly identify the
THREE defining features of eusociality (reproductive division of labour, overlapping
generations, cooperative brood care) as jointly necessary, rather than treating "living
in groups" and "eusocial" as the same thing.

## Core Understanding
Group living carries BOTH costs and benefits, and whether a species evolves toward
group living depends on the specific BALANCE between them for that species' ecology —
group living is not a strategy that is simply "better," it is a trade-off. The
**costs** include increased **resource competition** (more individuals sharing the
same local food, mates, and nesting sites) and increased **predation risk** from
CONSPICUOUSNESS (a group is easier for a predator to detect than a lone individual,
even though each individual's per-capita risk of being the one caught may fall). The
**benefits** include **cooperative defence** (a group can detect and repel predators
more effectively than individuals alone — many eyes watching, coordinated
mobbing/alarm response) and **information sharing** (about food location, predator
presence, or environmental conditions, spreading through the group faster than any
individual could discover alone). A species' typical group size and structure reflects
where this specific cost-benefit balance settles for its particular ecological
circumstances.

**Dominance hierarchies** are a behavioural MECHANISM that has evolved specifically to
resolve REPEATED resource conflicts within a group without the excessive cost of
re-fighting over every single contested resource. Once a hierarchy (rank order) is
established — often through an initial period of contest — lower-ranked individuals
typically DEFER to higher-ranked ones without renewed physical conflict, which reduces
the CUMULATIVE cost of competition compared to unresolved fighting every time a
resource conflict arises; the hierarchy is best understood as a cost-REDUCING
mechanism for managing recurring competition within group living, not as a separate
phenomenon unrelated to the costs/benefits framework above.

**Eusociality** is the most extreme form of social organisation and is defined by
THREE features that must ALL be present TOGETHER — no single feature alone qualifies a
species as eusocial. First, **reproductive division of labour**: only a small subset
of individuals (typically one or a few queens) reproduce, while the majority (workers)
do not reproduce directly but instead contribute to the colony's overall reproductive
success indirectly. Second, **overlapping generations**: offspring remain in the natal
colony/nest and coexist with their parents, rather than each generation dispersing
immediately. Third, **cooperative brood care**: individuals other than the direct
parents (workers) participate in caring for offspring that are not their own. This
extreme reproductive specialisation, seen in social insects (ants, many bees, termites)
and a small number of other taxa, represents the most extreme resolution of the
group-living cost-benefit trade-off — where an individual's own direct reproduction is
almost entirely forgone in favour of contributing to the reproductive success of close
relatives within the colony.

## Mental Models
- **The two-column ledger for group living**: costs (resource competition, predation
  conspicuousness) in one column, benefits (cooperative defence, information sharing)
  in the other — a species' group size reflects where the ledger balances for its
  specific ecology.
- **The three-legged-stool model for eusociality**: reproductive division of labour,
  overlapping generations, and cooperative brood care are three legs that must ALL be
  present — remove any one leg and the definition of eusociality does not hold.

## Why Students Fail
- They treat group living as simply "beneficial" (safety in numbers) without weighing
  the specific costs (competition, conspicuousness to predators) that group living
  also imposes.
- They treat dominance hierarchies as an isolated behavioural curiosity rather than as
  a mechanism that specifically reduces the cumulative cost of REPEATED resource
  conflict within group living.
- They equate "living in a group" with "eusocial," missing that eusociality requires
  ALL THREE specific defining features together, not merely group living itself.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts` or `biologyDepthSeedAssets.ts` (confirmed via direct grep before
authoring): this concept is one of the 91 added by the 2026-09-14 KG extension and
currently has zero authored explanations or probes of any kind. Both misconceptions
below are therefore authored directly from first principles using the birth-taxonomy
diagnostic procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), and are
NOT tied to any existing seed-corpus probe — there is none to cite.

### M1 — "Group living is simply beneficial (safety in numbers)" (Type 1: Overgeneralization)
**Statement**: Living in a group is treated as a straightforwardly beneficial strategy
("safety in numbers"), without weighing the specific COSTS (resource competition,
increased conspicuousness to predators) that group living also imposes.
**Origin**: Overgeneralizing from the correct partial observation that groups can
defend cooperatively against predators to the incorrect general claim that grouping is
simply advantageous overall, without separately tracking that grouping also
CONCENTRATES resource competition and makes the group more DETECTABLE.
**Why it persists**: Without an explicit statement of the SPECIFIC costs alongside the
benefits, "more individuals means more safety" can seem like the complete picture.
**Repair**: State explicitly that group living carries BOTH costs (resource
competition among more individuals; increased predation risk from conspicuousness) and
benefits (cooperative defence; information sharing); a species' actual group size
reflects where this specific trade-off balances for its ecology, not a one-directional
"more is better" logic.
**Verification-of-death**: given a scenario describing a resource-scarce environment
where cooperative defence provides little benefit (few predators), the learner
correctly predicts that group living would be LESS favoured there, citing the
cost-benefit balance rather than defaulting to "grouping is generally good."

### M2 — "Any group-living species with overlapping generations is eusocial" (Type 1: Overgeneralization)
**Statement**: A species that lives in groups with overlapping generations (offspring
remaining with parents) is assumed to qualify as "eusocial," without checking whether
reproductive division of labour and cooperative brood care by non-parents are ALSO
present.
**Origin**: Overgeneralizing from one genuinely necessary feature of eusociality
(overlapping generations) to the incorrect inference that this single feature is
SUFFICIENT on its own, without separately tracking that all three defining features
must be present TOGETHER.
**Why it persists**: Without an explicit checklist of ALL THREE required features,
one prominent, easily-observed feature (family groups staying together) can seem to
capture the whole definition.
**Repair**: State the three-feature definition explicitly and require ALL THREE to be
verified: reproductive division of labour (most individuals do not reproduce
directly), overlapping generations (offspring remain with parents), and cooperative
brood care (non-parents help raise young) — a species missing even one of these three
does not qualify as eusocial, however social its behaviour otherwise appears.
**Verification-of-death**: given a description of a group-living species with
overlapping generations but WITHOUT reproductive division of labour (most individuals
do reproduce), the learner correctly concludes the species is NOT eusocial, citing the
missing specific feature.

## Analogies
- The two-column ledger model for group-living costs/benefits (see Mental Models):
  balancing competition and predation-conspicuousness against cooperative defence and
  information sharing.
- The three-legged-stool model for eusociality's three required features (see Mental
  Models): remove any leg and the stool (the definition) falls.
- The union-dues-vs-strike-fund model for dominance hierarchies: accepting a lower
  rank without a fight is like paying a small recurring "due" (deference) instead of
  paying the much larger cost of a full "strike" (repeated physical conflict) every
  time a resource is contested.

## Demonstrations
- Present the resource-scarce, few-predator environment scenario and ask the student
  to predict whether group living would be favoured, weighing the specific costs and
  benefits.
- Present the missing-reproductive-division-of-labour species description and ask the
  student to determine whether it qualifies as eusocial, checking all three required
  features explicitly.

## Discovery Questions
- "If living in a group only had benefits and no costs, would every species on Earth
  live in the largest possible group? What might stop them?"
- "A troop of primates lives in family groups across generations, but almost every
  adult reproduces. Is this eusocial? What's missing?"
- "Why might a dominance hierarchy actually SAVE a group energy compared to having no
  hierarchy at all?"

## Teaching Sequence
1. Introduce the costs and benefits of group living side by side, directly correcting
   the group-living-is-simply-beneficial misconception using the resource-scarce/
   few-predator scenario.
2. Introduce dominance hierarchies as a cost-reducing mechanism for resolving repeated
   resource conflict, connecting it back to the cost side of the ledger.
3. Introduce eusociality's three required defining features together as a checklist,
   directly correcting the overlapping-generations-alone-is-sufficient misconception
   using the missing-reproductive-division-of-labour scenario.
4. Close by connecting eusociality back to the group-living cost-benefit framework as
   its most extreme resolution.

## Tutor Actions
- If a student treats group living as simply beneficial: ask them to name a specific
  cost of grouping alongside its benefits.
- If a student calls a species eusocial based on one feature alone: ask them to check
  all three required features explicitly before concluding.
- If a student treats dominance hierarchies as unrelated to group-living costs: ask
  them what would happen to the group's total energy expenditure without a hierarchy.

## Voice Teaching Notes
Say "costs AND benefits, which side wins here?" whenever group living is discussed, to
keep the trade-off framing explicit. Say "check all three" whenever eusociality is
discussed, to keep the three-feature checklist active.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can
be given yet (see Runtime Asset References). The general diagnostic principle for M2,
once probes exist: a learner who checks all three required features before concluding
eusociality shows the repaired model; a learner who concludes eusociality from
overlapping generations alone is showing M2 in its cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, present the resource-scarce/few-predator scenario and ask the student to
predict the outcome BEFORE revealing the answer, deriving the cost-benefit-balance
conclusion from the prediction task itself. For M2, present the missing-feature
species description and require the student to check each of the three features
explicitly, rather than accepting an unspecific "it's very social" answer.

## Memory Hooks
- "Grouping has a price tag as well as a payoff — weigh both sides."
- "A hierarchy is cheaper than fighting every time."
- "Eusocial needs all three: who reproduces, who stays, who helps raise the young."

## Transfer Connections
- `bio.behav.mating-systems-sexual-selection` (prerequisite): supplies the
  reproductive-strategy framework this concept extends into group-level reproductive
  division of labour.
- `bio.behav.kin-selection-altruism` (unlocks): applies the reproductive
  division-of-labour concept introduced here to the genetic-relatedness explanation
  for why non-reproducing workers evolve at all.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.behav.mating-systems-sexual-selection` and
`bio.behav.foraging-behavior`.

## Runtime Asset References
No seed content of any kind exists for this concept in `biologySeedAssets.ts` or
`biologyDepthSeedAssets.ts` — this is one of the 91 concepts added by the 2026-09-14 KG
extension. This EB entry is authored entirely from first principles and does not cite
any runtime asset. Seeding `core_explanation`/`misconception_repair`/`mcq`/
`misconception_probe` content for this concept, and a probe-depth `short_answer` to
reach the 3-probe contract floor, remain outstanding tasks for whichever future
initiative seeds content for the 91-concept KG-extension pool (a separate, larger,
not-yet-started task per the standing note in `CLAUDE.md`'s Biology program section).

## Curriculum Feedback
The KG description's named sub-topics (costs and benefits of group living — resource
competition and predation risk versus cooperative defence and information sharing;
dominance hierarchies for resolving repeated resource conflicts; eusociality's three
defining features) are all covered in this EB entry directly from first principles,
since no seed content exists to check against. No additional Curriculum Feedback gap
is recorded for this entry.

## Version History
- 2026-09-21: Initial authoring (forty-seventh recomputed topological frontier, batch
  of 3 with `bio.neuro.learning-memory-neurobiology` and
  `bio.eco.population-growth-models-quantitative`, all first-principles entries — a
  THIRTEENTH consecutive fully zero-seed-content batch, 0 of 21 frontier candidates),
  EB concept 156/199.
