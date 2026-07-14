# Teaching Blueprint — phys.mech.collisions-elastic

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.collisions-elastic
name: Elastic Collisions
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.conservation-of-momentum
  - phys.mech.kinetic-energy
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.mech.collisions-inelastic
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-ALL-COLLISIONS-ELASTIC
- **Trigger signal:** Student applies KE conservation to all collisions, or assumes a bouncing ball is an elastic collision.
- **Conflict evidence [P28]:** "A billiard ball collision is approximately elastic (hard, rigid spheres). A rubber ball bouncing off a floor loses ~20–30% of KE to heat/deformation — partially inelastic. A clay lump sticking to a wall loses all relative KE — perfectly inelastic. True elastic collisions require no permanent deformation and no heat generation. In practice, atomic and subatomic collisions (e.g., gas molecules, neutron scattering) are elastic; everyday macroscopic collisions are not. Before writing ½m₁v₁² + ½m₂v₂² = ½m₁v₁ₓ² + ½m₂v₂ₓ², check: is KE actually conserved?"
- **Bridge text [P30]:** "The two conditions for an elastic collision are: (1) total momentum conserved, AND (2) total KE conserved. Condition (1) always holds in an isolated system. Condition (2) is an additional requirement that is only true for elastic collisions. Always identify the collision type before choosing equations."
- **Replacement text [P31]:** "Elastic: use both p-conservation AND KE-conservation. Inelastic: use only p-conservation (KE not conserved; some is lost to heat/deformation). Identify type first — it's stated in the problem or inferred from context (billiard ball = approximately elastic; clay/car crash = inelastic)."
- **Discrimination pairs [P33]:**
  - Steel ball hits steel wall and rebounds at same speed: approximately elastic (KE ≈ conserved) ✓
  - Ball of clay hits wall and sticks: perfectly inelastic (all KE lost) ✗ (cannot use KE conservation)
- **s6_path:** "'Elastic' in physics doesn't mean 'made of rubber' — rubber is actually NOT elastic in this sense. It means KE is conserved. Billiard balls and gas molecules are the classic elastic examples."

---

### MC-ELASTIC-EQUAL-MASSES-BOTH-STOP
- **Trigger signal:** Student says "in an equal-mass elastic collision, both balls stop" or confuses the stationary result with a head-on case.
- **Conflict evidence [P28]:** "In a 1D head-on elastic collision between equal masses where ball 2 is initially at rest: v₁f = 0, v₂f = v₁ᵢ — ball 1 stops and ball 2 moves at ball 1's original speed. Not both stop; only ball 1 stops. This is the billiard ball result (the cue ball stops; the target ball moves). If both had stopped, momentum would be zero but initial momentum was m × v₁ᵢ ≠ 0 — impossible."
- **Bridge text [P30]:** "Use the elastic-collision formulas to verify: v₁f = (m₁−m₂)/(m₁+m₂) × v₁ᵢ. For m₁ = m₂: v₁f = 0. v₂f = 2m₁/(m₁+m₂) × v₁ᵢ = v₁ᵢ. Ball 1 stops; ball 2 moves at ball 1's initial speed — total p and KE both conserved."
- **Replacement text [P31]:** "Equal-mass 1D elastic (ball 2 initially at rest): velocities exchange. Ball 1 stops; ball 2 takes ball 1's velocity. For unequal masses: v₁f = (m₁−m₂)/(m₁+m₂) × v₁ᵢ; v₂f = 2m₁/(m₁+m₂) × v₁ᵢ."
- **Discrimination pairs [P33]:**
  - m₁ = m₂, ball 2 at rest: v₁f = 0, v₂f = v₁ᵢ (exchange) ✓
  - m₁ ≫ m₂ (heavy hits light): v₁f ≈ v₁ᵢ (barely slows), v₂f ≈ 2v₁ᵢ (light ball bounces away fast) ✓
  - m₁ ≪ m₂ (light hits heavy): v₁f ≈ −v₁ᵢ (bounces back), v₂f ≈ 0 (heavy barely moves) ✓
