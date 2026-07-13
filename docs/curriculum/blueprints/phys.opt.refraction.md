# Teaching Blueprint — phys.opt.refraction

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.refraction
name: "Refraction of Light"
domain: optics
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.opt.nature-of-light
mastery_threshold: 0.80
estimated_hours: 3
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Place a pencil in a glass of water. Looking from the side, the pencil appears bent at the water surface — the submerged part seems to shift sideways. The pencil hasn't moved; instead, light changes direction when it crosses from water into air. This bending of light as it crosses a boundary between two materials is called refraction. It happens because light travels at different speeds in different materials: slower in denser materials, faster in less dense ones. Just as a column of soldiers slows down when marching onto muddy ground and bends their formation, light bends when its wavefronts enter a medium where it travels at a different speed.

### Level 2 — Developing Understanding

**Snell's Law of Refraction:**

**n₁ sin θ₁ = n₂ sin θ₂**

Where:
- n₁ = refractive index of medium 1 (incident)
- n₂ = refractive index of medium 2 (refracted)
- θ₁ = angle of incidence (from normal)
- θ₂ = angle of refraction (from normal)

**Refractive index:** n = c/v (always ≥ 1)
- Vacuum: n = 1
- Air: n ≈ 1.0003 (≈ 1)
- Water: n ≈ 1.33
- Glass: n ≈ 1.5
- Diamond: n ≈ 2.42

**Rules for refraction:**
- When light goes from lower n to higher n (e.g., air → glass): bends TOWARD normal (θ₂ < θ₁)
- When light goes from higher n to lower n (e.g., glass → air): bends AWAY from normal (θ₂ > θ₁)
- At normal incidence (θ₁ = 0°): no bending (θ₂ = 0°), only speed changes
- Frequency does NOT change at a boundary — only speed and wavelength change
- n = c/v = λ₀/λ_medium (ratio of wavelengths)

**Apparent depth:**
When viewing an object in a denser medium from a less dense one:
- Apparent depth d' = d × (n_observer / n_object)
- For object in water (n=1.33) viewed from air: d' = d/1.33 ≈ 0.75d (appears 3/4 as deep)
- For object in glass (n=1.5) viewed from air: d' = d/1.5 = 2d/3

### Level 3 — Proficient Synthesis

**Lateral shift in a parallel-sided glass slab:**

Light entering a glass slab (thickness t) emerges parallel to incident ray but displaced sideways. The lateral shift is:

d = t × sin(θ₁ − θ₂) / cos θ₂

where θ₁ is angle of incidence, θ₂ is angle of refraction in glass.

**Normal shift (apparent depth for normal incidence):**
For a glass slab of thickness t (n = n₂) viewed from air (n₁ = 1):
- Normal shift = t(1 − 1/n)
- The object appears closer by this amount.

**Multiple refracting surfaces:**
For n layers, Snell's Law gives: n₁ sin θ₁ = n₂ sin θ₂ = ... = n_k sin θ_k
At the final surface: n₁ sin θ₁ = n_final sin θ_final (the intermediate indices "cancel").

**Refraction at a spherical surface:**
n₁/u + n₂/v = (n₂ − n₁)/R

Where u = object distance, v = image distance, R = radius of curvature (positive if center of curvature on transmission side).

---

## Component 2 — Worked Examples

### WE-1: Applying Snell's Law

**Problem:** A ray of light in air (n₁ = 1.00) strikes a glass surface (n₂ = 1.50) at an angle of incidence of 45°.
(a) Find the angle of refraction.
(b) Does the ray bend toward or away from the normal?
(c) What is the speed of light in the glass?

**Solution:**

**(a) Snell's Law:**
n₁ sin θ₁ = n₂ sin θ₂
1.00 × sin 45° = 1.50 × sin θ₂
0.7071 = 1.50 × sin θ₂
sin θ₂ = 0.7071 / 1.50 = 0.4714
**θ₂ = arcsin(0.4714) ≈ 28.1°**

**(b) Direction:** Since n₂ > n₁ (going from less dense to more dense medium), the ray bends **toward the normal** (θ₂ = 28.1° < θ₁ = 45°). ✓

**(c) Speed in glass:**
n₂ = c/v → v = c/n₂ = (3×10⁸) / 1.50 = **2×10⁸ m/s**

---

### WE-2: Apparent Depth

**Problem:** A fish is 1.5 m below the surface of a pond (n_water = 1.33). A fisherman looks down at it from directly above (normal incidence).
(a) How deep does the fish appear to be?
(b) If the fish looks up at the fisherman standing 2.0 m above the surface, how far above does the fisherman appear?

