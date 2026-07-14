# Teaching Blueprint — phys.em.rc-circuits

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.rc-circuits
name: RC Circuits
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.capacitance
  - phys.em.kirchhoffs-laws
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.dc-circuits
  - phys.em.lc-circuits
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

An RC circuit is the simplest circuit that changes with time. Connect a resistor (R) and a capacitor (C) in series with a battery: the capacitor does not charge instantly — the resistor slows the flow of charge, so the voltage across the capacitor rises gradually in a smooth, curved fashion. Disconnect the battery and let the capacitor discharge back through the resistor: the voltage decays away in an equally smooth, curved fall.

These two behaviours — exponential rise and exponential decay — appear everywhere in engineering and physics. The camera flash charges a large capacitor slowly through a small battery, then dumps its energy through a xenon lamp in a fraction of a millisecond. The touch-screen on a phone uses RC time constants to detect your finger. The heart defibrillator charges a capacitor and releases it in a controlled pulse. In every case, the essential physics is the same: the resistor controls how fast charge can move, and the capacitor determines how much charge must move to reach the final voltage. Together they create a **natural time scale τ = RC** — the time constant — that governs the entire transient response.

### Tier 2 — Conceptual / Mechanistic (S1)

**Deriving the charging equations from KVL:**

For a loop containing battery ε, resistor R, and initially uncharged capacitor C, Kirchhoff's Voltage Law gives:

$$\varepsilon = V_R + V_C = IR + \frac{Q}{C} = R\frac{dQ}{dt} + \frac{Q}{C}$$

This is a first-order linear ODE with constant coefficients. Its solution with initial condition Q(0) = 0:

$$Q(t) = C\varepsilon\!\left(1 - e^{-t/\tau}\right), \qquad \tau = RC$$

Differentiating Q(t) gives current; dividing by C gives capacitor voltage:

$$I(t) = \frac{\varepsilon}{R}\,e^{-t/\tau}, \qquad V_C(t) = \varepsilon\!\left(1 - e^{-t/\tau}\right)$$

**Discharging equations:**

Remove the battery; the capacitor (initially at V₀) discharges through R. KVL gives 0 = IR + V_C. Solving with Q(0) = CV₀:

$$V_C(t) = V_0\,e^{-t/\tau}, \qquad I(t) = \frac{V_0}{R}\,e^{-t/\tau}$$

**The time constant τ = RC:**

- Units: [Ω][F] = (V/A)(C/V) = C/A = s ✓
- At t = τ (charging): V_C = ε(1 − e⁻¹) = **0.632 ε** (reaches 63.2% of final value)
- At t = τ (discharging): V_C = V₀ e⁻¹ = **0.368 V₀** (retains 36.8% of initial value)
- These two percentages are complements: 63.2% + 36.8% = 100%

**Boundary conditions (critical for circuit analysis):**

| Time | Capacitor state | Capacitor model | Current |
|---|---|---|---|
| t = 0 (uncharged) | V_C = 0 | **Short circuit** (wire) | I = ε/R (maximum) |
| 0 < t < ∞ | 0 < V_C < ε | Exponential transient | I decays from ε/R to 0 |
| t → ∞ (fully charged) | V_C = ε | **Open circuit** | I = 0 |

At t = 0: KVL gives ε = I(0)R + 0 → I(0) = ε/R, as if C were a wire.
At t → ∞: I = 0, so all ε appears across C, as if no current path exists.

**5τ rule:** After 5 time constants, e⁻⁵ ≈ 0.0067 (0.67% error). Engineers and physicists treat the circuit as having reached its final state after 5τ.

**Energy bookkeeping (charging, uncharged → full):**

- Final charge stored: Q_∞ = Cε
- Energy delivered by battery: W_battery = Q_∞ · ε = **Cε²**
- Energy stored in capacitor: U_C = ½CV_C² |_{V_C = ε} = **½Cε²**
- Energy dissipated in R: W_R = W_battery − U_C = **½Cε²**

The battery energy splits **exactly 50/50** between storage and dissipation, **regardless of R**. A larger R slows the process but does not change the energy split — the longer charging time exactly compensates for the lower current.

### Tier 3 — Formal

**Solution via integrating factor:**

The charging ODE rearranged:

$$\frac{dQ}{dt} + \frac{Q}{RC} = \frac{\varepsilon}{R}$$

Integrating factor: μ(t) = e^{t/RC}. Multiply through:

$$\frac{d}{dt}\!\left(Q\,e^{t/RC}\right) = \frac{\varepsilon}{R}\,e^{t/RC}$$

Integrate both sides from 0 to t with Q(0) = 0:

$$Q\,e^{t/RC} - 0 = C\varepsilon\!\left(e^{t/RC} - 1\right)$$
$$\implies Q(t) = C\varepsilon\!\left(1 - e^{-t/RC}\right) \checkmark$$

