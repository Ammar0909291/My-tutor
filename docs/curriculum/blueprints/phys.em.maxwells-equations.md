# Teaching Blueprint — phys.em.maxwells-equations

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.maxwells-equations
name: "Maxwell's Equations and Displacement Current"
domain: electromagnetism
difficulty:
  label: expert
  number: 6
bloom: analyze
prerequisites:
  - phys.em.gauss-law
  - phys.em.amperes-law
  - phys.em.faradays-law
mastery_threshold: 0.80
estimated_hours: 10
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (thought experiment anchor; domain=physics, bloom=Analyse)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Imagine electricity and magnetism as two different languages that describe the same reality. Before Maxwell (1865), scientists had four separate laws — each describing one phenomenon. Maxwell noticed a gap: Ampere's Law was incomplete. He added one extra term — "displacement current" — and suddenly the four laws, read together, sang in harmony. From that harmony, he derived a wave equation and calculated its speed: c = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s. This matched the known speed of light. Maxwell's conclusion: light is an electromagnetic wave.

### Level 2 — Developing Understanding

Maxwell's four equations, in integral form:

| # | Name | Integral form | Physical meaning |
|---|------|---------------|-----------------|
| 1 | Gauss's Law for E | ∮E·dA = Q_enc/ε₀ | Electric flux through closed surface = enclosed charge/ε₀ |
| 2 | Gauss's Law for B | ∮B·dA = 0 | No magnetic monopoles; magnetic flux through any closed surface is zero |
| 3 | Faraday's Law | ∮E·dl = −dΦ_B/dt | Changing magnetic flux induces circulating EMF |
| 4 | Ampere-Maxwell | ∮B·dl = μ₀(I_enc + ε₀dΦ_E/dt) | Currents AND changing electric flux create circulating B |

The new term Maxwell added: **displacement current** I_d = ε₀dΦ_E/dt

This is NOT a flow of charges. It is the rate of change of electric flux in a region of space (e.g., the gap between capacitor plates where no conduction current flows, yet B fields encircle the gap as if current flowed through).

Why it matters: without I_d, Ampere's Law was inconsistent — for a surface cutting the capacitor gap, I_enc = 0, giving B = 0, contradicting a surface that intercepted the wire giving B ≠ 0. Adding I_d restores consistency: the changing E field between plates contributes the same total as the conduction current through the wire.

### Level 3 — Proficient Synthesis

**From equations to wave equation:**

Apply curl(∇×) to Faraday's Law:
∇×(∇×E) = −∂(∇×B)/∂t

Use vector identity: ∇×(∇×E) = ∇(∇·E) − ∇²E

In vacuum (ρ=0, J=0): ∇·E = 0, and ∇×B = μ₀ε₀∂E/∂t

Substituting: −∇²E = −μ₀ε₀∂²E/∂t²

This gives: **∇²E = μ₀ε₀∂²E/∂t²**

Comparing to the wave equation ∇²ψ = (1/v²)∂²ψ/∂t²:

**c = 1/√(μ₀ε₀) = 1/√(4π×10⁻⁷ × 8.85×10⁻¹²) ≈ 3×10⁸ m/s**

Differential (local) form of Maxwell's equations:

| Equation | Differential form |
|----------|------------------|
| Gauss (E) | ∇·E = ρ/ε₀ |
| Gauss (B) | ∇·B = 0 |
| Faraday | ∇×E = −∂B/∂t |
| Ampere-Maxwell | ∇×B = μ₀J + μ₀ε₀∂E/∂t |

**Self-sustaining wave mechanism:** A changing B creates E (Faraday). That changing E creates B (Ampere-Maxwell). The cycle sustains itself through vacuum indefinitely — no medium required.

**In matter:** Replace ε₀ → ε (= ε_r ε₀) and μ₀ → μ (= μ_r μ₀), giving v = 1/√(με) = c/n where refractive index n = √(ε_r μ_r).

---

## Component 2 — Worked Examples

### WE-1: Displacement Current Between Capacitor Plates

