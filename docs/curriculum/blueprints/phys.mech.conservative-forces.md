# Teaching Blueprint — phys.mech.conservative-forces

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.conservative-forces
name: Conservative and Non-Conservative Forces
domain: mechanics
difficulty:
  label: advanced
  number: 5
bloom: analyze
prerequisites:
  - phys.mech.conservation-of-energy
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.mech.potential-energy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-PATH-INDEPENDENCE-HARD
- **Trigger signal:** Student says "gravity does more work when you fall a longer path (e.g., along a ramp vs. vertically)" or confuses path length with work done by a conservative force.
- **Conflict evidence [P28]:** "A 1 kg block moves from point A (height 2 m) to point B (height 0 m) via two paths: (1) vertical drop of 2 m, (2) frictionless ramp of length 4 m. Path 1: W_gravity = mgh = 1×9.8×2 = 19.6 J. Path 2: force along ramp = mg sinθ, distance = 4 m, θ = 30° → W = mg sinθ × d = 9.8 × 0.5 × 4 = 19.6 J. Same work. The gravitational force is conservative: work depends only on height difference, not path length or shape."
- **Bridge text [P30]:** "A force is conservative if the work it does depends only on the start and end positions, not on the path taken between them. This is equivalent to saying: the work done around any closed loop is zero. Gravity, spring force, and electric force are conservative. Friction is not — a longer path means more friction work."
- **Replacement text [P31]:** "For a conservative force: W_A→B = −ΔU = U_A − U_B (path-independent). For a non-conservative force (friction, air drag): W depends on path length and cannot be expressed as ΔU. Mechanical energy is conserved only when all forces are conservative."
- **Discrimination pairs [P33]:**
  - Gravity: W = mgh regardless of path ✓ (conservative)
  - Kinetic friction: W = −μmgd (depends on distance d; different paths → different W) ✓ (non-conservative)
- **s6_path:** "Path independence feels abstract. Think of it as: gravity doesn't care HOW you got to the ground, only WHERE you started and ended. Friction cares intensely about the path — more sliding = more heat."

---

### MC-FRICTION-HAS-PE
- **Trigger signal:** Student tries to write "friction potential energy" or expects friction work to be stored and recoverable.
- **Conflict evidence [P28]:** "Friction converts kinetic energy to thermal energy (heat). Once converted, this energy cannot be recovered as kinetic energy by releasing a 'friction PE'. Try sliding a block along a rough floor — the floor warms up slightly. If friction had a PE, you could cool the floor and get the energy back. This is impossible (2nd Law of Thermodynamics). Friction energy is dissipated, not stored."
- **Bridge text [P30]:** "Potential energy is defined only for conservative forces — forces for which a PE function exists such that F = −dU/dx. Friction has no such function. Non-conservative forces convert mechanical energy to thermal energy, sound, or deformation — none of which are recoverable as KE or PE in a mechanical system."
- **Replacement text [P31]:** "Only conservative forces have associated PE. Friction, air drag, and tension in a non-ideal string are non-conservative — they dissipate mechanical energy. The work-energy theorem with non-conservative forces: W_nc = ΔKE + ΔPE = ΔE_mech."
- **Discrimination pairs [P33]:**
  - Gravity: F = −dU/dr (has PE = mgh) ✓
  - Spring: F = −dU/dx = −kx (has PE = ½kx²) ✓
  - Friction: F = −μmg (constant opposing motion) — no PE function exists ✓
- **s6_path:** "Potential energy is like a rechargeable battery — you put energy in (against the force), and you get it back out when the force acts. Friction is a one-way valve — energy only flows out, never back in."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Energy conservation (mechanical)**
Prompt: "A ball is released from height h on a frictionless ramp. Write the energy conservation equation. What is the speed at the bottom?"
- Pass: mgh = ½mv² → v = √(2gh); mechanical energy conserved because only gravity (conservative) acts.
- Fail → [P52]: "Conservative forces are defined by being the only forces for which mechanical energy is conserved. Let's confirm the energy conservation framework first." → Route to phys.mech.conservation-of-energy.

**PD-2 [P41] — Work by friction (qualitative)**
Prompt: "A block slides 3 m along a rough floor with friction force 5 N. How much work does friction do? What happens to that energy?"
- Pass: W_friction = −15 J (negative; opposes motion); energy converts to heat (dissipated, not stored).
- Fail → [P52]: "Work = F·d (signed). Friction does negative work and dissipates energy as heat. This is why friction is non-conservative." Brief explanation, then proceed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — two routes up a hill**

> You carry a 10 kg backpack from valley (h = 0) to mountaintop (h = 100 m). Route A: straight up a cliff (steep, short). Route B: winding path (gentle, long). How much work does gravity do on you? Does it depend on which route you take?