- **s6_path:** "The velocity-exchange result for equal masses is one of the most elegant in mechanics. Try it with Newton's cradle — pull one ball and watch exactly one ball swing out the other side."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Momentum conservation**
Prompt: "Two carts on a frictionless track (m₁ = 2 kg, v₁ = 5 m/s; m₂ = 3 kg, v₂ = 0) collide and stick. Find the final velocity."
- Pass: p_total = 2×5 = 10 kg·m/s; v_f = 10/(2+3) = 2 m/s.
- Fail → [P52]: "Elastic collisions use momentum conservation as their first equation. Let's confirm p = Σmv = constant before adding the KE condition." → Route to phys.mech.conservation-of-momentum.

**PD-2 [P41] — Kinetic energy**
Prompt: "A 3 kg ball moves at 4 m/s. Calculate its KE. If it doubles speed, what is the new KE ratio?"
- Pass: KE = ½×3×16 = 24 J; doubling speed → 4× KE (v² relationship).
- Fail → [P52]: "Elastic collisions require KE conservation. KE = ½mv² — let's confirm this is solid." → Route to phys.mech.kinetic-energy.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — Newton's cradle**

> A Newton's cradle has 5 identical steel balls. Pull one ball back and release — exactly one ball swings out the other side. Pull two — exactly two swing out. Why not all five move slowly? Why not three move out when you pull one?

This is the elastic equal-mass result in action: velocity exchange between equal masses. Momentum alone would allow 3 balls moving at 1/3 speed, or 5 balls moving at 1/5 speed — but KE conservation selects the unique solution: exactly one ball moves at the original speed.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Two Conservation Laws for Elastic Collisions [C]**

For an elastic 1D collision (two objects, initial velocities u₁, u₂; final velocities v₁, v₂):

```
Momentum:  m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂        ... (1)
KE:        ½m₁u₁² + ½m₂u₂² = ½m₁v₁² + ½m₂v₂²  ... (2)
```

Two equations, two unknowns (v₁ and v₂). The system is fully determined.

**TA-2 — Closed-Form Solutions [C→P]**

Solving (1) and (2) simultaneously (algebraic manipulation using difference of squares):

```
v₁ = (m₁ − m₂)/(m₁ + m₂) × u₁ + 2m₂/(m₁ + m₂) × u₂
v₂ = 2m₁/(m₁ + m₂) × u₁ + (m₂ − m₁)/(m₁ + m₂) × u₂
```

Special cases (u₂ = 0 — target at rest):
```
v₁ = (m₁ − m₂)/(m₁ + m₂) × u₁
v₂ = 2m₁/(m₁ + m₂) × u₁
```

Limiting cases table:

| Case | v₁ | v₂ |
|---|---|---|
| m₁ = m₂ | 0 | u₁ (velocity exchange) |
| m₁ ≫ m₂ | ≈ u₁ | ≈ 2u₁ |
| m₁ ≪ m₂ | ≈ −u₁ | ≈ 0 |

**TA-3 — Relative Velocity Reversal [C→P]**

An elegant result from elastic collision algebra:
```
u₁ − u₂ = −(v₁ − v₂)
```

The relative velocity of approach equals the relative velocity of separation (opposite sign). This is equivalent to the KE conservation condition and provides a simpler check: after solving, verify that relative speeds are equal before and after.

Example: ball 1 approaches at 10 m/s, ball 2 at 2 m/s. Relative approach speed = 8 m/s. After elastic collision, relative separation speed must also be 8 m/s — whichever direction.

**TA-4 — Coefficient of Restitution [P]**

The coefficient of restitution e links elastic and inelastic collisions:
```
e = (v₂ − v₁)/(u₁ − u₂) = relative separation speed / relative approach speed
```

- Perfectly elastic: e = 1 (relative velocity reverses; no KE lost)
- Perfectly inelastic: e = 0 (objects stick; relative velocity = 0 after collision)
- Partially inelastic: 0 < e < 1 (some KE lost; intermediate bounce)

The fraction of KE lost: ΔKE/KE_initial depends on both e and the mass ratio. For a ball dropped from height h and bouncing to height h':
```
e = √(h'/h)
```

**TA-5 — 2D Elastic Collisions (Billiard Ball Geometry) [P]**

In 2D (billiard ball), an elastic collision between a moving ball and a stationary ball of equal mass produces a 90° angle between the two post-collision paths. This is a geometric consequence of:
- Momentum conservation (vector)
- KE conservation
- Equal mass

