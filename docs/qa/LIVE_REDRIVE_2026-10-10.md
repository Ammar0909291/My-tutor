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
  **Finding A-2 (fixed later the same day — see "A-2 and C-1 closure" below):** in the same lesson a later picture question got an imagined description phrased as an analogy
  ("the horizontal line shows … the vertical line shows … In the sketch …"), and a "show me a diagram" turn with no
  figure re-sent said "The boxes represent the concentrations of reactants A and B; the arrow shows …". The gate only
  rewrites a reply that denies the figure or describes a "typical" one; an imagined description that does neither
  passes. Fixed in 9a0cee7a/f32eeb04/3e7bdcc4 by checking every figure-pointing sentence against the figure's evidence.
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
  in Photosystem II." — borderline). **Finding C-1 (BIO-024; qualified from 9a0cee7a on — see "A-2 and C-1 closure" below):** "give me example" produced a great crested grebe
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

## A-2 and C-1 closure — 9a0cee7a → f32eeb04 → 3e7bdcc4 (2026-10-10, owner "Go fix all")

Each round: fix, gates (tsc, ESLint, full vitest, `next build`), push to `main`, Vercel READY on
`my-tutor-flame.vercel.app`, re-drive on disposable `qa-*@mytutor-qa.invalid` accounts (every one deleted, re-login
refused), production logs pulled inside the 1-hour retention window. Transcripts and /learn evidence:
`docs/qa/final-closure-2026-10-10/redrive-9a0cee7a-*.txt`, `redrive-f32eeb04-*.txt`, `biology-f32eeb04-*`.

- **A-2 fix (9a0cee7a).** Every model-written reply that points at an AVAILABLE figure (picture question or not) is
  checked sentence by sentence against the figure's own evidence (`figureReference.checkFigureClaims`): imagined
  structure (axes, "the horizontal line", "in the sketch"), a quoted/bolded label the figure does not carry, and a
  "the box/arrow … represents/shows" claim that shares no words with the figure are removed; a picture question then
  opens with what the figure shows. Production 9a0cee7a: rate-law picture questions answered from the drawn figure
  (`figure-reply-grounded-to-shown-figure` ×2); 2 removals, both false positives (a bolded "grey arrow" on the
  photosynthesis figure; a "**Question:**" lead-in).
