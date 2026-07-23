# Corrosion — `chem.elect.corrosion`

## Identity
- **KG ID**: chem.elect.corrosion
- **Subject**: chemistry
- **Domain**: chem.elect
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.elect.galvanic-cell
- **Unlocks**: (none — terminal node)

## Learning Objective
Explain the electrochemical mechanism of rusting (iron corrosion); state the conditions that accelerate corrosion; describe the methods of corrosion prevention (galvanising, tinning, cathodic protection, coating); and distinguish sacrificial anode protection from impressed current protection.

## Core Understanding
**Electrochemical corrosion — the rusting of iron**:
Rusting is not simple oxidation of Fe by air alone — it is an ELECTROCHEMICAL process requiring:
1. An electrolyte (water + dissolved ions, e.g. NaCl, CO₂/acid rain).
2. Oxygen (O₂) at the cathode region.
3. An ionic path (the electrolyte) and an electronic path (the iron itself).

The iron surface acts as its own galvanic cell — different regions of the same piece of iron have slightly different electrode potentials (due to impurities, grain boundaries, stress concentrations, differential aeration). Differential aeration is the most common driver: the area with LESS O₂ (in a crevice, under a scale, at a buried surface) becomes the ANODE:

- **Anode** (iron in low-O₂ region): Fe(s) → Fe²⁺(aq) + 2e⁻. Iron dissolves here.
- **Cathode** (iron in high-O₂ region): O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq). Oxygen is reduced here.
- Electrons flow through the iron from anode to cathode; ions flow through the electrolyte.
- Fe²⁺ migrates toward the cathode region and meets OH⁻ → Fe(OH)₂. Further oxidation: 4Fe(OH)₂ + O₂ → 2Fe₂O₃·H₂O (hydrated iron(III) oxide = rust). Rust forms NOT at the site of iron loss but away from it (Fe²⁺ and OH⁻ meet in the electrolyte between anode and cathode). This explains why rusting pits the underlying iron while rust appears at a different location — a common source of confusion.

**Factors accelerating corrosion**:
- Electrolyte concentration: NaCl reduces resistance of electrolyte → more current → faster corrosion. (Coastal and salted-road environments.)
- Acidity: H⁺ provides an alternative cathode reaction: 2H⁺ + 2e⁻ → H₂(g) (hydrogen evolution, in absence of O₂). Acid rain (H₂SO₃, HNO₃) greatly accelerates corrosion.
- Temperature: higher T increases reaction rates and electrolyte conductivity.
- Contact with a more noble metal (higher reduction potential): galvanic corrosion — Fe in contact with Cu forms a galvanic cell; Fe is the anode and corrodes faster than isolated Fe.

**Corrosion prevention — methods**:

**1. Barrier coatings** (physical exclusion of O₂ and H₂O):
- Paint, oil, grease — cheap but fails when scratched. Once broken, corrosion under the coating is accelerated by the exclusion of O₂ (anodic region under paint blister).
- Plastic/polymer coating.
- Electroplating with Cr (chromium plating) or Ni — decorative and protective; Cr forms a stable Cr₂O₃ passive layer.

**2. Galvanising (Zn coating)**:
- Iron coated with zinc (hot-dip galvanising or electrogalvanising).
- **Dual protection**: (a) BARRIER — Zn forms a layer of ZnO/Zn(OH)₂/ZnCO₃ (patina) that is impermeable and self-sealing; (b) SACRIFICIAL/CATHODIC PROTECTION — E°(Zn²⁺/Zn) = −0.76 V vs. E°(Fe²⁺/Fe) = −0.44 V → Zn is more negative → Zn preferentially oxidised. Even if the Zn coating is scratched and Fe is exposed, Zn acts as the anode: Zn → Zn²⁺ + 2e⁻; Fe is the cathode → Fe is PROTECTED. Zn sacrifices itself to protect Fe.

