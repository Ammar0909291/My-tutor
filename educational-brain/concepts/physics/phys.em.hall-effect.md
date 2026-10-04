# The Hall Effect — `phys.em.hall-effect`

## Identity

- **Concept ID**: `phys.em.hall-effect`
- **Curriculum location**: physics / electricity and magnetism (magnetic force)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.magnetic-force` — the load-bearing part is the Lorentz force F = qv × B on a
    moving charge, perpendicular to both v and B; its chain includes
    `phys.em.electric-current`, which supplies I = nqv_dA.
- **Unlocks** (from KG): none listed. Leads to carrier-type measurement in
  semiconductors and to magnetic-field sensors.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: Halliday Resnick Ch. 28

## Learning Objective

After this concept, the learner can:

1. Explain how the Hall voltage builds up and why it stops growing.
2. Derive and apply V_H = IB/(nqt).
3. Use the Hall voltage's sign to identify the charge carriers.
4. Explain how Hall probes measure magnetic fields and why they use semiconductors.

## Core Understanding

Send a current along a flat strip of conductor and apply a magnetic field B perpendicular to the strip. The charge carriers drift along the strip at speed v_d, and the magnetic force qv_d × B pushes them sideways, towards one edge. They pile up there, and the opposite edge is left with the opposite charge. That separation creates an electric field across the strip which pushes the carriers back. The pile-up stops growing as soon as the electric force balances the magnetic force: qE = qv_dB. From then on the carriers flow straight again, and a steady voltage — the Hall voltage — stands across the strip's width w: V_H = Ew = v_dBw.

The drift speed comes from the current: I = nqv_dA with A = wt (t is the thickness), so v_d = I/(nqwt) and V_H = IB/(nqt). The carrier density n is in the denominator. In a copper strip 0.1 mm thick (n = 8.5 × 10²⁸ m⁻³) carrying 5 A in a 1.0 T field, the Hall voltage is only about 3.7 microvolts, because with so many carriers each one drifts very slowly. In a semiconductor with n ≈ 10²² m⁻³, just 10 mA in 0.5 T gives about 31 millivolts — fewer carriers, each drifting much faster, feel a much larger magnetic force. That is why Hall probes are made from semiconductors.

The Hall voltage also reveals the sign of the carriers. For the same conventional current, negative electrons drift one way and positive holes the other; reversing both q and v leaves qv × B unchanged, so both kinds pile up on the same edge — but that edge becomes negative for electrons and positive for holes. The Hall voltage therefore has opposite signs in n-type and p-type semiconductors, which is how physicists first showed that some materials conduct by positive carriers. Because V_H is proportional to B, a Hall probe calibrated once measures magnetic fields directly; Hall sensors sit in phones (compass and lid detection), cars (wheel-speed and crankshaft sensors) and laboratory magnetometers.

## Mental Models

- **Beginner (arriving)**: a magnetic field pushes the whole wire; nothing happens
  inside it.
- **Intermediate**: carriers deflected → edge charge → transverse E balances qv_dB;
  V_H = IB/(nqt); sign gives carrier type; probes use V_H ∝ B.
- **Advanced**: Hall coefficient R_H = 1/(nq); Hall mobility; magnetoresistance.
- **Expert**: the quantum Hall effect, with resistance quantised in units of h/e².
- **Versioning note**: install the intermediate model; name the Hall coefficient as
  the measured material constant.

## Why Students Fail

The force on a current-carrying wire is taught as a force on the wire, so the sideways
push on individual carriers is unfamiliar. "More charge, more effect" predicts the
wrong trend with n. And the sign argument needs both q and v reversed at once.

## Misconceptions

**M1 — The Hall voltage has the same sign whatever the carriers**
- *Why*: only conventional current considered (type 5).
- *Symptom / phrases*: "same current, same field, same voltage".
- *Detection probe (verbatim)*: "An n-type and a p-type sample carry current in the
  same direction in the same field. Do their Hall voltages have the same sign?"
- *Recovery*: work out qv × B for each carrier; same edge, opposite charge.
- *Verification*: identify carrier type from two measured polarities.

**M2 — More charge carriers give a larger Hall voltage**
- *Why*: "more charge, more effect" (type 4).
- *Symptom*: "copper gives the bigger Hall voltage".
- *Detection probe*: "The same current and field are applied to a copper strip and to
  an equally thick semiconductor strip. Which shows the larger Hall voltage?"
- *Recovery*: I = nqv_dA — more carriers, slower drift, smaller force.
- *Verification*: two V_H calculations with different n.

**M3 — The Hall voltage keeps growing as long as the current flows**
- *Why*: continuous force pictured as continuous accumulation (type 5).
- *Symptom*: "charge keeps piling up".
- *Detection probe*: "Why doesn't the charge on the edge keep growing?"
- *Recovery*: the transverse field balances the magnetic force.
- *Verification*: explain the steady state in one sentence.

## Analogies

- **Best analogy**: a crosswind on a road of cars — they drift to one side until the
  kerb pushes back, then drive straight.
  *Breaking point*: the "kerb" in the Hall effect is the electric field of the piled-up
  charge, which builds itself.
- **Alternative**: few fast cars vs many slow ones carrying the same traffic — the fast
  ones feel the crosswind's sideways push more.
  *Breaking point*: illustrative only.
- **Anti-analogy to avoid**: "the magnet pushes the wire, not the charges." It hides
  the mechanism.

## Demonstrations

- **Home**: a phone's magnetometer app reacting to a fridge magnet (a Hall sensor).
- **Teacher demo**: a Hall probe (or a Hall-effect apparatus with a germanium slab) —
  reverse B or the current and watch the voltage flip; compare n- and p-type samples.
- **Prediction before demo**: "reverse the magnetic field — what happens to the Hall
  voltage?"

## Discovery Questions

**Structure**:
1. *Need*: "How does a phone sense a magnetic field?"
2. *Discovery*: carriers deflected in a strip.
3. *Direct instruction*: balance, V_H = IB/(nqt), sign.
4. *Apply*: probes, carrier identification.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): sensors in phones and cars.
2. **Worked examples** (high fit): copper 3.7 μV; semiconductor 31 mV.
3. **Error exposure** (high fit for M1/M2): the two strips' edge charges; drift speeds.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Balance: qE = qv_dB → V_H = v_dBw.
   (b) Copper: 5 × 1 / (8.5 × 10²⁸ × 1.6 × 10⁻¹⁹ × 10⁻⁴) ≈ 3.7 × 10⁻⁶ V.
   (c) Semiconductor: 0.01 × 0.5 / (10²² × 1.6 × 10⁻¹⁹ × 10⁻⁴) ≈ 0.031 V.

2. **ERROR-ANALYSIS** — a student says copper gives the bigger voltage. Ask about
   drift speeds.

3. **PREDICTION-BEFORE-DEMO** — before reversing B, ask what the voltage will do.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "write V_H" → "copper vs semiconductor" → "what the sign tells you".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor follows one carrier: "it drifts, it's
pushed, charge piles up, the field pushes back"; says "n downstairs" for the formula.

*Load-bearing sentence to slow down on*: "Fewer carriers must drift faster to carry
the same current — so they feel a bigger magnetic push."

*What to listen for*: "same sign anyway" → M1; "copper is bigger" → M2; "it keeps
piling up" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Copper or semiconductor — bigger Hall voltage?"
Correct: the semiconductor.

**Distractor-mapped items**:
- "Copper Hall voltage?" Options: ≈ 3.7 μV; ≈ 3.7 mV; ≈ 31 mV; zero. Answer:
  ≈ 3.7 μV.
- "n-type vs p-type sign?" Options: opposite; the same; zero for p-type. Answer:
  opposite. "The same" targets M1.

**Guided practice → independent practice fading ladder**:
1. Force directions on carriers (3 items).
2. V_H calculations (3 items).
3. Carrier-sign identification (2 items).
4. Hall-probe calibration (2 items).
5. (Unscaffolded) design a carrier-type test.

**Mastery gate set** (per assessment/05):
- *Production*: one V_H and one probe-calibration calculation.
- *New surface*: wheel-speed sensors.
- *Mixed*: sign items interleaved with trend items.
- *Delayed*: one-week check — "why semiconductors for probes?"

**Calibration note**: learners can substitute into V_H = IB/(nqt); the check that
reveals miscalibration is the copper-vs-semiconductor trend question.

## Tutor Recovery Strategy

*Likeliest utterance*: "copper has more electrons, so more voltage" (M2).

*Concept-specific smaller question*: "To carry 5 A, do copper's electrons drift fast or
slowly?"

*M1 recovery*: "Electrons and holes drift opposite ways — which edge does each reach?"

## Memory Hooks

- **Concept type**: principle (force balance) + application (sensors).
- **Review form** (per Delivery 2 §8): V_H formula and trends as spaced retrieval;
  sign problems as distributed practice.
- **Automaticity target**: "V_H = IB/(nqt): fewer carriers, bigger V_H; sign = carrier
  sign".
- **Interleaving partners**: `phys.em.magnetic-force`, `phys.em.electric-current`,
  `phys.mod.extrinsic-semiconductors`.

## Transfer Connections

- *Near*: `phys.em.magnetic-force` — F = qv × B on each carrier.
- *Near*: `phys.mod.extrinsic-semiconductors` — n- and p-type carriers.
- *Far*: magnetohydrodynamic generators; the quantum Hall effect.
- *Real-world*: phone compasses, car sensors, brushless motors, current clamps.
- *Expert transfer*: resistance standards from the quantum Hall effect.

## Cross-Subject Connections

- **Chemistry**: carrier concentration in doped semiconductors.
- **Engineering**: contactless current and position sensing.
- **Mathematics**: vector cross products.
- **Technology**: smartphones' magnetometers.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.hall-effect.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 39). The Hall effect had a single
sentence in the corpus before this node; `phys.em.electric-current` (I = nqv_dA) is
reached through `phys.em.magnetic-force`, so no extra edge is needed.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).