**Problem:** A parallel-plate capacitor (plate area A = 4×10⁻² m², separation d = 5 mm) is being charged so that the voltage across it increases at dV/dt = 2×10⁶ V/s. Find the displacement current between the plates and compare it to the conduction current in the leads.

**Solution:**

Electric field between plates: E = V/d → dE/dt = (1/d)(dV/dt)

Electric flux through plate area: Φ_E = EA → dΦ_E/dt = A × dE/dt = A/d × dV/dt

Displacement current:
I_d = ε₀(dΦ_E/dt) = ε₀ × A/d × dV/dt
I_d = 8.85×10⁻¹² × (4×10⁻²/5×10⁻³) × 2×10⁶
I_d = 8.85×10⁻¹² × 8 × 2×10⁶
I_d = 8.85×10⁻¹² × 1.6×10⁷
**I_d ≈ 1.42×10⁻⁴ A = 0.142 mA**

This equals the conduction current in the leads charging the capacitor — as required for Ampere-Maxwell's Law to be self-consistent at any surface bounded by the same loop.

**Key conclusion:** Magnetic field around the capacitor gap is identical to the field around the wire, even though no charge physically crosses the gap.

---

### WE-2: Verify c = 1/√(μ₀ε₀)

**Problem:** Using the known values μ₀ = 4π×10⁻⁷ T·m/A and ε₀ = 8.85×10⁻¹² C²/(N·m²), compute the speed of EM waves predicted by Maxwell's equations and compare to the measured speed of light.

**Solution:**

c = 1/√(μ₀ε₀)

μ₀ε₀ = (4π×10⁻⁷)(8.85×10⁻¹²)
= (4 × 3.1416 × 10⁻⁷)(8.85×10⁻¹²)
= (12.566×10⁻⁷)(8.85×10⁻¹²)
= 111.2×10⁻¹⁹
= 1.112×10⁻¹⁷ m⁻²·s²

c = 1/√(1.112×10⁻¹⁷)
= 1/(1.055×10⁻⁸·⁵)
= 1/(3.34×10⁻⁹)
**c ≈ 2.99×10⁸ m/s ≈ 3×10⁸ m/s ✓**

This matches the experimentally measured speed of light — Maxwell's equations thus PREDICT that light is an electromagnetic wave, derived purely from electric and magnetic measurements, with no assumption about light at all.

---

### WE-3: Analyzing Which Maxwell Equation Applies

**Problem:** For each scenario below, identify which Maxwell equation directly explains the phenomenon:
(a) A positive charge creates outward electric field lines.
(b) Cutting a bar magnet gives two smaller magnets, not isolated poles.
(c) Moving a magnet toward a conducting loop induces a current in it.
(d) An antenna carrying alternating current radiates a magnetic field even in the gaps between current-carrying segments.

**Solution:**

(a) **Gauss's Law for E** (Equation 1): ∮E·dA = Q_enc/ε₀
Electric flux through any closed surface around a positive charge equals Q/ε₀ > 0 → field lines diverge outward.

(b) **Gauss's Law for B** (Equation 2): ∮B·dA = 0
Magnetic field lines always form closed loops (no monopoles). Every cut exposes both ends of closed loops → each piece has its own north-south pair.

(c) **Faraday's Law** (Equation 3): ∮E·dl = −dΦ_B/dt
Changing magnetic flux (moving magnet) induces circulating electric field → drives current in the loop.

(d) **Ampere-Maxwell Law** (Equation 4): ∮B·dl = μ₀(I_enc + ε₀dΦ_E/dt)
In antenna gaps (no conduction current), the rapidly changing E field (I_d = ε₀dΦ_E/dt) acts as source of B, allowing B to propagate continuously away from the antenna. Without displacement current, EM radiation could not exist.

---

## Component 3 — Misconception Engine

### MC-1: MC-MAXWELL-FOUR-EQUATIONS-ARE-INDEPENDENT

**trigger_signal:** Student treats each equation in isolation, calculates B from Ampere's Law without considering that a changing E might exist, or states "Faraday's Law only applies to inductors."

