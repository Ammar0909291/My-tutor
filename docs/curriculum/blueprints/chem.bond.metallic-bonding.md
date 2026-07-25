# chem.bond.metallic-bonding — Metallic Bonding

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.bond.metallic-bonding` |
| Domain | Chemical Bonding |
| Requires | `chem.period.modern-periodic-law` |
| Unlocks | `chem.solid.crystal-systems`, `chem.solid.properties` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Metallic bonding is modeled as a lattice of positive metal cations immersed in a delocalized "sea" of mobile valence electrons, non-directional and unlike covalent bonding's specific, localized electron-pair bonds between fixed atom pairs — this non-directional delocalization directly explains malleability (the lattice can deform without breaking any specific bond, since electrons simply redistribute) and electrical conductivity (mobile electrons carry current even in the liquid state, since melting only disrupts the rigid cation lattice, not electron mobility); metallic bond strength (and resulting melting point) generally increases with more delocalized valence electrons, but this simple counting rule holds cleanly only within a given block (s/p-block, like period 3) and fails for transition metals, where d-electrons also contribute variably to the delocalized sea.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Hammering a sheet of metal flat (malleable, doesn't shatter) versus striking a piece of diamond or quartz (a covalent network solid, which shatters along cleavage planes).

**Representational**: A "sea of electrons" diagram — cations arranged in a regular lattice, with a diffuse, unstructured electron cloud surrounding and permeating the whole structure, contrasted with a covalent-bond diagram showing specific, localized bond lines between atom pairs.

**Abstract**: The distinction between directional, localized covalent bonds (breakable, causing brittleness) and non-directional, delocalized metallic bonding (deformable without breaking, causing malleability); the recognition that electron mobility (not ion mobility) is what makes metals conductive, even in the liquid state.

**Transfer**: Given an unfamiliar metal or alloy's properties (melting point, conductivity, malleability), correctly reasoning about the underlying electron-sea structure — including recognizing when simple valence-electron counting fails (as it does for transition metals).

## 3. Why Beginners Fail

Students collapse metallic bonding into a variant of covalent bonding, since both models involve "shared" electrons, missing the crucial directional-versus-non-directional distinction that explains malleability versus brittleness; they incorrectly pattern-match from ionic compounds (which genuinely do lose conductivity as rigid solids and gain it upon melting, since ionic solids rely on mobile ions) onto metals, assuming metals must LOSE conductivity when melted, when in fact metallic conductivity relies on mobile electrons, which remain mobile in the liquid state; and they overextend the correct "more valence electrons, stronger bond" heuristic (valid within a block like period 3's s/p metals) universally across all metals, missing that transition metals' d-electrons contribute unpredictably, breaking simple valence-electron-count comparisons across block boundaries.

## 4. Misconception Library

### MC-1: Metallic bonding is a form of covalent bonding
- **Probe**: "How does metallic bonding differ from covalent bonding? Why can metals be hammered flat but covalent network solids like diamond shatter?"
- **Characteristic phrase**: "Metallic bonding is covalent bonding across the whole metal crystal."
- **Trigger (Type 3, language contamination)**: Both models involve electrons associated with multiple nuclei, and the "sharing" language used for both leads students to collapse the distinction between them.
- **Conflict evidence [P28]**: Covalent bonds are directional and localized between specific pairs of atoms — stretching or re-angling them breaks the bond, which is why covalent network solids like diamond are brittle and shatter along cleavage planes; metallic bonds are fundamentally non-directional — the delocalized electrons aren't tied to specific atom pairs, so when the metal lattice deforms under stress, the electron sea simply redistributes and re-establishes everywhere without any specific bond ever being broken, which is why metals are malleable rather than brittle.
- **Bridge [P30]**: The key structural difference — localized, pairwise, directional bonds (covalent) versus a diffuse, non-directional, whole-lattice electron sea (metallic) — is exactly what determines the very different mechanical behaviors (brittle shattering versus malleable deformation) of the two bonding types.
- **Replacement [P31]**: Metallic bonding is a genuinely distinct bonding model from covalent bonding, characterized by non-directional delocalization across an entire lattice, not localized electron-pair sharing between specific atom pairs.
- **Discrimination pairs [P33]**: Diamond (covalent network, brittle, shatters when bonds break) vs. a metal sheet (metallic bonding, malleable, deforms without any bond breaking).
- **S6 repair path**: Directly connect the mechanical behavior difference (brittle vs. malleable) back to the directional-vs-non-directional structural distinction.

### MC-2: Metals lose conductivity when melted
- **Probe**: "Liquid mercury at room temperature is used in electrical switches. Why can it conduct electricity?"
- **Characteristic phrase**: "When sodium melts, the electron sea collapses so it stops conducting."
- **Trigger (Type 1, overgeneralization)**: Students correctly learn the ionic-compound pattern (solid ionic compounds don't conduct because ions are fixed; molten ionic compounds do conduct because ions become mobile) and incorrectly apply the same solid-vs-liquid logic backwards to metals, assuming a metal's conductivity mechanism must similarly depend on some structure that's lost upon melting.
- **Conflict evidence [P28]**: Metals conduct electricity because of MOBILE ELECTRONS, not mobile ions — melting a metal breaks apart the rigid cation lattice's fixed positions, but the delocalized valence electrons remain fully mobile in the liquid state, so liquid metals remain excellent conductors; mercury, liquid at room temperature, is a well-known highly conductive metal used precisely because of this property.
- **Bridge [P30]**: The ionic-compound pattern (solid = no conduction, liquid = conduction) is specifically about ION mobility being unlocked by melting — metals never relied on ion mobility for conductivity in the first place, so melting has no analogous effect on their conduction mechanism.
- **Replacement [P31]**: Metallic conductivity depends on electron mobility, which is present in both the solid and liquid states — melting a metal does not disrupt conductivity the way it enables conductivity in ionic compounds.
- **Discrimination pairs [P33]**: Solid ionic compound (no conduction, ions fixed) vs. molten ionic compound (conducts, ions mobile) vs. solid metal (conducts, electrons mobile) vs. molten metal (still conducts, electrons still mobile) — metals conduct in both phases, unlike ionic compounds.
- **S6 repair path**: Present the mercury example directly as a concrete, familiar counterexample to the "melting kills metallic conductivity" claim.

### MC-3: More valence electrons always means stronger metallic bond
- **Probe**: "Predict the relative melting points of Na, Mg, and Al. Is the trend the same for all metals across period 3?"
- **Characteristic phrase**: "Al always has stronger metallic bonding than Fe because Al has 3 valence electrons and Fe has 2 [counting only 4s²]."
- **Trigger (Type 1, overgeneralization of the "more electrons = stronger" heuristic)**: Students correctly learn that more delocalized electrons strengthens the metallic bond (raising melting point) within period 3's s/p metals (Na < Mg < Al, roughly 1, 2, 3 delocalized electrons with similar atomic radii), and extend this counting rule universally across all metals, including transition metals.
- **Conflict evidence [P28]**: For period 3's s/p metals, Na < Mg < Al is roughly correct because these elements have similar atomic radii and a clean 1/2/3 valence-electron count; but transition metals also contribute d-electrons to the delocalized sea — iron contributes up to 8 electrons (2 from 4s plus 6 from 3d), giving it a much higher melting point (1538°C) than aluminium (660°C), directly contradicting a naive count based on only the outermost s-subshell.
- **Bridge [P30]**: The simple valence-electron-count heuristic implicitly assumes a fair, like-for-like comparison (similar block, similar atomic radius, similar electron types contributing) — it breaks down specifically when crossing into d-block metals, where additional d-electrons, variable atomic radii, and crystal structure differences all complicate the simple counting picture.
- **Replacement [P31]**: The valence-electron-count heuristic reliably predicts relative metallic bond strength only within a consistent block/region (like period 3's s/p metals); comparing across blocks (especially into the d-block) requires accounting for d-electron contributions and other structural factors, not simple outer-shell electron counting.
- **Discrimination pairs [P33]**: Na/Mg/Al comparison (same block, clean valence-count trend holds) vs. Al/Fe comparison (different blocks, d-electron contribution breaks the naive count).
- **S6 repair path**: Present Fe's full electron contribution (4s² plus 3d⁶ = up to 8 electrons) alongside its measured melting point, directly contradicting the naive s-subshell-only count.

## 5. Explanation Library

**Primary explanation**: Metallic bonding is modeled as a regular lattice of positive metal ions immersed in a "sea" of delocalized valence electrons, not tied to any specific pair of atoms. This non-directional character (unlike covalent bonding's localized, directional electron-pair bonds) explains why metals are malleable — deforming the lattice doesn't require breaking any specific bond, since the electron sea simply redistributes to accommodate the new shape.

**Secondary explanation (conductivity and strength framing)**: Metallic conductivity comes from the mobility of the delocalized electrons themselves, which persists in both solid and liquid states — unlike ionic compounds, where conductivity specifically requires the mobility of ions, unlocked only upon melting. Metallic bond strength (reflected in melting point) generally increases with more delocalized electrons, but this simple counting rule is reliable only within a consistent block of the periodic table — transition metals' additional d-electron contributions make cross-block comparisons unpredictable using electron count alone.

## 6. Analogy Library

- **Primary analogy**: A crowd of people (cations) standing in a loose, deformable formation, all sharing a diffuse "cloud" of connecting energy (delocalized electrons) rather than being tied to specific handshake partners (localized covalent bonds) — the crowd can shift and reshape (malleability) without anyone's grip having to be individually broken.
- **Breaking point**: The crowd analogy conveys non-directionality and malleability well but doesn't naturally capture why conductivity survives melting — that needs the explicit electron-mobility-versus-ion-mobility distinction.
- **Anti-analogy**: Do NOT describe metallic bonding as "many small covalent bonds throughout the metal" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (malleability comparison)**: Compare hammering a piece of metal foil (deforms smoothly) against attempting to deform a piece of a brittle covalent network solid (shatters), connecting the mechanical difference directly to bonding structure.
- **Demonstration 2 (liquid mercury conductivity)**: Present or demonstrate mercury's real-world use in electrical switches as direct evidence that a liquid metal remains highly conductive.

## 8. Discovery Lesson

**Opening**: "You can hammer a piece of gold into a thin sheet without it cracking. Could you do the same to a piece of quartz or diamond?"

**Exploration**: Students compare the two materials' bonding structures (localized covalent bonds vs. delocalized electron sea) and connect the structural difference to the observed mechanical behavior.

**Synthesis**: Guide toward: non-directional bonding allows deformation without breaking, which is the structural root of malleability, fundamentally different from covalent bonding's directional, breakable bonds.

**Closure**: "If metallic conductivity comes from mobile electrons, not mobile ions, does melting a metal actually have to destroy its conductivity?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the malleable-metal-versus-brittle-covalent-solid comparison directly, connecting structure to mechanical behavior.
- **TA-2 (TELL)**: State explicitly that metallic conductivity depends on electron mobility, not ion mobility, immediately followed by the mercury counterexample.
- **TA-3 (DO)**: Student predicts and explains the Na/Mg/Al melting point trend using valence-electron counting.
- **TA-4 (TEST-THINKING)**: Present MC-3's Al-vs-Fe probe and ask the student to identify why the naive valence-electron count fails across the block boundary.

## 10. Voice Teaching

When introducing metallic bonding, immediately contrast it with covalent bonding by name — "unlike covalent bonds, which are directional and localized, metallic bonds are non-directional" — before describing any properties. When discussing melting-point trends, explicitly flag the block-boundary caveat: "this counting rule works within a block, but crossing into transition metals adds d-electrons that break the simple count."

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain malleability using the non-directional/delocalized bonding structure, (b) correctly explain why metals remain conductive when melted, (c) correctly identify when simple valence-electron counting fails to predict relative metallic bond strength (across block boundaries).

- **FA-1**: "How does metallic bonding differ from covalent bonding? Why can metals be hammered flat but covalent solids shatter?" — targets MC-1.
- **FA-2**: "Liquid mercury conducts electricity. Why?" — targets MC-2.
- **FA-3**: "Predict the melting points of Na, Mg, Al. Does the same valence-electron-counting trend apply to Fe?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students who've just learned the ionic-compound solid/liquid conductivity pattern and are transferring it directly.

**Delayed retrieval**: Re-probe MC-3's block-boundary caveat before `chem.solid.properties` discusses metal and alloy properties broadly, including transition-metal examples where the naive valence-count heuristic would mislead.

## 12. Recovery Notes

- **S3 (stuck)**: For the covalent-conflation confusion, return to the mechanical-behavior contrast (malleable vs. brittle) as the most concrete, testable distinguishing evidence.
- **S4 (frustrated)**: Normalize — the ionic-compound solid/liquid conductivity pattern is genuinely well-taught and memorable, making its incorrect transfer to metals a very common, reasonable error.
- **S6 (collision)**: Use the mercury conductivity example for MC-2; use the Fe electron-contribution breakdown for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why melting affects ionic-compound conductivity very differently from metallic conductivity.

## 13. Memory & Review

Tag as a conceptual-correction memory (directional vs. non-directional bonding; electron vs. ion mobility; block-boundary counting caveat). Schedule a spaced check at ~1 week and again before `chem.solid.properties`.

## 14. Transfer Map

Feeds directly into `chem.solid.crystal-systems` (metallic lattice packing structures build on the electron-sea model) and `chem.solid.properties` (bulk metal and alloy properties, including transition-metal examples, directly extend and test this concept's bond-strength reasoning).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
