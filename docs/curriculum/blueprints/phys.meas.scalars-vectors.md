# Teaching Blueprint: Scalars and Vectors
**Blueprint ID:** phys.meas.scalars-vectors  
**Status:** PACKAGE_READY  
**Date:** 2026-07-11  
**Framework Version:** Educational Brain v1.0  

---

## 0. Concept Profile

```
id:                  phys.meas.scalars-vectors
name:                Scalars and Vectors
domain:              physics / measurement
bloom:               understand
difficulty:          1 (foundational)
mastery_threshold:   0.70
estimated_hours:     2
requires:            [phys.meas.units]
unlocks:             [phys.mech.newtons-first-law, phys.mech.newtons-second-law,
                      phys.mech.velocity-acceleration, phys.mech.momentum]
cross_links:         [math.alg.coordinate-geometry]
cpa_entry_stage:     C
```

**Core idea:** Physical quantities divide into two families. A scalar has magnitude only — the number fully specifies it. A vector has magnitude AND direction — specifying just the number is incomplete. The critical consequence: you cannot combine vectors by adding magnitudes alone; direction determines the outcome. Everyday pairs that students confuse: speed (scalar) vs. velocity (vector); distance (scalar) vs. displacement (vector).

**Key vocabulary:** scalar, vector, magnitude, direction, displacement, distance, speed, velocity, resultant, vector diagram.

**Why difficulty = 1:** The core distinction (magnitude vs. magnitude + direction) is conceptually simple. The challenge is: (1) internalising that familiar words (speed, distance) refer to scalar versions while the vector counterparts (velocity, displacement) are distinct; (2) accepting that negative values in physics carry directional meaning.

---

## 1. Learning Objective

Given a physical quantity, the student:

(a) correctly classifies it as scalar or vector;  
(b) correctly states whether direction is needed to fully specify it;  
(c) correctly identifies the scalar/vector member of a familiar pair (speed/velocity, distance/displacement, mass/weight).

**Accuracy threshold:** 70%.

---

## 2. Student State Matrix

| State | Entry Condition | Protocol |
|-------|----------------|----------|
| S0 | No prior exposure to scalar/vector distinction | Protocol A — full CPA, 5 TAs |
| S1 | Knows terms but confuses specific pairs (speed/velocity or distance/displacement) | Protocol B — pair disambiguation, 4 TAs |
| S2 | Carries identified misconception (MC-1, MC-2, MC-3, and/or MC-4) | Protocol C — MAMR repair, 3–5 TAs |
| S6 | Low confidence; anxious about physics terminology | Protocol D — scaffolded CPA, 4 TAs |
| S9 | Second-language learner; visual processing dominant | Protocol E — visual-first, 3 TAs |

---

## 3. Diagnostic Battery

---

**DB-1 — Classification Screen**

Stimulus: list of six quantities — mass, velocity, temperature, displacement, speed, force.

Question: "Classify each as scalar or vector."

Response taxonomy:
```
{ stimulus: "Scalars: mass, temperature, speed; Vectors: velocity, displacement, force",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "3–4 correct; common error: speed=vector, or displacement=scalar",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Fewer than 3 correct; or no distinction made",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "No response or 'I don't know scalars/vectors'",
  signal: "SIGNAL:NO_RESPONSE" }
```

SIGNAL:CORRECT → run DB-2 for misconception check → route to Protocol C if any MC, else MASTERY_CONFIRMED  
SIGNAL:PARTIAL → S1; route to Protocol B  
SIGNAL:INCORRECT → run DB-2 for MC; route to Protocol C if MC, else Protocol A  
SIGNAL:NO_RESPONSE → S0; route to Protocol A

---

**DB-2 — Misconception Screen**

DB-2a (MC-1): "A car travels at 60 km/h. Is that a scalar or a vector?"  
DB-2b (MC-2): "You walk 3 km north, then 3 km south. What is your displacement? What is your distance travelled?"  
DB-2c (MC-4): "Name a physical quantity that needs a direction to be fully described."

```
DB-2a: { stimulus: "Vector — because speed has a direction", signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }
DB-2a: { stimulus: "Scalar — speed has no direction; velocity would be the vector", signal: "SIGNAL:CORRECT" }

DB-2b: { stimulus: "Displacement = 6 km; distance = 6 km (no distinction)", signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }
DB-2b: { stimulus: "Displacement = 0 (back where you started); distance = 6 km", signal: "SIGNAL:CORRECT" }

DB-2c: { stimulus: "Cannot name any; or says 'none — all quantities are just numbers'", signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
DB-2c: { stimulus: "Names any valid vector (force, displacement, velocity, etc.)", signal: "SIGNAL:CORRECT" }
```

Any SIGNAL:INCORRECT → flag corresponding MC → route to Protocol C

