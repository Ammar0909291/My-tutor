# Teaching Blueprint — phys.opt.brewsters-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.brewsters-law
name: "Brewster's Law and Polarization by Reflection"
domain: optics
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.opt.polarization
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Stand near a lake on a sunny day. At a steep angle looking down, you can see fish underwater — the glare is minimal. At a shallower angle (closer to horizontal), the lake's surface becomes a bright mirror-like sheet of glare — a reflection so strong it hides everything below. This glare is polarized light. At exactly Brewster's angle, the reflected ray is completely polarized (oscillating only horizontally) while the transmitted ray is only partially polarized. Polarized sunglasses, which block horizontal E-field oscillations, eliminate this glare. The angle at which complete polarization occurs depends only on the ratio of refractive indices of the two media.

### Level 2 — Developing Understanding

**Brewster's Law:**

At Brewster's angle θ_B, the reflected ray is COMPLETELY polarized perpendicular to the plane of incidence (s-polarized, or TE-polarized — E oscillates horizontally if incidence is in a vertical plane).

**tan θ_B = n₂/n₁**

For air (n₁ = 1) → glass (n₂ = 1.5): tan θ_B = 1.5 → **θ_B ≈ 56.3°**
For air → water (n₂ = 1.33): tan θ_B = 1.33 → **θ_B ≈ 53.1°**
For air → diamond (n₂ = 2.42): tan θ_B = 2.42 → **θ_B ≈ 67.5°**

**Geometric relationship at Brewster's angle:**
At θ_B, the reflected and refracted (transmitted) rays are perpendicular:
θ_B + θ_r = 90°  (where θ_r is the refraction angle)

This can be derived: if θ_r = 90° − θ_B, Snell's Law gives:
n₁ sin θ_B = n₂ sin θ_r = n₂ sin(90° − θ_B) = n₂ cos θ_B
→ **tan θ_B = n₂/n₁** ✓

**Polarization states:**
- Reflected ray: fully s-polarized (E ⊥ plane of incidence)
- Refracted ray: partially polarized (contains more s-polarized than p-polarized, but not purely polarized)
- Degree of polarization increases through multiple glass plates (pile-of-plates polarizer)

**Applications:**
- Polarized sunglasses: transmission axis vertical → blocks horizontal (s-) polarized glare from horizontal surfaces
- Laser physics: Brewster windows allow p-polarized light to pass with zero reflection loss (anti-reflection geometry)
- Photography: circular polarizing filters eliminate Brewster-angle reflections from glass and water surfaces

**Why the reflected ray is completely polarized at θ_B:**
The electromagnetic explanation (Fresnel equations): the p-polarized component (E in the plane of incidence) requires oscillating dipoles to radiate along their length. At θ_B, the reflected direction is exactly along the dipole oscillation axis — a dipole radiates zero power along its axis. So the p-polarized reflected ray has zero amplitude → only s-polarization is reflected.

### Level 3 — Proficient Synthesis