Proof: the momentum triangle (vector addition) has the same magnitude before (|p₁ᵢ|²) and after (|p₁f|² + |p₂f|²). By Pythagoras, the angle between v₁f and v₂f is 90°.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — equal masses)**

> Ball 1 (2 kg, 6 m/s) hits ball 2 (2 kg, 0 m/s) elastically. Find v₁f and v₂f.

```
v₁f = (2−2)/(2+2) × 6 = 0 m/s
v₂f = 2×2/(2+2) × 6 = 6 m/s
Verify: p before = 12; p after = 12 ✓; KE before = 36 J; KE after = 36 J ✓
```

**WE-2 (Intermediate — unequal masses)**

> Ball 1 (3 kg, 8 m/s) hits ball 2 (1 kg, −2 m/s) elastically. Find v₁f and v₂f.

```
v₁f = (3−1)/(3+1) × 8 + 2×1/(3+1) × (−2) = (1/2)×8 + (1/2)×(−2) = 4 − 1 = 3 m/s
v₂f = 2×3/(3+1) × 8 + (1−3)/(3+1) × (−2) = (3/2)×8 + (−1/2)×(−2) = 12 + 1 = 13 m/s

Verify relative velocity: approach = 8−(−2) = 10 m/s; separation = 13−3 = 10 m/s ✓
```

**WE-3 (Misconception-targeted — coefficient of restitution)**

> A rubber ball is dropped from 2 m and bounces to 1.44 m. Calculate e. Is this elastic? How much KE is lost if the ball has mass 0.2 kg?

```
e = √(1.44/2) = √0.72 ≈ 0.849  (partially inelastic; not fully elastic)

v_before_impact = √(2g × 2) = √39.2 ≈ 6.26 m/s
v_after_impact = √(2g × 1.44) = √28.22 ≈ 5.31 m/s

KE_before = ½ × 0.2 × 39.2 = 3.92 J
KE_after = ½ × 0.2 × 28.22 = 2.82 J
ΔKE = 3.92 − 2.82 = 1.10 J lost (28% of KE)
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Limiting case: heavy hits light**
"A 10 kg block moving at 4 m/s hits a 0.1 kg ball at rest elastically. Predict qualitatively: what happens to each? Then calculate v₁f and v₂f."

*Target:* Heavy barely slows; light flies off fast. v₁f ≈ (10−0.1)/(10+0.1)×4 ≈ 3.96 m/s; v₂f ≈ 2×10/10.1×4 ≈ 7.92 m/s ≈ 2×4 m/s ✓.

**MP-2 [P36] — Relative velocity check**
"In an elastic collision, ball 1 (4 kg, 5 m/s) hits ball 2 (2 kg, −1 m/s). Calculate v₁f and v₂f, then verify using relative velocity reversal."

*Target:* v₁f = (4−2)/6×5 + 2×2/6×(−1) = 10/3 − 4/6 = 20/6 − 4/6 = 16/6 ≈ 2.67 m/s; v₂f = 2×4/6×5 + (2−4)/6×(−1) = 40/6 + 2/6 = 42/6 = 7 m/s. Relative velocity check: approach = 5−(−1) = 6 m/s; separation = 7−2.67 = 4.33 — wait let me recalculate: v₁f = (m₁−m₂)u₁/(m₁+m₂) + 2m₂u₂/(m₁+m₂) = (2/6)×5 + (4/6)×(−1) = 10/6 − 4/6 = 6/6 = 1 m/s; v₂f = 2m₁u₁/(m₁+m₂) + (m₂−m₁)u₂/(m₁+m₂) = (8/6)×5 + (−2/6)×(−1) = 40/6 + 2/6 = 42/6 = 7 m/s. Relative velocity: approach = 5−(−1) = 6 m/s; separation = 7−1 = 6 m/s ✓.

**MP-3 [P36] — Newton's cradle analysis**
"Three identical balls in Newton's cradle, each mass m. Ball 1 moves at v, balls 2 and 3 at rest. Show that both momentum and KE conservation are satisfied only if ball 1 stops and ball 3 moves at v (not all three moving at v/3)."

*Target:* Option 3: p = mv ✓; KE = ½mv²/3 × 3 = ½mv²/3 ≠ ½mv² ✗. Option 1: p = mv ✓; KE = ½mv² ✓. KE conservation uniquely selects the velocity-exchange result.

**MP-4 [P36] — Coefficient of restitution**
"Two balls collide. Ball 1 (2 kg, 6 m/s) hits ball 2 (2 kg, 0 m/s). After: ball 1 at 1 m/s, ball 2 at 5 m/s. Find e. Is this elastic? How much KE was lost?"

*Target:* e = (5−1)/(6−0) = 4/6 ≈ 0.67 (partially inelastic). KE_before = ½×2×36 = 36 J; KE_after = ½×2×1 + ½×2×25 = 1 + 25 = 26 J; ΔKE = 10 J lost.

**MP-5 [P36] — 2D elastic (billiard)**
"Ball 1 (mass m, 6 m/s east) hits a stationary ball 2 (mass m) elastically. Ball 1 deflects 30° north of east. (a) Find the speed of ball 1 after. (b) Find ball 2's velocity. (c) What angle does ball 2 make with ball 1's final direction?"

*Target:* Equal mass 2D elastic → 90° between final paths. Ball 2 deflects 60° south of east (90° − 30°). Momentum conservation: p_x: mv₁f cos30° + mv₂f cos(−60°) = m×6; p_y: mv₁f sin30° − mv₂f sin60° = 0. From p_y: v₁f/v₂f = sin60°/sin30° = √3. From KE: v₁f² + v₂f² = 36. Solving: v₂f = 3 m/s, v₁f = 3√3 ≈ 5.20 m/s. Angle = 90° ✓.

---

## Component 7 — Session Architecture

```
[P01] Session open — Newton's cradle provocation
  ↓
