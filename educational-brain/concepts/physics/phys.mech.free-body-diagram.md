# phys.mech.free-body-diagram — Free Body Diagrams

## 1. Identity
- **Canonical KG ID**: `phys.mech.free-body-diagram`
- **Canonical name**: Free Body Diagrams
- **Curriculum domain**: Mechanics
- **Difficulty tier**: developing
- **Bloom level**: apply
- **Prerequisites**: `phys.mech.newtons-second-law`
- **Unlocks**: `phys.mech.friction`, `phys.mech.normal-force`, `phys.mech.tension`
- **Estimated study hours**: 3
- **KG description**: A free body diagram isolates a body and represents all external forces acting on it as vectors.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (one object at a time)**
Imagine picking up a single object and placing it in empty space, cut off from everything else. Now ask: "What is touching this object right now? What forces does each contact exert?" Then ask: "Is there any long-range force (gravity, electric, magnetic) on this object?" Draw those forces as arrows on the object (or on a dot representing it). That drawing is a free body diagram — it isolates one body and shows every external force acting on it.

**Stage 2 — Procedure (four steps)**
1. **Identify the system**: Choose which object (or group of objects treated as one) you are analysing.
2. **Isolate the system**: Remove all contacts; replace each with the force that contact exerts.
3. **Identify all forces**: Contact forces (normal, friction, tension, applied) + long-range forces (gravity, electric, magnetic). Every force comes from a specific external source.
4. **Draw arrows**: Tail at the object's point of application (or centre of mass for simple particles); direction along the force direction; label each force (N, f, T, W, F_g, etc.).

Checklist: no force without a source; no self-forces; no Newton's 3rd law reaction forces (those act on different objects, not on the body being analysed).

**Stage 3 — Multi-force situations (inclined plane example)**
Block on a ramp at angle θ:
- Weight W = mg downward (gravity from Earth)
- Normal force N perpendicular to the surface (contact from ramp — always perpendicular to surface)
- Friction f along the surface (contact from ramp — opposing relative motion or tendency)

Resolve into axes parallel and perpendicular to the incline:
- ΣF_∥ = mg sinθ − f = ma (if moving down the ramp)
- ΣF_⊥ = N − mg cosθ = 0 (no acceleration perpendicular to surface)

The FBD is the bridge from the physical situation to the equation.

**Stage 4 — Multi-object systems**
For connected objects (Atwood machine, block on table connected to hanging weight), draw a separate FBD for each object. Each FBD has its own Newton's 2nd law equation. Tension T in the string appears on both FBDs (equal magnitude, direction toward the pulley for each object). Solve the system of equations together.

**Mental-model versioning**: Stage 1 for establishing the isolation concept; Stage 2 for systematic procedure; Stage 3 for the most common exam geometry; Stage 4 for multi-object problems.

---

## 3. Why Beginners Fail

1. **Drawing forces without sources**: Students draw forces because "it seems like there should be a force there" — e.g., a "force of motion" in the direction the object is moving. Every force must come from a specific object. No source = no force.
2. **Including reaction forces**: Drawing both the normal force from the floor on the block AND the normal force from the block on the floor on the same FBD. The FBD includes forces ON the system, not forces FROM the system.
3. **Wrong normal force direction**: The normal force is always perpendicular to the contact surface, not perpendicular to the weight. On a ramp, N is perpendicular to the ramp face, not vertical.
4. **Mislocating friction**: Friction direction is not always "backward" in absolute terms — it opposes the relative motion or tendency of relative motion at the contact surface. On a ramp going up, friction acts down the ramp. On a ramp decelerating, friction acts up.

---

## 4. Misconception Library

**M1 — "The moving object has a force of motion"**
- Probe: "Draw the FBD of a ball rolling on a frictionless floor. What forces act?"
- Characteristic phrase: "There's a force in the direction of motion because the ball is moving."
- Recovery: Newton's 1st law: an object in motion continues in motion without a net force. Motion alone does not imply a force. Ask: "What physical object is exerting this 'force of motion'?" There is none. The only forces are gravity (Earth, downward) and normal force (floor, upward). Net force = 0; constant velocity = consistent with zero net force.

