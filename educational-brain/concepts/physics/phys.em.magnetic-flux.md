# Magnetic Flux — `phys.em.magnetic-flux`

## Identity

- **Concept ID**: `phys.em.magnetic-flux`
- **Display name**: Magnetic Flux
- **Domain**: electromagnetism
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 3
- **Requires**: `phys.em.magnetic-field`
- **Unlocks**: `phys.em.faradays-law`
- **Load-bearing prerequisite content**:
  - From `phys.em.magnetic-field`: **B** is a vector field; magnetic field lines form closed loops (no monopoles); field line density represents field strength; the direction of **B** at any point is tangent to the field line there; field lines have no sources or sinks (∮ **B**·d**A** = 0 for any closed surface).
  - Magnetic flux is the scalar measure of "how much magnetic field passes through a surface" — the integral that appears in Faraday's law. The concept directly extends the "field line counting" picture: more lines through the surface → more flux.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Magnetic flux is a measure of how many magnetic field lines pass through a given area. A stronger field, a larger area, or a surface held perpendicular to the field all give more flux. Tilting the surface so field lines pass through it at an angle gives less flux — and if the surface is parallel to the field, no field lines pass through it at all (zero flux).

**Stage 2 — Intermediate**: Magnetic flux Φ = B·A cosθ = **B**·**A**, where B is the field magnitude (T), A is the surface area (m²), and θ is the angle between the field direction **B** and the area vector **A** (which points perpendicular to the surface). The SI unit of flux is the weber: 1 Wb = 1 T·m². Special cases: θ = 0° (B perpendicular to surface, **B** ∥ **A**): Φ = BA (maximum flux). θ = 90° (B parallel to surface, **B** ⊥ **A**): Φ = 0 (zero flux). For a non-uniform field or non-flat surface: Φ = ∫ **B**·d**A** (general definition). Gauss's law for magnetism: ∮ **B**·d**A** = 0 for any closed surface — the total flux through any closed surface is zero (no magnetic monopoles).

**Stage 3 — Advanced**: Flux linkage Λ = NΦ (for a coil of N turns each carrying the same flux Φ) — this is the quantity that appears in Faraday's law as EMF = −dΛ/dt. If the flux through each of N turns changes by dΦ, the total change in flux linkage is N dΦ → EMF = −N dΦ/dt. For a solenoid with n turns per metre and length L: total turns = nL, flux per turn Φ = BA (B uniform inside) → Λ = nLBA. Stokes' theorem connects the surface flux to the line integral around the boundary: Φ = ∫_S **B**·d**A** = ∫_C **A**·d**l** (where **A** is the magnetic vector potential, **B** = ∇×**A**).

**Stage 4 — Expert / University**: In the quantum Hall effect and Aharonov-Bohm effect, the magnetic flux through a region affects quantum phase even when the particle never enters the field region — a purely quantum mechanical non-locality. The magnetic flux quantum (fluxon) in superconductors: Φ₀ = h/(2e) ≈ 2.07×10⁻¹⁵ Wb — the smallest unit of flux that can thread a superconducting loop. Quantised flux is the basis for SQUID (superconducting quantum interference device) magnetometers, which can detect fields as small as 10⁻¹⁸ T.

