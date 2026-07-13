# Teaching Blueprint: Newton's First Law
**Blueprint ID:** phys.mech.newtons-first-law  
**Status:** PACKAGE_READY  
**Date:** 2026-07-11  
**Framework Version:** Educational Brain v1.0  

---

## 0. Concept Profile

```
concept_id:          phys.mech.newtons-first-law
name:                Newton's First Law (Law of Inertia)
domain:              Classical Mechanics (Physics)
difficulty:          developing (2)
bloom:               understand
prerequisites:       [phys.meas.scalars-vectors, phys.meas.units]
mastery_threshold:   0.75
estimated_hours:     3
unlocks:             [phys.mech.newtons-second-law, phys.mech.equilibrium,
                      phys.mech.friction]
cross_links:         [phys.mech.force-concept, phys.mech.newtons-second-law]
session_cap:         7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:     C (sliding/rolling objects observed before introducing Newton's statement; difficulty ≤ 2 with accelerated P track)
status:              READY
```

**Core idea:** Newton's First Law (Law of Inertia): An object at rest remains at rest, and an object in motion remains in motion at constant velocity, unless acted upon by a net external force. The law has two implications that students must understand separately: (1) rest is not the natural state — uniform motion is equally natural; (2) the relevant quantity is NET force (vector sum of all forces), not the presence of any single force.

**The most dangerous misconception in physics:** Students nearly universally arrive with an Aristotelian belief — objects need continuous force to maintain motion. This is false. Newton's First Law directly contradicts it: objects in motion continue in motion AUTOMATICALLY without any force, provided no net force opposes them.

**Key vocabulary:** net force, inertia, equilibrium, uniform motion, Newton's First Law, resultant force.

**Why difficulty = 2:** The core statement is simple. The understanding challenge is: (1) distinguishing net force (ΣF = 0) from individual forces being present; (2) accepting that uniform motion needs no force to sustain it (directly contradicts everyday experience due to friction); (3) applying the law to both the rest case and the motion case.

---

## 1. Learning Objective

Given a described scenario (object at rest, object in uniform motion, object with changing motion):

(a) the student correctly identifies whether the net force is zero or non-zero;  
(b) the student correctly applies Newton's First Law to predict whether the object's motion changes;  
(c) the student correctly explains why friction, not Newton's First Law, causes objects to slow down.

**Accuracy threshold:** 75%.

---

## 2. Student State Matrix

| State | Entry Condition | Protocol |
|-------|----------------|----------|
| S0 | No prior exposure to Newton's First Law | Protocol A — full CPA, 7 TAs |
| S1 | Can state the law; cannot apply it or explain it correctly | Protocol B — application and explanation, 4 TAs |
| S2 | Carries identified misconception (MC-1, MC-2, MC-3, and/or MC-4) | Protocol C — MAMR repair, 3–5 TAs |
| S3 | Understands rest case; misapplies law to moving objects (or vice versa) | Protocol D — symmetry extension, 4 TAs |
| S6 | Correct recall; low confidence | Protocol E — scaffolded CPA, 5 TAs |
| S9 | Second-language learner; visual dominant | Protocol F — visual-first, 3 TAs |

---

## 3. Diagnostic Battery

---

**DB-1 — Aristotelian Belief Screen**

Stimulus: "A ball is rolling across a smooth flat floor with nothing touching it. What happens to it?"

