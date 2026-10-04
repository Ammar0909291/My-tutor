# Numeric fact-check — Step 2 offline measurement (2026-10-04)

Offline only. Nothing is wired; production behaviour unchanged. Detector under test:
`src/lib/teaching/factCheckNumeric.ts` at commit `882e0db7` (unchanged by this step).

Reproduce: `npx tsx scripts/qa/numericFactCheckEval.ts --write`
(uses exactly the Step 1 generators; adversarial set in `scripts/qa/numericFactCheckAdversarial.ts`).

Files: `clean-corpus.json` (3,799 strings, id/file/conceptId/text), `corrupted-corpus.json`
(113 cases, original/corrupted/values/flags), `miss-classification.json` (all 43 misses),
`results.json` (summary, every flag, adversarial results).

Note on provenance: the Step 1 corruption generator drew from physics + chemistry + **biology**
strings containing "=", while the clean set is physics + chemistry only. Both are kept exactly as
Step 1 ran them.

## 1. Clean corpus (N1 + N2; N3 needs authored context)
- strings 3,799 · flags 0 · false positives 0

N3 proxy (leave-one-out: each clean string vs the other clean strings of its concept, 421
concepts): 8 flags, **8 false positives** (below).

## 2. Corrupted corpus
| | count |
|---|---|
| total | 113 |
| caught | 70 (65 flag the corrupted value; 5 flag the equation's stated result because the literal replace hit an input) |
| correctly abstained (A) | 26 |
| invalid (C) | 6 (5 missed + 1 caught: `f5286628f4`, malformed "1.373.6") |
| objectively verifiable errors | 81 |
| caught (verifiable) | 69 |
| false negatives (B) | 12 |
| **recall** | **69 / 81 = 85.2 %** |

## 3. Precision (share of emitted flags that are real errors)
| detector | flags | real | precision |
|---|---|---|---|
| N1 + N2 (clean 0, corrupted 70, adversarial 8) | 78 | 78 | **100.0 %** |
| N3 (adversarial 3, leave-one-out 8) | 11 | 1 | **9.1 %** |
| all three combined | 89 | 79 | 88.8 % |

## 4. False negatives (12, all N1)
| id | text | cause |
|---|---|---|
| 46c02948fd | (1 + 1 + 2)/3 = 5.48/3 | right-hand side is an expression |
| 489afd9c4c | (1/2)³ = 1.37/8 | right-hand side is an expression |
| afe6319b69 | 8 × 1/8 + 6 × 1/2 = 1.37 + 3 = 4 | RHS expression; then 4.37 vs "4" inside the integer half-digit tolerance |
| 4f863c2e90 | 3 bonding pairs + 1 lone pair = 5.48 | count nouns treated as possible variables |
| f8802b4d94 | 10²³: (3.011 × 10²³)/(6.022 × 10²³) = 0.685 | ':' (punctuation) triggers the variable/function abstain rule |
| 58c5b56f72 | (… mol = 0.2 × 0.5L = 0.137) | unbalanced ')' after the result |
| d497af853f | (0.2 × 500 = 137) | unbalanced ')' after the result |
| c128d5c6a2 | 40g/40 g/mol = 1.37 mol | glued unit before '/' not parsed |
| cb74b5e065 | sqrt(32/2) = 5.48 | spelled 'sqrt' abstains (only √ evaluated) |
| 143f1fb30f | 3d (4+0=5.48 vs 3+2=5) | orbital label 'd' before '(' triggers function abstain |
| cf1ddbd812 | 8 corners × 1/8 = 1.37 | count noun treated as possible variable |
| 67f769c195 | 10 (Ni) + 8 (4 × CO) = 24.7 | parenthetical labels contain words |

Two are plain parser bugs (`f8802b4d94` punctuation, `58c5b56f72`/`d497af853f` trailing ')');
the rest are deliberate abstentions or scope limits. Not changed: the safety bar is met by N1/N2,
and the task forbids changing the detector only to raise recall.

## 5. False positives
Clean corpus (N1/N2): none.

N3, all 10 (8 leave-one-out + 2 adversarial):
| case | cause |
|---|---|
| chem.found.concentration 58.5 g ↔ 40 g (×2) | two different worked examples sharing only generic context (1 L, counted twice) |
| phys.mech.velocity 40 m vs 20 m; 4 s vs 8 s | same scenario, different leg: one unit in two roles |
| phys.mech.impulse 0.2 kg vs 0.4 kg (×2) | "0.4 kg m/s" parsed as kg (space-separated compound unit) + different role |
| phys.mech.impulse 0.5 kg vs 0.2 kg | different scenario with the two speeds swapped |
| phys.mech.work −29.4 J vs 29.4 J | gravity's work vs your work — sign/role |
| adversarial auth-new-scenario (18 V, 2 A) ×2 | new scenario that shares 2 inputs is read as the authored setup |

Root cause, common to all: sharing ≥2 quantities does not establish "same setup" — N3 cannot tell
a changed input (new scenario) from a changed result (error). That is a contract-level limit, not a
small defect.

## 6. Adversarial set (38 cases)
35 pass, 3 fail:
- `pct-wrong` (60/80 = 80 %) — missed: "80" read as possibly rounded to tens (±6.25 %) → FN
- `pendulum-wrong` (0.25 m vs 1 m, "40 times faster") — missed: within ×2.5 of the allowed
  ratio 4³ = 64 → FN
- `auth-new-scenario` — N3 false positive (2 flags)

Every abstain-expected case for N1/N2 (symbolic, variables, trig, definitions, ambiguous
language, single-quantity ratios) abstained.

## 7. Verdict
READY FOR STEP 3 SHADOW for **N1 + N2 only** (100 % precision on 78 flags, 0 clean false
positives, recall 85.2 %). Call `checkNumericClaims(prose)` without authored context; with an
empty `authored` list N3 returns nothing, so no code change is needed.

N3 is **NOT READY** (9.1 % precision): it must stay out of the shadow until it is redesigned to
know which quantity is the authored result, which needs an owner decision.
