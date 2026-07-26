# chem.elect.corrosion — Corrosion

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.elect.corrosion` |
| Domain | Electrochemistry |
| Requires | `chem.elect.galvanic-cell` |
| Unlocks | (none) |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

Tin (Sn) coating does NOT protect iron the same way zinc (Zn) galvanizing does — zinc (E°=−0.76V, MORE negative than Fe's −0.44V) is the anode when in contact with iron, corroding sacrificially and protecting Fe, while tin (E°=−0.14V, LESS negative than Fe) makes IRON the anode when the tin coating is scratched, ACCELERATING iron corrosion through any breach rather than preventing it — tin is a barrier coating only, not sacrificial; rust does NOT form at the location where iron is actually dissolving — Fe²⁺ ions form at the ANODE (low-O₂ region) but MIGRATE through the electrolyte to the CATHODE region (high-O₂), where they meet OH⁻ and precipitate as rust — the visible rust location is genuinely DIFFERENT from the actual corrosion (metal-loss) site; and "cathodic protection" means making the structure YOU WANT TO PROTECT into the CATHODE (since corrosion is fundamentally an oxidation/anodic process, and the cathode cannot be oxidized) — the term describes what the PROTECTED structure BECOMES, never "protecting the cathode" as if the cathode were the vulnerable component (it's actually the ANODE, e.g., the sacrificial block, that corrodes).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing E°(Fe²⁺/Fe)=−0.44V against E°(Sn²⁺/Sn)=−0.14V and E°(Zn²⁺/Zn)=−0.76V explicitly, deriving which metal becomes the anode (and hence which is sacrificial vs. accelerating) in each pairing with iron.

**Representational**: A corrosion-cell diagram showing Fe²⁺ ions forming at a low-oxygen anodic region and migrating through the electrolyte to a high-oxygen cathodic region, with rust precipitating visibly at the cathodic location — spatially separated from the actual metal-loss site.

**Abstract**: The general principle that a coating metal's protective (sacrificial) vs. accelerating (barrier-only-then-worse) behavior depends entirely on its E° relative to the base metal, not on the coating material's general "protective" reputation; the general principle that corrosion product location and actual metal-loss location can be spatially separated by ion migration; the general definitional principle that "cathodic protection" names what the protected structure becomes, not what is being directly acted upon.

**Transfer**: Given an unfamiliar metal-coating pairing, correctly predicting sacrificial vs. accelerating behavior from E° comparison; given an unfamiliar corrosion scenario, correctly distinguishing the visible rust location from the actual anodic metal-loss site; given an unfamiliar cathodic-protection setup, correctly identifying which component is protected (cathode) and which corrodes (anode).

## 3. Why Beginners Fail

Students generalize "metal coating protects iron from corrosion" as a single undifferentiated protective mechanism, applying the sacrificial-anode logic of zinc galvanizing directly to tin coating as well, missing that the protective mechanism genuinely depends on the coating metal's E° RELATIVE TO IRON — zinc's more negative E° makes it sacrificial (protecting iron even through scratches), while tin's less negative E° makes iron itself the anode once the coating is breached, actually ACCELERATING localized iron corrosion rather than preventing it; students see visible rust and assume that location IS where the iron is actively dissolving (an intuitive "the damage is where you see the damage" assumption), missing that the Fe²⁺ ions produced at the actual anodic (metal-loss) site migrate through the electrolyte before precipitating as rust at a separate cathodic (high-oxygen) location — the visible corrosion product and the actual site of metal loss can be meaningfully distant from each other; and students interpret "cathodic protection" literally as "protecting the cathode" (as if the cathode were the vulnerable, at-risk component needing protection), missing that the term actually describes the STRATEGY of forcing the structure you want to protect TO BECOME the cathode (since corrosion is fundamentally an oxidative, anodic process, and cathodes cannot be oxidized) — the component that actually corrodes in cathodic protection is the ANODE (the sacrificial block or impressed-current anode), not the cathode.

## 4. Misconception Library

### MC-1: Tinning (Sn coating) protects iron the same way galvanising does — sacrificially
- **Probe**: "Compare E°(Sn²⁺/Sn) and E°(Fe²⁺/Fe). Which metal is the anode when Sn and Fe are in electrical contact?"
- **Characteristic phrase**: "both Sn and Zn coatings protect by sacrificial action."
- **Trigger (Type 5, instruction-induced)**: Both tin and zinc coatings are commonly introduced together as "metal coatings that protect iron," without emphasizing their genuinely opposite protective mechanisms.
- **Conflict evidence [P28]**: E°(Fe²⁺/Fe)=−0.44V; E°(Sn²⁺/Sn)=−0.14V. Iron is MORE NEGATIVE→iron is the anode when in contact with tin. If the tin coating is scratched, Fe is oxidised preferentially — tin ACCELERATES iron corrosion through any break. Galvanizing (Zn): E°(Zn²⁺/Zn)=−0.76V — zinc is more negative than Fe→Zn is the anode→Zn corrodes, Fe is the cathode→Fe is protected. The distinction: Zn has MORE negative E° than Fe (sacrificial); Sn has LESS negative E° than Fe (barrier only — accelerates on breach).
- **Bridge [P30]**: Which metal in a two-metal galvanic couple becomes the anode (and hence corrodes) is determined entirely by their RELATIVE E° values, not by either metal's general reputation as a "protective coating" — zinc's more negative E° than iron makes it genuinely sacrificial (protecting Fe even through a breach), while tin's LESS negative E° than iron means Fe becomes the anode once the coating is compromised, making tin's protection purely a physical barrier that, once broken, actively worsens localized corrosion rather than mitigating it.
- **Replacement [P31]**: Always compare E° values to determine sacrificial (coating more negative, protects even through breach) vs. barrier-only (coating less negative, accelerates corrosion through a breach) behavior — never assume all "protective" metal coatings function identically.
- **Discrimination pairs [P33]**: Zinc coating (E°=−0.76V, more negative than Fe, sacrificial, protects through scratches) vs. tin coating (E°=−0.14V, less negative than Fe, barrier-only, accelerates corrosion through scratches).
- **S6 repair path**: Present the explicit E° comparison for both Zn/Fe and Sn/Fe pairings, deriving each coating's protective mechanism from the relative values.

### MC-2: Rust forms where the iron is dissolving — the rusted spot is where iron is being lost
- **Probe**: "Describe what happens to the Fe²⁺ ions that form at the anode — do they stay at the anode?"
- **Characteristic phrase**: "the rust is the corroded spot."
- **Trigger (Type 2, perceptual intuition)**: An intuitive assumption that visible damage (rust) directly marks the location of underlying material loss.
- **Conflict evidence [P28]**: Fe²⁺ ions form at the anode (low-O₂ region, e.g. in a crevice) but MIGRATE through the electrolyte toward the cathode region (high-O₂). There, they meet OH⁻ (formed at the cathode: O₂+2H₂O+4e⁻→4OH⁻) and precipitate as Fe(OH)₂, then oxidise to rust. Rust appears at a DIFFERENT LOCATION from where the iron is actually dissolving.
- **Bridge [P30]**: The visible rust product is the result of a multi-step process involving ION MIGRATION through the electrolyte followed by precipitation — the Fe²⁺ ions responsible for the eventual rust do not remain fixed at their point of origin (the anodic site) but travel through the surrounding electrolyte toward the region where the necessary OH⁻ ions are being generated (the cathodic, high-oxygen site), meaning the visible corrosion product's location is a consequence of transport, not a direct marker of the actual metal-loss location.
- **Replacement [P31]**: The visible rust location and the actual metal-loss (anodic) site are often spatially separated, connected by Fe²⁺ ion migration through the electrolyte — never assume rust marks the exact location of iron dissolution.
- **Discrimination pairs [P33]**: Anodic site (low-O₂, actual metal loss, Fe²⁺ generated, no visible rust necessarily) vs. cathodic site (high-O₂, OH⁻ generated, rust precipitates visibly) — genuinely different locations connected by ion transport.
- **S6 repair path**: Present the explicit corrosion-cell diagram tracing Fe²⁺ migration from the anodic origin to the cathodic precipitation site.

### MC-3: Cathodic protection means protecting the cathode
- **Probe**: "In cathodic protection of a ship hull, is the hull the cathode or the anode? And which would be more susceptible to corrosion — the anode or the cathode?"
- **Characteristic phrase**: "you protect the cathode, that's why it's called cathodic."
- **Trigger (Type 3, language contamination)**: The phrase "cathodic protection" is interpreted literally as "protecting [an already-vulnerable] cathode," rather than as "protection achieved by making [the structure] the cathode."
- **Conflict evidence [P28]**: Cathodic protection means making the structure YOU WANT TO PROTECT into the CATHODE. Corrosion=oxidation=anodic process. If the ship hull is forced to be a cathode (by sacrificial anode or impressed current), it CANNOT be oxidised→corrosion stops. The ANODE corrodes (the sacrificial Mg/Zn block, or the inert impressed-current anode). "Cathodic" refers to what the PROTECTED STRUCTURE becomes, not what is being "protected in the cathodic sense."
- **Bridge [P30]**: The phrase "cathodic protection" describes the STRATEGY (protection achieved via a cathodic role), not the target of the protection in a literal grammatical sense — since corrosion is fundamentally the oxidation (anodic) half-reaction, a structure that is forced to play the CATHODE role in its electrochemical couple is thereby protected from oxidation entirely, while the ANODE component (deliberately provided, e.g., a sacrificial metal block) is the one that actually undergoes the corrosive oxidation instead.
- **Replacement [P31]**: "Cathodic protection" means forcing the structure to be protected to become the cathode (immune to oxidation) — the anode (sacrificial block or impressed-current source) is what actually corrodes, never interpret the phrase as "protecting a vulnerable cathode."
- **Discrimination pairs [P33]**: Protected structure (forced into cathode role, immune to oxidation, genuinely protected) vs. sacrificial anode (deliberately made the anode, corrodes in the protected structure's place).
- **S6 repair path**: Present the explicit ship-hull cathodic-protection diagram, identifying the hull as cathode (protected) and the sacrificial block as anode (corrodes).

## 5. Explanation Library

**Primary explanation**: A metal coating's protective mechanism against iron corrosion — sacrificial (zinc) vs. barrier-only (tin) — is determined entirely by the coating's E° relative to iron: a more negative E° (zinc) makes the coating itself the anode, sacrificially protecting iron even through breaches, while a less negative E° (tin) makes iron the anode once the coating is scratched, actually accelerating localized iron corrosion.

**Secondary explanation (spatial separation of corrosion sites and cathodic-protection terminology)**: Visible rust forms where Fe²⁺ ions (generated at the anodic metal-loss site) migrate to and meet OH⁻ (generated at the cathodic, high-oxygen site) — the rust location and the actual metal-loss location are often spatially distinct. "Cathodic protection" specifically means forcing the protected structure to become the cathode (immune to oxidation), while a deliberately-provided anode (sacrificial block or impressed current) corrodes in its place.

## 6. Analogy Library

- **Primary analogy**: A designated "fall guy" (the sacrificial anode) who takes the blame (oxidation) so the protected party (the cathode) never has to — genuinely different from a simple protective shield (barrier coating) that, once pierced, offers no ongoing benefit and can even make things worse if it happens to be the "weaker" party underneath.
- **Breaking point**: The fall-guy analogy conveys the cathodic-protection role-reversal well but doesn't naturally capture the E°-comparison-determines-mechanism principle (MC-1) or the spatial separation of rust from actual metal loss (MC-2) — those need the explicit E° comparison and the corrosion-cell migration diagram.
- **Anti-analogy**: Do NOT say "any metal coating protects iron the same way" — this directly reinforces MC-1 by ignoring the E°-dependent mechanism difference.

## 7. Demonstration Library

- **Demonstration 1 (E° comparison for Zn/Fe and Sn/Fe pairings)**: Present both E° comparisons explicitly, deriving sacrificial vs. barrier-only behavior for each coating.
- **Demonstration 2 (corrosion-cell Fe²⁺-migration diagram)**: Draw the explicit anodic-origin/cathodic-precipitation diagram, tracing Fe²⁺ migration to the visible rust site.
- **Demonstration 3 (cathodic-protection role diagram for a ship hull)**: Present the explicit hull-as-cathode/sacrificial-block-as-anode diagram, clarifying which component actually corrodes.

## 8. Discovery Lesson

**Opening**: "Does tin coating protect iron the same way zinc galvanizing does?"

**Exploration**: Students compare E° values for Sn/Fe and Zn/Fe, discovering opposite protective mechanisms.

**Synthesis**: Guide toward: a coating's protective behavior depends on its E° relative to iron, not a general "protective coating" category.

**Closure**: "In cathodic protection, is the protected structure the cathode or the anode?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit E° comparison for both Zn/Fe and Sn/Fe pairings.
- **TA-2 (TELL)**: State the Fe²⁺-migration mechanism explicitly, anchored to the corrosion-cell diagram.
- **TA-3 (DO)**: Student predicts sacrificial vs. barrier-only behavior for an unfamiliar metal-coating pairing from E° comparison.
- **TA-4 (TEST-THINKING)**: Present the cathodic-protection probe and ask the student to justify which component (hull or sacrificial block) actually corrodes.

## 10. Voice Teaching

Whenever a protective coating is discussed, narrate "compare E° values — don't assume all coatings protect the same way." Whenever cathodic protection is discussed, state "the protected structure becomes the cathode — the anode is what corrodes" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict sacrificial vs. barrier-only coating behavior from E° comparison, (b) correctly explain the spatial separation between rust location and actual metal loss, (c) correctly identify the protected structure as the cathode in cathodic protection.

- **FA-1**: "Compare E°(Sn²⁺/Sn) and E°(Fe²⁺/Fe). Which metal is the anode when Sn and Fe are in electrical contact?" — targets MC-1.
- **FA-2**: "Describe what happens to the Fe²⁺ ions that form at the anode — do they stay at the anode?" — targets MC-2.
- **FA-3**: "In cathodic protection of a ship hull, is the hull the cathode or the anode?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-1 among students who have only encountered zinc galvanizing as their model for "protective metal coating."

**Delayed retrieval**: Re-probe MC-1's E°-dependent coating-mechanism reasoning and MC-3's cathodic-protection terminology as foundational knowledge for subsequent materials-science and industrial-chemistry applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the coating-mechanism confusion, have the student explicitly compare E° values before predicting sacrificial vs. barrier-only behavior.
- **S4 (frustrated)**: Normalize — assuming all protective coatings work identically is genuinely common on first exposure, since both are introduced as "protective."
- **S6 (collision)**: Use the explicit corrosion-cell migration diagram for MC-2; use the hull/sacrificial-block role diagram for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a scratched tin coating makes iron corrosion worse, not better.

## 13. Memory & Review

Tag as three conceptual-correction memories (E°-dependent coating mechanism; spatial separation of rust and metal loss; cathodic-protection terminology). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates galvanic-cell reasoning built across `chem.elect.galvanic-cell`, forming a capstone application to materials-science and industrial-corrosion-prevention contexts.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
