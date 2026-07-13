# phys.em.faradays-law — Faraday's Law of Electromagnetic Induction

## 1. Identity
- **Canonical KG ID**: `phys.em.faradays-law`
- **Canonical name**: Faraday's Law of Electromagnetic Induction
- **Curriculum domain**: Electromagnetism
- **Difficulty tier**: proficient
- **Bloom level**: apply
- **Prerequisites**: `phys.em.magnetic-flux`
- **Unlocks**: `phys.em.ac-basics`, `phys.em.lenzs-law`, `phys.em.maxwells-equations`, `phys.em.self-inductance`
- **Estimated study hours**: 5
- **KG description**: Faraday's law states that the induced EMF equals the negative rate of change of magnetic flux through a circuit: ε = −dΦ/dt.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (moving magnet / changing field)**
Push a bar magnet into a coil and a current flows. Pull it out and the current reverses. Hold the magnet still and no current flows. The key: it is the CHANGE in flux that produces the EMF, not the flux itself. Flux changing → EMF → (if there is a closed circuit) current.

**Stage 2 — Mathematical statement**
Faraday's law: ε = −dΦ_B/dt

For a coil of N turns: ε = −N dΦ_B/dt = −d(NΦ_B)/dt (the product NΦ_B is called the flux linkage, Λ)

Where Φ_B = B·A cosθ (from `phys.em.magnetic-flux`).

Three ways flux can change → three types of induction:
1. **Changing B**: transformer, electromagnet switching on/off
2. **Changing A**: accordion-like moving conductor in a fixed field
3. **Changing θ (orientation)**: rotating coil in a field → AC generator

The negative sign is Lenz's law (the induced EMF opposes the change that causes it — see `phys.em.lenzs-law` for the full treatment).

**Stage 3 — Motional EMF (a special case)**
A conductor of length L moving with velocity v perpendicular to a uniform field B:
ε = BLv