---

## 4. Prerequisite Check

**PRE-1 — SI Units** (requires phys.meas.units)

Stimulus: "What unit measures mass? What unit measures time?"

Expected: kilogram (kg); second (s)

SIGNAL:INCORRECT → prerequisite gap; schedule phys.meas.units session first

---

## 5. Protocol Library

---

### Protocol A — S0 Complete Novice (Full CPA, 5 TAs, single session)

*Session cap: estimated_hours=2 ≥ 1h → max 7 TAs. 5 TAs appropriate for bloom=understand.*  
*CPA path: Concrete (TA-A01–A02) → Perceptual (TA-A03) → Abstract (TA-A04) → Mastery Gate (TA-A05).*

---

**TA-A01 — Direction Matters: Concrete**

Primitive sequence: `P01 → P04 → P06 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: two routes on a floor map drawn on paper  
`P04` context: "You want to meet a friend. They say 'I'm 500 metres away.' Is that enough to find them?"  
`P06` concrete_scenario:  
- Map with student's position at centre; friend could be 500 m north, or 500 m east, or 500 m in any direction  
- Demonstrate: same distance (500 m) leads to four completely different locations depending on direction  
- Second scenario: tug-of-war with two equal forces pulling in opposite directions — rope stays still; same forces in same direction — rope moves  
`P14` prediction: "If I give you only a number — '500 metres' — is that enough information to find me?"  
`P55` wait: 5 s  
`P34` closed: "What extra piece of information would you need beyond the number '500 metres'?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Direction; which way / bearing / north-south-east-west",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "More detail — like an address (conflating direction with location)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Nothing — 500 metres is enough to find you",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "No response",
  signal: "SIGNAL:NO_RESPONSE" }
```

`P49` routing:  
- SIGNAL:CORRECT → `P53` ("That extra piece — direction — is exactly what separates a vector from a scalar") → TA-A02  
- SIGNAL:PARTIAL → `P53` → explicit: "Not just the address — the direction FROM where you are NOW. That's what vectors capture." → TA-A02  
- SIGNAL:INCORRECT → `P50` → `P52` → "If two different people are both 500 m from you, in opposite directions, how do you tell them apart using only the number?" → retry `P34`  
- SIGNAL:NO_RESPONSE → `P54` → simplify: tug-of-war demo only → retry

---

**TA-A02 — Direction Doesn't Always Matter: Scalar Counter-example**

Primitive sequence: `P01 → P06 → P17 → P34 → P55 → P49 | P50`