**Discharging:** Same ODE with ε = 0; initial condition Q(0) = CV₀ yields Q(t) = CV₀ e^{−t/RC} ✓

**Proof of R-independence of energy dissipation:**

$$W_R = \int_0^\infty I^2(t)\,R\,dt = \int_0^\infty \left(\frac{\varepsilon}{R}\right)^2 e^{-2t/RC}\cdot R\,dt = \frac{\varepsilon^2}{R}\int_0^\infty e^{-2t/RC}\,dt$$

$$= \frac{\varepsilon^2}{R}\cdot\frac{RC}{2} = \frac{C\varepsilon^2}{2} = \frac{1}{2}C\varepsilon^2$$

R cancels exactly. Larger R → smaller I² (factor R²), but longer timescale τ = RC (factor R) — the two effects cancel. W_R = ½Cε² for any finite R, including the limit R → 0 (where energy is lost in arc discharge and radiation).

**General solution (capacitor initially at V_i, final state V_f):**

$$V_C(t) = V_f + (V_i - V_f)\,e^{-t/\tau}$$

This single formula covers all cases: charging (V_i = 0, V_f = ε), discharging (V_i = V₀, V_f = 0), and partial charge/recharge (arbitrary V_i, V_f).

**Thevenin reduction for multi-element RC networks:** Any resistor network seen by a single capacitor reduces to a Thevenin equivalent (V_th, R_th). The time constant is τ = R_th C and the final voltage is V_th. This is the canonical method for complex single-capacitor circuits.

---

## Component 2 — Worked Examples

### WE-1 (Charging — time constant and multi-point analysis)

**Problem:** A series RC circuit has R = 10 kΩ, C = 100 μF, battery ε = 12 V. Capacitor initially uncharged. (a) Find τ. (b) Find V_C at t = τ, t = 2τ, and t = 5τ. (c) Find I at t = 0 and t = τ.

**Worked solution:**

*(a) Time constant:*
$$\tau = RC = (10\times10^3\,\Omega)(100\times10^{-6}\,\text{F}) = 1.0\text{ s}$$

*(b) Capacitor voltage — V_C(t) = 12(1 − e^{−t/1.0}):*

At t = τ = 1.0 s:
$$V_C = 12\bigl(1 - e^{-1}\bigr) = 12\,(1 - 0.368) = 12\times0.632 = 7.58\text{ V}$$
This is 63.2% of ε — the defining signature of one time constant.

At t = 2τ = 2.0 s:
$$V_C = 12\bigl(1 - e^{-2}\bigr) = 12\,(1 - 0.135) = 12\times0.865 = 10.38\text{ V}$$
(86.5% of ε)

At t = 5τ = 5.0 s:
$$V_C = 12\bigl(1 - e^{-5}\bigr) = 12\,(1 - 0.0067) = 12\times0.9933 = 11.92\text{ V}$$
(99.3% of ε → 5τ rule: treat as fully charged)

*(c) Current — I(t) = (12/10 000) e^{−t} = 1.2 mA × e^{−t}:*

At t = 0: $I = \varepsilon/R = 12/10\,000 = \mathbf{1.2\text{ mA}}$ (maximum; C acts as short circuit)

At t = τ: $I = 1.2\text{ mA}\times e^{-1} = 1.2\times0.368 = \mathbf{0.44\text{ mA}}$

**Answer:** τ = 1.0 s; V_C(τ) = 7.58 V, V_C(2τ) = 10.38 V, V_C(5τ) = 11.92 V; I(0) = 1.2 mA, I(τ) = 0.44 mA.

---

### WE-2 (Discharging — finding time from voltage target)

**Problem:** A capacitor C = 200 μF, charged to V₀ = 20 V, discharges through R = 5 kΩ. (a) Find τ. (b) Find the time for V_C to fall to 5 V. (c) Find the initial discharge current.

**Worked solution:**

*(a) Time constant:*
$$\tau = RC = (5\times10^3)(200\times10^{-6}) = 1.0\text{ s}$$

*(b) Time to reach 5 V — V_C(t) = 20 e^{−t/1.0}:*

Set V_C = 5 V:
$$5 = 20\,e^{-t} \implies e^{-t} = \frac{5}{20} = 0.25$$
$$-t = \ln(0.25) = -1.386 \implies t = \mathbf{1.39\text{ s}}$$

Sanity check: 5 V is 25% of 20 V. Since e⁻¹ = 36.8% and e⁻² = 13.5%, the answer must lie between τ and 2τ. 1.39 s ∈ (1.0, 2.0) ✓