[P41] PD-1 (momentum conservation) + PD-2 (kinetic energy)
  ↓ PASS both
[P06] Anchor: Newton's cradle → why not 3 balls slowly?
  ↓
TA-1: Two conservation laws; set up 2-equation system [C]
  ↓
TA-2: Closed-form solutions; limiting-case table [C→P]
  ↓
[P28] Conflict: "All collisions are elastic" → MC-ALL-COLLISIONS-ELASTIC
  ↓
WE-1: Equal-mass head-on (cue ball result)
  ↓
[P51] Check-in MP-3 (Newton's cradle — KE selects unique solution)
  ↓ monitor
TA-3: Relative velocity reversal (elegant check) [C→P]
  ↓
WE-2 → WE-3 (unequal masses; coefficient of restitution)
  ↓
TA-4: Coefficient of restitution; partial elasticity [P]
  ↓
TA-5: 2D billiard geometry; 90° result for equal masses [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "For equal-mass elastic collision with stationary target: what happens to each ball?"
[P68] Session close; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA; build limiting-case table row by row with a slider (vary m₂/m₁); S1: knows formulas but applies to all collisions → go deep on MC-ALL-COLLISIONS-ELASTIC; S4: PD-1 fail → conservation-of-momentum; PD-2 fail → kinetic-energy; S6: [F] — "Two equations, two unknowns — it's a simultaneous equation problem"; S7: open with 2D billiard MP-5; most overconfident students do not know the 90° rule.

---

## Component 8 — Adaptive Flags

- **Equation-choice discipline**: before any algebra, require students to write: "Collision type: [elastic / inelastic / perfectly inelastic]. Equations used: [momentum only / momentum + KE]." This prevents the universal application of KE conservation to all collisions.
- **WE-2 calculation check**: the relative velocity reversal (TA-3) provides a quick independent check of every elastic collision answer. Always verify: approach speed = separation speed.
- **2D TA-5**: the 90° result is memorable and exact for equal masses, but does NOT hold for unequal masses. State this boundary explicitly to prevent overgeneralisation.
- **Connection to collisions blueprint**: this concept is a specialisation of phys.mech.collisions (which introduced all three collision types). Students who have studied that blueprint will have seen the equal-mass elastic case already. Use it as a fast-path anchor for those students.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.collisions-elastic |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.conservation-of-momentum ✓, phys.mech.kinetic-energy ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-ALL-COLLISIONS-ELASTIC, MC-ELASTIC-EQUAL-MASSES-BOTH-STOP |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (conservation-of-momentum), PD-2 (kinetic-energy) |
| V-10 | Concrete anchor present [P06] | PASS — Newton's cradle |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — equation-choice discipline, relative velocity check, 90° boundary, collisions blueprint connection |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