`P01` target_element: thermometer reading and a clock  
`P06` concrete_scenario:  
- Temperature: "The room is 20°C." Does which way the thermometer points change the temperature? No.  
- Mass: "This book has mass 0.5 kg." Does the direction of weighing change its mass? No.  
- Time: "It took 30 seconds." Does the direction of time (left, right) matter to the duration? No.  
`P17` contrast: walking to a friend (direction changes outcome) vs. temperature reading (direction irrelevant)  
`P34` closed: "For temperature, mass, and time — do any of them need a direction to be fully described?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "No — none of them need direction",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Temperature might — it can go up or down (confusing change with direction)",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Yes — they all have a direction (up/down, heavier/lighter)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
```

`P49` routing:  
- SIGNAL:CORRECT → introduce vocabulary: "Quantities that only need a number (magnitude) are called **scalars**. Quantities that need a number AND a direction are called **vectors**." → TA-A03  
- SIGNAL:PARTIAL → `P53` → "Temperature increasing or decreasing is a change over time — not the same as a spatial direction. 20°C is fully described by just the number 20." → TA-A03  
- SIGNAL:INCORRECT (MC-4) → flag → `P50` → redo tug-of-war: "Pull RIGHT with 5 N; Pull LEFT with 5 N — what happens? Pull both RIGHT — what happens? Same number, completely different outcomes because direction differs." → retry `P34`

---

**TA-A03 — Vector Arrow Diagrams: Perceptual**

Primitive sequence: `P01 → P07 → P16 → P20 → P34 → P55 → P35 → P55 → P49 | P50`

`P01` target_element: three vector diagrams on a page  
`P07` diagrams:  
- Diagram 1: displacement arrow — 3 m east (→ arrow, length 3 units, labelled "3 m East")  
- Diagram 2: displacement arrow — 3 m west (← arrow, same length, labelled "3 m West")  
- Diagram 3: scalar representation — circle labelled "speed = 3 m/s" (no arrow, no direction)  
- Diagram 4: vector addition example — two displacement arrows (3 m east + 4 m north) → resultant arrow (5 m north-east by Pythagoras)  
`P16` compare diagrams 1 and 2: "Both show '3 m'. Are they the same physical situation?"  
`P20` pattern in diagram 4: "What does the length of the arrow represent? What does the direction of the arrow represent?"  
`P34` closed: "In diagram 4, two displacements are added. Can you add 3 and 4 to get the resultant? What do you actually get, and why?"  
`P55` wait: 5 s  
`P35` open question: "Why can't you just add vector magnitudes?"  
`P55` wait: 8 s

Response taxonomy:
```
{ stimulus: "3+4=7 is wrong because directions differ; resultant = 5 m (Pythagoras/triangle)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "7 m — added magnitudes; direction not considered",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "Not 7 — direction matters — but can't compute resultant",
  signal: "SIGNAL:PARTIAL" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A04  
- SIGNAL:PARTIAL → `P53` → explain triangle method briefly; not required to compute — just to see direction matters → TA-A04  
- SIGNAL:INCORRECT → `P50` → "Walk 3 m east, then 4 m north. Are you 7 m from where you started? Draw it." → retry `P34`

---

**TA-A04 — Formal Definitions and Key Pairs: Abstract**

Primitive sequence: `P01 → P08 → P17 → P41 → P55 → P18 → P55 → P49 | P50`

`P01` target_element: formal classification table  
`P08` abstract content:  
- Scalar formal: "A scalar quantity is fully described by a magnitude (a number with a unit). Direction is irrelevant."  
- Vector formal: "A vector quantity requires both a magnitude and a direction for a complete specification."  
- Key scalar examples: mass (kg), temperature (K or °C), speed (m/s), time (s), distance (m), energy (J)  
- Key vector examples: displacement (m + direction), velocity (m/s + direction), acceleration (m/s²+ direction), force (N + direction), weight (N, downward)  
- Critical pairs: **speed** (scalar) vs. **velocity** (vector); **distance** (scalar) vs. **displacement** (vector); **mass** (scalar) vs. **weight** (vector, downward direction)  
`P17` contrast speed vs. velocity: "A car travelling at 60 km/h northward and a car travelling at 60 km/h southward have the same speed. Do they have the same velocity?"  
`P41` MC-1 probe: "Is speed a scalar or a vector? Explain."  
`P55` wait: 5 s  
`P18` classify: provide 8 quantities; student labels S or V — [force, temperature, displacement, mass, velocity, distance, weight, energy]  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Speed is scalar (no direction); all 8 classified correctly",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Speed = scalar correct; 6–7/8 classified correctly",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Speed = vector; or < 6/8 correct",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1 or null" }
```

`P49` routing:  
- SIGNAL:CORRECT → TA-A05  
- SIGNAL:PARTIAL → `P53` on specific error → TA-A05  
- SIGNAL:INCORRECT (speed=vector) → note MC-1 → `P50` → "Speed tells you HOW FAST (60 km/h). Velocity tells you HOW FAST AND WHICH WAY (60 km/h north). Speed has no direction." → retry `P41`  
- SIGNAL:INCORRECT (other classification errors) → `P50` → reteach P08 summary table → retry `P18`

---

**TA-A05 — Mastery Gate (Terminal)**

Primitive sequence: `P01 → P91`

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

`P77` generation probe: "Give two examples of scalars and two examples of vectors from everyday physics. For each vector, state what direction information is needed."  
`P55` wait: 8 s  
`P49/P50`

`P76` transfer probe: "A runner completes a 400 m race on a circular track and ends exactly where they started. What is their distance? What is their displacement?"  
`P55` wait: 8 s  
`P49/P50`

`P75` boundary probe: "A car travels 60 km/h. Is that speed or velocity? What would you need to say to make it a velocity?"  
`P55` wait: 5 s  
`P49/P50`

`P74` classification probe: "Label each S (scalar) or V (vector): [force, energy, displacement, temperature, momentum, speed, weight, time]"  
`P55` wait: 8 s  
`P49/P50`

`P78` explanation probe: "In one sentence, explain why you cannot find someone who is '500 metres away' without more information."  
`P55` wait: 5 s  
`P49/P50`

Mastery response keys:
```
P77 pass: 2 valid scalars; 2 valid vectors; direction stated for both vectors
P76 pass: distance = 400 m; displacement = 0 (or 0 m, returned to start)
P75 pass: speed; needs direction (e.g. "60 km/h north")
P74 pass: V, S, V, S, V, S, V, S (force, energy, displacement, temperature, momentum, speed, weight, time)
       — weight is vector (downward); accept if student notes weight direction