Derivation: the conductor sweeps out area A = Lv per unit time; flux change dΦ/dt = B × Lv = BLv. The negative sign gives the direction of induced current (Lenz's law).

For a rod of length L sliding along rails (closed circuit): this drives current I = BLv/R around the circuit (where R = total resistance).

**Stage 4 — AC generator**
Coil of N turns, area A, rotating at angular velocity ω in uniform field B:
Φ_B = NBA cosωt
ε = −d(NΦ_B)/dt = NBAω sinωt = ε₀ sinωt, where ε₀ = NBAω (peak EMF)

This is the origin of sinusoidal AC current. Higher N, B, A, or ω → higher peak EMF. Every power-station generator uses this principle.

**Mental-model versioning**: Stage 1 for conceptual grounding; Stage 2 for all EMF calculation problems; Stage 3 for sliding-rod / motional EMF problems; Stage 4 for AC generator problems.

---

## 3. Why Beginners Fail

1. **Forgetting the negative sign**: ε = −dΦ/dt. Students write ε = dΦ/dt and then separately apply Lenz's law as a direction rule, not realising the negative sign encodes Lenz's law. Both are correct approaches if consistently applied, but the sign must not be ignored.
2. **Flux vs. field**: Students compute the magnitude of B where the current flows rather than the flux through the circuit area. Induction depends on Φ_B through the bounded area, not on B at the wire location.
3. **Static flux → EMF (incorrect)**: A large, constant flux produces no EMF. Students see a coil in a strong field and expect a large current. Only dΦ/dt ≠ 0 gives EMF. This is the most common conceptual error.
4. **Rate of change vs. amount of change**: ε depends on how fast Φ changes (dΦ/dt), not how much it changes total. A slow large change can give smaller EMF than a fast small change.

---

## 4. Misconception Library

**M1 — "Large flux → large EMF"**
- Probe: "A coil sits in a very strong magnetic field of 10 T. Is a large EMF induced?"
- Characteristic phrase: "The stronger the field, the bigger the current."
- Recovery: EMF = −dΦ/dt. If B = 10 T but is constant and the coil is stationary, dΦ/dt = 0 → EMF = 0 → no current. Demonstrate: hold a strong magnet stationary near a galvanometer coil — zero deflection. Move the magnet — deflection. The galvanometer reads rate of change, not amount.

**M2 — "The negative sign in Faraday's law can be ignored"**
- Probe: "Does the sign in ε = −dΦ/dt matter for calculating magnitude only?"
- Characteristic phrase: "The minus sign just tells me direction — I can handle that separately."
- Recovery: For magnitude-only problems, yes. But the sign determines the direction of induced current, which drives all physics involving whether the induced current aids or opposes the circuit behaviour (Lenz's law, back-EMF in motors, braking). Dropping the sign and then forgetting to apply Lenz's law separately leads to wrong directions — induced currents appear to amplify rather than oppose.

**M3 — "Motional EMF requires a complete circuit for EMF to exist"**
- Probe: "A conductor moves through a field but has no circuit attached. Is EMF induced?"
- Characteristic phrase: "Without a circuit, there's no EMF — no current means no induction."
- Recovery: EMF is a potential difference (work per unit charge), not a current. A moving conductor develops an EMF across its ends whether or not a circuit is present (charge separation occurs due to the magnetic force on charges F = qv×B). The circuit is only needed for current to flow. The EMF ε = BLv exists even for an isolated conductor — it just drives no current. (Same as a battery with no external circuit — still has EMF, zero current.)

**M4 — "Faraday's law only applies when the conductor moves"**
- Probe: "If the conductor is stationary but the magnetic field changes, is EMF induced?"
- Characteristic phrase: "You have to move the wire to get induction."
- Recovery: Faraday's law depends on dΦ/dt. Φ can change due to: (a) conductor motion (changing area), (b) changing B magnitude, or (c) changing orientation. Case (b) — stationary conductor, changing B — produces EMF even with no motion. This is the transformer principle: primary coil with changing current → changing B → secondary EMF, with no moving parts at all. Show with a transformer demo or Faraday's original 1831 experiment (switching an electromagnet on/off).

---

## 5. Explanation Library

**E1 — Faraday's experiment reconstructed**
1831: Faraday wound two coils on an iron ring. Connecting a battery to coil 1 produced a momentary deflection in a galvanometer on coil 2 — only when the switch was opened or closed (changing B). Steady current in coil 1 → no deflection in coil 2. Increasing or decreasing → deflection. This is transformer action; the changing B in coil 1 changes flux in coil 2 → EMF in coil 2.

**E2 — Three sources of dΦ/dt**
Φ = BA cosθ → dΦ/dt = (dB/dt)A cosθ + B(dA/dt)cosθ − BA sinθ(dθ/dt)
(1) Transformer: dB/dt ≠ 0, dA/dt = 0, dθ/dt = 0 → ε = −(dB/dt) × A cosθ
(2) Motional EMF: dB/dt = 0, dA/dt = Lv, dθ/dt = 0 → ε = −BLv cosθ (= BLv for B ⊥ plane)
(3) AC generator: dB/dt = 0, dA/dt = 0, dθ/dt = ω → ε = NBAω sinωt

**E3 — Motional EMF from force on charges**
Alternative derivation of ε = BLv: A rod of length L moves at velocity v ⊥ to B. Free charges in the rod experience F = qv×B along the rod. Work done per unit charge moving from one end to the other: W/q = F/q × L = vBL = ε. The magnetic force acts as an "EMF source" — it separates charges, creating a potential difference BLv. No circular reasoning: this force is the mechanical work being converted to electrical energy.

**E4 — Energy conservation in sliding rod**
Rod slides on rails in field B, resistance R. Current I = BLv/R. Power dissipated: P = I²R = B²L²v²/R. Force needed to keep rod at constant v (opposing the braking force F_braking = BIL = B²L²v/R): P_mechanical = Fv = B²L²v²/R = P_electrical. Mechanical power in = electrical power dissipated. Energy is conserved — Faraday's law plus Lenz's law guarantees this.

---

## 6. Analogy Library

**Primary analogy — Water flow through a paddlewheel**
Flux is the amount of water through a pipe cross-section per second. Changing flux is the flow rate increasing or decreasing. The paddlewheel (EMF) is driven by the change in flow rate — a steady flow spins the wheel at constant speed but doesn't accelerate it; accelerating flow (increasing dΦ/dt) produces a driving torque. Steady state = no EMF; change of state = EMF.

**Breaking point**: The water analogy doesn't capture the vector (directional) nature of magnetic flux or the signed opposition of Lenz's law. Use it only to convey the key insight that "change produces EMF, not static flux."

**Anti-analogy — Electric field analogy for EMF direction**: Students familiar with E-fields expect the induced current to flow in the direction of the induced E-field. In Faraday's law, the induced E-field drives the current, but the induced E-field is itself driven by −dΦ/dt and is tangential (circulation). The direction follows from Lenz's law or the right-hand rule, not from a simple E-field direction argument. Resist the impulse to import the Coulomb E-field logic here.

---

## 7. Demonstration Library

**D1 — Magnet through coil + galvanometer**
Drop a bar magnet through a coil connected to a galvanometer. Observe: (a) deflection as north pole enters (one direction), (b) zero deflection when magnet is inside stationary, (c) deflection in opposite direction as south pole exits, (d) larger deflection if magnet dropped faster (larger dΦ/dt). Quantify: catch the magnet to stop it mid-coil; observe zero deflection despite nonzero flux. Conclusive demonstration of "rate of change, not amount."

**D2 — Transformercore demonstration**
Two coils wound on a shared iron core (improvised with an iron rod). Connect coil 1 to a battery and switch; connect coil 2 to a galvanometer. Switch on: momentary deflection. Switch off: deflection in opposite direction. Steady current: zero deflection. This is the transformer principle — the core amplifies flux linkage but the principle is pure Faraday.

**D3 — AC generator model (hand-cranked)**
Spin a rectangular coil between two magnets (or use a commercial hand generator). Observe the sinusoidal EMF on an oscilloscope. Crank faster → higher frequency AND larger peak EMF (both N and ω increase). Change the number of turns → change peak EMF. Verify the AC generator formula ε₀ = NBAω.

---

## 8. Discovery Lesson

*Guided inquiry is effective here* (Faraday's original discovery path is reproducible):

1. Students measure galvanometer deflection while (a) holding a magnet still near a coil, (b) pushing the magnet slowly into the coil, (c) pushing it quickly, (d) pulling it out.
2. Ask: "What variable determines deflection? Strength of magnet? Speed? Distance?"
3. Students observe: speed matters most; strong magnet pushed slowly can give less deflection than weak magnet pushed fast.
4. Ask: "What quantity combines B strength AND rate of change?" → dΦ/dt.
5. Define: EMF ∝ dΦ/dt. Add the negative sign and name it Faraday's law.
6. Ask about the direction: "When does current flow one way vs. the other?" → Leads naturally to Lenz's law.

The discovery sequence matches Faraday's 1831 approach and is highly motivating.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student says large B → large EMF | Immediately demonstrate D1 with static magnet (zero reading). The demo is more convincing than any verbal argument. |
| Student drops the negative sign | Ask: "Which way does the current flow?" If they can't determine direction without the sign, they need Lenz's law. Teach both: the negative sign IS Lenz's law in formula form. |
| Student confuses flux with field | Ask: "Where in the formula is the area of the circuit? You need Φ = BA cosθ, not just B." |
| Student misapplies motional EMF to static conductor | Ask: "Is the conductor moving relative to the field? Is A changing?" If dA/dt = 0, use the changing-B formula instead. |
| Student ready for AC generator | Derive ε = NBAω sinωt from Φ = NBA cosωt by differentiation. Show that peak EMF ε₀ = NBAω — all four factors increase peak EMF. |

---

## 10. Voice Teaching

"Faraday's law in one sentence: EMF equals minus the rate of change of flux. Epsilon equals minus dΦ-over-dt. The minus sign is Lenz's law built in — it says the induced EMF opposes whatever caused it.

Three ways to change flux: change the field strength, change the area of the circuit, or change the angle between them. Any one of these gives you an EMF. The transformer has no moving parts — it's just a changing B in the primary coil driving flux change in the secondary.

The motional EMF case: a rod moving at speed v in field B across a length L. Flux is changing because the area is changing. dΦ/dt = BLv. So EMF = BLv. That's also the energy-conversion mechanism in every generator: mechanical energy → electrical energy via changing flux.

The AC generator: coil rotating at omega gives Phi equals NBA cosine omega t, so epsilon equals NBAomega sine omega t. Peak EMF is NBAomega. Higher rotation speed, more turns, bigger area, stronger field — all of them push the peak up.

The single most important thing to remember: a large constant flux gives zero EMF. A small rapidly changing flux can give a large EMF. It's always the derivative that counts."

---

## 11. Assessment

**Mastery gate**: Student correctly applies ε = −dΦ/dt with the correct sign and direction (via Lenz's law), computes motional EMF (ε = BLv) for a sliding rod, identifies three distinct physical situations that change flux, and derives the AC generator peak EMF formula. Four independent problems including at least one direction-determination problem.

**Formative golden probe**: "A square coil of side 10 cm and 200 turns is pulled at v = 2 m/s out of a region of uniform B = 0.5 T (field perpendicular to coil). (a) What is the induced EMF while the coil is exiting? (b) If the total resistance is 4 Ω, what current flows? (c) Which direction does it flow (use Lenz's law)?"

Answers:
- (a) The leading edge (leaving the field) sweeps area at rate dA/dt = L × v = 0.10 × 2 = 0.20 m²/s. dΦ/dt = B × dA/dt = 0.5 × 0.20 = 0.10 Wb/s. ε = N × dΦ/dt = 200 × 0.10 = 20 V.
- (b) I = ε/R = 20/4 = 5 A.
- (c) Lenz's law: flux through coil is decreasing (coil leaving field). Induced current must create field to oppose the decrease → induced B is in the same direction as the external B inside the coil. Right-hand rule: looking at the coil from the field side, induced current flows counterclockwise.

**Confidence calibration**: After answering (c), ask: "Would this induced current accelerate or resist the pulling motion?" A learner who understands Lenz's law will say "resist" — the induced current creates a braking force (required by energy conservation). If they say "accelerate," the self-reinforcement misconception needs correction.

**Delayed retrieval (1–2 weeks)**: "State Faraday's law. A generator coil has 500 turns, area 400 cm², rotates at 50 Hz in a field of 0.2 T. What is the peak EMF?"

---

## 12. Recovery Notes

**If student cannot find the direction of induced current**:
Use the two-step method: (1) Determine whether Φ is increasing or decreasing. (2) Apply Lenz's law: induced current opposes the change (if Φ increasing → induced B opposes original B inside loop; if Φ decreasing → induced B in same direction as original B). Then use the right-hand rule on the induced B to find the current direction. Do not skip step 1 — the sign of dΦ/dt is the starting point for direction.

**If flux vs. field confusion persists**:
Write Φ = BA cosθ explicitly every problem. Ask: "What is the area of the circuit loop? Where is the circuit boundary?" The EMF depends on flux through the bounded area of the circuit, not on the field at the wire's location.

**If student uses ε = dΦ/dt (no negative)**:
Accept for magnitude problems, but require explicit Lenz's law statement for direction in every solution. Over time, train the student to write the negative sign and treat it as the direction indicator — this is cleaner and eliminates the need for separate direction analysis.

---

## 13. Memory & Review

**Memory type**: Declarative (ε = −dΦ/dt; three sources of dΦ/dt; ε = BLv motional EMF; ε₀ = NBAω generator) + procedural (flux computation, direction determination via Lenz's law)
**Forgetting risk**: High — the sign and direction are consistently dropped; the transformer case (no motion, changing B) is often forgotten; the generator formula components are confused.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "State Faraday's law. List three physical ways to change magnetic flux through a circuit. Derive the motional EMF of a rod moving at velocity v in field B."

---

## 14. Transfer Map

**Near transfer**: Lenz's law (direct unlock — the opposition principle embedded in the sign, elaborated as a full predictive tool). Self-inductance (ε = −L dI/dt — same law applied to a coil's own changing flux). AC basics (the generator derivation is the direct source of AC current).
**Medium transfer**: Transformers (step-up/step-down voltage via turns ratio N₁/N₂ = V₁/V₂, derived from Faraday's law for two coils sharing flux).
**Far transfer**: Maxwell's equations (Faraday's law in differential form: ∇×E⃗ = −∂B⃗/∂t — one of the four Maxwell equations, the route to electromagnetic waves). Electromagnetic braking (train braking systems, eddy-current dampers).
**Cross-domain**: Neural induction (transcranial magnetic stimulation TMS uses Faraday's law — changing B-field from a coil on the scalp induces currents in brain tissue). Cardiac defibrillators and inductive charging all rely on ε = −dΦ/dt.

---

## 15. Curriculum Feedback

- KG prerequisite `phys.em.magnetic-flux` is necessary and sufficient — students need Φ_B = BA cosθ and the three ways to change Φ before Faraday's law can be applied. Area vector convention (prerequisite) is essential.
- Four unlocks (`phys.em.ac-basics`, `phys.em.lenzs-law`, `phys.em.maxwells-equations`, `phys.em.self-inductance`) are all well-motivated: Faraday's law is the foundational source for each of these topics.
- Difficulty `proficient`/`apply` is appropriate — the formula is compact but correct application requires identifying the source of dΦ/dt and determining direction, both of which require genuine understanding.
- Suggested adjacent concept for future KG: `phys.em.eddy-currents` (induced loop currents in conductors — a direct consequence of Faraday's law with important industrial applications).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
