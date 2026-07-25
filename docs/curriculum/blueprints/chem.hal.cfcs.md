# chem.hal.cfcs — Polyhalogen Compounds and CFCs

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.hal.cfcs` |
| Domain | Haloalkanes |
| Requires | `chem.hal.introduction` |
| Unlocks | (none) |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.7 |
| Estimated Hours | 2 |

## 1. Concept Spine

Fluorine-containing compounds do NOT necessarily deplete ozone just because fluorine is "similar to chlorine" — HFCs (hydrofluorocarbons, containing only fluorine, no chlorine) have essentially ZERO ozone depletion potential, because fluorine radicals react extremely rapidly with stratospheric water vapor to form stable HF (F•+H₂O→HF+OH•), which is NOT regenerated from reservoir species the way Cl• is — chlorine specifically is the ozone-depleting atom due to its distinct catalytic Cl/ClO cycle chemistry and reservoir-release mechanism, not a general "halogen" property; Cl• is NOT "used up" after destroying one ozone molecule — it is genuinely REGENERATED in the catalytic cycle (Cl•+O₃→ClO•+O₂, then ClO•+O→Cl•+O₂, net: O₃+O→2O₂ with Cl• unchanged), meaning a single Cl• atom destroys ozone repeatedly (~10⁵ times) before eventual termination into reservoir species — "one CFC molecule destroys one O₃" drastically underestimates the catalytic amplification; and CCl₄, despite having FOUR polar C–Cl bonds, is genuinely NONPOLAR (μ=0) — its perfect tetrahedral symmetry (4 equivalent C–Cl bonds at 109.5°) means the four individual bond-dipole vectors point toward the tetrahedron's vertices and EXACTLY CANCEL by symmetry — molecular polarity requires BOTH polar bonds AND an asymmetric arrangement; CCl₄ has the former but not the latter, identical logic to CO₂'s cancellation in its linear geometry.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Tracing the explicit fate of a fluorine radical (F•+H₂O→HF, non-catalytic, terminated) alongside a chlorine radical's fate (Cl•+O₃→ClO•+O₂→Cl•+O₂, catalytic, regenerated), directly contrasting the two halogens' stratospheric chemistry.

**Representational**: A full Cl/ClO catalytic cycle diagram with arrows showing Cl• consumed in step 1 and regenerated in step 2, net effect O₃+O→2O₂ with Cl• unchanged, looping repeatedly.

**Abstract**: The general principle that "similar element category" (halogen) does not guarantee similar environmental/catalytic behavior — the specific reaction pathways available to each halogen determine its actual impact; the general principle that a catalyst is regenerated, not consumed, over a complete cycle, allowing repeated action; the general principle that molecular polarity requires both polar bonds AND asymmetric geometry, with symmetric arrangements canceling bond dipoles entirely.

**Transfer**: Given an unfamiliar halogenated compound, correctly assessing its actual ozone-depletion potential from its specific atmospheric chemistry, never from halogen-category membership alone; given an unfamiliar catalytic cycle, correctly tracking whether a species is genuinely consumed or regenerated over the complete cycle; given an unfamiliar symmetric polyhalogenated molecule, correctly predicting overall nonpolarity from bond-dipole vector cancellation.

## 3. Why Beginners Fail

Students, knowing that CFCs (containing chlorine) deplete the ozone layer, generalize this ozone-depleting property to any halogen-containing compound, including HFCs (containing only fluorine), missing that the specific atmospheric chemistry differs dramatically between the two halogens — fluorine radicals are rapidly and essentially irreversibly converted to stable HF upon reaction with stratospheric water vapor, terminating any potential catalytic cycle immediately, while chlorine radicals participate in a genuine, repeating catalytic destruction cycle; students, seeing that Cl• reacts with and consumes ozone in the first step of the depletion mechanism, conclude the chlorine atom is "used up" after this single reaction, missing that a SECOND step in the mechanism (ClO•+O→Cl•+O₂) regenerates the original Cl• species, meaning the overall process is CATALYTIC — a single chlorine atom can destroy tens of thousands of ozone molecules before any permanent removal (termination) occurs; and students, correctly identifying that each individual C–Cl bond in CCl₄ is polar (due to the electronegativity difference between C and Cl), assume this must translate directly into an overall polar MOLECULE, missing that molecular-level polarity depends on the VECTOR SUM of all individual bond dipoles, and CCl₄'s perfectly symmetric tetrahedral geometry causes these four individual bond-dipole vectors to exactly cancel, producing a net molecular dipole of zero despite every individual bond being genuinely polar.

## 4. Misconception Library

### MC-1: Any compound with fluorine depletes the ozone layer because fluorine is similar to chlorine
- **Probe**: "HFCs (hydrofluorocarbons) contain only fluorine, no chlorine. Do they deplete ozone?"
- **Characteristic phrase**: "F is a halogen like Cl, so HFCs also cause ozone depletion."
- **Trigger (Type 1, overgeneralization)**: Overgeneralization from category membership (both halogens) to shared specific chemical behavior (ozone depletion), without checking the actual reaction pathways.
- **Conflict evidence [P28]**: OZONE DEPLETION by halogens is almost entirely caused by CHLORINE radicals (and bromine radicals from halons). Fluorine radicals do form from HFCs, but F• reacts with water vapour in the stratosphere extremely rapidly to form HF, which does NOT react catalytically with ozone. F•+H₂O→HF+OH•; HF is not regenerated (unlike Cl•) from reservoir species on cloud particles. The ozone depletion potential (ODP) of HFCs is effectively ZERO. Chlorine is the key atom, not fluorine per se, because of the specific chemistry of the Cl/ClO catalytic cycle and the reservoir-release mechanism on polar stratospheric cloud particles.
- **Bridge [P30]**: Being classified in the same broad category (halogen) guarantees only shared BASIC atomic properties (like forming a single covalent bond, similar general reactivity patterns), not identical behavior in every SPECIFIC chemical context — ozone depletion specifically depends on a halogen radical's ability to participate in a repeating catalytic cycle, which in turn depends on the specific fate of that radical once formed (whether it forms a reversibly-releasable reservoir species or an essentially permanent, unreactive product like HF) — this specific behavior genuinely differs between chlorine and fluorine, despite their shared halogen classification.
- **Replacement [P31]**: Ozone depletion potential depends on a halogen's specific atmospheric chemistry (whether it forms a catalytically-active, reservoir-releasable species), not merely its halogen-category membership — HFCs (fluorine only) have essentially zero ODP, genuinely different from CFCs (chlorine-containing).
- **Discrimination pairs [P33]**: Chlorine radical (forms reversible reservoir species, participates in catalytic ozone destruction) vs. fluorine radical (forms stable, non-regenerated HF, essentially zero ozone impact) — same halogen category, dramatically different atmospheric behavior.
- **S6 repair path**: Present the explicit fate comparison for F• and Cl•, deriving the ODP difference from the differing reaction pathways.

### MC-2: Cl• is used up in the first step of ozone destruction, so each CFC molecule only destroys one O₃
- **Probe**: "After Cl• reacts with O₃ to give ClO• and O₂, what happens to the ClO•?"
- **Characteristic phrase**: "Cl• attacks ozone and then it's gone — consumed."
- **Trigger (Type 5, instruction-induced)**: Focusing only on the first mechanistic step (where Cl• is indeed consumed) without following through to the second step, which regenerates it.
- **Conflict evidence [P28]**: The Cl• is REGENERATED. Step 1: Cl•+O₃→ClO•+O₂ (Cl• consumed, ClO• formed). Step 2: ClO•+O→Cl•+O₂ (ClO• consumed, Cl• REGENERATED). Net: O₃+O→2O₂; Cl• unchanged. Cl• is a CATALYST — it is not consumed in the overall reaction. The net effect is pure ozone destruction; Cl• goes around the cycle repeatedly (~10⁵ times) until a termination step converts it to a reservoir species (HCl, ClONO₂). The "one CFC→one O₃" idea misses the catalytic amplification entirely.
- **Bridge [P30]**: Judging whether a species is "consumed" by examining only a SINGLE step of a multi-step mechanism can be misleading — the correct assessment requires tracking that species through the ENTIRE cycle to its conclusion, and in this case, while Cl• genuinely IS consumed in step 1, it is equally genuinely REGENERATED in step 2, making the NET effect over the complete two-step cycle a catalytic process where Cl• itself experiences zero net change, despite undergoing real, intermediate transformations along the way.
- **Replacement [P31]**: Cl• acts as a genuine catalyst in ozone destruction — regenerated in the second mechanistic step after being consumed in the first, allowing a single Cl• atom to destroy ozone repeatedly (~10⁵ times) before eventual termination, never assume "one CFC destroys one O₃."
- **Discrimination pairs [P33]**: Single-step view (Cl• consumed in step 1, appears "used up") vs. complete-cycle view (Cl• regenerated in step 2, net catalytic, repeatable ~10⁵ times) — the complete cycle reveals the true catalytic nature.
- **S6 repair path**: Present the explicit two-step catalytic cycle diagram with Cl• tracked through both steps, deriving the net-zero consumption.

### MC-3: CCl₄ (carbon tetrachloride) is polar because it has four polar C–Cl bonds
- **Probe**: "Draw the tetrahedral structure of CCl₄ and add the bond dipole vectors. What is their vector sum?"
- **Characteristic phrase**: "four C–Cl bonds must add up to a dipole."
- **Trigger (Type 2, perceptual intuition)**: Assuming that having multiple polar bonds automatically implies an overall polar molecule, without checking geometric vector cancellation.
- **Conflict evidence [P28]**: CCl₄ has perfect TETRAHEDRAL symmetry (4 equivalent C–Cl bonds at 109.5°). Each C–Cl bond is polar (δ+C, δ−Cl), but the four bond dipole vectors point toward the four vertices of a tetrahedron and EXACTLY CANCEL by symmetry. The vector sum is ZERO. μ(CCl₄)=0. The molecule is NONPOLAR despite having four polar bonds. This is the identical logic as CO₂ (two polar C=O bonds that cancel in the linear geometry). Polarity of a molecule requires both polar bonds AND an asymmetric arrangement — CCl₄ has the former but not the latter.
- **Bridge [P30]**: Molecular polarity is fundamentally a VECTOR SUM computation, not a simple "count of polar bonds present" — individual bond dipoles are vector quantities with both magnitude AND direction, and when multiple bond dipoles are arranged with sufficient geometric symmetry (as in CCl₄'s perfect tetrahedral arrangement), their directional components can cancel exactly, producing a net dipole of zero regardless of how many individual polar bonds are present or how strong each one is.
- **Replacement [P31]**: Molecular polarity requires computing the VECTOR SUM of all bond dipoles — a molecule with multiple polar bonds can still be overall nonpolar if symmetric geometry causes the individual dipole vectors to cancel, as in CCl₄.
- **Discrimination pairs [P33]**: CCl₄ (4 polar bonds, perfect tetrahedral symmetry, vectors cancel, μ=0, nonpolar) vs. an asymmetrically-substituted analog like CHCl₃ (polar bonds present but asymmetric arrangement, vectors do NOT cancel, genuinely polar).
- **S6 repair path**: Present the explicit vector-sum diagram for CCl₄'s tetrahedral geometry, deriving the exact cancellation from the symmetric bond-dipole arrangement.

## 5. Explanation Library

**Primary explanation**: A halogen's specific atmospheric ozone-depletion behavior depends on its actual reaction pathway once released as a radical, not merely its halogen-category membership — chlorine radicals participate in a genuine catalytic cycle (Cl•+O₃→ClO•+O₂, then ClO•+O→Cl•+O₂, net O₃+O→2O₂ with Cl• regenerated), allowing repeated ozone destruction (~10⁵ times per atom), while fluorine radicals form stable, non-regenerated HF, giving HFCs essentially zero ozone depletion potential.

**Secondary explanation (molecular polarity requires vector-sum cancellation assessment)**: Molecular polarity depends on the vector sum of all individual bond dipoles, not simply the count or presence of polar bonds — CCl₄'s perfect tetrahedral symmetry causes its four polar C–Cl bond dipoles to exactly cancel, producing a net nonpolar molecule despite every individual bond being genuinely polar.

## 6. Analogy Library

- **Primary analogy**: A reusable stamp (the catalytic Cl• species) that gets "inked" (consumed) in one step but is immediately "re-inked" (regenerated) in the next, allowing it to stamp thousands of documents (destroy thousands of ozone molecules) before ever running dry (terminating into a reservoir species).
- **Breaking point**: The reusable-stamp analogy conveys the catalytic-regeneration concept for Cl• well but doesn't naturally capture the fluorine-vs-chlorine atmospheric-fate distinction (MC-1) or the vector-cancellation concept for CCl₄'s polarity (MC-3) — those need the explicit fate-comparison diagram and the vector-sum diagram.
- **Anti-analogy**: Do NOT say "any halogen radical destroys ozone the same way chlorine does" — this directly reinforces MC-1 by ignoring the specific, differing atmospheric fate of each halogen.

## 7. Demonstration Library

- **Demonstration 1 (F•-vs-Cl• stratospheric-fate comparison)**: Present both radical fates explicitly, deriving the ODP difference from the differing reaction pathways.
- **Demonstration 2 (full Cl/ClO catalytic cycle diagram)**: Present the explicit two-step cycle with Cl• tracked through both steps, deriving net-zero consumption.
- **Demonstration 3 (CCl₄ tetrahedral vector-sum diagram)**: Present the explicit bond-dipole vector diagram, deriving the exact cancellation from symmetric geometry.

## 8. Discovery Lesson

**Opening**: "CFCs deplete the ozone layer. Do HFCs, which contain fluorine instead of chlorine, do the same thing?"

**Exploration**: Students trace the differing stratospheric fates of F• and Cl•, discovering HFCs have essentially zero ozone depletion potential.

**Synthesis**: Guide toward: a halogen's specific atmospheric chemistry, not its category membership alone, determines its ozone-depleting behavior.

**Closure**: "Does CCl₄'s four polar C–Cl bonds make the whole molecule polar?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit F•-vs-Cl• stratospheric-fate comparison.
- **TA-2 (TELL)**: State the catalytic (regenerated, never consumed) nature of Cl• explicitly, anchored to the full cycle diagram.
- **TA-3 (DO)**: Student computes the vector sum for an unfamiliar symmetric polyhalogenated molecule to predict overall polarity.
- **TA-4 (TEST-THINKING)**: Present the ClO•-fate probe and ask the student to justify why Cl• is catalytic, not consumed.

## 10. Voice Teaching

Whenever a halogen's environmental impact is assessed, narrate "check the specific atmospheric fate — halogen category alone doesn't determine ozone impact." Whenever molecular polarity is assessed, state "compute the vector sum — multiple polar bonds can still cancel to zero" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly distinguish fluorine's and chlorine's differing ozone-depletion potential from their specific atmospheric chemistry, (b) correctly explain Cl•'s catalytic (regenerated) role in ozone destruction, (c) correctly predict CCl₄'s nonpolarity from vector-sum cancellation.

- **FA-1**: "HFCs contain only fluorine, no chlorine. Do they deplete ozone?" — targets MC-1.
- **FA-2**: "After Cl• reacts with O₃ to give ClO• and O₂, what happens to the ClO•?" — targets MC-2.
- **FA-3**: "Draw the tetrahedral structure of CCl₄ and add the bond dipole vectors. What is their vector sum?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who default to "same halogen category, same environmental behavior" without exposure to the differing atmospheric chemistry.

**Delayed retrieval**: Re-probe MC-1's atmospheric-chemistry-specific ODP reasoning and MC-2's catalytic-regeneration mechanism as foundational knowledge for subsequent environmental and atmospheric chemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the halogen-category overgeneralization, have the student explicitly trace the specific radical's fate before concluding anything about ozone impact.
- **S4 (frustrated)**: Normalize — assuming all halogens behave identically in the atmosphere is genuinely common on first exposure, since they share the same periodic-table category.
- **S6 (collision)**: Use the explicit full catalytic cycle diagram for MC-2; use the vector-sum diagram for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a single Cl• atom can destroy ~10⁵ ozone molecules.

## 13. Memory & Review

Tag as one conceptual-correction memory (atmospheric-chemistry-specific, not category-based, ozone depletion) plus two conceptual-correction memories (catalytic Cl• regeneration; vector-sum molecular polarity assessment). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates haloalkane-introduction reasoning built across `chem.hal.introduction`, forming a capstone application to environmental and atmospheric chemistry contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
