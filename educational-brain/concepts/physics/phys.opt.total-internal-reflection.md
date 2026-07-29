# phys.opt.total-internal-reflection — Total Internal Reflection and Critical Angle

## Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.opt.total-internal-reflection` |
| **Display name** | Total Internal Reflection and Critical Angle |
| **KG requires** | `phys.opt.refraction` |
| **KG unlocks** | — |
| **Difficulty** | proficient |
| **Bloom level** | apply |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 4 |
| **KG description** | Total internal reflection occurs when light hits a boundary at an angle greater than the critical angle and all light is reflected. |

---


## Learning Objective

See Blueprint (`docs/curriculum/blueprints/phys.opt.total-internal-reflection.md §1 Learning Objective`) for the full graded objective with accuracy thresholds and protocol assignments.


## Core Understanding

Bend a glass fibre. Light put in one end emerges from the other, even though the fibre bends through curves and corners. The light is trapped inside by total internal reflection — every time it hits the glass-air boundary at too steep an angle, it bounces back instead of escaping. This is the principle behind optical fibres that carry the internet.

Total internal reflection occurs when three conditions are met: (1) light travels from a denser medium (higher n) to a less dense medium (lower n); (2) the angle of incidence exceeds the critical angle θ_c = arcsin(n₂/n₁). When these conditions hold, Snell's law n₁sinθ₁ = n₂sinθ₂ has no solution for θ₂ — there is no refracted ray. All of the light reflects back into the denser medium, with zero energy loss.

The critical angle depends on the refractive index contrast. For glass (n ≈ 1.5) to air (n = 1): θ_c = arcsin(1/1.5) = 41.8°. Light hitting the boundary steeper than 41.8° from the normal reflects completely. For diamond (n = 2.42) to air: θ_c = 24.4° — a much smaller critical angle, so most light hitting diamond's facets reflects internally. Cut diamond facets cleverly and the light bounces around inside, exiting only through the top face in a brilliant display. This is precisely what diamond cutters are designed to achieve.

Optical fibres keep light hitting the fibre-cladding interface above the critical angle by choosing a core with higher n than the cladding. Light injected into the core bounces along it, even through bends, losing almost no energy per reflection. Modern optical fibres can carry data for tens of kilometres with only controlled repeater amplification — this is what makes transcontinental internet cables possible.

## Mental Models

### Stage 1 — Intuitive (no formalism)

Look at a fish tank from the side: you can see the fish. Now look at the water surface from below at a steep angle — you see the room reflected, not through to the air above. The water surface has become a perfect mirror. This happens when light in a denser medium tries to cross into a less dense medium at too steep an angle: rather than passing through, all of it bounces back inside.

### Stage 2 — Quantitative entry

From Snell's law: n₁ sinθ₁ = n₂ sinθ₂, where n₁ > n₂ (denser to less dense medium).

As θ₁ increases, sinθ₂ increases. Maximum possible sinθ₂ = 1, i.e., θ₂ = 90° (refracted ray grazes the boundary). The angle θ₁ that achieves this is the **critical angle θ_c**:

**sin θ_c = n₂/n₁**

For θ₁ < θ_c: light is partly transmitted (refracted) and partly reflected.  
For θ₁ = θ_c: refracted ray emerges at 90° to the normal (grazes the boundary).  
For θ₁ > θ_c: **total internal reflection** — no transmitted ray; all intensity reflected. The reflection obeys θᵣ = θᵢ exactly (the interface acts as a perfect mirror, with no energy loss).

Example values: glass (n = 1.5) to air (n = 1): sin θ_c = 1/1.5 = 2/3 → θ_c ≈ 41.8°. Water (n = 1.33) to air: θ_c ≈ 48.8°. Diamond (n = 2.42) to air: θ_c ≈ 24.4° — very small, so many internal reflections trap light brilliantly.

### Stage 3 — Evanescent wave and partial reflection

