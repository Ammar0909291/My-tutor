# Real-learner QA run 2: 2 physics + 2 chemistry (2026-09-30)

Production at de9cfbc3. One disposable account (created and deleted by `scripts/qa/liveAccount.ts`,
re-login confirmed blocked). Same weak-English learner persona as the 2026-09-29 run
(`tutor-max-real-learner-fixes-2026-09-29.md`). API-level driving; figures judged from the payload.

| Lesson | Turns | Outcome | Rating |
|---|---|---|---|
| P6 phys.opt.refraction | 15 | verified mastery | 4/10 |
| P7 phys.mech.circular-motion | 14 | verified mastery | 6/10 |
| C6 chem.state.gas-laws | 16 | verified mastery | 4/10 |
| C7 chem.atomic.bohr-model | 14 | verified mastery | 5/10 |

All four reached mastery. But much of that mastery came from answer options that carry their own
reasoning, or from questions repeated after their answer had already been shown. So "verified"
overstates what the learner showed.

## Defects seen (✱ = also in the 2026-09-29 run, still open)

1. **Wrong figure.** Refraction was served a convex-lens image diagram ("general illustration")
   three times. Asked for "light ray, water and normal line", it got nothing. The ray_optics
   generator has no refraction-at-a-surface mode.
2. **Phantom figure (✱ variant).** With no figure on screen: "Looking at the sketch…", "Looking at
   this diagram…" (P6); "the syringe you just saw on the screen" (C6, only a graph was shown).
3. **Empty replies.**
   - After the learner complained ("there is no diagram!! … is my answer right?"), the reply was
     only "Snell's law n₁sinθ₁ = n₂sinθ₂ describes…" (P6).
   - Three explicit practice requests got "Got it—let's look at the curve…", a looping "Have you
     seen a curve like this", and a one-line KG summary ("Gas Laws covers: Boyle's, …") (C6).
4. **Side topic that will not let go.**
   - C6: "what is hyperbola?" became a conic-sections lesson with a geometry card, and held for 2
     more turns after "i only want gas".
   - C7: "what is angular momentum" became stored physics text (office chair) and a
     circular-motion card, held for 3 turns, including after "stop chair please" and "I DONT WANT
     CHAIR".
5. **Bare "Not quite" (✱, only partly fixed).** P7 circular-motion turn 4. Log: the model ignored
   the verdict block and wrote a paraphrase-confirm; `confirm-back` stripped it (165 → 59 chars).
   Needs a deterministic fallback, not only the prompt.
6. **Wrong answers and model-invented keys get no verdict.**
   - P6: "30°" got no feedback, then a new question.
   - C7: the helium answer "A" got no verdict; the reply re-answered a question from two turns
     earlier (✱ one-turn-late).
7. **Stored text leaks authoring notes.** P6: "RETRIEVAL PRACTICE (P-3b style, lateral shift): For
   the glass slab above (5 cm thick…)", pointing at a slab that does not exist, with an unrelated
   MCQ.
8. **Answer options carry their own reasoning (✱ task #2).** Seen in all four lessons. One C7
   option is 90 words long.
9. **Repeated questions.** P7 asked the string-snap question three times and the v²/r question
   twice. C6 repeated the sealed-vessel question after showing its answer.
10. **Physics error.** P7: "the door pushes you toward the outside of the turn" (the door pushes
    you inward).
11. **Language too hard (✱).** "electrons jiggle… wavefront", "L = nħ", a van der Waals remark,
    even after "simple words, my english weak".
12. **Tutor question and on-screen MCQ disagree.** P7, C6: the text asks one thing, the MCQ asks
    another. Two answers were not matched: "was red right? you not say. D" and "this same question
    like before. Along the tangent".

What worked:
- Circular-motion figure and misconception correction (P7 turns 1–2).
- Gas Laws Boyle graph with correct squeeze → pressure-up correction.
- Hot-balloon (Charles) answer.
- Bohr colour of light, big jump = blue.
- Wrong-answer explanations in P7 (8.0 N), C6 (sealed vessel) and C7 (n = 1 energy).
- The picture request in C7 got an atom card.