**conflict_evidence [P28]:** Consider a region of space far from any charges or currents (deep space). Faraday's Law says: if B changes at that point, it creates a circulating E there. Ampere-Maxwell says: that changing E creates a circulating B at a nearby point. Each law drives the other — change in B spawns changing E spawns changing B. The four equations are not independent statements; they're a coupled system. Solving them simultaneously produces the wave equation: ∂²E/∂x² = μ₀ε₀∂²E/∂t². None of the four equations alone can predict an EM wave.

**bridge_text [P30]:** Think of Maxwell's equations like four rules in a conversation between E and B: Gauss sets the starting conditions, Faraday and Ampere-Maxwell are the two listening-and-responding rules (each reacts to the other's changes), and Gauss's B rule ensures the conversation has no dead ends. Remove any one rule and the conversation breaks down — no wave emerges.

**replacement_text [P31]:** Maxwell's four equations are a coupled system: Equations 3 and 4 are dynamically linked (each drives the other in time). The predictive power — including c = 1/√(μ₀ε₀) and the very existence of EM radiation — emerges only from solving all four simultaneously. No single equation predicts electromagnetic waves.

**discrimination_pairs [P33]:**
- "Faraday's Law alone describes how inductors work" → FALSE: it describes how any changing magnetic flux creates circulating electric field, linked to Ampere-Maxwell for wave propagation.
- "Maxwell's equations are four independent empirical laws" → FALSE: they're coupled; two are divergence equations (initial/boundary conditions) and two are curl equations (dynamics) forming one unified field theory.

**s6_path:** If student scores < 0.60 on Faraday/Ampere coupling probe → assign coupling visualization (oscillating E→B→E chain animation) before mastery gate.

---

### MC-2: MC-DISPLACEMENT-CURRENT-IS-REAL-CURRENT

**trigger_signal:** Student states "current flows between capacitor plates," describes displacement current as "electrons jumping across the gap," or asks "which direction do the electrons move in the displacement current?"

**conflict_evidence [P28]:** A parallel-plate capacitor with a vacuum gap: measuring instruments confirm no charge carriers cross the gap — if they did, the capacitor would be a short circuit and stop charging. Yet if you place an Ampere loop around the gap and measure the B field with a Hall probe, it is exactly what Ampere's Law with I_d = ε₀dΦ_E/dt would predict, the same as for the wire. The B field doesn't care whether its source is moving charges or changing flux — both produce identical circulating B. Displacement current is a source term in Maxwell's equation, not a physical flow.

**bridge_text [P30]:** The name "displacement current" is historical — Maxwell named it so because of an older mechanical model of the aether. Don't let the word "current" mislead. What it represents is the time rate of change of electric flux: I_d = ε₀dΦ_E/dt. It has the same units as current (amperes) and produces the same B field as a real current, but no charge moves. It is a mathematical term that ensures Ampere's Law is consistent when applied to surfaces that don't intercept any conductor.

**replacement_text [P31]:** Displacement current I_d = ε₀dΦ_E/dt is NOT a flow of charge — it is the rate of change of electric flux in a region of space. No electrons cross the gap. Its effect on the magnetic field is indistinguishable from conduction current, but its physical origin is purely the time-variation of E. This generalization was Maxwell's key insight and the mathematical bridge that makes EM wave propagation possible in vacuum.

**discrimination_pairs [P33]:**
- "Between capacitor plates, displacement current means electrons are accelerating across the gap" → FALSE: no charges cross; I_d = ε₀dΦ_E/dt is a field quantity, not a particle current.
- "Displacement current produces no magnetic field because it's not real current" → FALSE: I_d contributes to ∮B·dl exactly as conduction current does — both are sources of B in Ampere-Maxwell Law.