*(c) Initial discharge current:*
$$I(0) = \frac{V_0}{R} = \frac{20}{5000} = \mathbf{4.0\text{ mA}}$$

The current flows in the discharge direction (capacitor is the source driving current through R).

**Answer:** τ = 1.0 s; t = 1.39 s to reach 5 V; I(0) = 4.0 mA.

---

### WE-3 (Energy bookkeeping — proving R-independence)

**Problem:** C = 50 μF charges from ε = 10 V through R = 2 kΩ (starting uncharged). (a) Total energy from battery. (b) Energy stored in capacitor. (c) Energy dissipated in R. (d) Show the 50/50 split is independent of R.

**Worked solution:**

*(a) Energy from battery:*

Total charge delivered to capacitor at full charge: Q_∞ = Cε = (50×10⁻⁶)(10) = 500 μC

Every coulomb is pushed through ε = 10 V by the battery:
$$W_\text{battery} = Q_\infty\cdot\varepsilon = C\varepsilon^2 = (50\times10^{-6})(10)^2 = \mathbf{5.0\text{ mJ}}$$

*(b) Energy stored in capacitor:*
$$U_C = \tfrac{1}{2}C\varepsilon^2 = \tfrac{1}{2}(50\times10^{-6})(100) = \mathbf{2.5\text{ mJ}}$$

*(c) Energy dissipated in R:*
$$W_R = W_\text{battery} - U_C = 5.0 - 2.5 = \mathbf{2.5\text{ mJ}}$$

The dissipated energy equals the stored energy — the battery energy splits exactly 50/50.

*(d) R-independence proof:*

$$W_R = \int_0^\infty I^2(t)\,R\,dt = \int_0^\infty\!\frac{\varepsilon^2}{R^2}e^{-2t/RC}\cdot R\,dt = \frac{\varepsilon^2}{R}\cdot\frac{RC}{2} = \frac{C\varepsilon^2}{2}$$

R cancels completely. Verify: with R = 4 kΩ instead of 2 kΩ, τ doubles (charging is slower), but W_R = ½(50×10⁻⁶)(100) = 2.5 mJ — **identical**. This result holds for any R > 0.

**Answer:** W_battery = 5.0 mJ; U_C = 2.5 mJ; W_R = 2.5 mJ (always equal, for any value of R).

---

## Component 3 — Misconception Profiles

### MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R

**Trigger signal:** Student states "a larger resistance provides more drive so charging is faster," or claims τ decreases when R increases, or predicts I₀ = ε/R being larger means the capacitor charges faster without accounting for the time factor.

**Conflict evidence [P28]:** "Test the claim by taking R to its logical limit. If larger R meant faster charging, then R → ∞ (open circuit) should charge the capacitor in zero time. But with R = ∞, no current flows at all — the capacitor never charges. Going the other way: R → 0 (short circuit) charges the capacitor as fast as physics allows, not slower. The formula τ = RC shows both R and C enter symmetrically: double either one and the charging time doubles. Larger R limits the current I = (ε − V_C)/R at every instant, so each coulomb of charge takes longer to arrive at the capacitor plates."

**Bridge text [P30]:** "Think of filling a water tank (capacitor) through a pipe (resistor) connected to a reservoir (battery). A narrower pipe (larger R) slows the flow rate even though the reservoir pressure (ε) is unchanged — so the tank fills more slowly. The fill time depends on both the pipe width and the tank volume. τ = RC: the pipe width is 1/R and the tank size is C; both determine how long the filling takes."

**Replacement text [P31]:** "The time constant τ = RC is directly proportional to both R and C. Larger R → larger τ → slower charging (it takes longer to accumulate the charge Cε against the growing back-EMF V_C). Larger C → larger τ → slower charging (more charge must arrive before V_C reaches ε). To charge faster: decrease R, decrease C, or both. While I₀ = ε/R is larger with smaller R, this is precisely why smaller R charges faster — more coulombs per second arrive at the plates."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Larger R → larger τ → slower charging curve" | "Larger R → more current → faster charging" |
| "τ = RC: R and C contribute equally to the time scale" | "τ depends only on R; C sets the final charge, not the speed" |
| "R → ∞: τ → ∞; capacitor never charges" | "R → ∞: maximum drive; instant charging" |
| "I₀ = ε/R: smaller R gives larger initial current → faster charge buildup" | "Higher initial voltage drop across R means faster capacitor charging" |

**s6_path:** Calculate τ for R = 1 kΩ, 10 kΩ, and 100 kΩ with the same C = 100 μF (τ = 0.1 s, 1.0 s, 10 s). Plot all three V_C(t) curves on the same axes. Observe that the curve with the largest R is the flattest and slowest — the opposite of the student's prediction.

---

### MC-CAPACITOR-ACTS-AS-OPEN-CIRCUIT-ALWAYS

