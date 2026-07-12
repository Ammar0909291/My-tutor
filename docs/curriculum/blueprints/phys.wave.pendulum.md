# Teaching Blueprint — phys.wave.pendulum

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.wave.pendulum
name: The Simple Pendulum
domain: waves
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.wave.shm
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.mech.circular-motion
  - phys.wave.spring-mass
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-PENDULUM-PERIOD-DEPENDS-ON-MASS
- **Trigger signal:** Student says "a heavier pendulum bob swings more slowly" or "a lighter bob goes faster" or includes m in the period formula.
- **Conflict evidence [P28]:** "The period of a simple pendulum is independent of the bob's mass. Galileo demonstrated this by dropping heavy and light balls simultaneously from the Leaning Tower of Pisa — they hit the ground simultaneously (air resistance aside). For a pendulum: the restoring force is F_restoring = −mg sinθ ≈ −mgθ (for small angles). Newton's 2nd: ma_t = −mgθ → a_t = −gθ → ω = √(g/L). The mass m cancels completely. A gold bob and a ping-pong ball on strings of the same length swing in exact synchrony. This is the equivalence principle — inertial mass equals gravitational mass, so mass always cancels from pendulum SHM."
- **Bridge text [P30]:** "The restoring force (mg sinθ) and the inertia (ma) both contain m — they cancel in a = F/m = −g sinθ → −gθ (small angle). The pendulum is a direct experimental test of the equivalence of inertial and gravitational mass."
- **Replacement text [P31]:** "T = 2π√(L/g): no mass in the formula. The period depends only on length L and gravitational field g. Heavier bob → larger restoring force AND larger inertia — they cancel exactly."
- **Discrimination pairs [P33]:**
  - 1 kg bob, L = 1 m: T = 2π√(1/9.8) = 2.007 s ✓
  - 5 kg bob, L = 1 m: T = 2π√(1/9.8) = 2.007 s (same T) ✓
  - 1 kg bob, L = 4 m: T = 2π√(4/9.8) = 4.01 s (doubled L → T×√2×2 = ×2) ✓
- **s6_path:** "Galileo watched a chandelier swinging at different amplitudes in a cathedral — he timed it against his own pulse and found constant period. He didn't weigh the chandelier. Mass just doesn't matter."

---

### MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD
- **Trigger signal:** Student says "a pendulum pulled back farther takes longer to swing back" or includes amplitude in the period formula.
- **Conflict evidence [P28]:** "For small oscillations (amplitude ≪ pendulum length, angle θ₀ ≪ ~15°), the period is independent of amplitude: T = 2π√(L/g). This isochronous property (same period regardless of amplitude) is why pendulum clocks work — the mainspring slowly reduces the pendulum swing amplitude, but the clock keeps perfect time. For large amplitudes (θ₀ > 15°), the small-angle approximation breaks down and the period does increase slightly with amplitude. But for typical pendulum clock amplitudes (a few degrees), this correction is negligible."
- **Bridge text [P30]:** "Small-angle approximation: sinθ ≈ θ (in radians). Valid to about 1% accuracy for θ < 15° ≈ 0.26 rad. At 15°, the sin is 0.259 while the angle is 0.262 — less than 1% error. For θ < 15°, the period is isochronous."
- **Replacement text [P31]:** "T = 2π√(L/g): valid for small oscillations (θ₀ < ~15°). Period independent of amplitude in this regime. For large amplitudes: T increases by O(θ₀²) correction. Specify 'small angle' when using this formula."
- **Discrimination pairs [P33]:**
  - θ₀ = 5°: T = 2π√(L/g) accurate to < 0.1% ✓
  - θ₀ = 30°: T is ~1.7% longer than 2π√(L/g) — small but measurable ✓
- **s6_path:** "The isochronous property is what Galileo discovered and why pendulum clocks revolutionised timekeeping. A wider swing still takes the same time — the harder restoring force (larger sinθ) exactly compensates the longer arc."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — SHM fundamentals**
Prompt: "A SHM system with ω = 3.13 rad/s. Find: (a) period T; (b) what length pendulum on Earth has this natural frequency?"
- Pass: T = 2π/3.13 = 2.01 s; L = g/ω² = 9.8/(3.13)² = 9.8/9.8 = 1.0 m.
- Fail → [P52]: "T = 2π/ω; and for a pendulum ω = √(g/L) → L = g/ω². Review phys.wave.shm for the connection between T, ω, and the restoring force." Route to shm.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — timing a pendulum of known length**

