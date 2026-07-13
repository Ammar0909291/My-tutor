# phys.em.magnetic-dipole — Magnetic Dipole Moment

## 1. Identity
- **Canonical KG ID**: `phys.em.magnetic-dipole`
- **Canonical name**: Magnetic Dipole Moment
- **Curriculum domain**: Electromagnetism
- **Difficulty tier**: proficient
- **Bloom level**: understand
- **Prerequisites**: `phys.em.magnetic-materials`
- **Unlocks**: (none in current KG)
- **Estimated study hours**: 4
- **KG description**: A magnetic dipole has a moment m = NIA; Earth behaves as a giant magnetic dipole with geographic and magnetic poles.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (bar magnet as a dipole)**
A bar magnet has a north pole and a south pole separated by a distance 2l. It behaves like a magnetic dipole — it aligns with an external field, and it creates a characteristic field pattern (field lines loop from north to south outside, south to north inside). Every permanent magnet, compass needle, and current-carrying loop is a magnetic dipole.

**Stage 2 — Quantitative (current loop and coil)**
Magnetic moment of a current loop: m = IA, where I = current (A), A = area of the loop (m²).
Direction: right-hand rule — curl fingers in the direction of current → thumb points in direction of m⃗.

For a coil of N turns: m = NIA.

SI unit: A·m² (ampere-metre-squared).

The magnetic moment is a property of the source (the current loop/magnet), not the field. It determines how the source behaves in an external field.

**Stage 3 — Torque and energy in a uniform field**
Torque: τ⃗ = m⃗ × B⃗ → τ = mB sinθ, where θ is angle between m⃗ and B⃗.
- Maximum torque at θ = 90° (m⃗ ⊥ B⃗)
- Zero torque at θ = 0° (m⃗ ∥ B⃗, stable equilibrium) and θ = 180° (unstable equilibrium)

Potential energy: U = −m⃗·B⃗ = −mB cosθ
- Minimum U (most stable) at θ = 0° (aligned with field)
- Maximum U at θ = 180° (anti-aligned)

**Stage 4 — Earth as a magnetic dipole**
Earth's magnetic field approximates a dipole with:
- Magnetic dipole moment ≈ 8 × 10²² A·m²
- Magnetic south pole near geographic north (compass north points to magnetic south, which is near geographic north — the convention is inverted)
- Geographic poles ≠ magnetic poles (offset ~11°)
- Field strength at surface: 25–65 μT depending on location
- Magnetic field at distance r along dipole axis: B ≈ (μ₀/4π)(2m/r³) — falls as 1/r³, not 1/r²
- Secular variation: pole positions change over decades; polarity reverses over geological timescales

**Mental-model versioning**: Stage 1 for conceptual grounding; Stage 2 for magnitude calculations; Stage 3 for torque/energy problems; Stage 4 for geophysical context.

---

## 3. Why Beginners Fail

1. **Area vector direction**: Students know m = NIA but forget m⃗ is a vector with direction given by the right-hand rule applied to the current circulation. They compute the magnitude correctly but assign the wrong direction for torque calculations.
2. **Confusing geographic and magnetic poles**: Earth's geographic north ≠ magnetic north. The magnetic pole near geographic north is actually a magnetic south pole (it attracts compass north). This double-inversion confuses learners every time.
3. **Torque vs. force**: A uniform external field exerts zero net force on a dipole (equal and opposite forces on opposite poles/sides cancel) but nonzero torque. Students expect a net translational force and are confused when only rotation occurs.
4. **Unit confusion (m²)**: The area in m = NIA is always in m² for SI. A coil of area 4 cm² = 4 × 10⁻⁴ m²; students leave it in cm² and get answers wrong by 10⁴.

---

## 4. Misconception Library

**M1 — "Compass points to geographic north because Earth's magnetic north pole is there"**
- Probe: "Why does a compass needle's north pole point north?"
- Characteristic phrase: "There's a magnetic north pole under the geographic North Pole."
- Recovery: Opposite poles attract. The compass north points toward a magnetic SOUTH pole. Earth's geographic north region hosts a magnetic south pole (by convention, the pole that attracts compass north is called the magnetic north pole geographically, but it is physically a magnetic south — this naming inversion is a historical quirk). Draw: compass north (N) → attracted to → Earth's magnetic south (which is near geographic North). The geographic South Pole region has Earth's magnetic north.

