# Educational Brain Scorecard — 100 Points

A single number for a blueprint's quality, composed from the audits in
this directory. The score is diagnostic (where to improve) and
comparative (are blueprints staying consistent at scale). It does NOT
replace the acceptance gates — a blueprint can score 90 and still be
rejected for failing one hard gate (see
`PRODUCTION_ACCEPTANCE_CHECKLIST.md`). Score and gates are orthogonal:
gates are pass/fail safety; the score is quality depth.

---

## 1. Weighting

Weighted toward the instrument sections that are the moat (validation/08:
misconceptions, assessment, AI-removal, determinism) and away from prose
(future-generatable). Prose still counts — a blueprint is not only its
instruments — but it cannot dominate.

| # | Category | Points | Source audit |
|---|---|---|---|
| 1 | Misconceptions | 20 | `MISCONCEPTION_QUALITY_AUDIT.md` |
| 2 | AI Removal | 15 | `AI_REMOVAL_AUDIT.md` |
| 3 | Assessment / Mastery Gate | 15 | Blueprint validation §Assessment + gate |
| 4 | Determinism | 10 | AI-removal residue ledger + probe self-sufficiency |
| 5 | Diagnostics (detection precision) | 8 | Misconception M-B + Assessment golden probes |
| 6 | Teaching Actions | 8 | `TEACHING_ACTION_CONSISTENCY.md` |
| 7 | Teaching Flow (mental model → discovery → dispatch coherence) | 7 | Validation §2/§3 + CPA live checks |
| 8 | CPA / concrete-first ordering | 5 | `CPA_COMPLIANCE_AUDIT.md` live checks |
| 9 | Reusability (references engines, nothing concept-generic, nothing duplicated) | 7 | Validation V30/V31 |
| 10 | Prose libraries (explanation/analogy/demonstration/voice/transfer) | 5 | Blueprint validation §2 (5–7,10,14) |
| **Total** | | **100** | |

---

## 2. How each category scores

**1 · Misconceptions (20).** Mean of per-misconception scores
(0–10 each, Misconception Quality Audit) × 2, capped at 20. Any
misconception with a MISLABELLED birth type caps this category at 0
(a corrupt instrument poisons the section).

**2 · AI Removal (15).** 3 points per passed removal probe (R1–R5). A
fully-authorized residue ledger is required to bank the last 0 — an
unauthorized residue line caps this category at 9 (three probes' worth)
regardless of probe passes.

**3 · Assessment / Mastery Gate (15).** 5 for concrete distractor-mapped
items; 5 for a gate set naming production/new-surface/mixed; 5 for a
delayed component (Principle 17). Missing the delayed component caps at 10.

**4 · Determinism (10).** How much of the turn-by-turn teaching is
retrieved vs. left to the renderer. 10 = only authorized residue remains;
subtract 2 per instrument decision still delegated to inference.

**5 · Diagnostics (8).** 4 from mean misconception M-B; 4 from presence
of golden probes in Assessment (a golden probe = correct model and
misconception give visibly different answers).

**6 · Teaching Actions (8).** Full marks when the consistency audit
returns CONSISTENT with concept-specific reasons; −2 per T-class FAIL.

**7 · Teaching Flow (7).** Coherence: mental-model stages, discovery
choice, and dispatch order tell one consistent teaching story with no
contradiction (e.g. dispatch doesn't lead abstract while the model says
concrete-first). Reviewer scores 0–7 against a 3-point rubric (models
ordered / discovery argued / dispatch consistent with both).

**8 · CPA (5).** Full marks when C1/C3/C5 PASS and C2/C4 are not FLAGged;
−1 per FLAG, −2.5 per live FAIL.

**9 · Reusability (7).** 4 for V30 (no engine restatement); 3 for V31
(nothing concept-generic). A blueprint that copies a universal engine or
contains paste-anywhere lines loses these — they are the anti-scale
failure this whole QA layer exists to prevent.

**10 · Prose (5).** 1 each for: ≥2 explanations by register; ranked
analogies with breaking points; ≥1 home-doable demonstration; voice
section describing concept-specific listening; transfer stated as
situations. (Deferrable to a skeleton — see §3.)

---

## 3. Entry-class adjustment

- **FULL entry**: scored across all 100 points.
- **INSTRUMENTED SKELETON**: category 10 (Prose, 5 pts) is excluded and
  the score is renormalized to 95 → 100. A skeleton is never penalized
  for deferring prose it legitimately deferred; it IS penalized (fully)
  on every instrument category. This makes a skeleton's score directly
  comparable to a full entry's on the parts that are the moat.

---

## 4. Bands

| Score | Band | Meaning |
|---|---|---|
| 90–100 | **A — production-grade** | Instruments strong, AI-removal clean; the seed-entry bar. |
| 75–89 | **B — acceptable with revision** | Sound but named weaknesses to close before acceptance. |
| 60–74 | **C — instrument gaps** | Teaches, but leans on the renderer in places; not yet moat. |
| < 60 | **D — not a blueprint yet** | A description or a prompt; revise substantially. |

The three seed entries (`math.arith.fractions`,
`phys.mech.newtons-first-law`,
`eng.phonics.letter-sound-correspondence`) define the A band by
construction (`COVERAGE.md`: "the three seed entries ARE the bar"). Any
new blueprint scoring below them on the instrument categories is not yet
at the bar, regardless of prose quality.

---

## 5. Output

```
SCORECARD: {kg-id}   CLASS: FULL|SKELETON
 1 Misconceptions      {n}/20
 2 AI Removal          {n}/15
 3 Assessment/Gate     {n}/15
 4 Determinism         {n}/10
 5 Diagnostics         {n}/8
 6 Teaching Actions    {n}/8
 7 Teaching Flow       {n}/7
 8 CPA                 {n}/5
 9 Reusability         {n}/7
10 Prose               {n}/5  (excluded for SKELETON, renormalized)
TOTAL: {n}/100   BAND: A|B|C|D
```