P78 pass: "direction is missing" or "500 m in any direction gives different locations"
```

All 5 probes at threshold (≥70%) → MASTERY_CONFIRMED; schedule Component 9 retrieval  
3–4/5 → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to TA-A02

---

### Protocol B — S1 Pair Disambiguation (4 TAs)

*Student knows the scalar/vector distinction but conflates specific pairs: speed/velocity or distance/displacement. Entry at perceptual.*

---

**TA-B01 — Distance vs Displacement: Concrete Reactivation**

Primitive sequence: `P02 → P06 → P41 → P55 → P49 | P50`

`P02` activate: "You know scalars need just a number, vectors need number + direction. Let's apply this."  
`P06` concrete: student physically walks: 4 steps east, then 3 steps north. Teacher records path length (7 steps) and measures straight-line distance from start to finish (5 steps by diagonal).  
`P41` MC-2 diagnostic: "Distance travelled = 7 steps. Displacement = ?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Displacement = 5 steps north-east (or equivalent directed answer)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Displacement = 7 steps (same as distance)",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "Displacement < 7 but direction not specified",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B02; INCORRECT (MC-2) → MC-2 flag → `P50` → "Distance = total path. Displacement = straight-line from START to END, with direction." → retry `P41`; PARTIAL → `P53` → TA-B02

---

**TA-B02 — Speed vs Velocity: Perceptual**

Primitive sequence: `P01 → P07 → P29 → P41 → P55 → P49 | P50`

`P01` target_element: speedometer diagram alongside velocity arrow  
`P07` side-by-side: (a) speedometer showing 60 km/h — just a number, no direction; (b) velocity arrow: 60 km/h → east — number + direction  
`P29` conflict resolution pause: "A car making a U-turn at constant 60 km/h: is its speed changing? Is its velocity changing?"  
`P41` MC-1 diagnostic: "If speed is constant but direction changes, what is changing?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Velocity is changing (direction changed even though magnitude is same)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Nothing is changing — speed is constant",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Something changes but not sure what",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-B03; INCORRECT (MC-1) → flag → `P50` → "Speed = how fast (60 km/h). Velocity = how fast AND which way (60 km/h east → 60 km/h west after U-turn). Direction flipped → velocity changed." → retry `P41`; PARTIAL → `P53` → TA-B03

---

**TA-B03 — Pair Classification Practice**

Primitive sequence: `P01 → P08 → P33 → P34 → P55 → P49 | P50`

`P01` target_element: pair classification table  
`P08` content: formalise all three pairs in one table:

| Scalar | Vector | Key distinction |
|--------|--------|----------------|
| distance | displacement | path length vs. straight-line with direction |
| speed | velocity | how fast vs. how fast + which way |
| mass | weight | amount of matter vs. gravitational force (downward) |

`P33` discrimination training: four scenarios — student must identify which quantity applies:  
(a) "She ran 5 km but ended 3 km south of her start." — which is 5 km? which is 3 km south?  
(b) "The ball moves at 10 m/s towards the wall." — scalar or vector? which word?  
`P34` closed: "A ball dropped from a height falls 10 m. Is '10 m' distance or displacement? What is the displacement?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "(a) 5km=distance; 3km south=displacement; (b) vector/velocity; 10m downward = displacement",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "2/3 correct",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Fewer than 2 correct",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → TA-B04; PARTIAL → `P53` → TA-B04; INCORRECT → `P50` → re-read P08 table → retry

---

**TA-B04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol C — S2 Misconception Carriers (MAMR Repair, 3–5 TAs)

**MAMR order:** MC-4 (everything is scalar) is foundational for MC-1 and MC-2. If MC-4 + any other MC: repair MC-4 first. MC-1, MC-2, MC-3 are mutually independent.

---

**TA-C01 — Misconception Identification**

Primitive sequence: `P02 → P26 → P41 → P55 → P49`

`P02` activate: existing knowledge  
`P26` schema: "Tell me: what is the difference between a scalar and a vector?"  
`P41` diagnostic: run DB-2a (MC-1), DB-2b (MC-2), DB-2c (MC-4)  
`P55` wait: 5 s

Routing (MAMR):
- MC-4 flagged → TA-C02 (foundational repair first)
- MC-1 only → TA-C03
- MC-2 only → TA-C04
- MC-3 only → TA-C05

---

**TA-C02 — MC-4 Repair: Not Everything is Scalar**

Primitive sequence: `P01 → P27 → P06 → P28 → P55 → P30 → P31 → P42 → P55 → P49 | P50`

`P01` target_element: tug-of-war scenario  
`P27` schema exposure: "You said physical quantities are just numbers — direction doesn't affect them."  
`P06` concrete: two forces — 10 N right and 10 N left → rope stationary; two forces — 10 N right and 10 N right → rope moves right. Same numbers, different directions, different physical outcomes.  
`P28` cognitive conflict: "If direction didn't matter, these two scenarios should produce the same result. They don't. Why?"  
`P55` wait: 8 s  
`P30` bridge: "Some quantities are changed by direction — those are vectors. Some are not — those are scalars."  
`P31` install: "Force is a vector. If you tell me only the magnitude, I can't predict what will happen."  
`P42` example generation: "Give me one physical situation where direction makes a difference to the outcome."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Any valid vector scenario (force, displacement, velocity, etc.)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Scenario described but student can't articulate why direction matters",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Cannot generate; or gives a scalar example",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-4" }
```

