# Teaching Blueprint — phys.em.ohms-law

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.ohms-law
name: Ohm's Law
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.em.electric-current
  - phys.em.electric-potential
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.resistivity
  - phys.em.dc-circuits
  - phys.em.electrical-power
  - phys.em.kirchhoffs-laws
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Push water through a narrow pipe — more pressure gives more flow; a narrower pipe resists the flow. Electric circuits work the same way. **Voltage** (pressure) pushes **current** (flow) through a **resistor** (the narrow pipe). Ohm's Law says: double the voltage → double the current. Halve the resistance → double the current. One formula captures it all: **V = IR**. This is the most-used equation in electronics — you need it for every circuit calculation.

### Tier 2 — Conceptual / Mechanistic (S1)

**Ohm's Law:**
$$V = IR \quad \text{or} \quad I = \frac{V}{R} \quad \text{or} \quad R = \frac{V}{I}$$

where V = potential difference (volts), I = current (amperes), R = resistance (ohms, Ω).

**Ohmic vs. non-ohmic devices:**
A device is **ohmic** if R = V/I is constant (independent of V and I): metals at constant temperature, most resistors. A device is **non-ohmic** if R varies: diodes (only conduct one way), transistors, filament bulbs (R increases as temperature rises).

**Resistors in combination:**
- Series: R_eq = R₁ + R₂ + ... (same I; voltages add)
- Parallel: 1/R_eq = 1/R₁ + 1/R₂ + ... (same V; currents add)

**Physical basis:**
From the Drude model: J = σE, where σ = conductivity (S/m). For a resistor of length L, cross-section A: R = ρL/A, where ρ = 1/σ is resistivity. V = EL, I = JA → V/I = EL/(JA) = (E/J)(L/A) = ρL/A = R. So Ohm's Law V = IR is the macroscopic form of J = σE.

**Temperature dependence:**
For metals: R(T) = R₀[1 + α(T − T₀)], where α is the temperature coefficient of resistance (positive for metals — resistance increases with temperature). This is why filament bulbs are non-ohmic: as the filament heats up, R increases.

### Tier 3 — Formal

**Local form of Ohm's Law:**
$$\vec{J} = \sigma\vec{E}$$

where J = current density (A/m²) and σ = electrical conductivity (S/m = Ω⁻¹m⁻¹). This is valid for isotropic ohmic materials.

**Tensor form (anisotropic crystals):** Jᵢ = Σⱼ σᵢⱼ Eⱼ — conductivity is a second-rank tensor.

**Power dissipation (Joule heating):**
$$P = IV = I^2R = \frac{V^2}{R}$$

From energy considerations: charge dq moves through potential V in time dt; work dW = V dq = V I dt → P = VI.

**Limits of Ohm's Law:** Ohm's Law breaks down at very high fields (dielectric breakdown, E > E_b → ionisation); very low temperatures (superconductors, R → 0 below T_c with no E field needed); quantum regime (contact resistance, quantum Hall effect).

---

## Component 2 — Worked Examples

### WE-1 (Basic V = IR)

**Problem:** A current of 2.5 A flows through a 40 Ω resistor. Find: (a) the voltage across it, (b) if the voltage is reduced to 60 V, what is the new current?

**Worked solution:**

*(a)* V = IR = (2.5)(40) = **100 V**

*(b)* I = V/R = 60/40 = **1.5 A**

**Answer:** (a) 100 V; (b) 1.5 A

---

### WE-2 (Series and parallel combination)

**Problem:** Three resistors: R₁ = 6 Ω, R₂ = 3 Ω, R₃ = 4 Ω. R₁ and R₂ are in parallel; this combination is in series with R₃. Across the whole combination: V = 20 V. Find R_eq, I through R₃, and V across R₁.

**Worked solution:**

*Step 1 — Parallel R₁ and R₂:*
$$\frac{1}{R_{12}} = \frac{1}{6} + \frac{1}{3} = \frac{1}{6} + \frac{2}{6} = \frac{3}{6} = \frac{1}{2}$$
R₁₂ = 2 Ω

*Step 2 — Series with R₃:*
R_eq = R₁₂ + R₃ = 2 + 4 = 6 Ω

