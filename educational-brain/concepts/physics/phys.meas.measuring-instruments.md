# Vernier Calipers and Screw Gauge — `phys.meas.measuring-instruments`

## Identity

- **Concept ID**: `phys.meas.measuring-instruments`
- **Curriculum location**: physics / measurement & units
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.errors` — the load-bearing part is that every instrument has a
    smallest readable step and that a reading carries an uncertainty of about that
    step. The least count IS that step; zero error IS a systematic error. Without
    `errors`, both are rules without a reason.
- **Unlocks** (from KG): none listed. Every practical length measurement in the
  laboratory curriculum (wire diameter for resistivity, bob diameter for the
  pendulum, glass slab thickness) uses one of these two instruments.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 11 Lab Manual; NCERT Physics Class 11 Ch. 2

## Learning Objective

After this concept, the learner can:

1. Derive the least count of a vernier caliper (1 MSD − 1 VSD) and of a screw
     gauge (pitch ÷ number of circular divisions).
2. Take a reading: main-scale reading + coinciding division × least count.
3. Find the zero error and correct a reading: true = observed − zero error, with
     the zero error's sign.
4. Report a reading to the least count — no more digits, no fewer.

## Core Understanding

A ruler with millimetre marks cannot tell 12.3 mm from 12.4 mm. A vernier caliper beats this with a second, sliding scale whose divisions are slightly shorter than the main ones. In the common design, 10 vernier divisions span 9 mm, so each vernier division is 0.9 mm — exactly 0.1 mm shorter than a main-scale division. If the jaws open 0.6 mm past a main mark, the 6th vernier mark is the one that lines up with a main mark. So the least count — the smallest length the instrument can read — is 1 MSD − 1 VSD = 0.1 mm, and a reading is: main-scale reading (the mark just before the vernier zero) plus the coinciding division number times the least count. Main scale 23 mm, 6th division coinciding: 23 + 6 × 0.1 = 23.6 mm.

A screw gauge uses a screw instead. Each full turn of the thimble moves the spindle forward by one pitch, typically 0.5 mm. If the thimble carries 50 divisions, turning by one division moves the spindle 0.5 ÷ 50 = 0.01 mm. Least count = pitch ÷ number of circular divisions, and a reading is the main-scale reading plus the circular-scale reading times the least count: 4.5 mm and 28 divisions gives 4.5 + 28 × 0.01 = 4.78 mm.

Before measuring anything, close the jaws (or bring the screw faces together). If the instrument does not read zero, it has a zero error, and that same error is in every reading it gives. Correct by subtracting it with its sign: true value = observed reading − zero error. A positive zero error of +0.2 mm turns an observed 23.6 mm into 23.4 mm; a negative zero error of −0.03 mm turns 4.78 mm into 4.81 mm. Finally, report to the least count: a 0.1 mm vernier reports 23.6 mm, never 23.65 mm.

## Mental Models

- **Beginner (arriving)**: a vernier is a ruler with extra marks; a reading is
  "the big number plus the little number". No idea why the vernier gives tenths.
- **Intermediate**: the vernier divisions are shorter than main divisions by one
  least count; which mark coincides tells how many least counts the zero has
  passed the last main mark. A screw turns length into rotation: one division of
  rotation is a tiny fraction of the pitch.
- **Advanced**: least count is set by the design (N vernier divisions spanning
  N − 1 main divisions gives LC = 1 MSD / N; pitch / N for a screw). Zero error is
  a systematic error with a known sign, removed by correction, unlike the random
  ± one least count uncertainty that remains.
- **Expert**: both instruments are mechanical magnifiers of a small displacement.
  The same idea — a vernier or a fine screw — appears in spectrometer angle
  scales, travelling microscopes and optical micrometers. Backlash in a screw
  (play when reversing direction) is a further systematic error, avoided by always
  approaching the reading in one direction.
- **Versioning note**: install the intermediate model; the advanced N-division
  generalisation is the transfer target of the gate.

## Why Students Fail

The dominant failure is reading the vernier division number as a length — adding
"6" instead of "6 × 0.1 mm" — because the formula is memorised without the idea
that each vernier step is worth one least count. The second is the zero-error
sign: learners add a positive zero error, reasoning "correct means add". The third
is reporting false precision — copying a calculator answer with digits finer than
the least count.

## Misconceptions

**M1 — Add the coinciding division number directly**
- *Why*: "MSR + VSR" is remembered without the "× LC" (type 5, instructional
  compression).
- *Symptom / phrases*: "23 plus 6 is 29 mm"; "23.06 mm".
- *Detection probe (verbatim)*: "A vernier has least count 0.1 mm. The main scale
  reads 23 mm and the 6th vernier division lines up. What is the length?"
- *Recovery*: point out the vernier zero sits between 23 and 24 mm, so the length
  cannot be 29 mm. Each vernier step is worth 0.1 mm; six steps are 0.6 mm.
- *Verification*: three readings on verniers with different least counts.

**M2 — Add the zero error**
- *Why*: "correction" is heard as "add something" (type 2, everyday language).
- *Symptom*: zero error +0.2 mm, reading 23.6 mm → reports 23.8 mm.
- *Detection probe*: "Jaws closed, it reads +0.2 mm. A rod reads 23.6 mm. True
  length?"
- *Recovery*: with nothing in the jaws it reads 0.2 mm too much, so it reads
  0.2 mm too much for every object. Take it off: 23.4 mm.
- *Verification*: two positive and two negative zero-error corrections.

**M3 — Least count is the smallest main-scale division**
- *Why*: the ruler's 1 mm is the only "smallest division" the learner knows
  (type 4, overgeneralisation).
- *Symptom*: says a vernier caliper's least count is 1 mm, or a screw gauge's is
  0.5 mm (the pitch).
- *Detection probe*: "A screw gauge has pitch 0.5 mm and 50 circular divisions.
  What is its least count?"
- *Recovery*: one full turn moves 0.5 mm; one division is one fiftieth of a turn,
  so it moves 0.01 mm.
- *Verification*: least count for two verniers and two screw gauges of different
  designs.

**M4 — More decimal places means a more accurate reading**
- *Why*: calculator outputs look precise (type 1, perceptual).
- *Symptom*: reports 2.3612 cm from a vernier of least count 0.01 cm.
- *Detection probe*: "Could a vernier of least count 0.1 mm report 23.65 mm?"
- *Recovery*: the instrument cannot tell 23.6 from 23.65; the last digit is not
  measured. Report to the least count (link to `phys.meas.significant-figures`).
- *Verification*: classify four reported readings as acceptable or not.

## Analogies

- **Best analogy**: two combs with slightly different tooth spacing laid on top
  of each other. Slide one a little and a different pair of teeth lines up. Which
  pair lines up tells how far you slid — far more finely than the tooth spacing.
  *Breaking point*: the combs are not labelled with a least count; the analogy
  shows the idea, not the reading procedure.
- **Alternative (screw gauge)**: a bolt in a nut — one full turn advances the bolt
  by one thread. A quarter turn advances it a quarter of a thread.
  *Breaking point*: a real bolt has play (backlash); the gauge is designed to
  minimise it.
- **Anti-analogy to avoid**: "the vernier is a magnifying glass for the ruler."
  It suggests the vernier makes marks bigger, not that it compares two spacings.

## Demonstrations

- **Home, no equipment**: draw two scales on paper strips — one with 1 cm marks,
  one with ten marks spanning 9 cm. Slide one along the other and watch which
  marks line up as you move by 1 mm steps.
- **Teacher demo**: measure a coin's diameter with a ruler, then with a vernier,
  then a wire with a screw gauge. Record the least count each time.
- **Zero error**: close the jaws of a slightly worn caliper and show the non-zero
  reading; then measure the same rod and correct it.
- **Prediction before demo**: "how many sheets of paper make 1 mm?" — then measure
  a stack of 100 sheets with a screw gauge and divide.

## Discovery Questions

Guided discovery fits the least count, direct instruction fits the reading
convention.

**Structure**:
1. *Need*: "The coin is between 23 and 24 mm. How could we find the tenths?"
2. *Discovery*: with paper strips, "slide by 0.1 of a division — which marks line
   up? Slide by 0.6?" → each coincidence step is worth 1 MSD − 1 VSD.
3. *Direct instruction*: the reading formula and the zero-error convention.
4. *Practice*: readings on both instruments, then with zero errors.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): two scales side by side.
2. **Worked examples** (high fit): one vernier reading, one screw-gauge reading,
   one zero-error correction.
3. **Error exposure** (high fit for M1/M2): the impossible 29 mm reading; the
   added zero error.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Vernier: LC = 1 − 0.9 = 0.1 mm; MSR 23 mm; 6th division → 23.6 mm.
   (b) Screw gauge: LC = 0.5 ÷ 50 = 0.01 mm; main 4.5 mm; thimble 28 → 4.78 mm.
   (c) Zero error: +0.2 mm on a vernier reading 23.6 mm → 23.4 mm.

2. **ERROR-ANALYSIS** — a student writes "23 + 6 = 29 mm". Ask the learner where
   the vernier zero actually sits, and whether 29 mm is possible.

3. **PREDICTION-BEFORE-DEMO** — before the zero-error correction, ask: "is the rod
   longer or shorter than the reading?"

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "Vernier LC 0.1 mm: 41 mm and 3rd division" → "LC of a 0.5 mm, 50-division
   gauge" → "zero error −0.2 mm, reading 12.4 mm".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always says "6 divisions, each worth
0.1 millimetre" — never just "plus 6"; asks "where is the vernier zero?" before
any reading; says "the instrument reads too much" for a positive zero error.

*Load-bearing sentence to slow down on*: "Each vernier division is one least
count shorter than a main division — so the division that lines up tells you how
many least counts past the last main mark the zero has gone."

*What to listen for*: "plus six" → M1; "add the zero error" → M2; "least count is
1 mm" → M3; many decimal places → M4.

## Assessment Signals

**Diagnostic — golden probe**: "A vernier has least count 0.1 mm. The main scale
reads 23 mm and the 6th vernier division lines up. What is the length?"
Correct: 23.6 mm.

**Distractor-mapped items**:
- "Pitch 0.5 mm, 50 divisions — least count?" Options: 0.5 mm, 0.01 mm, 0.1 mm,
  25 mm. Answer: 0.01 mm. Distractor 0.5 mm targets M3.
- "Zero error +0.2 mm, reading 23.6 mm — true?" Options: 23.8, 23.4, 23.6,
  21.6 mm. Answer: 23.4 mm. Distractor 23.8 targets M2.

**Guided practice → independent practice fading ladder**:
1. Least count for three vernier designs (scaffolded).
2. Vernier readings (3 problems).
3. Screw gauge least count and readings (3 problems).
4. Zero-error corrections, both signs (4 problems).
5. (Unscaffolded) choose the instrument and report a measurement to the right
   number of digits.

**Mastery gate set** (per assessment/05):
- *Production*: 4 readings (two per instrument).
- *New surface*: an unfamiliar vernier (20 divisions over 19 mm).
- *Mixed*: readings with and without zero errors.
- *Delayed*: one-week check — the paper-thickness method.

**Calibration note**: learners who have done the lab once feel confident. The
check that reveals miscalibration is the unfamiliar vernier design — if they
assume 0.1 mm, the least count is not derived but remembered.

## Tutor Recovery Strategy

*Likeliest utterance*: "I add the vernier number, right?" (M1); "which way does
the zero error go?" (M2).

*Concept-specific smaller question*: "Where is the vernier's zero — between which
two main-scale marks?" Once the learner places it between 23 and 24 mm, any
reading outside that range is visibly wrong.

*M2 recovery*: "With nothing in the jaws, what does it read? Too much or too
little? So for the rod, too much or too little?"

## Memory Hooks

- **Concept type**: procedure (reading) + concept (least count as a design
  property).
- **Review form** (per Delivery 2 §8): procedure → distributed practice in later
  laboratory concepts; concept → one derivation of LC per review.
- **Automaticity target**: the 0.1 mm vernier and 0.01 mm screw gauge least counts
  should be instant before resistivity and pendulum experiments.
- **Interleaving partners**: `phys.meas.errors`, `phys.meas.significant-figures`.

## Transfer Connections

- *Near*: `phys.meas.significant-figures` — reporting to the least count.
- *Near*: `phys.meas.errors` — zero error as a systematic error; least count as
  the random uncertainty of a single reading.
- *Far*: `phys.em.resistivity` — the wire diameter from a screw gauge enters as d²,
  doubling its relative error.
- *Real-world*: machinists' calipers and micrometers; tyre-tread depth gauges;
  digital calipers that still have a least count (0.01 mm).
- *Expert transfer*: verniers on spectrometers and barometers; interferometric
  length measurement as the modern limit.

## Cross-Subject Connections

- **Mathematics**: the vernier principle is a difference of two spacings — the
  same idea as a beat frequency or a least common multiple of two step sizes.
- **Chemistry**: burette and pipette readings follow the same "read to the
  smallest division, estimate no further" rule.
- **Engineering**: tolerances in machining are specified in hundredths of a
  millimetre and checked with micrometers.
- **Biology**: a stage micrometer and eyepiece graticule calibrate cell sizes the
  same way a vernier calibrates a length.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.meas.measuring-instruments.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 2). The instruments were
named once in `phys.meas.errors` and never taught.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
