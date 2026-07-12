# Teaching Blueprint — phys.opt.dispersion

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.dispersion
name: "Dispersion of Light and Prisms"
domain: optics
difficulty:
  label: proficient
  number: 4
bloom: understand
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

Shine a white light beam through a glass prism and a rainbow spreads out on the other side: violet on one end, red on the other, with all other colors in between. This spreading of white light into its component colors is called dispersion. It happens because glass slows down different colors of light by different amounts — violet light slows the most (highest n), red light slows the least (lowest n). When each color bends by a slightly different amount at the glass surface (Snell's Law), the colors separate. Rainbows form by the same mechanism — raindrops act as tiny prisms.

### Level 2 — Developing Understanding

**Cause of dispersion:**
The refractive index of glass depends on wavelength (color): **n = n(λ)**
- Violet (λ ≈ 400 nm): n ≈ 1.53 (slower, bends more)
- Red (λ ≈ 700 nm): n ≈ 1.51 (faster, bends less)

This wavelength-dependence of n is called **chromatic dispersion**.

**Prism dispersion:**
A prism deviates light by angle δ (deviation angle). For a prism of apex angle A:
- At minimum deviation (δ_min), the refracted ray passes symmetrically through the prism
- **Snell's Law at prism:** n = sin[(A + δ_min)/2] / sin(A/2)
- Violet deviates most (larger δ), red deviates least (smaller δ)
- Angular dispersion: Δδ = δ_violet − δ_red

**Cauchy's equation (approximate):** n = A + B/λ² (with B > 0 → n increases as λ decreases)

**Dispersive power:**
ω = (n_violet − n_red) / (n_mean − 1) = Δn / (n̄ − 1)

Where n_mean = (n_violet + n_red)/2 (often taken as n for yellow).

**Natural dispersion phenomena:**
- **Rainbow (primary):** sunlight enters raindrop → refraction → TIR at back → refraction on exit. Red at 42°, violet at 40° from anti-solar point. Dispersion occurs at entry and exit refractions.
- **Secondary rainbow:** two internal reflections → colors reversed (red inside, violet outside); appears at 51°. Darker sky between primary and secondary = Alexander's dark band.
- **Atmospheric dispersion:** causes stars to appear slightly "stretched" into mini-spectra; significant effect at low altitudes.

**Recombination of dispersed light:**
A second inverted prism can recombine the dispersed colors back to white (used in achromatic doublets). A convex lens can also recombine the spectrum at its focal point.

**Chromatic aberration in lenses:**
Because f depends on n, and n depends on λ, a lens has different focal lengths for different colors:
f ≈ f_mean × [1 ∓ ω × (n−1)] → different colors focus at different distances → colored fringes around edges of images.

Achromatic doublet: combines crown glass (low ω) + flint glass (high ω) to give same focal length for two wavelengths while maintaining net power.

### Level 3 — Proficient Synthesis

**Minimum deviation condition:**
At minimum deviation (δ_min), the ray inside the prism is parallel to the base. Both refracting surfaces behave symmetrically: angle of incidence = angle of emergence.

r₁ = r₂ = A/2 (where A = apex angle, r = refraction angle inside prism)

Snell's Law at each surface:
n = sin i / sin(A/2)
At minimum deviation: i = (A + δ_min)/2
→ **n = sin[(A + δ_min)/2] / sin(A/2)**

For thin prisms (A small, δ small):
δ ≈ (n − 1)A (thin prism deviation, all colors)
Δδ = (n_v − n_r)A = dispersion angle

**Dispersive power as a figure of merit:**
A prism or lens material with high ω disperses colors strongly for a given deviation. Flint glass has higher ω than crown glass — used in spectrometers where dispersion is wanted; crown glass used in telescopes where achromatic correction is wanted.

**Rayleigh scattering and sky color:**
Scattering intensity ∝ 1/λ⁴ (Rayleigh) → blue light (λ small) scatters ~5× more than red → sky is blue; sunsets are red (long path, blue scattered out, red transmitted). This is a different phenomenon from refraction dispersion but also involves wavelength-dependent optical response.

---

## Component 2 — Worked Examples

### WE-1: Minimum Deviation

**Problem:** A glass prism has apex angle A = 60° and refractive index n = 1.50 (for yellow light). Find:
(a) The angle of minimum deviation δ_min.
(b) The angle of incidence at minimum deviation.

**Solution:**

**(a) Minimum deviation formula:**
n = sin[(A + δ_min)/2] / sin(A/2)
1.50 = sin[(60° + δ_min)/2] / sin(30°)
1.50 = sin[(60° + δ_min)/2] / 0.5
sin[(60° + δ_min)/2] = 1.50 × 0.5 = 0.75
(60° + δ_min)/2 = arcsin(0.75) = 48.59°
60° + δ_min = 97.18°
**δ_min = 37.2°**

**(b) Angle of incidence:**
At minimum deviation, i = (A + δ_min)/2 = (60° + 37.2°)/2 = 97.2°/2 = **48.6°**

---

### WE-2: Dispersion by a Thin Prism

**Problem:** A thin glass prism (A = 5°) has n_violet = 1.534 and n_red = 1.514. Find:
(a) The deviation of violet light.
(b) The deviation of red light.
(c) The angular dispersion.
(d) The dispersive power.

**Solution:**

Using thin prism formula δ = (n − 1)A:

**(a) Violet:** δ_violet = (1.534 − 1) × 5° = 0.534 × 5° = **2.67°**

**(b) Red:** δ_red = (1.514 − 1) × 5° = 0.514 × 5° = **2.57°**

**(c) Angular dispersion:**
Δδ = δ_violet − δ_red = 2.67° − 2.57° = **0.10°**

**(d) Mean deviation:**
δ_mean = (δ_violet + δ_red)/2 = (2.67 + 2.57)/2 = 2.62°

Using δ_mean = (n_mean − 1)A: n_mean = 1.524

Dispersive power:
ω = Δn/(n_mean − 1) = (n_violet − n_red)/(n_mean − 1) = (1.534 − 1.514)/(1.524 − 1)
= 0.020/0.524
**ω ≈ 0.038**

This means ~3.8% dispersion per unit of deviation — typical for crown glass (~0.04).

---

### WE-3: Achromatic Combination

**Problem:** Two thin prisms (crown glass A₁ = 5°, ω₁ = 0.04; flint glass A₂, ω₂ = 0.06) are combined to eliminate chromatic dispersion while retaining net deviation. Find:
(a) The angle A₂ of the flint prism.
(b) The net deviation of yellow light.

**Solution:**

For no net dispersion: Δδ₁ = Δδ₂ in magnitude but opposite sign (prisms inverted relative to each other).

Angular dispersion of each: Δδ = ω × δ_mean = ω × (n_mean − 1) × A

For zero net dispersion: ω₁ × δ₁_mean = ω₂ × δ₂_mean
(Using δ_mean = (n−1)A for thin prisms, with n_mean ≈ same for first approximation)

ω₁(n₁−1)A₁ = ω₂(n₂−1)A₂

For crown glass: n₁_mean ≈ 1.524; for flint: n₂_mean ≈ 1.620

0.04 × (1.524−1) × 5° = 0.06 × (1.620−1) × A₂
0.04 × 0.524 × 5 = 0.06 × 0.620 × A₂
0.1048 = 0.0372 × A₂
**A₂ ≈ 2.82°**

**(b) Net yellow deviation:**
δ₁ = (1.524−1) × 5° = 2.62°
δ₂ = (1.620−1) × 2.82° = 0.620 × 2.82° = 1.75°
Net deviation = δ₁ − δ₂ = 2.62° − 1.75° = **0.87°** (retained net deviation, zero dispersion)

The achromatic combination gives a net 0.87° deviation with no color spread.

---

## Component 3 — Misconception Engine

### MC-1: MC-PRISM-CREATES-COLORS

**trigger_signal:** Student states "the prism adds color to white light" or "the prism changes the frequency of light."

**conflict_evidence [P28]:** Pass white light through a first prism → spectrum appears. Block all colors except one (e.g., red) with a screen → pass that red through a second prism. Only red comes out — no new colors are generated. Newton's experiment (1666) showed this conclusively: the prism separates colors already present in white light; it does not create them. White light is a superposition of all frequencies simultaneously — the prism spatially separates them by differential refraction. If the prism "created" colors, a second prism would create yet more colors, not just further deflect the red.

**bridge_text [P30]:** White light is all frequencies mixed equally. Each frequency (color) is a separate wave at a specific frequency that never changes regardless of what medium it passes through. The prism doesn't change the frequencies — it exploits the fact that n is slightly different for each frequency, so Snell's Law bends each color by a slightly different angle, spreading them apart in space.

**replacement_text [P31]:** Dispersion REVEALS colors that are already present in white light — it does not create them. White light is a superposition of all visible frequencies from 400 THz (red) to 750 THz (violet). The prism spatially separates these pre-existing frequencies by exploiting the wavelength-dependence of the refractive index (n_violet > n_red). Frequency — and therefore color — is set by the source and never changes in any passive optical element.

**discrimination_pairs [P33]:**
- "A prism turns red laser light into a rainbow" → FALSE: monochromatic red light (single frequency) is deviated but not dispersed; only a wider spectrum of frequencies is spread.
- "White light through a prism shows colors because n depends on wavelength" → CORRECT: each color's frequency is present in white light and is deflected by a slightly different angle due to different n. ✓

**s6_path:** If student fails "what does prism add to light" probe → show Newton's double-prism experiment (separation then recombination) before mastery gate.

---

### MC-2: MC-VIOLET-REFRACTS-LESS-BECAUSE-SHORTER-WAVELENGTH

**trigger_signal:** Student reasons "violet has shorter wavelength so it's smaller so it fits through glass more easily and refracts less."

**conflict_evidence [P28]:** The refractive index data: n_violet (400 nm) ≈ 1.53 vs. n_red (700 nm) ≈ 1.51. Higher n means MORE refraction (Snell's Law: n sinθ_2 = sinθ_1, so larger n → smaller θ_2 → bends MORE toward normal at entry, MORE away at exit → larger deviation). Violet, with n = 1.53, bends more than red (n = 1.51). The correct rule: higher n → slower speed → MORE bending. Wavelength itself doesn't determine bending — the speed change (n) does.

**bridge_text [P30]:** The "smaller fits through easier" analogy breaks down for waves — waves don't need to "fit through" a material in the way a small ball fits through a gap. What matters is how much the wave's speed changes. Violet light slows more in glass (v = c/n = c/1.53) than red (v = c/1.51). More slowing → more bending by Snell's Law → more deviation → violet is at the bottom of the rainbow (higher deviation angle from the prism, smaller angle from the sky geometry).

**replacement_text [P31]:** Violet light refracts MORE (not less) in glass. The refractive index for violet is larger (n_violet > n_red), meaning violet travels slower in glass. By Snell's Law, a larger n at the refracting surface produces a larger change in direction. Violet is deviated by the largest angle in a prism; red by the smallest. Memory aid: VIBGYOR — violet is the most deviated color, red the least.

**discrimination_pairs [P33]:**
- "Blue light bends less than red in glass because its wavelength is shorter" → FALSE: n_blue > n_red → blue bends more.
- "Violet light appears at the bottom edge of a rainbow (closer to horizon) because it is deviated more" → TRUE: higher deviation angle in the droplet means the violet ray reaching your eye comes from a lower position in the sky. ✓

**s6_path:** If student states violet refracts less → n-value table comparison drill (confirm n_violet > n_red numerically) + deviation formula check before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Has seen rainbows and prisms; thinks prism "adds" color; no model for why different colors bend differently | Cannot state why glass disperses colors |
| S3 | Knows different n for different λ; confused about which color bends more; cannot apply minimum deviation formula | States "violet bends more" sometimes correctly, sometimes not; cannot calculate δ_min |
| S6 | Correctly applies n_violet > n_red → more bending; calculates thin prism deviation; uncertain about minimum deviation or dispersive power | Correctly does WE-2; cannot set up WE-1 (minimum deviation) |
| S9 | Applies minimum deviation formula; calculates dispersive power; explains achromatic doublet principle; connects to rainbow geometry | Correctly handles all three WEs; explains rainbow color ordering from first principles |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 4, accelerated P track).

**TA-1 [P01 — Session Open]**
"Why is violet at the inner edge of a rainbow and red at the outer edge? Most people say 'refraction' but that doesn't tell us which color goes where. Today we find out exactly why. First: does a prism create colors, or does it do something else to white light? Write your hypothesis before we start."
[Diagnose S0/S3 — does student say "creates" or "separates"?]

**TA-2 [P06 — Concrete Anchor]**
"[Display: n vs. λ graph for crown glass — n ranges from 1.51 (red) to 1.53 (violet).] Two key facts: (1) n depends on λ (wavelength). (2) Higher n → more bending (Snell's Law: larger n₂ → smaller θ₂ → more deviation at exit). So violet (n=1.53) bends more than red (n=1.51). That's the complete mechanism for prism dispersion. Everything else follows from these two facts." [→ WE-2: thin prism calculations]

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Does a prism create color? Newton's test: split white light with prism #1 → get spectrum. Block all but one color. Pass that color through prism #2. Result: only more of that same color — no new colors. The prism cannot create what isn't there. White light already contains all frequencies 400–750 THz simultaneously. The prism spatially separates them. Prisms reveal; they don't create." [→ MC-1 discrimination pairs]

**TA-4 [P31 — Replacement: MC-2]**
"Violet or red — which bends more? Check: n_violet = 1.53, n_red = 1.51. At exit from prism (glass→air): n_glass sinθ₂ = n_air sinθ_exit → larger n_glass → larger sinθ_exit → larger deviation. So violet (n=1.53) deviates more. Rainbow: violet ring is smaller (closer to anti-solar point = center of rainbow), red ring is larger (outer). Memory aid: VIBGYOR from the prism = Violet bends most, Red least." [→ MC-2 discrimination pairs]

**TA-5 [P06 — Pictorial: minimum deviation]**
"[Display: prism diagram at minimum deviation — symmetric ray path, r₁=r₂=A/2.] At minimum deviation, the ray travels symmetrically through the prism. Formula: n = sin[(A+δ_min)/2]/sin(A/2). This is how spectrometers measure n precisely — put material in prism shape, find δ_min, compute n." [→ WE-1]

**TA-6 [P41 — Diagnostic: rainbow]**
"Apply dispersion to a single raindrop. Light enters, hits the back surface and internally reflects, exits at the front. Violet exits at 40°, red at 42° from the anti-solar point. Why do you see red at the TOP of a rainbow and violet at the BOTTOM? [Hint: which ray from a droplet higher in the sky reaches your eye?] Sketch the geometry."
[Reveals whether student can apply deviation concept to a curved surface context — key S6→S9 diagnostic]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) A prism (A=45°, n=1.60) — find δ_min. (2) A thin prism (A=8°, n_v=1.538, n_r=1.516) — find δ_violet, δ_red, angular dispersion, and dispersive power. (3) Why does a rainbow have red on the outside and violet on the inside?