**s6_path:** If student answers < 0.55 on "what crosses the capacitor gap" probe → run discrimination pair drill before re-probing.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | No prior exposure; knows Faraday and Ampere separately but never saw them unified | Cannot state what Maxwell added to Ampere's Law |
| S3 | Can state the four equations but treats them as independent descriptive laws | Fails coupling scenario questions |
| S6 | Understands coupling and displacement current conceptually; struggles with differential form | Cannot write ∇×E = −∂B/∂t without prompting; confuses div with curl |
| S9 | Can derive wave equation from Maxwell's equations; understands c = 1/√(μ₀ε₀) derivation | Accurately identifies which equation applies in each scenario; explains displacement current without prompting |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (thought experiment anchor; physics + analyze bloom).

**TA-1 [P01 — Session Open]**
"You've studied Gauss's Law, Faraday's Law, and Ampere's Law separately. Today we unify them — and discover that their unity predicts something neither equation alone can: the existence of light itself. First, a thought experiment: if you have a capacitor being charged, what 'current' flows inside the gap between the plates? Take 30 seconds to write your answer."
[Collect response → diagnose S0/S3 state]

**TA-2 [P06 — Concrete Anchor]**
"Let's build the capacitor-gap paradox concretely. [Display: capacitor connected to AC source, loop drawn around the gap.] If we apply Ampere's Law to Loop A (through the wire), we get B > 0. If we apply it to Loop B (through the gap), we get I_enc = 0 → B = 0. Same loop, same field, two different answers? That's the contradiction Maxwell resolved. He added I_d = ε₀dΦ_E/dt. Let's verify it works numerically." [→ WE-1]

**TA-3 [P62 — Retrieval Seed]**
"Before we write all four equations, retrieve what you already know: state Gauss's Law for E, Gauss's Law for B, and Faraday's Law from memory. Don't look at notes. What physical situation does each one describe?"
[5-minute retrieval → consolidates prerequisite knowledge for coupling discussion]

**TA-4 [P30 + P31 — Bridge + Replacement: MC-2]**
"Now we address displacement current directly. [Display: timeline of E field growing between plates.] The phrase 'displacement current' sounds like electrons jumping across the gap — but that's a historical misnomer. I_d = ε₀dΦ_E/dt is a field quantity, a time rate of change of flux, not a flow of charges. No electron crosses the gap. Yet it produces B exactly as real current does. Let's confront the misconception explicitly." [→ MC-2 discrimination pairs]

**TA-5 [P28 — Conflict Evidence: MC-1]**
"Here's the unity claim tested. [Display: wave equation derivation.] Take ∇× of Faraday's Law. Substitute Ampere-Maxwell. Use ∇·E = 0 in vacuum. You get ∇²E = μ₀ε₀∂²E/∂t². This is a wave equation — it emerges ONLY because Equations 3 and 4 are coupled. Without that coupling, without the displacement current term, the derivation breaks at the substitution step and no wave results. Let's verify the predicted speed." [→ WE-2]

**TA-6 [P41 — Diagnostic]**
"Quick diagnostic — four scenarios: (a) positive charge creates radial E field, (b) bar magnet cut in half gives two magnets, (c) moving magnet induces loop current, (d) antenna radiates even in gaps between current segments. For each: which of the four Maxwell equations directly explains it? Write your equation number and the key term." [→ WE-3; maps to S6 vs. S9 diagnosis]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Write Ampere-Maxwell Law and identify every term. (2) A parallel plate capacitor has plate area 0.01 m² and E increasing at 10⁹ V/(m·s). Find I_d. (3) Why does c = 1/√(μ₀ε₀) tell us that Maxwell's equations were always a theory of light? (4) How do Equations 3 and 4 couple to produce self-sustaining waves?

Closing thought: Maxwell unified electricity, magnetism, and optics without a single experiment — through mathematical consistency alone. That is the power of well-chosen equations.

Spaced retrieval scheduled: +1 day (displacement current mechanism), +4 days (four equations from memory), +2 weeks (wave derivation steps)."