*Step 3 — Total current (through R₃, since it's in series):*
I = V/R_eq = 20/6 = 3.33 A

*Step 4 — Voltage across parallel combination R₁₂ = V across R₁:*
V₁₂ = I × R₁₂ = 3.33 × 2 = 6.67 V

**Answer:** R_eq = 6 Ω; I_{R₃} = 3.33 A; V_{R₁} = 6.67 V

---

### WE-3 (Ohmic vs. non-ohmic identification)

**Problem:** Device A: V = 5 V → I = 0.1 A; V = 10 V → I = 0.2 A; V = 20 V → I = 0.4 A. Device B: V = 5 V → I = 0.05 A; V = 10 V → I = 0.15 A; V = 20 V → I = 0.50 A. Which is ohmic?

**Worked solution:**

*Device A: R = V/I at each point:*
5/0.1 = 50 Ω; 10/0.2 = 50 Ω; 20/0.4 = 50 Ω → **R constant = 50 Ω → Ohmic ✓**

*Device B: R = V/I at each point:*
5/0.05 = 100 Ω; 10/0.15 = 66.7 Ω; 20/0.50 = 40 Ω → **R decreasing → Non-ohmic** (could be a thermistor: R decreases as temperature increases)

**Answer:** Device A is ohmic (R = 50 Ω constant). Device B is non-ohmic.

---

## Component 3 — Misconception Profiles

### MC-OHMS-LAW-IS-UNIVERSAL

**Trigger signal:** Student applies V = IR to a diode, LED, or battery and expects linear I-V behavior; or treats Ohm's Law as a fundamental law of nature.

**Conflict evidence [P28]:** "Connect a silicon diode to variable voltage and measure I: for V < 0.7 V (forward bias), almost no current. At V = 0.7 V, current surges to milliamps. At V = 1.0 V, current is 10× larger. R = V/I = 0.7/0.001 = 700 Ω, then 1.0/0.01 = 100 Ω, then 1.0/0.1 = 10 Ω — R is not constant. Ohm's Law is a special empirical relationship for ohmic materials, not a universal law of physics."

**Bridge text [P30]:** "Ohm's Law V = IR is a material property of ohmic conductors (metals, many resistors at constant T), not a universal law. Many devices are deliberately non-ohmic: diodes allow current in only one direction (used in rectifiers), transistors have exponential I-V curves (used in amplifiers and logic). Ohm's Law applies when R = V/I is constant."

**Replacement text [P31]:** "Ohm's Law V = IR applies to ohmic materials — materials where R = V/I is constant over a wide range of V and I. Many devices are non-ohmic: diodes, LEDs, transistors, thermistors (R changes with temperature), varistors (R changes with voltage). Ohm's Law is an empirical rule, not a fundamental law — it breaks down when the physical conditions change the conductor's properties."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "V = IR applies to ohmic devices (constant R)" | "V = IR applies to all electrical devices" |
| "Diodes are non-ohmic: R changes with voltage" | "R = V/I is constant for all materials" |
| "Ohm's Law fails for semiconductors, superconductors" | "Ohm's Law is a universal electrical law" |

**s6_path:** Show I-V graph for (a) a resistor (straight line through origin — ohmic) and (b) a diode (exponential curve — non-ohmic). The slope of the I-V graph is 1/R — constant for ohmic, variable for non-ohmic.

---

### MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE

**Trigger signal:** Student confuses current (I) and voltage (V), or says "the current across the resistor is 12 volts" or "the voltage through the resistor is 2 amps."

**Conflict evidence [P28]:** "Current (amperes) is the flow of charge through a device — measured as charge per unit time, Q/t. Voltage (volts) is the energy per unit charge — a potential difference between two points. Current flows through a component; voltage drops across a component. An ammeter (measures I) is connected in series — it must be in the path of current flow. A voltmeter (measures V) is connected in parallel — it measures the potential difference between two nodes."

**Bridge text [P30]:** "Think of the water analogy: current = flow rate of water (litres per second). Voltage = pressure difference (pascals). You measure the flow rate by inserting a flow meter in the pipe (series). You measure pressure difference by connecting to two points (parallel). Never say 'voltage flows' or 'current drops across' — these confuse the two distinct concepts."

**Replacement text [P31]:** "Current (I, amps) flows through components. Voltage (V, volts) appears across components. Use 'through' for current and 'across' for voltage. Ammeter in series (measures I through). Voltmeter in parallel (measures V across). These are distinct physical quantities — current is charge flow rate; voltage is energy per charge. Ohm's Law V = IR relates them but does not make them interchangeable."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "2 A of current flows through the resistor" | "2 A of voltage drops across the resistor" |
| "12 V appears across the resistor" | "12 V flows through the resistor" |
| "Ammeter in series; voltmeter in parallel" | "Use either meter either way for V and I" |

**s6_path:** Use language explicitly: "current through, voltage across" — practice reading a circuit diagram and identifying which quantity each meter measures.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Write Ohm's Law. Solve it for I and for R.

**Answer key:** V = IR; I = V/R; R = V/I. Units: V in volts (V), I in amperes (A), R in ohms (Ω).

---

### P4-b (Basic calculation)
A 220 V supply is connected to a 1100 Ω resistor. Find: (a) current, (b) power dissipated.

**Answer key:**
(a) I = V/R = 220/1100 = **0.200 A = 200 mA**
(b) P = IV = (0.200)(220) = **44 W** (or P = V²/R = 220²/1100 = 44 W ✓)

---

### P4-c (Series and parallel)
R₁ = 10 Ω and R₂ = 15 Ω. Find R_eq for: (a) series connection, (b) parallel connection.

**Answer key:**
(a) R_eq = 10 + 15 = **25 Ω**
(b) 1/R_eq = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 → R_eq = **6 Ω**

---

### P4-d (Problem solving)
A 9 V battery is connected to two resistors in series: R₁ = 12 Ω and R₂ = 6 Ω. Find: (a) R_eq, (b) I, (c) V across R₁, (d) V across R₂.

**Answer key:**
(a) R_eq = 12 + 6 = **18 Ω**
(b) I = 9/18 = **0.50 A**
(c) V₁ = IR₁ = 0.50 × 12 = **6 V**
(d) V₂ = IR₂ = 0.50 × 6 = **3 V**; Check: 6 + 3 = 9 V ✓

---

### P4-e (Analysis — ohmic identification)
A graph of V vs. I for a device shows a straight line through the origin with slope 150 Ω. (a) Is this device ohmic? (b) What current flows at V = 450 V?

**Answer key:**
(a) **Yes, ohmic** — a straight line through the origin on a V-I graph (or I-V graph) with constant slope = R indicates constant R = 150 Ω.
(b) I = V/R = 450/150 = **3.0 A**

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is voltage? What is current? How are they related for a resistor?"
  → [P06: concrete-anchor] — "Water pipe: pressure (V) drives flow (I). Narrow pipe (high R) → less flow for same pressure. V = IR."
  → [P41: diagnostic] — check if student can distinguish I (through) and V (across)
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-OHMS-LAW-IS-UNIVERSAL, MC-CURRENT-AND-VOLTAGE-ARE-INTERCHANGEABLE)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (basic V = IR: find V and I)
  → [P06: concrete-anchor] — WE-2 (combination: parallel + series network, step by step)
  → [P52: narrow] — "In WE-2: what is the same for resistors in series? In parallel?"
  → [P06: concrete-anchor] — WE-3 (ohmic vs. non-ohmic identification from I-V data)

