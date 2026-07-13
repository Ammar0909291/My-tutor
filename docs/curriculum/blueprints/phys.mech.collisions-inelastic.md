# Teaching Blueprint — phys.mech.collisions-inelastic

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.collisions-inelastic
name: Inelastic Collisions
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.conservation-of-momentum
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.mech.collisions-elastic
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-MOMENTUM-LOST-INELASTIC
- **Trigger signal:** Student says "the car crumples, so momentum is lost in the crash" or expects a car crash to not conserve momentum.
- **Conflict evidence [P28]:** "Consider two cars: car 1 (1000 kg, 20 m/s east) hits stationary car 2 (1500 kg). Before: p = 1000 × 20 = 20 000 kg·m/s. After sticking: v_f = 20 000/2500 = 8 m/s. After: p = 2500 × 8 = 20 000 kg·m/s. Momentum is exactly conserved even though the cars crumpled severely and lost KE = ½×1000×400 − ½×2500×64 = 200 000 − 80 000 = 120 000 J. Crumpling converts KE to heat/deformation — it does not destroy momentum."
- **Bridge text [P30]:** "Momentum is conserved in any collision (elastic or inelastic) in an isolated system. What inelastic collisions lose is kinetic energy — not momentum. The two are completely independent quantities."
- **Replacement text [P31]:** "Momentum is conserved in ALL collisions if the system is isolated (no external net force). KE is conserved only in elastic collisions. Inelastic: p conserved, KE not. Perfectly inelastic (sticking): p conserved, KE loss is maximum."
- **Discrimination pairs [P33]:**
  - Elastic: p conserved ✓, KE conserved ✓
  - Inelastic: p conserved ✓, KE lost ✓ (to heat/deformation)
  - "Momentum lost in crash": WRONG — p is always conserved in isolated system ✗
- **s6_path:** "Crashes look chaotic, but momentum always balances. The crumple zone converts kinetic energy into deformation energy — it doesn't make momentum disappear."

---

### MC-PERFECTLY-INELASTIC-ZERO-VELOCITY
- **Trigger signal:** Student assumes objects stick and stop in a perfectly inelastic collision.
- **Conflict evidence [P28]:** "Two equal-mass objects: one at rest, one moving at 6 m/s. After sticking: v_f = (m×6 + m×0)/(2m) = 3 m/s. They do NOT stop — they move together at half the initial speed. Only if the two objects have equal and opposite momenta (same mass, same speed, opposite directions) will they stop. In most sticking collisions, the combined object continues moving."
- **Bridge text [P30]:** "The sticking condition means both objects move at the same final velocity: m₁u₁ + m₂u₂ = (m₁ + m₂)v_f. Solve for v_f — it is usually non-zero. Zero final velocity only when total initial momentum = 0."
- **Replacement text [P31]:** "Perfectly inelastic: v_f = (m₁u₁ + m₂u₂)/(m₁ + m₂). Objects move together at this velocity — which is zero only when m₁u₁ + m₂u₂ = 0 (equal and opposite momenta)."
- **Discrimination pairs [P33]:**
  - m₁u₁ = m₂u₂ (opposite): v_f = 0 ✓ (stop)
  - m₁u₁ ≠ m₂u₂ (general case): v_f ≠ 0 ✓ (continue moving)
- **s6_path:** "Think of it as momentum averaging: if one object is much heavier, the combined mass moves almost at the heavy object's velocity. The stuck pair rarely stops."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Momentum conservation**
Prompt: "Write the momentum conservation law for a collision between m₁ (initial v₁) and m₂ (initial v₂). What does 'isolated system' mean?"
- Pass: m₁v₁ + m₂v₂ = m₁v₁f + m₂v₂f; isolated = no external net force on the system.
- Fail → [P52]: "Momentum conservation is the only equation for inelastic collisions. Let's confirm the foundation: Σp_before = Σp_after when F_ext = 0." → Route to phys.mech.conservation-of-momentum.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the ballistic pendulum**

> A bullet (mass m) fires into a suspended block of wood (mass M) and embeds in it. The block+bullet swings to height h. Can you find the bullet's initial speed?

This is a two-stage problem:
- Stage 1 (collision, very fast): momentum conserved, KE NOT conserved (bullet embeds = perfectly inelastic).
- Stage 2 (swing, no collision): KE converts to PE (energy conserved, no collision).

```
Stage 1: mv₀ = (m + M)v_f  →  v_f = mv₀/(m + M)
Stage 2: ½(m+M)v_f² = (m+M)gh  →  v_f = √(2gh)
Combined: v₀ = (m+M)√(2gh)/m
```

This is a classic device for measuring bullet speed from everyday lab equipment — a beautiful example of choosing the right conservation law for each stage.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Types of Inelastic Collisions [C]**