**Trigger signal:** Student replaces the capacitor with an open circuit at t = 0 (concluding I(0) = 0 initially), or states "capacitors block DC so no current flows when the switch is first closed," or sets up KVL at t = 0 with V_C = ε rather than V_C = 0.

**Conflict evidence [P28]:** "If the capacitor were open at t = 0, no current would flow and no charge could accumulate on its plates — the capacitor would remain uncharged indefinitely, which contradicts its purpose. Measure the current in the circuit immediately after closing the switch: it equals ε/R, exactly as if the capacitor were replaced by a wire. At t = 0, V_C = 0 (no charge yet stored), so KVL gives ε = I(0)R + 0, hence I(0) = ε/R. The open-circuit behaviour — I = 0, V_C = ε — is only achieved at t → ∞ after sufficient charging time."

**Bridge text [P30]:** "A capacitor's effective opposition to current is not fixed — it evolves throughout charging. At t = 0 (uncharged, V_C = 0): the capacitor exerts zero back-EMF, all of ε drives current through R, and the capacitor behaves like a short circuit. As charge accumulates, V_C rises and opposes further current flow. At t → ∞ (V_C = ε): the back-EMF exactly cancels ε, current falls to zero, and the capacitor now behaves like an open circuit. The statement 'capacitors block DC' accurately describes only the final steady state."

**Replacement text [P31]:** "Capacitor behaviour in a DC transient circuit is time-dependent: (1) t = 0, uncharged (V_C = 0): capacitor acts as a short circuit; I(0) = ε/R (maximum current). (2) t → ∞, fully charged (V_C = ε): capacitor acts as an open circuit; I(∞) = 0. (3) Transient (0 < t < ∞): V_C(t) = ε(1 − e^{−t/τ}), I(t) = (ε/R)e^{−t/τ}. The two extreme models are the initial condition and the final steady state of the same exponential process."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "t = 0, uncharged C: short circuit; I(0) = ε/R" | "t = 0: capacitor open; I(0) = 0" |
| "t → ∞: open circuit; I(∞) = 0; V_C = ε" | "Capacitor always blocks DC current at every instant" |
| "Transient: V_C grows from 0 to ε; I decays from ε/R to 0" | "No current flows at any time in a DC capacitor circuit" |
| "Open-circuit model is a limiting (steady-state) case, not an instantaneous property" | "Replace capacitor with open circuit to find I at any DC instant" |

**s6_path:** Draw the circuit at t = 0 (V_C = 0; replace C with a wire) and calculate I(0) = ε/R. Then draw the circuit at t → ∞ (I = 0; replace C with an open circuit) and confirm V_C = ε. Contrast both limiting models with the intermediate transient described by the exponential equations.

---

## Component 4 — Assessment Probes

### Set A — Retrieval / Recognition (Bloom: Remember)

**A-1:** Write the formula for the time constant. What are its SI units? If R = 4 kΩ and C = 500 μF, calculate τ.

**Answer key:**
τ = RC; units: seconds (Ω × F = s).
τ = (4×10³)(500×10⁻⁶) = **2.0 s**

---

**A-2:** Complete each blank: "At t = 0 with an uncharged capacitor, the capacitor acts as a ___, and the current is ___. At t → ∞, the capacitor acts as a ___, and the current is ___."

**Answer key:**
Short circuit (wire); ε/R (maximum). Open circuit; 0.

---

**A-3:** Write the charging equations for V_C(t) and I(t) from memory. At t = τ, what percentage of the final EMF has V_C reached? After how many time constants is a capacitor considered fully charged?

**Answer key:**
V_C(t) = ε(1 − e^{−t/τ}); I(t) = (ε/R)e^{−t/τ}.
At t = τ: 63.2% of ε. Fully charged after 5τ (within 0.67% of ε).

---

### Set B — Application (Bloom: Apply)

**B-1:** A 20 μF capacitor charges to ε = 15 V through R = 3 kΩ. Find: (a) τ; (b) V_C at t = 2τ; (c) I at t = 0; (d) the time (in terms of τ) at which I equals half its initial value.

**Answer key:**
(a) τ = (3×10³)(20×10⁻⁶) = **60 ms**
(b) V_C(2τ) = 15(1 − e⁻²) = 15 × 0.865 = **12.97 V**
(c) I(0) = 15/3 000 = **5.0 mA**
(d) I = 2.5 mA when e^{−t/τ} = 0.5 → t = τ ln 2 ≈ **0.693τ** ≈ 41.6 ms

---

**B-2:** A charged capacitor (C = 10 μF, V₀ = 30 V) discharges through R = 2 kΩ. Find: (a) τ; (b) V_C after 3τ; (c) the time for V_C to fall to 10% of V₀.