> Tie a 250 g mass to a string exactly 1.0 m long. Set it swinging with an angle of about 10°. Time 20 complete oscillations using a stopwatch: total time ÷ 20 = T. Compare to the prediction: T = 2π√(1.0/9.8) = 2.007 s. The match should be within 1%. Now change to a 500 g mass on the same string — time again. T is the same within experimental error. Shorten the string to 0.25 m — T = 2π√(0.25/9.8) = 1.003 s ≈ half as long (halving L halves T² → T reduces by √2... wait: 1.003/2.007 = 0.50 → T halves). Mass doesn't matter; length does.

Second anchor: measure g from pendulum timing. L = 1.00 m, T = 2.010 s → g = 4π²L/T² = 4π²×1.00/(2.010)² = 39.48/4.04 = 9.77 m/s². This is the classroom method for measuring local gravity.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Deriving T from Newton's Law [C]**

A simple pendulum: mass m on a massless string of length L. Displacement along arc = s = Lθ.

Restoring force (tangential, toward equilibrium):
```
F_t = −mg sinθ ≈ −mgθ   (small angle: sinθ ≈ θ in radians)
```

Newton's 2nd along arc:
```
ma_t = −mgθ
a_t/L = −(g/L)θ   but s = Lθ → a_t = Ls̈/L... 
```

More carefully: a_t = Lθ̈. So:
```
Lθ̈ = −gθ   →   θ̈ = −(g/L)θ
```

This is SHM with ω² = g/L:
```
ω = √(g/L)     T = 2π/ω = 2π√(L/g)
```

No m; no A. Period depends only on L and g.

**TA-2 — Factors Affecting Pendulum Period [C→P]**

Factors that AFFECT T:
- Length L: T ∝ √L. Double L → T increases by √2.
- Gravitational field g: T ∝ 1/√g. Weaker g → longer T (pendulum clock runs slow at high altitude or on Moon).

Factors that do NOT affect T (for small oscillations):
- Mass m (cancels)
- Amplitude (small angle only — isotchronous)
- Air density (in vacuum, T is unchanged)

**TA-3 — Measuring g with a Pendulum [C→P]**

Rearranging T = 2π√(L/g):
```
g = 4π²L/T²
```

Practical method:
1. Measure L accurately (from pivot to centre of mass of bob).
2. Time N oscillations (N ≥ 10 for precision): T = total time / N.
3. Compute g = 4π²L/T².

Error analysis: fractional error in g = fractional error in L + 2 × fractional error in T. Timing error dominates → time many oscillations to minimise T uncertainty.

**TA-4 — The Conical Pendulum and Pendulum Clock [P]**

**Conical pendulum**: bob moves in a horizontal circle of radius r = L sinθ. The string makes angle θ with the vertical. Vertical: T cosθ = mg; Horizontal: T sinθ = mω²r = mω²L sinθ. Combining: T cosθ = mg and T sinθ/L sinθ = mω² → ω² = g cosθ/L. Period: T_conical = 2π√(L cosθ/g). For small θ: cosθ ≈ 1 → same as simple pendulum.

**Pendulum clock**: escapement mechanism gives the pendulum a small kick each period to counteract air resistance damping; simultaneously the tick-tock advances a gear by one tooth per oscillation. Length is adjusted by a threaded nut at the bottom (raises or lowers bob to change L, and hence T). For T = 2 s (a "seconds pendulum" — one tick per second): L = gT²/(4π²) = 9.8×4/39.48 = 0.993 m ≈ 1 m.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — T from L)**

> Find the period of a pendulum of length: (a) 0.25 m, (b) 1.00 m, (c) 2.25 m (g = 9.8 m/s²).