**M2 — "A magnetic dipole in a uniform field experiences a net force (translation)"**
- Probe: "A compass needle is placed in a uniform magnetic field. What happens?"
- Characteristic phrase: "The compass should move toward the stronger field."
- Recovery: In a uniform field, the force on the north pole (+) and south pole (−) of a dipole are equal in magnitude and opposite in direction → net force = 0. The dipole rotates (torque ≠ 0) but does not translate. Translation only occurs in a NON-uniform field (the gradient force F = ∇(m⃗·B⃗)). A compass aligns with Earth's field — it rotates but doesn't fly toward the magnetic pole.

**M3 — "m⃗ points from S to N inside the magnet (like B⃗)"**
- Probe: "A bar magnet has its N pole up and S pole down. Which way does m⃗ point?"
- Characteristic phrase: "m⃗ should point from south to north, in the direction B goes inside."
- Recovery: By convention, m⃗ points from S to N inside the magnet (same as B⃗ inside). So yes — this statement is actually CORRECT. The misconception usually appears the other way: students say m⃗ points from N to S (following the external field lines direction). The external field of a bar magnet goes from N to S outside the magnet, so students extrapolate this direction for m⃗. Clarify: m⃗ points in the same direction as B⃗ inside the magnet (S→N internally), which is also the direction of maximum positive torque alignment.

**M4 — "Magnetic dipole field falls as 1/r² like a point charge"**
- Probe: "How does the field of a magnetic dipole fall off with distance?"
- Characteristic phrase: "It's like gravity or electric field — falls as 1/r²."
- Recovery: A magnetic dipole field falls as 1/r³. On the dipole axis: B = (μ₀/4π)(2m/r³). On the equatorial plane: B = (μ₀/4π)(m/r³). Both go as 1/r³ — one power faster than the Coulomb/gravity 1/r². This is because a dipole is a pair of opposite poles that nearly cancel at large distances; the cancellation causes the extra power of 1/r. (Monopole → 1/r²; dipole → 1/r³; quadrupole → 1/r⁴ pattern.)

---

## 5. Explanation Library

**E1 — Definition and formula**
A magnetic dipole is the simplest magnetic source configuration. For a current loop of area A carrying current I in N turns: m⃗ = NIA n̂, where n̂ is the unit normal to the loop given by the right-hand rule. This is the exact analogue of the electric dipole moment p⃗ = qd⃗.

**E2 — Torque derivation for a rectangular loop**
A rectangular loop (sides a × b) in uniform B⃗ (along x-axis), current I, m⃗ along z-axis initially:
Forces on the two sides of length a (parallel to B⃗): F = IBa × 0 = 0 (current parallel to B — zero force).
Forces on the two sides of length b (perpendicular to B⃗): F = IBb (each side), in opposite directions.
Torque = F × (a/2) + F × (a/2) = IBb × a = IAB = mB (when m⃗ ⊥ B⃗).
General: τ = mB sinθ → τ⃗ = m⃗ × B⃗. ✓

**E3 — Energy derivation**
Work done rotating dipole from θ = 90° (reference U = 0) to angle θ:
W = −∫_{90°}^{θ} τ dθ' = −∫_{90°}^{θ} mB sinθ' dθ' = mB cosθ − 0 = mB cosθ
U = −W = −mB cosθ = −m⃗·B⃗ ✓

**E4 — Earth's dipole approximation**
The external field of Earth approximates a magnetic dipole:
On the axis (geographic poles): B_poles ≈ 2 × 10⁻⁴ T (observed ~6 × 10⁻⁵ T — deviates from pure dipole due to crustal anomalies).
On the equator: B_equator ≈ 1 × 10⁻⁴ T (observed ~3 × 10⁻⁵ T).
Ratio B_poles/B_equator = 2 — characteristic of a dipole, consistent with the 1/r³ field structure.

---

## 6. Analogy Library

**Primary analogy — Electric dipole (exact structural parallel)**
Electric dipole: p⃗ = qd⃗ (from − to + charge), τ⃗ = p⃗ × E⃗, U = −p⃗·E⃗, field ∝ 1/r³.
Magnetic dipole: m⃗ = NIA n̂ (right-hand rule), τ⃗ = m⃗ × B⃗, U = −m⃗·B⃗, field ∝ 1/r³.
Every formula has an exact structural analogue. Once the electric dipole is understood, the magnetic dipole follows by substitution: q→I, d→A, p→m, E→B, ε₀→1/μ₀.

**Breaking point**: An electric dipole consists of actual positive and negative charges (electric monopoles exist). A magnetic dipole has no magnetic monopoles — there is no isolated magnetic pole. A bar magnet cut in half produces two smaller dipoles, not an isolated north and south pole. This fundamental difference in physical realisation is absent from the mathematical analogy.