**M2 — "Normal force is always vertical (equal and opposite to weight)"**
- Probe: "Draw the FBD of a block on a ramp. Which way does the normal force point?"
- Characteristic phrase: "Normal force balances weight, so it points straight up."
- Recovery: "Normal" means perpendicular to the surface. On a horizontal floor: N is vertical (and happens to balance W for a stationary block). On a ramp: N is perpendicular to the ramp face — neither vertical nor horizontal. Draw the ramp, draw a perpendicular to the ramp surface — that is N's direction. Do NOT assume N = mg; compute ΣF⊥ = 0 to find N = mg cosθ on the ramp.

**M3 — "I should draw reaction forces on the FBD"**
- Probe: "A book sits on a table. The table pushes the book up. Should I also draw the book pushing the table down on the same diagram?"
- Characteristic phrase: "Newton's 3rd law says both forces — I should draw both."
- Recovery: The FBD is for ONE object — the book. Forces ON the book include: weight (Earth pulls down) and normal force (table pushes up). The book's push on the table is a force ON the table — it belongs on the TABLE's FBD, not the book's. The FBD rule: every arrow FROM an external source TO the system body.

**M4 — "Friction always points backward (against direction of motion)"**
- Probe: "A car is stationary on a slope about to slide down. Which direction is friction?"
- Characteristic phrase: "Friction is always backward — against motion."
- Recovery: Friction opposes the TENDENCY of relative motion, not the current motion. A stationary block on a ramp tends to slide DOWN — friction acts UP the ramp. A person walking forward pushes their foot backward; friction pushes their foot forward (reaction, enabling forward walking). Friction direction: determine which way the object WOULD slide without friction; friction acts opposite to that tendency.

---

## 5. Explanation Library

**E1 — Isolation procedure**
Draw a boundary around the chosen object. Any line (interaction) crossing that boundary from outside to inside is a force to include on the FBD. Internal interactions (between parts of the system) do not appear. Contacts that are cut by the boundary: replace with the contact force at that cut.

