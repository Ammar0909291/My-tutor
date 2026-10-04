# Numeric fact-check — Step 3 production shadow, N1 + N2 (2026-10-04)

Shadow only. Nothing the learner sees changed. N3 not wired. Detector code unchanged during
observation (`factCheckNumeric.ts` as of `882e0db7`).

## 1. Deployment
- Commit `695a589b` (contains `882e0db7` checker and `6ca99a00` Step 2 evaluation), Vercel
  deployment `dpl_DSk6GuuY23C63ZtYcmCysrntcxjt`, READY 2026-10-04 ~22:59 UTC, production alias
  `my-tutor-flame.vercel.app`.
- `src/lib/teaching/factCheckNumericShadow.ts` imports only `checkArithmetic` (N1) and
  `checkRatioClaims` (N2). `checkAgainstAuthored` (N3) and `checkNumericClaims` are not reachable.
- Route: one block after the F1 fact-check, before the saved/returned reply; reads `servedText`,
  writes one `[numeric-fact-check]` log line. No DB call, no retry, no edit, no grading/mastery/
  progress/evidence path. `NUMERIC_FACT_CHECK_MODE=off` disables; no serve mode exists.
- Logged fields: detector, type, claimed, expected, reason, tutor sentence (≤240 chars),
  conceptId, timestamp, counts. No learner text, user/session id, or email.
- Pinned by `src/tests/factCheckNumericShadow.test.ts` (12 tests).

## 2. Evidence collected
Vercel keeps runtime logs only briefly, so two sources were used, both through the deployed
`numericShadowRecord` function:

A. **Live shadow** (deployed code, real requests): 34 served replies, 23:00–23:08 UTC — QA traffic
   from this and another session (chemistry + physics); 0 flags, 0 `skipped` errors.

B. **Production replay** (same function, offline, over stored production tutor replies):
   all ASSISTANT messages with a digit and an "=" or "N times more" phrase (49,809 replies total;
   22,330 with digits), split into sentences the way N1 splits them (line breaks, sentence ends),
   de-duplicated: **14,069 distinct sentences, 19,394 occurrences**; 257 distinct sentences from
   non-QA accounts. ~2.5 MB read once, no PII exported (QA/non-QA computed server-side as a
   boolean).

## 3–4. Statistics (replay, human-reviewed — `flag-review.json`)
| | N1 | N2 | combined |
|---|---|---|---|
| sentences checked | 13,809 | 260 | 14,069 |
| findings | 45 | 4 | 49 (46 sentences) |
| 1 real numerical error | 2 | 1 | 3 |
| 2 correct / false positive | 42 | 3 | 45 |
| 3 ambiguous / should have abstained | 0 | 0 | 0 |
| 4 insufficient evidence | 1 | 0 | 1 |
| **precision (1 / (1+2+3))** | **4.5 %** | **25 %** | **6.3 %** |

Non-QA accounts: 8 flagged sentences, all false positives.

## 5. Confirmed real errors (useful catches)
- `½(2)(3²) + ½(1)(2²) = 9 J` — sums to 11 J (N1).
- `λ ≈ 6.626 × 10⁻³⁴ ÷ (0.145 × 40) ≈ 1.1 × 10⁻³⁵ metres` — is 1.14 × 10⁻³⁴, off ×10 (N1).
- `A typical 1‑watt LED flashlight emits roughly 10⁹ times more photons` than a 5 mW laser —
  ratio 200 (N2; the phys.mod.lasers sentence that started this work).

## 6. False positives by cause (45)
| cause | count |
|---|---|
| LaTeX (`\times`, `\cdot`, `\tfrac`, `1\,652`, `72{,}000`) not read | 11 |
| list bullet "- " read as a minus sign | 9 |
| U+2011 non-breaking hyphen / en dash used as minus not read | 8 |
| algebra variable "x" in "2x − 4" read as multiplication | 6 |
| implicit product binds before the exponent (`(0.5)(4)^2`, `9π²`) | 3 |
| N2 window pairs quantities that do not determine the ratio (star luminosity needs radius; unrelated Gy values) | 3 |
| bare power of ten before a full stop ("10⁹.") not parsed | 2 |
| U+202F narrow no-break space before "%" | 2 |
| right-hand side "2(n−1)" cut to "2" | 1 |

All but the 3 N2 cases are input-format handling, not judgement. Step 2's 100 % came from authored
text, which uses none of these forms; the model's prose uses all of them.

## 7. Production impact
None observed: no `[numeric-fact-check] skipped` errors; the errors in the window are pre-existing
and unrelated (auth CredentialsSignin from QA logins, Resend test-mode limit,
visualizationCache unique constraint, asset bootstrap deadline). No DB calls added. Cost
p50 0.006 ms / p99 0.18 ms per reply.

## 8. N3
Completely inactive: not imported by the shadow module or the route block (test-pinned); no
`authored` finding appears in any record.

## 9. Learner-visible behaviour
Unchanged. Live: every raw reply received by a QA client in the phys.mod.lasers run (5/5) has a
log record identical to a local recomputation over the exact received text, so the text checked
is the text served; the block has no write path to the reply (test-pinned).

Controlled cases: A correct arithmetic, C correct ratio, E ambiguous, F symbolic — verified live
(abstained). B wrong arithmetic and D wrong ratio could not be provoked from the live tutor (it
corrected the learner's wrong sum in words); verified by tests on the deployed function. G — N3
inactive.

## 10. Recommendation: **B. NEEDS IMPROVEMENT**
Precision 6.3 % on real tutor output, against a 90 % bar — not a candidate for enforcement. The
shadow itself is harmless and can stay on (or be switched off with `NUMERIC_FACT_CHECK_MODE=off`,
owner-only Vercel env). Before any re-measurement, the input-format causes above would need to be
handled, and the production replay set — not the authored corpus — should become the precision
gate. No detector change was made during observation, as instructed.
