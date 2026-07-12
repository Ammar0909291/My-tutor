# Teaching Blueprint — phys.em.electric-current

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.electric-current
name: Electric Current
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.em.electric-charge
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.ohms-law
  - phys.em.magnetic-field
  - phys.em.electrical-power
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Electric current is the flow of electric charge — like water flowing through a pipe. Just as you measure water flow in litres per second, you measure electric current in **amperes (A)**: one ampere means one coulomb of charge passes a point every second. The current in household wiring is typically a few amperes; a lightning bolt carries tens of thousands of amperes for a fraction of a second. Current always flows in a closed loop — there is no one-way street for charge.

### Tier 2 — Conceptual / Mechanistic (S1)

**Definition:**
$$I = \frac{dQ}{dt}$$

For constant current: I = Q/t (amperes = coulombs per second; 1 A = 1 C/s).

**Conventional current vs. electron flow:**
- Conventional current: direction positive charges would flow (historical convention, used in all circuit analysis).
- Electron flow: opposite to conventional current (electrons move from − to + terminal outside the battery).
- In metals: only electrons move. In electrolytes: both + and − ions carry current. In semiconductors: electrons and holes.

**Drift velocity (microscopic model):**
In a conductor with cross-section A, n charge carriers per volume, each with charge q and drift velocity v_d:
$$I = nqv_dA$$

For copper (n ≈ 8.5 × 10²⁸ m⁻³): at I = 1 A in a 1 mm² wire → v_d ≈ 0.07 mm/s — astoundingly slow! The signal (electric field) travels at near-light speed; the electrons drift very slowly.

**Current density:**
$$J = \frac{I}{A} = nqv_d \quad [\text{A/m}^2]$$

**Types of current:**
- DC (direct current): constant direction (battery circuits)
- AC (alternating current): direction reverses periodically (mains supply, 50/60 Hz)