Below θ_c, a partial reflected wave always coexists with the refracted wave — this is Fresnel reflection. At θ_c, the refracted beam's energy flux goes to zero (the refracted beam is parallel to the interface, so no energy crosses). Above θ_c, all energy is reflected — but a non-propagating **evanescent wave** penetrates a few wavelengths into the less-dense medium. The evanescent wave decays exponentially with depth and carries no net energy in the normal direction. This is exploited in **total internal reflection fluorescence (TIRF) microscopy** (nanometre-depth illumination layer) and frustrated TIR (used in fingerprint scanners and optical couplers).

### Stage 4 — Optical fibre waveguide

In a step-index optical fibre, a high-n core is surrounded by a lower-n cladding. Light launched within the **acceptance cone** (half-angle = arcsin(NA), where NA = √(n_core² − n_clad²) is the numerical aperture) undergoes TIR at every core-cladding interface and propagates along the fibre without loss through the cladding. Dispersion (different wavelengths travel at slightly different speeds) limits bandwidth; graded-index fibres mitigate this by smoothly varying n across the cross-section, so longer-path marginal rays travel faster than central rays.

---

## Why Students Fail

1. **Direction of travel assumption** — learners apply the critical angle formula to light going from a less dense to a more dense medium (e.g., air to glass), where TIR is impossible. The condition n₁ > n₂ is forgotten.
2. **Critical angle as the TIR angle** — learners think θ_c is the angle at which TIR occurs. TIR occurs for all angles *greater than* θ_c; at exactly θ_c the refracted ray grazes the surface but still exists.
3. **Energy creation** — at TIR, all the light bounces back. Learners worry: "where does the transmitted energy go?" They expect 50% reflection, 50% transmission (Fresnel baseline). Above θ_c, there is no transmission — 100% reflection is consistent with energy conservation.
4. **Confusing internal and external reflection** — any smooth interface reflects some light regardless of angle (Fresnel partial reflection). TIR is the special case where the reflection becomes 100%. Learners think the interface is either "transparent" or "totally reflecting" with no intermediate case.

---

## Misconceptions

### M1 — "TIR can happen when light goes from air into glass"

**Probe**: "Can TIR occur when a ray passes from air (n=1) into glass (n=1.5)?"  
**Characteristic phrase**: "Yes — at a steep enough angle."  
**What's wrong**: TIR requires n₁ > n₂. When light goes from air (n=1) to glass (n=1.5), n₁ < n₂ — sinθ₂ = (n₁/n₂)sinθ₁ < sinθ₁, so θ₂ < θ₁ always. The refracted ray bends toward the normal; sinθ₂ never reaches 1.  
**Recovery**: Draw Snell's law: n₁ sinθ₁ = n₂ sinθ₂. If n₂ > n₁, then sinθ₂ < sinθ₁ < 1 for all θ₁ — sinθ₂ can never exceed 1, so there is always a refracted ray. TIR is impossible.

### M2 — "At exactly the critical angle, TIR occurs"

**Probe**: "A ray hits a glass-air interface at θ₁ = θ_c exactly. Does TIR occur?"  
**Characteristic phrase**: "Yes — at the critical angle is where TIR starts."  
**What's wrong**: At θ₁ = θ_c, the refracted ray exists but emerges parallel to the interface (θ₂ = 90°). TIR first occurs at θ₁ > θ_c. At θ₁ = θ_c, there is a refracted ray — it just runs along the surface.  
**Recovery**: Plot sinθ₂ vs. sinθ₁ (a straight line with slope n₁/n₂ > 1). The line reaches sinθ₂ = 1 at sinθ₁ = n₂/n₁ — that is θ_c. For θ₁ > θ_c, sinθ₂ would exceed 1 — impossible — so no refracted ray exists. TIR is for θ₁ > θ_c, not at θ_c.

### M3 — "TIR violates energy conservation (where does the refracted energy go?)"

