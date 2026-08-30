# Chemistry visual coverage — the measurement

Requested by Session A, 2026-08-30: for every chemistry concept, does it have a
curated visual binding or scene generator, and if not, does production hold an
accepted generated figure? The cohort that is **uncurated AND has no accepted
figure** is where a learner who asks for a diagram gets nothing while they wait.

Read-only. `visualRegistry.ts` was not edited — it is Session A's file.

## Method, and the check that it is the same method

Registry coverage comes from calling the **real exported functions**
(`lookupConceptVisualBinding`, `getConceptSceneGenerator`) against every node of
the live chemistry KG, not from re-reading the table. Accepted figures come from
production `visual_generation_outcome`, counted per distinct `conceptId`.

Run against physics, this method reproduces Session A's two published physics
figures exactly — **74 dark, of which 23 already tried and declined**. That
agreement is the reason the chemistry numbers below are worth acting on.

## Chemistry — 186 concepts

| cohort | concepts | share |
|---|---|---|
| exact registry binding | 13 | 7% |
| covered only by a DOMAIN-PREFIX default | 22 | 12% |
| no registry binding at all | **151** | 81% |
| — of those, production holds an accepted figure | 57 | 31% |
| — **DARK: no binding and no accepted figure** | **94** | **51%** |
| — — already generated and never accepted | 19 | 10% |
| — — never attempted at all | 75 | 40% |

## Physics, same method, for comparison

| cohort | physics | chemistry |
|---|---|---|
| concepts | 238 | 186 |
| exact registry binding | 76 | 13 |
| domain-default only | 0 | 22 |
| DARK (no binding, no accepted figure) | 74 (31%) | **94 (51%)** |
| — tried and declined | 23 | 19 |
| — never attempted | 51 | 75 |

**Chemistry's visual gap is worse than physics in both absolute and relative
terms** — 94 dark concepts against 74, out of a corpus 22% smaller. Half of
chemistry has nothing to show a learner who asks.

## Three things in that table that are not just a bigger number

**1. The 19 tried-and-declined need authored content, not warming.** Generation
has already been attempted for these and the critic or the generator refused
every attempt, so re-running the cohort pass will produce nothing:

    chem.bio.nucleic-acids       chem.nitro.amino-acids
    chem.bond.mo-theory          chem.nitro.heterocycles
    chem.carb.named-reactions    chem.nitro.nitro-compounds
    chem.coord.nomenclature      chem.org.spectroscopy
    chem.dblock.organometallics  chem.pblock.group13
    chem.dblock.oxo-species      chem.pblock.group17
    chem.env.water-soil          chem.pblock.group18
    chem.equil.le-chatelier      chem.sblock.hydrogen
    chem.found.matter            chem.state.phase-diagram
    chem.found.measurement
    chem.found.pure-substances

`chem.org.spectroscopy` is on this list and is already recorded elsewhere as the
concept where the tutor narrated a phantom diagram. Note also `chem.found.matter`,
`chem.found.measurement` and `chem.found.pure-substances` — three of the first
concepts a chemistry learner meets, and a fourth of this list is `pblock` group
chemistry, which is taxonomy: `{"type":"none"}` is very likely the CORRECT answer
for several of them, and the honest fix is a curated binding or nothing, not a
retry.

**2. `chem.bond.mo-theory` appears in the declined list and NOT in the dark
cohort.** It carries a domain-prefix binding, so it is "curated" by the count
above while generation has separately failed on it. It is counted honestly here,
but it is worth a look: a concept whose only figure comes from a `chem.bond`
default is exactly the case the next point is about.

**3. The 22 domain-default-only concepts are their own risk class, and physics
has none.** `visualRegistry.ts`'s own comments record why physics removed its
broad domain defaults ("P2: eliminate broad domain-default dependence"): a
prefix default hands a learner a confidently WRONG figure rather than no figure,
and several of the comments name specific cases where it did. Chemistry still
resolves 22 concepts through a `chem.*` prefix. They are not dark, and they are
not necessarily right either. Not investigated further here — that is Session
A's file and its judgement.

## Numbers that did not reproduce

- The shared-facts table gives registry bindings as **phys 78/238**; measured
  through `lookupConceptVisualBinding` it is **76**. Two apart, cause not chased.
- The same table gives **chem 13/186**, which matches the count of *exact*
  bindings here. The 22 domain-default concepts are the difference between that
  13 and the 35 this file calls curated. Both are right about different things —
  worth naming which one a decision is being made on.