**Fresnel reflection coefficients (qualitative):**
The amplitude reflection coefficients for s and p polarizations differ:
- r_s = (n₁cos θ_i − n₂cos θ_t) / (n₁cos θ_i + n₂cos θ_t) [never zero for n₁ ≠ n₂]
- r_p = (n₂cos θ_i − n₁cos θ_t) / (n₂cos θ_i + n₁cos θ_t) [zero at Brewster's angle]

At θ_B: r_p = 0 because n₂cos θ_B = n₁cos θ_r and θ_B + θ_r = 90°.

**Pile-of-plates polarizer:**
A single surface at Brewster's angle partially polarizes the transmitted beam. After N glass plates (2N surfaces), the degree of polarization increases. The transmitted beam approaches full p-polarization as N → ∞. Useful for wavelengths where dichroic polarizers have poor performance (IR, UV).

**Brewster angle from both sides:**
- Air→glass at θ_B = arctan(n): angle measured from air side
- Glass→air at θ_B' = arctan(1/n) = 90° − θ_B: angle measured from glass side
- These are complementary: θ_B + θ_B' = 90°

**Laser Brewster windows:**
In gas lasers, the laser tube ends with glass plates set at Brewster's angle. P-polarized light (E in the plane of incidence) passes with zero reflection at each surface. S-polarized light reflects significantly and undergoes higher loss. After multiple passes through the cavity, only p-polarized light oscillates → natural selection of one linear polarization.

---

## Component 2 — Worked Examples

### WE-1: Finding Brewster's Angle

**Problem:** Light travels from air into the following materials. Find Brewster's angle for each:
(a) Window glass (n = 1.52)
(b) Water (n = 1.33)
(c) A glass-water interface (light from glass n=1.52 into water n=1.33)

**Solution:**

**(a) Air → glass:**
tan θ_B = n₂/n₁ = 1.52/1.00 = 1.52
**θ_B = arctan(1.52) ≈ 56.7°**

Verify: refracted angle θ_r = 90° − θ_B = 33.3°. Check with Snell's: sin(56.7°)/sin(33.3°) = 0.836/0.549 = 1.52 ✓

**(b) Air → water:**
tan θ_B = 1.33/1.00 = 1.33
**θ_B = arctan(1.33) ≈ 53.1°**

**(c) Glass → water:**
tan θ_B = n₂/n₁ = 1.33/1.52 = 0.875
**θ_B = arctan(0.875) ≈ 41.2°**

Note: Brewster's angle at glass→water is smaller than at air→glass, and both reflected rays are fully s-polarized.

---

### WE-2: Polarized Sunglasses and Glare Reduction

**Problem:** Sunlight reflects off a smooth lake surface (n = 1.33) at the Brewster angle.
(a) What is the Brewster angle for this surface?
(b) The reflected light is 100% s-polarized (horizontal). Polarized sunglasses have their transmission axis vertical (transmits vertical/p-polarized E-field, blocks horizontal). What fraction of the reflected glare is blocked?
(c) If 30% of the total reflected light is at Brewster's angle (s-polarized), and the remaining 70% is unpolarized (reflected at other angles), what fraction of total reflected light is blocked by the sunglasses?

**Solution:**

**(a) Brewster angle:**
tan θ_B = 1.33/1.00 → **θ_B ≈ 53.1°**

**(b) Blocking the Brewster-angle reflected light:**
Reflected light at θ_B is 100% s-polarized (horizontal). Sunglasses transmit vertical only → block all horizontal.
**Fraction blocked = 100%** of the Brewster-angle reflected component.

**(c) Total blocking:**
Brewster component (100% s-polarized): 30% of total reflected → all 30% blocked.
Non-Brewster component (unpolarized): 70% → sunglasses block 50% of this (the horizontal component) → blocked = 35%.

Total blocked = 30% + 35% = **65% of total reflected light blocked.**
Total transmitted = 35% of original.

---

### WE-3: Brewster Window in a Laser

**Problem:** A He-Ne laser tube uses glass Brewster windows (n = 1.52). At each Brewster window, p-polarized light passes with zero reflection loss, while s-polarized light has reflectance R_s ≈ 0.15 (15%) per surface.
(a) A round trip involves passing 4 Brewster surfaces (2 windows × 2 passes). After 1000 round trips, what fraction of the initial s-polarized power remains?
(b) What fraction of p-polarized power remains after 1000 round trips?
(c) Explain why He-Ne lasers emit linearly polarized light.

**Solution:**

**(a) S-polarized after 1000 round trips:**
At each of 4 surfaces per round trip: fraction transmitted = 1 − R_s = 1 − 0.15 = 0.85
After 1 round trip: (0.85)⁴ = 0.522 (52.2% remaining)
After 1000 round trips: (0.85)^{4000} = 0.85^{4000}

This is astronomically small: log₁₀(0.85^{4000}) = 4000 × log₁₀(0.85) = 4000 × (−0.0706) = −282.4
(0.85)^{4000} = 10^{−282.4} ≈ **essentially zero**

**(b) P-polarized after 1000 round trips:**
Zero reflection loss per surface: transmitted fraction = 1 − 0 = 1.00
After 1000 round trips: (1.00)^{4000} = **1.00 = 100%** (no loss from the Brewster windows)

**(c) Why linearly polarized emission:**
The laser cavity selects the polarization state with lowest loss. P-polarized light experiences zero reflection loss at Brewster windows → oscillates with near-100% efficiency. S-polarized light loses 15% per surface → after a few round trips, its intensity is negligibly small compared to p-polarized. Natural selection of p-polarization occurs without any active polarizer. Result: all He-Ne lasers with Brewster windows emit completely p-linearly polarized light.

---

## Component 3 — Misconception Engine

### MC-1: MC-BREWSTERS-ANGLE-COMPLETELY-POLARIZES-REFRACTED-RAY

**trigger_signal:** Student states "at Brewster's angle, both reflected AND refracted rays are completely polarized" or "the refracted ray becomes pure p-polarized."

**conflict_evidence [P28]:** The Fresnel equations show: at Brewster's angle, r_p = 0 (no p-reflection) → reflected ray contains only s-polarization (100% s-polarized). But the refracted ray contains ALL the p-polarized light that wasn't reflected PLUS most of the s-polarized light (most s is transmitted too, just not 100%). The refracted ray is partially polarized — it has more p than s, but is not purely p. Measurement: degree of polarization of refracted ray at θ_B for glass ≈ 0.38 (much less than 100%). Complete polarization of the refracted beam requires a "pile of plates" — many surfaces.

**bridge_text [P30]:** At Brewster's angle, r_p = 0 means the p-component has NO reflected ray — ALL p-polarized light goes into the refracted beam. But plenty of s-polarized light also refracts (most of it does). So the refracted beam has a mix: 100% of the p + most of the s. It's richer in p-polarization but not pure p.

**replacement_text [P31]:** At Brewster's angle: the REFLECTED ray is completely s-polarized (100%). The refracted ray is only PARTIALLY polarized — it contains all the p-component but also significant s-component. To produce a completely p-polarized transmitted beam, one needs multiple plates (pile-of-plates polarizer) or a birefringent crystal. Brewster's angle gives complete polarization only for the reflected ray.

**discrimination_pairs [P33]:**
- "At Brewster's angle, the refracted ray is completely p-polarized" → FALSE: it contains s-polarization too (just less than in the reflected ray).
- "At Brewster's angle, the reflected ray is completely s-polarized" → TRUE: r_p = 0 → no p-component in reflected ray. ✓

**s6_path:** If student fails "which ray is completely polarized" probe → Fresnel coefficient display (show r_p = 0 but r_s ≠ 0 at θ_B) + comparison of reflected vs. refracted polarization states before mastery gate.

---

### MC-2: MC-POLARIZED-SUNGLASSES-BLOCK-ALL-REFLECTIONS

**trigger_signal:** Student states "polarized sunglasses eliminate all reflections from water and glass surfaces."

**conflict_evidence [P28]:** Reflections at non-Brewster angles are NOT completely polarized — they are partially polarized or unpolarized. Polarized sunglasses block the horizontal (s-) component, but partial reflections at steep angles (normal incidence) are unpolarized → sunglasses only block half of these. Also, reflections from vertical surfaces (like a window reflecting a building across the street) may have vertically polarized components that sunglasses transmit. WE-2 part (c) showed only 65% of total reflected light is blocked by sunglasses, not 100%.

**bridge_text [P30]:** Polarized sunglasses are optimized for the specific case: horizontal reflective surfaces (roads, water) viewed at angles near Brewster's angle. In that specific geometry, glare is almost completely eliminated. But other reflections (from walls, at very steep angles, from vertical surfaces) involve mixed polarization states and are only partially reduced.

**replacement_text [P31]:** Polarized sunglasses are specifically effective against glare from horizontal surfaces (water, roads) viewed near Brewster's angle — there, reflected light is nearly completely s-polarized (horizontal), which the sunglasses block almost entirely. Reflections at other angles or from non-horizontal surfaces are only partially reduced. The sunglasses block the horizontal E-field component from ALL light — not just reflections — reducing overall intensity by ~50% for unpolarized and ~100% for horizontally polarized glare.

**discrimination_pairs [P33]:**
- "Polarized sunglasses completely eliminate all reflected glare in all directions" → FALSE: effective near Brewster's angle on horizontal surfaces; partial for other geometries.
- "Polarized sunglasses are effective at reducing road glare while driving because roads are nearly horizontal" → TRUE: pavement glare at low sun angles ≈ Brewster angle (53°) → mostly horizontal polarization → sunglasses nearly eliminate it. ✓

**s6_path:** If student thinks polarizers block all reflections → WE-2 (c) calculation showing only 65% blocked before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Has heard of Brewster's angle but cannot state the formula; knows polarized sunglasses reduce glare | Cannot derive tan θ_B or apply it numerically |
| S3 | Can state tan θ_B = n₂/n₁; confused about which ray (reflected or refracted) is completely polarized; thinks both become polarized | Calculates θ_B correctly; cannot distinguish polarization state of reflected vs. refracted ray |
| S6 | Correctly applies Brewster's Law; knows reflected ray is fully s-polarized; uncertain about pile-of-plates or laser Brewster windows | Correctly does WE-1; cannot set up WE-3 multiple-round-trip calculation |
| S9 | Applies Brewster's Law fluently; explains Fresnel reflection coefficient physically; handles pile-of-plates and laser window applications; explains sunglasses correctly | Correctly handles all three WEs; derives tan θ_B from θ_B + θ_r = 90° and Snell's Law |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 5, accelerated P track).

