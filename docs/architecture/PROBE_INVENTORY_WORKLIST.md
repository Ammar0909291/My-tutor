# Probe inventory worklist — concepts at the bare mastery minimum

Generated from production, 2026-08-30. **209 (concept, gradeBand) pairs hold
EXACTLY 3 ACTIVE closed-choice probes** — physics 123, chemistry 86.

**A correction, recorded because the wrong number was quoted first.** An earlier
count said "188 concepts". That grouped by CONCEPT, so it summed probes across
bands and missed a concept holding 3 at MIDDLE and 3 at ADULT — which reads as
6 and looks healthy while BOTH bands are actually at the minimum. Counting per
(concept, gradeBand) gives 209, and that is the unit a learner meets:
`physicsBandGapAssets.ts` was written after exactly this mistake, when 21 pairs
turned out to be taught with ZERO gradeable probes at the band being served
while the per-concept total looked fine.

## Why 3 is not enough

Mastery needs three graded correct answers (`correctAtCheck >= 1` plus
`correctAtPractice >= 2`) and the gate never re-asks a spent probe
(`excludeProbeStem`). At exactly 3 there is **zero slack**: one wrong answer and
the learner can no longer certify that concept, however well they answer
afterwards. `assetContract.ts` says so in its own header — three is "the minimum
that lets a PERFECT learner finish", and "deliberately NOT padded for a learner
who answers wrongly".

It also blocks an engine change. Keyed probes are barred below GUIDE because
spending one early would starve CHECK/PRACTICE — a constraint that binds **only**
at exactly 3. Concepts with 5+ can afford an early probe; these cannot. Lifting
them to 5 unblocks that change across the whole corpus.

## The target

Every pair below to **>= 5 ACTIVE closed-choice probes at the band shown**.
The band matters: physics previously had 21 pairs taught with ZERO gradeable
probes because every probe was authored at HIGH while the learner was taught at
MIDDLE or ADULT. Author at the band in this list, not the one that seems
natural.

## Spread

| subject | band | pairs |
|---|---|---|
| physics | HIGH | 95 |
| physics | MIDDLE | 11 |
| physics | ADULT | 10 |
| physics | UNDERGRADUATE | 7 |
| chemistry | HIGH | 67 |
| chemistry | UNDERGRADUATE | 19 |

Note the physics MIDDLE/ADULT rows: they are the first concepts a learner ever
meets — units, velocity, acceleration, force, all three of Newton's laws,
momentum, impulse, power. Those 21 pairs are the highest-value work in the list.

## Regenerate this list

    SELECT split_part("conceptId",'.',1) AS subj, "conceptId",
           "gradeBand"::text AS band, count(*) AS probes
    FROM asset_identity
    WHERE family::text='PROBE' AND status::text='ACTIVE'
    GROUP BY 1,2,3 HAVING count(*) = 3;

## The list

    subject,conceptId,gradeBand,currentProbes
(see `PROBE_INVENTORY_WORKLIST.csv` beside this file — 209 rows)
