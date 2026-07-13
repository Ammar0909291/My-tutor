# Teaching Blueprint — phys.mod.photons

## Component 0 — Concept Metadata

```
concept_id:         phys.mod.photons
name:               Photons and Quantization of Light
domain:             modern physics
difficulty:         proficient (4)
bloom:              understand
mastery_threshold:  0.80
estimated_hours:    4
prerequisites:      [phys.mod.photoelectric-effect]
cross_links:        []
session_cap:        6 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a light-sensitive detector in a very dark room clicks at random intervals —
                       each click is a single photon; difficulty 4 → C)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** Light is quantized into discrete packets called photons. Each photon carries a
fixed energy E = hf and a fixed momentum p = h/λ. These are not divisible — a photon is the
smallest possible unit of electromagnetic radiation at a given frequency. The photon model explains
the photoelectric effect (already established), the spectrum of blackbody radiation (Planck's
precursor), and the Compton effect (next concept). Mastery means: (a) computing photon energy
from frequency or wavelength, (b) computing photon momentum, (c) counting photons in a beam of
known power and frequency, (d) explaining why photons are not "little balls" but quantum objects
with both wave and particle character.

**The Two Core Equations:**  
  Energy:   E = hf = hc/λ   (h = 6.626 × 10⁻³⁴ Js)  
  Momentum: p = h/λ = E/c

**The Key Conceptual Bridge from phys.mod.photoelectric-effect:**  
In the photoelectric effect, light came in packets of energy hf and the threshold was φ = hf₀.
The photon concept generalises this: every EM field (radio waves, visible light, X-rays, gamma
rays) is quantized. A 1 kHz radio wave has photons with energy h × 1000 Hz = 6.6 × 10⁻³¹ J —
so tiny that radio photons are practically undetectable as individuals. A 10¹⁸ Hz gamma ray
photon has energy ~4 keV — detectable as an individual event. The photon model spans all EM
radiation.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
A single-photon detector (Geiger counter for light) placed in a very dim beam clicks at random,
irregular intervals — not a smooth current. Each click is one photon arriving. The randomness is
not measurement error; it is quantum randomness. Between clicks, the detector is silent — no
half-photons or fractional energy deposits.

**Stage 2 — Representational (R)**  
A monochromatic beam of power P and frequency f consists of N photons per second, where
N = P/(hf). Each photon carries energy E = hf. A 1 mW green laser (λ = 532 nm) emits
N = 10⁻³ / (6.626×10⁻³⁴ × 3×10⁸/532×10⁻⁹) ≈ 2.7 × 10¹⁵ photons/second. Individual photons
are unresolvable in everyday beams, but the quantization is real.

**Stage 3 — Abstract (A)**  
Photon energy E = hf: frequency-proportional, frequency-only (not amplitude). Photon momentum
p = h/λ = E/c: photons have momentum despite zero rest mass (consistent with E = pc for
massless particles, a consequence of special relativity). The energy-momentum relation for a
photon: E² = (pc)² (since m = 0). Photon density and wave intensity are related: I = Nhf/A
(intensity = photon flux × photon energy / area).

**Stage 4 — Transfer (T)**  
Photon momentum provides the mechanism for radiation pressure (solar sails, laser cooling of
atoms, optical tweezers). The concept of photon counting extends to quantum optics, single-photon
communication in quantum cryptography, and astrophysical photon detection (how astronomers
measure stellar luminosities). The photon model also sets up the Compton effect and the de Broglie
hypothesis (matter waves by analogy).

---

## Component 3 — Why Beginners Fail

1. **Photons as tiny balls:** Students visualise photons as small spherical particles. This leads
   to contradictions when photons produce interference patterns (single photons through a double
   slit) — if they are balls, how can one ball go through two slits? The correct model is a
   quantum object with both wave and particle character, not a classical particle.

2. **Confusing photon energy with photon intensity:** Students conflate the energy of one photon
   (determined by frequency) with the total energy of the beam (determined by photon count ×
   energy per photon). A bright red laser has more photons but each photon has less energy than
   a dim UV source.

3. **Treating momentum = mass × velocity and rejecting p = h/λ:** Students apply the Newtonian
   formula p = mv. Since m = 0 for photons, they conclude p = 0. The relativistic formula p = E/c
   must be introduced as the correct framework for massless particles.

4. **Believing quantum randomness is measurement error:** The random arrival of photons in a dim
   beam is not because the detector is imprecise — it is because the photon arrival time is
   genuinely probabilistic. This challenges the deterministic worldview.

---

## Component 4 — Misconception Library

### MC-1: MC-PHOTONS-ARE-TINY-BALLS
**Probe:** "A single photon passes through a double-slit apparatus. After many photons have passed
through, an interference pattern builds up. How can each individual photon 'know' about both slits
to produce this pattern?"  
**Characteristic phrase:** "The photon went through one slit, not both."  
**Trigger:** Classical-particle visualisation.  
**Conflict evidence [P28]:** Experiments (Aspect et al., Taylor 1909, modern single-photon
cameras) show that even individual photons, sent one at a time through a double slit with long
waits between, build up the interference pattern. No particle model can produce this result —
a ball going through one slit would give a Gaussian distribution centred on that slit.  
**Bridge [P30]:** "A photon is not a ball. Its wave function passes through both slits simultaneously.
The wave function interferes with itself. When the photon is detected, it appears at a random
position, weighted by the interference pattern probability."  
**Replacement [P31]:** A photon is a quantum object described by a wave function; it does not
follow a definite trajectory; it is detected as a particle but propagates as a wave.  
**Discrimination pairs [P33]:** Single photon through double slit: (A) goes through one slit and
lands randomly, (B) goes through both slits and produces interference, (C) splits in half at
each slit. Correct: (B) — the photon's wave function goes through both.  
**S6 repair path:** TA-3 (wave-particle duality introduction) → TA-5 (single-photon double-slit
evidence).

### MC-2: MC-BRIGHT-BEAM-HAS-MORE-ENERGETIC-PHOTONS
**Probe:** "Two laser pointers: one red (λ = 700 nm, power 5 mW) and one violet (λ = 400 nm,
power 1 mW). Which has more photons per second? Which photons are more energetic?"  
**Characteristic phrase:** "The brighter one has higher energy photons."  
**Trigger:** Conflating total beam power (photon count × energy) with individual photon energy.  
**Conflict evidence [P28]:** E_photon(red) = hc/700nm ≈ 2.84 × 10⁻¹⁹ J.
E_photon(violet) = hc/400nm ≈ 4.97 × 10⁻¹⁹ J.
N(red) = 5×10⁻³ / 2.84×10⁻¹⁹ ≈ 1.76 × 10¹⁶/s.
N(violet) = 1×10⁻³ / 4.97×10⁻¹⁹ ≈ 2.0 × 10¹⁵/s.
Red has more photons/s but each is less energetic.  
**Bridge [P30]:** "Photon energy is a property of frequency, not the beam's total power. Bright
red = many low-energy photons. Dim violet = few high-energy photons. Total power = photon count
× energy per photon."  
**Replacement [P31]:** Photon energy E = hf depends only on frequency; photon count N = P/(hf)
determines intensity. These are independent quantities.  
**Discrimination pairs [P33]:** 5 mW red vs. 1 mW violet — which photons are more energetic?
(A) red (brighter = more energy), (B) violet (higher frequency = more energy per photon),
(C) same (same type of light). Correct: (B).  
**S6 repair path:** TA-4 (photon energy/count calculation exercises).

### MC-3: MC-PHOTON-HAS-NO-MOMENTUM
**Probe:** "A photon has no rest mass. Does it have momentum? If yes, how can you calculate it?"  
**Characteristic phrase:** "No mass, no momentum."  
**Trigger:** Newtonian p = mv applied to m = 0.  
**Conflict evidence [P28]:** Solar sails are pushed by photon momentum — a real engineering
application. Laser cooling of atoms uses photon momentum transfer to slow atoms to nanokelvin
temperatures. Compton scattering (next concept) directly measures photon momentum transfer to
electrons.  
**Bridge [P30]:** "Newtonian p = mv applies only to massive particles. Einstein's relativistic
mechanics gives E² = (pc)² + (mc²)². For a photon, m = 0, so E = pc → p = E/c = hf/c = h/λ.
The momentum is real and measurable."  
**Replacement [P31]:** Photon momentum p = h/λ = E/c; derived from relativistic mechanics, not
Newtonian; confirmed by radiation pressure and Compton scattering.  
**Discrimination pairs [P33]:** Does a photon have momentum? (A) No — m = 0. (B) Yes — p = h/λ.
(C) Only if it is absorbed, not if it passes through. Correct: (B).  
**S6 repair path:** TA-5 (radiation pressure calculation) → Compton effect preview.

### MC-4: MC-QUANTUM-RANDOMNESS-IS-MEASUREMENT-ERROR
**Probe:** "In a very dim light beam, a photon detector clicks at irregular intervals. A student
says: 'The irregularity is because the detector is not sensitive enough.' Is this correct?"  
**Characteristic phrase:** "A better detector would give regular clicks."  
**Trigger:** Deterministic worldview — if something appears random, it must be due to measurement
limitations.  
**Conflict evidence [P28]:** Modern single-photon detectors have efficiencies >90% and timing
jitter <100 ps. The random arrival intervals persist even at these precisions. The randomness is
not detector noise — it is the inherent quantum randomness of photon arrival, governed by Poisson
statistics.  
**Bridge [P30]:** "The irregularity is not detector noise — it is what quantum mechanics predicts.
Photons in a coherent beam arrive at Poisson-distributed random times. A perfect detector would
still see random intervals. Quantum mechanics is fundamentally probabilistic, not deterministic."  
**Replacement [P31]:** Photon arrival times in a coherent beam are genuinely random (Poisson
process); this is a property of quantum mechanics, not measurement imperfection.  
**Discrimination pairs [P33]:** Irregular photon arrival times in a dim beam: (A) detector noise,
(B) fundamental quantum randomness, (C) thermal fluctuations. Correct: (B) for a coherent source.  
**S6 repair path:** TA-3 (quantum randomness vs. classical noise discussion).

---

## Component 5 — Explanation Library

**Explanation E-1 (photon energy from frequency):**  
When Maxwell showed that electromagnetic waves carry energy, he did not quantize it. Planck (1900)
found that to explain blackbody radiation, he had to assume energy came in chunks: E = hf. Einstein
(1905) took this seriously and proposed these chunks are real particles — photons. Each photon
carries exactly hf of energy. Frequency determines the "size" of the chunk; the number of chunks
per second determines the beam's power.

**Explanation E-2 (photon momentum from relativity):**  
Special relativity gives E² = (pc)² + (mc²)² for any particle. For a photon with zero rest mass:
E = pc → p = E/c = hf/c = h/λ. This momentum is not just theoretical — radiation pressure (the
force of light on a surface) is photon momentum transferred per unit time. Solar sails and laser
cooling are engineering applications.

**Explanation E-3 (photon counting):**  
The number of photons per second in a beam of power P at frequency f is N = P/(hf). For a 1 W
green light (λ = 550 nm): N = 1 / (hc/λ) = λ/(hc) = 550×10⁻⁹ / (6.626×10⁻³⁴ × 3×10⁸) ≈
2.77 × 10¹⁸ photons/second. At the quantum scale, "light" is an enormous flood of photons; in
a single-photon experiment, you send them one at a time.

---

## Component 6 — Analogy Library

**Primary analogy — Currency in different denominations:**  
A total budget of $1000 can be paid in $100 bills (10 bills, high denomination) or $1 bills
(1000 bills, low denomination). Total amount = same; number of bills = different. Photon energy
is the denomination (determined by frequency); beam power is the total budget; photon count per
second is the number of bills. High frequency = high-denomination photon; low frequency = low-
denomination photon.  
**Breaking point:** Dollar bills are discrete and distinguishable; photons are indistinguishable
quantum particles (Bose-Einstein statistics). The analogy holds for energy accounting but not for
photon statistics.  
**Anti-analogy:** Water from a hose (classical wave model): a stronger flow gives continuously
more energy, not more discrete packets. The water model gives no minimum unit of energy transfer,
which is why it cannot explain the photoelectric effect threshold.

---

## Component 7 — Demonstration Library

**D-1 (Laser + solar cell):**  
Shine laser pointers of different frequencies (red, green, violet) at the same photodiode.
Measure the photocurrent. Then vary the power of a single laser (dimmer/brighter). Show: changing
frequency changes what the photocell can detect (threshold), changing power changes the current
(photon count). This is the photoelectric effect revisited — now reframed as photon-energy
accounting.

**D-2 (Radiation pressure — Crookes radiometer, qualitative):**  
A Crookes radiometer (light-mill) spins in light. Note: the classical explanation (photon pressure
asymmetry) is complicated by thermal effects — this is a good teaching moment about model
complexity. The deeper point: light does exert radiation pressure, confirmed precisely by laser
experiments in atomic physics.

**D-3 (Single-photon statistics — simulation):**  
Show a computer simulation of single-photon double-slit: individual dots appearing one at a
time, gradually building the interference pattern. Ask at each stage: "Is that a particle or a
wave?" The evolving answer challenges the MC-1 ball model.

---

## Component 8 — Discovery Lesson

**Best approach:** Extension from the photoelectric effect → generalisation → anomaly (momentum).

*Anchor (2 min):* "In the last session, photons had energy hf. That was enough to explain the
threshold. But can photons also push things? Does a beam of light exert a force?"

*Test intuition (2 min):* Ask: does light exert pressure? Most students say no — light is "just
light." Reveal: solar sails exist.

*Derive momentum (5 min):* Start from E = hf. Use E = pc (massless particle). Derive p = h/λ.
Calculate for a green photon: p ≈ 1.24 × 10⁻²⁷ kg m/s. Compare to a dust grain at 1 mm/s:
m ≈ 10⁻¹² kg → p ≈ 10⁻¹⁵ kg m/s. A photon has ~1000× less momentum than a dust grain but
there are 10¹⁸ photons/s in a 1 W beam.

*Force calculation (5 min):* Radiation pressure F = P/c for perfect absorption. A 1 W laser:
F = 1/3×10⁸ ≈ 3.3 nN. This is the force of a few nanograms — measurable with atomic force
microscopes.

*Photon counting (5 min):* N = P/(hf). Students calculate for red, green, and UV beams at same
power. Rank by photon count — UV has fewest (most energetic), red has most.

*Closure (1 min):* "One equation, two results: E = hf tells you each photon's energy;
p = h/λ = E/c tells you each photon's momentum. Together they replace the continuous wave model."

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Single-photon detector narrative (D-1 setup). "Each click is one photon — a real,
discrete, countable object." Connect to photoelectric effect: "We already knew photons carry
energy hf. Today we deepen the model."  
Success signal: Students accept photons as countable individual objects.

**TA-2 — Energy and Counting [P14]**  
Trigger: After anchor.  
Action: Derive N = P/(hf). Compute for a 1 mW red and a 1 mW blue laser. Establish: same power,
different photon energies, different photon counts.  
Success signal: Students correctly compute photon counts for two frequencies at the same power.

**TA-3 — Wave-Particle Duality Preview [P14, P30]**  
Trigger: After energy/counting.  
Action: Show D-3 (single-photon double-slit simulation). "This one dot is a particle. After 10,000
dots: this pattern is a wave. The photon is both — or neither — it is a quantum object."
Address MC-1 and MC-4 proactively.  
Success signal: Students can state: "Photon is detected as particle, propagates as wave."

**TA-4 — Momentum Derivation [P14, P28]**  
Trigger: After duality.  
Action: "Photons push solar sails. How?" Derive p = h/λ from E = pc (massless particle). Address
MC-3 directly. Compute p for visible photons. Compute radiation force for a 1 W beam.  
Success signal: Students state p = h/λ and can compute it; accept that m = 0 does not mean p = 0.

**TA-5 — MC-2 Diagnostic [P14, P28, P31, P33, P36]**  
Trigger: After momentum.  
Action: Present MC-BRIGHT-BEAM-HAS-MORE-ENERGETIC-PHOTONS probe (red 5 mW vs. violet 1 mW).
Students compute E per photon and N per second for each.  
Success signal: Students correctly identify: violet photons are more energetic; red beam has more
photons/s.

**TA-6 — Closure & Self-Assessment [P68, P85, P91]**  
Trigger: Session end.  
Action: Three questions — (1) energy of a photon of λ = 450 nm; (2) momentum of same photon;
(3) a 2 mW laser at λ = 633 nm — how many photons per second? Students solve without notes.  
Success signal: All three correct.

---

## Component 10 — Voice Teaching

**Opening move:** "In the photoelectric effect, we accepted that light comes in packets of energy
hf. Today we make that model complete: each packet also has momentum h/λ. Light is not just
energy waves — it is a stream of quantum objects, each carrying energy and momentum."

**Key explanatory moves:**
- "E = hf: the energy of one photon. P = N × hf: the energy of N photons per second. These are
  different quantities. Don't mix them."
- "p = h/λ: Newtonian p = mv cannot work for m = 0. Relativity fixes it: for massless particles,
  E = pc, so p = E/c. Light pushes things — solar sails are proof."
- "One photon going through a double slit: the wave function goes through both slits and interferes.
  The click of the detector locates it at one point. Wave going in, particle coming out."

**Common recovery phrases:**
- If student says photon momentum is zero: "Calculate the force a 1 W laser exerts: F = P/c.
  That force is real and measured. It comes from photon momentum transfer. The formula p = h/λ
  must be correct."
- If student conflates energy with intensity: "Write E = hf: that's one photon. Write P = Nhf:
  that's N photons. Circle the difference. The first depends on colour. The second depends on
  how many photons per second."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.80):**  
Pass criteria — student correctly:  
(a) Computes photon energy from E = hf or E = hc/λ  
(b) Computes photon momentum from p = h/λ  
(c) Computes photon count per second from N = P/(hf)  
(d) Explains why a photon has non-zero momentum despite zero rest mass  
Failure on (a) → restart from TA-2. Failure on (b) or (d) → TA-4. Failure on (c) → TA-2 or TA-5.

**Formative Golden Probe (FA-1):**  
"Find the energy (in eV) and momentum of a photon of wavelength 400 nm."  
Expected: E = hc/λ = 6.626×10⁻³⁴ × 3×10⁸ / 400×10⁻⁹ = 4.97×10⁻¹⁹ J = 3.10 eV.
p = h/λ = 6.626×10⁻³⁴ / 400×10⁻⁹ = 1.66×10⁻²⁷ kg m/s.  
Threshold: Both correct with units.

**Formative Golden Probe (FA-2):**  
"A red laser pointer (λ = 650 nm) has power 3 mW. How many photons does it emit per second?"  
Expected: E_photon = hc/λ = 3.06×10⁻¹⁹ J. N = P/E = 3×10⁻³ / 3.06×10⁻¹⁹ ≈ 9.8 × 10¹⁵/s.  
Threshold: Correct N with correct intermediate energy calculation.

**Formative Golden Probe (FA-3):**  
"A laser beam of power 500 mW is directed at a perfect mirror. Calculate the force exerted on
the mirror. (For a perfect mirror, F = 2P/c because the photons reverse direction.)"  
Expected: F = 2 × 500×10⁻³ / 3×10⁸ = 3.33 × 10⁻⁹ N = 3.33 nN.  
Threshold: Correct application of impulse formula; factor of 2 for reflection correctly used.

**Formative Golden Probe (FA-4):**  
"Explain in one paragraph why a photon has momentum even though it has zero rest mass."  
Expected: The Newtonian formula p = mv requires mass. For massless particles, the relativistic
relation E² = (pc)² + (mc²)² reduces to E = pc when m = 0. Therefore p = E/c = hf/c = h/λ.
This momentum is physically real: it produces radiation pressure measurable in laser experiments
and used in solar sails.  
Threshold: Relativistic derivation explicit; experimental confirmation mentioned.

**Confidence Calibration:** After FA-4, ask: "How confident were you that momentum could be
non-zero for m = 0?" Persistent low confidence here flags a conceptual gap on relativistic
mechanics that should be noted for phys.rel sessions.

**Delayed Retrieval (Session + 3 days):**  
"Without notes: energy of a photon at λ = 500 nm; momentum of same photon; photon count for
1 mW at same wavelength."  
Threshold: All three computed correctly unaided.

---

## Component 12 — Recovery Notes

**S0 (no prior photoelectric effect):** The prerequisite phys.mod.photoelectric-effect must be
satisfied — the photon model is introduced there. Do not attempt this concept without it.

**S3 (knows E = hf but not momentum):** The momentum gap is the most common at this level. Use
the radiation-pressure argument (D-2, solar sails) before the derivation — make the need for
momentum tangible before introducing the equation.

**S6 (MC-PHOTON-HAS-NO-MOMENTUM dominant):** Direct to the Compton effect calculation (next
concept). "The Compton effect measured the momentum change of a photon as it scattered off an
electron. The numbers match p = h/λ exactly. The momentum is real." This is evidence-first
recovery.

**S9 (can compute energy but confuses single-photon energy with total power):** Require the
student to label every quantity they write: "Is this one photon's energy or the whole beam's
energy?" Explicit labelling prevents silent conflation.

---

## Component 13 — Memory & Review

**Memory type:** Procedural (two formulas E = hf, p = h/λ) + conceptual (why momentum ≠ 0;
wave-particle duality). The formulas are easy to recall; the concepts need spaced conceptual
probes.

**Spaced retrieval plan:**
- Session + 1 day: "Energy and momentum of a photon at λ = 600 nm. Explain in one sentence why
  the photon has momentum." (Formula recall + concept check)
- Session + 4 days: "A 5 mW blue laser (λ = 450 nm) and a 5 mW red laser (λ = 700 nm) — which
  has more photons/s? Which photons have more energy? More momentum?" (Multi-quantity comparison)
- Session + 9 days: "A photon of wavelength 200 nm hits an electron at rest and transfers some
  momentum. Qualitatively, what happens to the photon's frequency after the collision? Why?"
  (Compton-effect preview; tests momentum transfer understanding)

**Interleaving partners:** phys.mod.photoelectric-effect (energy model foundation),
phys.mod.compton-effect (momentum model application), phys.mod.de-broglie (extends momentum
concept to matter).

---

## Component 14 — Transfer Map

**Near transfer:**
- phys.mod.compton-effect: directly uses p = h/λ to compute the wavelength shift after photon-
  electron collision
- phys.mod.de-broglie: extends p = h/λ to matter particles (λ = h/p for any particle)
- phys.mod.bohr-model: photon emission/absorption explains atomic spectral lines

**Far transfer:**
- Solar sail engineering: F = P/c for photon momentum transfer
- Laser cooling of atoms: photon recoil reduces atomic velocity to nanokelvin temperatures
- Optical tweezers: focused photon momentum gradient traps and manipulates cells
- Quantum cryptography: single photon state encoding (BB84 protocol)
- Astrophysics: radiation pressure in stellar interiors balances gravitational collapse

**Structural abstraction:** E = hf and p = h/λ are the two bridges between the wave description
of light (frequency f, wavelength λ) and the particle description (energy E, momentum p).
These two equations are the translation dictionary between classical wave physics and quantum
mechanics.

---

## Component 15 — Curriculum Feedback

**Does this concept position correctly in the KG?**  
Yes. Requiring phys.mod.photoelectric-effect gives the energy-hf foundation. Unlocking
phys.mod.compton-effect, phys.mod.de-broglie, phys.mod.bohr-model, and phys.mod.x-rays is
correct — all four require the photon as a defined concept.

**Missing prerequisite?**  
A node for phys.mod.blackbody-radiation (Planck's quantization) would deepen historical context
for E = hf, but it is not needed computationally — E = hf can be presented as the photon
hypothesis without Planck's derivation.

**Recommended teaching sequence:** phys.mod.photoelectric-effect → phys.mod.photons →
phys.mod.compton-effect. All three form the photon-model core and should be taught within the
same week.

**Asset opportunity:** An interactive photon-counter simulation (set beam power and wavelength,
display N = P/(hf) photons/s, show individual click events with Poisson spacing) would make the
abstract counting formula experiential. High-priority given how commonly students conflate energy
with intensity.

---

## Package Validation Checklist

```
V-1   concept_id matches KG exactly: phys.mod.photons ✓
V-2   all 10 KG fields present: id/name/requires/unlocks/cross_links/difficulty/bloom/
      mastery_threshold/estimated_hours/description ✓
V-3   description consistent with KG: light quantised into photons each carrying E = hf,
      explaining phenomena classical wave theory cannot ✓
V-4   4-stage CPA+ model present: Concrete / Representational / Abstract / Transfer ✓
V-5   ≥3 failure modes documented: 4 listed in Component 3 ✓
V-6   4 misconceptions present: MC-1…MC-4 ✓
V-7   each MC has probe + characteristic phrase: ✓ for all 4
V-8   ≥2 misconceptions engineered:
      MC-PHOTONS-ARE-TINY-BALLS,
      MC-BRIGHT-BEAM-HAS-MORE-ENERGETIC-PHOTONS ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (6 TAs): TA-1…TA-6 ✓
V-11  TA-1 is Concrete [P01, P06]: single-photon detector click anchor ✓
V-12  TA-5 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-BRIGHT-BEAM-HAS-MORE-ENERGETIC-PHOTONS ✓
V-13  TA-6 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: FA-1…FA-4 + delayed retrieval ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 12 ✓
V-17  3-session spaced retrieval plan present: Component 13 ✓
V-18  interleaving partners named: photoelectric-effect, compton-effect, de-broglie ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