**Solution:**

**(a) Fish appears to fisherman:**
d' = d × (n_air / n_water) = 1.5 × (1.00 / 1.33) = 1.5 / 1.33 = **1.13 m**
The fish appears only 1.13 m deep, not 1.5 m.

**(b) Fisherman appears to fish:**
The fisherman is in air (n=1) viewed from water (n=1.33):
d' = d × (n_water / n_air) = 2.0 × (1.33 / 1.00) = **2.66 m**
The fisherman appears farther away (objects in less dense medium appear farther when viewed from denser medium).

---

### WE-3: Lateral Shift Through a Glass Slab

**Problem:** A ray of light strikes a glass slab (n = 1.5, thickness t = 4 cm) at an angle of incidence of 60°. Find:
(a) The angle of refraction inside the glass.
(b) The lateral shift of the emergent ray.

**Solution:**

**(a) Angle of refraction:**
sin θ₁ = 1.5 × sin θ₂
sin 60° = 1.5 × sin θ₂
0.8660 = 1.5 × sin θ₂
sin θ₂ = 0.5774
**θ₂ = arcsin(0.5774) ≈ 35.3°**

**(b) Lateral shift:**
d = t × sin(θ₁ − θ₂) / cos θ₂
= 4 × sin(60° − 35.3°) / cos(35.3°)
= 4 × sin(24.7°) / cos(35.3°)
= 4 × 0.4179 / 0.8165
= 4 × 0.5118
**d ≈ 2.05 cm**

The emergent ray is parallel to the incident ray but displaced by 2.05 cm perpendicular to itself.

---

## Component 3 — Misconception Engine

### MC-1: MC-REFRACTION-CHANGES-FREQUENCY

**trigger_signal:** Student states "light bends because its frequency changes at the boundary," "red light refracts more than blue because it has lower frequency," or "frequency depends on the medium."

**conflict_evidence [P28]:** At a glass-air boundary, the wave pattern in glass must match the pattern in air at the boundary — if the frequency were different, the wave crests would pile up at the interface (there would be more crests per second leaving the glass than arriving, or vice versa). Physically: every wavecrest that hits the boundary from one side produces exactly one wavecrest on the other side. Frequency is set by the source (the oscillating atoms in the light emitter) and cannot change at a passive boundary. Measurement confirms: a 600 nm (f = 5×10¹⁴ Hz) orange laser beam entering water has f = 5×10¹⁴ Hz in water, but λ_water = λ₀/n = 600/1.33 = 451 nm. Only λ and v change; f is constant.

**bridge_text [P30]:** Think of frequency as the "rate" at which wave crests are produced at the source. The speed of the wave changes (the crests travel slower in glass), and the wavelength compresses (crests get closer together), but the rate at which they arrive at a point remains the same — one crest per 1/f seconds, always. Frequency is a property of the source, not the medium.

**replacement_text [P31]:** At any medium boundary, the frequency of light is UNCHANGED. What changes is the wave speed (v = c/n) and the wavelength (λ_medium = λ₀/n). The refractive index relates wave speed and wavelength, not frequency: n = c/v = λ₀/λ_medium. Dispersion (different colors refracting different amounts) occurs because n depends on λ (or equivalently on f), not because f changes.

**discrimination_pairs [P33]:**
- "Violet light travels slower in glass than red light because violet has higher frequency" → PARTLY correct conclusion (violet does travel slower) but wrong mechanism: it's because n_violet > n_red (dispersion), not because the frequency changes. Frequency doesn't change in either case.
- "The frequency of light changes at an air-water boundary, which is why the pencil looks bent" → FALSE: bending is due to wave speed change (n change), not frequency change. Frequency is constant throughout.

**s6_path:** If student fails "what changes at boundary" probe → frequency-constant visualization (wavefronts with same temporal spacing, compressed spatial spacing) before mastery gate.

---

### MC-2: MC-DENSER-MEDIUM-MEANS-BENDS-AWAY-FROM-NORMAL

**trigger_signal:** Student states "light bends away from normal when entering glass because glass is denser," inverts the bending rule, or confuses n₁ > n₂ with n₁ < n₂ cases.