**Probe**: "At θ₁ > θ_c, 100% of the light is reflected. Does this violate energy conservation?"  
**Characteristic phrase**: "Some energy must pass through — it can't all bounce back."  
**What's wrong**: Energy conservation doesn't require transmission. At normal incidence, glass reflects only ~4% (Fresnel). As θ₁ → θ_c from below, the transmitted energy goes to zero continuously. At θ₁ = θ_c, transmitted energy = 0 and reflected energy = 100%. This is the prediction of Maxwell's equations (Fresnel equations) and is confirmed experimentally — no violation.  
**Recovery**: Use an energy flow argument: the transmitted Poynting vector (energy flow in the refracted direction) at θ₁ = θ_c points along the interface (θ₂ = 90°), so the component crossing the interface is zero. Above θ_c, there is no propagating transmitted wave at all — the evanescent field exists but carries zero average energy across the interface.

### M4 — "Optical fibres work by reflection from the fibre walls, like a tube of mirrors"

**Probe**: "How does an optical fibre guide light without loss to the surroundings?"  
**Characteristic phrase**: "The glass walls are mirrors and bounce the light back inside."  
**What's wrong**: The fibre wall is not a separate mirror — it is the core-cladding interface. Guidance depends on TIR, which requires the correct index contrast (n_core > n_clad) and the ray being within the acceptance cone. A bare glass rod in air works by TIR at the glass-air interface; a fibre in air with no cladding also works but is mechanically fragile. "Mirror walls" implies a metallic coating, which is how hollow metal waveguides (used in microwave systems) work — not optical fibres.  
**Recovery**: Draw the cross-section of a step-index fibre: core (high n), cladding (low n). Trace a ray hitting the core-cladding interface above θ_c. Show TIR at that interface. The ray zigzags along the core. No mirror required — just the refractive index contrast.

---

## Analogies

### Primary analogy — The fish-eye view

Stand in a pool and look up. Directly above you, you see the sky and objects above the pool normally. As you look more obliquely, at about 48.8° from vertical (θ_c for water), the sky and above-water world appear at the edge of a circular "window" in the water surface. Outside this circle, you see only reflections of the pool bottom and sides — the surface has become a perfect mirror. This window is called "Snell's window" or the "cone of vision." Everything above water is compressed into this 97.6°-wide cone.

**Breaking point**: In the fish-eye view, TIR applies to all angles outside the cone simultaneously — the analogy correctly captures the geometry. It fails to convey that TIR is wavelength-independent (within normal optical frequencies) and does not explain the evanescent wave, which penetrates beyond the surface even at TIR. Also, turbulence at the water surface breaks the clean Snell's-window boundary in practice.

### Anti-analogy — "TIR is like a one-way mirror (glass)"

One-way mirrors (two-way mirrors) depend on *lighting* conditions — the side with brighter illumination appears transparent from the other side. This is purely an intensity effect, not a refractive index effect. TIR is geometry-dependent (angle-dependent) and occurs regardless of illumination intensity. Conflating them misrepresents both phenomena.

---

## Demonstrations

### Demo A — Semicircular glass block

**Setup**: A semicircular glass block (flat side toward viewer). Shine a ray of light through the curved surface, aimed at the centre of the flat face (so it hits at 0° incidence on the curved surface — no refraction on entry). Rotate the block to vary the angle of incidence θ₁ on the flat (glass-air) face.  
**Observation**: At small θ₁: refracted ray exits the flat face plus a weak reflected ray inside. Increase θ₁: refracted ray disappears, reflected ray inside becomes bright — this is θ_c. Increase further: only the internal reflected ray remains.  
**Teaching target**: Critical angle measured directly. Students measure θ_c with a protractor and compute sin θ_c = n_air/n_glass → n_glass. Confirms the formula.

### Demo B — Optical fibre and light-pipe

**Setup**: A coiled plastic optical fibre or a curved acrylic light rod. Shine a laser or bright LED into one end.  
**Observation**: Light emerges from the other end regardless of how the fibre is bent (within limits). Scratching or bending sharply causes light to "leak" at that point.  
**Teaching target**: TIR guides the light around bends. Leakage at damage points shows that TIR is disrupted when n_clad locally approaches n_core (contamination) or when the interface geometry is disrupted (sharp bend).

