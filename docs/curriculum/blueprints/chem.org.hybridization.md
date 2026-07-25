# chem.org.hybridization — Hybridization in Organic Molecules

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.org.hybridization` |
| Domain | Organic Chemistry |
| Requires | `chem.bond.hybridization` |
| Unlocks | `chem.hyd.alkanes`, `chem.org.aromaticity`, `chem.org.electronic-effects`, `chem.org.isomerism` |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 3 |

## 1. Concept Spine

Applying hybridization to organic molecules requires the same rigorous electron-domain counting established generically (a double or triple bond, however many electron pairs it contains, still occupies exactly ONE electron domain), extended to two organic-specific traps: nitrogen's lone pair can occupy either an in-plane sp²/sp³ hybrid orbital OR an unhybridized p orbital contributing to an aromatic π system, so its presence alone doesn't fix hybridization — its exact LOCATION does; and correctly counting a carbon's total electron domains (not simply "has a double bond, therefore sp²") is essential, since a carbon with TWO double bonds (as in CO₂ or allene) has only 2 electron domains, giving sp (linear), not sp².

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Determining pyridine's nitrogen hybridization by examining exactly where its lone pair sits (in-plane, not contributing to the aromatic ring) versus pyrrole's nitrogen (lone pair in the π system).

**Representational**: A side-by-side electron-domain count for the oxygen in a carbonyl (C=O) group — 1 double-bond domain + 2 lone pairs = 3 domains, sp² — contrasted with a naive miscount treating the double bond as 2 domains.

**Abstract**: The universal rule that a double or triple bond counts as exactly ONE electron domain regardless of electron-pair count, applied consistently across carbon, nitrogen, and oxygen centers in organic structures.

**Transfer**: Given an unfamiliar organic structure (including nitrogen- or oxygen-containing functional groups), correctly determining hybridization at each relevant atom using rigorous electron-domain counting, without relying on surface pattern-matching ("has N" or "has a double bond").

## 3. Why Beginners Fail

Students assume every nitrogen atom in an organic molecule is sp³ simply because nitrogen commonly has a lone pair, missing that the lone pair's specific location (hybridized in-plane orbital versus unhybridized p orbital in a π system) is what actually determines hybridization, not merely its presence; they miscount a carbonyl oxygen's electron domains by treating its double bond and its two lone pairs as contributing 4 separate domains (mistakenly splitting the double bond into 2), rather than correctly counting the double bond as ONE domain plus 2 lone pairs = 3 domains total; and they pattern-match "has a double bond → sp²" without actually counting total domains, missing that a carbon with TWO double bonds (2 domains total) is sp (linear), not sp².

## 4. Misconception Library

### MC-1: All nitrogen atoms in organic molecules are sp³ because nitrogen has a lone pair
- **Probe**: "What is the hybridization of the nitrogen atom in pyridine?"
- **Characteristic phrase**: "N always has a lone pair, so N is always sp³."
- **Trigger (Type 1, overgeneralization)**: Students correctly learn that nitrogen typically carries a lone pair and generalize this presence directly into "nitrogen is always sp³," without checking where specifically that lone pair sits.
- **Conflict evidence [P28]**: When nitrogen is double-bonded to carbon (C=N) or sits in an aromatic ring contributing its lone pair to the delocalized π system (as in pyridine, where the lone pair instead sits in an in-plane sp² orbital, NOT contributing to the ring's π system — a subtlety distinct from pyrrole, where nitrogen's lone pair DOES join the π system), nitrogen is sp² — 3 electron domains total (2 sigma bonds + 1 lone pair, or 3 sigma bonds with one double bond) — not sp³.
- **Bridge [P30]**: A lone pair's mere presence tells you nothing about hybridization by itself — what matters is whether that lone pair occupies a hybridized orbital (counting as one of the electron domains determining sp/sp²/sp³) or an unhybridized p orbital feeding into an aromatic π system (which changes the electron-domain count used for hybridization).
- **Replacement [P31]**: Determine nitrogen's hybridization by counting its actual electron domains (bonds plus any lone pair occupying a hybridized orbital) — never assume sp³ from lone-pair presence alone.
- **Discrimination pairs [P33]**: Pyridine's nitrogen (lone pair in-plane, sp², NOT in the π system) vs. pyrrole's nitrogen (lone pair in the π system, contributing to aromaticity, different domain accounting) — same element, different structural role, different hybridization implications.
- **S6 repair path**: Have the student identify specifically where nitrogen's lone pair sits (in-plane hybrid orbital vs. p orbital in the π system) before assigning hybridization.

### MC-2: The carbonyl oxygen (C=O) is sp³ because it has two lone pairs and a double bond, giving 4 electron domains
- **Probe**: "How many σ bonds does the oxygen in C=O have?"
- **Characteristic phrase**: "double bond + 2 lone pairs = 4 domains for oxygen."
- **Trigger (Type 5, instruction-induced)**: Students count the double bond as contributing 2 separate domains (perhaps conflating "double bond = 2 electron pairs" with "double bond = 2 electron domains"), then add the 2 lone pairs, arriving at 4 total domains.
- **Conflict evidence [P28]**: The oxygen in C=O forms exactly ONE σ bond (to carbon) and ONE π bond (also to carbon) — together, this double bond counts as a SINGLE electron domain, exactly as in the generic hybridization rule established for any double bond; adding the 2 lone pairs gives oxygen a true total of 3 electron domains (1 double-bond domain + 2 lone pairs), correctly giving sp² hybridization, not sp³.
- **Bridge [P30]**: The rule "a double bond counts as one electron domain regardless of how many electron pairs it contains" (established generically for VSEPR-style domain counting) applies identically here — the double bond's two electron PAIRS (sigma and pi) occupy the same spatial region and are counted together as one domain, not split into two separate domains.
- **Replacement [P31]**: A carbonyl oxygen has 3 total electron domains (1 double-bond domain + 2 lone pairs), giving sp² hybridization — never split a double bond into 2 separate domains when counting.
- **Discrimination pairs [P33]**: Naive miscounting (double bond = 2 domains + 2 lone pairs = 4, WRONG, implies sp³) vs. correct counting (double bond = 1 domain + 2 lone pairs = 3, CORRECT, gives sp²).
- **S6 repair path**: Explicitly restate the "double bond = one domain" rule and recount oxygen's domains step by step, arriving at 3, not 4.

### MC-3: A carbon with two double bonds (e.g., CO₂, allene) is sp² because it has double bonds
- **Probe**: "What is the hybridization and geometry of the central C in CO₂?"
- **Characteristic phrase**: "C=O means sp² because C=O is a double bond."
- **Trigger (Type 4, notation-induced)**: Students pattern-match on the mere presence of "a double bond" being associated with sp², without actually counting the TOTAL number of electron domains present, which can differ when multiple double bonds are involved.
- **Conflict evidence [P28]**: The central carbon in CO₂ has TWO double bonds (to each oxygen), giving exactly 2 total electron domains (each double bond, counted as one domain per the standard rule) — 2 electron domains corresponds to sp hybridization (linear geometry, 180°), not sp²; sp² specifically requires 3 electron domains (such as one double bond plus two additional single-bond or lone-pair domains), which CO₂'s central carbon does not have.
- **Bridge [P30]**: The presence of "a double bond" alone doesn't determine hybridization — what matters is the TOTAL count of electron domains, and a carbon bonded via two separate double bonds to two different atoms has only 2 domains total (one per double bond), a fundamentally different situation from a carbon with one double bond plus other single-bond domains.
- **Replacement [P31]**: Count ALL electron domains around the carbon (each double or triple bond counting as exactly one domain) before assigning hybridization — 2 domains gives sp (linear), 3 domains gives sp² (trigonal planar), 4 domains gives sp³ (tetrahedral).
- **Discrimination pairs [P33]**: CO₂'s central carbon (2 double bonds, 2 total domains, sp, linear) vs. a ketone's carbonyl carbon (1 double bond + 2 single bonds, 3 total domains, sp², trigonal planar) — both have "a double bond," but genuinely different hybridization due to different total domain counts.
- **S6 repair path**: Have the student count CO₂'s central carbon's total domains explicitly (2, not 3), then reassign hybridization based on that correct count.

## 5. Explanation Library

**Primary explanation**: Applying hybridization within organic molecules follows the exact same electron-domain-counting rule established generically: a double or triple bond, no matter how many electron pairs it physically contains, occupies exactly ONE spatial electron domain. This rule must be applied rigorously and consistently at every relevant atom (carbon, nitrogen, oxygen) rather than pattern-matched from surface features like "has a double bond" or "has a lone pair."

**Secondary explanation (nitrogen lone-pair location framing)**: Nitrogen's hybridization specifically depends on whether its lone pair occupies a hybridized in-plane orbital (as in pyridine, where it stays out of the aromatic π system) or an unhybridized p orbital feeding directly into a delocalized π system (as in pyrrole) — the mere presence of a lone pair says nothing about hybridization without knowing its precise structural role.

## 6. Analogy Library

- **Primary analogy**: A parking spot painted with double-wide lines (a double bond) still counts as ONE parking space in a lot's total space count, even though the paint job uses more lines/paint (more electron pairs) than a regular single-wide space — counting total "spaces" (domains) means counting distinct spatial regions, not the amount of paint used to mark them.
- **Breaking point**: The parking-spot analogy conveys the "one domain regardless of internal complexity" rule well but doesn't naturally capture the nitrogen lone-pair-location distinction (pyridine vs. pyrrole) — that needs the explicit structural comparison.
- **Anti-analogy**: Do NOT say "count each bond within a double bond separately" — this directly reinforces MC-2 and MC-3's domain-miscounting errors.

## 7. Demonstration Library

- **Demonstration 1 (pyridine vs. pyrrole nitrogen comparison)**: Present both nitrogen-containing aromatic rings side by side, having students trace exactly where each nitrogen's lone pair sits and determine hybridization from that specific structural detail.
- **Demonstration 2 (CO₂ vs. ketone domain-counting drill)**: Compute total electron domains explicitly for CO₂'s central carbon (2) versus a ketone's carbonyl carbon (3), having students connect the different counts to their different resulting hybridizations (sp vs. sp²).

## 8. Discovery Lesson

**Opening**: "Both pyridine and pyrrole contain a nitrogen with a lone pair. Does that guarantee both nitrogens have the same hybridization?"

**Exploration**: Students trace the specific location of each nitrogen's lone pair (in-plane vs. in the π system), discovering the structural difference between the two rings.

**Synthesis**: Guide toward: lone-pair presence alone doesn't determine hybridization — its precise location (hybridized orbital vs. unhybridized p orbital in a π system) does.

**Closure**: "CO₂ has double bonds, just like a ketone's carbonyl. Does that mean CO₂'s central carbon is sp², same as the ketone's carbon?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the pyridine-vs-pyrrole nitrogen lone-pair-location comparison directly.
- **TA-2 (TELL)**: State the "double bond = one domain, regardless of pair count" rule explicitly, worked through for a carbonyl oxygen.
- **TA-3 (DO)**: Student counts total electron domains for CO₂'s central carbon and correctly assigns sp hybridization.
- **TA-4 (TEST-THINKING)**: Present MC-1's pyridine probe and ask the student to justify nitrogen's hybridization using lone-pair location, not mere presence.

## 10. Voice Teaching

Whenever a double or triple bond is encountered in domain-counting, restate explicitly "this counts as ONE domain" before proceeding, regardless of how obvious it may seem. Whenever nitrogen's hybridization is discussed, always ask "where exactly is the lone pair — hybridized orbital or π system?" before assigning a hybridization state.

## 11. Assessment

**Mastery gate**: Student can (a) correctly determine nitrogen's hybridization based on lone-pair location, not mere presence, (b) correctly count a carbonyl oxygen's electron domains (3, not 4), (c) correctly distinguish sp (2 domains, CO₂-style) from sp² (3 domains) hybridization based on total domain count, not surface pattern-matching.

- **FA-1**: "What is the hybridization of the nitrogen atom in pyridine?" — targets MC-1.
- **FA-2**: "How many σ bonds does the oxygen in C=O have? How many total electron domains?" — targets MC-2.
- **FA-3**: "What is the hybridization and geometry of the central C in CO₂?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-3 among students who've only practiced hybridization on molecules with a single double bond, not multiple.

**Delayed retrieval**: Re-probe MC-1's lone-pair-location distinction before `chem.org.aromaticity` formally develops aromatic π-system delocalization, which depends entirely on correctly identifying which lone pairs participate.

## 12. Recovery Notes

- **S3 (stuck)**: For the domain-miscounting confusion, return to the generic "double bond = one domain" rule from `chem.bond.hybridization` and recount step by step.
- **S4 (frustrated)**: Normalize — the "has a double bond → sp²" pattern-match genuinely does work for many common examples, making its failure on CO₂-style structures a reasonable, common surprise.
- **S6 (collision)**: Use the explicit domain-recounting exercise for MC-2; use the CO₂-vs-ketone comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a carbon with two double bonds ends up with fewer total domains than a carbon with one double bond plus other substituents.

## 13. Memory & Review

Tag as a procedural-counting memory (double bond = one domain, applied rigorously) plus a conceptual-correction memory (nitrogen lone-pair location; multiple-double-bond domain counting). Schedule a spaced check at ~1 week and again before `chem.org.aromaticity`.

## 14. Transfer Map

Feeds directly into `chem.hyd.alkanes` (sp³ carbon framework foundational to alkane structure), `chem.org.aromaticity` (correct lone-pair-location reasoning for nitrogen directly resolves the pyridine/pyrrole distinction central to this topic), `chem.org.electronic-effects` (hybridization underlies electron delocalization reasoning), and `chem.org.isomerism` (correct geometry prediction from hybridization is essential for distinguishing isomers).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
