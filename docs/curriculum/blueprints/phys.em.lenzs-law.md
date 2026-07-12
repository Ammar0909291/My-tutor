# Teaching Blueprint — phys.em.lenzs-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.lenzs-law
name: Lenz's Law
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.faradays-law
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.self-inductance
  - phys.em.magnetic-flux
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Statement and Physical Meaning
**Lenz's law**: the induced current always flows in the direction that opposes the change in magnetic flux that caused it.

This is the physical meaning of the negative sign in Faraday's law: ε = −dΦ_B/dt.

Lenz's law is a consequence of energy conservation:
- If the induced current reinforced the flux change (positive feedback), the system would generate energy spontaneously — violating conservation of energy.
- The induced current opposes flux change (negative feedback) → external work is required to maintain the flux change → energy is supplied by the agent moving the magnet, not created from nothing.

Lenz's law is also a statement of **electromagnetic induction as resistance to change** — nature opposes sudden changes in magnetic flux.

### Block 1-B — Applying Lenz's Law (Step-by-Step)
1. Identify the original magnetic flux through the loop (direction and magnitude)
2. Determine whether Φ is **increasing** or **decreasing**
3. The induced current creates its own B field to **oppose** the change:
   - Φ increasing → induced B opposes original B (induced B in opposite direction)
   - Φ decreasing → induced B supports original B (induced B in same direction)
4. Use the right-hand rule to find which current direction creates the required induced B

### Block 1-C — Physical Consequences and Applications
**Braking force**: when a conductor moves through a magnetic field, the induced current experiences a force opposing the motion (Lenz's law → opposing velocity → braking).  
- Eddy current brakes: used in trains, roller coasters, laboratory balances (electromagnetic damping)
- Falling magnet through copper tube: slower than free fall — eddy currents in the tube oppose the flux change

**Back-EMF in motors**: a spinning motor armature cuts through magnetic field lines, inducing a back-EMF opposing the applied voltage. At steady speed: ε_back = ε_applied − IR. The back-EMF limits current and prevents burnout at steady state; at startup (v=0, ε_back=0) current is maximum → need soft-starters.

**Transformers**: changing primary current → changing Φ → induced EMF in secondary (by Faraday) → secondary current by Lenz's law opposes change. Energy transfer from primary to secondary without electrical contact.

### Block 1-D — Lenz vs. Right-Hand Rule Coordination
The two-step process:
1. **Lenz's law** tells you the direction of the induced B field (opposing the change)
2. **Right-hand rule** (or curl rule) converts the induced B direction into the induced current direction:
   - Point right thumb in direction of required induced B
   - Fingers show the direction of induced current flow in the loop

---

## Component 2 — Worked Examples

### WE-1 — Magnet Approaching a Loop
**Problem:** A bar magnet (north pole facing the loop) moves toward a horizontal circular loop. State: (a) direction of flux change, (b) direction of induced B in loop, (c) direction of induced current (viewed from above), (d) whether the loop attracts or repels the magnet.

**Solution:**
(a) B through loop from north pole is downward (into the page if loop is horizontal and magnet approaches from above). Magnet approaches → flux **increases** downward.

(b) Induced B must oppose the increase → induced B points **upward** (out of page) through the loop.

(c) Right-hand rule: to create B upward through the loop, curl fingers in **counterclockwise** direction (viewed from above where the N pole approaches). So induced current flows counterclockwise viewed from above.

(d) The loop's upper face has induced current flowing counterclockwise → upper face acts as a north pole (same as the magnet's north pole) → **magnet is repelled** by the loop. This opposes the approach — consistent with Lenz's law requiring opposition to the change.

---

### WE-2 — Conductor Falling Through a Magnetic Field
**Problem:** A horizontal copper rod (mass 0.10 kg, length 0.20 m, resistance 0.050 Ω) slides down frictionless vertical rails in a region B = 0.40 T (horizontal, perpendicular to rails). Find the terminal velocity.

**Solution:**
At terminal velocity, the net force = 0: gravitational force down = magnetic braking force up.

EMF = BLv → I = BLv/R → Force on rod = BIL = B(BLv/R)L = B²L²v/R

At terminal velocity: mg = B²L²v_t/R  
v_t = mgR/(B²L²) = (0.10 × 9.8 × 0.050) / ((0.40)² × (0.20)²)  
= 0.049 / (0.16 × 0.04) = 0.049 / 0.0064 = **7.66 m/s**

Check: at v_t, EMF = 0.40 × 0.20 × 7.66 = 0.613 V; I = 0.613/0.050 = 12.3 A; F_mag = 0.40 × 12.3 × 0.20 = 0.98 N = mg ✓

---