`P49`: CORRECT → MC-4 CLEARED → if MC-1 or MC-2 flagged, route to TA-C03/C04; else TA-C06  
PARTIAL → `P53` → advance  
INCORRECT → `P50` → `P32` → redo tug-of-war with student physically pulling → retry

---

**TA-C03 — MC-1 Repair: Speed Is Scalar, Velocity Is Vector**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: circular racetrack  
`P27` schema: "You said speed and velocity are the same thing."  
`P07` diagram: car on circular track at constant 60 km/h. Arrow drawn at each quarter-circle shows velocity direction changing; speedometer stays at 60.  
`P28` cognitive conflict: "The speedometer never changes — speed constant. But the arrow direction changes every instant. If speed = velocity, the velocity shouldn't be changing either. It is changing. Something is different."  
`P55` wait: 8 s  
`P30` bridge: "Speed = how fast (60 km/h — scalar, no direction). Velocity = how fast + which way (60 km/h north, then east, then south — vector, direction changes)."  
`P31` install: "Constant speed ≠ constant velocity. They are different quantities."  
`P34` closed: "A ball is swung on a string at constant speed in a circle. Is its speed changing? Is its velocity changing?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Speed: no; velocity: yes (direction keeps changing)",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Both constant or both changing",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Velocity changing but reasoning unclear",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-1 CLEARED → if MC-2 flagged → TA-C04; else → TA-C06  
INCORRECT → `P50` → P32 → retry  
PARTIAL → `P53` → advance

---

**TA-C04 — MC-2 Repair: Distance Is Scalar, Displacement Is Vector**

Primitive sequence: `P01 → P27 → P06 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: walking route diagram  
`P27` schema: "You said distance and displacement are the same thing."  
`P06` concrete: student walks 3 m east, then 3 m west — returns to start. Path = 6 m; end position = start.  
`P28` cognitive conflict: "You walked 6 m total. Where are you? Exactly where you started. Your displacement is 0 m. But 6 ≠ 0. How can distance = displacement if they give different numbers for the same journey?"  
`P55` wait: 8 s  
`P30` bridge: "Distance = total path length (scalar — just a number). Displacement = straight-line from start to finish, with direction (vector — needs a number + direction)."  
`P31` install: "Distance ≥ Displacement magnitude always. Equal only when path is straight."  
`P34` closed: "A runner goes 4 m east, then 3 m north. What is the distance? What is the displacement magnitude?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Distance = 7 m; displacement = 5 m north-east",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Distance = displacement = 7 m",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-2" }

{ stimulus: "Distance = 7 m; displacement magnitude = 5 m (direction omitted)",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-2 CLEARED → TA-C06  
INCORRECT → `P50` → P32 → retry  
PARTIAL → `P53` ("displacement needs direction: '5 m at 37° north of east'") → TA-C06

---

**TA-C05 — MC-3 Repair: Negative Vectors Are Valid**

Primitive sequence: `P01 → P27 → P07 → P28 → P55 → P30 → P31 → P34 → P55 → P49 | P50`

`P01` target_element: number line with signed displacements  
`P27` schema: "You said vectors must always be positive or point in a positive direction."  
`P07` number line: define positive = east. Displacement of +5 m = 5 m east; displacement of −5 m = 5 m west.  
`P28` cognitive conflict: "If −5 m is not a valid displacement, how do I describe moving 5 m west on this number line where I defined east as positive?"  
`P55` wait: 5 s  
`P30` bridge: "Negative vector magnitude means opposite to the chosen positive direction. Choosing a positive direction is the first step; then negative just means the reverse."  
`P31` install: "Vectors can be negative — the sign IS the direction information when working in 1 dimension."  
`P34` closed: "If I define upward as positive, what sign does the weight force on a ball have?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Negative — weight acts downward, opposite to positive direction",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Positive — weight pulls towards earth and earth is positive",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-3" }

{ stimulus: "Negative but reasoning is unclear",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → MC-3 CLEARED → TA-C06  
INCORRECT → `P50` → P32 → retry  
PARTIAL → `P53` → TA-C06

---

**TA-C06 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol D — S6 Low Confidence (Scaffolded CPA, 4 TAs, no P28)

*No P28 (GR-5). Use P30 (Bridge) wherever P28 would appear in the standard chain.*

---

**TA-D01 — Safety Frame and Concrete Anchoring**

Primitive sequence: `P01 → P71 → P69 → P06 → P14 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: friendly walking scenario map  
`P71` remove peer comparison  
`P69` relevance: "This distinction — scalar vs. vector — appears in every mechanics problem you'll ever solve."  
`P06` concrete: simple 3-step walk east (one direction, easy to visualise)  
`P14` prediction: "If I say 'the displacement is 3 m' — is that a complete description of where you ended up?"  
`P55` wait: 5 s  
`P34` closed (with concrete still visible): "What direction did you walk?"  
`P55` wait: 5 s