| Type | Definition | Equation used |
|---|---|---|
| Partially inelastic | Bounce, but KE lost | p-conservation only |
| Perfectly inelastic | Objects stick together | p-conservation; v₁f = v₂f = v_f |

Equation for perfectly inelastic:
```
m₁u₁ + m₂u₂ = (m₁ + m₂)v_f
v_f = (m₁u₁ + m₂u₂) / (m₁ + m₂)
```

**TA-2 — KE Loss in Inelastic Collisions [C→P]**

KE lost = KE_before − KE_after:
```
ΔKE = ½m₁u₁² + ½m₂u₂² − ½(m₁+m₂)v_f²
```

For perfectly inelastic (m₂ at rest):
```
ΔKE = ½m₁u₁² − ½(m₁+m₂)(m₁u₁/(m₁+m₂))²
     = ½m₁u₁² × (1 − m₁/(m₁+m₂))
     = ½m₁u₁² × m₂/(m₁+m₂)
     = ½ × m₁m₂/(m₁+m₂) × u₁²
```

The reduced mass μ = m₁m₂/(m₁+m₂) naturally appears. When m₁ ≪ m₂ (bullet into wall): nearly all KE lost. When m₁ ≈ m₂ (equal masses): half the KE lost.

**TA-3 — Explosion as Reverse Perfectly Inelastic [C→P]**

An explosion starts from rest (or from a single object) — the reverse of a perfectly inelastic collision:

```
Initial: combined mass M, velocity V
After:   m₁ at v₁, m₂ at v₂

MV = m₁v₁ + m₂v₂   (momentum conserved; internal forces only)
```

If V = 0 (starts at rest): m₁v₁ = −m₂v₂ (equal and opposite momenta). KE is GAINED (from chemical/nuclear energy) — the reverse of an inelastic collision.

**TA-4 — Two-Stage Problems [P]**

Real problems often combine a collision stage (use momentum) with a dynamics stage (use energy or kinematics):

1. Identify the stages.
2. Apply the appropriate conservation law to each stage.
3. Link stages through the shared quantity (usually velocity immediately after collision).

Examples:
- Ballistic pendulum (collision stage: momentum → swing stage: energy)
- Car crash then sliding (collision stage: momentum → sliding stage: kinematics with friction)
- Bullet embeds in block on spring (collision: momentum → spring compression: energy)

**TA-5 — Head-On vs. Glancing Collisions [P]**

For 2D inelastic collisions, momentum conservation still holds in both x and y:
```
m₁u₁x + m₂u₂x = (m₁+m₂)v_fx
m₁u₁y + m₂u₂y = (m₁+m₂)v_fy
```

The final direction: φ = arctan(v_fy/v_fx). KE is still lost; direction is determined by vector momentum sum.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — perfectly inelastic)**

> A 1500 kg car travelling at 20 m/s east collides with a 1000 kg car at rest. They stick together. Find v_f and the fraction of KE lost.

```
v_f = (1500×20)/(1500+1000) = 30000/2500 = 12 m/s east

KE_before = ½×1500×400 = 300 000 J
KE_after = ½×2500×144 = 180 000 J
KE lost = 120 000 J → fraction = 120/300 = 40%
```

**WE-2 (Intermediate — ballistic pendulum)**

> A 0.01 kg bullet embeds in a 2 kg block, which swings to h = 0.2 m. Find bullet speed.

```
v_f = √(2×9.8×0.2) = √3.92 = 1.98 m/s
v₀ = (m+M)v_f / m = 2.01×1.98/0.01 = 397.6 ≈ 398 m/s
```

**WE-3 (Advanced — two-stage: collision then sliding)**

> Two cars crash (m₁ = 1200 kg, u₁ = 25 m/s; m₂ = 1000 kg, u₂ = 0) and stick. The wreckage slides on a road with μ_k = 0.4. How far does it slide?