### WE-3 — Back-EMF in a Motor
**Problem:** A DC motor (armature resistance R = 5.0 Ω) is connected to V = 120 V. At startup, I₀ = 24 A. At full speed, I = 2.0 A. Find: (a) back-EMF at full speed, (b) power delivered to armature at full speed, (c) power dissipated in resistance at full speed.

**Solution:**
(a) At startup (v=0, ε_back = 0): I₀ = V/R = 120/5.0 = 24 A ✓  
At full speed: V = ε_back + IR → ε_back = V − IR = 120 − 2.0×5.0 = **110 V**

(b) P_total = VI = 120 × 2.0 = 240 W (total power from supply)

(c) P_R = I²R = (2.0)² × 5.0 = **20 W** (heat in armature resistance)

P_mechanical = P_total − P_R = 240 − 20 = **220 W** (mechanical output)
Or: P_mech = ε_back × I = 110 × 2.0 = 220 W ✓

Motor efficiency = P_mech/P_total = 220/240 = **91.7%**

---

## Component 3 — Misconception Engine

### MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT
- **trigger_signal:** Student says "Lenz's law means the induced current flows opposite to the current that created the original B field."
- **conflict_evidence [P28]:** "Lenz's law says the induced current opposes the CHANGE IN FLUX — not the original current, not the original B field. If the original B is into the page and is increasing, induced current opposes the increase (induced B is out of page). But if the original B is into the page and is decreasing, induced current supports the remaining flux (induced B is also into the page). Same original B direction, opposite induced B direction depending on whether flux is increasing or decreasing. The key word is CHANGE."
- **bridge_text [P30]:** "Think of it as electromagnetic inertia: just as inertia opposes changes in velocity (not velocity itself), Lenz's law opposes changes in flux (not flux itself). If flux is constant, no EMF at all — even if the flux is large. Only CHANGES in flux are opposed."
- **replacement_text [P31]:** "Lenz's law: induced current opposes the CHANGE in Φ, not Φ itself. If Φ increases → induced B opposes the increase (opposite direction). If Φ decreases → induced B opposes the decrease (same direction as original B). Always ask: is Φ increasing or decreasing?"
- **discrimination_pairs [P33]:**
  - Φ increasing (magnet approaches): induced current opposes increase → induced B antiparallel to original B
  - Φ decreasing (magnet retreats): induced current opposes decrease → induced B parallel to original B
  - Φ constant (magnet stationary): no EMF, no induced current
- **s6_path:** WE-1 then reverse it: magnet retreating → Φ decreasing → induced current reverses direction. Show direction changes with both approach and retreat.

---

### MC-LENZS-LAW-VIOLATES-ENERGY-CONSERVATION
- **trigger_signal:** Student says "the induced current does work on the magnet, but the magnet created the current — isn't this perpetual motion?"
- **conflict_evidence [P28]:** "The induced current opposes the magnet's motion (WE-1: repulsion). To move the magnet toward the loop, an external agent must do work against this repulsive force. That work input is exactly the energy appearing in the induced current (I²R dissipated in the resistance). Energy bookkeeping: W_agent = W_electrical = I²R×t. Energy is conserved perfectly; no energy is created. Lenz's law enforces energy conservation, not violates it."
- **bridge_text [P30]:** "Without Lenz's law (if induced current attracted the magnet), the approaching magnet would be accelerated by the attraction, moving faster, inducing more current, attracting more — a runaway positive feedback producing energy from nothing. Lenz's law provides the negative feedback that keeps energy conserved."
- **replacement_text [P31]:** "Lenz's law is a consequence of energy conservation, not a violation. The braking/repulsive force means external work must be done to maintain flux change. That work = electrical energy in the induced current. Energy in = energy out. Lenz's law prevents perpetual motion."
- **discrimination_pairs [P33]:**
  - Without Lenz (hypothetical attraction): positive feedback → perpetual motion → impossible
  - With Lenz (real physics): negative feedback → braking → external work required → energy conserved
- **s6_path:** Energy accounting for WE-2: at terminal velocity, gravitational PE lost per second = I²R dissipated per second. Show numerically.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** A bar magnet's south pole approaches a loop. The induced current (viewed from the magnet's side) flows:
**(a) Clockwise** (to create S pole facing magnet, repelling it) (b) Counterclockwise (c) No current (d) Depends on magnet speed

**A2 (Short answer):** State Lenz's law in one sentence. What energy principle does it embody?
[The induced current opposes the change in flux that caused it. It embodies conservation of energy.]

**A3 (True/False):** If a magnet is stationary inside a loop (constant flux), a large induced current flows.
[FALSE — no change in flux → no EMF → no current]

---

