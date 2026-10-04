# Teaching Blueprint: phys.opt.rectilinear-propagation

## 0. Concept Profile
concept_id: phys.opt.rectilinear-propagation
name: Rectilinear Propagation: Shadows, Eclipses and the Pinhole Camera
domain: Optics (Physics)
difficulty: foundational (1)
bloom: understand
prerequisites: []
mastery_threshold: 0.7
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (a torch, an object and a wall before any ray diagram; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States that light travels in straight lines through a uniform medium and uses straight rays from the source past the edges of an object to predict the position and size of its shadow.
2. Distinguishes the umbra (no light from the source reaches it) from the penumbra (light from only part of an extended source reaches it), and uses them to explain total and partial solar eclipses and a lunar eclipse.
3. Explains why a pinhole camera forms an inverted image, computes its size with similar triangles (image height / object height = image distance / object distance), and predicts that a larger hole gives a brighter but blurrier image.

A student who says a shadow is "a dark copy of the object" or that the pinhole image is upright, or who explains the Moon's phases by the Earth's shadow, has **NOT** achieved mastery — without the straight-ray model, every ray diagram in reflection, refraction and lenses is drawn without a reason.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No ray model | Describes shadows as "dark areas" with no source–object–screen geometry | Protocol A (Concrete) |
| S1 | Rule without geometry | "Light goes straight" but cannot predict shadow size or pinhole inversion | Protocol B (Counterexample-first) |
| S2-SHADOW-IS-IMAGE | Shadow as a copy | Expects a shadow to show colour or features; draws shadows from the object outward | Misconception Engine → then Protocol C |
| S2-PHASES-ARE-SHADOW | Phases = eclipse | Says the crescent Moon is the Earth's shadow | Misconception Engine → then Protocol C |
| S3 | Partial — shadows fine; eclipses or pinhole not | Correct umbra; upright pinhole image | Protocol C (Guided Questioning) |
| S6 | Anxiety on geometry | Avoids drawing rays | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Have you thought about why shadows form and why they have the shape they do?"
  No → S0. Enter Protocol A (Concrete).
  Yes → DB-2.

DB-2 (representation / misconception test):
"A torch shines on a ball in front of a wall. Draw or describe where the shadow falls and why it is that size."
  Draws straight rays from the torch grazing the ball's edges to the wall → S3. Enter Protocol C.
  "Behind the ball, round" (no rays) → S1. Enter Protocol B.
  "The shadow is a dark picture of the ball" / expects colour or features → SIGNAL:MISCONCEPTION:MC-SHADOW-IS-IMAGE. Enter Misconception Engine.
  Pause / "I don't know" → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (phases check — overlays):
"Why does the Moon look like a crescent some nights?"
  "We see only part of its sunlit half" → no flag.
  "The Earth's shadow covers part of it" → add SIGNAL:MISCONCEPTION:MC-PHASES-ARE-SHADOW (repair at TA-5).
  Confidence 4–5 with a wrong DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (no KG prerequisite — entry node of the optics domain):
"Can you name something that gives out its own light, and something we see only because light falls on it?"
  Cannot separate luminous from non-luminous → in-session minimum repair at TA-1 (the sun/torch vs the Moon/book contrast). No session suspension: this concept is a root.

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no ray model (DB-1 = No).
Success exit: predicts a shadow's size, explains an eclipse with umbra/penumbra, and predicts the pinhole image's orientation and size (P91 all 5 probes CORRECT).
Failure exit: on SHADOW-IS-IMAGE → Misconception Engine[MC-SHADOW-IS-IMAGE], resume at TA-3. On geometry anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Sources and Straight Lines]
P01
→ P04[content: "Light leaves a source and goes in straight lines until something stops it. Almost everything in this lesson follows from that."]
→ P06[content: a candle viewed through three cards with holes — visible only when the holes are in a straight line; a bent pipe through which the candle cannot be seen]
→ P14[predict: "Move the middle card a little to one side. Can you still see the flame?"] → P55
→ success_path[no] → P49 → P05[curiosity: "If light travels straight, what happens behind an object it can't pass through?"]

