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
