# Teaching Blueprint — phys.stat.chemical-potential

## C0 — Concept Metadata
```
concept_id        : phys.stat.chemical-potential
display_name      : Chemical Potential
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 8
prerequisites     : [phys.stat.grand-canonical-ensemble]
cross_links       : [phys.stat.phase-transitions, phys.stat.fluctuations-correlations]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
Chemical potential μ is the free energy cost of adding one particle to a system at fixed T and V, and it governs particle flow between subsystems, phase coexistence, and the occupation of quantum states in statistical mechanics.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-CP-HIGHER-MU-MORE-STABLE | "Higher chemical potential means the phase is more stable." | "The phase with higher μ wins." | Particles flow from HIGH μ to LOW μ (like heat flows from high T to low T); the phase with LOWER μ at given T,P is thermodynamically stable. At a phase transition, μ₁=μ₂; above/below this T or P, one phase has lower μ and is favored. |
| MC-CP-MU-ONLY-CHEMISTRY | "Chemical potential only matters for chemical reactions." | "This is just for chemists." | μ controls ALL particle-number-changing processes: phase transitions, quantum statistics (FD/BE occupation), BEC (μ→0 from below), semiconductor doping (quasi-Fermi levels), electrochemistry, osmosis. In condensed matter and QM, μ is as fundamental as T. |

---

## C3 — Worked Examples

### Example 1 — Chemical potential of an ideal gas
F = NkT[ln(Nλ³/V) − 1] (Helmholtz free energy).
μ = (∂F/∂N)_{T,V} = kT ln(Nλ³/V) = kT ln(ρλ³) where ρ=N/V, λ=h/√(2πmkT).
Features: μ increases with density ρ (more particles → harder to add one more), decreases with T (more accessible states → easier to add a particle). For dilute gas: μ < 0 always (since ρλ³ ≪ 1 → ln < 0).

### Example 2 — Phase coexistence (vapor-liquid)
At coexistence: T₁=T₂=T, P₁=P₂=P, μ_vapor=μ_liquid.
μ_vapor = μ°_g + kT ln(P/P°) (ideal gas reference).
μ_liquid ≈ μ°_l (incompressible, nearly constant).
Setting equal: ln(P_sat/P°) = (μ°_l − μ°_g)/kT → P_sat = P° exp(−L/kT) where L = molar latent heat.
Clausius-Clapeyron: dP_sat/dT = L/(T·ΔV) emerges naturally from μ equalization condition.

### Example 3 — Fermi energy as chemical potential at T=0
Fermi-Dirac: ⟨n_ε⟩ = 1/(e^{β(ε−μ)}+1).
At T→0: step function ⟨n_ε⟩ = θ(μ−ε). All states below μ filled, all above empty.
At T=0, μ = E_F (Fermi energy): adding one more electron costs exactly E_F (next available state).
For 3D free electrons: E_F = (ℏ²/2m)(3π²n)^{2/3} → μ(T=0) grows as n^{2/3}.
At finite T: μ(T) ≈ E_F[1−(π²/12)(kT/E_F)²] (Sommerfeld expansion, μ decreases from E_F).

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "Osmosis: water flows across a membrane from dilute to concentrated salt solution — uphill in hydrostatic pressure but downhill in chemical potential. μ for water is lower where salt is present. Particle flow always follows the μ gradient." |
| TA-2 | P06 | Build notation | μ = (∂F/∂N)_{T,V} = (∂G/∂N)_{T,P} = (∂U/∂N)_{S,V}; particle equilibrium condition μ_A = μ_B; μ as a generalized force conjugate to N; fugacity z = e^{βμ} |
| TA-3 | P07 | Formula derivation | Derive μ for ideal gas from F; show μ = kT ln(Nλ³/V); discuss sign: μ < 0 when ρλ³ < 1 (classical regime); μ → 0 from below as BEC temperature approached (for bosons with ε_min=0) |
| TA-4 | P08 | Diagnostic probe | MC-CP-HIGHER-MU-MORE-STABLE: "Two phases at the same T,P have μ₁ > μ₂. Which is stable?" Stable = lower μ. Visualize: plot G(T) for both phases; intersection = phase transition T. |
| TA-5 | P13 | Worked example | Example 3: Fermi energy as μ at T=0; derive E_F for 3D free electrons; compute μ(T) using Sommerfeld expansion; interpret the decrease of μ with T. |
| TA-6 | P10 | Pattern drill | Given system description, identify the expression for μ: classical gas, fermions at T=0, bosons near BEC, two coexisting phases. Students write the relevant μ formula or condition for each. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): Give two equivalent definitions of chemical potential. For which thermodynamic potential is each the appropriate partial derivative?  
*Answer*: μ = (∂F/∂N)_{T,V} [Helmholtz]; μ = (∂G/∂N)_{T,P} [Gibbs]; μ = (∂U/∂N)_{S,V} [internal energy].

**MP-2** (apply): For an ideal gas at density ρ, temperature T, and particle mass m, compute μ. Under what condition is μ < 0?  
*Answer*: μ = kT ln(ρλ³) where λ = h/√(2πmkT). μ < 0 when ρλ³ < 1 (dilute classical gas — almost always for classical ideal gas).

**MP-3** (analyze): At the liquid-vapor coexistence curve, both phases have the same T and P. What additional condition holds? What breaks when T exceeds the critical temperature?  
*Answer*: μ_liquid = μ_vapor. Above T_c, the distinction between liquid and vapor disappears — μ becomes a single analytic function of T,P (no discontinuity in ∂μ/∂P or ∂μ/∂T), so no coexistence line exists.

**MP-4** (analyze-MC): A semiconductor has electrons with quasi-Fermi level (chemical potential) μ_n and holes with μ_p. Under illumination μ_n − μ_p > 0. What does this mean physically and where does the excess go in a solar cell?  
*Answer*: Illumination drives electrons and holes out of equilibrium (equilibrium requires μ_n = μ_p = E_F). The difference μ_n − μ_p = eV (open-circuit voltage) — it's the free energy per particle stored in the non-equilibrium charge separation, extracted as electric voltage. This is the operating principle of a p-n junction solar cell.

**MP-5** (evaluate): For non-interacting bosons, μ must satisfy μ < ε_min. For photons in a cavity, ε_min = 0. Evaluate: what is μ for photons? Why don't photons condense at low T?  
*Answer*: Photons have μ = 0 always — photon number is not conserved (photons are created/destroyed in thermal equilibrium, so there is no reservoir constraint on N, and the minimization giving μ gives 0). Photons don't condense in 3D because they travel at c and ε_min=0 with dispersion ε=ℏck (no rest mass energy gap) — formal BEC requires a confining potential; photon BEC in confined optical cavities is an active research area.

---

## C6 — Known Sticking Points

1. **μ < 0 for classical gas**: Students alarmed that free energy decreases when adding a particle; clarify that at low density, adding a particle gains more entropy than it costs in energy, so ΔF < 0.
2. **Multiple definitions of μ**: Three equivalent definitions above; which to use depends on which variables are fixed; for most stat mech: use (∂F/∂N)_{T,V}.
3. **μ at phase transition**: Students think μ is discontinuous at a first-order phase transition; clarify that μ is CONTINUOUS (equal in both phases) while its derivatives (density, entropy) are discontinuous.
4. **Quasi-Fermi levels**: The concept that electrons and holes can have different μ is non-trivial; it requires deviation from equilibrium (injection, illumination).

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student says "higher μ = more stable" | MC-CP-HIGHER-MU-MORE-STABLE diagnostic: "Draw G(T) for ice and water — which phase has lower G (=μ per particle) below 0°C? Above?" Direct them to plot. |
| Student confused about photons having μ=0 | "Photon number isn't conserved — no Lagrange multiplier for N needed in the grand partition function. μ=0 is exact, not an approximation; it's why Planck's law has just T." |
| Student asks "what is the chemical potential of an electron in a metal?" | "E_F at T=0; slightly below E_F at room temperature (Sommerfeld correction is tiny for metals: kT ≈ 25 meV, E_F ≈ 5-10 eV for typical metals)." |
| Student confuses μ as electrochemical potential in electrochemistry | "In electrochemistry, μ̃ = μ + zeφ (electrochemical potential includes electric potential energy). The same equilibrium condition μ̃_A = μ̃_B, but now both chemical and electrical contributions count." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What is the grand canonical ensemble? What is fixed?"
CORE-1 (15 min): TA-1 + TA-2 (osmosis motivation + three definitions of μ)
CORE-2 (20 min): TA-3 + TA-4 (ideal gas μ derivation + MC phase stability)
CORE-3 (20 min): TA-5 (Fermi energy = μ at T=0, Sommerfeld T-correction)
DRILL  (10 min): TA-6 (identify μ formula or condition for five system types)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Phase transitions occur where μ curves for different phases cross — next session examines what happens at the crossing, including the Landau theory of phase transitions."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.stat.chemical-potential in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.stat.grand-canonical-ensemble verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (phase coexistence condition, quasi-Fermi levels, μ=0 for photons) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-CP-HIGHER-MU-MORE-STABLE, MC-CP-MU-ONLY-CHEMISTRY |
| V-8  | C3 has ≥3 worked examples | PASS — ideal gas μ, phase coexistence, Fermi energy |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-CP-HIGHER-MU-MORE-STABLE |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/analyze-MC/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-3 MC-CP-HIGHER-MU-MORE-STABLE; TA-4/MP-4 MC-CP-MU-ONLY-CHEMISTRY |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — higher μ stable trigger, photon μ=0 |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
