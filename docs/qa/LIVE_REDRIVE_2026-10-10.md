# Live re-drive on production — 2026-10-10

Owner instruction: "run the live re-drive on production". Driven against `my-tutor-flame.vercel.app` with the
real-learner persona of `scripts/qa/chemDefectRedrive.ts` (13 messages per lesson: ok, a picture question, "too many
words", "give me example with numbers", "show me step by step", "quiz me", a wrong card answer, ok, "quiz me", a right
card answer, "explain simpler", "next question please", a card answer). Each subject ran on its own disposable
`qa-*@mytutor-qa.invalid` account, one lesson and one tab id at a time, 2.5 s between turns. Every account was deleted
afterwards (`{"deleted":true,"reloginBlocked":true}`); no real account was used and no password was handled.
Server-side behaviour was read from the production runtime logs (Vercel) of the same requests.

## Runs

| Run | Deploy | Lessons | Learner turns |
|---|---|---|---|
| Main pass — chemistry 18, biology 3, physics 3, mathematics 3, English 1 | `a9ef53d` → `2cda53c` (docs-only differences) | 28 | 360 |
| Verification of the first fixes — `phys.meas.units`, `math.alg.linear-equation-1var`, `chem.found.significant-figures` | `2139722` | 3 | 39 |
| Verification of the second fixes — `math.alg.linear-equation-1var`, `math.found.set`, `chem.found.significant-figures`, `chem.pblock.trends` | `864e3fd` | 4 | 52 |

Providers over 399 learner turns: groq 413 replies (incl. openings), memory 7, gate 10, **degraded 0** — the outage path
(CHEM-101/107, MATH-006, BIO-008) was not exercised.

## Verified in production

| Fix | Evidence |
|---|---|
| Only authored cards (CHEM-048, PHYS-020, MATH-002 …) | 70 distinct cards served across all 31 lessons; every stem is found verbatim in `src/lib/teaching/assets/*` (10 differed only by letter case from the first match pass). 0 replies carried lettered A)/B)/C) options (`proseOptions` flag 0/399). |
| Check pass (owner decision) | `[fact-check-pass]` logged on every chat turn and every lesson opening; `checked:true` on replies with numbers; one `fact-check-corrected` observed (`chem.equil.le-chatelier`). No reply was blanked or broken by it. |
| CHEM-013 / CHEM-095 curated figures | `chem.found.matter` served "Elements, Compounds and Mixtures"; `chem.bond.ionic-bonding` served "Ionic Bonding: One Electron Moves from Na to Cl". |
| CHEM-047 | `chem.state.real-gases`: "van der Waals" written correctly; 0 occurrences of "van Waals". |
| CHEM-034 | 0 "general illustration related to the topic" captions in 31 lessons. |
| CHEM-031 | 0 verdicts ("that's correct …") on a plain "ok" in 31 lessons. |
| The 7 converged cards | CHEM-043 (mayonnaise), CHEM-067 (0.025 kg), CHEM-070 (K and temperature), CHEM-072 (SiCl₄), CHEM-081 (cathodic protection) were served with the corrected text. CHEM-023 and CHEM-052 were not drawn in this run (their rows were read back 7/7 on 2026-10-10). |
| 2139722 fixes (step-by-step stub, confirm-back on "ok") | `phys.meas.units` re-driven on `2139722`: "show me step by step" → a numbered conversion; "ok" → the authored explanation instead of "…did I understand that correctly?". |

## Defects found by the re-drive and fixed

1. **A real step-by-step answer judged a stub** (`phys.meas.units`, production log `[teaching-floor] replaced:true stubChars:859`):
   `FRAGMENT_START_RE` matched a leading `*`, so a reply opening "**Step 1** …" was replaced by an authored paragraph
   with no steps. Fixed in `2139722`; verified live on `2139722`.
