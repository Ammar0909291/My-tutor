# Magnetic Field and Field Lines — `phys.em.magnetic-field`

## Identity

- **Concept ID**: `phys.em.magnetic-field`
- **Display name**: Magnetic Field and Field Lines
- **Domain**: electromagnetism
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `phys.em.electric-current`
- **Unlocks**: `phys.em.magnetic-flux`, `phys.em.magnetic-force`, `phys.em.magnetic-materials`
- **Load-bearing prerequisite content**:
  - From `phys.em.electric-current`: current is the flow of charge (I = Q/t); conventional current direction is opposite to electron flow; a current-carrying conductor is electrically neutral overall (equal positive and negative charges) but carries net charge flow.
  - Moving charges are the source of magnetic fields; a current-carrying wire (net charge flow) creates a magnetic field in the surrounding space — the two concepts (current and magnetic field) are physically inseparable.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: A magnetic field is the invisible influence created by magnets and by electric currents. It pushes and pulls on other magnets and on moving charges. Field lines show the direction a north pole would point if placed at that location. Unlike electric field lines (which start and end on charges), magnetic field lines form closed loops — they have no starting or ending point.

**Stage 2 — Intermediate**: The magnetic field **B** (also called magnetic flux density) is a vector field; its SI unit is the tesla (T = kg/(A·s²)). Field lines: (1) form closed loops — they never start or end (no magnetic monopoles); (2) come out of the north pole and enter the south pole outside the magnet; (3) run from south to north inside the magnet (so the loop closes); (4) the density of field lines represents field strength. For a long straight current-carrying wire, the field lines are concentric circles around the wire; direction given by the right-hand rule: point the thumb in the direction of conventional current, the curled fingers show the direction of **B**. Field magnitude at distance r: B = μ₀I/(2πr), where μ₀ = 4π×10⁻⁷ T·m/A is the permeability of free space.

**Stage 3 — Advanced**: The Biot-Savart law gives the field from an infinitesimal current element: d**B** = (μ₀/4π)(Id**l** × r̂)/r². Integrating over an entire current distribution gives the total **B**. For a circular loop of radius R carrying current I, the field at the centre is B = μ₀I/(2R). Ampere's law (∮ **B**·d**l** = μ₀I_enc) provides a Gauss's-law-equivalent route to **B** when symmetry permits (infinite wire, solenoid, toroid). For a solenoid of n turns per metre: B = μ₀nI inside; ≈ 0 outside.

**Stage 4 — Expert / University**: Maxwell added the displacement current term (μ₀ε₀ ∂**E**/∂t) to Ampere's law, making the equations self-consistent and predicting electromagnetic waves. In special relativity, the magnetic field is not separate from the electric field — they are components of the electromagnetic tensor F^μν; a pure electric field in one reference frame appears as a combination of E and B in a moving frame (the basis of the Lorentz transformation of fields). Magnetic monopoles do not exist classically (∇·**B** = 0), but appear in some grand unified theories.

**Model versioning**: Stage 2 is the operative model for secondary-level problems (right-hand rule, B = μ₀I/2πr, field lines as closed loops). Stage 3 is needed for Biot-Savart/Ampere's law applications. Stage 4 is university electromagnetic theory.

---

## Why beginners fail

The dominant root cause is **magnetic field lines as open paths (like electric field lines)**: learners import the electric field mental model where lines start on positive charges and end on negative charges. They draw magnetic field lines starting at north poles and ending at south poles, failing to continue them through the magnet interior to form closed loops. This error propagates into confusion about flux (which requires closed loops to understand correctly) and Gauss's law for magnetism (∇·**B** = 0).

The secondary root cause is **right-hand rule reversal or confusion with left-hand rule**: learners mix up the right-hand rule for current-around-wire fields with the left-hand rule for force on a current (used in some curricula for conventional current convention). The result is that 50% of learners get the direction of **B** correct by chance and cannot reliably predict the direction when the current direction or viewing angle changes.

---

## Misconception library

**M1 — "Magnetic field lines start at north poles and end at south poles (like electric field lines start/end on charges)"**
- Characteristic phrase: "The field lines come out of north and go into south — they start and stop at the poles."
- Probe: "Draw the complete magnetic field lines for a bar magnet, including inside the magnet."
- Expected wrong answer: Lines drawn only outside the magnet, from N to S, with gaps at the poles.
- Recovery: magnetic field lines are closed loops. Outside the magnet, they go from N to S (this part is correct). Inside the magnet, they continue from S back to N, completing the loop. There are no magnetic monopoles — no source or sink of magnetic field lines. The number of lines entering the south pole equals the number leaving the north pole — and those lines continue through the magnet's interior. Draw the complete loop and check that every line closes on itself.

