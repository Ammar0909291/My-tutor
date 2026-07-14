# phys.em.electric-potential — Electric Potential

## 1. Identity
- **Canonical KG ID**: `phys.em.electric-potential`
- **Canonical name**: Electric Potential
- **Curriculum domain**: Electromagnetism
- **Difficulty tier**: proficient
- **Bloom level**: apply
- **Prerequisites**: `phys.em.gauss-law`
- **Unlocks**: `phys.em.capacitance`, `phys.em.ohms-law`
- **Estimated study hours**: 5
- **KG description**: Electric potential is the work done per unit charge to bring a positive test charge from infinity to a given point.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (gravitational height analogy)**
Imagine altitude as gravitational potential energy per kilogram. A ball at high altitude has high PE; it rolls naturally to lower altitude. Electric potential works the same way: high potential is "high altitude" for positive charges; they flow naturally from high to low potential. A positive charge at high V is like a ball on a hill — it naturally moves to lower V, doing work in the process.

**Stage 2 — Quantitative (definition and point charge)**
Electric potential at a point P is the work done per unit positive charge to bring a test charge from infinity to P against the electric field:
V = W/q₀ = U/q₀ (SI unit: volt, 1 V = 1 J/C)

For a single point charge Q:
V = kQ/r = Q/(4πε₀r)

Key features:
- V is a scalar (not a vector) — the algebraic sum of contributions from all charges
- V → 0 as r → ∞ (reference at infinity)
- Positive Q → positive V; negative Q → negative V
- V is defined everywhere in space, not just where charges exist

**Stage 3 — Potential difference and work**
Potential difference: ΔV = V_B − V_A (V)
Work done by electric field moving charge q from A to B: W = q(V_A − V_B) = −qΔV
Work done against electric field (by external agent): W_ext = qΔV = q(V_B − V_A)

Relationship to electric field:
E = −dV/dx (in 1D); E⃗ = −∇V (in 3D)
Equipotential surfaces are perpendicular to E-field lines; no work is done moving along an equipotential.

**Stage 4 — Superposition (system of charges)**
V_total = Σᵢ kQᵢ/rᵢ (scalar sum — much easier than vector addition of E-fields)
For continuous charge distributions: V = k∫dq/r

This scalar property is the main computational advantage of potential over field: summing scalars is always easier than summing vectors.

**Mental-model versioning**: Stage 1 for conceptual grounding; Stage 2 for basic problems; Stage 3 for work-energy applications and field-potential relationships; Stage 4 for multi-charge and distribution problems.

---

## 3. Why Beginners Fail

1. **V is a vector** (incorrect): Students treat V like E⃗ and try to add components. V is a scalar; signs matter but direction does not.
2. **V = 0 means no field**: Zero potential at a point does NOT mean zero electric field there. The field is the gradient of potential; V can be zero while dV/dx ≠ 0.
3. **Work sign confusion**: Work done BY the field on positive charge moving from high V to low V is positive (field does positive work). Work done BY an external agent moving the charge against the field is negative. Students flip these.
4. **Confusing V with E**: V is a property of position (scalar); E⃗ is also a property of position but is a vector and equals −∇V. They are related but distinct quantities with different SI units (V vs. N/C = V/m).

---

## 4. Misconception Library

**M1 — "Electric potential is a vector"**
- Probe: "Two charges +3 μC and −3 μC are placed 10 cm apart. What is the potential at the midpoint?"
- Characteristic phrase: "I have to find the direction of V at that point."
- Recovery: V is scalar. At the midpoint: V₁ = k(3×10⁻⁶)/0.05 = +540 kV; V₂ = k(−3×10⁻⁶)/0.05 = −540 kV. V_total = 540 − 540 = 0 V. No direction involved — just algebraic addition. Contrast with E⃗ at the midpoint, which is NOT zero (both charges contribute fields pointing in the same direction toward −Q, so E⃗ ≠ 0 even though V = 0). This case is the clearest demonstration that V and E are distinct.

