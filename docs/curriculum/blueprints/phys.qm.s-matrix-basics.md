# Teaching Blueprint — phys.qm.s-matrix-basics

## C0 — Concept Metadata
```
concept_id        : phys.qm.s-matrix-basics
display_name      : S-Matrix Basics
kg_difficulty     : 6 (expert)
bloom_target      : evaluate
mastery_threshold : 0.85
estimated_hours   : 10
prerequisites     : [phys.qm.scattering-theory-born-approximation]
cross_links       : [phys.qm.density-matrix, phys.qm.operators]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
The S-matrix maps asymptotic in-states to asymptotic out-states and encodes all scattering observables; its unitarity is equivalent to conservation of probability, and its poles in the complex-energy plane locate bound states and resonances.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-SMAT-S-IS-JUST-T | "S-matrix and T-matrix are the same thing." | "S = T, so I can use them interchangeably." | S = 1 + iT (in appropriate conventions); the identity part of S corresponds to no scattering, while T (transition matrix) contains the scattering amplitude. S is unitary (SS†=1); T carries the dynamics. Confusing them leads to wrong optical theorem application and wrong pole structures. |
| MC-SMAT-UNITARITY-OPTIONAL | "Unitarity is just a nice property — non-unitary approximations still give useful cross-sections." | "My approximate S doesn't need to be unitary." | Unitarity S†S=1 IS probability conservation; violating it leads to non-physical predictions (negative probabilities, cross-sections violating optical theorem bounds, or probability creation/destruction). Any approximation that breaks unitarity must be used within its known range of validity. |

---

## C3 — Worked Examples

### Example 1 — S-matrix for 1D step barrier
Incident wave k₁ in region I (x<0), transmitted wave k₂ in region II (x>0).
Reflection amplitude r = (k₁−k₂)/(k₁+k₂); transmission t = 2k₁/(k₁+k₂).
S-matrix (2×2 in {inc,refl} basis): S = [[r, t'],[t, r']] where t' = 2k₂/(k₁+k₂), r' = (k₂−k₁)/(k₁+k₂).
Unitarity check: |r|²+(k₂/k₁)|t|²=1 (flux conservation; k₂/k₁ factor from group velocity).
S†S = 1 ✓ (verify explicitly for E>V₀).

### Example 2 — Phase shifts and S-matrix elements
3D scattering: partial-wave S-matrix elements Sₗ = e^{2iδₗ}.
|Sₗ|=1 (elastic scattering, unitarity: each partial wave conserved).
Scattering amplitude: f(θ) = (1/2ik)Σ(2l+1)(Sₗ−1)Pₗ(cosθ) = (1/k)Σ(2l+1)e^{iδₗ}sin(δₗ)Pₗ(cosθ).
Optical theorem: σ_total = (4π/k²)Σ(2l+1)sin²(δₗ) = (4π/k)Im[f(0)] ✓

### Example 3 — S-matrix poles and resonances
For a resonance at energy E_R with width Γ:
Sₗ(E) ≈ e^{2iδ_bg}·(E−E_R−iΓ/2)/(E−E_R+iΓ/2) (Breit-Wigner form).
Pole at E = E_R − iΓ/2 in the complex E-plane (second Riemann sheet).
For bound states (E_B < 0): pole on the positive imaginary-k axis; no width (Γ=0).
Physical interpretation: resonance = quasi-bound state that tunnels out with lifetime τ=ℏ/Γ.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "If you knew the complete scattering matrix S from experiment, you'd know everything: cross-sections, phase shifts, bound states, resonances. The S-matrix is the complete summary of all dynamics — the rest is just reading off what it tells you." |
| TA-2 | P06 | Build notation | Asymptotic in/out states |α,in⟩, |β,out⟩; S-matrix element S_{βα} = ⟨β,out|α,in⟩; decomposition S = 1 + iT; unitarity S†S=1; partial-wave elements Sₗ=e^{2iδₗ} |
| TA-3 | P07 | Formula derivation | Prove optical theorem from unitarity: (S†S)_{αα}=1 → Σ_β|S_{βα}|²=1; expand S=1+iT → Im[T_{αα}] = (1/2)Σ_β|T_{βα}|² → σ=(4π/k)Im[f(0)] |
| TA-4 | P08 | Diagnostic probe | MC-SMAT-S-IS-JUST-T: "Optical theorem is σ=(4π/k)Im[T_{αα}] or Im[f(0)]?" Students must distinguish: f=(k/4π)T in the partial-wave convention; state correctly which to use. |
| TA-5 | P13 | Worked example | Example 2 (phase shifts → S-matrix → cross-section): write Sₗ=e^{2iδₗ}, extract f(θ), verify optical theorem. |
| TA-6 | P10 | Pattern drill | Breit-Wigner drill: given E_R=5 MeV, Γ=2 MeV, sketch |Sₗ|² vs E; identify peak, width, lifetime τ=ℏ/Γ; practice with two different Γ values. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): Write the relationship between S and T matrices. What does the "1" in S=1+iT represent physically?  
*Answer*: S=1+iT; the identity 1 corresponds to no interaction (particle passes through unscattered); T carries all scattering information.

**MP-2** (apply): For a resonance Sₗ(E)=(E−E_R−iΓ/2)/(E−E_R+iΓ/2), compute |Sₗ|² at E=E_R.  
*Answer*: |Sₗ(E_R)|²=|−iΓ/2/(+iΓ/2)|²=|−1|²=1. Unitarity |Sₗ|=1 is preserved at resonance; the cross-section is large because sin²(δₗ)=1 at resonance (δₗ=π/2), not because |Sₗ|>1.

**MP-3** (analyze): Explain why an S-matrix pole at E_B = −|E_B| (real negative energy, imaginary k = iκ) corresponds to a bound state.  
*Answer*: Bound state wavefunction behaves as e^{−κr}/r for large r (normalizable). This requires the incoming wave coefficient to vanish — no incident flux, yet outgoing waves are present. This is exactly a pole of S: S→∞ signals a state that exists without external driving.

**MP-4** (analyze): The optical theorem σ=(4π/k)Im[f(0)] relates total cross-section to forward scattering amplitude. Is this consistent with Born approximation (where f_B is real for real V)?  
*Answer*: For real V, f_B is real (first Born) → Im[f_B(0)]=0 → optical theorem gives σ=0, contradicting dσ/dΩ=|f_B|²≠0. This shows Born approximation breaks the optical theorem — it's not unitary at second order. Second Born approximation adds an imaginary part that restores unitarity perturbatively.

**MP-5** (evaluate): A model gives S=e^{2iδ} with δ complex: δ = δ_R + iδ_I (δ_I > 0). What is |Sₗ|²? Is this physical for elastic scattering?  
*Answer*: |Sₗ|² = |e^{2iδ_R}|² · e^{−4δ_I} = e^{−4δ_I} < 1. This violates unitarity — |Sₗ|<1 means probability is absorbed (inelastic channel). For purely elastic scattering this is non-physical; it's appropriate for an optical potential that models inelastic loss.

---

## C6 — Known Sticking Points

1. **S=1+iT sign conventions**: vary by text; some write S=1−2πiT; always check the convention before using formulas.
2. **Unitarity vs |f|²≥0**: Both are positivity conditions but different; unitarity constrains the total probability sum, not individual amplitudes.
3. **Complex vs real poles**: Bound states → real negative E (imaginary k on first sheet); resonances → complex E (second Riemann sheet); students confuse the two sheets.
4. **Optical theorem for inelastic scattering**: σ_total (not σ_elastic) appears in the optical theorem; σ_elastic ≤ σ_total, with equality only for elastic-only scattering.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student conflates S and T | Return to MC-SMAT-S-IS-JUST-T diagnostic; write S=1+iT explicitly; check: does T have the identity part? No. |
| Student says "Born breaks unitarity so it's wrong" | "Born is right in its domain (weak potential, high energy) and wrong outside it; unitarity is broken at a specific order — second Born restores it. Approximations can break unitarity while still being useful." |
| Student unsure which Riemann sheet | "First sheet: physical, Im(k)>0 for bound states, k>0 real for scattering. Resonances live on the second sheet reached by analytic continuation through the cut on the real axis." |
| Student asks "is S-matrix used in practice?" | "Yes — S-matrix methods dominate particle physics; EVERY observable in a collider is an S-matrix element squared. In condensed matter, S-matrix describes transport through mesoscopic devices (Landauer formula)." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What is the optical theorem? What does f(0) represent?"
CORE-1 (15 min): TA-1 + TA-2 (motivation + S, T notation, unitarity)
CORE-2 (20 min): TA-3 + TA-4 (prove optical theorem from unitarity + MC S vs T)
CORE-3 (20 min): TA-5 (phase shifts → S-matrix → cross-section, optical theorem check)
DRILL  (10 min): TA-6 (Breit-Wigner resonance: peak, width, lifetime)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Density matrix describes mixed states — open quantum systems where scattering is incomplete and coherence is partially lost."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.qm.s-matrix-basics in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.qm.scattering-theory-born-approximation verified |
| V-3  | bloom_target matches C3 verb use | PASS — "evaluate" (assess unitarity of approximations MP-4,5; evaluate poles) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-SMAT-S-IS-JUST-T, MC-SMAT-UNITARITY-OPTIONAL |
| V-8  | C3 has ≥3 worked examples | PASS — 1D step, phase shifts, Breit-Wigner poles |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-SMAT-S-IS-JUST-T |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-4 MC-SMAT-UNITARITY-OPTIONAL; TA-4 MC-SMAT-S-IS-JUST-T |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — S vs T confusion, Born unitarity |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