**M2 — "A magnetic field exerts force on any charge, moving or stationary"**
- Characteristic phrase: "If I bring a magnet near a charged balloon, the magnet will push the balloon."
- Probe: "A positive charge is placed at rest near a strong magnet. Does the magnet exert a force on the charge?"
- Expected wrong answer: "Yes — the magnetic field will attract or repel the charge."
- Recovery: a magnetic field exerts force ONLY on moving charges (F = qv×B). A stationary charge (v = 0) feels no magnetic force, regardless of how strong the field is. A stationary charged balloon near a magnet feels no magnetic force. However, a current-carrying wire (moving charges) placed near the magnet does feel a force. This is why magnets don't pick up stationary plastic with surface charge; they do deflect beams of moving electrons in a CRT.

**M3 — "The field inside a bar magnet is zero (or reversed)"**
- Characteristic phrase: "There's no field inside the magnet — the N and S poles cancel out inside."
- Probe: "What is the direction of the magnetic field inside a bar magnet?"
- Expected wrong answer: "Zero" or "From N to S (opposite to outside)."
- Recovery: the field inside the magnet runs from S to N (the same direction the field lines travel to close their loops). Outside: N to S. Inside: S to N. Both together form a closed loop. The field is NOT zero inside — it is typically stronger inside a permanent magnet than outside it (though harder to measure). This is directly analogous to the electric field inside a battery being directed from − to + (opposite to the external circuit).

**M4 — "The right-hand rule for a wire gives the same result as the left hand"**
- Characteristic phrase: "I can use either hand — I just need to get the directions right somehow."
- Probe: "A wire carries conventional current to the right (+x). Using the right-hand rule, what is the direction of B at a point directly above the wire?"
- Expected wrong answer: "Into the page" (the left-hand result) instead of "out of the page."
- Recovery: use a mnemonic and stick to it: for conventional current, the right-hand rule for the wire field is — thumb points in the direction of conventional current, curled fingers show the **B** field direction. With current going right and the point above the wire, the fingers curl out of the page at the top. Verify by considering: the field circles counterclockwise when current comes toward you (right-hand rule with thumb toward you). Always identify the direction of conventional current first, then apply the right hand.

---

## Explanation library

**E1 — Why field lines are closed loops (no magnetic monopoles)**
"An electric field line starts on a positive charge and ends on a negative charge — sources and sinks of electric field exist (positive and negative charges). For magnetic field, no isolated north or south magnetic pole has ever been found. Every magnet, no matter how small, has both a north and a south pole — cut a magnet in half and you get two smaller magnets, each with N and S. Without sources or sinks, field lines must form closed loops. This is encoded in Gauss's law for magnetism: the total magnetic flux through any closed surface is zero (∮ **B**·d**A** = 0). What goes out on one side must come back in on another."

**E2 — Right-hand rule for a straight wire (step by step)**
"For a long straight wire carrying conventional current I: (1) Point your right thumb in the direction of conventional current. (2) Your curled fingers show the direction of the circular **B** field lines around the wire. If current goes upward, the field circles counterclockwise when viewed from above. The magnitude is B = μ₀I/(2πr) — halve the distance from the wire, double the field; double the current, double the field."

**E3 — Magnetic field of a solenoid (conceptual build-up)**
"A solenoid is a helix of wire — many circular loops side by side. Each loop contributes a field pointing along the solenoid's axis (using the right-hand rule per loop). Inside the solenoid, all loops' fields add in the same direction → uniform strong field (B = μ₀nI). Outside, the fields from adjacent loops nearly cancel → negligibly weak field. A solenoid is the magnetic analogue of a parallel-plate capacitor (uniform field between the plates): both create uniform fields inside a confined region."

---

## Analogy library

**Primary analogy — Electric field lines (structure with key contrast)**
Magnetic field lines behave like electric field lines in their density-represents-strength property and in showing the direction a test object would be pushed. But the crucial contrast: electric field lines start and end on charges (open); magnetic field lines always form closed loops (closed). Analogously: electric field has sources (charges); magnetic field has no sources (no monopoles). This contrast is worth making explicit: the two field types are structurally parallel but differ in topology.

**Breaking point**: The analogy breaks for directionality — electric field lines point in the direction of force on a positive test charge; magnetic field lines point in the direction a free north pole would move (hypothetical). The force on an actual moving charge in a magnetic field is perpendicular to **B** (not along it), which has no electric field analogue.

**Anti-analogy — "Stronger magnet = stronger field everywhere"**
The field from a magnet depends on position — it falls off rapidly with distance. A "stronger" magnet (larger magnetic moment) creates a larger field near it, but the 1/r³ fall-off for dipole fields means that even a very strong magnet has negligible field far away. Learners who visualize the "strength" of a magnet as a uniform property of the space around it miss the spatial structure of the field — the field is a function of position, not a single number.

---