2. **The drift guard kept a retry that taught nothing** ("It sounds like you're ready to continue … did I understand
   that correctly?" — it named "unit"). The retry now needs ≥ 25 words and must not be a stub; confirm-backs count as
   stubs; a mid-lesson "ok" is owed teaching. Fixed in `2139722`; verified live.
3. **"explain simpler" with a card on screen → only a card lead-in** (`math.alg.linear-equation-1var`). Logs: the model
   replied "I see you got x = 5.5" plus two counter-questions; `[assembled-attach]` removed the questions beside the
   card. The teaching floor now runs on that turn and treats comfort-plus-questions as a stub. First fix in `2139722`
   did not cover it (re-drive on `2139722` still showed it); completed in `864e3fd` and **verified live**: "explain
   simpler" with a card on screen got a real simpler explanation in all 4 re-driven lessons.
4. **CHEM-082 still visible**: the approved sig-figs figure stores the FULL labels ("Check for trapped zeros between
   non-zero digits"; read-only query); `visualSemantics.ts` cut each label to 40 characters when describing the figure
   to the tutor, which then read out "Check for trapped zeros between". Now described whole (60). A process-flow label
   that genuinely stops mid-phrase is also refused on every re-validating tier. `864e3fd`, **verified live**: the tutor
   read out "Check for trapped zeros between non-zero digits"; 0 cut labels.
5. **Drift false positive on hyphenated anchors** (`chem.pblock.trends`): "Inert-pair" did not match "inert‑pair"
   (non-breaking hyphen). Anchors now split on hyphens. `864e3fd`, **verified live**: 0 drift flags in the re-driven lesson.

## Seen live, not fixed in this pass

> **Reconciled 2026-10-10 (final closure campaign, below).** These three behaviours were listed here as open while
> the ledgers carried no OPEN entry: CHEM-036/CHEM-117 read FIXED and CHEM-061 PARTIALLY FIXED, and BIO-024 PARTIALLY
> FIXED, although the re-drive had just seen each of them live. Their statuses are now set from production evidence
> (section "Final defect closure" below): CHEM-036, CHEM-117, CHEM-061 → PRODUCTION-VERIFIED; BIO-024 → OPEN. The text
> below is kept as it was recorded.


- **Picture question with no figure on screen** — 3 of 18 chemistry lessons (`chem.kinet.rate-law`,
  `chem.elect.corrosion`, `chem.org.arrow-pushing`): "I'm sorry you can't see the picture, so let me describe what it
  normally shows …" followed by an imagined figure. Mathematics answered the same message correctly ("There is no
  picture in this lesson yet, so let me say it in words"). Needs its own investigation (figure state vs the no-figure
  answer path).
- **"quiz me" without a card** — 3 of 62 "quiz me" turns (`phys.meas.units` twice, `chem.elect.batteries`): the gate
  declined at DEMONSTRATE (`no-gradeable-probe`, the below-guide surplus rule that keeps cards for the mastery check)
  and, with model cards no longer served, the reply is a worked example. Changing when the gate may spend a card is a
  teaching-policy decision for the owner.
- **Model facts without numbers** — e.g. the stickleback example again gave the female the red belly (BIO-024). The
  check pass only runs on replies with numbers, equations or worked examples (owner scope).
- **Harness note** — the `unkeyedCard` flag is a false positive: the client payload never carries `assetId` (it is
  stripped with the answer key by design); authored-ness was checked against the corpus instead. `noSteps` mostly
  flagged inline "1. … 2. …" steps written on one line.

## Final defect closure — 2026-10-10 (cf79346, 76c2edd)

Campaign: "TUTOR MAX FINAL DEFECT CLOSURE" then "FINAL PRODUCTION CLOSURE". Disposable `qa-*@mytutor-qa.invalid`
accounts only, one per run, every one deleted afterwards with re-login refused (11 accounts in total). No real account
and no password was used. Transcripts and the real /learn page screenshots are in `docs/qa/final-closure-2026-10-10/`;
full record in `docs/history/tutor-max-final-closure-2026-10-10.md`.

| Deploy | Commit | Role |
|---|---|---|
| dpl_9WRpYHVYG7wiAfoWfpKkS5CNcjYe | cf79346 | Issues A, B, C first deploy; re-driven (chemistry 5 lessons / 89 turns, biology 2 / 34) |
| dpl_BV8uceAYfB4Pu99ahYcMcpAuQQTb | 76c2edd | follow-up fixes; final re-drive (8 lessons / 141 turns, 5 subjects) + /learn browser runs |
| dpl_Fa3c1weGTWstXRH9YbWPdGywWFym | 82e3e89 | QA-harness one-line change only (same app code); took the alias at ~19:32 UTC, served the last 3 arrow-pushing turns |

### Results on 76c2edd

- **A — picture question, no figure:** 10 of 10 answered "There is no picture in this lesson yet … send it with the
  camera button … Here is the idea in words:" + authored teaching (rate-law ×1, corrosion ×3, linear-equation ×3,
  verbs ×3). Server log for every one: `[figure-evidence] figure-question available:false` → `no-figure-evidence-reply-replaced`.
  Real /learn page: `corrosion-01-no-figure-honest.png`.
