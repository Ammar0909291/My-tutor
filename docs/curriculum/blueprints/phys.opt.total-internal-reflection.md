# Teaching Blueprint — phys.opt.total-internal-reflection

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.total-internal-reflection
name: "Total Internal Reflection and Optical Fibres"
domain: optics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.opt.refraction
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Fill a glass with water and look up through the bottom at a steep angle. The water-air boundary looks like a perfect mirror — you can see the reflection of the interior but nothing outside. At shallow angles you can see through to the air above, but past a certain angle the surface becomes a perfect reflector. This is total internal reflection (TIR): when light in a denser medium tries to cross into a less dense medium at too steep an angle, it bounces back completely — not partially, but 100%. This is the principle behind optical fibres, where light zig-zags along a glass core for thousands of kilometres with virtually no loss.

### Level 2 — Developing Understanding

**Critical angle (θ_c):**
When light travels from a denser medium (n₁) to a less dense medium (n₂ < n₁), at some angle of incidence the refracted ray skims along the boundary (θ_r = 90°).

Applying Snell's Law: n₁ sin θ_c = n₂ sin 90° = n₂

**sin θ_c = n₂/n₁**

For glass (n₁ = 1.5) → air (n₂ = 1.0): sin θ_c = 1/1.5 = 2/3 → **θ_c ≈ 41.8°**
For water (n₁ = 1.33) → air: sin θ_c = 1/1.33 = 0.752 → **θ_c ≈ 48.8°**
For diamond (n₁ = 2.42) → air: sin θ_c = 1/2.42 = 0.413 → **θ_c ≈ 24.4°**

**Conditions for TIR:**
1. Light must travel from a denser medium to a less dense medium (n₁ > n₂)
2. Angle of incidence must exceed the critical angle (θ₁ > θ_c)

When θ₁ > θ_c: complete reflection at the boundary, no transmitted ray. The reflectance is 100% — perfect mirror.

**Optical fibres:**
- Core: high n glass (n₁ ≈ 1.5–1.7)
- Cladding: lower n glass (n₂ ≈ 1.45–1.6) surrounding the core
- Light entering within the acceptance cone undergoes TIR at each core-cladding boundary → propagates along the fibre with minimal loss
- Numerical aperture: NA = √(n₁² − n₂²) = n_air sin θ_acceptance
- Acceptance angle: θ_max = arcsin(NA)

**Applications of TIR:**
- Optical fibres: communications (internet), medical endoscopes
- Prism binoculars (45° prisms replace silvered mirrors; 100% reflection, no tarnishing)
- Diamonds: low θ_c (24°) → most entering light undergoes multiple TIR → brilliant appearance
- Mirages: TIR in hot air layers near hot road surface
- Fibre-optic sensors

### Level 3 — Proficient Synthesis

**Evanescent wave:**
Beyond θ_c, there is still a field that penetrates a fraction of a wavelength into the less dense medium (the evanescent wave), decaying exponentially. It carries no energy in steady state. Applications: frustrated TIR (FTIR), TIRF microscopy, optical coupling.

**Step-index vs. graded-index fibres:**
- Step-index: abrupt n change at core-cladding boundary; simpler but more pulse spreading (modal dispersion)
- Graded-index: n varies gradually from centre outward; rays travel curved paths, arrive together → reduced dispersion; used for multimode data transmission

**Fibre losses:**
- Absorption (impurities)
- Rayleigh scattering (λ⁻⁴ dependence → longer wavelengths scatter less → communication uses 1310 nm, 1550 nm IR windows)
- Bending losses (radius < minimum bend radius breaks TIR condition)

**Prism applications:**
A 45°-45°-90° glass prism (n=1.5, θ_c ≈ 41.8°): a ray hitting the 90° face at 45° incidence → undergoes TIR (45° > 41.8°). Used in binoculars and periscopes for 90° or 180° deflection with 100% reflectance.

---

## Component 2 — Worked Examples

### WE-1: Critical Angle Calculation

**Problem:** Light travels from a glass slab (n₁ = 1.52) into water (n₂ = 1.33).
(a) Find the critical angle for TIR at this glass-water boundary.
(b) Would TIR occur for a ray hitting the boundary at 60°?
(c) What is the critical angle if the glass is in contact with air instead?

**Solution:**

**(a) Glass-water critical angle:**
sin θ_c = n₂/n₁ = 1.33/1.52 = 0.875
**θ_c = arcsin(0.875) ≈ 61.0°**

**(b) At θ = 60°:** Since 60° < θ_c = 61°, TIR does NOT occur — partial transmission and reflection at the boundary.