**M2 — "V = 0 means E = 0"**
- Probe: "At the midpoint between a +Q and −Q pair, V = 0. Therefore E = 0 there." True or false?
- Characteristic phrase: "If the potential is zero, there's no electric force."
- Recovery: E⃗ = −∇V. V can be zero while its gradient is large. The midpoint between +Q and −Q: V = 0, but E points from +Q toward −Q with magnitude 2kQ/d² (both fields add rather than cancel). Physical check: a positive test charge at the midpoint is attracted toward −Q and repelled from +Q — the forces add, not cancel. Force is nonzero → E is nonzero → V = 0 is consistent with E ≠ 0.

**M3 — "Moving along an equipotential requires work"**
- Probe: "I move a charge along an equipotential surface. How much work does the electric field do?"
- Characteristic phrase: "It takes effort to move the charge sideways."
- Recovery: W = q(V_A − V_B). Along an equipotential, V_A = V_B → W = 0. The field is perpendicular to equipotential surfaces (E⃗ = −∇V, gradient is perpendicular to constant-V surfaces), so the force is perpendicular to the motion → zero work. Physical analogy: walking around a contour line on a hillside — no change in gravitational PE, no work against gravity.

**M4 — "Potential due to a negative charge is always negative everywhere"**
- Probe: "A −4 μC charge creates negative potential everywhere in space." True?
- Characteristic phrase: "Negative charge means everything around it is negative potential."
- Recovery: Technically true for an isolated negative point charge (V = kQ/r < 0 for Q < 0 everywhere). But in a system with multiple charges, the total V at any point is the algebraic sum. Near a +5 μC charge placed beside the −4 μC charge, the +Q contribution can dominate and make V positive. The statement is only valid for the isolated case. This matters for multi-charge superposition problems.

---

## 5. Explanation Library

**E1 — Definition from work**
V(P) = W_∞→P / q₀, where W is work done by an external agent against the electric force. Equivalently, V = U/q₀ (potential energy per unit charge). The reference V = 0 at r = ∞ is a convention — only differences ΔV = V_B − V_A are physically meaningful.

**E2 — Point charge potential derivation**
Work to bring q₀ from ∞ to r against field of charge Q:
W = −∫_∞^r F·dr = −∫_∞^r kQq₀/r² dr = kQq₀/r
V = W/q₀ = kQ/r ✓

**E3 — Work-energy theorem link**
The work done by the electric field on charge q moving from A to B:
W_field = q(V_A − V_B) = −ΔU (where U = qV)
By work-energy theorem: ΔKE = W_field → q(V_A − V_B) = ½mv_B² − ½mv_A²
This is the key equation for charged-particle acceleration problems (e.g. electron guns, CRTs).

**E4 — E from V (1D)**
If V(x) is known: E_x = −dV/dx
Geometrically: E-field lines point in the direction of steepest decrease in V (downhill on the potential landscape). Regions of tightly packed equipotentials = large |E|; widely spaced equipotentials = small |E|.

**E5 — Superposition advantage**
For a dipole (+Q at x = +d/2, −Q at x = −d/2), V at point P: V = kQ/r₊ + k(−Q)/r₋ = kQ(1/r₊ − 1/r₋). This scalar calculation is far simpler than finding E⃗_x and E⃗_y components separately and adding vectors. For N charges: V_total = Σᵢ kQᵢ/rᵢ — one scalar sum replaces N vector sums.

---

## 6. Analogy Library

