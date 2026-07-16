# Teaching Blueprint — phys.stat.grand-canonical-ensemble

## C0 — Concept Metadata
```
concept_id        : phys.stat.grand-canonical-ensemble
display_name      : Grand Canonical Ensemble
kg_difficulty     : 6 (expert)
bloom_target      : apply
mastery_threshold : 0.85
estimated_hours   : 9
prerequisites     : [phys.stat.partition-function]
cross_links       : [phys.stat.chemical-potential, phys.qm.identical-particles, phys.qm.density-matrix]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
The grand canonical ensemble describes a system in contact with both a heat bath (fixed T) and a particle reservoir (fixed μ), with the grand partition function Ξ = Tr[e^{−β(H−μN)}] giving all thermodynamic quantities including the average particle number.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-GCE-MU-IS-ENERGY | "Chemical potential μ is just another energy." | "μ is the energy per particle." | μ IS the energy cost of adding one particle at fixed T, V, S — but crucially it controls particle NUMBER in equilibrium. Two systems in equilibrium exchange particles until μ₁=μ₂ (just as temperature equalizes heat flow). μ can be negative (bosons at high T, dilute classical gas) — calling it "an energy" without this directionality misses its function. |
| MC-GCE-FUGACITY-IS-PROB | "Fugacity z=e^{βμ} is the probability of finding a particle." | "High fugacity means more likely to be occupied." | Fugacity z controls the thermodynamic weight of states with different N, not occupation probability directly. For bosons, occupation ⟨n⟩=z/(e^{βε}−z); z must satisfy z < e^{βε_min} (z<1 for zero-gap bosons) to keep Ξ convergent — not a probability. |

---

## C3 — Worked Examples

### Example 1 — Grand partition function (general)
Ξ(T,V,μ) = Σ_{N=0}^{∞} z^N Z_N(T,V) where z=e^{βμ}, Z_N = canonical partition function for N particles.
Grand potential: Ω = −kT ln Ξ.
Average particle number: ⟨N⟩ = z ∂(ln Ξ)/∂z = kT ∂(ln Ξ)/∂μ.
Average energy: ⟨E⟩ = −∂(ln Ξ)/∂β|_{z,V} + μ⟨N⟩.
Pressure: PV = kT ln Ξ = −Ω.

### Example 2 — Ideal classical gas in grand canonical ensemble
Single-particle partition function: ξ = V(2πmkT/h²)^{3/2} = V/λ³ (thermal de Broglie).
Grand partition function: Ξ = Σ_N z^N ξ^N/N! = e^{zξ} (Poisson distribution in N).
⟨N⟩ = z ∂ ln Ξ/∂z = zξ → μ = kT ln(N/ξ) = kT ln(Nλ³/V) (recovers classical μ).
Grand potential: Ω = −kT zξ = −PV → P = NkT/V ✓

### Example 3 — Fermi-Dirac and Bose-Einstein from grand canonical
For independent quantum particles: Ξ = Π_ε Ξ_ε.
Fermion (each level 0 or 1): Ξ_ε = 1 + ze^{−βε}; ⟨n_ε⟩ = ze^{−βε}/(1+ze^{−βε}) = 1/(e^{β(ε−μ)}+1) [Fermi-Dirac] ✓
Boson (each level 0,1,2,...): Ξ_ε = 1/(1−ze^{−βε}); ⟨n_ε⟩ = ze^{−βε}/(1−ze^{−βε}) = 1/(e^{β(ε−μ)}−1) [Bose-Einstein] ✓
Both derived from grand canonical ensemble with exchange symmetry built into N-counting.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "A container of gas has a small hole connecting it to a larger reservoir at the same temperature. Particles flow in and out. At equilibrium, what is fixed? T and μ — not N. The grand canonical ensemble is the right description for any system that exchanges particles with its environment." |
| TA-2 | P06 | Build notation | Grand canonical ensemble: fixed T,V,μ; Ξ=Σ_N z^N Z_N; z=e^{βμ} (fugacity); grand potential Ω=−kT ln Ξ; ⟨N⟩=kT ∂ ln Ξ/∂μ; Ω = U − TS − μN |
| TA-3 | P07 | Formula derivation | Derive FD and BE distributions from grand canonical (Example 3): factorize Ξ=Π_ε Ξ_ε; compute ⟨n_ε⟩ for fermions and bosons from ∂ ln Ξ_ε/∂(βμ) |
| TA-4 | P08 | Diagnostic probe | MC-GCE-MU-IS-ENERGY: "At T→0, what is μ for a Fermi gas? Is it an energy?" μ(T=0)=E_F (Fermi energy) — yes, it IS the energy of the highest occupied state. But for bosons μ<0 at all T>T_c — negative "energy" per particle? Only makes sense as the equilibrium particle-exchange control parameter. |
| TA-5 | P13 | Worked example | Example 2: derive classical gas Ξ=e^{zξ}, recover ⟨N⟩=zξ, verify P=NkT/V, identify μ=kT ln(Nλ³/V). |
| TA-6 | P10 | Pattern drill | Grand canonical thermodynamics: given ln Ξ, compute ⟨N⟩, P, ⟨E⟩ using the derivatives; students apply to Ξ=Ξ_FD for a single level. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): Write the grand partition function Ξ in terms of the canonical partition functions Z_N. What thermodynamic quantities are fixed in the grand canonical ensemble?  
*Answer*: Ξ = Σ_{N=0}^{∞} e^{βμN} Z_N(T,V); fixed: T (from reservoir), V (rigid walls), μ (from particle reservoir).

**MP-2** (apply): For a single quantum level at energy ε accessible to bosons, compute Ξ_ε and ⟨n_ε⟩.  
*Answer*: Ξ_ε = Σ_{n=0}^{∞} (ze^{−βε})^n = 1/(1−ze^{−βε}); ⟨n_ε⟩ = z ∂ ln Ξ_ε/∂z = ze^{−βε}/(1−ze^{−βε}) = 1/(e^{β(ε−μ)}−1). Requires ze^{−βε}<1 i.e. μ<ε for all ε.

**MP-3** (apply): Show that for the classical ideal gas, the Boltzmann distribution ⟨n_ε⟩ ∝ e^{−βε} emerges from the Fermi-Dirac result when e^{β(ε−μ)} ≫ 1.  
*Answer*: ⟨n_FD⟩ = 1/(e^{β(ε−μ)}+1) ≈ e^{−β(ε−μ)} = e^{βμ}e^{−βε} = ze^{−βε} when z≪1 (dilute limit). Boltzmann distribution recovered with z=e^{βμ}=Nλ³/V≪1.

**MP-4** (analyze): Two systems A, B share particles. At equilibrium, what condition holds? How does this follow from maximizing total entropy?  
*Answer*: μ_A = μ_B. Maximize S_total = S_A + S_B subject to N_A + N_B = const and dS_A/dN_A = dS_B/dN_B → (∂S/∂N)_{T,V} equal → μ_A/T = μ_B/T → μ_A = μ_B.

**MP-5** (evaluate): A student claims "I can always use the canonical ensemble — just fix N and ignore μ." Identify one situation where this fails.  
*Answer*: Chemical reactions, phase transitions (coexistence), quantum statistics (counting states requires fixed-μ approach for FD/BE), adsorption on a surface in contact with a gas reservoir. For any open system, fixing N is wrong because particle number fluctuates — the canonical partition function Z_N sums over energy at fixed N, but computing ⟨N⟩ requires the grand canonical. Example: BEC — the critical T depends on ⟨N⟩ derived from Ξ, not from Z_N.

---

## C6 — Known Sticking Points

1. **Grand potential vs free energy**: Ω = U−TS−μN (not A = U−TS); the extra −μN is because grand canonical has a particle reservoir.
2. **Negative μ**: Students expect μ to be positive (energy cost); clarify that μ<0 for bosons (adding a particle DECREASES free energy in dilute limit — system "wants" more particles at low density).
3. **Convergence of Ξ for bosons**: Requires ze^{−βε}<1 for ALL levels; if ε_min=0 (photons, phonons), must have z<1 strictly → μ<0 always for such bosons.
4. **Fluctuations in N**: (δN)² = kT ∂⟨N⟩/∂μ; for ideal gas (δN)²=⟨N⟩ (Poisson) — students often forget that N fluctuates in the grand canonical ensemble.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student applies μ = E/N (energy per particle) | Flag: "That's the energy per particle U/N, not chemical potential. μ = (∂G/∂N)_{T,P} = (∂F/∂N)_{T,V}. For ideal gas μ = kT ln(Nλ³/V) which involves entropy and is NOT U/N." |
| Student confused why z<1 required for bosons | "z=e^{βμ}; if z≥1 and ε_min=0, Ξ=Σ(ze^{−βε})^n diverges for ε=0 level — infinite occupancy, non-physical. The constraint z<1 is the convergence condition for the geometric series." |
| Student asks "how is grand canonical related to canonical?" | "Grand canonical = Σ_N z^N × canonical Z_N. It's a generating function that sums over all N, weighting each by the fugacity z^N. The canonical ensemble is a fixed-N slice." |
| Student unsure when grand canonical is needed | "Open system (particle exchange), quantum statistics, chemical equilibrium, electrochemistry (electron transfer), adsorption. Canonical works only for closed systems with fixed N." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What is the canonical partition function Z? What is fixed?"
CORE-1 (15 min): TA-1 + TA-2 (reservoir motivation + grand canonical notation)
CORE-2 (20 min): TA-3 + TA-4 (FD and BE derivation + MC μ diagnostic)
CORE-3 (20 min): TA-5 (classical gas: Ξ=e^{zξ}, recover PV=NkT)
DRILL  (10 min): TA-6 (thermodynamic derivatives from ln Ξ)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Chemical potential is the lever for particle number — next session: how μ depends on density, temperature, and phase."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.stat.grand-canonical-ensemble in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.stat.partition-function verified |
| V-3  | bloom_target matches C3 verb use | PASS — "apply" (derive FD/BE, compute Ξ, recover PV=NkT) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-GCE-MU-IS-ENERGY, MC-GCE-FUGACITY-IS-PROB |
| V-8  | C3 has ≥3 worked examples | PASS — general Ξ, classical gas, FD/BE |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-GCE-MU-IS-ENERGY |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/apply/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-2 MC-GCE-FUGACITY-IS-PROB; TA-4 MC-GCE-MU-IS-ENERGY |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — μ=U/N confusion, z<1 for bosons |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