**Answer key:**
(a) τ = (2×10³)(10×10⁻⁶) = **20 ms**
(b) V_C(3τ) = 30 e⁻³ = 30 × 0.0498 = **1.49 V**
(c) 3 = 30 e^{−t/0.02} → e^{−t/0.02} = 0.1 → t = 0.02 ln 10 = **46.1 ms** (≈ 2.30τ)

---

### Set C — Analysis / Synthesis (Bloom: Analyze)

**C-1 (Energy analysis):** A 100 μF capacitor charges to ε = 50 V via R₁ = 1 kΩ. (a) Energy from battery? (b) Energy stored? (c) The experiment is repeated with R₂ = 10 kΩ (same C, same ε). How do the stored and dissipated energies change?

**Answer key:**
(a) W_battery = Cε² = (100×10⁻⁶)(50²) = **0.25 J**
(b) U_C = ½Cε² = **0.125 J**
(c) Stored energy = ½Cε² = **0.125 J** (same; depends only on C and ε, not R). Dissipated energy = **0.125 J** (same). The 50/50 split is R-independent; only the charging duration changes.

---

**C-2 (Inverse problem):** An oscilloscope displays a rising voltage that reaches 63.2% of 9 V at t = 0.50 s, then remains constant. (a) What circuit produces this curve? (b) What is τ? (c) If C = 100 μF, find R. (d) Describe the shape of the current-through-R curve.

**Answer key:**
(a) RC charging circuit (series RC with ε = 9 V, uncharged capacitor, switch closed at t = 0)
(b) 63.2% of ε at t = τ → **τ = 0.50 s**
(c) R = τ/C = 0.50/(100×10⁻⁶) = **5.0 kΩ**
(d) I(t) = (9/5 000)e^{−t/0.50} = 1.8 mA × e^{−2t}: exponential decay starting at 1.8 mA, falling to 0 with the same τ = 0.50 s. The current curve is the mirror image (in terms of rise vs. decay) of the voltage curve.

---

## Component 5 — Retrieval Schedule

| Event | Interval | Protocol codes | Activity |
|---|---|---|---|
| R-1 | +1 day | P62: retrieval-seed | From memory: write τ = RC; state V_C(t) and I(t) for charging and discharging; state the two boundary conditions; compute τ for a given R, C pair |
| R-2 | +3 days | P36: mastery-probe | Apply: solve a fresh charging or discharging problem — find V_C at a specified time, or solve for the time to reach a specified voltage (requires inverting the exponential with natural log) |
| R-3 | +7 days | P36: mastery-probe + P91: mastery-gate | Analyse: energy bookkeeping for new C and ε values; confirm 50/50 split; gate: if score ≥ 0.80, mark R-3 complete and schedule R-4; if < 0.80, repeat R-2 style probe after targeted review |
| R-4 | +21 days | P62: retrieval-seed then P36: mastery-probe | Interleaved recall: state all equations from memory (no reference); then solve a combined problem — capacitor charges to V₁ through R₁ for time t₁, then discharges through R₂; requires applying the general formula V_C(t) = V_f + (V_i − V_f)e^{−t/τ} |

---

## Component 6 — Session Flow Script

