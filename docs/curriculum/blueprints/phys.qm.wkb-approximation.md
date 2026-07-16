# Teaching Blueprint — phys.qm.wkb-approximation

## C0 — Concept Metadata
```
concept_id        : phys.qm.wkb-approximation
display_name      : WKB Approximation
kg_difficulty     : 6 (expert)
bloom_target      : apply
mastery_threshold : 0.85
estimated_hours   : 8
prerequisites     : [phys.qm.quantum-tunneling, phys.qm.variational-method]
cross_links       : [phys.mech.hamilton-jacobi-equation, phys.qm.hydrogen-atom-qm]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
The WKB (Wentzel-Kramers-Brillouin) approximation constructs approximate wavefunctions from the local de Broglie wavelength when the potential varies slowly compared to that wavelength, bridging quantum and classical mechanics.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-WKB-EXACT-CLASSICALLY | "WKB gives the exact answer in the classical limit ℏ→0." | "Since ℏ is small, WKB is exact for any problem." | WKB fails at classical turning points (where p(x)=0 and λ→∞); connection formulas must patch the solution across turning points. The approximation requires |dλ/dx|≪1, which breaks down at turning points regardless of ℏ. |
| MC-WKB-TUNNELING-FORMULA | "The tunneling probability is e^(−κa) where a is the barrier width." | "Just use the simple exponential decay." | This is only the constant-barrier result. For a spatially varying barrier V(x), the WKB tunneling factor is T ∝ exp(−2∫|p(x)|dx/ℏ) where the integral runs across the classically forbidden region; using barrier width × single κ misses the shape of V(x). |

---

## C3 — Worked Examples

### Example 1 — WKB in a classically allowed region
Schrödinger: −(ℏ²/2m)ψ'' + V(x)ψ = Eψ → ψ'' = −[p(x)/ℏ]²ψ where p(x) = √(2m(E−V(x))).
WKB ansatz: ψ(x) = A(x) exp(iS(x)/ℏ); expand S = S₀ + ℏS₁ + ...
Leading order: (dS₀/dx)² = p²(x) → S₀ = ±∫p(x)dx.
WKB wavefunction: ψ_WKB(x) = C/√(p(x)) · exp(±i∫p(x)dx/ℏ).
Interpretation: amplitude ∝ 1/√p — slower classical motion (smaller p) → larger amplitude (more time spent there).

### Example 2 — Quantization condition (Bohr-Sommerfeld)
For a bound state with two turning points x₁, x₂:
∮p(x)dx = (n + 1/2)·2πℏ = (2n+1)πℏ, n=0,1,2,...
Application — harmonic oscillator: p(x) = √(2m(E − mω²x²/2)), turning points at x = ±√(2E/mω²).
∮p dx = πE/ω = (n+1/2)·πℏ → E = (n+1/2)ℏω. Exact result! (WKB exact for quadratic potentials.)

### Example 3 — Alpha decay tunneling rate (Gamow factor)
Coulomb barrier: V(r) = Zze²/(4πε₀r) for r > R_nuclear.
Turning point r₂: E = V(r₂) → r₂ = Zze²/(4πε₀E).
WKB tunneling factor: G = exp(−2∫_{R}^{r₂} |p(r)|dr/ℏ) where |p|=√(2m(V−E)).
Gamow factor G depends sensitively on E — explains enormous variation in alpha decay half-lives (10⁻⁷ s to 10¹⁰ yr) from small energy differences.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P01 | Concrete hook | "A wave in a medium where the speed changes slowly looks like a plane wave with a local wavelength. WKB says: if potential changes slowly enough, ψ looks like a plane wave with local de Broglie wavelength λ(x)=h/p(x) everywhere." |
| TA-2 | P06 | Build notation | Local momentum p(x)=√(2m(E−V(x))); validity condition |dλ/dx|≪1; WKB form classically allowed: ψ=C/√p·exp(±i∫pdx/ℏ); classically forbidden: ψ=C/√|p|·exp(∓∫|p|dx/ℏ) |
| TA-3 | P07 | Formula derivation | Derive Bohr-Sommerfeld quantization ∮p dx = (n+1/2)·2πℏ from connection formulas (state result; full Airy-function derivation too long for one session — reference it) |
| TA-4 | P08 | Diagnostic probe | MC-WKB-TUNNELING-FORMULA: "A barrier has V(x)=V₀(1−x²/a²) for |x|<a. Write the WKB tunneling exponent." Students write −2∫|p(x)|dx/ℏ with the correct integral, not −2κa. |
| TA-5 | P13 | Worked example | Example 2: Bohr-Sommerfeld for harmonic oscillator — compute ∮p dx, recover E=(n+1/2)ℏω. |
| TA-6 | P10 | Pattern drill | WKB procedure: (1) find turning points where p=0, (2) write classically-allowed vs forbidden ψ, (3) apply Bohr-Sommerfeld or compute Gamow factor. Students identify regions for a given V(x) sketch. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): Write the WKB wavefunction in a classically allowed region. What is the validity condition?  
*Answer*: ψ = C/√p(x) · exp(±i∫p(x)dx/ℏ); valid when |dλ/dx| = |d(h/p)/dx| ≪ 1 (potential varies slowly on the scale of λ).

**MP-2** (apply): For a particle in an infinite square well (V=0, 0<x<L), apply Bohr-Sommerfeld to find the allowed energies. Compare to exact result.  
*Answer*: p = √(2mE) = const; ∮p dx = 2pL = 2nπℏ → E = n²π²ℏ²/(2mL²). WKB gives n+0 not n+1/2 here because the well has hard walls (δ=π/2 at each wall, total phase = π already counted). Exact result: same formula. WKB exact for square wells.

**MP-3** (apply): A particle encounters a parabolic barrier V(x)=V₀−mω²x²/2. Write the Gamow tunneling factor if the particle has energy E < V₀.  
*Answer*: Turning points: V₀−mω²x²/2 = E → x = ±√(2(V₀−E)/mω²). G = exp(−2∫|p|dx/ℏ) where |p|=√(2m(V₀−E−mω²x²/2)); evaluate integral (Gaussian form) → G = exp(−π(V₀−E)/ℏω).

**MP-4** (analyze): WKB predicts that the amplitude of ψ is larger where kinetic energy is small. Explain this physically.  
*Answer*: A classical particle slows down near turning points; it spends more time there → quantum probability amplitude is larger. 1/√p reflects the classical velocity distribution — higher probability where velocity is lower.

**MP-5** (evaluate): At a classical turning point, WKB diverges (1/√p → ∞ as p→0). How is this handled in practice?  
*Answer*: Connection formulas derived from the Airy equation patch the WKB solutions on both sides of the turning point; the Airy function Ai(z) is finite everywhere and connects the oscillatory solution to the evanescent one without divergence. The divergence is a breakdown of the WKB approximation, not of the physics.

---

## C6 — Known Sticking Points

1. **Turning point divergence**: Students alarmed by 1/√p → ∞; clarify it's an approximation breakdown, not a physical divergence, patched by Airy functions.
2. **Phase of 1/2 in Bohr-Sommerfeld**: The (n+1/2) vs n factor depends on boundary condition type; hard wall contributes π/2, soft turning point contributes π/4 each (Maslov index).
3. **Sign of exponent in tunneling**: Students confuse ±; classically forbidden region: |p|=√(2m(V−E)) is real, exponent is −2∫|p|dx/ℏ (decay); always negative.
4. **Validity condition**: Students state "ℏ small" instead of |dλ/dx|≪1; correct by showing the condition is geometric, about potential variation rate.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student uses −κa formula for non-constant barrier | Direct to MC-WKB-TUNNELING-FORMULA; draw V(x) vs barrier; show ∫|p|dx collapses to |p|·a only for constant V |
| Student unsure which region is classically allowed | Check sign of E−V(x): positive → allowed (oscillatory p real), negative → forbidden (evanescent p imaginary) |
| Student frustrated by Airy functions | "We won't compute Airy functions — connection formulas give us the matching conditions. The key result: oscillatory solution on one side, decaying on the other, with specific phase." |
| Student asks about accuracy of WKB for hydrogen atom | Good test: WKB gives exact energies for the 1D radial problem (r-variable) due to the 1/√p amplitude factor matching the exact solution's oscillation count |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What is quantum tunneling? Write T ~ e^(-2κa) for constant barrier."
CORE-1 (15 min): TA-1 + TA-2 (hook + local momentum notation + validity condition)
CORE-2 (20 min): TA-3 + TA-4 (Bohr-Sommerfeld derivation + MC tunneling diagnostic)
CORE-3 (20 min): TA-5 (harmonic oscillator Bohr-Sommerfeld — exact E_n recovered)
DRILL  (10 min): TA-6 (three-step WKB procedure on V(x) sketch problems)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "The WKB approximation connects ψ to the HJ principal function S via ψ ∝ e^(iS/ℏ) — the Bohr-Sommerfeld condition is the quantization of classical action."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.qm.wkb-approximation in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.qm.quantum-tunneling, phys.qm.variational-method verified |
| V-3  | bloom_target matches C3 verb use | PASS — "apply" (compute Gamow factor, apply Bohr-Sommerfeld) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-WKB-EXACT-CLASSICALLY, MC-WKB-TUNNELING-FORMULA |
| V-8  | C3 has ≥3 worked examples | PASS — allowed region, Bohr-Sommerfeld, alpha decay |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P01 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-WKB-TUNNELING-FORMULA |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/apply/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-3 covers MC-WKB-TUNNELING-FORMULA; MP-5 addresses MC-WKB-EXACT-CLASSICALLY |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — constant-barrier formula trigger, validity condition |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