**TA-1 [P01 — Session Open]**
"Why do polarized sunglasses eliminate glare from a lake but not from a white wall? And why are they designed with horizontal-blocking transmission axes rather than vertical? These two questions contain Brewster's Law. First: predict — at what angle to a water surface would glare be most strongly polarized? Why would it matter that light is at that specific angle?"
[Diagnose S0/S3 — does student know reflected light is polarized?]

**TA-2 [P06 — Concrete Anchor]**
"[Display: light ray hitting glass surface at various angles — refracted and reflected rays shown with polarization state.] At any angle: both s and p components reflect and refract. At Brewster's angle: the p-component has zero reflection amplitude (dipole argument: reflected p-ray would be along the dipole's oscillation axis → zero radiation). Formula: tan θ_B = n₂/n₁. Reflected ray becomes 100% s-polarized. Refracted ray: still partially mixed." [→ WE-1]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Which ray is completely polarized? Test: at Brewster's angle for glass (n=1.5), measure polarization of refracted ray. Result: degree of polarization ≈ 38%, not 100%. Now measure reflected ray: 100% s-polarized. The Fresnel equations show r_p = 0 → reflected p component = 0. But r_s ≠ 0 → s still partially reflects. Refracted ray = (all transmitted p) + (most transmitted s) → partially polarized. Only the REFLECTED ray achieves complete polarization at θ_B." [→ MC-1 discrimination pairs]