**(c) Glass-air critical angle:**
sin θ_c = 1.00/1.52 = 0.658
**θ_c = arcsin(0.658) ≈ 41.1°**

Note: critical angle is smaller for glass-air than glass-water (easier to achieve TIR with air).

---

### WE-2: Optical Fibre — Acceptance Angle

**Problem:** An optical fibre has core n₁ = 1.50 and cladding n₂ = 1.45.
(a) Find the critical angle at the core-cladding interface.
(b) Find the numerical aperture (NA).
(c) Find the acceptance angle (half-angle of the acceptance cone from air into the fibre).

**Solution:**

**(a) Critical angle:**
sin θ_c = n₂/n₁ = 1.45/1.50 = 0.9667
**θ_c = arcsin(0.9667) ≈ 75.2°**

**(b) Numerical aperture:**
NA = √(n₁² − n₂²) = √(1.50² − 1.45²)
= √(2.25 − 2.1025)
= √0.1475
**NA ≈ 0.384**

**(c) Acceptance angle (from air, n=1):**
n_air × sin θ_max = NA
sin θ_max = NA / 1.00 = 0.384
**θ_max = arcsin(0.384) ≈ 22.6°**

Light entering the fibre within a cone of half-angle 22.6° from the axis will undergo TIR and propagate through the fibre.

---

### WE-3: Prism TIR

**Problem:** A 45°-45°-90° glass prism (n = 1.5, θ_c ≈ 41.8°) is used to deflect a beam by 90°. A horizontal ray enters the vertical face perpendicular to it (no refraction at entry).
(a) At what angle does it hit the horizontal (hypotenuse) face?
(b) Does TIR occur?
(c) What is the path of the reflected ray?

**Solution:**

**(a) Geometry:** The ray enters horizontally, travels horizontally inside the prism, and hits the hypotenuse (slanted) face. The hypotenuse makes 45° with the horizontal. The normal to the hypotenuse makes 45° with the horizontal. The angle of incidence at the hypotenuse = 45°.

**(b) TIR check:** θ₁ = 45° > θ_c = 41.8° ✓ → **TIR occurs**

**(c) Reflected ray:** By the law of reflection at the hypotenuse: the ray reflects downward (at 45° to the hypotenuse normal = 45° from vertical = vertically downward). The beam exits through the bottom face perpendicular to it (no second refraction).

Result: the prism deflects the ray by exactly 90° with 100% reflectance — superior to a silvered mirror (which typically reflects 85–95%).

---

## Component 3 — Misconception Engine

### MC-1: MC-TIR-CAN-OCCUR-FROM-LESS-DENSE-TO-DENSER

**trigger_signal:** Student attempts to find critical angle for light going from air into glass, or states "TIR occurs at any large angle of incidence."

**conflict_evidence [P28]:** Apply Snell's Law at air→glass: n₁ sinθ₁ = n₂ sinθ₂ → 1.0 × sinθ₁ = 1.5 × sinθ₂ → sinθ₂ = sinθ₁/1.5 ≤ sinθ₁. Since n₂ > n₁, the refracted angle is always smaller than the incident angle — the refracted ray bends toward normal. For total internal reflection to occur, the refracted angle would need to reach 90°, requiring sinθ₁ = 1.5 × sin90° = 1.5 > 1 — impossible. No critical angle exists for light going from a less dense to a more dense medium. TIR requires n₁ > n₂.

