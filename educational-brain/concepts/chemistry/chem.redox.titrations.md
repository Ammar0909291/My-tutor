# Redox Titrations — `chem.redox.titrations`

## Identity
- **KG ID**: chem.redox.titrations
- **Subject**: chemistry
- **Domain**: chem.redox
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.redox.balancing, chem.found.concentration
- **Unlocks**: chem.anal.volumetric

## Learning Objective
Plan and calculate redox titrations using permanganate, dichromate, and iodine/thiosulfate systems; write and use balanced redox equations for stoichiometric calculations; identify the correct indicator and endpoint for each titration type.

## Core Understanding
Redox titrations use the stoichiometry of a balanced redox equation — exactly like acid-base titrations use the molar ratio from a neutralisation equation — to determine the concentration or amount of an analyte.

**KMnO₄ (permanganate) titrations**:
- Self-indicating: MnO₄⁻ is PURPLE; reduced product Mn²⁺ is NEARLY COLOURLESS. No separate indicator needed. The endpoint is the FIRST PERMANENT PALE PINK colour that persists for 30 seconds (the pale pink = very dilute MnO₄⁻ that is not yet reduced).
- Must be ACIDIFIED with dilute H₂SO₄ (NOT HCl — Cl⁻ is oxidised by MnO₄⁻, giving a false result; NOT HNO₃ — is an oxidising acid that can oxidise the analyte). H₂SO₄ provides H⁺ needed for the half-reaction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O.
- Stoichiometry example (Fe²⁺ in acidified solution): MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Ratio 1:5 (MnO₄⁻:Fe²⁺).
- C₂O₄²⁻ (oxalate) titration: 2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O. Ratio 2:5. Reaction is SLOW at room temperature; warm to 60–70°C (NOT boiling — CO₂ would carry vapour away; oxalate would decompose). The reaction is autocatalytic (Mn²⁺ produced catalyses its own further formation — initial drops are slow, then the reaction accelerates).
- H₂O₂ titration: 2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O. Ratio 2:5.

**K₂Cr₂O₇ (dichromate) titrations**:
- Not self-indicating: Cr₂O₇²⁻ is orange; Cr³⁺ is green. Endpoint not visually sharp. Requires diphenylamine (or barium diphenylamine sulphonate) indicator — changes from colourless to violet/purple at endpoint.
- Also requires acidification with H₂SO₄.
- Stoichiometry: Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O. Ratio 1:6.
- Advantage: K₂Cr₂O₇ is a primary standard (can be weighed accurately; does not absorb CO₂ or moisture); KMnO₄ is NOT a primary standard (it is mildly oxidising on its own standing solution, especially in the presence of organic matter or Mn²⁺ catalysis — must be standardised against a primary standard like sodium oxalate).

**Iodometric titrations** (I₂ liberated, thiosulfate used):
- Procedure: add excess KI to the analyte (e.g. Cu²⁺ or Cl₂ or O₃); the analyte oxidises I⁻ to I₂; the I₂ liberated is then titrated with sodium thiosulfate (Na₂S₂O₃).
- The thiosulfate reaction: 2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻. Ratio 2:1 (thiosulfate:I₂).
- Example — Cu²⁺ determination: 2Cu²⁺ + 4I⁻ → 2CuI + I₂. Then I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻.
- Indicator: starch solution — forms a DEEP BLUE/BLACK complex with I₂. Added near the endpoint (when solution is PALE STRAW YELLOW — not at the start, because the intense starch-iodine colour is reversible but sluggish when [I₂] is high, giving a premature apparent endpoint). Endpoint: blue→colourless.

**Iodimetric titrations**: I₂ solution used DIRECTLY as the titrant against a reducing agent (e.g. vitamin C / ascorbic acid; As₂O₃). Starch indicator added from the start. Endpoint: colourless→permanent pale blue.

**Back titrations**: add a KNOWN EXCESS of oxidising agent; after the reaction is complete, titrate the EXCESS against a standard reducing agent. Used when the direct reaction is slow or the analyte cannot be titrated directly.

**Stoichiometric calculation workflow**:
1. Write and balance the redox equation (or use the provided one).
2. From the volume and concentration of the titrant, calculate moles of titrant used.
3. From the mole ratio in the balanced equation, calculate moles of analyte.
4. Convert moles of analyte to the required quantity (concentration, mass, percentage purity).

## Mental Models
**The redox titration as a molecular handshake**: at the stoichiometric point, every electron that leaves the analyte has been received by the titrant. The endpoint indicator (self-indicating colour change or external indicator) signals when all the electrons have been "shaken hands" — not one more than needed.