**Model versioning**: Stage 2 is the operative model for all secondary-level problems (Φ = BA cosθ, flux through a coil, change of flux). Stage 3 (flux linkage, Faraday's law) is the direct downstream application. Stage 4 is university quantum electrodynamics and superconductivity.

---

## Why beginners fail

The dominant root cause is **confusing the angle in Φ = BA cosθ (angle between B and the area normal) with the angle between B and the surface plane**: learners know that a surface perpendicular to the field gives maximum flux and a surface parallel to the field gives zero flux — but they measure θ as the angle between **B** and the surface, not between **B** and the area vector (surface normal). The surface normal is perpendicular to the surface itself. So when the field is perpendicular to the surface (maximum flux case), the angle between **B** and the normal is 0° — cosθ = 1 (correct). But learners say "the angle is 90° because B is perpendicular to the surface" — getting cosθ = 0 instead of 1 (the exact opposite).

The secondary root cause is **treating flux as always positive**: learners forget that flux is signed — the sign depends on the orientation of the area vector relative to B. Flux can be negative, and a decreasing positive flux produces the same magnitude of change as an increasing negative flux. The sign of dΦ/dt determines the direction of the induced EMF in Faraday's law.

---

## Misconception library

**M1 — "The angle θ in Φ = BA cosθ is the angle between B and the surface (not the normal)"**
- Characteristic phrase: "B is perpendicular to the surface — so θ = 90° and Φ = BA cos90° = 0."
- Probe: "A flat loop of area 0.01 m² is placed perpendicular to a uniform magnetic field of 2 T. What is the magnetic flux through the loop?"
- Expected wrong answer: "Φ = 0 — the field is perpendicular to the surface so θ = 90°."
- Recovery: the area vector **A** is defined as perpendicular to the surface (along the surface normal). When **B** is also perpendicular to the surface, **B** and **A** are parallel — θ = 0°, cosθ = 1 → Φ = BA = 2 × 0.01 = 0.02 Wb (maximum). The angle θ is between **B** and the surface normal (area vector), not between **B** and the surface itself. The two angles are complementary (they add to 90°). A helpful reframing: "θ = 0 when the field lines go straight through the loop (maximum flux); θ = 90° when the field lines are parallel to the loop plane (zero flux)."

**M2 — "Flux is always positive"**
- Characteristic phrase: "Flux is just how many field lines go through — it can't be negative."
- Probe: "A loop's area vector points upward (+z direction). The magnetic field points downward (−z direction). What is the sign of the magnetic flux?"
- Expected wrong answer: "Positive — it's still the same number of field lines."
- Recovery: Φ = **B**·**A** = BA cosθ. If **B** is in the −z direction and **A** is in the +z direction, θ = 180°, cosθ = −1 → Φ = −BA (negative). The sign indicates that the field lines pass through the loop in the opposite direction to the area vector. Negative flux is physically meaningful — it means the field lines go "into" the surface (against the area vector direction). In Faraday's law, an increase in negative flux (flux becoming more negative) produces an EMF just as an increase in positive flux would, but with opposite polarity.

**M3 — "Flux changes only when the field strength changes"**
- Characteristic phrase: "If B stays constant, the flux through my loop can't change."
- Probe: "A rectangular loop is in a uniform field B. The loop is then rotated by 90°. Does the flux change?"
- Expected wrong answer: "No — B is constant, so flux can't change."
- Recovery: Φ = BA cosθ — three things can change: B (field strength), A (area of the loop), or θ (orientation). If B and A are fixed but θ changes (loop rotates), the flux changes. Starting at θ = 0° (Φ = BA) and rotating to θ = 90° (Φ = 0): the flux has gone from BA to 0. This is the basis of AC generators — a coil rotating in a constant magnetic field experiences a continuously changing flux, inducing a sinusoidal EMF.

**M4 — "The total magnetic flux through a closed surface can be non-zero if there's a magnet inside"**
- Characteristic phrase: "If I put a bar magnet inside a closed surface, the north pole radiates more field lines than the south absorbs — net outward flux."
- Probe: "A bar magnet is completely enclosed in a closed Gaussian surface. What is the total magnetic flux through the surface?"
- Expected wrong answer: "Positive — the field lines from the north pole go outward through the surface."
- Recovery: the total magnetic flux through any closed surface is always zero (Gauss's law for magnetism: ∮ **B**·d**A** = 0). This is because magnetic field lines are closed loops — every line that exits the north pole re-enters through the south pole. Every line that exits the closed surface somewhere must also re-enter somewhere else. No net flux leaves or enters — the total is exactly zero, regardless of what's inside the surface (magnet, current loop, anything). This is equivalent to saying there are no magnetic monopoles — no sources or sinks of magnetic field lines.

---

## Explanation library

**E1 — The area vector convention**
"Every surface has two sides. For an open surface (like a flat loop), we choose one side as the 'positive' normal direction — the area vector **A** points that way. The choice is arbitrary, but once made it defines the sign convention: if field lines pass through the loop in the direction of **A**, the flux is positive; if they pass through in the opposite direction, the flux is negative. For Faraday's law, the chosen direction of **A** (and the associated positive flux direction) determines the direction of positive induced EMF via Lenz's law."

**E2 — Flux as field-line count (physical picture)**
"Imagine painting field lines on magnetic field. The flux through a surface is proportional to the number of lines passing through it. A surface held perpendicular to the lines intercepts the maximum number. Tilt the surface 30° — the lines now hit at an angle, and fewer cross through per unit area. Tilt 90° (surface parallel to lines) — no lines cross through; Φ = 0. The formula Φ = BA cosθ is the mathematical statement of this geometry: cosθ is the projection factor that counts only the component of the lines passing through, not along, the surface."

**E3 — Faraday's law as motivation (why flux matters)**
"Magnetic flux is the quantity that Faraday's law connects to EMF: EMF = −dΦ/dt (for one turn). The minus sign is Lenz's law — the induced EMF opposes the change. Three ways to change Φ: (1) change B (electromagnet turned on near a loop — transformers); (2) change A (loop area changes — not common); (3) change θ (loop rotates in fixed B — generators). Every induction phenomenon is ultimately a change in Φ. Flux is the bridge between the static field picture and the dynamic induction phenomenon."

---

## Analogy library

**Primary analogy — Sunlight through a window**
The amount of sunlight entering a room through a window depends on: (1) the brightness of sunlight (like the field strength B), (2) the size of the window (like the area A), and (3) the angle of the window relative to the sun's rays (like θ). A window directly facing the sun (perpendicular to rays) admits maximum light. A window tilted away admits less — proportional to cosθ. A window parallel to the rays (face-on to a wall, not the sun) admits no direct sunlight. The "light passing through" = "flux through the surface" in this analogy.

**Breaking point**: (1) Sunlight is a 1D flow (rays going in one direction); magnetic field lines can point in any direction. (2) The "area vector" concept (normal to the surface) is not needed for the window analogy — the intuition of "facing the source" captures it without the vector formalism. (3) Sunlight is always positive (you can't have negative sunlight); magnetic flux can be negative (if B and the area normal are opposite). (4) The window analogy doesn't capture Gauss's law for magnetism (zero total flux through a closed surface) — there is no "sunlight closed-surface" analogy.

**Anti-analogy — "More field lines in the region = more flux through the loop"**
Flux through a loop is not determined by how many field lines exist in the neighbourhood — it is determined by how many field lines actually pass through the loop. You can have an intense field (many field lines) running parallel to the loop surface — zero flux through the loop. You can have a weak field perpendicular to the loop — non-zero flux. "Flux" is about crossing through, not surrounding. A powerful magnet beside a loop with field lines running past (parallel to the loop) contributes zero flux through the loop.

---

## Demonstration library

**D1 — Rotating coil and galvanometer**
Connect a small coil of wire to a galvanometer. Rotate the coil from parallel to a bar magnet to perpendicular. The galvanometer deflects as the flux changes (during rotation) and returns to zero when the coil is stationary at a new orientation. Pause at 0° (maximum flux, zero EMF), then rotate to 90° (zero flux, zero EMF), observing that the EMF is only non-zero during the rotation — Faraday's law in action (EMF ∝ rate of change of flux). This directly links the abstract flux concept to the measured electrical quantity (EMF).

**D2 — Bar magnet plunged into a coil**
Plunge a bar magnet into a coil connected to a galvanometer. The galvanometer deflects. Hold the magnet still: deflection goes to zero (flux is not changing). Remove the magnet: deflection opposite direction (flux is decreasing). This shows that EMF responds to dΦ/dt, not to Φ itself — a critical distinction for Faraday's law. The larger the flux change rate (faster plunge), the larger the deflection.

**D3 — Flux through tilted loops (quantitative)**
Attach a search coil (a small coil with known area and turns) to a flux meter or integrating circuit. Place it in a known uniform field (Helmholtz coils). Measure the flux as the coil is tilted at 0°, 30°, 45°, 60°, 90° to the field. Record Φ at each angle; compute BA cosθ; compare. This is a direct quantitative verification of Φ = BA cosθ, requiring the student to use the correct angle convention (M1).

---

## Discovery lesson

**Argue for guided derivation from the field-line picture**:

The flux concept is not independently discoverable without the mathematical machinery of surface integrals. However, the key qualitative result (maximum flux when perpendicular, zero when parallel, cosθ in between) is geometrically intuitive:

"How many field lines pass through this loop when it's face-on to the field?" (Maximum.) "When it's edge-on?" (Zero.) "At 45°?" (Between the two — but less than half.) "Why less than half?" Guide to the geometric projection: only the component of the field perpendicular to the loop contributes to "piercing" the loop. "What trig function gives the perpendicular component?" cosθ. "So flux = B × A × cosθ." Then introduce the area vector as the perpendicular direction, and flux as a dot product.

The formal formula follows from the geometric intuition; the intuition is earned first.

---

## Teaching actions

**TA1 — Area vector drawn first**: Before computing any flux, require the learner to draw the area vector **A** on the surface diagram — perpendicular to the surface, in the chosen positive direction. Label it with the symbol **Â** (unit normal). Only then identify θ as the angle between **B** and **Â**.

**TA2 — Max/zero/other check**: For every flux problem, require the learner to first ask: "Is the field perpendicular to the surface (θ = 0°, maximum flux), parallel to the surface (θ = 90°, zero flux), or something in between?" This three-case classification prevents M1 by forcing the learner to relate the field-surface geometry to the cosθ factor before substituting numbers.

**TA3 — Sign determination**: After computing |Φ| = BA|cosθ|, require the learner to determine the sign: "Does **B** point in the same direction as **A** (positive) or opposite (negative)?" Then assign the sign.

**TA4 — Three sources of flux change**: For any problem involving changing flux, require the learner to identify which of the three variables is changing: B, A, or θ. This prevents M3 (assuming only B change causes flux change) and opens up the three physical scenarios (transformer/changing field, changing area, rotating loop/generator).

---

## Voice teaching

> "Magnetic flux: Φ = BA cosθ, where θ is the angle between B and the area normal — not between B and the surface. The area vector points perpendicular to the surface. When B also points perpendicular to the surface, θ = 0°, cosθ = 1, flux is maximum — all the field lines go straight through. When B is parallel to the surface, θ = 90°, cosθ = 0, flux is zero — no lines cross through."

> "Flux can be negative. The sign depends on whether B and the area normal point the same way or opposite ways. If you flip the area vector, the sign flips. The sign matters for Faraday's law: whether flux is increasing positively or becoming more negative determines the direction of the induced current."

> "Total flux through any closed surface is zero: ∮ B·dA = 0. Magnetic field lines are closed loops — every line that exits somewhere must re-enter somewhere else. No monopoles means no net sources or sinks. This is Gauss's law for magnetism — one of Maxwell's four equations — and it's exactly why magnetic field lines can never start or end."

---

## Assessment

**Mastery gate**: The learner can (1) define magnetic flux as Φ = **B**·**A** = BA cosθ with θ between **B** and the area normal; (2) calculate Φ for flat surfaces in uniform fields at any angle; (3) determine the sign of Φ from the relative orientation of **B** and **A**; (4) state that ∮ **B**·d**A** = 0 for any closed surface and explain why.

**Formative golden probe**
> "A square loop of side 0.1 m is in a uniform magnetic field B = 0.5 T. (a) Find Φ when the loop's plane is perpendicular to B (field passes straight through). (b) Find Φ when the loop's plane is parallel to B (field runs along the loop). (c) Find Φ when the loop's plane makes 30° with B. (d) The loop is then rotated from the orientation in (a) to the orientation in (b) in 0.2 s. What is the average magnitude of the induced EMF?"

- (a): θ = 0° (B ∥ area normal) → Φ = BA cos0° = 0.5 × 0.01 × 1 = 0.005 Wb = 5 mWb
- (b): θ = 90° (B ⊥ area normal) → Φ = 0
- (c): the plane makes 30° with B → the area normal makes 90° − 30° = 60° with B → Φ = BA cos60° = 0.5 × 0.01 × 0.5 = 2.5 mWb
- (d): |EMF| = |ΔΦ/Δt| = |0 − 0.005|/0.2 = 0.025 V = 25 mV

**Confidence calibration question**
After (a): "Is this the maximum or minimum flux?" (Maximum.) "Why?" A learner who says "minimum because B is perpendicular to the loop" has M1 active — use TA2 immediately.

**Delayed retrieval check (48 h / 7 days)**
"A circular loop of radius 5 cm is in a field of 0.3 T making 45° with the loop's area normal. Find the flux. If the field then doubles in 0.1 s while the loop stays fixed, what is the induced EMF?" (A = π × 0.0025 = 7.85×10⁻³ m²; Φ₁ = 0.3 × 7.85×10⁻³ × cos45° = 1.665×10⁻³ Wb; Φ₂ = 0.6 × 7.85×10⁻³ × cos45° = 3.33×10⁻³ Wb; EMF = ΔΦ/Δt = 1.665×10⁻³/0.1 = 16.65 mV.)

---

## Recovery notes

**Failure mode A — M1 (angle between B and surface, not normal)**
Construct the two angles side by side: "Draw the surface. Draw the surface normal (area vector A). Draw B. What is the angle between B and A?" (Call it α.) "What is the angle between B and the surface plane?" (Call it β.) "How are α and β related?" (α + β = 90° — they're complementary.) "Which one goes into Φ = BA cosθ?" (α — the angle between B and the normal.) Provide the mnemonic: "Flux is maximum when B pierces the surface straight through — that's when B and the normal are parallel (θ = 0°, cos = 1). Not when B is parallel to the surface."

**Failure mode B — M3 (only field change causes flux change)**
Present the rotating loop problem (D3). "B is constant. A is constant. But the loop rotates — does Φ change?" Compute at 0°, 30°, 60°, 90° using Φ = BA cosθ. Show that Φ changes continuously even though B and A are fixed. "What is changing?" θ. "So EMF can be induced just by rotating — generators use exactly this principle." Then: "What are the three ways to change Φ?" (B, A, θ) — require all three from memory.

**Failure mode C — M4 (net flux through closed surface can be non-zero)**
Return to the field line picture: "Field lines are closed loops. Draw a closed surface around a bar magnet. For every field line that exits the surface (from the N pole side), trace it — where does it go?" (Back into the magnet, out the S pole end, around the outside, back to the N pole — and in doing so, it must re-enter the closed surface through the S pole side.) "How many lines exit without re-entering?" (Zero.) "So what is the net flux?" (Zero.) The field line picture makes the zero-total-flux result geometrically obvious.

---

## Memory & review

**Memory type**: Formula (Φ = BA cosθ, θ between B and area normal) + three cases (0°: max; 90°: zero; angle: BA cosθ) + sign rule (B parallel to A: positive; antiparallel: negative) + Gauss's law (∮ B·dA = 0, always).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "Define magnetic flux. What is the angle θ measured from?"
- "A loop is parallel to a magnetic field. What is the flux? Perpendicular?"
- "Can the total magnetic flux through a closed surface be non-zero? Why or why not?"
- "Name three ways to change the magnetic flux through a loop."

**Interleaving**: After mastery, immediately interleave with Faraday's law (EMF = −dΦ/dt). Learners must connect flux change to induced EMF. Also interleave with electric flux (Gauss's law for E) — the contrast (∮ E·dA = Q_enc/ε₀ ≠ 0 vs. ∮ B·dA = 0 always) is a conceptual touchstone.

---

## Transfer map

**Immediate transfers**:
- `phys.em.faradays-law`: EMF = −dΦ/dt (or EMF = −N dΦ/dt for N turns) — the rate of change of flux is the direct cause of induced EMF; Faraday's law is the reason flux was defined

**Downstream transfers**:
- Transformers: a changing flux in the primary coil (from AC current) links through a magnetic core to the secondary coil, inducing an EMF proportional to the turns ratio
- AC generators: a coil of N turns rotating at angular frequency ω in field B — Φ(t) = NBA cosωt; EMF(t) = NBAω sinωt (peak EMF = NBAω)

**Cross-subject transfers**:
- Engineering — inductive sensors: proximity sensors, metal detectors, and inductive charging coils all work by detecting changes in magnetic flux through a sensing loop; the physics is Φ = ∫ **B**·d**A** and EMF = −dΦ/dt
- Geophysics — magnetotellurics: the time-varying geomagnetic field (from solar wind fluctuations) induces currents in Earth's conducting rocks (via changing flux) — used to image subsurface conductivity structure

---

## Curriculum feedback

The KG description "magnetic flux Φ = B·A is the total magnetic field passing perpendicularly through a surface area A" is correct but the notation "B·A" does not make the angle convention explicit. A learner reading "B·A" might interpret it as a simple product (no angle factor) or as a dot product of two scalars (undefined).

One gap: the KG description should state Φ = BA cosθ with the explicit statement that θ is the angle between **B** and the area normal (surface normal). This is the single most important clarification because the confusion between "angle to surface" and "angle to normal" (M1) is the dominant failure mode.

A second gap: the KG description does not mention Gauss's law for magnetism (∮ **B**·d**A** = 0). Since this is the global constraint on magnetic flux (and directly contrasts with Gauss's law for electricity), and since it is a direct consequence of the absence of magnetic monopoles, it should appear as an explicit learning outcome alongside the flux definition.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
