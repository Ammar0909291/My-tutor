# Electric Current — `phys.em.electric-current`

## Identity

- **Concept ID**: `phys.em.electric-current`
- **Display name**: Electric Current
- **Domain**: electromagnetism
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 3
- **Requires**: `phys.em.electric-charge`
- **Unlocks**: `phys.em.magnetic-field`, `phys.em.ohms-law`
- **Load-bearing prerequisite content**:
  - From `phys.em.electric-charge`: charge is quantised, measured in coulombs, and signed; conventional current flows in the direction positive charge moves; electrons (the actual carriers in metals) flow opposite to conventional current

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Electric current is the flow of electric charge through a conductor. In a wire, electrons move from one end to the other. A battery pushes the electrons around the circuit. The more charge that flows per second, the larger the current.

**Stage 2 — Intermediate**: Current I = dQ/dt — the rate of flow of charge. The SI unit is the ampere: 1 A = 1 C/s. Conventional current is defined as the direction positive charges would flow (from positive terminal through external circuit to negative terminal); electrons (the actual carriers in metals) flow in the opposite direction. Drift velocity: under an electric field, electrons in a metal move with a small average velocity v_d in one direction (~mm/s to cm/s). The current is I = nqv_dA, where n is the number density of charge carriers, q is the charge per carrier, v_d is the drift velocity, and A is the cross-sectional area of the conductor.

**Stage 3 — Advanced**: The drift velocity (~10⁻⁴ m/s) is extremely slow — far slower than the signal propagation speed (~c in the conductor) and the thermal velocity of electrons (~10⁵ m/s). Signals propagate via the electromagnetic field, not by individual electrons travelling from source to load. Current in semiconductors can involve both electron flow (n-type, conduction band) and hole flow (p-type, valence band); the net current is the sum of both contributions. AC (alternating current) has electrons oscillating without net drift — the "current" is the oscillating charge flow rate.