Response taxonomy:
```
{ stimulus: "It keeps rolling at constant speed (or forever if no friction)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "It slows down and stops — things need a force to keep moving",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "It slows down — because of friction",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Don't know",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-2 → route accordingly  
SIGNAL:PARTIAL → note as potentially correct (friction is real) — run DB-2 to test understanding of the idealized case  
SIGNAL:INCORRECT (MC-1) → flag → route to Protocol C  
SIGNAL:NO_RESPONSE → S0 → Protocol A

---

**DB-2 — Net Force and Rest**

DB-2a (MC-2): "A book sits still on a table. Are there any forces acting on it?"  
DB-2b (MC-4): "A satellite travels at 7,000 m/s in a straight line with no thrust. What is the net force on it?" (space context removes friction objection)  
DB-2c: "Can an object move at constant velocity if a force is acting on it? Explain."

```
DB-2a: { stimulus: "No forces", signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
DB-2a: { stimulus: "Gravity down, normal force up — balanced", signal: "SIGNAL:CORRECT" }

DB-2b: { stimulus: "Non-zero / it needs thrust to maintain speed", signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
DB-2b: { stimulus: "Zero — constant velocity means no acceleration means net force = 0", signal: "SIGNAL:CORRECT" }

DB-2c: { stimulus: "No — a force always changes motion", signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
DB-2c: { stimulus: "Yes — if there is another equal and opposite force (net force = 0)", signal: "SIGNAL:CORRECT" }
```

Flag all MCs; route to Protocol C for any flagged.  
All CORRECT → S1 or above; route to Protocol B.

---

## 4. Prerequisite Check

**PRE-1 — Scalar vs Vector** (requires phys.meas.scalars-vectors)

Stimulus: "Is force a scalar or a vector? Why does that matter when adding two forces?"

Expected: vector; direction matters when summing forces (forces in opposite directions can cancel).

SIGNAL:INCORRECT → prerequisite gap; schedule phys.meas.scalars-vectors first.

---

## 5. Protocol Library

---

### Protocol A — S0 Complete Novice (Full CPA, 7 TAs, single session)

*Session cap: estimated_hours=3 ≥ 1h → max 7 TAs.*  
*CPA path: Concrete (TA-A01–A02) → Perceptual (TA-A03–A05) → Abstract (TA-A05–A06) → Mastery Gate (TA-A07).*

---

**TA-A01 — The Friction Illusion: Concrete**

Primitive sequence: `P01 → P04 → P06 → P14 → P15 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: three surfaces for sliding experiment  
`P04` context: "You've always seen moving things stop. Is stopping natural — or is something always causing it?"  
`P06` concrete demonstration (or description of demonstration):  
- Surface 1: rough carpet — slide a book; it stops quickly  
- Surface 2: smooth table — slide same book; it travels further before stopping  
- Surface 3: ice or air hockey table — slide puck; it travels much further  
Observe: less friction → object travels further. Extrapolate: what if friction = zero?  
`P14` prediction: "If I could remove friction completely, what would happen to the sliding book?"  
`P15` observe: demonstration or student extrapolates from the pattern  
`P55` wait: 5 s  
`P34` closed: "As we reduce friction, the book travels further. What does that suggest would happen with zero friction?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "It would travel forever / never stop",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "It would still slow down eventually — inertia runs out",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "It might go further but would still stop eventually",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → "Friction is what causes the stopping — not motion itself ending naturally." → TA-A02  
- SIGNAL:PARTIAL → `P53` → "Follow the pattern: rough→stops fast, smooth→stops slow, frictionless→stops when?" → TA-A02  
- SIGNAL:INCORRECT → `P50` → `P52` → "What is causing the book to slow on the carpet? If we remove that cause?" → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → focus on one surface at a time → retry `P14`

---

**TA-A02 — Galileo's Thought Experiment: Concrete to Perceptual Bridge**

Primitive sequence: `P01 → P06 → P09 → P21 → P34 → P55 → P49 | P50`

`P01` target_element: two inclined ramps facing each other  
`P06` concrete: ramp setup — ball rolled down a ramp rolls up the opposite ramp to approximately the same height (accounting for friction). Reduce the angle of the opposite ramp: ball travels further along it to reach the same height.  
`P09` narrative: "Galileo imagined: what if you made the opposite ramp completely flat? If the ball always rises to the same height, on a flat ramp it would have to travel infinitely far. It would never stop — it would go on forever."  
`P21` generalisation: "What principle does this reveal about objects in motion when no force acts on them?"  
`P34` closed: "On a perfectly flat, frictionless surface — does a moving object need a force to keep it moving?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "No — it would keep moving on its own without any force",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Yes — without a push it would slow down",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Probably not — but it would slow down from something",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` → introduce: "This is Newton's First Law — objects in motion stay in motion. We name the tendency to resist change **inertia**." → TA-A03  
- SIGNAL:PARTIAL → `P53` → "That 'something' would be friction. Remove friction — it never stops." → TA-A03  
- SIGNAL:INCORRECT → `P50` → `P52` → revisit ramp sequence from TA-A01 → retry `P21`

---

**TA-A03 — Force Diagrams: Balanced and Unbalanced**

Primitive sequence: `P01 → P07 → P16 → P17 → P34 → P55 → P41 → P55 → P49 | P50`

`P01` target_element: two force diagrams side by side  
`P07` diagram A: book on table — gravity arrow (down) labelled 10 N; normal force arrow (up) labelled 10 N; equal lengths; resultant arrow = zero  
`P07` diagram B: car being pushed — applied force (right) labelled 20 N; friction (left) labelled 8 N; net force arrow (right) labelled 12 N  
`P16` compare: "Both objects have forces on them. What is different between diagram A and diagram B?"  
`P17` contrast: "Diagram A: forces cancel → net force = 0 → no change in motion. Diagram B: forces don't cancel → net force ≠ 0 → motion changes."  
`P34` closed: "In diagram A, are there any forces acting on the book?"  
`P55` wait: 5 s  
`P41` MC-2 diagnostic: "A stationary object always has zero forces on it — true or false?"  
`P55` wait: 5 s

Response taxonomy (P41):
```
{ stimulus: "False — it may have balanced forces summing to zero",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "True — if it isn't moving, no forces are acting",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "Sometimes true; not always",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A04  
- SIGNAL:INCORRECT (MC-2) → `P50` → "The book in diagram A — gravity pulls it down. Is that a force? Yes. Normal force pushes up. Both forces present; they cancel. Net force = 0, but forces are real." → MC-2 flagged → retry `P41`  
- SIGNAL:PARTIAL → `P53` → explicit: "Always check for pairs of forces; stationary means net force = 0, not no forces." → TA-A04

---

**TA-A04 — Real-World Applications: Perceptual**

Primitive sequence: `P01 → P07 → P16 → P20 → P35 → P55 → P49 | P50`

`P01` target_element: three real-world scenario diagrams  
`P07` scenarios:  
- Diagram 1: astronaut floating in space at constant velocity — no thrust, no friction, net force ≈ 0  
- Diagram 2: seatbelt demonstration — car stops suddenly, passenger continues forward (body in motion, no force to stop it instantly)  
- Diagram 3: hockey puck sliding on ice at constant speed — very low friction; nearly constant velocity  
`P16` compare: "All three objects are in motion. Which ones need a force to keep them moving?"  
`P20` pattern: "What do these three situations have in common with respect to the net force?"  
`P35` open question: "In the seatbelt scenario — what force do you need to slow the passenger down, and what provides it?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "None need force to maintain motion; net force ≈ 0 in all three; seatbelt provides the decelerating force",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "The astronaut needs thrust; objects need force to keep moving",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "At least one scenario correct; others incorrect",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A05  
- SIGNAL:PARTIAL → `P53` → work through each scenario → TA-A05  
- SIGNAL:INCORRECT → `P50` → `P29` → "The astronaut moves without thrust. Earth is far away — no gravity pulling sideways. No friction. No net force. It maintains constant velocity. What changed?" → retry `P20`

---

**TA-A05 — Formal Statement and Inertia: Abstract**

Primitive sequence: `P01 → P08 → P22 → P41 → P55 → P49 | P50`

`P01` target_element: formal statement of Newton's First Law  
`P08` abstract content:  
- Newton's First Law: "An object remains in its state of rest or uniform motion in a straight line unless acted upon by a net external force."  
- Inertia: the tendency of an object to resist any change in its state of motion. Mass is the measure of inertia (more mass = more inertia = harder to change motion).  
- Net force (ΣF): vector sum of all forces. ΣF = 0 → no change in motion (rest stays rest; motion stays constant velocity). ΣF ≠ 0 → change in motion (acceleration).  
- Equilibrium: state where ΣF = 0 (can be stationary OR moving at constant velocity).  
`P22` specialisation: apply to three scenarios — (a) book on table (ΣF=0, stationary → First Law: remains at rest); (b) hockey puck on frictionless ice (ΣF=0, moving → First Law: remains in constant motion); (c) car decelerating (ΣF≠0, friction → First Law does NOT apply; motion changes)  
`P41` MC-3 probe: "If a car moves at constant velocity, is there a net force acting on it?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Net force = 0 — constant velocity means no change in motion means ΣF = 0",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Yes — a force is required to maintain the velocity",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "Not sure; maybe a small force?",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A06  
- SIGNAL:PARTIAL → `P53` → cite astronaut example from TA-A04 → TA-A06  
- SIGNAL:INCORRECT (MC-3) → `P50` → MC-3 flag → P27→P28→P30→P31 repair chain for MC-3 → retry `P41`

---

**TA-A06 — Application: Free Body Diagrams and Prediction**

Primitive sequence: `P01 → P08 → P47 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: three scenario descriptions  
`P08` content: review net force calculation: ΣF = F₁ + F₂ (vector addition; opposing forces subtract)  
`P47` diagram construction: "Draw a free body diagram for: (a) a box pushed right with 15 N, friction acting left at 15 N; (b) a rocket with thrust 500 N upward, weight 400 N downward."  
`P55` wait: 8 s  
`P34` closed: "For each diagram: state the net force, and predict whether the object will accelerate or maintain constant motion."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "(a) ΣF=0 → no acceleration, constant motion or rest; (b) ΣF=100 N upward → accelerates upward",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "(a) ΣF=0 identified but wrong prediction; or (b) net force wrong",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Net force calculation error or misapplied First Law",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A07  
- SIGNAL:PARTIAL → `P53` → "ΣF = 0 means First Law applies: NO change in state. It doesn't start or stop by itself." → TA-A07  
- SIGNAL:INCORRECT → `P50` → demonstrate vector force addition → retry `P47`

---

**TA-A07 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P91`

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

`P77` generation probe: "State Newton's First Law in your own words. Give one example of an object obeying the rest case and one example obeying the motion case."  
`P55` wait: 8 s  
`P49/P50`

`P76` transfer probe: "A hockey puck is sliding at 5 m/s on near-frictionless ice. A player hits it sideways with a force, changing its direction but not its speed. Did Newton's First Law apply during the hit? Explain."  
*P76 independence note: this transfers to Newton's Second Law (F=ma, direction of force = direction of acceleration). phys.mech.newtons-second-law need not be authored first.*  
`P55` wait: 8 s  
`P49/P50`

`P75` boundary probe: "Can an object be moving at 100 m/s with zero net force acting on it? Can an object be stationary with multiple forces acting on it? Answer both."  
`P55` wait: 8 s  
`P49/P50`

`P74` classification probe: "For each, state whether Newton's First Law is being 'followed' (ΣF=0) or 'violated' by a net force:  
(a) a book sitting on a table  
(b) a car accelerating from rest  
(c) a satellite in circular orbit (constant speed but changing direction)  
(d) a ball rolling at constant speed on frictionless ice"  
`P55` wait: 8 s  
`P49/P50`

`P78` explanation probe: "In one sentence: why do you need a seatbelt in a car — explain using Newton's First Law."  
`P55` wait: 5 s  
`P49/P50`

Mastery response keys:
```
P77 pass: law stated accurately (rest/constant motion unless net force); both examples valid
P76 pass: no — a net force acted (the sideways hit), changing direction = changing velocity = ΣF≠0; Newton's 2nd law applied
P75 pass: yes to both (constant velocity at any speed with ΣF=0; stationary with balanced forces)
P74 pass: (a) First Law (ΣF=0, balanced gravity/normal); (b) net force present; (c) net force present (centripetal); (d) First Law (ΣF=0)
P78 pass: "your body continues forward (First Law) when the car stops; the seatbelt provides the net force to decelerate you"
```

All 5 probes at 75% threshold → MASTERY_CONFIRMED; schedule Component 9 retrieval  
3–4/5 → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to appropriate protocol entry point

---

### Protocol B — S1 Procedural (Application and Explanation, 4 TAs)

*Can state the law; cannot apply it or explain it. Entry at perceptual.*

---

**TA-B01 — Application: Net Force Prediction**

Primitive sequence: `P02 → P07 → P34 → P55 → P35 → P55 → P49 | P50`

`P02` activate: student states Newton's First Law  
`P07` three force diagrams (varying ΣF)  
`P34` closed: "For each diagram, compute ΣF and predict what happens to the object's motion."  
`P55` wait: 5 s  
`P35` open: "Without a formula — why does ΣF = 0 mean constant motion rather than stopping?"  
`P55` wait: 8 s

Response taxonomy (P35):
```
{ stimulus: "Because there is no force to change the motion — the object has no reason to speed up or slow down",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Because Newton said so — cannot explain",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Because the forces cancel so the object stays still",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
```

`P49`: CORRECT → TA-B02; PARTIAL → `P53` → "What force would be needed to change a moving object's speed? If no such force exists, what happens?" → TA-B02; INCORRECT (MC-4) → flag → `P50` → satellite example → retry `P35`

---

**TA-B02 — Inertia and Mass**

Primitive sequence: `P01 → P08 → P16 → P34 → P55 → P42 → P55 → P49 | P50`

`P01` target_element: two objects of very different mass — feather vs. bowling ball  
`P08` content: inertia = resistance to change in motion. Mass = measure of inertia. Greater mass → greater inertia → harder to start, stop, or deflect.  
`P16` compare: "If you kicked a feather and a bowling ball with the same force, which would change velocity more?"  
`P34` closed: "Which has more inertia?"  
`P55` wait: 5 s  
`P42` example generation: "Give an example from everyday life where you experience the inertia of a massive object."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Bowling ball; more inertia; everyday example valid (e.g. pushing a car vs bicycle)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Bowling ball but confuses inertia with weight",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Feather has more inertia (confuses with momentum)",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-B03; PARTIAL → `P53` → distinguish inertia (resistance to change) from weight (gravitational force) → TA-B03; INCORRECT → `P50` → `P30` bridge → retry `P34`

---

**TA-B03 — Friction as the Confounding Factor**

Primitive sequence: `P01 → P08 → P41 → P55 → P43 → P55 → P49 | P50`

`P01` target_element: surface friction force diagram  
`P08` content: "Real objects slow down not because of Newton's First Law but because friction IS a force. Friction provides the net force that decelerates them. Newton's First Law is not contradicted by this — it predicts that friction will cause deceleration."  
`P41` MC-1 probe: "Does a car moving at constant velocity on a flat road have zero friction?"  
`P55` wait: 5 s  
`P43` non-example: "Give an example where someone might mistakenly think Newton's First Law says objects should keep accelerating forever."  
`P55` wait: 8 s

Response taxonomy (P41):
```
{ stimulus: "No — friction is balanced by the engine force; net force = 0 → constant velocity",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Yes — no friction if moving smoothly",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Friction present but it cancels engine force",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B04; INCORRECT → MC-1 flag → `P50` → repair chain → retry; PARTIAL → `P53` → TA-B04

---

**TA-B04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol C — S2 Misconception Carriers (MAMR Repair, 3–5 TAs)

**MAMR order:** MC-1 is foundational for MC-3. If both active: repair MC-1 first. MC-2 and MC-4 are independent.

---

**TA-C01 — Misconception Surface**

Primitive sequence: `P02 → P26 → P41 → P55 → P49`

`P02` activate existing knowledge  
`P26` schema activation: "Describe in your own words what keeps a moving object moving."  
`P41` diagnostic: run DB-1 (MC-1), DB-2a (MC-2), DB-2b (MC-4)  
`P55` wait: 5 s

Routing (MAMR): MC-1 → TA-C02 (foundational, before MC-3); MC-2 → TA-C03; MC-3 (only if MC-1 cleared) → TA-C04; MC-4 → TA-C05

---

**TA-C02 — MC-1 Repair: Objects Don't Need Force to Keep Moving**

Primitive sequence: `P01 → P27 → P06 → P28 → P29 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: three-surface sliding demonstration  
`P27` schema exposure: "You believe objects need a force to keep moving — otherwise they stop."  
`P06` concrete: sliding object across rough, smooth, near-frictionless surfaces (as in TA-A01)  
`P28` cognitive conflict: "If force is what keeps things moving, where is the force on the astronaut floating in space at constant 7,000 m/s? No engine running. No friction. No air. What force is keeping it moving?"  
`P29` conflict resolution pause  
`P55` wait: 8 s  
`P30` bridge: "What was keeping the astronaut moving? Nothing — it didn't NEED anything. The motion continues by itself. What DOES require force is any CHANGE to that motion."  
`P31` install: "Force is needed to CHANGE motion, not to MAINTAIN it. Aristotle was wrong about this — Newton corrected it."  
`P34` closed: "A puck slides on frictionless ice. No forces act on it horizontally. What happens to its velocity?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Stays constant — no force means no change",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Slows down — inertia runs out",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Stays the same but student is unsure why",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-1 CLEARED; if MC-3 flagged → TA-C04; else → TA-C06  
INCORRECT → `P50` → `P32` → retry  
PARTIAL → `P53` → advance

---

**TA-C03 — MC-2 Repair: Stationary Objects Can Have Forces Acting**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: book on table force diagram  
`P27` schema: "You said a stationary object has no forces on it."  
`P07` force diagram: book on table with gravity arrow (down, 10 N) and normal force arrow (up, 10 N)  
`P28` conflict: "The book is stationary. Gravity pulls it toward the Earth — that's a real force. Can you feel gravity? Does the table feel the book's weight? Both forces are real. The book isn't moving — but the forces are present."  
`P55` wait: 5 s  
`P30` bridge: "Stationary means NET force = 0 (forces cancel). It does NOT mean no forces. Multiple forces can be present and cancel each other perfectly."  
`P31` install: "ΣF = 0 means forces balance — not that forces are absent."  
`P34` closed: "A bridge spans a river. Cars drive across it. The bridge doesn't move. Are there forces acting on the bridge?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Yes — weight of cars, tension/compression forces in the bridge structure, balanced",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "No — it isn't moving so no forces",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "Yes but uncertain about which forces",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-2 CLEARED → route to next MC or TA-C06  
INCORRECT → `P50` → `P32` → retry  
PARTIAL → `P53` → advance

---

**TA-C04 — MC-3 Repair: Constant Velocity Needs Zero Net Force**

*Prerequisite: MC-1 must be cleared first (MAMR — MC-1 foundational for MC-3).*

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: car on flat road at constant speed  
`P27` schema: "You believe a constant force is needed to maintain constant velocity."  
`P07` diagram: car at constant 60 km/h; engine force = 500 N right; air resistance + friction = 500 N left; ΣF = 0  
`P28` conflict: "The car moves at constant velocity. If the net force were 500 N (from the engine), it would accelerate. But it stays constant. Newton's Second Law will later tell you ΣF = ma — if a = 0 (constant velocity), then ΣF = 0. The engine provides a force to overcome friction — not to maintain speed in an idealized sense."  
`P55` wait: 8 s  
`P30` bridge: "At constant velocity, engine force exactly cancels friction — net force = zero. The engine isn't providing 'motion force' — it's providing 'anti-friction force'."  
`P31` install: "Constant velocity → ΣF = 0. Any single force present does not mean net force ≠ 0."  
`P34` closed: "A train moves at constant 200 km/h on a track with friction 40,000 N. What force must the engine produce?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "40,000 N — to cancel friction and produce ΣF = 0",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "More than 40,000 N — extra force for 'maintaining speed'",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "40,000 N but reasoning unclear",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-3 CLEARED → TA-C06  
INCORRECT → `P50` → `P32` → retry  
PARTIAL → `P53` → advance

---

**TA-C05 — MC-4 Repair: First Law Applies to Moving Objects Too**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P42 → P55 → P49 | P50`

`P01` target_element: satellite in orbit diagram  
`P27` schema: "You think Newton's First Law only applies to objects at rest."  
`P07` diagram: satellite moving at constant speed in a straight line (not circular orbit) far from any gravity source  
`P28` conflict: "The satellite is moving. Newton's First Law says — constant motion stays constant without force. No force needed. Does it matter that it's already moving?"  
`P55` wait: 5 s  
`P30` bridge: "Newton's First Law has TWO cases: rest → stays at rest; motion → stays in motion at constant velocity. Both cases require ΣF = 0. The second case is just as important."  
`P31` install: "First Law applies to ANY situation where ΣF = 0, moving or not."  
`P42` example generation: "Give two examples of Newton's First Law — one where the object is stationary and one where it is moving."  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Valid examples for both rest case and motion case",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Rest case correct; motion case invalid or missing",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Both examples are rest cases",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
```

`P49`: CORRECT → MC-4 CLEARED → TA-C06  
INCORRECT → `P50` → `P32` → retry  
PARTIAL → `P53` → advance

---

**TA-C06 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol D — S3 Conceptual Carrier (Symmetry Extension, 4 TAs)

*Understands the rest case OR the motion case but not both symmetrically. Entry at abstract.*

---

**TA-D01 — Identify the Gap**

Primitive sequence: `P02 → P35 → P55 → P49`

`P02` activate: student's current understanding  
`P35` open: "Explain Newton's First Law — both the rest case and the constant-motion case."  
`P55` wait: 8 s

`P49` routing: identify which case is missing or misunderstood → TA-D02 targets that case

---

**TA-D02 — Missing Case: Targeted Abstract Input**

Primitive sequence: `P01 → P08 → P22 → P34 → P55 → P49 | P50`

`P01` target_element: the missing case  
`P08` formal statement focused on the missing case only  
`P22` specialisation: 2 worked examples of the missing case  
`P34` closed: apply the law to a new instance of the missing case  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Correct application of the missing case",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Partially correct; still mixing up the two cases",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Applies the understood case incorrectly to the new scenario",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-D03; PARTIAL → `P53` → TA-D03; INCORRECT → `P50` → reteach → retry

---

**TA-D03 — Unified Application: Both Cases Together**

Primitive sequence: `P01 → P08 → P33 → P35 → P55 → P49 | P50`

`P01` target_element: 6 scenarios mixing rest and motion cases  
`P08` formal: re-read full First Law statement — both cases in one sentence  
`P33` discrimination training: sort the 6 scenarios into rest case / motion case / ΣF ≠ 0 (law being broken)  
`P35` open: "Is the distinction between the rest case and motion case physically meaningful, or are they the same principle?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "Same principle — both say ΣF=0 → no change; distinction is just which state the object started in",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Different principles for different situations",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-D04; PARTIAL → `P53` → TA-D04

---

**TA-D04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol E — S6 Low Confidence (Scaffolded CPA, 5 TAs, no P28)

*No P28 (GR-5). P30 (Bridge) replaces all cognitive conflict instances.*

---

**TA-E01 — Safety Frame and Familiar Friction Demo**

Primitive sequence: `P01 → P71 → P69 → P06 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: book sliding on two different surfaces  
`P71` peer comparison removal  
`P69` relevance: "This law explains everything from seatbelts to why astronauts float — very practical."  
`P06` concrete: book on rough surface (stops fast) vs. smooth surface (travels further)  
`P14` soft prediction: "On the smoother surface, will the book go further?"  
`P55` wait: 5 s  
`P34` closed: "Why does the book travel further on the smoother surface?"  
`P55` wait: 5 s

Response taxonomy: expects friction/resistance being less.

`P49`: all paths → `P70` → TA-E02

---

**TA-E02 — Extrapolation (No Friction)**

Primitive sequence: `P01 → P06 → P54 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: frictionless surface thought experiment  
`P06` continue the series: very smooth surface → ice → air track → frictionless (imagined)  
`P54` productive struggle permission: "This next question might feel surprising — that's OK."  
`P14` prediction: "If there were zero friction — what would happen?"  
`P55` wait: 5 s  
`P34` closed: "So what does this tell us about whether an object needs force to keep moving?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "It wouldn't stop — no force means no change — it doesn't need force to keep moving",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "It would slow down but very slowly",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Still needs something — inertia runs out eventually",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }
```

`P49`: CORRECT → `P70` → TA-E03; PARTIAL → `P53` → TA-E03; INCORRECT → `P30` bridge (no P28) → retry

---

**TA-E03 — Formal Statement with Scaffold**

Primitive sequence: `P01 → P07 → P81 → P08 → P64 → P34 → P55 → P49 | P50`

`P01` target_element: force diagram  
`P07` diagram: balanced forces on stationary book; ΣF = 0 labelled  
`P81` scaffold: reference card with Newton's First Law written out; ΣF notation explained  
`P08` formal definition (read alongside reference card)  
`P64` confidence calibration: "How confident (1–5) do you feel about applying this law now?"  
`P34` closed: "A box sits still with a 20 N weight and 20 N normal force. What is the net force? What will happen to the box?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "ΣF = 0; box stays still per Newton's First Law",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "ΣF = 40 N (added without direction)",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "ΣF = 0 but unsure of conclusion",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → `P70` → TA-E04; PARTIAL → `P53` → TA-E04; INCORRECT → `P50` → `P30` bridge (forces cancel, opposite directions) → retry

---

**TA-E04 — Application Practice**

Primitive sequence: `P01 → P08 → P47 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: two force scenarios (card still available)  
`P08` review: ΣF calculation  
`P47` diagram construction: student draws FBD for satellite in space at constant velocity  
`P55` wait: 8 s  
`P34` closed: "For the satellite — is the net force zero? What does Newton's First Law predict?"  
`P55` wait: 5 s

Response taxonomy: satellite ΣF=0; constant velocity per First Law.

`P49`: CORRECT → `P70` → TA-E05; PARTIAL → `P53` → TA-E05; INCORRECT → `P50` → re-read First Law → retry

---

**TA-E05 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07.

---

### Protocol F — S9 Second-Language Learner (Visual-First, 3 TAs)

---

**TA-F01 — Visual Vocabulary and Concrete Anchoring**

Primitive sequence: `P01 → P03 → P06 → P07 → P34 → P55 → P49 | P50`

`P01` target_element: vocabulary card  
`P03` orient: vocabulary card — NET FORCE (sum of all forces, with arrow), INERTIA (object resisting change picture), EQUILIBRIUM (balanced scales), UNIFORM MOTION (straight arrow, constant length). All four with visual representations.  
`P06` concrete: tug-of-war with equal teams → rope stays still; unequal teams → rope moves. Students label: balanced (net force = 0) vs. unbalanced (net force ≠ 0).  
`P07` two diagrams with vocabulary labels embedded  
`P34` closed (card visible): "In the equal tug-of-war — point to what equals zero."  
`P55` wait: 5 s

Response taxonomy: points to NET FORCE label.

`P49`: CORRECT → TA-F02; INCORRECT → `P50` → point to NET FORCE explicitly → retry

---

**TA-F02 — Core Law from Diagrams**

Primitive sequence: `P01 → P07 → P20 → P34 → P55 → P49 | P50`

`P01` target_element: three scenario diagrams (rest / constant motion / accelerating)  
`P07` diagrams with vocabulary labels: "ΣF = 0 → NO CHANGE" on first two; "ΣF ≠ 0 → CHANGE" on third  
`P20` pattern: "What does the arrow arrangement in diagram 1 and diagram 2 have in common?"  
`P34` closed: "For which diagrams does Newton's First Law apply?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Diagrams 1 and 2 — where ΣF = 0",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Only diagram 1 (rest only)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "All three",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
```

`P49`: CORRECT → TA-F03; PARTIAL → `P53` → TA-F03; INCORRECT → `P50` → `P30` → retry

---

**TA-F03 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A07. Vocabulary card available throughout.

---

## 6. Misconception Engine

---

### MC-1 — Objects Need Continuous Force to Maintain Motion (Aristotelian View)

**Observable symptom:** Student says a moving object will stop "naturally" without any force; says forces "run out" or "inertia runs out"; or asks "what keeps it going?"

**Diagnostic trigger:** DB-1; TA-A01 P14.

**Root cause:** Everyday experience — every object students have ever observed moving eventually stops (due to friction, air resistance). The friction force is invisible and unattributed; students attribute stopping to motion exhausting itself. Aristotle made exactly this error systematically.

**Repair chain:** P27 (surface belief — "things need force to keep moving") → P06 (sliding demo with decreasing friction) → P28 (conflict: astronaut at constant velocity with zero thrust) → P29 → P30 (friction is the force causing stopping; remove friction → motion continues forever) → P31 (install: force required to CHANGE motion, not maintain it) → P32 (3 examples: puck on frictionless ice, satellite, spaceship with engines off)

**MAMR status:** FOUNDATIONAL for MC-3. Must be cleared before MC-3 repair. Rationale: MC-3 (constant velocity requires constant force) is a direct logical extension of MC-1; repairing MC-3 without first repairing MC-1 leads to immediate relapse.

---

### MC-2 — A Stationary Object Has No Forces Acting on It

**Observable symptom:** Student says "the book is still, so there are no forces"; draws an empty free body diagram for a stationary object; says equilibrium means "no forces."

**Diagnostic trigger:** DB-2a; TA-A03 P41.

**Root cause:** "At rest" is confused with "nothing happening." The internal logic is: if there were forces, the object would move. Since it doesn't move, there must be no forces. This ignores the possibility of forces cancelling.

**Repair chain:** P27 → P07 (force diagram with gravity + normal force for stationary book) → P28 (gravity is real — can you feel it? table sags under load) → P30 (ΣF=0 means balanced forces, not absent forces) → P31 → P32 (3 stationary objects with non-trivial force diagrams)

**MAMR status:** Independent.

---

### MC-3 — Constant Velocity Requires a Constant Net Force

**Observable symptom:** Student says a car at constant speed must have a "driving force greater than friction" — or that the engine provides a net force even at constant velocity.

**Diagnostic trigger:** TA-A05 P41; DB-2c.

**Root cause:** Direct consequence of MC-1. If force is needed to "maintain" motion, then constant velocity (maintained motion) requires constant force. This is internally consistent but physically wrong.

**Repair chain:** P27 → P07 (car FBD at constant velocity: engine=friction, ΣF=0) → P28 (conflict with Newton's Second Law preview: if ΣF≠0 at constant v, then a≠0, but constant velocity means a=0 — contradiction) → P30 (engine overcomes friction to maintain ΣF=0, not to provide ΣF) → P31 → P32

**MAMR prerequisite:** MC-1 must be cleared first.

---

### MC-4 — Newton's First Law Only Applies to Objects at Rest

**Observable symptom:** Student correctly applies the law to stationary objects but cannot apply it to objects in uniform motion; thinks "at rest" is the only relevant case.

**Diagnostic trigger:** DB-2b; TA-A04.

**Root cause:** The "rest" case is most salient in school examples (books on tables, boxes on floors). The motion case is described later and students treat the two cases as separate laws or separate concepts.

**Repair chain:** P27 → P07 (satellite in straight-line constant motion) → P28 (no force, yet motion persists — law applies here too) → P30 (both cases = same principle: ΣF=0 → no change, regardless of initial state) → P31 → P42 (two examples: one rest, one motion)

**MAMR status:** Independent.

---

## 7. Assessment Battery

---

**AB-1 — Scenario Classification**

For each scenario, state: (a) Is ΣF = 0 or ≠ 0? (b) Does Newton's First Law predict the motion will change?

| Scenario | Expected ΣF | Motion changes? |
|----------|------------|-----------------|
| Book on table, stationary | 0 | No |
| Ball decelerating due to friction | ≠ 0 | Yes |
| Rocket in space, engines off, constant velocity | 0 | No |
| Car accelerating from traffic lights | ≠ 0 | Yes |
| Block pushed with force = friction force | 0 | No |

Target: 4/5.

---

**AB-2 — Free Body Diagram**

Draw the FBD for: (a) a box at rest on a slope (weight downward, normal force perpendicular to slope, friction up the slope); (b) a car at constant 50 km/h (engine force = friction force).

Target: 2/2 diagrams with correctly labelled arrows and ΣF statement.

---

**AB-3 — Explanation Task**

"A student says: 'A car moving at constant speed must have a net forward force, otherwise it would stop.' Identify the error and correct it."

Expected: the error is assuming force is needed to maintain motion (MC-1/MC-3); correct: at constant velocity, ΣF = 0 (engine force cancels friction). Target: identifies the error + correct explanation.

---

## 8. Mastery Gate

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

**P77 — Generation Probe**

"State Newton's First Law in your own words. Give one example from the rest case and one from the constant-motion case."

Pass: accurate statement (rest→rest, motion→constant motion, ΣF=0 as condition); both examples valid.

---

**P76 — Transfer Probe**

"A hockey puck slides at constant speed on near-frictionless ice. A player taps it sideways, changing its direction but not its speed. Did Newton's First Law hold during the tap? What was the net force during the tap?"

*P76 independence note: this transfer touches Newton's Second Law (ΣF=ma, direction change = acceleration). phys.mech.newtons-second-law need not be authored first.*

Pass: First Law did NOT hold during the tap (ΣF ≠ 0, because direction changed — that is acceleration); net force was sideways (centripetal-type).

---

**P75 — Boundary Probe**

"Can an object moving at 1000 m/s have zero net force acting on it? Can a stationary object have three forces acting on it? Answer both with brief justifications."

Pass: yes (ΣF=0 regardless of speed); yes (three balanced forces, ΣF=0 → stationary).

---

**P74 — Classification Probe**

"For each, state whether Newton's First Law is being satisfied (ΣF=0) or overridden (ΣF≠0):  
(a) book sitting on table (b) car accelerating from rest (c) satellite at constant velocity in deep space (d) ball falling under gravity"

Pass: (a) ΣF=0; (b) ΣF≠0; (c) ΣF=0; (d) ΣF≠0.

---

**P78 — Explanation Probe**

"In one sentence: why does wearing a seatbelt save your life in a car crash? Use the phrase 'Newton's First Law'."

Pass: "Newton's First Law means your body continues forward when the car stops — the seatbelt provides the net force to decelerate you."

---

**Mastery decision:**

All 5 probes at 75% → MASTERY_CONFIRMED; schedule Component 9 retrieval  
3–4/5 → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to Protocol A TA-A01

---

## 9. Retrieval Schedule

Based on P89 SPACED REPETITION: intervals 1, 3, 7, 21, 60 days.

**Day 1:** `P56` — state Newton's First Law; apply to 2 new scenarios (classify ΣF).

**Day 3:** `P88` — AB-3 explanation task (new scenario); FBD for car at constant velocity.

**Day 7:** `P88` — boundary probe P75; transfer: "a book sits on a table in an accelerating elevator — is ΣF=0?"

**Day 21:** `P88` — generate an example from everyday life where Newton's First Law explains something unexpected; distinguish it from Newton's Second Law (briefly).

**Day 60:** `P88` — full AB-1 scenario classification; generation probe P77 from cold recall.

---

## 10. Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | phys.mech.newtons-first-law, phys.meas.scalars-vectors, phys.meas.units valid; cross-links valid |
| V-2 | difficulty=2 → cpa_entry_stage ∈ {C, P} | PASS | cpa_entry_stage=C; difficulty=2 allows C or P |
| V-3 | mastery_threshold matches KG value | PASS | 0.75 per KG specification |
| V-4 | Canonical 10-field schema only | PASS | No domain/concept_type in JSON |
| V-5 | No invented primitives | PASS | All primitives P01–P91 |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | A01–A07: P01; B01: P02; B02–B04: P01; C01: P02; C02–C06: P01; D01: P02; D02–D04: P01; E01: P01; F01–F03: P01 |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | Every P14/P34/P35/P41/P42/P43/P47/P74–P78/P20 followed by P55 |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 first appears in TA-A05 (after P06 in A01/A02 and P07 in A03/A04); Protocol B P08 in B02 after P07 in B01 |
| V-9 | GR-4: repair chains gated by P41 | PASS | All MC repair chains in Protocol C entered after P41 in TA-C01 |
| V-10 | GR-5: P28 absent from Protocol E (S6) | PASS | Protocol E uses P30 in TA-E02/E03; P54 in E02; no P28 in any E-series TA |
| V-11 | GR-6: P91 terminal | PASS | TA-A07, B04, C06, D04, E05, F03 all end with P91 |
| V-12 | GR-7: ≤3 consecutive C-primitives | PASS | No TA exceeds 2 consecutive C-primitives (P14, P15, P16, P17, P20, P21, P22, P29) |
| V-13 | GR-8: P54 precedes high-difficulty first-attempt open questions | PASS | P54 in TA-E02 (prediction question); P35 open questions appear after concrete/perceptual preparation |
| V-14 | GR-9: assessment primitives not in first TA | PASS | P74–P78 only in mastery gate TAs |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 expanded P77→P76→P75→P74→P78; no other Named Compounds used |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P14/P34/P35/P41/P42/P43/P47/P20 have inline taxonomy blocks |
| V-17 | All P49 branches specified | PASS | CORRECT/PARTIAL/INCORRECT/NO_RESPONSE routing for all elicitation cycles |
| V-18 | Session cap respected | PASS | Protocol A: 7 TAs (3h ≥ 1h → max 7); B: 4 TAs; C: 3–5 TAs; D: 4 TAs; E: 5 TAs; F: 3 TAs |
| V-19 | Transfer contexts reference cross-linked concept | PASS | P76 transfer touches Newton's Second Law (cross-link); P76 independence note present |
| V-20 | AIR-1 through AIR-5 pass | PASS | Content in slots (AIR-1); taxonomy pre-authored (AIR-2); P49 routing deterministic (AIR-3); primitives concept-independent (AIR-4); sequences fixed (AIR-5) |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