[P36: mastery-probe] — P4-d (series circuit: find R_eq, I, V across each)
  → if < 80%: re-address V = IR and series voltage division
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
State Ohm's Law and the unit of resistance.

**Answer:** V = IR. Resistance measured in ohms (Ω); 1 Ω = 1 V/A.

---

### AP-2 (Bloom: Understand)
Explain why a filament bulb is non-ohmic even though its filament is made of metal (tungsten).

**Answer:** Tungsten obeys Ohm's Law at constant temperature (R is constant). However, when current flows, the filament heats to ~2700°C. The resistivity of metals increases with temperature (ρ ∝ T for metals). Therefore R increases significantly as the bulb heats up, making R = V/I non-constant. R_cold ≈ 10 Ω; R_hot ≈ 140 Ω for a 100 W bulb.

---

### AP-3 (Bloom: Apply)
Four 20 Ω resistors are connected so that two pairs are in series, and the two pairs are in parallel. A 60 V supply is connected. Find: (a) R_eq, (b) total current from supply.

**Answer:**
Each series pair: R_pair = 20 + 20 = 40 Ω
Two pairs in parallel: 1/R_eq = 1/40 + 1/40 = 2/40 → R_eq = **20 Ω**
I = V/R_eq = 60/20 = **3.0 A**

---

### AP-4 (Bloom: Analyze)
A student connects a voltmeter across a resistor and reads 8.0 V. The ammeter in series reads 40 mA. Find R. If the voltmeter has internal resistance 10 kΩ, does this affect the reading significantly?

**Answer:**
R = V/I = 8.0/(40×10⁻³) = **200 Ω**
Voltmeter in parallel: R_effective = 200 || 10000 = (200×10000)/(200+10000) = 2×10⁶/10200 = 196 Ω. The measured R is 196 Ω instead of 200 Ω — error of 2%. Negligible for most purposes; matters only when R and R_voltmeter are comparable.

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | V = IR: find the missing variable; identify "through" vs. "across" |
| +3 days | Series and parallel R_eq: mixed networks |
| +7 days | Identify ohmic vs. non-ohmic from I-V data or description |
| +21 days | Full circuit: find R_eq, I, V across each component in a 3-resistor network |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.electric-current` — I = Q/t; current as charge flow
- `phys.em.electric-potential` — V = potential difference; W = qΔV

**Unlocked by this concept:**
- `phys.em.resistivity` — R = ρL/A; microscopic basis of resistance
- `phys.em.dc-circuits` — multi-loop circuits; voltage and current dividers
- `phys.em.electrical-power` — P = IV = I²R = V²/R

**Cross-domain links:**
- `phys.em.kirchhoffs-laws` — generalization of Ohm's Law to networks
- `phys.em.ac-basics` — AC Ohm's Law: V = IZ (impedance)

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 3, bloom = apply | PASS |
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