**3. Tinning (Sn coating — food cans)**:
- Iron coated with tin. E°(Sn²⁺/Sn) = −0.14 V vs. E°(Fe²⁺/Fe) = −0.44 V → Sn is less negative → if scratch occurs, Fe is the anode (more negative) and is oxidised FASTER than without the tin. Tin protects by BARRIER only (Sn coating intact); once breached, tin accelerates corrosion of the underlying Fe. This is why dented food cans corrode rapidly through — tin protection has been breached.
- Used for food cans because Sn²⁺ is not toxic; zinc would be.

**4. Sacrificial anode (cathodic protection)**:
- A block of more active metal (Mg²⁺/Mg: E° = −2.37 V, or Zn²⁺/Zn: E° = −0.76 V) is electrically connected to the iron structure (ship hull, pipeline, buried tank). The more active metal is the anode → it corrodes preferentially. Fe is the cathode → protected. Must be replaced periodically (Mg or Zn is consumed).
- Applications: ship hulls (Zn or Mg blocks bolted on), buried pipelines (Mg rod), underground storage tanks.

**5. Impressed current cathodic protection (ICCP)**:
- An external DC power supply forces the structure to be the CATHODE (forces electrons into it → it cannot be the anode → cannot oxidise). The anode is a separate inert electrode (platinised Ti, graphite) in the electrolyte. Used for large structures (bridges, oil platforms, port infrastructure).

**6. Passivation / stainless steel**:
- Alloys with >10.5% Cr form a passive Cr₂O₃ surface layer spontaneously → acts as barrier; self-repairs if scratched in air. Stainless steel is not inert — it is self-healing. Corrosion resistance is the consequence of the passive film, not intrinsic inertness of Fe.

## Mental Models
**Rusting as a hidden galvanic cell**: the iron object is simultaneously its own battery and its own victim. One region is the anode (iron dissolving), another is the cathode (oxygen reduced), and the iron conducts electrons between them while the water layer conducts ions. Understanding this model immediately explains why scratching a tin can accelerates corrosion (the electrochemical pair is now Fe/Sn with Fe as anode) and why scratching galvanised iron doesn't (Zn/Fe with Zn as the anode — Fe is protected).

**Sacrificial anode as a bodyguard**: the Mg or Zn block electrically connected to the steel ship hull is a "bodyguard" — it throws itself in front of every oxidation reaction, consuming itself so the hull survives. When the bodyguard is fully consumed (corroded away), it must be replaced.

## Why Students Fail
Students confuse tinning and galvanising — they say both protect by sacrificial action. Tinning protects by barrier only (Sn has a LESS negative E° than Fe, so if the coating is breached, Fe corrodes FASTER with Sn than without it). Students also say rust forms where iron dissolves — it doesn't; rust forms between anode and cathode where Fe²⁺ and OH⁻ meet.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Tinning (Sn coating) protects iron the same way galvanising does — sacrificially." Probe: "Compare E°(Sn²⁺/Sn) and E°(Fe²⁺/Fe). Which metal is the anode when Sn and Fe are in electrical contact?" Characteristic phrase: "both Sn and Zn coatings protect by sacrificial action." Intervention: E°(Fe²⁺/Fe) = −0.44 V; E°(Sn²⁺/Sn) = −0.14 V. Iron is MORE NEGATIVE → iron is the anode when in contact with tin. If the tin coating is scratched, Fe is oxidised preferentially — tin ACCELERATES iron corrosion through any break. Galvanizing (Zn): E°(Zn²⁺/Zn) = −0.76 V — zinc is more negative than Fe → Zn is the anode → Zn corrodes, Fe is the cathode → Fe is protected. The distinction: Zn has MORE negative E° than Fe (sacrificial); Sn has LESS negative E° than Fe (barrier only — accelerates on breach).
- **MC-2 (Type 2 — perceptual intuition)**: "Rust forms where the iron is dissolving — the rusted spot is where iron is being lost." Probe: "Describe what happens to the Fe²⁺ ions that form at the anode — do they stay at the anode?" Characteristic phrase: "the rust is the corroded spot." Intervention: Fe²⁺ ions form at the anode (low-O₂ region, e.g. in a crevice) but MIGRATE through the electrolyte toward the cathode region (high-O₂). There, they meet OH⁻ (formed at the cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻) and precipitate as Fe(OH)₂, then oxidise to rust. Rust appears at a DIFFERENT LOCATION from where the iron is actually dissolving. This explains why undersurface corrosion produces pits at one location with rust appearing elsewhere.
- **MC-3 (Type 3 — language contamination)**: "Cathodic protection means protecting the cathode." Probe: "In cathodic protection of a ship hull, is the hull the cathode or the anode? And which would be more susceptible to corrosion — the anode or the cathode?" Characteristic phrase: "you protect the cathode, that's why it's called cathodic." Intervention: cathodic protection means making the structure YOU WANT TO PROTECT into the CATHODE. Corrosion = oxidation = anodic process. If the ship hull is forced to be a cathode (by sacrificial anode or impressed current), it CANNOT be oxidised → corrosion stops. The ANODE corrodes (the sacrificial Mg/Zn block, or the inert impressed-current anode). "Cathodic" refers to what the PROTECTED STRUCTURE becomes, not what is being "protected in the cathodic sense."