Gravity does exactly the same negative work (W = −mgh = −9800 J) on both routes. The gravitational PE gained is the same regardless of path. But friction? Route B (winding, long) has far more friction work — your legs do more work against friction, and you generate more heat. This single scene demonstrates: gravity is conservative; friction (or leg-muscle dissipation) is not.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Defining Conservative Forces [C]**

A force F is conservative if:
1. **Path independence**: W_A→B is the same for all paths from A to B.
2. **Closed loop**: W around any closed path = 0.
3. **Potential energy function**: a function U(r) exists such that F = −∇U.

All three definitions are equivalent.

Examples:
- Conservative: gravity (F = −mg ĵ → U = mgy), spring force (F = −kx → U = ½kx²), electric force (F = kq₁q₂/r² → U = kq₁q₂/r).
- Non-conservative: kinetic friction, air drag, tension in a rope with sliding knot, magnetic force on moving charge.

**TA-2 — Work-Energy Theorem Extended [C→P]**

With both conservative (C) and non-conservative (NC) forces:
```
W_total = W_C + W_NC = ΔKE

W_C = −ΔU   (by definition of PE)

W_NC = ΔKE + ΔU = Δ(KE + U) = ΔE_mech
```

The work done by non-conservative forces equals the change in total mechanical energy:
- W_NC < 0 (friction, drag): mechanical energy decreases (energy lost to heat).
- W_NC > 0 (engine, muscle): mechanical energy increases (external source adds energy).
- W_NC = 0 (no non-conservative forces): E_mech = constant (conservation of energy).

**TA-3 — Identifying Conservative vs. Non-Conservative in Problems [C→P]**

Decision tree:
1. List all forces on the object.
2. For each force, ask: does it have an associated PE? (Yes → conservative; No → non-conservative.)
3. Write: E_mech_f = E_mech_i + W_NC.

Standard identifications:
- Normal force: does zero work (⊥ to motion) → neither category, but always W = 0.
- Tension in ideal string: does zero net work on the system (string transmits force, adds no energy).
- Applied force: usually non-conservative (external input).
- Friction: always non-conservative.

**TA-4 — Potential Energy Functions and Force Derivation [P]**

For a conservative force in 1D, F = −dU/dx. Reversing: given U(x), find F(x).

Examples:
- U = mgy → F = −d(mgy)/dy = −mg (weight, downward ✓)
- U = ½kx² → F = −d(½kx²)/dx = −kx (Hooke's law ✓)
- U = −GMm/r → F = −d(−GMm/r)/dr = −GMm/r² (gravity, inward ✓)

In 3D: F = −∇U = −(∂U/∂x, ∂U/∂y, ∂U/∂z).

**TA-5 — Energy Diagrams and Equilibrium [P]**

A plot of U(x) vs. x reveals:
- Minima of U(x): stable equilibrium (F = −dU/dx = 0; small displacement → restoring force pushes back)
- Maxima of U(x): unstable equilibrium (small displacement → force pushes away)
- Total energy E = KE + U → KE = E − U → turning points where KE = 0 (U = E)

Example: a particle in U(x) = x² − x⁴. Stable minima at x = ±1/√2; unstable maximum at x = 0; particle oscillates between turning points if E < U_max.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — path independence check)**

> A 2 kg block moves from (0, 0) to (3, 4) under gravity (a) via straight-line path, (b) via horizontal then vertical segments. Calculate W_gravity for each path. (Take up as positive y.)

```
W_gravity = −mg × Δy = −2 × 9.8 × 4 = −78.4 J for BOTH paths (only vertical displacement matters).
```

**WE-2 (Intermediate — W_NC with friction)**

> A 3 kg block slides 5 m up a frictionless ramp (height gain 3 m) then 2 m along a rough horizontal floor (μ_k = 0.3). Find its final KE if initial KE = 150 J.

```
W_NC = W_friction = −μmg × 2 = −0.3 × 3 × 9.8 × 2 = −17.64 J

ΔE_mech = W_NC:
KE_f + U_f = KE_i + U_i + W_NC
KE_f + mgh = KE_i + 0 + W_NC
KE_f = 150 − 3×9.8×3 − 17.64 = 150 − 88.2 − 17.64 = 44.16 J
```

**WE-3 (Advanced — F from U)**

> A particle has PE U(x) = 3x² − x³ (in SI units). Find: (a) the force at x = 2 m, (b) equilibrium positions, (c) which are stable.

