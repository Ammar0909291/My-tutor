# Teaching Blueprint — phys.em.magnetic-materials

## Component 0 — Concept Identity

```yaml
concept_id: phys.em.magnetic-materials
name: Magnetic Materials
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.em.magnetic-field
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.magnetic-dipole
  - phys.em.faradays-law
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation Blocks

### Block 1-A — Atomic Origin of Magnetism
All magnetism originates from moving charges at the atomic level:
1. **Orbital motion** of electrons around the nucleus → orbital magnetic moment
2. **Electron spin** → intrinsic spin magnetic moment (dominant in most materials)

Atomic magnetic moment: μ = −(e/2m_e)**L** (orbital) and μ_s = −g_s(e/2m_e)**S** (spin, g_s ≈ 2)

In most materials, electron moments cancel in pairs (opposite spins — Pauli exclusion). Materials are classified by how their atomic moments respond to an external field **B₀**.

### Block 1-B — Three Classes of Magnetic Behaviour

**Diamagnetic** (all materials have this, but weak):
- No permanent atomic magnetic moment
- Applied field induces tiny moments opposing the field (Lenz's law at atomic scale)
- χ_m < 0, |χ_m| ~ 10⁻⁵
- Examples: bismuth (strongest diamagnet), water, gold, copper, most organic materials
- B_material = μ₀(1 + χ_m)H ≈ slightly less than B₀

**Paramagnetic**:
- Atoms have permanent magnetic moments but they're randomly oriented (thermal disorder)
- Applied field partially aligns moments; alignment opposes thermal agitation
- χ_m > 0, small (10⁻³ to 10⁻⁶); decreases with temperature (Curie law: χ_m = C/T)
- Examples: aluminium, platinum, oxygen gas, ionic iron compounds

**Ferromagnetic** (the dramatic case):
- Quantum exchange interaction aligns neighbouring spins in domains (Weiss domains)
- χ_m >> 1 (up to 10⁶); non-linear; hysteresis; permanent magnetisation possible
- Examples: iron, nickel, cobalt, and their alloys (rare-earth magnets: NdFeB)
- Above Curie temperature T_C: ferromagnet becomes paramagnetic

### Block 1-C — Magnetic Domains and Hysteresis
Ferromagnets contain **domains** — microscopic regions where all spins are aligned. The domain boundaries (Bloch walls) separate regions of different alignment. In an unmagnetised sample, domains are randomly oriented → net moment = 0.

When external **B** is applied:
1. Domains aligned with **B** grow (Bloch wall motion)
2. At saturation (B_sat), all domains aligned → maximum magnetisation M_s

**Hysteresis loop** (B vs. H):
- **Saturation magnetisation** B_s: maximum B when all domains aligned
- **Remanence** B_r: B remaining when H returns to zero (permanent magnet property)
- **Coercive field** H_c: field required to demagnetise (drive B to zero)
- **Soft magnetic materials** (low H_c, low B_r): transformer cores, electromagnets (easy to magnetise/demagnetise)
- **Hard magnetic materials** (high H_c, high B_r): permanent magnets (retain magnetisation)
- Area inside hysteresis loop = energy dissipated per cycle per unit volume (hysteresis loss)

### Block 1-D — Permeability and Susceptibility
- Magnetic susceptibility: **χ_m** = M/H (dimensionless)
- Relative permeability: **μ_r** = 1 + χ_m
- Absolute permeability: **μ** = μ_r μ₀
- In ferromagnets: μ_r varies with H (non-linear); can reach 10⁴–10⁵

Magnetisation M and B field:
> **B = μ₀(H + M) = μ₀μ_r H**

---

## Component 2 — Worked Examples

### WE-1 — Classifying Materials
**Problem:** Classify the following and give a physical reason: (a) copper, (b) liquid oxygen, (c) iron below 1043 K, (d) iron above 1043 K, (e) bismuth.

**Solution:**
(a) Copper: **diamagnetic** — all electrons paired; weak induced opposing moment; χ_m ≈ −10⁻⁵
(b) Liquid O₂: **paramagnetic** — O₂ has unpaired electrons; χ_m > 0 (actually O₂ is attracted to magnets — classic demo)
(c) Iron < 1043 K: **ferromagnetic** — exchange interaction aligns domains; χ_m up to 10⁵; permanent magnetisation possible
(d) Iron > 1043 K (Curie temperature): **paramagnetic** — thermal energy disrupts exchange alignment; domains disappear
(e) Bismuth: **diamagnetic** (strongest common diamagnet); χ_m ≈ −1.7×10⁻⁴

---

### WE-2 — Hysteresis Loop Analysis
**Problem:** A ferromagnetic core has saturation field B_s = 1.6 T, remanence B_r = 0.8 T, coercive field H_c = 400 A/m. Is this a soft or hard magnetic material? What is it good for?

**Solution:**
Hard vs. soft: **H_c = 400 A/m is moderate-to-low**. Compare: soft material (transformer steel) H_c ~ 10–100 A/m; hard material (NdFeB) H_c ~ 10⁶ A/m. This material is **intermediate** — perhaps suitable for magnetic recording media (needs to retain information but be rewritable).

The remanence B_r = 0.8 T (half of saturation) indicates moderate permanent magnetisation when H is removed. The area of the hysteresis loop ∝ B_s × H_c ∝ energy loss per cycle.

---

### WE-3 — Curie Law for Paramagnets
**Problem:** A paramagnetic material obeys χ_m = C/T with Curie constant C = 0.24 K. Find χ_m at T = 300 K and T = 80 K. Find M if H = 10⁵ A/m at 300 K.

**Solution:**
χ_m(300K) = 0.24/300 = **8.0×10⁻⁴**  
χ_m(80K) = 0.24/80 = **3.0×10⁻³** (3.75× larger — colder = more aligned)

M = χ_m × H = 8.0×10⁻⁴ × 10⁵ = **80 A/m** at 300 K  
B ≈ μ₀M = 4π×10⁻⁷ × 80 = **1.0×10⁻⁴ T** (very weak contribution compared to ferromagnet)

---

## Component 3 — Misconception Engine

### MC-ALL-METALS-ARE-MAGNETIC
- **trigger_signal:** Student says "iron, steel, copper, and aluminium are all magnetic because they're metals."
- **conflict_evidence [P28]:** "Test with a strong magnet: iron filings cling strongly. Aluminium foil — no attraction. Copper coin — no attraction. Gold ring — no attraction. Only iron, nickel, cobalt, and their alloys are ferromagnetic. Most metals (aluminium, copper, gold, silver, lead) are non-magnetic (paramagnetic at most — the attraction is too weak to feel). 'Metal' and 'magnetic' are not synonyms."
- **bridge_text [P30]:** "Magnetism at the macro level requires ferromagnetism — quantum exchange interaction aligning electron spins in domains. This happens in only a handful of elements. Most metals have paired electron spins → no net atomic moment → no strong magnetism. The key is the electronic structure, not being a metal."
- **replacement_text [P31]:** "Only Fe, Ni, Co, and some alloys/rare-earth compounds are ferromagnetic (strongly attracted). Most metals are diamagnetic or weakly paramagnetic — not magnetically attracted in any practical sense. Always check: ferromagnet ≠ metal."
- **discrimination_pairs [P33]:**
  - Iron (Fe): ferromagnetic — strongly attracted
  - Aluminium (Al): paramagnetic — χ ~ 10⁻⁵, not perceptibly attracted
  - Copper (Cu): diamagnetic — very slightly repelled
  - Gold (Au): diamagnetic — not attracted
- **s6_path:** Demonstration: hold various metal objects near a strong magnet. Only iron/nickel objects are attracted. Discuss why.

---

### MC-CUTTING-A-MAGNET-GIVES-SEPARATE-N-AND-S-POLES
- **trigger_signal:** Student says "if you cut a bar magnet in half, you get a north-pole piece and a south-pole piece."
- **conflict_evidence [P28]:** "∮B·dA = 0 (Gauss's law for magnetism) — there are no magnetic monopoles. Every piece of a cut magnet has its own north AND south pole. Cut again → still two poles each. Down to a single atomic magnet, you still have a dipole (spin up/down). This has been verified to atomic precision; no magnetic monopole has ever been found despite extensive searches."
- **bridge_text [P30]:** "An electric dipole (+q, −q) can be separated by cutting between the charges — you'd get +q alone and −q alone. A magnetic dipole cannot be separated because magnetism arises from spinning charges (loops of current), not from two distinct 'magnetic charges.' Every loop has both a clockwise and counterclockwise face — north and south are inseparable."
- **replacement_text [P31]:** "Cutting a magnet always produces two smaller dipole magnets, each with N and S poles. There are no magnetic monopoles. Gauss's law for magnetism: ∮B·dA = 0 — no net 'magnetic charge' enclosed by any surface."
- **discrimination_pairs [P33]:**
  - Electric dipole: can be separated into +q and −q
  - Magnetic dipole: cannot be separated; cutting always gives two dipoles
- **s6_path:** Show physically with two bar magnets; or use simulation showing domain structure — every domain is itself a dipole.

---

## Component 4 — Assessment Probes

### Probe Set A — Factual Recall
**A1 (MCQ):** Which property is unique to ferromagnetic materials (not diamagnetic or paramagnetic)?
(a) Non-zero χ_m (b) Temperature dependence **(c) Magnetic domains and hysteresis** (d) Response to external field

**A2 (Short answer):** What happens to a ferromagnet when it is heated above its Curie temperature?
[Thermal energy disrupts exchange interaction; domains disappear; material becomes paramagnetic]

**A3 (Matching):** Match: (1) diamagnetic, (2) paramagnetic, (3) ferromagnetic — with χ_m < 0 / small positive / very large positive.
[1→χ<0; 2→small positive; 3→very large positive]

---

### Probe Set B — Conceptual Transfer
**B1:** Why is liquid oxygen attracted to a strong magnet but liquid nitrogen is not?
[O₂ has two unpaired electrons → paramagnetic; N₂ has all paired electrons → diamagnetic; χ(O₂) > 0; χ(N₂) < 0]

**B2:** A transformer core should be made of soft or hard magnetic material? Why?
[Soft — low coercive field H_c, low hysteresis loss; core needs to be easily magnetised/demagnetised each AC cycle; hard material would waste energy in hysteresis]

**B3:** The Curie constant of iron is C = 750 K. At what temperature does χ_m = 1 if Curie law applies?
[χ_m = C/T = 1 → T = 750 K. But note: iron's Curie temperature is 1043 K; above that it's paramagnetic. So at T=750K iron is still ferromagnetic — Curie law applies only in the paramagnetic regime. Valid answer acknowledges this caveat.]

---

### Probe Set C — Mastery Gate [P91]
**C1 (Multi-step):** Explain, with reference to atomic physics, why (a) bismuth is diamagnetic; (b) oxygen is paramagnetic; (c) iron is ferromagnetic; (d) iron above 1043 K is not ferromagnetic.
[(a) All electrons paired → no permanent moment; applied B induces opposing moment (Lenz). (b) Two unpaired electrons in O₂ → permanent moment; thermal disorder prevents full alignment. (c) Exchange interaction between Fe 3d electrons forces parallel spin alignment within domains; χ_m ~ 10⁵. (d) Thermal energy kT > exchange energy → domain structure collapses → reverts to paramagnetic behaviour.]

**C2 (Application):** A motor designer wants to maximise stored magnetic energy per unit volume in a permanent magnet. Should she choose high B_r or high H_c? What product characterises permanent magnet quality?
[Maximum energy product = (BH)_max — the area of the largest rectangle that fits inside the second quadrant of the hysteresis loop. High B_r and high H_c both contribute. NdFeB has (BH)_max ≈ 400 kJ/m³ — currently the best permanent magnet material.]

---

## Component 5 — Retrieval & Spacing Schedule

```yaml
retrieval_events:
  - offset: "+10 min"
    type: free_recall [P62]
    prompt: "Without notes: name the three classes of magnetic materials, give one example each, and state the sign of χ_m for each."
  - offset: "+1 day"
    type: retrieval_quiz [P36]
    prompt: "What is a magnetic domain? What happens to domains when (a) B is applied, (b) B is removed from a hard magnet, (c) temperature exceeds T_C?"
  - offset: "+4 days"
    type: interleaved [P33]
    prompt: "Why can't a bar magnet be cut to separate its poles? How does this relate to Gauss's law for magnetism?"
  - offset: "+10 days"
    type: application [P91]
    prompt: "Design task: choose between soft iron and AlNiCo alloy for (a) transformer core, (b) compass needle, (c) MRI shim coil. Justify each in terms of B_r, H_c, and hysteresis."
