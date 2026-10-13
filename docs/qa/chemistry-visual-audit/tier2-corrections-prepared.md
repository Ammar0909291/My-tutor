# Tier 2 (approved) figures — corrections PREPARED, NOT EXECUTED

Two chemistry figures are **approved Tier 2 rows** (`visual_assets`, `status = ACTIVE`, created 2026-08-10 — see `tier23-snapshot/tier2-active.json`).
The Chemistry visual closure read both against sources (record: `prose-figure-review.json`, entries `tier2:*`) and found them correct in outline but
imprecise. Editing an approved row is a production write and the owner's call, so nothing here was applied; the figures stay served and stay
`REVIEW_REQUIRED` in `semantic-review.json`. The Tier 0 path is not a substitute: a Tier 0 scene for either concept would shadow the approved row and
change which concepts the test-suite treats as having no authored figure.

## `chem.found.significant-figures` — "Determining Significant Figures in a Measurement"

| step now | proposed |
|---|---|
| Identify all non-zero digits | Count every non-zero digit |
| Check for trapped zeros between non-zero digits | Count zeros between non-zero digits |
| Evaluate leading zeros as never significant | Never count leading zeros |
| Determine trailing zeros based on decimal presence | Count trailing zeros only if the number has a decimal point; for a whole number such as 1400 write 1.4 × 10³ or 1.40 × 10³ to show the intended count |

Also worth one line on the figure: counted and defined numbers (6 atoms, 12 inches = 1 foot) are exact and never limit a result.

## `chem.found.stoichiometry` — "Stoichiometric Calculation Steps"

| step now | proposed |
|---|---|
| Balance the chemical equation | Balance the chemical equation |
| Convert given mass to moles | Convert each given mass to moles (n = m ÷ M) |
| Apply molar mole ratios | Use the mole ratio from the coefficients to find moles of product; with more than one reactant given, the one that makes less product is limiting |
| Calculate theoretical and percent yield | Convert moles of product to grams = theoretical yield; percent yield = (actual yield ÷ theoretical yield) × 100, using the yield measured in the experiment |

## How an owner would apply it
Approved rows are versioned assets; the supported path is the asset-approval flow (new version, same `conceptId`), not an in-place `UPDATE`. If the owner
prefers a read-only decision: retiring either row is *not* recommended — both are inert-to-mildly-imprecise, never harmful, and the semantic-moat doctrine
keeps inert figures.