**The layered workflow for iodometric titrations**: think of two sequential reactions. Layer 1: analyte → I₂ (quantity of I₂ = proxy for the analyte, via the first mole ratio). Layer 2: I₂ + thiosulfate → end (quantity of I₂ from the volume/concentration of thiosulfate, via the second mole ratio). Always work BACKWARDS: thiosulfate → I₂ → analyte.

## Why Students Fail
Students apply the same mole ratio (1:1) to every titration as they learned for acid-base reactions. Redox titrations have large non-1:1 ratios (1:5 for MnO₄⁻/Fe²⁺, 1:6 for Cr₂O₇²⁻/Fe²⁺, 2:1 for S₂O₃²⁻/I₂) and the wrong ratio makes the answer wrong by a factor of 5 or 6.

In iodometric titrations, students often skip the two-step calculation and try to directly relate thiosulfate moles to the original analyte without going through I₂ as the intermediate.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Any acid can be used to acidify a KMnO₄ titration — the acid just provides the acidic medium." Probe: "A student acidifies a KMnO₄ titration of Fe²⁺ with HCl. Would this give a correct result? Explain." Characteristic phrase: "acid is acid — use whatever is available." Intervention: HCl introduces Cl⁻, which KMnO₄ can oxidise (MnO₄⁻ + Cl⁻ → Cl₂ under some conditions), consuming additional KMnO₄ and inflating the apparent amount of Fe²⁺. ONLY dilute H₂SO₄ provides an inert acidic medium. HNO₃ is itself an oxidising acid and would also interfere. The acid choice is not arbitrary — it is a specific requirement.
- **MC-2 (Type 4 — notation-induced)**: "In the iodometric determination of Cu²⁺, the mole ratio is n(S₂O₃²⁻) : n(Cu²⁺) = 2:1 because of the thiosulfate:I₂ ratio of 2:1." Probe: "From the two equations: 2Cu²⁺ + 4I⁻ → 2CuI + I₂ and I₂ + 2S₂O₃²⁻ → products, derive the overall mole ratio of S₂O₃²⁻ to Cu²⁺." Characteristic phrase: "thiosulfate to iodine is 2:1, so thiosulfate to copper is 2:1." Intervention: combine the equations: 2 mol Cu²⁺ → 1 mol I₂ → requires 2 mol S₂O₃²⁻. Therefore n(S₂O₃²⁻) : n(Cu²⁺) = 2:2 = 1:1. The 2:1 ratio applies between thiosulfate and I₂, not between thiosulfate and Cu²⁺. Always trace through BOTH mole ratios sequentially: Cu²⁺ → I₂ (ratio from first equation) then I₂ → S₂O₃²⁻ (ratio from second equation).
- **MC-3 (Type 5 — instruction-induced)**: "Starch indicator should be added at the beginning of the iodometric titration to make the colour change easy to see throughout." Probe: "Why is starch added near the endpoint (when the solution is pale straw yellow) rather than at the start?" Characteristic phrase: "add the indicator at the start so you can track the colour from the beginning." Intervention: at the start of an iodometric titration, [I₂] is high. The starch-I₂ complex (intense blue-black) is REVERSIBLE but the reverse reaction (I₂ releases from starch) is SLOW when [I₂] is high. Adding starch early causes the endpoint to appear prematurely — the blue colour vanishes only sluggishly even after the equivalence point is passed. Wait until the solution is pale yellow (nearly all I₂ consumed) — then the small remaining [I₂] reacts rapidly with starch (sharp blue) and the endpoint (blue→colourless) is clean and reversible.

## Analogies
**Valid**: the iodometric titration as a relay race. The first runner (analyte, e.g. Cu²⁺) hands a baton (I₂) to the second runner (thiosulfate). To know how fast the first runner ran (how much Cu²⁺ was present), you clock the second runner and use BOTH runners' exchange ratios. If you only time the second runner and ignore the first exchange ratio, you get the wrong speed for the first runner.

## Demonstrations
**KMnO₄/Fe²⁺ endpoint**: titrate ammonium iron(II) sulphate solution (acidified with H₂SO₄) with KMnO₄ from a burette. The deep purple colour decolorises instantly — students are instructed to look for the FIRST drop that leaves a pale pink that persists. The self-indicating system is visually dramatic and the endpoint is easily observed.

**Starch indicator preparation**: dissolve soluble starch in boiling water → add a drop of dilute I₂ solution → deep blue colour appears instantly. Discuss the role of the iodine-triiodide-starch complex.