**Steady current → charge conservation:** In any branch point (node) of a circuit, charge in = charge out (Kirchhoff's current law preview).

### Tier 3 — Formal

**Continuity equation (microscopic conservation):**
$$\nabla \cdot \vec{J} + \frac{\partial \rho}{\partial t} = 0$$

For steady (DC) current: ∂ρ/∂t = 0 → ∇·J = 0 — current lines are closed loops.

**Mean free path and collision time:**
Electrons in a conductor undergo random thermal motion (v_th ≈ 10⁶ m/s) punctuated by collisions with lattice ions. Applied field creates a small drift superimposed on thermal motion. Average time between collisions τ ≈ 10⁻¹⁴ s.
v_d = (eE/m)τ → J = ne²τE/m → conductivity σ = ne²τ/m (Drude model).

**Root mean square current (AC):**
For I(t) = I₀ sin(ωt): I_rms = I₀/√2 (relevant for power calculations, covered in phys.em.ac-basics).

---

## Component 2 — Worked Examples

### WE-1 (Direct definition)

**Problem:** A charge of 30 C passes through a cross-section of a wire in 15 s. Find the current.

**Worked solution:**

$$I = \frac{Q}{t} = \frac{30\text{ C}}{15\text{ s}} = 2.0\text{ A}$$

**Answer:** I = 2.0 A

---

### WE-2 (Drift velocity)

**Problem:** A copper wire of diameter 2.0 mm carries a current of 5.0 A. The number density of free electrons in copper is n = 8.5 × 10²⁸ m⁻³. Find the drift velocity.

**Worked solution:**

*Step 1 — Cross-sectional area:*
r = 1.0 × 10⁻³ m; A = πr² = π(1.0 × 10⁻³)² = 3.14 × 10⁻⁶ m²

*Step 2 — Use I = nqv_dA:*
$$v_d = \frac{I}{nqA} = \frac{5.0}{(8.5\times10^{28})(1.602\times10^{-19})(3.14\times10^{-6})}$$
$$v_d = \frac{5.0}{4.27\times10^4} = 1.17\times10^{-4}\text{ m/s} \approx 0.12\text{ mm/s}$$

*Step 3 — Interpret:*
Electrons drift at 0.12 mm/s — about 1 cm per 83 seconds. Yet a bulb lights instantly because the electric field (which propagates at ~c) sets all electrons drifting simultaneously.

**Answer:** v_d ≈ 1.2 × 10⁻⁴ m/s (0.12 mm/s)

---

### WE-3 (Charge accumulation)

**Problem:** A current of 3.0 A flows through a wire for 10 minutes. How many electrons pass a cross-section?

**Worked solution:**

*Step 1 — Total charge:*
Q = I × t = 3.0 A × (10 × 60 s) = 3.0 × 600 = 1800 C

*Step 2 — Number of electrons:*
$$n = \frac{Q}{e} = \frac{1800}{1.602\times10^{-19}} = 1.12\times10^{22}\text{ electrons}$$

**Answer:** ≈ 1.1 × 10²² electrons

---

## Component 3 — Misconception Profiles

### MC-CURRENT-USED-UP-BY-DEVICES

**Trigger signal:** Student says "the bulb uses up the current" or expects less current to emerge from a device than enters it, or thinks series devices share current (each getting less).

**Conflict evidence [P28]:** "Measure the current before and after a resistor in a simple circuit: same amperage. In a series circuit with two bulbs, an ammeter reads the same value on either side of each bulb. Charge is conserved — it cannot pile up inside a device under steady state. The bulb converts electrical energy to light and heat, but returns every electron that enters."

**Bridge text [P30]:** "Current is like a flow of marbles through a pipe — the pipe doesn't consume marbles, it just passes them through while resisting the flow. The energy comes from the electric potential (voltage), not from using up charge. More resistance → same current, but greater voltage drop → more energy per coulomb dissipated."

**Replacement text [P31]:** "Current is not consumed by circuit devices. In any series circuit, the same current passes through every element (charge conservation — no accumulation at steady state). What changes across a device is the voltage (potential difference), not the current. The device converts electrical energy (from voltage × charge) into heat, light, or mechanical energy."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Same current enters and leaves a resistor in series" | "The resistor uses up some of the current" |
| "Voltage drops across devices; current remains same in series" | "Current is shared among series elements" |
| "Energy is carried by voltage × charge, not by current alone" | "Current carries the energy and is consumed" |

**s6_path:** Use water analogy: water flow rate (current) is the same in and out of a pipe constriction; the pressure drop (voltage) drives energy transfer, not the flow rate itself.

---

### MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS

**Trigger signal:** Student says electrons flow from + terminal to − terminal, or confuses conventional current direction with electron flow direction.

**Conflict evidence [P28]:** "In a copper wire connected to a battery: electrons (negative) are attracted to the + terminal and repelled from the − terminal. So electrons flow from − terminal through the external wire to the + terminal — opposite to conventional current. Conventional current (+ to −) was defined before the electron was discovered; it was an unlucky guess about which charge carrier moves."

**Bridge text [P30]:** "Conventional current goes + → − outside the battery (historically chosen). Electrons go − → + outside the battery (they're attracted to the positive terminal). Both conventions give consistent physics — just track the direction you're using."

**Replacement text [P31]:** "Electrons (negative) flow from the negative terminal, through the external circuit, to the positive terminal. Conventional current flows the opposite way: from + terminal to − terminal. In circuit analysis, always use conventional current direction. The mismatch is purely historical — the physics is the same either way."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Electrons flow from − to + terminal externally" | "Electrons flow from + to − terminal" |
| "Conventional current flows + to −" | "Conventional current = electron flow direction" |
| "The two directions are opposite by definition" | "Conventional current and electron flow are the same" |

**s6_path:** Draw a simple battery circuit; label electron flow with blue arrows and conventional current with red arrows — show they point in opposite directions.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Define electric current. State its SI unit and symbol.

**Answer key:** I = dQ/dt (rate of charge flow). Unit: ampere (A) = C/s.

---

### P4-b (Calculation)
A current of 0.50 A flows for 2 minutes. How much charge passes a cross-section?

**Answer key:** Q = I × t = 0.50 × 120 = **60 C**

---

### P4-c (Drift velocity)
A wire of cross-section 1.5 × 10⁻⁶ m² carries 2.0 A. n = 6.0 × 10²⁸ m⁻³. Find v_d.

**Answer key:** v_d = I/(nqA) = 2.0/[(6.0×10²⁸)(1.602×10⁻¹⁹)(1.5×10⁻⁶)] = 2.0/(1.44×10⁴) = **1.39 × 10⁻⁴ m/s**

---

### P4-d (Conceptual — direction)
In a battery connected to a light bulb, state: (a) direction of conventional current in the external wire, (b) direction of electron flow in the external wire, (c) direction of conventional current inside the battery.

**Answer key:**
(a) From + terminal → through bulb → to − terminal (conventional: + to −)
(b) From − terminal → through bulb → to + terminal (electrons: − to +)
(c) From − terminal to + terminal inside the battery (current must flow through to maintain the loop)

---

### P4-e (Analysis — node conservation)
At a circuit junction, current I₁ = 3 A enters from one branch, I₂ = 1.5 A enters from a second branch, and I₃ exits through a third branch. Find I₃.

**Answer key:** By charge conservation (Kirchhoff's current law): I_in = I_out → I₃ = I₁ + I₂ = 3 + 1.5 = **4.5 A**

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is electric charge? What is its unit? How is it conserved?"
  → [P06: concrete-anchor] — "Water pipe analogy: flow rate (litres/s) ↔ electric current (C/s = A). Flow rate same in and out of a constriction."
  → [P41: diagnostic] — check if student knows current is NOT consumed by devices
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-CURRENT-USED-UP-BY-DEVICES, MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (basic I = Q/t)
  → [P06: concrete-anchor] — WE-2 (drift velocity — slow electrons, fast signal)
  → [P52: narrow] — "v_d ≈ 0.1 mm/s, yet the light turns on instantly. Explain."
  → [P06: concrete-anchor] — WE-3 (total charge in a time interval)

[P36: mastery-probe] — P4-c (drift velocity) + P4-e (node conservation)
  → if < 80%: re-address I = nqv_dA and current conservation
  → if ≥ 80%: advance

[P51: check-in]
[P91: mastery-gate] — threshold 0.80
[P85: regulation-tail]
[P89: retrieval-schedule] — spacing: +1 day, +3 days, +7 days, +21 days
[P68: close]
```

---

## Component 6 — Assessment Items (Mastery Probes)

### AP-1 (Bloom: Remember)
State the definition of electric current and give its SI unit.

**Answer:** I = dQ/dt; the rate at which electric charge flows past a point. SI unit: ampere (A) = 1 C/s.

---

### AP-2 (Bloom: Understand)
Why is the drift velocity of electrons in a copper wire so small (< 1 mm/s) even when the current is several amperes?

**Answer:** Because the number density of free electrons in copper is enormous (n ≈ 8.5 × 10²⁸ m⁻³). Since I = nqv_dA, even a tiny v_d multiplied by such a large n (and reasonable A) gives several amperes. The electric field that drives the current propagates near the speed of light, so all electrons start drifting simultaneously — the signal is fast even though each carrier moves slowly.

---

### AP-3 (Bloom: Apply)
A charge of 240 C passes through a wire in 4.0 minutes. (a) Find the current. (b) How many electrons pass per second?

**Answer:**
(a) I = Q/t = 240/(4×60) = **1.0 A**
(b) n/s = I/e = 1.0/(1.602×10⁻¹⁹) = **6.24 × 10¹⁸ electrons/second**

---

### AP-4 (Bloom: Analyze)
Two wires, A (diameter d) and B (diameter 2d), carry the same current. If they are made of the same material, compare their drift velocities.

**Answer:** I = nqv_dA → v_d = I/(nqA). Same I, n, q; A_B = π(d)² = 4A_A. So v_B = I/(nq·4A_A) = v_A/4. **Wire B's electrons drift at one-quarter the speed of wire A's electrons** (more cross-section → more carriers in parallel → less drift needed per carrier).

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | I = Q/t: given two of three, find the third |
| +3 days | Drift velocity calculation; explain slow drift vs. fast signal paradox |
| +7 days | Current direction: electrons vs. conventional; node conservation |
| +21 days | Mixed problem connecting I, Q, n, v_d, A |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.electric-charge` — charge magnitude, conservation, quantisation

**Unlocked by this concept:**
- `phys.em.ohms-law` — I = V/R (requires electric-current and electric-potential)
- `phys.em.magnetic-field` — magnetic field produced by current

**Cross-domain links:**
- `phys.em.electrical-power` — P = VI (requires current and voltage)
- `phys.em.dc-circuits` — Kirchhoff's current law (node rule)

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 3, bloom = understand | PASS |
| V-4 | prerequisites in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 3 | PASS |
| V-7 | cpa_entry_stage correct | PASS |
| V-8 | session_cap set | PASS |
| V-9 | Three tiers present | PASS |
| V-10 | ≥ 2 worked examples | PASS |
| V-11 | Exactly 2 MCs | PASS |
| V-12 | All 6 MC fields | PASS |
| V-13 | ≥ 5 practice items | PASS |
| V-14 | Valid Primitive codes | PASS |
| V-15 | ≥ 4 assessment items | PASS |
| V-16 | Retrieval schedule present | PASS |
| V-17 | Prereq/unlock map consistent | PASS |
| V-18 | No implementation changes | PASS |
| V-19 | No framework modifications | PASS |
| V-20 | status = READY | PASS |

**Blueprint status: PACKAGE_READY — all V-1..V-20 PASS**