**Primary analogy — Gravitational potential (height map)**
Gravitational potential = gh (energy per kg due to height). Electric potential = V (energy per coulomb due to electric field). High altitude → high gravitational PE; high V → high electrical PE for positive charges. Positive charges flow from high V to low V (downhill); negative charges flow from low V to high V (uphill for them, because they're anti-correlated with the field). A contour map of V on paper is exactly like a topographic map — equipotential lines correspond to contour lines.

**Breaking point**: Gravity only pulls (never repels), so negative gravitational potential never arises in normal contexts, while negative V is common near negative charges. The gravity analogy also obscures that V depends on the sign of the source charge, not just its magnitude. Use the analogy to build intuition; replace it with the full formula once signs must be tracked.

**Anti-analogy — Electric field as potential**: Students who derive E⃗ correctly then try to use E as a scalar to compute work (W = qEd for any path). This is only valid for uniform fields along the field direction. In general, W = q∫E⃗·ds⃗ along the path, or equivalently W = qΔV (path-independent because the field is conservative). V is the right tool for path-independent work calculations; using E directly is only safe in uniform-field problems.

---

## 7. Demonstration Library

**D1 — Electrostatic field mapper (parallel plates)**
Set up two parallel conducting plates connected to a battery (known voltage). Use a high-impedance voltmeter to map potential at grid points between the plates. Plot equipotential lines. Observe: uniform spacing → uniform field. Compare measured E = ΔV/Δx with expected E = V/d. Show that equipotentials are perpendicular to field lines drawn on the same diagram.

**D2 — Point charge simulation (Applet or VPython)**
Plot V(r) = kQ/r as a 3D surface — a spike at the charge position, falling as 1/r. Show equipotential surfaces as concentric spheres. Lay the E-field lines over — they are radial, confirming ⊥ to equipotentials. Show a negative charge: V is a concave-up well (negative spike).

**D3 — Electron acceleration (electron gun)**
In a CRT or vintage oscilloscope (or simulation), electrons are accelerated through potential difference ΔV. Energy gained: ΔKE = eΔV. From rest: ½mv² = eΔV → v = √(2eΔV/m). Compute v for ΔV = 1000 V (typical CRT): v ≈ 1.9 × 10⁷ m/s. Demonstrates the practical power of the work formula W = qΔV.

---

## 8. Discovery Lesson

*Direct instruction is appropriate here* for the definition (V = W/q₀ is a defined quantity, not discoverable from first principles). However, the relationship E = −dV/dx can be discovered:

1. Give students the parallel-plate setup from D1 with measured V(x) at several points.
2. Ask: "Compute ΔV/Δx between adjacent measurement points."
3. Measure E directly with a test charge or field sensor.
4. Ask: "What is the relationship between your computed ΔV/Δx and the measured E?"
5. Students discover: E ≈ −ΔV/Δx (negative sign because field points from high V to low V).
6. Formalise: E⃗ = −∇V.

The point charge case V = kQ/r is then derived analytically from the field E = kQ/r² via integration.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student vector-adds V contributions | Stop: "V is a scalar. Show me what direction you'd assign to this potential." Redirect to algebraic (signed) addition. |
| Student says V=0 implies E=0 | Present the +Q/−Q midpoint example (M2). Have student compute E⃗ there explicitly. |
| Student inverts work sign | Ask: "The field accelerates positive charges from high V to low V — is the field doing positive or negative work on the charge?" Reconnect to W = F·d with field direction. |
| Student uses E = ΔV/Δx without negative sign | Emphasise: E points in the direction of decreasing V. The minus sign in E = −dV/dx is not optional — it determines the field direction. |
| Student ready for extension | Introduce ε₀ form: V = Q/(4πε₀r). Connect to Gauss's law (prerequisite): the same ε₀ appears in Gauss's law because they're both derived from Coulomb's law. |

---

## 10. Voice Teaching

"Electric potential is energy per charge — how much work per coulomb it took to assemble this charge configuration from scratch. At any point in space there's a number, V, that tells you this. It's a scalar — just a number at each location, positive or negative, no direction.

For a single positive point charge, V equals kQ over r. It's positive everywhere, and it gets larger as you get closer to the charge. For a negative charge, V is negative everywhere.

The crucial physical fact: when a positive charge moves from high V to low V, the electric field does positive work on it — the charge speeds up. When it moves from low to high V, the field does negative work — it slows down. The work formula is simple: W equals q times V_A minus V_B, or equivalently q times delta-V, with a sign.

And the relationship between potential and field: E equals minus dV/dx in one dimension. The field points in the direction of steepest decrease of V. If you draw a topographic map of V and V falls steeply in some direction, that's where the field is strongest and pointing.

The beautiful thing about potential: adding it up from multiple charges is just scalar algebra. No vector components, no x and y directions — just signed numbers that add. For complicated charge distributions, always find V first, then get E from the gradient."

---

## 11. Assessment

**Mastery gate**: Student correctly: (1) computes V at a field point due to multiple point charges using scalar superposition; (2) computes work done by the field using W = qΔV with correct sign; (3) finds E from V in a uniform-field or point-charge context using E = −dV/dx; (4) identifies that V = 0 does not imply E = 0. Four independent multi-step problems required.

**Formative golden probe**: "A +2 μC charge sits at the origin and a −2 μC charge at x = 4 cm. (a) Find the potential at x = 2 cm (midpoint). (b) A proton starts from rest at x = 2 cm and moves to x = 5 cm. How much work does the electric field do on it? (c) Is the field zero at the midpoint?"

Answers:
- (a) V₁ = k(2×10⁻⁶)/0.02 = 9×10⁵ V; V₂ = k(−2×10⁻⁶)/0.02 = −9×10⁵ V; V_total = 0
- (b) V at x = 5 cm: V = k(2×10⁻⁶)/0.05 + k(−2×10⁻⁶)/0.01 = 360 kV − 1800 kV = −1440 kV. W = eΔV = (1.6×10⁻¹⁹)(−1440×10³ − 0) = −2.3×10⁻¹³ J (field does negative work on proton moving toward −Q)
- (c) No — E ≠ 0 at midpoint. Both charges create fields pointing in the same direction (toward −Q); they add.

**Confidence calibration**: After (a), ask: "Is the electric field also zero at the midpoint?" If student says yes (M2 error), probe with: "Which direction does the field from the +Q push a positive test charge there? And from the −Q?"

**Delayed retrieval (1–2 weeks)**: "An electron is accelerated from rest through a 500 V potential difference. What is its final speed? (e = 1.6×10⁻¹⁹ C, m_e = 9.1×10⁻³¹ kg)"

---

## 12. Recovery Notes

**If the concept of "work per unit charge" is not sticking**:
Return to the gravitational PE analogy. Ask: "Gravitational PE = mgh. What is the PE per kilogram?" (gh) "That's gravitational potential — the PE a 1 kg mass would have at that height. Now do the same for electricity: electrical PE per unit charge = V." The dimensional analogy (J/kg ↔ J/C) is the cleanest bridge.

**If work sign errors persist**:
Always draw the scenario: which way does the field push the charge? If the charge moves in the direction of the push, the field does positive work. Encode this geometrically before applying the formula.

**If student cannot transition from E to V (integration step)**:
Give the result V = kQ/r and verify it by differentiation: dV/dr = −kQ/r² → E_r = −dV/dr = kQ/r². This confirms the formula without requiring the integral. Then revisit the integral derivation separately.

---

## 13. Memory & Review

**Memory type**: Declarative (V = kQ/r; V is scalar; E = −∇V) + procedural (multi-charge superposition; work calculation with W = qΔV)
**Forgetting risk**: High — the scalar nature of V and the E = −∇V relationship are often forgotten; sign errors in work calculations are very common at the 3-week mark.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "Three charges: +3 μC at (0,0), −3 μC at (4 cm, 0), +3 μC at (2 cm, 0). Find the potential at (2 cm, 3 cm). Is the field zero there?"

---

## 14. Transfer Map

**Near transfer**: Capacitance (V = Q/C — potential difference between capacitor plates); Ohm's law (current driven by ΔV — the direct unlock in the KG).
**Medium transfer**: Electron gun / particle accelerator design (kinetic energy from ΔV); electrochemical cell EMF (ΔV drives ion current across electrolyte).
**Far transfer**: Equipotential mapping in geophysics (subsurface charge distribution from surface V measurements); neural resting potential (the −70 mV transmembrane potential is an electric potential difference across a biological membrane).
**Cross-domain**: Gravitational potential (Φ = −GM/r) is the direct structural analogue; diffusion potential in thermodynamics (chemical potential is the analogue of electric potential for uncharged particles).

---

## 15. Curriculum Feedback

- KG prerequisite `phys.em.gauss-law` is necessary — the concept requires comfort with the field concept and the inverse-square law (Coulomb/Gauss). Without that foundation, V = kQ/r is unmotivated.
- The two unlocks `phys.em.capacitance` and `phys.em.ohms-law` are both appropriate: capacitance is defined via ΔV; Ohm's law requires the concept of potential difference driving current.
- Difficulty `proficient`/`apply` is correct — the scalar superposition and work formula require genuine multi-step application.
- Suggested addition: `phys.em.electric-dipole` (already authored) provides the worked example for the superposition section (E3, E5) — the cross-link is natural if instructors teach dipole potential before multi-charge superposition.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
