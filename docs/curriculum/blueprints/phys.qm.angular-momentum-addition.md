# Teaching Blueprint — phys.qm.angular-momentum-addition

## C0 — Concept Metadata
```
concept_id        : phys.qm.angular-momentum-addition
display_name      : Angular Momentum Addition (Clebsch-Gordan)
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 10
prerequisites     : [phys.qm.spin, phys.qm.hydrogen-atom-qm]
cross_links       : [phys.qm.identical-particles, phys.qm.scattering-theory-born-approximation]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
When two quantum systems with angular momenta j₁ and j₂ are combined, the total angular momentum j ranges from |j₁−j₂| to j₁+j₂ in integer steps, with Clebsch-Gordan coefficients giving the expansion of combined states in the coupled basis.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-AMA-VECTOR-ADD | "Total angular momentum J = L + S just adds the z-components: M = m_L + m_S." | "I add m_L=1 and m_S=1/2 to get M=3/2." | m_z values DO add: Mⱼ = m_l + m_s. But the TOTAL quantum number j does NOT add classically; j ranges from |j₁−j₂| to j₁+j₂. States with the same M but different j must be found by diagonalizing J² in the uncoupled basis. |
| MC-AMA-ONE-TOTAL-J | "Adding j₁=1 and j₂=1/2 gives j=3/2 only." | "Total spin is just 1+1/2=3/2." | Adding j₁=1 and j₂=1/2 gives TWO possible total angular momenta: j=3/2 (four states) AND j=1/2 (two states). Total count = (2j₁+1)(2j₂+1) = 3×2 = 6 states in both bases — must match. |

---

## C3 — Worked Examples

### Example 1 — Adding j₁=1/2, j₂=1/2 (two spin-1/2 particles)
Possible totals: j = |1/2−1/2|…1/2+1/2 = 0, 1.
j=1 (triplet, 3 states): |1,1⟩=|↑↑⟩; |1,0⟩=(|↑↓⟩+|↓↑⟩)/√2; |1,−1⟩=|↓↓⟩.
j=0 (singlet, 1 state): |0,0⟩=(|↑↓⟩−|↓↑⟩)/√2.
Total: 4 states = (2·1/2+1)² ✓. Triplet symmetric; singlet antisymmetric under exchange.

### Example 2 — Adding j₁=1, j₂=1/2 (spin-orbit coupling for p-electron)
Possible totals: j = |1−1/2|…1+1/2 = 1/2, 3/2.
j=3/2: 4 states (m_j = −3/2, −1/2, +1/2, +3/2).
j=1/2: 2 states (m_j = −1/2, +1/2).
Total: 6 states = 3×2 ✓.
Key CG coefficients (m_j=+1/2 sector): |3/2,+1/2⟩ = √(2/3)|m_l=0,↑⟩ + √(1/3)|m_l=1,↓⟩; |1/2,+1/2⟩ = −√(1/3)|m_l=0,↑⟩ + √(2/3)|m_l=1,↓⟩.
Application: fine structure splitting of hydrogen p-levels into 2p₁/₂ and 2p₃/₂.

### Example 3 — Clebsch-Gordan coefficient calculation for |j₁,j₂;j,m⟩
|j=j₁+j₂, m=j⟩ = |j₁,m₁=j₁⟩|j₂,m₂=j₂⟩ (stretched state, CG=1).
Apply J₋ = J₋⁽¹⁾ + J₋⁽²⁾ to generate lower-m states; use orthogonality to find j=j₁+j₂−1 states.
Example: from |1,1⟩|1/2,1/2⟩ = |3/2,3/2⟩, apply J₋: √3|3/2,1/2⟩ = √2|1,0⟩|1/2,1/2⟩ + |1,1⟩|1/2,−1/2⟩. Extract |3/2,1/2⟩ = (√2/√3)|m_l=0,↑⟩ + (1/√3)|m_l=1,↓⟩ = CG from Example 2 ✓

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P04 | Physical motivation | "An electron in a p-orbital has orbital angular momentum l=1 and spin s=1/2. Does it couple to give one angular momentum state or two? Spectroscopy sees TWO p-sub-levels (2p₁/₂ and 2p₃/₂) split by spin-orbit coupling — angular momentum addition explains why." |
| TA-2 | P06 | Build notation | Total angular momentum range: j_max = j₁+j₂, j_min = |j₁−j₂|; number of j values: 2j_min+1 per j; coupled basis |j,m_j⟩ vs uncoupled |m₁,m₂⟩; Mⱼ = m₁+m₂ always |
| TA-3 | P07 | Formula derivation | Clebsch-Gordan expansion: |j,m⟩ = Σ_{m₁,m₂} ⟨j₁,m₁;j₂,m₂|j,m⟩ |j₁,m₁⟩|j₂,m₂⟩; properties of CG coefficients: real, orthogonal, selection rule m₁+m₂=m; derive j=1/2+1/2 table from stretched state + lowering operator |
| TA-4 | P08 | Diagnostic probe | MC-AMA-ONE-TOTAL-J: "What are all possible j values for j₁=3/2, j₂=1? Count total states." Students list j=5/2,3/2,1/2 and verify (2·3/2+1)(2·1+1)=4×3=12=6+4+2 ✓ |
| TA-5 | P13 | Worked example | Example 2: spin-orbit j₁=1, j₂=1/2 → j=3/2, 1/2; derive CG coefficients for m_j=1/2 sector; identify hydrogen 2p fine structure. |
| TA-6 | P10 | Pattern drill | Lowering-operator method: given |j_max, m_max⟩, apply J₋ twice to get |j_max, m_max−2⟩; orthogonality gives first j=j_max−1 state. Students execute for j₁=j₂=1. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): What are the allowed total angular momentum values j when combining j₁=2 and j₂=3/2? How many states in each?  
*Answer*: j = 7/2, 5/2, 3/2, 1/2; states: 8, 6, 4, 2; total = 20 = 5×4 ✓

**MP-2** (apply): Write the state |j=1,m_j=0⟩ for two spin-1/2 particles (j₁=j₂=1/2).  
*Answer*: From Example 1 or lowering J: |1,0⟩ = (|↑↓⟩+|↓↑⟩)/√2 (symmetric triplet state).

**MP-3** (apply): For j₁=1, j₂=1/2, what is the CG coefficient ⟨j₁=1,m₁=1; j₂=1/2,m₂=−1/2 | j=1/2, m_j=1/2⟩?  
*Answer*: From Example 2: |1/2,+1/2⟩ = −√(1/3)|m_l=0,↑⟩ + √(2/3)|m_l=1,↓⟩. The CG coefficient ⟨1,1;1/2,−1/2|1/2,1/2⟩ = √(2/3).

**MP-4** (analyze): Why does the hydrogen 2p level split into 2p₁/₂ and 2p₃/₂ with a 2:1 degeneracy ratio?  
*Answer*: j=3/2 has 2j+1=4 states (m_j=−3/2,−1/2,+1/2,+3/2); j=1/2 has 2 states — ratio 2:1. Spin-orbit coupling Ĥ_SO ∝ L·S = (J²−L²−S²)/2 has different expectation value for each j, causing the energy split.

**MP-5** (evaluate): A student says "I can just use the uncoupled basis |m_l,m_s⟩ for all hydrogen calculations — why bother with j,m_j?" Assess this.  
*Answer*: For energy eigenstates, |j,m_j⟩ diagonalizes the spin-orbit Hamiltonian (L·S diagonal in coupled basis). In the uncoupled basis, |m_l,m_s⟩ are mixed by spin-orbit coupling — not energy eigenstates. The student is correct that both bases span the same space, but the coupled basis makes the physics transparent and computations tractable.

---

## C6 — Known Sticking Points

1. **m_z adds but j doesn't**: The single most common error; always verify with a state-count check.
2. **CG coefficients signs**: Signs are convention-dependent (Condon-Shortley convention); students should use tables or the lowering-operator method rather than memorizing signs.
3. **Orthogonality of coupled basis**: Students unsure how to find lower-j states; emphasize they must be orthogonal to the higher-j state with the same m.
4. **Physical meaning**: CG coefficients are amplitudes (probability = |CG|²) for measuring a specific (m₁,m₂) when the combined state has (j,m_j).

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student lists wrong total j values | Make them list all possible values step by step: start from j₁+j₂, subtract 1 until reaching |j₁−j₂|; state count always = (2j₁+1)(2j₂+1) |
| Student gets CG coefficient wrong sign | "Sign conventions are standard but not obvious — use the Condon-Shortley tables; what matters for physics is |CG|², not sign alone" |
| Student asks "what is L·S in terms of m_l, m_s?" | L·S = (J²−L²−S²)/2; in coupled basis eigenvalue = [j(j+1)−l(l+1)−s(s+1)]ℏ²/2; in uncoupled basis it mixes states with same m_l+m_s — that's why we want the coupled basis |
| Student confused why j goes in integer steps | General rule from J₊,J₋ ladder operators: |j₁−j₂| ≤ j ≤ j₁+j₂ in steps of 1; analogy with triangle inequality for classical vectors |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "Hydrogen 2p: how many degenerate states? What quantum numbers label them?"
CORE-1 (15 min): TA-1 + TA-2 (fine structure motivation + coupled/uncoupled bases)
CORE-2 (20 min): TA-3 + TA-4 (CG expansion + MC diagnostic j-values)
CORE-3 (20 min): TA-5 (spin-orbit j=1, 1/2 example: derive CG for m_j=1/2 sector)
DRILL  (10 min): TA-6 (lowering-operator method for j₁=j₂=1)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Scattering theory uses angular momentum decomposition (partial waves) — l is the orbital angular momentum of the scattered particle, and the same CG technology applies."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.qm.angular-momentum-addition in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.qm.spin, phys.qm.hydrogen-atom-qm verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (CG derivation, fine structure explanation) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-AMA-VECTOR-ADD, MC-AMA-ONE-TOTAL-J |
| V-8  | C3 has ≥3 worked examples | PASS — 1/2+1/2, 1+1/2, CG derivation |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P04 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-AMA-ONE-TOTAL-J |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/apply/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-1 MC-AMA-ONE-TOTAL-J, MP-4 MC-AMA-VECTOR-ADD |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — wrong j values, CG sign confusion |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
