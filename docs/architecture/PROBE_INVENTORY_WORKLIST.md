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

**THE CAMPAIGN IS COMPLETE.** Every physics and chemistry
`(concept, gradeBand)` pair — 261 physics and 186 chemistry, across every band
— now holds at least five gradeable probes. The CSV beside this file is empty,
which is the intended terminal state: it lists pairs below five, and there are
none.

Confirmed by `contract-audit.ts` at both the floor and the target:

| subject | concepts | pairs | at contract | short | never quizzable |
|---|---|---|---|---|---|
| chemistry | 186 | 186 | 186 | 0 | 0 |
| physics | 238 | 261 | 261 | 0 | 0 |

Identical output for `--min 3` (the contract floor) and `--min 5` (this
campaign's target), which is what "complete" means here: not merely at the
contract, but with two answers of slack above it.

### Physics — 430 probes, 257 pairs, sixteen batches

| batch | scope | pairs | probes |
|---|---|---|---|
| 1 | physics MIDDLE + ADULT | 23 | 46 |
| 2 | the eight HIGH concepts measured one answer short | 8 | 14 |
| 3 | phys.therm @ HIGH | 16 | 30 |
| 4 | phys.wave @ HIGH | 16 | 32 |
| 5–8 | phys.mech @ HIGH (four batches) | 57 | 88 |
| 9–10 | phys.em @ HIGH (two batches) | 34 | 68 |
| 11 | phys.mod @ HIGH | 19 | 25 |
| 12 | phys.opt @ HIGH | 14 | 25 |
| 13 | phys.qm @ HIGH | 16 | 23 |
| 14 | phys.particle @ HIGH | 16 | 32 |
| 15 | astro, meas, rel, stat @ HIGH | 31 | 40 |
| 16 | physics UNDERGRADUATE | 7 | 7 |
| **total** | | **257** | **430** |

### Chemistry — 244 probes, 158 distinct pairs, eight batches

| batch | scope | pairs touched | probes |
|---|---|---|---|
| 1 | anal, atomic, bio, carb @ HIGH | 20 | 31 |
| 2 | bond, carb, dblock, elect, env @ HIGH | 22 | 33 |
| 3 | equil, found, hal, hyd @ HIGH | 22 | 28 |
| 4 | hyd, kinet, nitro, org, pblock, period @ HIGH | 24 | 36 |
| 5 | poly, redox, sblock, sol @ HIGH | 20 | 35 |
| 6 | state, surface, thermo, solid @ HIGH | 16 | 28 |
| 7 | UNDERGRADUATE — organic, coordination, d-block | 16 | 26 |
| 8 | UNDERGRADUATE — kinetics, p-block, solid state, thermo | 18 | 27 |
| **total** | | **158 distinct** | **244** |

The per-batch "pairs touched" column sums to 158 rather than more, because no
pair was revisited across batches — each was lifted to five in one pass.

### The structural obstacle chemistry had and physics did not

Physics could put almost every addition into a free difficulty rung of an mcq
slot that was ALREADY a ladder. Chemistry could not: its seed template gave each
concept exactly one probe of each kind, so measured across all 186 concepts,
**every `(conceptId, probeKind, gradeBand)` slot was a singleton and there was
not one ladder in the subject.** Adding to any of them would have sprung the
trap described above — 158 duplicate serves.

So every chemistry probe here opens a brand-new `numeric` or `fill_blank` slot,
which has no existing row to orphan. That those kinds are still SERVED was
verified rather than assumed: `teachingActionRepository` filters candidates with
`probeToMcq` itself, and `probeToMcq` never reads the kind.

### What the guard caught before commit

`src/tests/probeInventoryDepth.test.ts` grew to 43 tests across the campaign. It
asserts the structural invariants corpus-wide (no singleton converted to a
ladder, no duplicate canonical identity, no repeated stem within a concept,
exactly one keyed answer, `validateProbeCandidate` clean) and re-derives the
arithmetic of every quantitative probe rather than reading the answer key back.

Four content defects were caught by it and fixed before commit, none of which a
structural check would have found:

- an 11-rule distractor that was a valid alternative method;
- a cube-Euler distractor that was the octahedron's count and evaluated
  correctly;
- a molar-volume source comment claiming 24.0 dm³ is the value at 298 K — RT/P
  at 298.15 K is 24.46 dm³, and the school figure of 24.0 is RTP at 293 K. The
  stem and answer key were right; the reasoning shipped beside them was not;
- two ambiguous test fragments, each caught by the `find` helper refusing to
  match two probes — the second time because a later batch's dopant stem also
  said "Group 15".

Three test failures in the same period were the ASSERTIONS being wrong, not the
content. Recorded so a future session does not "fix" correct prose.

### One known defect, out of scope

The corpus-wide duplicate-stem check reports exactly 1, in
`math.arith.exponent-rules`. It is pre-existing, it is mathematics, and it is
outside this campaign's file ownership. It needs a mathematics-owning session.

### Production convergence — measured 2026-08-31, not assumed

The corpus is at target; **production is not there yet, and this is the number
any run measuring this work must check first.** Measured directly against
production, joining `probe_assets` and requiring `jsonb_array_length(choices) >= 2`
over ACTIVE PROBE identities:

| subject | pairs | at >= 5 | at exactly 4 | at exactly 3 |
|---|---|---|---|---|
| physics | 261 | 196 | 65 | **0** |
| chemistry | 186 | 168 | 9 | **9** |

Two things follow, and they point in opposite directions:

- **The dangerous floor is nearly gone in production already.** No physics pair
  is at 3, and the nine chemistry pairs still at 3 are exactly chunk 8's
  concepts, committed minutes before this measurement. The 74 pairs at 4 are
  earlier chunks partway through.
- **83 pairs are still below five in production**, so a run today would measure
  a pool the corpus no longer describes.

The bootstrap IS running, not stalled — 647 of the 674 authored probes had
landed within 30 hours of the first batch (283 in one hour, 229 in the next).
Convergence is a matter of cold starts, not of a defect. Re-run the query above
before attributing any change in verified mastery to this campaign.

### Nothing here reaches a learner yet

All of it is DRAFT in the seed corpus. Production converges by the cold-start
bootstrap in `src/instrumentation.ts`, which is gradual — a freshly authored
concept is not servable the moment it is committed. Promotion through
`PATCH /api/admin/knowledge-assets` remains human and deliberately so.

Regenerate this table from `git log --oneline --grep "probe depth"`; regenerate
the CSV with the command at the top of this file.