**TA-4 [P31 — Replacement: MC-2]**
"Do polarized sunglasses block ALL reflections? Calculate: lake reflects at Brewster angle (53°) → 100% s-polarized → sunglasses block all of it. But light reflected at 20° (steep) → mostly unpolarized → sunglasses only block 50%. And vertical windows → p-polarized component is vertical → sunglasses transmit it. WE-2(c) shows 65% of typical mixed reflection is blocked — not 100%." [→ WE-2]

**TA-5 [P06 — Pictorial: geometric relationship]**
"[Display: at Brewster angle, reflected ray and refracted ray are perpendicular (90° between them).] This is not a coincidence — it follows from Snell's Law when θ_B + θ_r = 90°. Derive: n₁ sinθ_B = n₂ sinθ_r = n₂ sin(90°−θ_B) = n₂ cosθ_B → tanθ_B = n₂/n₁. The perpendicularity of reflected and refracted rays is the geometric signature of Brewster's angle."

**TA-6 [P41 — Diagnostic: laser Brewster window]**
"A He-Ne laser uses Brewster windows (n=1.52). S-polarized light loses 15% per surface; p-polarized loses 0%. 4 surfaces per round trip. After just 10 round trips, what fraction of s-polarized intensity remains? [Answer: (0.85)^{40} ≈ 0.002 = 0.2%.] After 100 round trips? [≈ 6×10⁻²⁷ ≈ 0.] Why does the laser naturally emit only p-polarized light? [→ WE-3 walkthrough]"

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Light hits a glass slab (n=1.60) from air at 58°. Is this greater or less than Brewster's angle? Calculate θ_B and determine the polarization state of the reflected ray. (2) Identify the Brewster angle at a glass-water boundary (n₁=1.50, n₂=1.33). (3) A polarized beam (horizontal E-field, I₀=100 W/m²) reflects off a horizontal water surface at exactly Brewster's angle. What intensity is reflected? What intensity is transmitted?

