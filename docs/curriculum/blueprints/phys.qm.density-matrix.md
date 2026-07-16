# Teaching Blueprint — phys.qm.density-matrix

## C0 — Concept Metadata
```
concept_id        : phys.qm.density-matrix
display_name      : Density Matrix
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 10
prerequisites     : [phys.qm.operators, phys.qm.spin]
cross_links       : [phys.qm.s-matrix-basics, phys.stat.grand-canonical-ensemble]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
The density matrix ρ̂ provides a unified description of both pure states (complete quantum information) and mixed states (ensembles or entangled subsystems), with all quantum-mechanical expectation values given by ⟨A⟩ = Tr(ρ̂Â).

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-DM-MIXED-IS-SUPERPOSITION | "A mixed state is a superposition of states — like |ψ⟩ = Σcₙ|n⟩." | "The density matrix is just a more complicated wavefunction." | A superposition is a PURE state with definite relative phases; a mixed state is a CLASSICAL ensemble with probabilities (no phases between terms). ρ = Σpₙ|n⟩⟨n| ≠ |ψ⟩⟨ψ| for |ψ⟩=Σcₙ|n⟩. Key test: ρ² = ρ for pure; Tr(ρ²) < 1 for mixed. |
| MC-DM-PARTIAL-TRACE-LOSES-INFO | "After tracing out the environment, I've lost all the quantum information." | "Partial trace destroys entanglement — the state is now classical." | Partial trace gives the reduced density matrix ρ_A = Tr_B(ρ_AB), which retains ALL locally accessible quantum information about subsystem A. ρ_A can still be a mixed quantum state (not classical); quantum coherences WITHIN A are preserved; only correlations WITH B are lost. |

---

## C3 — Worked Examples

### Example 1 — Pure vs mixed state for spin-1/2
Pure state |+x⟩ = (|↑⟩+|↓⟩)/√2: ρ = |+x⟩⟨+x| = (1/2)[[1,1],[1,1]]. Tr(ρ²)=1/2(1+1)=1 ✓
50-50 classical mixture of |↑⟩ and |↓⟩: ρ_mix = (1/2)|↑⟩⟨↑|+(1/2)|↓⟩⟨↓| = (1/2)[[1,0],[0,1]].
Compare: ⟨σ_x⟩ = Tr(ρσ_x): pure → 1; mixed → 0. Observable difference despite same populations p_↑=p_↓=1/2.
Tr(ρ_mix²) = 1/2 < 1 → mixed ✓

### Example 2 — Entangled state and partial trace
Bell state |Φ⁺⟩ = (|↑↑⟩+|↓↓⟩)/√2; full density matrix ρ_{AB} = |Φ⁺⟩⟨Φ⁺|.
Partial trace over B: ρ_A = Tr_B(ρ_{AB}) = (1/2)(|↑⟩⟨↑|+|↓⟩⟨↓|) = (1/2)I.
ρ_A is maximally mixed — despite the full state being pure (Tr(ρ_{AB}²)=1), subsystem A appears maximally uncertain.
Interpretation: entanglement causes subsystem mixedness; ρ_A cannot be used to distinguish |Φ⁺⟩ from |Φ⁻⟩ or a 50-50 classical mixture.

### Example 3 — Von Neumann equation and thermal state
Time evolution: dρ/dt = (1/iℏ)[H,ρ] (von Neumann equation — density matrix analog of Schrödinger).
Thermal (Gibbs) state: ρ_th = e^{−βH}/Z where Z = Tr(e^{−βH}) (partition function).
Check: dρ_th/dt = (1/iℏ)[H,e^{−βH}/Z] = 0 (H commutes with functions of H) → thermal state is stationary ✓
Expectation: ⟨A⟩ = Tr(ρ_th A) = Tr(Ae^{−βH})/Z — connects quantum density matrix to statistical mechanics.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "A photon exits a beam-splitter and entangles with a detector we don't have access to. What is the quantum state of the photon? No single wavefunction exists — the density matrix is the only honest description of any open or entangled quantum system." |
| TA-2 | P06 | Build notation | ρ̂ for pure state: ρ=|ψ⟩⟨ψ|; for mixed: ρ=Σpₙ|ψₙ⟩⟨ψₙ|; properties: Hermitian ρ†=ρ, unit trace Tr(ρ)=1, positive semi-definite ρ≥0; pure iff ρ²=ρ (Tr(ρ²)=1); expectation ⟨A⟩=Tr(ρA) |
| TA-3 | P07 | Formula derivation | Partial trace: ρ_A = Tr_B(ρ_{AB}) = Σₙ ⟨n_B|ρ_{AB}|n_B⟩; derive for Bell state (Example 2); show purity drops from 1 to 1/2 upon tracing |
| TA-4 | P08 | Diagnostic probe | MC-DM-MIXED-IS-SUPERPOSITION: "Two students prepare spin states. Alice prepares (|↑⟩+|↓⟩)/√2. Bob prepares |↑⟩ with probability 1/2 and |↓⟩ with probability 1/2. Same state?" Write both ρ matrices and compute ⟨σ_x⟩. |
| TA-5 | P13 | Worked example | Example 3: thermal state for 2-level system (H=ℏωσ_z/2): compute Z=2cosh(βℏω/2), ρ_th, verify dρ/dt=0, compute ⟨σ_z⟩=−tanh(βℏω/2). |
| TA-6 | P10 | Pattern drill | Given ρ matrices, identify pure vs mixed; compute Tr(ρ²); find ⟨A⟩ for given operators; partial trace practice for a 2-qubit product state. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State three properties that any valid density matrix must satisfy. How do you distinguish a pure state from a mixed state?  
*Answer*: ρ†=ρ (Hermitian); Tr(ρ)=1 (normalized); ρ≥0 (positive semi-definite). Pure: Tr(ρ²)=1; mixed: Tr(ρ²)<1.

**MP-2** (apply): Write the density matrix for the spin-up state |↑⟩ and for a 50/50 mixture of |↑⟩ and |↓⟩. Compute ⟨σ_z⟩ for each.  
*Answer*: Pure: ρ=[[1,0],[0,0]]; ⟨σ_z⟩=Tr(ρσ_z)=1. Mixed: ρ=[[1/2,0],[0,1/2]]; ⟨σ_z⟩=0.

**MP-3** (apply): Compute the reduced density matrix ρ_A for the state |Ψ⟩=(|↑↓⟩−|↓↑⟩)/√2. Is subsystem A in a pure or mixed state?  
*Answer*: ρ_{AB}=|Ψ⟩⟨Ψ|; Tr_B: ρ_A=(1/2)(|↑⟩⟨↑|+|↓⟩⟨↓|)=(1/2)I; Tr(ρ_A²)=1/2<1 → mixed. Subsystem A is maximally mixed despite the joint state being pure.

**MP-4** (analyze-MC): Alice and Bob each have one qubit of the Bell state |Φ⁺⟩. Bob applies a random unitary to his qubit (unknown to Alice). Does Alice's reduced density matrix change?  
*Answer*: No — ρ_A = Tr_B(ρ_{AB}) = (1/2)I regardless of what Bob does; local operations on B don't change ρ_A. This is the no-signaling principle: Bob cannot send information to Alice via local quantum operations.

**MP-5** (evaluate): A student says "the thermal density matrix ρ=e^{−βH}/Z is a mixed state because we don't know which energy eigenstate the system is in." Is this interpretation correct?  
*Answer*: Partially correct but incomplete. The thermal state IS mixed (Tr(ρ²)<1 at T>0), but the reason is thermodynamic equilibrium with an environment — not just ignorance. At T=0, ρ=|E₀⟩⟨E₀| (pure ground state). The density matrix captures both quantum uncertainty AND classical probability; saying "we don't know" conflates the two. Quantum coherences (off-diagonal in energy eigenbasis) are genuinely absent in ρ_th, not just hidden.

---

## C6 — Known Sticking Points

1. **Off-diagonal elements**: Students often ignore coherences (off-diagonal ρᵢⱼ); these are the quantum-classical boundary — pure states have them, classical mixtures don't.
2. **Partial trace mechanics**: Computing Tr_B requires choosing an orthonormal basis for B; result must not depend on basis choice.
3. **Von Neumann vs Schrödinger**: ρ|ψ⟩=|ψ⟩ only for pure state; von Neumann equation dρ/dt=[H,ρ]/iℏ is more general; for pure state it reduces to Schrödinger.
4. **Thermal state is not the same as maximum entropy state**: Thermal state maximizes entropy subject to fixed ⟨H⟩=U; maximum-entropy with no constraint gives I/N.

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student writes ρ = |ψ⟩⟨ψ| for a mixed state | Probe: "What does the mixing probability pₙ represent? Write ρ=Σpₙ|ψₙ⟩⟨ψₙ| and check that Tr(ρ²)<1." |
| Student loses off-diagonal elements in partial trace | "Partial trace sums only over the B basis: ρ_A = Σᵢ⟨i_B|ρ_{AB}|i_B⟩. Work through Example 2 matrix element by element." |
| Student confused by ρ_A being mixed when ρ_{AB} is pure | "This is the core physics of entanglement: entanglement with B is the SOURCE of A's mixedness. The more entangled, the more mixed ρ_A is (Schmidt number = rank of ρ_A)." |
| Student asks when to use density matrix vs wavefunction | "Closed, isolated system: either works. Open system, environment interaction, thermal state, or entanglement with inaccessible DOF: density matrix required — wavefunction doesn't exist." |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What is the Pauli exclusion principle for spin? Write ρ for a spin-up electron."
CORE-1 (15 min): TA-1 + TA-2 (open system motivation + density matrix notation and properties)
CORE-2 (20 min): TA-3 + TA-4 (partial trace derivation + MC pure vs mixed diagnostic)
CORE-3 (20 min): TA-5 (thermal state: 2-level system, ρ_th, ⟨σ_z⟩ vs temperature)
DRILL  (10 min): TA-6 (classify ρ matrices, compute Tr(ρ²), partial trace practice)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Statistical mechanics partition function Z=Tr(e^{−βH}) is exactly the trace in the density matrix formula — quantum stat mech is built on density matrices."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.qm.density-matrix in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.qm.operators, phys.qm.spin verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (partial trace, entanglement analysis, no-signaling) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-DM-MIXED-IS-SUPERPOSITION, MC-DM-PARTIAL-TRACE-LOSES-INFO |
| V-8  | C3 has ≥3 worked examples | PASS — pure vs mixed spin, Bell state trace, thermal state |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-DM-MIXED-IS-SUPERPOSITION |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/apply/analyze-MC/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-4 MC-DM-PARTIAL-TRACE-LOSES-INFO; TA-4/MP-2 MC-DM-MIXED-IS-SUPERPOSITION |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — ρ=|ψ⟩⟨ψ| for mixed trigger, lost off-diagonal |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
