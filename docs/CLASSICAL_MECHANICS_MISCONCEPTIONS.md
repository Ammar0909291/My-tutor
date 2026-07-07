# Classical Mechanics — Misconception Audit (Task 5)

**Status: design only.** No `MisconceptionRule` entries added to `misconceptionEngine.ts`. Maps the
five misconception clusters identified in `CLASSICAL_MECHANICS_CURRICULUM_RESEARCH.md` §4 to specific
lessons in `CLASSICAL_MECHANICS_MASTER_CURRICULUM.md`, following the `MisconceptionRule` shape used by
Quantum Physics: `{ type, label, description, primaryPatterns, secondaryPatterns?, remediationSteps }`.

## 1. Force / motion misconceptions

**`mechanics_force_motion`** — "Motion requires a continuously applied force; no force means no
motion" (Aristotelian persistence; the most heavily studied misconception in physics-education
research, per the Force Concept Inventory).
- **Primary patterns:** `forces-newtons-laws`, `newtons-first-law`, `free-body-diagrams`
- **Secondary patterns:** `projectile-motion`, `circular-motion`
- **Remediation:** contrast constant-velocity motion (no net force) against accelerating motion (net
  force) explicitly; use the free-body-diagram visual to show zero net force on a moving object.

**`mechanics_force_as_property`** — treating force as a property an object "has" or "carries" rather
than an interaction between two objects (masks Newton's third law).
- **Primary patterns:** `newtons-third-law`, `force-pairs`
- **Secondary patterns:** `applications-of-newtons-laws`
- **Remediation:** always name both objects in a force pair; use the free-body-diagram visual per
  object, not per system.

## 2. Inertia misconceptions

**`mechanics_inertia_momentum_conflation`** — conflating inertia (resistance to acceleration, mass)
with momentum (mass × velocity) or with friction.
- **Primary patterns:** `newtons-first-law`, `inertia`
- **Secondary patterns:** `linear-momentum-impulse`
- **Remediation:** explicit side-by-side definition contrast; problems where a high-mass, zero-velocity
  object has large inertia but zero momentum.

**`mechanics_inertia_speed_belief`** — "heavier objects are harder to get moving but don't keep moving
as easily" (inertia treated as resistance to *starting* but not to *stopping*).
- **Primary patterns:** `inertia`, `applications-of-newtons-laws`
- **Remediation:** symmetric framing — inertia resists any change in velocity, not just starting from
  rest.

## 3. Gravity misconceptions

**`mechanics_gravity_mass_dependence`** — "heavier objects fall faster" (ignoring that, absent air
resistance, gravitational acceleration is mass-independent).
- **Primary patterns:** `free-fall`, `kinematic-equations`
- **Secondary patterns:** `newtonian-gravitation`
- **Remediation:** derive g = F/m = (GMm/r²)/m = GM/r² explicitly to show the mass cancels; contrast
  with air-resistance-dominated cases where it doesn't.

**`mechanics_gravity_space_off`** — "gravity turns off / there is no gravity in space" (confusing
orbital free-fall with absence of gravity).
- **Primary patterns:** `newtonian-gravitation`, `orbital-mechanics`, `keplers-laws`
- **Remediation:** explain orbit as continuous free-fall around a body, using the `orbit_ellipse`
  visual to show gravity actively curving the path.

**`mechanics_normal_force_misconception`** — treating the normal force as solely a reaction to gravity
rather than to whatever contact force is pressing the surfaces together.
- **Primary patterns:** `free-body-diagrams`, `inclined-planes`
- **Remediation:** problems with non-gravitational pressing forces (e.g. someone pushing down on a
  table) to show normal force responds to net perpendicular contact force, not gravity specifically.

## 4. Momentum misconceptions

**`mechanics_momentum_force_conflation`** — treating momentum and force as the same quantity or
interchangeable.
- **Primary patterns:** `linear-momentum-impulse`, `newtons-second-law`
- **Remediation:** explicit units/dimension contrast (kg·m/s vs. N); impulse–momentum theorem as the
  bridge (Δp = FΔt) showing force and momentum are related but distinct.

**`mechanics_momentum_used_up`** — believing momentum is "used up" or "lost" during a collision rather
than conserved and redistributed.
- **Primary patterns:** `conservation-of-momentum`, `elastic-collisions`, `inelastic-collisions`
- **Remediation:** use the `momentum_collision` before/after visual to show total momentum is identical
  across the collision even when kinetic energy is not.

**`mechanics_momentum_energy_conflation`** — assuming momentum conservation implies kinetic-energy
conservation (or vice versa) in every collision.
- **Primary patterns:** `elastic-collisions`, `inelastic-collisions`
- **Remediation:** explicit elastic-vs-inelastic contrast problems where momentum is conserved in both
  but KE only in the elastic case.

## 5. Energy misconceptions

**`mechanics_energy_runs_out`** — treating energy as something that depletes/disappears rather than
transforms between forms.
- **Primary patterns:** `work-energy-theorem`, `conservation-of-mechanical-energy`, `energy-in-shm`
- **Remediation:** the `energy_bar_diagram` visual showing KE+PE totals constant across positions
  (frictionless case) before introducing non-conservative losses.

**`mechanics_pe_absolute`** — treating potential energy as an absolute quantity rather than dependent
on a chosen reference point.
- **Primary patterns:** `potential-energy`, `gravitational-potential-energy`
- **Remediation:** solve the same problem with two different reference heights to show only energy
  *differences* are physical.

**`mechanics_work_force_conflation`** — confusing work with force, or assuming any applied force does
positive work regardless of direction/displacement.
- **Primary patterns:** `work-done-by-a-force`, `power`
- **Remediation:** contrast a force perpendicular to displacement (zero work — e.g. circular motion's
  centripetal force) against a force along displacement.

**`mechanics_friction_always_opposes_motion_direction`** — believing static friction always opposes
*intended* motion rather than relative sliding tendency, leading to errors in problems like walking or
rolling without slipping.
- **Primary patterns:** `friction`, `rolling-without-slipping`
- **Remediation:** explicit walking/rolling examples where static friction acts in the direction of
  motion, not against it.

## Summary table

| Cluster | Rules | Primary lesson coverage |
|---|---|---|
| Force/motion | 2 | Level 1–2 (U4, U5) |
| Inertia | 2 | Level 1 (U4) |
| Gravity | 3 | Level 1, 4 (U4, U15, U16, U5) |
| Momentum | 3 | Level 2 (U8) |
| Energy | 4 | Level 2, 5 (U7, U17, U5, U14) |
| **Total** | **14** | spans Levels 1–5 |

14 rules is within the per-subject estimate (5–7) scaled up given Classical Mechanics' broader concept
surface — consistent with the higher end of the readiness-matrix estimate in
`ADVANCED_SUBJECT_EXPANSION_REPORT.md` ("6–8"), reflecting the additional rotational/gravitational
clusters this curriculum's larger unit count surfaces. Not registered to `misconceptionEngine.ts` in
this sprint.