### Demo C — Diamond brilliance (critical angle demo)

**Setup**: Show a cubic zirconia or glass prism shaped like a diamond (many facets). Illuminate from one face.  
**Observation**: Light exits brilliantly from the top (table facet) in a rainbow of colours.  
**Teaching target**: Diamond's small critical angle (≈24°) means that light entering from almost any direction undergoes multiple TIRs before finding an exit path. The many TIR events make the diamond appear to glow from within. Compare to glass (θ_c ≈ 42°) — less brilliant because fewer TIR events occur before light leaks out.

---

## Discovery Questions

### Stance: Argue the deductive case — *predict from Snell's law before observing*

**Why deductive here**: TIR is a clean prediction from Snell's law — sinθ₂ cannot exceed 1 — so the critical angle falls out algebraically before the phenomenon is observed. Deriving the prediction first, then confirming it experimentally (Demo A), gives the satisfaction of a theory making a testable prediction that is verified. An inductive approach works but misses the deductive payoff: students see the phenomenon and then learn the formula, rather than the formula predicting the phenomenon.

**Opening derivation**: "Snell's law: n₁ sinθ₁ = n₂ sinθ₂. Suppose n₁ = 1.5, n₂ = 1. What is sinθ₂ when sinθ₁ = 0.5? (= 0.75). When sinθ₁ = 0.9? (= 1.35). But sinθ₂ cannot exceed 1. What does this mean physically?"

**Sequence**:
1. Students realise: for sinθ₁ > n₂/n₁, Snell's law has no physical solution → no refracted ray.
2. Define θ_c: the angle at which sinθ₂ = 1. Derive sin θ_c = n₂/n₁.
3. Predict: "For glass (n=1.5) to air, θ_c = 41.8°. Let's test this."
4. Demo A — measure θ_c experimentally. Compare to prediction.
5. Application: "If optical fibres exploit TIR, what must be true about the core and cladding refractive indices?" (n_core > n_clad)
6. Closure: diamonds — small θ_c → many TIR events → brilliance. Design implication for gemstone cutting.

---

## Teaching Sequence

| Prior state | Action |
|---|---|
| Learner applies TIR to wrong direction (n₁ < n₂) | Enforce prerequisite check: write "n₁ > n₂?" before every TIR calculation. If no, TIR impossible. |
| Learner thinks TIR occurs at θ_c not above it | Tabulate: θ₁ < θ_c → transmitted ray exists; θ₁ = θ_c → refracted ray at 90°; θ₁ > θ_c → TIR, no transmitted ray. |
| Learner worried about energy conservation at TIR | Plot the Fresnel reflection coefficient R vs. θ₁ (qualitative sketch): R rises from ~4% at normal incidence to 100% at θ_c — smooth, no energy disappears. |
| Learner cannot apply to fibre | Draw cross-section: n_core > n_clad. Trace a ray, mark the angle at the interface. Show TIR condition. Calculate acceptance cone for given n_core, n_clad. |
| Learner asks "what happens to the light above θ_c?" | Reflected back into the denser medium with θᵣ = θᵢ. No energy loss. Perfect reflector for this angle range. |

---


## Tutor Actions

Priority dispatch (in order):

1. **PREDICTION-BEFORE-DEMO** — "Shine a laser from inside a glass block toward the glass-air interface, increasing the angle of incidence. What happens at small angles? What happens as you increase the angle?" Let learner predict: refraction diminishes, eventually the refracted ray disappears — total internal reflection. The critical angle is the transition point.

2. **WORKED-EXAMPLE** — two traces: (a) critical angle for glass→air: θ_c = arcsin(n_air/n_glass) = arcsin(1/1.5) ≈ 42°. (b) Optical fibre: why the fibre must be bent beyond a certain radius before TIR breaks down — relates critical angle to fibre geometry.

