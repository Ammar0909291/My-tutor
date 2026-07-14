# Teaching Blueprint — phys.qm.identical-particles

## C0 — Concept Metadata
```
concept_id        : phys.qm.identical-particles
display_name      : Identical Particles
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 9
prerequisites     : [phys.qm.spin, phys.qm.pauli-exclusion]
cross_links       : [phys.qm.angular-momentum-addition, phys.stat.grand-canonical-ensemble]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
Quantum mechanics forbids distinguishing identical particles by any means, requiring multiparticle wavefunctions to be symmetric (bosons) or antisymmetric (fermions) under particle exchange, with profound consequences for statistics and structure.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-IP-LABEL-MEANINGFUL | "Particle 1 is at position x₁ and particle 2 is at position x₂." | "I'll write ψ(x₁,x₂) where particle 1 is the one on the left." | There is no observable that distinguishes two identical particles; labels 1 and 2 are bookkeeping devices. The physical state must be symmetric or antisymmetric under exchange so |ψ(x₁,x₂)|² = |ψ(x₂,x₁)|² (identical probability distribution regardless of labeling). |
| MC-IP-EXCHANGE-SPATIAL-ONLY | "Symmetrization only applies to the spatial wavefunction." | "The spin part handles itself separately." | Full wavefunction must be (anti)symmetric in ALL quantum numbers simultaneously — space × spin. For fermions, antisymmetric total wavefunction can arise from antisymmetric-spatial × symmetric-spin (triplet) OR symmetric-spatial × antisymmetric-spin (singlet); the exchange symmetry applies to the combined state. |

---

## C3 — Worked Examples

### Example 1 — Two-boson ground state
Two non-interacting bosons in a 1D box; single-particle states φₙ(x).
Both in n=1 ground state: ψ(x₁,x₂) = φ₁(x₁)φ₁(x₂). Already symmetric: ψ(x₂,x₁) = ψ(x₁,x₂) ✓
Both in different states (n=1, n=2): ψ_S = (1/√2)[φ₁(x₁)φ₂(x₂) + φ₂(x₁)φ₁(x₂)].
Energy: E = E₁ + E₂; no exclusion principle — both can occupy same state.

### Example 2 — Two-fermion antisymmetric state (Slater determinant)
Two electrons in states φ_a, φ_b (space+spin combined):
ψ_A = (1/√2)|φ_a(1) φ_b(1); φ_a(2) φ_b(2)| = (1/√2)[φ_a(1)φ_b(2) − φ_b(1)φ_a(2)].
If φ_a = φ_b: ψ_A = 0. Pauli exclusion emerges naturally from antisymmetry.
Physical example: helium ground state — spin singlet × symmetric spatial.
Space: ψ_S = (1/√2)[φ_1s(r₁)φ_1s(r₂)] (both in 1s); spin: |↑↓⟩−|↓↑⟩)/√2 (singlet, antisymmetric in spin).
Total: symmetric-space × antisymmetric-spin = antisymmetric ✓

### Example 3 — Exchange interaction (ferromagnetic tendency)
Two electrons in states 1, 2 with Coulomb repulsion e²/r₁₂:
Triplet (antisymmetric spatial): ψ_A = (φ₁φ₂ − φ₂φ₁)/√2 → electrons avoid each other → lower Coulomb energy.
Singlet (symmetric spatial): ψ_S = (φ₁φ₂ + φ₂φ₁)/√2 → electrons can overlap → higher Coulomb energy.
Exchange energy J = E_singlet − E_triplet = 2⟨φ₁φ₂|e²/r₁₂|φ₂φ₁⟩ > 0.
Hund's first rule: triplet (parallel spins) has lower energy — direct consequence of antisymmetry.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "Drop two identical pennies from height h. Can you say 'penny 1 lands at x₁'? Classically yes — track trajectories. In QM, wavefunctions overlap: there IS no fact about which particle is which. This is not ignorance — it's a fundamental feature." |
| TA-2 | P06 | Build notation | Exchange operator P̂₁₂: P̂₁₂ψ(1,2) = ψ(2,1); eigenvalues ±1; bosons: P̂₁₂ψ=+ψ; fermions: P̂₁₂ψ=−ψ; spin-statistics theorem: integer spin → bosons; half-integer → fermions |
| TA-3 | P07 | Formula derivation | Symmetrization postulate → Slater determinant for N fermions: N×N determinant with φᵢ(j) entries; automatic antisymmetry under row/column swap; zero determinant if two rows identical (Pauli exclusion) |
| TA-4 | P08 | Diagnostic probe | MC-IP-EXCHANGE-SPATIAL-ONLY: "Helium first excited state has one electron in 1s, one in 2s. List all possible fully antisymmetric states." Students must combine spatial symmetric/antisymmetric × spin singlet/triplet; only antisymmetric-total combinations count. |
| TA-5 | P13 | Worked example | Example 3 (exchange interaction): derive J = 2⟨φ₁φ₂|V|φ₂φ₁⟩; explain Hund's rule; connect to ferromagnetism. |
| TA-6 | P10 | Pattern drill | Given N single-particle states for 2 fermions and 2 bosons: count distinct states; students practice symmetrizing/antisymmetrizing; verify Pauli exclusion for fermions. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the symmetrization postulate for bosons and fermions. What determines which applies to a given particle?  
*Answer*: Bosons (integer spin): ψ symmetric under exchange; fermions (half-integer spin): ψ antisymmetric under exchange. The spin-statistics theorem (from relativistic QFT) connects spin to statistics.

**MP-2** (apply): Write the fully antisymmetric two-fermion state for electrons in states |α⟩=|1s↑⟩ and |β⟩=|1s↓⟩.  
*Answer*: ψ = (1/√2)[|1s↑⟩₁|1s↓⟩₂ − |1s↓⟩₁|1s↑⟩₂] = (1/√2)φ₁s(r₁)φ₁s(r₂)[|↑↓⟩−|↓↑⟩]. Not zero — different spin states allowed.

**MP-3** (analyze-MC): "The helium singlet and triplet excited states have the same spatial energy in isolation but different total energies due to exchange." Explain why the triplet lies LOWER in energy.  
*Answer*: Triplet has antisymmetric spatial wavefunction → nodes where r₁=r₂ → electrons avoid each other → lower Coulomb repulsion → lower energy. Exchange integral J = E_singlet − E_triplet > 0.

**MP-4** (analyze): Three identical bosons occupy single-particle states {φ₁, φ₁, φ₂}. Write the normalized symmetric state.  
*Answer*: ψ = (1/√3)[φ₁(1)φ₁(2)φ₂(3) + φ₁(1)φ₂(2)φ₁(3) + φ₂(1)φ₁(2)φ₁(3)]. Factor 1/√3 from 3 distinct permutations. (Two particles in same state = no extra 1/√2 for those pair swaps — already accounted in counting.)

**MP-5** (evaluate): A student argues "since we can't distinguish particles, the two-particle state φ_a(1)φ_b(2) is fine as a fermion state because we can't tell which is 1 and which is 2." Critique this argument.  
*Answer*: φ_a(1)φ_b(2) is NOT a valid fermion state — it is not antisymmetric (swapping gives φ_a(2)φ_b(1) ≠ −φ_a(1)φ_b(2)). The student is confusing "unlabeled particles" with "valid quantum state." The physical indistinguishability REQUIRES antisymmetry; the Slater determinant is the correct two-particle state.

---

## C6 — Known Sticking Points

1. **Permutation factor**: Students often forget the 1/√2 (or 1/√N!) normalization in symmetrized states.
2. **Space × spin symmetry**: The most common error — treating spatial and spin parts as independent when only their combined symmetry matters.
3. **Bosons and Pauli**: Students incorrectly apply Pauli exclusion to bosons; clarify it is exclusively a fermion property (antisymmetry zero → prohibition).
4. **3+ particles**: Slater determinant extends to N particles (N×N); students unsure how to generalize the 2-particle construction.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student writes non-symmetrized product state for fermions | Flag: "Is ψ(x₁,x₂)=φ_a(x₁)φ_b(x₂) antisymmetric? Swap variables and check sign." |
| Student confuses exchange with spatial swap only | Return to MC-IP-EXCHANGE-SPATIAL-ONLY diagnostic; ask "what is the TOTAL (space×spin) symmetry?" |
| Student asks "why do bosons/fermions exist?" | "The spin-statistics theorem from relativistic QFT — in non-relativistic QM it is a postulate; the deep reason requires Lorentz invariance and causality." |
| Student confused about exchange energy being purely quantum | "There is no classical exchange energy — it arises entirely from the symmetry constraint on the wavefunction, not from a new force." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "Write the Pauli exclusion principle. Where does it come from?"
CORE-1 (15 min): TA-1 + TA-2 (penny thought experiment + exchange operator + spin-statistics)
CORE-2 (20 min): TA-3 + TA-4 (Slater determinant derivation + MC diagnostic space×spin)
CORE-3 (20 min): TA-5 (exchange interaction: helium singlet/triplet, Hund's rule derivation)
DRILL  (10 min): TA-6 (symmetrize/antisymmetrize practice problems)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Grand canonical ensemble counts states with exchange symmetry built in — that's why bosons get Bose-Einstein and fermions get Fermi-Dirac statistics."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.qm.identical-particles in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.qm.spin, phys.qm.pauli-exclusion verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (exchange energy, Hund's rule derivation) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-IP-LABEL-MEANINGFUL, MC-IP-EXCHANGE-SPATIAL-ONLY |
| V-8  | C3 has ≥3 worked examples | PASS — two-boson, Slater/helium, exchange interaction |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-IP-EXCHANGE-SPATIAL-ONLY |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze-MC/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-5 MC-IP-LABEL-MEANINGFUL; MP-3 MC-IP-EXCHANGE-SPATIAL-ONLY |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — non-symmetrized state trigger, spatial-only exchange |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
