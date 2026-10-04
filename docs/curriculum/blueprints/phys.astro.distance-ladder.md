# Teaching Blueprint: phys.astro.distance-ladder

## 0. Concept Profile
concept_id: phys.astro.distance-ladder
name: Parallax, Standard Candles and Hubble's Law
domain: Astrophysics (Physics)
difficulty: advanced (4)
bloom: apply
prerequisites: [phys.astro.stellar-properties, phys.wave.doppler-effect]
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (holding a thumb at arm's length and closing each eye in turn, before any star; difficulty 4)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Uses stellar parallax for the first rung: as Earth moves around the Sun, a nearby star shifts against the distant background; the parallax angle p (half the yearly shift) gives the distance directly, d (parsecs) = 1/p (arcseconds), with 1 pc = 3.086 × 10¹⁶ m = 3.26 light-years. Proxima Centauri's p = 0.768″ puts it at 1.30 pc (4.2 ly). A SMALLER parallax means a FARTHER star, and beyond a few thousand parsecs the angles are too small to measure.
2. Uses standard candles for the next rung: objects of known luminosity — Cepheid variables (period–luminosity relation) and type Ia supernovae — give distance from their measured brightness by the inverse-square law, or from the distance modulus m − M = 5 log₁₀(d / 10 pc): a Cepheid with M = −4 seen at m = 21 is 10⁶ pc = 1 Mpc away.
3. Uses Hubble's law for the most distant galaxies: their light is redshifted, z = Δλ/λ ≈ v/c for v ≪ c, and recession speed grows in proportion to distance, v = H₀d with H₀ ≈ 70 km s⁻¹ Mpc⁻¹; a galaxy whose 656.3 nm hydrogen line arrives at 669.4 nm has z = 0.020, v ≈ 6000 km/s and d ≈ 86 Mpc. Every galaxy sees the others receding — the redshift does not place us at a centre — and 1/H₀ ≈ 14 billion years estimates the age of the universe.

A student who thinks a larger parallax means a farther star, or that the redshift of galaxies shows we are at the centre of the universe, has **NOT** achieved mastery — those ideas break every cosmic distance.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No method for distances | Cannot say how star distances are known | Protocol A (Concrete) |
| S1 | Formulas recited | Writes d = 1/p but cannot say why each rung is needed | Protocol B (Counterexample-first) |
| S2-PARALLAX-BIGGER-FARTHER | Bigger angle, bigger distance | "A star with larger parallax is farther away" | Misconception Engine → then Protocol C |
| S2-REDSHIFT-MEANS-WE-ARE-CENTRE | Centre picture | "Everything moves away from us, so we're at the centre" | Misconception Engine → then Protocol C |
| S3 | Partial — parallax fine | Cannot connect standard candles and Hubble's law | Protocol C (Guided Questioning) |
| S6 | Anxiety on logarithms | Avoids the distance modulus | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"How do astronomers know how far away a star is?"
  No idea → S0. Enter Protocol A (Concrete).
  "By how it shifts as Earth orbits — parallax" → DB-2.

DB-2 (representation / misconception test):
"Star A has a parallax of 0.5″ and star B of 0.1″. Which is farther away, and by how much?"
  "B — 10 pc against 2 pc; distance is 1/p" → S3. Enter Protocol C.
  "B" (no reason) → S1. Enter Protocol B.
  "A — it has the larger angle" → SIGNAL:MISCONCEPTION:MC-PARALLAX-BIGGER-FARTHER. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (expansion check — overlays):
"Almost every galaxy is moving away from us. Does that mean we are at the centre of the universe?"
  "No — in a uniform expansion every galaxy sees the others receding" → no flag.
  "Yes" → add SIGNAL:MISCONCEPTION:MC-REDSHIFT-MEANS-WE-ARE-CENTRE (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.astro.stellar-properties` and `phys.wave.doppler-effect`):
"How does apparent brightness depend on distance? What happens to the wavelength of light from a source moving away?"
  Cannot say "b = L/(4πd²)" and "it is stretched — redshifted" → flag PREREQ-GAP-BRIGHTNESS-DOPPLER.
  In-session minimum repair: one P06 (light spreading over spheres; a stretched wave behind a moving source) + one P34 ("twice as far: brightness?") then resume. If absent, schedule the missing session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: no method for distances.
Success exit: uses all three rungs and explains why each is needed (P91 all 5 probes CORRECT).
Failure exit: on PARALLAX-BIGGER-FARTHER → Misconception Engine, resume at TA-3. On anxiety → Protocol F.
Duration: ~55–65 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: The Thumb Trick]
P01
→ P04[content: "Hold up a thumb and blink each eye: it jumps against the background. Bring it closer and it jumps more. Astronomers do the same with Earth's orbit as the 'two eyes'."]
→ P06[content: Earth at opposite sides of its orbit, a near star shifting against distant stars]
→ P14[predict: "A nearer star: bigger shift or smaller?"] → P55
→ success_path → P49 → P05[curiosity: "How far does this work?"]

[TA-2: Parallax and the Parsec]
P02
→ P13[think-aloud: "The parallax angle p is half the yearly shift. Define the parsec as the distance at which p = 1 arcsecond: 3.086 × 10¹⁶ m, 3.26 light-years. Then d (pc) = 1/p (″). Proxima Centauri: p = 0.768″, d = 1.30 pc."]
→ P08[notation: "d (pc) = 1 / p (arcsec)"]
// GR-3 satisfied: P06 and P13 preceded P08 (V-8 PASS)
→ P34[question: "p = 0.1″: distance in parsecs and light-years?"] → P55
→ success_path[10 pc ≈ 32.6 ly] → P49

[TA-3: Smaller Angle, Farther Star]
P02
→ P41[diagnostic: "0.5″ vs 0.1″: which is farther?"] → P55
→ [if 0.1″] → P49
→ [if 0.5″] → SIGNAL:MISCONCEPTION:MC-PARALLAX-BIGGER-FARTHER → misconception_repair_chain[MC-PARALLAX-BIGGER-FARTHER]
→ P13[think-aloud: "Beyond a few thousand parsecs the shift is too tiny to measure. We need another method."]

[TA-4: Standard Candles]
P02
→ P13[think-aloud: "If we know how luminous something is, its brightness tells its distance: b = L/(4πd²). Cepheid variables pulsate with a period that reveals their luminosity; type Ia supernovae all peak at nearly the same luminosity. Using magnitudes: m − M = 5 log₁₀(d / 10 pc)."]
→ P34[question: "A Cepheid has M = −4 and is seen at m = 21. Distance?"] → P55
→ success_path[10^((21 + 4 + 5)/5) pc = 10⁶ pc = 1 Mpc] → P49
→ failure_path → P50 → P51[diagnose: rearranging the log] → P52[narrow: "d = 10^((m − M + 5)/5) pc"] → re-elicit P34 → P55

[TA-5: Hubble's Law]
P02
→ P13[think-aloud: "Galaxy spectra are redshifted: z = Δλ/λ ≈ v/c. Hubble found v grows in proportion to d: v = H₀d, H₀ ≈ 70 km/s per Mpc."]
→ P34[question: "Hydrogen's 656.3 nm line seen at 669.4 nm. z, v, d?"] → P55
→ success_path[z ≈ 0.020; v ≈ 6000 km/s; d ≈ 86 Mpc] → P49
→ P41[diagnostic: "Does this put us at the centre?"] → P55
→ [if no] → P49
→ [if yes] → SIGNAL:MISCONCEPTION:MC-REDSHIFT-MEANS-WE-ARE-CENTRE → misconception_repair_chain[MC-REDSHIFT-MEANS-WE-ARE-CENTRE]

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "If H₀ were larger, would the universe's estimated age be larger or smaller?"] → P55
    → P49 → P51[check: smaller — age ≈ 1/H₀]
    → P35[open: "Explain why astronomers need a 'ladder' rather than one method."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a way to find the distance to a galaxy too far for parallax."] → P55 → CORRECT
    → P76[transfer: "Why must Cepheid distances be calibrated with parallax first?"] → P55 → CORRECT
    → P75[boundary: "Parallax of exactly 1″ — distance?"] → P55 → CORRECT
    → P74[classify: "Nearby star, nearby galaxy, distant galaxy — which rung?"] → P55 → CORRECT
    → P78[explain: "Why does a smaller parallax mean a farther star?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: C
Entry condition: formulas without purpose.
Success exit: explains why each rung needs the one below.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["A galaxy is 10⁸ pc away. What would its parallax be? Could we measure it?"] → P54 (novel) → P55; then TA-4 and TA-5.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: parallax fine; later rungs not.
Success exit: standard candles and Hubble's law used.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: parallax and inverse-square reasoning stated calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); inverse-square ratios instead of the distance modulus; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: C
Entry condition: confident "bigger angle, farther".
Success exit: revises after the thumb test.
Failure exit: Misconception Engine.
Key deltas: open with the thumb near the face and at arm's length — which jumps more?; let it sit (P55).

## 6. Misconception Engine

### MC-PARALLAX-BIGGER-FARTHER: "A larger parallax means a farther star"
trigger_signal: student ranks stars with larger parallax angles as more distant, treating the angle as proportional to distance.
conflict_evidence [P28]: "Blink at your thumb close to your face, then at arm's length. Which position makes it jump more against the background?"
bridge_text [P30]: "The close thumb jumps more. The same is true for stars: the nearer the star, the bigger its shift as Earth moves across its orbit. Distance is the INVERSE of the angle, d = 1/p: 0.5″ is 2 pc, 0.1″ is 10 pc."
replacement_text [P31]: "d (pc) = 1/p (arcsec): larger parallax, nearer star; smaller parallax, farther star."
discrimination_pairs [P33]: ["p = 0.768″: 1.30 pc (Proxima Centauri)", "p = 0.01″: 100 pc"]
s6_path: skip P28; do the thumb test and say which jumps more.

### MC-REDSHIFT-MEANS-WE-ARE-CENTRE: "Galaxies receding from us shows we are at the centre of the universe"
trigger_signal: student infers from the redshift of distant galaxies that the Milky Way occupies a special central position.
conflict_evidence [P28]: "Draw dots on a balloon and blow it up. Stand on any one dot: do the others move away from it, and do the farther ones move faster? Is that dot the centre of the balloon's surface?"
bridge_text [P30]: "Every dot sees every other dot moving away, faster in proportion to distance — exactly Hubble's law — and no dot is the centre. A uniform expansion looks the same from every galaxy. The redshift tells us space is expanding, not that we are special."
replacement_text [P31]: "Hubble's law v = H₀d holds from any galaxy; it shows uniform expansion, with no centre."
discrimination_pairs [P33]: ["explosion from a centre: one special point", "uniform expansion: every observer sees v ∝ d"]
s6_path: skip P28; the balloon alone.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Which rung?" | CORRECT = parallax; Cepheids; Hubble's law / type Ia |
| P74 (classify) | "0.5″ vs 0.1″" | CORRECT = 0.1″ is farther |
| P75 (boundary) | "p = 1″" | CORRECT = 1 pc |
| P76 (transfer) | "Calibrate Cepheids" | CORRECT = their luminosities come from nearby Cepheids of known (parallax) distance |
| P77 (generate) | "Too far for parallax" | CORRECT = standard candle brightness or redshift with Hubble's law |
| P78 (explain) | "Smaller parallax, farther" | CORRECT = farther objects shift less for the same baseline |
| P79 (predict) | "Larger H₀" | CORRECT = younger universe |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a way to find the distance to a galaxy too far for parallax." → expected: CORRECT
P76: "Why must Cepheid distances be calibrated with parallax first?" → expected: CORRECT
P75: "Parallax of exactly 1″ — distance?" → expected: CORRECT
P74: "Nearby star, nearby galaxy, distant galaxy — which rung?" → expected: CORRECT
P78: "Why does a smaller parallax mean a farther star?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "d for p = 0.25″?"
Interval 2 (3 days): "What is a standard candle?"
Interval 3 (7 days): "z = 0.01: v and d?"
Interval 4 (21 days): "Why no centre to the expansion?"
Interval 5 (60 days): "List the rungs of the distance ladder."

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3, TA-5) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