3. **MISCONCEPTION-PROBE M2** — "TIR occurs whenever light goes from any denser medium to any less dense medium." Expected wrong: true. Correct: TIR also requires exceeding the critical angle. If the incident angle is below θ_c, there is still refraction (though some is reflected). TIR requires both conditions: denser→less dense AND angle > θ_c.

4. **RETRIEVAL-SCHEDULE-PROMPT** — "Optical fibres carry internet data by TIR. If the core has n = 1.50 and the cladding has n = 1.45, find the critical angle. Why does the cladding need to have a lower n than the core rather than simply being air?" (Tests critical angle calculation and the engineering reason for cladding: controlled n to maintain TIR without the fragility of a bare glass-air interface.)

## Voice Teaching Notes

### Opening
"Look up at the underside of a water surface from below. You see a circular window to the sky — outside that circle, the water surface is a mirror. The edge of the window is the critical angle. That is total internal reflection: at steep enough angles, the boundary becomes a perfect mirror."

### Core formula
"From Snell's law, when you're going from a dense medium to a sparse one, the refracted ray bends away from the normal. Keep increasing the angle — eventually the refracted ray would have to be parallel to the surface. That is the critical angle: sin θ_c = n₂/n₁. Beyond that angle, Snell's law has no solution — no refracted ray. All the light bounces back. 100%."

### Application
"Optical fibres work because of this. The glass core has a slightly higher refractive index than the glass cladding around it. Light bouncing off the inner wall hits at angles above the critical angle — TIR every time. It bounces its way along the fibre for kilometres without losing significant energy to the cladding."

### Misconception interrupt
"You cannot get TIR going from air into glass. The refracted ray always bends toward the normal when entering a denser medium — it never reaches 90°. TIR only works when you are already inside the denser material, trying to escape."

---

## Assessment Signals

### Mastery gate

The learner can:
1. State the condition for TIR: n₁ > n₂ and θ₁ > θ_c.
2. Derive and apply sin θ_c = n₂/n₁.
3. Calculate θ_c for a given interface (glass-air, water-air, glass-water).
4. Predict whether TIR occurs for a given θ₁ and interface.
5. Explain qualitatively how TIR guides light in an optical fibre.

### Formative golden probe

> "A ray of light travels in water (n = 1.33) and hits the water-air interface. (a) Calculate the critical angle. (b) If the ray hits at θ₁ = 55°, what happens? (c) If the ray hits at θ₁ = 40°, what happens?"

*Answers*: (a) sin θ_c = 1/1.33 → θ_c ≈ 48.8°. (b) 55° > 48.8° → TIR: all light reflected. (c) 40° < 48.8° → refraction + partial reflection; refracted ray exits into air.  
*Likely errors*: Computing sin θ_c = n₁/n₂ = 1.33 (inverting the ratio); thinking TIR occurs at exactly 48.8° (at that angle, refracted ray grazes surface but exists).

### Confidence calibration

After the probe, ask: "Can a ray in air ever undergo TIR at the air-water interface?" Students who say no, with explanation (n_air < n_water → TIR impossible from air side), are calibrated. Students who say "yes at steep angles" have not internalised the n₁ > n₂ prerequisite — reteach with the algebraic proof (sinθ₂ < 1 always when n₁ < n₂).

### Delayed retrieval check (next session opener)

"Write the formula for the critical angle. What two conditions must hold for TIR to occur?"  
Expected: sin θ_c = n₂/n₁; conditions: (1) n₁ > n₂, (2) θ₁ > θ_c.

---

## Tutor Recovery Strategy

**Recovery for direction confusion** (applying TIR to wrong-direction travel):
1. Write n₁ and n₂ for the incident and transmitted media explicitly. Check n₁ > n₂.
2. If n₁ < n₂: sinθ₂ = (n₁/n₂)sinθ₁ < sinθ₁ — refracted ray always exists. TIR impossible.
3. If n₁ > n₂: sinθ₂ = (n₁/n₂)sinθ₁ > sinθ₁ — can exceed 1 if sinθ₁ > n₂/n₁. TIR possible.