## Discovery Questions
1. "25.00 cm³ of FeSO₄ solution required 22.40 cm³ of 0.0200 mol dm⁻³ KMnO₄ to reach the endpoint. The equation is MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Calculate (a) moles of KMnO₄ used, (b) moles of Fe²⁺ in 25.00 cm³, and (c) the concentration of Fe²⁺."
2. "In the determination of dissolved oxygen by the Winkler method: Mn²⁺ is first oxidised to MnO₂ by dissolved O₂, then MnO₂ oxidises I⁻ to I₂ in acid, and the I₂ is titrated with thiosulfate. Write the relevant equations and derive the mole ratio of O₂ to S₂O₃²⁻."

## Teaching Sequence
1. Recap acid-base titration stoichiometry (moles = concentration × volume; mole ratio from equation).
2. KMnO₄ titrations: self-indicating; acid requirement (H₂SO₄ only); Fe²⁺ example (1:5 ratio); worked calculation.
3. KMnO₄ vs. oxalate: temperature requirement; autocatalysis observation.
4. K₂Cr₂O₇: not self-indicating; diphenylamine indicator; primary standard advantage; 1:6 ratio.
5. Iodometric titrations: two-step reaction chain; starch indicator; when to add starch; two-step calculation.
6. Iodimetric titrations: direct I₂ titration; starch from start.
7. Back titrations: excess oxidant → titrate excess.
8. Calculation practice: 3–4 problems with different mole ratios.

## Tutor Actions
- **If student uses 1:1 mole ratio**: "Stop — what is the mole ratio in the balanced equation?" Have the student write the equation, circle the coefficients, and state the ratio explicitly before touching numbers.
- **If student cannot do the two-step iodometric calculation**: draw the chain: [analyte] → [I₂] → [thiosulfate]; work right to left — calculate moles of thiosulfate first, then moles of I₂ from mole ratio 2, then moles of analyte from mole ratio 1.
- **FRAGILE sign**: can perform a single-equation calculation correctly but fails on iodometric titrations that require combining two sequential equations.

## Voice Teaching Notes
The two most common errors (wrong mole ratio; wrong acid in permanganate titrations) can be caught before a student starts a calculation. Always ask first: "What is the mole ratio?" and "What acid is used to acidify?" — these are knowledge checkpoints, not calculation steps, and they expose the most frequent errors immediately.

## Assessment Signals
- **Green**: writes balanced equations; identifies correct acid for permanganate; adds starch near endpoint not at start; performs single-equation and two-step iodometric calculations correctly.
- **Amber**: correct procedure understanding but applies incorrect mole ratio in calculation; or knows the acid must be H₂SO₄ but cannot explain why HCl fails.
- **Red**: uses HCl to acidify KMnO₄ titration; uses 1:1 mole ratio for all titrations; adds starch at the start of an iodometric titration; cannot identify which is titrant and which is analyte.
- **Probe**: "In a KMnO₄ titration of 20.00 cm³ H₂O₂ solution, 18.50 cm³ of 0.0200 mol dm⁻³ KMnO₄ was used. Equation: 2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O. Find the concentration of H₂O₂."

## Tutor Recovery Strategy
If student cannot apply the mole ratio: return to the balanced equation and count atoms explicitly. "1 mole of MnO₄⁻ gains 5 electrons; 5 moles of Fe²⁺ each lose 1 electron. Total electrons = 5 either way — that's why the ratio is 1:5." Linking the ratio to electron balance (which the student already knows) makes the mole ratio memorable rather than arbitrary.

## Memory Hooks
- **KMnO₄ rules**: "Purple → colourless (self-indicating). Dilute H₂SO₄ only — no HCl, no HNO₃. Endpoint = FIRST PERMANENT PALE PINK."
- **Mole ratios**: "MnO₄⁻:Fe²⁺ = 1:5. Cr₂O₇²⁻:Fe²⁺ = 1:6. S₂O₃²⁻:I₂ = 2:1."
- **Starch**: "Add near endpoint when solution is PALE STRAW YELLOW. Not at the start."
- **Iodometric calculation**: "Thiosulfate → I₂ → analyte. Work backwards using two mole ratios."

## Transfer Connections
- **chem.anal.volumetric**: this node provides the worked redox titration framework that chem.anal.volumetric extends to a broader range of analytical contexts including back titrations, Karl Fischer water determination, and complexometric titrations.

## Cross-Subject Connections
- **Medical diagnostics**: the iodometric principle underlies the Winkler method for measuring dissolved oxygen in water and clinical assays for oxidative biomarkers; serum iron determination uses permanganate-based methods.
- **Food science**: the iodometric method (starch indicator) is the standard test for vitamin C (ascorbic acid) content in foods and beverages — the endpoint (blue→colourless) marks the point at which all ascorbic acid has been oxidised by I₂.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.redox.titrations`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.redox.titrations` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
