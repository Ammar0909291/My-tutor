# Teaching Blueprint — phys.mech.canonical-transformations

## C0 — Concept Metadata
```
concept_id        : phys.mech.canonical-transformations
display_name      : Canonical Transformations
kg_difficulty     : 6 (expert)
bloom_target      : analyze
mastery_threshold : 0.85
estimated_hours   : 8
prerequisites     : [phys.mech.poisson-brackets]
cross_links       : [phys.mech.hamilton-jacobi-equation, phys.mech.hamiltons-equations]
session_cap       : 7   # estimated_hours ≥ 1h → PA-3
cpa_entry_stage   : C   # difficulty 6 → C with accelerated P track
status            : READY
```

---

## C1 — Core Idea (one sentence)
A canonical transformation is a change of phase-space coordinates (q,p) → (Q,P) that preserves the form of Hamilton's equations — equivalently, one that preserves Poisson brackets.

---

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-CT-ANY-COORD-CHANGE | "Any coordinate change is canonical." | "I can transform to any variables I want." | Only transformations satisfying {Qᵢ,Pⱼ}=δᵢⱼ, {Qᵢ,Qⱼ}=0, {Pᵢ,Pⱼ}=0 are canonical; point transformations Q=Q(q,t) are canonical, but arbitrary (q,p)→(Q,P) mixing generally is not. |
| MC-CT-GENERATING-IS-POTENTIAL | "The generating function is like a potential energy." | "F just generates the new coordinates." | F is a bridge function relating old and new variables via partial derivatives; four types F₁–F₄ suit different boundary conditions; F has units of action (J·s), not energy. |

---

## C3 — Worked Examples

### Example 1 — Identity transformation via F₂
Generating function F₂(q,p,P) = qP (type-2: old q, new P).
Relations: Q = ∂F₂/∂P = q; p = ∂F₂/∂q = P.
Conclusion: Q=q, P=p — the identity is trivially canonical.
Confirms: {Q,P}={q,p}=1 ✓

### Example 2 — Exchange transformation (q↔p swap)
F₁(q,Q) = qQ (type-1: old q, new Q).
Relations: p = ∂F₁/∂q = Q; P = −∂F₁/∂Q = −q.
New Hamiltonian K(Q,P) = H(q,p) = H(Q,−P).
Significance: position and momentum play symmetric roles — the harmonic oscillator H=p²/2m+mω²q²/2 becomes K=Q²/2m+mω²P²/2 (same form, swapped names).

### Example 3 — Action-angle variables for harmonic oscillator
Old: (x, p) with H = p²/2m + mω²x²/2.
Define I = E/ω (action), θ = ωt + θ₀ (angle).
Transform: x = √(2I/mω) sin θ, p = √(2mωI) cos θ.
New Hamiltonian K = ωI — cyclic in θ → İ = 0 (action conserved), θ̇ = ω (uniform rotation).
Application: K=ωI makes equations of motion trivial; generalizes to integrable systems.

---

## C4 — Teaching-Action Sequence

| Slot | TA | Action-type | Detail |
|------|----|-------------|--------|
| TA-1 | P01 | Concrete hook | "Rotations in space change coordinates but preserve distances. Canonical transformations change phase-space coordinates but preserve Poisson brackets — the 'distance' of Hamiltonian mechanics." |
| TA-2 | P06 | Build notation | Define (q,p)→(Q,P); state four generating function types F₁(q,Q), F₂(q,P), F₃(p,Q), F₄(p,P); write the partial-derivative relations for F₂: p=∂F₂/∂q, Q=∂F₂/∂P |
| TA-3 | P07 | Formula derivation | Derive Poisson-bracket preservation criterion: {Qᵢ,Pⱼ}_{q,p}=δᵢⱼ necessary and sufficient for canonicity; connect to symplectic condition MᵀJM=J where J is the symplectic matrix |
| TA-4 | P08 | Diagnostic probe | MC-CT-ANY-COORD-CHANGE: "Is Q=q², P=p/2q canonical?" Students check {Q,P}={q²,p/2q}=q·(1/2q)·1+(−1/2q²)(2q)=1/2−1=−1/2 ≠ 1. Conclusion: not canonical. |
| TA-5 | P13 | Worked example | Example 3 (action-angle variables): derive I,θ; show K=ωI; equations of motion trivial. |
| TA-6 | P10 | Pattern drill | Four generating functions: students write derivative relations for each type from memory, check with neighbor. |
| TA-7 | P51 | Independent practice | Probe set MP below. |

---

## C5 — Mastery-Probe Set (MP)

**MP-1** (retrieval): State the condition on Poisson brackets for (Q,P) to be a canonical transformation of (q,p).  
*Answer*: {Qᵢ,Pⱼ}_{q,p}=δᵢⱼ, {Qᵢ,Qⱼ}=0, {Pᵢ,Pⱼ}=0.

**MP-2** (apply): For F₁(q,Q)=qQ, find p and P in terms of q and Q. Is this canonical?  
*Answer*: p=∂F₁/∂q=Q, P=−∂F₁/∂Q=−q. Check: {Q,P}_{q,p}={Q,−q}=−{Q,q}=−(−1)=1 ✓ Canonical.

