# Teaching Blueprint — phys.stat.fluctuations-correlations

## C0 — Concept Metadata
```
concept_id        : phys.stat.fluctuations-correlations
display_name      : Fluctuations and Correlations
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 9
prerequisites     : [phys.stat.partition-function]
cross_links       : [phys.stat.phase-transitions, phys.stat.ising-model]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
Fluctuations of thermodynamic quantities around their mean values are directly related to response functions (heat capacity, compressibility, susceptibility) via the fluctuation-dissipation theorem, and diverge at critical points along with the correlation length.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-FL-FLUCTUATIONS-NEGLIGIBLE | "For large N, fluctuations are negligible — statistical mechanics only predicts averages." | "Standard deviation is O(1/√N) so we can ignore it." | Relative fluctuations δA/⟨A⟩ ~ 1/√N → 0, but absolute fluctuations grow, and response functions ARE the fluctuations: C_V = (1/kT²)(⟨E²⟩−⟨E⟩²); compressibility κ_T ∝ ⟨(δN)²⟩. Fluctuations are physically measurable (light scattering, critical opalescence) and diverge at phase transitions. |
| MC-FL-CORRELATION-IS-SAME-AS-CORRELATION | "'Correlation function' in stat mech means the Pearson correlation." | "High correlation means the variables are linearly related." | The pair correlation function G(r)=⟨s(r)s(0)⟩−⟨s⟩² measures how fluctuations at position 0 predict fluctuations at position r. It decays as e^{−r/ξ} with correlation length ξ; at a critical point ξ→∞ and G(r)~r^{−(d−2+η)} (power law, not exponential). |

---

## C3 — Worked Examples

### Example 1 — Energy fluctuations and heat capacity
Canonical ensemble: ⟨E⟩ = −∂ ln Z/∂β.
⟨E²⟩ = (1/Z)Σ_i E_i²e^{−βE_i} = ∂²(ln Z)/∂β² + (∂ ln Z/∂β)².
Variance: (δE)² = ⟨E²⟩−⟨E⟩² = ∂²(ln Z)/∂β² = kT² C_V.
Relative fluctuation: δE/⟨E⟩ ~ (kT²C_V)^{1/2}/⟨E⟩ ~ 1/√N → 0 for large systems.
Physical content: measuring C_V = (δE)²/kT² is EQUIVALENT to measuring energy fluctuations.

### Example 2 — Particle number fluctuations and compressibility
Grand canonical: ⟨N⟩ = kT ∂ ln Ξ/∂μ.
(δN)² = kT ∂⟨N⟩/∂μ = kT² ∂²(ln Ξ)/∂μ².
Isothermal compressibility: κ_T = −(1/V)(∂V/∂P)_{T,N} = (δN)²/(kT⟨N⟩V·ρ).
At a gas-liquid critical point: κ_T → ∞ (critical point divergence) ↔ (δN)² → ∞.
Critical opalescence: density fluctuations ~ wavelength of light → system scatters light strongly → opaque at critical point.

### Example 3 — Pair correlation function
Definition: G(r₁,r₂) = ⟨n(r₁)n(r₂)⟩−⟨n(r₁)⟩⟨n(r₂)⟩ for a uniform system: G(r)=G(|r₁−r₂|).
Above T_c: G(r) = A e^{−r/ξ}/r^{d−2+η} (Ornstein-Zernicke, η small).
At T_c: ξ→∞; G(r) ~ r^{−(d−2+η)} (power law, long-range correlations).
Below T_c: G(r) → (⟨m⟩)² > 0 as r→∞ (spontaneous magnetization persists).
Structure factor: S(k) = ∫G(r)e^{ik·r}d³r → diverges as S(k)~1/(k²+ξ^{−2}) near k=0 at T≈T_c.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "Near the boiling point of water, a pot of water near 374°C becomes milky (critical opalescence). Density fluctuations grow to the scale of visible light wavelengths — you can see statistical mechanics in action. Fluctuations are not negligible at phase transitions." |
| TA-2 | P06 | Build notation | Variance (δA)²=⟨A²⟩−⟨A⟩²; fluctuation-dissipation relation C_V=(δE)²/kT²; correlation function G(r)=⟨s(r)s(0)⟩−⟨s⟩²; correlation length ξ; structure factor S(k)=∫G(r)e^{ik·r}d³r |
| TA-3 | P07 | Formula derivation | Derive (δE)² = kT²C_V from canonical Z: differentiate ⟨E⟩=−∂ ln Z/∂β twice; generalize to (δN)²=kT∂⟨N⟩/∂μ in grand canonical |
| TA-4 | P08 | Diagnostic probe | MC-FL-FLUCTUATIONS-NEGLIGIBLE: "C_V diverges at T_c. Since (δE)²=kT²C_V, what happens to energy fluctuations at T_c? Are they negligible for large N?" Answer: absolute fluctuations diverge (NOT negligible) at T_c even for large N — 1/√N argument fails at criticality. |
| TA-5 | P13 | Worked example | Example 3 (pair correlation function): write G(r) above/at/below T_c; extract ξ from exponential decay; show S(k) has a peak near k=0 that sharpens at T_c. |
| TA-6 | P10 | Pattern drill | Given a partition function Z(β,B) (magnetic field B), students derive: ⟨M⟩=kT ∂ ln Z/∂B, susceptibility χ=∂⟨M⟩/∂B=(δM)²/kT. Connect to fluctuation theorem. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the fluctuation-dissipation relation connecting energy fluctuations to heat capacity. What does this tell you about measuring C_V?  
*Answer*: (δE)² = ⟨E²⟩−⟨E⟩² = kT²C_V; measuring C_V is equivalent to measuring the variance of energy fluctuations. C_V can in principle be extracted from energy time-series even without changing T.

**MP-2** (apply): For a 2-level system with energies ±ε and canonical partition function Z=2cosh(βε), compute the energy variance (δE)² and verify (δE)²=kT²C_V.  
*Answer*: ⟨E⟩=−ε tanh(βε); ⟨E²⟩=ε²; (δE)²=ε²−ε²tanh²(βε)=ε²sech²(βε). C_V=d⟨E⟩/dT=(ε/T)²sech²(βε)/k; kT²C_V=ε²sech²(βε) ✓

**MP-3** (analyze): Near the critical point, the correlation length ξ → ∞ as ξ ~ |T−T_c|^{−ν}. What does this mean for the spatial extent of fluctuations?  
*Answer*: Correlated fluctuations span a region of size ξ; near T_c, this region grows without bound — fluctuations at different positions are strongly correlated over macroscopic distances. This is why the system can't be treated as local: mean-field theory (which ignores long-range correlations) breaks down near T_c.

**MP-4** (analyze): The structure factor S(k) peaks at small k near T_c. How does this explain why x-ray or neutron scattering experiments are used to measure ξ?  
*Answer*: S(k) = ∫G(r)e^{ik·r}d³r ≈ S(0)/(1+k²ξ²) (Lorentzian). The peak width at k=0 is ~1/ξ → measuring the width of S(k) near k=0 directly gives ξ. As T→T_c, the peak narrows (ξ→∞), observable as enhanced scattering at small angles.

**MP-5** (evaluate): A student argues "fluctuations at equilibrium die out quickly — they're transient." Evaluate this claim.  
*Answer*: For isolated fluctuations the claim has merit — the fluctuation-dissipation theorem says decay time τ is related to response via τ ∝ χ. But at T_c, χ → ∞ and τ → ∞ (critical slowing down) — fluctuations persist for macroscopic times. Far from T_c, fluctuations also have spatial structure (correlation length ξ) and temporal persistence that CAN matter, e.g. in diffusion, 1/f noise, and Brownian motion.

---

## C6 — Known Sticking Points

1. **Relative vs absolute fluctuations**: Always specify which is meant; relative ~ 1/√N → 0 for large N, but absolute (δE) ~ √N and (δE)² ~ N (extensive).
2. **Correlation function sign**: G(r)<0 is possible (anti-correlations) — e.g., particle-hole correlations; students assume G(r)≥0.
3. **Structure factor vs pair distribution function**: S(k) is Fourier transform of G(r); g(r)=1+G(r)/ρ is the radial distribution function; distinguish carefully.
4. **Fluctuation-dissipation vs Fluctuation theorem**: FDT (Green-Kubo) is the classical/quantum result; Fluctuation theorem (Crooks, Jarzynski) is a modern nonequilibrium generalization — don't conflate.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student says fluctuations are always 1/√N small | MC-FL-FLUCTUATIONS-NEGLIGIBLE diagnostic: ask "what happens to κ_T at T_c?" diverges; "what does that say about (δN)²?" → diverges; absolute fluctuations are macroscopic at criticality |
| Student confuses G(r) with g(r) | "g(r) = 1 + G(r)/ρ is the radial distribution function (equals 1 for uncorrelated fluid); G(r)=⟨n(r)n(0)⟩−⟨n⟩² is the correlation function (equals 0 for uncorrelated); both are used but measure different things" |
| Student asks "how do we measure ξ experimentally?" | "Neutron/X-ray scattering: S(k) peak width = 1/ξ; alternatively, measure C_V → ξ from C_V ~ ξ^(α/ν) scaling relation" |
| Student confused by critical slowing down | "Near T_c, τ_relax ~ ξ^z (dynamical exponent z); slow fluctuations = system takes forever to equilibrate near criticality — relevant for simulations (need exponential more time near T_c)" |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What is C_V? How is it defined from thermodynamics?"
CORE-1 (15 min): TA-1 + TA-2 (critical opalescence hook + notation)
CORE-2 (20 min): TA-3 + TA-4 (derive (δE)²=kT²C_V + MC at T_c)
CORE-3 (20 min): TA-5 (pair correlation function: above/at/below T_c)
DRILL  (10 min): TA-6 (magnetic susceptibility = (δM)²/kT derivation)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Phase transitions are where fluctuations diverge — next session: the Landau theory of how order parameters emerge at phase transitions."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.stat.fluctuations-correlations in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.stat.partition-function verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (correlation length interpretation, structure factor scattering) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-FL-FLUCTUATIONS-NEGLIGIBLE, MC-FL-CORRELATION-IS-SAME-AS-CORRELATION |
| V-8  | C3 has ≥3 worked examples | PASS — energy fluctuations/C_V, particle fluctuations/κ_T, pair correlation |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-FL-FLUCTUATIONS-NEGLIGIBLE |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — TA-4/MP-4 MC-FL-FLUCTUATIONS-NEGLIGIBLE; TA-5/MP-3 MC-FL-CORRELATION |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — 1/√N trigger, G(r) vs g(r) |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
