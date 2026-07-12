# Teaching Blueprint — phys.em.magnetic-force

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.magnetic-force
name: Magnetic Force on Charges and Currents
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.magnetic-field
  - phys.em.electric-field
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.biot-savart
  - phys.em.magnetic-flux
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Lorentz Force on a Moving Charge
A charge q moving with velocity **v** in magnetic field **B** experiences the **magnetic force**:

> **F = q(v × B)**

Key properties:
- Magnitude: F = qvB sinθ, where θ is the angle between **v** and **B**
- Direction: perpendicular to both **v** and **B** (right-hand rule for positive charge; reverse for negative)
- When v ∥ B (θ=0°): F = 0 — no force
- When v ⊥ B (θ=90°): F = qvB — maximum force
- Magnetic force does **no work** on a moving charge (F ⊥ v → P = F·v = 0 → kinetic energy unchanged)

The full **Lorentz force** combines electric and magnetic:
> **F = q(E + v × B)**

### Block 1-B — Circular Motion of a Charged Particle
When a charged particle enters a uniform **B** field perpendicular to its velocity, the magnetic force provides centripetal acceleration:

> qvB = mv²/r   ⟹   **r = mv/(qB)**

This is the cyclotron radius (or Larmor radius). The particle moves in a circle:
- Frequency: f = qB/(2πm) — independent of speed (cyclotron frequency)
- Period: T = 2πm/(qB) — independent of v and r
- Applications: mass spectrometer (r ∝ m/q separates isotopes), cyclotron particle accelerator, aurora borealis (charged particles spiral along Earth's B field lines)

If the particle has a velocity component along **B**, it follows a **helix** (circular in the plane ⊥ B, linear along B).

### Block 1-C — Force on a Current-Carrying Conductor
A straight wire of length L carrying current I in field **B**:

> **F = IL × B**

Magnitude: F = BIL sinθ (θ between wire direction and B)

For an infinitesimal element:
> d**F** = I d**l** × **B**

Force between two parallel wires (length L, separation d, currents I₁ and I₂):
- B from wire 1 at wire 2: B₁ = μ₀I₁/(2πd)
- Force on wire 2: F = I₂LB₁ = μ₀I₁I₂L/(2πd)
- Parallel currents attract; antiparallel currents repel

Definition of the ampere: 1 A is the current that produces a force of 2×10⁻⁷ N per metre between two parallel wires 1 m apart.

### Block 1-D — Torque on a Current Loop
A rectangular loop (area A = ab, current I) in uniform field B, with normal **n̂** at angle θ to **B**:

> **τ = NIAB sinθ** (N turns)

> **τ = m × B** where magnetic moment **m** = NIA **n̂**

Equilibrium: θ = 0 (stable, m ∥ B) or θ = 180° (unstable, m antiparallel to B)
Potential energy: U = −**m**·**B** = −mB cosθ

Applications: electric motor (torque on current loop in magnetic field), galvanometer, MRI.

---

## Component 2 — Worked Examples

### WE-1 — Circular Motion in Magnetic Field
**Problem:** A proton (m = 1.67×10⁻²⁷ kg, q = 1.60×10⁻¹⁹ C) moves at v = 3.0×10⁶ m/s perpendicular to B = 0.20 T. Find the radius and period of circular orbit.

**Solution:**
r = mv/(qB) = (1.67×10⁻²⁷ × 3.0×10⁶) / (1.60×10⁻¹⁹ × 0.20)  
r = (5.01×10⁻²¹) / (3.20×10⁻²⁰) = **0.157 m ≈ 15.7 cm**

T = 2πm/(qB) = 2π × 1.67×10⁻²⁷ / (1.60×10⁻¹⁹ × 0.20)  
T = 1.050×10⁻²⁶ / 3.20×10⁻²⁰ = **3.28×10⁻⁷ s**

Note: T is independent of speed — doubling v doubles r but T stays the same.

---

### WE-2 — Force on Current-Carrying Wire
**Problem:** A wire of length 0.50 m carries I = 8.0 A at 30° to a magnetic field B = 0.40 T. Find the force magnitude and state the direction.

**Solution:**
F = BIL sinθ = 0.40 × 8.0 × 0.50 × sin30° = 0.40 × 8.0 × 0.50 × 0.5 = **0.80 N**

Direction: perpendicular to both wire and B, determined by right-hand rule (or F = IL × B cross product).

---

### WE-3 — Torque on Current Loop
**Problem:** A 50-turn rectangular coil (20 cm × 15 cm) carries I = 2.0 A in B = 0.30 T. Find (a) maximum torque, (b) torque at θ = 30°, (c) potential energy at θ = 180°.

**Solution:**
m = NIA = 50 × 2.0 × (0.20 × 0.15) = 50 × 2.0 × 0.030 = **3.0 A·m²**

(a) τ_max = mB = 3.0 × 0.30 = **0.90 N·m** (at θ = 90°)

(b) τ = mB sinθ = 0.90 × sin30° = 0.90 × 0.5 = **0.45 N·m**

(c) U = −mB cosθ = −3.0 × 0.30 × cos180° = −3.0 × 0.30 × (−1) = **+0.90 J**
(Maximum potential energy — unstable equilibrium)

---

## Component 3 — Misconception Engine

### MC-MAGNETIC-FORCE-DOES-WORK
- **trigger_signal:** Student says "the magnetic force accelerates the particle, so it does work and increases kinetic energy."
- **conflict_evidence [P28]:** "Work = F·d = F·v·Δt. But the magnetic force F = qv×B is always perpendicular to v. Perpendicular vectors have zero dot product: F·v = 0. So power P = F·v = 0 always. The speed — and hence kinetic energy — never changes due to a magnetic force alone. Direction changes; speed does not."
- **bridge_text [P30]:** "Think of a ball on a string swinging in a circle: tension is always perpendicular to motion, so tension does no work — speed stays constant. Magnetic force plays the same role as string tension, steering the particle in a circle without speeding it up or slowing it down."
- **replacement_text [P31]:** "Magnetic force F = qv×B is always ⊥ to v. Work = F·v·Δt = 0 always. It changes direction of motion, not speed. Kinetic energy (½mv²) is conserved in a pure magnetic field."
- **discrimination_pairs [P33]:**
  - Electric force qE: along field direction, does work, changes KE
  - Magnetic force qv×B: perpendicular to v, does zero work, changes direction only
- **s6_path:** If persistent, compute work explicitly for a quarter-circle arc: ∫F·ds = ∫qvB ds cos90° = 0. Show KE is constant numerically in WE-1 (v unchanged, only direction rotates).

---

### MC-PARALLEL-CURRENTS-REPEL
- **trigger_signal:** Student says "like currents repel because like charges repel" or applies electrostatic logic to magnetism.
- **conflict_evidence [P28]:** "Two wires both carrying current in the same direction (say, upward): wire 1 creates a B field that circles around it. At wire 2's location, that B field points into the page (right-hand rule). Force on wire 2: F = IL × B, with I upward and B into page → F points toward wire 1. Both wires attract each other. Experiment confirms this — this is how the ampere was historically defined."
- **bridge_text [P30]:** "Static charges and moving currents obey different force rules. Two positive charges repel (Coulomb). But two parallel wires carrying the same-direction current attract — because the moving charges create magnetic fields that pull the wires together. Magnetism and electrostatics are separate phenomena with opposite inter-wire behaviour for same-direction flows."
- **replacement_text [P31]:** "Parallel currents (same direction) → attract; antiparallel currents (opposite directions) → repel. F/L = μ₀I₁I₂/(2πd). This is the reverse of what Coulomb's law gives for charges."
- **discrimination_pairs [P33]:**
  - Same-sign charges (both positive): repel (Coulomb)
  - Same-direction currents: attract (Ampere)
  - Opposite-direction currents: repel (Ampere)
- **s6_path:** Draw field lines from one wire; apply right-hand rule; show force direction on second wire for both parallel and antiparallel cases.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** A positive charge moves east in a magnetic field pointing north. The magnetic force on the charge points:
(a) North (b) East **(c) Upward** (d) Downward
[v = east (+x), B = north (+y); F = q(v×B) = q(x̂×ŷ) = q(ẑ) = upward ✓]

**A2 (Short answer):** State why a magnetic force cannot change the speed of a charged particle.
[F ⊥ v always → F·v = 0 → P = 0 → KE unchanged → speed constant]

**A3 (True/False):** Two wires carrying current in the same direction repel each other.
[FALSE — they attract]

---

### Probe Set B — Conceptual Transfer
**B1:** An electron (q = −e) moves north in a field B pointing east. What is the direction of the magnetic force?
[v=north(+y), B=east(+x); v×B = ŷ×x̂ = −ẑ (downward); F = qv×B = (−e)(−ẑ) = +eẑ = upward]

**B2:** A proton moves in a circle of radius 5.0 cm in B = 0.10 T. Find its speed and kinetic energy.
[r = mv/qB → v = qBr/m = 1.6×10⁻¹⁹ × 0.10 × 0.05 / 1.67×10⁻²⁷ = 4.79×10⁵ m/s; KE = ½mv² = ½×1.67×10⁻²⁷×(4.79×10⁵)² = 1.92×10⁻¹⁶ J = 1.20 keV]

**B3:** A current loop with m = 0.50 A·m² is in B = 0.80 T. Find the stable equilibrium orientation, the maximum torque, and the energy difference between stable and unstable equilibria.
[Stable: m ∥ B (θ=0°); τ_max = mB = 0.40 N·m (at θ=90°); ΔU = U(180°) − U(0°) = +mB − (−mB) = 2mB = 0.80 J]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A singly ionised carbon-12 ion (m = 12×1.67×10⁻²⁷ kg, q = 1.60×10⁻¹⁹ C) and a carbon-13 ion (m = 13×1.67×10⁻²⁷ kg, same q) enter a mass spectrometer at the same speed v = 2.0×10⁵ m/s, perpendicular to B = 0.50 T. (a) Find the radius for each. (b) Find the separation of their landing points on a detector (separation = 2|r₁₂ − r₁₃|).
[(a) r = mv/qB; r₁₂ = 12×1.67×10⁻²⁷×2×10⁵/(1.6×10⁻¹⁹×0.5) = 0.0501 m; r₁₃ = 13×1.67×10⁻²⁷×2×10⁵/(1.6×10⁻¹⁹×0.5) = 0.0543 m; (b) separation = 2×(0.0543−0.0501) = 0.0084 m = 8.4 mm]

**C2 (Synthesis):** Explain qualitatively why a charged particle spirals along (not across) magnetic field lines in Earth's magnetosphere. Why do particles lose energy in the atmosphere but not in space?
[Component of v along B is unaffected (F_∥ = 0); component ⊥ B gives circular motion → helix. In space, magnetic force does no work → no energy loss. In atmosphere, collisions with air molecules dissipate KE → aurora glow.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: write F = qv×B, state why magnetic force does no work, and give the cyclotron radius formula."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "An alpha particle (q=2e, m=4u) moves at 5×10⁶ m/s ⊥ to B=0.15T. Find r and T. Does doubling the speed change T?"
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Compare: electric force vs. magnetic force on a moving charge — which does work? Which changes direction? Which depends on speed?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "Design a mass spectrometer to separate ions differing by 1 atomic mass unit. What B field gives 1 cm separation for v=10⁵ m/s?"
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we'll uncover one of the most counterintuitive facts in physics: a force can deflect a particle without doing any work. By the end you'll predict the path of any charged particle in a magnetic field and explain how particle accelerators and MRI machines work."

[P41 — Diagnostic]
"If a positive charge moves east and B points north, which direction does the magnetic force act?"
→ Correct (upward): good intuition with right-hand rule. Formalise.
→ Incorrect: "Let's build the right-hand rule from scratch."

[P06 — Concrete anchor]
"Hold your right hand flat: fingers point in the direction of v, curl them toward B — your thumb points in the direction of F (for positive charge). This is the cross product made physical."

[TA-1 — Lorentz force: Block 1-A]
"F = qv×B. Magnitude: qvB sinθ. Key: F ⊥ v always."

[P28 — Conflict evidence for MC-MAGNETIC-FORCE-DOES-WORK]
"Work = F·v·Δt. F⊥v means F·v=0. Speed is unchanged. Direction changes — but kinetic energy is constant throughout. This seems impossible but is exactly what WE-1 shows."

[P51 — Check-in]
"Why can't a magnetic force speed up a particle? One sentence."

[TA-2 — Circular motion and cyclotron radius: Block 1-B, WE-1]
"qvB = mv²/r → r = mv/qB. T = 2πm/qB is independent of speed."

[P28 — Conflict evidence for MC-PARALLEL-CURRENTS-REPEL]
"Wire 1 current up → B field circles counterclockwise (viewed from above). At wire 2 (to the right), B points into page. Force on wire 2: I(up) × B(into page) = force toward wire 1. They attract. Test this with two wires and a current source."

[TA-3 — Force on wire and wire-wire interaction: Block 1-C, WE-2]

[P52 — Narrow]
"Three formulas to own: F=qvBsinθ (charge); F=BILsinθ (wire); r=mv/qB (circular orbit). Everything else derives from these."

[TA-4 — Torque on current loop: Block 1-D, WE-3]

[P62 — Retrieval seed]
"Closed notes. Write: Lorentz force formula, cyclotron radius, why magnetic force does no work, parallel wire attraction rule."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Magnetic force: always perpendicular to v, does no work, causes circular/helical paths. Cyclotron radius r=mv/qB separates particles by mass — that's a mass spectrometer. Torque on loops powers every electric motor."

[P85 — Regulation tail]
"Shakiest part: the right-hand rule, why force does no work, or the torque on a loop?"

[P89 — Retrieval schedule]
"Return in 1 day for the alpha-particle problem."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (direction) | Redo right-hand rule step by step; use physical hand gesture |
| Probe B1 wrong (electron, negative charge) | Stress: for negative charge, reverse the cross-product direction; F = (−e)(v×B) |
| Probe B2 calculation error | Check unit consistency: mass in kg, charge in C, B in T, r in m |
| Probe C1 confused about separation | Clarify: particles land at diameter 2r from entry; separation = 2(r₁₃−r₁₂) |
| Student asks how cyclotron works | Extend: alternating electric field accelerates particle across D-shaped gaps; r grows each half-cycle; T constant → resonance |

---

## Component 8 — Visualisation Specification

**Primary visual:** Three-panel diagram — (i) positive charge moving east, B north, F upward (right-hand rule arrows); (ii) negative charge same setup, F reversed downward; (iii) particle entering B field ⊥: circular path with r = mv/qB labelled, showing v always tangent and F always toward centre.

**Secondary visual:** Current-wire force diagram — two parallel wires with current arrows; field lines from wire 1 encircling wire 2; force arrows on wire 2 pointing toward wire 1 (attraction). Repeated for antiparallel case (repulsion).

**Tertiary visual:** Torque on current loop — rectangular loop in B field; force arrows on each side; net torque rotating loop toward equilibrium (m ∥ B); U vs. θ cosine curve showing stable (θ=0°) and unstable (θ=180°) equilibria.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.magnetic-force)               PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (proficient → 4)                      PASS
V-4  bloom verb matches level (apply → calculate/predict)                  PASS
V-5  prerequisites listed in KG (phys.em.magnetic-field, phys.em.electric-field) PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 4 formula                          PASS
V-9  status = READY                                                        PASS
V-10 ≥2 misconceptions with all 6 MC fields                               PASS
V-11 ≥3 worked examples with full solution                                 PASS
V-12 Probe sets A (recall), B (transfer), C (mastery gate) present        PASS
V-13 Retrieval schedule has ≥4 events with offsets                        PASS
V-14 Session flow uses P-codes from Primitive Library                      PASS
V-15 Adaptive branching table present                                      PASS
V-16 Visualisation spec present with ≥2 visuals                           PASS
V-17 No framework/runtime/route modifications                              PASS
V-18 No mathematics content authored                                       PASS
V-19 All formulas dimensionally consistent                                 PASS
V-20 Cross-links reference valid KG concept IDs                            PASS
```

**Overall status: READY**