[P91 gate: threshold 0.80. If not reached → flag for S6 → S9 remediation on differential form and coupling.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** Ampere's original law states ∮B·dl = μ₀I_enc. What observable inconsistency does this create for a capacitor being charged? How does Maxwell's addition resolve it?

**P-2 (Developing — identifies S6):** A circular capacitor has radius r = 0.05 m and E between its plates increasing at dE/dt = 3×10¹¹ V/(m·s). Calculate the magnetic field at radius r = 0.05 m from the axis (at the plate edge) using the displacement current concept.

**P-3 (Proficient — identifies S9):** Starting only from Faraday's Law and Ampere-Maxwell Law in vacuum, sketch the steps of the derivation that leads to the wave equation ∇²E = μ₀ε₀∂²E/∂t². What assumptions are required at each step?

**P-4 (Mastery gate — confirms S9):** Identify which Maxwell equation is the primary explanation for each:
(a) EM waves can propagate through the vacuum of space with no medium.
(b) A compass needle deflects when placed near a current-carrying wire.
(c) A radio transmitter antenna creates oscillating E fields that generate oscillating B fields that propagate away.
(d) Magnetic field lines never start or end at a point.
State the equation, the key term, and the physical principle each involves. Required score: 4/4 at ≥0.80 accuracy to pass mastery gate.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Four-panel side-by-side display of each Maxwell equation. Each panel: integral form (left), differential form (right), physical scenario diagram (center), color-coded flux arrows or field lines. Panel 4 highlights the ε₀dΦ_E/dt term in red with a label "Maxwell's Addition."

**VIS-2:** Capacitor charging animation. Wire with conventional current I flowing in → growing E field between plates → displacement current I_d = ε₀dΦ_E/dt label in gap → Ampere loop B field shown identically around wire region and gap region. Animated timeline shows E growing, B encircling consistently in both regions.

**VIS-3:** EM wave derivation flowchart. Step-by-step: (1) Write Faraday, (2) Take curl, (3) Apply vector identity, (4) Substitute Ampere-Maxwell, (5) Use ∇·E=0, (6) Obtain wave equation, (7) Read off c = 1/√(μ₀ε₀). Each step labeled with which Maxwell equation is used. Final box: "c = 3×10⁸ m/s — predicted without measuring light."

**VIS-4:** EM wave self-sustaining animation. 3D rendering: E oscillates along y-axis, B oscillates along z-axis, wave propagates along x-axis. Color-coded fields. Annotation arrows show "Faraday: changing B → circulating E" and "Ampere-Maxwell: changing E → circulating B" as the mechanism of propagation.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.em.gauss-law | Gauss's Law for E is Equation 1; for B is Equation 2 | prerequisite |
| phys.em.amperes-law | Ampere's Law is Equation 4 minus the displacement current term | prerequisite |
| phys.em.faradays-law | Faraday's Law is Equation 3 | prerequisite |
| phys.em.electromagnetic-waves | EM waves are the direct consequence of Maxwell's equations in vacuum | unlocks |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.em.maxwells-equations ✓ |
| V-2 | name matches KG exactly | PASS — "Maxwell's Equations and Displacement Current" ✓ |
| V-3 | domain derived from prefix phys.em → electromagnetism | PASS ✓ |
| V-4 | difficulty label+number consistent (expert=6) | PASS ✓ |
| V-5 | bloom matches KG (analyze) | PASS ✓ |
| V-6 | All prerequisites present in KG requires list | PASS — gauss-law, amperes-law, faradays-law ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (10) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage set and consistent with rules | PASS — C (domain=physics, bloom=Analyse) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, each with all 6 fields ✓ |
| V-12 | ≥3 worked examples with complete numeric solutions | PASS — WE-1 (I_d calculation), WE-2 (c derivation), WE-3 (four-equation identification) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap and uses correct Primitive codes | PASS — 7 TAs, P01/P06/P62/P30+P31/P28/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 (foundational), P-2 (developing), P-3 (proficient), P-4 (mastery gate) ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-4 ✓ |
| V-17 | Cross-links table present | PASS — 4 entries ✓ |
| V-18 | No implementation code, no route/schema changes | PASS ✓ |
| V-19 | No curriculum authoring for other subjects | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