```
(a) F = −dU/dx = −(6x − 3x²) = 3x² − 6x
    At x = 2: F = 3(4) − 6(2) = 12 − 12 = 0 N (x=2 is equilibrium)

(b) Equilibria: F = 0 → 3x(x − 2) = 0 → x = 0 or x = 2

(c) d²U/dx² = 6 − 6x
    At x = 0: d²U/dx² = 6 > 0 → minimum → stable equilibrium
    At x = 2: d²U/dx² = 6 − 12 = −6 < 0 → maximum → unstable equilibrium
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Classify the force**
"Classify each as conservative or non-conservative: (a) gravity, (b) air drag, (c) spring force, (d) normal force, (e) kinetic friction. For each conservative force, name its associated PE."

*Target:* (a) conservative (U = mgh); (b) non-conservative; (c) conservative (U = ½kx²); (d) W = 0, not classified; (e) non-conservative.

**MP-2 [P36] — Path independence proof**
"A 5 kg object moves along path 1 (length 10 m) against a 20 N friction force, then along path 2 (length 3 m, same friction). Compare W_friction. Now repeat for gravity: path 1 has height gain 4 m, path 2 also has height gain 4 m. Compare W_gravity."

*Target:* Friction: W₁ = −200 J, W₂ = −60 J (different — path-dependent). Gravity: W₁ = W₂ = −5×9.8×4 = −196 J (same — path-independent).

**MP-3 [P36] — W_NC applied**
"A 4 kg block starts at rest at height 5 m on a ramp. It reaches the bottom with speed 7 m/s. How much energy was lost to friction?"

*Target:* E_mech_i = mgh = 196 J; E_mech_f = ½mv² = ½×4×49 = 98 J; W_NC = 98 − 196 = −98 J (98 J lost to friction).

**MP-4 [P36] — Force from PE**
"U(x) = 4x³ − 12x (J, with x in m). Find (a) F at x = 1 m, (b) equilibrium positions."

*Target:* F = −dU/dx = −(12x² − 12) = 12 − 12x². (a) F(1) = 12 − 12 = 0 (equilibrium). (b) F = 0 → 12x² = 12 → x = ±1 m.

**MP-5 [P36] — Synthesis: energy diagram**
"A particle has U(x) = x² − 4x + 3 (J). Total energy E = 1 J. (a) Find the equilibrium position. (b) Find the turning points. (c) Is the equilibrium stable?"

*Target:* (a) F = −dU/dx = −(2x−4) = 0 → x = 2; U(2) = 4−8+3 = −1 J. (b) Turning points: U(x) = E = 1 → x²−4x+3=1 → x²−4x+2=0 → x = 2±√2 ≈ 0.59 m and 3.41 m. (c) d²U/dx² = 2 > 0 → stable minimum.

---

## Component 7 — Session Architecture

```
[P01] Session open — two-routes-up-the-hill provocation
  ↓
[P41] PD-1 (mechanical energy conservation) + PD-2 (friction work)
  ↓ PASS both
[P06] Anchor: gravity same work both routes; friction different → conservative vs. not
  ↓
TA-1: Three equivalent definitions of conservative force [C]
  ↓
TA-2: W_NC = ΔE_mech — generalised work-energy theorem [C→P]
  ↓
[P28] Conflict: "Friction has PE that can be released" → MC-FRICTION-HAS-PE
  ↓
TA-3: Decision tree for classifying forces in problems [C→P]
  ↓
WE-1: Path independence verification (gravity)
  ↓
[P51] Check-in MP-1 (classify 5 forces)
  ↓ monitor
WE-2 → WE-3 (W_NC with friction; F from U)
  ↓
TA-4: PE functions and force derivation [P]
  ↓
TA-5: Energy diagrams; stable vs. unstable equilibrium [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Name a conservative force. How do you recover the force from its PE function?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA; build each definition of conservative force one at a time with a concrete example for each; S1: treats all PE as stored energy regardless of force type → MC-FRICTION-HAS-PE; S4: PD-1 fail → conservation-of-energy; S6: [F] — "One decision: does this force have a PE? Yes → conservative; No → it dissipates energy"; S7: open with WE-3 (force from U derivation and stability analysis — requires calculus thinking that over-confident students often skip).

---

## Component 8 — Adaptive Flags

- **Bloom level — analyze**: this is a level-5 concept. Mastery requires students to decompose problems (identify all forces, classify each, write the correct energy equation) before calculating. The decision-tree TA-3 directly supports this decomposition skill.
- **Normal force W = 0**: the normal force is perpendicular to motion so does zero work — it doesn't belong to either category. State this explicitly to prevent students from trying to find its PE.
- **Calculus in TA-4/TA-5**: F = −dU/dx requires differentiation. If the student hasn't reached calculus, present TA-4/TA-5 qualitatively (slope of U(x) graph is −F) rather than analytically.
- **3D gradient**: mention F = −∇U exists but stay in 1D for all calculations at this level.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.conservative-forces |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.conservation-of-energy ✓ |
| V-3 | difficulty label matches KG | PASS — advanced (5) |
| V-4 | bloom level matches KG | PASS — analyze |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-PATH-INDEPENDENCE-HARD, MC-FRICTION-HAS-PE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (conservation-of-energy), PD-2 (friction work) |
| V-10 | Concrete anchor present [P06] | PASS — two routes up the hill |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 5) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — bloom-analyze decomposition, normal force W=0, calculus caveat, 3D gradient note |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