```

---

## Component 6 — Session Flow Script

```
[P01 — Session open]
"Today we'll answer: why does iron stick to magnets but copper doesn't? By the end you'll classify any material's magnetic behaviour from its electron structure and choose the right magnetic material for engineering applications."

[P41 — Diagnostic]
"Name three metals. Are they all attracted to a magnet?"
→ If student names copper or aluminium as magnetic: deploy MC-ALL-METALS-ARE-MAGNETIC immediately.
→ If correct: "Good — what makes iron special compared to copper?"

[P06 — Concrete anchor]
"Every atom is a tiny bar magnet (electron spin). In most materials, these tiny magnets cancel in pairs — net zero. In iron, quantum mechanics forces neighbouring spins to align, creating 'magnetic armies' called domains. A whole domain cooperates like one giant magnet."

[TA-1 — Three classes of magnetic behaviour: Block 1-B]
"Diamagnetic (χ<0), paramagnetic (χ>0, small), ferromagnetic (χ>>1). Give one example, one mechanism, one magnitude for each."

[P28 — Conflict evidence for MC-CUTTING-A-MAGNET-GIVES-SEPARATE-N-AND-S-POLES]
"∮B·dA = 0 — no magnetic monopoles. Cut a magnet: both pieces have N and S. Cut again: still N and S. Down to a single electron spin: still a dipole. No experiment has ever found a magnetic monopole in 150 years of searching."

