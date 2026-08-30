# Probe inventory worklist — concepts whose pool cannot survive a wrong answer

Regenerate with:

    npx tsx scripts/assets/probe-depth-worklist.ts --csv docs/architecture/PROBE_INVENTORY_WORKLIST.csv

The CSV beside this file is that script's output. Every row is one
`(conceptId, gradeBand)` pair holding **fewer than five gradeable probes**, with
the number still needed.

## Why 3 is not enough

Mastery needs three graded correct answers (`correctAtCheck >= 1` plus
`correctAtPractice >= 2`) and the gate never re-asks a probe it has spent
(`excludeProbeStem`). At exactly 3 there is **zero slack**: one wrong answer and
the learner can no longer certify that concept, however well they answer
afterwards. `assetContract.ts` says so in its own header — three is "the minimum
that lets a PERFECT learner finish", and "deliberately NOT padded for a learner
who answers wrongly". The learner who needs remediation is precisely the learner
the concept then refuses to certify.

It also blocks an engine change. Keyed probes are barred below GUIDE because
spending one early would starve CHECK/PRACTICE — a constraint that binds **only**
at exactly 3. Concepts with 5+ can afford an early probe; these cannot.

## THE COUNT WAS WRONG, AND IT WAS WRONG IN THE UNSAFE DIRECTION

The first version of this file reported **209 pairs (physics 123, chemistry 86)**
at exactly three probes, from a `count(*)` over `asset_identity` rows.

That count includes probes a mastery gate **cannot grade**. `short_answer` and
`checkpoint` probes carry fewer than two choices, and correctness for free text
has no deterministic source — which is why `contract-audit.ts` has always
excluded them through its own `isGradeable`. Re-measured against production on
2026-08-30, joining `probe_assets` and requiring `jsonb_array_length(choices) >= 2`:

| gradeable probes at the pair | physics | chemistry |
|---|---|---|
| 3 | **235** | 86 |
| 4 | 22 | 72 |
| 5 | 3 | 27 |
| 6 | 1 | 1 |

So **257 physics pairs and 158 chemistry pairs are below five, not 123 and 86** —
roughly twice the shortfall the row count implied. `phys.wave.beats` HIGH is the
clean example: seven PROBE rows, three of them gradeable. It never appeared on
the old list because seven is not three.

This is the same class of error the old list itself warned about — a total that
looks healthy while the pool the learner actually meets is at the floor — one
level further in. The unit is not the concept, and it is not the row: it is
**gradeable probes per (concept, gradeBand)**.

An earlier correction, kept because it is still true: counting per CONCEPT rather
than per (concept, gradeBand) missed concepts holding 3 at MIDDLE and 3 at ADULT,
which reads as 6 and looks healthy while BOTH bands are at the minimum.
`physicsBandGapAssets.ts` was written after exactly that mistake, when 21 pairs
turned out to be taught with ZERO gradeable probes at the band being served.

## Corpus versus database

`probe-depth-worklist.ts` and `contract-audit.ts` read the **seed corpus on
disk**; the tables above are the **production database**. They disagree, and both
numbers are right about different things:

- production can hold rows the corpus does not (older seed generations,
  AI_AUTHORED live capture), so a pair at target in the corpus is at or above
  target in production — never below;
- the corpus is what an authoring batch changes, and the cold-start bootstrap in
  `src/instrumentation.ts` converges production onto it.

Authoring therefore works from the corpus figure, which is the conservative one.

## The target

Every pair to **>= 5 gradeable probes at the band shown**. The band matters:
`matcher.ts` scores an adjacent band at 60 against a threshold of 65, so an
off-band probe is REFUSED, not merely ranked lower. Author at the band in the
CSV, not the one that seems natural.

Check progress with either of:

    npx tsx scripts/assets/contract-audit.ts --min 5 --subject physics
    npx tsx scripts/assets/probe-depth-worklist.ts

## One trap that is invisible from inside the file that springs it

`buildProbeSlugResolver` appends a difficulty segment ONLY to a
`(conceptId, probeKind, gradeBand)` slot holding more than one probe. So adding
a second probe to a slot that currently holds exactly **one** re-identifies the
probe already seeded there. The old row stays ACTIVE under the old slug, and the
same question is then served under two identities: **the count rises while the
number of distinct questions falls.**

Add into a slot that is already a ladder, or open a brand-new slot. Never convert
an existing singleton. `src/tests/probeInventoryDepth.test.ts` asserts this
against the whole corpus.

## Progress

| batch | what | pairs to 5 | probes |
|---|---|---|---|
| 1 | physics MIDDLE + ADULT — units, scalars/vectors, velocity, displacement, acceleration, force, Newton I/II/III, momentum, impulse, power, kinematics, kinetic energy, Hooke's Law | 23 | 46 |
| 2 | the eight HIGH concepts measured one answer short | 8 | 14 |
| 3 | phys.therm @ HIGH — all sixteen | 16 | 30 |
| 4 | phys.wave @ HIGH — all sixteen | 16 | 32 |
| 5 | phys.mech @ HIGH — first seventeen | 17 | 26 |
| 6 | phys.mech @ HIGH — second seventeen | 17 | 23 |
| 7 | phys.mech @ HIGH — last seventeen | 17 | 27 |
| 8 | phys.mech @ HIGH — six slot-constrained pairs | 6 | 12 |
| 9 | phys.em @ HIGH — first seventeen | 17 | 34 |
| 10 | phys.em @ HIGH — last seventeen | 17 | 34 |
| 11 | phys.mod @ HIGH — all nineteen | 19 | 25 |
| **total** | | **173** | **303** |

**Domains at zero pairs short at HIGH:** phys.mech, phys.em, phys.therm,
phys.wave, phys.mod.

**Remaining in the corpus:** physics 84 pairs / 127 probes, chemistry 158
pairs / 244 probes. The physics figure is 77 at HIGH plus 7 at
UNDERGRADUATE; HIGH breaks down as qm 16, particle 16, stat 14, opt 14,
rel 7, meas 5, astro 4, plus one slot-constrained pair.

Regenerate the table above from `git log --oneline --grep "probe depth"`;
regenerate the CSV with the command at the top of this file.
