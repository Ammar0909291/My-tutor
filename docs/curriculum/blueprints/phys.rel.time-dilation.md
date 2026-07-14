# Teaching Blueprint — phys.rel.time-dilation

## Component 0 — Concept Metadata

```
concept_id:         phys.rel.time-dilation
name:               Time Dilation
domain:             relativity
difficulty:         advanced (5)
bloom:              apply
mastery_threshold:  0.80
estimated_hours:    5
prerequisites:      [phys.rel.simultaneity]
cross_links:        []
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** A moving clock runs slower than an identical clock at rest. The relationship is:  
  Δt = γ Δτ   where γ = 1/√(1 − v²/c²) ≥ 1  
Δτ is the proper time (measured by the clock that stays in the same place — the "wristwatch" on
the moving object), and Δt is the coordinate time (measured by the stationary observer's clocks).
γ ≥ 1 always, so Δt ≥ Δτ: the stationary observer always measures a longer time interval than
the moving clock shows. Mastery means: (a) deriving the time-dilation formula from the light-clock
argument, (b) computing Δt and Δτ for given v, (c) computing γ, (d) distinguishing proper time
from coordinate time, (e) applying to muon decay.

**The One Formula:** Δt = γ Δτ,  γ = 1/√(1 − β²),  β = v/c

**Experimental Confirmation:**  
- Muon lifetime: muons produced in the upper atmosphere (v ≈ 0.998c) have γ ≈ 16. Classical
  prediction: they decay before reaching sea level. Observed: they reach sea level in numbers
  explained by dilated lifetime (15.6 μs observed vs. 2.2 μs proper lifetime).  
- Hafele-Keating experiment (1971): atomic clocks flown around the world gained/lost time
  consistent with SR predictions.  
- GPS satellites: atomic clocks corrected for time dilation daily.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
Muons created 15 km up in the atmosphere travel at 0.998c. Their proper half-life is 2.2 μs.
Classical travel time: 15,000/(0.998 × 3×10⁸) ≈ 50 μs — about 23 half-lives. Classical
prediction: almost none reach sea level. Observed: a substantial fraction reaches sea level.
The muon's clock (proper time) runs much slower than our ground clocks (coordinate time).

**Stage 2 — Representational (R)**  
Light clock: two mirrors, light bouncing vertically, period T₀ = 2L/c in the rest frame.
When the clock moves horizontally at v: in the lab frame, light must travel a diagonal path
of length 2√(L² + (vT/2)²). Setting this equal to cT: T = T₀/√(1 − v²/c²) = γT₀.
The moving clock ticks slower by factor γ.

**Stage 3 — Abstract (A)**  
γ = 1/√(1 − v²/c²): γ → 1 as v → 0 (Newtonian limit); γ → ∞ as v → c. Time dilation
is negligible for everyday speeds (v = 300 m/s: γ − 1 ≈ 5 × 10⁻¹³) but significant near c
(v = 0.999c: γ ≈ 22.4). Proper time: the time measured by a clock that is present at both
events (the "wristwatch" — co-moving clock). Coordinate time: the time between the two events
in the stationary frame.

**Stage 4 — Transfer (T)**  
Time dilation underlies: GPS satellite clock correction (~38 μs/day without correction →
11 km/day position error); particle accelerator beam lifetime extension; the twin paradox
(differential ageing from asymmetric acceleration histories); relativistic rockets; muon-catalysed
fusion; the Lorentz factor γ appearing in all relativistic mechanics (energy, momentum).

---

## Component 3 — Why Beginners Fail

1. **Confusing Δt and Δτ:** Students mix up which observer measures which time. Proper time Δτ
   is always the shorter time (γ ≥ 1). The moving clock shows proper time; the stationary
   observer measures coordinate time.

2. **Thinking time dilation is an illusion:** "The clocks appear to run slow but really they're
   the same." No — the muon actually decays at a later time (more decays survive to sea level).
   Time dilation is physically real, not a perceptual effect.

3. **Applying γ with v in the wrong units:** Students mix m/s and c, getting γ > 1 for any v
   or impossible numbers. β = v/c must be dimensionless, always ≤ 1.

4. **Twin paradox confusion:** "Both twins are moving relative to each other, so each should
   see the other's clock run slow — who actually ages less?" The resolution (the travelling twin
   accelerates, breaking symmetry) is beyond this concept's scope but must be flagged.

---

## Component 4 — Misconception Library

### MC-1: MC-TIME-DILATION-IS-ILLUSION
**Probe:** "Is time dilation a physical effect or an optical illusion caused by the finite speed
of light making clocks appear to run slow?"  
**Characteristic phrase:** "The clock just looks slow because the light takes longer to reach us."  
**Trigger:** Students think SR effects are perceptual, not real.  
**Conflict evidence [P28]:** The muon experiment: muons physically survive to sea level in
numbers explained by time dilation. This is not a light-travel-time effect — the muons are
actually present at sea level in statistically measured quantities. Atomic clocks flown around
the world (Hafele-Keating) showed a real accumulated time difference. The effect is verified
by comparing physical clocks after reuniting them.  
**Bridge [P30]:** "If it were just an optical illusion, reuniting the clocks would show them
synchronized. In Hafele-Keating, the clocks that flew on planes read different times from the
ground clocks. The difference is real — not optical."  
**Replacement [P31]:** Time dilation is a real physical effect: moving clocks genuinely tick
at a slower rate; the accumulated time difference is measurable when clocks are reunited.  
**Discrimination pairs [P33]:** Time dilation is: (A) an optical illusion due to light travel time,
(B) a real physical effect measurable by comparing reunited clocks, (C) only apparent when the
observer moves, not real. Correct: (B).  
**S6 repair path:** TA-2 (muon experiment) → TA-3 (Hafele-Keating evidence).

### MC-2: MC-PROPER-TIME-IS-LONGER
**Probe:** "A muon travels from the upper atmosphere to sea level. Its proper lifetime is 2.2 μs.
The lab measures a lifetime of 35 μs. Which is longer: the proper time or the coordinate time?"  
**Characteristic phrase:** "Proper time is the 'real' time, so it should be longer."  
**Trigger:** Students think "proper" = "more complete" = longer. The word "proper" misleads.  
**Conflict evidence [P28]:** Δt = γΔτ with γ > 1 → Δt > Δτ. Coordinate time (lab frame: 35 μs)
is always longer than proper time (muon frame: 2.2 μs). γ = 35/2.2 ≈ 16, consistent with
v ≈ 0.998c. The moving clock (co-moving with the muon) shows the shorter time.  
**Bridge [P30]:** "Proper time just means 'own time' (from the Latin proprius = one's own) — the
time on the clock co-moving with the object. Since γ ≥ 1, proper time is always ≤ coordinate
time. The moving clock shows less elapsed time."  
**Replacement [P31]:** Proper time Δτ is always ≤ coordinate time Δt (Δt = γΔτ, γ ≥ 1). Proper
time is the shorter time.  
**Discrimination pairs [P33]:** Proper time vs. coordinate time: (A) proper time is longer
(it's the "real" time), (B) coordinate time is longer (Δt = γΔτ, γ ≥ 1), (C) they are always
equal. Correct: (B).  
**S6 repair path:** TA-4 (light-clock derivation — the moving clock's period is longer in the
lab frame).

### MC-3: MC-GAMMA-FORMULA-DIMENSIONALLY-WRONG
**Probe:** "A train moves at 100 m/s. Compute γ. What is the fractional change in time: (γ−1)?"  
**Characteristic phrase:** "γ = 1/√(1 − v²/c²) = 1/√(1 − (100)²/(3×10⁸)²)."  
**Trigger:** Students use v and c in different units, or forget that β = v/c is dimensionless.  
**Conflict evidence [P28]:** β = 100/(3×10⁸) = 3.33×10⁻⁷. β² = 1.11×10⁻¹³. γ = 1/√(1 − 10⁻¹³)
≈ 1 + 5×10⁻¹⁴. Fractional time dilation: (γ − 1) ≈ 5×10⁻¹⁴ — completely negligible. Students
who miscompute γ often get nonsensical values (γ < 1 or imaginary).  
**Bridge [P30]:** "Always compute β = v/c first: a dimensionless number between 0 and 1. Then
γ = 1/√(1 − β²). If γ < 1, you made an error. If β > 1, v > c — impossible."  
**Replacement [P31]:** Always compute β = v/c first. γ is always ≥ 1. For everyday speeds,
β ≪ 1 and γ ≈ 1. For v → c, γ → ∞.  
**Discrimination pairs [P33]:** For v = 0.6c: γ = (A) 1.25, (B) 0.8, (C) 1.6. Correct: (A)
(1/√(1−0.36) = 1/√0.64 = 1/0.8 = 1.25).  
**S6 repair path:** TA-5 (γ computation drill for β = 0, 0.6, 0.8, 0.9, 0.99, 0.999).

### MC-4: MC-TIME-DILATION-ONLY-FOR-FAST-OBJECTS
**Probe:** "Is time dilation significant for an aeroplane flying at 900 km/h? For the ISS
orbiting at 7.7 km/s? For a GPS satellite? Compute (γ−1) for each."  
**Characteristic phrase:** "Time dilation only matters when you're going close to the speed of light."  
**Trigger:** Students believe time dilation is only an exotic high-speed effect.  
**Conflict evidence [P28]:** GPS satellites orbit at 3.87 km/s. β = 3.87×10³/(3×10⁸) = 1.29×10⁻⁵.
γ − 1 ≈ β²/2 = 8.3×10⁻¹¹. Clock rate change = 7.2 μs/day (from SR alone) — enough to cause
GPS position error of 2 km/day. GPS clocks are adjusted. Time dilation is engineered into GPS.  
**Bridge [P30]:** "For everyday speeds, γ − 1 is tiny but non-zero. For GPS and atomic clock
experiments, the effect is small but measurable and consequential. It is not only exotic — it
is engineering reality."  
**Replacement [P31]:** Time dilation occurs at all speeds; it becomes significant (>10⁻¹⁰ level)
at km/s speeds and is engineered into GPS satellite design.  
**Discrimination pairs [P33]:** Time dilation in GPS satellites is: (A) negligible (too slow),
(B) significant — ~7 μs/day from SR, corrected in the satellite clocks, (C) not applicable
(satellites don't obey SR). Correct: (B).  
**S6 repair path:** TA-6 (GPS calculation).

---

## Component 5 — Explanation Library

**Explanation E-1 (light-clock derivation):**  
A light clock at rest: period T₀ = 2L/c. Moving at v: in the lab, the light travels a diagonal
path. By Pythagoras: (cT/2)² = L² + (vT/2)². Solve for T: T = T₀/√(1 − v²/c²) = γT₀.
The moving clock ticks at period T > T₀ — it ticks more slowly.

**Explanation E-2 (muon calculation):**  
v = 0.998c, β = 0.998, γ = 1/√(1−0.998²) = 1/√(0.003996) ≈ 15.8.
Proper lifetime: Δτ = 2.2 μs. Lab lifetime: Δt = γΔτ = 15.8 × 2.2 = 34.7 μs.
Lab distance: d = vΔt = 0.998 × 3×10⁸ × 34.7×10⁻⁶ ≈ 10.4 km. Muons easily reach sea level.

**Explanation E-3 (GPS summary):**  
Two effects: (SR) time dilation due to orbital speed → clocks run slow by 7.2 μs/day.
(GR) gravitational time dilation due to weaker gravity at altitude → clocks run fast by 45.9 μs/day.
Net: +38.4 μs/day — satellite clocks are deliberately slowed before launch to compensate.

---

## Component 6 — Analogy Library

**Primary analogy — Walking at an angle across a room:**  
You walk 10 m forward and 3 m sideways. Your actual path length is √(10² + 3²) = 10.44 m.
You took longer to walk that path than someone walking 10 m straight. The light clock's photon
is like you: it takes a longer (diagonal) path in the lab frame at the same speed c. The
moving clock's "ticks" are spread further apart in the lab frame.  
**Breaking point:** In the analogy, the path length depends on both forward and sideways speeds.
In the light clock, only one mirror moves; the geometry is specific to the setup. The analogy
correctly conveys why the moving clock's period is longer.  
**Anti-analogy:** A physical pendulum clock: its period is set by gravity and string length, not
by its velocity. A pendulum clock on a moving train could have its period changed by jolting —
but this is a mechanical effect, not SR. SR time dilation is not a mechanical effect; it applies
to all clocks identically, including atomic clocks, biological processes, and radioactive decay.

---

## Component 7 — Demonstration Library

**D-1 (Muon calculation — quantitative):**  
v = 0.998c, Δτ = 2.2 μs. Students compute γ and Δt. Compare classical (no dilation) predicted
fraction reaching sea level vs. observed. Show that dilation is required to explain the observation.

**D-2 (γ table):**  
Students compute γ for β = 0.1, 0.5, 0.8, 0.9, 0.99, 0.999. Plot γ vs. β. Observe the steep
rise near β = 1. Mark where v = aeroplane, ISS, GPS satellite, LHC proton.

**D-3 (GPS precision):**  
GPS requires position accuracy of <1 m. Clock error of 1 ns → position error of 30 cm. SR
time dilation for GPS orbits = 7.2 μs/day = 7200 ns/day. Without correction: 7200 × 30 cm =
2.16 km/day error. Correction is engineered into the system.

---

## Component 8 — Discovery Lesson

*Anchor (3 min):* Muon paradox (Component 2, Stage C). "Muons should decay before reaching
us. They don't. Something stretches their lifetime. What?"

*Light-clock derivation (10 min):* TA-4. Students derive T = γT₀.

*Muon verification (5 min):* D-1. Students compute γ and verify predicted Δt matches observed.

*GPS consequence (5 min):* D-3. SR time dilation in GPS — real engineering consequence.

*MC diagnostics (2 min):* Address MC-1 (real, not illusion) and MC-2 (proper time is shorter).

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Muon paradox. Success: students articulate the classical prediction fails.

**TA-2 — Real-Effect Evidence [P14, P28]**  
Hafele-Keating and GPS. Address MC-1. Success: students accept time dilation as real.

**TA-3 — Proper vs. Coordinate Time [P14]**  
Define Δτ (co-moving clock, shorter) vs. Δt (stationary frame, longer). Draw diagram. Address
MC-2. Success: students correctly identify which observer measures which.

**TA-4 — Light-Clock Derivation [P14, P30]**  
Derive Δt = γΔτ. Draw the geometry. Success: students can reproduce the derivation from Pythagoras.

**TA-5 — γ Computation [P50]**  
MC-3 diagnostic + γ table (D-2). Success: students correctly compute γ for β = 0.6, 0.8, 0.99.

**TA-6 — Muon + GPS Applications [P50]**  
D-1 (muon) + D-3 (GPS). Address MC-4. Success: correct Δt for muons; correct GPS clock error.

**TA-7 — Closure [P68, P85, P91]**  
Three questions: (1) compute Δt for a muon at v = 0.9c, Δτ = 2.2 μs; (2) which is longer, Δτ
or Δt?; (3) is time dilation real or illusory? Success: all three correct.

---

## Component 10 — Voice Teaching

**Opening move:** "Muons are created 15 km above us and live for 2.2 microseconds. Classical
physics says they decay long before reaching sea level. We detect them in large numbers at sea
level. The discrepancy is exactly explained by time dilation: the muon's own clock runs slow
compared to ours. Time is not absolute."

**Key explanatory moves:**
- "Δt = γΔτ: Δt is what we measure, Δτ is what the muon experiences. γ ≥ 1, so Δt ≥ Δτ.
  Proper time is always the shorter one."
- "γ = 1/√(1 − β²). Compute β first. β = v/c. If β > 1, you made an error — nothing moves
  faster than light. γ must be ≥ 1."
- "GPS engineers correct for time dilation every day. This is not a theoretical curiosity. It
  is engineered physics."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.80):**  
(a) Compute γ from v/c; (b) compute Δt from γΔτ; (c) identify proper vs. coordinate time;
(d) apply to muon or GPS scenario. Failure routes: (a)/(b) → TA-4/TA-5; (c) → TA-3; (d) → TA-6.

**FA-1:** Muon at v = 0.995c, Δτ = 2.2 μs. Find γ and Δt.  
Expected: β = 0.995; γ = 1/√(1−0.990025) = 1/√0.009975 ≈ 10.01; Δt = 10.01 × 2.2 = 22.0 μs.

**FA-2:** GPS satellite at v = 3.87 km/s. Find γ and clock difference per day (SR only).  
Expected: β = 3.87×10³/3×10⁸ = 1.29×10⁻⁵; γ−1 ≈ β²/2 = 8.32×10⁻¹¹; per day: 8.32×10⁻¹¹ × 86400 s ≈ 7.2 μs.

**FA-3:** A spaceship travels to a star 40 light-years away at v = 0.8c. How much time passes
for the crew?  
Expected: Δt (lab) = 40/0.8 = 50 years. γ = 1/0.6 = 5/3 ≈ 1.667. Δτ = 50/1.667 = 30 years.

**FA-4:** Explain in 2 sentences why time dilation is real and not an illusion.  
Expected: Physical clocks (atomic clocks, radioactive decay rates, muon lifetimes) genuinely differ
after reunification. The Hafele-Keating experiment measured accumulated time differences of
hundreds of nanoseconds — real, not optical.

**Delayed Retrieval:** "Without notes: state Δt = γΔτ. Compute γ at β = 0.6. Muon at 0.95c —
proper life 2.2 μs — does it reach sea level (15 km)?"

---

## Component 12 — Recovery Notes

**S0:** phys.rel.simultaneity is the prerequisite. Without simultaneity, students have no
framework for frame-dependent time measurements.

**S3 (real vs. illusion):** Muon experiment is the anchor. "This is a count of particles, not
an optical measurement. Counting is not an illusion."

**S6 (MC-PROPER-TIME-IS-LONGER):** Write Δt = γΔτ. Circle γ. "γ ≥ 1. Δt ≥ Δτ. Always."

**S9 (computes correctly but cannot distinguish proper from coordinate):** Require the student
to always label every time quantity: "whose clock? co-moving or stationary frame?" before
writing any equation.

---

## Component 13 — Memory & Review

**Spaced retrieval:**
- Day +1: Compute γ for v = 0.6c, 0.8c, 0.99c. State which time is proper.
- Day +4: Muon at 0.998c, Δτ = 2.2 μs — find Δt and lab distance.
- Day +10: GPS satellite — compute SR time dilation per day; explain why GPS clocks are pre-corrected.

**Interleaving partners:** phys.rel.simultaneity (prerequisite concept), phys.rel.length-contraction
(twin consequence: moving objects contract), phys.rel.lorentz-transform (full mathematical framework).

---

## Component 14 — Transfer Map

**Near transfer:** phys.rel.length-contraction (companion effect); phys.rel.lorentz-transform  
**Far transfer:** Particle physics (beam lifetime); GPS engineering; muon-catalysed fusion;
twin paradox; relativistic spacecraft design

---

## Component 15 — Curriculum Feedback

Correct KG positioning. Requires phys.rel.simultaneity (established before now); unlocks
phys.rel.length-contraction correctly.

---

## Package Validation Checklist

```
V-1 through V-20: all PASS. Status: READY / PACKAGE_READY — V-1 through V-20 PASS
```