Closing thought: Isaac Newton used a prism in 1666 to prove that white light contains all colors, refuting the prevailing idea that prisms 'add' color to light. He used a second prism to recombine the spectrum back to white — the definitive proof.

Spaced retrieval: +1 day (which color bends more and why), +4 days (minimum deviation formula), +2 weeks (rainbow color ordering explanation from first principles)."

[P91 gate: threshold 0.80. Failure → MC-1 prism-creates-color and MC-2 violet-bends-more drills.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** (a) Why does a glass prism spread white light into colors? (b) For glass with n_violet = 1.535 and n_red = 1.515, which color deviates more and by how much for a 4° thin prism? (c) What is the angular dispersion?

**P-2 (Developing — identifies S6):** A glass prism (A = 60°, n = 1.52 for yellow light) is at minimum deviation. Find (a) δ_min and (b) the angle of incidence at minimum deviation. Confirm that the angle of refraction inside the prism equals A/2.

**P-3 (Proficient — identifies S9):** Calculate the dispersive power for glass with n_D (yellow) = 1.520, n_F (blue) = 1.530, n_C (red) = 1.514, where dispersive power ω = (n_F − n_C)/(n_D − 1). Compare to typical crown glass (ω ≈ 0.04) and state which has more dispersion per unit deviation.

**P-4 (Mastery gate — confirms S9):** (a) A rainbow is observed with its center at the anti-solar point. Red appears at 42° and violet at 40° from this center. Explain why red appears as the OUTER arc (larger angle from center). (b) A secondary rainbow at 51° has colors reversed (red inside, violet outside). Explain this reversal in terms of the number of internal reflections. (c) An achromatic doublet uses crown glass (n₁=1.52, ω₁=0.04) and flint glass (n₂=1.62, ω₂=0.06). If the crown prism has A₁ = 6°, find A₂ to zero the dispersion and find the net deviation. Required: 3/3 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Prism dispersion interactive. Adjustable apex angle A (0°–70°) and n (1.4–2.5). Shows white light entering and emerging as spectrum. Color-coded rays for VIBGYOR. Displays: minimum deviation for each color, angular dispersion. When A = 0°: no dispersion (as expected). Visible spectrum on screen shows color positions.

**VIS-2:** n vs. λ graph (Cauchy dispersion curves). Shows multiple glass types: crown, flint, diamond. X-axis: wavelength 400–700 nm. Y-axis: n. Interactive: hover over any wavelength to see the exact n for each material. Demonstrates that n always decreases with λ for normal dispersion.

**VIS-3:** Rainbow geometry animation. Raindrop shown with incoming white light ray. Student adjusts incident angle. Shows: refraction at entry (wavelength-dependent), single internal reflection, refraction at exit. Displays angle to anti-solar point for red (42°) and violet (40°). Option to show secondary rainbow (two internal reflections, reversed color order).

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.refraction | Dispersion is wavelength-dependent refraction; uses Snell's Law | prerequisite |
| phys.opt.nature-of-light | Connects to photon energy E=hf and frequency-wavelength relation c=fλ | sibling |
| phys.opt.optical-instruments | Spectrometers and spectroscopes exploit dispersion for wavelength measurement | downstream |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.dispersion ✓ |
| V-2 | name matches KG | PASS — "Dispersion of Light and Prisms" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (proficient=4) | PASS ✓ |
| V-5 | bloom matches KG (understand) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — refraction ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (4) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 4, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (minimum deviation), WE-2 (thin prism dispersive power), WE-3 (achromatic combination) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P31/P06/P41/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 3 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