- **A — figure genuinely shown:** 14 picture questions after a real figure (physics 3, biology 6, rate-law 2,
  arrow-pushing 3); 13 were answered about that figure, 1 was not (finding A-2 below). The cf79346 failure (rate-law: "I'm sorry you can't see a picture
  right now … a typical illustration … would show") is fixed: the reply is rebuilt from what the renderer drew
  (`figure-reply-grounded-to-shown-figure`, title "Determining Rate Law and Order via Initial-Rate Method").
  **Finding A-2, OPEN:** in the same lesson a later picture question got an imagined description phrased as an analogy
  ("the horizontal line shows … the vertical line shows … In the sketch …"), and a "show me a diagram" turn with no
  figure re-sent said "The boxes represent the concentrations of reactants A and B; the arrow shows …". The gate only
  rewrites a reply that denies the figure or describes a "typical" one; an imagined description that does neither
  passes. Proposed fix (not implemented): check every figure-pointing sentence against the figure's recorded caption
  and labels, not only replies to a picture question.
- **B — explicit quiz requests:** 56 requests ("quiz me", "ask me a question", "test my understanding", "give me a quiz")
  in 8 lessons: 53 authored cards (stems all found in `src/lib/teaching/assets/*`), 3 honest no-new-card lines, 0 silent.
  The repeated request re-offers the unanswered card with "This is the question you have not answered yet …"; a card
  coming back once under the owner's re-ask rule says "You have seen this question before in this lesson — here it is
  once more." Strict grading unchanged (wrong taps graded by the authored key: `corrosion-03-graded-tap.png`).
  Allocation is logged on every reserved spend (`quiz-request-spends-reserved-card`); 4 of the 6 spends logged left
  `leftForMasteryCheck` 0 or 1 — mastery then relies on the existing one re-ask of a question answered without credit
  (owner option (c), 2026-09-27). This is the cost of the campaign's product decision and is reported, not hidden.
- **C — grounded prose check:** production logs 19:15–19:36 UTC: 124 model-written replies logged, 34 checked against
  sources, 1 changed (an English sentence removed — "All three parts together tell us *when* the reviewing happened …" —
  probably a false positive), 90 out of scope, 0 timeouts/errors in that window (earlier, on cf79346: 1 timeout,
  1 unparseable, 1 error, each keeping the reply; 1 removal — "Sunlight provides eight photons that excite chlorophyll
  in Photosystem II." — borderline). **Finding C-1, OPEN (BIO-024):** "give me example" produced a great crested grebe
  courtship with an orange throat patch as the female's sign stimulus (`biology-01-give-me-example-grebe.png`); no
  source covers it and the checker passed it. The checker does not establish truth; it only removes or corrects what
  the lesson's own sources contradict or what it doubts.
- **Cross-subject:** physics `phys.meas.units` (formerly "quiz me" without a card) — 7 of 7 requests carded; maths
  `math.alg.linear-equation-1var` and English `eng.grammar.verbs` — every request carded, no-figure picture questions
  honest. One degraded (provider outage) turn in physics, card and figure kept.
- **Harness:** `unkeyedCard` replaced by `cardNotInCorpus` (0 in all runs). `quizSilent` fired 3× — all on the honest
  "every new practice question" line the harness regex did not yet know (fixed in 82e3e89). `picDescribe` fired 2× on
  cf79346 for arrow-pushing's own teaching about curved arrows (false positive).
- **Browser:** this Chromium build rejects the sandbox egress CA (ERR_CERT_AUTHORITY_INVALID even with the CA in NSS),
  so `scripts/qa/learnPageEvidence.ts` lets Playwright fetch app requests on the Node side (`route.fetch()`, certificate
  verified there) and hands them to the real page; no TLS check is disabled.