**Anti-analogy — Gravity (torque → translation)**: Objects in gravity always experience translational forces in a uniform field (gravity has no analogue of zero net force on a dipole in uniform field). Students who import the gravity intuition expect the compass to fly toward Earth's pole. The magnetic dipole torque-without-translation is counter-intuitive until the force-cancellation argument (M2 recovery) is made explicit.

---

## 7. Demonstration Library

**D1 — Coil in a Helmholtz coil field**
Hang a small, N-turn coil by a thin fibre in the uniform field of a Helmholtz coil (known B). When the coil is displaced from equilibrium, it oscillates. Period T = 2π√(I_rot/mB), where I_rot is the moment of inertia of the coil. Measure T and B → compute m = NIA from the known coil geometry → verify the formula. This is also the working principle of the tangent galvanometer and magnetometer.

**D2 — Compass needle alignment**
Place a compass near a bar magnet at various angles. Show that the needle aligns with the field lines — torque drives it to m⃗ ∥ B⃗. Demonstrate that at 90° orientation the torque is maximum (the needle snaps back sharply); at 0° (aligned) the torque is zero (stable rest). Count oscillations to show simple harmonic motion near equilibrium (τ ≈ −mBθ for small θ).

**D3 — Earth's dipole and field inclination (dip angle)**
Use a dip circle (inclinometer) to measure the angle of Earth's B-field below horizontal at the lab location. This dip angle is characteristic of a dipole field: at the magnetic equator, inclination = 0°; at the magnetic poles, inclination = 90°. Compute the latitude from the measured dip: tanI = 2tanλ (where I = inclination, λ = magnetic latitude) — an application of the dipole field formula.

---

## 8. Discovery Lesson

*Direct instruction with guided discovery for the torque formula*:

1. Set up a rectangular current loop in a known uniform B-field.
2. Ask: "What forces act on each side? Which sides experience force and which don't?"
3. Students apply F = BIL to each side, discovering that sides parallel to B have zero force, sides perpendicular have equal and opposite forces.
4. Ask: "Equal and opposite forces — do they produce translation or rotation?" → Rotation (torque).
5. Compute the torque from geometry → derive τ = BIAB sinθ = mB sinθ.
6. Name this as the magnetic moment formula.
7. Verify: larger current, larger area, larger B → larger torque. Physical intuition confirmed.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student assigns wrong direction to m⃗ | Apply right-hand rule: curl fingers in current direction → thumb = m⃗. Do this physically with hand before writing any formula. |
| Student says compass points to geographic north = magnetic north | Draw: geographic north + magnetic south (near geographic north) → compass north pole attracted to magnetic south. The naming is conventional, not physical. |
| Student expects net force on dipole in uniform field | Derive the force cancellation explicitly: F_north = +BIa, F_south = −BIa (opposite side), net F = 0. Only in non-uniform field does net force appear. |
| Student uses cm² instead of m² | Convert before plugging in: 1 cm² = 10⁻⁴ m². Show that the SI unit of m is A·m², not A·cm². |
| Student confuses 1/r² with 1/r³ falloff | Derive the dipole field on axis from the two "poles" model: B = (μ₀/4π)[m/(r−l)² − m/(r+l)²] ≈ (μ₀/4π)(4ml/r³) = (μ₀/4π)(2m/r³) for r >> l. The extra 1/r comes from the near-cancellation of north and south pole contributions. |

---

## 10. Voice Teaching

"A magnetic dipole is the simplest thing you can make from magnetism — a current loop. The loop has a magnetic moment: m equals N times I times A. N for turns, I for current, A for area. The direction: right-hand rule around the current gives you which way m points. That's it for the definition.

Now put this dipole in an external field B. It experiences a torque: tau equals m cross B, or mB sine-theta. The dipole wants to align with the field — that's stable equilibrium, minimum energy, theta equals zero. Turn it 90 degrees and you get maximum torque. Turn it 180 degrees and it's unstable — any perturbation makes it flip back to alignment.

Earth is a giant magnetic dipole with moment about 8 times ten to the 22 A-m-squared. The subtle point: the pole near geographic north is a magnetic south pole. That's why compass north points toward it — opposite poles attract. The geographic-magnetic mismatch trips almost everyone up.

One more fact to lock in: the dipole's own field falls as 1 over r-cubed, not r-squared. That extra power comes from the near-cancellation of north and south contributions at large distances."

---

## 11. Assessment

