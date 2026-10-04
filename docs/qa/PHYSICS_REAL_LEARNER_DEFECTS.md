# Physics Real Learner Defects

## Scope

Full Physics curriculum — a real learner journey from the beginning of the roadmap to the end, on the
deployed app (`my-tutor-flame.vercel.app`), following the app's own lesson order (`/api/curriculum?subject=physics`).

This is a **discovery log**. No application code, prompts, content, KG/EB/GB+ or configuration was changed
to produce it. Fixes are out of scope until requested.

Relation to earlier QA: `docs/qa/PHYSICS_CHEMISTRY_REAL_STUDENT_DEFECTS.md` (`PCD-*`, compiled 2026-09-11/12)
and `docs/qa/PHYSICS_CHEMISTRY_MASTER_DEFECT_BACKLOG.md` are an earlier, compiled audit. This file is the
live log for the 2026-10 run and uses `PHYS-NNN` IDs. Where a finding matches an earlier `PCD-*` entry the
entry says **Related: PCD-NNN** (a recurrence) instead of opening a competing record.

## Learner

Real account (credentials are never recorded here). Persona: English lower-than-intermediate, short messages,
basic Physics knowledge, sometimes confused, sometimes wrong, asks "explain simpler" / "give me example" /
"I don't understand this picture" when genuinely lost.

## Method and limits (read before trusting any count)

