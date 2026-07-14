# Teaching Blueprint — phys.mech.hookes-law

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.hookes-law
name: Hooke's Law
domain: mechanics
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.mech.newtons-second-law
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.mech.potential-energy
  - phys.mech.stress-strain
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-HOOKES-ALWAYS-LINEAR
- **Trigger signal:** Student applies F = kx to any spring or elastic material without checking the limit of proportionality, or assumes springs always follow Hooke's Law.
- **Conflict evidence [P28]:** "Hooke's Law (F = kx) is valid only within the elastic limit — the range of extension where the material returns to its original shape when the force is removed. Stretch a spring too far and it deforms permanently (plastic deformation) — the spring constant k no longer applies. The F-x graph is linear up to the elastic limit, then curves. Hooke's Law is a linear approximation; all real materials have a finite elastic range."
- **Bridge text [P30]:** "Think of Hooke's Law as a model that works within a restricted domain — the elastic region. Within that region, F ∝ x is an excellent model. Beyond the elastic limit, the model breaks down and we need stress-strain analysis (phys.mech.stress-strain) for the material's full behaviour."
- **Replacement text [P31]:** "F = kx (Hooke's Law) is valid within the elastic limit only. Beyond it: permanent deformation, yield point, fracture. Always check that the problem states extension is within the elastic limit (or assume it unless told otherwise)."
- **Discrimination pairs [P33]:**
  - Extension x = 2 cm on a calibration spring: F = kx ✓ (within elastic limit)
  - Same spring stretched to x = 20 cm (past yield): F ≠ kx ✗ (Hooke's Law invalid)
- **s6_path:** "This isn't a failure of physics — it's knowing the limits of a model. Hooke's Law is brilliant within its range; outside it, a better model takes over."

---

### MC-KBIG-MEANS-MORE-EXTENSION
- **Trigger signal:** Student says "a stiffer spring (bigger k) stretches more for the same force" or inverts the k relationship.
- **Conflict evidence [P28]:** "F = kx → x = F/k. A larger k means less extension for the same force — a stiff spring (k = 10 000 N/m) stretches only 1 mm under 10 N; a soft spring (k = 100 N/m) stretches 100 mm under the same 10 N. The spring constant k is a measure of stiffness; higher k = harder to stretch."
- **Bridge text [P30]:** "Units of k: N/m — Newtons per metre. A large k means it takes many Newtons to produce each metre of extension — the spring resists deformation strongly. A small k means the spring stretches easily."
- **Replacement text [P31]:** "k = F/x: stiffness constant. Large k → stiff → small extension for a given force. Small k → soft → large extension. x = F/k — extension is inversely proportional to k."
- **Discrimination pairs [P33]:**
  - k = 50 N/m, F = 10 N: x = 0.2 m (soft spring, stretches a lot) ✓
  - k = 1000 N/m, F = 10 N: x = 0.01 m (stiff spring, barely moves) ✓
- **s6_path:** "Think of k as how much the spring 'fights back' per metre of stretch. A higher k = more fight = less stretch. It's x = F/k — k is in the denominator."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Newton's 2nd and equilibrium**
Prompt: "A spring hangs from a ceiling with a 0.5 kg mass attached. The mass is in equilibrium. What is the spring force? What is the direction?"
- Pass: F_spring = mg = 0.5 × 9.8 = 4.9 N upward (balances weight).
- Fail → [P52]: "When a mass hangs on a spring at rest, ΣF = 0: spring force upward = weight downward. This gives us the spring force from equilibrium before we apply Hooke's Law." → Route to phys.mech.newtons-second-law.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the hanging mass experiment**

> Hang a spring from a stand. Attach a 100 g mass → measure extension. Attach 200 g → measure. Attach 300 g → measure. Plot F (= mg) vs. extension x. The points lie on a straight line through the origin.

The slope of the line is k (spring constant). This is Hooke's Law: F = kx. The experiment reveals the linearity directly from data before any formula is introduced.

Extend: add more masses — identify the point where the line curves (elastic limit). Draw the full F-x graph showing the linear region and the non-linear region.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Hooke's Law Statement [C]**

For an elastic body (spring, wire, rubber band — within the elastic limit):
```
F = kx
```
where:
- F = restoring force (N) — the force the spring exerts, opposing the extension
- k = spring constant (N/m) — stiffness of the spring
- x = extension or compression from natural length (m)

Sign convention: the restoring force always opposes displacement. If the spring is stretched (x > 0), the restoring force is negative (toward natural length): F_spring = −kx.

**TA-2 — Spring PE and Energy Storage [C→P]**

The spring stores elastic potential energy:
```
U = ½kx²
```

Derivation: W_spring = ∫₀ˣ F dx = ∫₀ˣ kx dx = ½kx². This is exactly the work done on the spring (which equals PE stored).

Energy: start from rest at x₀, release. At x = 0 (natural length):
```
½kx₀² = ½mv²  →  v = x₀√(k/m)
```

**TA-3 — Spring Combinations [C→P]**

Springs in series (end-to-end):
```
1/k_eff = 1/k₁ + 1/k₂     (softer than either spring alone)
```
Both springs feel the same force; total extension = sum of individual extensions.

Springs in parallel (side by side, same extension):
```
k_eff = k₁ + k₂            (stiffer than either spring alone)
```
Force is shared; each spring extends the same amount.

Memory aid: in series (like electrical resistors in parallel): effective k < each individual k. In parallel: effective k > each individual k.

**TA-4 — Simple Harmonic Motion Preview [P]**

A mass m on a spring (frictionless): F_net = −kx = ma → a = −(k/m)x.

This is SHM: acceleration proportional to displacement, directed toward equilibrium.

Period: T = 2π√(m/k). Frequency: f = (1/2π)√(k/m).

Key observations (without full SHM derivation):
- Period increases with mass (heavier → slower)
- Period decreases with spring constant (stiffer → faster)
- Period independent of amplitude (within Hooke's Law region)

**TA-5 — Measuring k from Vertical Oscillation [P]**

Static method: hang mass m, measure extension x at equilibrium → k = mg/x.

Dynamic method: measure period T of oscillation → k = 4π²m/T².

Both methods give the same k — confirmation that Hooke's Law and SHM are consistent.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — finding k and extension)**

> A spring stretches 8 cm when a 400 g mass is hung from it. (a) Find k. (b) What extension would a 600 g mass produce?

```
(a) F = mg = 0.4 × 9.8 = 3.92 N; k = F/x = 3.92/0.08 = 49 N/m

(b) F₂ = 0.6 × 9.8 = 5.88 N; x₂ = F₂/k = 5.88/49 = 0.12 m = 12 cm
```

**WE-2 (Intermediate — elastic PE)**

> A spring with k = 200 N/m is compressed 15 cm. (a) What force is required? (b) How much PE is stored? (c) If a 0.5 kg mass is placed against the compressed end and the spring is released, what is the mass's speed when the spring reaches natural length?

```
(a) F = kx = 200 × 0.15 = 30 N

(b) U = ½kx² = ½ × 200 × 0.0225 = 2.25 J

(c) ½mv² = U → v = √(2U/m) = √(2 × 2.25/0.5) = √9 = 3 m/s
```

**WE-3 (Advanced — spring combination)**

> Two springs: k₁ = 300 N/m and k₂ = 200 N/m. Find the effective spring constant and extension under a 30 N load when connected (a) in series, (b) in parallel.

```
(a) Series: 1/k_eff = 1/300 + 1/200 = 2/600 + 3/600 = 5/600; k_eff = 120 N/m
    x = F/k_eff = 30/120 = 0.25 m

(b) Parallel: k_eff = 300 + 200 = 500 N/m
    x = 30/500 = 0.06 m
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Finding k experimentally**
"Data from a hanging-mass experiment: 100 g → 2 cm; 200 g → 4 cm; 300 g → 6 cm; 400 g → 8 cm. What is k? Is Hooke's Law obeyed? How do you know?"

*Target:* k = F/x = 0.1×9.8/0.02 = 49 N/m (constant across all data points — linear relationship confirmed). Hooke's Law obeyed: F/x = constant.

**MP-2 [P36] — Series vs parallel intuition**
"Two identical springs (k = 100 N/m each). Which configuration stretches more under 20 N: series or parallel? Calculate both extensions."

*Target:* Series: k_eff = 50 N/m, x = 0.4 m; Parallel: k_eff = 200 N/m, x = 0.1 m. Series stretches 4× more. Series = softer (less effective k).

**MP-3 [P36] — Energy conservation**
"A 0.2 kg block is placed on a horizontal spring (k = 500 N/m) compressed 10 cm. The surface is frictionless. Find the block's speed after release when the spring reaches natural length."

*Target:* ½kx² = ½mv² → v = x√(k/m) = 0.1×√(500/0.2) = 0.1×√2500 = 0.1×50 = 5 m/s.

**MP-4 [P36] — Elastic limit**
"A student applies forces to a spring and records: 5 N → 5 cm; 10 N → 10 cm; 15 N → 16 cm; 20 N → 22 cm. Has the elastic limit been reached? At what force?"

*Target:* k = 100 N/m for first two points. At 15 N: expected x = 15 cm, actual = 16 cm → deviates from Hooke's Law → elastic limit exceeded between 10 N and 15 N.

**MP-5 [P36] — SHM period**
"A 0.5 kg mass is attached to a spring with k = 200 N/m and set oscillating. (a) What is the period? (b) If the mass is doubled, how does the period change?"

*Target:* T = 2π√(m/k) = 2π√(0.5/200) = 2π√0.0025 = 2π×0.05 = 0.314 s. If m doubles: T ∝ √m → T increases by √2 ≈ 1.414 → new T ≈ 0.444 s.

---

## Component 7 — Session Architecture

```
[P01] Session open — hanging mass experiment setup
  ↓
[P41] PD-1 (Newton's 2nd; equilibrium: spring force = weight)
  ↓ PASS
[P06] Anchor: hang masses → plot F vs x → linear → slope = k
  ↓
TA-1: F = kx; sign convention; restoring force [C]
  ↓
TA-2: Elastic PE = ½kx²; energy release [C→P]
  ↓
[P28] Conflict: "bigger k → more stretch" → MC-KBIG-MEANS-MORE-EXTENSION
  ↓
WE-1: Find k; predict new extension
  ↓
[P51] Check-in MP-1 (find k from data; linearity check)
  ↓ monitor
TA-3: Series and parallel spring combinations [C→P]
  ↓
WE-2 → WE-3 (elastic PE; spring combinations)
  ↓
TA-4: SHM preview — T = 2π√(m/k) [P]
  ↓
TA-5: Static vs. dynamic measurement of k [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A spring k=400 N/m, compressed 5 cm. What is the PE stored?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — run the experiment (or virtual simulation) before stating the formula; S1: knows F=kx but not the elastic limit → MC-HOOKES-ALWAYS-LINEAR; S4: PD-1 fail → newtons-second-law; S6: [F] — "One formula, one condition: F=kx within the elastic limit. The rest is applying it"; S7: open with spring combination WE-3 or MP-2 (intuition vs. calculation mismatch on series/parallel).

---

## Component 8 — Adaptive Flags

- **Sign convention**: the restoring force F_spring = −kx opposes displacement. For a hanging mass at equilibrium, this is an internal detail: the spring pulls up (+kx upward), gravity pulls down (−mg). At equilibrium: kx = mg. The minus sign in F = −kx is for free-body dynamics; for energy, U = +½kx².
- **Units of k**: N/m. Some textbooks quote k in kN/m for stiff springs. Ensure consistent units before substituting.
- **SHM in TA-4**: this is a preview, not a full SHM treatment (which belongs in oscillations/waves). Give T = 2π√(m/k) as a result; don't derive from SHM differential equation at this level.
- **Elastic limit**: the concept of plastic deformation and the yield point belongs primarily in phys.mech.stress-strain. Here, mention the elastic limit exists and the law fails beyond it — stop there.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.hookes-law |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.newtons-second-law ✓ |
| V-3 | difficulty label matches KG | PASS — developing (3) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-HOOKES-ALWAYS-LINEAR, MC-KBIG-MEANS-MORE-EXTENSION |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (newtons-second-law; equilibrium) |
| V-10 | Concrete anchor present [P06] | PASS — hanging mass experiment / F-x graph |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with full CPA (difficulty 3) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — sign convention, units, SHM scope, elastic limit boundary |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
