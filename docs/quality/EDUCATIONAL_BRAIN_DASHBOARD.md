# Educational Brain Quality Dashboard

The design of the quality dashboards that let the team see, at a glance,
whether quality is holding as the Brain scales. This document specifies
what the dashboards show and how each figure is computed from the audits
— it is a reporting spec, not a live dashboard and not code. A future CI
job or review script can populate it; a reviewer can also fill it by
hand. Every figure traces to an audit in this directory.

---

## 1. Tiering — what Tier A / B / C mean here

Concepts are tiered by **strategic priority** (from
`concepts/COVERAGE.md`'s expansion protocol), not by score. The dashboard
reports quality *within* each tier so priority work is never masked by
volume of low-priority work.

| Tier | Definition (COVERAGE.md priority order) |
|---|---|
| **A** | Placement entry points + cut-nodes (highest `unlocks` fan-out) + misconception hubs. Every learner meets these; a weak one hurts most. |
| **B** | Floors directly supporting Tier A (prerequisite order). |
| **C** | Everything else, in prerequisite order. |

Tier is assigned from KG structure (entry node? cut-node? fan-out?), so
it is objective and stable.

---

## 2. The panels

### Panel 1 — Coverage by tier
```
             authored / total   FULL / SKELETON   A-band %
Tier A          {n}/{N}            {f}/{s}          {p}%
Tier B          {n}/{N}            {f}/{s}          {p}%
Tier C          {n}/{N}            {f}/{s}          {p}%
```
Source: `COVERAGE.md` counts + scorecard bands. "A-band %" = share of
authored entries in that tier scoring ≥ 90.

### Panel 2 — Validation failures (live)
```
Blueprints with ≥1 hard-gate FAIL:  {n}
  by gate: section-missing {n} · misconception-instrument {n} ·
           assessment-instrument {n} · birth-type-mislabel {n} ·
           action-corruption {n} · symbolic-first {n} · preemption {n}
```
Source: blueprint validation + each audit's hard gates. This panel should
trend to zero — a non-zero here means blueprints are entering review
structurally broken.

### Panel 3 — Missing sections heatmap
```
Section            entries missing it
Misconception      {n}   ← should be 0 (hard gate)
Assessment         {n}   ← should be 0 (hard gate)
Mental models      {n}
Discovery          {n}
Voice teaching     {n}
Transfer map       {n}
...
```
Source: Check V1. Instrument rows must read 0; prose rows may be non-zero
only by legitimate skeleton deferral (cross-checked against declared
class).

### Panel 4 — Blueprint maturity distribution
```
Band A (90–100)  ████████ {n}
Band B (75–89)   ████ {n}
Band C (60–74)   ██ {n}
Band D (<60)     █ {n}
Median score: {n}   Tier-A median: {n}
```
Source: scorecard. Watch the Tier-A median specifically — it is the
number that says whether the highest-impact concepts are staying at the
seed bar.

### Panel 5 — Instrument health (the moat panel)
```
Mean misconception score (0–10):        {n}
Blueprints passing AI-Removal (all 5):  {n}/{N}  ({p}%)
Blueprints with delayed-component gate: {n}/{N}
Unauthorized-residue ledger lines:      {n}  ← should be 0
Golden-probe coverage (misconceptions
   with a discriminating probe):        {p}%
```
Source: misconception + AI-removal + assessment audits. This is the panel
that most directly tracks "is the Brain accumulating retrievable
knowledge or a pile of prompts."

### Panel 6 — Consistency & drift
```
Teaching-action synonym-watchlist hits:  {n}  ← should be 0
Renamed/unknown actions:                 {n}
Repair-sequence-fidelity failures:       {n}
Universal-engine restatements (V30):     {n}  ← should be 0
Concept-generic lines (V31):             {n}  ← should be 0
```
Source: action-consistency + protocol-usage + validation V30/V31. Rising
numbers here are the earliest signal that quality is drifting as authoring
volume grows — the exact failure this QA layer exists to catch.

### Panel 7 — Educational Brain readiness
```
Accepted blueprints (passed ALL mandatory gates):  {n}
Tier-A concepts accepted:                          {n}/{N}
Subjects with ≥1 accepted entry:                   {n}/6
Overall EB quality score (mean of accepted):       {n}/100
Readiness statement: {narrative}
```
Source: production-acceptance checklist results. "Readiness" is a plain
sentence, e.g. "Mathematics Tier-A 60% accepted at median 91; English
entry nodes accepted; Physics not yet reviewed."

---

## 3. Refresh discipline

- Panels recompute on every accepted blueprint and every re-review.
- Panels 2, 5, 6 are the alarms — any regression in them is investigated
  before more blueprints are accepted (quality-before-coverage, the
  standing rule).
- The dashboard never blocks authoring — Pappu continues uninterrupted;
  the dashboard reflects state, it does not gate the authoring keyboard.
  Gating happens only at the acceptance door
  (`PRODUCTION_ACCEPTANCE_CHECKLIST.md`).

---

## 4. Single-number summary (top of dashboard)

```
EDUCATIONAL BRAIN QUALITY:  {overall}/100
  accepted {n} blueprints · Tier-A median {n} · 0 open hard-gate failures?  {Y/N}
```

The one-line health check: overall score, plus the two figures that
matter most at scale — the Tier-A median (are the important concepts
excellent?) and whether any accepted blueprint has an open hard-gate
failure (should always be N; a Y is a process breach).