### Probe Set B — Conceptual Transfer
**B1:** A square loop is being pulled out of a uniform B field (B into page). (a) What happens to Φ? (b) What direction does the induced current flow to oppose this? (c) Does the loop attract or repel the field region?
[(a) Φ decreases (less area in field). (b) Induced B must be into page to oppose decrease → clockwise current (right-hand rule). (c) The current in the portion inside the field feels a force: F = IL×B → force toward the field region → loop is attracted back (opposing the pull). External work required to remove it — Lenz's law ✓]

**B2:** An aluminium ring falls over a bar magnet (axis vertical). Describe the motion qualitatively. At what position is the braking force greatest?
[As ring approaches the north pole: flux increases → induced current opposes → repulsive force slows ring. As ring passes through the magnet: flux changes direction → current reverses → still opposing motion. Ring falls slower than free fall throughout. Braking force greatest when dΦ/dt is largest, which is where field gradient (dB/dz) is largest — near the pole faces.]

**B3:** A motor draws 20 A at startup from a 240 V supply. At full speed it draws 4.0 A. Find: (a) armature resistance, (b) back-EMF at full speed, (c) mechanical output power.
[(a) R = V/I₀ = 240/20 = 12 Ω. (b) ε_back = V − IR = 240 − 4.0×12 = 192 V. (c) P_mech = ε_back × I = 192×4.0 = 768 W]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** A horizontal square loop (side L = 0.20 m, resistance R = 0.10 Ω) falls at v = 2.0 m/s through the boundary of a region where B = 0.50 T (into page, below boundary) and B = 0 (above). At the moment the top side is at the boundary: (a) Find EMF. (b) Find induced current and its direction. (c) Find the magnetic braking force. (d) Find net downward force (mass m = 0.05 kg).
[(a) EMF = BLv = 0.50×0.20×2.0 = 0.20 V. (b) I = EMF/R = 0.20/0.10 = 2.0 A; Lenz: flux increasing downward (into page) → induced current counterclockwise (viewed from above). (c) F_brake = BIL = 0.50×2.0×0.20 = 0.20 N (upward). (d) F_net = mg − F_brake = 0.05×9.8 − 0.20 = 0.49 − 0.20 = 0.29 N (downward).]

**C2 (Synthesis):** Eddy current brakes have no moving parts in contact and wear away nothing. Explain why they are not used in all braking applications, despite being maintenance-free.
[Braking force F ∝ v (F = B²L²v/R). At low speeds, force is very small — eddy brakes become ineffective near zero velocity. They cannot bring a vehicle to a full stop (only slow it). Also: braking force depends on conductor resistance; in high-temperature environments (brake heating) R increases → force decreases → less effective. Used for final speed reduction in trains/roller coasters, with friction brakes for the final stop.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: state Lenz's law, explain why it embodies energy conservation, and give the two-step procedure for finding induced current direction."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "A rectangular loop (L=15cm, w=10cm, R=0.20Ω) is pulled out of a B=0.60T region at v=3.0m/s. Find EMF, induced current direction (Lenz), braking force, and power dissipated."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Connect Lenz's law to: (a) back-EMF in motors, (b) eddy-current braking, (c) transformer operation. In each case, identify the flux change and the opposing response."
  - offset: "+10 days"
    type: application [P91]
    prompt: "A DC motor (R=8Ω) runs from 120V and draws 3A at full speed. Find back-EMF, mechanical power, heat loss, and efficiency. What happens to the current if the motor shaft is suddenly locked?"
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Lenz's law is electromagnetic inertia — nature's resistance to change. It explains why generators require effort, why brakes can work without friction, and why motors don't burn out. Today we'll apply it systematically."

[P41 — Diagnostic]
"A bar magnet's north pole approaches a conducting ring. Does the ring attract or repel the magnet? How do you know?"
→ Correct (repels — Lenz's law): "Excellent — let's formalise the reasoning."
→ Incorrect: "Let's work out what must happen from energy conservation."

[P06 — Concrete anchor]
"Drop a magnet through a copper tube — it falls noticeably slower than free fall (class demonstration or video). The eddy currents induced in the tube create a braking force. Every time the flux changes, the tube 'fights back' to preserve the status quo. That's Lenz's law."

[TA-1 — Statement and step-by-step procedure: Block 1-A, Block 1-B]
"Two steps: (1) Is Φ increasing or decreasing? (2) What current direction creates induced B to oppose the change?"

[P28 — Conflict evidence for MC-LENZS-LAW-MEANS-INDUCED-CURRENT-OPPOSES-ORIGINAL-CURRENT]
"Φ decreasing: induced B is parallel to original B (supports it), NOT opposite to it. Lenz opposes the CHANGE, not the field. Magnet retreating → current reverses compared to magnet approaching."

[P51 — Check-in]
"Magnet retreating (south pole leaving, flux was into page from south): is Φ increasing or decreasing? What direction is induced B?"
[Φ decreasing; induced B supports remaining flux → same direction as original → into page → clockwise current (viewed from the retreating south pole side)]

[TA-2 — WE-1: step-by-step magnet approach]

[P28 — Conflict evidence for MC-LENZS-LAW-VIOLATES-ENERGY-CONSERVATION]
"WE-2: at terminal velocity, gravitational PE lost = I²R heat generated. Energy is perfectly conserved. Lenz prevents perpetual motion by requiring external work for any flux change."

[TA-3 — WE-2: terminal velocity of sliding rod]

[TA-4 — Back-EMF and WE-3: motor power analysis]

[P52 — Narrow]
"One rule, three applications: (1) magnet-loop → repulsion/attraction; (2) moving conductor → braking force; (3) motor → back-EMF limits current."

[P62 — Retrieval seed]
"Write from memory: Lenz's law statement, two-step procedure, back-EMF formula, energy conservation argument."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Lenz's law: induced current opposes the CHANGE in flux. It's energy conservation made electromagnetic. Applications: eddy current braking, back-EMF in motors, transformer operation. The negative sign in ε = −dΦ/dt is Lenz's law."

[P85 — Regulation tail]
"Shakiest part: the direction procedure, the back-EMF logic, or the energy argument?"

[P89 — Retrieval schedule]
"Return tomorrow for the rectangular loop retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (counterclockwise for S approaching) | Redo: south pole approaching → B into page (same direction from S pole) → Φ into page increases → induced B out of page → counterclockwise. Wait — S pole creates B lines entering into the south, so approaching S means field from north side going into the ring is field lines of the magnet going INTO the ring. Actually: near S pole, field lines point toward S (south attracts field lines). So approaching S pole: field below the ring (approaching from below) → field lines point upward toward S pole → Φ upward increases → induced B downward → clockwise viewed from above (south-pole side). Deploy diagram for clarity. |
| Probe B1 wrong (attraction vs. repulsion) | Draw force on current-carrying wire inside the field: F=IL×B; if I is clockwise and B is into page, force on left wire is rightward, on right wire is leftward — net: zero lateral force but force on horizontal wire at boundary is upward (toward field region) — opposing extraction ✓ |
| Probe B3 wrong (resistance calculation) | R = V/I_startup; startup: no back-EMF, all V across R |
| Probe C2 incomplete | Add: eddy brakes also fail in superconductors (R=0 → infinite braking, but that's a different regime); key practical issue is low-speed ineffectiveness |

---

## Component 8 — Visualisation Specification

**Primary visual:** Four-frame sequence — (i) magnet approaching: Φ up, increasing → induced current counterclockwise, top of loop = N pole → repels magnet; (ii) magnet stationary: Φ constant → no current; (iii) magnet retreating: Φ up, decreasing → induced current clockwise, top of loop = S pole → attracts magnet (still opposing the change — flux is decreasing, so attraction tries to prevent the retreat). All four frames labelled with flux change direction and current direction arrows.

**Secondary visual:** Motor back-EMF circuit diagram — voltage source V, armature resistance R, back-EMF source ε_back (in series, opposing V); current I = (V − ε_back)/R; power flow: P_total = VI splits into P_R = I²R (heat) and P_mech = ε_back × I (mechanical output). Bar chart showing power split at full speed vs. startup.

**Tertiary visual:** Braking force graph — F_brake vs. v; F = B²L²v/R: linear rise with speed; horizontal line at mg; intersection = terminal velocity v_t. Annotate: "below v_t: net force down (accelerates); above v_t: net force up (decelerates) — stable equilibrium."

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.lenzs-law)                    PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (proficient → 4)                      PASS
V-4  bloom verb matches level (apply → predict/analyse)                    PASS
V-5  prerequisites listed in KG (phys.em.faradays-law)                    PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 4 formula                          PASS
V-9  status = READY                                                        PASS
V-10 ≥2 misconceptions with all 6 MC fields                               PASS
V-11 ≥3 worked examples with full solution                                 PASS
V-12 Probe sets A (recall), B (transfer), C (mastery gate) present        PASS
V-13 Retrieval schedule has ≥4 events with offsets                        PASS
V-14 Session flow uses P-codes from Primitive Library                      PASS
V-15 Adaptive branching table present                                      PASS
V-16 Visualisation spec present with ≥2 visuals                           PASS
V-17 No framework/runtime/route modifications                              PASS
V-18 No mathematics content authored                                       PASS
V-19 All formulas dimensionally consistent                                 PASS
V-20 Cross-links reference valid KG concept IDs                            PASS
```

**Overall status: READY**
