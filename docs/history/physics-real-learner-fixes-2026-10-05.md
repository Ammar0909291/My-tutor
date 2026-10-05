# Physics real-learner defects PHYS-001..024 — fixes (2026-10-05)

Source of truth for the defects: `docs/qa/PHYSICS_REAL_LEARNER_DEFECTS.md` (each entry now carries
its Status and a Fix line). This file records how each cause was found, so the next session does
not re-derive it.

## Root causes found (evidence before patch)

| Family | Defects | Cause (file) | Commit |
|---|---|---|---|
| A | PHYS-023 | `dropQuestionSentences` (`src/lib/teaching/confirmBackRepair.ts`, used by the stub-repair retry in `route.ts`) split sentences at the `!` of `<!--`, so a retry's card tag lost `--MCQ q="…?"` and kept `<!" a=… correct="B"-->`. Reproduced byte-for-byte. 8 production rows 2026-10-02..05 (physics, biology, chemistry, mathematics). | `72abee7` |
| C | PHYS-022, PHYS-024 | Production logs 2026-10-05 16:21 UTC: Groq `429 Rate limit exceeded` in ~100 ms (burst limit, not TPD, not `spend_limit_reached`), Gemini `402 Payment Required — prepayment credits are depleted`, OpenRouter no key → chain exhausted → stock template. 476 degraded turns in the 15:00 UTC hour while other QA sessions drove ~30 turns/min. | `562c3c3` |
| B | PHYS-021, 003, 005, 015 | "i dont understand this picture. what is it showing?" → `explain_differently` → a re-explain strategy that ignores the figure (simpler wording / analogy / guided discovery); the `dont_understand` recovery script ("CHANGE REPRESENTATION … story") preempts everything; on a held figure the contract said "do NOT re-describe it". Openings: the locator stripper missed "in the car-and-kitchen picture". | `5b53ec8` |
| D | PHYS-002, 014, 019, 013 | Example / numbers / "how i get 1.25" are remediation turns, so the curated card was served verbatim (provider=memory), then HELD, and the output floor rejected any worked example with notation as `went-beyond-card` → "Let me put it in the simplest words I have." + KG definition (42 of 45 such fallbacks in 3 days followed an "example" message). PHYS-013: `confused` recovery script forbade content on a turn that asked a direct question. | `9ed725b` |
| F | PHYS-001, 008 | `namedTopicUnknownTo` read "what is the picture showing" as the topic "picture showing" → knowledge-gap excursion on pictures, still open at the next "yes". "i already said this" → `frustrated` script with no rule against calling the learner stuck. | `253d90a` |

## Production re-drive (deploy `cf71a4b`, 7 lessons, 77 turns, disposable account)
0 answer-key leaks; picture question answered from the figure in 4/6 non-degraded replies (orders 55
and 9 still generic); 5/5 example requests got a concrete example and 0 "simplest words" after
them; γ = 1.25 explained step by step on the first ask; 0 stock templates; 19/77 degraded turns with
the honest copy while Groq was saturated (~29 served/min vs ~38/min load, Gemini 402, no
OpenRouter key). A degraded figure turn still appended "Study it while I explain" — fixed in
`2fb77a9`. Detail: the summary block of `docs/qa/PHYSICS_REAL_LEARNER_DEFECTS.md`.

## Not reproduced
- **PHYS-018**: two and three physics lessons driven in parallel on one disposable account, without
  a tabId (the original driver's shape): separate sessions, 0 foreign cards
  (`scripts/qa/parallelLessonIsolation.ts`). The PCD-004 session pointer holds.

## Owner decisions (not built)
- **Billing/keys (PHYS-022/024):** Gemini's prepayment credits are depleted (402) and OpenRouter has
  no key, so there is no working fallback behind Groq. Top up Gemini or set `OPENROUTER_API_KEY`.
  Groq's 429s were burst limits under concurrent QA load, not `spend_limit_reached`.
- **PHYS-011:** the false "proper time is the longest" came from the graded turn assembler's
  model-written TEACHING slot. Proposal: give that slot the concept's authored misconceptions as
  "never state these as fact", or omit the teaching slot on a correct answer.
- **PHYS-012:** a prompt rule to show any hours-to-minutes conversion step. (Numeric verification
  N1/N2/N3 stays closed.)
- **PHYS-016:** add two plausible distractors to the authored Hafele-Keating card; needs an
  owner-approved production row update (the bootstrap is create-only).
- **PHYS-020:** whether prose A–D options should become (unkeyed) cards.

## Security
`docs/architecture/PROMPT_TYPED_TURN_CONTRACT.md` and three QA scripts
(`scripts/qa/groqVsGeminiCompare.ts`, `groqVsGeminiExperiment.ts`, `groq120bVsGeminiCompare.ts`)
carried a real account password in plain text; removed in `0826b9e` (scripts now read
`QA_PASSWORD`). It remains in git history: the owner must rotate it.