- Driven through the app's own HTTP API (`/api/sessions`, `/api/learn/lesson-init`, `/api/learn/chat`) as the
  logged-in learner. A real browser was **not** available in the sandbox (Chromium cannot verify the egress
  proxy's certificate), so **in-app controls could not be clicked**: Predict / Practice / Test me, the
  Situation → Diagram → Relationship → Answer chips, simulation sliders, phone layout inside a live lesson.
  Visuals were assessed from the payload the lesson sent and, where stated, from a local render of the same figure
  the production resolver serves (`/dev/visual-demo/simulation/served?concept=…`).
- After the first lessons, learner turns were produced by a **scripted persona** (short messages; fixed
  "explain simpler" / "give me example" / "I don't understand this picture" beats; cards answered by an imperfect
  student heuristic that favours options echoing what was just taught, ~25 % deliberate mistakes, and remembers
  corrections). Every transcript was then read by a human-equivalent reviewer; defects below are only things
  actually observed in a transcript.
- Terms: **studied** = a full lesson session was driven; **observed** = seen in a transcript; **reproduced** = seen
  more than once or re-run; **not tested** = no session; **blocked** = could not proceed; **uncertain** = not
  established.

<!-- SUMMARY:START -->
## Summary

(generated — see the commit that last touched this file)
<!-- SUMMARY:END -->

## Severity key

P0 = blocks learning · P1 = seriously damages learning/trust · P2 = noticeable, non-blocking · P3 = polish

Categories: Teaching · Adaptation · Lesson flow · Visuals · Numerical/factual · UX · Mastery/progress

## Defects

### PHYS-001 — [P1] [Lesson flow/Adaptation] A plain "yes" derails the lesson into "what is a picture" for three turns
- **Date/time:** 2026-10-04 ≈22:47 UTC · **Subject:** Physics · **Concept:** `phys.opt.youngs-experiment` · **Lesson:** Young's Double-Slit Experiment (order 134)
- **Learner did:** answered the tutor's confirm-back question with "yes".
- **Tutor did:** Tutor: *"Amma, you're saying the dark parts sit right in the middle between the bright peaks—have I got that right?"* → learner **"yes"** → *"A picture is a visual representation that shows something—people, objects, scenes, or actions… Question: Looking at a simple drawing of a tree with a sun behind it, what do you notice the picture is showing?"* Learner: *"why you talk about tree? i want to learn the double slit light. i am confused"* → *"…let's step back and look at what a picture is really doing… a simple weather map…"* Only the third request (*"please go back to Young double slit experiment. i was learning bright and dark lines"*) restored the topic.
- **Why a defect:** a confirmation abandons the lesson topic; the topic is lost although the learner explicitly asks to return; two further turns are wasted.
- **Expected:** "yes" confirms the previous statement and the lesson continues on double-slit interference.
- **Actual:** unrelated generic lesson on "what a picture is", persisting after complaint. The stale trigger was the earlier learner message *"i dont understand this picture. what is the picture showing?"*.
- **Reproducible:** observed once in full; the same message sequence is the repro. **Related:** PCD-017/PCD-018 (derailment cascades). **Status:** OPEN

### PHYS-002 — [P1] [Adaptation] "give me example with numbers" answered by a stored paragraph with no numbers
- **Date:** 2026-10-04 · **Concept:** `phys.opt.youngs-experiment` · **Lesson:** order 134
- **Learner:** *"ok. give me example with numbers please"*
- **Tutor (provider=memory, reason `curated_remediation_card`):** *"Light through two fine slits does not make two bright patches on the far wall. It makes a long row of evenly spaced stripes. Every point on that wall is reached by light from both slits…"* — no numbers, a third restatement of the same idea.
- **Expected:** a numeric worked example (e.g. d, D, λ → fringe spacing).
- **Actual:** the request was not honoured. **Reproducible:** yes — same card family also ignored a specific question in PHYS-014. **Related:** PCD-015/PCD-033. **Status:** OPEN

### PHYS-003 — [P1] [Adaptation/Visuals] "What is the picture showing?" answered with text that never describes the picture
- **Concept:** `phys.opt.youngs-experiment` · **Lesson:** order 134
- **Learner:** *"i dont understand this picture. what is the picture showing?"*
- **Tutor:** *"When particles (such as light photons or electrons) travel through those openings, each opening acts like a new source of waves. Where the waves arrive in step… "* — begins mid-thought ("those openings" has no antecedent), describes nothing in the figure, no figure attached on that turn.
- **Expected:** a description of the figure (axes/labels/what to look at). **Status:** OPEN · **Reproducible:** observed once.

### PHYS-004 — [P1] [Visuals/Numerical-factual trust] Tutor narration contradicts the visual that was served
- **Concept:** `phys.opt.youngs-experiment` · **Lesson:** order 134
- **Tutor:** first *"In the diagram you're looking at, a single beam of light shines on a barrier with two very narrow, closely spaced slits. Behind the slits a screen…"*; the attached figure was a card `double_slit`, then a model-made graph `{"type":"graph","equation":"cos(x*1000)^2","xLabel":"Position on screen (m)"}`. Asked about the slits the tutor said *"The two slits themselves aren't drawn in the picture"*, then later *"In the figure you're looking at, the two narrow openings are the slits… the flat surface at the far right of the setup"*. Axis called "(m)" in the spec and *"arbitrary units"* in a later reply; a beginner is shown the raw formula *"cos²(1000x)"*.
- **Why a defect:** the text says there is a setup diagram with slits; the figure is an intensity graph; the tutor contradicts itself about whether slits are drawn and about axis units.
- **Expected:** narration matches the figure actually attached. **Status:** OPEN · **Reproducible:** observed (3 turns). **Related:** PCD-031 (phantom figure reference), PCD-018.

### PHYS-005 — [P2] [Lesson flow/Visuals] Opening asks the learner to look at a picture that is not shown
- **Concept:** `phys.opt.youngs-experiment` (also seen in `phys.rel.time-dilation`, order 237: "Looking at the two watches in the car-and-kitchen picture…", and in `phys.meas.units` order 1) 
- **Tutor opening (Young's):** *"What do you notice about the bright and dark bands when you look at the pattern on the screen?"* — no figure in the payload. After the learner says *"i dont see any picture"* the next reply says *"In the diagram you're looking at…"* and the figure arrives.
- **Expected:** the figure is attached when the question refers to it. **Reproducible:** yes (3 of 3 lessons opened in this way). **Related:** PCD-031. **Status:** OPEN

### PHYS-006 — [P2] [Lesson flow/Teaching] Questions asked before the required concept is taught
- **Concept:** `phys.opt.youngs-experiment` · **Lesson:** order 134
- **Cards:** *"In a double-slit pattern, which order m labels the FIRST dark fringe next to the central bright one?"* (notation "order m" and (m+½)λ never taught; explained only after the learner asked *"what is m? you did not tell me about m. i dont know"*); *"A thin glass slab is placed in front of slit S₁ only … Where does the central bright fringe appear?"* (optical path through glass never taught; explained only after *"i dont know this one. we did not learn about glass in front of slit"*).
- **Expected:** teaching precedes the check. **Reproducible:** yes (also order 237, see PHYS-016). **Status:** OPEN

### PHYS-007 — [P2] [Lesson flow] The same question is asked repeatedly
- **Concept:** `phys.opt.youngs-experiment`: *"What did Young's double-slit experiment establish about the nature of light?"* asked 3 times (correct answer already given), the "order m" card twice, *"what do you notice about the spacing of the bright peaks?"* three times (learner: *"i already said this before"*). **Related:** PCD-019. **Status:** OPEN

### PHYS-008 — [P3] [Adaptation] Wrong tone: "I'm sorry you're feeling stuck" when the learner points out repetition
- **Learner:** *"the bright peaks are equal distance. i already said this before. the middle one is the biggest"* → *"I'm sorry you're feeling stuck—let's take a quick step back."* **Status:** OPEN

### PHYS-009 — [P3] [Teaching/Adaptation] First explanation too advanced for the declared learner level
- **Concept:** `phys.opt.youngs-experiment`. After the learner correctly described bright/dark bands, the reply introduced phase, path difference, constructive/destructive interference and β = λD/d in one block. A simpler pond analogy followed only after *"explain simpler please. i dont understand in phase and path difference"* (that adaptation worked). **Status:** OPEN (low)

### PHYS-010 — [P3] [Numerical/factual] Symbol drift inside one lesson (β, D → y, L)
- Same lesson: fringe width called β with screen distance D, later feedback uses y = λL/d for the same quantity. **Status:** OPEN

### PHYS-011 — [P1] [Numerical/factual] "Proper time is the LONGEST time" — stated twice, contradicts the lesson
- **Date:** 2026-10-04 ≈22:55 UTC · **Concept:** `phys.rel.time-dilation` · **Lesson:** Time Dilation (order 237)
- **Learner:** answered the card *"What is PROPER time?"* correctly (*"The time measured by a clock travelling with the object"*).
- **Tutor (feedback, 2 different turns):** *"…is the longest time measured between the same two events compared to any other inertial frame."* and *"…equals the longest elapsed time measured between the events. All other inertial frames will record a shorter time due to time dilation."*
- **Why a defect:** proper time is the **shortest** interval; other frames measure **longer** times (Δt = γΔτ, which the same lesson teaches). It also contradicts the stored card shown earlier ("The shortest time between two events is always the one measured by a clock present at both").
- **Reproducible:** yes (2 separate replies). **Related:** PCD-041 (self-contradiction). **Status:** OPEN

### PHYS-012 — [P1] [Numerical/factual] Spaceship example: 1.67 hours stated as "one hour and forty-four minutes"
- **Concept:** `phys.rel.time-dilation` · **Lesson:** order 237
- **Learner:** *"this one is hard for me. can you give me example first, a simple one with a fast spaceship?"*
- **Tutor:** γ ≈ 1.67 (correct) then *"…the Earth clocks record about one hour and forty‑four minutes."* 1.67 h = 1 h 40 min.
- **Reproducible:** observed once (arithmetic). **Status:** OPEN

### PHYS-013 — [P1] [Adaptation] Learner's correct arithmetic challenge met with filler, then a false excuse
- **Learner:** *"thank you. but i am confused. 1.67 hours, i do 0.67 x 60 = 40 minutes. you said 44 minutes. which is right?"* → *"I hear you—these numbers can feel tricky right before the idea clicks."* (no answer). Learner: *"you did not answer me. is it 40 minutes or 44 minutes?"* → *"…The 44‑minute figure came from a slightly different speed factor that was rounded differently…"* (not true: it was an arithmetic slip; no such factor appears). **Status:** OPEN · **Related:** PCD-033

### PHYS-014 — [P1] [Adaptation] "Explain simpler. what is gamma and how i get 1.25?" ignored for three turns
- **Concept:** `phys.rel.time-dilation` · **Lesson:** order 237
- **Learner:** *"explain simpler. what is gamma and how i get 1.25?"* → stored muon-lifetime paragraph (provider=memory, `curated_remediation_card`). Learner: *"i dont understand the muon story. i asked how to calculate gamma. where 1.25 come from?"* → *"Let me put it in the simplest words I have. A moving clock runs slower… γ = 1/√(1−v²/c²). Tell me which part of that is the fuzzy one…"*. Only the 4th message (*"the fuzzy part is 1.25. v is 0.6c. how i put 0.6 in the formula? show me step by step"*) produced the step-by-step (correct).
- **Expected:** the first reply explains γ and the 1.25. **Reproducible:** yes (same family as PHYS-002). **Related:** PCD-033/PCD-015. **Status:** OPEN

### PHYS-015 — [P2] [Lesson flow/Visuals] Opening refers to a "car-and-kitchen picture" that does not exist
- Covered by PHYS-005 (kept as a separate entry because it is a different concept; same root class). **Status:** OPEN

### PHYS-016 — [P2] [Lesson flow/Teaching] Weak or unfair questions in Time Dilation
- *Hafele-Keating* card had two options, one absurd ("optical illusion…"); the train card offered a fully worked solution versus a bare formula (answer obvious by completeness); that worked option states (γ−1) ≈ 5×10⁻¹⁴ where β²/2 = 5.6×10⁻¹⁴; the GPS and "PROPER time" cards were re-asked after being answered; the train card needs binomial approximation never taught. **Status:** OPEN

### PHYS-017 — [P2] [Lesson flow] Same-concept lesson 1 (SI Units): question text and attached card are about different things
- **Date:** 2026-10-04 ≈23:20 UTC · **Concept:** `phys.meas.units` · **Lesson:** SI Units and Measurement (order 1), first attempt
- **Tutor:** *"Sure, here's a question for you. Imagine two friends each measuring the same rope. One counts hand-spans… "* with attached card *"A component is labelled 4.7 µF (microfarads). Written in farads, what is that?"*; later *"Remember, the SI unit for electric current is the ampere… Here's a question for you:"* with a card about the gram vs kilogram.
- **Also:** the µ (micro) prefix is quizzed but never taught; three near-duplicate kelvin/temperature cards were asked (*"Is the SI base unit for temperature the degree Celsius or the kelvin?"*, *"Why is kelvin…?"*, *"Which of these is the SI base unit for temperature?"*).
- **Reproducible:** yes (observed twice in one session). **Related:** PCD-033. **Status:** OPEN

## Out-of-scope observations (Chemistry) from the earlier four-lesson session — preserved, not counted

These were found by the same learner on 2026-10-04 and are recorded so they are not lost. They are **Chemistry**, outside this file's Physics scope, and are not included in the Physics counts above.

- **CHEM-A1 [P1] `chem.equil.le-chatelier`** — *"If you remove product or add product, the opposite happens."* Removing product shifts the reaction forward (same as adding reactant). When the learner later asked, the tutor stated the correct behaviour without acknowledging the contradiction.
- **CHEM-A2 [P1] `chem.equil.le-chatelier`** — model-made figures contradict the lesson: a process-flow mentioning "Q = K"/"reactant A" while discussing SO₃ and pressure (Q never introduced) and a graph "K vs Temperature" `exp(0.005*x)` with K always rising, while the lesson's reactions are exothermic (K falls); both said "Study it while I explain" with no explanation. The resolver has no faithful figure for this concept (`no-figure:no-faithful-visual`).
- **CHEM-A3 [P1/P2] `chem.equil.le-chatelier`** — replies that stop early: after *"too many words for me. explain simpler please. what is shift?"* the reply ends after an equation; the next ends after listing four stresses with no conclusion or question.
- **CHEM-A4 [P2] `chem.equil.le-chatelier`** — text *"let's see if the idea about catalysts is clear"* attached to an inert-gas card never taught; principle-definition card asked 3×.
- **CHEM-A5 [P2] `chem.elect.galvanic-cell`** — feedback cut mid-sentence (*"…the electron count that the two half-reactions had to share to cancel"*).
- **CHEM-A6 [P2] `chem.elect.galvanic-cell`** — internal voice leaked: *"The learner's statement that the anode is always negative ignores the polarity reversal…"*.
- **CHEM-A7 [P2] `chem.elect.galvanic-cell`** — after *"you explain Nernst again, same as before… please just ask me a question"* the previous reply had repeated the Nernst explanation almost verbatim; *"ok, next question"* returned a dense ALL-CAPS stored paragraph; Nernst n and electrolytic-cell anode polarity were quizzed before being taught; options lopsided (long correct option vs one-line absurd option).
- **CHEM-A8 [P2] `chem.elect.galvanic-cell`** — at 390 px the Daniell-cell figure's large "Ecell = +1.1 V · spontaneous · ΔG = …" label wraps over "e⁻ flow", the wire and the salt-bridge label (local render of the production figure; desktop is clean).

## Uncertainties (not counted as defects)

- Equations arrive with raw `\( … \)` / `\[ … \]` delimiters in the API text; whether the real UI renders them was not established.
- Progress object: after four mastered lessons `progress.completedLessons` was `[]` and `currentLesson` `1` for both subjects, and `lastScore` was `65` for all four mastered topics regardless of mistakes. Meaning/UI impact not established.
- `phys.meas.units` figure: the tutor described icons (ruler, dumbbell, stopwatch, battery, thermometer, beaker, candle) for a figure whose labels are text only; not yet confirmed against a render.