```
[P01: session-open]
  State learning goal: "By the end of this session you will be able
  to apply τ = RC to predict V_C(t) and I(t) during charging and
  discharging, correctly apply both boundary conditions (t = 0 and
  t → ∞), and calculate the energy stored and dissipated when a
  capacitor charges through a resistor."

[P62: retrieval-seed]
  "What is capacitance? State Q = CV. Now state Kirchhoff's Voltage
  Law for a closed loop. Can you write KVL for a loop containing
  a battery ε, a resistor R, and a capacitor C?"
  → If fluent on both prerequisites: proceed to Tier 2.
  → If shaky on KVL or Q = CV: spend one TA reviewing
    phys.em.kirchhoffs-laws (KVL loop equation) and
    phys.em.capacitance (Q = CV, C = ε₀A/d) before continuing.

[P41: diagnostic]
  "When you close the switch in an RC circuit at t = 0,
  what is the current? What is the voltage across C?"
  → Listen for MC-CAPACITOR-ACTS-AS-OPEN-CIRCUIT-ALWAYS
    (student says I = 0 or V_C = ε at t = 0).
  → Listen for MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R
    (student predicts larger R → faster charging).
  → Record which misconceptions are active before proceeding.

[P06: concrete-anchor]
  "Camera flash: C ~ 1 000 μF charges from a 1.5 V AA cell
  through R ~ 10 kΩ → τ = RC = 10 s. Slow charging over seconds.
  The shutter button connects the flash tube (R_lamp ~ 0.1 Ω) →
  τ = RC = 100 μs. The entire stored energy dumps in a flash.
  Same capacitor, same charge, two wildly different time constants
  set by R. Larger R → larger τ."

[P51: check-in]
  "Before we derive the equations, any questions about what
  happens physically when a capacitor charges through a resistor?"

[P28: conflict-evidence] — MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R
  "Suppose larger R really did mean faster charging. Take R → ∞.
  What happens? With an open circuit, no current can flow at all.
  The capacitor never charges. So larger R cannot mean faster.
  Formula: τ = RC. Larger R → larger τ → slower."

[P30: bridge-text] — MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R
  "Resistance is a bottleneck for charge flow. Bigger bottleneck →
  slower charge accumulation → longer time to reach full voltage.
  τ = RC: both the bottleneck size and the tank capacity set the
  fill time equally."

[P31: replacement-text] — MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R
  "Larger R → larger τ → slower charging. Larger C → larger τ →
  slower charging. To charge faster: use smaller R, smaller C,
  or both. I₀ = ε/R is larger with smaller R — which is exactly
  why smaller R charges faster."

[P33: discrimination-pairs] — MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R
  Drill the four valid/invalid pairs. Confirm student can
  distinguish "larger R → slower" from "larger R → larger I₀."

[P28: conflict-evidence] — MC-CAPACITOR-ACTS-AS-OPEN-CIRCUIT-ALWAYS
  "If the capacitor were open at t = 0, I = 0 and no charge
  could ever reach the plates — the capacitor would stay uncharged
  forever. Measure V across R at t = 0: it equals ε. So I(0) = ε/R,
  identical to what you would get if you replaced C with a wire."

[P30: bridge-text] — MC-CAPACITOR-ACTS-AS-OPEN-CIRCUIT-ALWAYS
  "At t = 0, V_C = 0: no back-EMF, all ε across R → short circuit.
  At t → ∞, V_C = ε: back-EMF cancels ε, I = 0 → open circuit.
  The capacitor transitions from short to open as it charges."

[P31: replacement-text] — MC-CAPACITOR-ACTS-AS-OPEN-CIRCUIT-ALWAYS
  "t = 0 (uncharged C): short circuit; I = ε/R. t → ∞: open circuit;
  I = 0, V_C = ε. Transient: V_C = ε(1 − e^{−t/τ}), I = (ε/R)e^{−t/τ}.
  'Capacitors block DC' describes the steady-state limit only."

[P33: discrimination-pairs] — MC-CAPACITOR-ACTS-AS-OPEN-CIRCUIT-ALWAYS
  Drill all four valid/invalid pairs. Confirm student can apply
  the correct boundary condition at t = 0 and t → ∞.

[P06: concrete-anchor] — WE-1 (Charging)
  Work through R = 10 kΩ, C = 100 μF, ε = 12 V step by step.
  τ = 1.0 s. V_C(τ) = 7.58 V = 63.2% of 12 V. I(0) = 1.2 mA.
  I(τ) = 0.44 mA. Mark the three time points on a sketch of
  the V_C(t) curve drawn on the board.

[P52: narrow]
  "In WE-1, why does the current decrease even though ε is constant?
  What is growing that opposes the current?"
  → Expected: V_C grows → net driving voltage = ε − V_C falls →
    I = (ε − V_C)/R falls. This is the physical meaning of the ODE.

[P06: concrete-anchor] — WE-2 (Discharging)
  Work through C = 200 μF, V₀ = 20 V, R = 5 kΩ.
  τ = 1.0 s. Set up 5 = 20 e^{−t} → t = ln 4 = 1.39 s.
  Emphasise the logarithm step: to find t, take ln of both sides.
  Sanity-check: 1.39 s is between τ and 2τ; 25% is between
  36.8% (at τ) and 13.5% (at 2τ). ✓

[P06: concrete-anchor] — WE-3 (Energy)
  Work through C = 50 μF, ε = 10 V, R = 2 kΩ.
  W_battery = 5.0 mJ. U_C = 2.5 mJ. W_R = 2.5 mJ.
  Write the integral proof. Cancel R. State the result:
  "Always 50/50, for any R."

[P52: narrow]
  "If R were doubled to 4 kΩ, what would W_R be?
  What if R were halved to 1 kΩ?"
  → Expected: still 2.5 mJ in both cases.
  → Follow up: "What does change when R changes?"
  → Expected: the time taken (τ changes), not the energy amounts.

[P36: mastery-probe]
  Administer Set B: B-1 (charging) and B-2 (discharging).
  Score against answer key.
  → ≥ 80%: proceed to P91.
  → 60–79%: identify the failing step (τ calculation, log inversion,
    or boundary condition); rework that step with a P52 narrowing
    question; offer one fresh item; re-score.
  → < 60%: return to Tier 2 from boundary conditions; redo WE-1
    with student driving the computation; re-probe.

[P51: check-in]
  "How are you finding the natural log step? Is it clear
  when to use it and how to set up the equation?"

[P91: mastery-gate]
  Threshold 0.80. If met: set retrieval schedule, close session.
  If not met: one more targeted cycle on the weakest sub-skill
  before closing.

[P85: regulation-tail]
  Note emotional regulation needs: frustration with exponentials
  is common. Reassure that τ = RC is the single key formula —
  the exponential form is always the same shape, only the numbers
  change. Normalise taking a moment to set up before calculating.

[P89: retrieval-schedule]
  Schedule R-1 (+1 day), R-2 (+3 days), R-3 (+7 days),
  R-4 (+21 days) per Component 5 protocol.

[P68: close]
  "Today: τ = RC governs every RC transient. Charging rises
  exponentially from 0 to ε; discharging decays from V₀ to 0 —
  both with the same τ. Boundary conditions: short at t = 0,
  open at t → ∞. Energy: always splits 50/50 between storage
  and dissipation, regardless of R. Retrieval probe in 24 hours."
```