```
(a) T = 2π√(0.25/9.8) = 2π×0.1597 = 1.003 s ≈ 1.0 s

(b) T = 2π√(1.00/9.8) = 2π×0.3194 = 2.007 s ≈ 2.0 s

(c) T = 2π√(2.25/9.8) = 2π×0.4791 = 3.011 s ≈ 3.0 s

Note: L increases by factors of 4 and 9 → T increases by √4=2 and √9=3.
```

**WE-2 (Intermediate — measuring g)**

> A student times 50 complete oscillations of a 0.80 m pendulum and records 88.5 s. Find g.

```
T = 88.5/50 = 1.770 s

g = 4π²L/T² = 4π²×0.80/(1.770)² = 31.58/3.133 = 10.08 m/s²
```

Compare to standard 9.8 m/s² — about 3% high. Likely the pendulum length was measured to the string endpoint rather than the centre of mass of the bob.

**WE-3 (Advanced — pendulum on Moon)**

> A pendulum clock keeping correct time on Earth (T = 2.0 s, L = 0.993 m) is taken to the Moon (g_Moon = 1.62 m/s²). (a) What is the new period? (b) How many seconds does the Moon clock lose per Earth day?

```
(a) T_Moon = 2π√(L/g_Moon) = 2π√(0.993/1.62) = 2π×0.7829 = 4.921 s

(b) Earth day: 86 400 s. Earth clock ticks: 86 400/2.0 = 43 200 ticks.
    Moon clock per 43 200 ticks: time elapsed = 43 200×4.921 = 212 587 s
    Earth day = 86 400 s.
    Moon clock completes 86 400/4.921 = 17 557 ticks per Earth day.
    Expected: 43 200 ticks. Actual: 17 557 ticks.
    Seconds shown by Moon clock per Earth day: 17 557×2.0 = 35 114 s.
    Deficit: 86 400 − 35 114 = 51 286 s ≈ 14.2 hours per Earth day.
```

The Moon clock "loses" about 14 hours per Earth day.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Period and length**
"Find the length of a pendulum with T = 1.5 s on Earth. If g on Mars = 3.7 m/s², what length would give T = 1.5 s on Mars?"

*Target:* L_Earth = gT²/(4π²) = 9.8×2.25/39.48 = 0.558 m. L_Mars = 3.7×2.25/39.48 = 0.211 m. (Shorter pendulum needed on Mars because weaker gravity → need shorter L to keep same period.)

**MP-2 [P36] — Mass independence**
"Two pendulums of the same length L = 0.5 m: one has a 100 g bob, the other a 500 g bob. (a) Calculate T for each. (b) They are displaced to the same angle. Which returns first?"

*Target:* (a) Both: T = 2π√(0.5/9.8) = 1.421 s. (b) Neither returns first — they swing in perfect synchrony, always arriving at the same position at the same time.

**MP-3 [P36] — Altitude effect**
"A pendulum clock keeps perfect time at sea level (g = 9.810 m/s²). At 3000 m altitude, g = 9.790 m/s². (a) How does T change? (b) Does the clock gain or lose time? (c) How much time is gained or lost per day?"

*Target:* (a) T ∝ 1/√g: T_alt/T_sl = √(9.810/9.790) = √1.00204 = 1.00102. T increases by 0.102%. (b) Period is longer → clock ticks more slowly → clock loses time. (c) In one day (86 400 s): loss = 0.00102×86 400 ≈ 88 s per day ≈ 1.5 minutes per day. (Real altimeters use pendulum drift to measure elevation.)

**MP-4 [P36] — Determining g from pendulum**
"A field measurement: 40 swings in 72.3 s with L = 0.822 m. Find g and its fractional uncertainty if ΔL = 0.003 m and ΔT_total = 0.2 s."

*Target:* T = 72.3/40 = 1.8075 s. g = 4π²×0.822/(1.8075)² = 32.52/3.267 = 9.954 m/s². Δg/g = ΔL/L + 2ΔT/T_total = 0.003/0.822 + 2×0.2/72.3 = 0.00365 + 0.00553 = 0.00918 ≈ 0.9%. Δg = 0.009×9.95 ≈ 0.09 m/s². So g = 9.95 ± 0.09 m/s².