[TA-2: Shadows from Straight Rays]
P02
→ P06[content: a small torch, a ball and a wall; rays drawn from the torch grazing the ball's top and bottom to the wall]
→ P13[think-aloud: "The shadow is just the region where the straight rays are blocked. Its edges are where the grazing rays land."]
→ P08[notation: "point source: shadow size / object size = (source–screen distance) / (source–object distance)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Move the ball closer to the torch. Bigger or smaller shadow?"] → P55
→ success_path[bigger] → P49
→ failure_path → P50 → P51[diagnose: no rays drawn or wrong direction] → P52[narrow: "Draw the two grazing rays again with the ball closer — where do they hit the wall?"] → re-elicit P34 → P55

[TA-3: Umbra and Penumbra]
P02
→ P06[content: replace the small torch with a large lamp (extended source)]
→ P17[contrast: "The shadow now has a dark core and a fuzzy edge. Why didn't the small torch give a fuzzy edge?"] → P55
→ success_path
→ P13[think-aloud: "In the core, no part of the lamp can be seen — umbra. In the fuzzy edge, part of the lamp is blocked and part is visible — penumbra."]
→ P41[diagnostic: "Does a shadow ever show the colour of the object?"] → P55
→ [if no — it is only blocked light] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-SHADOW-IS-IMAGE → misconception_repair_chain[MC-SHADOW-IS-IMAGE]

[TA-4: Eclipses]
P02
→ P07[modality: Sun–Moon–Earth in a line (solar eclipse) and Sun–Earth–Moon in a line (lunar eclipse), umbra and penumbra drawn]
→ P16[compare: "Standing in the Moon's umbra vs in its penumbra — what do you see of the Sun?"] → P55
→ success_path[total vs partial] → P49
→ P34[question: "Why isn't there an eclipse every month?"] → P55
→ success_path[the Moon's orbit is tilted, so usually it passes above or below the line] → P49

[TA-5: Phases Are Not Shadows]
P02
→ P17[contrast: "In a lunar eclipse the Earth is between the Sun and Moon. At a crescent Moon, where is the Earth?"] → P55
→ P13[think-aloud: "At a crescent the Earth is NOT between them. Half the Moon is always sunlit; we see a crescent because we are looking mostly at its dark half."]
→ P34[question: "Is a full Moon or a new Moon the only time a lunar eclipse can happen?"] → P55
→ success_path[full Moon] → P49

[TA-6: The Pinhole Camera]
P02
→ P06[content: a box with a pinhole facing a candle; image on tracing paper at the back]
→ P14[predict: "Is the candle's image upright or upside down?"] → P55
→ P13[think-aloud: "A ray from the top of the flame goes straight through the hole and lands low; one from the bottom lands high. The image is inverted."]
→ P08[notation: "image height / object height = image distance / object distance (similar triangles)"]
→ P34[question: "Tree 10 m tall, 50 m away, box 20 cm long. Image size?"] → P55
→ success_path[4 cm, inverted] → P49
→ P90_expansion:
    P79[predict: "Make the hole bigger. Brighter or dimmer? Sharper or blurrier?"] → P55
    → P49 → P51[check: explained overlapping images from each part of the hole?]
    → P35[open: "Explain the inverted image using two rays only."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Arrange a torch, a coin and a wall so the coin's shadow is three times the coin's size. Give distances."] → P55 → CORRECT
    → P76[transfer: "A 1.5 m person stands 3 m from a 15 cm pinhole camera. Image height?"] → P55 → CORRECT
    → P75[boundary: "Observer in the Moon's penumbra during a solar eclipse — what does she see?"] → P55 → CORRECT
    → P74[classify: "Crescent Moon — caused by the Earth's shadow or by viewing angle?"] → P55 → CORRECT
    → P78[explain: "Why does a large lamp give a shadow with a fuzzy edge?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: "light goes straight" stated, geometry not used.
Success exit: predicts shadow size and pinhole inversion from rays.
Failure exit: SHADOW-IS-IMAGE → Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A pinhole camera faces a candle. Upright or inverted image — show why with two rays."] → P54 (novel) → P55; on the stall run TA-2's ray drawing, then TA-6.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: shadows correct; eclipses or pinhole not.
Success exit: all three phenomena from the same ray model.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-3 or TA-6; P35/P36 probes; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one shadow predicted with rays and the pinhole inversion explained.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use physical demos before any drawing; omit the similar-triangle calculation until the second session; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: DB-3 confident and wrong.
Success exit: revises the explanation after the contradiction.
Failure exit: Misconception Engine.
Key deltas: open with the pinhole prediction (upright is the common confident answer), show the inverted image, let the mismatch sit (P55).

## 6. Misconception Engine

### MC-SHADOW-IS-IMAGE: "A shadow is a dark copy or picture of the object"
trigger_signal: student expects a shadow to carry the object's colour or surface features, or describes it as something the object "sends out".
conflict_evidence [P28]: "Shine a torch on a red ball and on a blue ball of the same size. Are their shadows red and blue?"
bridge_text [P30]: "A shadow is not something the object makes — it is a place light cannot reach because the object blocks the straight rays. Blocked light has no colour; that is why every shadow is dark."
replacement_text [P31]: "To find a shadow, draw straight rays from the source past the object's edges. The shadow is everything behind the object that those rays cannot reach."
discrimination_pairs [P33]: ["shadow of a coloured ball (dark, the outline only) vs its image in a mirror (coloured, detailed)", "point source (sharp umbra only) vs extended source (umbra plus penumbra)"]
s6_path: skip P28; make shadows of differently coloured objects together and notice they look the same.

### MC-PHASES-ARE-SHADOW: "The Moon's phases are the Earth's shadow"
trigger_signal: student explains a crescent or half Moon as part of the Moon being in the Earth's shadow.
conflict_evidence [P28]: "For the Earth's shadow to fall on the Moon, the Earth must be between the Sun and the Moon. At a crescent Moon, the Moon appears close to the Sun in the sky. Is the Earth between them then?"
bridge_text [P30]: "Half of the Moon is always lit by the Sun. As it orbits, we see different amounts of that lit half. A crescent means we are looking mostly at the dark half. The Earth's shadow only reaches the Moon at a full Moon, in a lunar eclipse."
replacement_text [P31]: "Phases: how much of the sunlit half faces us. Lunar eclipse: the Moon passes through the Earth's shadow, only possible at full Moon."
discrimination_pairs [P33]: ["crescent Moon (viewing angle, every month) vs lunar eclipse (Earth's shadow, a few times a year)", "a shadow edge on the Moon in an eclipse (curved, from the round Earth) vs the terminator at a phase"]
s6_path: skip P28; a lamp and a ball moved around the learner's head in a dark room — the learner sees the phases form with no shadow involved.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Crescent Moon: Earth's shadow or viewing angle?" | CORRECT = viewing angle |
| P74 (classify) | "Small torch or large lamp — which gives a penumbra?" | CORRECT = large lamp (extended source) |
| P75 (boundary) | "Observer in the Moon's penumbra during a solar eclipse?" | CORRECT = partial eclipse |
| P76 (transfer) | "1.5 m person, 3 m from a 15 cm pinhole camera — image?" | CORRECT = 7.5 cm, inverted |
| P77 (generate) | "Coin shadow three times the coin's size — distances?" | CORRECT = source–wall distance three times source–coin distance |
| P78 (explain) | "Why does a large lamp give a fuzzy edge?" | CORRECT = parts of the lamp are blocked, parts visible |
| P79 (predict) | "Bigger pinhole — brighter? sharper?" | CORRECT = brighter, blurrier |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Arrange a torch, a coin and a wall so the coin's shadow is three times the coin's size. Give distances." → expected: CORRECT
P76: "A 1.5 m person stands 3 m from a 15 cm pinhole camera. Image height?" → expected: CORRECT
P75: "Observer in the Moon's penumbra during a solar eclipse — what does she see?" → expected: CORRECT
P74: "Crescent Moon — caused by the Earth's shadow or by viewing angle?" → expected: CORRECT
P78: "Why does a large lamp give a shadow with a fuzzy edge?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Draw the shadow of a ball lit by a small torch, and say what happens to it as the ball moves toward the wall."
Interval 2 (3 days): "Solar eclipse or lunar eclipse — which one puts the Moon between the Sun and the Earth?"
Interval 3 (7 days): "Why is the pinhole camera's image upside down?"
Interval 4 (21 days): "Why don't we get an eclipse every month?"
Interval 5 (60 days): "A building 30 m tall is 60 m from a pinhole camera 10 cm long. Image height and orientation?"

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2, TA-6) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