---

## Component 7 — Adaptive Branching Table

| Observed signal | Branch target | Action |
|---|---|---|
| Student answers I(0) = 0 or V_C(0) = ε | MC-CAPACITOR-ACTS-AS-OPEN-CIRCUIT-ALWAYS active | Run [P28] → [P30] → [P31] → [P33] sequence for that MC; then re-administer the diagnostic before presenting WE-1 |
| Student predicts "larger R → faster charging" | MC-RC-TIME-CONSTANT-DEPENDS-ONLY-ON-R active | Run [P28] → [P30] → [P31] → [P33] sequence; then calculate τ explicitly for R = 1 kΩ, 10 kΩ, 100 kΩ with same C and compare |
| Student cannot write KVL or Q = CV | Prerequisite gap (phys.em.kirchhoffs-laws or phys.em.capacitance) | Pause RC circuit content; review the relevant prerequisite for one TA; then re-enter from [P62: retrieval-seed] |
| Student is fluent on Tier 1 and both prerequisites; no misconceptions detected | Accelerated path | Skip Tier 1 explanation; begin directly with WE-1; substitute Set C probes (C-1, C-2) for Set B as mastery probes |
| Student score on mastery probe 60–79% | Partial mastery | Use [P52: narrow] to isolate the failing sub-skill (τ calculation, exponential inversion, or energy bookkeeping); offer one fresh item on that sub-skill only |
| Student score on mastery probe < 60% | Re-teach | Return to Tier 2 from the boundary-condition section; slow down through the ODE derivation; redo WE-1 with student leading; re-probe with a fresh B-level item |
| Student asks "what about AC circuits or reactive impedance?" | Cross-link preview (phys.em.lc-circuits) | Briefly state: in AC circuits the capacitor's impedance is Z_C = 1/(jωC), which depends on frequency; this links to LC circuits and resonance. Defer full treatment to the phys.em.lc-circuits blueprint |
| Student asks "what if the capacitor is pre-charged to V_i ≠ 0?" | Extension — general solution | Present V_C(t) = V_f + (V_i − V_f)e^{−t/τ}; verify it reduces to charging when V_i = 0 and to discharging when V_f = 0; apply to a worked example with V_i = 5 V, V_f = 10 V |
| Student completes all Set C items with ≥ 95% | Mastery acceleration | Introduce Thevenin reduction: for any resistor network driving one capacitor, replace the network with (V_th, R_th); compute τ = R_th C and V_f = V_th; apply to a two-resistor voltage-divider driving a capacitor |

---

## Component 8 — Visualisation Spec

### Visual 1 — RC Charging Curve

**Type:** Line graph (voltage and current vs. time)
**Title:** RC Charging Transient: V_C(t) and I(t)
**X-axis:** Time, labelled in units of τ (tick marks at 0, τ, 2τ, 3τ, 4τ, 5τ)
**Y-axis (left):** V_C / ε (normalised to 1.0)
**Y-axis (right):** I / I₀ where I₀ = ε/R (normalised to 1.0), same scale as left axis for visual symmetry

**Required features:**
- Solid blue curve: V_C(t)/ε = 1 − e^{−t/τ}, rising from 0 to approach 1.0 asymptotically
- Solid red curve: I(t)/I₀ = e^{−t/τ}, decaying from 1.0 toward 0
- Dashed grey horizontal line at y = 1.0, labelled "ε (asymptote)"
- Dashed grey horizontal line at y = 0.632, labelled "63.2% of ε"
- Dashed grey vertical line at t = τ with label "t = τ = RC"
- Filled dot at intersection of τ-line and V_C curve, annotated: "V_C = 0.632ε"
- Filled dot at intersection of τ-line and I curve, annotated: "I = 0.368 I₀"
- Dashed grey vertical line at t = 5τ, labelled "5τ — fully charged (99.3%)"
- Legend: "V_C(t)/ε" (blue), "I(t)/I₀" (red)