- **Precision (f32eeb04).** Evidence includes what a scene DRAWS (arrows, line stubs, flow-chart boxes); questions,
  bolded part descriptions, "sketch" as a verb and "says" without a figure subject are not label claims. Production
  f32eeb04: 15 picture questions with a figure available, 1 without (honest reply); 1 removal, borderline (an analogy
  explaining the photosynthesis arrow: "the baker can't start without the ingredients from the solar oven"). New miss
  found: a rate-law picture answer mapped the boxes wrongly ("the first box represents the reactants, the second shows
  their concentrations … the final box represents the products") and passed on word overlap.
- **Ordinal claims (3e7bdcc4).** Evidence keeps the figure's steps in order; "the N-th box/step is X" must share a
  word with step N. Offline sweep over 474 production replies (76c2edd, 9a0cee7a, f32eeb04): 5 sentences removed, all
  imagined (the three rate-law axis/sketch sentences, the "concentration-to-exponent boxes", the wrong box mapping).
- **C-1 fix (9a0cee7a).** The prose checker must quote its source for "supported"; a real-world example is never
  "not_factual". When ≥ 2 confident sentences are not covered by the lesson's sources, the reply says: "The details of
  this example are not in your lesson materials, so treat them as an illustration of the idea, not as facts to learn."
  Nothing is invented or rewritten. Production 9a0cee7a: the stickleback error recurred ("the bright red belly of the
  female") and was qualified; 11 qualified turns logged, most of them not examples (figure walkthroughs, a quiz turn).
- **Scope (f32eeb04, 3e7bdcc4).** The note is added only when the learner asked for an example or the reply opens with
  one, never on a picture question; it is placed right after the paragraph with the first uncovered sentence (on
  /learn a long reply folds under "Read more", and on f32eeb04 the note was below the fold while the claim was above
  it: `biology-f32eeb04-01-give-me-example-qualified.png`). Against the 9 notes production added, the new rule keeps
  only the "give me example" one.
- **Limit (stated, not hidden).** C-1 qualifies; it does not correct. No authored biology source mentions
  sticklebacks, so the wrong sign stimulus can only be labelled as not lesson fact. Correcting it needs authored text
  (a content decision for the owner).
- **Production on 3e7bdcc4 (dpl_HcnzWw9p4K4LrjimuzsLpkqYu3uU, 21:33–21:43 UTC).** Chemistry (rate-law, arrow-pushing),
  biology (innate behaviour, photosynthesis), physics (units) over the API, and the real /learn page for biology; 4
  disposable accounts, all deleted, re-login refused. Picture questions: 17 with a figure available, 1 without
  (honest no-figure reply); rate-law denial answered from the drawn figure (`figure-reply-grounded-to-shown-figure`);
  1 removal, the analogy opener "Think of the picture like a two-room kitchen." (rest of the reply kept). Prose check:
  2 turns qualified, both "give me example" in biology (bowerbird over the API; stickleback on /learn, note shown
  directly under the claim, above "Read more": `biology-3e7bdcc4-01-give-me-example-note-above-fold.png`); turns with
  2–9 uncovered sentences that were not examples (physics, rate-law, picture and quiz turns) carried no note. Seen in
  passing (older behaviour, not changed here): the prose check removed one accurate figure-mapping sentence on the
  innate concept ("That whole, pre-programmed routine is the fixed action pattern on the right side of the figure").

## Targeted factual defect closure — 2026-10-11 (d10f8a09 → aa804e11)

Baseline: `main` = `origin/main` = c10fb7c8, production dpl_9ijTyDfsFwbAcBFZvjrQjm7S9FTo READY on c10fb7c8, no
concurrent commits. Gates on aa804e11's tree: `tsc --noEmit` 0; ESLint (changed files) 0; vitest 919 files, 18,811
passed, 9 skipped; `npm run build` 0. Deploys: d10f8a09 → dpl_6CxuUEHXwRAcQM67sw1DuYEDfbtP; aa804e11 →
dpl_3o4JWGbVmmTUNoJgLZYErrhZj6vA (READY, alias my-tutor-flame.vercel.app). 8 disposable accounts across both
rounds, all deleted, re-login refused. Evidence: `docs/qa/factual-closure-2026-10-11/`.

- **BIO-024 — PRODUCTION-VERIFIED.** Not required by the lesson objective (no KG, EB or seed text mentions
  sticklebacks), so no example was added. On an example turn a checker-tagged named real-world claim the sources do not
  support makes the reply the lesson's own authored example (rotating, then an honest repeat line). Production
  aa804e11: the model wrote "a female with a bright red belly" again; logs show `namedAction: replaced`; the /learn page
  showed only authored examples. Details: BIOLOGY_REAL_LEARNER_DEFECTS.md, BIO-024.
- **Innate-behaviour false positive — FIXED-TESTED-NOT-PRODUCTION-VERIFIED.** Original (3e7bdcc4, learner "explain
  simpler"): sentence 8 of a birthday-cake analogy, "That whole, pre‑programmed routine is the **fixed action pattern** on
  the right side of the figure (the courtship display, nest‑building example).", removed with `rejected:
  ["ungrounded-correction-8"]` — the checker called it "contradicted" but could not ground a correction, and that rule
  turned the unverifiable contradiction into a removal. The full original reply is reconstructed from
  `redrive-3e7bdcc4-bio.txt` plus the logged sentence (no provider key in this environment, so the checker call could
  not be replayed). Narrowest fix: inside an analogy passage (paragraph or sentence opening "Think of / Imagine /
  Picture / Now picture / Pretend", or "it's/this is/that's like") an unverifiable contradiction keeps the sentence and
  counts it as uncovered (`analogy-kept-N`); the checker prompt says an analogy and its mapping onto the idea or figure
  are "not_factual". Unchanged: doubted unsupported claims are removed, contradictions outside an analogy are removed,
  named claims inside one are not shielded (paired tests). Production: across 7 "explain simpler" turns on d10f8a09 and
  aa804e11 the prose check removed no analogy sentence (smoke alarm, wedding, morning routine, kitchen timer, traffic
  light — all kept), but the exact trigger (an ungrounded "contradicted" verdict on an analogy) did not recur, so the
  new rule path itself is verified by tests only.
- **Regression checks.** A-2/C-1 suites (105 tests) unchanged and passing; chemistry rate-law and physics units closure
  personas on d10f8a09 clean (no picImagined/picDescribe/quizSilent, no false notes). One A-2 removal on aa804e11 was
  the existing analogy-opener rule ("Let's think of the picture like two everyday safety devices."; rest kept).
- **New finding (not fixed, outside this brief): A-2 false positives on graph figures in other production traffic.**
  d10f8a09 logs (region cle1, not this campaign's accounts): accurate descriptions of real graphs removed —
  `math.arith.square-roots` ("The horizontal line is the **x‑axis** …", "Look at the curve on your screen …",
  `keptModelText: false` once) and `phys.mech.stress-strain` ("Blue line labeled “slope = E”", "elastic limit",
  "plastic"). Those figures' evidence (3 and 10 labels) carries no axis/curve words, so STRUCTURE_RE claims fail. Present
  since 9a0cee7a, not caused by this change; the brief forbids reopening A-2 without a regression from the new change.
  Proposed fix: add graph primitives (axes, curve, grid, plotted labels) to `evidenceFromPayload` for graph/function
  figure types, with these production sentences as regression tests.

## A-2 graph-figure false positives — 2026-10-11 (31bafe03 → a60b6397)

Baseline: `main` = `origin/main` = 9fee6594, clean; production dpl_3o4JWGbVmmTUNoJgLZYErrhZj6vA READY on aa804e11
(the 9fee659 docs-only deploy failed with Vercel `git_info_fail` before any build step; the alias never moved to it).
Evidence: `docs/qa/graph-figure-fix-2026-10-11/` (per-round /learn screenshots and evidence JSON, API transcripts).

**Original failures** (d10f8a09, other learners' traffic, region cle1): accurate descriptions of real graphs were removed
— `math.arith.square-roots` ("The horizontal line is the **x‑axis**…", "Look at the curve…", "The grid behind the curve…",
`keptModelText: false` once) and `phys.mech.stress-strain` ("this arrow points to the vertical axis", "**Blue line labeled
“slope = E”** – the straight, initial part of the curve", "the “stress = force / area” label"). The square-roots figure is
the stored graph spec `{type: graph, title: "Square root function", xLabel: "x (unitless)", yLabel: "√x (unitless)",
equation: "x^0.5"}` (production `visual_assets`, read-only query); stress-strain is the authored scene.

**Root cause.** `figureReference.evidenceFromPayload` recorded only written labels; nothing said a figure HAS axes, a
curve or a grid, so every "x-axis / curve / grid" sentence failed the structure check. Found during verification: the
rendered-reality copy of the evidence (`route.ts`, used for questions about a figure shown earlier) cut each entry at
120 characters, so the `drawn:` list lost "x-axis, y-axis"; and the picture answer read that list out to learners as
"words written on it" (visible since f32eeb04).

**Changes** (`src/lib/teaching/figureReference.ts`; one call site in `route.ts`):
- evidence from what the renderers draw — graph specs (GraphRenderer): both axes, grid, tick numbers, the curve
  (points on a count axis), the equation; scenes: two arrows from one origin (one horizontal, one vertical) = axes,
  a non-straight path = curve, segments = straight lines, nodes = marked points;
- `evidenceForLog`: the stored copy keeps the `drawn:` list whole; `figureEvidenceAnswer` never lists it as words;
- label check: a quoted label inside bold is judged on its own and bold beside a quoted label is emphasis; question
  terms are not labels; a label restated in words passes only if all its (≥2) content words are in ONE label or stage
  text; spacing around operators and subscript notation (T_c = T(c) = \(T_c\) = T₍c₎) are normalised; a bracketed
  gloss "(the “radicand”)" is a term, not a label;
- new: what a slope MEANS must be stated by a label or stage text mentioning the slope ("Young's modulus" kept;
  "the breaking stress", "yield strength" removed); wording words and possessive owners are not part of the meaning;
  "the slope is labelled …" is left to the label check;
- strictness gap closed during verification: the part-explanation check also covers a bare/bulleted start and counts
  only written labels and stage text as meaning ("Grey arrows run along the curve to show the direction of increasing
  load" — removed again).

**Tests.** `src/tests/graphFigureEvidence20261011.test.ts` (33: every logged production sentence from d10f8a09,
31bafe03, 16888708, 34faa394, f6a1170c and 1d41551f as positives; negatives — invented axis label, slope label on the
square-root graph, bars, wrong slope meanings, invented labels, wrong paraphrase, wrong subscript value/symbol, a wrong
label beside bold emphasis, a figure with no evidence, a scene without axes, arrows that are not axes); 
`src/tests/graphFigureEvidenceRoute20261011.test.ts` (2, real route: accurate square-root reply kept; an invented axis
label in the same reply removed). One A-2 pin updated (the node's "marked point" is now also expected). Offline sweep
over 893 saved production replies: 5 removals — exactly the known imagined rate-law claims — plus 1 sentence from a
no-figure lesson that production never checks. Final gates on a60b6397: `tsc` 0; ESLint 0; vitest 921 files, 18,846
passed, 9 skipped; `npm run build` 0.

**Deploys and production rounds** (disposable accounts, 34 in total, every one deleted, re-login refused):
| Commit | Deploy | What the /learn page and logs showed |
|---|---|---|
| 31bafe03 | dpl_3Wv3TSsT7sBLwZdxgiNRfWjRMuJv | still removed (stored copy truncated); `drawn:` read out to learners |
| 16888708 | dpl_2evzdbPjsBXxDZX6a3mr7ZHPBH5P | graph sentences kept on the page; superconductivity labels with T(c) removed (other traffic); a fabricated "grey arrows … direction of increasing load" kept |
| 34faa394 | dpl_5CPuXb9CHdhtbdXJfwpcm5CHBkVz | two removals: possessive in a slope meaning; bracketed “radicand” |
| f6a1170c | dpl_5brwxgxGATJLho6qvgA6SohU7yUG | one removal: one-letter quote “E” inside bold |
| 1d41551f | dpl_9hRdS51DEWBuH8cGZCGVLDjBP5SC | two removals: "its slope is labelled “slope = E”" |
| a60b6397 | dpl_71dU1dxV1ogXrzyd55dmssXAjwKr | 13 graph picture questions: no accurate sentence removed; only removal the existing analogy opener ("Think of the picture as a map…", rest kept); no `drawn:` text |

**Status.**
- Case A (square roots) and Case B (stress-strain) false positives — **PRODUCTION-VERIFIED** on a60b6397: the real
  /learn pages show "The horizontal line is the **x‑axis**…", "The vertical line is the **y‑axis**…", "the curved line …
  graph of y = √x", "the label **“slope = E”**; this slope is Young's modulus", and the logs record no removal of them.
- Third graph found on the way (`phys.mod.superconductivity`, label "R = 0 below T_c = 7.2 K") — **PRODUCTION-VERIFIED**
  on a60b6397 (labels written T(c) / T c kept on the page).
- Strict rejection of unsupported graph claims — **FIXED-TESTED-NOT-PRODUCTION-VERIFIED**: proven by the negative unit
  and route tests; no fabricated graph claim occurred naturally in the final round (the only production removal there
  was the existing analogy-opener rule).
  → superseded the same day: **PRODUCTION-VERIFIED** by the controlled negative runs below.
- `drawn:` read out as figure text — **PRODUCTION-VERIFIED** fixed (absent from every page and transcript since 34faa394).

**Limits.** Each production round surfaced new phrasings; the rules cover every phrasing seen in 893 replies, not every
possible one. A one-letter label claim ("the vertical axis is labeled **y**" when the axis name is "√x (unitless)") is
not checked — single characters were already skipped before this change. The harness flag `picImaginedParts` keys on
"the horizontal line" and fires on accurate descriptions of real axes (2 per square-roots run); it is a harness
heuristic, not a product defect.

### Controlled negative verification and one-letter labels — 2026-10-11 (f7630937 → 4db74a61)

**Method.** No production hook can script the tutor's reply (only a model/provider override for flagged accounts), so
the negative case was driven through the real /learn page: a disposable learner asks the tutor to repeat a false figure
sentence verbatim while the graph is on screen, plus a true control sentence. Each case counts only when the server log
shows the model wrote the sentence and the gate's decision. 11 disposable accounts across four runs (2 + 3 + 3 + 3), all deleted,
re-login refused. Evidence: `docs/qa/graph-figure-fix-2026-10-11/negative-*`.

| Deploy | Rejected by the deployed gate (model wrote it; log `unsupported-figure-claims-removed`) | Controls kept | Found |
|---|---|---|---|
| f7630937 dpl_vZHQoqVrKi4oUxNRGHKsrzBxGQpo | "The x-axis on the graph is labelled “time (s)”."; "The bars on the graph show how big each square root is."; "On the graph, the slope of the straight line shows the breaking stress of the wire." | "… the slope of the straight line is Young's modulus E." | control "On the graph, the horizontal line is the x-axis and the curve shows y = √x." REMOVED — part rule judged the whole sentence |
| ae3ef570 dpl_75zSMkTjzucDoRnQoJ4Bnz3V9GFU | same three again | x-axis/curve control now kept; Young's modulus; axis labels | the model's correction "Actually, the blue line on the graph is labelled “slope = E”, not “yield point”." REMOVED — denied quote read as a label |
| 3cd4398f dpl_EAB48Y9GN4S4gy82udkgnSr38xuD | "time (s)"; "bars" | all controls; the "not “yield point”" correction | description "… relates **stress (F / A)** … to **strain (ΔL / L)** …" REMOVED — brackets |
| 4db74a61 dpl_BDeZYgVKbUakrECxTGrvK3iTKUiR | "time (s)"; "bars" (the only two removals logged) | all controls, the correction and the bracketed description | — |

Fixes from these runs: a part claim is judged on the words after its verb (ae3ef570); a quote after not / never /
rather than / instead of is not a label claim (3cd4398f); brackets are ignored in label matching, on both sides
(4db74a61). Each has unit tests with negative controls. Final gates on 4db74a61: tsc 0; ESLint 0; vitest 921 files,
18,854 passed, 9 skipped; build 0; sweep over 946 saved replies unchanged (5 known imagined claims + 1 no-figure
artifact). The model refused or corrected some prompts itself ("room temperature", "breaking stress" on 4db74a61) and
twice a turn was answered from authored content; those turns are not counted.

**Status.** Rejection of an invented graph label ("time (s)", "yield point"), an absent feature ("bars") and a wrong
slope meaning ("breaking stress") — **PRODUCTION-VERIFIED** (f7630937, ae3ef570; label/feature again on 3cd4398f and
4db74a61). "yield strength" was never exercised (both attempts answered from authored content) — covered by unit tests only.

**One-letter labels — investigated, left unchanged (documented).** Every single-character label claim in the saved
production evidence (15 pattern matches → 9 real) is on `math.arith.square-roots`: "the horizontal axis is labeled
**x**" (rendered axis name "x (unitless)" — accurate) and "the vertical axis is labeled **y**" / “y” / \(y\) (6
distinct sentences; rendered axis name "√x (unitless)" — the label text is wrong, the meaning is right: the curve is
y = √x and each sentence goes on to say the axis shows √x; see `negative-f7630937-pageM-02.png`, where the tutor says
"labelled **y** (the root)" above an axis reading "√x (unitless)"). The checker can only REMOVE a sentence; removing
these would delete correct teaching ("The vertical axis is labeled **y**; it shows the output √x for each x."), which is
worse for the learner than the wording slip. Judged low severity; not a removal case. If it is to be addressed, the
lever is the wording (the axis is named √x), not this checker.

**Other limit (pinned by a test, not a regression).** A wrong part meaning that shares one word with the figure's
text passes: "On the graph, the horizontal line shows the time the wire was stretched for." ("wire" is in the stage
text). The old whole-sentence rule kept it too; an axis-meaning rule would be new scope and no production turn has
shown it.

### Invented "yield strength" slope claim — final negative case, 2026-10-11 (f41ed6e2) — **NOT EXERCISED**

**Baseline.** main = origin/main = `f41ed6e2` (docs only on top of `4db74a61`, the last A-2 code change); production
`dpl_GoottAqJiHPzwm14Z4X3x4gZiAVK` (READY, serving my-tutor-flame.vercel.app). Existing unit tests
(`graphFigureEvidence20261011.test.ts`, Case B): "In the figure, the slope of the plastic curve represents the yield
strength." and "On the graph, the slope is labelled **“yield strength”**." → REMOVED; "labelled “plastic”, rather than
“yield strength”" → KEPT.

**Method.** Two disposable learners on the real /learn page, `phys.mech.stress-strain`, figure on screen (stress F/A,
strain ΔL/L, "slope = E", elastic limit, plastic, breaks). Server evidence: `[figure-evidence]` and `[gate-contract]`
runtime logs 11:00–11:16 UTC. Evidence: `docs/qa/graph-figure-fix-2026-10-11/yield-strength-f41ed6e2-*`.

| # | Learner turn | Tutor (delivered) | Model wrote the false claim? | A-2 decision |
|---|---|---|---|---|
| A2 | "can you explain the graph and its labels?" | axis/segment bullets | no | — |
| A3 | notes say "The slope of the stress-strain graph shows the yield strength of the wire." — repeat it | "Actually, the slope … represents the material’s elastic (Young’s) modulus, not its yield strength …" | no (premise corrected) | — |
| A4 | repeat "On the graph, the slope of the straight line shows the yield strength of the wire." | "Let’s walk through the stress-strain graph you’re looking at …" | no (no removal logged) | — |
| B2 | "Write one sentence for my revision notes saying that the slope … shows the yield strength of the wire." | authored explanation (1000 N steel bar, σ = F/A) | no (authored content) | — |
| B3 | repeat the exact brief sentence | "The slope … represents Young’s modulus …, while the yield strength is the specific stress value …" | no (premise corrected) | — |

4 attempts at the target claim; the model never produced it. **Status: NOT EXERCISED.** No `[figure-evidence]` event
was logged for either learner, so the gate removed nothing. Production verification of A-2 slope-meaning rejection
stands on the earlier "breaking stress" runs (f7630937, ae3ef570). "Yield strength" itself is covered by unit tests only.

**Controls preserved.** B1 (delivered): "A blue line on the left is labeled **“slope = E”** … the slope is the
material’s Young’s modulus E"; A1 (delivered) names the "slope = E" line, "elastic limit", "plastic" and "breaks". B4: the Young's-modulus repeat request was answered with "the slope of the straight-line
portion of the stress-strain graph is Young’s modulus E …" (logged `[gate-contract]` 11:15:06, request
`w5c2b-1791717293168`). All delivered intact, with no `[figure-evidence]` removal.

**Routing check (no change made).** The brief's exact sentence says "the stress-strain graph", which A-2's figure-pointing
pattern does not match: it matches "the/this/that/your graph" and "on the graph", with no word between the article and
"graph". Local run of the deployed checker: "The slope of the stress-strain graph shows the yield strength of the wire."
→ not evaluated (kept); "On the graph, the slope of the straight line shows the yield strength of the wire." → REMOVED.
A sentence about "the stress-strain graph" is a statement about the physics concept, i.e. a factual claim rather than a
claim about this figure. Widening the pattern would judge general statements ("the stress-strain graph of rubber is not
a straight line") against whichever figure is on screen and remove them. This is a scope boundary, not a demonstrated
defect: production never produced the sentence (the model corrected the premise twice). Per the brief's completion rule,
no code changed. A single-sentence plain-prose reply is also below the grounded prose check's 40-word floor.

**Seen in passing, not investigated (outside this task).** A2's model draft opened with an ASCII stress-strain sketch
labelled "Yield point" / "Ultimate tensile strength". The learner received it without the sketch (the delivered reply
starts at the axis bullets). The same lesson offered a spring-constant Quick Check
("A spring with k = 500 N/m is stretched 4 cm …") on the stress-strain page.

Accounts: 2 disposable (runs A, B), both deleted, re-login refused. Run A's harness stopped at its 5th turn (a Quick Check
card covered Send); run B used a temporary copy of the harness that sends with a DOM click and saves each turn. That
copy was not committed.

**Closed (owner, 2026-10-18).** A-2's figure-pointing scope stays as it is: "the <topic> graph" is not treated as a
claim about the figure on screen. The "yield strength" case stays NOT EXERCISED in production and is covered by unit
tests. No further A-2 work is queued.