Closing thought: Brewster published this law in 1815, before Maxwell's electromagnetic theory. He discovered empirically what was only explained physically decades later — that the geometry of dipole radiation forbids the p-polarized component from reflecting at one specific angle.

Spaced retrieval: +1 day (tan θ_B = n₂/n₁ and which ray is completely polarized), +4 days (perpendicularity condition derivation), +2 weeks (pile-of-plates and laser Brewster window applications)."

[P91 gate: threshold 0.80. Failure → MC-1 "which ray is fully polarized" drill before re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** (a) State Brewster's Law. (b) Find Brewster's angle for light hitting glass (n=1.6) from air. (c) Which polarization component is absent in the reflected ray at this angle?

**P-2 (Developing — identifies S6):** Light hits a water surface (n=1.33) from air at Brewster's angle. (a) Find θ_B. (b) What is the angle between the reflected and refracted rays? Show this using geometry. (c) If the incident light is completely s-polarized (intensity I₀), what is the reflected intensity compared to normal-incidence reflection?

**P-3 (Proficient — identifies S9):** A pile-of-plates polarizer consists of 4 glass plates (8 surfaces, each at Brewster's angle). For each surface: T_p = 1 (no p reflection), T_s = 0.85 (15% s reflection, 85% s transmission). (a) For an unpolarized beam I₀, find the ratio I_p/I_s after passing through all 8 surfaces. (b) Calculate the degree of polarization P = (I_p − I_s)/(I_p + I_s) of the transmitted beam.

**P-4 (Mastery gate — confirms S9):** (a) Derive Brewster's Law from Snell's Law using the condition that reflected and refracted rays are perpendicular. (b) An optical glass (n=1.52) is used as a laser Brewster window. For s-polarized light, reflectance per surface R_s = [(n−1)/(n+1)]² at Brewster's angle. Calculate R_s and find the number of round trips after which s-polarized intensity drops to 1% of initial (4 surfaces per round trip). (c) Why is the Brewster angle for a glass→air surface the complement of the air→glass Brewster angle? Required: 3/3 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Brewster angle interactive. Slider: angle of incidence (0°–90°). For each angle, shows reflected and refracted rays with polarization state (arrows perpendicular to propagation for E-field). Shows reflectance R_p (drops to zero at θ_B) and R_s (non-zero throughout). Highlights the θ_B where R_p = 0. Displays the perpendicularity condition when at Brewster angle.

**VIS-2:** Polarized sunglasses glare reduction. Scene: horizontal water surface with two viewpoints. Without filter: shows both s-polarized glare (from Brewster reflections) and non-Brewster reflections. With polarizing filter (vertical transmission axis): shows s-polarized glare eliminated, non-Brewster partially reduced. Toggle on/off to compare.

**VIS-3:** Pile-of-plates polarizer. Shows unpolarized beam entering a stack of glass plates at Brewster's angle. After each plate: intensity bar charts for I_p and I_s. As plate count increases, I_p/I_s ratio increases. Graph: degree of polarization vs. number of plates. Shows approach to complete polarization.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.polarization | Brewster's Law is the quantitative mechanism for polarization by reflection; builds on Malus's Law | prerequisite |
| phys.opt.refraction | Snell's Law is used to derive tan θ_B = n₂/n₁ from the perpendicularity condition | prerequisite |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.brewsters-law ✓ |
| V-2 | name matches KG | PASS — "Brewster's Law and Polarization by Reflection" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (advanced=5) | PASS ✓ |
| V-5 | bloom matches KG (apply) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — polarization ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (4) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 5, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (θ_B for multiple media), WE-2 (sunglasses glare reduction), WE-3 (laser Brewster window) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P06/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 2 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
