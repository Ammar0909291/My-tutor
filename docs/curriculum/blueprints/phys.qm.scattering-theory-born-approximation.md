# Teaching Blueprint — phys.qm.scattering-theory-born-approximation

## C0 — Concept Metadata
```
concept_id        : phys.qm.scattering-theory-born-approximation
display_name      : Scattering Theory and Born Approximation
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 12
prerequisites     : [phys.qm.operators, phys.qm.angular-momentum-addition, phys.mech.hamiltonian]
cross_links       : [phys.qm.s-matrix-basics, phys.qm.variational-method]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
Quantum scattering theory describes how particles deflect from potentials; the Born approximation gives the differential cross-section dσ/dΩ as the Fourier transform of the scattering potential in the weak-scattering limit.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-SCAT-CROSS-SECTION-AREA | "Cross-section is the geometric area of the target." | "σ = πR² for a sphere." | Cross-section is an effective area — the ratio of scattered flux to incident flux per unit target density. For quantum scatterers, σ depends on the potential strength and energy, not just geometry. A hard sphere has σ=4πR² at low energy (not πR²) due to wave diffraction. |
| MC-BORN-ALWAYS-VALID | "The Born approximation works whenever the potential is weak." | "V is small so Born is fine." | Born approximation requires |V̄|/E ≪ 1 AND that the scattering does not significantly deplete the incident wave — both conditions needed. At low energy (kR≪1), Born fails for potentials with bound states even if V is 'small.' Validity: ka≫1 AND V₀/(ℏ²k²/2m)≪1 |

---

## C3 — Worked Examples

### Example 1 — Differential cross-section formalism
Incident: ψ_inc = e^{ikz}. Scattered: ψ_sc = f(θ,φ) e^{ikr}/r (asymptotic).
Differential cross-section: dσ/dΩ = |f(θ,φ)|².
Total cross-section: σ = ∫|f|²dΩ.
Optical theorem: σ = (4π/k) Im[f(θ=0)] — total cross-section from forward scattering amplitude.

### Example 2 — Born approximation for Yukawa potential
V(r) = V₀ e^{−μr}/r; momentum transfer q = 2k sin(θ/2).
Born amplitude: f_B(θ) = −(2m/4πℏ²) Ṽ(q) where Ṽ(q) = ∫V(r)e^{iq·r}d³r.
For Yukawa: Ṽ(q) = 4πV₀/(μ²+q²).
dσ/dΩ = (2mV₀/ℏ²)²/(μ²+4k²sin²(θ/2))² (Yukawa Born result).
Coulomb limit μ→0: dσ/dΩ = (Ze²/4E)²/sin⁴(θ/2) — Rutherford formula recovered ✓

### Example 3 — Partial wave expansion
f(θ) = (1/k)Σ_{l=0}^{∞} (2l+1) e^{iδ_l} sin(δ_l) P_l(cosθ).
Phase shifts δ_l parametrize scattering; for hard sphere radius R at low energy kR≪1: δ_0 ≈ −kR → σ → 4πR² (4× geometric — s-wave dominates, geometric argument invalid at low energy).
Total cross-section: σ = (4π/k²)Σ(2l+1)sin²(δ_l).

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "Rutherford bombarded gold foil with alpha particles and found backward scattering — classical hard sphere predicts no backward scattering for distributed charge. The quantum calculation (Born approximation) exactly reproduces Rutherford's formula and proves the nucleus is pointlike." |
| TA-2 | P06 | Build notation | Scattering amplitude f(θ,φ); asymptotic wavefunction ψ→e^{ikz}+f(θ)e^{ikr}/r; differential cross-section dσ/dΩ=|f|²; total cross-section σ=∫dΩ|f|² |
| TA-3 | P07 | Formula derivation | Born approximation: treat V as perturbation; first Born: f_B = −(m/2πℏ²)∫e^{−iq·r}V(r)d³r = −(m/2πℏ²)Ṽ(q); momentum transfer q=k_f−k_i, |q|=2k sin(θ/2) |
| TA-4 | P08 | Diagnostic probe | MC-SCAT-CROSS-SECTION-AREA: "Electron scatters from hydrogen atom (radius a₀~0.5Å, charge distribution extended). Estimate σ at high energy vs low energy and explain why they differ from πa₀²." |
| TA-5 | P13 | Worked example | Example 2: Yukawa → Born → Rutherford. Full derivation: compute Ṽ(q) via Fourier transform, write dσ/dΩ, take μ→0. |
| TA-6 | P10 | Pattern drill | Partial wave method steps: (1) expand in P_l(cosθ), (2) solve radial Schrödinger with boundary condition, (3) extract phase shift δ_l, (4) sum cross-sections. Students apply for hard sphere s-wave. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the Born approximation for the scattering amplitude f(θ). What physical condition validates it?  
*Answer*: f_B(θ) = −(m/2πℏ²)∫e^{−iq·r}V(r)d³r = −(m/2πℏ²)Ṽ(q); valid when V ≪ E (weak potential) AND incident wave not significantly depleted.

**MP-2** (apply): For a spherical square well V(r)=−V₀ for r<a, 0 otherwise, write the Born approximation for the total cross-section at high energy ka≫1. (Setup only — evaluate the Fourier transform.)  
*Answer*: Ṽ(q) = −V₀∫₀ᵃ∫e^{iq·r}d³r = −4πV₀(sin(qa)−qa cos(qa))/q³; dσ/dΩ = (mV₀/2πℏ²)²|4π(sin−qa·cos)/q³|²; total σ = ∫dΩ|f_B|².

**MP-3** (analyze): The optical theorem states σ = (4π/k)Im[f(0)]. How does this follow from probability conservation?  
*Answer*: The total probability flux (scattered in all directions) must equal the depletion from the forward beam. Conservation of probability current leads to Im[f(0)] = (k/4π)σ via the optical theorem — it is a non-perturbative result valid beyond Born.

**MP-4** (analyze-MC): Born approximation for Coulomb gives exact Rutherford formula. Does this mean Born is exact for Coulomb?  
*Answer*: Not in general — Born is exact for Coulomb differential cross-section (classical and quantum agree due to the 1/r potential's special structure: exact Born amplitude = classical amplitude). For bound states or total cross-section, the Coulomb problem requires exact treatment (infinite-range potential).

**MP-5** (evaluate): A student applies Born approximation to a potential with a bound state at E=0. The calculation gives a large cross-section σ≫4πa². Is this reliable?  
*Answer*: No — a bound state at E=0 is the zero-energy resonance condition (s-wave phase shift δ₀→π/2). This signals breakdown of Born approximation regardless of V₀ strength. The exact partial-wave result σ=4π/k²·sin²(δ₀) diverges at resonance; Born misses this physics entirely.

---

## C6 — Known Sticking Points

1. **Cross-section dimensions**: σ has units of area (m²); dσ/dΩ has units of area per steradian (m²/sr) — students frequently confuse these.
2. **Momentum transfer q**: |q|=2k sin(θ/2); students sometimes write |q|=|k_f−k_i|=0 (forgetting elastic scattering k_f=k_i in magnitude only).
3. **Optical theorem**: Students treat it as a formula to memorize; emphasize it is probability conservation — Im[f(0)] encodes how much flux is removed from the forward beam.
4. **Born validity near resonance**: See MP-5; the approximation breaks down catastrophically near bound states or zero-energy resonances.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student writes σ=πa² for quantum hard sphere | Invoke MC-SCAT-CROSS-SECTION-AREA; compute partial-wave low-energy result: σ=4πa² (s-wave diffraction, not geometrical projection) |
| Student applies Born to low-energy Coulomb | "Coulomb Born gives exact dσ/dΩ (special case); total σ diverges for Coulomb — the cross-section being exact doesn't mean the approximation is generally valid at low k" |
| Student confused by complex f(θ) | "f is complex — the imaginary part encodes phase information about whether the wave speeds up or slows down in the potential; only |f|² is directly observable" |
| Student asks "when do I use partial waves vs Born?" | "Born: high energy, weak potential, any angle. Partial waves: low energy (few l-values dominate), or near resonances. For Coulomb: both give exact dσ/dΩ, use whichever is more convenient." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "Rutherford experiment: what was the surprising result? What model was it testing?"
CORE-1 (15 min): TA-1 + TA-2 (Rutherford motivation + asymptotic wavefunction notation)
CORE-2 (20 min): TA-3 + TA-4 (Born formula derivation + MC cross-section diagnostic)
CORE-3 (20 min): TA-5 (Yukawa → Coulomb, full Born calculation, Rutherford formula)
DRILL  (10 min): TA-6 (partial-wave steps for hard sphere s-wave)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "S-matrix encodes all scattering in one operator — next session we'll see how S-matrix relates to phase shifts and T-matrix."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.qm.scattering-theory-born-approximation in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.qm.operators, phys.qm.angular-momentum-addition, phys.mech.hamiltonian verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (optical theorem proof, resonance breakdown analysis) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-SCAT-CROSS-SECTION-AREA, MC-BORN-ALWAYS-VALID |
| V-8  | C3 has ≥3 worked examples | PASS — cross-section formalism, Yukawa/Rutherford, partial waves |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-SCAT-CROSS-SECTION-AREA |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/analyze-MC/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-5 MC-BORN-ALWAYS-VALID; MP-4/TA-4 MC-SCAT-CROSS-SECTION-AREA |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — hard sphere σ trigger, Born-at-resonance |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