**MP-5 [P36] — Synthesis: design a 1-second-tick pendulum for the Moon**
"Design a pendulum clock for the Moon (g = 1.62 m/s²) that ticks once per second (T = 2 s). (a) What length is needed? (b) Compare to the ~1 m pendulum on Earth. (c) If you halve the length, what happens to the tick rate?"

*Target:* (a) L = gT²/(4π²) = 1.62×4/39.48 = 6.48/39.48 = 0.164 m ≈ 16.4 cm. (b) Earth: L ≈ 1.0 m; Moon: L ≈ 0.164 m — 6.1 times shorter (g_Earth/g_Moon = 6.1 → same L gives √6.1 ≈ 2.47× longer T on Moon; to keep same T, shrink L by 6.1). (c) Halving L: T → T/√2 = 2/1.414 = 1.414 s → ticks 2/1.414 = 1.414 times per second — faster than once per second.

---

## Component 7 — Session Architecture

```
[P01] Session open — classroom pendulum timing; mass change experiment
  ↓
[P41] PD-1 (SHM: ω=√(g/L) for pendulum; T from ω)
  ↓ PASS
[P06] Anchor: time 20 swings with 0.5 kg and 0.1 kg bob on same string → identical T
  ↓
TA-1: Derive T=2π√(L/g) from F=−mgθ and Newton's 2nd; small-angle justification [C]
  ↓
[P28] Conflict: "period depends on mass" → MC-PENDULUM-PERIOD-DEPENDS-ON-MASS
  ↓
WE-1: Compute T for three lengths; see √L proportionality
  ↓
[P51] Check-in MP-2 (two bobs on same string — which returns first?)
  ↓ monitor
[P28] Conflict: "larger swing → longer period" → MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD
  ↓
TA-2: Factors affecting T — length and g only; what doesn't affect T [C→P]
  ↓
TA-3: Measuring g; timing N oscillations; error analysis [C→P]
  ↓
WE-2 → WE-3 (g from timing; pendulum on Moon)
  ↓
TA-4: Conical pendulum; pendulum clock mechanism [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Pendulum period formula? What does each symbol represent? Which quantities don't affect T?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — classroom timing experiment before any formula; S1: knows T=2π√(L/g) but includes mass or amplitude → MC-PENDULUM-PERIOD-DEPENDS-ON-MASS and MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD; S4: PD-1 fail → phys.wave.shm; S6: [F] — "Two quantities only: L and g. Everything else (mass, bob material, amplitude for small swings) is irrelevant to T."; S7: open with MP-5 (design pendulum for Moon — requires rearranging the formula for L, then applying g_Moon, then reasoning about the effect of halving L).

---

## Component 8 — Adaptive Flags

- **Radian measure**: sinθ ≈ θ is valid only when θ is in radians. Always confirm angle is converted before applying the small-angle approximation. At θ = 15° = 0.262 rad, sinθ = 0.259 — less than 1% error. Beyond 15°, the approximation starts to break down noticeably.
- **L is measured to the centre of mass**: for a point bob on a massless string: L = string length. For a real bob: L = pivot to centre of mass of bob. Students often measure to the top of the bob. A systematic error in L propagates as a systematic error in g.
- **Equivalent pendulum**: a physical pendulum (any rigid body swinging) has T = 2π√(I/mgh) where I = moment of inertia about pivot and h = distance from pivot to centre of mass. This is beyond A-level but worth mentioning for enrichment: a metre rule pivoted at one end has an equivalent pendulum length of L_eq = 2L/3.
- **Altitude and g**: g varies ~0.5% between equator (9.78 m/s²) and poles (9.83 m/s²), and decreases with altitude (g ≈ GM/(R+h)²). Precision pendulum measurements are used in gravimetry.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.wave.pendulum |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.wave.shm ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-PENDULUM-PERIOD-DEPENDS-ON-MASS, MC-PENDULUM-AMPLITUDE-CHANGES-PERIOD |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (SHM: ω and T from given ω) |
| V-10 | Concrete anchor present [P06] | PASS — classroom timing: same T for different masses; measuring g |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-4 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — radian measure, L to centre of mass, physical pendulum scope, g variation |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