[P51 — Check-in]
"Classify: (a) copper (b) oxygen gas (c) iron below 770°C. Justify briefly."

[TA-2 — Domains and hysteresis: Block 1-C]
"Walk through hysteresis loop: saturation → remanence → coercive field. Hard vs. soft materials."

[TA-3 — WE-2: hysteresis loop analysis for material selection]

[P52 — Narrow]
"Two key contrasts only: soft (low H_c, easy cycling → transformers) vs. hard (high H_c, high B_r → permanent magnets). Everything else is detail."

[TA-4 — Curie law and WE-3]

[P62 — Retrieval seed]
"Write from memory: three classes, χ_m sign, domain concept, hysteresis key parameters, Curie law."

[P36 — Mastery probe — Probe C1]

[P68 — Close]
"Magnetic behaviour comes from electron spin structure. Ferromagnetism = domain alignment = hysteresis. χ_m values: diamagnetic < 0; paramagnetic = small positive; ferromagnetic >> 1. Material choice depends on H_c: soft for cycling, hard for permanent."

[P85 — Regulation tail]
"Clearest point? Shakiest point?"

[P89 — Retrieval schedule]
"Return tomorrow: domain behaviour question at +1 day."
```

---

## Component 7 — Adaptive Branching

| Signal | Branch |
|--------|--------|
| Probe A1 wrong (picks χ_m sign) | Clarify: all three classes have non-zero χ_m; only ferromagnets have domains |
| Probe B1 wrong (oxygen) | Explain O₂ electronic structure: two unpaired electrons in π* orbitals (Hund's rule) |
| Probe B2 wrong (hard for transformer) | Calculate hysteresis loss: area × frequency = watts; high H_c wastes energy each cycle |
| Probe C1(d) incomplete | Stress: kT > J_exchange (exchange integral) → random orientation → domain collapse |
| Student asks about ferrimagnetism/antiferromagnetism | Flag as enrichment: antiparallel alignment (MnO) reduces net moment; ferrimagnetism (ferrites): unequal antiparallel sublattices; still magnetically useful |

---

## Component 8 — Visualisation Specification

**Primary visual:** Three-panel atomic moment diagram — (i) diamagnetic: no arrows initially; applied B_ext induces tiny opposing arrows; (ii) paramagnetic: random arrow orientations; applied B_ext partially aligns; (iii) ferromagnetic: clustered domains with aligned arrows; applied B_ext grows aligned domains; labels: χ_m values for each class.

**Secondary visual:** Hysteresis loop — B vs. H curve; label saturation B_s, remanence B_r, coercive field H_c; shade the loop area (= energy loss/cycle); overlay: narrow loop (soft material) vs. wide loop (hard material) on same axes.

**Tertiary visual:** Domain structure sequence — unmagnetised sample (random domains, net M=0); partially magnetised (domain walls shift, aligned domains grow); saturated (one domain, all aligned); demagnetised after removing H (domains partially reform, residual B_r remains).

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly (phys.em.magnetic-materials)            PASS
V-2  domain derived correctly (phys.em → electromagnetism)                 PASS
V-3  difficulty number matches label (proficient → 4)                      PASS
V-4  bloom verb matches level (understand → classify/explain)              PASS
V-5  prerequisites listed in KG (phys.em.magnetic-field)                   PASS
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
