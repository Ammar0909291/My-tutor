# NUMERIC FACT-CHECK EXPERIMENT
## STATUS: CLOSED — NOT READY FOR ENFORCEMENT (owner decision, 2026-10-04)

| item | status |
|---|---|
| N1 arithmetic — enforcement | NOT APPROVED |
| N2 "N times more" — enforcement | NOT APPROVED |
| N3 authored-value conflict | NOT APPROVED (never wired) |
| production shadow | OFF — default `off`; runs only if `NUMERIC_FACT_CHECK_MODE=shadow` is set explicitly (not set in Vercel) |
| code, tests, reports, evidence | kept (Steps 1–3) |

**Conclusion.** The detector performed well on clean authored content but failed on free-form
production tutor prose. Production formatting and natural language caused substantial false
positives (precision 6.3 %: 3 real errors, 45 false positives in 19,394 checked sentence
occurrences). Therefore the current numeric parser is not trustworthy enough to influence
learner-visible responses.

**Positive finding.** The experiment demonstrated that genuine numerical errors exist in Tutor Max
replies — including the known laser ratio error ("10⁹ times more photons" for a power ratio of
200), a kinetic-energy sum stated as 9 J instead of 11 J, and a de Broglie wavelength off by a
factor of 10 — but the current detector cannot reliably distinguish those errors from normal LLM
mathematical prose.

**Lessons.**
1. A precision gate measured on authored text does not transfer to model prose: Step 2's 100 %
   became 6.3 % in production. Any future gate must be measured on real production replies.
2. The false positives were dominated by format (LaTeX, list bullets, Unicode minus signs,
   algebra variables), not by arithmetic judgement — free-form prose is the wrong input for a
   regex parser.
3. Shadow-first worked as intended: zero learner impact, negligible cost, decisive evidence.

**Not started:** no parser patch, no new Unicode/LaTeX handling, no new numeric-verification
architecture. Resume only on an explicit fresh owner instruction.

Evidence: `docs/qa/numeric-fact-check-step2/REPORT.md`, `docs/qa/numeric-fact-check-step3/REPORT.md`,
`flag-review.json`.