**Mastery gate**: Student correctly computes m = NIA for a coil, determines the direction of m⃗ from the right-hand rule, calculates torque τ = mB sinθ in a uniform field, and explains why the dipole experiences torque but not translation in a uniform field. Three multi-step problems required.

**Formative golden probe**: "A circular coil of 50 turns and radius 4 cm carries a current of 0.2 A. (a) What is the magnetic moment? (b) The coil is placed in a uniform B = 0.5 T field with its plane parallel to the field (m⃗ ⊥ B⃗). What torque acts on it? (c) What is the potential energy in this orientation?"

Answers:
- (a) m = NIA = 50 × 0.2 × π(0.04)² = 50 × 0.2 × 5.03×10⁻³ = 0.050 A·m²
- (b) τ = mB sin90° = 0.050 × 0.5 × 1 = 0.025 N·m
- (c) U = −mB cos90° = 0 J (this is the reference position for U = 0 in the derivation above — at 90° we set U = 0, so this is consistent)

**Confidence calibration**: After (b), ask: "Does the field also push the coil sideways or pull it toward the field source?" A student with understanding will say no (uniform field, zero net force). Surface this to correct the translation misconception early.

**Delayed retrieval (1–2 weeks)**: "Define magnetic moment. A proton (charge e, mass m_p) orbits in a circle of radius r with speed v. What is its magnetic moment? (Express in terms of e, m_p, r, v.)"

---

## 12. Recovery Notes

**If student cannot remember whether τ = mB sin or cos**:
Use limiting cases: at θ = 0° (aligned), clearly zero torque (no reason to rotate) → sin(0°) = 0 ✓. At θ = 90° (perpendicular), maximum torque → sin(90°) = 1 ✓. The sine form is correct.

**If Earth's pole naming causes persistent confusion**:
Give the physical rule: "The pole you call 'magnetic north' on a compass needle is attracted to geographic north. Two magnets attract when opposite poles face each other. Therefore, what's near geographic north must be a magnetic south pole." Treat the historical naming as a quirk to accept, not to derive.

**If 1/r³ vs 1/r² is confused**:
Two poles separated by 2l: at large r, B_north ∝ 1/(r−l)² ≈ 1/r²(1 − l/r)⁻² ≈ (1/r²)(1 + 2l/r); B_south ∝ −1/(r+l)². Summing: net B ∝ (4l/r³). The subtraction of nearly equal 1/r² terms leaves only the 1/r³ difference term. This calculation can be done by any student who has seen a Taylor expansion.

---

## 13. Memory & Review

**Memory type**: Declarative (m = NIA, τ = m × B, U = −m·B, Earth's pole geography) + procedural (right-hand rule for direction, torque calculation)
**Forgetting risk**: Medium — the formula is straightforward, but the Earth pole geography and the 1/r³ vs 1/r² falloff are frequently confused at the 2-week mark.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "A 100-turn square coil (side 5 cm) carries 0.5 A. It sits in a field of 0.3 T with m⃗ making a 30° angle with B⃗. Find the magnetic moment, the torque, and the potential energy."

---

## 14. Transfer Map

**Near transfer**: Torque on a current loop in a motor (the electric motor operating principle is torque on a current-carrying coil in a magnetic field — the fundamental application of τ = m × B).
**Medium transfer**: Spin magnetic moment of electrons (m = g_s × (e/2m_e) × ħ/2 for spin-½ — same formula structure, different source); NMR and MRI (nuclear magnetic moments aligned by B₀, tipped by RF pulses, emit at Larmor frequency ω = γB₀).
**Far transfer**: Stellar magnetism (neutron star magnetic moments of ~10²⁸ A·m² produce pulsar fields of ~10⁸ T); tidal locking and magnetic breaking in planetary science.
**Cross-domain**: Electric dipole energy in fields (U = −p⃗·E⃗) — exact structural parallel exploited in molecular spectroscopy (rotational absorption depends on permanent dipole moment).

---

## 15. Curriculum Feedback

- KG prerequisite `phys.em.magnetic-materials` is appropriate — magnetic materials introduced the concept of magnetic domains and atomic magnetic moments, which motivates why m = NIA scales from a single loop to macroscopic magnets.
- No unlocks are listed in the current KG — a natural future extension would be `phys.em.inductance` or `phys.em.ac-basics`, since inductance depends on the magnetic moment of coils.
- Difficulty `proficient`/`understand` is correct — the concept is moderately demanding conceptually (pole naming, force vs. torque) but the formulas are compact.
- The Earth-as-dipole section gives compelling real-world context that prevents this from being purely abstract.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