**conflict_evidence [P28]:** Apply Snell's Law numerically: n₁ = 1 (air), n₂ = 1.5 (glass), θ₁ = 45°. Calculate: sin θ₂ = (n₁/n₂) sin θ₁ = (1/1.5) × 0.707 = 0.471 → θ₂ = 28°. Since 28° < 45°, the refracted ray is closer to the normal than the incident ray. The wavefront bends toward the normal entering the denser medium. Conceptual reason: the part of the wavefront that enters the glass first slows down while the remaining part is still in air at full speed — this speed difference turns the wavefront toward the normal.

**bridge_text [P30]:** Imagine a line of soldiers marching in a column that hits a muddy patch (slower medium) at an angle. The soldiers who hit the mud first slow down while others are still on dry ground — the column pivots toward the mud (toward the "normal" of the mud boundary). Light entering a denser medium is exactly this: part of the wavefront slows, the rest doesn't, and the wave bends toward the normal. Going from dense to less dense = soldiers leaving mud (speeding up) = bends away from normal.

**replacement_text [P31]:** When light travels from a less dense medium (smaller n) to a more dense medium (larger n), it bends TOWARD the normal (θ₂ < θ₁). When going from more dense to less dense (larger n to smaller n), it bends AWAY from the normal (θ₂ > θ₁). Memory aid: n₁ > n₂ → θ₂ > θ₁ (both inequalities point the same way).

**discrimination_pairs [P33]:**
- "Light entering water from air bends away from the normal (θ₂ > θ₁) because water is denser" → FALSE: n_water > n_air → bends TOWARD normal, θ₂ < θ₁.
- "Light going from glass to air bends away from the normal" → TRUE: n_glass > n_air → going from denser to less dense → θ₂ > θ₁ → bends away from normal. ✓

**s6_path:** If student fails the bending-direction probe → run both air→glass and glass→air numerical Snell's Law problems side by side, then discrimination pairs before re-probe.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Observes pencil-in-water effect but has no model; confused about what changes at boundary | Cannot state Snell's Law or what n represents |
| S3 | Can state n₁sin θ₁ = n₂sin θ₂ but unsure which quantity changes at boundary; confuses frequency and wavelength changes | Attempts Snell's Law but makes errors on which quantity changes; cannot do apparent depth |
| S6 | Correctly applies Snell's Law; knows frequency is unchanged; uncertain about lateral shift or multi-surface refraction | Calculates θ₂ correctly; cannot set up lateral shift formula |
| S9 | Applies Snell's Law fluently; explains apparent depth, lateral shift; handles multi-surface refraction correctly | Correctly does all three WEs; explains bending direction by speed argument |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 3 → full CPA track).

**TA-1 [P01 — Session Open]**
"Place a pencil in a glass of water and look at it from the side. It appears bent. But the pencil hasn't changed — what has changed? Today we'll find the precise law that governs how light bends when it crosses a material boundary, and why. First: do you think the angle of bending depends on color? Write your prediction before we begin."
[Diagnose S0/S3 — checks if student distinguishes wavelength from frequency effects]

**TA-2 [P06 — Concrete Anchor]**
"[Display: Snell's Law diagram — two media, normal, θ₁ and θ₂ labeled.] The rule: n₁sinθ₁ = n₂sinθ₂. Three things to notice: (1) angles always measured from the normal, (2) the product n sinθ is conserved at the boundary, (3) a higher n means slower light means smaller angle with the normal. Practice: air→glass at 45°, glass n=1.5." [→ WE-1 full walkthrough]

**TA-3 [P28 — Conflict Evidence: MC-2]**
"Common reversal: some students think denser medium → bend away from normal. Let's disprove it. At air→glass: n₁=1, n₂=1.5, θ₁=45°. Calculate sin θ₂ = (1/1.5)×sin 45° = 0.471 → θ₂ = 28°. Is 28° > 45°? No. The refracted ray is CLOSER to the normal in glass. Now try glass→air: θ₁=28° → sin θ₂ = 1.5×sin 28° = 0.704 → θ₂ = 44.7° ≈ 45°. Going the other way: angle INCREASES, bends AWAY." [→ MC-2 discrimination pairs]

**TA-4 [P31 — Replacement: MC-1]**
"What changes at the boundary? Many students say frequency. Let's settle it: the wavecrest count at the boundary must balance — every crest that arrives creates one crest on the other side. Frequency is fixed by the source, cannot change at a passive surface. What DOES change: wave speed (v = c/n, slower in glass) and wavelength (λ = λ₀/n, shorter in glass). Frequency stays constant, energy per photon stays constant (E = hf)."