**bridge_text [P30]:** Critical angle exists only when n₁ sinθ_c = n₂ × sin90° = n₂ can be satisfied, which requires n₂/n₁ ≤ 1 → n₂ ≤ n₁. If you try to apply this formula for n₁ < n₂, you get sin θ_c = n₂/n₁ > 1 — physically impossible (sin can't exceed 1).

**replacement_text [P31]:** TIR requires TWO conditions: (1) light travels from denser to less dense medium (n₁ > n₂); (2) angle of incidence exceeds the critical angle. Neither condition alone is sufficient. If n₁ < n₂, TIR is impossible regardless of angle; if n₁ > n₂ but θ < θ_c, partial transmission occurs.

**discrimination_pairs [P33]:**
- "Light entering glass from air can undergo TIR at steep angles" → FALSE: n_air < n_glass; TIR is geometrically impossible going from less dense to denser.
- "Light in glass hitting an air surface at 50° will TIR if the glass has n = 1.5" → TRUE: θ_c for glass-air is ~41.8°; 50° > 41.8° → TIR occurs. ✓

**s6_path:** If student fails TIR direction probe → run sin θ_c = n₂/n₁ formula check for both directions; confirm that n₁ < n₂ gives impossible result before re-probe.

---

### MC-2: MC-TIR-IS-PARTIAL-REFLECTION

**trigger_signal:** Student states "TIR reflects most of the light but some escapes," treats TIR as just very strong partial reflection, or asks "how much gets through?"

**conflict_evidence [P28]:** Measure reflectance vs. angle of incidence experimentally (Fresnel equations). Below θ_c: partial reflection, transmission > 0; reflectance increases as θ → θ_c. At exactly θ_c: refracted ray at 90° (along surface) — effectively zero transmitted energy. Above θ_c: transmittance = 0 exactly, reflectance = 1.00 = 100%. This is a threshold phenomenon, not a gradual increase — beyond θ_c, reflectance is exactly 1. Optical fibres rely on this: TIR gives zero power loss at each reflection, so light can travel thousands of km with amplification only every 80 km.

**bridge_text [P30]:** TIR is not "very strong reflection" — it is PERFECT reflection. The Fresnel equations (governing partial reflection at angles below θ_c) give transmittance that drops continuously to zero at θ_c, then remains zero for all θ > θ_c. The word "total" in TIR means 100% — it is a precise mathematical threshold, not a description of strength.

**replacement_text [P31]:** Above the critical angle, TIR is exactly 100% reflection — no energy is transmitted into the second medium. This makes TIR superior to metallic mirrors (which absorb 5–15%) for applications requiring low loss. The evanescent field in the second medium is real but carries zero net energy flow; it does not represent "escaping" light.

**discrimination_pairs [P33]:**
- "An optical fibre works by reflecting about 99.9% of light at each bounce" → FALSE: TIR reflects exactly 100%. Loss in real fibres comes from absorption and scattering in the core material, not from TIR imperfection.
- "Beyond the critical angle, some light still gets through, just very faint" → FALSE: above θ_c, transmittance = 0. There is an evanescent field, but it carries no energy into the second medium.

**s6_path:** If student insists on partial transmission → Fresnel reflectance curve display (shows step to 1.0 at θ_c, not asymptotic approach) + optical fibre loss discussion before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Has seen optical fibres; no model for why light stays inside; confuses TIR with regular reflection | Cannot state condition for TIR; treats TIR as "mirror effect" |
| S3 | Can state conditions for TIR; confuses which direction allows TIR; thinks it's gradual not threshold | Gets critical angle formula but applies it to wrong direction; cannot calculate NA |
| S6 | Correctly calculates critical angle; understands denser-to-less-dense requirement; uncertain about optical fibre NA or prism applications | Correctly does WE-1; cannot set up WE-2 (NA formula) |
| S9 | Applies TIR conditions fluently; calculates critical angle, NA, acceptance angle; explains prism and fibre applications; describes evanescent field | Correctly handles all three WEs; explains why diamond sparkles via low θ_c |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 4, accelerated P track).

**TA-1 [P01 — Session Open]**
"Look through a glass of water from the side at a steep angle. The surface from below appears mirror-like — you can see reflections of things in the water but nothing outside. When does this happen, and why does it matter for optical fibres? First question: what two conditions must be satisfied for this perfect internal reflection? Write them before we start."
[Diagnose S0/S3 — checks if student knows denser-to-less-dense requirement]

**TA-2 [P06 — Concrete Anchor]**
"[Display: ray going from glass to air at increasing angles: 20°, 30°, 40°, 42° (TIR).] Each angle shows refracted and reflected rays. At 42°: refracted ray vanishes entirely. The formula: sin θ_c = n₂/n₁. For glass-air: sin θ_c = 1/1.5 = 2/3 → θ_c = 41.8°. For diamond-air: sin θ_c = 1/2.42 → θ_c = 24.4°. A diamond's low critical angle means most entering light bounces multiple times inside before escaping — producing brilliance." [→ WE-1]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Direction matters. Can TIR occur going from air INTO glass? Apply: sin θ_c = n₂/n₁ = 1.5/1.0 = 1.5. But sin ≤ 1 always — so no solution exists! TIR is geometrically impossible from less dense to denser. The math tells us: sin(θ_c) > 1 has no physical solution. Only denser→less-dense allows TIR." [→ MC-1 discrimination pairs]

**TA-4 [P31 — Replacement: MC-2]**
"TIR is 100%, not 99.9%. Show Fresnel reflectance curve: below θ_c, partial reflection (some transmission). At exactly θ_c: refracted ray at 90°, zero transmitted energy. Above θ_c: reflectance = 1.000 exactly. This is why optical fibres work — at every bounce, 100% of light stays in. Loss in real fibres comes from material absorption and Rayleigh scattering (why fibres use 1550 nm IR, not visible light — less scattering)." [→ MC-2 discrimination pairs]