## Analogies
**Valid**: galvanised iron is like a bodyguard/principal pair — the Zn coating is the bodyguard (stands in front, takes the hits, gets corroded), and the Fe is the principal (protected as long as the bodyguard is present). Tinned iron is like a raincoat — protects completely while intact; once the raincoat tears (scratch), the wearer gets wetter than without one (Fe now has a Sn cathode driving faster Fe oxidation).

## Demonstrations
**Ferroxyl indicator test**: immerse a polished iron nail in ferroxyl indicator (agar gel + phenolphthalein + K₃[Fe(CN)₆]). After 30 minutes: blue colour (Turnbull's blue from Fe²⁺ + ferricyanide) appears at the TIP and SHAFT (anode — higher stress, lower O₂); pink colour (phenolphthalein from OH⁻) appears at the SHANK (cathode — higher O₂ access). This beautifully demonstrates differential aeration and proves rust forms between the two regions.

**Galvanic protection demo**: compare corrosion of: (a) bare iron nail in NaCl(aq), (b) nail with Zn strip attached, (c) nail with Cu strip attached. After 24h: (a) rusts moderately, (b) Zn corrodes, nail protected, (c) nail corrodes much faster (galvanic acceleration — Cu is the cathode, Fe is the anode).

## Discovery Questions
1. "A copper pipe is connected to a steel water tank by a steel fitting in hard water. After six months, corrosion pits appear in the steel fitting, not in the copper pipe or the tank. Explain this observation using galvanic cell principles and electrode potentials."
2. "An oil pipeline is buried underground. Engineers install Mg rods electrically connected to the pipe at 200 m intervals. (a) Which is the anode: Mg or Fe? (b) Write the two half-reactions that occur. (c) Why must the Mg rods be replaced periodically? (d) As an alternative, an impressed current system is proposed. How does it work and what is the advantage?"

## Teaching Sequence
1. Recall galvanic cell: spontaneous redox, anode/cathode, electron flow direction. Apply to corrosion — iron is both anode and cathode regions.
2. Differential aeration: O₂ concentration difference → anode (low O₂) and cathode (high O₂). Write the two half-reactions for iron rusting.
3. Where rust forms: Fe²⁺ migrates, meets OH⁻ between electrodes → rust ≠ pit location.
4. Accelerating factors: salt, acid, dissimilar metal contact, temperature.
5. Prevention methods: paint/polymer (barrier). Galvanising: barrier + sacrificial (E° comparison Zn vs. Fe). Tinning: barrier only (E° comparison Sn vs. Fe — opposite result on scratch). Sacrificial anode (Mg/Zn on ship/pipe). Impressed current. Stainless steel passivation.

## Tutor Actions
- **If student confuses tinning with galvanising for scratch protection**: ask "Look up E° for Sn²⁺/Sn and Fe²⁺/Fe. Which is more negative? That one is the anode. Which metal do you WANT to be the anode — the coating or the iron?" Force the electrode potential comparison before the protection mechanism is named.
- **If student says rust forms at the corroding spot**: ask "Where do Fe²⁺ ions go after forming at the anode?" (They migrate through the electrolyte.) "Where do OH⁻ ions form?" (At the cathode — different location.) "So where do they meet?" (Between the two regions — rust forms there.)
- **FRAGILE sign**: knows galvanising and tinning by name but cannot explain why scratch protection differs between them using electrode potentials.

## Voice Teaching Notes
In voice, the Zn vs. Sn contrast is the central examination trap. In voice: "Tell me the E° for Zn²⁺/Zn, Fe²⁺/Fe, and Sn²⁺/Sn in order from most negative to least negative." (Zn < Fe < Sn.) "So which metal, when in contact with Fe, will make Fe the anode?" (Sn — since Fe is more negative than Sn, Fe is the anode.) "And which will make Fe the cathode?" (Zn — Zn is more negative, Zn is the anode, Fe is protected.) This electrode-potential ordering is the single fact from which all protection logic follows.

## Assessment Signals
- **Green**: writes two half-reactions for iron rusting (Fe→Fe²⁺+2e⁻ at anode; O₂+2H₂O+4e⁻→4OH⁻ at cathode); explains that rust forms between anode and cathode; explains Zn protects sacrificially (E°(Zn) < E°(Fe)); explains Sn protects by barrier only and accelerates corrosion if breached (E°(Sn) > E°(Fe)); explains sacrificial anode and ICCP mechanisms correctly.
- **Amber**: knows which method of protection works but cannot write electrode reactions or justify the Zn/Sn distinction using electrode potentials.
- **Red**: says tinning provides sacrificial protection; says rust forms where the iron is dissolving; says "cathodic protection protects the cathode."
- **Probe**: "A garden gate is made of iron with rivets of copper. After a wet winter, the iron corrodes preferentially near the rivets. (a) Identify anode and cathode in this corrosion cell. (b) Write the half-reactions. (c) Propose TWO methods of preventing this corrosion and explain the mechanism of each."

## Tutor Recovery Strategy
If student cannot explain the Zn vs. Sn protection difference: build from electrode potentials. "Write down the standard reduction potentials for Fe, Zn, and Sn. Which is lowest (most negative)? That's the strongest reducing agent. In a galvanic cell between two metals, which is the anode? (The more negative, i.e., stronger reducing agent.) Now pair Zn and Fe: Zn has lower E° → Zn is anode → Zn corrodes, Fe is protected. Pair Sn and Fe: Fe has lower E° → Fe is anode → Fe corrodes faster. The electrode potential comparison answers the question completely, without memorising two separate rules."

## Memory Hooks
- **Rusting mechanism**: "Anode (low O₂): Fe → Fe²⁺ + 2e⁻. Cathode (high O₂): O₂ + 2H₂O + 4e⁻ → 4OH⁻. Rust (Fe₂O₃·H₂O) forms BETWEEN them."
- **Zn vs. Sn key**: "E°: Zn (−0.76) < Fe (−0.44) < Sn (−0.14). Zn sacrificial = protects on scratch. Sn barrier only = accelerates on scratch."
- **Sacrificial anode**: "More active metal (Mg or Zn) connected to structure → acts as anode → corrodes, structure is cathode = protected. Replace when consumed."
- **ICCP**: "External DC supply forces structure to be cathode → cannot oxidise → protected. Inert anode (graphite/Pt-Ti) in electrolyte."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for corrosion chemistry.

## Cross-Subject Connections
- **Civil/structural engineering**: corrosion of reinforcing steel (rebar) in concrete (concrete cancer) is a major cause of infrastructure failure. Passivation by concrete's high pH (pH~12) normally protects rebar; chloride ingress (sea water, road salt) breaks passivation → rebar corrodes, expands, cracks concrete. Engineers use epoxy-coated rebar, stainless steel rebar, or ICCP systems to prevent this.
- **Marine engineering**: ship hull corrosion by seawater is a billion-dollar annual problem; sacrificial zinc anode systems and hull paint (TBT-free after 2003 international ban) represent the practical application of this chemistry at scale.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.elect.corrosion`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.elect.corrosion` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