**MP-3** (analyze): For the harmonic oscillator H=p²/2m+mω²x²/2, using action-angle variables, write the new Hamiltonian K(I,θ) and state the equations of motion.  
*Answer*: K=ωI; θ̇=∂K/∂I=ω, İ=−∂K/∂θ=0.

**MP-4** (analyze-MC): A student says "Q=2q, P=p/2 is canonical because it's just a scaling." Verify or refute.  
*Answer*: {Q,P}={2q,p/2}=2·(1/2)·{q,p}=1·1=1 ✓ This scaling IS canonical (symplectic with unit determinant). Correct student's reasoning: must check {Q,P}, not just "it looks like scaling."

**MP-5** (evaluate): Show that Hamilton's equations are preserved under a canonical transformation: if dQᵢ/dt=∂K/∂Pᵢ and dPᵢ/dt=−∂K/∂Qᵢ hold, what is K in terms of H and the generating function F₂?  
*Answer*: K(Q,P,t)=H(q(Q,P),p(Q,P),t)+∂F₂/∂t. If F₂ has no explicit t-dependence, K=H expressed in new variables.

---

## C6 — Known Sticking Points

1. **Four generating functions**: Students conflate F₁–F₄; remedy — table with old/new variables and sign conventions posted visibly; F₂ is the most common in applications.
2. **Symplectic condition**: The matrix form MᵀJM=J is abstract; always translate back to Poisson-bracket condition for concreteness.
3. **Action-angle variables**: "How did you know to define I=E/ω?" — motivation is that adiabatic invariants are actions; preview the Hamilton-Jacobi connection.
4. **New Hamiltonian**: K=H+∂F/∂t confuses students — emphasize K=H only when ∂F/∂t=0 (most textbook examples).

---

## C7 — Adaptive-Teaching Rules

| Trigger | Response |
|---------|----------|
| Student computes {Q,P}≠1 for a claimed-canonical transform | Validate the computation; confirm non-canonicity; distinguish from non-symplectic coordinate changes |
| Student inverts F₂ derivatives correctly but gets wrong K | Check whether ∂F₂/∂t term was dropped; ask "does your generating function depend on time?" |
| Student asks "why do we need four types?" | Explain: each type suits different boundary conditions; F₁ for q,Q known; F₂ for q,P known (Legendre analog); connects to different physical parameterizations |
| Student confuses symplectic matrix J with angular momentum J | Use script J for symplectic, bold **J** for angular momentum; flag the collision immediately |

---

## C8 — Session-Flow Template
```
OPEN   (5 min) : Retrieval — "What does {f,H}=0 mean?" linking from Poisson brackets
CORE-1 (15 min): TA-1 + TA-2 (hook + notation + four generating functions)
CORE-2 (20 min): TA-3 + TA-4 (derivation + MC diagnostic probe)
CORE-3 (20 min): TA-5 (action-angle example, full derivation)
DRILL  (10 min): TA-6 (four-type derivative relations from memory)
PROBE  (15 min): TA-7 (MP-1..MP-5)
CLOSE  (5 min) : "Hamilton-Jacobi chooses F₂ to make K=0 everywhere — next session."
```

---

## C9 — V-Check Trace

| Check | Criterion | Status |
|-------|-----------|--------|
| V-1  | concept_id matches KG node exactly | PASS — phys.mech.canonical-transformations in graph.json |
| V-2  | prerequisites listed exist in KG | PASS — phys.mech.poisson-brackets verified |
| V-3  | bloom_target matches C3 verb use | PASS — "analyze" (symplectic condition, Poisson bracket criterion) |
| V-4  | mastery_threshold = 0.85 | PASS |
| V-5  | session_cap = 7 for expert ≥1h | PASS — 7 TAs |
| V-6  | cpa_entry_stage = C for difficulty 6 | PASS |
| V-7  | C2 has ≥2 misconceptions with diagnostic phrases | PASS — MC-CT-ANY-COORD-CHANGE, MC-CT-GENERATING-IS-POTENTIAL |
| V-8  | C3 has ≥3 worked examples | PASS — identity, exchange, action-angle |
| V-9  | C4 TA count = session_cap | PASS — 7 TAs |
| V-10 | C4 includes concrete hook (P01/P04/P06) | PASS — TA-1 P01 |
| V-11 | C4 includes formula TA (P07/P08) | PASS — TA-3 P07, TA-4 P08 |
| V-12 | C4 includes practice TA (P10/P13) | PASS — TA-5 P13, TA-6 P10 |
| V-13 | C4 includes MC diagnostic | PASS — TA-4 P08 MC-CT-ANY-COORD-CHANGE |
| V-14 | C4 includes independent practice (P51/P52/P54/P55) | PASS — TA-7 P51 |
| V-15 | C5 has ≥5 MP probes spanning bloom levels | PASS — retrieval/apply/analyze/evaluate |
| V-16 | C5 probes cover all C2 misconceptions | PASS — MP-4 covers MC-CT-ANY-COORD-CHANGE |
| V-17 | C6 sticking points cross-referenced to teaching moves | PASS — 4 sticking points with remedies |
| V-18 | C7 adaptive rules cover MC triggers | PASS — {Q,P}≠1 trigger, K=H+∂F/∂t trigger |
| V-19 | C8 timing sums to ≤90 min | PASS — 5+15+20+20+10+15+5 = 90 min |
| V-20 | status = READY | PASS |