**TA-5 [P06 — Pictorial: optical fibre structure]**
"[Display: optical fibre cross-section — core n₁, cladding n₂, acceptance cone, ray path bouncing along.] Three parameters: critical angle at core-cladding boundary, numerical aperture NA = √(n₁²−n₂²), acceptance angle from outside. The wider the acceptance cone (larger NA), the more light can enter. Trade-off: larger NA often means more modal dispersion (different ray paths take different times)." [→ WE-2]

**TA-6 [P41 — Diagnostic: prism]**
"A 45°-45°-90° prism (n=1.5, θ_c=41.8°). A horizontal ray enters the vertical face (no refraction — normal incidence). It hits the hypotenuse at what angle? Does TIR occur? Where does the reflected ray go? Set up the geometry, apply TIR check, trace the path." [→ WE-3; reveals whether student can combine geometry with TIR criteria]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) Find θ_c for glass (n=1.62) going into air. (2) An optical fibre: n₁=1.55, n₂=1.48. Find θ_c, NA, and acceptance angle. (3) A 30°-60°-90° glass prism (n=1.5) — can a ray entering the 30° face undergo TIR at the 60° face? Show the geometry.

Closing thought: A single optical fibre thinner than a human hair can simultaneously carry over 100,000 telephone conversations — enabled entirely by a 41.8° geometric constraint called total internal reflection.

Spaced retrieval: +1 day (critical angle formula and two TIR conditions), +4 days (numerical aperture and acceptance angle calculation), +2 weeks (prism TIR application and diamond brilliance explanation)."

[P91 gate: threshold 0.80. Failure → direction requirement and acceptance cone re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** (a) State the two conditions required for total internal reflection. (b) Find the critical angle for a diamond (n=2.42) in air. (c) Can TIR occur when light goes from air into water? Explain.

**P-2 (Developing — identifies S6):** Light in water (n=1.33) hits the water-air surface. (a) Find the critical angle. (b) A ray hits the surface at 40° — does TIR occur? At 55°? (c) How does the critical angle change if the water contains dissolved salt (n=1.34)?

**P-3 (Proficient — identifies S9):** An optical fibre has core n₁=1.60 and cladding n₂=1.52. (a) Find the critical angle at the core-cladding interface. (b) Find the numerical aperture. (c) Find the maximum acceptance angle from air. (d) If the cladding n₂ is increased to 1.55, how does the acceptance angle change and why?

**P-4 (Mastery gate — confirms S9):** (a) A 45°-45°-90° glass prism (n=1.5) receives a ray entering the hypotenuse face at normal incidence. Trace the ray through the prism — does it undergo TIR at any internal surface? Find exit direction. (b) Why is TIR exactly 100% reflective, not just "very high"? Reference the Fresnel equations conceptually. (c) Explain why optical communications use infrared wavelengths (1550 nm) rather than visible light in terms of Rayleigh scattering. Required: 3/3 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** TIR angle sweep. Slider: angle of incidence (0° to 90°). Shows refracted and reflected rays at glass-air boundary. At θ < θ_c: faint transmitted ray + bright reflected ray. As θ approaches θ_c: transmitted ray becomes more grazing. Above θ_c: transmitted ray disappears; reflected ray label "TIR — 100% reflectance." Reflectance graph below shows step function at θ_c.

**VIS-2:** Optical fibre cross-section interactive. Adjust n₁ and n₂ sliders. Displays: critical angle, NA, acceptance cone (3D cone animation showing which rays propagate). Rays outside acceptance cone shown escaping from the cladding. Numerical values update in real time.

**VIS-3:** Prism ray tracing. 45°-45°-90° prism shown. Click to place an incoming ray. Program traces ray through prism: applies Snell's Law at each face, checks TIR condition. Shows the 90° deflection and explains why prisms replace mirrors in quality optical instruments.

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.refraction | TIR is refraction's limiting case (θ_r = 90°) | prerequisite |
| phys.opt.optical-instruments | Prism binoculars and periscopes use TIR prisms | downstream |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.total-internal-reflection ✓ |
| V-2 | name matches KG | PASS — "Total Internal Reflection and Optical Fibres" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (proficient=4) | PASS ✓ |
| V-5 | bloom matches KG (apply) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — refraction ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (4) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 4, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (critical angles), WE-2 (optical fibre NA), WE-3 (prism TIR) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P06/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 2 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