```
Stage 1 (collision): v_f = 1200×25/2200 = 13.64 m/s

Stage 2 (sliding): friction decelerates: a = μ_k × g = 0.4×9.8 = 3.92 m/s²
v² = v_f² − 2as → s = v_f²/(2×3.92) = 185.8/7.84 = 23.7 m
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Identify the type**
"A clay ball (0.5 kg, 4 m/s) hits a stationary clay block (1.5 kg) and sticks. Is this elastic, partially inelastic, or perfectly inelastic? Find v_f."

*Target:* Perfectly inelastic (sticking). v_f = 0.5×4/2.0 = 1 m/s. KE_before = 4 J; KE_after = ½×2×1 = 1 J; ΔKE = 3 J lost.

**MP-2 [P36] — KE loss fraction**
"Two equal-mass objects collide and stick. What fraction of the initial KE (only one was moving) is lost?"

*Target:* v_f = mu/(2m) = u/2; KE_before = ½mu²; KE_after = ½×2m×(u/2)² = ¼mu². Fraction lost = (½mu² − ¼mu²)/½mu² = ½. Always 50% for equal-mass sticking collision with one at rest.

**MP-3 [P36] — Explosion**
"A 3 kg explosive charge is at rest. It explodes into two fragments: m₁ = 1 kg and m₂ = 2 kg. m₁ flies at 10 m/s east. Find m₂'s velocity."

*Target:* Initial p = 0; 1×10 + 2×v₂ = 0 → v₂ = −5 m/s (5 m/s west).

**MP-4 [P36] — Two-stage problem**
"A 0.05 kg bullet embeds in a 5 kg block sitting on a frictionless surface. After the collision the block (with bullet) hits a spring (k = 200 N/m) and compresses it 0.3 m. Find the bullet's initial speed."

*Target:* Spring energy = ½kx² = ½×200×0.09 = 9 J; ½(m+M)v_f² = 9 → v_f² = 18/5.05 → v_f = 1.887 m/s; v_bullet = (m+M)v_f/m = 5.05×1.887/0.05 = 190.6 m/s.

**MP-5 [P36] — Synthesis: 2D inelastic**
"Car A (1000 kg, 15 m/s north) collides and sticks with car B (1500 kg, 20 m/s east). Find the speed and direction of the wreckage."

*Target:* p_x = 1500×20 = 30 000 kg·m/s; p_y = 1000×15 = 15 000 kg·m/s; total mass = 2500 kg; v_fx = 12 m/s; v_fy = 6 m/s; |v_f| = √(144+36) = √180 ≈ 13.4 m/s; φ = arctan(6/12) = 26.6° north of east.

---

## Component 7 — Session Architecture

```
[P01] Session open — ballistic pendulum provocation (bullet speed from swing height)
  ↓
[P41] PD-1 (momentum conservation; isolated system)
  ↓ PASS
[P06] Anchor: ballistic pendulum → why two stages? → which conservation law when?
  ↓
TA-1: Inelastic types; perfectly inelastic equation [C]
  ↓
TA-2: KE loss calculation; reduced mass [C→P]
  ↓
[P28] Conflict: "Momentum is lost in a crash" → MC-MOMENTUM-LOST-INELASTIC
  ↓
WE-1: Car crash — v_f and KE fraction
  ↓
[P51] Check-in MP-2 (equal-mass KE loss = 50% — derive don't memorise)
  ↓ monitor
TA-3: Explosion = reverse perfectly inelastic [C→P]
  ↓
WE-2 → WE-3 (ballistic pendulum; two-stage slide)
  ↓
TA-4: Two-stage problem framework [P]
  ↓
TA-5: 2D inelastic — vector momentum components [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Two cars crash and stick. Total mass = 2500 kg, initial p = 30 000 kg·m/s. Find v_f."
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA; model each stage of the ballistic pendulum explicitly before any algebra; S1: confuses which conservation law to use → go deep on TA-1 type table; S4: PD-1 fail → conservation-of-momentum; S6: [F] — "One equation: p_before = p_after. That's all inelastic collisions need"; S7: open with MP-5 2D crash or the reduced-mass derivation in TA-2.

---

## Component 8 — Adaptive Flags

- **Stage identification**: two-stage problems (TA-4) are the primary difficulty. Require students to write "Stage 1: [collision/explosion], use [momentum]. Stage 2: [swing/slide/spring], use [energy/kinematics]" before solving.
- **KE loss direction**: KE can only be lost in a collision, never gained (unless it's an explosion with chemical energy input). If a student's calculation shows KE increasing in an inelastic collision, they have made an error — this is a diagnostic flag.
- **Explosion sign**: in explosions from rest, the two fragments always have equal and opposite momenta. Students often forget to make the second velocity negative (or westward in 1D). Enforce sign convention.
- **Elastic vs. inelastic crossover** (cross_link: phys.mech.collisions-elastic): if a student has studied elastic collisions, the explicit contrast is: elastic uses 2 equations (p + KE); inelastic uses 1 (p only). Stating this contrast explicitly at the start of the session prevents cross-contamination.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.collisions-inelastic |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.conservation-of-momentum ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-MOMENTUM-LOST-INELASTIC, MC-PERFECTLY-INELASTIC-ZERO-VELOCITY |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (conservation-of-momentum) |
| V-10 | Concrete anchor present [P06] | PASS — ballistic pendulum |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — stage identification, KE loss direction, explosion sign, elastic crossover |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