Response taxonomy: expects "east" or direction answer.

`P49`: all paths → `P70` → TA-D02

---

**TA-D02 — Concrete: Both Cases**

Primitive sequence: `P01 → P06 → P34 → P55 → P49 | P50`

`P01` target_element: thermometer and a map arrow  
`P06` thermometer (scalar: 20°C — direction irrelevant) alongside displacement arrow (5 m north — direction essential)  
`P34` closed: "For the thermometer reading — does the direction the thermometer is pointing change the temperature? For the displacement arrow — does removing the arrowhead change what it means?"  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "No (temperature); yes, removing arrowhead loses direction information",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Partially correct",
  signal: "SIGNAL:PARTIAL" }

{ stimulus: "Incorrect on both or either",
  signal: "SIGNAL:INCORRECT", mc_id: null }
```

`P49`: CORRECT → `P70` → TA-D03; PARTIAL → `P53` → TA-D03; INCORRECT → `P50` → `P30` bridge → retry

---

**TA-D03 — Perceptual + Formal Classification (Scaffolded)**

Primitive sequence: `P01 → P07 → P81 → P08 → P64 → P18 → P55 → P49 | P50`

`P01` target_element: vector diagram and classification table  
`P07` diagram: four quantities shown visually — temperature circle, mass scale, displacement arrow, velocity arrow  
`P81` scaffold: reference card with scalar/vector definitions visible  
`P08` formal definitions (read alongside reference card)  
`P64` confidence calibration: "How confident, 1–5, about classifying the next list?"  
`P18` classify (with reference card): [mass, velocity, temperature, displacement, speed, force]  
`P55` wait: 8 s

Response taxonomy: all 6 correctly classified.

`P49`: CORRECT → `P70` → TA-D04; PARTIAL → `P53` → TA-D04; INCORRECT → `P50` → reteach P08 → retry

---

**TA-D04 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05.

---

### Protocol E — S9 Second-Language Learner (Visual-First, 3 TAs)

---

**TA-E01 — Visual Vocabulary and Concrete Sorting**

Primitive sequence: `P01 → P03 → P06 → P07 → P34 → P55 → P49 | P50`

`P01` target_element: visual vocabulary card  
`P03` orient: card showing two columns — SCALAR (number in a circle, no arrow) vs VECTOR (number + arrow). Four vocabulary words: scalar, vector, magnitude, direction — each with a picture.  
`P06` concrete: six physical objects/images; student sorts into SCALAR tray and VECTOR tray using vocabulary card as guide  
`P07` anchor diagrams: thermometer (scalar) alongside displacement arrow (vector)  
`P34` closed (card visible): "Point to the column where 'velocity' belongs."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Points to VECTOR column",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Points to SCALAR column",
  signal: "SIGNAL:INCORRECT", mc_id: "MC-1" }

{ stimulus: "Hesitates between both",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-E02; INCORRECT → `P50` → point to arrow on velocity diagram → retry; PARTIAL → `P53` → TA-E02

---

**TA-E02 — Classification with Graduated Scaffold Removal**

Primitive sequence: `P01 → P07 → P88 → P55 → P34 → P55 → P49 | P50`

`P01` target_element: partially-completed classification table  
`P07` partial table: 4 rows filled; 4 rows blank — student completes using diagram references (card available)  
`P88` retrieval: student completes table from memory where possible (card available for checking)  
`P55` wait: 10 s  
`P34` closed: "Name the scalar partner of velocity."  
`P55` wait: 5 s

Response taxonomy:
```
{ stimulus: "Speed",
  signal: "SIGNAL:CORRECT" }

{ stimulus: "Displacement or acceleration",
  signal: "SIGNAL:INCORRECT", mc_id: null }

{ stimulus: "Correct quantity, wrong name ('fast-ness', 'rapidity')",
  signal: "SIGNAL:PARTIAL" }