**Recovery for θ_c vs. TIR angle confusion**:
1. Tabulate three cases explicitly with specific angles (θ₁ = 30°, θ₁ = θ_c, θ₁ = 60°) for a glass-air interface.
2. At 30°: refracted ray exists, compute θ₂ < 90°.
3. At θ_c = 41.8°: refracted ray at θ₂ = 90° — still exists, just parallel to surface.
4. At 60° > θ_c: no refracted ray — TIR. All light reflected at θᵣ = 60°.

---

## Memory Hooks

**Memory type**: Conditional rule + formula + physical phenomenon (fibre/diamond)

**Encoding hooks**:
- TIR acronym checklist: **D**ense to **S**parse (n₁ > n₂) + **S**teep angle (θ₁ > θ_c)
- sin θ_c = n_sparse / n_dense (smaller over larger)
- Diamond: small θ_c → stays inside longer → brighter
- Fibre: n_core > n_clad → TIR at every bounce → guided for kilometres

**Spaced retrieval schedule**:
- Session +1: "State the two conditions for TIR. Write the critical angle formula."
- Week 1: "Calculate θ_c for diamond (n=2.42). Explain why diamond has such brilliant sparkle."
- Week 3: "A step-index fibre has n_core=1.50, n_clad=1.46. Find the numerical aperture and acceptance angle."
- Month 2: "What is an evanescent wave? In what technology is it exploited?" (TIRF microscopy, fingerprint scanners)

**Interleave with**: `phys.opt.refraction` (prerequisite — Snell's law), `phys.opt.wave-optics` (evanescent waves bridge geometric and wave optics)

---

## Transfer Connections

| Target concept | Bridge |
|---|---|
| Technology — optical fibres | TIR at core-cladding interface; acceptance cone; NA; dispersion and bandwidth |
| Technology — endoscopes | Coherent fibre bundle for image transmission; each fibre carries one pixel via TIR |
| Technology — TIRF microscopy | Evanescent wave illuminates only ≈100 nm above coverslip; used in single-molecule imaging |
| Technology — fingerprint sensors | Frustrated TIR: finger contact breaks TIR locally → map of ridges and valleys |
| Gemology — gemstone brilliance | Critical angle and facet geometry engineered to maximise internal TIR events |
| `phys.opt.optical-instruments` | Prism binoculars use two Porro prisms for TIR reflections (avoiding need for mirrors); roof prisms use TIR faces |
| Atmospheric physics | Mirages occur when a hot-air layer near the ground acts as a low-n layer; TIR of light from sky creates the "water" appearance |

---


## Cross-Subject Connections

Mathematics: ray diagrams use similar triangles; Snell's law uses trigonometry; wave optics uses Fourier analysis. Chemistry: spectrophotometry and colorimetry measure concentrations optically; X-ray diffraction uses diffraction physics. Biology: the eye is a biological optical instrument; microscopy, endoscopy, and photoreception are optics applications.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.opt.total-internal-reflection.md` (authoritative for Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite sections by reference, never restate here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages runtime-served explanation and probe assets. Authored seed assets for this concept are in `src/lib/teaching/assets/authoredSeedAssets.ts`.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) — core_explanation, worked_example, misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe kinds, distractor-mapped to this entry's misconception IDs  
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required to activate

## Curriculum Feedback

**KG note**: `phys.opt.refraction` is the necessary and sufficient prerequisite — Snell's law and the concept of refractive index must be fluent. This concept has no downstream unlocks listed in the KG, but it is the prerequisite for understanding optical instruments (fibre, endoscope, prism binoculars) and connects naturally to wave-optic phenomena (evanescent wave) and atmospheric optics (mirages).

**Authoring note**: The critical distinction between "at θ_c" (refracted ray grazes surface — TIR has NOT yet occurred) and "above θ_c" (TIR) is the single most important nuance in this concept. It should be made explicit in every teaching session, not assumed to be obvious.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

## Version History

- **v1.0** (2026-07-29): Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.
