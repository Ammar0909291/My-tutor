# Identical-Student A/B Test — Groq vs Gemini (2026-09-27)

**Item 11 of `docs/architecture/TUTOR_QUALITY_FIX_PLAN.md`** ("Strongest model only for
high-stakes turns... Decide from the owner's A/B model test: same 10 concepts, defects and cost
compared"). Owner-authorized, run end to end this session.

## Verdict (confidence: moderate-high on the specific findings below; low on generalizing
## beyond these 10 concepts)

**Gemini (`gemini-3.5-flash-lite`) showed measurably fewer correctness defects than Groq
(`openai/gpt-oss-120b`, current production default) in this sample — specifically, Groq
validated two different false learner statements as correct, twice each, fully reproducibly.
Gemini did not do this once across all 20 of its lessons.** Gemini's output-token cost is
roughly 4.7x Groq's in this sample. Both arms corrected every deliberately-wrong scripted
answer (slot 9, 40/40). Latency is comparable, Gemini slightly faster at the p95 tail.

This is a real, evidence-based signal in favor of Gemini on correctness for these two specific
misconceptions, not a general "Gemini is better" claim — see Scope and Limitations.

### Which Groq model did arm A actually use? (confirmed, not assumed)

**`openai/gpt-oss-120b`** — the current production default, not the smaller 20B variant.
Confirmed two ways:
1. **Code**: `src/lib/ai/router.ts`'s `getRouter()`, when `forceProvider === 'groq'`, resolves
   `const model = groqModelOverride ?? GROQ_MODEL`. This harness never sent the
   `x-cert-groq-model` header, so `groqModelOverride` was always `undefined`, and `GROQ_MODEL =
   process.env.GROQ_MODEL ?? 'openai/gpt-oss-120b'`.
2. **Live production environment**: pulled this project's actual Vercel env var list
   (`filter_project_envs`) — there is **no `GROQ_MODEL` key configured at all**, in production
   or preview, so the code fell through to the hardcoded `'openai/gpt-oss-120b'` default with
   certainty, not merely by static-code inference.
   (A third check — pulling the literal `"[ai/router] cert override active — provider=groq
   model=..."` console.log line from Vercel runtime logs for the test's exact time window —
   was attempted and failed with `ExceedsBillingLimitError` on this Vercel plan; not needed
   given the above, but noted for completeness.)

## Methodology

- Script: `scripts/qa/abStudent/script.json`, sha256
  `ca31e6ed219cf3b0086399040f10f613fa068f55552178f81d56455aba4b1914`, frozen before any lesson
  ran. 10 concepts (3 physics incl. `phys.em.electric-charge` "Electric Charge and
  Conservation", 3 chemistry, 4 english — biology excluded per owner instruction). Every
  misconception/correct/wrong/off-topic string copied verbatim from this repo's own
  `educational-brain/` entries and seed probes (`src/lib/teaching/assets/`) — nothing invented;
  provenance cited per field in the script itself.
- Turn plan: fixed 14 turns per lesson (Turn 0 = lesson-init, then the scripted plan), always
  run to completion regardless of mastery/completion signals. Answer resolution for the two
  "right"/"wrong" slot types used `canonicalContent()` — a generalization of the pre-existing,
  offline-measured `scripts/qa/biologyAnswerPicker.ts` (99.5%/72.9% accuracy on its own held-out
  tests) — never an LLM, never invented text.
- Provider forcing: `x-cert-provider: groq|gemini` header on every `/api/learn/chat` call, gated
  on `modelOverrideAllowed=true` (an existing, real production mechanism). **Turn 0
  (lesson-init) is NOT forced** — verified by reading `/api/learn/lesson-init/route.ts`
  directly: zero references to `x-cert-provider`/`forceProvider`/`modelOverrideAllowed`
  anywhere in that file, confirmed independently by this repo's own pre-existing
  `scripts/qa/groqVsGeminiExperiment.ts`. Both arms get an identical, unforced opening turn, so
  this doesn't bias A-vs-B, but turn 0 carries no arm identity and **is excluded from every
  scoring metric below**.
- Accounts: 40 disposable `qa-*@mytutor-qa.invalid` accounts (10 concepts x 2 arms x 2 runs),
  each onboarded identically (subject = concept's subject, `currentLevel: beginner`,
  `teachingLanguage: en`, `voiceChoice: male`, the fixed selfDescription string). `git commit
  ca31e6e...` records the script; `modelOverrideAllowed=true` was set via one batched, owner-
  approved, self-limiting SQL UPDATE (`WHERE id IN (...) AND email LIKE 'qa-%@mytutor-qa.invalid'
  RETURNING id, email`, confirmed exactly 40 rows before proceeding).
- Contamination: any turn 1-14 whose server-reported `provider` field didn't match its arm's
  forced provider is flagged contaminated and excluded from all correctness scoring below (but
  counted and reported).

## Quantitative results

| Metric | Arm A — Groq | Arm B — Gemini |
|---|---|---|
| Lessons run | 20 (10 concepts x 2 runs) | 20 |
| Mastery reached (`lessonComplete.fullyMastered` or `mastery.verified`) | 5/20 (25%) | 3/20 (15%) |
| Any figure delivered | 15/20 | 16/20 |
| Contaminated turns (provider mismatch, excluded from scoring) | 31/280 (11.1%) | 33/280 (11.8%) |
| Latency p50 / p95 (ms, turns 1-14 only) | 11,863 / 15,837 | 11,170 / 13,878 |
| Approx. output-token cost (this run, output tokens only — see caveat) | $0.016 total ($0.0008/lesson) | $0.076 total ($0.0038/lesson) |

**Cost caveat (per the "do not guess" rule):** current list prices, looked up live —
Groq `openai/gpt-oss-120b`: $0.15/M input, $0.60/M output
([GroqDocs via AI Pricing Guru](https://www.aipricing.guru/blog/groq-api-pricing-guide-2026/),
cross-checked against [Requesty](https://www.requesty.ai/models/groq/openai-gpt-oss-120b)).
Gemini `gemini-3.5-flash-lite`: $0.30/M input, $2.50/M output
([Requesty](https://www.requesty.ai/models/vertex/gemini-3.5-flash-lite), consistent across
[OpenRouter](https://openrouter.ai/google/gemini-3.5-flash-lite) and other sources). The figures
above are **output tokens only** (estimated at ~4 chars/token from the recorded response text) —
**input/prompt tokens were not captured by this harness** (system prompt + conversation history
per call, typically several times the output size for a teaching prompt) and are not included,
so the true per-lesson cost is higher than shown, for both arms, by an unmeasured but probably
similar multiplier — the *ratio* between arms (Gemini ~4.7x Groq's output cost) is the safer
number to trust here, not the absolute dollar figures.

### Slot-9 (deliberately wrong answer) correction rate — the key test
**40/40 (100%), both arms.** Every one of the 40 lessons correctly identified the scripted wrong
answer and served the correct one (verbatim "Not quite — the answer is: ..." pattern, both
arms). No defect found here in either arm.

### Slot-5 (misconception) catch rate — the other key test
| | Groq (A) | Gemini (B) |
|---|---|---|
| Correctly repaired | 16/20 (80%) | 18/20 (90%) |
| Deferred to a clarifying question (not a clear defect either way) | 0/20 | 2/20 (10%) |
| **Accepted the misconception as correct ("That's right")** | **4/20 (20%)** | **0/20 (0%)** |

The 4 Groq failures were **fully reproducible**, not random noise: both runs of
`eng.grammar.verbs` ("I think a verb has to show physical action...") and both runs of
`chem.found.mole-concept` ("I think the mole is a mass...") got "That's right" from Groq. Gemini
correctly repaired the identical scripted sentence on both concepts, both runs, every time.

## Defects found (targeted review — see Scope below for what this does and doesn't cover)

I hand-reviewed slots 2 ("why does that matter?"), 3 (diagram request), 5 (misconception), 9
(wrong answer), and 10 (off-topic) across all 40 lessons — 100 turns/arm — plus an automated
regex scan across **all** 560 scoreable turns for two categories (leaked internal labels,
self-grading requests).

**Arm A (Groq) — 8 defects in the sampled slots:**
1. **HIGH — misconception accepted**, `chem.found.mole-concept` run1 (slot 5): "That's right.
   You're saying that a mole is a type of mass, similar to a gram. Is that right?"
2. **HIGH — misconception accepted**, `chem.found.mole-concept` run2 (slot 5): same pattern.
3. **HIGH — misconception accepted**, `eng.grammar.verbs` run1 (slot 5): "That's right. I hear
   you're thinking that verbs must show a physical action."
4. **HIGH — misconception accepted**, `eng.grammar.verbs` run2 (slot 5): same pattern.
5. **HIGH — factual error on an off-topic question**, `phys.mech.friction` run1 (slot 10): asked
   "What is the Third-Law reaction to [gravity pulling a book down]?" — correctly answered
   "the book pulls the Earth upward"; Groq instead validated the well-documented
   `MC-SAME-OBJECT-PAIR` misconception ("the table pushes back... that upward push is the
   normal force").
6. **HIGH — ignored/non-sequitur off-topic reply**, `phys.mech.friction` run2 (slot 10): the
   same off-topic Newton's-third-law question got a reply entirely about approaching absolute
   zero in a crystal lattice — unrelated to both the question asked and the friction lesson in
   progress.
7. **MEDIUM — stale template artifact**, `phys.em.electric-charge` run1 (slot 10): the off-topic
   friction-coefficient question's reply opened with "Not quite — the answer is: Two" — "Two"
   is the correct answer to a *different*, earlier electric-charge probe ("how many excess
   electrons"), not to the friction question actually asked. Did not recur in run 2 for the same
   concept/arm.
8. **MEDIUM — off-topic message not addressed**, `chem.found.mole-concept` run1 (slot 10): the
   off-topic stoichiometry question (limiting reagent) got a reply that continued explaining
   the mole-concept lesson instead. Did not recur in run 2 (same concept/arm answered correctly
   the second time) — likely stochastic, not systematic, unlike defects 1-4 above.

**Arm B (Gemini) — 0 defects in the sampled slots.** All 20 lessons' slot 2/3/5/9/10 turns were
substantively correct, on-topic, and non-contradictory in this review.

**Automated full-corpus scan (all 560 non-turn-0 turns, both arms):**
- Leaked internal schema labels (`MC-...`, `misconceptionId`, `probeKind`, `correctValue`,
  `canonicalSlug`, `AssetIdentity`, etc.): **0 hits.**
- Learner asked to grade their own answer: **0 hits.**

**Not a product defect — a test-harness artifact, explained so it isn't miscounted:** many
Gemini turns (rarely any Groq turns) address the "student" by the literal QA account name, e.g.
"QA ab-chem-bond-covalent-bonding-B-1, that is a really common place to get tripped up...". This
is the app correctly using the account's own registered `name` field for personalization — I
set that field to `QA <internal-test-label>` at registration, which is why it looks like
gibberish. It is not a leaked system label and not scored as a defect. It IS a real, observable
stylistic difference worth noting on its own: **Gemini personalizes with the learner's name far
more often than Groq does** in this sample. A repeat of this test should register with an
ordinary first name to remove the confound entirely.

## Run-to-run variance

Both concepts with reproducible Groq misconception-acceptance failed identically on run 1 AND
run 2 — this is a **systematic weakness for those two specific misconception phrasings**, not
run-to-run noise. Conversely, the two MEDIUM-severity Groq defects (electric-charge's stale
template artifact, mole-concept's ignored off-topic message) each occurred in only one of the
two runs for the same concept — genuine stochastic variance. Mastery-reached counts also varied
run to run (Arm A: 4/10 run1 vs 1/10 run2; Arm B: 3/10 run1 vs 0/10 run2) — expected, since the
scripted plan deliberately includes a wrong answer and an off-topic detour rather than being
optimized to reach mastery.

## Scope and limitations (read before trusting this as exhaustive)

- I hand-reviewed 5 of the 14 scoreable slots per lesson (2, 3, 5, 9, 10) — the ones the spec
  itself calls "the key test" (5, 9) plus the three explicit "ignored message" slots (2, 3, 10).
  I did **not** individually hand-score every one of the 9 requested defect categories across
  all 560 turns (self-contradiction and unclear/level-inappropriate language, specifically,
  were only checked incidentally within the slots I did read, not swept exhaustively).
- The requested "20 random blind turns for the owner to hand-check" are below, arm/provider
  stripped, with the key held separately so you can judge before seeing which arm produced each.
- Cost figures are output-tokens-only (see caveat above) — a real number, not a full per-lesson
  cost.
- 10 concepts, 2 runs each, is a real but small sample. The Groq misconception-acceptance
  finding is strong *for those two concepts*; it is not evidence about Groq's general reliability
  across all subjects.

## Blind spot-check appendix (20 turns, arm/provider stripped — judge before reading the key)

1. learner: "ok, let's start" — tutor: "In the simulation you can see separate atoms moving
   together, their outer-electron clouds overlapping until a shared pair of electrons holds
   them as a stable molecule. Now, draw the Lewis structure of SO2 (sulfur dioxide)..."
2. learner: "29.4 N — uk x N = 0.3 x 98 N" — tutor: "Push a book across a table and something
   resists you. That resistance is friction... So what matters is not the book's weight, it is
   how hard the two surfaces are being pushed together..."
3. learner: "In 'She IS happy,' is anything physically moving? Is 'is' still a verb?" — tutor:
   "In the sentence 'She is happy,' the word is is the present-tense form of the verb to be...
   Even though it doesn't show motion, is is still a verb..."
4. learner: "give me a practice question" — tutor: "Here's a quick practice scenario for you: A
   person standing on a smooth sheet of ice pushes a nearby box..."
5. learner: "continue" — tutor: "Let's check one thing about Pronouns before we go further."
6. learner: "'Is running' together is the complete verb phrase..." — tutor: "That's right — 'is
   running' is the full verb phrase, with 'is' acting as a helping verb."
7. learner: "Greater — u_s >= u_k, which is why things are harder to start moving than to keep
   moving" — tutor: "That's right. [name], since you previously mentioned you thought the normal
   force always equals an object's weight, let's look closely at why that changes when a surface
   is tilted..."
8. learner: "ok, continue" — tutor: "Let's check one thing about Adjectives before we go
   further."
9. learner: "continue" — tutor: "Let me check your thinking with this."
10. learner: "continue" — tutor: "[name], since you asked about the limiting reactant earlier —
    which is a great stoichiometry topic that builds directly on the mole concept — let's look
    at how we connect moles to mass using the step boxes on your screen."
11. learner: "3.01 x 10^23" — tutor: "That's right."
12. learner: "No — the giver and receiver are different people here, so it should be 'to me'..."
    — tutor: "Exactly — you're right. Reflexive pronouns like myself or himself are only correct
    when the subject doing the action and the object receiving it are the same person..."
13. learner: "why does that matter?" — tutor: "[name], electric charge matters because it is the
    fundamental rule behind how every atom, spark, and electronic device holds together..."
14. learner: "quiz me" — tutor: "Let me check your thinking with this."
15. learner: "give me a practice question" — tutor: "That's a really common place to get tripped
    up — let me show you why. When we say 'she is good at math,' it isn't because math is a
    physical spot you can stand inside..."
16. learner: "That the reaction was unusually efficient and produced more than the theory
    predicted" — tutor: "Not quite — the answer is: That something is wrong with the
    measurement, not with the chemistry..."
17. learner: "ok, let's start" — tutor: "Imagine a small red ball sitting on a wooden table.
    Next to the table is a blue box on the floor, and the ball is also under that box..."
18. learner: "give me a practice question" — tutor: "It's a common mix-up to think that equal
    masses always give the same number of molecules; the mole is the bridge..."
19. learner: "quiz me" — tutor: "One to try, on Verbs. There's no rush."
20. learner: "quiz me" — tutor: "[name], that is a very common way to see it, but Newton's Third
    Law works a bit differently. When two objects collide, the force one exerts on the other is
    always equal in magnitude and opposite in direction, no matter their difference in mass..."

<details>
<summary>Key (arm/run/concept/slot) — expand only after judging</summary>

1. A run1 chem.bond.covalent-bonding slot1 · 2. A run2 phys.mech.friction slot7 ·
3. A run1 eng.grammar.pronouns slot10 · 4. A run2 phys.mech.newtons-third-law slot11 ·
5. B run2 eng.grammar.pronouns slot8 · 6. A run2 eng.grammar.verbs slot14 ·
7. B run2 phys.mech.friction slot14 · 8. A run1 eng.grammar.adjectives slot4 ·
9. A run2 eng.grammar.verbs slot13 · 10. B run2 chem.found.mole-concept slot12 ·
11. B run1 chem.found.mole-concept slot7 · 12. A run1 eng.grammar.pronouns slot14 ·
13. B run1 phys.em.electric-charge slot2 · 14. A run1 eng.grammar.pronouns slot6 ·
15. B run1 eng.grammar.prepositions slot11 · 16. A run1 chem.found.stoichiometry slot9 ·
17. A run2 eng.grammar.prepositions slot1 · 18. A run1 chem.found.mole-concept slot11 ·
(19-20 recorded in the harness's own full transcript set)

</details>

## Cleanup and account-safety confirmation

- All 40 disposable accounts: `deleteQaAccount` confirmed `deleted=true reloginBlocked=true` for
  all 40 (a bug in the first cleanup attempt — an empty session cookie — was found, fixed, and
  re-run; see commit `a9acea42`).
- **Important, not glossed over**: this app's delete-account endpoint is a *soft* delete — it
  renames the email to `deleted_<timestamp>_<original>` and blocks login, but the row persists.
  A direct count confirmed all 40 rows still exist under those renamed emails; "0 rows remain"
  is not this endpoint's contract and was not achieved. Re-login-blocked is the real, verified
  guarantee. Per owner follow-up instruction, `modelOverrideAllowed` was then flipped to `false`
  on exactly those 40 (now-unreachable, soft-deleted) rows via a second self-limiting, owner-
  approved UPDATE (`WHERE id IN (<the 40 ids>) AND email LIKE 'deleted_%qa-%@mytutor-qa.invalid'
  RETURNING id`, confirmed exactly 40 rows returned). No row was hard-deleted.
- `suaibamr1@gmail.com` / `suaibamr3@gmail.com`: `modelOverrideAllowed` confirmed `false` before
  this test began and re-confirmed `false` after — no password or other field touched (the owner
  is rotating those passwords separately).

## Files

- `scripts/qa/abStudent/script.json` — frozen student script (committed).
- `scripts/qa/abStudent/runner.ts` — prepare/drive/cleanup harness (committed).
- `scripts/qa/biologyAnswerPicker.ts` — generalized with a new `canonicalContent(subject,
  conceptId)` export, reused by the runner (committed, additive only — existing biology-specific
  exports untouched, existing test suite still 15/15 passing).
- Raw transcripts (40 lesson JSON files) were kept in this session's scratchpad only, per the
  "no transcripts in the repo" rule — not committed.

## Follow-up fix — misconceptions endorsed as "That's right" (2026-09-28, app-level, model-independent)

**Root cause (not the model alone).** The `V-AFFIRM` output guard (`src/lib/kernel/verifier/rules.ts`)
already existed to stop exactly this, and `route.ts` already fed it each concept's authored
misconceptions (Blueprint + Educational Brain). For `chem.found.mole-concept` the EB
characteristic phrase is literally "The mole is a mass — it's like a gram." But the guard only
activated when the learner's message "proposed" something (`…is just…`, `…, right?`,
`so it's…?`). A first-person belief ("I think …") matched none of those, so the guard never
looked at the four failing turns.

**Fix.**
- `LEARNER_BELIEF_RE` makes a first-person belief statement (never a question) count as a
  proposal.
- A belief is judged only when it matches ONE authored misconception entry: at least 3 shared
  stems covering at least 75% of what the learner asserted (`beliefMatchesAuthoredMisconception`;
  the route now sends one entry per line).
- With no match, or no authored library, the guard stands down, so a correct belief is never
  "corrected".
- On a match, the existing repair path runs unchanged: one regeneration carrying the authored
  correction; if the retry agrees again, it falls closed to the authored correction.

**Verified through the real route** (`src/tests/affirmGuardBelief.test.ts`): the production
learner sentence plus Groq's production reply is rejected. Even with a retry that agrees again,
the learner receives "The mole is a fixed COUNT (6.022×10²³ entities…) — not a mass — …" and
never "That's right". The same test covers the verbs case, a correcting reply shipping unchanged,
and correct beliefs left alone.

**Honest limit.** Word overlap cannot see order: a reversed-direction misconception worded like
the correct rule (e.g. which way to divide by Avogadro's number) is not caught. Such a belief sits
below the bar on purpose, because this rule forces a correction and silence is the safe side.

## Follow-up — live re-checks of the A/B defects (2026-09-28)
- mole-concept false credit: 0/3 after `dc5566c`.
- Friction Third-Law routing: fixed (`5be436a`). A 1/3 model residual remains, from ungrounded
  excursion turns.
- Electric-charge off-topic grading: fixed (`8ee670f`).
- mole-concept "question ignored": not reproducible.

Details, evidence and the open items: `subject-onboarding-and-fix-campaign.md`, section "2026-09-28 —
Chemistry/Physics live-QA defect pass". `scripts/qa/abStudent/runner.ts` can now re-drive a subset
(`AB_CONCEPTS`/`AB_ARMS`/`AB_RUNS`).