**TA-5 [P06 — Pictorial: apparent depth]**
"[Display: fish-in-water diagram with normal rays and refracted apparent-position rays.] Apparent depth formula: d' = d × n_observer/n_object. At normal incidence, it's clean and exact. A pond 2 m deep appears 1.5 m deep from above. A 2-m-deep object in glass (n=1.5) appears at 2/1.5 = 1.33 m." [→ WE-2]

**TA-6 [P41 — Diagnostic: lateral shift]**
"A glass slab of thickness 4 cm (n=1.5) has a ray entering at 60°. We know the ray emerges parallel — but displaced sideways. How would you set up the formula for lateral shift? Set it up, attempt WE-3, then check: d = t sin(θ₁−θ₂)/cosθ₂." [→ WE-3; confirms S6→S9 transition]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Light in glass (n=1.5) hits an air boundary at θ₁=30°. Find θ₂ and state which way the ray bends. (2) A pool appears 1.2 m deep from air — what is the actual depth? (3) For a glass slab (n=1.6, t=3 cm) with θ₁=50°, calculate θ₂ and the lateral shift. (4) Why does frequency not change at a refraction boundary while wavelength does?

Closing thought: Snell's Law (first recorded by Ibn Sahl in 984 CE) underlies every lens, every eyeglass prescription, and every fiber-optic cable in the world's communications infrastructure.

Spaced retrieval: +1 day (Snell's Law setup and which quantities change), +4 days (apparent depth formula), +2 weeks (lateral shift calculation)."

[P91 gate: threshold 0.80. Failure → return to MC-1 and MC-2 discrimination drills.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** Light travels from air (n=1) into water (n=1.33) at an angle of incidence of 37°. Find the angle of refraction and state whether the ray bends toward or away from the normal. What is the speed of light in water?

**P-2 (Developing — identifies S6):** A coin lies at the bottom of a 2.4 m deep swimming pool (n=1.33). A lifeguard looks directly down at it. (a) How deep does the coin appear? (b) What is the actual speed of light in pool water? (c) Does the wavelength of the light from the coin increase or decrease as it leaves the water? Explain.

**P-3 (Proficient — identifies S9):** A glass slab (n=1.6) is 5 cm thick. A ray hits the top surface at 50°. (a) Find the refraction angle inside the glass. (b) Calculate the lateral shift. (c) Show that the emergent ray is parallel to the incident ray.

**P-4 (Mastery gate — confirms S9):** A light ray passes through three layers: air (n=1) → glass (n=1.5) → water (n=1.33) → air (n=1). The initial angle of incidence is 45°. (a) Find the angle in each medium. (b) What is the final angle in the last air layer? (c) Prove using Snell's Law that the final angle equals the initial angle whenever the first and last media are the same. Required: 3/3 at ≥0.80 accuracy for mastery gate.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Snell's Law interactive. Two media shown (upper = medium 1, lower = medium 2). Sliders: n₁ (1.0–2.5), n₂ (1.0–2.5), θ₁ (0–89°). Displays: normal line, incident ray, refracted ray, θ₁ and θ₂ arcs, numerical values. Updates in real time. Button: "show total internal reflection" — highlights when θ₁ > critical angle (glass→air mode).

**VIS-2:** Apparent depth animation. Object (coin) at bottom of water-filled container. Multiple refracted rays from coin to air, extended backward as dashed lines to apparent image position. Slider adjusts n. Shows apparent depth = actual depth / n for normal incidence. Labels: "actual position," "apparent position."

**VIS-3:** Wavefront bending visualization. Plane wavefronts approaching a medium boundary at an angle. As each wavefront enters the denser medium, it slows and the wavefronts bend. Shows that frequency (time between wavefronts) is constant while wavelength (distance between wavefronts) changes. Arrows indicate direction of propagation before and after.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.nature-of-light | Light's wave model explains refraction via wavefront bending | prerequisite |
| phys.opt.total-internal-reflection | Refraction at critical angle leads to total internal reflection | unlocks |
| phys.opt.lenses | Lens action is refraction at two curved surfaces; lensmaker's equation | unlocks |
| phys.opt.dispersion | Dispersion arises from wavelength-dependent refractive index | unlocks |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.refraction ✓ |
| V-2 | name matches KG | PASS — "Refraction of Light" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (developing=3) | PASS ✓ |
| V-5 | bloom matches KG (apply) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — nature-of-light ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (3) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 3, full CPA track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (Snell's Law), WE-2 (apparent depth), WE-3 (lateral shift) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P06/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 4 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