## Demonstration library

**D1 — Iron filing field map (bar magnet)**
Sprinkle iron filings on a sheet of paper placed over a bar magnet. Tap gently. The filings align with the field to show the closed-loop pattern: emerging from N, sweeping around, entering S, and (inside the magnet, seen by lifting the paper to the magnet's side) continuing from S back toward N. This is the single most impactful magnetic field demonstration — the closed-loop topology becomes visually undeniable.

**D2 — Right-hand rule live demonstration (current-carrying wire and compass)**
Connect a long wire to a battery (with a resistor). Place a compass directly above the wire, then below, then to either side. The compass needle deflects — confirming a circular field. Reverse the current: the compass deflects the opposite way. Use the right-hand rule to predict each case before observing. This grounds the right-hand rule in measurement rather than abstract geometry.

**D3 — Solenoid field mapping**
Connect a solenoid to a DC supply. Place a compass at various positions: inside the solenoid (strong, uniform, aligned with axis), at the ends (diverging field), outside near the middle (weak). Compare inside vs. outside field strength by measuring deflection angle. This builds the Stage 2→3 model transition (uniform interior field).

---

## Discovery lesson

**Argue for guided inquiry with a predictive-then-observe structure**:

The right-hand rule is the key procedural knowledge and is best earned through prediction-and-correction, not told. Before showing D2, present this problem: "A wire carries conventional current upward. A compass is placed to the right of the wire. Which way does the needle deflect?" Learners predict (most will guess "toward the wire" or random). Observe D2. Then ask: "What geometric relationship exists between the current direction and the field direction at that point?" Guide toward: perpendicular; circular. "Does this remind you of anything else in physics?" (No direct precedent — this is new geometry.) Then supply the right-hand rule as the naming and systematizing of what was observed.

For the closed-loop nature of field lines: follow D1 with the question "Where do these field lines start and end?" — the filings show they don't end; they form complete loops. This is discoverable from the demonstration, not abstract.

---

## Teaching actions

**TA1 — Complete-loop field line discipline**: Whenever a learner draws magnetic field lines, require that every line they draw forms a complete closed loop visible on the diagram (even if it means drawing the interior of the magnet). A field line with free endpoints fails the closed-loop rule and is physically wrong.

**TA2 — Right-hand rule ritual**: Before any B-direction question, require the learner to: (1) identify conventional current direction, (2) physically orient the right hand with thumb along that direction, (3) state which way the fingers curl at the point of interest. Make the physical gesture mandatory — learners who "do it in their head" produce systematic errors.

**TA3 — Stationary-vs-moving charge distinction**: For every force-on-charge scenario, ask first: "Is the charge moving or stationary?" If stationary → no magnetic force (only electric force if E ≠ 0). If moving → magnetic force F = qv×B (direction: right-hand rule, perpendicular to both v and B). This pre-empts M2.

**TA4 — Field-inside-magnet direction declaration**: For every bar-magnet diagram, require the learner to draw arrows inside the magnet (from S to N) to complete the closed loops. This burns in M1's recovery before the error takes root.

---

## Voice teaching

> "Magnetic field lines are closed loops — every single one. Outside the magnet they go from north to south; inside the magnet they go from south back to north, completing the loop. There are no magnetic monopoles — no source or sink — so there can be no open-ended field lines. This is written as ∮ B·dA = 0: the total flux through any closed surface is zero."

> "Right-hand rule for a wire: thumb in the direction of conventional current, curled fingers in the direction of B. Current going right — fingers at the top curl out of the page, at the bottom they curl into the page. The field circles around the wire counterclockwise when conventional current comes toward you. Practice until you can predict a compass deflection before you see it."

> "A magnetic field only exerts force on moving charges. Stationary charge in a magnetic field: zero force. Same charge moving perpendicular to B: maximum force, perpendicular to both the velocity and the field. This is why a magnet doesn't affect a stationary charged balloon but does deflect an electron beam — the beam electrons are moving at enormous speed."

---

## Assessment

**Mastery gate**: The learner can (1) state that magnetic field lines form closed loops (no monopoles); (2) correctly apply the right-hand rule to find the direction of B around a current-carrying wire; (3) state that magnetic force acts only on moving charges; (4) use B = μ₀I/(2πr) to calculate field magnitude at distance r from a long wire.

**Formative golden probe**
> "A long straight wire carries a conventional current of 5 A upward (in the +y direction). (a) What is the direction of the magnetic field at a point P located 0.1 m to the right (+x direction) of the wire? (b) What is the magnitude of B at P? (c) A charge of +2 µC is at rest at P. What is the magnetic force on it? (d) The same charge now moves at 10⁶ m/s in the +y direction at P. In what direction is the magnetic force?"

- (a): Apply right-hand rule — thumb up (+y), fingers curl out of the page (+z) at the right (+x) side → B points out of the page (+z)
- (b): B = μ₀I/(2πr) = (4π×10⁻⁷ × 5)/(2π × 0.1) = 10⁻⁵ T = 10 µT
- (c): zero — the charge is stationary (v = 0), so F = qv×B = 0
- (d): F = qv×B = (+2×10⁻⁶)(10⁶ ĵ) × (10⁻⁵ k̂) = 2×10⁻⁵ (ĵ × k̂) = 2×10⁻⁵ î N → force in +x direction (away from the wire)

**Confidence calibration question**
After (c): "Are you surprised that there's no magnetic force on the stationary charge?" (1–5 surprise). High surprise → M2 (magnetic force on any charge) is active; use TA3.

**Delayed retrieval check (48 h / 7 days)**
"Draw the magnetic field lines for a bar magnet, including inside the magnet. What is the direction of B inside the magnet, and why?" (S → N inside, because field lines form closed loops; no monopoles means no open endpoints.)

---

## Recovery notes

**Failure mode A — M1 persists (field lines start at N, end at S)**
Run D1 (iron filings). Ask the learner to trace one complete field line: "Follow this cluster of filings all the way around. Where does the line you're tracing go?" Guide the learner to see that the line curves around and enters the south pole — but then continues inside the magnet back to the north pole to close. Show the interior field with a compass inserted into a solenoid (accessible interior). The physical demonstration is the only reliable resolver of this misconception.

**Failure mode B — Right-hand rule confusion (M4)**
Revert to the ritual (TA2): no "in-head" right-hand rule for this learner. Use a physical prop — a pen as the wire. "Grip the pen with your right hand so your thumb points in the current direction. Now read off the direction your fingers wrap around the pen at the point of interest." Repeat for three different current directions until the learner can predict a compass deflection before observing.

**Failure mode C — M2 persists (magnetic force on stationary charges)**
Compute: "F = qv×B. What is F if v = 0?" F = q(0)×B = 0. The formula itself makes the conclusion unavoidable — not as a rule to memorize but as arithmetic. Then follow with: "At what speed does the magnetic force become maximum?" (v perpendicular to B.) The speed-dependence is the conceptual key: the magnetic force is a kinematic effect, not a static one.

---

## Memory & review

**Memory type**: Topology rule (closed loops, no monopoles) + right-hand rule (thumb = current, fingers = B) + force rule (moving charges only, F = qv×B) + formula (B = μ₀I/2πr).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "Why do magnetic field lines form closed loops? What would open-ended magnetic field lines imply?"
- "State the right-hand rule for the magnetic field of a long straight wire."
- "A charge at rest is placed in a magnetic field. What is the magnetic force on it?"
- "A wire carries 10 A. What is the magnetic field 5 cm from the wire?"

**Interleaving**: After mastery, interleave magnetic field problems with magnetic force problems (F = qv×B, F = BIL) — learners must distinguish "finding the field from a source" from "finding the force on a charge in a field." These are frequently confused in exam problems.

---

## Transfer map

**Immediate transfers**:
- `phys.em.magnetic-force`: F = qv×B (force on a moving charge); F = BIL (force on a current-carrying conductor); the field concept is the prerequisite for these force calculations
- `phys.em.magnetic-flux`: Φ = ∫ **B**·d**A**; flux is the integral of the field over a surface, prerequisite for Faraday's law of induction

**Downstream transfers**:
- Electromagnetic induction (Faraday's law): a changing magnetic flux induces an EMF — requires understanding what magnetic field and flux are
- Solenoids and electromagnets: practical applications of B = μ₀nI — motors, generators, MRI machines, loudspeakers

**Cross-subject transfers**:
- Biology — MRI: magnetic resonance imaging uses a magnetic field (typically 1.5–3 T, about 30,000–60,000 times Earth's field) to align proton spins, then radio waves to perturb them — the signal from realignment is the image
- Earth science — geomagnetic field: Earth's liquid outer core carries convection currents that generate a magnetic field (the geodynamo); the field protects the atmosphere from solar wind ion bombardment

---

## Curriculum feedback

The KG description "a magnetic field exerts forces on moving charges and current-carrying conductors; field lines indicate its direction and strength" is accurate but terse for a concept with this much learner difficulty.

One gap: the closed-loop property of magnetic field lines (no monopoles, ∮ **B**·d**A** = 0) is not mentioned in the KG description. This topological fact is the most important structural difference from electric fields and drives the dominant misconception (M1). It should be explicit in the learning outcomes.

A second gap: the right-hand rule for the field around a current-carrying wire is not in the KG description. B = μ₀I/(2πr) for the infinite straight wire is the foundational formula that links the prerequisite (electric current) to this concept, and the right-hand rule is how the direction is determined. Both deserve explicit mention.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