**Stage 4 — Expert / University**: Current density **J** = σ**E** (Ohm's law in field form, where σ is conductivity). The continuity equation ∂ρ/∂t + ∇·**J** = 0 expresses conservation of charge. In superconductors, current flows without resistance — electrons form Cooper pairs that move without scattering. The quantum Hall effect quantises transverse conductance in units of e²/h.

**Model versioning**: Stage 2 is the operative model for secondary-level circuit problems. Stage 3 is needed for semiconductor and AC analysis. Stage 4 is university condensed matter.

---

## Why beginners fail

The dominant root cause is **current-as-consumption misconception**: learners think current is "used up" in a resistor or light bulb — that less current comes out of the bulb than goes in. This model makes the circuit unsolvable for multi-loop problems and leads to errors in Kirchhoff's current law. The correct model: charge is conserved; the same current that enters a series component exits it. Energy is dissipated (not current).

The secondary root cause is **drift velocity vs. signal speed confusion**: learners are told electrons travel through wires and assume the signal (e.g., a light turning on) travels at the drift velocity (~mm/s), leading to the wrong prediction that a light switch takes minutes to work. The signal is carried by the electromagnetic field at nearly the speed of light; electrons are the medium through which the field acts.

---

## Misconception library

**M1 — "Current is consumed in resistors / less comes out than goes in"**
- Characteristic phrase: "The current through the bulb is less than through the wire because the bulb uses it up."
- Probe: "Two ammeters are placed — one before and one after a light bulb in a series circuit. What do they read?"
- Expected wrong answer: "The first reads more than the second — the bulb consumes some current."
- Recovery: both ammeters read the same. Charge is conserved — it is not destroyed in the bulb. The bulb converts electrical energy to light and heat, but the same number of coulombs that enter per second exit per second. What is consumed is energy (voltage drops), not current. Current is the same throughout a series circuit.

**M2 — "Electrons travel at the speed of light through wires"**
- Characteristic phrase: "The light comes on instantly because electrons travel at the speed of light."
- Probe: "If electrons in a wire travel at ~10⁻⁴ m/s (drift velocity), how long would it take an electron to travel 10 m?"
- Expected wrong answer: "Instantaneously" or "Very fast — close to light speed."
- Recovery: at 10⁻⁴ m/s, 10 m takes 10/10⁻⁴ = 10⁵ s ≈ 28 hours. But lights switch on in nanoseconds. The signal travels as an electromagnetic wave along the wire at nearly c — not as electrons drifting. Electrons are like the medium; the EM field is the wave. Analogy: when you push one end of a long train, the push signal travels at the speed of sound in the train's material, not at the speed of the individual cars.

**M3 — "Conventional current flows in the direction electrons move"**
- Characteristic phrase: "Current flows from negative to positive because electrons move that way."
- Probe: "In a simple battery circuit, which direction does conventional current flow through the external circuit?"
- Expected wrong answer: "From the negative terminal to the positive terminal — the same direction as electrons."
- Recovery: conventional current is defined as the direction a positive charge would flow — from the positive terminal, through the external circuit, to the negative terminal. Electrons flow in the opposite direction (from negative to positive). Both descriptions are correct — they're just different conventions. All circuit equations (Ohm's law, Kirchhoff's laws) use conventional current.

**M4 — "Current can only flow through metals"**
- Characteristic phrase: "You need a metal wire — current can't flow through liquids or gases."
- Probe: "Can an electric current flow through saltwater? Through ionised gas (plasma)?"
- Expected wrong answer: "No — current needs a metal wire to flow."
- Recovery: current is the flow of any charge carriers, not just electrons in metals. In electrolytes (saltwater, battery acid), current is carried by ions moving in both directions (cations toward the negative electrode, anions toward the positive electrode). In plasma, free electrons and ions both carry current. In semiconductors, holes carry current in the valence band. The generalisation is I = nqv_dA for any carrier type.

---

## Explanation library

**E1 — Current as a flow rate (quantitative definition)**
"Current I = ΔQ/Δt: the charge flowing past a cross-section per unit time. If 10 C flows past a point in 2 s, the current is 5 A. If 1 A flows for 1 minute (60 s), the total charge transferred is Q = It = 1 × 60 = 60 C. The ampere is the unit; one ampere means one coulomb of charge passes per second."

**E2 — The train-push analogy for signal speed vs. electron speed**
"Push a very long train from the rear. The push signal travels to the front at the speed of sound in the train's material (nearly instantaneously at human scale) — but no individual train car moves from back to front. Similarly, the electric field signal travels along a wire at nearly the speed of light; individual electrons drift at mm/s. You are the battery pushing the electrons; the train car movement is the electron drift; the push signal is the EM field."

**E3 — Charge conservation in a circuit (Kirchhoff's current law preview)**
"Charge cannot be created or destroyed in a circuit. At any junction, the total charge flowing in per second must equal the total charge flowing out per second. In a series circuit: no junction → same current everywhere. This is why both ammeters (before and after the bulb) read the same. The bulb converts energy, not charge."

---

## Analogy library

**Primary analogy — The water pipe analogy**
Current = water flow rate (litres per second); charge = water; voltage = pressure difference; resistance = pipe narrowness. Water flows from high pressure to low pressure; conventional current flows from high potential to low potential. The water pipe analogy is useful for circuits and Ohm's law — but:

**Breaking point**: (1) Water cannot flow through a vacuum; current can flow through a vacuum (electron beam, vacuum tube). (2) Water flow rate is always positive; current can be AC (alternating). (3) Water pipe analogy teaches the right conceptual structure for simple DC circuits but breaks down for semiconductors, magnetic effects, and AC analysis. (4) The analogy reinforces M3 if the learner treats electrons as "the water flowing from negative to positive" — always clarify which way conventional current flows vs. which way electrons flow.

**Anti-analogy — "Current is like electricity stored in the wire"**
Current is a FLOW RATE — it is not stored in wires. A wire with no current is not "empty" of electricity; it has charge (electrons) but no net flow. "Electricity in the wire" is a static-charge picture (capacitor, not current). Do not frame current as a substance that accumulates or depletes.

---

## Demonstration library

**D1 — Two ammeters in series**
Connect two ammeters before and after a resistor or bulb in a series circuit. Both read the same. Ask the class to predict first (most will predict different values). The identical readings resolve M1 empirically. This is the single most important electrics demonstration at secondary level.

**D2 — Electrolytic cell (current through liquid)**
Connect a 9V battery to two graphite rods dipped in saltwater. Observe bubbles (electrolysis: hydrogen at the cathode, oxygen at the anode). This demonstrates current flowing through an ionic solution — resolves M4. Connect the same battery through a metal wire for contrast.

**D3 — Current direction marker on a circuit**
Draw a circuit with conventional current direction (arrows from + terminal around the circuit). Then draw the electron flow arrows (opposite direction). Both sets of arrows on the same diagram simultaneously. Show that all circuit laws (Ohm's law, Kirchhoff) use the conventional current arrows.

---

## Discovery lesson

**Argue for guided discovery for M1** (the conservation principle):

Before showing any circuit: "When you turn on a bulb, the bulb glows. Where does the energy come from? Does the current that makes the bulb glow come back to the battery?" Trace the current path around the circuit. "If current were consumed in the bulb, where would the consumed current go? Could it disappear inside the metal?" The learner should recognize that charge cannot disappear — it must return to the battery. This makes the conservation principle discoverable before it is stated as a rule.

For the definitions (I = Q/t, drift velocity formula): direct instruction is appropriate — these are formal quantitative definitions that require the prerequisite knowledge of charge.

---

## Teaching actions

**TA1 — Series-circuit current quiz**: Whenever a series circuit is presented, ask before any calculation: "What is the current at every point in this circuit?" Answer: the same. This addresses M1 pre-emptively for every series circuit problem.

**TA2 — Conventional current direction declaration**: For every circuit diagram, require the learner to draw conventional current arrows before solving. "Current flows from + terminal of battery, through the external circuit (bulb, resistors), back to − terminal." This prevents M3.

**TA3 — Charge-energy distinction**: Whenever a learner uses "current is used up" language, immediately correct to "energy is converted" or "voltage drops." Charge is conserved; energy is transformed.

**TA4 — Drift velocity calculation with order-of-magnitude check**: After computing drift velocity from I = nqv_dA, require the learner to state: "Is this mm/s or m/s or m/year?" and connect to the signal-speed distinction (M2).

---

## Voice teaching

> "Current is a flow rate — charge per second. One ampere is one coulomb of charge passing a cross-section every second. It's like measuring water flow in litres per second: the number tells you how fast charge is moving through the circuit, not how much is stored there."

> "The current that enters a light bulb and the current that exits it are identical. Charge is conserved. The bulb doesn't consume current; it converts the electrical energy carried by that current into light and heat. Think of it like a water mill: the same amount of water enters and exits, but it loses energy in doing so. Same with electric charge."

> "Electrons drift at roughly a millimetre per second. If you need to push electrons 10 metres, it takes 28 hours for any individual electron to make the trip. Yet your light turns on in a nanosecond. The signal — the electromagnetic field — travels at nearly the speed of light along the wire. The electrons are the medium; they don't need to arrive at the bulb for the bulb to light up."

---

## Assessment

**Mastery gate**: The learner can (1) define I = Q/t and use it to calculate current, charge, or time; (2) state that current is the same throughout a series circuit; (3) correctly state conventional current direction vs. electron flow direction; (4) calculate drift velocity from I = nqv_dA.

**Formative golden probe**
> "A charge of 90 C flows through a wire in 3 minutes. (a) What is the current? (b) Two identical bulbs are connected in series to a battery. Ammeter 1 is before the first bulb; ammeter 2 is between the bulbs; ammeter 3 is after the second bulb. What does each ammeter read relative to the others? (c) In the wire of part (a), n = 8.5 × 10²⁸ electrons/m³, A = 1 mm² = 10⁻⁶ m². Calculate the drift velocity. (d) Why does a switch work almost instantaneously even though the drift velocity from (c) is so small?"

- (a): I = 90/(3×60) = 0.5 A
- (b): all three read the same — targets M1
- (c): v_d = I/(nqA) = 0.5/(8.5×10²⁸ × 1.6×10⁻¹⁹ × 10⁻⁶) ≈ 3.7×10⁻⁵ m/s
- (d): signal travels via EM field at ≈ c — targets M2

**Confidence calibration question**
After (b): "How confident are you that all three ammeters read the same?" (1–5). High confidence in different readings → M1 deeply embedded.

**Delayed retrieval check (48 h / 7 days)**
"A 2 A current flows through a circuit for 10 minutes. How many coulombs of charge passed? How many electrons is that?" (Q = 1200 C; N = 1200 / 1.6×10⁻¹⁹ ≈ 7.5 × 10²¹ electrons — makes the scale of charge flow concrete.)

---

## Recovery notes

**Failure mode A — M1 persists (current consumed)**
Run D1 (two ammeters). The physical observation of identical readings is the fastest resolution. Then use the charge-conservation argument: "If current were consumed, where would the missing charge go? Could it pile up inside the bulb?" This reductio leads the learner to the correct model.

**Failure mode B — M3 persists (conventional current direction)**
Use D3 (circuit diagram with both arrow sets). Ask the learner to point to each arrow set and name it. Then: "Every equation in circuit analysis was written with these conventional current arrows (point to them). Electron arrows are useful for understanding HOW the current flows, but they are NEVER substituted into Ohm's law or Kirchhoff's equations. Use the conventional current arrows for all calculations."

**Failure mode C — Drift velocity confusion (M2)**
Compute the drift velocity from I = nqv_dA: v_d ≈ 10⁻⁴ m/s. Compute the time for an electron to travel 1 m: 1/10⁻⁴ = 10,000 s ≈ 2.8 hours. Then ask: "Does a light take 2.8 hours to turn on after the switch is flipped?" No. The resolution: the EM field (signal) travels at ≈ c; the electrons don't need to travel from the battery to the bulb.

---

## Memory & review

**Memory type**: Definition (I = Q/t), conservation law (same current throughout series), convention (direction rule), and drift-velocity formula (I = nqv_dA).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "Define electric current and state its unit."
- "In a series circuit, how does current compare at different points?"
- "Which direction does conventional current flow in an external circuit?"
- "A current of 3 A flows for 5 s. How much charge has flowed?"

**Interleaving**: After mastery, interleave current problems with Ohm's law and resistance problems — the learner must retrieve I = Q/t and V = IR and connect them through the circuit.

---

## Transfer map

**Immediate transfers**:
- `phys.em.ohms-law`: V = IR connects current to voltage and resistance — the next building block in circuit analysis
- `phys.em.magnetic-field`: a current-carrying conductor creates a magnetic field — the link between electrostatics and magnetism

**Downstream transfers**:
- `phys.em.kirchhoffs-laws`: current conservation (KCL) and voltage conservation (KVL) in complex circuits
- Power dissipation: P = IV = I²R — energy converted per second by a current through a resistance

**Cross-subject transfers**:
- Biology — neural impulse: action potentials involve ion current (Na⁺, K⁺) across cell membranes; the depolarisation wave travels at metres-per-second along the axon (much slower than electromagnetic signal propagation, because it is a chemical-diffusion driven process, not an EM wave)
- `chem` — electrochemistry: electrolytic and galvanic cells, Faraday's laws of electrolysis (mass deposited = (Q × M)/(F × z) where F = 96,485 C/mol); the connection between current and chemical change

---

## Curriculum feedback

The KG description correctly identifies I = dQ/dt and drift velocity as the key content. The two unlocks (magnetic-field, ohms-law) are appropriate.

One gap: the KG does not mention Kirchhoff's current law (KCL), which is the formal statement that current is conserved at junctions. KCL is typically derived from charge conservation — the exact principle that makes M1 wrong. A node for KCL (or its inclusion in the electric-current concept) would make the conceptual chain explicit.

A second gap: the KG says "drift velocity is the average velocity of charge carriers under an electric field" but does not give the formula I = nqv_dA. This formula is what makes drift velocity quantitative (and reveals how slow it is), which is the key to resolving M2. It should be part of the learning outcomes for this concept.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
