# Teaching Blueprint — phys.em.faradays-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.faradays-law
name: Faraday's Law of Electromagnetic Induction
domain: electromagnetism
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.em.magnetic-flux
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.em.lenzs-law
  - phys.em.self-inductance
  - phys.em.maxwells-equations
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — The Law
**Faraday's law**: the EMF induced in a closed conducting loop equals the negative rate of change of magnetic flux through the loop:

> **ε = −dΦ_B/dt** (single turn)

> **ε = −N dΦ_B/dt** (N-turn coil)

Where Φ_B = ∫∫ B · dA. The negative sign is Lenz's law — the induced EMF drives a current whose magnetic field opposes the flux change.

Three equivalent ways to change Φ_B = BA cosθ, all producing EMF:
1. **Change B** (magnets moving, solenoid current changing)
2. **Change A** (loop area expanding/contracting)
3. **Change θ** (rotating coil — the AC generator)

### Block 1-B — Motional EMF
A conductor of length L moving with velocity v perpendicular to B:

> **ε = BLv** (motional EMF)

Physics: free electrons in the moving rod experience force F = qv × B. This force separates charges, building up a potential difference = BLv between the ends.

More generally, for a rod moving at angle θ to B:
> ε = BLv sinθ (θ between v and B)

For a circuit with a sliding rod (rail problem):
- Area swept per unit time = Lv
- dΦ/dt = BL(dx/dt) = BLv
- By Faraday: ε = BLv → I = BLv/R → Force on rod: F = BIL = B²L²v/R (opposing motion — Lenz's law)

### Block 1-C — The AC Generator
A rectangular coil (N turns, area A) rotates at angular frequency ω in field B:

θ(t) = ωt → Φ_B(t) = NBA cosωt

> **ε(t) = −N dΦ/dt = NBAω sinωt = ε₀ sinωt**

Where ε₀ = NBAω is the peak EMF. This is how generators produce AC electricity. The peak EMF is maximised when dΦ/dt is maximum — when the coil plane is parallel to B (θ = 90°, Φ = 0). Maximum EMF occurs when flux is zero; maximum flux occurs when EMF is zero.

### Block 1-D — Faraday's Law in Integral Form (Maxwell's equation)
The full form connecting electric and magnetic fields:

> **∮ E · dl = −dΦ_B/dt**

This is one of Maxwell's four equations. It states that a changing magnetic flux creates a circulating electric field — even in empty space (no conductor needed). This is the electromagnetic induction at the field level.

Key implications:
- An electric field can be induced by a changing B field
- The induced E field is non-conservative (it forms closed loops, unlike electrostatic fields which are conservative: ∮E·dl = 0)
- This is the mechanism of electromagnetic wave propagation (changing B → induced E → changing E → induced B → ...)

---

## Component 2 — Worked Examples

### WE-1 — Flux Change from Moving Magnet
**Problem:** A 500-turn coil (area 20 cm²) experiences a field change from B = 0.10 T to B = 0.50 T in 0.25 s, with the coil normal parallel to B. Find the induced EMF.

**Solution:**
ΔΦ = (B₂ − B₁) × A = (0.50 − 0.10) × 20×10⁻⁴ = 0.40 × 2.0×10⁻³ = 8.0×10⁻⁴ Wb

|ε| = N|ΔΦ/Δt| = 500 × (8.0×10⁻⁴ / 0.25) = 500 × 3.2×10⁻³ = **1.6 V**

Direction: by Lenz's law, the induced current opposes the increasing flux (increasing B into page → induced current creates B out of page → counterclockwise current when viewed from the field direction).

---

### WE-2 — Motional EMF (Rail Problem)
**Problem:** A conducting rod of length L = 0.50 m slides along frictionless rails in B = 0.80 T (perpendicular to the plane of the rails) at v = 3.0 m/s. Rail resistance R = 2.0 Ω. Find: (a) EMF, (b) current, (c) power dissipated, (d) force needed to maintain constant velocity.

**Solution:**
(a) ε = BLv = 0.80 × 0.50 × 3.0 = **1.2 V**

(b) I = ε/R = 1.2/2.0 = **0.60 A**

(c) P = I²R = (0.60)² × 2.0 = **0.72 W** (or P = εI = 1.2 × 0.60 = 0.72 W ✓)

(d) Force on rod from magnetic field (opposing motion by Lenz): F_mag = BIL = 0.80 × 0.60 × 0.50 = 0.24 N  
To maintain constant v: F_applied = 0.24 N (equal and opposite to F_mag)  
Check energy: P_mechanical = F × v = 0.24 × 3.0 = 0.72 W = P_electrical ✓

---

### WE-3 — AC Generator
**Problem:** A generator coil: N = 100 turns, A = 0.050 m², rotates at f = 60 Hz in B = 0.30 T. Find: (a) peak EMF, (b) EMF at t = 1/(240) s (i.e., t = T/4), (c) instantaneous EMF when flux is maximum.

**Solution:**
ω = 2πf = 2π × 60 = 376.8 rad/s

(a) ε₀ = NBAω = 100 × 0.30 × 0.050 × 376.8 = **565 V**

(b) ε(t) = ε₀ sin(ωt) = 565 × sin(376.8 × 1/240) = 565 × sin(π/2) = 565 × 1 = **565 V** (peak)  
Note: at t = T/4, ωt = π/2 → sin = 1 → maximum EMF

(c) Flux is maximum when cosωt = 1 → ωt = 0 → sinωt = 0 → **ε = 0**  
(Maximum flux occurs when EMF is zero — they are 90° out of phase)

---

## Component 3 — Misconception Engine

### MC-EMF-REQUIRES-A-CONDUCTOR
- **trigger_signal:** Student says "Faraday's law only works when there's a wire loop; in empty space, there's no EMF."
- **conflict_evidence [P28]:** "Faraday's law in its Maxwell form: ∮E·dl = −dΦ_B/dt — this is a statement about the electric field in space, not about wires. A changing B field induces a circulating electric field everywhere in space, whether or not a conductor is present. Place a conductor there and the induced E drives current (EMF). But the E field exists regardless. This is how electromagnetic waves propagate — no conductor involved."
- **bridge_text [P30]:** "Gravity doesn't require a mass to be present for a gravitational field to exist — Earth's gravity field fills space whether or not an apple is there to fall in it. Similarly, a changing magnetic flux creates an electric field in space whether or not a conductor is present. The conductor (wire) is just a probe that responds to that pre-existing field."
- **replacement_text [P31]:** "Faraday's law: ∮E·dl = −dΦ_B/dt applies in vacuum and conductors alike. In a conductor, the induced E drives current. In vacuum, the induced E is the electric component of the electromagnetic wave. EMF (energy per charge around the loop) is induced in any path through the changing flux region."
- **discrimination_pairs [P33]:**
  - Conductor in changing flux: induced E drives current I = ε/R (measurable)
  - Empty space in changing flux: induced E field exists (produces EM wave component)
  - No conductor, isolated: no current, but E field still there
- **s6_path:** Link to Maxwell's equations (phys.em.maxwells-equations); show the full integral form.

---

### MC-MAXIMUM-EMF-WHEN-FLUX-IS-MAXIMUM
- **trigger_signal:** Student says "the generator produces most voltage when the coil faces the field directly (maximum flux)."
- **conflict_evidence [P28]:** "ε = −dΦ/dt. When Φ = maximum (coil face perpendicular to B), Φ is at a peak — its rate of change dΦ/dt = 0 at a maximum (derivative of a cosine at its peak is zero). So ε = 0 at maximum flux. Conversely, when Φ = 0 (coil edge-on to B), flux is changing fastest → ε is maximum. Plot Φ(t) = Φ₀cosωt and ε(t) = Φ₀ω sinωt: they are 90° out of phase."
- **bridge_text [P30]:** "Think of a ball thrown upward: at the top (maximum height), its velocity is zero — it's momentarily stopped. Height is maximum but the rate of change of height is zero. Similarly, flux is maximum when its rate of change is zero — and EMF is the rate of change of flux."
- **replacement_text [P31]:** "ε = −dΦ/dt. EMF is maximum when dΦ/dt is maximum (Φ changing fastest), which is when Φ = 0 (coil parallel to B). EMF is zero when Φ = maximum (coil perpendicular to B). EMF and flux are 90° out of phase: ε(t) = ε₀ sinωt, Φ(t) = Φ₀ cosωt."
- **discrimination_pairs [P33]:**
  - Coil perpendicular to B (face-on): Φ = maximum; ε = 0
  - Coil parallel to B (edge-on): Φ = 0; ε = maximum = NBAω
  - At 45°: Φ = Φ₀/√2; ε = ε₀/√2
- **s6_path:** Plot Φ(t) and ε(t) on same time axis for one full rotation; show 90° phase difference visually.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** In an AC generator, the induced EMF is maximum when:
(a) The coil is perpendicular to B **(b) The coil is parallel to B** (c) The flux is maximum (d) The coil stops rotating

**A2 (Short answer):** Write Faraday's law for an N-turn coil. What does the negative sign indicate?
[ε = −N dΦ_B/dt; negative sign: Lenz's law — induced EMF opposes the flux change]

**A3 (Fill-in):** Motional EMF for a rod of length L moving at speed v perpendicular to B is ε = ______.
[BLv]

---

### Probe Set B — Conceptual Transfer
**B1:** A square loop (side 5 cm) is pulled out of a B = 0.40 T region at v = 2.0 m/s (the loop's side remains inside the field). Find the induced EMF and state Lenz's law direction.
[ε = BLv = 0.40 × 0.05 × 2.0 = 0.04 V = 40 mV; Lenz: flux decreasing → induced current tries to maintain it → current direction to reinforce original flux]

**B2:** A 200-turn coil rotates at 50 Hz in B = 0.25 T. Area = 80 cm². Find ε₀ and the EMF at t = T/8.
[ω=2π×50=314 rad/s; ε₀=NBAω=200×0.25×80×10⁻⁴×314=125.6 V; at t=T/8: ωt=π/4; ε=125.6×sin(π/4)=88.8 V]

**B3:** A coil in a region where B = 0.5 sin(100t) T (B perpendicular to coil, area A = 0.02 m², 10 turns). Find the maximum induced EMF.
[Φ = NBA = 10 × 0.5 sin(100t) × 0.02 = 0.1 sin(100t); ε = −dΦ/dt = −10 cos(100t) V; ε_max = 10 V]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** In WE-2 (motional EMF): (a) If v is doubled, what happens to ε, I, F_applied, and P? (b) If B is halved, what happens to ε, I, F_applied, and P?
[(a) v doubled: ε doubles (∝v); I doubles (∝v); F_mag=BIL∝v doubles; P=Fv∝v² quadruples. (b) B halved: ε halves (∝B); I halves; F_mag=BIL∝B² quarters; P∝B² quarters.]

**C2 (Design):** A generator must produce ε₀ = 240 V at 50 Hz. Available: N=500 turns, A=100 cm². Find B. Then find ε at t=2ms after the coil starts from θ=0 (coil ∥ B at t=0).
[ε₀=NBAω → B=ε₀/(NAω)=240/(500×100×10⁻⁴×2π×50)=240/(500×10⁻²×314)=240/1570=0.153 T. At t=2ms: ωt=314×0.002=0.628 rad; ε=240×sin(0.628)=240×0.588=141 V]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: write Faraday's law (N-turn form), give the motional EMF formula, state when generator EMF is maximum and when it is zero."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "A 300-turn coil (A=50cm²) sees B drop from 0.80T to 0.20T in 0.10s. Find |ε|. Then: rod of L=30cm, v=5m/s, B=0.60T — find ε, I (R=3Ω), and F opposing motion."
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "ε = −dΦ/dt: three ways to change Φ, each producing EMF. Give a concrete example of each. Which is used in an electric guitar pickup? A microphone? A generator?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "Generator design: target ε₀=120V at 60Hz. You can choose N, A, and B subject to: N×A ≤ 0.50 m², B ≤ 1.0T. Find the configuration that minimises N (fewest turns). Justify."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Faraday's law is arguably the most economically important equation in physics — it underlies every generator, transformer, and electric motor ever built. Today we derive it from first principles and apply it to generators, motors, and induction."

[P41 — Diagnostic]
"A wire loop sits near a magnet. The magnet is stationary. Is there a current in the loop?"
→ No (correct): "Right. Now the magnet moves toward the loop — current appears. Why?"
→ Various: "Great intuition — let's find the pattern."

[P06 — Concrete anchor]
"Faraday's 1831 experiment: he moved a magnet in and out of a coil and saw a galvanometer deflect. The faster he moved, the bigger the deflection. The key insight: it's not the presence of B that matters — it's the CHANGE of flux. ε = −dΦ/dt."

[TA-1 — The law: Block 1-A]
"ε = −N dΦ/dt. Three ways to change Φ. Each gives EMF."

[P28 — Conflict evidence for MC-MAXIMUM-EMF-WHEN-FLUX-IS-MAXIMUM]
"ε = −dΦ/dt. Maximum rate of change occurs at Φ = 0 (coil edge-on). At Φ maximum: dΦ/dt = 0 → ε = 0. WE-3(c) confirms: when flux is maximum, EMF = 0. Φ and ε are 90° out of phase."

[P51 — Check-in]
"At what coil orientation is the generator EMF maximum? Minimum? Write Φ(t) and ε(t) for the rotating coil."

[TA-2 — Motional EMF: Block 1-B, WE-2]
"Force on electrons in moving rod: F=qvB → charge separation → EMF = BLv. Power balance: P_mechanical = P_electrical."

[TA-3 — AC Generator: Block 1-C, WE-3]

[P28 — Conflict evidence for MC-EMF-REQUIRES-A-CONDUCTOR]
"Maxwell's integral form: ∮E·dl = −dΦ/dt — applies in empty space. EM waves propagate via exactly this mechanism. Faraday's law is more fundamental than just 'wire loops.'"

[P52 — Narrow]
"Two key formulas: ε = −NdΦ/dt (general); ε₀ = NBAω (generator peak). Motional EMF = BLv."

[P62 — Retrieval seed]
"Write from memory: Faraday's law, what negative sign means, three ways to change flux, generator peak EMF formula, phase relationship of Φ and ε."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Faraday's law: EMF = −N dΦ/dt. Lenz's law gives the direction (negative sign). Three flux-change mechanisms. Generator: ε₀ = NBAω, 90° phase lag behind flux. This law is the foundation of electromagnetic induction — and of Maxwell's equations."

[P85 — Regulation tail]
"Shakiest: the phase relationship (max EMF ≠ max flux), the motional EMF derivation, or the energy/power check?"

[P89 — Retrieval schedule]
"Return tomorrow for the retrieval quiz."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks perpendicular) | Deploy MC-MAXIMUM-EMF-WHEN-FLUX-IS-MAXIMUM; plot Φ(t) and ε(t) together |
| Probe B1 Lenz direction wrong | Apply Lenz: identify flux direction; state whether increasing/decreasing; find current direction to oppose change |
| Probe B3 wrong (confuses dB/dt with dΦ/dt) | Φ = NBA = N × A × B(t); dΦ/dt = NA × dB/dt; ε = −N × dΦ/dt = −NA × dB/dt |
| Probe C1(a) wrong on P scaling | P = Fv = (B²L²v/R)v = B²L²v²/R ∝ v²; also P = ε²/R = (BLv)²/R ∝ v² |
| Student asks about transformers | Preview: mutual inductance + Faraday on secondary; ε_s/ε_p = N_s/N_p; link to phys.em.mutual-inductance |

---

## Component 8 — Visualisation Specification

**Primary visual:** Phase relationship diagram — two sinusoidal curves on same time axis: Φ(t) = Φ₀ cosωt (dashed); ε(t) = ε₀ sinωt (solid). Mark: (i) t=0 (Φ max, ε=0); (ii) t=T/4 (Φ=0, ε max); (iii) t=T/2 (Φ min, ε=0); (iv) t=3T/4 (Φ=0, ε min). Annotate: "90° phase difference."

**Secondary visual:** Motional EMF rail diagram — two horizontal rails, conducting rod sliding right with velocity v; B field into page (crosses); force on electrons (downward = q v×B); conventional current direction; EMF = BLv annotated; current I = BLv/R; opposing force F_mag on rod shown leftward.

**Tertiary visual:** Three-panel Φ-change illustration — (i) B increasing (magnet approaching coil): Φ grows; (ii) area increasing (stretching loop): Φ grows; (iii) θ rotating (generator): Φ oscillates. All three labelled with ε = −dΦ/dt, showing each mechanism produces identical mathematical form.

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.faradays-law)                  PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (advanced → 5)                        PASS
V-4  bloom verb matches level (apply → calculate/derive)                   PASS
V-5  prerequisites listed in KG (phys.em.magnetic-flux)                    PASS
V-6  mastery_threshold = 0.80                                              PASS
V-7  session_cap rule applied (≥1h → PA-3)                                PASS
V-8  cpa_entry_stage matches difficulty 5 formula                          PASS
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