**Pedagogical purpose:** Establishes the visual shape of the exponential approach to final value; anchors the 63.2% convention at one time constant; shows that voltage and current are complementary — as one rises the other falls — which physically grounds the ODE (net driving voltage = ε − V_C = IR).

---

### Visual 2 — RC Discharging Curve

**Type:** Line graph (voltage and current vs. time)
**Title:** RC Discharging Transient: V_C(t) and I(t)
**X-axis:** Time, labelled in units of τ (tick marks at 0, τ, 2τ, 3τ, 4τ, 5τ)
**Y-axis:** V_C / V₀ and I / I₀ (both normalised to 1.0 at t = 0)

**Required features:**
- Solid blue curve: V_C(t)/V₀ = e^{−t/τ}, falling from 1.0 toward 0
- Solid red curve: I(t)/I₀ = e^{−t/τ} (same shape; I₀ = V₀/R)
- Dashed grey horizontal line at y = 0.368, labelled "36.8% of V₀"
- Dashed grey vertical line at t = τ with label "t = τ = RC"
- Filled dot at (τ, 0.368) on voltage curve, annotated: "V_C = 0.368 V₀"
- Dashed grey vertical line at t = 5τ, labelled "5τ — fully discharged (0.67%)"
- Note box: "36.8% = e⁻¹ = 1 − 63.2%: complements the charging rule"

**Pedagogical purpose:** Shows the discharging curve as the mirror image of the charging curve (decay vs. rise); reinforces 36.8% as the complement of 63.2%; anchors the 5τ rule for full discharge.

---

### Visual 3 — Energy Allocation Bar Chart

**Type:** Static stacked bar chart
**Title:** Energy Allocation During RC Charging: Always 50/50
**X-axis:** Two bars — "R = R₁" and "R = 2R₁" (illustrating R-independence)
**Y-axis:** Energy (labelled in mJ, or as multiples of ½Cε²)

**Required features:**
- Each bar total height = Cε² (labelled "W_battery = Cε²")
- Lower half of each bar: solid blue, labelled "U_C stored = ½Cε²"
- Upper half of each bar: solid red (or orange), labelled "W_R dissipated = ½Cε²"
- Both bars identical in height and internal proportions (demonstrating R-independence)
- Annotation below both bars: "The 50/50 split holds for any value of R"
- Optional: arrow indicating "τ₂ = 2τ₁" to show that time changes even though energy split does not

**Pedagogical purpose:** Delivers the energy-bookkeeping result in a format where R-independence is immediately visual — the bars are identical regardless of R. Separates the concepts of "how fast" (τ, affected by R) and "how much dissipated" (always ½Cε², not affected by R).

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id = phys.em.rc-circuits matches KG entry | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty label = proficient, number = 4; bloom = apply | PASS |
| V-4 | Both prerequisites (phys.em.capacitance, phys.em.kirchhoffs-laws) present in physics KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 5 | PASS |
| V-7 | cpa_entry_stage = "C (anchor; difficulty 4 → C with accelerated P track)" | PASS |
| V-8 | session_cap = "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)" | PASS |
| V-9 | Component 1 has all three tiers (Concrete/Intuitive, Conceptual/Mechanistic, Formal) | PASS |
| V-10 | Component 2 has ≥ 3 worked examples (WE-1 charging, WE-2 discharging, WE-3 energy) | PASS |
| V-11 | Exactly 2 misconception profiles in Component 3 | PASS |
| V-12 | All 6 MC fields present for both misconceptions: trigger_signal, conflict_evidence [P28], bridge_text [P30], replacement_text [P31], discrimination_pairs [P33], s6_path | PASS |
| V-13 | Component 4 has Sets A (3 items), B (2 items), C (2 items) — 7 total assessment probes | PASS |
| V-14 | All required primitive codes appear and are used correctly: P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 | PASS |
| V-15 | Component 6 session flow script includes all 15 required primitive codes in sequence | PASS |
| V-16 | Component 5 retrieval schedule has ≥ 4 events; P62, P36, P91 codes all present | PASS |
| V-17 | Component 7 adaptive branching table covers ≥ 8 distinct signal → action branches | PASS |
| V-18 | Component 8 visualisation spec has ≥ 2 visuals (actually 3) with full type, axis, feature, and pedagogical-purpose specifications | PASS |
| V-19 | No production code, runtime, route, schema, or framework files modified | PASS |
| V-20 | status = READY | PASS |

**Overall status: READY**