**E2 — Force catalogue**
For any terrestrial mechanics problem, the complete list of possible forces:
- Gravity (W = mg, always downward near Earth's surface, from Earth)
- Normal force N (from any surface in contact, ⊥ to surface)
- Friction f (from any surface in contact, ∥ to surface, opposing relative motion/tendency)
- Tension T (from any string/rope/cable, along the string toward the attachment point)
- Applied force F (from any agent explicitly mentioned in the problem)
- Spring force F = kx (from a spring)
- Buoyancy (if submerged)

Systematic check against this list eliminates missing or invented forces.

**E3 — Inclined plane FBD and axis choice**
Block on ramp angle θ, moving up the ramp, decelerating.
FBD: W downward, N perpendicular to ramp (pointing away from surface), f along ramp pointing downward (opposing upward motion).
Choose axes: x-axis along ramp (positive up), y-axis perpendicular to ramp.
ΣF_x = −mg sinθ − f = ma (decelerating, a < 0)
ΣF_y = N − mg cosθ = 0 → N = mg cosθ
f = μN = μmg cosθ → a = −g sinθ − μg cosθ = −g(sinθ + μcosθ)

**E4 — Atwood machine (two-FBD example)**
Two masses m₁ (heavier, left) and m₂ (lighter, right) connected by a string over a frictionless pulley.
FBD₁: T upward, m₁g downward → m₁g − T = m₁a (taking downward as positive for m₁)
FBD₂: T upward, m₂g downward → T − m₂g = m₂a (taking upward as positive for m₂)
Adding: (m₁ − m₂)g = (m₁ + m₂)a → a = (m₁ − m₂)g/(m₁ + m₂)
T = 2m₁m₂g/(m₁ + m₂)

Without separate FBDs, solving this system is nearly impossible for beginners.

---

## 6. Analogy Library

**Primary analogy — Passport control (what can cross the border?)**
The FBD boundary is like a country's border. Only things with a legitimate source OUTSIDE the border can enter. "Forces of motion" have no passport (no external source) — they don't get in. Newton's 3rd reaction forces have passports for a DIFFERENT country's FBD — wrong border. The customs list (force catalogue) is what you check at the border.

**Breaking point**: This analogy works for the "source required" rule but doesn't help students identify which direction each force points. The direction requires physical reasoning about the contact geometry (normal ⊥ surface, friction ∥ surface opposing tendency).

**Anti-analogy — Free body diagram as a picture of the scene**: Students draw the entire scene (ramp, block, person pushing) and add force arrows to all objects. A FBD is NOT the scene — it is one object in isolation with only the forces on THAT object. The scene is useful for setting up the problem, but the FBD is a purposefully stripped-down tool.

---

## 7. Demonstration Library

**D1 — Real-time FBD of person standing in elevator**
A person stands on a bathroom scale in an elevator. FBD: weight W down, scale normal force N up.
- Elevator at rest: N = W → scale reads actual weight.
- Elevator accelerating up: N − W = ma → N = W + ma > W → scale reads more.
- Elevator accelerating down: W − N = ma → N = W − ma < W → scale reads less.
- Free fall: N = 0 → "weightless." Live demonstration: person holds scale, jumps. Scale reading drops to zero during fall.

**D2 — Inclined plane with spring scale**
Place a block on a ramp. Attach a spring scale to hold it stationary. Read the spring tension. Vary the angle θ; measure N with a second scale under the ramp. Compare to FBD predictions: T = mg sinθ, N = mg cosθ. Quantitative verification that N ≠ mg (except at θ = 0°) and direction of N is ⊥ to ramp.

**D3 — Tug of war (two-FBD analysis)**
Two teams pull a rope. FBD of the rope: tension from team A, tension from team B. FBD of team A: feet-friction forward (from ground), rope tension backward. FBD of team B: feet-friction forward, rope tension backward. The team with more friction from the ground wins — not the one pulling harder (Newton's 3rd law: rope tension on A = rope tension on B). The winning force is the friction at the feet.

---

## 8. Discovery Lesson

*Guided discovery for the isolation principle*:

1. Show a video of a complex situation: a block on a ramp connected by a string over a pulley to a hanging mass. Ask: "What forces act on everything?"
2. Students list all forces in the scene. Chaos — forces on different objects, reaction pairs mixed in.
3. Ask: "If I only want to know what makes the block on the ramp accelerate, which forces do I need?" → Only forces ON the block.
4. Physically cut out a diagram of just the block: "Now, what's touching the block?" (ramp surface, string). "What long-range forces act on it?" (gravity). → Three forces; draw them.
5. Name this a free body diagram. Apply ΣF = ma to it.
6. Repeat for the hanging mass. Two FBDs; two equations; solve together.

The contrast with the full-scene chaos motivates the need for isolation.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student draws "force of motion" | Ask: "What object is exerting this force?" Pause for answer. If none: "Then it doesn't belong on the FBD." |
| Student draws reaction forces on the same FBD | Ask: "Which body is this FBD for?" Then: "This force is ON a different body — it belongs on that body's FBD." |
| Student makes N vertical on ramp | Ask: "Which direction is the surface of the ramp? What does 'normal to the surface' mean?" Draw the surface; draw the perpendicular. The perpendicular is N's direction. |
| Student gets friction direction wrong | Ask: "Without friction, which way would this object slide?" Mark that tendency. Friction points opposite. |
| Student ready for multi-body systems | Introduce the Atwood machine; draw separate FBDs for each mass; write separate ΣF = ma; solve simultaneously. Demonstrate that the tension in the string is the same for both (massless string assumption). |

---

## 10. Voice Teaching

"A free body diagram is a picture of one object — just that object, floating in space — with every external force drawn as an arrow. The key word is external: forces FROM other objects, not forces on other objects, not made-up forces.

Here's the discipline: for every arrow you draw, ask 'What object is pulling or pushing this one?' If you can't answer with a specific object, erase the arrow.

Three force types you'll almost always see in mechanics: gravity pulls straight down with magnitude mg; normal force pushes perpendicular to whatever surface is in contact — perpendicular to the surface, not perpendicular to gravity; and friction acts along the contact surface, opposing the tendency to slide.

For complicated problems — two masses on pulleys, stacked blocks — draw a SEPARATE FBD for each individual object. Then write a separate F equals ma for each. The connection between them is the tension or contact force that appears in both diagrams. Do not combine objects unless the problem specifically asks you to treat them as a system."

---

## 11. Assessment

**Mastery gate**: Student draws a complete, correct FBD for standard geometries (block on ramp, hanging mass, block on table), with all forces labelled, correct directions, and no invented or missing forces. Must correctly identify N direction on an inclined surface and friction direction for both sliding and stationary tendency cases. Three independent geometry problems.

**Formative golden probe**: "A 5 kg block is pushed up a ramp (angle 30°) by a horizontal force F. The surface has friction. Draw the FBD, label all forces, identify how many forces act, and write (but don't solve) the F = ma equations in ramp-parallel and ramp-perpendicular directions."

Expected FBD: weight (mg, straight down), normal force (N, ⊥ to ramp surface, upper-left direction), friction (f, along ramp pointing down-ramp, since block moves up), applied force (F, horizontal toward the ramp). Four forces total.
- ΣF_∥: F cosθ − mg sinθ − f = ma
- ΣF_⊥: N − mg cosθ − F sinθ = 0 → N = mg cosθ + F sinθ (horizontal F has a perpendicular component pushing into the ramp)

**Confidence calibration**: After the student draws the FBD, ask: "Walk me through each arrow and tell me what object created it." A confident but incorrect student will be unable to name a source for invented forces; discovering this discrepancy recalibrates their confidence.

**Delayed retrieval (1–2 weeks)**: "Draw the FBD for a person standing in a lift accelerating downward at 2 m/s². Label all forces. Is the normal force greater or smaller than their weight?"

---

## 12. Recovery Notes

**If "force of motion" error persists**:
This is the most stubborn FBD error because it confuses Newton's 1st law (motion doesn't require force) with Newton's 2nd (force causes acceleration). Every prompt for FBD should begin with: "List the objects in contact. List the long-range forces. Only these." The list-before-draw procedure prevents the force of motion from appearing.

**If normal force direction is consistently wrong**:
Practice with extreme angles: ramp at 0° (floor, N is vertical — correct) → 30° → 45° → 90° (wall, N is horizontal). At each step, draw the surface and identify the perpendicular explicitly before labelling N. The 90° case (wall) is often the most clarifying: a wall's normal force is horizontal, obviously not vertical.

**If the multi-body step confuses the student**:
Limit to one FBD at a time. Build both FBDs before writing any equations. Label the tension on each FBD as "T" — the same symbol, because it is the same magnitude. Only then assemble the equations. The mental discipline of completing both diagrams first prevents students from mixing forces across bodies.

---

## 13. Memory & Review

**Memory type**: Procedural (four-step isolation procedure, force catalogue check) + spatial (force directions for standard geometries)
**Forgetting risk**: High — the "force of motion" error returns; direction errors on ramps resurface; reaction forces creep back onto the diagram under problem pressure.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "A block is on a ramp at 40°, sliding down with kinetic friction. Draw the FBD. How many forces are there? Write the ΣF equations in ramp-axis coordinates."

---

## 14. Transfer Map

**Near transfer**: Friction, normal force, tension (the three direct unlocks — all require FBD discipline to solve correctly).
**Medium transfer**: Every dynamics problem in the mechanics curriculum uses FBDs. Without this skill, no further mechanics problem is solvable systematically.
**Far transfer**: Structural analysis in engineering (free body diagrams of structural members, trusses, beams — same isolation principle); fluid statics (pressure forces on a submerged object drawn as a FBD).
**Cross-domain**: Accounting (isolating a single entity's assets/liabilities from the rest of the economy is the financial equivalent of isolation in FBD). Systems thinking (isolating a subsystem and identifying inputs/outputs is the same mental operation).

---

## 15. Curriculum Feedback

- KG prerequisite `phys.mech.newtons-second-law` is necessary — students must understand ΣF = ma before the purpose of drawing all forces on one body makes sense.
- The three unlocks (`phys.mech.friction`, `phys.mech.normal-force`, `phys.mech.tension`) are all direct applications of FBD discipline — they cannot be taught properly without FBD skills.
- Difficulty `developing`/`apply` is appropriate — the procedure is learnable, but the discipline (no invented forces, correct directions) requires practice.
- Observation: FBD is one of the highest-leverage skills in introductory mechanics. Students who cannot draw correct FBDs cannot solve Newton's 2nd law problems. It deserves its own concept entry (correctly assigned in this KG) rather than being folded into Newton's laws as a side note.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