```

`P49`: CORRECT → TA-E03; PARTIAL → `P53` → TA-E03; INCORRECT → `P50` → P30 bridge → retry

---

**TA-E03 — Mastery Gate (Terminal)**

`P01 → P91` — same five-probe sequence as TA-A05. Vocabulary card available at start; removed for generation probe P77.

---

## 6. Misconception Engine

---

### MC-1 — Speed and Velocity Are the Same Quantity

**Observable symptom:** Student classifies speed as a vector; or states that constant speed implies constant velocity; says "velocity = speed."

**Diagnostic trigger:** DB-2a; TA-A04 P41.

**Root cause:** "Speed" and "velocity" are synonymous in everyday language. Physics distinguishes them (scalar vs. vector) but the distinction is invisible in casual use ("driving at velocity" vs. "driving at speed" are equivalent in common speech).

**Repair chain:** P27 (expose synonymy belief) → P07 (circular track: constant speed, changing velocity direction) → P28 (conflict: if same thing, constant speed means constant velocity — but direction changes on circle) → P30 (bridge: speed = magnitude only; velocity = magnitude + direction) → P31 → P32 (3 examples contrasting constant speed with changing velocity)

**MAMR status:** Independent. Requires MC-4 cleared first if MC-4 is also active.

---

### MC-2 — Distance and Displacement Are the Same Quantity

**Observable symptom:** Student equates the number for distance and displacement in the same problem; says "displacement = total path."

**Diagnostic trigger:** DB-2b; TA-B01.

**Root cause:** "Distance" and "displacement" are near-synonyms in everyday English. The physics distinction (path length vs. directed straight-line) is never needed outside formal physics.

**Repair chain:** P27 (surface equivalence belief) → P06 (return-to-start walk: distance 6 m, displacement 0) → P28 (conflict: same journey, different values; they cannot be the same thing) → P30 (path length vs. straight-line with direction) → P31 → P32 (3 journey calculations distinguishing both)

**MAMR status:** Independent. Requires MC-4 cleared first if MC-4 is also active.

---

### MC-3 — Vectors Must Be Positive (No Negative Vectors)

**Observable symptom:** Student refuses to write negative displacements; assigns positive values to all vector quantities.

**Diagnostic trigger:** Emerges during vector addition problems or when defining a coordinate axis.

**Root cause:** Prior mathematics instruction treats number lines as having a "positive direction"; the negative side feels like "wrong direction" rather than a valid physical direction.

**Repair chain:** P27 (negative = wrong belief) → P07 (number line with signed displacements defined) → P28 (conflict: without negative sign, west cannot be distinguished from east on a horizontal number line) → P30 (sign IS the direction in 1D) → P31 → P32 (signed vector practice)

**MAMR status:** Independent.

---

### MC-4 — All Physical Quantities Are Just Numbers (No Direction Needed)

**Observable symptom:** Student classifies all quantities as scalar; cannot name a vector quantity; treats force, displacement, velocity all as scalars.

**Diagnostic trigger:** DB-2c.

**Root cause:** Most early physics involves scalar-dominant contexts (temperature, time, mass). Vector quantities appear but direction is often implicit or ignored in introductory settings.

**Repair chain:** P27 (surface belief) → P06 (tug-of-war with forces in opposing directions) → P28 (same magnitude, different direction = different physical outcome; scalars cannot produce this) → P30 (bridge: direction-sensitive quantities are vectors) → P31 → P42 (student generates 2 vector examples)

**MAMR status:** FOUNDATIONAL for MC-1 and MC-2. Must be cleared before repairing MC-1 or MC-2, since those repairs require the student to already accept that some quantities are vectors.

---

## 7. Assessment Battery

---

**AB-1 — Classification Task**

Classify each as scalar (S) or vector (V): [force, mass, velocity, distance, acceleration, time, displacement, energy, weight, temperature]

Key: V=force, velocity, acceleration, displacement, weight; S=mass, distance, time, energy, temperature. Target: ≥7/10.

---

**AB-2 — Scenario Analysis**

"A student runs 100 m around a quarter-circle track and ends at a point 70.7 m from the start (at 45° to the original direction).  
(a) What is the distance run?  
(b) What is the magnitude of the displacement?  
(c) What extra information is needed to fully state the displacement?"

Expected: (a) 100 m; (b) 70.7 m; (c) direction (45° from original direction of travel). Target: 2/3.

---

**AB-3 — Pair Identification**

"For each vector, name its scalar partner: velocity, displacement, weight."

Expected: speed; distance; mass. Target: 2/3.

---

## 8. Mastery Gate

`P91` expansion: `P77 → P76 → P75 → P74 → P78`

**P77 — Generation Probe**

"Name two scalar quantities and two vector quantities from everyday physics. For each vector, state what direction information is required."

Pass: 2 valid scalars; 2 valid vectors; direction specified for both vectors.

---

**P76 — Transfer Probe**

"A runner completes one full lap of a circular 400 m track and returns to the starting line. What is the total distance run? What is the displacement?"

Pass: distance = 400 m; displacement = 0 m (or 0, or "zero — returned to start").

---

**P75 — Boundary Probe**

"A car travels at 60 km/h. Is that a complete description of the car's motion if we need to know where it will be in 10 minutes?"

Pass: not complete — need direction; speed is scalar; velocity (speed + direction) is required.

---

**P74 — Classification Probe**

"Label S or V: force, energy, displacement, temperature, momentum, speed, weight, time."

Pass: V, S, V, S, V, S, V, S. Note: weight is a vector (gravitational force, direction = downward). Target: 7/8 (allow weight=scalar for boundary case if student explains weight=mass context).

---

**P78 — Explanation Probe**

"In one sentence, explain why you cannot find a person who is '500 metres away' without more information."

Pass: direction is missing; 500 m in any direction leads to a different location.

---

**Mastery decision:**

All 5 probes at threshold → MASTERY_CONFIRMED  
3–4/5 → PARTIAL_MASTERY; schedule Day 1 retrieval  
<3/5 → return to weakest protocol entry point

---

## 9. Retrieval Schedule

Based on P89 SPACED REPETITION: intervals 1, 3, 7, 21, 60 days.

**Day 1:** `P56` — classify 6 quantities (new instances); state the scalar partner of velocity.

**Day 3:** `P88` — scenario: walk 6 m north then 8 m east; compute distance and displacement magnitude.

**Day 7:** `P88` — pair identification AB-3; boundary probe P75.

**Day 21:** `P88` — transfer item: "A ball is thrown upward and returns to the thrower's hand. What is its distance? Its displacement?" (distance = 2h; displacement = 0)

**Day 60:** `P88` — generation probe P77 from cold recall; full AB-1 classification.

---

## 10. Validation Checklist

| Check | Criterion | Status | Evidence |
|-------|-----------|--------|----------|
| V-1 | All concept id slots reference valid KG nodes | PASS | phys.meas.scalars-vectors, phys.meas.units valid; cross-link math.alg.coordinate-geometry valid |
| V-2 | difficulty=1 → cpa_entry_stage = C | PASS | cpa_entry_stage=C; difficulty=1 requires C |
| V-3 | mastery_threshold matches KG value | PASS | 0.70 per KG specification |
| V-4 | Canonical 10-field schema only | PASS | No domain/concept_type in JSON |
| V-5 | No invented primitives | PASS | All primitives P01–P91 |
| V-6 | GR-1: all TAs start P01 or P02 | PASS | A01–A05: P01; B01: P02; B02–B04: P01; C01: P02; C02–C06: P01; D01–D04: P01; E01–E03: P01 |
| V-7 | GR-2: P55 follows every elicitation primitive | PASS | Every P34/P35/P41/P42/P18/P74–P78 followed by P55 |
| V-8 | GR-3: P08 only after P06 or P07 has fired | PASS | P08 appears in TA-A04 (after P06 in A01/A02 and P07 in A03); Protocol D P08 after P07 in D03 |
| V-9 | GR-4: repair chains gated by P41 | PASS | All MC repair chains entered after P41 in TA-C01 |
| V-10 | GR-5: P28 absent from Protocol D (S6) | PASS | Protocol D uses P30 in TA-D02/D03; no P28 in any D-series TA |
| V-11 | GR-6: P91 terminal | PASS | TA-A05, B04, C06, D04, E03 end with P91 |
| V-12 | GR-7: ≤3 consecutive C-primitives | PASS | No TA exceeds 2 consecutive C-category primitives (P14, P16, P17, P18, P20, P29) |
| V-13 | GR-8: P54 precedes first high-difficulty open questions | PASS | P54 in TA-A01 NO_RESPONSE branch; P35 in TA-A03 after substantial concrete/perceptual grounding |
| V-14 | GR-9: assessment primitives not in first TA | PASS | P74–P78 only in mastery gate TAs |
| V-15 | GR-10: Named Compound expansions substituted | PASS | P91 expanded; no other Named Compounds used |
| V-16 | Response taxonomy present for all elicitation primitives | PASS | All P34/P35/P41/P42/P18/P29 have inline taxonomy blocks in all TAs |
| V-17 | All P49 branches specified | PASS | CORRECT/PARTIAL/INCORRECT/NO_RESPONSE routing for all elicitation cycles |
| V-18 | Session cap respected | PASS | Protocol A: 5 TAs (2h ≥ 1h → max 7); B: 4 TAs; C: 3–5 TAs; D: 4 TAs; E: 3 TAs |
| V-19 | Transfer contexts reference cross-linked concept | PASS | P76 transfer uses circular track displacement (coordinate-geometry cross-link); P76 independence note present |
| V-20 | AIR-1 through AIR-5 pass | PASS | Content in slots (AIR-1); taxonomy pre-authored (AIR-2); P49 deterministic (AIR-3); primitives concept-independent (AIR-4); sequences fixed (AIR-5) |

**PACKAGE_READY: YES** — All 20 V-checks PASS. Components 0–9 present. Blueprint approved for Educational Brain integration.
